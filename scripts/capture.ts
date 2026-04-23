import { chromium, type Page, type BrowserContext } from '@playwright/test';
import { execFile } from 'node:child_process';
import { mkdir, unlink, stat } from 'node:fs/promises';
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

async function webmToMp4(webmPath: string, mp4Path: string, durationSec: number) {
  await execFileP('ffmpeg', [
    '-y',
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
  ]);
}

async function captureStatic(page: Page, path: string, webpFile: string, settleMs = 2000) {
  const pngPath = resolve(SCREENSHOTS_DIR, webpFile.replace(/\.webp$/, '.png'));
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(settleMs);
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

async function captureVideo(
  context: BrowserContext,
  path: string,
  videoFile: string,
  durationMs: number,
): Promise<boolean> {
  const page = await context.newPage();
  try {
    await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await page.waitForTimeout(durationMs);

    const videoHandle = page.video();
    await page.close();
    if (!videoHandle) {
      console.log(`  ✗ video handle missing: ${videoFile}`);
      return false;
    }
    const webmPath = await videoHandle.path();
    const mp4Path = resolve(SCREENSHOTS_DIR, videoFile);
    await webmToMp4(webmPath, mp4Path, durationMs / 1000);
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

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  await mkdir(VIDEO_TMP_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  const staticCtx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await staticCtx.newPage();
  console.log('→ logging in via SMS…');
  const loggedIn = await loginViaSms(page);
  if (loggedIn) console.log('  ✓ logged in');
  else console.log('  ! login failed — will use placeholders');

  const storage = loggedIn ? await staticCtx.storageState() : undefined;

  const STATIC_TARGETS: { path: string; file: string }[] = [
    { path: '/chat', file: 'hero-chat.webp' },
    { path: '/chat', file: 'assistants-list.webp' },
    { path: '/dozvon', file: 'dozvon-chat.webp' },
    { path: '/profile', file: 'profile.webp' },
    { path: '/image-gen', file: 'imagegen-1.webp' },
    { path: '/image-gen', file: 'imagegen-2.webp' },
    { path: '/image-gen', file: 'imagegen-3.webp' },
    { path: '/image-gen', file: 'imagegen-4.webp' },
  ];

  const staticResults: Record<string, boolean> = {};
  if (loggedIn) {
    console.log('\n→ capturing static screenshots…');
    for (const t of STATIC_TARGETS) {
      staticResults[t.file] = await captureStatic(page, t.path, t.file);
    }
  }

  await staticCtx.close();

  const placeholderCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
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

  const VIDEO_TARGETS: { path: string; file: string; duration: number; title: string }[] = [
    { path: '/chat', file: 'hero-loop.mp4', duration: 4000, title: 'Chat Hero' },
    { path: '/chat', file: 'assistants-switch.mp4', duration: 5000, title: 'Assistants' },
    { path: '/dozvon', file: 'dozvon-results.mp4', duration: 6000, title: 'Dozvon Results' },
    { path: '/video', file: 'video-sample.mp4', duration: 5000, title: 'Video Sample' },
  ];

  const videoResults: Record<string, boolean> = {};
  if (loggedIn && storage) {
    console.log('\n→ capturing videos…');
    const videoCtx = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      storageState: storage,
      recordVideo: { dir: VIDEO_TMP_DIR, size: { width: 1280, height: 800 } },
    });
    for (const t of VIDEO_TARGETS) {
      videoResults[t.file] = await captureVideo(videoCtx, t.path, t.file, t.duration);
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

  console.log('\n→ enforcing 500KB video cap…');
  for (const t of VIDEO_TARGETS) await shrinkVideoIfOversized(t.file, 500);

  await browser.close();

  console.log('\n→ final sizes:');
  const allFiles = [
    ...Object.keys(placeholderMap),
    ...VIDEO_TARGETS.map((v) => v.file),
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
