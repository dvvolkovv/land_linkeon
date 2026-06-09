// Строит URL на приложение my.linkeon.io, ПРОБРАСЫВАЯ метки привлечения
// (utm_* / ref) из текущего URL лендинга. Без этого реклама неизмерима: метка
// остаётся на лендинге, а eventsClient приложения её не видит → атрибуция
// рвётся на стыке лендинг→app (бэклог d5245dce, 1a5adfbc).
const APP = 'https://my.linkeon.io';
const FORWARD = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'];

export function appUrl(path = '/', extra?: Record<string, string>): string {
  try {
    const url = new URL(path, APP);
    const here = new URLSearchParams(window.location.search);
    for (const k of FORWARD) {
      const v = here.get(k);
      if (v) url.searchParams.set(k, v);
    }
    // extra (напр. utm_content под конкретный CTA-блок) не перетирает реальную метку.
    if (extra) for (const [k, v] of Object.entries(extra)) {
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    return url.toString();
  } catch {
    return APP;
  }
}
