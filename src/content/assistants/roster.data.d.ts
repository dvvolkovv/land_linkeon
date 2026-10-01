/**
 * Союз пишется руками синхронно с массивом ASSISTANTS в roster.data.js —
 * tsc не заглядывает в тело .js, поэтому рассинхрон компилятор не поймает.
 * Его ловит packs.test.ts («полнота языков»): ключи пакета каждого языка
 * pages/<код>.ts сравниваются с ASSISTANT_SLUGS. Сам пакет типизирован
 * Record<AssistantSlug, …>, поэтому этот тест вместе с `pnpm typecheck`
 * держит союз, массив и пакеты в одном составе.
 */
export type AssistantSlug =
  | 'roman' | 'alexey' | 'anna' | 'andrey' | 'vitaly' | 'alexandra' | 'ekaterina' | 'pavel'
  | 'irina' | 'dmitry' | 'kira' | 'misha' | 'olia' | 'masha' | 'liana' | 'shankara' | 'raya'
  | 'polina';

/** Значения колонки agents.category в базе приложения. */
export type AssistantCategory = 'assistant' | 'business' | 'personal';

export interface AssistantEntry {
  slug: AssistantSlug;
  /** agents.id — по нему кабинет открывает чат: /chat?assistant=<id>. */
  id: number;
  category: AssistantCategory;
  /** Соседи для блока «Работает в паре с», 2–3 штуки. */
  related: AssistantSlug[];
  /** displayName из GET /webhook/agents?lang=<код>, по коду языка. */
  names: Record<string, string>;
}

export declare const ASSISTANTS: AssistantEntry[];
export declare const ASSISTANT_SLUGS: AssistantSlug[];
