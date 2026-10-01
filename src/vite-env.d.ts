/// <reference types="vite/client" />

/**
 * Коды языков, чьи локали непусты на момент сборки. Подставляется литералом
 * через `define` в vite.config.ts — см. scripts/translated-languages.js.
 */
declare const __TRANSLATED_LANGUAGES__: string[];

/**
 * Коды языков, на которых есть тексты страниц ассистентов. Подставляется через
 * `define` — см. scripts/assistant-page-languages.js.
 */
declare const __ASSISTANT_PAGE_LANGUAGES__: string[];
