import { describe, expect, it } from 'vitest';
import { ITEMS, ITEM_IDS, VALUE_KEYS } from './index';

describe('утверждения теста', () => {
  it('30 штук, по три на каждую ценность', () => {
    expect(ITEMS).toHaveLength(30);
    for (const key of VALUE_KEYS) expect(ITEMS.filter((i) => i.value === key), key).toHaveLength(3);
  });

  it('id — ценность и номер 1–3, без повторов; ITEM_IDS — тот же порядок', () => {
    expect(new Set(ITEM_IDS).size).toBe(30);
    for (const item of ITEMS) expect(item.id).toMatch(new RegExp(`^${item.value}[123]$`));
    expect(ITEMS.map((i) => i.id)).toEqual([...ITEM_IDS]);
  });

  it('двух утверждений одной ценности подряд нет', () => {
    for (let i = 1; i < ITEMS.length; i += 1) {
      expect(ITEMS[i].value, `${ITEMS[i - 1].id} → ${ITEMS[i].id}`).not.toBe(ITEMS[i - 1].value);
    }
  });

  it('в каждой десятке — все ценности по разу', () => {
    for (let round = 0; round < 3; round += 1) {
      const values = ITEMS.slice(round * 10, round * 10 + 10).map((i) => i.value);
      expect([...values].sort(), `десятка ${round + 1}`).toEqual([...VALUE_KEYS].sort());
    }
  });
});
