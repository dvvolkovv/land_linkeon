import { test, expect } from '@playwright/test';

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

  test('pricing section renders 3 packages with correct prices', async ({ page }) => {
    await page.goto('/#pricing');
    await expect(page.locator('[data-cta="pricing-starter"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-extended"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-professional"]')).toBeVisible();
    await expect(page.getByText(/^149$/).first()).toBeVisible();
    await expect(page.getByText(/^499$/).first()).toBeVisible();
    await expect(page.getByText(/1\s?990/).first()).toBeVisible();
  });

  test('FAQ has 6 questions', async ({ page }) => {
    await page.goto('/#faq');
    const details = page.locator('#faq details');
    await expect(details).toHaveCount(6);
  });

  test('language switch toggles RU texts', async ({ page }) => {
    await page.goto('/');
    const switcher = page.locator('[data-testid="lang-switcher"]').first();
    await switcher.getByText('RU').click();
    // Проверяем статичную часть заголовка: середина набирается печатной
    // машинкой и в момент проверки может быть недонабрана.
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Готовый результат/i);
  });
});
