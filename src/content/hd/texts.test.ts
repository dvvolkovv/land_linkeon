import { describe, expect, it } from 'vitest';
import { HD_TEXTS } from './texts.server';
import { PROFILES } from './types';
import { CENTER_IDS, CHANNELS, HD_AUTHORITIES, HD_DEFINITIONS, HD_TYPES, channelKey } from '../../lib/human-design';
import { DRAFT_MAX_LENGTH, draftMessage } from '../../lib/hdDraft';

/**
 * Механическая часть «Правил текстов» плана калькулятора
 * (docs/superpowers/plans/2026-10-08-human-design-calculator.md) и «Правил
 * переводов» (docs/superpowers/plans/2026-10-14-hd-calculator-languages.md,
 * по образцу src/content/values/texts.test.ts). Смысл, тон и честность
 * границ — ревью владельца; здесь то, что ломается молча: пропавший канал,
 * пустое поле, ключ шаблона с опечаткой, цена, эмодзи, кириллица или слово
 * «агент» на языке перевода, иероглиф в не-китайском файле (перепутанный
 * параллельный перевод), текст не в пределах своего языка.
 */
const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
const EMOJI = /\p{Extended_Pictographic}/u;
// Цена — только «25 000 токенов в подарок»; рубли, доллары и пакеты не называем.
const PRICE = /₽|руб\.|рубл|\$|€/;

// Кириллица в переводе — почти наверняка не доперевели или скопировали из ru.
const CYRILLIC = /\p{Script=Cyrillic}/u;
// \u3000-\u303F — полноширинная пунктуация CJK (в т.ч. скобки «（）»),
// \uFF00-\uFFEF — полноширинные формы; вместе с Han — то, что уместно только в zh.
const WIDE = /[\p{Script=Han}\u3000-\u303F\uFF00-\uFFEF]/u;
// Продукт никогда не называет ассистентов «агентами» — ни по-русски (см.
// соседнее правило «без эмодзи, без цен, без слова «агент»» с /агент/i), ни
// на языке перевода: agent/agente/agentes/agents/agenten, 智能体.
const AGENT_WORD = /(?<!\p{L})agent(?:es?|s|en)?(?!\p{L})|智能体/iu;

// Китайский передаёт ту же мысль в ~2,5–3 раза меньшим числом знаков (замер
// на текстах сайта, как в src/content/values/texts.test.ts). description —
// как у страниц ассистентов; text — у коротких описаний
// типа/авторитета/профиля/определённости/центра/канала.
const limitsFor = (code: string) =>
  code === 'zh' ? { description: [40, 120], text: [25, 200] } : { description: [100, 180], text: [60, 420] };

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const keys = (o: object) => Object.keys(o).sort();
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('тексты калькулятора', () => {
  it('русский — источник переводов — на месте', () => {
    expect(Object.keys(HD_TEXTS)).toContain('ru');
  });

  for (const [code, t] of Object.entries(HD_TEXTS)) {
    describe(code, () => {
      it('описан каждый тип, авторитет, профиль, определённость, центр и канал', () => {
        expect(keys(t.types)).toEqual([...HD_TYPES].sort());
        expect(keys(t.authorities)).toEqual([...HD_AUTHORITIES].sort());
        expect(keys(t.profiles)).toEqual([...PROFILES].sort());
        expect(keys(t.definitions)).toEqual([...HD_DEFINITIONS].sort());
        expect(keys(t.centers)).toEqual([...CENTER_IDS].sort());
        expect(keys(t.channels)).toEqual(CHANNELS.map(channelKey).sort());
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

      it('метатеги, вводный текст, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(limits.description[0]);
        expect(t.description.length).toBeLessThanOrEqual(limits.description[1]);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('описания короткие: в пределах языка', () => {
        const texts = [
          ...Object.values(t.types).map((x) => x.text),
          ...Object.values(t.authorities).map((x) => x.text),
          ...Object.values(t.profiles).map((x) => x.text),
          ...Object.values(t.definitions).map((x) => x.text),
          ...Object.values(t.centers).flatMap((x) => [x.defined, x.open]),
          ...Object.values(t.channels).map((x) => x.text),
        ];
        expect(texts).toHaveLength(5 + 7 + 12 + 5 + 18 + 36);
        for (const s of texts) {
          expect(s.length, s).toBeGreaterThanOrEqual(limits.text[0]);
          expect(s.length, s).toBeLessThanOrEqual(limits.text[1]);
        }
      });

      it('шаблоны с нужными ключами', () => {
        expect(placeholders(t.message)).toEqual(['authority', 'city', 'date', 'offset', 'profile', 'time', 'type']);
        expect(placeholders(t.form.zoneLine)).toEqual(['city', 'offset']);
        expect(placeholders(t.result.dataLine)).toEqual(['city', 'date', 'offset', 'time']);
        expect(placeholders(t.form.dstGap)).toEqual(['time']);
        expect(placeholders(t.form.dstAmbiguous)).toEqual(['time']);
        expect(placeholders(t.form.dstBefore)).toEqual(['offset']);
        expect(placeholders(t.form.dstAfter)).toEqual(['offset']);
        expect(placeholders(t.result.bodygraphLabel)).toEqual(['centers', 'type']);
        expect(placeholders(t.result.bodygraphLabelEmpty)).toEqual(['type']);
      });

      it('сообщение Райе укладывается в лимит кабинета при любом сочетании', () => {
        // Кириллический город — только для ru; в переводах латиница, иначе
        // «перевод: ни кириллицы…» ниже ловил бы собственные данные теста.
        const city = code === 'ru' ? 'Петропавловск-Камчатский' : 'Petropavlovsk-Kamchatsky';
        for (const type of HD_TYPES) {
          for (const authority of HD_AUTHORITIES) {
            const message = draftMessage(
              t.message,
              {
                date: '1990-03-12',
                time: '14:25',
                city,
                offset: 'UTC+12',
                type: t.types[type].name,
                profile: '3/5',
                authority: t.authorities[authority].inMessage,
              },
              code,
            );
            expect(message.length).toBeLessThan(DRAFT_MAX_LENGTH);
          }
        }
      });

      if (code !== 'ru') {
        it('перевод: ни кириллицы, ни слова «агент» на языке перевода', () => {
          for (const s of strings(t)) {
            expect(s).not.toMatch(CYRILLIC);
            expect(s).not.toMatch(AGENT_WORD);
          }
        });
      }

      if (code !== 'zh' && code !== 'ru') {
        // Переводчики работают параллельно — иероглиф или полноширинный знак
        // в не-китайском файле почти наверняка вставлен не туда (копипаста,
        // перепутанный язык).
        it('перевод: без иероглифов и полноширинной пунктуации (не та параллельная версия)', () => {
          for (const s of strings(t)) expect(s).not.toMatch(WIDE);
        });
      }
    });
  }

  describe('ru — решения из спеки', () => {
    const t = HD_TEXTS.ru;
    it('H1', () => {
      expect(t.h1).toBe('Расчёт Human Design онлайн — бодиграф бесплатно');
    });
    it('кнопка и строка под ней', () => {
      expect(t.result.cta).toBe('Разобрать с Райей');
      expect(t.result.ctaNote).toMatch(/эксперимент на 7 дней/);
      expect(t.result.ctaNote).toMatch(/25\s000 токенов в подарок/);
    });
    it('оговорка: самопознание, не прогноз и не замена специалисту', () => {
      expect(t.disclaimer).toMatch(/самопознани/);
      expect(t.disclaimer).toMatch(/не прогноз/);
      expect(t.disclaimer).toMatch(/врач/);
    });
    it('пункт крошек — как в спеке', () => {
      expect(t.breadcrumb).toBe('Расчёт Human Design');
    });
  });
});
