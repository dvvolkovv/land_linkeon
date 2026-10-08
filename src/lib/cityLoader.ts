import citiesUrl from '../content/hd/cities.ru.json?url';
import { indexCities, type CityDb, type CityIndex } from './cities';

let pending: Promise<CityIndex> | null = null;

/**
 * База городов — отдельным файлом (около 1,5 МБ), только когда человек
 * взялся за поле города: остальным посетителям страницы она не нужна.
 * Сорвалась загрузка — следующий фокус пробует снова.
 */
export function loadCityIndex(): Promise<CityIndex> {
  if (!pending) {
    pending = fetch(citiesUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`города: HTTP ${response.status}`);
        return response.json() as Promise<CityDb>;
      })
      .then(indexCities);
    pending.catch(() => {
      pending = null;
    });
  }
  return pending;
}
