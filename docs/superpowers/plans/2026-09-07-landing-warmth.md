# Тёплый голос лендинга + секция «Возможности» — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** переписать шесть секций лендинга `linkeon.io` человеческим голосом, добавить секцию с полным перечнем возможностей и матрицей каналов, заменить безымянные отзывы фрагментами настоящей переписки.

**Architecture:** весь текст живёт в `src/i18n/locales/*.json`, компоненты только рендерят. Поэтому большинство задач — это правка `ru.json` (источник правды) плюс синхронная правка шести остальных локалей, и точечные изменения разметки там, где меняется форма данных. Бренд-палитра не трогается; тепло даётся новой нейтралью `paper` и типографикой.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind, i18next (7 языков), vitest (юниты), Playwright (smoke/i18n), пререндер `scripts/prerender.mjs`.

**Спека:** [docs/superpowers/specs/2026-09-07-landing-warmth-design.md](../specs/2026-09-07-landing-warmth-design.md)

---

## Порядок и зависимости

Задачи 1–8 идут последовательно: каждая оставляет репозиторий в рабочем состоянии. Задачи 9–11 (истории) отделены сознательно — секция публикуется только после согласий авторов, вторым выкатом. Задача 12 (выкат) выполняется только по явному согласию владельца.

**Работать в ветке, не в `main`:**

```bash
cd ~/Downloads/land_linkeon
git checkout -b feat/landing-warmth
```

**Сборку и тесты гонять на тестовой ноде, не на маке** (см. Task 8) — локально допустимы только `pnpm lint` и точечный `npx vitest run <файл>`.

## Файлы

| Файл | Ответственность | Что с ним |
|---|---|---|
| `src/theme/paper.js` | кремовая нейтраль для тёплых секций | создать |
| `src/theme/paper.test.ts` | защита шкалы от правок «на глаз» | создать |
| `tailwind.config.js` | подключение шкалы | изменить |
| `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` | весь текст | изменить |
| `src/components/sections/Hero.tsx` | первый экран, 5 сегментов | изменить |
| `src/lib/useTypewriter.ts` | эффект печатной машинки | удалить |
| `src/components/sections/PersonaCTA.tsx` | развилка по персонам | изменить |
| `src/components/sections/Problem.tsx` | проблема | изменить (только фон) |
| `src/components/sections/Assistants.tsx` | список ассистентов | изменить |
| `src/components/sections/FinalCTA.tsx` | закрытие | изменить (только фон) |
| `src/components/sections/Features.tsx` | каталог возможностей + матрица | создать |
| `src/App.tsx` | порядок секций | изменить |
| `docs/features-audit-2026-09.md` | результат проверки каталога живым прогоном | создать |
| `src/components/sections/Testimonials.tsx` | истории | изменить (Task 11) |

---

### Task 1: Бумажная нейтраль

Тёплый фон нужен раньше остальных задач: на него опираются все последующие секции. Бренд-шкала при этом не должна сдвинуться ни на символ — за этим уже следит `src/theme/colors.test.ts`, новый тест устроен так же.

Отдельно проверяется контраст. Ступень `paper-600` используется дальше на мелком тексте (`text-xs`/`text-sm`) поверх `paper-50` и `paper-100` — в подписях героя, ролях ассистентов, шапке матрицы и подписях историй. Значит она обязана проходить WCAG AA (4.5:1) на обоих фонах, и это фиксируется тестом: иначе следующий, кто подкрутит шкалу на глаз, получит зелёные тесты и нечитаемую страницу.

**Files:**
- Create: `src/theme/paper.js`
- Create: `src/theme/paper.test.ts`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Написать падающий тест**

Создать `src/theme/paper.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { paper } from './paper.js';
import { brand } from './colors.js';

// Шкала «бумага» — единственная нейтраль тёплых секций. Тест держит две вещи:
// форму (все ступени на месте и валидны) и границу с брендом (кремовый фон не
// должен незаметно превратиться в зелёный или наоборот).
describe('paper', () => {
  it('покрывает все ступени валидными hex-значениями', () => {
    for (const step of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
      expect(paper[step], `ступень ${step}`).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it('светлеет от 900 к 50', () => {
    const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    for (let i = 1; i < steps.length; i++) {
      expect(lum(paper[steps[i]]), `${steps[i]} темнее ${steps[i - 1]}`).toBeLessThan(lum(paper[steps[i - 1]]));
    }
  });

  it('не пересекается с бренд-шкалой', () => {
    const brandValues = new Set(Object.values(brand));
    for (const value of Object.values(paper)) {
      expect(brandValues.has(value), `${value} есть и в brand`).toBe(false);
    }
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run src/theme/paper.test.ts`
Expected: FAIL — `Failed to resolve import "./paper.js"`

- [ ] **Step 3: Создать шкалу**

Создать `src/theme/paper.js`:

```js
/**
 * Кремовая нейтраль тёплых секций лендинга.
 *
 * Существует отдельно от `colors.js` сознательно: та шкала повторяет палитру
 * приложения и правится только вместе с ним, эта — собственность лендинга.
 * Бренд (кнопки, акценты) остаётся прежним; «бумага» заменяет белый и gray-50
 * в фонах Hero, PersonaCTA, Problem, Assistants, Testimonials и FinalCTA.
 *
 * Обычный .js, а не .ts: этот файл читает tailwind.config.js.
 */
export const paper = {
  50: '#fffdf9',
  100: '#fbf8f3',
  200: '#f5efe4',
  300: '#ece3d4',
  400: '#ddd3c4',
  500: '#c9b99a',
  600: '#7a6a52',
  700: '#57534e',
  800: '#3f3a34',
  900: '#292524',
};
```

Создать `src/theme/paper.d.ts` (рядом с `colors.d.ts`, тем же приёмом — иначе TS не увидит типов у `.js`):

```ts
export declare const paper: Record<number, string>;
```

- [ ] **Step 4: Убедиться, что тест проходит**

Run: `npx vitest run src/theme/paper.test.ts`
Expected: PASS, 3 теста

- [ ] **Step 5: Подключить шкалу в Tailwind**

В `tailwind.config.js` заменить блок импорта и `colors`:

```js
/** @type {import('tailwindcss').Config} */
import { brand } from './src/theme/colors.js';
import { paper } from './src/theme/paper.js';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: { brand, paper },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 6: Добавить тест на контраст**

Дописать в `src/theme/paper.test.ts` проверку, что ступени 600–900 дают не меньше 4.5:1 на фонах `paper-50` и `paper-100`. Формулу WCAG считать честно: линеаризовать каждый канал sRGB (`c/12.92` при `c <= 0.04045`, иначе `((c+0.055)/1.055) ** 2.4`), взвесить 0.2126/0.7152/0.0722, затем `(светлее + 0.05) / (темнее + 0.05)`. Сумму каналов из теста на порядок ступеней переиспользовать нельзя — для порядка она годится, для контраста врёт.

Перед тем как двигаться дальше — сломать тест нарочно: временно вернуть `paper-600` в `#8a7b63` (4.06:1) и убедиться, что тест краснеет и называет виноватую пару. Зелёный тест, который не видели красным, ничего не доказывает.

- [ ] **Step 7: Проверить, что бренд не сдвинулся и типы целы**

Run: `npx vitest run src/theme/ && pnpm typecheck`
Expected: PASS — `colors.test.ts` и `paper.test.ts` зелёные, `tsc` без ошибок

- [ ] **Step 8: Коммит**

```bash
git add src/theme/paper.js src/theme/paper.d.ts src/theme/paper.test.ts tailwind.config.js
git commit -m "feat(theme): кремовая нейтраль paper для тёплых секций"
```

---

### Task 2: Hero — человеческий голос, без ротации

Самая тяжёлая из текстовых задач: первых экранов пять (`hero`, `hero.biz`, `hero.creator`, `hero.assistant`, `hero.video`), какой показать — решает `?seg=` в ссылке из рекламы. Переписать только дефолтный означало бы отправить человека с объявления в старый тон.

Форма локали меняется: исчезают `h1Part1`/`h1Part2`/`h1Rotating`/`chips`, появляются `h1`/`h1Accent`. Одинаково во всех пяти вариантах и всех семи языках — иначе `locales.structure.test.ts` красный.

**Files:**
- Modify: `src/i18n/locales/ru.json` (ветка `hero`)
- Modify: `src/i18n/locales/{en,es,de,fr,pt,zh}.json` (ветка `hero`)
- Modify: `src/components/sections/Hero.tsx`
- Delete: `src/lib/useTypewriter.ts`

- [ ] **Step 1: Переписать русский текст**

В `src/i18n/locales/ru.json` заменить ветку `hero` целиком на:

```json
  "hero": {
    "eyebrow": "Linkeon",
    "h1": "Вам не обязательно",
    "h1Accent": "разбираться во всём одному",
    "sub": "Договор, налоги, текст для клиентов, разговор, который вы откладываете вторую неделю. Расскажите своими словами — даже если формулировка так себе. Рядом окажется тот, кто в этом разбирается, и вернёт готовое.",
    "ctaStart": "Начать — это бесплатно",
    "ctaLogin": "Войти",
    "trust": "Первые разговоры за наш счёт. Карту не спрашиваем.",
    "privacy": "Переписку не продаём и не используем для рекламы. Обработка — у AI-провайдеров.",
    "badge": {
      "title": "Ассистент",
      "status": "на связи"
    },
    "biz": {
      "eyebrow": "Для дела",
      "h1": "Договор, налоги, продвижение —",
      "h1Accent": "есть с кем разобрать",
      "sub": "Юрист прочитает договор целиком и скажет, где вас могут подставить. Бухгалтер посчитает, сколько вы должны на самом деле. Маркетолог напишет то, что вы откладываете. Приходите с тем, что есть.",
      "ctaStart": "Принести задачу"
    },
    "creator": {
      "eyebrow": "Для тех, кто делает контент",
      "h1": "Идея у вас уже есть —",
      "h1Accent": "остальное соберём",
      "sub": "Текст, картинка, ролик, план на неделю вперёд. Юлия спрашивает, про что и для кого, и приносит готовое. Переделать можно сколько угодно раз.",
      "ctaStart": "Показать идею"
    },
    "assistant": {
      "eyebrow": "Личный помощник",
      "h1": "Письмо, текст, план —",
      "h1Accent": "не обязательно писать самому",
      "sub": "Роман берётся за всё: деловые письма, документы, посты, тексты, идеи. Скажите своими словами, что нужно, — он уточнит остальное сам.",
      "ctaStart": "Начать — это бесплатно"
    },
    "video": {
      "eyebrow": "Короткие видео",
      "h1": "Ролик из одной идеи —",
      "h1Accent": "без съёмок и монтажа",
      "sub": "Юлия придумает сценарий, соберёт кадры и сведёт ролик для Reels, Shorts или TikTok. Стартового подарка хватает на первое видео.",
      "ctaStart": "Сделать ролик"
    }
  },
```

Что ушло и почему: `h1Rotating` перечислял товар там, где заголовок должен обращаться к человеку; `chips` были эмодзи-плашками; `hero.trust` со счётчиком токенов и `🎁` переехал по смыслу в FinalCTA (Task 6), здесь остаётся человеческая формулировка; `badge.title` «AI-ассистент» → «Ассистент», `badge.status` «онлайн · отвечает» → «на связи».

- [ ] **Step 2: Убедиться, что структурный тест покраснел**

Run: `npx vitest run src/i18n/locales.structure.test.ts`
Expected: FAIL — сообщения вида `hero.h1Rotating: ожидался ...` и `hero.biz.chips: ...`: в шести локалях форма ещё старая. Это ожидаемо и чинится Step 3.

- [ ] **Step 3: Перевести ветку `hero` на шесть языков**

Для каждого из `en, es, de, fr, pt, zh` заменить ветку `hero` на структурно идентичную русской: те же ключи, те же пять вариантов, без `h1Rotating` и `chips`.

Правила перевода (это не механическая работа — от неё зависит весь смысл задачи):

- Переводить смысл, а не слова. «Даже если формулировка так себе» — это разрешение прийти неподготовленным; в английском это `even if it comes out messy`, а не `even if the wording is so-so`.
- Держать обращение на «вы» в языках, где есть различие (de: `Sie`, fr: `vous`, es: `usted`, pt: `você`).
- `h1` + `h1Accent` склеиваются пробелом в одну строку — проверить, что в целевом языке порядок слов не ломается и акцент не оказывается в середине придаточного.
- Не удлинять `h1` больше чем в полтора раза от русского: он набран крупным кеглем и переносится на мобильном.
- Никаких эмодзи.
- Не использовать `scripts/translate-locales`: без `ANTHROPIC_API_KEY` он не работает, а работал бы — переписал бы локаль целиком.

- [ ] **Step 4: Проверить структуру и полноту**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales`
Expected: оба PASS

- [ ] **Step 5: Переписать компонент**

Заменить `src/components/sections/Hero.tsx` целиком:

```tsx
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';

export default function Hero() {
  const { t } = useTranslation();

  // Сегментный первый экран: ссылка из рекламной кампании несёт ?seg=<персона>,
  // и hero говорит сразу на языке этой персоны. Цены/CTA те же — отличается
  // только подача (f070368b). seg влияет только на отображение.
  const SEGMENTS = ['biz', 'creator', 'assistant', 'video'];
  const rawSeg = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('seg')
    : null;
  const segKey = rawSeg && SEGMENTS.includes(rawSeg) ? rawSeg : null;
  // Динамический ключ i18n под выбранный сегмент (ключи hero.biz.* и т.д.).
  const segT = (suffix: string): string => t(`hero.${segKey}.${suffix}` as never);
  const at = (suffix: string): string => (segKey ? segT(suffix) : t(`hero.${suffix}` as never));

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen pt-24 md:pt-28 pb-16 overflow-x-clip bg-paper-100"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <div className="relative z-10 min-w-0">
          <FadeIn>
            <Eyebrow className="mb-6">{at('eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={80}>
            <h1
              id="hero-title"
              className="text-[2rem] leading-[1.2] sm:text-5xl md:text-6xl font-medium tracking-tight text-paper-900 mb-6 text-balance"
            >
              {at('h1')}{' '}
              <span className="text-brand-700">{at('h1Accent')}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg md:text-xl leading-relaxed text-paper-700 max-w-xl mb-8">{at('sub')}</p>
          </FadeIn>
          <FadeIn delay={220}>
            {/* Один основной CTA для холодного трафика: вторая кнопка «Войти»
                размывала действие — вход остаётся в шапке. Risk-reversal стоит
                прямо под кнопкой, в точке принятия решения. */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Button variant="primary" size="lg" href={appUrl()} dataCta="hero-start">{at('ctaStart')}</Button>
            </div>
            <p className="text-sm text-paper-600 mb-6">{t('hero.trust')}</p>
          </FadeIn>
          <FadeIn delay={280}>
            <p className="text-sm text-paper-600">{t('hero.privacy')}</p>
          </FadeIn>
        </div>

        <FadeIn delay={320}>
          <div className="relative">
            <ScreenshotFrame url="my.linkeon.io/chat">
              <video
                src="/screenshots/hero-loop.mp4"
                poster="/screenshots/hero-chat.webp"
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full object-cover bg-paper-200"
                aria-hidden="true"
              >
                <img src="/screenshots/hero-chat.webp" alt="" className="w-full h-full object-cover" />
              </video>
            </ScreenshotFrame>
            <div className="absolute -bottom-6 left-2 sm:-left-4 bg-paper-50 border border-paper-300 rounded-xl shadow-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <p className="text-xs text-paper-600">{t('hero.badge.title')}</p>
                <p className="text-sm font-semibold text-paper-900 flex items-center gap-2">
                  {t('hero.badge.status')}
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

Изменилось: ушли `useMemo`, `useTypewriter`, резервирование ширины под самую длинную фразу, `GradientOrb`, блок чипсов; вес заголовка `font-semibold` → `font-medium`, размер `md:text-7xl` → `md:text-6xl`, межстрочный `leading-tight` → `leading-[1.2]`; `gray-*` → `paper-*`; ветвление `segKey ? ... : ...` в разметке заменено хелпером `at()` — форма локали теперь одинакова у всех пяти вариантов, и две копии `<h1>` больше не нужны.

- [ ] **Step 6: Удалить осиротевший хук**

`useTypewriter` использовался только в Hero — проверить это и удалить:

```bash
grep -rn "useTypewriter" src --include="*.tsx" --include="*.ts" | grep -v "^src/lib/useTypewriter.ts"
```

Expected: пусто. Затем:

```bash
git rm src/lib/useTypewriter.ts
```

- [ ] **Step 7: Проверить типы, линт и юниты**

Run: `pnpm typecheck && pnpm lint && npx vitest run`
Expected: PASS. `pnpm typecheck` обязателен: голый `tsc --noEmit` в этом проекте компилирует ноль файлов, ошибки ловит только вариант с `-p tsconfig.app.json`, который и зашит в скрипт.

- [ ] **Step 8: Коммит**

```bash
git add src/i18n/locales src/components/sections/Hero.tsx src/lib/useTypewriter.ts
git commit -m "feat(hero): человеческий голос, пять сегментов, без ротации заголовка"
```

---

### Task 3: PersonaCTA — ситуации вместо офферов

Три карточки остаются развилкой и сохраняют свои `utm_content` — меняется только текст. Форма локали не меняется, компонент почти не меняется.

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` (ветка `personaCta`)
- Modify: `src/components/sections/PersonaCTA.tsx:34-44,52-55`

- [ ] **Step 1: Переписать русский текст**

В `ru.json` заменить ветку `personaCta`:

```json
  "personaCta": {
    "eyebrow": "С чего начать",
    "h2": "Что у вас сейчас",
    "cards": {
      "business": {
        "title": "Дело, которое вы тянете сами",
        "text": "Договор, налоги, письмо, которое надо было отправить вчера. Юрист, бухгалтер и маркетолог — без найма и без записи на приём.",
        "cta": "Принести задачу"
      },
      "creator": {
        "title": "Идея, которую надо показать людям",
        "text": "Текст, картинка, ролик, план на неделю. Приносите замысел — заберёте готовое, и переделать можно сколько угодно раз.",
        "cta": "Показать идею"
      },
      "personal": {
        "title": "Разговор, который вы откладываете",
        "text": "Иногда нужно не решение, а собеседник, который не устанет слушать и не станет советовать. Первый разговор бесплатный.",
        "cta": "Начать разговор"
      }
    },
    "social": "Разговоры о деле, о работе и о себе — в одном месте, с теми, кто уже знает ваш контекст"
  },
```

- [ ] **Step 2: Перевести на шесть языков**

Те же ключи, те же правила, что в Task 2 Step 3. Отдельно: `title` карточек — назывные конструкции, в языках без такого оборота (de, zh) допустимо переформулировать в полное предложение, лишь бы не превратилось в рекламный слоган.

- [ ] **Step 3: Проверить локали**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales`
Expected: оба PASS

- [ ] **Step 4: Перевести карточки на бумажный фон**

В `src/components/sections/PersonaCTA.tsx` в строке 34 заменить классы карточки:

```tsx
            <div className="h-full flex flex-col rounded-2xl border border-paper-300 bg-paper-50 p-6 shadow-sm hover:shadow-md transition-shadow">
```

в строке 38 заголовок карточки:

```tsx
              <h3 className="text-lg font-semibold text-paper-900 mb-2">{t(`personaCta.cards.${key}.title`)}</h3>
```

в строке 39 текст:

```tsx
              <p className="text-sm text-paper-700 leading-relaxed flex-1">{t(`personaCta.cards.${key}.text`)}</p>
```

в строке 25 заголовок секции — снять лишний вес:

```tsx
          <h2 id="personacta-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 text-balance">
```

в строках 52–54 заменить комментарий и класс подписи (счётчика в тексте больше нет, комментарий про «честные цифры из БД» стал неправдой):

```tsx
      {/* Подпись под развилкой: говорит, что это одно место и один контекст,
          а не три разных продукта. */}
      <FadeIn delay={400}>
        <p className="mt-8 text-center text-sm text-paper-600">{t('personaCta.social')}</p>
      </FadeIn>
```

- [ ] **Step 5: Проверить**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS

- [ ] **Step 6: Коммит**

```bash
git add src/i18n/locales src/components/sections/PersonaCTA.tsx
git commit -m "feat(persona-cta): ситуации вместо офферов"
```

---

### Task 4: Problem — сцены вместо экономики найма

Пункт про фонд оплаты труда («300–500 тыс. ₽/мес») обращается к работодателю, а не к человеку, которому тяжело. Форма локали не меняется.

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` (ветка `problem`)
- Modify: `src/components/sections/Problem.tsx:14,17,27-31,37`

- [ ] **Step 1: Переписать русский текст**

В `ru.json` заменить ветку `problem`:

```json
  "problem": {
    "eyebrow": "Как это обычно бывает",
    "h2": "Дел больше, чем одного человека",
    "items": [
      {
        "title": "Мелочи забирают день",
        "text": "Ответить клиенту, дописать пост, вычитать договор. К вечеру сделано много, а то, ради чего всё затевалось, не сдвинулось."
      },
      {
        "title": "Спросить некого",
        "text": "Вопрос на пять минут, но задать его некому: юрист занят, бухгалтер ответит завтра, а решать надо сейчас."
      },
      {
        "title": "Каждый раз объяснять сначала",
        "text": "Десять вкладок и десять сервисов, и в каждом вы заново рассказываете, кто вы и чем занимаетесь."
      }
    ],
    "footer": "Linkeon собирает это в одном месте: ассистенты делают работу, а то, что вы однажды рассказали, помнят все."
  },
```

- [ ] **Step 2: Перевести на шесть языков**

Правила из Task 2 Step 3. Отдельно: в `items[0].text` важна интонация усталости, а не жалобы — если в целевом языке буквальный перевод звучит нытьём, переформулировать.

- [ ] **Step 3: Проверить локали**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales`
Expected: оба PASS

- [ ] **Step 4: Перевести секцию на бумагу**

В `src/components/sections/Problem.tsx` строка 14:

```tsx
    <Section id="problem" ariaLabelledby="problem-heading" className="bg-paper-50 border-y border-paper-300">
```

строка 17:

```tsx
        <h2 id="problem-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 text-balance max-w-3xl mx-auto">
```

строки 27–31:

```tsx
              <div className="inline-flex p-3 rounded-xl bg-paper-200 mb-4">
                <Icon aria-hidden="true" className="w-6 h-6 text-paper-700" />
              </div>
              <h3 className="text-xl font-semibold text-paper-900 mb-2">{it.title}</h3>
              <p className="text-paper-700 leading-relaxed">{it.text}</p>
```

строка 37:

```tsx
      <FadeIn delay={400} className="mt-16 text-center max-w-2xl mx-auto text-lg text-paper-700">
```

- [ ] **Step 5: Проверить**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS

- [ ] **Step 6: Коммит**

```bash
git add src/i18n/locales src/components/sections/Problem.tsx
git commit -m "feat(problem): узнаваемые сцены вместо экономики найма"
```

---

### Task 5: Assistants — каждый говорит сам за себя

Меняется форма данных: к `name` и `role` добавляется `quote`. Карточек по-прежнему шесть, кнопка «посмотреть всех» остаётся.

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` (ветка `assistants`)
- Modify: `src/components/sections/Assistants.tsx:13,20-40,42-44`

- [ ] **Step 1: Переписать русский текст**

В `ru.json` заменить ветку `assistants`:

```json
  "assistants": {
    "eyebrow": "Кто рядом",
    "h2": "С кем вы будете разговаривать",
    "sub": "У каждого своя специальность и своя манера. Рассказываете один раз — помнят все.",
    "list": [
      {
        "name": "Роман",
        "role": "универсал",
        "quote": "Приносите как есть — файлом, голосовым, сумбуром. Разберусь, а если это не моя тема, позову того, кто в ней сильнее."
      },
      {
        "name": "Александра",
        "role": "маркетолог",
        "quote": "Сначала скажите, кому вы это продаёте. Без этого любой текст будет красивым и бесполезным."
      },
      {
        "name": "Алексей",
        "role": "юрист",
        "quote": "Покажите договор целиком. Скажу прямо, где вас могут подставить, и что просить переписать."
      },
      {
        "name": "Анна",
        "role": "бухгалтер",
        "quote": "Без паники. Считаем, сколько вы должны на самом деле, и закрываем по одному."
      },
      {
        "name": "Ирина",
        "role": "HR",
        "quote": "Расскажите, какого человека вам не хватает. Вакансию и вопросы к собеседованию соберу сама."
      },
      {
        "name": "Миша",
        "role": "коуч",
        "quote": "Давайте не с задач. С того, почему вы это откладываете вторую неделю."
      }
    ],
    "cta": "Познакомиться со всеми"
  },
```

Имя и роль разделены (`«Роман, универсал»` → `name: "Роман"`, `role: "универсал"`): в карточке они теперь на разных строках, а склейка запятой в русском и в китайском выглядит по-разному.

- [ ] **Step 2: Убедиться, что структурный тест покраснел**

Run: `npx vitest run src/i18n/locales.structure.test.ts`
Expected: FAIL — `assistants.list[0]: ожидался объект с полями name, role, quote`

- [ ] **Step 3: Перевести на шесть языков**

Реплики — самая тонкая часть всей работы: в них и есть характер. Правила:

- Переводить как прямую речь живого человека, а не как описание услуги.
- Сохранять разницу между персонажами: Алексей резкий и прямой, Анна успокаивает, Миша задаёт вопросы вместо ответов, Александра требовательная.
- Имена в `zh` писать той же транслитерацией, что использует приложение, а не кириллицей и не произвольной латиницей. Сверить с `spirits_back/src/agents/`: имя на лендинге должно совпасть с именем, которое человек увидит после входа, иначе он не найдёт того, кого ему пообещали.
- Длина реплики — не больше двух строк в карточке шириной около 280px.

- [ ] **Step 4: Проверить локали**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales`
Expected: оба PASS

- [ ] **Step 5: Переписать карточки**

В `src/components/sections/Assistants.tsx` строка 13:

```tsx
  const list = t('assistants.list', { returnObjects: true }) as { name: string; role: string; quote: string }[];
```

строки 20–40 заменить на:

```tsx
          <h2 id="assistants-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance">
            {t('assistants.h2')}
          </h2>
          <p className="text-lg text-paper-700 mb-8 max-w-xl">{t('assistants.sub')}</p>

          <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,minmax(0,1fr))] gap-3 mb-8">
            {list.map((a, i) => {
              const Icon = ICONS[i];
              return (
                <div key={a.name} className="min-w-0 flex flex-col gap-2 p-4 rounded-xl border border-paper-300 bg-paper-50">
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
                </div>
              );
            })}
          </div>
```

строка 42 — цвет ссылки под бумагу:

```tsx
          <a href={appUrl()} data-cta="assistants-link" className="inline-flex items-center gap-1 py-2 min-h-11 text-brand-800 hover:text-brand-900 font-semibold text-sm">
```

(класс не меняется — бренд на бумаге читается; строка приведена, чтобы её не тронули по инерции).

Строка 53 — фон видео:

```tsx
              className="w-full h-full object-cover bg-paper-200"
```

- [ ] **Step 6: Проверить**

Run: `pnpm typecheck && pnpm lint && npx vitest run`
Expected: PASS

- [ ] **Step 7: Коммит**

```bash
git add src/i18n/locales src/components/sections/Assistants.tsx
git commit -m "feat(assistants): реплики от первого лица вместо перечня навыков"
```

---

### Task 6: FinalCTA — человеческое закрытие

Здесь цифры и условия уместны: человек дочитал и решает. Форма локали не меняется.

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` (ветка `finalCta`)
- Modify: `src/components/sections/FinalCTA.tsx:13-15`

- [ ] **Step 1: Переписать русский текст**

В `ru.json` заменить ветку `finalCta`:

```json
  "finalCta": {
    "h2": "Попробуйте на чём-нибудь настоящем",
    "sub": "Не на тестовом вопросе — на задаче, которая правда висит. Вход через Яндекс или Google, 25 000 токенов в подарок, карта не нужна.",
    "ctaStart": "Начать бесплатно",
    "ctaLogin": "Войти",
    "trust": "Без подписки · токены не сгорают · удалить аккаунт можно в один клик"
  },
```

- [ ] **Step 2: Перевести на шесть языков**

Правила из Task 2 Step 3. `sub` содержит единственные цифры этой части страницы — их сохранять точно, не округлять и не убирать.

- [ ] **Step 3: Проверить локали**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales`
Expected: оба PASS

- [ ] **Step 4: Убрать орб и сбавить вес заголовка**

В `src/components/sections/FinalCTA.tsx` заменить строки 13–17 на:

```tsx
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 text-white text-center py-20 px-8">
          <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-balance">
            {t('finalCta.h2')}
          </h2>
```

и удалить импорт `GradientOrb` (строка 3), если он больше нигде в файле не используется — проверить:

```bash
grep -n "GradientOrb" src/components/sections/FinalCTA.tsx
```

Expected после правки: только строка импорта, которую и надо удалить.

- [ ] **Step 5: Проверить**

Run: `pnpm typecheck && pnpm lint`
Expected: PASS — `eslint` поймает неиспользованный импорт, если его забыли убрать

- [ ] **Step 6: Коммит**

```bash
git add src/i18n/locales src/components/sections/FinalCTA.tsx
git commit -m "feat(final-cta): человеческое закрытие вместо «собери свой AI-отдел»"
```

---

### Task 7: Секция «Возможности»

Новая секция: четыре группы возможностей и матрица каналов. Встаёт между `UseCases` и `Testimonials` — каталог попадает в деловую середину, истории остаются последними перед ценой.

Тон здесь деловой: человек сканирует, а не читает. Из тёплых правил действуют только два — без эмодзи и без превосходных степеней.

**Содержимое этой задачи — черновик, собранный по роутам и модулям. Он не проверен и в таком виде на прод не идёт**: проверка — Task 8, и она может вычеркнуть половину строк.

**Files:**
- Create: `src/components/sections/Features.tsx`
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` (новая ветка `features`)
- Modify: `src/App.tsx:11-13,26-28`

- [ ] **Step 1: Добавить русский текст**

В `ru.json` добавить ветку `features` (расположить между `useCases` и `testimonials`, чтобы порядок в файле повторял порядок на странице):

```json
  "features": {
    "eyebrow": "Возможности",
    "h2": "Что входит в Linkeon",
    "sub": "Один аккаунт и один баланс. Всё перечисленное доступно сразу после входа.",
    "groups": [
      {
        "title": "Разговор и работа с документами",
        "items": [
          "16 ассистентов, у каждого своя специальность",
          "Файлы: PDF, таблицы, документы — читает целиком и возвращает готовый файл",
          "Поиск в интернете и расчёты внутри задачи",
          "Свои ассистенты: собрать специалиста под свою работу",
          "Голосовой ввод: надиктовать вместо того, чтобы печатать",
          "Голосовой звонок: поговорить вслух, а не перепиской"
        ]
      },
      {
        "title": "Контент",
        "items": [
          "Тексты, посты, письма, контент-планы",
          "Картинки по описанию или по вашему фото",
          "Видео: сценарий, кадры и сборка ролика",
          "Подключение соцсетей и публикация из Linkeon",
          "Кампании и сценарии для регулярного постинга"
        ]
      },
      {
        "title": "Люди",
        "items": [
          "Единый профиль: контекст, общий для всех ассистентов",
          "Поиск людей по ценностям и целям",
          "Оценка совместимости перед знакомством",
          "Заявки на контакт и переписка внутри Linkeon",
          "Комнаты: встреча по ссылке, с ассистентом внутри"
        ]
      },
      {
        "title": "Где это работает",
        "items": [
          "Сайт — на компьютере и на телефоне",
          "Приложение для Android",
          "Телеграм-бот и мини-приложение",
          "Свой телеграм-бот с вашим ассистентом внутри",
          "Общий баланс и общая история во всех каналах"
        ]
      }
    ],
    "matrix": {
      "title": "Где что работает",
      "note": "Таблица проверена вручную. Дата последней проверки — в подписи ниже.",
      "columns": {
        "feature": "Возможность",
        "web": "Сайт",
        "tg": "Телеграм",
        "android": "Android"
      },
      "rows": [
        { "label": "Разговор с ассистентами", "web": true, "tg": true, "android": true },
        { "label": "Файлы и документы", "web": true, "tg": true, "android": true },
        { "label": "Картинки и видео", "web": true, "tg": false, "android": true },
        { "label": "Голосовой звонок", "web": true, "tg": false, "android": true },
        { "label": "Поиск людей и совместимость", "web": true, "tg": false, "android": true },
        { "label": "Оплата токенов", "web": true, "tg": false, "android": true }
      ],
      "checked": "Проверено 07.09.2026"
    }
  },
```

- [ ] **Step 2: Написать компонент**

Создать `src/components/sections/Features.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import { Check, Minus } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

// Каталог возможностей и матрица каналов.
//
// Матрица стареет быстрее всего остального на странице: канал получает функцию —
// таблица начинает врать адресно, и это хуже, чем её отсутствие. Строка
// features.matrix.checked («Проверено ДД.ММ.ГГГГ») печатается на странице
// сознательно: устаревшая дата видна и читателю, и нам. Меняется набор каналов
// или функций — таблица перепроверяется живым прогоном, дата обновляется.
// Последняя сплошная проверка: docs/features-audit-2026-09.md

type Group = { title: string; items: string[] };
type Row = { label: string; web: boolean; tg: boolean; android: boolean };

export default function Features() {
  const { t } = useTranslation();
  const groups = t('features.groups', { returnObjects: true }) as Group[];
  const rows = t('features.matrix.rows', { returnObjects: true }) as Row[];

  const cell = (on: boolean, label: string) => (
    <td className="px-3 py-2.5 text-center border-b border-paper-200">
      {on
        ? <Check aria-label={label} className="w-4 h-4 text-brand-700 inline-block" />
        : <Minus aria-label={label} className="w-4 h-4 text-paper-400 inline-block" />}
    </td>
  );

  return (
    <Section id="features-catalog" ariaLabelledby="features-heading" className="bg-paper-100">
      <FadeIn className="max-w-2xl mb-12">
        <Eyebrow className="mb-4">{t('features.eyebrow')}</Eyebrow>
        <h2 id="features-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance">
          {t('features.h2')}
        </h2>
        <p className="text-lg text-paper-700">{t('features.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-5">
        {(Array.isArray(groups) ? groups : []).map((g, i) => (
          <FadeIn key={g.title} delay={i * 100}>
            <div className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6">
              <h3 className="text-base font-semibold text-paper-900 mb-4">{g.title}</h3>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-paper-800 leading-relaxed">
                    <Check aria-hidden="true" className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={200}>
        <h3 className="text-base font-semibold text-paper-900 mt-12 mb-4">{t('features.matrix.title')}</h3>
        {/* Таблица уезжает в горизонтальный скролл на узком экране: сжимать
            колонки до нечитаемости хуже, чем прокрутить. */}
        <div className="overflow-x-auto rounded-2xl border border-paper-300 bg-paper-50">
          <table className="w-full min-w-[480px] text-sm">
            <caption className="sr-only">{t('features.matrix.title')}</caption>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-paper-600">
                <th scope="col" className="px-4 py-3 text-left font-semibold border-b border-paper-300">{t('features.matrix.columns.feature')}</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold border-b border-paper-300">{t('features.matrix.columns.web')}</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold border-b border-paper-300">{t('features.matrix.columns.tg')}</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold border-b border-paper-300">{t('features.matrix.columns.android')}</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(rows) ? rows : []).map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-4 py-2.5 text-left font-normal text-paper-800 border-b border-paper-200">{r.label}</th>
                  {cell(r.web, t('features.matrix.columns.web'))}
                  {cell(r.tg, t('features.matrix.columns.tg'))}
                  {cell(r.android, t('features.matrix.columns.android'))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-paper-600">{t('features.matrix.checked')}</p>
      </FadeIn>
    </Section>
  );
}
```

- [ ] **Step 3: Поставить секцию на страницу**

В `src/App.tsx` добавить импорт после `import UseCases from './components/sections/UseCases';`:

```tsx
import Features from './components/sections/Features';
```

и вставить секцию между `<UseCases />` и `<Testimonials />`:

```tsx
        <UseCases />
        <Features />
        <Testimonials />
```

- [ ] **Step 4: Перевести на шесть языков**

Ветка `features` целиком. Отдельные требования:

- Булевы значения в `matrix.rows` — не переводить: они одинаковы во всех языках. Меняются только `label`.
- `checked` содержит дату — формат даты привести к принятому в целевом языке (`en`: `Verified 7 Sep 2026`, `de`: `Geprüft am 07.09.2026`).
- Названия каналов: `Telegram` и `Android` не переводить.
- «Свои ассистенты», «Свой телеграм-бот» — это названия функций продукта; сверить с тем, как они названы в интерфейсе приложения на этом языке, чтобы человек нашёл их после входа.

- [ ] **Step 5: Проверить локали и типы**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales && pnpm typecheck && pnpm lint`
Expected: всё PASS

- [ ] **Step 6: Коммит**

```bash
git add src/i18n/locales src/components/sections/Features.tsx src/App.tsx
git commit -m "feat(features): каталог возможностей и матрица каналов"
```

---

### Task 8: Проверить каталог живым прогоном

Task 7 записал на страницу список, собранный по коду. Роут и модуль не доказывают, что функция работает у обычного пользователя: она может быть за флагом, доступна только администратору, недоделана или сломана. Эта задача превращает черновик в проверенный текст.

**Правило:** непроверенная строка не публикуется. Не «оставим, наверное, работает» — вычёркиваем.

**Files:**
- Create: `docs/features-audit-2026-09.md`
- Modify: `src/i18n/locales/*.json` (ветка `features` — по результатам)
- Modify: `src/components/sections/Features.tsx` (дата в комментарии, если менялась)

- [ ] **Step 1: Завести чистый аккаунт**

Регистрация на `my.linkeon.io` обычным путём, без админских прав и без подсадки в Redis. Именно чистый: аккаунт владельца видит то, чего не видит новый пользователь.

- [ ] **Step 2: Проверить каждую строку каталога**

Для каждой из 21 строки в `features.groups` и каждой из 18 галочек матрицы (6 строк × 3 канала) выполнить действие руками и записать результат.

Создать `docs/features-audit-2026-09.md` со шляпкой и таблицей:

```markdown
# Проверка каталога возможностей — сентябрь 2026

Каждая строка секции «Возможности» на лендинге проверена живым прогоном под
чистым аккаунтом (не админ, не подсаженный). Строка публикуется только со
статусом «работает».

Аккаунт: <телефон/почта>, зарегистрирован <дата>.

| Строка каталога | Где проверял | Статус | Комментарий |
|---|---|---|---|
| 16 ассистентов, у каждого своя специальность | my.linkeon.io/chat | | |
| Файлы: PDF, таблицы, документы | my.linkeon.io/chat | | |
| Поиск в интернете и расчёты внутри задачи | my.linkeon.io/chat | | |
| Свои ассистенты | my.linkeon.io/studio | | |
| Голосовой ввод | my.linkeon.io/chat | | |
| Голосовой звонок | my.linkeon.io | | |
| Тексты, посты, письма, контент-планы | my.linkeon.io/chat | | |
| Картинки по описанию или по фото | my.linkeon.io/image-gen | | |
| Видео: сценарий, кадры, сборка | my.linkeon.io/video | | |
| Подключение соцсетей и публикация | my.linkeon.io/settings/social | | |
| Кампании и сценарии для постинга | my.linkeon.io/settings/social | | |
| Единый профиль | my.linkeon.io/profile | | |
| Поиск людей по ценностям | my.linkeon.io/search | | |
| Оценка совместимости | my.linkeon.io/search | | |
| Заявки на контакт и переписка | my.linkeon.io/contact-requests | | |
| Комнаты: встреча по ссылке | my.linkeon.io/room/<code> | | |
| Сайт на компьютере и телефоне | my.linkeon.io | | |
| Приложение для Android | APK из MinIO | | |
| Телеграм-бот и мини-приложение | @<бот> | | |
| Свой телеграм-бот | my.linkeon.io/studio?tab=bots | | |
| Общий баланс во всех каналах | веб + телеграм | | |

## Матрица каналов

| Возможность | Сайт | Телеграм | Android | Комментарий |
|---|---|---|---|---|
| Разговор с ассистентами | | | | |
| Файлы и документы | | | | |
| Картинки и видео | | | | |
| Голосовой звонок | | | | |
| Поиск людей и совместимость | | | | |
| Оплата токенов | | | | |
```

Статусы: `работает` / `не работает` / `только у админа` / `нет в этом канале`.

- [ ] **Step 3: Привести текст в соответствие с проверкой**

Вычеркнуть из `features.groups` всё, что не получило статус «работает», — во всех семи локалях. Поправить галочки матрицы. Если строк в группе стало меньше — проверить, что `locales.structure.test.ts` по-прежнему зелёный (длины массивов должны совпасть во всех языках).

- [ ] **Step 4: Обновить дату проверки**

В `features.matrix.checked` во всех локалях поставить фактическую дату проверки, а не `07.09.2026` из черновика. В `Features.tsx` в шапке комментария — ссылку на файл аудита (уже стоит, проверить, что имя файла совпало).

- [ ] **Step 5: Проверить**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales`
Expected: PASS

- [ ] **Step 6: Коммит**

```bash
git add docs/features-audit-2026-09.md src/i18n/locales src/components/sections/Features.tsx
git commit -m "fix(features): каталог приведён к результатам живой проверки"
```

---

### Task 9: Прогон на тестовой ноде

Мак не тянет полную сборку и Playwright — это решение владельца, а не рекомендация. Всё тяжёлое уезжает на `dv@85.192.61.231`, в CI-клон, а не в живой чекаут.

- [ ] **Step 1: Запушить ветку**

```bash
git push -u origin feat/landing-warmth
git rev-parse HEAD
```

Записать SHA — на ноду встаём по нему, а не по имени ветки: в общий чекаут может коммитить параллельная сессия.

- [ ] **Step 2: Снять базу на `main`**

Прежде чем мерить свою работу, надо знать, что было красным до неё:

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && git fetch -q origin && git checkout -q origin/main && source ~/.nvm/nvm.sh && pnpm install --silent && pnpm test 2>&1 | tail -30'
```

Expected: два предсуществующих падения. Записать, какие именно.

- [ ] **Step 3: Прогнать свою ветку**

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && git fetch -q origin && git checkout -q <SHA> && source ~/.nvm/nvm.sh && pnpm install --silent && pnpm test:unit && pnpm check-locales && pnpm build'
```

Expected: юниты и `check-locales` зелёные, `pnpm build` проходит вместе с пререндером.

- [ ] **Step 4: Прогнать браузерные тесты и сравнить с базой**

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && source ~/.nvm/nvm.sh && pnpm test 2>&1 | tail -30'
```

Expected: тот же набор падений, что на `main` в Step 2, и ни одного нового. Новое падение — регрессия, чинить до выката.

- [ ] **Step 5: Проверить, что текст доехал в пререндер**

Страница отдаётся статикой; правка, видимая только после гидратации, для краулера не существует. Проверять сырым HTTP, без браузера: инлайновый редирект уводит headless с `/` на `/en/`, и русский текст там искать нельзя.

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && grep -c "Что входит в Linkeon" dist/index.html && grep -c "разбираться во всём одному" dist/index.html'
```

Expected: обе команды печатают число больше нуля.

- [ ] **Step 6: Проверить проверку**

Зелёный результат сам по себе ничего не доказывает — надо убедиться, что команда вообще способна покраснеть:

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && grep -c "строки которой нет на странице" dist/index.html'
```

Expected: `0` и ненулевой код возврата. Если и это печатает единицу — grep смотрит не туда, и Step 5 ничего не проверил.

---

### Task 10: Истории — собрать кандидатов

Отсюда начинается вторая половина, которая едет отдельным выкатом. Ничего из этой задачи не публикуется.

- [ ] **Step 1: Выбрать кандидатов из прод-базы**

Найти в истории диалогов фрагменты, где видно и обстоятельства человека, и работу ассистента. Обязательный фильтр — тестовые аккаунты: номера из `TEST_PHONES` и аккаунты владельца. Без фильтра выборка будет состоять в основном из собственных прогонов, а не из пользователей.

- [ ] **Step 2: Сложить в файл для владельца**

Записать 8–10 кандидатов в `docs/stories-candidates.md` — **файл не коммитится**, он содержит переписку живых людей. Добавить его в `.gitignore`:

```bash
echo "docs/stories-candidates.md" >> .gitignore
git add .gitignore
git commit -m "chore: не коммитить черновик кандидатов в истории"
```

- [ ] **Step 3: Отдать владельцу**

Владелец выбирает, у кого спросить, и спрашивает сам. Агент не пишет пользователям.

**Здесь работа останавливается до получения согласий.** Task 11 не начинается, пока их нет.

---

### Task 11: Истории — секция (после согласий)

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json` (ветка `testimonials`)
- Modify: `src/components/sections/Testimonials.tsx`
- Create: `docs/stories-consent.md`

Пространство ключей остаётся `testimonials.*`, компонент — `Testimonials.tsx`: переименование дало бы диф на семь локалей ради косметики.

- [ ] **Step 1: Зафиксировать согласия**

Создать `docs/stories-consent.md`: кто, когда, на что согласился, в какой формулировке спрашивали. Без имён и контактов — идентификатор пользователя и дата. Это нужно, чтобы через полгода было видно, на что человек соглашался.

- [ ] **Step 2: Вычистить фрагменты**

Из каждого согласованного фрагмента убрать: суммы, названия компаний, имена контрагентов, узнаваемый город, любые реквизиты. Атрибуция — по роли («владелец кофейни»), не по имени: это действующее правило, записанное в шапке `Testimonials.tsx`, и оно сохраняется.

- [ ] **Step 3: Записать русский текст**

В `ru.json` заменить ветку `testimonials` (форма меняется: было три объекта `{quote, author}`, стало два объекта с диалогом):

```json
  "testimonials": {
    "eyebrow": "Как это звучит",
    "h2": "Фрагменты настоящих разговоров",
    "sub": "Опубликованы с разрешения авторов. Личное убрано, слова оставлены как есть.",
    "items": [
      {
        "author": "<роль автора>",
        "context": "<когда и при каких обстоятельствах>",
        "turns": [
          { "side": "user", "text": "<реплика человека>" },
          { "side": "assistant", "text": "<ответ ассистента>" },
          { "side": "user", "text": "<реплика человека>" },
          { "side": "assistant", "text": "<ответ ассистента>" }
        ],
        "consent": "Опубликовано с разрешения автора"
      },
      {
        "author": "<роль автора>",
        "context": "<когда и при каких обстоятельствах>",
        "turns": [
          { "side": "user", "text": "<реплика человека>" },
          { "side": "assistant", "text": "<ответ ассистента>" },
          { "side": "user", "text": "<реплика человека>" },
          { "side": "assistant", "text": "<ответ ассистента>" }
        ],
        "consent": "Опубликовано с разрешения автора"
      }
    ]
  },
```

Угловые скобки заполняются реальным согласованным текстом из Task 10 — это единственное место в плане, где содержимое не может быть написано заранее — оно зависит от того, что скажут живые люди. Количество реплик в `turns` должно совпасть в обоих элементах и во всех семи локалях, иначе структурный тест красный: если в одном фрагменте реплик больше, привести оба к одинаковой длине, обрезав по смыслу.

- [ ] **Step 4: Переписать компонент**

Заменить `src/components/sections/Testimonials.tsx` целиком:

```tsx
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

// Фрагменты настоящей переписки. Публикуются только с разрешения авторов
// (docs/stories-consent.md), атрибуция — по роли, без имён и данных клиентов.
// Меняются только через новые согласованные фрагменты: выдуманный диалог здесь
// был бы враньём, которое невозможно отличить от правды снаружи.
type Turn = { side: 'user' | 'assistant'; text: string };
type Item = { author: string; context: string; turns: Turn[]; consent: string };

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as Item[];

  return (
    <Section ariaLabelledby="testimonials-heading" className="bg-paper-100">
      <FadeIn className="max-w-2xl mb-12">
        <Eyebrow className="mb-4">{t('testimonials.eyebrow')}</Eyebrow>
        <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance">
          {t('testimonials.h2')}
        </h2>
        <p className="text-lg text-paper-700">{t('testimonials.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        {(Array.isArray(items) ? items : []).map((it, i) => (
          <FadeIn key={it.author + i} delay={i * 120}>
            <div className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6">
              <p className="text-xs text-paper-600 mb-4">{it.author} · {it.context}</p>
              <div className="space-y-3">
                {it.turns.map((turn, j) => (
                  <p
                    key={j}
                    className={
                      turn.side === 'user'
                        ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand-800 text-white px-4 py-2.5 text-sm leading-relaxed'
                        : 'mr-auto max-w-[92%] rounded-2xl rounded-bl-sm bg-paper-100 border border-paper-300 text-paper-900 px-4 py-2.5 text-sm leading-relaxed'
                    }
                  >
                    {turn.text}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-xs text-paper-600 italic">{it.consent}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Перевести на шесть языков**

Реплики людей переводить как живую речь, сохраняя сбивчивость оригинала: приглаженный перевод превращает документ в рекламу. `consent` — точная формулировка, без вариаций.

- [ ] **Step 6: Проверить**

Run: `npx vitest run src/i18n/locales.structure.test.ts && pnpm check-locales && pnpm typecheck && pnpm lint`
Expected: всё PASS

- [ ] **Step 7: Прогнать на ноде**

Повторить Task 9 Steps 3–6 для новой ветки.

- [ ] **Step 8: Коммит**

```bash
git add src/i18n/locales src/components/sections/Testimonials.tsx docs/stories-consent.md
git commit -m "feat(testimonials): фрагменты настоящей переписки вместо безымянных цитат"
```

---

### Task 12: Выкат

**Не выполнять без явного согласия владельца.** `deploy.sh` кладёт лендинг сразу на прод — фазы test у него нет.

- [ ] **Step 1: Влить ветку в `main`**

Прод и test катаются только из `main`:

```bash
git checkout main && git pull && git merge --no-ff feat/landing-warmth && git push origin main
```

- [ ] **Step 2: Спросить разрешение**

Убедиться, что раскатку прямо сейчас не ведёт параллельная сессия, и получить прямое «катим» от владельца.

- [ ] **Step 3: Выкатить**

Запускать отвязанно: прогон дольше лимита инструмента, а убитый процесс молча оставляет чекаут в промежуточном состоянии.

```bash
LANDING_ONLY=1 bash ~/Downloads/spirits_back/scripts/deploy.sh
```

- [ ] **Step 4: Проверить, что уехало именно то**

Проверять сырым HTTP и по содержимому, а не по коду ответа: SPA-фолбэк отдаёт 200 с HTML на любой путь, а файлы прошлых выкатов остаются на месте и зеленят проверку.

```bash
curl -s https://linkeon.io/ | grep -c "разбираться во всём одному"
curl -s https://linkeon.io/ | grep -c "Что входит в Linkeon"
```

Expected: обе больше нуля. Дополнительно открыть `https://linkeon.io/en/` и убедиться, что английская версия не осталась на старом тексте.

---

## Что осталось за рамками

- **Веб-шрифт для заголовков.** Отложен сознательно (см. спеку): сначала смотрим, хватает ли типографики. Если верх по-прежнему читается холодно — отдельная задача.
- **`spirits_front/CLAUDE.md` устарел**: в нём семь роутов, в `App.tsx` их за двадцать (студия, генерация картинок и видео, комнаты, соцсети, поддержка). Файл вводит в заблуждение — исправить отдельным коммитом в том репозитории, к этому плану не относится.
- **Середина лендинга** (Agentic, Profile, Networking, ContentEngine, HowItWorks, UseCases, Pricing, FAQ) остаётся в прежнем тоне по решению владельца.
