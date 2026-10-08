/**
 * Местное время рождения → момент в UTC через встроенную базу поясов браузера
 * (Intl): она знает историю поясов, декретное и летнее время.
 *
 * Перевод стрелок даёт два особых случая — оба возвращаются явно, выбор
 * делает человек:
 *  - gap: такого времени на часах не было (стрелки перевели вперёд);
 *  - ambiguous: время было дважды (стрелки перевели назад).
 * В обоих случаях `before` — прочтение по времени ДО перевода, `after` — ПОСЛЕ.
 */
export interface LocalDateTime {
  /** 'YYYY-MM-DD' */
  date: string;
  /** 'HH:MM' */
  time: string;
}

export interface Moment {
  utc: Date;
  /** Смещение пояса в секундах: +10800 = UTC+3. */
  offsetSeconds: number;
}

export type Conversion =
  | ({ kind: 'ok' } & Moment)
  | { kind: 'gap' | 'ambiguous'; before: Moment; after: Moment };

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(zone: string): Intl.DateTimeFormat {
  let f = formatters.get(zone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    formatters.set(zone, f);
  }
  return f;
}

/** Смещение пояса (секунды) в момент `ms` UTC. */
export function zoneOffsetSeconds(zone: string, ms: number): number {
  const parts: Record<string, number> = {};
  for (const p of formatter(zone).formatToParts(new Date(ms))) {
    if (p.type !== 'literal') parts[p.type] = Number(p.value);
  }
  // Старые движки отдают полночь как «24».
  const hour = parts.hour === 24 ? 0 : parts.hour;
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, hour, parts.minute, parts.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 1000);
}

const DAY_MS = 86_400_000;

function parseLocal({ date, time }: LocalDateTime): number {
  const [y, mo, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  return Date.UTC(y, mo - 1, d, h, mi, 0);
}

/**
 * Перевод. Смещения берутся за сутки до и через сутки после: между ними
 * укладывается любой перевод стрелок. Каждое проверяется обратным ходом.
 */
export function localToUtc(local: LocalDateTime, zone: string): Conversion {
  const wall = parseLocal(local);
  const before = zoneOffsetSeconds(zone, wall - DAY_MS);
  const after = zoneOffsetSeconds(zone, wall + DAY_MS);
  const moment = (offsetSeconds: number): Moment => ({ utc: new Date(wall - offsetSeconds * 1000), offsetSeconds });
  const fits = (offset: number) => zoneOffsetSeconds(zone, wall - offset * 1000) === offset;
  const valid = [...new Set([before, after])].filter(fits);
  if (valid.length === 1) return { kind: 'ok', ...moment(valid[0]) };
  return { kind: valid.length === 0 ? 'gap' : 'ambiguous', before: moment(before), after: moment(after) };
}

/** «UTC+3», «UTC+5:30», «UTC-8», «UTC+0». Секунды старых поясов отбрасываются. */
export function formatOffset(offsetSeconds: number): string {
  const sign = offsetSeconds < 0 ? '-' : '+';
  const total = Math.floor(Math.abs(offsetSeconds) / 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}
