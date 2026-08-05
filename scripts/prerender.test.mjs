import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SUPPORTED_CODES } from '../src/i18n/languages';

const here = dirname(fileURLToPath(import.meta.url));

describe('prerender', () => {
  it('дублированный список языков совпадает с реестром', () => {
    const src = readFileSync(join(here, 'prerender.mjs'), 'utf8');
    const match = src.match(/const CODES = \[([^\]]+)\]/);
    expect(match).not.toBeNull();
    const duplicated = match[1]
      .split(',')
      .map((s) => s.trim().replace(/^'|'$/g, ''))
      .filter(Boolean);
    expect(duplicated).toEqual(SUPPORTED_CODES);
  });

  it('у каждого языка есть og:locale', () => {
    const src = readFileSync(join(here, 'prerender.mjs'), 'utf8');
    for (const code of SUPPORTED_CODES) {
      expect(src).toMatch(new RegExp(`${code}: '[a-z]{2}_[A-Z]{2}'`));
    }
  });
});
