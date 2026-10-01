# Страницы ассистентов на linkeon.io — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** у каждого из 18 ассистентов Linkeon — своя страница на linkeon.io (плюс каталог) на семи языках, с кнопкой, которая доводит нового человека прямо до чата с этим ассистентом.

**Architecture:** язык-нейтральный реестр (`roster.data.js`) + короткие строки в общих локалях + длинные тексты модулем на язык (`src/content/assistants/pages/<код>.ts`). Страницы пререндерятся тем же `scripts/prerender.mjs`, что и юридические; язык выпускается, только если у него есть модуль текстов. Браузер грузит тексты отдельным чанком и перерисовывает страницу только после его прихода. В кабинете (`spirits_front`) выбор ассистента запоминается до входа и применяется после.

**Tech Stack:** React 18, TypeScript, Vite 5 (`import.meta.glob`, `define`), Tailwind (палитры `paper`/`brand`), i18next, vitest, Playwright; кабинет — React Router 6, vitest + jsdom.

**Спека:** [docs/superpowers/specs/2026-10-01-assistant-pages-design.md](../specs/2026-10-01-assistant-pages-design.md)

---

## Порядок и зависимости

```
Task 1 → Task 2 → Task 3 → Task 4 → [СТОП: ревью образцов] → Task 5

Пока идёт ревью (нужен только Task 2):
  Task 6 → Task 8;  Task 9;  Task 10;  Task 16;  Task 17;  Task 20
  кабинет: Task 21 → Task 22 → Task 23 (выкат кабинета)

После Task 5:
  Task 7 → Task 11 → Task 12 → Task 13 → Task 14 → Task 15 → Task 18 → Task 19 → Task 24 → Task 25 → Task 26

Task 23 (выкат кабинета) — обязательно раньше Task 25 (выкат лендинга).
```

**Стоп-точки, где нужен владелец:** конец Task 4 (ревью образцов), Task 23 (каждый запуск `deploy.sh`), Task 24 (взгляд на скриншоты), Task 25 (запуск `deploy.sh`), Task 26 (Вебмастер, Search Console, Метрика). Без явного «да» дальше стоп-точки не идти.

**Где работать.** Код правится на маке в воркдеревьях. Тяжёлое (`pnpm build`, Playwright, полный `vitest`, `tsc`) — только на тест-ноде `dv@85.192.61.231` (решение владельца: мак не тянет). Локально допустимы точечные `./node_modules/.bin/vitest run <файл>`. Если сессия идёт на самой ноде (`hostname` = `ugliest-salmon`), то же самое делается в `~/dev/<репо>` без ssh.

**Ответы и тексты — по-русски**, обращение к посетителю на «вы» (кроме zh — «你», как на всём китайском лендинге). Слово «ассистент», не «агент».

## Файлы

| Файл | Ответственность | Что с ним |
|---|---|---|
| `src/content/assistants/roster.data.js` + `.d.ts` | реестр: slug, id, категория, соседи, имена по языкам | создать |
| `src/content/assistants/roster.ts` | типизированные помощники над реестром | создать |
| `src/content/assistants/types.ts` | тип текста страницы | создать |
| `src/content/assistants/pages/<код>.ts` | тексты 18 страниц на языке | создать (ru, потом 6 переводов) |
| `src/content/assistants/packs.server.ts` | все языки синхронно — пререндер и тесты | создать |
| `src/content/assistants/load.ts` | один язык лениво — браузер | создать |
| `src/content/assistants/availability.ts` | на каких языках есть страницы (из `define`) | создать |
| `src/content/assistants/jsonLd.ts` | разметка schema.org | создать |
| `src/lib/assistantRoute.ts` | разбор и сборка адресов `/assistants/…` | создать |
| `src/i18n/urlLanguage.ts` | переключатель языка остаётся на странице ассистента | изменить |
| `src/i18n/locales/*.json` | ветка `assistantPages`, карточка Ирины | изменить |
| `src/components/assistants/{AssistantAvatar,AssistantCard,JsonLd}.tsx` | кирпичи страниц | создать |
| `src/pages/AssistantPage.tsx`, `src/pages/AssistantsCatalogPage.tsx` | страница ассистента, каталог | создать |
| `src/components/layout/Header.tsx`, `Footer.tsx` | меню и подвал на подстраницах, колонка ассистентов | изменить |
| `src/components/sections/Assistants.tsx` + `assistantCards.ts` | карточки главной ведут на страницы | изменить / создать |
| `src/lib/track.ts` | путь страницы в событиях | изменить |
| `src/entry-server.tsx`, `src/main.tsx`, `scripts/prerender.mjs` | пререндер и вход в браузере | изменить |
| `scripts/site-urls.mjs` + `.d.mts` | адреса раздела, sitemap | изменить |
| `scripts/assistant-page-languages.js` + `.d.ts` | какие языки выпускаются | создать |
| `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts` | `define` списка языков | изменить |
| скрипты выгрузки промптов и сбора примеров | вне репозитория, у владельца (`.superpowers/assistant-pages/`, в `.gitignore`) | — |
| `scripts/fetch-avatars.mjs` | аватары в `public/avatars/` | создать |
| `scripts/check-assistants.mjs` | сверка реестра с живым API | создать |
| `public/avatars/<slug>.webp` | аватары 256×256, копия из кабинета | создать (18 файлов) |
| `package.json` | скрипты `fetch-avatars`, `check-assistants` (зависимости не меняются) | изменить |
| `docs/assistant-pages/examples/*.md` | сырые ответы — доказательство, что пример не сочинён | создать |
| `docs/assistant-pages/samples-ru.md` | три образца на ревью | создать |
| `tests/assistants.spec.ts`, `tests/i18n.spec.ts` | сырой HTML и браузер | создать / изменить |
| **spirits_front** `src/utils/pendingAssistant.ts` | выбор ассистента до входа | создать |
| **spirits_front** `src/pages/OnboardingPage.tsx`, `src/components/chat/ChatLayout.tsx`, `src/pages/ChatPage.tsx`, `src/App.tsx` | выбор переживает вход, экран тем пропускается | изменить |

## Правила текстов

Действуют во всех задачах, где пишутся тексты страниц (Task 4, 5, 19). Механическую часть проверяет `packs.test.ts` (Task 5); остальное — ревью.

1. **Факты — только из промпта.** Источник — `.superpowers/assistant-pages/prompts-ru.txt` (выгрузка — Task 3, скриптом владельца вне репозитория) и описание из `GET /webhook/agents`. Пункт «Что умеет», которого нет в промпте, не пишется. Цена — только известная: 25 000 токенов при регистрации, карта не нужна, пакеты от 149 ₽ без подписки, токены не сгорают (это говорит и главная).
2. **Голос** — спека `2026-09-07-landing-warmth-design.md`: «вы»; обстоятельства вместо превосходных степеней; без эмодзи; эмпатию не называть словами («заботливый», «мы рядом» — нельзя). Исключение: `title`, `description` и `h1` несут поисковую формулировку («AI-юрист онлайн»).
3. **Пример разговора** — из `docs/assistant-pages/examples/<slug>.md`. Сокращать можно, переписывать нельзя. Вырезанное место — «…». Разметку ответа (`**`, заголовки `#`, таблицы `|`) снять; служебные теги приложения в квадратных скобках (`[CALENDAR_PROPOSAL:…]` и подобные — они есть в ответах Романа, Алексея и Анны) вырезать целиком; переносы строк и маркеры списков «—» оставить; абзацы разделять пустой строкой. Если ассистент говорит на «ты» (Маша) — так и оставить.
4. **Границы.** Блок «Чего не делает» — честный: юрист не ведёт дела в суде; психологическая работа — не психотерапия; Полина — не врач (это сказано в её промпте); астрология, Human Design и нумерология — для самопознания, не прогноз и не замена врачу, юристу или финансисту.
5. **Оля — не «AI-психолог онлайн».** По промпту она ведёт исследование ценностей в семь этапов (Leadership Development Profile + спиральная динамика) и собирает карту ценностей. Поисковая формулировка — про карту ценностей и спиральную динамику. На её странице — куда звонить, если сейчас очень тяжело (см. п. 6).
6. **Телефоны помощи.** На русской странице — российские номера, сверенные с официальным источником в момент написания (в samples-ru.md — ссылка на источник). На нерусских страницах телефонов нет: «обратитесь в местную экстренную службу».
7. **Право какой страны.** Алексей, Анна, Андрей, Виталий, Павел по промпту работают с российской практикой: по умолчанию — российское право, другая страна — если человек её назовёт. У них в вопросах — пункт об этом. На нерусских страницах — как в русском тексте: «назовите свою страну — учтёт её» только у Алексея и Анны (в их промптах прямо оговорено, что страну можно назвать другую); у Андрея, Виталия и Павла — по умолчанию российская практика, а местные налоги и привычки рынка — сверить с местным специалистом.
8. **Отличие от обычного чат-бота** — то, что правда: общий профиль (рассказали одному — знают все), файлы целиком. Ассистенты НЕ передают разговор друг другу: Роман по промпту отвечает сам, привлекая знания нужного специалиста, и к другим ассистентам не отправляет; посоветовать соседа — можно, «позовёт коллегу» — нельзя. Приватность — формулировкой главной: «Переписку не продаём и не используем для рекламы. Обработка — у AI-провайдеров».
9. **Поля страницы** (тип `AssistantPageText`, Task 2): `title` до 70 знаков; `description` 100–180 знаков (zh — 40–120); `h1` обязательно содержит имя ассистента на этом языке; `lead` — одна-две фразы; `card` — строка для каталога до 140 знаков; `cta` — надпись кнопки с именем в нужной форме («Поговорить с Алексеем»); `situations` 4–6; `can` 3–6; `cannot` 2–4; `faq` 4–5. По-русски 400–650 слов видимого текста на страницу.

---

### Task 1: Рабочие копии

**Files:** ничего в репозитории; служебный скрипт в gitignore-каталоге.

- [ ] **Step 1: Воркдерево лендинга на маке**

```bash
cd ~/Downloads/land_linkeon
git status -sb   # ожидается: ## main...origin/main [ahead N] — коммиты спеки и плана; дерево чистое
git worktree add .worktrees/assistant-pages -b feat/assistant-pages
ln -s ~/Downloads/land_linkeon/node_modules .worktrees/assistant-pages/node_modules
cd .worktrees/assistant-pages && ./node_modules/.bin/vitest run src/lib/legalRoute.test.ts
```

Expected: `Test Files  1 passed`. Если не стартует из-за символьной ссылки — делать точечные прогоны на ноде (Step 3).

- [ ] **Step 2: Рабочая копия на ноде**

```bash
git -C ~/Downloads/land_linkeon/.worktrees/assistant-pages push -q -u origin feat/assistant-pages
SHA=$(git -C ~/Downloads/land_linkeon/.worktrees/assistant-pages rev-parse HEAD)
ssh dv@85.192.61.231 "git -C ~/ci/land_linkeon fetch -q origin && git -C ~/ci/land_linkeon worktree add --detach ~/ci/wt/assistant-pages $SHA && cd ~/ci/wt/assistant-pages && source ~/.nvm/nvm.sh && pnpm install 2>&1 | tail -3"
```

Expected: `Done in …`. Предупреждение `Ignored build scripts: esbuild` на сборку не влияет.

- [ ] **Step 3: Скрипт прогона на ноде**

Создать `~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh` (каталог `.superpowers/` в `.gitignore`):

```bash
#!/usr/bin/env bash
# Прогон на ноде на ТЕКУЩЕМ коммите воркдерева assistant-pages.
#   bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm test:unit'
# Коммит уезжает в служебную ветку ci/assistant-pages принудительно — так можно
# прогонять и временные «ломающие» коммиты, не трогая feat/assistant-pages.
set -euo pipefail
WT=~/Downloads/land_linkeon/.worktrees/assistant-pages
git -C "$WT" push -q -f origin HEAD:refs/heads/ci/assistant-pages
SHA=$(git -C "$WT" rev-parse HEAD)
ssh dv@85.192.61.231 "set -e; cd ~/ci/wt/assistant-pages && git fetch -q origin && git checkout -q --detach $SHA && source ~/.nvm/nvm.sh && (fuser -k 4173/tcp 2>/dev/null || true) && pnpm install --frozen-lockfile >/dev/null 2>&1 && $1"
```

Проверка: `bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm test:unit'` → все юнит-тесты зелёные (точка отсчёта).

`fuser -k 4173/tcp` гасит забытый `pnpm preview`: иначе Playwright подхватил бы старый `dist/` (`reuseExistingServer`). Playwright дальше всегда запускается с `CI=1` — с ним занятый порт даёт ошибку, а не чужую сборку.

- [ ] **Step 4: Воркдерево кабинета** (для Task 21–23)

```bash
cd ~/Downloads/spirits_front
git fetch -q origin
git worktree add .worktrees/assistant-deeplink -b feat/assistant-deeplink origin/main
ln -s ~/Downloads/spirits_front/node_modules .worktrees/assistant-deeplink/node_modules
cd .worktrees/assistant-deeplink && ./node_modules/.bin/vitest run src/i18n/languages.test.ts
```

Expected: `Test Files  1 passed`.

---

### Task 2: Реестр ассистентов и тип текста страницы

**Files:**
- Create: `src/content/assistants/roster.data.js`, `src/content/assistants/roster.data.d.ts`, `src/content/assistants/roster.ts`, `src/content/assistants/types.ts`
- Test: `src/content/assistants/roster.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/assistant-pages`.

- [ ] **Step 1: Написать тест**

`src/content/assistants/roster.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ASSISTANTS, ASSISTANT_SLUGS } from './roster.data.js';
import { assistantBySlug, assistantName, isAssistantSlug } from './roster';
import { SUPPORTED_CODES } from '../../i18n/languages.data.js';

describe('реестр ассистентов', () => {
  it('id и slug не повторяются', () => {
    expect(new Set(ASSISTANTS.map((a) => a.id)).size).toBe(ASSISTANTS.length);
    expect(new Set(ASSISTANT_SLUGS).size).toBe(ASSISTANTS.length);
  });

  // slug попадает в адрес и не меняется: он — английское имя из
  // GET /webhook/agents?lang=en, приведённое к нижнему регистру.
  it('slug — английское имя в нижнем регистре', () => {
    for (const a of ASSISTANTS) expect(a.slug).toBe(a.names.en.toLowerCase());
  });

  it('категории — значения колонки agents.category', () => {
    for (const a of ASSISTANTS) expect(['assistant', 'business', 'personal']).toContain(a.category);
  });

  it('«Работает в паре с»: 2–3 существующих соседа, не сам', () => {
    for (const a of ASSISTANTS) {
      expect(a.related.length, a.slug).toBeGreaterThanOrEqual(2);
      expect(a.related.length, a.slug).toBeLessThanOrEqual(3);
      for (const r of a.related) {
        expect(ASSISTANT_SLUGS, `${a.slug} → ${r}`).toContain(r);
        expect(r, a.slug).not.toBe(a.slug);
      }
    }
  });

  it('имя есть на каждом языке реестра', () => {
    for (const a of ASSISTANTS) {
      for (const code of SUPPORTED_CODES) {
        expect(a.names[code]?.trim(), `${a.slug}/${code}`).toBeTruthy();
      }
    }
  });

  it('помощники', () => {
    expect(assistantBySlug('raya')?.id).toBe(14);
    expect(assistantBySlug('german')).toBeUndefined();
    expect(isAssistantSlug('olia')).toBe(true);
    expect(isAssistantSlug('Olia')).toBe(false);
    expect(assistantName(assistantBySlug('misha')!, 'de')).toBe('Mischa');
    // Незнакомый язык — английское написание, а не русское.
    expect(assistantName(assistantBySlug('misha')!, 'ja')).toBe('Misha');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/content/assistants/roster.test.ts`
Expected: FAIL — `Failed to resolve import "./roster.data.js"`.

- [ ] **Step 3: Реестр**

`src/content/assistants/roster.data.js`:

```js
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
```

`src/content/assistants/roster.data.d.ts`:

```ts
export type AssistantSlug =
  | 'roman' | 'alexey' | 'anna' | 'andrey' | 'vitaly' | 'alexandra' | 'ekaterina' | 'pavel'
  | 'irina' | 'dmitry' | 'kira' | 'misha' | 'olia' | 'masha' | 'liana' | 'shankara' | 'raya'
  | 'polina';

/** Значения колонки agents.category в базе приложения. */
export type AssistantCategory = 'assistant' | 'business' | 'personal';

export interface AssistantEntry {
  slug: AssistantSlug;
  /** agents.id — по нему кабинет открывает чат: /chat?assistant=<id>. */
  id: number;
  category: AssistantCategory;
  /** Соседи для блока «Работает в паре с», 2–3 штуки. */
  related: AssistantSlug[];
  /** displayName из GET /webhook/agents?lang=<код>, по коду языка. */
  names: Record<string, string>;
}

export declare const ASSISTANTS: AssistantEntry[];
export declare const ASSISTANT_SLUGS: AssistantSlug[];
```

`src/content/assistants/roster.ts`:

```ts
/**
 * Типизированный вход в реестр ассистентов. Данные — в roster.data.js (его
 * читают и node-скрипты, которым TypeScript недоступен).
 */
export type { AssistantSlug, AssistantCategory, AssistantEntry } from './roster.data.js';
export { ASSISTANTS, ASSISTANT_SLUGS } from './roster.data.js';

import { ASSISTANTS, type AssistantEntry, type AssistantSlug } from './roster.data.js';

export function assistantBySlug(slug: string): AssistantEntry | undefined {
  return ASSISTANTS.find((a) => a.slug === slug);
}

export function isAssistantSlug(value: string): value is AssistantSlug {
  return ASSISTANTS.some((a) => a.slug === value);
}

/** Имя на языке страницы; на незнакомом языке — английское написание. */
export function assistantName(entry: AssistantEntry, language: string): string {
  return entry.names[language] ?? entry.names.en;
}
```

`src/content/assistants/types.ts`:

```ts
import type { AssistantSlug } from './roster.data.js';

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
  example: { question: string; answer: string };
  /** «Что умеет»: 3–6 пунктов, только подтверждённое промптом. */
  can: string[];
  /** «Чего не делает»: 2–4 пункта. */
  cannot: string[];
  /** Вопросы и ответы: 4–5. */
  faq: { q: string; a: string }[];
}

export type AssistantPagesPack = Record<AssistantSlug, AssistantPageText>;
```

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run src/content/assistants/roster.test.ts`
Expected: PASS, 6 тестов.

- [ ] **Step 5: Commit**

```bash
git add src/content/assistants/roster.data.js src/content/assistants/roster.data.d.ts src/content/assistants/roster.ts src/content/assistants/types.ts src/content/assistants/roster.test.ts
git commit -m "feat(assistants): реестр ассистентов и тип текста страницы

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Промпты и настоящие примеры разговоров

**Files:**
- Create: `docs/assistant-pages/examples/<slug>.md` (18 файлов)
- Вне репозитория: скрипт выгрузки промптов и скрипт сбора примеров — у владельца, в `.superpowers/assistant-pages/` основного чекаута (каталог в `.gitignore`). Репозиторий лендинга публичный: в нём не должно быть ни промптов, ни способа войти в прод.

- [ ] **Step 1: Выгрузить промпты**

Скрипт выгрузки промптов — вне репозитория, у владельца. Он читает системные промпты активных ассистентов с прода (только `select`) и пишет их в `.superpowers/assistant-pages/prompts-ru.txt`, по разделу `##### <id> <Имя>` на ассистента.
Expected: 18 разделов.

- [ ] **Step 2: Скрипт сбора примеров**

Скрипт сбора примеров — вне репозитория, у владельца. Он задаёт каждому ассистенту один типичный первый вопрос — такой, с каким к нему приходят на самом деле, — от тестового аккаунта, каждый вопрос в отдельной чистой сессии, чтобы ответ не опирался на прошлые разговоры. Ответ пишется как пришёл, без правок, в `docs/assistant-pages/examples/<slug>.md`: `# <Имя> (id N)`, строка «Снято <время>, тестовый аккаунт, чистая сессия.», затем `## Вопрос` и `## Ответ — как пришёл, без правок`. Номер аккаунта в файл не попадает. Файлы коммитятся: это доказательство, что пример на странице не сочинён.

- [ ] **Step 3: Снять примеры**

Запускает владелец, в фоне: это 15–30 минут.
Expected: 18 ответов длиннее 200 знаков. Если ответ — ошибка баланса (402 / «недостаточно токенов») — остановиться и сказать владельцу: тестовому аккаунту нужен баланс. Упавшего ассистента перезапустить выборочно.

- [ ] **Step 4: Прочитать все 18 ответов**

Для каждого `docs/assistant-pages/examples/<slug>.md` проверить:
- ответ по существу вопроса, а не сбой («временный сбой связи с моделью», пустые извинения) — иначе перезапустить этого ассистента;
- в ответе нет личного из профиля тестового аккаунта (имя владельца, его бизнес, номера). Если есть — перезапустить; если повторяется — показать владельцу, не публиковать.

- [ ] **Step 5: Commit**

```bash
git add docs/assistant-pages/examples/
git commit -m "docs(assistants): настоящие ответы ассистентов для примеров на страницах

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Три образца на ревью владельцу

**Files:**
- Create: `docs/assistant-pages/samples-ru.md`

- [ ] **Step 1: Сверить телефоны помощи**

Найти на официальном источнике (сайт Минздрава, МЧС или иной государственный) актуальные бесплатные круглосуточные номера экстренной психологической помощи в России. Записать номера и ссылку на источник — они понадобятся странице Оли. Не нашлось официального подтверждения номера — на странице только «112».

- [ ] **Step 2: Написать три страницы**

Алексей (`alexey`), Оля (`olia`), Райя (`raya`) — по разделу «Правила текстов» этого плана, из промптов (`.superpowers/assistant-pages/prompts-ru.txt`) и примеров (`docs/assistant-pages/examples/`). Файл `docs/assistant-pages/samples-ru.md`, на каждую страницу — такой блок:

```markdown
## Алексей — /assistants/alexey/

**title:** …
**description:** …
**H1:** …
**Под H1:** …
**Строка в каталоге:** …
**Кнопка:** …

### С чем приходят
- …

### Как это выглядит
**Вопрос:** …

**Ответ (сокращён):** …

### Что умеет
- …

### Чего не делает
- …

### Вопросы
**…?**
…

### Сверка с промптом
| Пункт страницы | Что в инструкции (пересказ) |
|---|---|
| … | … |
```

В «Сверке» — каждый пункт «Что умеет» и «Чего не делает» и пересказ своими словами того места инструкции, на которое он опирается. Дословно промпты не цитировать: репозиторий публичный, промпты — внутренняя кухня продукта. На странице Оли — номера из Step 1 со ссылкой на источник.

- [ ] **Step 3: Самопроверка**

По каждой из трёх страниц: длины полей из п. 9 правил; H1 содержит имя; в «Что умеет» нет пункта без опоры в промпте; нет эмодзи и слов-оценок эмпатии; у Алексея есть вопрос «по законам какой страны»; у Оли нет «психолог онлайн» в title, description и H1.

- [ ] **Step 4: Commit**

```bash
git add docs/assistant-pages/samples-ru.md
git commit -m "docs(assistants): три образца страниц на ревью

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: СТОП — ревью владельца**

Показать владельцу ссылку на `docs/assistant-pages/samples-ru.md` и коротко — что проверить: тон, честность границ, формулировки под поиск. Ждать «ок» или правок. Правки по образцам — это правки правил для остальных 15: внести их в раздел «Правила текстов» этого плана отдельным коммитом, прежде чем начинать Task 5.

---

### Task 5: Все 18 страниц по-русски

**Files:**
- Create: `src/content/assistants/packs.server.ts`, `src/content/assistants/pages/ru.ts`
- Test: `src/content/assistants/packs.test.ts`

- [ ] **Step 1: Модуль «все языки сразу»**

`src/content/assistants/packs.server.ts`:

```ts
import type { AssistantPagesPack } from './types';

/**
 * Тексты страниц на всех языках сразу и синхронно — для пререндера и тестов.
 *
 * Пререндер рисует страницу одним проходом renderToString и ждать ленивые
 * чанки не умеет. В клиентский бандл модуль не попадает: его импортируют
 * только src/entry-server.tsx и тесты. Браузер грузит свой язык через load.ts.
 */
const modules = import.meta.glob<{ default: AssistantPagesPack }>('./pages/*.ts', { eager: true });

export const PACKS: Record<string, AssistantPagesPack> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace(/^.*\/(\w+)\.ts$/, '$1'), mod.default]),
);
```

- [ ] **Step 2: Написать тест правил**

`src/content/assistants/packs.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ASSISTANTS, ASSISTANT_SLUGS } from './roster.data.js';
import { PACKS } from './packs.server';
import type { AssistantPageText } from './types';

/**
 * Механическая часть «Правил текстов» плана. Смысл — факты из промпта, голос,
 * честные границы — тестом не проверить, это ревью. Здесь то, что ломается
 * молча: пропавшая страница, пустое поле, чужое имя в H1, российский телефон
 * на нерусской странице, неснятая разметка в примере.
 */
const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
// Тепло — типографикой, а не смайлами (правило голоса лендинга). Пример
// разговора не проверяется: это настоящий ответ, он показывается как есть.
const EMOJI = /\p{Extended_Pictographic}/u;
const RU_PHONE = /8[\s-]?800|\+7[\s(-]?\d/;
const MARKDOWN = /\*\*|^#{1,6}\s|^\s*\|.*\|\s*$/m;
// Служебные теги приложения вида [CALENDAR_PROPOSAL:<uuid>] — для посетителя мусор.
const APP_TAG = /\[[A-Z][A-Z_]+:/;

const own = (p: AssistantPageText) => [
  p.title, p.description, p.h1, p.lead, p.card, p.cta,
  ...p.situations, ...p.can, ...p.cannot, ...p.faq.flatMap((f) => [f.q, f.a]),
];
const all = (p: AssistantPageText) => [...own(p), p.example.question, p.example.answer];
const visible = (p: AssistantPageText) => [
  p.h1, p.lead, ...p.situations, p.example.question, p.example.answer,
  ...p.can, ...p.cannot, ...p.faq.flatMap((f) => [f.q, f.a]),
];
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

describe('тексты страниц ассистентов', () => {
  it('русский — источник переводов — на месте', () => {
    expect(Object.keys(PACKS)).toContain('ru');
  });

  for (const [code, pack] of Object.entries(PACKS)) {
    describe(code, () => {
      it('ровно ассистенты реестра', () => {
        expect(Object.keys(pack).sort()).toEqual([...ASSISTANT_SLUGS].sort());
      });

      for (const a of ASSISTANTS) {
        describe(a.slug, () => {
          it('нет пустых полей и заготовок', () => {
            for (const s of all(pack[a.slug])) {
              expect(s.trim().length).toBeGreaterThan(0);
              expect(s).not.toMatch(PLACEHOLDER);
            }
          });

          it('в H1 — имя ассистента на этом языке', () => {
            expect(pack[a.slug].h1).toContain(a.names[code]);
          });

          it('длины метатегов и строки каталога', () => {
            const p = pack[a.slug];
            const [min, max] = code === 'zh' ? [40, 120] : [100, 180];
            expect(p.title.length).toBeLessThanOrEqual(70);
            expect(p.description.length).toBeGreaterThanOrEqual(min);
            expect(p.description.length).toBeLessThanOrEqual(max);
            expect(p.card.length).toBeLessThanOrEqual(140);
          });

          it('число пунктов в блоках', () => {
            const p = pack[a.slug];
            expect(p.situations.length).toBeGreaterThanOrEqual(4);
            expect(p.situations.length).toBeLessThanOrEqual(6);
            expect(p.can.length).toBeGreaterThanOrEqual(3);
            expect(p.can.length).toBeLessThanOrEqual(6);
            expect(p.cannot.length).toBeGreaterThanOrEqual(2);
            expect(p.cannot.length).toBeLessThanOrEqual(4);
            expect(p.faq.length).toBeGreaterThanOrEqual(4);
            expect(p.faq.length).toBeLessThanOrEqual(5);
          });

          it('без эмодзи вне примера разговора', () => {
            for (const s of own(pack[a.slug])) expect(s).not.toMatch(EMOJI);
          });

          it('разметка и служебные теги в примере сняты', () => {
            expect(pack[a.slug].example.answer).not.toMatch(MARKDOWN);
            for (const s of all(pack[a.slug])) expect(s).not.toMatch(APP_TAG);
          });

          if (code !== 'ru') {
            it('без российских телефонов — на нерусской странице местная служба', () => {
              for (const s of all(pack[a.slug])) expect(s).not.toMatch(RU_PHONE);
            });
          }
        });
      }

      if (code === 'ru') {
        it('400–650 слов видимого текста на страницу', () => {
          for (const a of ASSISTANTS) {
            const n = visible(pack[a.slug]).map(words).reduce((x, y) => x + y, 0);
            expect(n, a.slug).toBeGreaterThanOrEqual(400);
            expect(n, a.slug).toBeLessThanOrEqual(650);
          }
        });
      }
    });
  }
});
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/content/assistants/packs.test.ts`
Expected: FAIL — `русский — источник переводов — на месте` (файла `pages/ru.ts` ещё нет).

- [ ] **Step 4: Написать `pages/ru.ts`**

Три одобренных образца перенести из `docs/assistant-pages/samples-ru.md` с правками владельца; остальные 15 написать по «Правилам текстов». Форма файла:

```ts
import type { AssistantPagesPack } from '../types';

/**
 * Тексты страниц ассистентов — русский, источник переводов.
 * Правила — раздел «Правила текстов» плана 2026-10-01-assistant-pages.md.
 * Примеры разговоров — из docs/assistant-pages/examples/<slug>.md.
 */
const ru: AssistantPagesPack = {
  roman: {
    title: '…',
    description: '…',
    h1: '…',
    lead: '…',
    card: '…',
    cta: 'Поговорить с Романом',
    situations: ['…', '…', '…', '…'],
    example: { question: '…', answer: '…\n\n…' },
    can: ['…', '…', '…'],
    cannot: ['…', '…'],
    faq: [
      { q: '…', a: '…' },
      { q: '…', a: '…' },
      { q: '…', a: '…' },
      { q: '…', a: '…' },
    ],
  },
  // …остальные 17 в порядке реестра
};

export default ru;
```

Порядок ключей — как в `ASSISTANTS`. Кавычки внутри текста — «ёлочки»; апострофы и одиночные кавычки — экранировать или вынести строку в шаблонную.

- [ ] **Step 5: Тест проходит**

Run: `./node_modules/.bin/vitest run src/content/assistants/packs.test.ts`
Expected: PASS. Падение «400–650 слов» — дописать или сократить страницу, не ослаблять тест.

- [ ] **Step 6: Сверка с промптами для 15 новых страниц**

Для каждой новой страницы пройтись по «Что умеет» и «Чего не делает» и найти в промпте подтверждающую строку. Пункт без подтверждения — убрать.

- [ ] **Step 7: Commit**

```bash
git add src/content/assistants/packs.server.ts src/content/assistants/packs.test.ts src/content/assistants/pages/ru.ts
git commit -m "feat(assistants): тексты 18 страниц по-русски и проверка правил

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Адреса страниц и переключатель языка

**Files:**
- Create: `src/lib/assistantRoute.ts`
- Modify: `src/i18n/urlLanguage.ts` (функция `pathForLanguage`)
- Test: `src/lib/assistantRoute.test.ts`, `src/i18n/urlLanguage.test.ts`

- [ ] **Step 1: Написать тесты**

`src/lib/assistantRoute.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  ASSISTANTS_SEGMENT,
  assistantPath,
  assistantsCatalogPath,
  homePath,
  parseAssistantPath,
} from './assistantRoute';
import { ASSISTANTS_SEGMENT as SITE_SEGMENT } from '../../scripts/site-urls.mjs';

describe('parseAssistantPath', () => {
  it('каталог — со слэшем и без', () => {
    expect(parseAssistantPath('/assistants/')).toEqual({ language: 'ru', kind: 'catalog' });
    expect(parseAssistantPath('/assistants')).toEqual({ language: 'ru', kind: 'catalog' });
    expect(parseAssistantPath('/en/assistants/')).toEqual({ language: 'en', kind: 'catalog' });
  });

  it('страница ассистента — русский в корне, остальные под префиксом', () => {
    expect(parseAssistantPath('/assistants/raya')).toEqual({ language: 'ru', kind: 'assistant', slug: 'raya' });
    expect(parseAssistantPath('/zh/assistants/alexey/')).toEqual({ language: 'zh', kind: 'assistant', slug: 'alexey' });
  });

  // Незнакомый ассистент не должен рисовать чужую страницу — пусть будет главная.
  it('незнакомый ассистент, лишний сегмент, чужой префикс — не наш адрес', () => {
    expect(parseAssistantPath('/assistants/german')).toBeNull();
    expect(parseAssistantPath('/assistants/raya/extra')).toBeNull();
    expect(parseAssistantPath('/xx/assistants/raya')).toBeNull();
  });

  it('прочие адреса — не наш адрес', () => {
    expect(parseAssistantPath('/')).toBeNull();
    expect(parseAssistantPath('/en/')).toBeNull();
    expect(parseAssistantPath('/legal/offer')).toBeNull();
  });
});

describe('сборка адресов', () => {
  it('русский в корне, остальные под префиксом', () => {
    expect(assistantsCatalogPath('ru')).toBe('/assistants/');
    expect(assistantsCatalogPath('de')).toBe('/de/assistants/');
    // Со слэшем: nginx отдаёт каталог с index.html по адресу со слэшем, а на
    // адрес без слэша отвечает 301 (так уже ведут себя /legal/offer).
    expect(assistantPath('ru', 'raya')).toBe('/assistants/raya/');
    expect(assistantPath('pt', 'olia')).toBe('/pt/assistants/olia/');
    expect(homePath('ru')).toBe('/');
    expect(homePath('fr')).toBe('/fr/');
  });

  it('разбор и сборка сходятся', () => {
    for (const path of ['/assistants/raya/', '/en/assistants/alexey/', '/fr/assistants/kira/']) {
      const route = parseAssistantPath(path);
      expect(route?.kind).toBe('assistant');
      if (route?.kind === 'assistant') expect(assistantPath(route.language, route.slug)).toBe(path);
    }
  });

  // Сегмент записан в двух местах (здесь и в scripts/site-urls.mjs, который
  // читают пререндер и тест sitemap) — разъехаться им нельзя.
  it('сегмент тот же, что у генератора sitemap', () => {
    expect(ASSISTANTS_SEGMENT).toBe(SITE_SEGMENT);
  });
});
```

Дописать в конец `src/i18n/urlLanguage.test.ts`:

```ts
describe('pathForLanguage на страницах ассистентов', () => {
  // Без этого переключатель со страницы Райи уводил бы на главную.
  it('остаётся на той же странице ассистента — адресом со слэшем', () => {
    expect(pathForLanguage('en', '/assistants/raya/')).toBe('/en/assistants/raya/');
    expect(pathForLanguage('ru', '/de/assistants/raya/')).toBe('/assistants/raya/');
    expect(pathForLanguage('fr', '/assistants/raya')).toBe('/fr/assistants/raya/');
  });

  it('остаётся в каталоге', () => {
    expect(pathForLanguage('fr', '/assistants/')).toBe('/fr/assistants/');
    expect(pathForLanguage('ru', '/zh/assistants/')).toBe('/assistants/');
  });
});
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `./node_modules/.bin/vitest run src/lib/assistantRoute.test.ts src/i18n/urlLanguage.test.ts`
Expected: FAIL — нет модуля `./assistantRoute`, нет экспорта `ASSISTANTS_SEGMENT` в `site-urls.mjs`, `pathForLanguage('en', '/assistants/raya/')` возвращает `/en/`.

- [ ] **Step 3: Реализация**

`src/lib/assistantRoute.ts`:

```ts
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';
import { isAssistantSlug, type AssistantSlug } from '../content/assistants/roster';

/**
 * Адреса раздела ассистентов: каталог `/assistants/` и страницы
 * `/assistants/<slug>/`. Русский живёт в корне, остальные языки под префиксом.
 *
 * Канонический адрес — СО слэшем. Страница лежит в dist/ каталогом с
 * index.html, и nginx на адрес без слэша отвечает 301 на версию со слэшем
 * (проверено на /legal/offer 01.10.2026). Canonical, ссылки и sitemap без
 * слэша указывали бы на редирект. Разбор принимает оба вида.
 */

/** Тот же литерал объявлен в scripts/site-urls.mjs — тест следит, чтобы совпадали. */
export const ASSISTANTS_SEGMENT = 'assistants';

export type AssistantRoute =
  | { language: string; kind: 'catalog' }
  | { language: string; kind: 'assistant'; slug: AssistantSlug };

/** null — не наш адрес: вызывающая сторона показывает обычный лендинг. */
export function parseAssistantPath(pathname: string): AssistantRoute | null {
  const parts = pathname.split('/').filter(Boolean);
  const prefixed = SUPPORTED_CODES.includes(parts[0]);
  const language = prefixed ? parts[0] : DEFAULT_LANGUAGE;
  const rest = prefixed ? parts.slice(1) : parts;
  if (rest[0] !== ASSISTANTS_SEGMENT) return null;
  if (rest.length === 1) return { language, kind: 'catalog' };
  if (rest.length === 2 && isAssistantSlug(rest[1])) {
    return { language, kind: 'assistant', slug: rest[1] };
  }
  return null;
}

const prefix = (language: string) => (language === DEFAULT_LANGUAGE ? '' : `/${language}`);

export const homePath = (language: string): string => `${prefix(language)}/`;

export const assistantsCatalogPath = (language: string): string =>
  `${prefix(language)}/${ASSISTANTS_SEGMENT}/`;

export const assistantPath = (language: string, slug: AssistantSlug): string =>
  `${prefix(language)}/${ASSISTANTS_SEGMENT}/${slug}/`;
```

В `src/i18n/urlLanguage.ts`, в `pathForLanguage`, сразу после ветки `legal` (перед финальным `return`):

```ts
  // Со страниц ассистентов — на ту же страницу (или в тот же каталог) на
  // другом языке. Сегмент — литерал по той же причине, что и 'legal' выше:
  // этот модуль читает LanguageBanner, и тянуть сюда реестр ассистентов незачем.
  if (tail[0] === 'assistants') {
    return tail[1]
      ? `${base}assistants/${tail[1]}/${search}${hash}`
      : `${base}assistants/${search}${hash}`;
  }
```

В `scripts/site-urls.mjs` после `LEGAL_SLUGS` добавить (остальное — в Task 8):

```js
/** Раздел ассистентов. Тот же литерал — в src/lib/assistantRoute.ts. */
export const ASSISTANTS_SEGMENT = 'assistants';
```

и в `scripts/site-urls.d.mts`:

```ts
export declare const ASSISTANTS_SEGMENT: string;
```

- [ ] **Step 4: Тесты проходят**

Run: `./node_modules/.bin/vitest run src/lib/assistantRoute.test.ts src/i18n/urlLanguage.test.ts src/lib/legalRoute.test.ts`
Expected: PASS (legalRoute — что ветка документов не сломалась).

- [ ] **Step 5: Commit**

```bash
git add src/lib/assistantRoute.ts src/lib/assistantRoute.test.ts src/i18n/urlLanguage.ts src/i18n/urlLanguage.test.ts scripts/site-urls.mjs scripts/site-urls.d.mts
git commit -m "feat(assistants): адреса страниц ассистентов, переключатель языка остаётся на странице

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: На каких языках выпускаются страницы

Требует Task 5 (`pages/ru.ts`).

**Files:**
- Create: `scripts/assistant-page-languages.js`, `scripts/assistant-page-languages.d.ts`, `src/content/assistants/availability.ts`
- Modify: `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts`
- Test: `scripts/assistant-page-languages.test.mjs`

- [ ] **Step 1: Написать тест**

`scripts/assistant-page-languages.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { assistantPageCodes } from './assistant-page-languages.js';
import { translatedCodes } from './translated-languages.js';

describe('языки страниц ассистентов', () => {
  it('русский выпущен всегда', () => {
    expect(assistantPageCodes()).toContain('ru');
  });

  // Модуль текстов без выпущенной локали сайта не публикуется: страница
  // ассистента на языке, которого нет у остального сайта, вела бы в никуда.
  it('только из выпущенных языков сайта', () => {
    const site = translatedCodes();
    for (const code of assistantPageCodes()) expect(site).toContain(code);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run scripts/assistant-page-languages.test.mjs`
Expected: FAIL — нет модуля `./assistant-page-languages.js`.

- [ ] **Step 3: Реализация**

`scripts/assistant-page-languages.js`:

```js
/**
 * На каких языках выпускаются страницы ассистентов.
 *
 * Тексты лежат модулем на язык: src/content/assistants/pages/<код>.ts. Язык
 * выпускается, только если он выпущен у сайта (непустая локаль, см.
 * translated-languages.js) И у него есть модуль текстов. Иначе пришлось бы
 * отдавать русский текст под чужим <html lang> — ровно то, от чего защищает
 * translatedCodes(). Перевод доехал — язык включился сам, обычной пересборкой.
 *
 * Читают: vite.config.ts и vitest.config.ts (define для браузера),
 * scripts/prerender.mjs и тесты Playwright.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from './translated-languages.js';

const pagesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'assistants', 'pages');

export function assistantPageCodes() {
  const codes = translatedCodes().filter((code) => existsSync(join(pagesDir, `${code}.ts`)));
  if (!codes.includes(DEFAULT_LANGUAGE)) {
    throw new Error(
      `нет src/content/assistants/pages/${DEFAULT_LANGUAGE}.ts — у страниц ассистентов нет языка-источника`,
    );
  }
  return codes;
}
```

`scripts/assistant-page-languages.d.ts`:

```ts
export declare function assistantPageCodes(): string[];
```

`src/content/assistants/availability.ts`:

```ts
/**
 * Языки, на которых выпущены страницы ассистентов. Список считается на сборке
 * (scripts/assistant-page-languages.js) и подставляется литералом через define:
 * браузер в каталог pages/ заглянуть не может.
 */
export const ASSISTANT_PAGE_CODES: string[] = __ASSISTANT_PAGE_LANGUAGES__;

export const hasAssistantPages = (language: string): boolean =>
  ASSISTANT_PAGE_CODES.includes(language);
```

`vite.config.ts` — импорт и строка в `define`:

```ts
import { assistantPageCodes } from './scripts/assistant-page-languages.js';
// …
  define: {
    // …существующий комментарий и __TRANSLATED_LANGUAGES__ без изменений
    __TRANSLATED_LANGUAGES__: JSON.stringify(translatedCodes()),
    // Языки страниц ассистентов — по тому же принципу, см. scripts/assistant-page-languages.js.
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
  },
```

`vitest.config.ts` — то же самое:

```ts
import { assistantPageCodes } from './scripts/assistant-page-languages.js';
// …
  define: {
    __TRANSLATED_LANGUAGES__: JSON.stringify(translatedCodes()),
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
  },
```

`src/vite-env.d.ts` — дописать:

```ts
/**
 * Коды языков, на которых есть тексты страниц ассистентов. Подставляется через
 * `define` — см. scripts/assistant-page-languages.js.
 */
declare const __ASSISTANT_PAGE_LANGUAGES__: string[];
```

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run scripts/assistant-page-languages.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/assistant-page-languages.js scripts/assistant-page-languages.d.ts scripts/assistant-page-languages.test.mjs src/content/assistants/availability.ts vite.config.ts vitest.config.ts src/vite-env.d.ts
git commit -m "feat(assistants): язык страниц выпускается вместе с модулем текстов

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Адреса в sitemap

Требует Task 6 (константа `ASSISTANTS_SEGMENT` в `scripts/site-urls.mjs`).

**Files:**
- Modify: `scripts/site-urls.mjs`, `scripts/site-urls.d.mts`, `tests/i18n.spec.ts` (тест «sitemap перечисляет ровно выпущенные версии»)
- Test: `scripts/site-urls.test.mjs`

- [ ] **Step 1: Написать тест**

`scripts/site-urls.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { assistantUrlFor, assistantsCatalogUrlFor, sitemapUrls } from './site-urls.mjs';

describe('адреса раздела ассистентов', () => {
  it('русский в корне, остальные под префиксом', () => {
    expect(assistantsCatalogUrlFor('ru', 'ru')).toBe('https://linkeon.io/assistants/');
    expect(assistantsCatalogUrlFor('en', 'ru')).toBe('https://linkeon.io/en/assistants/');
    expect(assistantUrlFor('ru', 'raya', 'ru')).toBe('https://linkeon.io/assistants/raya/');
    expect(assistantUrlFor('de', 'raya', 'ru')).toBe('https://linkeon.io/de/assistants/raya/');
  });

  it('в sitemap — каталог и страницы только тех языков, где они есть', () => {
    const urls = sitemapUrls(['ru', 'en'], 'ru', { codes: ['ru'], slugs: ['raya', 'olia'] });
    expect(urls).toContain('https://linkeon.io/assistants/');
    expect(urls).toContain('https://linkeon.io/assistants/raya/');
    expect(urls).toContain('https://linkeon.io/assistants/olia/');
    expect(urls.some((u) => u.includes('/en/assistants'))).toBe(false);
  });

  it('без раздела ассистентов sitemap прежний', () => {
    expect(sitemapUrls(['ru'], 'ru')).toEqual(sitemapUrls(['ru'], 'ru', { codes: [], slugs: [] }));
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run scripts/site-urls.test.mjs`
Expected: FAIL — `assistantUrlFor is not a function`.

- [ ] **Step 3: Реализация**

В `scripts/site-urls.mjs` после `deleteUrlFor` добавить:

```js
/** Каталог ассистентов — со слэшем, как языковые корни. */
export const assistantsCatalogUrlFor = (code, defaultLanguage) =>
  code === defaultLanguage
    ? `${SITE}/${ASSISTANTS_SEGMENT}/`
    : `${SITE}/${code}/${ASSISTANTS_SEGMENT}/`;

/**
 * Страница ассистента — СО слэшем. Она лежит в dist/ каталогом с index.html,
 * и nginx на адрес без слэша отвечает 301 (проверено на /legal/offer):
 * canonical и sitemap обязаны указывать на конечный адрес, а не на редирект.
 */
export const assistantUrlFor = (code, slug, defaultLanguage) =>
  code === defaultLanguage
    ? `${SITE}/${ASSISTANTS_SEGMENT}/${slug}/`
    : `${SITE}/${code}/${ASSISTANTS_SEGMENT}/${slug}/`;
```

и заменить `sitemapUrls` целиком:

```js
/**
 * Полный список адресов в sitemap — в том же порядке, в каком его пишет
 * пререндер. Источник ожиданий и для генерации, и для проверки.
 *
 * `assistants.codes` — языки, на которых выпущены страницы ассистентов
 * (scripts/assistant-page-languages.js), `assistants.slugs` — реестр.
 */
export function sitemapUrls(publishedCodes, defaultLanguage, assistants = { codes: [], slugs: [] }) {
  return [
    ...publishedCodes.map((c) => urlFor(c, defaultLanguage)),
    ...publishedCodes.flatMap((c) =>
      LEGAL_SLUGS.map((slug) => legalUrlFor(c, slug, defaultLanguage)),
    ),
    ...publishedCodes.map((c) => deleteUrlFor(c, defaultLanguage)),
    ...assistants.codes.map((c) => assistantsCatalogUrlFor(c, defaultLanguage)),
    ...assistants.codes.flatMap((c) =>
      assistants.slugs.map((slug) => assistantUrlFor(c, slug, defaultLanguage)),
    ),
  ];
}
```

`scripts/site-urls.d.mts` — заменить строку `sitemapUrls` и дописать:

```ts
export declare function assistantsCatalogUrlFor(code: string, defaultLanguage: string): string;
export declare function assistantUrlFor(code: string, slug: string, defaultLanguage: string): string;
export declare function sitemapUrls(
  publishedCodes: string[],
  defaultLanguage: string,
  assistants?: { codes: string[]; slugs: string[] },
): string[];
```

В `tests/i18n.spec.ts` — импорты и ожидание в тесте «sitemap перечисляет ровно выпущенные версии»:

```ts
import { assistantPageCodes } from '../scripts/assistant-page-languages.js';
import { ASSISTANT_SLUGS } from '../src/content/assistants/roster.data.js';
// …
    const expected = sitemapUrls(PUBLISHED, DEFAULT_LANGUAGE, {
      codes: assistantPageCodes(),
      slugs: ASSISTANT_SLUGS,
    });
```

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run scripts/site-urls.test.mjs`
Expected: PASS. (`tests/i18n.spec.ts` — Playwright, проверяется в Task 18.)

- [ ] **Step 5: Commit**

```bash
git add scripts/site-urls.mjs scripts/site-urls.d.mts scripts/site-urls.test.mjs tests/i18n.spec.ts
git commit -m "feat(assistants): каталог и страницы ассистентов в sitemap

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Короткие строки во всех семи локалях

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,zh,pt}.json` — новая ветка верхнего уровня `assistantPages` (в конец файла, после `finalCta`)

- [ ] **Step 1: Убедиться, что проверки сейчас зелёные**

Run: `node scripts/check-locales.mjs && ./node_modules/.bin/vitest run src/i18n/locales.structure.test.ts`
Expected: `✅` по шести языкам, тест PASS.

- [ ] **Step 2: ru.json**

```json
"assistantPages": {
  "nav": "Ассистенты",
  "home": "Главная",
  "breadcrumbsLabel": "Навигационная цепочка",
  "allCount": "Все ассистенты ({{count}})",
  "roles": {
    "roman": "универсал",
    "alexey": "юрист",
    "anna": "бухгалтер",
    "andrey": "запуск бизнеса",
    "vitaly": "финансовый директор",
    "alexandra": "маркетолог",
    "ekaterina": "копирайтер",
    "pavel": "продажи",
    "irina": "карьерный консультант",
    "dmitry": "технический директор",
    "kira": "дизайнер",
    "misha": "коуч",
    "olia": "исследование ценностей",
    "masha": "игропрактик",
    "liana": "нумеролог",
    "shankara": "ведический астролог",
    "raya": "Human Design",
    "polina": "тренер по образу жизни"
  },
  "catalog": {
    "title": "AI-ассистенты Linkeon: юрист, бухгалтер, маркетолог, коуч и другие",
    "description": "У каждого ассистента своя специальность, а профиль общий: рассказали одному — знают все. Право, налоги, маркетинг, продажи, карьера и практики самопознания.",
    "eyebrow": "Ассистенты",
    "h1": "С кем можно поговорить в Linkeon",
    "lead": "Специалисты для дела и собеседники для себя. Выберите того, чья тема ближе, — или начните с Романа: он берётся за задачи любого профиля.",
    "groups": {
      "assistant": "Если не знаете, с кого начать",
      "business": "Для дела",
      "personal": "Для себя"
    }
  },
  "page": {
    "situations": "С чем приходят",
    "example": "Как это выглядит",
    "exampleNote": "Настоящий ответ ассистента. Вырезанное отмечено «…».",
    "exampleYou": "Вы",
    "can": "Что умеет",
    "cannot": "Чего не делает",
    "faq": "Вопросы",
    "related": "Работает в паре с",
    "finalTitle": "Попробуйте на своей задаче",
    "trust": "Первые разговоры за наш счёт. Банковскую карту не спрашиваем."
  }
}
```

- [ ] **Step 3: en.json**

```json
"assistantPages": {
  "nav": "Assistants",
  "home": "Home",
  "breadcrumbsLabel": "Breadcrumb",
  "allCount": "All assistants ({{count}})",
  "roles": {
    "roman": "generalist",
    "alexey": "lawyer",
    "anna": "accountant",
    "andrey": "business launch",
    "vitaly": "CFO",
    "alexandra": "marketer",
    "ekaterina": "copywriter",
    "pavel": "sales",
    "irina": "career counsellor",
    "dmitry": "CTO",
    "kira": "designer",
    "misha": "coach",
    "olia": "values exploration",
    "masha": "transformational games",
    "liana": "numerologist",
    "shankara": "Vedic astrologer",
    "raya": "Human Design",
    "polina": "lifestyle coach"
  },
  "catalog": {
    "title": "Linkeon AI assistants: lawyer, accountant, marketer, coach and more",
    "description": "Each assistant has a specialty of their own, and they all share one profile: tell one, and the rest know. Law, taxes, marketing, sales, career and self-discovery.",
    "eyebrow": "Assistants",
    "h1": "Who you can talk to in Linkeon",
    "lead": "Specialists for your work and companions for yourself. Pick the one closest to your topic — or start with Roman: he takes on tasks of any kind.",
    "groups": {
      "assistant": "If you're not sure where to start",
      "business": "For work",
      "personal": "For yourself"
    }
  },
  "page": {
    "situations": "What people come with",
    "example": "What it looks like",
    "exampleNote": "A real reply from the assistant, translated from Russian. Cuts are marked with “…”.",
    "exampleYou": "You",
    "can": "What they do",
    "cannot": "What they don't do",
    "faq": "Questions",
    "related": "Works well with",
    "finalTitle": "Try it on your own task",
    "trust": "Your first conversations are on us. No bank card required."
  }
}
```

- [ ] **Step 4: es.json**

```json
"assistantPages": {
  "nav": "Asistentes",
  "home": "Inicio",
  "breadcrumbsLabel": "Ruta de navegación",
  "allCount": "Todos los asistentes ({{count}})",
  "roles": {
    "roman": "todoterreno",
    "alexey": "abogado",
    "anna": "contable",
    "andrey": "lanzamiento de negocio",
    "vitaly": "director financiero",
    "alexandra": "marketing",
    "ekaterina": "redactora",
    "pavel": "ventas",
    "irina": "orientadora profesional",
    "dmitry": "director técnico",
    "kira": "diseñadora",
    "misha": "coach",
    "olia": "exploración de valores",
    "masha": "juegos transformacionales",
    "liana": "numeróloga",
    "shankara": "astrólogo védico",
    "raya": "Human Design",
    "polina": "coach de estilo de vida"
  },
  "catalog": {
    "title": "Asistentes de IA de Linkeon: abogado, contable, marketing, coach y más",
    "description": "Cada asistente tiene su especialidad y todos comparten un mismo perfil: lo que le cuenta a uno, lo saben todos. Derecho, impuestos, marketing, ventas, carrera y autoconocimiento.",
    "eyebrow": "Asistentes",
    "h1": "Con quién puede hablar en Linkeon",
    "lead": "Especialistas para su trabajo e interlocutores para usted. Elija a quien esté más cerca de su tema, o empiece por Román: se ocupa de tareas de cualquier tipo.",
    "groups": {
      "assistant": "Si no sabe por dónde empezar",
      "business": "Para el trabajo",
      "personal": "Para usted"
    }
  },
  "page": {
    "situations": "Con qué acuden",
    "example": "Cómo se ve",
    "exampleNote": "Respuesta real del asistente, traducida del ruso. Los cortes están marcados con «…».",
    "exampleYou": "Usted",
    "can": "Qué hace",
    "cannot": "Qué no hace",
    "faq": "Preguntas",
    "related": "Trabaja junto a",
    "finalTitle": "Pruébelo con su propia tarea",
    "trust": "Las primeras conversaciones corren de nuestra cuenta. No pedimos tarjeta bancaria."
  }
}
```

- [ ] **Step 5: de.json**

```json
"assistantPages": {
  "nav": "Assistenten",
  "home": "Startseite",
  "breadcrumbsLabel": "Brotkrümelnavigation",
  "allCount": "Alle Assistenten ({{count}})",
  "roles": {
    "roman": "Allrounder",
    "alexey": "Anwalt",
    "anna": "Buchhalterin",
    "andrey": "Unternehmensgründung",
    "vitaly": "Finanzchef",
    "alexandra": "Marketing",
    "ekaterina": "Texterin",
    "pavel": "Vertrieb",
    "irina": "Karriereberaterin",
    "dmitry": "Technischer Leiter",
    "kira": "Designerin",
    "misha": "Coach",
    "olia": "Werte-Erkundung",
    "masha": "Transformationsspiele",
    "liana": "Numerologin",
    "shankara": "vedischer Astrologe",
    "raya": "Human Design",
    "polina": "Lifestyle-Coach"
  },
  "catalog": {
    "title": "AI-Assistenten von Linkeon: Anwalt, Buchhaltung, Marketing, Coach und mehr",
    "description": "Jeder Assistent hat sein Fachgebiet, und alle teilen ein Profil: Was Sie einem erzählen, wissen alle. Recht, Steuern, Marketing, Vertrieb, Karriere und Selbsterkenntnis.",
    "eyebrow": "Assistenten",
    "h1": "Mit wem Sie in Linkeon sprechen können",
    "lead": "Fachleute für die Arbeit und Gesprächspartner für Sie selbst. Wählen Sie, wessen Thema Ihnen am nächsten ist – oder beginnen Sie mit Roman: Er übernimmt Aufgaben jeder Art.",
    "groups": {
      "assistant": "Wenn Sie nicht wissen, wo Sie anfangen sollen",
      "business": "Für die Arbeit",
      "personal": "Für Sie selbst"
    }
  },
  "page": {
    "situations": "Womit man kommt",
    "example": "So sieht es aus",
    "exampleNote": "Echte Antwort des Assistenten, aus dem Russischen übersetzt. Kürzungen sind mit „…“ markiert.",
    "exampleYou": "Sie",
    "can": "Kompetenzen",
    "cannot": "Grenzen",
    "faq": "Fragen",
    "related": "Arbeitet gut zusammen mit",
    "finalTitle": "Probieren Sie es an Ihrer eigenen Aufgabe aus",
    "trust": "Die ersten Gespräche gehen auf uns. Keine Bankkarte nötig."
  }
}
```

- [ ] **Step 6: fr.json**

```json
"assistantPages": {
  "nav": "Assistants",
  "home": "Accueil",
  "breadcrumbsLabel": "Fil d'Ariane",
  "allCount": "Tous les assistants ({{count}})",
  "roles": {
    "roman": "polyvalent",
    "alexey": "juriste",
    "anna": "comptable",
    "andrey": "création d'entreprise",
    "vitaly": "directeur financier",
    "alexandra": "marketing",
    "ekaterina": "rédactrice",
    "pavel": "vente",
    "irina": "conseillère en carrière",
    "dmitry": "directeur technique",
    "kira": "designer",
    "misha": "coach",
    "olia": "exploration des valeurs",
    "masha": "jeux transformationnels",
    "liana": "numérologue",
    "shankara": "astrologue védique",
    "raya": "Human Design",
    "polina": "coach mode de vie"
  },
  "catalog": {
    "title": "Assistants IA de Linkeon : juriste, comptable, marketing, coach et plus",
    "description": "Chaque assistant a sa spécialité, et tous partagent un même profil : ce que vous dites à l'un, tous le savent. Droit, impôts, marketing, vente, carrière et connaissance de soi.",
    "eyebrow": "Assistants",
    "h1": "À qui parler dans Linkeon",
    "lead": "Des spécialistes pour votre travail et des interlocuteurs pour vous-même. Choisissez celui dont le sujet vous parle — ou commencez par Roman : il prend en charge des tâches de tout type.",
    "groups": {
      "assistant": "Si vous ne savez pas par où commencer",
      "business": "Pour le travail",
      "personal": "Pour vous"
    }
  },
  "page": {
    "situations": "Pourquoi on vient",
    "example": "À quoi ça ressemble",
    "exampleNote": "Vraie réponse de l'assistant, traduite du russe. Les coupes sont signalées par « … ».",
    "exampleYou": "Vous",
    "can": "Ses compétences",
    "cannot": "Ses limites",
    "faq": "Questions",
    "related": "Travaille avec",
    "finalTitle": "Essayez sur votre propre tâche",
    "trust": "Les premières conversations sont offertes. Aucune carte bancaire demandée."
  }
}
```

- [ ] **Step 7: zh.json**

```json
"assistantPages": {
  "nav": "助手",
  "home": "首页",
  "breadcrumbsLabel": "面包屑导航",
  "allCount": "全部助手（{{count}}）",
  "roles": {
    "roman": "全能型",
    "alexey": "法务",
    "anna": "会计",
    "andrey": "创业启动",
    "vitaly": "财务总监",
    "alexandra": "营销",
    "ekaterina": "文案",
    "pavel": "销售",
    "irina": "职业顾问",
    "dmitry": "技术总监",
    "kira": "设计师",
    "misha": "教练",
    "olia": "价值观探索",
    "masha": "转化型游戏",
    "liana": "数字命理师",
    "shankara": "吠陀占星师",
    "raya": "人类图",
    "polina": "生活方式教练"
  },
  "catalog": {
    "title": "Linkeon AI 助手：法务、会计、营销、教练等",
    "description": "每位助手各有专长，又共用同一份档案：告诉其中一位，大家都知道。涵盖法律、税务、营销、销售、职业发展与自我探索。",
    "eyebrow": "助手",
    "h1": "在 Linkeon 可以和谁聊",
    "lead": "有帮你办事的专家，也有陪你认识自己的伙伴。选一位话题最贴近的——或者先找罗曼，什么类型的任务他都能接。",
    "groups": {
      "assistant": "不知道从谁开始",
      "business": "工作",
      "personal": "生活与自我"
    }
  },
  "page": {
    "situations": "大家通常为这些事而来",
    "example": "实际对话",
    "exampleNote": "助手的真实回答，译自俄语。删节处以“……”标出。",
    "exampleYou": "你",
    "can": "能做什么",
    "cannot": "不做什么",
    "faq": "常见问题",
    "related": "常与之配合",
    "finalTitle": "用你自己的任务试一试",
    "trust": "前几次对话由我们买单，无需绑定银行卡。"
  }
}
```

- [ ] **Step 8: pt.json** (европейский португальский, как вся локаль)

```json
"assistantPages": {
  "nav": "Assistentes",
  "home": "Início",
  "breadcrumbsLabel": "Navegação estrutural",
  "allCount": "Todos os assistentes ({{count}})",
  "roles": {
    "roman": "generalista",
    "alexey": "advogado",
    "anna": "contabilista",
    "andrey": "lançamento de negócio",
    "vitaly": "diretor financeiro",
    "alexandra": "marketing",
    "ekaterina": "redatora",
    "pavel": "vendas",
    "irina": "orientadora de carreira",
    "dmitry": "diretor técnico",
    "kira": "designer",
    "misha": "coach",
    "olia": "exploração de valores",
    "masha": "jogos transformacionais",
    "liana": "numeróloga",
    "shankara": "astrólogo védico",
    "raya": "Human Design",
    "polina": "coach de estilo de vida"
  },
  "catalog": {
    "title": "Assistentes de IA da Linkeon: advogado, contabilista, marketing, coach e mais",
    "description": "Cada assistente tem a sua especialidade e todos partilham o mesmo perfil: o que conta a um, todos ficam a saber. Direito, impostos, marketing, vendas, carreira e autoconhecimento.",
    "eyebrow": "Assistentes",
    "h1": "Com quem pode falar na Linkeon",
    "lead": "Especialistas para o trabalho e interlocutores para si. Escolha quem estiver mais perto do seu tema — ou comece pelo Roman: ele trata de tarefas de qualquer tipo.",
    "groups": {
      "assistant": "Se não sabe por onde começar",
      "business": "Para o trabalho",
      "personal": "Para si"
    }
  },
  "page": {
    "situations": "Com que vêm ter",
    "example": "Como é na prática",
    "exampleNote": "Resposta real do assistente, traduzida do russo. Os cortes estão assinalados com «…».",
    "exampleYou": "Pergunta",
    "can": "O que faz",
    "cannot": "O que não faz",
    "faq": "Perguntas",
    "related": "Trabalha em conjunto com",
    "finalTitle": "Experimente com uma tarefa sua",
    "trust": "As primeiras conversas ficam por nossa conta. Não pedimos cartão bancário."
  }
}
```

- [ ] **Step 9: Проверки полноты**

Run: `node scripts/check-locales.mjs && ./node_modules/.bin/vitest run src/i18n/locales.structure.test.ts scripts/locale-utils.test.mjs`
Expected: по шести языкам `✅ <код>: N/N ключей` (N вырос на 40), тесты PASS.

- [ ] **Step 10: Commit**

```bash
git add src/i18n/locales/
git commit -m "feat(assistants): строки каталога и страниц ассистентов на семи языках

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Разметка schema.org

**Files:**
- Create: `src/content/assistants/jsonLd.ts`, `src/components/assistants/JsonLd.tsx`
- Test: `src/content/assistants/jsonLd.test.ts`

- [ ] **Step 1: Написать тест**

`src/content/assistants/jsonLd.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { breadcrumbJsonLd, faqJsonLd } from './jsonLd';

describe('разметка schema.org', () => {
  it('хлебные крошки: абсолютные адреса, позиции с единицы', () => {
    const data = breadcrumbJsonLd([
      { name: 'Главная', path: '/' },
      { name: 'Ассистенты', path: '/assistants/' },
      { name: 'Райя', path: '/assistants/raya/' },
    ]);
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(data.itemListElement[2].item).toBe('https://linkeon.io/assistants/raya/');
  });

  it('вопросы: тот же текст, что видит человек', () => {
    const data = faqJsonLd([{ q: 'Сколько стоит?', a: 'Первые разговоры за наш счёт.' }]);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity[0]).toEqual({
      '@type': 'Question',
      name: 'Сколько стоит?',
      acceptedAnswer: { '@type': 'Answer', text: 'Первые разговоры за наш счёт.' },
    });
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/content/assistants/jsonLd.test.ts`
Expected: FAIL — нет модуля `./jsonLd`.

- [ ] **Step 3: Реализация**

`src/content/assistants/jsonLd.ts`:

```ts
import { SITE } from '../../../scripts/site-urls.mjs';

export interface Crumb {
  name: string;
  /** Путь от корня сайта: '/', '/assistants/', '/en/assistants/raya/'. */
  path: string;
}

/** Хлебные крошки для поисковика: абсолютные адреса, позиции с единицы. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}

/** Блок вопросов страницы как FAQPage — тот же текст, что видит человек. */
export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
```

`src/components/assistants/JsonLd.tsx`:

```tsx
/**
 * JSON-LD в разметке страницы. `<` экранируется: текст страницы не должен
 * суметь закрыть </script> раньше времени.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
```

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run src/content/assistants/jsonLd.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/assistants/jsonLd.ts src/content/assistants/jsonLd.test.ts src/components/assistants/JsonLd.tsx
git commit -m "feat(assistants): разметка schema.org — хлебные крошки и вопросы

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Шапка и подвал на подстраницах

Требует Task 6, 7, 9.

**Files:**
- Modify: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Test: `src/components/layout/layout.test.tsx`

- [ ] **Step 1: Написать тест**

`src/components/layout/layout.test.tsx`:

```tsx
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Header from './Header';
import Footer from './Footer';
import { createServerI18n } from '../../i18n/server';
import { ASSISTANTS } from '../../content/assistants/roster';

const render = (ui: ReactElement, language = 'ru') =>
  renderToStaticMarkup(<I18nextProvider i18n={createServerI18n(language)}>{ui}</I18nextProvider>);

describe('шапка', () => {
  it('на главной пункты меню — якоря страницы, как раньше', () => {
    expect(render(<Header />)).toContain('href="#pricing"');
  });

  // На подстранице якорь «#pricing» указывал бы на несуществующий раздел.
  it('на подстранице пункты меню ведут на разделы главной своего языка', () => {
    const html = render(<Header homeHref="/en/" />, 'en');
    expect(html).toContain('href="/en/#pricing"');
    expect(html).not.toContain('href="#pricing"');
  });
});

describe('подвал', () => {
  it('ссылается на каталог и на страницу каждого ассистента', () => {
    const html = render(<Footer />);
    expect(html).toContain('href="/assistants/"');
    for (const a of ASSISTANTS) expect(html, a.slug).toContain(`href="/assistants/${a.slug}/"`);
  });

  it('на подстранице разделы продукта ведут на главную, документы — модалкой, как раньше', () => {
    const html = render(<Footer homeHref="/" />);
    expect(html).toContain('href="/#pricing"');
    expect(html).toContain('href="#privacy"');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/components/layout/layout.test.tsx`
Expected: FAIL — нет `href="/en/#pricing"`, нет ссылок `/assistants/…`.

- [ ] **Step 3: Header**

В `src/components/layout/Header.tsx`:

```tsx
interface Props {
  /**
   * Главная своего языка — на подстраницах (ассистенты). Без него пункты меню —
   * якоря текущей страницы, как на самой главной; на подстранице такие якоря
   * никуда не ведут.
   */
  homeHref?: string;
}

export default function Header({ homeHref }: Props = {}) {
  // …существующие хуки без изменений…
  const navHref = (anchor: string) => (homeHref ? `${homeHref}${anchor}` : anchor);
```

Логотип:

```tsx
        <a
          href={homeHref ?? '#top'}
          onClick={homeHref ? undefined : scrollToTop}
          className="flex items-center gap-2 font-semibold tracking-tight text-gray-900"
          aria-label={t('header.a11y.logo')}
        >
```

В обоих списках `LINKS.map` (десктоп и мобильное меню) — `href={navHref(l.href)}` вместо `href={l.href}`.

- [ ] **Step 4: Footer**

В `src/components/layout/Footer.tsx` — импорты:

```tsx
import { hasAssistantPages } from '../../content/assistants/availability';
import { ASSISTANTS, assistantName } from '../../content/assistants/roster';
import { assistantPath, assistantsCatalogPath } from '../../lib/assistantRoute';
```

Подпись и начало компонента:

```tsx
interface FooterProps {
  /** Главная своего языка — на подстраницах: разделы продукта ведут туда. */
  homeHref?: string;
}

export default function Footer({ homeHref }: FooterProps = {}) {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  // Разделы продукта — якоря главной. Документы (#privacy и др.) остаются
  // хешами: их открывает модалка на любой странице.
  const section = (hash: string) => (homeHref ? `${homeHref}${hash}` : hash);
```

В колонке «Продукт» — `href: section('#assistants')`, `section('#profile')`, `section('#networking')`, `section('#pricing')`; ссылку на APK не трогать.

Перед блоком `<div className="max-w-6xl mx-auto border-t border-gray-800 pt-8 mt-12 …">` (копирайт и переключатель) вставить:

```tsx
      {/* Каждая страница сайта ссылается на каждого ассистента: кроме sitemap,
          это главный путь, которым поисковик находит их страницы. */}
      {hasAssistantPages(language) && (
        <nav aria-labelledby="footer-assistants" className="max-w-6xl mx-auto border-t border-gray-800 pt-8 mt-12">
          <h3 id="footer-assistants" className="text-xs font-semibold text-gray-100 uppercase tracking-wider mb-4">
            <a href={assistantsCatalogPath(language)} className="hover:text-white transition-colors">
              {t('assistantPages.nav')}
            </a>
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ASSISTANTS.map((a) => (
              <li key={a.slug}>
                <a href={assistantPath(language, a.slug)} className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  {assistantName(a, language)} · {t(`assistantPages.roles.${a.slug}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
```

- [ ] **Step 5: Тест проходит**

Run: `./node_modules/.bin/vitest run src/components/layout/layout.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/layout/layout.test.tsx
git commit -m "feat(assistants): шапка и подвал на подстраницах, ассистенты в подвале

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Страница ассистента и каталог

Требует Task 5, 6, 9, 10, 11.

**Files:**
- Create: `src/components/assistants/AssistantAvatar.tsx`, `src/components/assistants/AssistantCard.tsx`, `src/pages/AssistantPage.tsx`, `src/pages/AssistantsCatalogPage.tsx`
- Test: `src/pages/AssistantPage.test.tsx`

- [ ] **Step 1: Написать тест**

`src/pages/AssistantPage.test.tsx`:

```tsx
import type { ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import AssistantPage from './AssistantPage';
import AssistantsCatalogPage from './AssistantsCatalogPage';
import { createServerI18n } from '../i18n/server';
import { PACKS } from '../content/assistants/packs.server';
import { ASSISTANTS, assistantBySlug } from '../content/assistants/roster';

const render = (ui: ReactElement, language = 'ru') =>
  renderToStaticMarkup(<I18nextProvider i18n={createServerI18n(language)}>{ui}</I18nextProvider>);

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

  it('«Работает в паре с» ведёт на страницы соседей', () => {
    for (const slug of entry.related) expect(html).toContain(`href="/assistants/${slug}/"`);
  });

  it('меню шапки ведёт на разделы главной', () => {
    expect(html).toContain('href="/#pricing"');
  });
});

describe('каталог', () => {
  const html = render(<AssistantsCatalogPage pack={PACKS.ru} language="ru" />);

  it('ссылки на всех ассистентов', () => {
    for (const a of ASSISTANTS) expect(html, a.slug).toContain(`href="/assistants/${a.slug}/"`);
  });

  it('три группы — по категориям базы', () => {
    for (const group of ['assistant', 'business', 'personal']) {
      expect(html).toContain(`id="group-${group}"`);
    }
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/pages/AssistantPage.test.tsx`
Expected: FAIL — нет модуля `./AssistantPage`.

- [ ] **Step 3: Аватар и карточка**

`src/components/assistants/AssistantAvatar.tsx`:

```tsx
import type { AssistantSlug } from '../../content/assistants/roster';

const SIZES = {
  sm: 'w-12 h-12 rounded-xl',
  lg: 'w-20 h-20 md:w-24 md:h-24 rounded-2xl',
} as const;

/**
 * Аватар из public/avatars/ — копия из кабинета (scripts/fetch-avatars.mjs).
 * alt пустой: имя всегда стоит рядом текстом, и скринридер прочёл бы его дважды.
 */
export default function AssistantAvatar({ slug, size = 'sm' }: { slug: AssistantSlug; size?: keyof typeof SIZES }) {
  return (
    <img
      src={`/avatars/${slug}.webp`}
      alt=""
      width={256}
      height={256}
      loading={size === 'lg' ? 'eager' : 'lazy'}
      className={`${SIZES[size]} object-cover bg-paper-200 flex-shrink-0`}
    />
  );
}
```

`src/components/assistants/AssistantCard.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import AssistantAvatar from './AssistantAvatar';
import { assistantName, type AssistantEntry } from '../../content/assistants/roster';
import { assistantPath } from '../../lib/assistantRoute';

interface Props {
  entry: AssistantEntry;
  language: string;
  /** Строка `card` из текстов страницы этого ассистента. */
  line: string;
}

/** Карточка-ссылка на страницу ассистента: каталог и «Работает в паре с». */
export default function AssistantCard({ entry, language, line }: Props) {
  const { t } = useTranslation();
  return (
    <a
      href={assistantPath(language, entry.slug)}
      className="h-full flex gap-3 p-4 rounded-xl border border-paper-300 bg-paper-50 hover:border-brand-700 transition-colors"
    >
      <AssistantAvatar slug={entry.slug} />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-paper-900">{assistantName(entry, language)}</span>
        <span className="block text-xs text-paper-600 leading-snug">{t(`assistantPages.roles.${entry.slug}`)}</span>
        <span className="block mt-2 text-sm text-paper-800 leading-relaxed">{line}</span>
      </span>
    </a>
  );
}
```

- [ ] **Step 4: Страница ассистента**

`src/pages/AssistantPage.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, ChevronDown, Minus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import AssistantAvatar from '../components/assistants/AssistantAvatar';
import AssistantCard from '../components/assistants/AssistantCard';
import JsonLd from '../components/assistants/JsonLd';
import { appUrl } from '../lib/appUrl';
import { assistantPath, assistantsCatalogPath, homePath } from '../lib/assistantRoute';
import { assistantBySlug, assistantName, type AssistantEntry } from '../content/assistants/roster';
import { breadcrumbJsonLd, faqJsonLd } from '../content/assistants/jsonLd';
import type { AssistantPagesPack } from '../content/assistants/types';

interface Props {
  entry: AssistantEntry;
  /** Тексты всех ассистентов на языке страницы: свой текст и строки соседей. */
  pack: AssistantPagesPack;
  language: string;
}

/**
 * Страница одного ассистента — вход из поиска.
 *
 * FadeIn здесь нет сознательно: в пререндере он отдаёт opacity-0, а эта
 * страница существует ради сырого HTML, который читает краулер.
 */
export default function AssistantPage({ entry, pack, language }: Props) {
  const { t } = useTranslation();
  const page = pack[entry.slug];
  const name = assistantName(entry, language);
  const home = homePath(language);
  const catalog = assistantsCatalogPath(language);
  // utm_content дописывается, только если у посетителя нет своей метки (так
  // устроен extra в appUrl): реклама остаётся атрибутированной рекламе.
  const chatHref = appUrl('/chat', { assistant: String(entry.id), utm_content: `assistant-${entry.slug}` });
  const related = entry.related
    .map((slug) => assistantBySlug(slug))
    .filter((r): r is AssistantEntry => Boolean(r));
  const paragraphs = page.example.answer.split(/\n{2,}/);

  const cta = (
    <Button href={chatHref} size="lg" dataCta="assistant-start">
      {page.cta} <ArrowRight aria-hidden="true" className="w-4 h-4" />
    </Button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Header homeHref={home} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t('assistantPages.home'), path: home },
            { name: t('assistantPages.nav'), path: catalog },
            { name, path: assistantPath(language, entry.slug) },
          ]),
          faqJsonLd(page.faq),
        ]}
      />

      <main className="flex-1 pt-16">
        <section className="bg-paper-100 border-b border-paper-300">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <nav aria-label={t('assistantPages.breadcrumbsLabel')} className="text-sm text-paper-600 mb-8">
              <a href={home} className="hover:text-paper-900">{t('assistantPages.home')}</a>
              <span aria-hidden="true" className="mx-2">/</span>
              <a href={catalog} className="hover:text-paper-900">{t('assistantPages.nav')}</a>
            </nav>
            <div className="flex items-center gap-5">
              <AssistantAvatar slug={entry.slug} size="lg" />
              <p className="text-sm font-semibold text-brand-800">{t(`assistantPages.roles.${entry.slug}`)}</p>
            </div>
            <h1 className="mt-6 text-3xl md:text-5xl font-semibold tracking-tight text-paper-900 text-balance">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg text-paper-800 max-w-2xl leading-relaxed">{page.lead}</p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              {cta}
              <span className="text-sm text-paper-600">{t('assistantPages.page.trust')}</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="situations-heading" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 id="situations-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {t('assistantPages.page.situations')}
          </h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-3">
            {page.situations.map((s) => (
              <li key={s} className="p-4 rounded-xl border border-paper-300 bg-white text-paper-800 leading-relaxed">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="example-heading" className="bg-paper-100 border-y border-paper-300">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <h2 id="example-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
              {t('assistantPages.page.example')}
            </h2>
            <div className="mt-6 space-y-4">
              <div className="ml-auto max-w-xl rounded-2xl rounded-br-md bg-brand-800 text-white p-4">
                <p className="text-xs font-semibold opacity-80 mb-1">{t('assistantPages.page.exampleYou')}</p>
                <p className="leading-relaxed">{page.example.question}</p>
              </div>
              <div className="max-w-2xl rounded-2xl rounded-bl-md bg-white border border-paper-300 p-4">
                <p className="text-xs font-semibold text-brand-800 mb-1">{name}</p>
                <div className="space-y-3">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="text-paper-800 leading-relaxed whitespace-pre-line">{p}</p>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-paper-600">{t('assistantPages.page.exampleNote')}</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper-900">{t('assistantPages.page.can')}</h2>
            <ul className="mt-5 space-y-3">
              {page.can.map((c) => (
                <li key={c} className="flex gap-3 text-paper-800 leading-relaxed">
                  <Check aria-hidden="true" className="w-5 h-5 mt-0.5 text-brand-700 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-paper-900">{t('assistantPages.page.cannot')}</h2>
            <ul className="mt-5 space-y-3">
              {page.cannot.map((c) => (
                <li key={c} className="flex gap-3 text-paper-800 leading-relaxed">
                  <Minus aria-hidden="true" className="w-5 h-5 mt-0.5 text-paper-600 flex-shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="faq-heading" data-testid="assistant-faq" className="max-w-4xl mx-auto px-6 pb-12 md:pb-16">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {t('assistantPages.page.faq')}
          </h2>
          <div className="mt-4">
            {page.faq.map((f) => (
              <details key={f.q} className="group border-b border-paper-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 min-h-[60px]">
                  <span className="text-paper-900 font-semibold pr-4">{f.q}</span>
                  <ChevronDown aria-hidden="true" className="w-5 h-5 text-paper-600 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <p className="pb-5 text-paper-800 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="bg-paper-100 border-t border-paper-300">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <h2 id="related-heading" className="text-2xl font-semibold tracking-tight text-paper-900">
                {t('assistantPages.page.related')}
              </h2>
              <ul className="mt-6 grid md:grid-cols-3 gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <AssistantCard entry={r} language={language} line={pack[r.slug].card} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {t('assistantPages.page.finalTitle')}
          </h2>
          <div className="mt-6 flex flex-col items-center gap-3">
            {cta}
            <span className="text-sm text-paper-600">{t('assistantPages.page.trust')}</span>
          </div>
        </section>
      </main>

      <Footer homeHref={home} />
    </div>
  );
}
```

- [ ] **Step 5: Каталог**

`src/pages/AssistantsCatalogPage.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Eyebrow from '../components/ui/Eyebrow';
import AssistantCard from '../components/assistants/AssistantCard';
import JsonLd from '../components/assistants/JsonLd';
import { assistantsCatalogPath, homePath } from '../lib/assistantRoute';
import { ASSISTANTS, type AssistantCategory } from '../content/assistants/roster';
import { breadcrumbJsonLd } from '../content/assistants/jsonLd';
import type { AssistantPagesPack } from '../content/assistants/types';

// Роман первым и отдельно: он универсал и берётся за задачи любого профиля — с него проще начать.
const GROUPS: AssistantCategory[] = ['assistant', 'business', 'personal'];

export default function AssistantsCatalogPage({ pack, language }: { pack: AssistantPagesPack; language: string }) {
  const { t } = useTranslation();
  const home = homePath(language);

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Header homeHref={home} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t('assistantPages.home'), path: home },
          { name: t('assistantPages.nav'), path: assistantsCatalogPath(language) },
        ])}
      />

      <main className="flex-1 pt-16">
        <section className="bg-paper-100 border-b border-paper-300">
          <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
            <nav aria-label={t('assistantPages.breadcrumbsLabel')} className="text-sm text-paper-600 mb-8">
              <a href={home} className="hover:text-paper-900">{t('assistantPages.home')}</a>
            </nav>
            <Eyebrow className="mb-4">{t('assistantPages.catalog.eyebrow')}</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-paper-900 text-balance">
              {t('assistantPages.catalog.h1')}
            </h1>
            <p className="mt-5 text-lg text-paper-800 max-w-2xl leading-relaxed">{t('assistantPages.catalog.lead')}</p>
          </div>
        </section>

        {GROUPS.map((group) => (
          <section key={group} aria-labelledby={`group-${group}`} className="max-w-6xl mx-auto px-6 py-10">
            <h2 id={`group-${group}`} className="text-2xl font-semibold tracking-tight text-paper-900">
              {t(`assistantPages.catalog.groups.${group}`)}
            </h2>
            <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ASSISTANTS.filter((a) => a.category === group).map((a) => (
                <li key={a.slug}>
                  <AssistantCard entry={a} language={language} line={pack[a.slug].card} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <Footer homeHref={home} />
    </div>
  );
}
```

- [ ] **Step 6: Тест проходит**

Run: `./node_modules/.bin/vitest run src/pages/AssistantPage.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/assistants/AssistantAvatar.tsx src/components/assistants/AssistantCard.tsx src/pages/AssistantPage.tsx src/pages/AssistantsCatalogPage.tsx src/pages/AssistantPage.test.tsx
git commit -m "feat(assistants): страница ассистента и каталог

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Пререндер и вход в браузере

Требует Task 7, 8, 12.

**Files:**
- Create: `src/content/assistants/load.ts`
- Modify: `src/entry-server.tsx`, `scripts/prerender.mjs`, `src/main.tsx`

- [ ] **Step 1: Ленивая загрузка текстов для браузера**

`src/content/assistants/load.ts`:

```ts
import type { AssistantPagesPack } from './types';

/**
 * Тексты страниц для браузера — отдельный чанк на язык. Главная их не грузит
 * вовсе, страница ассистента — только свой язык.
 */
const loaders = import.meta.glob<{ default: AssistantPagesPack }>('./pages/*.ts');

export async function loadPack(language: string): Promise<AssistantPagesPack | null> {
  const load = loaders[`./pages/${language}.ts`];
  return load ? (await load()).default : null;
}
```

- [ ] **Step 2: entry-server**

В `src/entry-server.tsx` — импорты:

```tsx
import AssistantPage from './pages/AssistantPage';
import AssistantsCatalogPage from './pages/AssistantsCatalogPage';
import { PACKS } from './content/assistants/packs.server';
import { assistantBySlug } from './content/assistants/roster';
```

и в конец файла:

```tsx
/** Страница ассистента для пререндера. Падает громко: молча отдать пустоту хуже. */
export function renderAssistant(
  language: string,
  slug: string,
): { html: string; title: string; description: string } {
  const entry = assistantBySlug(slug);
  const pack = PACKS[language];
  if (!entry || !pack) throw new Error(`нет страницы ассистента ${language}/${slug}`);
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <AssistantPage entry={entry} pack={pack} language={language} />
    </I18nextProvider>,
  );
  const page = pack[entry.slug];
  return { html, title: page.title, description: page.description };
}

/** Каталог ассистентов для пререндера. */
export function renderAssistantsCatalog(language: string): { html: string; title: string; description: string } {
  const pack = PACKS[language];
  if (!pack) throw new Error(`нет текстов ассистентов на ${language}`);
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <AssistantsCatalogPage pack={pack} language={language} />
    </I18nextProvider>,
  );
  return {
    html,
    title: i18n.t('assistantPages.catalog.title'),
    description: i18n.t('assistantPages.catalog.description'),
  };
}
```

- [ ] **Step 3: prerender.mjs**

Импорты (рядом с существующими):

```js
import { ASSISTANTS, ASSISTANT_SLUGS } from '../src/content/assistants/roster.data.js';
import { assistantPageCodes } from './assistant-page-languages.js';
import {
  // …существующие импорты из site-urls.mjs без изменений…
  assistantsCatalogUrlFor as siteAssistantsCatalogUrlFor,
  assistantUrlFor as siteAssistantUrlFor,
} from './site-urls.mjs';
```

Константы — после `const PUBLISHED_CODES = translatedCodes();`:

```js
// Языки страниц ассистентов: выпущенные у сайта И с модулем текстов. hreflang
// этих страниц перечисляет только их — ссылка на несуществующую версию была
// бы ложным hreflang.
const ASSISTANT_CODES = assistantPageCodes();
```

После `deleteDirFor`:

```js
const assistantsCatalogUrlFor = (code) => siteAssistantsCatalogUrlFor(code, DEFAULT_LANGUAGE);
const assistantUrlFor = (code, slug) => siteAssistantUrlFor(code, slug, DEFAULT_LANGUAGE);
const assistantsDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'assistants') : join(dist, code, 'assistants');
```

Импорт SSR-модуля — заменить строку `const { render } = await import(…)`:

```js
const { render, renderAssistant, renderAssistantsCatalog } = await import(join(root, 'dist-ssr', 'entry-server.js'));
```

`headFor` — добавить последний параметр `codes` и использовать его вместо `PUBLISHED_CODES` в обеих строках:

```js
function headFor(code, title, description, slug, urlBuilder, codes = PUBLISHED_CODES) {
  const url = (c) => (urlBuilder ? urlBuilder(c) : slug ? legalUrlFor(c, slug) : urlFor(c));
  const alternates = codes.map(
    (c) => `    <link rel="alternate" hreflang="${c}" href="${url(c)}" />`,
  ).join('\n');
  const ogAlternates = codes.filter((c) => c !== code)
    .map((c) => `    <meta property="og:locale:alternate" content="${OG_LOCALES[c]}" />`)
    .join('\n');
  // …остаток функции без изменений…
```

После цикла `delete-account`, перед сборкой `sitemap`:

```js
/** Страница раздела ассистентов: шаблон, язык, метатеги, head, разметка. */
function assistantsPage(code, { html, title, description }, urlBuilder) {
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, title, description);
  page = mustReplace(
    page,
    '</head>',
    () => `${headFor(code, title, description, null, urlBuilder, ASSISTANT_CODES)}\n  </head>`,
    '</head>',
  );
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${html}</div>`, '<div id="root">');
  return page;
}

function writePage(dir, page) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page, 'utf8');
}

const h1Of = (html) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';

for (const code of ASSISTANT_CODES) {
  const catalog = renderAssistantsCatalog(code);
  if (!h1Of(catalog.html)) throw new Error(`${code}/assistants: в каталоге нет <h1>`);
  // Каталог обязан перечислить всех: пропавшая карточка — пропавшая ссылка,
  // по которой краулер нашёл бы страницу.
  for (const a of ASSISTANTS) {
    if (!catalog.html.includes(`/assistants/${a.slug}/"`)) {
      throw new Error(`${code}/assistants: в каталоге нет ссылки на ${a.slug}`);
    }
  }
  writePage(assistantsDirFor(code), assistantsPage(code, catalog, assistantsCatalogUrlFor));

  for (const a of ASSISTANTS) {
    const rendered = renderAssistant(code, a.slug);
    // Имя проверяется в H1, а не во всей странице: имена всех ассистентов
    // есть в подвале любой страницы, и такая проверка зеленела бы на чужой.
    if (!h1Of(rendered.html).includes(a.names[code])) {
      throw new Error(`${code}/assistants/${a.slug}: в <h1> нет имени «${a.names[code]}»`);
    }
    if (!rendered.html.includes('data-testid="assistant-faq"')) {
      throw new Error(`${code}/assistants/${a.slug}: нет блока вопросов — текст не отрендерился`);
    }
    if (!rendered.html.includes('application/ld+json')) {
      throw new Error(`${code}/assistants/${a.slug}: нет разметки schema.org`);
    }
    writePage(
      join(assistantsDirFor(code), a.slug),
      assistantsPage(code, rendered, (c) => assistantUrlFor(c, a.slug)),
    );
  }
  console.log(`✅ ${code}/assistants: каталог и ${ASSISTANTS.length} страниц`);
}
```

Строка `sitemapUrls(...)` в сборке sitemap:

```js
  ...sitemapUrls(PUBLISHED_CODES, DEFAULT_LANGUAGE, { codes: ASSISTANT_CODES, slugs: ASSISTANT_SLUGS })
    .map((loc) => `  <url><loc>${loc}</loc></url>`),
```

- [ ] **Step 4: main.tsx**

Импорты:

```tsx
import AssistantPage from './pages/AssistantPage';
import AssistantsCatalogPage from './pages/AssistantsCatalogPage';
import { parseAssistantPath } from './lib/assistantRoute';
import { loadPack } from './content/assistants/load';
import { assistantBySlug } from './content/assistants/roster';
```

Заменить хвост файла (от комментария «Роутера в проекте нет…» до конца):

```tsx
// Роутера в проекте нет и заводить его ради статических страниц не стоит:
// путь разбирается один раз при загрузке, переходы между лендингом,
// документами и страницами ассистентов — обычные ссылки с перезагрузкой.
const legal = parseLegalPath(window.location.pathname);
const deleteAccount = parseDeleteAccountPath(window.location.pathname);
const assistantRoute = parseAssistantPath(window.location.pathname);
const root = createRoot(document.getElementById('root')!);

if (assistantRoute) {
  // Тексты страниц — отдельный чанк на язык. Ждём его ДО первого render:
  // createRoot не гидратирует, и первый же render заменил бы готовый HTML из
  // пререндера пустым кадром. Не пришёл чанк (офлайн, снятый ассет) или языка
  // нет — оставляем пререндер: текст и ссылки в нём рабочие, пропадёт только
  // интерактив шапки.
  loadPack(assistantRoute.language)
    .then((pack) => {
      if (!pack) return;
      const entry = assistantRoute.kind === 'assistant' ? assistantBySlug(assistantRoute.slug) : undefined;
      root.render(
        <StrictMode>
          {entry ? (
            <AssistantPage entry={entry} pack={pack} language={assistantRoute.language} />
          ) : (
            <AssistantsCatalogPage pack={pack} language={assistantRoute.language} />
          )}
        </StrictMode>,
      );
    })
    .catch((error) => console.error('страницы ассистентов: тексты не загрузились, остаётся пререндер', error));
} else {
  root.render(
    <StrictMode>
      {legal ? <LegalPage doc={legal.doc} /> : deleteAccount ? <DeleteAccountPage /> : <App />}
    </StrictMode>,
  );
}
```

- [ ] **Step 5: Сборка на ноде**

Run: `bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm test:unit && pnpm build && ls dist/assistants | head -3 && grep -o "<h1[^>]*>[^<]*" dist/assistants/raya/index.html && grep -c "/assistants/" dist/sitemap.xml'`

Expected: юнит-тесты зелёные; в логе сборки `✅ ru/assistants: каталог и 18 страниц`; в `dist/assistants/` — каталоги ассистентов и `index.html`; H1 Райи с её именем; в sitemap 19 строк с `/assistants/` (пока только русский).

- [ ] **Step 6: Чанки не утекли в главную**

Маркер текстов — ключ объекта `question:"` в минифицированном коде: он есть только в данных страниц (код компонента обращается к `example.question`, без кавычки после двоеточия).

Run: `bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm build >/dev/null 2>&1 && echo "чанк с текстами:" && grep -lE "question:\"" dist/assets/ru-*.js && (grep -lE "question:\"" dist/assets/index-*.js && echo "ПЛОХО: тексты в основном бандле" || echo "в основном бандле текстов страниц нет")'`

Expected: один файл `dist/assets/ru-*.js` и строка `в основном бандле текстов страниц нет`. Если тексты в `index-*.js` — `packs.server.ts` импортирован из клиентского кода; найти импорт и убрать.

- [ ] **Step 7: Commit**

```bash
git add src/content/assistants/load.ts src/entry-server.tsx scripts/prerender.mjs src/main.tsx
git commit -m "feat(assistants): пререндер каталога и страниц, загрузка текстов в браузере

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Карточки главной ведут на страницы

**Files:**
- Create: `src/components/sections/assistantCards.ts`
- Modify: `src/components/sections/Assistants.tsx`
- Test: `src/components/sections/Assistants.test.tsx`

- [ ] **Step 1: Написать тест**

`src/components/sections/Assistants.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Assistants from './Assistants';
import { CARD_SLUGS } from './assistantCards';
import { assistantBySlug } from '../../content/assistants/roster';
import { createServerI18n } from '../../i18n/server';
import ru from '../../i18n/locales/ru.json';
import en from '../../i18n/locales/en.json';
import es from '../../i18n/locales/es.json';
import de from '../../i18n/locales/de.json';
import fr from '../../i18n/locales/fr.json';
import pt from '../../i18n/locales/pt.json';
import zh from '../../i18n/locales/zh.json';

const LOCALES: Record<string, typeof ru> = { ru, en, es, de, fr, pt, zh };

describe('карточки ассистентов на главной', () => {
  // Имена на карточках написаны руками в локалях. Разойдись они с реестром —
  // человек кликнул бы «Алексей» и попал бы на страницу с другим написанием.
  for (const [code, locale] of Object.entries(LOCALES)) {
    it(`${code}: имена совпадают с реестром`, () => {
      expect(locale.assistants.list.map((a) => a.name)).toEqual(
        CARD_SLUGS.map((slug) => assistantBySlug(slug)!.names[code]),
      );
    });
  }

  it('карточки ведут на страницы, рядом — ссылка на каталог, главная кнопка прежняя', () => {
    const html = renderToStaticMarkup(
      <I18nextProvider i18n={createServerI18n('ru')}>
        <Assistants />
      </I18nextProvider>,
    );
    for (const slug of CARD_SLUGS) expect(html).toContain(`href="/assistants/${slug}/"`);
    expect(html).toContain('href="/assistants/"');
    expect(html).toContain('data-cta="assistants-link"');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/components/sections/Assistants.test.tsx`
Expected: FAIL — нет модуля `./assistantCards`.

- [ ] **Step 3: Реализация**

`src/components/sections/assistantCards.ts`:

```ts
import type { AssistantSlug } from '../../content/assistants/roster';

/**
 * Кто стоит на шести карточках секции Assistants — в порядке
 * `assistants.list` локалей. Имена в локалях написаны руками; тест
 * Assistants.test.tsx сверяет их с реестром на всех языках.
 */
export const CARD_SLUGS: AssistantSlug[] = ['roman', 'alexandra', 'alexey', 'anna', 'irina', 'misha'];
```

В `src/components/sections/Assistants.tsx` — импорты:

```tsx
import { CARD_SLUGS } from './assistantCards';
import { hasAssistantPages } from '../../content/assistants/availability';
import { ASSISTANTS } from '../../content/assistants/roster';
import { assistantPath, assistantsCatalogPath } from '../../lib/assistantRoute';
```

В компоненте: `const { t, i18n } = useTranslation();` и `const linked = hasAssistantPages(i18n.language);`. Блок карточек:

```tsx
          {list.map((a, i) => {
            const Icon = ICONS[i];
            const slug = CARD_SLUGS[i];
            const body = (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Icon aria-hidden="true" className="w-5 h-5 text-brand-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-paper-900">{a.name}</p>
                    <p className="text-xs text-paper-600 leading-snug">{a.role}</p>
                  </div>
                </div>
                <p className="text-sm text-paper-800 leading-relaxed">«{a.quote}»</p>
              </>
            );
            const cls = 'min-w-0 flex flex-col gap-2 p-4 rounded-xl border border-paper-300 bg-paper-50';
            return linked && slug ? (
              <a key={a.name} href={assistantPath(i18n.language, slug)} className={`${cls} hover:border-brand-700 transition-colors`}>
                {body}
              </a>
            ) : (
              <div key={a.name} className={cls}>{body}</div>
            );
          })}
```

Ссылку-CTA под карточками заменить на пару ссылок:

```tsx
        <div className="flex flex-wrap items-center gap-x-6 mt-6">
          <a href={appUrl()} data-cta="assistants-link" className="inline-flex items-center gap-1 py-2 min-h-11 text-brand-800 hover:text-brand-900 font-semibold text-sm">
            {t('assistants.cta')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </a>
          {linked && (
            <a href={assistantsCatalogPath(i18n.language)} className="inline-flex items-center py-2 min-h-11 text-paper-800 hover:text-paper-900 font-semibold text-sm underline underline-offset-4">
              {t('assistantPages.allCount', { count: ASSISTANTS.length })}
            </a>
          )}
        </div>
```

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run src/components/sections/Assistants.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/assistantCards.ts src/components/sections/Assistants.tsx src/components/sections/Assistants.test.tsx
git commit -m "feat(assistants): карточки главной ведут на страницы ассистентов

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 15: Путь страницы в событиях лендинга

**Files:**
- Modify: `src/lib/track.ts`
- Test: `src/lib/track.test.ts`

- [ ] **Step 1: Написать тест**

`src/lib/track.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Заход и клик пишутся в нашу таблицу событий. Без пути страницы не видно,
 * какие страницы ассистентов получают заходы из поиска — а ради этого они и
 * делались. Окружение браузера подменяется: vitest здесь идёт в node.
 */
function stubBrowser(pathname: string) {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  vi.stubGlobal('window', { location: { pathname, search: '', hostname: 'linkeon.io' } });
  vi.stubGlobal('document', { referrer: 'https://yandex.ru/' });
  vi.stubGlobal('sessionStorage', storage);
  vi.stubGlobal('localStorage', storage);
  const fetch = vi.fn(async (_url: string, _init?: RequestInit) => new Response(null));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

const bodyOf = (fetch: ReturnType<typeof stubBrowser>) =>
  JSON.parse(fetch.mock.calls[0][1]!.body as string);

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('события лендинга знают путь страницы', () => {
  it('landing_view', async () => {
    const fetch = stubBrowser('/assistants/raya/');
    const { trackLandingVisit } = await import('./track');
    trackLandingVisit();
    expect(bodyOf(fetch).props.path).toBe('/assistants/raya/');
    expect(bodyOf(fetch).source).toBe('ref-site:yandex.ru');
  });

  it('landing_cta_click', async () => {
    const fetch = stubBrowser('/en/assistants/alexey/');
    const { trackLandingCta } = await import('./track');
    trackLandingCta('assistant-start');
    expect(bodyOf(fetch).props).toMatchObject({ cta: 'assistant-start', path: '/en/assistants/alexey/' });
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/lib/track.test.ts`
Expected: FAIL — `expected undefined to be '/assistants/raya/'`.

- [ ] **Step 3: Реализация**

В `src/lib/track.ts` в трёх местах добавить `path: window.location.pathname` в `props`:
- `trackLandingVisit`: `props: { site: 'landing', path: window.location.pathname, campaign: getCampaign(), referrer: document.referrer || null },`
- `initLandingEngagement` → `send`: в объект `props` строку `path: window.location.pathname,` после `site: 'landing',`
- `trackLandingCta`: `props: { site: 'landing', cta, path: window.location.pathname, campaign: getCampaign() },`

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run src/lib/track.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/track.ts src/lib/track.test.ts
git commit -m "feat(track): путь страницы в событиях лендинга

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 16: Аватары

**Files:**
- Create: `scripts/fetch-avatars.mjs`, `public/avatars/<slug>.webp` (18 файлов)
- Modify: `package.json` (скрипт `fetch-avatars`)

- [ ] **Step 1: Скрипт**

`scripts/fetch-avatars.mjs`:

```js
#!/usr/bin/env node
/**
 * Забирает аватары ассистентов из кабинета в public/avatars/<slug>.webp
 * (256×256). Файлы коммитятся: страница не должна зависеть от доступности
 * my.linkeon.io. Перезапускать, когда в кабинете сменили аватар.
 * Нужен ffmpeg с libwebp (на маке — brew install ffmpeg).
 */
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ASSISTANTS } from '../src/content/assistants/roster.data.js';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'avatars');
const AVATAR = (id) =>
  `https://my.linkeon.io/webhook/0cdacf32-7bfd-4888-b24f-3a6af3b5f99e/agent/avatar/${id}`;

mkdirSync(outDir, { recursive: true });
for (const a of ASSISTANTS) {
  const res = await fetch(AVATAR(a.id));
  const type = res.headers.get('content-type') ?? '';
  // На этом хосте неизвестный путь отдаёт 200 с HTML (SPA-фолбэк): код ответа
  // ничего не доказывает, смотрим тип.
  if (!res.ok || !type.startsWith('image/')) throw new Error(`${a.slug}: ${res.status} ${type}`);
  const src = join(tmpdir(), `linkeon-avatar-${a.slug}`);
  writeFileSync(src, Buffer.from(await res.arrayBuffer()));
  const out = join(outDir, `${a.slug}.webp`);
  const run = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, '-vf', 'scale=256:256', '-c:v', 'libwebp', '-quality', '82', out]);
  if (run.status !== 0) throw new Error(`${a.slug}: ffmpeg — ${run.stderr}`);
  console.log(`✅ ${a.slug} → public/avatars/${a.slug}.webp (${statSync(out).size} байт)`);
}
```

В `package.json` → `scripts` добавить `"fetch-avatars": "node scripts/fetch-avatars.mjs",`.

- [ ] **Step 2: Запустить**

Run: `node scripts/fetch-avatars.mjs`
Expected: 18 строк `✅`, каждый файл 5–30 КБ. Открыть 2–3 файла и убедиться глазами, что это лица ассистентов, а не заглушка.

- [ ] **Step 3: Commit**

```bash
git add scripts/fetch-avatars.mjs public/avatars/ package.json
git commit -m "feat(assistants): аватары ассистентов в public/avatars

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 17: Сверка реестра с приложением

**Files:**
- Create: `scripts/check-assistants.mjs`
- Modify: `package.json` (скрипт `check-assistants`)

- [ ] **Step 1: Скрипт**

`scripts/check-assistants.mjs`:

```js
#!/usr/bin/env node
/**
 * Сверяет реестр страниц ассистентов с живым приложением: имена на всех
 * языках, категории, ассистентов без страницы и страницы без ассистента.
 *
 * Сеть нужна, поэтому в сборку не встроен — сборка не должна зависеть от
 * прода. Запускать перед каждым выкатом лендинга: pnpm check-assistants.
 */
import { ASSISTANTS } from '../src/content/assistants/roster.data.js';
import { SUPPORTED_CODES } from '../src/i18n/languages.data.js';

const APP = process.env.APP_URL ?? 'https://my.linkeon.io';
const problems = [];

for (const code of SUPPORTED_CODES) {
  const res = await fetch(`${APP}/webhook/agents?lang=${code}`);
  const type = res.headers.get('content-type') ?? '';
  if (!res.ok || !type.includes('application/json')) {
    problems.push(`${code}: ответ ${res.status} ${type}`);
    continue;
  }
  const live = await res.json();
  const byId = new Map(live.map((a) => [a.id, a]));
  for (const a of ASSISTANTS) {
    const l = byId.get(a.id);
    if (!l) {
      problems.push(`${code}: ${a.slug} (id ${a.id}) в приложении нет — снят или скрыт`);
      continue;
    }
    if (l.displayName !== a.names[code]) {
      problems.push(`${code}: ${a.slug} в приложении «${l.displayName}», в реестре «${a.names[code]}»`);
    }
    if (l.category !== a.category) {
      problems.push(`${code}: ${a.slug} — категория ${l.category}, в реестре ${a.category}`);
    }
  }
  for (const l of live) {
    if (!ASSISTANTS.some((a) => a.id === l.id)) {
      problems.push(`${code}: в приложении есть ${l.displayName} (id ${l.id}), страницы нет`);
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`✅ ${ASSISTANTS.length} ассистентов совпадают с ${APP} на ${SUPPORTED_CODES.length} языках`);
```

В `package.json` → `scripts` добавить `"check-assistants": "node scripts/check-assistants.mjs",`.

- [ ] **Step 2: Запустить**

Run: `node scripts/check-assistants.mjs`
Expected: `✅ 18 ассистентов совпадают с https://my.linkeon.io на 7 языках`.

- [ ] **Step 3: Сломать нарочно**

Временно поменять `ru: 'Роман'` на `ru: 'Ромаан'` в `roster.data.js` и запустить снова.
Expected: exit 1, строка `ru: roman в приложении «Роман», в реестре «Ромаан»`. Вернуть правку: `git checkout src/content/assistants/roster.data.js`.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-assistants.mjs package.json
git commit -m "feat(assistants): сверка реестра ассистентов с живым приложением

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 18: Проверки в сыром HTML и в браузере

**Files:**
- Create: `tests/assistants.spec.ts`

- [ ] **Step 1: Написать тесты**

`tests/assistants.spec.ts`:

```ts
import { test, expect, request } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { ASSISTANTS } from '../src/content/assistants/roster.data.js';
import { assistantPageCodes } from '../scripts/assistant-page-languages.js';
import { assistantUrlFor, assistantsCatalogUrlFor } from '../scripts/site-urls.mjs';

// Языки — из того же источника, что и сборка: перевод доехал — проверки
// включились сами.
const CODES = assistantPageCodes();
const prefix = (code: string) => (code === DEFAULT_LANGUAGE ? '' : `/${code}`);
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;

// Сырой HTTP: так страницу видит краулер. Код ответа ничего не доказывает —
// SPA-фолбэк отдаёт 200 на любой путь, поэтому проверяется содержимое.
test.describe('страницы ассистентов в сыром HTML', () => {
  for (const code of CODES) {
    test(`${code}: каталог`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const html = await (await ctx.get(`${prefix(code)}/assistants/`)).text();
      expect(html).toContain(`<html lang="${code}"`);
      expect(html).toContain(`<link rel="canonical" href="${assistantsCatalogUrlFor(code, DEFAULT_LANGUAGE)}"`);
      expect(count(html, /hreflang="/g), 'hreflang: языки страниц + x-default').toBe(CODES.length + 1);
      for (const a of ASSISTANTS) expect(html, a.slug).toContain(`href="${prefix(code)}/assistants/${a.slug}/"`);
      await ctx.dispose();
    });

    test(`${code}: страницы всех ассистентов`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      for (const a of ASSISTANTS) {
        // Адрес со слэшем — канонический. Без слэша vite preview подсунул бы
        // главную (SPA-фолбэк), а nginx на проде отвечает 301 на версию со слэшем.
        const res = await ctx.get(`${prefix(code)}/assistants/${a.slug}/`);
        expect(res.status(), a.slug).toBe(200);
        const html = await res.text();
        expect(html, a.slug).toContain(`<html lang="${code}"`);
        const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
        expect(h1, `${a.slug}: в H1 нет имени — отдана чужая страница?`).toContain(a.names[code]);
        expect(count(html, /rel="canonical"/g), a.slug).toBe(1);
        expect(html, a.slug).toContain(
          `<link rel="canonical" href="${assistantUrlFor(code, a.slug, DEFAULT_LANGUAGE)}"`,
        );
        expect(count(html, /hreflang="/g), a.slug).toBe(CODES.length + 1);
        expect(html, a.slug).toContain('"@type":"FAQPage"');
        expect(html, a.slug).toContain('"@type":"BreadcrumbList"');
        expect(html, `${a.slug}: кнопка не ведёт в чат с ассистентом`).toMatch(
          new RegExp(`href="https://my\\.linkeon\\.io/chat\\?assistant=${a.id}&amp;`),
        );
      }
      await ctx.dispose();
    });
  }

  test('главная ссылается на страницы ассистентов', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get('/')).text();
    expect(html).toContain('href="/assistants/"');
    for (const a of ASSISTANTS) expect(html, a.slug).toContain(`href="/assistants/${a.slug}/"`);
    await ctx.dispose();
  });
});

test.describe('страница ассистента в браузере', () => {
  test('кнопка ведёт в чат, переключатель языка — на ту же страницу', async ({ page }) => {
    const code = CODES.find((c) => c !== DEFAULT_LANGUAGE);
    test.skip(!code, 'страницы есть только на русском — переключать не на что');
    await page.goto(`/${code}/assistants/raya/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      ASSISTANTS.find((a) => a.slug === 'raya')!.names[code!],
    );
    await expect(page.locator('[data-cta="assistant-start"]').first()).toHaveAttribute(
      'href',
      /^https:\/\/my\.linkeon\.io\/chat\?.*assistant=14/,
    );
    await page.locator('[data-testid="lang-switcher"] button').first().click();
    await expect(page.locator('[data-testid="lang-option-ru"]').first()).toHaveAttribute('href', '/assistants/raya/');
  });
});
```

- [ ] **Step 2: Полный прогон на ноде**

Run: `bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm test:unit && CI=1 pnpm test'`
Expected: юнит-тесты и Playwright зелёные. Браузерный тест пока пропущен (`skipped`) — переводов ещё нет; он включится после Task 19.

Почему везде слэш на конце (проверено 01.10.2026): `vite preview` по адресу `/legal/offer` отдаёт главную (SPA-фолбэк), по `/legal/offer/` — документ; прод-nginx на `/legal/offer` отвечает 301 на `/legal/offer/`. Падение «в H1 нет имени» сразу у всех ассистентов почти наверняка значит, что где-то запрос ушёл на адрес без слэша.

- [ ] **Step 3: Типы — дельтой к main**

Run:
```bash
bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm typecheck 2>&1 | grep -c "error TS" || true'
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && git checkout -q --detach origin/main && source ~/.nvm/nvm.sh && pnpm install --frozen-lockfile >/dev/null 2>&1; pnpm typecheck 2>&1 | grep -c "error TS" || true'
```
Expected: на ветке ошибок не больше, чем на `main`. Новые ошибки — исправить.

- [ ] **Step 4: Сломать нарочно — каждая проверка обязана покраснеть**

По очереди, каждый раз временным коммитом и откатом (`git commit -am "tmp: ломаю нарочно" && bash …/node-run.sh '…'; git reset --hard HEAD~1`):

1. В `pages/ru.ts` у Райи убрать имя из `h1` → `pnpm build` падает: `ru/assistants/raya: в <h1> нет имени «Райя»`.
2. В `AssistantPage.tsx` заменить `String(entry.id)` на `'0'` → `CI=1 pnpm test` падает на «кнопка не ведёт в чат с ассистентом».
3. В `site-urls.mjs` из `sitemapUrls` убрать строку со страницами ассистентов → падает «sitemap перечисляет ровно выпущенные версии».
4. В `Footer.tsx` убрать блок ассистентов → падает «главная ссылается на страницы ассистентов».

После четвёртого — `git log -1` показывает последний настоящий коммит, `git status` чистый.

- [ ] **Step 5: Commit**

```bash
git add tests/assistants.spec.ts
git commit -m "test(assistants): страницы ассистентов в сыром HTML и в браузере

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q origin feat/assistant-pages
```

---

### Task 19: Переводы на шесть языков

Требует Task 5 (одобренный `pages/ru.ts`). Каждый язык — отдельный шаг и отдельный коммит; языки независимы, их можно отдать параллельным исполнителям.

**Files:**
- Create: `src/content/assistants/pages/{en,es,de,fr,zh,pt}.ts`

**Правила перевода (для каждого языка):**
- Форма файла — как `pages/ru.ts`, тип `AssistantPagesPack`, ключи в порядке реестра; экспорт `export default <код>;`.
- Имя ассистента — ровно `ASSISTANTS[i].names[<код>]` из реестра: это написание приложения, не переводчика. `cta` — с именем в грамматически верной форме языка (pt — с артиклем: «Falar com o Alexei», «Falar com a Anna»).
- `title`, `description`, `h1` — естественная для языка поисковая формулировка: en «AI lawyer online»; es «abogado con IA online»; de «KI-Anwalt online» (в поисковых полях de — «KI», так ищут); fr «avocat IA en ligne»; pt «advogado com IA online»; zh «在线AI法律顾问». Остальной текст — перевод русского по смыслу, без сокращения содержания.
- Обращение: en — нейтральное «you»; es — «usted»; de — «Sie»; fr — «vous»; pt — европейский португальский, безличное «o seu / lhe»; zh — «你». Пример разговора с Машей — в неформальном регистре (tú / du / tu / tu / 你), это её голос.
- Пример разговора — перевод того же вопроса и ответа; ничего не дописывать. Подпись «переведено с русского» уже в локали (`assistantPages.page.exampleNote`).
- Цена — без рублей: «первые разговоры за наш счёт: 25 000 токенов при регистрации, карта не нужна; дальше пакеты токенов без подписки».
- Алексей, Анна, Андрей, Виталий, Павел — пункт в вопросах: по умолчанию российское право и практика; если назвать свою страну, ассистент учтёт её.
- Телефоны помощи — не переносить: «обратитесь в местную экстренную службу» (тест падает на российских номерах).

- [ ] **Step 1: en** — написать `pages/en.ts`; `./node_modules/.bin/vitest run src/content/assistants/packs.test.ts` → PASS; commit:

```bash
git add src/content/assistants/pages/en.ts
git commit -m "feat(assistants): страницы ассистентов на английском

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 2: es** — то же с `pages/es.ts`, сообщение «на испанском».
- [ ] **Step 3: de** — то же с `pages/de.ts`, сообщение «на немецком».
- [ ] **Step 4: fr** — то же с `pages/fr.ts`, сообщение «на французском».
- [ ] **Step 5: zh** — то же с `pages/zh.ts`, сообщение «на китайском».
- [ ] **Step 6: pt** — то же с `pages/pt.ts`, сообщение «на португальском».

- [ ] **Step 7: Вычитка перевода вторым исполнителем**

Отдельный исполнитель (не тот, кто переводил) по каждому языку сверяет с `ru.ts`: смысл не потерян; имена совпадают с реестром; у пятерых — пункт о праве страны; нет рублей и российских телефонов. Найденное — исправить, коммит `fix(assistants): вычитка <язык>`.

- [ ] **Step 8: Полный прогон на ноде**

Run: `bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm test:unit && pnpm build > /tmp/ap-build.log 2>&1 && grep "assistants:" /tmp/ap-build.log && CI=1 pnpm test'`

Сборка пишется в файл, а не в конвейер: `pnpm build | grep` вернул бы код grep, и упавшая сборка прошла бы дальше.

Expected: семь строк `✅ <код>/assistants: каталог и 18 страниц`; все тесты зелёные, браузерный тест больше не пропускается.

---

### Task 20: Карточка Ирины на главной

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,zh,pt}.json` — `assistants.list[4]` (Ирина): поля `role` и `quote`

Реплика «Вакансию и вопросы к собеседованию соберу сама» противоречит промпту Ирины: она не рекрутер и вакансий не подбирает, а помогает человеку с его собственной карьерой. Решение владельца по умолчанию (спека, «Открытые вопросы») — переписать карточку под промпт.

- [ ] **Step 1: Заменить `role` и `quote`**

| Язык | role | quote |
|---|---|---|
| ru | карьерный консультант | Расскажите о последнем месте работы: что там было вашим, а что — нет. Из этого и сложится, куда двигаться дальше. |
| en | career counsellor | Tell me about your last job — what felt like yours and what didn't. That's where the next direction comes from. |
| es | orientadora profesional | Cuénteme sobre su último trabajo: qué era realmente suyo y qué no. De ahí saldrá hacia dónde seguir. |
| de | Karriereberaterin | Erzählen Sie von Ihrer letzten Stelle: Was davon war wirklich Ihres und was nicht? Daraus ergibt sich, wohin es weitergeht. |
| fr | conseillère en carrière | Parlez-moi de votre dernier poste : ce qui vous ressemblait et ce qui ne vous ressemblait pas. C'est de là que viendra la suite. |
| zh | 职业顾问 | 说说你上一份工作：哪些是真正属于你的，哪些不是。下一步往哪走，答案就从这里来。 |
| pt | orientadora de carreira | Fale-me do seu último trabalho: o que era seu e o que não era. É daí que sai o próximo passo. |

- [ ] **Step 2: Проверки**

Run: `node scripts/check-locales.mjs && ./node_modules/.bin/vitest run src/i18n/locales.structure.test.ts src/components/sections/Assistants.test.tsx`
Expected: всё зелёное (имена не менялись — сверка с реестром проходит).

- [ ] **Step 3: Commit**

```bash
git add src/i18n/locales/
git commit -m "fix(copy): карточка Ирины — карьерный навигатор, как в её промпте, а не найм

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 21: Кабинет — выбор ассистента до входа

Все пути — от корня воркдерева `~/Downloads/spirits_front/.worktrees/assistant-deeplink`.

**Files:**
- Create: `src/utils/pendingAssistant.ts`
- Test: `src/utils/pendingAssistant.test.ts`

- [ ] **Step 1: Написать тест**

`src/utils/pendingAssistant.test.ts`:

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { peekPendingAssistant, rememberPendingAssistant, takePendingAssistant } from './pendingAssistant';

const NOW = 1_700_000_000_000;
const HOUR = 60 * 60 * 1000;

describe('ассистент, выбранный до входа', () => {
  beforeEach(() => localStorage.clear());

  it('запомненное отдаётся один раз', () => {
    rememberPendingAssistant('14', NOW);
    expect(takePendingAssistant(NOW + 1000)).toBe('14');
    expect(takePendingAssistant(NOW + 2000)).toBeNull();
  });

  it('подсмотреть — не значит забрать', () => {
    rememberPendingAssistant('14', NOW);
    expect(peekPendingAssistant(NOW)).toBe('14');
    expect(takePendingAssistant(NOW)).toBe('14');
  });

  // Через неделю это уже не намерение, а сюрприз: зашёл — открылась Райя.
  it('через час забывается', () => {
    rememberPendingAssistant('14', NOW);
    expect(peekPendingAssistant(NOW + HOUR + 1)).toBeNull();
    expect(localStorage.getItem('pending_assistant')).toBeNull();
  });

  it('пустое и мусор не запоминаются', () => {
    rememberPendingAssistant(null, NOW);
    rememberPendingAssistant('   ', NOW);
    rememberPendingAssistant('x'.repeat(65), NOW);
    expect(peekPendingAssistant(NOW)).toBeNull();
  });

  it('битая запись не роняет', () => {
    localStorage.setItem('pending_assistant', '{oops');
    expect(takePendingAssistant(NOW)).toBeNull();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/utils/pendingAssistant.test.ts`
Expected: FAIL — нет модуля `./pendingAssistant`.

- [ ] **Step 3: Реализация**

`src/utils/pendingAssistant.ts`:

```ts
/**
 * Ассистент, выбранный до входа.
 *
 * Страница ассистента на linkeon.io ведёт на /chat?assistant=<id>. Новый
 * человек сначала попадает на экран входа, а после входа кабинет открывает
 * голый /chat (SmsLoginPane, AuthOAuthCallbackPage, AuthLinkPage) — параметр
 * терялся, и человек со страницы Райи оказывался на экране выбора темы.
 *
 * localStorage, а не sessionStorage: ссылка входа из письма часто открывается
 * в новой вкладке. Срок — час: дольше выбор перестаёт быть намерением.
 */
const KEY = 'pending_assistant';
const TTL_MS = 60 * 60 * 1000;
const MAX_LENGTH = 64;

interface Stored {
  value: string;
  expires: number;
}

function forget(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* хранилище недоступно — забывать нечего */
  }
}

/** Запись из хранилища; битая стирается — второй раз спотыкаться о неё незачем. */
function read(): Stored | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (typeof parsed.value === 'string' && typeof parsed.expires === 'number') {
      return { value: parsed.value, expires: parsed.expires };
    }
  } catch {
    /* не JSON — стираем ниже */
  }
  forget();
  return null;
}

/** id или имя ассистента из ?assistant= — до входа. Пустое и длинное игнорируется. */
export function rememberPendingAssistant(value: string | null, now = Date.now()): void {
  const v = value?.trim();
  if (!v || v.length > MAX_LENGTH) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ value: v, expires: now + TTL_MS }));
  } catch {
    /* переполненное хранилище не должно ломать вход */
  }
}

/** Запомненное, не стирая. Просроченное стирается и не отдаётся. */
export function peekPendingAssistant(now = Date.now()): string | null {
  const stored = read();
  if (!stored) return null;
  if (stored.expires <= now) {
    forget();
    return null;
  }
  return stored.value;
}

/** Запомненное — один раз: отдаёт и стирает. */
export function takePendingAssistant(now = Date.now()): string | null {
  const value = peekPendingAssistant(now);
  forget();
  return value;
}
```

- [ ] **Step 4: Тест проходит**

Run: `./node_modules/.bin/vitest run src/utils/pendingAssistant.test.ts`
Expected: PASS, 5 тестов.

- [ ] **Step 5: Commit**

```bash
git add src/utils/pendingAssistant.ts src/utils/pendingAssistant.test.ts
git commit -m "feat(chat): запоминать ассистента, выбранного до входа

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 22: Кабинет — выбор переживает вход, экран тем пропускается

> **Поправки по ревью (01.10.2026) — код в ветке отличается от шагов ниже, верен код.** Ревью нашло две ошибки в самом плане и два пробела:
> 1. `RootRedirect` переносит ТОЛЬКО `assistant` и живёт в `src/components/RootRedirect.tsx` (с тестом). Перенос всего `search` возвращал в `/chat` одноразовые `talerid_login` / `talerid_link`: App.tsx гасит их через `history.replaceState` мимо роутера, и после входа редирект читал устаревший адрес — при F5 «Ссылка входа устарела».
> 2. Приветствие хранится как `{ id, text }` и передаётся в чат, только если выбран тот же ассистент: иначе «Я Райя» всплывало в пустом чате любого другого (в том числе по ярлыку PWA `/chat?assistant=roman`). Закрывает и старую такую же утечку через выбор темы.
> 3. Ссылка на ассистента, которого нет в списке: `onDeepLink(null)`, у новичка — обычный экран тем, онбординг не закрывается. В `ChatPage` вместо `deepLinkRequested` — состояние `none | pending | matched | missed`; онбординг закрывается только при `matched`; пустой `?assistant=` ссылкой не считается.
> 4. Тесты дополнены: профиль приходит позже списка; `resume` вместе с запомненной записью; неизвестный id; приветствие не перетекает к другому ассистенту.

**Files:**
- Modify: `src/pages/OnboardingPage.tsx`, `src/components/chat/ChatLayout.tsx`, `src/pages/ChatPage.tsx`, `src/App.tsx`
- Test: `src/pages/ChatPage.deeplink.test.tsx`

- [ ] **Step 1: Написать тест**

`src/pages/ChatPage.deeplink.test.tsx`:

```tsx
// @vitest-environment jsdom
//
// Человек со страницы ассистента на linkeon.io приходит в кабинет по ссылке
// /chat?assistant=<id>. Новичка (onboarded === false) раньше встречал экран
// «С чего начнём?», даже когда ассистент уже выбран, а после входа параметр
// терялся вовсе. Тесты смотрят на экран — что человек видит.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { flush, mount, tRu, visibleText, type Mounted } from '../test/dom';

const AGENTS = [
  { id: 12, name: 'Роман', displayName: 'Роман', description: 'Помогаю делать все, что не могут другие', category: 'assistant' },
  { id: 2, name: 'Оля', displayName: 'Оля', description: 'Психолог и фасилитатор самоисследования', category: 'personal' },
  { id: 14, name: 'Райя', displayName: 'Райя', description: 'Human Design ридер', category: 'personal' },
];

const auth = vi.hoisted(() => ({
  user: { onboarded: false } as { onboarded?: boolean },
  completeOnboarding: vi.fn(async () => {}),
}));

vi.mock('react-i18next', async () => {
  const { tRu: t } = await import('../test/dom');
  return { useTranslation: () => ({ t, i18n: { language: 'ru' } }) };
});
vi.mock('../contexts/AuthContext', () => ({ useAuth: () => auth }));
vi.mock('../services/apiClient', () => ({
  apiClient: { get: vi.fn(async () => ({ ok: true, json: async () => AGENTS })) },
}));
vi.mock('../services/avatarService', () => ({ avatarService: { getAvatarUrl: vi.fn(async () => '') } }));
vi.mock('../services/customAgentsApi', () => ({ customAgentsApi: { list: vi.fn(async () => []) } }));
vi.mock('../components/tokens/TokenPackages', () => ({ TokenPackages: () => null }));
vi.mock('../components/chat/ChatInterface', () => ({
  default: (p: { preSelectedAssistant: { displayName?: string } | null; welcomeMessage?: string }) => (
    <div data-testid="chat">
      чат: {p.preSelectedAssistant?.displayName ?? 'без ассистента'} | {p.welcomeMessage}
    </div>
  ),
}));

import ChatPage from './ChatPage';

const PICKER = tRu('onboarding.match.subtitle');
let view: Mounted | null = null;

async function open(url: string): Promise<string> {
  view = mount(
    <MemoryRouter initialEntries={[url]}>
      <ChatPage />
    </MemoryRouter>,
  );
  // Список ассистентов приходит промисом, выбор применяется эффектом после него.
  for (let i = 0; i < 6; i++) await flush();
  return visibleText(view.container);
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  auth.user = { onboarded: false };
  auth.completeOnboarding.mockClear();
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) => ({
      matches: false, media: query, onchange: null,
      addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
    })) as typeof window.matchMedia;
  }
});

afterEach(() => {
  view?.unmount();
  view = null;
});

describe('новичок пришёл к конкретному ассистенту', () => {
  it('?assistant=14 — сразу чат с Райей, без экрана выбора темы', async () => {
    const text = await open('/chat?assistant=14');
    expect(text).not.toContain(PICKER);
    expect(text).toContain('чат: Райя');
    expect(text).toContain('Я Райя');
    expect(auth.completeOnboarding).toHaveBeenCalled();
  });

  it('выбор, запомненный до входа, открывает Райю и стирается', async () => {
    localStorage.setItem('pending_assistant', JSON.stringify({ value: '14', expires: Date.now() + 60_000 }));
    const text = await open('/chat');
    expect(text).not.toContain(PICKER);
    expect(text).toContain('чат: Райя');
    expect(localStorage.getItem('pending_assistant')).toBeNull();
  });
});

describe('всё остальное — как раньше', () => {
  it('новичок без ссылки видит экран выбора темы', async () => {
    expect(await open('/chat')).toContain(PICKER);
  });

  it('просроченный выбор не мешает экрану выбора темы', async () => {
    localStorage.setItem('pending_assistant', JSON.stringify({ value: '14', expires: Date.now() - 1 }));
    expect(await open('/chat')).toContain(PICKER);
  });

  it('вернувшийся человек по ссылке попадает в чат, онбординг не трогается', async () => {
    auth.user = { onboarded: true };
    const text = await open('/chat?assistant=14');
    expect(text).toContain('чат: Райя');
    expect(auth.completeOnboarding).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `./node_modules/.bin/vitest run src/pages/ChatPage.deeplink.test.tsx`
Expected: FAIL — в двух тестах «новичок пришёл…» на экране `PICKER`; запомненный выбор не применяется.

- [ ] **Step 3: OnboardingPage — запомнить**

В `src/pages/OnboardingPage.tsx` импорт `import { rememberPendingAssistant } from '../utils/pendingAssistant';` и в существующий `useEffect` после блока `ref`:

```tsx
    // Пришёл со страницы ассистента (linkeon.io/assistants/…): запоминаем, к
    // кому, — после входа кабинет откроет чат с ним, а не экран выбора темы.
    rememberPendingAssistant(searchParams.get('assistant'));
```

- [ ] **Step 4: ChatLayout — применить после входа**

В `src/components/chat/ChatLayout.tsx` импорт `import { takePendingAssistant } from '../../utils/pendingAssistant';`. Пропсы:

```tsx
interface ChatLayoutProps {
  children: (props: { selectedAssistant: Assistant | null; onSelectAssistant: (a: Assistant) => void; assistants: Assistant[] }) => React.ReactNode;
  /** Ассистент выбран по ссылке: ?assistant= или выбор, запомненный до входа. */
  onDeepLink?: (a: Assistant) => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children, onDeepLink }) => {
```

Перед эффектом deep-link:

```tsx
  // Через ref: эффект deep-link не должен перезапускаться от новой функции на
  // каждом рендере родителя. Синхронизация — эффектом, объявленным раньше:
  // в одном коммите он отрабатывает первым.
  const onDeepLinkRef = useRef(onDeepLink);
  useEffect(() => {
    onDeepLinkRef.current = onDeepLink;
  }, [onDeepLink]);
```

В самом эффекте заменить начало (до `if (q) {`):

```tsx
  useEffect(() => {
    if (assistants.length === 0) return;
    const params = new URLSearchParams(location.search);
    const fromUrl = params.get('assistant');
    const resume = params.get('resume') === '1';
    // Выбор, сделанный до входа (страница ассистента → экран входа → голый
    // /chat), см. utils/pendingAssistant.ts. Забирается всегда: явный параметр
    // в адресе побеждает, и запомненное не должно всплыть при следующем переходе.
    const pending = takePendingAssistant();
    const q = fromUrl || (resume ? null : pending);
    if (!q && !resume) return;
    const navKey = location.key + '|' + location.search;
    if (lastAppliedNav.current === navKey) return;
    lastAppliedNav.current = navKey;
    if (q) {
```

и строку `if (match) handleSelect(match);` заменить на:

```tsx
      if (match) {
        handleSelect(match);
        onDeepLinkRef.current?.(match);
      }
```

- [ ] **Step 5: ChatPage — пропустить экран тем**

В `src/pages/ChatPage.tsx` импорт `import { peekPendingAssistant } from '../utils/pendingAssistant';`. После `const [greeting, setGreeting] = …`:

```tsx
  // Пришёл по ссылке на конкретного ассистента — со страницы на linkeon.io
  // (через вход: запомненный выбор) или по шорткату (?assistant=). Выбор уже
  // сделан, экран «С чего начнём?» ему не нужен. Считается один раз при
  // монтировании: ChatLayout стирает запомненное, применив его, и пересчёт
  // вернул бы экран выбора поверх открытого чата.
  const [deepLinkRequested] = useState(
    () => new URLSearchParams(location.search).has('assistant') || peekPendingAssistant() !== null,
  );

  // Онбординг пройден: ассистента человек выбрал сам. Отдельным эффектом, а не
  // в onDeepLink: профиль с флагом onboarded может догрузиться позже списка
  // ассистентов.
  useEffect(() => {
    if (deepLinkRequested && user?.onboarded === false) completeOnboarding();
  }, [deepLinkRequested, user?.onboarded, completeOnboarding]);
```

`showMatch`:

```tsx
  const showMatch = user?.onboarded === false && !dismissed && !deepLinkRequested;
```

`<ChatLayout>` — открывающий тег:

```tsx
      <ChatLayout
        onDeepLink={(a) =>
          // То же приветствие, что после выбора темы: видно только в пустом чате.
          setGreeting(t('onboarding.match.greeting', { name: a.displayName || a.name, role: a.description || '' }))
        }
      >
```

- [ ] **Step 6: App — `/` сохраняет параметры**

В `src/App.tsx` добавить `useLocation` в импорт из `react-router-dom` и перед `const AppContent`:

```tsx
// `/` → `/chat` с параметрами: ссылка вида my.linkeon.io/?assistant=14
// иначе теряла бы выбор ассистента ещё до чата.
const RootRedirect: React.FC = () => {
  const location = useLocation();
  return <Navigate to={{ pathname: '/chat', search: location.search }} replace />;
};
```

Маршрут: `<Route path="/" element={<RootRedirect />} />`.

- [ ] **Step 7: Тесты проходят**

Run: `./node_modules/.bin/vitest run src/pages/ChatPage.deeplink.test.tsx src/utils/pendingAssistant.test.ts`
Expected: PASS, 10 тестов.

- [ ] **Step 8: Commit**

```bash
git add src/pages/OnboardingPage.tsx src/components/chat/ChatLayout.tsx src/pages/ChatPage.tsx src/App.tsx src/pages/ChatPage.deeplink.test.tsx
git commit -m "feat(chat): ассистент со страницы linkeon.io переживает вход, экран тем пропускается

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 23: Кабинет — прогон, слияние, выкат

- [ ] **Step 1: Полный прогон на ноде**

```bash
WT=~/Downloads/spirits_front/.worktrees/assistant-deeplink
git -C "$WT" push -q -u origin feat/assistant-deeplink
SHA=$(git -C "$WT" rev-parse HEAD)
ssh dv@85.192.61.231 "git -C ~/ci/spirits_front fetch -q origin && (git -C ~/ci/spirits_front worktree add --detach ~/ci/wt/assistant-deeplink $SHA 2>/dev/null || git -C ~/ci/wt/assistant-deeplink checkout -q --detach $SHA) && cd ~/ci/wt/assistant-deeplink && source ~/.nvm/nvm.sh && pnpm install --frozen-lockfile >/dev/null 2>&1; (pnpm test > /tmp/dl-test.log 2>&1 && echo TESTS_OK || echo TESTS_FAILED); tail -6 /tmp/dl-test.log; (pnpm build > /tmp/dl-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); echo \"tsc errors: \$(pnpm typecheck 2>&1 | grep -c 'error TS')\""
```

Вывод — в файлы, а не в конвейер с `tail`: конвейер вернул бы код `tail`, и красные тесты выглядели бы прошедшими.

Expected: `TESTS_OK`, `BUILD_OK`; число ошибок `tsc` не больше, чем на `main` (на 25.09 там было 45 старых — сверить той же командой с `origin/main` вместо `$SHA`).

- [ ] **Step 2: Слить в main (без общего чекаута)**

```bash
cd ~/Downloads/spirits_front/.worktrees/assistant-deeplink
git fetch -q origin
git checkout -q --detach origin/main
git merge --no-ff feat/assistant-deeplink -m "Merge feat/assistant-deeplink: ассистент со страницы linkeon.io переживает вход

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push origin HEAD:main
```

В общем чекауте `~/Downloads/spirits_front` ничего не менять: там могут работать другие сессии.

- [ ] **Step 3: СТОП — согласие владельца на выкат на test**

Спросить владельца. Напомнить: `deploy.sh` без явного «да» не запускается; раскатку может вести другая сессия.

- [ ] **Step 4: Выкат только на test**

```bash
CLONE=$(mktemp -d)/spirits_front
git clone -q --branch main git@github.com:dvvolkovv/spirits.git "$CLONE"
mkdir -p ~/deploy-logs
cd ~/Downloads/spirits_back
( TEST_ONLY=1 FRONT_ONLY=1 LOCAL_FRONT_DIR="$CLONE" nohup bash scripts/deploy.sh > ~/deploy-logs/assistant-deeplink-test.log 2>&1 < /dev/null & )
```

Чистый клон — потому что `deploy.sh` пушит локальную `main` фронта, а в общем чекауте может лежать чужой незапушенный коммит. Следить за логом Monitor-ом, без `| tail` в самой команде запуска. Итог — `ALL SMOKE LAYERS GREEN` / `ALL PHASES GREEN`.

- [ ] **Step 5: Живая проверка на test.linkeon.io**

На ноде создать `/tmp/e2e-assistant-deeplink.cjs`:

Скрипт (Playwright, в репозиторий не кладётся): новый номер из тестового диапазона входит через
отладочный код на test.linkeon.io, открывает `/chat?assistant=14` и проверяет, что экран выбора тем
не показан, а приветствие пришло от Райи; результат — JSON `{phone, pickerShown, greeting}` и скриншот.

Run: `ssh dv@85.192.61.231 'set -a; . ~/dev/spirits_back/scripts/test-server.env.local; set +a; source ~/.nvm/nvm.sh; BASIC_AUTH="$TEST_BASIC_AUTH" NODE_PATH=~/dev/spirits_back/tests/node_modules node /tmp/e2e-assistant-deeplink.cjs'`

Expected: `{"phone":"790300…","pickerShown":0,"greeting":1}` и код выхода 0. Скриншот `/tmp/e2e-assistant-deeplink.png` забрать на мак (`scp dv@85.192.61.231:/tmp/e2e-assistant-deeplink.png <scratchpad>/`) и посмотреть: чат с Райей, её приветствие.

- [ ] **Step 6: СТОП — согласие владельца на прод**

Показать результат Step 5. Спросить про флаги: правило владельца — `deploy.sh` без флагов; предложить `FRONT_ONLY=1`, потому что меняется только фронт, а перезапуск API рвёт живые разговоры. Перед запуском проверить, что нет идущих разговоров: `curl -s https://my.linkeon.io/webhook/chat/active-streams`.

- [ ] **Step 7: Выкат на прод**

```bash
CLONE=$(mktemp -d)/spirits_front
git clone -q --branch main git@github.com:dvvolkovv/spirits.git "$CLONE"
cd ~/Downloads/spirits_back
( FRONT_ONLY=1 LOCAL_FRONT_DIR="$CLONE" nohup bash scripts/deploy.sh > ~/deploy-logs/assistant-deeplink.log 2>&1 < /dev/null & )
```

(флаги — как решил владелец; клон свежий, потому что между Step 4 и этим шагом в `main` могли влить чужое). Итог — `ALL PHASES GREEN`. Проверить, что код доехал: в собранном бандле прода есть новый ключ — `ssh dvolkov@212.113.106.202 'grep -l pending_assistant /home/dvolkov/spirits_front/dist/assets/*.js | head -1'` → один файл.

---

### Task 24: Лендинг — проверка перед выкатом

- [ ] **Step 1: Ветка догнала main и всё зелёное**

```bash
cd ~/Downloads/land_linkeon/.worktrees/assistant-pages
git fetch -q origin && git merge -q origin/main   # если в main лендинга появилось новое
bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm test:unit && node scripts/check-locales.mjs && pnpm build > /tmp/ap-build.log 2>&1 && grep "assistants:" /tmp/ap-build.log && CI=1 pnpm test'
node scripts/check-assistants.mjs
```

Expected: всё зелёное; семь строк `✅ <код>/assistants`; сверка имён `✅`.

- [ ] **Step 2: Скриншоты для владельца**

```bash
bash ~/Downloads/land_linkeon/.superpowers/assistant-pages/node-run.sh 'pnpm build >/dev/null && (pnpm preview --port 4173 >/dev/null 2>&1 &) && sleep 3 && for p in assistants/raya/ assistants/ assistants/alexey/ en/assistants/raya/; do f=$(echo $p | tr / _); pnpm exec playwright screenshot --full-page --viewport-size=390,844 "http://localhost:4173/$p" "/tmp/ap-390-$f.png"; pnpm exec playwright screenshot --full-page --viewport-size=1280,800 "http://localhost:4173/$p" "/tmp/ap-1280-$f.png"; done; fuser -k 4173/tcp || true'
mkdir -p ~/Downloads/land_linkeon/.superpowers/assistant-pages/shots
scp 'dv@85.192.61.231:/tmp/ap-*.png' ~/Downloads/land_linkeon/.superpowers/assistant-pages/shots/
```

Посмотреть самому: ничего не наезжает на 390 px, нет горизонтальной прокрутки, аватары на месте, кнопка видна на первом экране.

- [ ] **Step 3: СТОП — взгляд владельца**

Показать владельцу скриншоты (путь к папке) и ссылку на ветку. Правки — отдельными коммитами с повтором Step 1.

---

### Task 25: Лендинг — слияние и выкат

Требует выкаченного кабинета (Task 23): иначе новички со страниц будут попадать на экран выбора темы.

- [ ] **Step 1: Слить в main**

```bash
cd ~/Downloads/land_linkeon
git status -sb                      # чистое дерево на main; иначе — разобраться, чьё
git fetch -q origin
git merge --ff-only origin/main     # если main лендинга ушёл вперёд
git merge --no-ff feat/assistant-pages -m "Merge feat/assistant-pages: страницы ассистентов и каталог на семи языках

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push origin main
git push origin --delete ci/assistant-pages
```

- [ ] **Step 2: СТОП — согласие владельца на выкат лендинга**

- [ ] **Step 3: Выкат**

```bash
mkdir -p ~/deploy-logs
cd ~/Downloads/spirits_back
( LANDING_ONLY=1 nohup bash scripts/deploy.sh > ~/deploy-logs/assistant-pages-landing.log 2>&1 < /dev/null & )
```

Фаза test у лендинга отсутствует — её роль сыграл Task 24. API не перезапускается. Итог в логе — зелёный smoke лендинга.

- [ ] **Step 4: Проверка на проде по содержимому**

```bash
for p in /assistants/ /assistants/raya/ /assistants/olia/ /en/assistants/raya/ /zh/assistants/alexey/ /pt/assistants/; do
  echo "== $p"; curl -s "https://linkeon.io$p" | grep -o -E '<html lang="[a-z]+"|<h1[^>]*>[^<]{0,80}' | head -2
done
curl -s -o /dev/null -w '%{http_code} → %{redirect_url}\n' https://linkeon.io/assistants/raya
curl -s https://linkeon.io/sitemap.xml | grep -c '/assistants/'
curl -s -o /dev/null -w '%{content_type}\n' https://linkeon.io/avatars/raya.webp
curl -s https://linkeon.io/ | grep -o 'href="/assistants/[a-z]*/*"' | sort -u | wc -l
```

`grep -c` на HTML не годится: пререндер — по сути одна длинная строка, счётчик строк дал бы 1. Поэтому уникальные ссылки считаются через `grep -o`.

Expected: у каждого адреса свой `lang` и H1 с именем или заголовком каталога (не H1 главной — значит, не SPA-фолбэк); адрес без слэша — `301 → https://linkeon.io/assistants/raya/`; в sitemap 133 строки (по строке на адрес); `image/webp`; на главной 19 разных ссылок (18 ассистентов и каталог).

---

### Task 26: После выката

- [ ] **Step 1: СТОП — шаги владельца**

Передать владельцу:
- Яндекс.Вебмастер и Google Search Console: отправить `https://linkeon.io/sitemap.xml` на переобход; в Вебмастере — «Переобход страниц» для `/assistants/` и пары страниц.
- Метрика (счётчик 105902201): цель «JavaScript-событие» с идентификатором `assistant-start`.

- [ ] **Step 2: Как смотреть результат через 4–8 недель**

Дописать в спеку (раздел «Как поймём, что сработало») готовые запросы. Таблица `events` (`ts`, `name`, `props jsonb`, `source`) и колонки `signup_source`/`signup_campaign` в `ai_profiles_consolidated` — на проде; подключение — как в скрипте выгрузки промптов (он вне репозитория, у владельца). Каждый запрос один раз выполнить на проде сразу после выката: он должен вернуть хотя бы собственные проверочные заходы, а не ошибку.

```sql
-- заходы на страницы ассистентов: путь × источник, 30 дней
select props->>'path' as path, source, count(*)
from events
where name = 'landing_view' and ts > now() - interval '30 days'
  and props->>'path' like '%/assistants/%'
group by 1, 2 order by 3 desc;

-- клики «Поговорить с …» по страницам
select props->>'path' as path, count(*)
from events
where name = 'landing_cta_click' and props->>'cta' = 'assistant-start'
  and ts > now() - interval '30 days'
group by 1 order by 2 desc;

-- регистрации со страниц ассистентов, без тестовых аккаунтов (как AdminService.excludeTest)
select signup_campaign, count(*)
from ai_profiles_consolidated
where signup_campaign like '%assistant-%'
  -- тестовые аккаунты исключить тем же списком, что AdminService.excludeTest в бэкенде
group by 1 order by 2 desc;
```

- [ ] **Step 3: Заметки в память**

Новая заметка: страницы ассистентов на linkeon.io — тексты в `land_linkeon/src/content/assistants/pages/`, реестр в `roster.data.js`, перед каждым выкатом лендинга `pnpm check-assistants`; новый ассистент в приложении = запись в реестр + страница на семи языках. Обновить заметку о лендинге (`project_linkeon_landing_repo`) ссылкой на неё.

- [ ] **Step 4: Убрать воркдеревья**

```bash
rm ~/Downloads/land_linkeon/.worktrees/assistant-pages/node_modules ~/Downloads/spirits_front/.worktrees/assistant-deeplink/node_modules
git -C ~/Downloads/land_linkeon worktree remove .worktrees/assistant-pages
git -C ~/Downloads/spirits_front worktree remove .worktrees/assistant-deeplink
ssh dv@85.192.61.231 'git -C ~/ci/land_linkeon worktree remove --force ~/ci/wt/assistant-pages; git -C ~/ci/spirits_front worktree remove --force ~/ci/wt/assistant-deeplink'
```
