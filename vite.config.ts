import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { translatedCodes } from './scripts/translated-languages.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
