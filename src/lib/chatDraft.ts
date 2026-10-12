import { appUrl } from './appUrl';

/** Кабинет отбрасывает черновик длиннее — см. spirits_front/src/utils/pendingDraft.ts. */
export const DRAFT_MAX_LENGTH = 600;

/** Подстановка {ключей} шаблона из текстов страницы. Незнакомый ключ остаётся как есть. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole);
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

/** Ссылка в чат с ассистентом без черновика — она и стоит в href кнопки. */
export function chatHref(assistantId: number, utmContent: string): string {
  return appUrl('/chat', { assistant: String(assistantId), utm_content: utmContent });
}

/**
 * Полная ссылка с черновиком во фрагменте (#draft=…): браузер не отправляет
 * фрагмент на сервер, кабинет забирает его скриптом до Метрики. Строится
 * только в момент клика — в разметке (href) черновика нет: её читают
 * Вебвизор и отслеживание ссылок Метрики.
 */
export function chatUrlWithDraft(assistantId: number, utmContent: string, message: string): string {
  return `${chatHref(assistantId, utmContent)}#draft=${encodeURIComponent(cut(message, DRAFT_MAX_LENGTH))}`;
}
