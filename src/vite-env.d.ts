/// <reference types="vite/client" />

/**
 * Коды языков, чьи локали непусты на момент сборки. Подставляется литералом
 * через `define` в vite.config.ts — см. scripts/translated-languages.js.
 */
declare const __TRANSLATED_LANGUAGES__: string[];
