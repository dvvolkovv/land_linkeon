/**
 * Типизированный вход в реестр языков для кода приложения.
 *
 * Сами данные лежат в languages.data.js — их же напрямую читают node-скрипты
 * сборки (prerender.mjs, check-locales.mjs, vite.config.ts), которым
 * TypeScript недоступен. Здесь только реэкспорт с типами и логика.
 */
export type { LanguageDef } from './languages.data.js';
export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SUPPORTED_CODES } from './languages.data.js';

import { SUPPORTED_CODES } from './languages.data.js';

/**
 * Язык для посетителя, чьей локали у нас нет (pt, uk, ja…). Не
 * DEFAULT_LANGUAGE: у русского здесь другая роль — канонический корень сайта
 * и источник переводов. Одна константа на две роли означала бы кириллицу
 * португальцу просто потому, что русский первый в реестре.
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
