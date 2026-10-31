import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AssistantPage from './AssistantPage';
import AssistantsCatalogPage from './AssistantsCatalogPage';
import { createServerI18n } from '../i18n/server';
import { PACKS } from '../content/assistants/packs.server';
import { ASSISTANTS, assistantBySlug } from '../content/assistants/roster';

// Как в sitePageReleased.test.ts: мок делает тест независимым от реального
// состояния выпуска калькулятора — переживёт его запуск на 'de' и любом
// другом языке, кроме ru.
vi.mock('../content/hd/availability', () => ({
  hasHdCalculator: (code: string) => code === 'ru',
}));

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

  // Главное действие наверху — поле вопроса (проба без входа, spec
  // 2026-10-30-guest-trial); внизу осталась кнопка в чат. Обе — к этому ассистенту.
  it('наверху поле вопроса к этому ассистенту, внизу кнопка в чат', () => {
    const situationsAt = html.indexOf('id="situations-heading"');
    const hero = html.slice(0, situationsAt);
    expect(hero).toContain('data-ask-box');
    expect(hero).toContain('data-cta="assistant-ask"');
    expect(hero).toContain('Опишите ситуацию своими словами — Райя ответит сразу');
    expect(hero).not.toContain('data-cta="assistant-start"');
    const ctas = [...html.matchAll(/<a[^>]*data-cta="assistant-start"[^>]*>/g)].map((m) => m[0]);
    expect(ctas).toHaveLength(1);
    expect(ctas[0]).toContain('href="https://my.linkeon.io/chat?assistant=14&amp;utm_content=assistant-raya');
  });

  it('вопросов столько же, сколько в текстах, и они же в FAQPage', () => {
    expect(html.match(/<details/g)).toHaveLength(PACKS.ru.raya.faq.length);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain('data-testid="assistant-faq"');
  });

  // FAQ Райи противопоставляет её калькулятору — там ссылка на наш, именно в
  // ответе на вопрос про отличие от калькулятора: проверка по всей секции
  // зеленела бы, даже если ссылка утекла в другой <details>.
  it('FAQ Райи ведёт на калькулятор Human Design — в ответе про отличие от него', () => {
    const faq = pick(html, /<section[^>]*data-testid="assistant-faq"[\s\S]*?<\/section>/);
    const question = PACKS.ru.raya.faq.find((f) => f.link)!.q;
    const details = [...faq.matchAll(/<details[\s\S]*?<\/details>/g)].map((m) => m[0]);
    const target = details.find((d) => d.includes(question));
    expect(target, `не нашёлся <details> с вопросом «${question}»`).toBeDefined();
    expect(target).toContain('href="/calculators/human-design/"');
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

  // Решение владельца: у Райи калькулятор Human Design — вторая кнопка в
  // шапке, рядом с главной. Это переход внутри сайта, а не в приложение,
  // поэтому без data-cta. Берём блок до situations-heading: тот же адрес и
  // текст есть ещё и в FAQ (там — проверка отдельным тестом), и это не он.
  it('вторая кнопка наверху — калькулятор, без data-cta', () => {
    const situationsAt = html.indexOf('id="situations-heading"');
    expect(situationsAt).toBeGreaterThan(-1);
    const hero = html.slice(0, situationsAt);
    const tag = hero.match(/<a[^>]*href="\/calculators\/human-design\/"[^>]*>/);
    expect(tag, 'нет ссылки на калькулятор в верхнем блоке страницы').not.toBeNull();
    expect(tag![0]).not.toContain('data-cta');
    expect(hero).toContain('Рассчитать бодиграф бесплатно');
  });
});

describe('страница ассистента — без второй кнопки наверху (Роман)', () => {
  const html = render(<AssistantPage entry={assistantBySlug('roman')!} pack={PACKS.ru} language="ru" />);

  // У остальных ассистентов heroLink не задан — второй кнопки в шапке нет.
  // Подвал на ru ссылается на калькулятор у ЛЮБОГО ассистента (пункт меню
  // продукта), поэтому проверяем только верхний блок, а не всю страницу.
  it('у Романа второй кнопки наверху нет', () => {
    const situationsAt = html.indexOf('id="situations-heading"');
    expect(situationsAt).toBeGreaterThan(-1);
    const hero = html.slice(0, situationsAt);
    expect(hero).not.toContain('/calculators/human-design/');
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

describe('FAQ-ссылка на странице ассистента', () => {
  // РЕГРЕССИЯ: f.link рендерился без проверки isSitePageReleased — после
  // перевода (Task 8) ссылка FAQ Райи на других языках повела бы на
  // /<code>/calculators/human-design/, которого там ещё нет (hasHdCalculator
  // замокан выше: 'ru' выпущен, остальные — нет, независимо от реальной даты
  // запуска калькулятора на других языках).
  it('скрыта, если её страница не выпущена на этом языке — но сам вопрос остаётся', () => {
    const entry = assistantBySlug('raya')!;
    const linked = PACKS.ru.raya.faq.find((f) => f.link)!;
    const unreleasedPack = {
      ...PACKS.ru,
      raya: {
        ...PACKS.ru.raya,
        faq: PACKS.ru.raya.faq.map((f) =>
          f.link ? { ...f, link: { ...f.link, href: '/de/calculators/human-design/' } } : f,
        ),
      },
    };
    const html = render(<AssistantPage entry={entry} pack={unreleasedPack} language="ru" />);
    const faq = pick(html, /<section[^>]*data-testid="assistant-faq"[\s\S]*?<\/section>/);
    // Невакуумная проверка: без неё тест зеленел бы и если вопрос пропал из
    // FAQ целиком, а не только если скрылась ссылка внутри него.
    expect(faq, `вопрос «${linked.q}» пропал из FAQ`).toContain(linked.q);
    expect(faq).not.toContain('/de/calculators/human-design/');
  });
});
