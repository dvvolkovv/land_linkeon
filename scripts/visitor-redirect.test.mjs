import { describe, it, expect } from 'vitest';
import { pickRedirect, snippetSource } from './visitor-redirect.js';

const PUBLISHED = ['ru', 'en', 'es', 'de', 'fr', 'zh', 'pt'];
const base = {
  pathname: '/',
  languages: ['ru-RU'],
  stored: null,
  userAgent: 'Mozilla/5.0',
  published: PUBLISHED,
  canonical: 'ru',
};
const pick = (over) => pickRedirect({ ...base, ...over });

describe('pickRedirect', () => {
  it('уводит англичанина с корня на /en/', () => {
    expect(pick({ languages: ['en-US'] })).toBe('/en/');
  });

  it('схлопывает региональный вариант', () => {
    expect(pick({ languages: ['es-MX'] })).toBe('/es/');
    expect(pick({ languages: ['zh-Hans-CN'] })).toBe('/zh/');
    // Локаль европейская, но бразильцу португальский ближе английского.
    expect(pick({ languages: ['pt-BR'] })).toBe('/pt/');
  });

  it('русского оставляет на корне', () => {
    expect(pick({ languages: ['ru-RU'] })).toBeNull();
  });

  it('незнакомую локаль уводит в английский', () => {
    expect(pick({ languages: ['ko-KR'] })).toBe('/en/');
    expect(pick({ languages: ['ja-JP'] })).toBe('/en/');
  });

  it('берёт первый выпущенный язык из списка предпочтений', () => {
    // Кореец, у которого вторым стоит русский, русский и получает:
    // он сам объявил его приемлемым.
    expect(pick({ languages: ['ko-KR', 'ru'] })).toBeNull();
    expect(pick({ languages: ['ko-KR', 'de'] })).toBe('/de/');
  });

  it('молчит везде, кроме канонического корня', () => {
    expect(pick({ pathname: '/en/', languages: ['de-DE'] })).toBeNull();
    expect(pick({ pathname: '/es/', languages: ['de-DE'] })).toBeNull();
    expect(pick({ pathname: '/index.html', languages: ['de-DE'] })).toBe('/de/');
  });

  // РЕГРЕССИЯ: человек с английским браузером читал русскую страницу
  // ассистента, нажал «Главная» — и уезжал на /en/. Переход внутри сайта —
  // не новый визит.
  it('не уводит, если пришёл со своего же сайта', () => {
    expect(pick({ languages: ['en-US'], referrer: 'https://linkeon.io/assistants/raya/', host: 'linkeon.io' })).toBeNull();
    expect(pick({ languages: ['en-US'], referrer: 'http://localhost:4173/legal/offer/', host: 'localhost:4173' })).toBeNull();
    expect(pick({ languages: ['en-US'], referrer: 'https://LINKEON.io/', host: 'linkeon.io' })).toBeNull();
  });

  it('с чужого сайта и без реферера уводит, как раньше', () => {
    expect(pick({ languages: ['en-US'], referrer: 'https://www.google.com/', host: 'linkeon.io' })).toBe('/en/');
    // Другой хост — другой сайт, даже если домен наш: приложение, www.
    expect(pick({ languages: ['en-US'], referrer: 'https://my.linkeon.io/chat', host: 'linkeon.io' })).toBe('/en/');
    expect(pick({ languages: ['en-US'], referrer: 'https://linkeon.io.evil.com/', host: 'linkeon.io' })).toBe('/en/');
    expect(pick({ languages: ['en-US'], referrer: '', host: 'linkeon.io' })).toBe('/en/');
  });

  it('уважает явный выбор языка', () => {
    expect(pick({ languages: ['en-US'], stored: 'ru' })).toBeNull();
  });

  it('не трогает краулеров — корень остаётся каноническим русским', () => {
    for (const ua of [
      'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Mozilla/5.0 (compatible; YandexBot/3.0)',
      'Mozilla/5.0 (compatible; bingbot/2.0)',
    ]) {
      expect(pick({ languages: ['en-US'], userAgent: ua })).toBeNull();
    }
  });

  it('не предлагает невыпущенный язык', () => {
    expect(pick({ languages: ['zh-CN'], published: ['ru', 'en'] })).toBe('/en/');
  });

  it('пустой список языков уводит в английский', () => {
    // navigator.languages пуст — про посетителя не известно ничего,
    // международный дефолт лучше кириллицы.
    expect(pick({ languages: [] })).toBe('/en/');
  });
});

describe('snippetSource', () => {
  it('несёт в себе исходник pickRedirect и список выпущенных языков', () => {
    const src = snippetSource(PUBLISHED, 'ru');
    expect(src).toContain('pickRedirect');
    expect(src).toContain('"en"');
    expect(src).toContain('location.replace');
    expect(src).toContain('ll_lang_choice');
  });

  it('исполняется как валидный JS и уводит англичанина', () => {
    const replaced = [];
    const fakeLocation = { pathname: '/', search: '', hash: '', replace: (u) => replaced.push(u) };
    const fakeStorage = { getItem: () => null };
    const fakeNavigator = { languages: ['en-US'], language: 'en-US', userAgent: 'Mozilla/5.0' };
    const run = new Function('location', 'localStorage', 'navigator', snippetSource(PUBLISHED, 'ru'));
    run(fakeLocation, fakeStorage, fakeNavigator);
    expect(replaced).toEqual(['/en/']);
  });

  it('исполняясь на языковой версии, никуда не уводит', () => {
    const replaced = [];
    const fakeLocation = { pathname: '/en/', search: '', hash: '', replace: (u) => replaced.push(u) };
    const run = new Function('location', 'localStorage', 'navigator', snippetSource(PUBLISHED, 'ru'));
    run(fakeLocation, { getItem: () => null }, { languages: ['de-DE'], userAgent: 'Mozilla/5.0' });
    expect(replaced).toEqual([]);
  });

  // Тот же реферер — но через настоящий инлайн: исходник обязан читать
  // document.referrer и location.host сам.
  it('исполняясь после перехода внутри сайта, никуда не уводит', () => {
    const replaced = [];
    const fakeLocation = { pathname: '/', host: 'linkeon.io', search: '', hash: '', replace: (u) => replaced.push(u) };
    const run = new Function('location', 'localStorage', 'navigator', 'document', snippetSource(PUBLISHED, 'ru'));
    run(
      fakeLocation,
      { getItem: () => null },
      { languages: ['en-US'], userAgent: 'Mozilla/5.0' },
      { referrer: 'https://linkeon.io/assistants/raya/' },
    );
    expect(replaced).toEqual([]);

    run(
      fakeLocation,
      { getItem: () => null },
      { languages: ['en-US'], userAgent: 'Mozilla/5.0' },
      { referrer: 'https://www.google.com/' },
    );
    expect(replaced).toEqual(['/en/']);
  });

  it('переносит query и hash на языковую версию', () => {
    const replaced = [];
    const fakeLocation = {
      pathname: '/',
      search: '?utm_source=vk',
      hash: '#pricing',
      replace: (u) => replaced.push(u),
    };
    const run = new Function('location', 'localStorage', 'navigator', snippetSource(PUBLISHED, 'ru'));
    run(fakeLocation, { getItem: () => null }, { languages: ['de-DE'], userAgent: 'Mozilla/5.0' });
    expect(replaced).toEqual(['/de/?utm_source=vk#pricing']);
  });
});
