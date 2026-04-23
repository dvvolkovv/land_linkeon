/**
 * Standalone profile.webp re-capture.
 *
 * Re-runs only the /profile screenshot flow from capture.ts, adding a
 * `replaceAvatar` step after `maskPii` to swap the real user photo for a
 * neutral generated SVG (indigo→emerald gradient, white "ИП").
 *
 * Usage:
 *   pnpm tsx scripts/capture-profile-only.ts
 *
 * Does NOT touch any other asset in public/screenshots/.
 */
import { chromium, type Page } from '@playwright/test';
import { execFile } from 'node:child_process';
import { mkdir, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

const BASE = 'https://my.linkeon.io';
const TEST_PHONE = '79030169187';
const SCREENSHOTS_DIR = resolve(process.cwd(), 'public/screenshots');

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

async function pngToWebp(pngPath: string, webpPath: string, quality = 85) {
  await execFileP('cwebp', ['-q', String(quality), '-quiet', pngPath, '-o', webpPath]);
}

/** Mask PII (name/phone) in the currently loaded page before screenshotting. */
async function maskPii(page: Page) {
  await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Text);
    const phoneRe =
      /(?:\+?7|8)[\s\-()]*\d{3}[\s\-()]*\d{3}[\s\-()]*\d{2}[\s\-()]*\d{2}/g;
    const bareDigitsRe = /\b\d{10,11}\b/g;
    for (const n of nodes) {
      let txt = n.textContent ?? '';
      const orig = txt;
      txt = txt.replace(/(Dmitry|Дмитрий)\s+(Volkov|Волков)/gi, 'Иван Петров');
      txt = txt.replace(/(Volkov|Волков)\s+(Dmitry|Дмитрий)/gi, 'Петров Иван');
      txt = txt.replace(/(Dmitry|Дмитрий)/gi, 'Иван');
      txt = txt.replace(/(Volkov|Волков)/gi, 'Петров');
      txt = txt.replace(phoneRe, '+7 ••• ••• •• ••');
      txt = txt.replace(bareDigitsRe, '••• ••• ••• ••');
      if (txt !== orig) n.textContent = txt;
    }
    for (const i of Array.from(document.querySelectorAll<HTMLInputElement>('input'))) {
      let v = i.value;
      v = v.replace(/(Dmitry|Дмитрий)\s+(Volkov|Волков)/gi, 'Иван Петров');
      v = v.replace(/(Volkov|Волков)\s+(Dmitry|Дмитрий)/gi, 'Петров Иван');
      v = v.replace(/(Dmitry|Дмитрий)/gi, 'Иван');
      v = v.replace(/(Volkov|Волков)/gi, 'Петров');
      if (v !== i.value) i.value = v;
      if (phoneRe.test(i.value) || bareDigitsRe.test(i.value.replace(/\D/g, '')))
        i.value = '+7 ••• ••• •• ••';
    }
  });
}

async function installPiiMaskObserver(page: Page) {
  const body = `
    (function () {
      if (window.__piiMaskInstalled) return;
      window.__piiMaskInstalled = true;
      var phoneRe = /(?:\\+?7|8)[\\s\\-()]*\\d{3}[\\s\\-()]*\\d{3}[\\s\\-()]*\\d{2}[\\s\\-()]*\\d{2}/g;
      var bareDigitsRe = /\\b\\d{10,11}\\b/g;
      function run() {
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i];
          var txt = n.textContent || '';
          var orig = txt;
          txt = txt.replace(/(Dmitry|Дмитрий)\\s+(Volkov|Волков)/gi, 'Иван Петров');
          txt = txt.replace(/(Volkov|Волков)\\s+(Dmitry|Дмитрий)/gi, 'Петров Иван');
          txt = txt.replace(/(Dmitry|Дмитрий)/gi, 'Иван');
          txt = txt.replace(/(Volkov|Волков)/gi, 'Петров');
          txt = txt.replace(phoneRe, '+7 ••• ••• •• ••');
          txt = txt.replace(bareDigitsRe, '••• ••• ••• ••');
          if (txt !== orig) n.textContent = txt;
        }
        var inputs = document.querySelectorAll('input');
        for (var j = 0; j < inputs.length; j++) {
          var el = inputs[j];
          var v = el.value;
          v = v.replace(/(Dmitry|Дмитрий)\\s+(Volkov|Волков)/gi, 'Иван Петров');
          v = v.replace(/(Volkov|Волков)\\s+(Dmitry|Дмитрий)/gi, 'Петров Иван');
          v = v.replace(/(Dmitry|Дмитрий)/gi, 'Иван');
          v = v.replace(/(Volkov|Волков)/gi, 'Петров');
          if (v !== el.value) el.value = v;
          if (phoneRe.test(el.value) || bareDigitsRe.test(el.value.replace(/\\D/g, '')))
            el.value = '+7 ••• ••• •• ••';
        }
      }
      run();
      window.__piiMaskInterval = window.setInterval(run, 300);
    })();
  `;
  await page.evaluate((code: string) => {
    // eslint-disable-next-line no-new-func
    new Function(code)();
  }, body);
}

/**
 * Replace the real user avatar on /profile with a neutral generated one
 * (indigo→emerald gradient circle + white "ИП" initials, inline SVG data-URL).
 *
 * Strategy: target <img> elements that look like avatars (square-ish, small
 * bounding box, or alt/class hints) and CSS background-image elements with
 * the same shape. Also swap srcset so the browser doesn't fall back to the
 * original high-res source.
 */
async function replaceAvatar(page: Page) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366f1"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="100" fill="url(#g)"/>
    <text x="100" y="130" text-anchor="middle" font-family="Inter, -apple-system, system-ui, sans-serif" font-size="88" font-weight="600" fill="white">ИП</text>
  </svg>`;
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  const swapped = await page.evaluate((src) => {
    let hits = 0;
    const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
    for (const img of imgs) {
      const r = img.getBoundingClientRect();
      const isSquareish = Math.abs(r.width - r.height) < 12 && r.width > 0;
      const sizeOk = r.width >= 32 && r.width <= 320;
      const looksLikeAvatar = /avatar|profile|user|photo/i.test(
        (img.src || '') + ' ' + (img.alt || '') + ' ' + (img.className || ''),
      );
      // Skip obvious non-avatars (logos, icons in nav, big hero images).
      const looksLikeLogo = /logo/i.test((img.src || '') + ' ' + (img.alt || '') + ' ' + (img.className || ''));
      if (looksLikeLogo) continue;
      if ((isSquareish && sizeOk) || looksLikeAvatar) {
        img.src = src;
        img.srcset = '';
        hits++;
      }
    }
    // Also handle CSS background-image avatar containers.
    const bgEls = Array.from(document.querySelectorAll('[style*="background-image"]')) as HTMLElement[];
    for (const el of bgEls) {
      const r = el.getBoundingClientRect();
      const isSquareish = Math.abs(r.width - r.height) < 12 && r.width > 0;
      const sizeOk = r.width >= 32 && r.width <= 320;
      if (isSquareish && sizeOk) {
        el.style.backgroundImage = `url("${src}")`;
        hits++;
      }
    }
    return hits;
  }, dataUrl);

  console.log(`  · replaced ${swapped} avatar element(s) with generated SVG`);
  // Give the browser a moment to paint the swapped src.
  await page.waitForTimeout(700);
}

async function captureProfile(page: Page): Promise<boolean> {
  const webpFile = 'profile.webp';
  const pngPath = resolve(SCREENSHOTS_DIR, webpFile.replace(/\.webp$/, '.png'));
  try {
    await page.goto(`${BASE}/profile`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(2000);

    await installPiiMaskObserver(page);
    await page.waitForTimeout(3500);
    await maskPii(page);
    await replaceAvatar(page);

    await page.screenshot({ path: pngPath, type: 'png', fullPage: false });
    await pngToWebp(pngPath, resolve(SCREENSHOTS_DIR, webpFile));
    await unlink(pngPath).catch(() => {});
    console.log(`  ✓ screenshot: ${webpFile}`);
    return true;
  } catch (err) {
    console.log(`  ✗ screenshot profile.webp: ${(err as Error).message.split('\n')[0]}`);
    await unlink(pngPath).catch(() => {});
    return false;
  }
}

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const LOCALE_OPTS = {
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    extraHTTPHeaders: { 'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.5' },
  };
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ...LOCALE_OPTS,
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
    console.log('  ✗ login failed — aborting (will NOT overwrite profile.webp)');
    await ctx.close();
    await browser.close();
    process.exit(1);
  }
  console.log('  ✓ logged in');

  console.log('\n→ capturing /profile with PII mask + avatar replacement…');
  const ok = await captureProfile(page);

  await ctx.close();
  await browser.close();

  if (!ok) process.exit(1);
  console.log('\n✅ profile.webp regenerated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
