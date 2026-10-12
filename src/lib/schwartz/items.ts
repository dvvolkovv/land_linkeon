import type { ValueKey } from './values';

export type ItemId = `${ValueKey}${1 | 2 | 3}`;
export interface Item {
  id: ItemId;
  value: ValueKey;
}

/**
 * 30 утверждений в порядке показа — одинаковом для всех. Три десятки: в
 * каждой все ценности по разу, на стыках десяток — разные, поэтому двух
 * утверждений одной ценности подряд нет (items.test.ts). Тексты — в
 * src/content/values/texts/<код>.ts по тем же id. Поменялся порядок —
 * поднять версию ключа прогресса (src/lib/valuesProgress.ts).
 */
export const ITEM_IDS: readonly ItemId[] = [
  'selfDirection1', 'power1', 'benevolence1', 'stimulation1', 'security1',
  'achievement1', 'universalism1', 'tradition1', 'hedonism1', 'conformity1',
  'achievement2', 'universalism2', 'selfDirection2', 'conformity2', 'stimulation2',
  'tradition2', 'power2', 'hedonism2', 'security2', 'benevolence2',
  'tradition3', 'stimulation3', 'power3', 'universalism3', 'hedonism3',
  'benevolence3', 'conformity3', 'selfDirection3', 'achievement3', 'security3',
];

export const ITEMS: readonly Item[] = ITEM_IDS.map((id) => ({ id, value: id.slice(0, -1) as ValueKey }));
