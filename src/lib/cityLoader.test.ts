import { afterEach, describe, expect, it, vi } from 'vitest';
import { cityDbUrl, loadCityIndex } from './cityLoader';

describe('база городов по языку страницы', () => {
  it('свой файл на каждый язык сайта', () => {
    for (const code of ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh']) {
      expect(cityDbUrl(code), code).toMatch(new RegExp(`cities\\.${code}`));
    }
  });
  it('незнакомый язык — русская база', () => {
    expect(cityDbUrl('xx')).toMatch(/cities\.ru/);
  });
});

// Крошечная база — только то, что требует indexCities; полная структура
// CityDb описана в src/lib/cities.ts.
const FAKE_DB = {
  v: 1,
  zones: ['Europe/Moscow'],
  countries: { RU: 'Россия' },
  regions: [],
  cities: [['Казань', 'Kazan', 'RU', 0, 1300, -1]],
};

const okResponse = () => new Response(JSON.stringify(FAKE_DB), { status: 200 });

// Кеш loadCityIndex — на уровне модуля, общего для всех тестов файла: чтобы
// тесты не делили друг с другом слоты, у каждого — свой язык.
describe('loadCityIndex: кеш по языку и повтор после сбоя', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('два вызова на один язык — один fetch', async () => {
    const fetch = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => okResponse());
    vi.stubGlobal('fetch', fetch);

    const [a, b] = await Promise.all([loadCityIndex('en'), loadCityIndex('en')]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(a).toBe(b);
  });

  it('разные языки — разные адреса, без общего слота', async () => {
    const fetch = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => okResponse());
    vi.stubGlobal('fetch', fetch);

    await Promise.all([loadCityIndex('es'), loadCityIndex('de')]);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls.map((c) => c[0])).toEqual([cityDbUrl('es'), cityDbUrl('de')]);
  });

  it('сбой — следующий вызов на тот же язык пробует загрузку снова', async () => {
    const fetch = vi
      .fn<(url: string, init?: RequestInit) => Promise<Response>>()
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(okResponse());
    vi.stubGlobal('fetch', fetch);

    await expect(loadCityIndex('fr')).rejects.toThrow('города: HTTP 500');
    const index = await loadCityIndex('fr');
    expect(index).toHaveLength(1);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
