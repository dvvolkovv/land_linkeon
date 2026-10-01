import { defineConfig } from 'vitest/config';
import { translatedCodes } from './scripts/translated-languages.js';
import { assistantPageCodes } from './scripts/assistant-page-languages.js';

export default defineConfig({
  test: {
    // tests/ отдан Playwright'у: vitest там споткнётся об @playwright/test.
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.mjs'],
  },
  // Тот же define, что в vite.config.ts: без него любой тест, дотянувшийся до
  // src/i18n/translatedLanguages.ts, упадёт на неопределённом глобале.
  define: {
    __TRANSLATED_LANGUAGES__: JSON.stringify(translatedCodes()),
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
  },
});
