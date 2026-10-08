// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { renderBodygraphSvg } from './svg';
import { chartFromUtc } from './chart';

/**
 * Схема рисуется строкой без DOM — второй этап вызовет ту же функцию в Node
 * на бэкенде. Окружение здесь — node: ни window, ни document.
 */
const chart = chartFromUtc('1990-03-12T11:25:00Z');
const svg = renderBodygraphSvg(chart, { label: 'Бодиграф: Манифестор' });
const count = (re: RegExp) => (svg.match(re) ?? []).length;

/** Самозакрытые и парные теги сходятся — строка разбирается как XML. */
function unbalanced(xml: string): string[] {
  const stack: string[] = [];
  const problems: string[] = [];
  for (const [, closing, name, , selfClosing] of xml.matchAll(/<(\/?)([a-zA-Z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*(\/?)>/g)) {
    if (selfClosing) continue;
    if (!closing) stack.push(name);
    else if (stack.pop() !== name) problems.push(`</${name}>`);
  }
  return [...problems, ...stack.map((n) => `<${n}> не закрыт`)];
}

describe('бодиграф строкой SVG', () => {
  it('работает без браузера', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it('самостоятельный SVG: пространство имён, размеры, подпись', () => {
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 548"')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(svg).toContain('<title>Бодиграф: Манифестор</title>');
    expect(svg).toContain('role="img"');
  });

  it('теги сходятся, лишнего в строке нет', () => {
    expect(unbalanced(svg)).toEqual([]);
    // Всё, что не тег, — текст между тегами: номера ворот и подпись.
    expect(svg.replace(/<[^>]+>/g, '').replace(/\d+/g, '').replace('Бодиграф: Манифестор', '')).toBe('');
    expect(svg).not.toMatch(/undefined|NaN|null/);
  });

  it('девять центров, 36 каналов, 64 ворот; закрашены определённые', () => {
    expect(count(/<polygon /g)).toBe(9);
    expect(count(/data-channel="/g)).toBe(36);
    expect(count(/<circle /g)).toBe(64);
    const defined = [...svg.matchAll(/data-center="(\w+)" data-defined="true"/g)].map((m) => m[1]);
    expect(defined).toEqual(chart.definedCenters);
  });

  it('подпись экранируется', () => {
    const evil = renderBodygraphSvg(chart, { label: '<script>"&' });
    expect(evil).toContain('<title>&lt;script&gt;&quot;&amp;</title>');
    expect(evil).not.toContain('<script>');
  });

  it('цвета можно заменить', () => {
    expect(renderBodygraphSvg(chart, { colors: { design: '#ff0000' } })).toContain('#ff0000');
  });
});
