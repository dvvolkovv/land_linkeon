import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_CODES,
  DEFAULT_LANGUAGE,
  VISITOR_FALLBACK,
  resolveLanguage,
} from './languages';

describe('реестр языков', () => {
  it('содержит те же шесть языков, что приложение', () => {
    expect(SUPPORTED_CODES).toEqual(['ru', 'en', 'es', 'de', 'fr', 'zh']);
  });

  it('язык по умолчанию — русский', () => {
    expect(DEFAULT_LANGUAGE).toBe('ru');
  });

  it('у каждого языка есть самоназвание и флаг', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.nativeName.length).toBeGreaterThan(0);
      expect(lang.flag.length).toBeGreaterThan(0);
    }
  });

  // og:locale проставляет пререндер каждой языковой версии; без значения в
  // реестре в head уехало бы content="undefined".
  it('у каждого языка есть og:locale вида xx_XX', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.ogLocale, lang.code).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    }
  });
});

describe('resolveLanguage', () => {
  it('схлопывает региональные теги до корня', () => {
    expect(resolveLanguage('es-MX')).toBe('es');
    expect(resolveLanguage('zh-Hans')).toBe('zh');
    expect(resolveLanguage('en_US')).toBe('en');
  });

  it('неподдерживаемое и пустое уводит в английский, а не в русский', () => {
    // Иначе португальцу, уехавшему на /en/, баннер предложит русский:
    // current='en', preferred=resolveLanguage('pt')='ru', языки не совпали.
    expect(resolveLanguage('ja')).toBe(VISITOR_FALLBACK);
    expect(resolveLanguage('pt-BR')).toBe('en');
    expect(resolveLanguage(null)).toBe('en');
    expect(resolveLanguage(undefined)).toBe('en');
    expect(resolveLanguage('')).toBe('en');
    expect(resolveLanguage('ja')).not.toBe(DEFAULT_LANGUAGE);
  });

  it('русский остаётся русским', () => {
    expect(resolveLanguage('ru')).toBe('ru');
    expect(resolveLanguage('ru-RU')).toBe('ru');
  });
});
