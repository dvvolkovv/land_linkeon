import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { cityPlace, indexCities, searchCities, type CityDb } from '../../lib/cities';

/**
 * Сгенерированная база городов (scripts/build-hd-cities.py). Тест держит то,
 * что ломается молча при пересборке: размер, форму записей, пояса, которых не
 * знает браузер, и пропавшие русские названия.
 */
const raw = readFileSync(new URL('./cities.ru.json', import.meta.url));
const db = JSON.parse(raw.toString('utf8')) as CityDb;
const index = indexCities(db);

describe('база городов GeoNames', () => {
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
