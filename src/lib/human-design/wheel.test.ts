import { describe, expect, it } from 'vitest';
import { GATE_ORDER, LINE_SPAN, WHEEL_START, gateLine, minutesToLineBoundary, normalizeDegrees } from './wheel';

describe('колесо ворот', () => {
  it('64 разных ворот, каждые ровно один раз', () => {
    expect(GATE_ORDER).toHaveLength(64);
    expect([...GATE_ORDER].sort((a, b) => a - b)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });

  it('41-е ворота начинаются на 302°', () => {
    expect(gateLine(WHEEL_START)).toEqual({ gate: 41, line: 1 });
    expect(gateLine(WHEEL_START - 1e-9)).toEqual({ gate: 60, line: 6 });
  });

  // Опорные точки — из независимых таблиц градусов (см. комментарий в wheel.ts):
  // 25-е ворота стоят на точке весеннего равноденствия, 15-е — на летнем
  // солнцестоянии, 46-е — на осеннем равноденствии, 10-е — на зимнем.
  it('ворота на точках равноденствий и солнцестояний', () => {
    expect(gateLine(0).gate).toBe(25);
    expect(gateLine(90).gate).toBe(15);
    expect(gateLine(180).gate).toBe(46);
    expect(gateLine(270).gate).toBe(10);
  });

  it('начала ворот по таблице градусов', () => {
    // 27-е — 2°00′ Тельца, 31-е — 2°00′ Льва, 28-е — 2°00′ Скорпиона.
    expect(gateLine(32)).toEqual({ gate: 27, line: 1 });
    expect(gateLine(122)).toEqual({ gate: 31, line: 1 });
    expect(gateLine(212)).toEqual({ gate: 28, line: 1 });
    // 20-е — 0°07′30″ Близнецов.
    expect(gateLine(60.125)).toEqual({ gate: 20, line: 1 });
    expect(gateLine(60.124)).toEqual({ gate: 8, line: 6 });
  });

  it('шесть линий по 56′15″', () => {
    expect(LINE_SPAN).toBe(0.9375);
    for (let line = 1; line <= 6; line++) {
      expect(gateLine(WHEEL_START + (line - 1) * LINE_SPAN + 0.0001)).toEqual({ gate: 41, line });
    }
    expect(gateLine(WHEEL_START + 6 * LINE_SPAN)).toEqual({ gate: 19, line: 1 });
  });

  it('долгота за пределами 0–360 приводится', () => {
    expect(normalizeDegrees(-1)).toBe(359);
    expect(normalizeDegrees(721)).toBe(1);
    expect(gateLine(-58)).toEqual(gateLine(302));
  });

  it('расстояние до границы линии', () => {
    expect(minutesToLineBoundary(WHEEL_START)).toBe(0);
    expect(minutesToLineBoundary(WHEEL_START + LINE_SPAN / 2)).toBeCloseTo(28.125, 6);
    expect(minutesToLineBoundary(WHEEL_START + LINE_SPAN - 1 / 60)).toBeCloseTo(1, 6);
  });
});
