import { hasHdCalculator } from '../content/hd/availability';
import { hasValuesTest } from '../content/values/availability';
import { parseHdCalcPath } from './hdRoute';
import { parseValuesTestPath } from './valuesRoute';

/**
 * Выпущена ли страница сайта по этому адресу. Тест ценностей и калькулятор
 * выходят по языкам; на невыпущенном языке их адреса нет — nginx отдал бы
 * туда SPA-фолбэк, то есть главную. Прочие адреса считаются существующими.
 *
 * href берётся из heroLink/faq.link текстов и может прийти с query/хешем или
 * абсолютным адресом — parseValuesTestPath/parseHdCalcPath разбирают только
 * сегменты pathname, поэтому хвост сначала срезается через URL().
 */
export function isSitePageReleased(href: string): boolean {
  const path = new URL(href, 'https://linkeon.io').pathname;
  const values = parseValuesTestPath(path);
  if (values) return hasValuesTest(values.language);
  const hd = parseHdCalcPath(path);
  if (hd) return hasHdCalculator(hd.language);
  return true;
}
