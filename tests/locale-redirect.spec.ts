import { test, expect } from '@playwright/test';
import { translatedCodes } from '../scripts/translated-languages.js';

const PUBLISHED = translatedCodes();

/**
 * Поведение в настоящем браузере с настоящей локалью: playwright ставит из
 * опции locale и navigator.language, и navigator.languages, и заголовок
 * Accept-Language — то есть ровно то, что видит инлайн-скрипт в <head>.
 */
test.describe('авторедирект по локали браузера', () => {
  test('англичанин с корня уезжает на /en/', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'en-US' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await ctx.close();
  });

  test('незнакомая локаль уезжает на английский, а не остаётся на русском', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'ko-KR' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
    await ctx.close();
  });

  test('русский остаётся на корне', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'ru-RU' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await ctx.close();
  });

  test('явный выбор языка отменяет редирект', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'en-US' });
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem('ll_lang_choice', 'ru'));
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await ctx.close();
  });

  test('краулер видит канонический русский корень', async ({ browser }) => {
    const ctx = await browser.newContext({
      locale: 'en-US',
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await ctx.close();
  });

  test('заход сразу на языковую версию не редиректит и не зацикливается', async ({ browser }) => {
    for (const code of PUBLISHED.filter((c) => c !== 'ru')) {
      const ctx = await browser.newContext({ locale: 'de-DE' });
      const page = await ctx.newPage();
      await page.goto(`/${code}/`);
      await expect(page).toHaveURL(new RegExp(`/${code}/$`));
      await ctx.close();
    }
  });

  test('переключение языка запоминается и переживает возврат на корень', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'en-US' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
    // Переключатель стоит в нескольких местах (шапка, меню, подвал) — берём
    // первый видимый.
    await page.locator('[data-testid="lang-switcher"] button').first().click();
    await page.locator('[data-testid="lang-option-ru"]').first().click();
    await expect(page).toHaveURL(/linkeon\.io\/$|:\d+\/$/);
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    await ctx.close();
  });

  test('кореец на /en/ не получает баннер с предложением русского', async ({ browser }) => {
    const ctx = await browser.newContext({ locale: 'ko-KR' });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en\/$/);
    // Баннер сравнивает язык страницы с языком браузера: если фолбэк остался
    // русским, здесь всплывёт предложение «Русский».
    await page.waitForTimeout(1000);
    await expect(page.locator('[data-testid="lang-banner-link"]')).toHaveCount(0);
    await ctx.close();
  });
});
