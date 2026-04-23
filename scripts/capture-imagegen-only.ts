/**
 * Standalone imagegen-{1..4}.webp re-capture.
 *
 * Re-runs only the /image-gen picker from capture.ts, but with:
 *   1. A "list-only" mode (IMAGEGEN_LIST=1) that logs every available image URL
 *      in the user's history so a human can pick clean ones.
 *   2. A hardcoded URL array (PICKED) used when IMAGEGEN_LIST is not set; the
 *      script downloads those 4 specific URLs → imagegen-{1..4}.webp.
 *   3. An env-var override IMAGEGEN_URLS="url1,url2,url3,url4" for ad-hoc runs.
 *
 * Why a separate script: the previous grid contained a "family + kids" shot
 * with garbled russian text burned into the image ("ПОЧОМУ МУДРЫЕ РОДИТЕЛИ
 * ПУТЕШЕТВУУЮТ С ДЕТНМИ"). We want 4 clean abstract/product/object images
 * without any text overlays and without people-focused portraits.
 *
 * Usage:
 *   # 1. Discover what's available:
 *   IMAGEGEN_LIST=1 pnpm tsx scripts/capture-imagegen-only.ts
 *   # Inspect the logged URLs (and their alt/prompt text if present),
 *   # then edit PICKED below (or pass IMAGEGEN_URLS="...").
 *
 *   # 2. Download the 4 chosen images:
 *   pnpm tsx scripts/capture-imagegen-only.ts
 *
 * Does NOT touch any other asset in public/screenshots/.
 */
import { chromium, type Page } from '@playwright/test';
import { execFile } from 'node:child_process';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

const BASE = 'https://my.linkeon.io';
const TEST_PHONE = '79030169187';
const SCREENSHOTS_DIR = resolve(process.cwd(), 'public/screenshots');

/**
 * The 4 URLs we picked after running with IMAGEGEN_LIST=1.
 *
 * Available pool on 2026-04-23 was 8 images; the user's complaint targeted
 * "woman with kids" + garbled Russian text "ПОЧОМУ МУДРЫЕ РОДИТЕЛИ…" shots.
 * Skipped: 1776418636135, 1776418402321, 1776418400984 (all are family/kids
 * scenes, two of them with burned-in mis-spelled headings).
 *
 * Picked (cleanest 4, no kids, no burned russian text):
 *   1. sunset over mountains          — pure landscape, zero text, abstract
 *   2. woman at sunset by water       — single figure, clean aesthetic shot
 *   3. cartoon robot + human illo     — support scene illustration
 *   4. holographic AI in office       — professional scene
 */
const PICKED: string[] = [
  'https://my.linkeon.io/static/generated/1776417529656-zl2kyt.png',
  'https://my.linkeon.io/static/generated/1776417840124-w48ikx.png',
  'https://my.linkeon.io/static/generated/1776913973287-56re7t.png',
  'https://my.linkeon.io/static/generated/1776913940576-njprzd.png',
];

interface ImageCandidate {
  src: string;
  alt: string;
  parentText: string;
  width: number;
  height: number;
}

async function fetchOtpCode(page: Page): Promise<string | null> {
  for (let attempt = 0; attempt < 8; attempt++) {
    await page.waitForTimeout(1500);
    try {
      const res = await page.request.get(`${BASE}/webhook/debug/sms-code/${TEST_PHONE}`);
      if (!res.ok()) continue;
      const body = await res.json().catch(() => ({}));
      const code = String(body.code ?? body.otp ?? '').trim();
      if (/^\d{4,6}$/.test(code)) return code;
    } catch {
      // retry
    }
  }
  return null;
}

async function fillOtp(page: Page, code: string) {
  const otpInputs = await page.locator('input[maxlength="1"], input[inputmode="numeric"]').all();
  if (otpInputs.length >= code.length) {
    for (let i = 0; i < code.length; i++) await otpInputs[i].fill(code[i]);
    return;
  }
  const firstNumeric = page.locator('input[inputmode="numeric"]').first();
  await firstNumeric.fill(code);
}

async function loginViaSms(page: Page): Promise<boolean> {
  try {
    await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(1500);

    const phoneInput = page.locator('input[type="tel"]').first();
    await phoneInput.waitFor({ timeout: 20000 });
    await phoneInput.fill(TEST_PHONE);

    const consent = page.locator('input[name="allConsents"]');
    if ((await consent.count()) > 0) {
      await consent.check({ force: true });
      await page.waitForTimeout(400);
    }

    const getCodeBtn = page
      .getByRole('button', {
        name: /send code|получить|отправить|код|next|дальше|продолжить/i,
      })
      .first();
    await getCodeBtn.click({ timeout: 15000 });

    const code = await fetchOtpCode(page);
    if (!code) {
      console.log('  ✗ OTP not received from debug endpoint');
      return false;
    }
    console.log(`  · OTP: ${code}`);

    await fillOtp(page, code);

    await page.waitForURL(
      (url) =>
        /\/(chat|search|profile|dozvon|image-gen|video)/.test(url.pathname),
      { timeout: 30000 },
    );
    await page.waitForTimeout(2500);
    return true;
  } catch (err) {
    console.log(`  ✗ login error: ${(err as Error).message.split('\n')[0]}`);
    return false;
  }
}

async function downloadAsset(page: Page, url: string, outPath: string, timeoutMs = 45000): Promise<boolean> {
  try {
    const res = await page.request.get(url, { timeout: timeoutMs });
    if (!res.ok()) {
      console.log(`    · download ${res.status()} ${url.slice(0, 80)}`);
      return false;
    }
    const buf = await res.body();
    await writeFile(outPath, buf);
    return true;
  } catch (err) {
    console.log(`    · download err: ${(err as Error).message.split('\n')[0]}`);
    return false;
  }
}

async function imgToWebp(inPath: string, outWebp: string, quality = 82) {
  await execFileP('cwebp', ['-q', String(quality), '-quiet', inPath, '-o', outWebp]);
}

/**
 * Open /image-gen, click "История генераций", scroll the modal, and return
 * every image candidate with metadata.
 */
async function listImagegenCandidates(page: Page): Promise<ImageCandidate[]> {
  await page.goto(`${BASE}/image-gen`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(1500);

  // Click "История генераций" if present.
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      /История генераций|History/i.test(b.textContent || ''),
    );
    if (btn) (btn as HTMLButtonElement).click();
  });
  await page.waitForTimeout(2500);

  // Scroll the history modal/list to force-load everything.
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => {
      const scrollables = Array.from(document.querySelectorAll('*')).filter((el) => {
        const s = getComputedStyle(el as Element);
        return (
          (s.overflowY === 'auto' || s.overflowY === 'scroll') &&
          (el as HTMLElement).clientHeight > 0
        );
      });
      for (const el of scrollables) (el as HTMLElement).scrollTop = (el as HTMLElement).scrollHeight;
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(900);
  }

  const candidates: ImageCandidate[] = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
    return imgs
      .filter((i) => i.src.startsWith('http') && /\/static\/generated\//.test(i.src))
      .map((i) => {
        const r = i.getBoundingClientRect();
        // Grab surrounding text (alt + title + nearby parent textContent, trimmed).
        const parent = (i.closest('[class*="card" i], [class*="item" i], [class*="row" i], figure, li, div') as HTMLElement) || i.parentElement;
        const parentText = (parent?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 240);
        return {
          src: i.src,
          alt: i.alt || '',
          parentText,
          width: r.width,
          height: r.height,
        };
      });
  });

  // De-duplicate by src.
  const seen = new Set<string>();
  const unique: ImageCandidate[] = [];
  for (const c of candidates) {
    if (seen.has(c.src)) continue;
    seen.add(c.src);
    unique.push(c);
  }
  return unique;
}

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const LIST_MODE = process.env.IMAGEGEN_LIST === '1';
  const OVERRIDE = process.env.IMAGEGEN_URLS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 1600 },
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    extraHTTPHeaders: { 'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.5' },
  });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('i18nextLng', 'ru');
    } catch {
      /* ignore */
    }
  });
  const page = await ctx.newPage();

  console.log('→ logging in via SMS…');
  const loggedIn = await loginViaSms(page);
  if (!loggedIn) {
    console.log('  ✗ login failed — aborting');
    await ctx.close();
    await browser.close();
    process.exit(1);
  }
  console.log('  ✓ logged in');

  console.log('\n→ opening /image-gen history…');
  const candidates = await listImagegenCandidates(page);
  console.log(`  · found ${candidates.length} unique generated images`);

  if (LIST_MODE) {
    // Dump all candidates so a human can pick clean ones.
    console.log('\n=== CANDIDATES ===');
    for (let i = 0; i < candidates.length; i++) {
      const c = candidates[i];
      console.log(`[${i}] ${c.src}`);
      if (c.alt) console.log(`    alt: ${c.alt.slice(0, 120)}`);
      if (c.parentText) console.log(`    ctx: ${c.parentText.slice(0, 160)}`);
      console.log(`    size: ${Math.round(c.width)}×${Math.round(c.height)}`);
    }
    console.log('\nTip: set PICKED[] in this file or run with IMAGEGEN_URLS="..." (comma-sep) to download 4.');
    await ctx.close();
    await browser.close();
    return;
  }

  const chosen = OVERRIDE.length === 4 ? OVERRIDE : PICKED;
  if (chosen.length !== 4) {
    console.log(
      '\n✗ no 4 URLs chosen. Either set PICKED[] in this file, or run with IMAGEGEN_URLS="u1,u2,u3,u4", or pass IMAGEGEN_LIST=1 first.',
    );
    await ctx.close();
    await browser.close();
    process.exit(1);
  }

  console.log('\n→ downloading 4 chosen images…');
  const files = ['imagegen-1.webp', 'imagegen-2.webp', 'imagegen-3.webp', 'imagegen-4.webp'];
  let allOk = true;
  for (let i = 0; i < 4; i++) {
    const src = chosen[i];
    const outWebp = resolve(SCREENSHOTS_DIR, files[i]);
    const ext = /\.(\w+)(?:\?|$)/.exec(src)?.[1]?.toLowerCase() ?? 'png';
    const tmp = resolve(SCREENSHOTS_DIR, `.tmp-imagegen-${i}.${ext}`);
    const ok = await downloadAsset(page, src, tmp, 60000);
    if (!ok) {
      allOk = false;
      await unlink(tmp).catch(() => {});
      continue;
    }
    try {
      await imgToWebp(tmp, outWebp, 82);
      console.log(`  ✓ ${files[i]}  ←  ${src.slice(src.lastIndexOf('/') + 1)}`);
    } catch (err) {
      console.log(`  ✗ cwebp ${files[i]}: ${(err as Error).message.split('\n')[0]}`);
      allOk = false;
    } finally {
      await unlink(tmp).catch(() => {});
    }
  }

  await ctx.close();
  await browser.close();

  if (!allOk) process.exit(1);
  console.log('\n✅ imagegen-{1..4}.webp regenerated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
