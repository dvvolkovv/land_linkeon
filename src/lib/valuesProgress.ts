import { ANSWER_MAX, ANSWER_MIN, ITEMS } from './schwartz';

/**
 * Ключ с версией: поменялись утверждения или их порядок (src/lib/schwartz/items.ts) —
 * версия растёт, и старые записи отбрасываются как чужие.
 */
export const PROGRESS_KEY = 'values-test:v1';

/**
 * answers — ответы подряд с первого утверждения; index — текущее утверждение.
 * index ≤ answers.length: после «Назад» человек стоит на уже отвеченном.
 * index === ITEMS.length — тест пройден.
 */
export interface Progress {
  answers: number[];
  index: number;
}

export const EMPTY_PROGRESS: Progress = { answers: [], index: 0 };

export const isComplete = (p: Progress): boolean => p.index === ITEMS.length;

function isValidProgress(x: unknown): x is Progress {
  if (!x || typeof x !== 'object') return false;
  const { answers, index } = x as Partial<Progress>;
  return (
    Array.isArray(answers) &&
    answers.length <= ITEMS.length &&
    answers.every((a) => Number.isInteger(a) && a >= ANSWER_MIN && a <= ANSWER_MAX) &&
    Number.isInteger(index) &&
    (index as number) >= 0 &&
    (index as number) <= answers.length
  );
}

/** Ответ на текущее утверждение — и к следующему. */
export function answer(p: Progress, value: number): Progress {
  if (isComplete(p)) return p;
  const answers = p.answers.slice();
  answers[p.index] = value;
  return { answers, index: p.index + 1 };
}

export const back = (p: Progress): Progress => ({ ...p, index: Math.max(0, p.index - 1) });

/**
 * Прогресс этой вкладки. Ничего не отвечено, запись битая или чужой версии —
 * null (битая заодно стирается). Хранилище недоступно (приватный режим,
 * запрет сайта) — тоже null: тест идёт без сохранения.
 */
export function loadProgress(): Progress | null {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    if (isValidProgress(parsed)) {
      return parsed.answers.length > 0 ? { answers: parsed.answers, index: parsed.index } : null;
    }
    sessionStorage.removeItem(PROGRESS_KEY);
  } catch {
    // без сохранения
  }
  return null;
}

export function saveProgress(p: Progress): void {
  try {
    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    // без сохранения
  }
}

export function clearProgress(): void {
  try {
    sessionStorage.removeItem(PROGRESS_KEY);
  } catch {
    // без сохранения
  }
}
