import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Граница модуля: второй этап возьмёт его на бэкенд (Node), поэтому здесь
 * нет браузерных API, React, сборочных трюков Vite и импортов из лендинга.
 * Разрешены только соседние файлы модуля и astronomy-engine.
 */
const dir = new URL('./', import.meta.url);
const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  .map((f) => ({
    file: f,
    // Комментарии не в счёт: «ни window, ни document» в пояснении — не код.
    code: readFileSync(new URL(f, dir), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, ''),
  }));

describe('граница модуля human-design', () => {
  it('файлы на месте', () => {
    expect(sources.map((s) => s.file)).toContain('index.ts');
  });

  it('без браузерных API и React', () => {
    const forbidden = /\b(window|document|localStorage|sessionStorage|navigator|fetch|React)\b|import\.meta/;
    for (const { file, code } of sources) expect(code, file).not.toMatch(forbidden);
  });

  it('импорты — только свои файлы и astronomy-engine', () => {
    for (const { file, code } of sources) {
      for (const [, spec] of code.matchAll(/from\s+'([^']+)'/g)) {
        expect(spec === 'astronomy-engine' || /^\.\/[\w-]+$/.test(spec), `${file}: ${spec}`).toBe(true);
      }
      expect(code, `${file}: динамический импорт`).not.toMatch(/\bimport\(/);
    }
  });
});
