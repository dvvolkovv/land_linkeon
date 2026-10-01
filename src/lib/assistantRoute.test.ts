import { describe, expect, it } from 'vitest';
import {
  ASSISTANTS_SEGMENT,
  assistantPath,
  assistantsCatalogPath,
  homePath,
  parseAssistantPath,
} from './assistantRoute';
import { ASSISTANTS_SEGMENT as SITE_SEGMENT } from '../../scripts/site-urls.mjs';

describe('parseAssistantPath', () => {
  it('каталог — со слэшем и без', () => {
    expect(parseAssistantPath('/assistants/')).toEqual({ language: 'ru', kind: 'catalog' });
    expect(parseAssistantPath('/assistants')).toEqual({ language: 'ru', kind: 'catalog' });
    expect(parseAssistantPath('/en/assistants/')).toEqual({ language: 'en', kind: 'catalog' });
  });

  it('страница ассистента — русский в корне, остальные под префиксом', () => {
    expect(parseAssistantPath('/assistants/raya')).toEqual({ language: 'ru', kind: 'assistant', slug: 'raya' });
    expect(parseAssistantPath('/zh/assistants/alexey')).toEqual({ language: 'zh', kind: 'assistant', slug: 'alexey' });
  });

  // РЕГРЕССИЯ: nginx отдаёт пререндеренную страницу и по явному адресу файла,
  // а разбор считал его «не нашим» — и клиент рисовал поверх неё главную.
  it('явный index.html — та же страница', () => {
    expect(parseAssistantPath('/assistants/raya/index.html')).toEqual({ language: 'ru', kind: 'assistant', slug: 'raya' });
    expect(parseAssistantPath('/en/assistants/alexey/index.html')).toEqual({ language: 'en', kind: 'assistant', slug: 'alexey' });
    expect(parseAssistantPath('/assistants/index.html')).toEqual({ language: 'ru', kind: 'catalog' });
    expect(parseAssistantPath('/de/assistants/index.html')).toEqual({ language: 'de', kind: 'catalog' });
    // Срезается только хвост: index.html в середине — по-прежнему лишний сегмент.
    expect(parseAssistantPath('/assistants/index.html/raya')).toBeNull();
    expect(parseAssistantPath('/index.html')).toBeNull();
  });

  // Незнакомый ассистент не должен рисовать чужую страницу — пусть будет главная.
  it('незнакомый ассистент, лишний сегмент, чужой префикс — не наш адрес', () => {
    expect(parseAssistantPath('/assistants/german')).toBeNull();
    expect(parseAssistantPath('/assistants/raya/extra')).toBeNull();
    expect(parseAssistantPath('/xx/assistants/raya')).toBeNull();
  });

  it('прочие адреса — не наш адрес', () => {
    expect(parseAssistantPath('/')).toBeNull();
    expect(parseAssistantPath('/en/')).toBeNull();
    expect(parseAssistantPath('/legal/offer')).toBeNull();
  });
});

describe('сборка адресов', () => {
  it('русский в корне, остальные под префиксом', () => {
    expect(assistantsCatalogPath('ru')).toBe('/assistants/');
    expect(assistantsCatalogPath('de')).toBe('/de/assistants/');
    // Со слэшем: nginx отдаёт каталог с index.html по адресу со слэшем, а на
    // адрес без слэша отвечает 301 (так уже ведут себя /legal/offer).
    expect(assistantPath('ru', 'raya')).toBe('/assistants/raya/');
    expect(assistantPath('pt', 'olia')).toBe('/pt/assistants/olia/');
    expect(homePath('ru')).toBe('/');
    expect(homePath('fr')).toBe('/fr/');
  });

  it('разбор и сборка сходятся', () => {
    for (const path of ['/assistants/raya/', '/en/assistants/alexey/', '/fr/assistants/kira/']) {
      const route = parseAssistantPath(path);
      expect(route?.kind).toBe('assistant');
      if (route?.kind === 'assistant') expect(assistantPath(route.language, route.slug)).toBe(path);
    }
  });

  // Сегмент записан в двух местах (здесь и в scripts/site-urls.mjs, который
  // читают пререндер и тест sitemap) — разъехаться им нельзя.
  it('сегмент тот же, что у генератора sitemap', () => {
    expect(ASSISTANTS_SEGMENT).toBe(SITE_SEGMENT);
  });
});
