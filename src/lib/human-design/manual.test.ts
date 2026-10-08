import { describe, expect, it } from 'vitest';
import { calculateChart } from './chart';
import { HD_AUTHORITIES, HD_TYPES, type HdAuthority, type HdDefinition, type HdType } from './rules';

/**
 * Карты ручной сверки (спека, «Точность»). Эталон Swiss Ephemeris колесо ворот
 * и правила типа, авторитета, профиля и определённости не проверяет — у него
 * та же таблица. Эти десять карт посчитаны на двух независимых калькуляторах
 * каждая; подобраны scripts/hd-pick-manual.ts так, чтобы встретились все
 * типы, авторитеты и виды определённости. Данные рождения вымышленные.
 */
interface ManualChart {
  date: string;
  time: string;
  zone: string;
  expect: { type: HdType; authority: HdAuthority; profile: string; definition: HdDefinition; channels: string[] };
  /** Где сверено: два калькулятора, не наш код. */
  checkedWith: string[];
}

/** Когда сверено. */
const CHECKED_AT = '2026-10-08';

const MANUAL: ManualChart[] = [
  // Заполняется в Step 7: вывод scripts/hd-pick-manual.ts, сверенный
  // на двух сторонних калькуляторах.
];

describe(`карты ручной сверки (${CHECKED_AT})`, () => {
  it('десять карт: все типы, все авторитеты, каждая сверена дважды', () => {
    expect(MANUAL).toHaveLength(10);
    expect(new Set(MANUAL.map((m) => m.expect.type))).toEqual(new Set(HD_TYPES));
    expect(new Set(MANUAL.map((m) => m.expect.authority))).toEqual(new Set(HD_AUTHORITIES));
    for (const m of MANUAL) expect(m.checkedWith.length, `${m.date} ${m.time}`).toBeGreaterThanOrEqual(2);
  });

  for (const m of MANUAL) {
    it(`${m.date} ${m.time} ${m.zone}`, () => {
      const r = calculateChart({ date: m.date, time: m.time, zone: m.zone });
      expect(r.kind).toBe('ok');
      if (r.kind !== 'ok') return;
      const { type, authority, profile, definition, channels } = r.chart;
      expect({ type, authority, profile, definition, channels }).toEqual(m.expect);
    });
  }
});
