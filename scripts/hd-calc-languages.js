/**
 * На каких языках выпускается калькулятор Human Design.
 *
 * Как у страниц ассистентов (assistant-page-languages.js): язык выпущен у
 * сайта (непустая локаль) И у калькулятора есть модуль текстов
 * src/content/hd/texts/<код>.ts. Тексты на язык доехали — язык включился сам.
 *
 * Читают: vite.config.ts и vitest.config.ts (define для браузера),
 * scripts/prerender.mjs и тесты Playwright.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from './translated-languages.js';

const textsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'hd', 'texts');

/** `dir` — только для тестов (временный каталог с файлами текстов); без аргумента — textsDir. */
export function hdCalcCodes(dir = textsDir) {
  const codes = translatedCodes().filter((code) => existsSync(join(dir, `${code}.ts`)));
  if (!codes.includes(DEFAULT_LANGUAGE)) {
    throw new Error(
      `нет src/content/hd/texts/${DEFAULT_LANGUAGE}.ts — у калькулятора Human Design нет языка-источника`,
    );
  }
  return codes;
}
