import { chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';

// Общая часть (лимит, шаблон, обрезка, ссылка) — в chatDraft.ts; здесь —
// только то, что про Райю. Реэкспорт — чтобы прежние импорты не менялись.
export { DRAFT_MAX_LENGTH, fillTemplate } from './chatDraft';

/** id Райи в приложении (таблица agents). */
export const RAYA_ID = 14;

export interface DraftParts {
  /** 'YYYY-MM-DD' из поля даты. */
  date: string;
  /** 'HH:MM' */
  time: string;
  city: string;
  /** «UTC+3» */
  offset: string;
  type: string;
  profile: string;
  /** «сакральный авторитет» */
  authority: string;
}

/**
 * Дата рождения для строки данных и черновика Райе. По-русски — 12.03.1990,
 * как было; на других языках — месяц словом: «12 March 1990» не спутать с
 * 3 декабря, как американское 03/12.
 */
export function formatBirthDate(date: string, language: string): string {
  const [y, m, d] = date.split('-');
  if (language === 'ru') return `${d}.${m}.${y}`;
  const locale = language === 'en' ? 'en-GB' : language === 'pt' ? 'pt-PT' : language;
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(Number(y), Number(m) - 1, Number(d))),
  );
}

/** Текст первого сообщения Райе на языке страницы. */
export function draftMessage(template: string, parts: DraftParts, language: string): string {
  return fillTemplate(template, { ...parts, date: formatBirthDate(parts.date, language) });
}

/** Ссылка без черновика — она и стоит в href кнопки. */
export const rayaChatHref = (): string => chatHref(RAYA_ID, 'hd-calc');

/** Ссылка с данными рождения во фрагменте — только в момент клика (см. chatUrlWithDraft). */
export const rayaChatUrlWithDraft = (message: string): string => chatUrlWithDraft(RAYA_ID, 'hd-calc', message);
