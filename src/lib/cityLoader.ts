import { indexCities, type CityDb, type CityIndex } from './cities';

// Адреса всех семи баз; браузер скачивает только ту, что нужна странице.
const URLS = import.meta.glob('../content/hd/cities.*.json', { query: '?url', import: 'default', eager: true }) as Record<
  string,
  string
>;

/** Адрес базы городов на языке страницы; незнакомый язык — русская. */
export function cityDbUrl(language: string): string {
  return URLS[`../content/hd/cities.${language}.json`] ?? URLS['../content/hd/cities.ru.json'];
}

const pending = new Map<string, Promise<CityIndex>>();

/**
 * База городов — отдельным файлом (около 1,5 МБ), только когда человек
 * взялся за поле города, и только на языке страницы: остальным посетителям
 * она не нужна. Сорвалась загрузка — следующий фокус пробует снова.
 */
export function loadCityIndex(language: string): Promise<CityIndex> {
  let p = pending.get(language);
  if (!p) {
    p = fetch(cityDbUrl(language))
      .then((response) => {
        if (!response.ok) throw new Error(`города: HTTP ${response.status}`);
        return response.json() as Promise<CityDb>;
      })
      .then(indexCities);
    pending.set(language, p);
    p.catch(() => pending.delete(language));
  }
  return p;
}
