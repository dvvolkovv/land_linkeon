import { trackLandingCta } from './track';

/** Счётчик Яндекс Метрики лендинга (тот же — в index.html). */
export const METRIKA_ID = 105902201;

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string) => void;
  }
}

/**
 * Цель лендинга: в нашу таблицу событий (landing_cta_click) и в Метрику.
 * Уходит только имя цели — никаких данных со страницы.
 */
export function reachGoal(goal: string): void {
  trackLandingCta(goal);
  if (window.ym) window.ym(METRIKA_ID, 'reachGoal', goal);
}
