import { describe, it, expect } from 'vitest';
import { brand } from './colors.js';

// Значения продублированы из spirits_front/tailwind.config.js (шкала forest).
// Тест существует, чтобы правка палитры лендинга «на глаз» не увела его
// от приложения молча: разъехались — падаем.
const APP_FOREST = {
  50: '#f7fdf7',
  100: '#edfaed',
  200: '#d3f4d3',
  300: '#aae8aa',
  400: '#75d675',
  500: '#4ade80',
  600: '#2dd4bf',
  700: '#0d9488',
  800: '#0f766e',
  900: '#134e4a',
};

describe('brand', () => {
  it('совпадает со шкалой forest приложения', () => {
    expect(brand).toEqual(APP_FOREST);
  });

  it('покрывает все ступени, которые использует лендинг', () => {
    for (const step of [50, 100, 200, 300, 500, 600, 700, 800, 900]) {
      expect(brand[step]).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
