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

/** Текст первого сообщения Райе. Дата — по-русски: 12.03.1990. */
export function draftMessage(template: string, parts: DraftParts): string {
  const [y, m, d] = parts.date.split('-');
  return fillTemplate(template, { ...parts, date: `${d}.${m}.${y}` });
}

/** Ссылка без черновика — она и стоит в href кнопки. */
export const rayaChatHref = (): string => chatHref(RAYA_ID, 'hd-calc');

/** Ссылка с данными рождения во фрагменте — только в момент клика (см. chatUrlWithDraft). */
export const rayaChatUrlWithDraft = (message: string): string => chatUrlWithDraft(RAYA_ID, 'hd-calc', message);
