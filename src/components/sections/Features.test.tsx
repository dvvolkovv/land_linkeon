import { renderToStaticMarkup } from 'react-dom/server';
import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Features from './Features';
import ru from '../../i18n/locales/ru.json';
import en from '../../i18n/locales/en.json';
import es from '../../i18n/locales/es.json';
import de from '../../i18n/locales/de.json';
import fr from '../../i18n/locales/fr.json';
import pt from '../../i18n/locales/pt.json';
import zh from '../../i18n/locales/zh.json';

/**
 * Матрица каналов рисует значение иконкой, а иконка для скринридера — пустое
 * место. Единственное, что доносит «есть» и «нет», — спрятанный текст в
 * sr-only. Пока он на месте и «есть» отличается от «нет», ячейка читается;
 * стоит вернуть общий на оба состояния aria-label (например, с названием
 * колонки) — таблица для скринридера превратится в 18 одинаковых ячеек.
 *
 * Счётчики берём из самой локали, а не из констант: набор строк матрицы
 * заведомо будет меняться, и тест не должен краснеть от каждой правки списка.
 */
const LOCALES: Record<string, typeof ru> = { ru, en, es, de, fr, pt, zh };

function render(lng: string): string {
  const i18n = createInstance();
  void i18n.use(initReactI18next).init({
    lng,
    fallbackLng: 'ru',
    resources: Object.fromEntries(
      Object.entries(LOCALES).map(([code, translation]) => [code, { translation }]),
    ),
    interpolation: { escapeValue: false },
  });
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18n}>
      <Features />
    </I18nextProvider>,
  );
}

function srOnlyCount(html: string, text: string): number {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (html.match(new RegExp(`class="sr-only">${escaped}<`, 'g')) ?? []).length;
}

describe('Features: матрица каналов', () => {
  for (const [code, locale] of Object.entries(LOCALES)) {
    describe(code, () => {
      const { yes, no, rows } = locale.features.matrix;
      const expectedYes = rows.filter((r) => r.web).length
        + rows.filter((r) => r.tg).length
        + rows.filter((r) => r.android).length;
      const expectedNo = rows.length * 3 - expectedYes;

      it('«есть» и «нет» — разные слова', () => {
        expect(yes).not.toBe(no);
      });

      it('у каждой ячейки есть текстовое значение', () => {
        const html = render(code);
        expect(srOnlyCount(html, yes)).toBe(expectedYes);
        expect(srOnlyCount(html, no)).toBe(expectedNo);
      });

      it('секция отрисована целиком, без непереведённых ключей', () => {
        const html = render(code);
        expect(html).toContain(locale.features.h2);
        expect(html).toContain(locale.features.matrix.checked);
        expect(html).not.toContain('features.');
      });
    });
  }
});
