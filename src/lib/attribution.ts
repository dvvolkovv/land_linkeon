// Единый источник меток привлечения для ЛЕНДИНГА.
//
// Проблема, которую решает: utm_* / ref живут в query-string и теряются, как
// только пользователь поскроллил, кликнул внутренний якорь или вкладка
// перезагрузилась — а CTA на приложение строится позже (appUrl) и трекер
// (track.ts) тоже читает URL «вживую». Из-за этого клик с рекламы мог уехать в
// приложение уже без метки, и атрибуция рвалась.
//
// Решение: при первом заходе фиксируем метки в localStorage (first-touch) и
// дальше ВСЕ потребители (трекер + ссылки на app) читают их отсюда. Явная метка
// в URL всегда побеждает кэш (поздний клик по новой рекламе переатрибутируется).

const KEY = 'll_attribution';
const FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'] as const;

type Attr = Partial<Record<(typeof FIELDS)[number], string>>;

function fromUrl(): Attr {
  const p = new URLSearchParams(window.location.search);
  const a: Attr = {};
  for (const f of FIELDS) {
    const v = p.get(f);
    if (v) a[f] = v;
  }
  return a;
}

function read(): Attr {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attr) : {};
  } catch {
    return {};
  }
}

// Вызывать как можно раньше (main.tsx) — фиксирует метки до того, как URL
// успеет «почиститься». Явные метки из URL перетирают кэш; иначе кэш остаётся.
export function persistAttribution(): void {
  try {
    const url = fromUrl();
    if (Object.keys(url).length > 0) {
      localStorage.setItem(KEY, JSON.stringify(url));
    }
  } catch {
    /* трекинг никогда не ломает лендинг */
  }
}

// Текущие метки: URL имеет приоритет (свежий клик), иначе — сохранённые.
export function getAttribution(): Attr {
  const url = fromUrl();
  if (Object.keys(url).length > 0) return url;
  return read();
}
