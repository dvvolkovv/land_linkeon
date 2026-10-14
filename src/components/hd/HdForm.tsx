import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Button from '../ui/Button';
import CityInput, { FIELD_CLASS } from './CityInput';
import { DATE_RE, convert, localToday } from './hdFormLogic';
import type { HdTexts } from '../../content/hd/types';
import { cityWithPlace, type City } from '../../lib/cities';
import { fillTemplate } from '../../lib/hdDraft';
import { reachGoal } from '../../lib/goal';
import { formatOffset, calculateChart, type HdChart } from '../../lib/human-design';

export interface HdResultData {
  chart: HdChart;
  /** Ввод человека — только для строки результата и черновика Райе, никуда не уходит. */
  date: string;
  time: string;
  city: City;
  offsetSeconds: number;
}

type DstChoice = 'before' | 'after';

/**
 * Форма: дата, время, город. Считает на устройстве — по кнопке, мгновенно.
 * Ничего не хранит: после перезагрузки форма пустая. Поля скрыты от
 * Вебвизора (ym-disable-keys), строки с данными — ym-hide-content.
 */
export default function HdForm({
  texts,
  language,
  onResult,
}: {
  texts: HdTexts;
  /** Язык страницы — передаётся дальше в CityInput за базой городов. */
  language: string;
  onResult: (r: HdResultData) => void;
}) {
  const f = texts.form;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [choice, setChoice] = useState<DstChoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  // До монтирования поля должны быть неактивны: пререндер отдаёт разметку как
  // рабочую форму, но createRoot не гидратирует и просто подменит DOM — дата,
  // введённая на медленном мобильном раньше, чем сработает этот эффект,
  // иначе пропадёт при замене.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  // Перевод — заранее, до кнопки: показать пояс на дату рождения и, если
  // время попало в час перевода стрелок, спросить «до или после».
  const conversion = useMemo(() => convert(date, time, city), [date, time, city]);
  const transition = conversion && conversion !== 'unknownZone' && conversion.kind !== 'ok' ? conversion : null;
  const today = localToday();

  // Любая правка ввода сбрасывает ответ на вопрос о переводе стрелок и ошибку.
  const edit = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setChoice(null);
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !time || !city) return setError(f.missing);
    if (!DATE_RE.test(date) || date > today || date < '1900-01-01') return setError(f.futureDate);
    if (conversion === 'unknownZone') return setError(f.zoneUnknown);
    if (!conversion) return setError(f.missing);
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

  // У полей даты, времени и города сознательно нет name: без него форма,
  // уйдя GET-запросом до того, как заработает JS, не положит дату рождения
  // в адрес страницы. С адресом она ушла бы и в Метрику, и в пиксель VK —
  // сам пиксель формы не сканирует, читает только name и type полей.
  return (
    <form onSubmit={submit} autoComplete="off" noValidate data-testid="hd-form">
      {/* fieldset — единственный прямой ребёнок формы, поэтому отступы между
          блоками (space-y-5) задаёт он. Рамку, поля и отступы fieldset обнуляет
          preflight, min-w-0 снимает его min-inline-size: min-content. */}
      <fieldset disabled={!ready} className="min-w-0 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hd-date" className="block text-sm font-semibold text-paper-900">
              {f.date}
            </label>
            <input
              id="hd-date"
              type="date"
              min="1900-01-01"
              // max — только когда смонтировались: в пререндере иначе легла бы
              // дата сборки, и статический HTML менялся бы каждый день.
              max={ready ? today : undefined}
              value={date}
              aria-required="true"
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
              aria-required="true"
              // slice: часть браузеров отдаёт HH:MM:SS, а не HH:MM.
              onChange={(e) => edit(setTime)(e.target.value.slice(0, 5))}
              className={FIELD_CLASS}
            />
            <p id="hd-time-hint" className="mt-1 text-xs text-paper-600">
              {f.timeHint}
            </p>
          </div>
        </div>

        <CityInput texts={texts} value={city} onChange={edit(setCity)} language={language} />

        {city && conversion && conversion !== 'unknownZone' && conversion.kind === 'ok' && (
          <p className="ym-hide-content text-sm text-paper-800" data-testid="hd-zone-line">
            {fillTemplate(f.zoneLine, {
              city: cityWithPlace(city, language),
              offset: formatOffset(conversion.offsetSeconds),
            })}
          </p>
        )}

        {transition && (
          <fieldset className="ym-hide-content rounded-xl border border-amber-300 bg-amber-50 p-4" data-testid="hd-dst">
            <legend className="float-left w-full px-1 text-sm font-semibold text-paper-900">
              {fillTemplate(transition.kind === 'gap' ? f.dstGap : f.dstAmbiguous, { time })}
            </legend>
            <div className="clear-left pt-1">
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
            </div>
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
      </fieldset>
    </form>
  );
}
