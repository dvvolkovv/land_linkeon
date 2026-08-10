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
  pathname: string,
  search = '',
  hash = '',
): string {
  const base = language === DEFAULT_LANGUAGE ? '/' : `/${language}/`;

  // Со страниц юридических документов переключатель обязан вести на тот же
  // документ, а не на главную: иначе человек, читавший политику по-английски,
  // при смене языка теряет место и оказывается на лендинге.
  const rest = pathname.split('/').filter(Boolean);
  const tail = SUPPORTED_CODES.includes(rest[0]) ? rest.slice(1) : rest;
  if (tail[0] === 'legal' && tail[1]) {
    return `${base}legal/${tail[1]}${search}${hash}`;
  }

  return `${base}${search}${hash}`;
}
