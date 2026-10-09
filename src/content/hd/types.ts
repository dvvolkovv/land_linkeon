import type { CenterId, HdAuthority, HdDefinition, HdType } from '../../lib/human-design';

/** Все 12 профилей; другие сочетания линий при дизайне в 88° не возникают. */
export const PROFILES = ['1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '4/1', '5/1', '5/2', '6/2', '6/3'] as const;
export type ProfileKey = (typeof PROFILES)[number];

export interface Described {
  name: string;
  text: string;
}

/**
 * Тексты страницы калькулятора на одном языке. Правила наполнения — раздел
 * «Правила текстов» плана docs/superpowers/plans/2026-10-08-human-design-calculator.md;
 * механическая часть проверяется в texts.test.ts.
 *
 * Шаблоны с {ключами} заполняет fillTemplate (src/lib/hdDraft.ts).
 */
export interface HdTexts {
  /** <title>: поисковая формулировка и бренд, до 70 знаков. */
  title: string;
  /** meta description, 100–180 знаков. */
  description: string;
  h1: string;
  /** Пункт хлебных крошек и подвала: «Расчёт Human Design». */
  breadcrumb: string;
  /** Вводный текст о методе — 2–4 абзаца, видит и поисковик. */
  intro: string[];
  form: {
    heading: string;
    date: string;
    time: string;
    /** Почему время обязательно. */
    timeHint: string;
    city: string;
    cityPlaceholder: string;
    /** «Нет своего города — выберите ближайший крупный в том же поясе». */
    cityHint: string;
    cityLoading: string;
    cityLoadError: string;
    cityNotFound: string;
    /** «{city}, {offset} на дату рождения» */
    zoneLine: string;
    zoneUnknown: string;
    /** Стрелки перевели вперёд, времени {time} на часах не было. */
    dstGap: string;
    /** Стрелки перевели назад, время {time} было дважды. */
    dstAmbiguous: string;
    /** «До перевода стрелок ({offset})» */
    dstBefore: string;
    /** «После перевода ({offset})» */
    dstAfter: string;
    dstChoose: string;
    missing: string;
    futureDate: string;
    submit: string;
  };
  result: {
    heading: string;
    /** «{date}, {time}, {city} ({offset})» — скрыта от Вебвизора. */
    dataLine: string;
    /** aria-label схемы: «Бодиграф: {type}. Определённые центры: {centers}». */
    bodygraphLabel: string;
    /** aria-label схемы, когда определённых центров нет (Рефлектор): «Бодиграф: {type}. Определённых центров нет». */
    bodygraphLabelEmpty: string;
    legendPersonality: string;
    legendDesign: string;
    typeLabel: string;
    strategyLabel: string;
    authorityLabel: string;
    profileLabel: string;
    definitionLabel: string;
    definedCenters: string;
    noDefinedCenters: string;
    openCenters: string;
    channels: string;
    noChannels: string;
    /** «Разобрать с Райей» */
    cta: string;
    /** «Личный разбор и эксперимент на 7 дней — у Райи, при регистрации 25 000 токенов в подарок» */
    ctaNote: string;
  };
  types: Record<HdType, { name: string; strategy: string; text: string }>;
  /** inMessage — как авторитет звучит в сообщении Райе: «сакральный авторитет». */
  authorities: Record<HdAuthority, { name: string; inMessage: string; text: string }>;
  profiles: Record<ProfileKey, Described>;
  definitions: Record<HdDefinition, Described>;
  centers: Record<CenterId, { name: string; defined: string; open: string }>;
  /** Ключ — «20-34», как channelKey(). */
  channels: Record<string, Described>;
  typesSection: { heading: string; lead: string };
  faqHeading: string;
  /** Не меньше 4 вопросов — их же видит поисковик в FAQPage. */
  faq: { q: string; a: string }[];
  /** Оговорка мелким шрифтом: самопознание, не прогноз и не замена специалисту. */
  disclaimer: string;
  /** Подпись GeoNames (требование CC BY 4.0). */
  credits: string;
  /** Подпись ссылки на /licenses.txt. */
  licenses: string;
  /** Первое сообщение Райе: {date} {time} {city} {offset} {type} {profile} {authority}. */
  message: string;
}
