import { createInstance, type i18n as I18n, type ResourceKey } from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import pt from './locales/pt.json';
import { DEFAULT_LANGUAGE } from './languages';

const BUNDLED: Record<string, ResourceKey> = { ru, en, es, de, fr, zh, pt };

/**
 * Экземпляр i18n для рендера на сборке. В отличие от клиентского, локали
 * загружены синхронно и целиком: асинхронного бэкенда в renderToString быть
 * не может — он рендерит один проход, ждать нечего.
 */
export function createServerI18n(language: string): I18n {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    resources: Object.fromEntries(
      Object.entries(BUNDLED).map(([code, translation]) => [code, { translation }]),
    ),
    interpolation: { escapeValue: false },
    // В i18next 25+ `initImmediate` переименован в `initAsync`; false = init
    // синхронный, без отложенного setTimeout.
    initAsync: false,
  });
  return instance;
}
