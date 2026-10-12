import { describe, expect, it } from 'vitest';
import { ITEMS, VALUE_KEYS, renderValuesCircleSvg, scoreAnswers, type ValueKey } from './index';
import { CIRCLE, labelLayout, sectorRadius } from './circle';

const LABELS = Object.fromEntries(VALUE_KEYS.map((k) => [k, k])) as Record<ValueKey, string>;
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

/** Радиусы секторов в порядке круга: сектор — путь из центра. */
const sectorRadii = (svg: string) =>
  [...svg.matchAll(new RegExp(`<path d="M ${CIRCLE.cx} ${CIRCLE.cy} L [\\d.-]+ [\\d.-]+ A ([\\d.]+) `, 'g'))].map(
    (m) => Number(m[1]),
  );

/** Полные теги секторов (с «Z» в конце d, в отличие от дуг обода). */
const sectorPaths = (svg: string) =>
  [...svg.matchAll(new RegExp(`<path d="M ${CIRCLE.cx} ${CIRCLE.cy} L [^"]*Z"[^>]*/>`, 'g'))].map((m) => m[0]);

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

  it('подписи помещаются по высоте рисунка', () => {
    for (let i = 0; i < VALUE_KEYS.length; i += 1) {
      const { y } = labelLayout(i);
      expect(y - CIRCLE.fontSize / 2, `сектор ${i}`).toBeGreaterThanOrEqual(0);
      expect(y + CIRCLE.fontSize / 2, `сектор ${i}`).toBeLessThanOrEqual(CIRCLE.height);
    }
  });

  it('наименее важная — штриховой обводкой, остальные без неё', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    const paths = sectorPaths(svg);
    expect(paths).toHaveLength(10);
    const dashed = paths.filter((p) => p.includes('stroke-dasharray="3 3"'));
    expect(dashed).toHaveLength(1);
    expect(paths[VALUE_KEYS.indexOf(result.bottom!)]).toBe(dashed[0]);

    const flatSvg = renderValuesCircleSvg(scoreAnswers(by({}, 4)), LABELS);
    expect(sectorPaths(flatSvg).some((p) => p.includes('stroke-dasharray'))).toBe(false);
  });

  it('один путь обода на группу, не на ценность', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    expect([...svg.matchAll(/stroke-width="6"/g)]).toHaveLength(4);
  });

  it('геометрия секторов: флаги дуги 0 0 1, радиус у обеих точек, угол раствора 35°', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    const matches = [
      ...svg.matchAll(
        new RegExp(
          `M ${CIRCLE.cx} ${CIRCLE.cy} L ([\\d.-]+) ([\\d.-]+) A ([\\d.-]+) [\\d.-]+ 0 (\\d) (\\d) ([\\d.-]+) ([\\d.-]+) Z`,
          'g',
        ),
      ),
    ];
    expect(matches).toHaveLength(10);
    for (const m of matches) {
      const [x0, y0, r, largeArc, sweep, x1, y1] = m.slice(1).map(Number);
      expect(largeArc).toBe(0);
      expect(sweep).toBe(1);
      expect(Math.abs(Math.hypot(x0 - CIRCLE.cx, y0 - CIRCLE.cy) - r)).toBeLessThanOrEqual(0.05);
      expect(Math.abs(Math.hypot(x1 - CIRCLE.cx, y1 - CIRCLE.cy) - r)).toBeLessThanOrEqual(0.05);
      const deg = (x: number, y: number) => (Math.atan2(y - CIRCLE.cy, x - CIRCLE.cx) * 180) / Math.PI;
      let span = deg(x1, y1) - deg(x0, y0);
      if (span < 0) span += 360;
      expect(Math.abs(span - 35)).toBeLessThanOrEqual(0.1);
    }
  });
});
