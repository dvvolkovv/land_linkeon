import { describe, it, expect } from 'vitest';
import { SUPPORTED_LANGUAGES, SUPPORTED_CODES, DEFAULT_LANGUAGE, resolveLanguage } from './languages';

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

  it('неподдерживаемое и пустое уводит в язык по умолчанию', () => {
    expect(resolveLanguage('ja')).toBe('ru');
    expect(resolveLanguage(null)).toBe('ru');
    expect(resolveLanguage(undefined)).toBe('ru');
    expect(resolveLanguage('')).toBe('ru');
  });
});
