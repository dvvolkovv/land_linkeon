import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
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
});
