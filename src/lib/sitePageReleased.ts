import { hasHdCalculator } from '../content/hd/availability';
import { hasValuesTest } from '../content/values/availability';
import { parseHdCalcPath } from './hdRoute';
import { parseValuesTestPath } from './valuesRoute';

/**
 * Выпущена ли страница сайта по этому адресу. Тест ценностей и калькулятор
 * выходят по языкам; на невыпущенном языке их адреса нет — nginx отдал бы
 * туда SPA-фолбэк, то есть главную. Прочие адреса считаются существующими.
 */
export function isSitePageReleased(href: string): boolean {
  const values = parseValuesTestPath(href);
  if (values) return hasValuesTest(values.language);
  const hd = parseHdCalcPath(href);
  if (hd) return hasHdCalculator(hd.language);
  return true;
}
