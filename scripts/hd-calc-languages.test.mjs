import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
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

  // Тесты выше проходят и на захардкоженном ['ru'] — они не отличают
  // вычисление от константы. Ниже — настоящий временный каталог с нуля на
  // каждый тест (mkdtempSync), доказывающий, что результат — пересечение
  // «язык сайта» ∩ «есть файл текстов», а не захардкоженный список.
  it('язык калькулятора — пересечение языков сайта и файлов текстов', () => {
    const other = translatedCodes().find((code) => code !== 'ru');
    const dir = mkdtempSync(join(tmpdir(), 'hd-calc-'));
    try {
      writeFileSync(join(dir, 'ru.ts'), '');
      writeFileSync(join(dir, `${other}.ts`), '');
      expect(hdCalcCodes(dir).sort()).toEqual(['ru', other].sort());
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('файл текстов на языке, которого нет у сайта, не считается', () => {
    const dir = mkdtempSync(join(tmpdir(), 'hd-calc-'));
    try {
      writeFileSync(join(dir, 'ru.ts'), '');
      writeFileSync(join(dir, 'xx.ts'), '');
      expect(hdCalcCodes(dir)).toEqual(['ru']);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('без текстов на русском — громкая ошибка, даже если есть другой язык', () => {
    const other = translatedCodes().find((code) => code !== 'ru');
    const dir = mkdtempSync(join(tmpdir(), 'hd-calc-'));
    try {
      writeFileSync(join(dir, `${other}.ts`), '');
      expect(() => hdCalcCodes(dir)).toThrow();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
