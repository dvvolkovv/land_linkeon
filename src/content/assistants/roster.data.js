/**
 * Реестр страниц ассистентов — язык-нейтральные факты.
 *
 * Обычный .js с соседним .d.ts по той же причине, что и
 * src/i18n/languages.data.js: его читают не только бандлер и TypeScript, но и
 * node-скрипты (prerender.mjs, check-assistants.mjs, fetch-avatars.mjs, скрипт
 * сбора примеров — он вне репозитория, у владельца) и тесты Playwright.
 *
 * ИСТОЧНИК ПРАВДЫ — таблица `agents` в базе приложения (spirits_back):
 * `id` и `category` — её колонки, `names` — поле `displayName` из
 * `GET /webhook/agents?lang=<код>`. Здесь копия. Переименование ассистента в
 * приложении не роняет ни сборку, ни тесты лендинга — расхождение ловит
 * `pnpm check-assistants`, его запускают перед каждым выкатом.
 *
 * `slug` — английское имя в нижнем регистре. Он попадает в адрес страницы и
 * не меняется: новый slug — новый URL и потеря накопленных позиций в поиске.
 *
 * Порядок записей — порядок показа в каталоге и подвале.
 */
export const ASSISTANTS = [
  {
    slug: 'roman', id: 12, category: 'assistant',
    related: ['alexandra', 'alexey', 'anna'],
    names: { ru: 'Роман', en: 'Roman', es: 'Román', de: 'Roman', fr: 'Roman', zh: '罗曼', pt: 'Roman' },
  },
  {
    slug: 'alexey', id: 10, category: 'business',
    related: ['anna', 'andrey', 'vitaly'],
    names: { ru: 'Алексей', en: 'Alexey', es: 'Alexéi', de: 'Alexej', fr: 'Alexeï', zh: '阿列克谢', pt: 'Alexei' },
  },
  {
    slug: 'anna', id: 9, category: 'business',
    related: ['vitaly', 'alexey', 'andrey'],
    names: { ru: 'Анна', en: 'Anna', es: 'Anna', de: 'Anna', fr: 'Anna', zh: '安娜', pt: 'Anna' },
  },
  {
    slug: 'andrey', id: 7, category: 'business',
    related: ['anna', 'alexey', 'pavel'],
    names: { ru: 'Андрей', en: 'Andrey', es: 'Andréi', de: 'Andrej', fr: 'Andreï', zh: '安德烈', pt: 'Andrei' },
  },
  {
    slug: 'vitaly', id: 17, category: 'business',
    related: ['anna', 'andrey', 'pavel'],
    names: { ru: 'Виталий', en: 'Vitaly', es: 'Vitali', de: 'Witali', fr: 'Vitali', zh: '维塔利', pt: 'Vitali' },
  },
  {
    slug: 'alexandra', id: 11, category: 'business',
    related: ['ekaterina', 'pavel', 'kira'],
    names: { ru: 'Александра', en: 'Alexandra', es: 'Alexandra', de: 'Alexandra', fr: 'Alexandra', zh: '亚历山德拉', pt: 'Alexandra' },
  },
  {
    slug: 'ekaterina', id: 6, category: 'business',
    related: ['alexandra', 'kira', 'pavel'],
    names: { ru: 'Екатерина', en: 'Ekaterina', es: 'Ekaterina', de: 'Jekaterina', fr: 'Ekaterina', zh: '叶卡捷琳娜', pt: 'Ekaterina' },
  },
  {
    slug: 'pavel', id: 20, category: 'business',
    related: ['alexandra', 'ekaterina', 'andrey'],
    names: { ru: 'Павел', en: 'Pavel', es: 'Pável', de: 'Pawel', fr: 'Pavel', zh: '帕维尔', pt: 'Pavel' },
  },
  {
    slug: 'irina', id: 4, category: 'business',
    related: ['misha', 'olia'],
    names: { ru: 'Ирина', en: 'Irina', es: 'Irina', de: 'Irina', fr: 'Irina', zh: '伊琳娜', pt: 'Irina' },
  },
  {
    slug: 'dmitry', id: 19, category: 'business',
    related: ['andrey', 'vitaly', 'kira'],
    names: { ru: 'Дмитрий', en: 'Dmitry', es: 'Dmitri', de: 'Dmitrij', fr: 'Dmitri', zh: '德米特里', pt: 'Dmitri' },
  },
  {
    slug: 'kira', id: 22, category: 'business',
    related: ['alexandra', 'ekaterina'],
    names: { ru: 'Кира', en: 'Kira', es: 'Kira', de: 'Kira', fr: 'Kira', zh: '基拉', pt: 'Kira' },
  },
  {
    slug: 'misha', id: 1, category: 'personal',
    related: ['olia', 'irina', 'polina'],
    names: { ru: 'Миша', en: 'Misha', es: 'Misha', de: 'Mischa', fr: 'Micha', zh: '米沙', pt: 'Micha' },
  },
  {
    slug: 'olia', id: 2, category: 'personal',
    related: ['misha', 'masha', 'irina'],
    names: { ru: 'Оля', en: 'Olia', es: 'Olia', de: 'Olja', fr: 'Olia', zh: '奥莉娅', pt: 'Ólia' },
  },
  {
    slug: 'masha', id: 3, category: 'personal',
    related: ['olia', 'misha', 'raya'],
    names: { ru: 'Маша', en: 'Masha', es: 'Masha', de: 'Mascha', fr: 'Macha', zh: '玛莎', pt: 'Macha' },
  },
  {
    slug: 'liana', id: 5, category: 'personal',
    related: ['raya', 'shankara'],
    names: { ru: 'Лиана', en: 'Liana', es: 'Liana', de: 'Liana', fr: 'Liana', zh: '莉安娜', pt: 'Liana' },
  },
  {
    slug: 'shankara', id: 13, category: 'personal',
    related: ['raya', 'liana'],
    names: { ru: 'Шанкара', en: 'Shankara', es: 'Shankara', de: 'Shankara', fr: 'Shankara', zh: '香卡拉', pt: 'Shankara' },
  },
  {
    slug: 'raya', id: 14, category: 'personal',
    related: ['shankara', 'liana', 'misha'],
    names: { ru: 'Райя', en: 'Raya', es: 'Raya', de: 'Raya', fr: 'Raya', zh: '拉娅', pt: 'Raya' },
  },
  {
    slug: 'polina', id: 21, category: 'personal',
    related: ['misha', 'olia'],
    names: { ru: 'Полина', en: 'Polina', es: 'Polina', de: 'Polina', fr: 'Polina', zh: '波琳娜', pt: 'Polina' },
  },
];

export const ASSISTANT_SLUGS = ASSISTANTS.map((a) => a.slug);
