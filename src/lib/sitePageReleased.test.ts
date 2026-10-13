import { describe, expect, it, vi } from 'vitest';
import { isSitePageReleased } from './sitePageReleased';

vi.mock('../content/values/availability', () => ({
  hasValuesTest: (code: string) => code === 'ru' || code === 'en',
}));
vi.mock('../content/hd/availability', () => ({
  hasHdCalculator: (code: string) => code === 'ru',
}));

describe('выпущена ли страница сайта', () => {
  it('тест ценностей — по языку адреса', () => {
    expect(isSitePageReleased('/tests/values/')).toBe(true);
    expect(isSitePageReleased('/en/tests/values/')).toBe(true);
    expect(isSitePageReleased('/de/tests/values/')).toBe(false);
  });

  it('калькулятор — по языку адреса', () => {
    expect(isSitePageReleased('/calculators/human-design/')).toBe(true);
    expect(isSitePageReleased('/en/calculators/human-design/')).toBe(false);
  });

  it('прочие адреса не проверяются', () => {
    expect(isSitePageReleased('/assistants/olia/')).toBe(true);
  });
});
