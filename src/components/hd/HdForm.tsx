import { useMemo, useState, type FormEvent } from 'react';
import Button from '../ui/Button';
import CityInput from './CityInput';
import type { HdTexts } from '../../content/hd/types';
import type { City } from '../../lib/cities';
import { fillTemplate } from '../../lib/hdDraft';
import { reachGoal } from '../../lib/goal';
import { calculateChart, formatOffset, localToUtc, type Conversion, type HdChart } from '../../lib/human-design';

export interface HdResultData {
  chart: HdChart;
  /** Ввод человека — только для строки результата и черновика Райе, никуда не уходит. */
  date: string;
  time: string;
  city: City;
  offsetSeconds: number;
}

type DstChoice = 'before' | 'after';

/** null — данных не хватает; 'unknownZone' — браузер не знает пояс города. */
function convert(date: string, time: string, city: City | null): Conversion | 'unknownZone' | null {
  if (!date || !time || !city) return null;
  try {
    return localToUtc({ date, time }, city.zone);
  } catch {
    return 'unknownZone';
  }
}

const FIELD_CLASS =
  'ym-disable-keys mt-1 w-full rounded-lg border border-paper-400 bg-white px-3 py-2.5 text-paper-900 focus:outline-none focus:ring-2 focus:ring-brand-800';

/**
 * Форма: дата, время, город. Считает на устройстве — по кнопке, мгновенно.
 * Ничего не хранит: после перезагрузки форма пустая. Поля скрыты от
 * Вебвизора (ym-disable-keys), строки с данными — ym-hide-content.
 */
export default function HdForm({ texts, onResult }: { texts: HdTexts; onResult: (r: HdResultData) => void }) {
  const f = texts.form;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [choice, setChoice] = useState<DstChoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Перевод — заранее, до кнопки: показать пояс на дату рождения и, если
  // время попало в час перевода стрелок, спросить «до или после».
  const conversion = useMemo(() => convert(date, time, city), [date, time, city]);
  const transition = conversion && conversion !== 'unknownZone' && conversion.kind !== 'ok' ? conversion : null;
  const today = new Date().toISOString().slice(0, 10);

  // Любая правка ввода сбрасывает ответ на вопрос о переводе стрелок и ошибку.
  const edit = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setChoice(null);
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !time || !city) return setError(f.missing);
    if (date > today || date < '1900-01-01') return setError(f.futureDate);
    if (conversion === 'unknownZone') return setError(f.zoneUnknown);
    let result;
    try {
      result = calculateChart({ date, time, zone: city.zone, dst: choice ?? undefined });
    } catch {
      return setError(f.missing);
    }
    if (result.kind !== 'ok') return setError(f.dstChoose);
    setError(null);
    onResult({ chart: result.chart, date, time, city, offsetSeconds: result.offsetSeconds });
    // Только факт расчёта: ни даты, ни города в цели нет.
    reachGoal('hd-calc-submit');
  };

  return (
    <form onSubmit={submit} autoComplete="off" noValidate className="space-y-5" data-testid="hd-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hd-date" className="block text-sm font-semibold text-paper-900">
            {f.date}
          </label>
          <input
            id="hd-date"
            type="date"
            min="1900-01-01"
            max={today}
            value={date}
            onChange={(e) => edit(setDate)(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="hd-time" className="block text-sm font-semibold text-paper-900">
            {f.time}
          </label>
          <input
            id="hd-time"
            type="time"
            value={time}
            aria-describedby="hd-time-hint"
            onChange={(e) => edit(setTime)(e.target.value)}
            className={FIELD_CLASS}
          />
          <p id="hd-time-hint" className="mt-1 text-xs text-paper-600">
            {f.timeHint}
          </p>
        </div>
      </div>

      <CityInput texts={texts} value={city} onChange={edit(setCity)} />

      {city && conversion && conversion !== 'unknownZone' && conversion.kind === 'ok' && (
        <p className="ym-hide-content text-sm text-paper-800" data-testid="hd-zone-line">
          {fillTemplate(f.zoneLine, { city: city.name, offset: formatOffset(conversion.offsetSeconds) })}
        </p>
      )}

      {transition && (
        <fieldset className="ym-hide-content rounded-xl border border-amber-300 bg-amber-50 p-4" data-testid="hd-dst">
          <legend className="px-1 text-sm font-semibold text-paper-900">
            {fillTemplate(transition.kind === 'gap' ? f.dstGap : f.dstAmbiguous, { time })}
          </legend>
          {(['before', 'after'] as const).map((key) => (
            <label key={key} className="mt-2 flex items-center gap-2 text-sm text-paper-800">
              <input
                type="radio"
                name="hd-dst"
                value={key}
                checked={choice === key}
                onChange={() => {
                  setChoice(key);
                  setError(null);
                }}
              />
              {fillTemplate(key === 'before' ? f.dstBefore : f.dstAfter, {
                offset: formatOffset(transition[key].offsetSeconds),
              })}
            </label>
          ))}
        </fieldset>
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-rose-700">
          {error}
        </p>
      )}

      <Button type="submit" size="lg">
        {f.submit}
      </Button>
    </form>
  );
}
