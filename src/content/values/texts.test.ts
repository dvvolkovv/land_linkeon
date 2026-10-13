import { describe, expect, it } from 'vitest';
import { VALUES_TEXTS } from './texts.server';
import { ANSWER_MAX, ANSWER_MIN, AXIS_KEYS, HIGHER_ORDER_KEYS, ITEM_IDS, VALUE_KEYS, type AxisLean } from '../../lib/schwartz';
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
// \b в JS не видит кириллицу — границы слова через \p{L}. её/ей/ней не ловим
// сознательно: в утверждениях они относятся к словам женского рода («вера и
// её предписания»), а не к описанному человеку; «им» — множественное число.
const GENDERED =
  /(?<!\p{L})(он|она|его|ему|него|нему|ним|нём|нем|сам|сама|саму|самого|самому|самим|самом|самой|был|была|рад|рада|готов|готова|согласен|согласна|уверен|уверена|должен|должна|способен|способна|доволен|довольна|счастлив|счастлива)(?!\p{L})/iu;
// Эвристика прошедшего времени 1 лица («я прошёл тест» тоже выдаёт род
// говорящего). «Правила» — существительное мн. ч., ложное срабатывание;
// других таких слов в текстах нет, поэтому список исключений — один.
// Второй вариант альтернативы — «согласная+ла» (прошла, смогла, достигла):
// у них перед «л» нет гласной. Мужского «смог/помог/достиг» регексп не
// поймёт — там нет «л» вовсе; эти случаи остаются на ревью владельца.
const PAST = /(?<!\p{L})\p{L}+(?:[аеёиоуыя]л(?:а|ся|ась)?|[бвгджзкпрстфхцчшщ]ла(?:сь)?)(?!\p{L})/iu;
const NOT_PAST = new Set(['правила']);
const pastTenseHits = (s: string): string[] =>
  [...s.matchAll(new RegExp(PAST, 'giu'))].map((m) => m[0].toLowerCase()).filter((w) => !NOT_PAST.has(w));
const PORTRAIT = /^(Этот человек|Этому человеку|Для этого человека|Этого человека) /;
const LEANS: AxisLean[] = ['left', 'right', 'balance'];

const CYRILLIC = /\p{Script=Cyrillic}/u;
const HAN = /\p{Script=Han}/u;
/** Ширина подписи в кеглях: иероглиф — во весь кегль, прочее — 0,62 (с запасом). */
const labelWidthEm = (s: string): number => [...s].reduce((w, ch) => w + (HAN.test(ch) ? 1 : 0.62), 0);

// Китайский передаёт ту же мысль вдвое меньшим числом знаков — пределы как у
// страниц ассистентов (src/content/assistants/packs.test.ts: zh 40–120).
const limitsFor = (code: string) =>
  code === 'zh'
    ? { description: [40, 120], valueText: [60, 200], valueLine: 30, axis: [12, 100] }
    : { description: [100, 180], valueText: [150, 420], valueLine: 60, axis: [30, 200] };
// Описание ценности начинается с названия; в es, fr, pt — допустим артикль
// («La autodirección…», «L'autonomie…»): название — в первых 60 знаках.
const ARTICLE_LANGUAGES = new Set(['es', 'fr', 'pt']);

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

/** Как strings(), но с путём до значения — чтобы исключить известные шаблоны. */
function stringsWithPath(value: unknown, path: string[] = []): { path: string; s: string }[] {
  if (typeof value === 'string') return [{ path: path.join('.'), s: value }];
  if (Array.isArray(value)) return value.flatMap((v, i) => stringsWithPath(v, [...path, String(i)]));
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => stringsWithPath(v, [...path, k]));
  return [];
}
const TEMPLATE_PATHS = new Set([
  'start.resume',
  'question.progress',
  'message',
  'bottomInMessage',
  'result.tiedWith',
  'tiedInMessage',
]);

const keys = (o: object) => Object.keys(o).sort();
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('ширина подписи круга', () => {
  // Без этого правило «иероглиф — во весь кегль» могло бы не сработать молча.
  it('иероглиф — 1 кегль, остальное — 0,62', () => {
    expect(labelWidthEm('自我')).toBe(2);
    expect(labelWidthEm('ab')).toBeCloseTo(1.24);
  });
});

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
        expect(t.question.scale).toHaveLength(ANSWER_MAX - ANSWER_MIN + 1);
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

      const limits = limitsFor(code);

      it('метатеги, вступление, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(limits.description[0]);
        expect(t.description.length).toBeLessThanOrEqual(limits.description[1]);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('шаблоны: ключи на месте', () => {
        expect(placeholders(t.start.resume)).toEqual(['done', 'total']);
        expect(placeholders(t.question.progress)).toEqual(['n', 'total']);
        expect(placeholders(t.message)).toEqual(['axes', 'rest', 'top']);
        expect(placeholders(t.bottomInMessage)).toEqual(['bottom']);
        expect(placeholders(t.restEqualInMessage)).toEqual([]);
        expect(placeholders(t.messageFlat)).toEqual([]);
        expect(placeholders(t.result.tiedWith)).toEqual(['names']);
        expect(placeholders(t.tiedInMessage)).toEqual(['names']);
      });

      it('плейсхолдеры — только в известных шаблонах, не в остальных строках', () => {
        for (const { path, s } of stringsWithPath(t)) {
          if (TEMPLATE_PATHS.has(path)) continue;
          expect(s, path).not.toMatch(/[{}]/);
        }
      });

      it('ценности: строка под названием, описание с названием в начале', () => {
        for (const k of VALUE_KEYS) {
          const v = t.values[k];
          expect(v.line.length, k).toBeLessThanOrEqual(limits.valueLine);
          expect(v.text.length, k).toBeGreaterThanOrEqual(limits.valueText[0]);
          expect(v.text.length, k).toBeLessThanOrEqual(limits.valueText[1]);
          if (ARTICLE_LANGUAGES.has(code)) {
            expect(v.text.slice(0, 60).toLowerCase(), k).toContain(v.name.toLowerCase());
          } else {
            expect(v.text.startsWith(v.name), k).toBe(true);
          }
        }
      });

      it('оси: фразы результата в пределах языка', () => {
        for (const axis of AXIS_KEYS) {
          for (const lean of LEANS) {
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeGreaterThanOrEqual(limits.axis[0]);
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeLessThanOrEqual(limits.axis[1]);
          }
        }
      });

      it('подписи круга помещаются в рисунок', () => {
        VALUE_KEYS.forEach((k, i) => {
          const { x, anchor } = labelLayout(i);
          const w = labelWidthEm(t.values[k].name) * CIRCLE.fontSize;
          const [from, to] = anchor === 'start' ? [x, x + w] : anchor === 'end' ? [x - w, x] : [x - w / 2, x + w / 2];
          expect(from, k).toBeGreaterThanOrEqual(4);
          expect(to, k).toBeLessThanOrEqual(CIRCLE.width - 4);
        });
      });

      if (code !== 'ru') {
        it('перевод: ни кириллицы, ни рублей', () => {
          for (const { path, s } of stringsWithPath(t)) expect(s, path).not.toMatch(CYRILLIC);
        });
      }

      if (code === 'zh') {
        // Абзац осей склеивается без пробела (joinSentences): каждая фраза — законченное предложение.
        it('zh: фразы осей кончаются на «。»', () => {
          for (const axis of AXIS_KEYS) {
            for (const lean of LEANS) expect(t.axes[axis][lean], `${axis}.${lean}`).toMatch(/。$/);
          }
        });
      }
    });
  }

  // Правило 4 — о русском языке; у переводов свои правила рода и регистра.
  it('ru: утверждения — портреты без рода, 40–140 знаков, одно предложение', () => {
    const t = VALUES_TEXTS.ru;
    for (const id of ITEM_IDS) {
      const s = t.statements[id];
      expect(s, id).toMatch(PORTRAIT);
      expect(s, id).not.toMatch(GENDERED);
      expect(pastTenseHits(s), id).toEqual([]);
      expect(s.length, id).toBeGreaterThanOrEqual(40);
      expect(s.length, id).toBeLessThanOrEqual(140);
      expect((s.match(/[.!?](\s|$)/g) ?? []).length, id).toBe(1);
      expect(s.endsWith('.'), id).toBe(true);
    }
  });

  it('ru: сообщение Оле — без рода и времени, выдающих говорящего', () => {
    const t = VALUES_TEXTS.ru;
    const toCheck: Record<string, string> = {
      message: t.message,
      messageFlat: t.messageFlat,
      tiedInMessage: t.tiedInMessage,
      bottomInMessage: t.bottomInMessage,
      restEqualInMessage: t.restEqualInMessage,
    };
    for (const axis of AXIS_KEYS) {
      for (const lean of LEANS) {
        toCheck[`axesInMessage.${axis}.${lean}`] = t.axesInMessage[axis][lean];
      }
    }
    for (const [label, s] of Object.entries(toCheck)) {
      expect(s, label).not.toMatch(GENDERED);
      expect(pastTenseHits(s), label).toEqual([]);
    }
  });

  it('ru: ценности и оси — регистр по правилам русского языка', () => {
    const t = VALUES_TEXTS.ru;
    for (const k of VALUE_KEYS) {
      const v = t.values[k];
      expect(v.line[0], k).toBe(v.line[0].toLowerCase());
      expect(v.inMessage, k).toBe(v.inMessage.toLowerCase());
    }
    for (const lean of LEANS) {
      const change = t.axesInMessage.change[lean];
      const focus = t.axesInMessage.focus[lean];
      expect(change[0], lean).toBe(change[0].toUpperCase());
      expect(focus[0], lean).toBe(focus[0].toLowerCase());
      expect(change.endsWith('.') || focus.endsWith('.'), lean).toBe(false);
    }
  });

  it('ru: описания ценностей — 2–3 предложения', () => {
    const t = VALUES_TEXTS.ru;
    for (const k of VALUE_KEYS) {
      const count = (t.values[k].text.match(/[.!?](\s|$)/g) ?? []).length;
      expect(count, k).toBeGreaterThanOrEqual(2);
      expect(count, k).toBeLessThanOrEqual(3);
    }
  });

  it('ru: оговорка — самопознание, Шварц, не клиническая методика', () => {
    const t = VALUES_TEXTS.ru;
    expect(t.disclaimer).toMatch(/самопознани/i);
    expect(t.disclaimer).toMatch(/Шварц/);
    expect(t.disclaimer).toMatch(/не клиническ/i);
  });

  it('ru: без заявлений о валидности/официальности/клинической пригодности, кроме отрицания', () => {
    const t = VALUES_TEXTS.ru;
    for (const s of strings(t)) {
      expect(s).not.toMatch(/(?<!\p{L})валид|(?<!не )официальн|(?<!не )клиническ/iu);
    }
  });

  it('детектор рода и прошедшего времени — таблица случаев', () => {
    const mustFlag = [
      'чтобы его ценили',
      'чтобы с ним считались',
      'думает о нём',
      'уважать самого себя',
      'он согласен',
      'был бы счастлив',
      'Я прошёл тест',
      'Я прошла тест',
    ];
    const mustNotFlag = [
      'Этому человеку важна самостоятельность.',
      'вера и её предписания',
      'им важно понимать',
      'правила — не формальность',
    ];
    for (const s of mustFlag) {
      expect(GENDERED.test(s) || pastTenseHits(s).length > 0, s).toBe(true);
    }
    for (const s of mustNotFlag) {
      expect(s, s).not.toMatch(GENDERED);
      expect(pastTenseHits(s), s).toEqual([]);
    }
  });
});

describe('ru — решения из спеки', () => {
  const t = VALUES_TEXTS.ru;
  it('h1', () => {
    expect(t.h1).toBe('Тест ценностей Шварца онлайн — бесплатно');
  });
  it('хлебная крошка', () => {
    expect(t.breadcrumb).toBe('Тест ценностей');
  });
  it('кнопка и подпись под ней', () => {
    expect(t.result.cta).toBe('Разобрать с Олей');
    expect(t.result.ctaNote).toMatch(/25\s000 токенов в подарок/);
  });
});
