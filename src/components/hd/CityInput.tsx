import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import type { HdTexts } from '../../content/hd/types';
import { cityPlace, searchCities, type City, type CityIndex } from '../../lib/cities';
import { loadCityIndex } from '../../lib/cityLoader';

interface Props {
  texts: HdTexts;
  value: City | null;
  onChange: (city: City | null) => void;
}

const LIST_ID = 'hd-city-list';
/** Общий класс полей формы — переиспользуется в HdForm.tsx. */
export const FIELD_CLASS =
  'ym-disable-keys mt-1 w-full rounded-lg border border-paper-400 bg-white px-3 py-2.5 text-paper-900 focus:outline-none focus:ring-2 focus:ring-brand-800';

/**
 * Поле города с подсказками (combobox по образцу APG). База городов грузится
 * при первом фокусе. Поле и список скрыты от Вебвизора: ym-disable-keys —
 * значение поля, ym-hide-content — текст подсказок.
 */
export default function CityInput({ texts, value, onChange }: Props) {
  const f = texts.form;
  const [query, setQuery] = useState(value?.name ?? '');
  const [index, setIndex] = useState<CityIndex | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const options = useMemo(() => (index ? searchCities(index, query) : []), [index, query]);
  const listShown = open && options.length > 0;

  // Активная подсказка должна оставаться в видимой части списка и при
  // навигации стрелками до самого верха или низа.
  useEffect(() => {
    if (listShown) document.getElementById(`hd-city-option-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, listShown]);

  const load = () => {
    if (index || status === 'loading') return;
    setStatus('loading');
    loadCityIndex()
      .then((loaded) => {
        setIndex(loaded);
        setStatus('idle');
      })
      .catch(() => setStatus('error'));
  };

  const choose = (city: City) => {
    onChange(city);
    setQuery(city.name);
    setOpen(false);
  };

  const onInput = (text: string) => {
    setQuery(text);
    setActive(0);
    setOpen(true);
    if (value) onChange(null);
    load();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Иероглиф в будущих языках набирается через IME в несколько нажатий:
    // Enter и стрелки во время набора должны уходить редактору, не списку.
    if (e.nativeEvent.isComposing) return;
    if (!listShown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(options[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hint =
    status === 'loading'
      ? f.cityLoading
      : status === 'error'
        ? f.cityLoadError
        : open && index && query.trim().length >= 2 && options.length === 0
          ? f.cityNotFound
          : f.cityHint;

  // У поля города сознательно нет name — см. комментарий в HdForm.tsx.
  return (
    <div className="relative">
      <label htmlFor="hd-city" className="block text-sm font-semibold text-paper-900">
        {f.city}
      </label>
      <input
        id="hd-city"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={listShown}
        aria-controls={listShown ? LIST_ID : undefined}
        aria-activedescendant={listShown ? `hd-city-option-${active}` : undefined}
        aria-describedby="hd-city-hint"
        aria-required="true"
        autoComplete="off"
        spellCheck={false}
        placeholder={f.cityPlaceholder}
        value={query}
        onFocus={load}
        // Фокус не повторится, если поле уже в фокусе: после неудачной
        // загрузки подсказка зовёт нажать на поле ещё раз — это клик, не focus.
        onClick={load}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        className={FIELD_CLASS}
      />
      {listShown && (
        <ul
          id={LIST_ID}
          role="listbox"
          // mousedown, а не click: иначе поле теряет фокус и список
          // закрывается раньше, чем выбор дойдёт до обработчика выбора.
          onMouseDown={(e) => e.preventDefault()}
          className="ym-hide-content absolute z-20 mt-1 w-full max-h-72 overflow-auto rounded-lg border border-paper-300 bg-white py-1 shadow-lg"
        >
          {options.map((city, i) => (
            <li
              key={`${i}-${city.name}`}
              id={`hd-city-option-${i}`}
              role="option"
              aria-selected={i === active}
              onClick={() => choose(city)}
              className={`cursor-pointer px-3 py-2 ${i === active ? 'bg-brand-100 ring-2 ring-inset ring-brand-800' : ''}`}
            >
              <span className="font-medium text-paper-900">{city.name}</span>{' '}
              <span className="text-sm text-paper-600">{cityPlace(city)}</span>
            </li>
          ))}
        </ul>
      )}
      <p id="hd-city-hint" aria-live="polite" className="mt-1 text-xs text-paper-600">
        {hint}
      </p>
    </div>
  );
}
