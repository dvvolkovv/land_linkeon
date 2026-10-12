import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { valuesTestCodes } from './values-test-languages.js';
import { translatedCodes } from './translated-languages.js';

describe('языки теста ценностей', () => {
  it('русский выпущен', () => {
    expect(valuesTestCodes()).toContain('ru');
  });

  it('только из выпущенных языков сайта', () => {
    const site = translatedCodes();
    for (const code of valuesTestCodes()) expect(site).toContain(code);
  });

  // Тесты выше проходят и на захардкоженном ['ru']. Здесь — временный каталог:
  // результат обязан быть пересечением «язык сайта» ∩ «есть файл текстов».
  it('язык теста — пересечение языков сайта и файлов текстов', () => {
    const other = translatedCodes().find((code) => code !== 'ru');
    const dir = mkdtempSync(join(tmpdir(), 'values-test-'));
    try {
      writeFileSync(join(dir, 'ru.ts'), '');
      writeFileSync(join(dir, `${other}.ts`), '');
      writeFileSync(join(dir, 'xx.ts'), '');
      expect(valuesTestCodes(dir).sort()).toEqual(['ru', other].sort());
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('без текстов на русском — громкая ошибка', () => {
    const other = translatedCodes().find((code) => code !== 'ru');
    const dir = mkdtempSync(join(tmpdir(), 'values-test-'));
    try {
      writeFileSync(join(dir, `${other}.ts`), '');
      expect(() => valuesTestCodes(dir)).toThrow();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
