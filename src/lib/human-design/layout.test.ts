import { describe, expect, it } from 'vitest';
import { CENTER_GATES, CENTER_IDS, CHANNELS, channelKey } from './bodygraph';
import { CENTER_SHAPES, GATE_POINTS, GATE_RADIUS, VIEWBOX, channelHalves } from './layout';

const pts = (s: string) => s.split(' ').map((p) => p.split(',').map(Number) as [number, number]);

describe('геометрия схемы', () => {
  it('у каждых из 64 ворот есть точка', () => {
    expect(Object.keys(GATE_POINTS).map(Number).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 64 }, (_, i) => i + 1),
    );
  });

  it('ворота стоят в своём центре', () => {
    for (const center of CENTER_IDS) {
      const shape = pts(CENTER_SHAPES[center].points);
      const xs = shape.map(([x]) => x);
      const ys = shape.map(([, y]) => y);
      for (const gate of CENTER_GATES[center]) {
        const [x, y] = GATE_POINTS[gate];
        expect(x, `${gate} в ${center}`).toBeGreaterThanOrEqual(Math.min(...xs));
        expect(x, `${gate} в ${center}`).toBeLessThanOrEqual(Math.max(...xs));
        expect(y, `${gate} в ${center}`).toBeGreaterThanOrEqual(Math.min(...ys));
        expect(y, `${gate} в ${center}`).toBeLessThanOrEqual(Math.max(...ys));
      }
    }
  });

  it('кружки ворот не наезжают друг на друга', () => {
    const all = Object.entries(GATE_POINTS);
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const [[a, [ax, ay]], [b, [bx, by]]] = [all[i], all[j]];
        expect(Math.hypot(ax - bx, ay - by), `${a} и ${b}`).toBeGreaterThanOrEqual(2 * GATE_RADIUS);
      }
    }
  });

  it('всё внутри viewBox', () => {
    for (const [x, y] of Object.values(GATE_POINTS)) {
      expect(x - GATE_RADIUS).toBeGreaterThanOrEqual(0);
      expect(x + GATE_RADIUS).toBeLessThanOrEqual(VIEWBOX.width);
      expect(y - GATE_RADIUS).toBeGreaterThanOrEqual(0);
      expect(y + GATE_RADIUS).toBeLessThanOrEqual(VIEWBOX.height);
    }
  });

  it('половины канала начинаются в своих воротах и сходятся в середине', () => {
    for (const ch of CHANNELS) {
      const [first, second] = channelHalves(ch).map(pts);
      expect(first[0], channelKey(ch)).toEqual([...GATE_POINTS[ch[0]]]);
      expect(second[second.length - 1], channelKey(ch)).toEqual([...GATE_POINTS[ch[1]]]);
      expect(first[first.length - 1], channelKey(ch)).toEqual(second[0]);
    }
  });

  it('20-34 огибает G слева', () => {
    const [first, second] = channelHalves([20, 34]).map(pts);
    const xs = [...first, ...second].map(([x]) => x);
    expect(Math.min(...xs)).toBeLessThan(136);
  });
});
