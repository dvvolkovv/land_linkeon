import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import ru from './locales/ru.json';
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from './languages';
import { languageFromPath } from './urlLanguage';

const initial = languageFromPath(window.location.pathname);

void i18n
  // ru лежит в бандле как фолбэк, остальные локали Vite нарезает в отдельные
  // чанки и подтягивает только для своей языковой страницы.
  .use(
    resourcesToBackend((language: string) =>
      language === DEFAULT_LANGUAGE
        ? Promise.resolve({ default: ru })
        : import(`./locales/${language}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    // Язык задаётся URL'ом, а не детектором: см. urlLanguage.ts
    lng: initial,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_CODES,
    // ru отдан ресурсами, остальные — бэкендом; без флага i18next
    // считает, что раз ресурсы есть, бэкенд не нужен
    partialBundledLanguages: true,
    resources: {
      ru: { translation: ru },
    },
    interpolation: { escapeValue: false },
  })
  .then(() => {
    document.documentElement.lang = i18n.language;
  })
  .catch((error) => {
    // Сорванная загрузка чанка локали (офлайн, прокси, снятый с раздачи
    // ассет) не должна становиться unhandled rejection и тем более ронять
    // страницу: фолбэк на DEFAULT_LANGUAGE зашит в i18next, русский текст
    // лежит в бандле, так что лендинг остаётся живым и читаемым.
    console.error('i18n: инициализация не завершилась, работаем на фолбэке', error);
  });

export default i18n;
