/**
 * Тест ценностей по Шварцу — публичный интерфейс модуля. Страница, черновик
 * Оле и тексты опираются только на него. Модуль — чистый TypeScript без
 * браузерных API (boundary.test.ts).
 */
export { AXES, AXIS_KEYS, HIGHER_ORDER_KEYS, VALUE_GROUP, VALUE_KEYS, valuesOf } from './values';
export type { AxisKey, AxisLean, HigherOrderKey, ValueKey } from './values';
export { ITEMS, ITEM_IDS } from './items';
export type { Item, ItemId } from './items';
export { ANSWER_MAX, ANSWER_MIN, BALANCE_THRESHOLD, FLAT_THRESHOLD, scoreAnswers } from './score';
export type { AxisResult, ValuesResult } from './score';
export { CIRCLE_CLAMP, GROUP_COLORS, renderValuesCircleSvg } from './circle';
