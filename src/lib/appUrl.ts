// Строит URL на приложение my.linkeon.io, ПРОБРАСЫВАЯ метки привлечения
// (utm_* / ref) из текущего URL лендинга. Без этого реклама неизмерима: метка
// остаётся на лендинге, а eventsClient приложения её не видит → атрибуция
// рвётся на стыке лендинг→app (бэклог d5245dce, 1a5adfbc).
import { getAttribution } from './attribution';

const APP = 'https://my.linkeon.io';

export function appUrl(path = '/', extra?: Record<string, string>): string {
  try {
    const url = new URL(path, APP);
    // Метки берём из persistAttribution() (URL → localStorage), а не из «живого»
    // URL: CTA строится при загрузке и кликается позже, когда query-string мог
    // уже потеряться (скролл/якорь/перезагрузка) → метка не доезжала до app.
    const here = getAttribution();
    for (const [k, v] of Object.entries(here)) {
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
