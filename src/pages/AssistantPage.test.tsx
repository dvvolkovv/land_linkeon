import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AssistantPage from './AssistantPage';
import AssistantsCatalogPage from './AssistantsCatalogPage';
import { createServerI18n } from '../i18n/server';
import { PACKS } from '../content/assistants/packs.server';
import { ASSISTANTS, assistantBySlug } from '../content/assistants/roster';

const render = (ui: ReactElement, language = 'ru') =>
  renderToStaticMarkup(<I18nextProvider i18n={createServerI18n(language)}>{ui}</I18nextProvider>);

// Подвал любой страницы раздела ссылается на всех ассистентов и на разделы
// главной: проверка ссылок по всей разметке зеленела и без проверяемого блока
// (проверено нарочной поломкой). Поэтому ссылки ищутся только в своей части
// страницы.
const pick = (html: string, re: RegExp) => html.match(re)?.[0] ?? '';
/** На каких ассистентов ведут ссылки фрагмента — без повторов, по алфавиту. */
const linkedSlugs = (fragment: string) =>
  [...new Set([...fragment.matchAll(/href="\/assistants\/([a-z]+)\/"/g)].map((m) => m[1]))].sort();
const CRUMBS = /<nav aria-label="Навигационная цепочка"[\s\S]*?<\/nav>/;

describe('страница ассистента', () => {
  const entry = assistantBySlug('raya')!;
  const html = render(<AssistantPage entry={entry} pack={PACKS.ru} language="ru" />);

  it('один H1, и в нём имя', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)![1]).toContain('Райя');
  });

  // Обе кнопки — главное действие страницы. Ведут в чат именно с этим
  // ассистентом, с меткой страницы для signup_campaign.
  it('обе кнопки ведут в чат с этим ассистентом', () => {
    const ctas = [...html.matchAll(/<a[^>]*data-cta="assistant-start"[^>]*>/g)].map((m) => m[0]);
    expect(ctas).toHaveLength(2);
    for (const tag of ctas) {
      expect(tag).toContain('href="https://my.linkeon.io/chat?assistant=14&amp;utm_content=assistant-raya');
    }
  });

  it('вопросов столько же, сколько в текстах, и они же в FAQPage', () => {
    expect(html.match(/<details/g)).toHaveLength(PACKS.ru.raya.faq.length);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain('data-testid="assistant-faq"');
  });

  it('«Работает в паре с» ведёт ровно на страницы соседей', () => {
    const related = pick(html, /<section[^>]*aria-labelledby="related-heading"[\s\S]*?<\/section>/);
    expect(linkedSlugs(related)).toEqual([...entry.related].sort());
  });

  it('меню шапки ведёт на разделы главной', () => {
    expect(pick(html, /<header[\s\S]*?<\/header>/)).toContain('href="/#pricing"');
  });

  // Видимые крошки — те же пункты, что в BreadcrumbList: Главная → Ассистенты →
  // имя. Текущая страница — текстом, не ссылкой на саму себя.
  it('крошки: главная, каталог и сама страница — текстом', () => {
    const nav = pick(html, CRUMBS);
    expect(nav).toMatch(/href="\/"[\s\S]*href="\/assistants\/"[\s\S]*<li aria-current="page"[^>]*>Райя<\/li>/);
    expect(nav).not.toContain('href="/assistants/raya/"');
  });

  // Каждая строка ответа — свой блок; пункту списка нужен висячий отступ, иначе
  // на телефоне перенос длинного пункта уходит под маркер. Текст строки — как в
  // исходнике, без правок.
  it('пункты списка в примере ответа — с висячим отступом', () => {
    const items = PACKS.ru.raya.example.answer.split('\n').filter((l) => /^(—|-|•|\d+[.)])\s/.test(l));
    expect(items.length).toBeGreaterThan(0);
    expect(html.match(/<span class="block pl-5 -indent-5">/g) ?? []).toHaveLength(items.length);
    for (const line of items) expect(html).toContain(`<span class="block pl-5 -indent-5">${line}</span>`);
  });

  // На страницах Оли и Райи «карта» двусмысленна (карта ценностей, карта
  // Human Design) — поэтому у кнопки своя строка доверия, про банковскую карту.
  it('строка доверия у кнопки — своя, про банковскую карту', () => {
    expect(html).toContain('Банковскую карту не спрашиваем');
  });

  // У Райи пример — только текст; картинка есть лишь там, где она пришла
  // в настоящем разговоре (сейчас — у Киры).
  it('у Райи в примере нет картинки', () => {
    expect(html).not.toContain('/examples/');
  });
});

describe('страница ассистента — картинка в примере (Кира)', () => {
  const entry = assistantBySlug('kira')!;
  const html = render(<AssistantPage entry={entry} pack={PACKS.ru} language="ru" />);
  const image = PACKS.ru.kira.example.image!;

  // Картинка встаёт сразу после первого абзаца ответа — там, где она пришла
  // в чате, — и несёт свой src и alt, а не текст вроде markdown-тега.
  it('картинка — между первым и вторым абзацем ответа, с нужным src и alt', () => {
    const imgTag = pick(html, /<img[^>]*src="\/examples\/kira-logo\.webp"[^>]*>/);
    expect(imgTag, 'нет <img> с картинкой примера').not.toBe('');
    expect(imgTag).toContain(`alt="${image.alt}"`);

    const firstParagraphAt = html.indexOf('Вот первый вариант логотипа:');
    const imageAt = html.indexOf(imgTag);
    const secondParagraphAt = html.indexOf('Над надписью стоит колосок');
    expect(firstParagraphAt).toBeGreaterThan(-1);
    expect(secondParagraphAt).toBeGreaterThan(-1);
    expect(imageAt).toBeGreaterThan(firstParagraphAt);
    expect(imageAt).toBeLessThan(secondParagraphAt);
  });
});

describe('каталог', () => {
  const html = render(<AssistantsCatalogPage pack={PACKS.ru} language="ru" />);

  it('ссылки на всех ассистентов', () => {
    const main = pick(html, /<main[\s\S]*<\/main>/);
    for (const a of ASSISTANTS) expect(main, a.slug).toContain(`href="/assistants/${a.slug}/"`);
  });

  // В секции группы — ровно ассистенты её категории: ни пропавшего, ни чужого.
  it('три группы — по категориям базы', () => {
    for (const group of ['assistant', 'business', 'personal']) {
      const section = pick(html, new RegExp(`<section[^>]*aria-labelledby="group-${group}"[\\s\\S]*?</section>`));
      expect(section, group).toContain(`id="group-${group}"`);
      const expected = ASSISTANTS.filter((a) => a.category === group).map((a) => a.slug).sort();
      expect(linkedSlugs(section), group).toEqual(expected);
    }
  });

  it('крошки: главная и сам каталог — текстом', () => {
    const nav = pick(html, CRUMBS);
    expect(nav).toMatch(/href="\/"[\s\S]*<li aria-current="page"[^>]*>Ассистенты<\/li>/);
    expect(nav).not.toContain('href="/assistants/"');
  });
});

describe('баннер языка на страницах раздела', () => {
  afterEach(() => {
    vi.doUnmock('../components/ui/LanguageBanner');
    vi.resetModules();
  });

  // РЕГРЕССИЯ: баннер стоял только в App — англоязычный посетитель из поиска
  // на русской странице ассистента не получал предложения сменить язык.
  // Сам баннер решает в эффекте, которого в рендере на сервере нет, поэтому
  // здесь он подменён меткой: проверяется, что страницы его ставят.
  it('есть и на странице ассистента, и в каталоге', async () => {
    vi.resetModules();
    vi.doMock('../components/ui/LanguageBanner', () => ({ default: () => <i data-testid="language-banner" /> }));
    const { default: Page } = await import('./AssistantPage');
    const { default: Catalog } = await import('./AssistantsCatalogPage');
    const marker = 'data-testid="language-banner"';
    expect(render(<Page entry={assistantBySlug('raya')!} pack={PACKS.ru} language="ru" />)).toContain(marker);
    expect(render(<Catalog pack={PACKS.ru} language="ru" />)).toContain(marker);
  });

  // Предложение зависит от языка браузера — в пререндере его быть не может:
  // иначе краулер и первый кадр получили бы ссылку, посчитанную для чужого
  // языка.
  it('в пререндере не выводит ничего', () => {
    for (const html of [
      render(<AssistantPage entry={assistantBySlug('raya')!} pack={PACKS.ru} language="ru" />),
      render(<AssistantsCatalogPage pack={PACKS.ru} language="ru" />),
    ]) {
      expect(html).not.toContain('lang-banner-link');
      expect(html).not.toContain('aria-label="Dismiss"');
    }
  });
});
