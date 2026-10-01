import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';
import { isAssistantSlug, type AssistantSlug } from '../content/assistants/roster';
import { pathSegments } from './pathSegments';

/**
 * Адреса раздела ассистентов: каталог `/assistants/` и страницы
 * `/assistants/<slug>/`. Русский живёт в корне, остальные языки под префиксом.
 *
 * Канонический адрес — СО слэшем. Страница лежит в dist/ каталогом с
 * index.html, и nginx на адрес без слэша отвечает 301 на версию со слэшем
 * (проверено на /legal/offer 01.10.2026). Canonical, ссылки и sitemap без
 * слэша указывали бы на редирект. Разбор принимает оба вида — и явный
 * `…/index.html` (см. pathSegments).
 */

/** Тот же литерал объявлен в scripts/site-urls.mjs — тест следит, чтобы совпадали. */
export const ASSISTANTS_SEGMENT = 'assistants';

export type AssistantRoute =
  | { language: string; kind: 'catalog' }
  | { language: string; kind: 'assistant'; slug: AssistantSlug };

/** null — не наш адрес: вызывающая сторона показывает обычный лендинг. */
export function parseAssistantPath(pathname: string): AssistantRoute | null {
  const parts = pathSegments(pathname);
  const prefixed = SUPPORTED_CODES.includes(parts[0]);
  const language = prefixed ? parts[0] : DEFAULT_LANGUAGE;
  const rest = prefixed ? parts.slice(1) : parts;
  if (rest[0] !== ASSISTANTS_SEGMENT) return null;
  if (rest.length === 1) return { language, kind: 'catalog' };
  if (rest.length === 2 && isAssistantSlug(rest[1])) {
    return { language, kind: 'assistant', slug: rest[1] };
  }
  return null;
}

const prefix = (language: string) => (language === DEFAULT_LANGUAGE ? '' : `/${language}`);

export const homePath = (language: string): string => `${prefix(language)}/`;

export const assistantsCatalogPath = (language: string): string =>
  `${prefix(language)}/${ASSISTANTS_SEGMENT}/`;

export const assistantPath = (language: string, slug: AssistantSlug): string =>
  `${prefix(language)}/${ASSISTANTS_SEGMENT}/${slug}/`;
