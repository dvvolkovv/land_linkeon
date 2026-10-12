import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';
import { pathSegments } from './pathSegments';

/**
 * Адрес калькулятора Human Design: `/calculators/human-design/`, остальные
 * языки — под префиксом. Канонический адрес — со слэшем (nginx на адрес без
 * слэша отвечает 301). Разбор принимает и без слэша, и явный index.html.
 *
 * Те же литералы — в scripts/site-urls.mjs; тест следит, чтобы совпадали.
 */
export const CALCULATORS_SEGMENT = 'calculators';
export const HD_CALC_SLUG = 'human-design';

/** null — не наш адрес. Выпущен ли калькулятор на языке — решает вызывающий (hasHdCalculator). */
export function parseHdCalcPath(pathname: string): { language: string } | null {
  const parts = pathSegments(pathname);
  const prefixed = SUPPORTED_CODES.includes(parts[0]);
  const language = prefixed ? parts[0] : DEFAULT_LANGUAGE;
  const rest = prefixed ? parts.slice(1) : parts;
  return rest.length === 2 && rest[0] === CALCULATORS_SEGMENT && rest[1] === HD_CALC_SLUG ? { language } : null;
}

export const hdCalcPath = (language: string): string =>
  `${language === DEFAULT_LANGUAGE ? '' : `/${language}`}/${CALCULATORS_SEGMENT}/${HD_CALC_SLUG}/`;
