import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ASSISTANTS, ASSISTANT_SLUGS } from './roster.data.js';
import { PACKS } from './packs.server';
import type { AssistantPageText } from './types';

/**
 * Механическая часть «Правил текстов» плана. Смысл — факты из промпта, голос,
 * честные границы — тестом не проверить, это ревью. Здесь то, что ломается
 * молча: пропавшая страница, пустое поле, чужое имя в H1, повтор пункта,
 * неснятая разметка или служебный тег в примере; на нерусской странице ещё
 * российский телефон, непереведённый кусок, цена в рублях и пункт, потерянный
 * или добавленный при переводе.
 *
 * Правила проверяют каждый файл страницы pages/<язык>/<slug>.ts по отдельности:
 * так страницу можно проверить, пока остальные ещё пишутся. Полнота — что у
 * языка есть все ассистенты реестра — отдельный тест по сборкам pages/<язык>.ts.
 */
const PAGES = import.meta.glob<{ default: AssistantPageText }>('./pages/*/*.ts', { eager: true });

const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
// Тепло — типографикой, а не смайлами (правило голоса лендинга). Пример
// разговора не проверяется: это настоящий ответ, он показывается как есть.
const EMOJI = /\p{Extended_Pictographic}/u;
const RU_PHONE = /8[\s-]?800|\+7[\s(-]?\d/;
// Кириллица на нерусской странице — непереведённый кусок.
const CYRILLIC = /[Ѐ-ӿ]/;
const MARKDOWN = /\*\*|^#{1,6}\s|^\s*\|.*\|\s*$/m;
// Служебные теги приложения вида [CALENDAR_PROPOSAL:<uuid>] — для посетителя мусор.
const APP_TAG = /\[[A-Z][A-Z_]+:/;

const own = (p: AssistantPageText) => [
  p.title, p.description, p.h1, p.lead, p.card, p.cta,
  ...p.situations, ...p.can, ...p.cannot, ...p.faq.flatMap((f) => [f.q, f.a]),
];
const all = (p: AssistantPageText) => [
  ...own(p), p.example.question, p.example.answer,
  ...(p.example.image ? [p.example.image.alt] : []),
];
const visible = (p: AssistantPageText) => [
  p.h1, p.lead, ...p.situations, p.example.question, p.example.answer,
  ...p.can, ...p.cannot, ...p.faq.flatMap((f) => [f.q, f.a]),
];
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

describe('тексты страниц ассистентов: каждая страница', () => {
  for (const [path, mod] of Object.entries(PAGES)) {
    const [, code, slug] = path.match(/\/pages\/(\w+)\/(\w+)\.ts$/)!;
    const entry = ASSISTANTS.find((a) => a.slug === slug);
    const p = mod.default;

    describe(`${code}/${slug}`, () => {
      it('файл назван по ассистенту из реестра', () => {
        expect(entry, `в реестре нет ${slug}`).toBeDefined();
      });

      it('нет пустых полей и заготовок', () => {
        for (const s of all(p)) {
          expect(s.trim().length).toBeGreaterThan(0);
          expect(s).not.toMatch(PLACEHOLDER);
        }
      });

      it('в H1 — имя ассистента на этом языке', () => {
        expect(p.h1).toContain(entry!.names[code]);
      });

      it('длины метатегов и строки каталога', () => {
        const [min, max] = code === 'zh' ? [40, 120] : [100, 180];
        expect(p.title.length).toBeLessThanOrEqual(70);
        expect(p.description.length).toBeGreaterThanOrEqual(min);
        expect(p.description.length).toBeLessThanOrEqual(max);
        expect(p.card.length).toBeLessThanOrEqual(140);
      });

      it('число пунктов в блоках', () => {
        expect(p.situations.length).toBeGreaterThanOrEqual(4);
        expect(p.situations.length).toBeLessThanOrEqual(6);
        expect(p.can.length).toBeGreaterThanOrEqual(3);
        expect(p.can.length).toBeLessThanOrEqual(6);
        expect(p.cannot.length).toBeGreaterThanOrEqual(2);
        expect(p.cannot.length).toBeLessThanOrEqual(4);
        expect(p.faq.length).toBeGreaterThanOrEqual(4);
        expect(p.faq.length).toBeLessThanOrEqual(5);
      });

      it('без эмодзи вне примера разговора', () => {
        for (const s of own(p)) expect(s).not.toMatch(EMOJI);
      });

      it('разметка и служебные теги в примере сняты', () => {
        expect(p.example.answer).not.toMatch(MARKDOWN);
        for (const s of all(p)) expect(s).not.toMatch(APP_TAG);
      });

      // Картинка показывается полем example.image, а не текстом: markdown-тег
      // картинки или ссылки в ответе — значит, из текста её забыли убрать.
      it('в примере ответа нет markdown-картинок и ссылок', () => {
        expect(p.example.answer).not.toMatch(/!\[|\]\(https?:/);
      });

      if (p.example.image) {
        const { image } = p.example;

        it('картинка примера: файл на месте, alt и размеры заданы', () => {
          const file = new URL(`../../../public${image.src}`, import.meta.url);
          expect(existsSync(file), `нет файла public${image.src}`).toBe(true);
          expect(image.alt.trim().length).toBeGreaterThan(0);
          expect(Number.isInteger(image.width) && image.width > 0, 'width').toBe(true);
          expect(Number.isInteger(image.height) && image.height > 0, 'height').toBe(true);
        });
      }

      // Текст пункта — ключ React-списка на странице, а повтор — ошибка текста.
      it('пункты в блоках не повторяются', () => {
        const blocks = { situations: p.situations, can: p.can, cannot: p.cannot, 'faq[].q': p.faq.map((f) => f.q) };
        for (const [name, list] of Object.entries(blocks)) {
          expect(list.filter((s, i) => list.indexOf(s) !== i), name).toEqual([]);
        }
      });

      if (code !== 'ru') {
        const ru = PAGES[`./pages/ru/${slug}.ts`]?.default;

        it('без российских телефонов — на нерусской странице местная служба', () => {
          for (const s of all(p)) expect(s).not.toMatch(RU_PHONE);
        });

        it('без кириллицы — ни в одном поле, включая пример разговора', () => {
          for (const s of all(p)) expect(s).not.toMatch(CYRILLIC);
        });

        // Цена на нерусской странице — без рублей. Пример не проверяется: это
        // настоящий разговор, суммы в нём остаются в рублях.
        it('без «₽» вне примера разговора', () => {
          for (const s of own(p)) expect(s).not.toContain('₽');
        });

        // Перевод передаёт русскую страницу пункт в пункт: пропавший или лишний
        // пункт — ошибка перевода. В «Чего не делает» можно добавить одну свою
        // оговорку — например, про язык ответов ассистента.
        it('пунктов столько же, сколько в русском тексте', () => {
          expect(ru, `нет русского текста pages/ru/${slug}.ts`).toBeDefined();
          expect(p.situations.length, 'situations').toBe(ru!.situations.length);
          expect(p.can.length, 'can').toBe(ru!.can.length);
          expect(p.faq.length, 'faq').toBe(ru!.faq.length);
          expect(p.cannot.length, 'cannot').toBeGreaterThanOrEqual(ru!.cannot.length);
          expect(p.cannot.length, 'cannot').toBeLessThanOrEqual(ru!.cannot.length + 1);
        });

        // Картинка — один файл на все языки; у перевода не должно появиться
        // своей, отличной от русской.
        if (p.example.image) {
          it('картинка примера: src — тот же файл, что на русской странице', () => {
            expect(ru?.example.image?.src).toBe(p.example.image!.src);
          });
        }
      }

      if (code === 'ru') {
        it('400–650 слов видимого текста', () => {
          const n = visible(p).map(words).reduce((x, y) => x + y, 0);
          expect(n).toBeGreaterThanOrEqual(400);
          expect(n).toBeLessThanOrEqual(650);
        });
      }
    });
  }
});

describe('тексты страниц ассистентов: полнота языков', () => {
  it('русский — источник переводов — собран', () => {
    expect(Object.keys(PACKS)).toContain('ru');
  });

  for (const [code, pack] of Object.entries(PACKS)) {
    it(`${code}: ровно ассистенты реестра`, () => {
      expect(Object.keys(pack).sort()).toEqual([...ASSISTANT_SLUGS].sort());
    });
  }
});
