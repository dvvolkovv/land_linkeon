import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { cityPlace, indexCities, searchCities, type CityDb } from '../../lib/cities';

/**
 * Сгенерированные базы городов — по одной на каждый язык сайта
 * (scripts/build-hd-cities.py, один прогон по одному дампу). Тест держит то,
 * что ломается молча при пересборке: размер, форму записей, пояса, которых не
 * знает браузер, пропавшие названия на языке и согласованность баз — строка N
 * во всех семи файлах один и тот же город.
 */
const CODES = ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh'] as const;
const load = (code: string) => {
  const raw = readFileSync(new URL(`./cities.${code}.json`, import.meta.url));
  return { raw, db: JSON.parse(raw.toString('utf8')) as CityDb };
};
const DBS = Object.fromEntries(CODES.map((c) => [c, load(c)])) as Record<(typeof CODES)[number], { raw: Buffer; db: CityDb }>;
const index = indexCities(DBS.ru.db);
const db = DBS.ru.db;

describe('база городов GeoNames', () => {
  for (const code of CODES) {
    describe(code, () => {
      const { raw, db } = DBS[code];

      // Цель спеки — до 1 МБ сжатым. Сервер лендинга сейчас JSON не сжимает
      // (замер 08.10.2026), поэтому держим и сырой размер.
      it('размер: сжатым до 1 МБ, как есть — до 2 МБ', () => {
        expect(gzipSync(raw, { level: 9 }).length).toBeLessThan(1_000_000);
        expect(raw.length).toBeLessThan(2_000_000);
      });

      it('форма записей и ссылки на справочники', () => {
        expect(db.v).toBe(1);
        expect(db.cities.length).toBeGreaterThan(25_000);
        // Плохие строки копим, а не проверяем построчно: 34 тыс. × 6 expect —
        // по 2 с с лишним на каждую из семи баз в полном прогоне.
        const bad = db.cities.filter(
          ([name, latin, cc, zone, population, region]) =>
            typeof name !== 'string' ||
            typeof latin !== 'string' ||
            !(db.countries[cc] ?? cc) ||
            db.zones[zone] === undefined ||
            !(population >= 0) ||
            !(region === -1 || db.regions[region] !== undefined),
        );
        expect(bad.slice(0, 5)).toEqual([]);
      });

      it('от крупных к мелким', () => {
        const populations = db.cities.map((c) => c[4]);
        expect(populations).toEqual([...populations].sort((a, b) => b - a));
      });

      it('каждый пояс понимает Intl', () => {
        for (const zone of db.zones) {
          expect(() => new Intl.DateTimeFormat('en-US', { timeZone: zone }), zone).not.toThrow();
        }
      });
    });
  }

  it('крупные города находятся по-русски, с поясом и местом', () => {
    const first = (q: string) => searchCities(index, q)[0];
    expect(first('Казань')).toMatchObject({ name: 'Казань', zone: 'Europe/Moscow' });
    expect(cityPlace(first('Казань'))).toContain('Россия');
    expect(first('Новосибирск').zone).toBe('Asia/Novosibirsk');
    expect(first('Екатеринбург').zone).toBe('Asia/Yekaterinburg');
    expect(first('Калининград').zone).toBe('Europe/Kaliningrad');
    expect(first('Нью-Йорк').zone).toBe('America/New_York');
    expect(first('Берлин').zone).toBe('Europe/Berlin');
    expect(first('Алматы').zone).toBe('Asia/Almaty');
    expect(first('Киев').zone).toBe('Europe/Kiev');
  });

  it('латиницей тоже находится', () => {
    expect(searchCities(index, 'kazan')[0].name).toBe('Казань');
  });
});

describe('семь баз — один список городов', () => {
  // На этом держится поиск инструмента Райи по всем языкам (spirits_back):
  // строка N — один и тот же город во всех базах.
  it('одинаковая длина, страна, пояс и население у каждой строки', () => {
    for (const code of CODES) {
      const other = DBS[code].db;
      expect(other.cities.length, code).toBe(db.cities.length);
      // Расхождения копим, а не проверяем построчно: 34 тыс. expect на базу —
      // секунды, впритык к таймауту теста в полном прогоне.
      const mismatches: string[] = [];
      other.cities.forEach((row, i) => {
        const [name, , cc, zone, population] = db.cities[i];
        if (row[2] !== cc || other.zones[row[3]] !== db.zones[zone] || row[4] !== population) {
          mismatches.push(`${code}#${i}: ${row[0]} ${row[2]} ${other.zones[row[3]]} ${row[4]} ≠ ${name} ${cc} ${db.zones[zone]} ${population}`);
        }
      });
      expect(mismatches.slice(0, 5), code).toEqual([]);
    }
  });
});

describe('поиск на языке страницы', () => {
  const first = (code: (typeof CODES)[number], q: string) => searchCities(indexCities(DBS[code].db), q)[0];
  it('крупные города — названием на языке и с местом на языке', () => {
    expect(first('en', 'Munich').zone).toBe('Europe/Berlin');
    expect(first('de', 'München').zone).toBe('Europe/Berlin');
    expect(cityPlace(first('de', 'München'))).toBe('Bayern, Deutschland');
    expect(first('es', 'Sevilla').zone).toBe('Europe/Madrid');
    expect(first('fr', 'Séville').zone).toBe('Europe/Madrid');
    expect(first('pt', 'Lisboa').zone).toBe('Europe/Lisbon');
    expect(first('zh', '北京').zone).toBe('Asia/Shanghai');
    expect(first('zh', '莫斯科').zone).toBe('Europe/Moscow');
  });
  it('латиницей — на любом языке', () => {
    for (const code of CODES) expect(first(code, 'kazan').zone, code).toBe('Europe/Moscow');
  });
  it('упрощёнными иероглифами — и те города, что в GeoNames записаны традиционными', () => {
    // Сам город, а не «纽约州东草地» (так находилось до перевода в упрощённые).
    expect(first('zh', '纽约')).toMatchObject({ name: '纽约市', zone: 'America/New_York' });
    expect(first('zh', '维也纳').zone).toBe('Europe/Vienna');
  });
});

describe('названия на языке — без странностей исходных данных', () => {
  it('страны — обиходными названиями CLDR, а не официальными', () => {
    expect(DBS.de.db.countries.DE).toBe('Deutschland');
    expect(DBS.en.db.countries.US).toBe('United States');
    expect(DBS.zh.db.countries.RU).toBe('俄罗斯');
    expect(DBS.es.db.countries.CN).toBe('China');
  });
  it('без «A or B», мягкого знака в конце и известных ошибок GeoNames', () => {
    for (const code of CODES.filter((c) => c !== 'ru')) {
      const { cities, regions, countries } = DBS[code].db;
      const all = [...cities.map((c) => c[0]), ...regions, ...Object.values(countries)];
      expect(all.filter((n) => n.includes(' or ')), code).toEqual([]);
      expect(all.filter((n) => /[’ʹ]$/.test(n)), code).toEqual([]);
    }
    const kazan = searchCities(indexCities(DBS.en.db), 'Kazan')[0];
    expect(kazan.name).toBe('Kazan');
    expect(searchCities(indexCities(DBS.pt.db), 'Hong Kong')[0].name).toBe('Hong Kong');
    // Земля Вена названа как город — подпись без повтора; было «Viana, Áustria».
    expect(cityPlace(searchCities(indexCities(DBS.pt.db), 'Viena')[0])).toBe('Áustria');
  });
  it('правки вычитки (scripts/hd-city-overrides.tsv) — поверх GeoNames и CLDR', () => {
    const first = (code: (typeof CODES)[number], q: string) => searchCities(indexCities(DBS[code].db), q)[0];
    expect(first('zh', '金沙萨')).toMatchObject({ name: '金沙萨', zone: 'Africa/Kinshasa' });
    expect(first('de', 'Peking')).toMatchObject({ name: 'Peking', zone: 'Asia/Shanghai' });
    expect(first('pt', 'Maoming')).toMatchObject({ name: 'Maoming', zone: 'Asia/Shanghai' });
    expect(first('en', 'Abu Dhabi')).toMatchObject({ name: 'Abu Dhabi', zone: 'Asia/Dubai' });
    expect(DBS.en.db.countries.HK).toBe('Hong Kong');
    expect(DBS.zh.db.countries.HK).toBe('香港');
    expect(DBS.en.db.countries.CD).toBe('DR Congo');
  });
});
