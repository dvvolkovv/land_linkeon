import { describe, it, expect } from 'vitest';
import { paper } from './paper.js';
import { brand } from './colors.js';

// Шкала «бумага» — единственная нейтраль тёплых секций. Тест держит две вещи:
// форму (все ступени на месте и валидны) и границу с брендом (кремовый фон не
// должен незаметно превратиться в зелёный или наоборот).
describe('paper', () => {
  it('покрывает все ступени валидными hex-значениями', () => {
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
      expect(paper[step], `ступень ${step}`).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('светлеет от 900 к 50', () => {
    const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    for (let i = 1; i < steps.length; i++) {
      expect(lum(paper[steps[i]]), `${steps[i]} темнее ${steps[i - 1]}`).toBeLessThan(lum(paper[steps[i - 1]]));
    }
  });

  it('не пересекается с бренд-шкалой', () => {
    const brandValues = new Set(Object.values(brand));
    for (const value of Object.values(paper)) {
      expect(brandValues.has(value), `${value} есть и в brand`).toBe(false);
    }
  });
});
