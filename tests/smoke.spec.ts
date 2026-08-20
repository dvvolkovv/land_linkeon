import { test, expect, request } from '@playwright/test';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';

const PUBLISHED = translatedCodes();
const UNPUBLISHED = SUPPORTED_CODES.filter((code) => !PUBLISHED.includes(code));

test.describe('landing smoke', () => {
  test('hero is visible and CTAs link to my.linkeon.io', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const heroStart = page.locator('[data-cta="hero-start"]');
    await expect(heroStart).toBeVisible();
    // appUrl() нормализует адрес и может дописать метки привлечения —
    // проверяем происхождение, а не точное совпадение строки.
    await expect(heroStart).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io/);
  });

  test('pricing section renders 5 packages with correct prices', async ({ page }) => {
    await page.goto('/#pricing');
    await expect(page.locator('[data-cta="pricing-starter"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-extended"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-professional"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-business"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-maximum"]')).toBeVisible();
    await expect(page.getByText(/^149$/).first()).toBeVisible();
    await expect(page.getByText(/^499$/).first()).toBeVisible();
    await expect(page.getByText(/1\s?990/).first()).toBeVisible();
    await expect(page.getByText(/4\s?990/).first()).toBeVisible();
    await expect(page.getByText(/9\s?990/).first()).toBeVisible();
  });

  test('FAQ has 6 questions', async ({ page }) => {
    await page.goto('/#faq');
    const details = page.locator('#faq details');
    await expect(details).toHaveCount(6);
  });

  // Переключатель предлагает ровно те языки, версии которых реально выпущены:
  // ссылка на язык с пустой локалью привела бы на русский текст под чужим
  // языковым адресом. Список — из того же источника, что и сборка.
  test('language switcher offers exactly the published languages', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="lang-switcher"] button').first().click();

    for (const code of PUBLISHED) {
      const href = code === DEFAULT_LANGUAGE ? '/' : `/${code}/`;
      await expect(page.locator(`[data-testid="lang-option-${code}"]`)).toHaveAttribute(
        'href',
        href,
      );
    }
    for (const code of UNPUBLISHED) {
      await expect(page.locator(`[data-testid="lang-option-${code}"]`)).toHaveCount(0);
    }
    // Раскрывашка со ссылками, а не listbox: считаем пункты списка, а не
    // role="option" (см. комментарий в LangSwitcher.tsx).
    await expect(page.locator('[data-testid="lang-switcher"] nav li')).toHaveCount(
      PUBLISHED.length,
    );
  });

  // Секция «не чат-бот»: главное обещание лендинга, которого нет ни в одной
  // другой секции. Проверяем и переключение табов — без него виден только
  // первый сценарий, и секция теряет две трети смысла.
  //
  // Проверки завязаны на расширения файлов, а не на текст: инлайновый редирект
  // уводит headless-браузер (Accept-Language: en-US) с «/» на «/en/», и русские
  // строки здесь искать нельзя. Расширения по правилам перевода одинаковы во
  // всех локалях — на них опираться можно.
  test('agentic section shows the first case and switches tabs', async ({ page }) => {
    await page.goto('/#agentic');

    const panel = page.locator('[data-testid="agentic-panel"]');
    await expect(panel).toBeVisible();
    // Первый сценарий отрисован без клика — он же уезжает в пререндер.
    await expect(panel).toContainText('.pdf');
    await expect(panel).toContainText('.docx');

    await page.locator('[data-testid="agentic-tab-1"]').click();
    await expect(panel).toContainText('.xlsx');
    await expect(panel).not.toContainText('.pdf');

    await page.locator('[data-testid="agentic-tab-2"]').click();
    await expect(panel).toContainText('reels.mp4');

    const cta = page.locator('[data-cta="agentic-start"]');
    await expect(cta).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io/);
  });

  // Секция обязана быть в СЫРОМ html: она несёт позиционирование продукта, и
  // краулер, не исполняющий JS, должен её видеть. Заодно ловит случай, когда
  // табы отрисовались только на клиенте. Сырой запрос редирект не трогает —
  // поэтому здесь как раз можно и нужно проверять русский текст.
  test('agentic section is present in prerendered HTML', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('договор-аренды.pdf');
    expect(html).toContain('протокол-разногласий.docx');
    await ctx.dispose();
  });
});
