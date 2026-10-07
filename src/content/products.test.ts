import { describe, expect, it } from 'vitest';
import { RENT_TOKENS, rentInterpolation, rentRubles } from './products';
import { PACKAGES } from './tokenPackages';
import { SUPPORTED_CODES } from '../i18n/languages';

describe('аренда продукта', () => {
  it('рубли считаются по цене стартового пакета', () => {
    const starter = PACKAGES.find((p) => p.id === 'starter')!;
    expect(rentRubles()).toBe(Math.round((RENT_TOKENS * starter.price) / starter.tokens));
  });

  // Сегодняшние числа. Упал — перечитайте тексты об аренде в секции «Сайты и
  // боты» и в FAQ на семи языках (слова вокруг чисел подобраны под 50 000 и
  // «до двух продуктов»), сверьте зеркала RENT_TOKENS в spirits_back и
  // spirits_front, потом обновите числа здесь.
  it('сегодня аренда — 50 000 токенов, по стартовому пакету 149 ₽', () => {
    expect(RENT_TOKENS).toBe(50_000);
    expect(rentRubles()).toBe(149);
  });

  // Строкой, а не через formattingLocale: иначе тест повторял бы реализацию
  // и не заметил бы, что pt снова ушёл в бразильское «50.000».
  const TOKENS: Record<string, string> = {
    ru: '50\u00a0000', en: '50,000', es: '50.000', de: '50.000',
    fr: '50\u202f000', zh: '50,000', pt: '50\u00a0000',
  };

  it('числа — в формате языка страницы, на всех языках реестра', () => {
    expect(Object.keys(TOKENS).sort()).toEqual([...SUPPORTED_CODES].sort());
    for (const code of SUPPORTED_CODES) expect(rentInterpolation(code).tokens, code).toBe(TOKENS[code]);
    expect(rentInterpolation('ru').price).toBe('149');
  });
});
