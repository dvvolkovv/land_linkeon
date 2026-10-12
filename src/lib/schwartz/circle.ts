import type { ValuesResult } from './score';
import { HIGHER_ORDER_KEYS, VALUE_GROUP, VALUE_KEYS, valuesOf, type HigherOrderKey, type ValueKey } from './values';

/**
 * Геометрия рисунка. Высота — под сам круг и подписи (labelRadius 133 от
 * центра на высоте 150): с учётом высоты строки подписи (±fontSize/2)
 * рисунок укладывается в y от ≈15,5 до ≈284,5, без пустых полос сверху и
 * снизу на телефоне (420 было с большим запасом). Ширина с запасом под
 * подписи слева и справа: самая длинная («Самостоятельность») стоит справа
 * вверху; проверка, что русские подписи помещаются, — в
 * src/content/values/texts.test.ts.
 */
export const CIRCLE = { width: 520, height: 300, cx: 260, cy: 150, radius: 115, labelRadius: 133, fontSize: 16 } as const;

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
 * личное среднее. Ведущие — ярче и жирной подписью; наименее важная —
 * бледная и со своей штриховой обводкой (иначе не отличить от гедонизма и
 * обычных секторов с нулевым баллом). Полная ничья рисуется как ничья:
 * ценности из topTies — как ведущие, из bottomTies — как наименее важная, —
 * ведь между ними выбрал только порядок круга, а не ответы. По краю — одна
 * дуга на группу высшего порядка целиком (от начала её первого сектора до
 * конца последнего, а не по дуге на каждую входящую в неё ценность); у
 * гедонизма дуги нет. Самая длинная группа (сохранение, три ценности)
 * занимает слот 108°, сама дуга — 107° (минус зазоры по краям) — меньше
 * 180°, поэтому у одной такой дуги флаг large-arc 0 остаётся верным.
 */
export function renderValuesCircleSvg(result: ValuesResult, labels: Record<ValueKey, string>): string {
  const { cx, cy, radius, width, height, fontSize } = CIRCLE;
  const top = new Set([...result.top, ...result.topTies]);
  const bottom = new Set(result.bottom ? [result.bottom, ...result.bottomTies] : []);
  const parts = [
    `<circle cx="${cx}" cy="${cy}" r="${r2(sectorRadius(0))}" fill="none" stroke="#d6d3d1" stroke-dasharray="4 4"/>`,
  ];
  const rim = radius + 7;
  for (const group of HIGHER_ORDER_KEYS) {
    const members = valuesOf(group);
    const first = VALUE_KEYS.indexOf(members[0]);
    const last = VALUE_KEYS.indexOf(members[members.length - 1]);
    const a0 = startAngle(first) + GAP / 2;
    const a1 = startAngle(last + 1) - GAP / 2;
    parts.push(
      `<path d="M ${point(rim, a0)} A ${rim} ${rim} 0 0 1 ${point(rim, a1)}" fill="none" stroke="${GROUP_COLORS[group]}" stroke-width="6"/>`,
    );
  }
  VALUE_KEYS.forEach((key, i) => {
    const a0 = startAngle(i) + GAP / 2;
    const a1 = startAngle(i + 1) - GAP / 2;
    const r = sectorRadius(result.scores[key]);
    const group = VALUE_GROUP[key];
    const isBottom = bottom.has(key);
    const color = isBottom ? MUTED : group ? GROUP_COLORS[group] : NEUTRAL;
    const opacity = isBottom ? 0.25 : top.has(key) ? 0.9 : 0.45;
    const outline = isBottom ? ` stroke="${NEUTRAL}" stroke-dasharray="3 3"` : '';
    parts.push(
      `<path d="M ${cx} ${cy} L ${point(r, a0)} A ${r2(r)} ${r2(r)} 0 0 1 ${point(r, a1)} Z" fill="${color}" fill-opacity="${opacity}"${outline}/>`,
    );
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
