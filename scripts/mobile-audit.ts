import { chromium, type Page } from '@playwright/test';
import { resolve } from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE = process.env.AUDIT_URL ?? 'https://linkeon.io';
const OUT_DIR = process.env.AUDIT_OUT ?? '/tmp/linkeon-mobile-audit';

type Viewport = { name: string; width: number; height: number };

const VIEWPORTS: Viewport[] = [
  { name: '320x568', width: 320, height: 568 },
  { name: '375x812', width: 375, height: 812 },
  { name: '414x896', width: 414, height: 896 },
  { name: '768x1024', width: 768, height: 1024 },
];

// Section id → human name for screenshot file
const SECTIONS: { id: string; name: string }[] = [
  { id: 'hero-title', name: 'hero' },
  { id: 'problem-heading', name: 'problem' },
  { id: 'assistants-heading', name: 'assistants' },
  { id: 'dozvon-heading', name: 'dozvon' },
  { id: 'profile-heading', name: 'profile' },
  { id: 'networking-heading', name: 'networking' },
  { id: 'content-heading', name: 'content' },
  { id: 'how-heading', name: 'how' },
  { id: 'usecases-heading', name: 'useCases' },
  { id: 'pricing-heading', name: 'pricing' },
  { id: 'faq-heading', name: 'faq' },
  { id: 'final-cta-heading', name: 'finalCta' },
];

type Issue = { viewport: string; kind: string; detail: string };

async function findSection(page: Page, headingId: string) {
  const handle = await page.$(`#${headingId}`);
  if (!handle) return null;
  const section = await handle.evaluateHandle((el) => {
    let p: Element | null = el;
    while (p && p.tagName !== 'SECTION') p = p.parentElement;
    return p;
  });
  const element = section.asElement();
  return element ?? null;
}

async function auditViewport(page: Page, vp: Viewport, issues: Issue[]) {
  const vpPrefix = `${vp.name}`;

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // 1. Fullpage
  await page.screenshot({
    path: resolve(OUT_DIR, `${vpPrefix}-fullpage.png`),
    fullPage: true,
    type: 'png',
  });
  console.log(`  ✓ ${vpPrefix}-fullpage.png`);

  // 2. Horizontal scroll check on whole document
  const hscroll = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (hscroll.scrollWidth > hscroll.clientWidth + 1) {
    issues.push({
      viewport: vp.name,
      kind: 'horizontal-scroll',
      detail: `doc scrollWidth=${hscroll.scrollWidth} > clientWidth=${hscroll.clientWidth}`,
    });
  }

  // 3. Per-section screenshots + intersection check
  for (const sec of SECTIONS) {
    const el = await findSection(page, sec.id);
    if (!el) continue;
    try {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      const box = await el.boundingBox();
      if (!box) continue;

      // section screenshot (clip to viewport width, full section height up to 2000)
      await page.screenshot({
        path: resolve(OUT_DIR, `${vpPrefix}-section-${sec.name}.png`),
        clip: {
          x: 0,
          y: Math.max(0, box.y),
          width: vp.width,
          height: Math.min(box.height, 2000),
        },
        type: 'png',
      });
      console.log(`  ✓ ${vpPrefix}-section-${sec.name}.png  h=${Math.round(box.height)}`);

      // Intersection check: does this section contain any child wider than viewport?
      const oversize = await el.evaluate((node, vpWidth) => {
        const results: { tag: string; cls: string; w: number; left: number; right: number }[] = [];
        const all = node.querySelectorAll('*');
        all.forEach((c) => {
          const r = (c as HTMLElement).getBoundingClientRect();
          if (r.width > vpWidth + 1 || r.right > vpWidth + 1 || r.left < -1) {
            results.push({
              tag: c.tagName.toLowerCase(),
              cls: ((c as HTMLElement).className || '').toString().slice(0, 120),
              w: Math.round(r.width),
              left: Math.round(r.left),
              right: Math.round(r.right),
            });
          }
        });
        return results.slice(0, 8);
      }, vp.width);

      if (oversize.length) {
        issues.push({
          viewport: vp.name,
          kind: `section-overflow:${sec.name}`,
          detail: oversize
            .map((o) => `<${o.tag} cls="${o.cls.slice(0, 60)}" w=${o.w} l=${o.left}..${o.right}>`)
            .join(' | '),
        });
      }
    } catch {
      /* skip */
    }
  }

  // Back to top before interactive checks
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // 4. Touch target sizes: CTAs with data-cta, lang switcher buttons, footer socials, FAQ summaries
  const targets = await page.evaluate(() => {
    const selectors: [string, string][] = [
      ['[data-cta]', 'cta'],
      ['[data-testid="lang-switcher"] button', 'lang'],
      ['footer a[aria-label]', 'footer-social'],
      ['details summary', 'faq-summary'],
    ];
    const out: { label: string; text: string; w: number; h: number; visible: boolean }[] = [];
    for (const [sel, label] of selectors) {
      const nodes = document.querySelectorAll(sel);
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i] as HTMLElement;
        const r = el.getBoundingClientRect();
        out.push({
          label,
          text: (el.textContent || '').trim().slice(0, 30) || el.getAttribute('aria-label') || '',
          w: Math.round(r.width),
          h: Math.round(r.height),
          visible: r.width > 0 && r.height > 0,
        });
      }
    }
    return out;
  });
  const SMALL = targets.filter((t) => t.visible && Math.min(t.w, t.h) < 44);
  if (SMALL.length) {
    for (const s of SMALL) {
      issues.push({
        viewport: vp.name,
        kind: 'touch-target-small',
        detail: `${s.label} "${s.text}" ${s.w}x${s.h}`,
      });
    }
  }

  // 5. Header drawer (only applies on <lg breakpoints)
  if (vp.width < 1024) {
    const burger = await page.$('header button[aria-controls="mobile-nav"]');
    if (burger) {
      await burger.click();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: resolve(OUT_DIR, `${vpPrefix}-header-drawer-open.png`),
        type: 'png',
      });
      console.log(`  ✓ ${vpPrefix}-header-drawer-open.png`);
      // sanity: drawer is open
      const drawerVisible = await page.$('#mobile-nav');
      if (!drawerVisible) {
        issues.push({ viewport: vp.name, kind: 'drawer', detail: 'drawer not rendered after burger click' });
      }
      const closeBtn = await page.$('#mobile-nav button[aria-label]:not([aria-controls])');
      // find any button inside drawer with X icon
      const anyClose = await page.$('#mobile-nav button');
      if (closeBtn || anyClose) {
        const btn = closeBtn || anyClose;
        await btn!.click();
        await page.waitForTimeout(350);
      }
      await page.screenshot({
        path: resolve(OUT_DIR, `${vpPrefix}-header-drawer-closed.png`),
        type: 'png',
      });
      console.log(`  ✓ ${vpPrefix}-header-drawer-closed.png`);
    }
  }

  // 6. FAQ accordion: open first & third <details>, screenshot
  const faqSection = await findSection(page, 'faq-heading');
  if (faqSection) {
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const summaries = await page.$$('section#faq details summary');
    if (summaries.length >= 3) {
      await summaries[0].click();
      await page.waitForTimeout(250);
      await summaries[2].click();
      await page.waitForTimeout(250);
      const box = await faqSection.boundingBox();
      if (box) {
        await page.screenshot({
          path: resolve(OUT_DIR, `${vpPrefix}-faq-open-1-and-3.png`),
          clip: { x: 0, y: Math.max(0, box.y), width: vp.width, height: Math.min(box.height, 2200) },
          type: 'png',
        });
        console.log(`  ✓ ${vpPrefix}-faq-open-1-and-3.png`);
      }
      // check both are open
      const openCount = await page.evaluate(
        () => document.querySelectorAll('section#faq details[open]').length
      );
      if (openCount < 2) {
        issues.push({
          viewport: vp.name,
          kind: 'faq-accordion',
          detail: `only ${openCount} details open after clicking 1st and 3rd`,
        });
      }
      // close them back
      await summaries[0].click();
      await summaries[2].click();
      await page.waitForTimeout(150);
    }
  }

  // 7. Pricing: screenshot of popular card, take whole pricing section
  const pricing = await findSection(page, 'pricing-heading');
  if (pricing) {
    await pricing.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const box = await pricing.boundingBox();
    if (box) {
      await page.screenshot({
        path: resolve(OUT_DIR, `${vpPrefix}-pricing-detail.png`),
        clip: { x: 0, y: Math.max(0, box.y), width: vp.width, height: Math.min(box.height, 2400) },
        type: 'png',
      });
      console.log(`  ✓ ${vpPrefix}-pricing-detail.png`);
    }
  }

  // 8. Networking canvas — scroll and screenshot
  const networking = await findSection(page, 'networking-heading');
  if (networking) {
    await networking.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const box = await networking.boundingBox();
    if (box) {
      await page.screenshot({
        path: resolve(OUT_DIR, `${vpPrefix}-networking-canvas.png`),
        clip: { x: 0, y: Math.max(0, box.y), width: vp.width, height: Math.min(box.height, 2200) },
        type: 'png',
      });
      console.log(`  ✓ ${vpPrefix}-networking-canvas.png`);
    }
  }

  // 9. Language switch → screenshot hero in EN
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  // Open drawer on small screens to access lang switch
  if (vp.width < 1024) {
    const burger = await page.$('header button[aria-controls="mobile-nav"]');
    if (burger) {
      await burger.click();
      await page.waitForTimeout(350);
      const enBtn = await page.$('#mobile-nav [data-testid="lang-switcher"] button:nth-child(2)');
      if (enBtn) {
        await enBtn.click();
        await page.waitForTimeout(400);
        // close drawer
        const closeBtn = await page.$('#mobile-nav button[aria-label]');
        if (closeBtn) {
          await closeBtn.click();
          await page.waitForTimeout(350);
        }
      }
    }
  } else {
    const enBtn = await page.$('header [data-testid="lang-switcher"] button:nth-child(2)');
    if (enBtn) {
      await enBtn.click();
      await page.waitForTimeout(400);
    }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const heroEn = await findSection(page, 'hero-title');
  if (heroEn) {
    const box = await heroEn.boundingBox();
    if (box) {
      await page.screenshot({
        path: resolve(OUT_DIR, `${vpPrefix}-hero-en.png`),
        clip: { x: 0, y: Math.max(0, box.y), width: vp.width, height: Math.min(box.height, 1400) },
        type: 'png',
      });
      console.log(`  ✓ ${vpPrefix}-hero-en.png`);
    }
    // overflow check on EN
    const enOverflow = await heroEn.evaluate((node, vpWidth) => {
      const results: { tag: string; w: number }[] = [];
      node.querySelectorAll('*').forEach((c) => {
        const r = (c as HTMLElement).getBoundingClientRect();
        if (r.width > vpWidth + 1 || r.right > vpWidth + 1) {
          results.push({ tag: c.tagName.toLowerCase(), w: Math.round(r.width) });
        }
      });
      return results.slice(0, 5);
    }, vp.width);
    if (enOverflow.length) {
      issues.push({
        viewport: vp.name,
        kind: 'hero-en-overflow',
        detail: enOverflow.map((o) => `<${o.tag} w=${o.w}>`).join(' '),
      });
    }
  }
  // Revert to RU
  if (vp.width < 1024) {
    const burger = await page.$('header button[aria-controls="mobile-nav"]');
    if (burger) {
      await burger.click();
      await page.waitForTimeout(300);
      const ruBtn = await page.$('#mobile-nav [data-testid="lang-switcher"] button:nth-child(1)');
      if (ruBtn) {
        await ruBtn.click();
        await page.waitForTimeout(300);
      }
      const closeBtn = await page.$('#mobile-nav button[aria-label]');
      if (closeBtn) await closeBtn.click();
      await page.waitForTimeout(250);
    }
  } else {
    const ruBtn = await page.$('header [data-testid="lang-switcher"] button:nth-child(1)');
    if (ruBtn) await ruBtn.click();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Auditing: ${BASE}`);
  console.log(`Output:   ${OUT_DIR}`);

  const browser = await chromium.launch({ headless: true });
  const issues: Issue[] = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Viewport ${vp.name} ===`);
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.width < 768,
      hasTouch: vp.width < 768,
      locale: 'ru-RU',
      extraHTTPHeaders: { 'Accept-Language': 'ru-RU,ru;q=0.9' },
      userAgent:
        vp.width < 768
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1'
          : 'Mozilla/5.0 (iPad; CPU OS 15_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1',
    });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      try {
        localStorage.setItem('i18n-lng', 'ru');
      } catch {
        /* noop */
      }
    });
    await page.goto(BASE);
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);

    await auditViewport(page, vp, issues);
    await ctx.close();
  }

  await browser.close();

  // Write issues summary
  const summary = {
    base: BASE,
    ranAt: new Date().toISOString(),
    totalIssues: issues.length,
    issuesByViewport: VIEWPORTS.reduce<Record<string, Issue[]>>((acc, v) => {
      acc[v.name] = issues.filter((i) => i.viewport === v.name);
      return acc;
    }, {}),
    issuesByKind: issues.reduce<Record<string, number>>((acc, i) => {
      acc[i.kind] = (acc[i.kind] || 0) + 1;
      return acc;
    }, {}),
  };
  await writeFile(resolve(OUT_DIR, 'issues.json'), JSON.stringify(summary, null, 2));
  console.log('\n=== Summary ===');
  console.log(`Total issues: ${issues.length}`);
  for (const [k, c] of Object.entries(summary.issuesByKind)) {
    console.log(`  ${k}: ${c}`);
  }
  console.log(`Details: ${resolve(OUT_DIR, 'issues.json')}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
