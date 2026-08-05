import { SUPPORTED_LANGUAGES, type LanguageDef } from './languages';

/**
 * Языки, которые действительно выпущены: те из реестра, чья локаль на момент
 * сборки непуста. Всё, что язык предлагает пользователю (переключатель,
 * баннер) и всё, что публикуется наружу (страницы, hreflang, sitemap),
 * обязано опираться на этот список, а не на реестр целиком — иначе клик по
 * непереведённому языку приводит на русский текст под чужим языковым адресом.
 *
 * `__TRANSLATED_LANGUAGES__` подставляет vite.config.ts, вычисляя его из
 * содержимого src/i18n/locales. Заполнились локали — язык включился сам,
 * править код не нужно.
 */
export const TRANSLATED_LANGUAGES: LanguageDef[] = SUPPORTED_LANGUAGES.filter((lang) =>
  __TRANSLATED_LANGUAGES__.includes(lang.code),
);

export const TRANSLATED_CODES: string[] = TRANSLATED_LANGUAGES.map((lang) => lang.code);
