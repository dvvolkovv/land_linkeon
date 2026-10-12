import { describe, expect, it, vi } from 'vitest';
import { convert, localToday } from './hdFormLogic';

const KAZAN = { name: 'Казань', region: 'Республика Татарстан', country: 'Россия', zone: 'Europe/Moscow' };

describe('convert', () => {
  it('город не выбран — null', () => {
    expect(convert('2000-01-01', '12:00', null)).toBeNull();
  });

  it('дата или время не в формате YYYY-MM-DD / HH:MM — null, не исключение', () => {
    expect(convert('', '12:00', KAZAN)).toBeNull();
    expect(convert('2000-01-01', '', KAZAN)).toBeNull();
    expect(convert('2000-1-1', '12:00', KAZAN)).toBeNull();
    expect(convert('2000-01-01', '9:30', KAZAN)).toBeNull();
    expect(convert('2000-01-01', '09:30:00', KAZAN)).toBeNull();
  });

  it('формат в порядке, но пояс браузеру не известен — unknownZone', () => {
    expect(convert('2000-01-01', '12:00', { ...KAZAN, zone: 'Not/AZone' })).toBe('unknownZone');
  });

  it('известный пояс, обычная дата без перевода стрелок — ok', () => {
    const result = convert('2000-06-15', '12:00', KAZAN);
    if (!result || result === 'unknownZone') throw new Error(`ожидался результат 'ok', получено ${String(result)}`);
    expect(result.kind).toBe('ok');
  });
});

describe('localToday', () => {
  it('формат YYYY-MM-DD с ведущими нулями', () => {
    expect(localToday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('дата по часам посетителя, а не по UTC', () => {
    const saved = process.env.TZ;
    process.env.TZ = 'Pacific/Kiritimati'; // UTC+14
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-08T12:00:00Z')); // там уже 9 октября
    try {
      expect(localToday()).toBe('2026-10-09');
    } finally {
      vi.useRealTimers();
      if (saved === undefined) delete process.env.TZ; // присвоение undefined даёт строку "undefined"
      else process.env.TZ = saved;
    }
  });
});
