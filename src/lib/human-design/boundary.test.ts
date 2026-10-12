import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import ts from 'typescript';

/**
 * Граница модуля: второй этап возьмёт его на бэкенд (Node), поэтому здесь
 * нет браузерных API, React, сборочных трюков Vite и импортов из лендинга.
 * Разрешены только соседние файлы модуля и astronomy-engine.
 *
 * Комментарии вырезает TypeScript (removeComments), а не регулярка: строка
 * вида `const base = "https://x"; window.alert(1);` после `.replace(/\/\/.*$/gm, '')`
 * обрезалась бы вместе с запрещённым вызовом — регулярка не отличает `//` в
 * строке от начала комментария. TypeScript строки не трогает, только
 * комментарии. Самопроверка детектора — тест «не слепой» ниже.
 */
const FORBIDDEN =
  /\b(window|document|self|globalThis|process|require|localStorage|sessionStorage|navigator|fetch|React)\b|import\.meta/;

/** Код без комментариев; строковые литералы не трогает. */
function stripComments(src: string): string {
  return ts.transpileModule(src, {
    compilerOptions: { removeComments: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  }).outputText;
}

/** Детектор запрещённых имён — отдельная функция, чтобы проверить его на образце ниже. */
function findForbidden(src: string): RegExpMatchArray | null {
  return stripComments(src).match(FORBIDDEN);
}

const dir = new URL('./', import.meta.url);
const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  .map((f) => ({ file: f, code: readFileSync(new URL(f, dir), 'utf8') }));

describe('граница модуля human-design', () => {
  it('файлы на месте', () => {
    expect(sources.map((s) => s.file)).toContain('index.ts');
  });

  it('без браузерных API и React', () => {
    for (const { file, code } of sources) expect(findForbidden(code), file).toBeNull();
  });

  it('импорты — только свои файлы и astronomy-engine', () => {
    for (const { file, code } of sources) {
      const { importedFiles } = ts.preProcessFile(code, true, true);
      for (const { fileName: spec } of importedFiles) {
        expect(spec === 'astronomy-engine' || /^\.\/[\w-]+$/.test(spec), `${file}: ${spec}`).toBe(true);
      }
      expect(stripComments(code), `${file}: динамический импорт`).not.toMatch(/\bimport\(/);
    }
  });

  it('детектор не слепой к строке с «//»', () => {
    const sample = 'const base = "https://example.com"; window.alert(1);';
    expect(stripComments(sample)).toContain('window');
    expect(findForbidden(sample)).not.toBeNull();
  });
});
