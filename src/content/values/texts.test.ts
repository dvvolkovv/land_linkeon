import { describe, expect, it } from 'vitest';
import { VALUES_TEXTS } from './texts.server';
import { AXIS_KEYS, HIGHER_ORDER_KEYS, ITEM_IDS, VALUE_KEYS, type AxisLean } from '../../lib/schwartz';
import { CIRCLE, labelLayout } from '../../lib/schwartz/circle';

/**
 * Механическая часть «Правил текстов» плана теста ценностей. Смысл, тон и
 * точность утверждений — слепая разметка (Task 6) и ревью владельца; здесь
 * то, что ломается молча: пропавший ключ, пустое поле, опечатка в шаблоне,
 * цена, эмодзи, род в утверждении, подпись, вылезающая за рисунок.
 */
const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
const EMOJI = /\p{Extended_Pictographic}/u;
const PRICE = /₽|руб\.|рубл|\$|€/;
// \b в JS не видит кириллицу — границы слова через \p{L}.
const GENDERED = /(?<!\p{L})(он|она|его|ему|него|нему|сам|сама|самому|самой)(?!\p{L})/iu;
const PORTRAIT = /^(Этот человек|Этому человеку|Для этого человека|Этого человека) /;
const LEANS: AxisLean[] = ['left', 'right', 'balance'];

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const keys = (o: object) => Object.keys(o).sort();
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('тексты теста ценностей', () => {
  it('русский — источник переводов — на месте', () => {
    expect(Object.keys(VALUES_TEXTS)).toContain('ru');
  });

  for (const [code, t] of Object.entries(VALUES_TEXTS)) {
    describe(code, () => {
      it('у каждого утверждения, ценности, группы и оси есть текст', () => {
        expect(keys(t.statements)).toEqual([...ITEM_IDS].sort());
        expect(keys(t.values)).toEqual([...VALUE_KEYS].sort());
        expect(keys(t.higherOrder)).toEqual([...HIGHER_ORDER_KEYS].sort());
        for (const table of [t.axes, t.axesInMessage]) {
          expect(keys(table)).toEqual([...AXIS_KEYS].sort());
          for (const axis of AXIS_KEYS) expect(keys(table[axis])).toEqual([...LEANS].sort());
        }
        expect(t.question.scale).toHaveLength(6);
      });

      it('нет пустых строк и заготовок', () => {
        for (const s of strings(t)) {
          expect(s.trim().length).toBeGreaterThan(0);
          expect(s).not.toMatch(PLACEHOLDER);
        }
      });

      it('без эмодзи, без цен, без слова «агент»', () => {
        for (const s of strings(t)) {
          expect(s).not.toMatch(EMOJI);
          expect(s).not.toMatch(PRICE);
          expect(s).not.toMatch(/агент/i);
        }
      });

      it('метатеги, вступление, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(100);
        expect(t.description.length).toBeLessThanOrEqual(180);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('шаблоны: ключи на месте', () => {
        expect(placeholders(t.start.resume)).toEqual(['done', 'total']);
        expect(placeholders(t.question.progress)).toEqual(['n', 'total']);
        expect(placeholders(t.message)).toEqual(['axes', 'bottom', 'top']);
        expect(placeholders(t.messageFlat)).toEqual([]);
      });

      it('ценности: строка до 60 знаков со строчной, описание 150–420 с названием в начале', () => {
        for (const k of VALUE_KEYS) {
          const v = t.values[k];
          expect(v.line.length, k).toBeLessThanOrEqual(60);
          expect(v.line[0], k).toBe(v.line[0].toLowerCase());
          expect(v.text.length, k).toBeGreaterThanOrEqual(150);
          expect(v.text.length, k).toBeLessThanOrEqual(420);
          expect(v.text.startsWith(v.name), k).toBe(true);
          expect(v.inMessage, k).toBe(v.inMessage.toLowerCase());
        }
      });

      it('оси: фразы результата 30–200 знаков; в сообщении change — с заглавной, focus — со строчной', () => {
        for (const axis of AXIS_KEYS) {
          for (const lean of LEANS) {
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeGreaterThanOrEqual(30);
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeLessThanOrEqual(200);
          }
        }
        for (const lean of LEANS) {
          const change = t.axesInMessage.change[lean];
          const focus = t.axesInMessage.focus[lean];
          expect(change[0], lean).toBe(change[0].toUpperCase());
          expect(focus[0], lean).toBe(focus[0].toLowerCase());
          expect(change.endsWith('.') || focus.endsWith('.'), lean).toBe(false);
        }
      });

      it('оговорка: самопознание, Шварц, не клиническая методика', () => {
        expect(t.disclaimer).toMatch(/самопознани/i);
        expect(t.disclaimer).toMatch(/Шварц/);
        expect(t.disclaimer).toMatch(/не клиническ/i);
      });

      it('подписи круга помещаются в рисунок', () => {
        VALUE_KEYS.forEach((k, i) => {
          const { x, anchor } = labelLayout(i);
          // Ширина строки — с запасом: 0,62 кегля на знак, кириллица в системном шрифте уже.
          const w = t.values[k].name.length * 0.62 * CIRCLE.fontSize;
          const [from, to] = anchor === 'start' ? [x, x + w] : anchor === 'end' ? [x - w, x] : [x - w / 2, x + w / 2];
          expect(from, k).toBeGreaterThanOrEqual(4);
          expect(to, k).toBeLessThanOrEqual(CIRCLE.width - 4);
        });
      });
    });
  }

  // Правило 4 — о русском языке; у переводов свои правила рода.
  it('ru: утверждения — портреты без рода, 40–140 знаков, одно предложение', () => {
    const t = VALUES_TEXTS.ru;
    for (const id of ITEM_IDS) {
      const s = t.statements[id];
      expect(s, id).toMatch(PORTRAIT);
      expect(s, id).not.toMatch(GENDERED);
      expect(s.length, id).toBeGreaterThanOrEqual(40);
      expect(s.length, id).toBeLessThanOrEqual(140);
      expect((s.match(/[.!?](\s|$)/g) ?? []).length, id).toBe(1);
      expect(s.endsWith('.'), id).toBe(true);
    }
  });

  it('детектор рода не слепой к кириллице', () => {
    expect('Этому человеку важно, чтобы его ценили.').toMatch(GENDERED);
    expect('Этому человеку важна самостоятельность.').not.toMatch(GENDERED);
  });
});
