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

  // РЕГРЕССИЯ: parseValuesTestPath/parseHdCalcPath не срезают query и хеш —
  // с ними третий сегмент пути превращается в «values?utm=x» или «values#start»,
  // разбор не узнаёт адрес, возвращает null, и isSitePageReleased молча
  // откатывается к true. Абсолютный адрес ломается так же: первым сегментом
  // становится «https:».
  it('не путает хвост query/хеша и абсолютный адрес с третьим сегментом', () => {
    expect(isSitePageReleased('/de/tests/values/?utm=x')).toBe(false);
    expect(isSitePageReleased('/de/tests/values/#start')).toBe(false);
    expect(isSitePageReleased('https://linkeon.io/de/tests/values/')).toBe(false);
  });
});
