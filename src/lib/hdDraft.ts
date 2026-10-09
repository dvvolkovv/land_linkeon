import { appUrl } from './appUrl';

/** id Райи в приложении (таблица agents). */
export const RAYA_ID = 14;

/** Кабинет отбрасывает черновик длиннее — см. spirits_front/src/utils/pendingDraft.ts. */
export const DRAFT_MAX_LENGTH = 600;

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

/** Подстановка {ключей} шаблона из текстов страницы. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole);
}

/** Текст первого сообщения Райе. Дата — по-русски: 12.03.1990. */
export function draftMessage(template: string, parts: DraftParts): string {
  const [y, m, d] = parts.date.split('-');
  return fillTemplate(template, { ...parts, date: `${d}.${m}.${y}` });
}

/** Ссылка без черновика — она и стоит в href кнопки. */
export function rayaChatHref(): string {
  return appUrl('/chat', { assistant: String(RAYA_ID), utm_content: 'hd-calc' });
}

/**
 * Обрезка по границе символа: срез посреди суррогатной пары (эмодзи, редкий
 * иероглиф) оставил бы половинку, и encodeURIComponent бросил бы URIError.
 */
function cut(text: string, max: number): string {
  if (text.length <= max) return text;
  const last = text.charCodeAt(max - 1);
  return text.slice(0, last >= 0xd800 && last <= 0xdbff ? max - 1 : max);
}

/**
 * Полная ссылка с черновиком во фрагменте (#draft=…): браузер не отправляет
 * фрагмент на сервер. Строится только в момент клика — в разметке (href)
 * данных рождения нет: её читают Вебвизор и отслеживание ссылок Метрики.
 */
export function rayaChatUrlWithDraft(message: string): string {
  return `${rayaChatHref()}#draft=${encodeURIComponent(cut(message, DRAFT_MAX_LENGTH))}`;
}
