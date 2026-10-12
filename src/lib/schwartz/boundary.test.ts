import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import ts from 'typescript';

/**
 * Граница модуля: чистый TypeScript — без браузерных API, React и импортов
 * из лендинга; только соседние файлы. Приём — как в human-design/boundary.test.ts:
 * комментарии вырезает TypeScript (removeComments), строки он не трогает,
 * поэтому `//` внутри строки не прячет код за собой.
 */
const FORBIDDEN =
  /\b(window|document|self|globalThis|process|require|localStorage|sessionStorage|navigator|fetch|React)\b|import\.meta/;

function stripComments(src: string): string {
  return ts.transpileModule(src, {
    compilerOptions: { removeComments: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  }).outputText;
}

const findForbidden = (src: string) => stripComments(src).match(FORBIDDEN);

const dir = new URL('./', import.meta.url);
const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  .map((f) => ({ file: f, code: readFileSync(new URL(f, dir), 'utf8') }));

describe('граница модуля schwartz', () => {
  it('файлы на месте', () => {
    expect(sources.map((s) => s.file)).toContain('index.ts');
  });

  it('без браузерных API и React', () => {
    for (const { file, code } of sources) expect(findForbidden(code), file).toBeNull();
  });

  it('импорты — только свои файлы', () => {
    for (const { file, code } of sources) {
      const { importedFiles } = ts.preProcessFile(code, true, true);
      for (const { fileName: spec } of importedFiles) expect(/^\.\/[\w-]+$/.test(spec), `${file}: ${spec}`).toBe(true);
      expect(stripComments(code), `${file}: динамический импорт`).not.toMatch(/\bimport\(/);
    }
  });

  it('детектор не слепой к строке с «//»', () => {
    const sample = 'const base = "https://example.com"; window.alert(1);';
    expect(findForbidden(sample)).not.toBeNull();
  });
});
