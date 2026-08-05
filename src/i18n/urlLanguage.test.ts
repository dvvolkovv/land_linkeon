import { describe, it, expect } from 'vitest';
import { languageFromPath, pathForLanguage } from './urlLanguage';

describe('languageFromPath', () => {
  it('корень — язык по умолчанию', () => {
    expect(languageFromPath('/')).toBe('ru');
    expect(languageFromPath('')).toBe('ru');
  });

  it('берёт язык из первого сегмента', () => {
    expect(languageFromPath('/en/')).toBe('en');
    expect(languageFromPath('/es')).toBe('es');
    expect(languageFromPath('/zh/')).toBe('zh');
  });

  it('неизвестный сегмент — язык по умолчанию', () => {
    expect(languageFromPath('/ja/')).toBe('ru');
    expect(languageFromPath('/pricing')).toBe('ru');
  });

  it('ru в пути не считается языковым префиксом: канонический ru — это корень', () => {
    expect(languageFromPath('/ru/')).toBe('ru');
  });
});

describe('pathForLanguage', () => {
  it('русский ведёт на корень', () => {
    expect(pathForLanguage('ru', '/en/')).toBe('/');
    expect(pathForLanguage('ru', '/')).toBe('/');
  });

  it('остальные — на свой префикс', () => {
    expect(pathForLanguage('es', '/')).toBe('/es/');
    expect(pathForLanguage('de', '/en/')).toBe('/de/');
  });

  it('сохраняет query и хеш', () => {
    expect(pathForLanguage('fr', '/en/', '?seg=biz', '#pricing')).toBe('/fr/?seg=biz#pricing');
    expect(pathForLanguage('ru', '/de/', '?utm_source=vk', '')).toBe('/?utm_source=vk');
  });
});
