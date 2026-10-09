import { describe, expect, it } from 'vitest';
import { HD_TEXTS } from './texts.server';
import { PROFILES } from './types';
import { CENTER_IDS, CHANNELS, HD_AUTHORITIES, HD_DEFINITIONS, HD_TYPES, channelKey } from '../../lib/human-design';
import { DRAFT_MAX_LENGTH, draftMessage } from '../../lib/hdDraft';

/**
 * Механическая часть «Правил текстов» плана калькулятора. Смысл, тон и
 * честность границ — ревью владельца; здесь то, что ломается молча:
 * пропавший канал, пустое поле, ключ шаблона с опечаткой, цена, эмодзи.
 */
const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
const EMOJI = /\p{Extended_Pictographic}/u;
// Цена — только «25 000 токенов в подарок»; рубли, доллары и пакеты не называем.
const PRICE = /₽|руб\.|рубл|\$|€/;

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

      it('метатеги, вводный текст, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(100);
        expect(t.description.length).toBeLessThanOrEqual(180);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('описания короткие: 60–420 знаков', () => {
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
          expect(s.length, s).toBeGreaterThanOrEqual(60);
          expect(s.length, s).toBeLessThanOrEqual(420);
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
        for (const type of HD_TYPES) {
          for (const authority of HD_AUTHORITIES) {
            const message = draftMessage(t.message, {
              date: '1990-03-12',
              time: '14:25',
              city: 'Петропавловск-Камчатский',
              offset: 'UTC+12',
              type: t.types[type].name,
              profile: '3/5',
              authority: t.authorities[authority].inMessage,
            });
            expect(message.length).toBeLessThan(DRAFT_MAX_LENGTH);
          }
        }
      });
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
