import type { City } from '../../lib/cities';
import { localToUtc, type Conversion } from '../../lib/human-design';

/**
 * Чистая логика формы отдельно от HdForm.tsx: react-refresh не разрешает
 * файлу с компонентом экспортировать что-то кроме констант (FIELD_CLASS в
 * CityInput.tsx — можно, он подпадает под allowConstantExport; функция —
 * нет). Это и даёт возможность проверить localToday/convert юнит-тестом без
 * DOM — своего теста у самой формы нет (см. HdForm.tsx).
 */
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

/** Сегодня по часам посетителя: toISOString() дал бы дату по UTC. */
export function localToday(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * null — формат не похож на дату/время или город не выбран; 'unknownZone' —
 * формат в порядке, но браузер не знает часовой пояс города.
 */
export function convert(date: string, time: string, city: City | null): Conversion | 'unknownZone' | null {
  if (!city || !DATE_RE.test(date) || !TIME_RE.test(time)) return null;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: city.zone });
  } catch {
    return 'unknownZone';
  }
  return localToUtc({ date, time }, city.zone);
}
