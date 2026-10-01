/**
 * На каких языках выпускаются страницы ассистентов.
 *
 * Тексты лежат модулем на язык: src/content/assistants/pages/<код>.ts. Язык
 * выпускается, только если он выпущен у сайта (непустая локаль, см.
 * translated-languages.js) И у него есть модуль текстов. Иначе пришлось бы
 * отдавать русский текст под чужим <html lang> — ровно то, от чего защищает
 * translatedCodes(). Перевод доехал — язык включился сам, обычной пересборкой.
 *
 * Читают: vite.config.ts и vitest.config.ts (define для браузера),
 * scripts/prerender.mjs и тесты Playwright.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from './translated-languages.js';

const pagesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'assistants', 'pages');

export function assistantPageCodes() {
  const codes = translatedCodes().filter((code) => existsSync(join(pagesDir, `${code}.ts`)));
  if (!codes.includes(DEFAULT_LANGUAGE)) {
    throw new Error(
      `нет src/content/assistants/pages/${DEFAULT_LANGUAGE}.ts — у страниц ассистентов нет языка-источника`,
    );
  }
  return codes;
}
