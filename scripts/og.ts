import { chromium } from '@playwright/test';
import { resolve } from 'node:path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173');
  // Wait for Hero to be visible & fonts to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: resolve(process.cwd(), 'public/og-cover.jpg'),
    type: 'jpeg',
    quality: 85,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await browser.close();
  console.log('og-cover.jpg saved');
}

main().catch((err) => { console.error(err); process.exit(1); });
