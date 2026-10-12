import { describe, expect, it } from 'vitest';
import { ITEMS, VALUE_KEYS, renderValuesCircleSvg, scoreAnswers, type ValueKey } from './index';
import { CIRCLE, labelLayout, sectorRadius } from './circle';

const LABELS = Object.fromEntries(VALUE_KEYS.map((k) => [k, k])) as Record<ValueKey, string>;
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

/** Радиусы секторов в порядке круга: сектор — путь из центра. */
const sectorRadii = (svg: string) =>
  [...svg.matchAll(/<path d="M 260 210 L [\d.-]+ [\d.-]+ A ([\d.]+) /g)].map((m) => Number(m[1]));

describe('круг ценностей', () => {
  const result = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));

  it('самостоятельный SVG: пространство имён, 10 секторов, 10 подписей', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(sectorRadii(svg)).toHaveLength(10);
    expect((svg.match(/<text /g) ?? []).length).toBe(10);
  });

  it('длина сектора — балл: ведущие длиннее, наименее важная короче всех', () => {
    const radii = sectorRadii(renderValuesCircleSvg(result, LABELS));
    const at = (k: ValueKey) => radii[VALUE_KEYS.indexOf(k)];
    expect(at('selfDirection')).toBeGreaterThan(at('security'));
    expect(Math.min(...radii)).toBe(at('power'));
  });

  it('ведущие — жирной подписью, остальные — обычной', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    for (const k of VALUE_KEYS) {
      const weight = svg.match(new RegExp(`font-weight="(\\d+)"[^>]*>${k}</text>`))?.[1];
      expect(weight, k).toBe(result.top.includes(k) ? '700' : '400');
    }
  });

  it('шкала постоянная: балл зажат в ±2,5, ровный профиль — ровные сектора', () => {
    expect(sectorRadius(-10)).toBe(sectorRadius(-2.5));
    expect(sectorRadius(-2.5)).toBeCloseTo(CIRCLE.radius * 0.25, 10);
    expect(sectorRadius(2.5)).toBeCloseTo(CIRCLE.radius, 10);
    expect(sectorRadius(0)).toBeGreaterThan(sectorRadius(-1));
    const flat = sectorRadii(renderValuesCircleSvg(scoreAnswers(by({}, 4)), LABELS));
    expect(new Set(flat).size).toBe(1);
  });

  it('подписи экранируются: текст из файла не ломает разметку', () => {
    const svg = renderValuesCircleSvg(result, { ...LABELS, power: 'A & <b>"' });
    expect(svg).toContain('A &amp; &lt;b&gt;&quot;');
    expect(svg).not.toContain('<b>');
  });

  it('подписи справа — от начала строки, слева — до её конца', () => {
    expect(labelLayout(VALUE_KEYS.indexOf('hedonism')).anchor).toBe('start');
    expect(labelLayout(VALUE_KEYS.indexOf('tradition')).anchor).toBe('end');
  });
});
