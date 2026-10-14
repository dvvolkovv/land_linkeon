import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HumanDesignPage from './HumanDesignPage';
import { createServerI18n } from '../i18n/server';
import { HD_TEXTS } from '../content/hd/texts.server';

const texts = HD_TEXTS.ru;
const html = renderToStaticMarkup(
  <I18nextProvider i18n={createServerI18n('ru')}>
    <HumanDesignPage texts={texts} language="ru" />
  </I18nextProvider>,
);
const pick = (re: RegExp) => html.match(re)?.[0] ?? '';

describe('страница калькулятора (пререндер)', () => {
  it('один H1 — из текстов', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain(`>${texts.h1}</h1>`);
  });

  it('вводный текст, пять типов и вопросы — в разметке для поисковика', () => {
    for (const p of texts.intro) expect(html).toContain(p);
    const types = pick(/<section[^>]*data-testid="hd-types"[\s\S]*?<\/section>/);
    expect(types.match(/<li[\s>]/g)).toHaveLength(5);
    const faq = pick(/<section[^>]*data-testid="hd-faq"[\s\S]*?<\/section>/);
    expect(faq.match(/<details/g)).toHaveLength(texts.faq.length);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });

  // Решение владельца: форма — сразу после H1 и первого абзаца, остальное
  // вступление — после формы; поисковик по-прежнему видит его целиком.
  it('над формой только первый абзац вступления, остальные — ниже', () => {
    const form = html.indexOf('id="hd-form-heading"');
    expect(form).toBeGreaterThan(-1);
    expect(html.indexOf(texts.intro[0])).toBeLessThan(form);
    for (const p of texts.intro.slice(1)) expect(html.indexOf(p)).toBeGreaterThan(form);
  });

  it('крошки: Главная → Расчёт Human Design', () => {
    const crumbs = pick(/<nav aria-label="[^"]*"[\s\S]*?<\/nav>/);
    expect(crumbs).toContain('href="/"');
    expect(crumbs).toContain(`aria-current="page" class="font-medium text-paper-900">${texts.breadcrumb}<`);
  });

  it('поля формы скрыты от Вебвизора, результата до расчёта нет', () => {
    for (const id of ['hd-date', 'hd-time', 'hd-city']) {
      expect(pick(new RegExp(`<input[^>]*id="${id}"[^>]*>`))).toContain('ym-disable-keys');
    }
    expect(html).not.toContain('data-testid="hd-result"');
  });

  // Пререндер не гидратируется (см. main.tsx): без disabled человек успел бы
  // ввести дату в «живую» статическую разметку раньше, чем смонтируется
  // React, — и потерял бы её при замене DOM. max — дата сборки, а не
  // посетителя; в статике её быть не должно, иначе HTML менялся бы каждый день.
  it('форма неактивна до монтирования: disabled есть, max нет', () => {
    const form = pick(/<form[^>]*data-testid="hd-form"[\s\S]*?<\/form>/);
    expect(form, 'поля формы не отключены в статическом HTML').toContain('<fieldset disabled');
    expect(pick(/<input[^>]*id="hd-date"[^>]*>/), 'max в статике — дата сборки, устареет').not.toContain('max=');
  });

  it('оговорка и подпись GeoNames', () => {
    expect(html).toContain(texts.disclaimer);
    expect(html).toContain('href="https://www.geonames.org/"');
    expect(html).toContain('href="https://creativecommons.org/licenses/by/4.0/"');
    expect(html).toContain('href="/licenses.txt"');
  });

  // Китайская типографика: «，» и «。» без пробела после (пробел перед
  // латинским «GeoNames» остаётся). Тексты берём русские для обоих
  // рендеров — проверяем только пунктуацию, не перевод.
  it('подпись GeoNames: полноширинная пунктуация в zh, обычная — в ru', () => {
    // Ссылки разрывают текст тегами («GeoNames</a>，<a>CC BY…») — сравниваем
    // текстовое содержимое без разметки, а не сырой HTML.
    const pick = (lang: string) => {
      const h = renderToStaticMarkup(
        <I18nextProvider i18n={createServerI18n('ru')}>
          <HumanDesignPage texts={texts} language={lang} />
        </I18nextProvider>,
      );
      const raw = h.match(/<p data-testid="hd-credits">([\s\S]*?)<\/p>/)?.[1] ?? '';
      return raw.replace(/<[^>]+>/g, '');
    };
    expect(pick('zh')).toContain('GeoNames，CC BY 4.0。');
    expect(pick('ru')).toContain('GeoNames, CC BY 4.0.');
  });
});

describe('баннер языка на калькуляторе', () => {
  afterEach(() => {
    vi.doUnmock('../components/ui/LanguageBanner');
    vi.resetModules();
  });

  // РЕГРЕССИЯ: без фильтра баннер мог бы предложить язык, на котором
  // калькулятора нет. Проверяем, что страница передаёт именно hasHdCalculator
  // (не любую функцию с такой же сигнатурой) — как на тесте ценностей.
  it('баннер стоит на странице и получает именно hasHdCalculator', async () => {
    vi.resetModules();
    let captured: { available?: (code: string) => boolean } = {};
    vi.doMock('../components/ui/LanguageBanner', () => ({
      default: (props: { available?: (code: string) => boolean }) => {
        captured = props;
        return <i data-testid="language-banner" />;
      },
    }));
    const { default: Page } = await import('./HumanDesignPage');
    const { HD_TEXTS: hdTexts } = await import('../content/hd/texts.server');
    // Тот же модуль, что видит сама страница (после общего resetModules) —
    // иначе сравнение toBe сравнивало бы две разные функции с одинаковой
    // реализацией и ничего бы не проверяло.
    const { hasHdCalculator } = await import('../content/hd/availability');
    const html = renderToStaticMarkup(
      <I18nextProvider i18n={createServerI18n('ru')}>
        <Page texts={hdTexts.ru} language="ru" />
      </I18nextProvider>,
    );
    expect(html).toContain('data-testid="language-banner"');
    expect(captured.available).toBe(hasHdCalculator);
  });
});
