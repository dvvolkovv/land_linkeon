import { describe, expect, it } from 'vitest';
import { assistantUrlFor, assistantsCatalogUrlFor, hdCalcUrlFor, sitemapUrls } from './site-urls.mjs';

describe('адреса раздела ассистентов', () => {
  it('русский в корне, остальные под префиксом', () => {
    expect(assistantsCatalogUrlFor('ru', 'ru')).toBe('https://linkeon.io/assistants/');
    expect(assistantsCatalogUrlFor('en', 'ru')).toBe('https://linkeon.io/en/assistants/');
    expect(assistantUrlFor('ru', 'raya', 'ru')).toBe('https://linkeon.io/assistants/raya/');
    expect(assistantUrlFor('de', 'raya', 'ru')).toBe('https://linkeon.io/de/assistants/raya/');
  });

  it('в sitemap — каталог и страницы только тех языков, где они есть', () => {
    const urls = sitemapUrls(['ru', 'en'], 'ru', { codes: ['ru'], slugs: ['raya', 'olia'] });
    expect(urls).toContain('https://linkeon.io/assistants/');
    expect(urls).toContain('https://linkeon.io/assistants/raya/');
    expect(urls).toContain('https://linkeon.io/assistants/olia/');
    expect(urls.some((u) => u.includes('/en/assistants'))).toBe(false);
  });

  it('без раздела ассистентов sitemap прежний', () => {
    expect(sitemapUrls(['ru'], 'ru')).toEqual(sitemapUrls(['ru'], 'ru', { codes: [], slugs: [] }));
  });
});

describe('адрес калькулятора Human Design', () => {
  it('со слэшем, русский в корне', () => {
    expect(hdCalcUrlFor('ru', 'ru')).toBe('https://linkeon.io/calculators/human-design/');
    expect(hdCalcUrlFor('en', 'ru')).toBe('https://linkeon.io/en/calculators/human-design/');
  });

  it('в sitemap — только на языках калькулятора', () => {
    const urls = sitemapUrls(['ru', 'en'], 'ru', { codes: [], slugs: [] }, { codes: ['ru'] });
    expect(urls).toContain('https://linkeon.io/calculators/human-design/');
    expect(urls.some((u) => u.includes('/en/calculators/'))).toBe(false);
  });
});
