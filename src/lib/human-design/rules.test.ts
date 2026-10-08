import { describe, expect, it } from 'vitest';
import type { Channel } from './bodygraph';
import { HD_STRATEGIES, HD_TYPES, STRATEGY_OF, definedCenters, definedChannels, hdAuthority, hdDefinition, hdType } from './rules';

/** Определённые каналы набора ворот — так их видят правила. */
const ch = (...gates: number[]): Channel[] => definedChannels(new Set(gates));

describe('определённые каналы и центры', () => {
  it('канал определён, только когда активны оба ворот', () => {
    expect(ch(20)).toEqual([]);
    expect(ch(20, 34)).toEqual([[20, 34]]);
    expect(ch(10, 20, 34, 57).map(([a, b]) => `${a}-${b}`)).toEqual(['10-20', '10-34', '10-57', '20-34', '20-57', '34-57']);
  });

  it('центры — концы определённых каналов, сверху вниз', () => {
    expect(definedCenters(ch(20, 34, 19, 49))).toEqual(['throat', 'solarPlexus', 'sacral', 'root']);
  });
});

describe('тип', () => {
  it('ни одного канала — Рефлектор', () => {
    expect(hdType(ch(1, 3, 5, 7, 9))).toBe('reflector');
  });

  it('сакрал без мотора к горлу — Генератор', () => {
    expect(hdType(ch(2, 14))).toBe('generator');
  });

  it('сакрал напрямую к горлу — Манифестирующий генератор', () => {
    expect(hdType(ch(20, 34))).toBe('manifestingGenerator');
  });

  // Мотор связан с горлом цепочкой: сакрал → G (2-14) → горло (1-8).
  it('сакрал к горлу через G — тоже Манифестирующий генератор', () => {
    expect(hdType(ch(2, 14, 1, 8))).toBe('manifestingGenerator');
  });

  it('сердце к горлу без сакрала — Манифестор', () => {
    expect(hdType(ch(21, 45))).toBe('manifestor');
  });

  it('корень к горлу через солнечное сплетение — Манифестор', () => {
    expect(hdType(ch(19, 49, 12, 22))).toBe('manifestor');
  });

  it('без сакрала и без мотора к горлу — Проектор', () => {
    expect(hdType(ch(1, 8))).toBe('projector');
    // Мотор есть (корень — сплетение), но к горлу не связан.
    expect(hdType(ch(19, 49, 47, 64))).toBe('projector');
  });
});

describe('авторитет — первый сверху', () => {
  it('солнечное сплетение главнее сакрала', () => {
    expect(hdAuthority(ch(6, 59))).toBe('emotional');
  });
  it('сакральный', () => {
    expect(hdAuthority(ch(2, 14))).toBe('sacral');
  });
  it('селезёночный', () => {
    expect(hdAuthority(ch(18, 58))).toBe('splenic');
  });
  it('эго — и через горло, и через G', () => {
    expect(hdAuthority(ch(21, 45))).toBe('ego');
    expect(hdAuthority(ch(25, 51))).toBe('ego');
  });
  it('самопроецированный — G к горлу', () => {
    expect(hdAuthority(ch(1, 8))).toBe('selfProjected');
  });
  it('ментальный — определены только голова, аджна, горло', () => {
    expect(hdAuthority(ch(47, 64, 17, 62))).toBe('mental');
  });
  it('у Рефлектора — лунный', () => {
    expect(hdAuthority(ch())).toBe('lunar');
  });
});

describe('определённость — число связных групп центров', () => {
  it('нет определённых центров', () => {
    expect(hdDefinition(ch())).toBe('none');
  });
  it('одна группа', () => {
    expect(hdDefinition(ch(20, 34, 2, 14))).toBe('single');
  });
  it('две группы', () => {
    expect(hdDefinition(ch(47, 64, 18, 58))).toBe('split');
  });
  it('три группы', () => {
    expect(hdDefinition(ch(47, 64, 18, 58, 25, 51))).toBe('triple');
  });
  it('четыре группы', () => {
    // голова–аджна, G–сердце, селезёнка–корень, сакрал–сплетение
    expect(hdDefinition(ch(47, 64, 25, 51, 18, 58, 6, 59))).toBe('quadruple');
  });
});

describe('стратегия', () => {
  it('у каждого типа своя', () => {
    expect(HD_TYPES.map((t) => STRATEGY_OF[t])).toEqual([...HD_STRATEGIES]);
  });
});
