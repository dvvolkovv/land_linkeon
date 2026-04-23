import { chromium } from '@playwright/test';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.AUDIT_URL ?? 'https://linkeon.io';
const OUT_DIR = process.env.AUDIT_OUT ?? '/tmp/linkeon-mobile-audit';

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Auditing: ${BASE}`);
  console.log(`Output:   ${OUT_DIR}`);

  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: '375x812', width: 375, height: 812 },
    { name: '414x896', width: 414, height: 896 },
  ];

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      locale: 'ru-RU',
      extraHTTPHeaders: { 'Accept-Language': 'ru-RU,ru;q=0.9' },
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      try { localStorage.setItem('i18n-lng', 'ru'); } catch { /* noop */ }
    });
    await page.goto(BASE);
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: resolve(OUT_DIR, `fullpage-${vp.name}.png`),
      fullPage: true,
      type: 'png',
    });
    console.log(`✓ fullpage-${vp.name}.png`);

    await page.screenshot({
      path: resolve(OUT_DIR, `hero-${vp.name}.png`),
      type: 'png',
    });
    console.log(`✓ hero-${vp.name}.png`);

    // Per-section screenshots — scroll each into view and clip
    const sections = [
      'hero-title',
      'problem-heading',
      'assistants-heading',
      'dozvon-heading',
      'profile-heading',
      'networking-heading',
      'content-heading',
      'how-heading',
      'usecases-heading',
      'pricing-heading',
      'faq-heading',
      'final-cta-heading',
    ];
    for (const sid of sections) {
      const el = await page.$(`#${sid}`);
      if (!el) continue;
      try {
        const section = await el.evaluateHandle((heading) => {
          let p: Element | null = heading;
          while (p && p.tagName !== 'SECTION') p = p.parentElement;
          return p;
        });
        const handle = section.asElement();
        if (!handle) continue;
        await handle.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const box = await handle.boundingBox();
        if (!box) continue;
        await page.screenshot({
          path: resolve(OUT_DIR, `${vp.name}-${sid}.png`),
          clip: { x: 0, y: box.y, width: vp.width, height: Math.min(box.height, 2000) },
          type: 'png',
        });
        console.log(`  ✓ ${vp.name}-${sid}.png  h=${Math.round(box.height)}`);
      } catch {
        // skip
      }
    }
    // scroll to top for consistent results in next iteration
    await page.evaluate(() => window.scrollTo(0, 0));

    const hasHorizScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(
      `  horizontal scroll: ${hasHorizScroll} | scrollWidth: ${scrollWidth} vs viewport ${vp.width} | docHeight: ${docHeight}`
    );

    // Collect overflowing elements (any child wider than html clientWidth)
    const overflowers = await page.evaluate(() => {
      const clientW = document.documentElement.clientWidth;
      const results: { tag: string; cls: string; w: number; left: number }[] = [];
      const all = document.querySelectorAll('*');
      all.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.width > clientW + 1 || rect.right > clientW + 1 || rect.left < -1) {
          results.push({
            tag: el.tagName.toLowerCase(),
            cls: ((el as HTMLElement).className || '').toString().slice(0, 120),
            w: Math.round(rect.width),
            left: Math.round(rect.left),
          });
        }
      });
      return results.slice(0, 30);
    });
    if (overflowers.length) {
      console.log(`  overflowing elements (${overflowers.length}):`);
      overflowers.forEach((o) =>
        console.log(`    <${o.tag} class="${o.cls}"> w=${o.w} left=${o.left}`)
      );
    }

    await ctx.close();
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
