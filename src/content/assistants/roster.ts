/**
 * Типизированный вход в реестр ассистентов. Данные — в roster.data.js (его
 * читают и node-скрипты, которым TypeScript недоступен).
 */
export type { AssistantSlug, AssistantCategory, AssistantEntry } from './roster.data.js';
export { ASSISTANTS, ASSISTANT_SLUGS } from './roster.data.js';

import { ASSISTANTS, type AssistantEntry, type AssistantSlug } from './roster.data.js';

export function assistantBySlug(slug: string): AssistantEntry | undefined {
  return ASSISTANTS.find((a) => a.slug === slug);
}

export function isAssistantSlug(value: string): value is AssistantSlug {
  return ASSISTANTS.some((a) => a.slug === value);
}

/** Имя на языке страницы; на незнакомом языке — английское написание. */
export function assistantName(entry: AssistantEntry, language: string): string {
  return entry.names[language] ?? entry.names.en;
}
