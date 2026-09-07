import { describe, it, expect } from 'vitest';
import { paper } from './paper.js';
import { brand } from './colors.js';

// Шкала «бумага» — единственная нейтраль тёплых секций. Тест держит три вещи:
// форму (все ступени на месте и валидны), точное совпадение с брендом (ловит
// только буквальный copy-paste чужого hex, не постепенный уход тона — для
// этого нужна была бы проверка по оттенку, её здесь нет) и контраст тёмных
// ступеней на бумажных фонах (AA для обычного текста).
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

  it('тёмные ступени держат AA-контраст на бумажных фонах', () => {
    // WCAG 2.x contrast: линеаризуем sRGB-каналы, взвешиваем по
    // 0.2126/0.7152/0.0722, затем (lighter + 0.05) / (darker + 0.05).
    // Наивная сумма каналов из теста выше годится только для сравнения
    // "темнее/светлее", но не для расчёта контраста — здесь её не переиспользуем.
    const linearize = (c: number) => {
      const s = c / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const relativeLuminance = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
    };
    const contrast = (hexA: string, hexB: string) => {
      const lA = relativeLuminance(hexA);
      const lB = relativeLuminance(hexB);
      const lighter = Math.max(lA, lB);
      const darker = Math.min(lA, lB);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const darkSteps = [600, 700, 800, 900];
    const backgrounds = [50, 100];
    for (const step of darkSteps) {
      for (const bg of backgrounds) {
        expect(
          contrast(paper[step], paper[bg]),
          `paper-${step} на paper-${bg}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
