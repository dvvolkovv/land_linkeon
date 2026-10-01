import type { AssistantSlug } from './roster.data.js';

/** Картинка из ответа примера — см. комментарий у `example.image`. */
export interface ExampleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Текст одной страницы ассистента на одном языке. Правила наполнения — раздел
 * «Правила текстов» плана docs/superpowers/plans/2026-10-01-assistant-pages.md;
 * механическая их часть проверяется в packs.test.ts.
 */
export interface AssistantPageText {
  /** <title>: поисковая формулировка, имя, бренд. До 70 знаков. */
  title: string;
  /** meta description: 100–180 знаков (zh — 40–120). */
  description: string;
  /** H1 с поисковой формулировкой; обязан содержать имя ассистента на этом языке. */
  h1: string;
  /** Абзац под H1: кто это и чем полезен, одна-две фразы. */
  lead: string;
  /** Строка для карточки в каталоге и в «Работает в паре с», до 140 знаков. */
  card: string;
  /** Надпись кнопки в чат — с именем в нужной форме: «Поговорить с Алексеем». */
  cta: string;
  /** «С чем приходят»: 4–6 конкретных ситуаций. */
  situations: string[];
  /** Настоящий вопрос и сокращённый настоящий ответ; абзацы ответа — через пустую строку. */
  example: {
    question: string;
    answer: string;
    /**
     * Картинка из ответа (Кира рисует логотипы). Показывается после первого
     * абзаца ответа — там, где она пришла в чате. Файл — копия в
     * public/examples/: ссылка на хранилище приложения не обязана жить вечно.
     * src один на все языки, alt — переводится.
     */
    image?: ExampleImage;
  };
  /** «Что умеет»: 3–6 пунктов, только подтверждённое промптом. */
  can: string[];
  /** «Чего не делает»: 2–4 пункта. */
  cannot: string[];
  /** Вопросы и ответы: 4–5. */
  faq: { q: string; a: string }[];
}

export type AssistantPagesPack = Record<AssistantSlug, AssistantPageText>;
