import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { cityPlace, indexCities, searchCities, type CityDb, type CityIndex } from '../../lib/cities';

/**
 * Сгенерированные базы городов — по одной на каждый язык сайта
 * (scripts/build-hd-cities.py, один прогон по одному дампу). Тест держит то,
 * что ломается молча при пересборке: размер, форму записей, пояса, которых не
 * знает браузер, пропавшие названия на языке и согласованность баз — строка N
 * во всех семи файлах один и тот же город.
 */
const CODES = ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh'] as const;
type Code = (typeof CODES)[number];
const load = (code: string) => {
  const raw = readFileSync(new URL(`./cities.${code}.json`, import.meta.url));
  return { raw, db: JSON.parse(raw.toString('utf8')) as CityDb };
};
const DBS = Object.fromEntries(CODES.map((c) => [c, load(c)])) as Record<Code, { raw: Buffer; db: CityDb }>;
const INDEX = Object.fromEntries(CODES.map((c) => [c, indexCities(DBS[c].db)])) as Record<Code, CityIndex>;
const ru = DBS.ru.db;
const first = (code: Code, q: string) => searchCities(INDEX[code], q)[0];

describe('база городов GeoNames', () => {
  for (const code of CODES) {
    describe(code, () => {
      const { raw, db: base } = DBS[code];

      // Цель спеки — до 1 МБ сжатым. Сервер лендинга сейчас JSON не сжимает
      // (замер 08.10.2026), поэтому держим и сырой размер.
      it('размер: сжатым до 1 МБ, как есть — до 2 МБ', () => {
        expect(gzipSync(raw, { level: 9 }).length).toBeLessThan(1_000_000);
        expect(raw.length).toBeLessThan(2_000_000);
      });

      it('форма записей и ссылки на справочники', () => {
        expect(base.v).toBe(1);
        expect(base.cities.length).toBeGreaterThan(25_000);
        // Плохие строки копим, а не проверяем построчно: 34 тыс. × 6 expect —
        // по 2 с с лишним на каждую из семи баз в полном прогоне.
        const bad = base.cities.filter(
          ([name, latin, cc, zone, population, region]) =>
            typeof name !== 'string' ||
            !name ||
            typeof latin !== 'string' ||
            !base.countries[cc] ||
            base.zones[zone] === undefined ||
            !(population >= 0) ||
            !(region === -1 || base.regions[region] !== undefined),
        );
        expect(bad.slice(0, 5)).toEqual([]);
      });

      it('от крупных к мелким', () => {
        const populations = base.cities.map((c) => c[4]);
        expect(populations).toEqual([...populations].sort((a, b) => b - a));
      });
    });
  }

  // Пояса во всех базах одни и те же (проверка согласованности ниже).
  it('каждый пояс понимает Intl', () => {
    for (const zone of ru.zones) {
      expect(() => new Intl.DateTimeFormat('en-US', { timeZone: zone }), zone).not.toThrow();
    }
  });

  it('крупные города находятся по-русски, с поясом и местом', () => {
    expect(first('ru', 'Казань')).toMatchObject({ name: 'Казань', zone: 'Europe/Moscow' });
    expect(cityPlace(first('ru', 'Казань'))).toContain('Россия');
    expect(first('ru', 'Новосибирск').zone).toBe('Asia/Novosibirsk');
    expect(first('ru', 'Екатеринбург').zone).toBe('Asia/Yekaterinburg');
    expect(first('ru', 'Калининград').zone).toBe('Europe/Kaliningrad');
    expect(first('ru', 'Нью-Йорк').zone).toBe('America/New_York');
    expect(first('ru', 'Берлин').zone).toBe('Europe/Berlin');
    expect(first('ru', 'Алматы').zone).toBe('Asia/Almaty');
    expect(first('ru', 'Киев').zone).toBe('Europe/Kiev');
  });

  it('латиницей тоже находится', () => {
    expect(first('ru', 'kazan').name).toBe('Казань');
  });
});

describe('семь баз — один список городов', () => {
  // На этом держится поиск инструмента Райи по всем языкам (spirits_back):
  // строка N — один и тот же город во всех базах.
  it('одинаковые пояса, длина; у каждой строки — страна, пояс, население и латиница', () => {
    for (const code of CODES) {
      const other = DBS[code].db;
      expect(other.zones, code).toEqual(ru.zones);
      expect(other.cities.length, code).toBe(ru.cities.length);
      // Латиница — общее написание GeoNames (или само название, если оно и
      // есть латиница): разные языки, а город тот же.
      const latinOf = (row: CityDb['cities'][number]) => (row[1] || row[0]).toLowerCase();
      // Расхождения копим, а не проверяем построчно: 34 тыс. expect на базу —
      // секунды, впритык к таймауту теста в полном прогоне.
      const mismatches: string[] = [];
      other.cities.forEach((row, i) => {
        const own = ru.cities[i];
        if (row[2] !== own[2] || row[3] !== own[3] || row[4] !== own[4] || latinOf(row) !== latinOf(own)) {
          mismatches.push(`${code}#${i}: ${row.join(' ')} ≠ ${own.join(' ')}`);
        }
      });
      expect(mismatches.slice(0, 5), code).toEqual([]);
    }
  });
});

describe('поиск на языке страницы', () => {
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

describe('названия на языке файла, а не основные GeoNames', () => {
  // Пояс нашёлся бы и по латинице; ловим именно потерю названия на языке.
  it('экзонимы крупных городов', () => {
    expect(first('es', 'Londres')).toMatchObject({ name: 'Londres', zone: 'Europe/London' });
    expect(first('es', 'Múnich')).toMatchObject({ name: 'Múnich', zone: 'Europe/Berlin' });
    expect(first('en', 'Cologne')).toMatchObject({ name: 'Cologne', zone: 'Europe/Berlin' });
    expect(first('de', 'Mailand')).toMatchObject({ name: 'Mailand', zone: 'Europe/Rome' });
    expect(first('zh', '伦敦')).toMatchObject({ name: '伦敦', zone: 'Europe/London' });
  });
  // Грубый сторож целой базы: если язык потерялся (скажем, перепутан код в
  // alternateNames), названия совпадут с английскими или уйдут в латиницу.
  it('в первой тысяче городов названия действительно на языке файла', () => {
    const head = (code: Code) => DBS[code].db.cities.slice(0, 1000).map((c) => c[0]);
    const en = head('en');
    for (const code of ['es', 'de', 'fr', 'pt'] as const) {
      expect(head(code).filter((name, i) => name !== en[i]).length, code).toBeGreaterThanOrEqual(100);
    }
    expect(head('zh').filter((name) => /\p{Script=Han}/u.test(name)).length).toBeGreaterThanOrEqual(750);
    expect(head('ru').filter((name) => /\p{Script=Cyrillic}/u.test(name)).length).toBeGreaterThanOrEqual(950);
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
      expect(all.filter((n) => /['’ʹ]$/.test(n)), code).toEqual([]);
    }
    expect(first('en', 'Kazan').name).toBe('Kazan');
    expect(first('en', 'Tver').name).toBe('Tver');
    expect(first('pt', 'Hong Kong').name).toBe('Hong Kong');
    // Земля Вена названа как город — подпись без повтора; было «Viana, Áustria».
    expect(cityPlace(first('pt', 'Viena'))).toBe('Áustria');
  });
  it('zh — без хвостов «，страна», «（штат）», «_» и «X/X»', () => {
    const { cities, regions } = DBS.zh.db;
    const odd = [...cities.map((c) => c[0]), ...regions].filter(
      (n) => /[，_]/.test(n) || /（[^（）]*）$/.test(n) || (n.includes('/') && new Set(n.split('/')).size === 1),
    );
    expect(odd).toEqual([]);
    const inCountry = (q: string, country: string) => searchCities(INDEX.zh, q).find((c) => c.country === country);
    expect(inCountry('滑铁卢', '塞拉利昂')?.name).toBe('滑铁卢');
    expect(inCountry('Leer', '南苏丹')?.name).toBe('莱尔');
    expect(first('zh', 'Bensonhurst').name).toBe('本森赫斯特');
  });
  it('правки вычитки (scripts/hd-city-overrides.tsv) — поверх GeoNames и CLDR', () => {
    expect(first('zh', '金沙萨')).toMatchObject({ name: '金沙萨', zone: 'Africa/Kinshasa' });
    expect(first('de', 'Peking')).toMatchObject({ name: 'Peking', zone: 'Asia/Shanghai' });
    expect(first('pt', 'Maoming')).toMatchObject({ name: 'Maoming', zone: 'Asia/Shanghai' });
    expect(first('en', 'Abu Dhabi')).toMatchObject({ name: 'Abu Dhabi', zone: 'Asia/Dubai' });
    expect(DBS.en.db.countries.HK).toBe('Hong Kong');
    expect(DBS.zh.db.countries.HK).toBe('香港');
    expect(DBS.en.db.countries.CD).toBe('DR Congo');
    // Единственная намеренная правка русской базы: «Заир» устарел в 1997-м.
    expect(DBS.ru.db.countries.CD).toBe('ДР Конго');
  });
});
