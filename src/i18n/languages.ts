/**
 * Типизированный вход в реестр языков для кода приложения.
 *
 * Сами данные лежат в languages.data.js — их же напрямую читают node-скрипты
 * сборки (prerender.mjs, check-locales.mjs, vite.config.ts), которым
 * TypeScript недоступен. Здесь только реэкспорт с типами и логика.
 */
export type { LanguageDef } from './languages.data.js';
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SUPPORTED_CODES } from './languages.data.js';

import { SUPPORTED_CODES, SUPPORTED_LANGUAGES } from './languages.data.js';

/**
 * Язык для посетителя, чьей локали у нас нет (uk, ja, ko…). Не
 * DEFAULT_LANGUAGE: у русского здесь другая роль — канонический корень сайта
 * и источник переводов. Одна константа на две роли означала бы кириллицу
 * японцу просто потому, что русский первый в реестре.
 */
export const VISITOR_FALLBACK = 'en';

/**
 * Схлопывает произвольный тег языка до поддерживаемого корня.
 * navigator.language отдаёт es-MX / zh-Hans, профиль может отдать что угодно.
 */
export function resolveLanguage(raw?: string | null): string {
  if (!raw) return VISITOR_FALLBACK;
  const root = raw.toLowerCase().split(/[-_]/)[0];
  return SUPPORTED_CODES.includes(root) ? root : VISITOR_FALLBACK;
}

/**
 * Тег с регионом для Intl (`toLocaleString`, форматирование чисел и дат).
 *
 * Голого кода языка недостаточно. В CLDR базовый `pt` несёт БРАЗИЛЬСКИЕ
 * соглашения, и на европейской странице цена выходила «50.000» вместо
 * «50 000» — ровно тот бразилизм, которого локаль избегает в тексте.
 * Регион уже лежит в реестре (`ogLocale`), поэтому второй таблицы соответствий
 * не заводим: `pt` → `pt-PT`. Для остальных шести языков результат
 * посимвольно совпадает с прежним (проверено в languages.test.ts), так что
 * это не смена формата, а починка одного языка.
 */
export function formattingLocale(language?: string | null): string {
  const root = (language ?? '').toLowerCase().split(/[-_]/)[0];
  const known = SUPPORTED_LANGUAGES.find((lang) => lang.code === root);
  const fallback = SUPPORTED_LANGUAGES.find((lang) => lang.code === VISITOR_FALLBACK);
  return (known ?? fallback)!.ogLocale.replace('_', '-');
}
