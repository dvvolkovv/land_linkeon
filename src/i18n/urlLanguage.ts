import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages';
import { hasAssistantPages } from '../content/assistants/availability';
import { ASSISTANTS_SEGMENT, assistantPath, assistantsCatalogPath, parseAssistantPath } from '../lib/assistantRoute';
import { pathSegments } from '../lib/pathSegments';

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
  const rest = pathSegments(pathname);
  const tail = SUPPORTED_CODES.includes(rest[0]) ? rest.slice(1) : rest;
  if (tail[0] === 'legal' && tail[1]) {
    return `${base}legal/${tail[1]}${search}${hash}`;
  }

  // Со страниц ассистентов — на ту же страницу (или в тот же каталог) на
  // другом языке. Но только если у целевого языка раздел вообще выпущен —
  // иначе такого адреса не существует (nginx отдал бы туда фолбэк), и
  // переключатель обязан вести на главную этого языка, как и для любого
  // другого раздела.
  //
  // Адрес страницы ассистента строится, только если путь разбирается как
  // страница известного ассистента (parseAssistantPath сверяет slug с
  // реестром); с /assistants/unknown/ или /assistants/raya/extra — в каталог
  // того же языка, а не на несуществующую страницу. Реестр здесь нужен ради
  // этой проверки; он маленький (roster.data.js) и в бандле главной всё равно
  // есть — его читает подвал.
  if (tail[0] === ASSISTANTS_SEGMENT && hasAssistantPages(language)) {
    const route = parseAssistantPath(pathname);
    const target =
      route?.kind === 'assistant' ? assistantPath(language, route.slug) : assistantsCatalogPath(language);
    return `${target}${search}${hash}`;
  }

  return `${base}${search}${hash}`;
}
