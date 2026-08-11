import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_CODES,
  DEFAULT_LANGUAGE,
  VISITOR_FALLBACK,
  resolveLanguage,
  formattingLocale,
} from './languages';

describe('реестр языков', () => {
  it('содержит те же семь языков, что приложение', () => {
    expect(SUPPORTED_CODES).toEqual(['ru', 'en', 'es', 'de', 'fr', 'zh', 'pt']);
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

describe('formattingLocale', () => {
  // Голый `pt` в CLDR — бразильские соглашения: цена пакета выходила «50.000»
  // вместо европейского «50 000». Витрина заведена как Portugal, так что это
  // такой же бразилизм, как «usuário» в тексте.
  it('европейскому португальскому даёт разряды пробелом, а не точкой', () => {
    expect(formattingLocale('pt')).toBe('pt-PT');
    expect((50000).toLocaleString(formattingLocale('pt'))).toBe('50 000');
    expect((50000).toLocaleString('pt')).toBe('50.000'); // так было до починки
  });

  it('остальным языкам форматирование не меняет', () => {
    // Регион добавляется всем, но результат обязан совпасть с прежним
    // (форматированием по голому коду) — иначе это уже не починка pt,
    // а тихая смена цен на шести других страницах.
    for (const code of SUPPORTED_CODES.filter((c) => c !== 'pt')) {
      expect((50000).toLocaleString(formattingLocale(code)), code).toBe(
        (50000).toLocaleString(code),
      );
    }
  });
});

describe('resolveLanguage', () => {
  it('схлопывает региональные теги до корня', () => {
    expect(resolveLanguage('es-MX')).toBe('es');
    expect(resolveLanguage('zh-Hans')).toBe('zh');
    expect(resolveLanguage('en_US')).toBe('en');
    // Локаль у нас европейская (pt-PT), но код в реестре голый `pt`, и
    // бразилец схлопывается в него же: португальский текст ему понятнее
    // английского, а отдельной pt-BR-локали не существует.
    expect(resolveLanguage('pt-BR')).toBe('pt');
  });

  it('неподдерживаемое и пустое уводит в английский, а не в русский', () => {
    // Иначе японцу, уехавшему на /en/, баннер предложит русский:
    // current='en', preferred=resolveLanguage('ja')='ru', языки не совпали.
    expect(resolveLanguage('ja')).toBe(VISITOR_FALLBACK);
    expect(resolveLanguage('ko-KR')).toBe('en');
    expect(resolveLanguage(null)).toBe('en');
    expect(resolveLanguage(undefined)).toBe('en');
    expect(resolveLanguage('')).toBe('en');
    expect(resolveLanguage('ja')).not.toBe(DEFAULT_LANGUAGE);
  });

  it('незнакомый и пустой тег форматируется по языку-фолбэку', () => {
    expect(formattingLocale('ja')).toBe('en-US');
    expect(formattingLocale(null)).toBe('en-US');
    expect(formattingLocale('')).toBe('en-US');
  });

  it('русский остаётся русским', () => {
    expect(resolveLanguage('ru')).toBe('ru');
    expect(resolveLanguage('ru-RU')).toBe('ru');
  });
});
