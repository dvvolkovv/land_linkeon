import { describe, expect, it } from 'vitest';
import { RENT_TOKENS, rentInterpolation, rentRubles } from './products';
import { PACKAGES } from './tokenPackages';

describe('аренда продукта', () => {
  it('рубли считаются по цене стартового пакета', () => {
    const starter = PACKAGES.find((p) => p.id === 'starter')!;
    expect(rentRubles()).toBe(Math.round((RENT_TOKENS * starter.price) / starter.tokens));
  });

  // Сегодняшние числа — чтобы правка аренды или прайса не прошла незамеченной:
  // в FAQ на семи языках есть слова, которые интерполяцией не выражаются.
  it('сегодня аренда — 50 000 токенов, по стартовому пакету 149 ₽', () => {
    expect(RENT_TOKENS).toBe(50_000);
    expect(rentRubles()).toBe(149);
  });

  it('числа — в формате языка страницы', () => {
    expect(rentInterpolation('ru').tokens).toBe('50\u00a0000');
    expect(rentInterpolation('en').tokens).toBe('50,000');
    expect(rentInterpolation('de').tokens).toBe('50.000');
    expect(rentInterpolation('zh').tokens).toBe('50,000');
    expect(rentInterpolation('ru').price).toBe('149');
  });
});
