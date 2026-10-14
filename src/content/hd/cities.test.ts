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
        for (const [name, latin, cc, zone, population, region] of db.cities) {
          expect(typeof name).toBe('string');
          expect(typeof latin).toBe('string');
          expect(db.countries[cc] ?? cc).toBeTruthy();
          expect(db.zones[zone], name).toBeDefined();
          expect(population).toBeGreaterThanOrEqual(0);
          expect(region === -1 || db.regions[region] !== undefined, name).toBe(true);
        }
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
  it('одинаковая длина, страна и пояс у каждой строки', () => {
    for (const code of CODES) {
      const other = DBS[code].db;
      expect(other.cities.length, code).toBe(db.cities.length);
      other.cities.forEach((row, i) => {
        expect(row[2], `${code}#${i}`).toBe(db.cities[i][2]);
        expect(other.zones[row[3]], `${code}#${i}`).toBe(db.zones[db.cities[i][3]]);
      });
    }
  });
});

describe('поиск на языке страницы', () => {
  const first = (code: (typeof CODES)[number], q: string) => searchCities(indexCities(DBS[code].db), q)[0];
  it('крупные города — названием на языке и с местом на языке', () => {
    expect(first('en', 'Munich').zone).toBe('Europe/Berlin');
    expect(first('de', 'München').zone).toBe('Europe/Berlin');
    expect(cityPlace(first('de', 'München'))).toContain('Deutschland');
    expect(first('es', 'Sevilla').zone).toBe('Europe/Madrid');
    expect(first('fr', 'Séville').zone).toBe('Europe/Madrid');
    expect(first('pt', 'Lisboa').zone).toBe('Europe/Lisbon');
    expect(first('zh', '北京').zone).toBe('Asia/Shanghai');
    expect(first('zh', '莫斯科').zone).toBe('Europe/Moscow');
  });
  it('латиницей — на любом языке', () => {
    for (const code of CODES) expect(first(code, 'kazan').zone, code).toBe('Europe/Moscow');
  });
});
