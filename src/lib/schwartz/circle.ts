import type { ValuesResult } from './score';
import { VALUE_GROUP, VALUE_KEYS, type HigherOrderKey, type ValueKey } from './values';

/**
 * Геометрия рисунка. Ширина с запасом под подписи слева и справа: самая
 * длинная («Самостоятельность») стоит справа вверху; проверка, что русские
 * подписи помещаются, — в src/content/values/texts.test.ts.
 */
export const CIRCLE = { width: 520, height: 420, cx: 260, cy: 210, radius: 115, labelRadius: 133, fontSize: 16 } as const;

/** Балл зажимается в ±CIRCLE_CLAMP: шкала постоянная, ровный профиль выглядит ровным. */
export const CIRCLE_CLAMP = 2.5;
/** Доля радиуса у сектора с баллом −CIRCLE_CLAMP. */
const INNER = 0.25;
const SECTOR = 360 / VALUE_KEYS.length;
/** Зазор между секторами, градусы. */
const GAP = 1;

export const GROUP_COLORS: Record<HigherOrderKey, string> = {
  openness: '#b45309',
  selfEnhancement: '#be123c',
  conservation: '#1d4ed8',
  selfTranscendence: '#047857',
};
const NEUTRAL = '#78716c';
const MUTED = '#a8a29e';

export function sectorRadius(score: number): number {
  const s = Math.max(-CIRCLE_CLAMP, Math.min(CIRCLE_CLAMP, score));
  return CIRCLE.radius * (INNER + ((1 - INNER) * (s + CIRCLE_CLAMP)) / (2 * CIRCLE_CLAMP));
}

const rad = (deg: number) => (deg * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const point = (r: number, deg: number) =>
  `${r2(CIRCLE.cx + r * Math.cos(rad(deg)))} ${r2(CIRCLE.cy + r * Math.sin(rad(deg)))}`;
/** Сектор i начинается сверху и идёт по часовой стрелке. */
const startAngle = (i: number) => -90 + SECTOR * i;

export function labelLayout(i: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  const deg = startAngle(i) + SECTOR / 2;
  const cos = Math.cos(rad(deg));
  return {
    x: r2(CIRCLE.cx + CIRCLE.labelRadius * cos),
    y: r2(CIRCLE.cy + CIRCLE.labelRadius * Math.sin(rad(deg))),
    anchor: cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle',
  };
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Круг ценностей строкой SVG — для <img src="data:…">: Вебвизор пишет
 * атрибуты разметки даже внутри ym-hide-content, а src картинки маскирует
 * целиком. Длина сектора — балл ценности на постоянной шкале; пунктир —
 * личное среднее. Ведущие — ярче и жирной подписью, наименее важная —
 * серым. По краю — дуги групп высшего порядка (у гедонизма дуги нет).
 */
export function renderValuesCircleSvg(result: ValuesResult, labels: Record<ValueKey, string>): string {
  const { cx, cy, radius, width, height, fontSize } = CIRCLE;
  const top = new Set(result.top);
  const parts = [
    `<circle cx="${cx}" cy="${cy}" r="${r2(sectorRadius(0))}" fill="none" stroke="#d6d3d1" stroke-dasharray="4 4"/>`,
  ];
  VALUE_KEYS.forEach((key, i) => {
    const a0 = startAngle(i) + GAP / 2;
    const a1 = startAngle(i + 1) - GAP / 2;
    const r = sectorRadius(result.scores[key]);
    const group = VALUE_GROUP[key];
    const color = key === result.bottom ? MUTED : group ? GROUP_COLORS[group] : NEUTRAL;
    const opacity = top.has(key) ? 0.9 : 0.45;
    parts.push(
      `<path d="M ${cx} ${cy} L ${point(r, a0)} A ${r2(r)} ${r2(r)} 0 0 1 ${point(r, a1)} Z" fill="${color}" fill-opacity="${opacity}"/>`,
    );
    if (group) {
      const rim = radius + 7;
      parts.push(
        `<path d="M ${point(rim, a0)} A ${rim} ${rim} 0 0 1 ${point(rim, a1)}" fill="none" stroke="${GROUP_COLORS[group]}" stroke-width="6"/>`,
      );
    }
    const { x, y, anchor } = labelLayout(i);
    const strong = top.has(key);
    parts.push(
      `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${fontSize}" font-weight="${strong ? 700 : 400}" fill="${strong ? '#1c1917' : '#44403c'}">${escapeXml(labels[key])}</text>`,
    );
  });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" ` +
    `font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif">${parts.join('')}</svg>`
  );
}
