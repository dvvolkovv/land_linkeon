import { chromium, type Page, type BrowserContext } from '@playwright/test';
import { execFile } from 'node:child_process';
import { mkdir, unlink, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileP = promisify(execFile);

const BASE = 'https://my.linkeon.io';
const TEST_PHONE = '79030169187';
const SCREENSHOTS_DIR = resolve(process.cwd(), 'public/screenshots');
const VIDEO_TMP_DIR = resolve(process.cwd(), '.playwright-video-tmp');

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

    // Consent checkbox (my.linkeon.io legal gate)
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

async function webmToMp4(
  webmPath: string,
  mp4Path: string,
  durationSec: number,
  startOffsetSec = 0,
) {
  const args = ['-y'];
  if (startOffsetSec > 0) args.push('-ss', String(startOffsetSec));
  args.push(
    '-i',
    webmPath,
    '-t',
    String(durationSec),
    '-c:v',
    'libx264',
    '-crf',
    '30',
    '-preset',
    'slow',
    '-movflags',
    '+faststart',
    '-an',
    '-vf',
    'scale=1280:-2',
    '-pix_fmt',
    'yuv420p',
    mp4Path,
  );
  await execFileP('ffmpeg', args);
}

/** Mask PII (name/phone) in the currently loaded page before screenshotting. */
async function maskPii(page: Page) {
  // The body is executed inside the page context; avoid closures/helpers
  // so esbuild/tsx helpers (e.g. __name) aren't referenced.
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
      // NB: \b in JS regex is ASCII-word-boundary only — it doesn't trigger
      // between Cyrillic characters, so we must match without it.
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

/** Install a persistent masking routine inside the page that re-masks PII
 *  every few hundred ms. Works around the fact that tsx transforms nested
 *  arrow functions into something that references `__name` (an esbuild
 *  helper not available in the page context), by serialising the body as a
 *  string and running it via `new Function(...)`. */
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
          // \\b in JS regex is ASCII-only; Cyrillic names need a non-bounded
          // match to be replaced reliably.
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
      const haystack = (img.src || '') + ' ' + (img.alt || '') + ' ' + (img.className || '');
      const looksLikeAvatar = /avatar|profile|user|photo/i.test(haystack);
      const looksLikeLogo = /logo/i.test(haystack);
      if (looksLikeLogo) continue;
      if ((isSquareish && sizeOk) || looksLikeAvatar) {
        img.src = src;
        img.srcset = '';
        hits++;
      }
    }
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
  await page.waitForTimeout(700);
}

async function captureStatic(
  page: Page,
  path: string,
  webpFile: string,
  settleMs = 2000,
  beforeShot?: (p: Page) => Promise<void>,
) {
  const pngPath = resolve(SCREENSHOTS_DIR, webpFile.replace(/\.webp$/, '.png'));
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(settleMs);
    if (beforeShot) await beforeShot(page);
    await page.screenshot({ path: pngPath, type: 'png', fullPage: false });
    await pngToWebp(pngPath, resolve(SCREENSHOTS_DIR, webpFile));
    await unlink(pngPath).catch(() => {});
    console.log(`  ✓ screenshot: ${webpFile}`);
    return true;
  } catch (err) {
    console.log(`  ✗ screenshot ${webpFile}: ${(err as Error).message.split('\n')[0]}`);
    await unlink(pngPath).catch(() => {});
    return false;
  }
}

/** Download an asset URL through Playwright's request context to a local file. */
async function downloadAsset(
  page: Page,
  url: string,
  outPath: string,
  timeoutMs = 30000,
): Promise<boolean> {
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

/** Convert any image file (png/jpg) → webp via cwebp. */
async function imgToWebp(inPath: string, outWebp: string, quality = 82) {
  await execFileP('cwebp', ['-q', String(quality), '-quiet', inPath, '-o', outWebp]);
}

async function captureVideo(
  context: BrowserContext,
  path: string,
  videoFile: string,
  durationMs: number,
  onPage?: (p: Page, durationMs: number) => Promise<void>,
  startOffsetSec = 0,
): Promise<boolean> {
  const page = await context.newPage();
  try {
    if (onPage) {
      await onPage(page, durationMs);
    } else {
      await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(1500);
      await page.waitForTimeout(durationMs);
    }

    const videoHandle = page.video();
    await page.close();
    if (!videoHandle) {
      console.log(`  ✗ video handle missing: ${videoFile}`);
      return false;
    }
    const webmPath = await videoHandle.path();
    const mp4Path = resolve(SCREENSHOTS_DIR, videoFile);
    await webmToMp4(webmPath, mp4Path, durationMs / 1000, startOffsetSec);
    await unlink(webmPath).catch(() => {});
    console.log(`  ✓ video: ${videoFile}`);
    return true;
  } catch (err) {
    console.log(`  ✗ video ${videoFile}: ${(err as Error).message.split('\n')[0]}`);
    try {
      await page.close();
    } catch {
      /* ignore */
    }
    return false;
  }
}

async function createPlaceholderImage(
  context: BrowserContext,
  file: string,
  title: string,
  subtitle: string,
) {
  const page = await context.newPage();
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body { margin:0; padding:0; width:1280px; height:800px; }
    body {
      display:flex;align-items:center;justify-content:center;
      font-family:-apple-system,Inter,system-ui,sans-serif;
      background: linear-gradient(135deg,#f8fafc 0%,#e0e7ff 50%,#f1f5f9 100%);
      color:#334155;
    }
    .card { text-align:center; padding:48px 64px; border-radius:24px;
      background:rgba(255,255,255,.7); backdrop-filter: blur(12px);
      box-shadow: 0 20px 40px -20px rgba(30,41,59,.25);
      border:1px solid rgba(148,163,184,.2); }
    h1 { margin:0 0 12px; font-size:56px; color:#1e293b; letter-spacing:-.02em; font-weight:700; }
    p { margin:0; font-size:22px; color:#64748b; }
    .tag { display:inline-block; margin-bottom:24px; padding:6px 16px; border-radius:999px;
      background:#818cf8; color:white; font-size:14px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
  </style></head><body><div class="card">
    <div class="tag">my.linkeon.io</div>
    <h1>${title}</h1>
    <p>${subtitle}</p>
  </div></body></html>`;
  await page.setContent(html);
  const pngPath = resolve(SCREENSHOTS_DIR, file.replace(/\.webp$/, '.png'));
  await page.screenshot({ path: pngPath, type: 'png', fullPage: false });
  await page.close();
  await pngToWebp(pngPath, resolve(SCREENSHOTS_DIR, file));
  await unlink(pngPath).catch(() => {});
  console.log(`  ✓ placeholder image: ${file}`);
}

async function createPlaceholderVideo(file: string, title: string, durationSec = 5) {
  const out = resolve(SCREENSHOTS_DIR, file);
  const safeTitle = title.replace(/[':\\]/g, '');
  await execFileP('ffmpeg', [
    '-y',
    '-f',
    'lavfi',
    '-i',
    `color=c=0xe0e7ff:s=1280x800:d=${durationSec}:r=30`,
    '-vf',
    `drawtext=text='${safeTitle}':fontcolor=0x1e293b:fontsize=56:x=(w-text_w)/2:y=(h-text_h)/2-40,drawtext=text='my.linkeon.io':fontcolor=0x64748b:fontsize=28:x=(w-text_w)/2:y=(h-text_h)/2+40`,
    '-c:v',
    'libx264',
    '-crf',
    '30',
    '-preset',
    'slow',
    '-movflags',
    '+faststart',
    '-an',
    '-pix_fmt',
    'yuv420p',
    out,
  ]);
  console.log(`  ✓ placeholder video: ${file}`);
}

async function shrinkVideoIfOversized(file: string, maxKb = 500) {
  const p = resolve(SCREENSHOTS_DIR, file);
  try {
    const s = await stat(p);
    if (s.size <= maxKb * 1024) return;
    console.log(`  · ${file} is ${Math.round(s.size / 1024)}KB > ${maxKb}KB — re-encoding`);
    const tmp = p + '.tmp.mp4';
    await execFileP('ffmpeg', [
      '-y',
      '-i',
      p,
      '-vf',
      'scale=960:-2',
      '-c:v',
      'libx264',
      '-crf',
      '34',
      '-preset',
      'slow',
      '-movflags',
      '+faststart',
      '-an',
      '-pix_fmt',
      'yuv420p',
      tmp,
    ]);
    await execFileP('mv', [tmp, p]);
  } catch {
    /* ignore */
  }
}

/** Hero: open /chat, seed a short prompt, press Enter, let streaming render. */
async function primeHeroChat(page: Page, durationMs: number) {
  await page.goto(`${BASE}/chat`, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(3000);

  // On wide viewports, the chat panel should render next to the assistants
  // list once an assistant is selected. If the textarea is missing,
  // programmatically click the first assistant entry to force the chat
  // view to open.
  const textarea = page.locator('textarea[data-testid="chat-input"]').first();
  let hasTextarea = (await textarea.count()) > 0;
  if (!hasTextarea) {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll<HTMLElement>('button')).find(
        (b) => /Роман/i.test(b.textContent || ''),
      );
      if (btn) btn.click();
    });
    await page.waitForTimeout(2500);
  }

  try {
    await textarea.waitFor({ state: 'visible', timeout: 15000 });
    hasTextarea = true;
  } catch {
    hasTextarea = false;
    const diag = await page.evaluate(() => ({
      url: location.href,
      textareaCount: document.querySelectorAll('textarea').length,
      bodyHead: document.body.innerText.slice(0, 300),
    }));
    console.log(`    · primeHeroChat diag: ${JSON.stringify(diag).slice(0, 400)}`);
  }

  // Scroll messages to bottom so the latest history is visible.
  await page.evaluate(() => {
    const scrollers = Array.from(document.querySelectorAll<HTMLElement>('*')).filter(
      (el) => el.scrollHeight > el.clientHeight + 80 && el.clientHeight > 200,
    );
    for (const s of scrollers) s.scrollTop = s.scrollHeight;
  });
  await page.waitForTimeout(400);

  if (!hasTextarea) {
    console.log('  · chat textarea not found — recording /chat view with history only');
    await page.waitForTimeout(durationMs);
    return;
  }
  await textarea.click();
  await textarea.fill('Составь короткий план запуска нового продукта за 30 дней');
  await page.waitForTimeout(300);
  await textarea.press('Enter');

  // Let the stream render while recording.
  await page.waitForTimeout(durationMs);
}

/** imagegen: click "История генераций", pick 4 different images from my.linkeon.io static. */
async function fetchImagegenAssets(page: Page, files: string[]): Promise<boolean[]> {
  const results = files.map(() => false);
  try {
    await page.goto(`${BASE}/image-gen`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(1500);

    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        /История генераций/i.test(b.textContent || ''),
      );
      if (btn) (btn as HTMLButtonElement).click();
    });
    await page.waitForTimeout(2500);

    const srcs: string[] = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
        .map((i) => i.src)
        .filter(
          (s) =>
            s &&
            s.startsWith('http') &&
            !/logo|avatar/i.test(s) &&
            /\/static\/generated\//.test(s),
        );
      return Array.from(new Set(imgs));
    });

    console.log(`  · found ${srcs.length} generated images`);

    // Walk candidates; on failure, move to the next one. 1 file ← 1 distinct image.
    const used = new Set<string>();
    let nextIdx = 0;
    for (let f = 0; f < files.length; f++) {
      while (nextIdx < srcs.length) {
        const src = srcs[nextIdx++];
        if (!src || used.has(src)) continue;
        const outWebp = resolve(SCREENSHOTS_DIR, files[f]);
        const ext = /\.(\w+)(?:\?|$)/.exec(src)?.[1]?.toLowerCase() ?? 'png';
        const tmp = resolve(SCREENSHOTS_DIR, `.tmp-imagegen-${f}.${ext}`);
        const ok = await downloadAsset(page, src, tmp, 45000);
        if (!ok) {
          await unlink(tmp).catch(() => {});
          continue;
        }
        try {
          await imgToWebp(tmp, outWebp, 82);
          used.add(src);
          results[f] = true;
          console.log(`  ✓ imagegen: ${files[f]}`);
        } catch (err) {
          console.log(`  ✗ cwebp ${files[f]}: ${(err as Error).message.split('\n')[0]}`);
        } finally {
          await unlink(tmp).catch(() => {});
        }
        if (results[f]) break;
      }
      if (!results[f]) {
        console.log(`  ! ran out of image candidates for ${files[f]}`);
      }
    }
  } catch (err) {
    console.log(`  ✗ imagegen: ${(err as Error).message.split('\n')[0]}`);
  }
  return results;
}

/** video: click "Мои видео", download first <video src>, shrink to < 500KB. */
async function fetchVideoSample(page: Page, file: string): Promise<boolean> {
  try {
    await page.goto(`${BASE}/video`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(3000);

    const clicked = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll<HTMLElement>('button, a, [role="tab"]'));
      const btn = all.find(
        (b) => (b.textContent || '').replace(/\s+/g, ' ').trim() === 'Мои видео',
      );
      if (btn) {
        btn.click();
        return { ok: true, total: all.length };
      }
      const candidates = all
        .map((el) => (el.textContent || '').replace(/\s+/g, ' ').trim())
        .filter((t) => /видео/i.test(t))
        .slice(0, 10);
      return { ok: false, total: all.length, candidates };
    });
    if (!clicked.ok) {
      console.log(
        `  · "Мои видео" tab not found (scanned ${clicked.total}, hits: ${JSON.stringify(clicked.candidates)})`,
      );
    }
    await page.waitForTimeout(5000);

    // Poll up to ~15s for a <video> source to appear.
    let src: string | null = null;
    for (let attempt = 0; attempt < 8; attempt++) {
      src = await page.evaluate(() => {
        const fromEl = Array.from(document.querySelectorAll('video, source'))
          .map((el) => {
            const vid = el as HTMLVideoElement;
            return vid.src || vid.currentSrc || '';
          })
          .find((s) => !!s && /\.mp4/i.test(s));
        if (fromEl) return fromEl;
        const html = document.body.innerHTML;
        const match = html.match(
          /https?:\/\/[^"'\s<>]+\.mp4(?:\?[^"'\s<>]*)?/,
        );
        return match ? match[0].replace(/&amp;/g, '&') : null;
      });
      if (src) break;
      await page.waitForTimeout(1500);
    }
    if (!src) {
      console.log('  ! no video source found on /video');
      return false;
    }
    const tmp = resolve(SCREENSHOTS_DIR, '.tmp-video-sample.mp4');
    const out = resolve(SCREENSHOTS_DIR, file);
    const ok = await downloadAsset(page, src, tmp);
    if (!ok) return false;

    // Re-encode / shrink to short clip under 500KB regardless of source size.
    // Take 6s from the start to ensure visible motion, scale to 960w.
    await execFileP('ffmpeg', [
      '-y',
      '-i',
      tmp,
      '-t',
      '6',
      '-vf',
      'scale=960:-2',
      '-c:v',
      'libx264',
      '-crf',
      '32',
      '-preset',
      'slow',
      '-movflags',
      '+faststart',
      '-an',
      '-pix_fmt',
      'yuv420p',
      out,
    ]);
    await unlink(tmp).catch(() => {});
    console.log(`  ✓ video-sample: ${file}`);
    return true;
  } catch (err) {
    console.log(`  ✗ video-sample: ${(err as Error).message.split('\n')[0]}`);
    return false;
  }
}

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  await mkdir(VIDEO_TMP_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // Force Russian locale so i18next picks `ru` and UI strings (e.g. "Мои видео")
  // render in Russian. Applied to every context we create below.
  const LOCALE_OPTS = {
    locale: 'ru-RU',
    timezoneId: 'Europe/Moscow',
    extraHTTPHeaders: { 'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.5' },
  };

  const staticCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ...LOCALE_OPTS,
  });
  // Pin i18next language to RU and seed an assistant selection so /chat
  // renders the full chat view (not the empty "select assistant" stub).
  await staticCtx.addInitScript(() => {
    try {
      localStorage.setItem('i18nextLng', 'ru');
      if (!localStorage.getItem('selected_assistant')) {
        localStorage.setItem(
          'selected_assistant',
          JSON.stringify({
            id: 12,
            name: 'Роман',
            description: 'Помогаю делать все, что не могут другие',
            category: 'assistant',
          }),
        );
      }
    } catch {
      /* ignore */
    }
  });
  const page = await staticCtx.newPage();
  console.log('→ logging in via SMS…');
  const loggedIn = await loginViaSms(page);
  if (loggedIn) console.log('  ✓ logged in');
  else console.log('  ! login failed — will use placeholders');

  const storage = loggedIn ? await staticCtx.storageState() : undefined;

  // imagegen handled specially below (4 distinct images from history)
  const IMAGEGEN_FILES = [
    'imagegen-1.webp',
    'imagegen-2.webp',
    'imagegen-3.webp',
    'imagegen-4.webp',
  ];

  const STATIC_TARGETS: {
    path: string;
    file: string;
    before?: (p: Page) => Promise<void>;
  }[] = [
    { path: '/chat', file: 'hero-chat.webp' },
    { path: '/chat', file: 'assistants-list.webp' },
    { path: '/dozvon', file: 'dozvon-chat.webp' },
    {
      path: '/profile',
      file: 'profile.webp',
      // Install a persistent MutationObserver BEFORE React has a chance to
      // render the (async-fetched) personal-info spans, then let it run for
      // a few seconds to catch every re-render.
      before: async (p: Page) => {
        await installPiiMaskObserver(p);
        await p.waitForTimeout(3500);
        await maskPii(p);
        await replaceAvatar(p);
      },
    },
  ];

  const staticResults: Record<string, boolean> = {};
  if (loggedIn) {
    console.log('\n→ capturing static screenshots…');
    for (const t of STATIC_TARGETS) {
      staticResults[t.file] = await captureStatic(
        page,
        t.path,
        t.file,
        2000,
        t.before,
      );
    }

    console.log('\n→ fetching imagegen assets (4 distinct images)…');
    const imagegenOk = await fetchImagegenAssets(page, IMAGEGEN_FILES);
    IMAGEGEN_FILES.forEach((f, i) => (staticResults[f] = imagegenOk[i]));
  }

  await staticCtx.close();

  const placeholderCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ...LOCALE_OPTS,
  });
  await placeholderCtx.addInitScript(() => {
    try {
      localStorage.setItem('i18nextLng', 'ru');
    } catch {
      /* ignore */
    }
  });
  const placeholderMap: Record<string, { title: string; subtitle: string }> = {
    'hero-chat.webp': { title: 'Chat Preview', subtitle: 'AI-ассистенты my.linkeon.io' },
    'assistants-list.webp': { title: 'Assistants', subtitle: 'Выбери AI-собеседника' },
    'dozvon-chat.webp': { title: 'Dozvon', subtitle: 'AI обзванивает за тебя' },
    'profile.webp': { title: 'Profile', subtitle: 'Токены и реферальная статистика' },
    'imagegen-1.webp': { title: 'Image Gen', subtitle: 'Пример 1' },
    'imagegen-2.webp': { title: 'Image Gen', subtitle: 'Пример 2' },
    'imagegen-3.webp': { title: 'Image Gen', subtitle: 'Пример 3' },
    'imagegen-4.webp': { title: 'Image Gen', subtitle: 'Пример 4' },
  };
  for (const [file, meta] of Object.entries(placeholderMap)) {
    if (staticResults[file]) continue;
    try {
      await createPlaceholderImage(placeholderCtx, file, meta.title, meta.subtitle);
    } catch (err) {
      console.log(`  ✗ placeholder image ${file}: ${(err as Error).message.split('\n')[0]}`);
    }
  }
  await placeholderCtx.close();

  type VideoTarget = {
    path: string;
    file: string;
    duration: number;
    title: string;
    onPage?: (p: Page, durationMs: number) => Promise<void>;
    // Seconds of initial page-load to skip before starting the mp4. Useful
    // for `hero-loop.mp4`: we want to show the streaming answer, not the
    // initial navigation / hydration flash.
    startOffsetSec?: number;
  };
  const VIDEO_TARGETS: VideoTarget[] = [
    {
      path: '/chat',
      file: 'hero-loop.mp4',
      // Extra long so we cover hydration + typing + streamed answer.
      duration: 6000,
      title: 'Chat Hero',
      // Skip the first ~5s of the recording (navigation / hydration) and
      // start the mp4 right around when the user starts typing.
      startOffsetSec: 5,
      onPage: async (p, d) => {
        await primeHeroChat(p, d);
      },
    },
    { path: '/chat', file: 'assistants-switch.mp4', duration: 5000, title: 'Assistants' },
    { path: '/dozvon', file: 'dozvon-results.mp4', duration: 6000, title: 'Dozvon Results' },
  ];

  const videoResults: Record<string, boolean> = {};
  if (loggedIn && storage) {
    console.log('\n→ capturing videos…');
    const videoCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      storageState: storage,
      recordVideo: { dir: VIDEO_TMP_DIR, size: { width: 1280, height: 800 } },
      ...LOCALE_OPTS,
    });
    await videoCtx.addInitScript(() => {
      try {
        localStorage.setItem('i18nextLng', 'ru');
        // Seed an assistant selection so ChatInterface renders the textarea
        // immediately (otherwise it shows an empty "select assistant" state).
        if (!localStorage.getItem('selected_assistant')) {
          localStorage.setItem(
            'selected_assistant',
            JSON.stringify({
              id: 12,
              name: 'Роман',
              description: 'Помогаю делать все, что не могут другие',
              category: 'assistant',
            }),
          );
        }
      } catch {
        /* ignore */
      }
    });
    for (const t of VIDEO_TARGETS) {
      videoResults[t.file] = await captureVideo(
        videoCtx,
        t.path,
        t.file,
        t.duration,
        t.onPage,
        t.startOffsetSec,
      );
    }
    await videoCtx.close();
  }

  for (const t of VIDEO_TARGETS) {
    if (videoResults[t.file]) continue;
    try {
      await createPlaceholderVideo(t.file, t.title, Math.round(t.duration / 1000));
    } catch (err) {
      console.log(
        `  ✗ placeholder video ${t.file}: ${(err as Error).message.split('\n')[0]}`,
      );
    }
  }

  // video-sample.mp4 is handled separately: download a real generated video
  // from /video's "Мои видео" tab and re-encode to ≤500KB.
  const VIDEO_SAMPLE_FILE = 'video-sample.mp4';
  let videoSampleOk = false;
  if (loggedIn) {
    console.log('\n→ fetching video-sample.mp4 from /video history…');
    const tabCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      storageState: storage,
      ...LOCALE_OPTS,
    });
    await tabCtx.addInitScript(() => {
      try {
        localStorage.setItem('i18nextLng', 'ru');
      } catch {
        /* ignore */
      }
    });
    const tabPage = await tabCtx.newPage();
    videoSampleOk = await fetchVideoSample(tabPage, VIDEO_SAMPLE_FILE);
    await tabCtx.close();
  }
  if (!videoSampleOk) {
    try {
      await createPlaceholderVideo(VIDEO_SAMPLE_FILE, 'Video Sample', 5);
    } catch (err) {
      console.log(
        `  ✗ placeholder video ${VIDEO_SAMPLE_FILE}: ${(err as Error).message.split('\n')[0]}`,
      );
    }
  }

  console.log('\n→ enforcing 500KB video cap…');
  for (const t of VIDEO_TARGETS) await shrinkVideoIfOversized(t.file, 500);
  await shrinkVideoIfOversized(VIDEO_SAMPLE_FILE, 500);

  await browser.close();

  console.log('\n→ final sizes:');
  const allFiles = [
    ...Object.keys(placeholderMap),
    ...VIDEO_TARGETS.map((v) => v.file),
    VIDEO_SAMPLE_FILE,
  ];
  for (const f of allFiles) {
    try {
      const s = await stat(resolve(SCREENSHOTS_DIR, f));
      console.log(`    ${f.padEnd(28)} ${Math.round(s.size / 1024)} KB`);
    } catch {
      console.log(`    ${f.padEnd(28)} MISSING`);
    }
  }

  console.log('\n✅ Capture complete. Files in public/screenshots/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
