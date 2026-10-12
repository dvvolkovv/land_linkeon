/**
 * Десять базовых ценностей Шварца в порядке круга и их группы высшего
 * порядка. Порядок массива — порядок секторов на рисунке и правило ничьей
 * при расчёте (score.ts).
 */
export const VALUE_KEYS = [
  'selfDirection',
  'stimulation',
  'hedonism',
  'achievement',
  'power',
  'security',
  'conformity',
  'tradition',
  'benevolence',
  'universalism',
] as const;
export type ValueKey = (typeof VALUE_KEYS)[number];

export const HIGHER_ORDER_KEYS = ['openness', 'selfEnhancement', 'conservation', 'selfTranscendence'] as const;
export type HigherOrderKey = (typeof HIGHER_ORDER_KEYS)[number];

/** Гедонизм у Шварца стоит на границе открытости и самоутверждения — ни в одной группе. */
export const VALUE_GROUP: Record<ValueKey, HigherOrderKey | null> = {
  selfDirection: 'openness',
  stimulation: 'openness',
  hedonism: null,
  achievement: 'selfEnhancement',
  power: 'selfEnhancement',
  security: 'conservation',
  conformity: 'conservation',
  tradition: 'conservation',
  benevolence: 'selfTranscendence',
  universalism: 'selfTranscendence',
};

export const AXIS_KEYS = ['change', 'focus'] as const;
export type AxisKey = (typeof AXIS_KEYS)[number];
export type AxisLean = 'left' | 'right' | 'balance';

/** Две оси модели: левая группа против правой. */
export const AXES: Record<AxisKey, { left: HigherOrderKey; right: HigherOrderKey }> = {
  change: { left: 'openness', right: 'conservation' },
  focus: { left: 'selfTranscendence', right: 'selfEnhancement' },
};

export const valuesOf = (group: HigherOrderKey): ValueKey[] => VALUE_KEYS.filter((k) => VALUE_GROUP[k] === group);
