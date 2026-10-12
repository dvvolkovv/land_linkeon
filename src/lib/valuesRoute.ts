import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';
import { pathSegments } from './pathSegments';

/**
 * Адрес теста ценностей: `/tests/values/`, остальные языки — под префиксом.
 * Канонический адрес — со слэшем (nginx на адрес без слэша отвечает 301).
 * Разбор принимает и без слэша, и явный index.html.
 *
 * Те же литералы — в scripts/site-urls.mjs; тест следит, чтобы совпадали.
 */
export const TESTS_SEGMENT = 'tests';
export const VALUES_TEST_SLUG = 'values';

/** null — не наш адрес. Выпущен ли тест на языке — решает вызывающий (hasValuesTest). */
export function parseValuesTestPath(pathname: string): { language: string } | null {
  const parts = pathSegments(pathname);
  const prefixed = SUPPORTED_CODES.includes(parts[0]);
  const language = prefixed ? parts[0] : DEFAULT_LANGUAGE;
  const rest = prefixed ? parts.slice(1) : parts;
  return rest.length === 2 && rest[0] === TESTS_SEGMENT && rest[1] === VALUES_TEST_SLUG ? { language } : null;
}

export const valuesTestPath = (language: string): string =>
  `${language === DEFAULT_LANGUAGE ? '' : `/${language}`}/${TESTS_SEGMENT}/${VALUES_TEST_SLUG}/`;
