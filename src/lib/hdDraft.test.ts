import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH, RAYA_ID, draftMessage, fillTemplate, formatBirthDate, rayaChatHref, rayaChatUrlWithDraft } from './hdDraft';

const TEMPLATE =
  'Райя, привет! Мои данные рождения: {date}, {time}, {city} ({offset}). Калькулятор показал: {type}, профиль {profile}, {authority}. Расскажи, что это значит для меня';

const PARTS = {
  date: '1990-03-12',
  time: '14:25',
  city: 'Казань',
  offset: 'UTC+3',
  type: 'Генератор',
  profile: '3/5',
  authority: 'сакральный авторитет',
};

describe('черновик сообщения Райе', () => {
  it('текст как в спеке', () => {
    expect(draftMessage(TEMPLATE, PARTS, 'ru')).toBe(
      'Райя, привет! Мои данные рождения: 12.03.1990, 14:25, Казань (UTC+3). Калькулятор показал: Генератор, профиль 3/5, сакральный авторитет. Расскажи, что это значит для меня',
    );
  });

  it('незнакомый ключ остаётся как есть — опечатку видно', () => {
    expect(fillTemplate('{city} {oops}', { city: 'Казань' })).toBe('Казань {oops}');
  });

  it('самый длинный реальный случай укладывается в лимит кабинета', () => {
    const long = draftMessage(
      TEMPLATE,
      {
        ...PARTS,
        city: 'Петропавловск-Камчатский',
        offset: 'UTC+12',
        type: 'Манифестирующий генератор',
        authority: 'ментальный авторитет (через окружение)',
      },
      'ru',
    );
    expect(long.length).toBeLessThan(DRAFT_MAX_LENGTH);
  });
});

describe('дата рождения по языку', () => {
  it('русский — 12.03.1990, как было', () => {
    expect(formatBirthDate('1990-03-12', 'ru')).toBe('12.03.1990');
  });
  it('остальные — месяц словом', () => {
    expect(formatBirthDate('1990-03-12', 'en')).toBe('12 March 1990');
    expect(formatBirthDate('1990-03-12', 'de')).toBe('12. März 1990');
    expect(formatBirthDate('1990-03-12', 'es')).toBe('12 de marzo de 1990');
    expect(formatBirthDate('1990-03-12', 'fr')).toBe('12 mars 1990');
    expect(formatBirthDate('1990-03-12', 'pt')).toBe('12 de março de 1990');
    expect(formatBirthDate('1990-03-12', 'zh')).toBe('1990年3月12日');
  });
  it('старые даты — тоже', () => {
    expect(formatBirthDate('1799-01-05', 'en')).toBe('5 January 1799');
  });
});

describe('ссылка к Райе', () => {
  it('в href — без черновика: его читают Вебвизор и отслеживание ссылок', () => {
    const href = rayaChatHref();
    expect(href).toMatch(/^https:\/\/my\.linkeon\.io\/chat\?/);
    expect(new URL(href).searchParams.get('assistant')).toBe(String(RAYA_ID));
    expect(new URL(href).searchParams.get('utm_content')).toBe('hd-calc');
    expect(href).not.toContain('#');
  });

  it('черновик — во фрагменте, целиком и в кодировке', () => {
    const url = new URL(rayaChatUrlWithDraft('Райя, привет! 12.03.1990, 14:25'));
    expect(url.searchParams.get('assistant')).toBe('14');
    expect(url.hash.startsWith('#draft=')).toBe(true);
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toBe('Райя, привет! 12.03.1990, 14:25');
  });

  it('длиннее лимита — обрезается, а не теряется целиком', () => {
    const url = new URL(rayaChatUrlWithDraft('я'.repeat(DRAFT_MAX_LENGTH + 50)));
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toHaveLength(DRAFT_MAX_LENGTH);
  });

  // new URL сам кодирует кириллицу и пробелы во фрагменте, а «%» — нет: без
  // encodeURIComponent кабинет споткнулся бы на decodeURIComponent.
  it('знак % доходит до кабинета целым', () => {
    const url = new URL(rayaChatUrlWithDraft('100% готово'));
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toBe('100% готово');
  });

  it('обрезка не режет символ пополам', () => {
    const text = 'я'.repeat(DRAFT_MAX_LENGTH - 1) + String.fromCodePoint(0x1f600);
    const url = new URL(rayaChatUrlWithDraft(text));
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toBe('я'.repeat(DRAFT_MAX_LENGTH - 1));
  });
});
