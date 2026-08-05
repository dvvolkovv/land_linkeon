import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // tests/ отдан Playwright'у: vitest там споткнётся об @playwright/test.
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.mjs'],
  },
});
