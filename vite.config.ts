import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { translatedCodes } from './scripts/translated-languages.js';
import { snippetSource } from './scripts/visitor-redirect.js';
import { DEFAULT_LANGUAGE } from './src/i18n/languages.data.js';

/**
 * Уводит посетителя с канонического русского корня на его языковую версию.
 * Скрипт стоит первым в <head> и выполняется до бандла — иначе посетитель
 * успевает увидеть кадр русской страницы. Логика и её тесты живут в
 * scripts/visitor-redirect.js; сюда попадает её же исходник.
 */
function visitorLanguageRedirect(): Plugin {
  return {
    name: 'visitor-language-redirect',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { 'data-visitor-redirect': '' },
          children: snippetSource(translatedCodes(), DEFAULT_LANGUAGE),
          injectTo: 'head-prepend',
        },
      ];
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visitorLanguageRedirect()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Переключатель языков и баннер работают в браузере и не могут заглянуть
    // в файлы локалей, а грузить все шесть ради проверки непустоты — значит
    // похоронить ленивую загрузку, ради которой локали и нарезаны на чанки.
    // Поэтому список считается на сборке и подставляется в бандл литералом.
    // См. scripts/translated-languages.js и src/i18n/translatedLanguages.ts.
    __TRANSLATED_LANGUAGES__: JSON.stringify(translatedCodes()),
  },
});
