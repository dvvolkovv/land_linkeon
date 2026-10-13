import { describe, expect, it } from 'vitest';
import { dashSeparator, joinAnd, joinClauses, joinComma, joinSentences } from './textJoin';

describe('склейка текста по языку', () => {
  it('ru: перечень с «и» — как прежняя склейка сообщения Оле', () => {
    expect(joinAnd(['самостоятельность'], 'ru')).toBe('самостоятельность');
    expect(joinAnd(['самостоятельность', 'стимуляция'], 'ru')).toBe('самостоятельность и стимуляция');
    expect(joinAnd(['а', 'б', 'в'], 'ru')).toBe('а, б и в');
  });

  it('союз и запятые — языка', () => {
    expect(joinAnd(['a', 'b', 'c'], 'en')).toBe('a, b and c');
    expect(joinAnd(['a', 'b', 'c'], 'de')).toBe('a, b und c');
    expect(joinAnd(['a', 'b', 'c'], 'fr')).toBe('a, b et c');
    expect(joinAnd(['a', 'b', 'c'], 'es')).toBe('a, b y c');
    expect(joinAnd(['a', 'b', 'c'], 'pt')).toBe('a, b e c');
    expect(joinAnd(['自我导向', '刺激', '仁慈'], 'zh')).toBe('自我导向、刺激和仁慈');
    expect(joinAnd(['甲', '乙'], 'zh')).toBe('甲和乙');
  });

  it('без Intl.ListFormat (Safari до 14.1) — перечень без союза, без исключения', () => {
    const saved = Object.getOwnPropertyDescriptor(Intl, 'ListFormat')!;
    Reflect.deleteProperty(Intl, 'ListFormat');
    try {
      expect(joinAnd(['а', 'б', 'в'], 'ru')).toBe('а, б, в');
      expect(joinAnd(['甲', '乙'], 'zh')).toBe('甲、乙');
    } finally {
      Object.defineProperty(Intl, 'ListFormat', saved);
    }
  });

  it('перечень без союза', () => {
    expect(joinComma(['Доброта', 'Универсализм'], 'ru')).toBe('Доброта, Универсализм');
    expect(joinComma(['仁慈', '普世主义'], 'zh')).toBe('仁慈、普世主义');
  });

  it('части фразы через точку с запятой и предложения подряд', () => {
    expect(joinClauses(['Раз', 'два'], 'ru')).toBe('Раз; два');
    expect(joinClauses(['甲', '乙'], 'zh')).toBe('甲；乙');
    expect(joinClauses(['a', 'b'], 'fr')).toBe('a\u00A0; b');
    expect(joinSentences(['One.', 'Two.'], 'en')).toBe('One. Two.');
    expect(joinSentences(['一。', '二。'], 'zh')).toBe('一。二。');
  });

  it('тире между названием и пояснением: в zh «——» без пробелов', () => {
    expect(dashSeparator('ru')).toBe(' — ');
    expect(dashSeparator('zh')).toBe('——');
  });
});
