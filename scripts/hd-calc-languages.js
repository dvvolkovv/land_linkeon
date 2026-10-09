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
import { translatedCodes } from './translated-languages.js';

const textsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'hd', 'texts');

export function hdCalcCodes() {
  return translatedCodes().filter((code) => existsSync(join(textsDir, `${code}.ts`)));
}
