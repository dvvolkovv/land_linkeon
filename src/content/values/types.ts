import type { AxisKey, AxisLean, HigherOrderKey, ItemId, ValueKey } from '../../lib/schwartz';

export interface ValueText {
  /** «Самостоятельность» — на круге, в карточках и в разделе о модели. */
  name: string;
  /** Как ценность звучит в сообщении Оле: «самостоятельность». */
  inMessage: string;
  /** Строка под названием: до 60 знаков, со строчной буквы. */
  line: string;
  /** 2–3 предложения, 150–420 знаков, начинается с названия. */
  text: string;
}

/**
 * Тексты теста ценностей на одном языке. Правила наполнения — раздел
 * «Правила текстов» плана docs/superpowers/plans/2026-10-12-values-test.md;
 * механическая часть проверяется в texts.test.ts.
 *
 * Шаблоны с {ключами} заполняет fillTemplate (src/lib/chatDraft.ts).
 */
export interface ValuesTexts {
  /** <title>: поисковая формулировка и бренд, до 70 знаков. */
  title: string;
  /** meta description, 100–180 знаков. */
  description: string;
  h1: string;
  /** Пункт хлебных крошек: «Тест ценностей». */
  breadcrumb: string;
  /** Вступление — 2–4 абзаца; над тестом — только первый. */
  intro: string[];
  start: {
    meta: string;
    begin: string;
    /** «Продолжить ({done} из {total})» */
    resume: string;
    restart: string;
  };
  question: {
    prompt: string;
    /** «{n} из {total}» */
    progress: string;
    back: string;
    /** Подписи ответов 1…6 по порядку: от «совсем не похож» до «очень похож». */
    scale: string[];
  };
  statements: Record<ItemId, string>;
  values: Record<ValueKey, ValueText>;
  /** Названия групп — в легенде под кругом. */
  higherOrder: Record<HigherOrderKey, string>;
  /** Фразы результата, к посетителю. Абзац — фраза change, пробел, фраза focus. */
  axes: Record<AxisKey, Record<AxisLean, string>>;
  /** Те же фразы для сообщения Оле, от первого лица: change — с заглавной, focus — со строчной. */
  axesInMessage: Record<AxisKey, Record<AxisLean, string>>;
  result: {
    heading: string;
    /** alt картинки — общие слова, без результата. */
    circleAlt: string;
    legend: string;
    topHeading: string;
    bottomHeading: string;
    axesHeading: string;
    flatHeading: string;
    flatText: string;
    /** «Разобрать с Олей» */
    cta: string;
    /** «Личный разбор ценностей — у Оли, при регистрации 25 000 токенов в подарок» */
    ctaNote: string;
    allHeading: string;
    restart: string;
    /** Под карточкой третьей ведущей или наименее важной при полной ничьей: «С тем же результатом: {names}». */
    tiedWith: string;
    /** Заголовок, когда выделилась одна ценность: «Ведущая ценность». */
    topHeadingOne: string;
    /** Вместо наименее важной, когда остальные набрали поровну (restEqual). */
    restEqual: string;
  };
  modelSection: { heading: string; lead: string };
  faqHeading: string;
  /** 4–6 вопросов — их же видит поисковик в FAQPage. */
  faq: { q: string; a: string }[];
  disclaimer: string;
  /** Союз перед последним названием в перечне сообщения: «и». */
  and: string;
  /** В сообщении Оле после ценности при полной ничьей: «(с тем же результатом — {names})». */
  tiedInMessage: string;
  /** Часть сообщения про наименее важную: «на последнем — {bottom}». */
  bottomInMessage: string;
  /** Та же часть, когда остальные набрали поровну: «остальные — поровну». */
  restEqualInMessage: string;
  /** Первое сообщение Оле: {top} {rest} {axes}; {rest} — bottomInMessage или restEqualInMessage. */
  message: string;
  /** Сообщение, когда приоритеты не выделились. */
  messageFlat: string;
}
