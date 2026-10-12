import { trackLandingCta } from './track';

/** Счётчик Яндекс Метрики лендинга (тот же — в index.html). */
export const METRIKA_ID = 105902201;

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string) => void;
  }
}

/** Цель Метрики. Уходит только имя цели — никаких данных со страницы. */
export function reachGoal(goal: string): void {
  if (window.ym) window.ym(METRIKA_ID, 'reachGoal', goal);
}

/**
 * Клик по кнопке перехода в приложение (`data-cta`): в нашу таблицу событий и в
 * Метрику. landing_cta_click — шаг «Нажал „Начать“» воронки в админке и пункт
 * политики конфиденциальности («нажатие кнопки перехода в Приложение»), поэтому
 * остальные цели, например «расчёт сделан», идут только в Метрику.
 */
export function reachCtaGoal(cta: string): void {
  trackLandingCta(cta);
  reachGoal(cta);
}
