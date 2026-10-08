import { describe, expect, it } from 'vitest';
import { CENTER_GATES, CENTER_IDS, CHANNELS, GATE_CENTER, MOTORS, channelKey } from './bodygraph';

describe('устройство бодиграфа', () => {
  it('каждые из 64 ворот — ровно в одном центре', () => {
    const all = CENTER_IDS.flatMap((c) => CENTER_GATES[c]);
    expect(all).toHaveLength(64);
    expect(new Set(all).size).toBe(64);
  });

  it('число ворот по центрам', () => {
    const counts = Object.fromEntries(CENTER_IDS.map((c) => [c, CENTER_GATES[c].length]));
    expect(counts).toEqual({ head: 3, ajna: 6, throat: 11, g: 8, heart: 4, spleen: 7, solarPlexus: 7, sacral: 9, root: 9 });
  });

  it('36 разных каналов, меньшие ворота первыми', () => {
    expect(CHANNELS).toHaveLength(36);
    expect(new Set(CHANNELS.map(channelKey)).size).toBe(36);
    for (const [a, b] of CHANNELS) expect(a).toBeLessThan(b);
  });

  it('канал соединяет два разных центра', () => {
    for (const [a, b] of CHANNELS) {
      expect(GATE_CENTER[a], `${a}`).toBeDefined();
      expect(GATE_CENTER[b], `${b}`).toBeDefined();
      expect(GATE_CENTER[a], channelKey([a, b])).not.toBe(GATE_CENTER[b]);
    }
  });

  // Пары центров — по схеме бодиграфа; ошибка в одном номере ворот перекинула
  // бы канал в чужой центр, и тип посчитался бы неверно.
  it('известные каналы ведут куда надо', () => {
    const between = (a: number, b: number) => [GATE_CENTER[a], GATE_CENTER[b]].sort().join('–');
    expect(between(20, 34)).toBe('sacral–throat');
    expect(between(21, 45)).toBe('heart–throat');
    expect(between(25, 51)).toBe('g–heart');
    expect(between(6, 59)).toBe('sacral–solarPlexus');
    expect(between(10, 57)).toBe('g–spleen');
    expect(between(47, 64)).toBe('ajna–head');
    expect(between(19, 49)).toBe('root–solarPlexus');
  });

  it('моторы — сакрал, солнечное сплетение, сердце, корень', () => {
    expect([...MOTORS].sort()).toEqual(['heart', 'root', 'sacral', 'solarPlexus']);
  });
});
