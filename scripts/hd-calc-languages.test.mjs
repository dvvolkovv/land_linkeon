import { describe, expect, it } from 'vitest';
import { hdCalcCodes } from './hd-calc-languages.js';
import { translatedCodes } from './translated-languages.js';

describe('языки калькулятора Human Design', () => {
  it('русский выпущен', () => {
    expect(hdCalcCodes()).toContain('ru');
  });

  it('только из выпущенных языков сайта', () => {
    const site = translatedCodes();
    for (const code of hdCalcCodes()) expect(site).toContain(code);
  });
});
