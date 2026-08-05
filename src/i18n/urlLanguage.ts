import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages';

/**
 * Язык страницы = первый сегмент пути. Русский живёт в корне (`/`), остальные
 * под префиксом (`/en/`). Детектор навигатора в выборе НЕ участвует: иначе
 * содержимое разъезжается с URL и получается дублирующийся контент.
 */
export function languageFromPath(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return DEFAULT_LANGUAGE;
  return SUPPORTED_CODES.includes(segment) ? segment : DEFAULT_LANGUAGE;
}

/** Путь той же страницы на другом языке — для ссылок переключателя. */
export function pathForLanguage(
  language: string,
  _pathname: string,
  search = '',
  hash = '',
): string {
  const base = language === DEFAULT_LANGUAGE ? '/' : `/${language}/`;
  return `${base}${search}${hash}`;
}
