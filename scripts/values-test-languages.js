/**
 * На каких языках выпускается тест ценностей.
 *
 * Как у калькулятора Human Design (hd-calc-languages.js): язык выпущен у
 * сайта (непустая локаль) И у теста есть модуль текстов
 * src/content/values/texts/<код>.ts. Тексты на язык доехали — язык включился сам.
 *
 * Читают: vite.config.ts и vitest.config.ts (define для браузера),
 * scripts/prerender.mjs и тесты Playwright.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from './translated-languages.js';

const textsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'values', 'texts');

/** `dir` — только для тестов (временный каталог с файлами текстов); без аргумента — textsDir. */
export function valuesTestCodes(dir = textsDir) {
  const codes = translatedCodes().filter((code) => existsSync(join(dir, `${code}.ts`)));
  if (!codes.includes(DEFAULT_LANGUAGE)) {
    throw new Error(`нет src/content/values/texts/${DEFAULT_LANGUAGE}.ts — у теста ценностей нет языка-источника`);
  }
  return codes;
}
