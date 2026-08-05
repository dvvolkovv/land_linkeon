# Лендинг: шесть языков + палитра приложения — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Довести `linkeon.io` до шести языков с индексируемыми URL и перевести его на цветовую палитру `my.linkeon.io`.

**Architecture:** Три независимые фазы. **A (цвет)** — токен `brand` в `src/theme/colors.js`, механическая замена классов, правится и побитый конфиг приложения. **B (i18n)** — реестр языков и скрипты локалей переносятся из `spirits_front`, язык определяется префиксом URL, локали грузятся лениво. **C (пререндер)** — SSR-точка входа + скрипт, который на сборке рендерит App на каждый язык в `dist/<lng>/index.html`, с hreflang и sitemap.

Фазы можно катить по отдельности: после A лендинг рабочий и перекрашенный, после B — шестиязычный на клиенте, после C — индексируемый.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Tailwind 3, i18next 26 + react-i18next 17, Playwright (e2e), vitest (юниты, добавляется в Task 1), `@anthropic-ai/sdk` (перевод локалей).

**Spec:** `docs/superpowers/specs/2026-08-05-landing-i18n-and-palette-alignment-design.md`

---

## Отклонения от спеки

Обнаружены при чтении кода уже после согласования спеки. Оба — в сторону упрощения.

1. **SSR-гварды нужны в двух файлах, а не в пяти.** Спека (§4.4) называет `track.ts`, `attribution.ts`, `vkPixel.ts`, `appUrl.ts`, `i18n/index.ts`. Фактически `track.ts` и `vkPixel.ts` импортируются только из `main.tsx`, который в граф пререндера не попадает, а `vkPixel.ts` и так закрыт гвардом. Чинятся `appUrl.ts` и `attribution.ts` (их тянут девять компонентов во время рендера); `i18n` получает отдельную серверную точку входа. `Hero.tsx` и `Footer.tsx` уже закрыты `typeof window !== 'undefined'` — проверено.

2. **Кастомный токен нужен один — `brand`.** Спека (§6.1) предполагает токены `gray`, `danger`, `warning`. Приложение использует для них штатные шкалы Tailwind (`gray`, `rose`/`red`, `amber`) без переопределения — значит и лендингу достаточно тех же штатных классов. Переопределяется только `brand`.

---

## Структура файлов

**Создаются:**

| Файл | Ответственность |
|---|---|
| `src/theme/colors.js` | Единственный источник бренд-палитры; читается `tailwind.config.js` и `ValueGraph` |
| `src/theme/colors.test.ts` | Токены совпадают со шкалой `forest` приложения |
| `src/i18n/languages.ts` | Реестр языков (копия из `spirits_front`) |
| `src/i18n/languages.test.ts` | `resolveLanguage()` схлопывает теги |
| `src/i18n/urlLanguage.ts` | Язык ↔ префикс URL |
| `src/i18n/urlLanguage.test.ts` | Разбор и построение путей |
| `src/i18n/server.ts` | Синхронный экземпляр i18n для рендера в Node |
| `src/i18n/locales/{es,de,fr,zh}.json` | Новые локали |
| `src/entry-server.tsx` | SSR-точка входа |
| `src/components/ui/LanguageBanner.tsx` | Предложение перейти на язык браузера |
| `src/content/legal/{ru,en}.tsx` | Тексты юрдоков, вынесенные из компонента |
| `scripts/locale-utils.mjs` | Чистые операции над локалями (копия) |
| `scripts/locale-utils.test.mjs` | Тесты хелперов (копия) |
| `scripts/check-locales.mjs` | Гейт паритета ключей (копия) |
| `scripts/check-locales.test.mjs` | Дубль списка языков не разъехался (копия) |
| `scripts/translate-locales.mjs` | Перевод через Claude API (копия + свой глоссарий) |
| `scripts/prerender.mjs` | Рендер шести HTML + hreflang + sitemap |
| `vitest.config.ts` | Юнит-раннер, не пересекается с Playwright |
| `tests/i18n.spec.ts` | E2E по шести URL |

**Модифицируются:** `tailwind.config.js`, `package.json`, `src/i18n/index.ts`, `src/i18n/locales/{ru,en}.json`, `src/components/ui/LangSwitcher.tsx`, `src/components/layout/LegalModal.tsx`, `src/components/sections/Pricing.tsx`, `src/components/sections/ValueGraph.tsx`, `src/lib/appUrl.ts`, `src/lib/attribution.ts`, `src/App.tsx`, `index.html`, `tests/smoke.spec.ts`, все 22 `.tsx` с цветными классами.

**Отдельный репозиторий:** `~/Downloads/spirits_front/tailwind.config.js` (Task 5).

---

## Подготовка

- [ ] **Step 1: Убедиться, что дерево чистое и актуальное**

```bash
cd ~/Downloads/land_linkeon
git status --short
git fetch origin && git status -sb
```

Expected: `git status --short` пуст, ветка `## main...origin/main` без `behind`/`ahead`.

- [ ] **Step 2: Завести рабочую ветку**

```bash
cd ~/Downloads/land_linkeon
git checkout -b feat/i18n-6-langs-and-palette
```

Expected: `Switched to a new branch 'feat/i18n-6-langs-and-palette'`

- [ ] **Step 3: Проверить, что базовые проверки зелёные ДО правок**

```bash
cd ~/Downloads/land_linkeon && pnpm install && pnpm typecheck && pnpm lint
```

Expected: обе команды без ошибок. Если что-то красное — чинить до начала работы, иначе непонятно, что сломали мы.

---

# ФАЗА A — Цвет

## Task 1: Юнит-раннер vitest

Лендинг сейчас тестируется только Playwright'ом. Юниты нужны для токенов цвета и для переносимых из приложения тестов локалей. Playwright-спеки лежат в `tests/`, поэтому vitest настраивается так, чтобы туда не заглядывать — иначе он попытается выполнить `@playwright/test` и упадёт.

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Поставить vitest**

```bash
cd ~/Downloads/land_linkeon && pnpm add -D vitest@^3.2.4
```

Expected: `+ vitest 3.2.4` в выводе.

- [ ] **Step 2: Создать конфиг**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // tests/ отдан Playwright'у: vitest там споткнётся об @playwright/test.
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.mjs'],
  },
});
```

- [ ] **Step 3: Добавить скрипты в package.json**

В `package.json` в блок `"scripts"` добавить две строки (рядом с существующим `"test"`):

```json
    "test:unit": "vitest run",
    "check-locales": "node scripts/check-locales.mjs",
```

- [ ] **Step 4: Написать проверочный тест, что раннер вообще работает**

Create `src/theme/colors.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('vitest', () => {
  it('запускается', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Запустить**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: `1 passed`

- [ ] **Step 6: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add vitest.config.ts package.json pnpm-lock.yaml src/theme/colors.test.ts
git commit -m "chore(test): добавить vitest как юнит-раннер лендинга"
```

---

## Task 2: Токены бренд-палитры

**Files:**
- Create: `src/theme/colors.js`
- Modify: `src/theme/colors.test.ts`, `tailwind.config.js`

- [ ] **Step 1: Заменить заглушечный тест на настоящий**

Replace the whole content of `src/theme/colors.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { brand } from './colors.js';

// Значения продублированы из spirits_front/tailwind.config.js (шкала forest).
// Тест существует, чтобы правка палитры лендинга «на глаз» не увела его
// от приложения молча: разъехались — падаем.
const APP_FOREST = {
  50: '#f7fdf7',
  100: '#edfaed',
  200: '#d3f4d3',
  300: '#aae8aa',
  400: '#75d675',
  500: '#4ade80',
  600: '#2dd4bf',
  700: '#0d9488',
  800: '#0f766e',
  900: '#134e4a',
};

describe('brand', () => {
  it('совпадает со шкалой forest приложения', () => {
    expect(brand).toEqual(APP_FOREST);
  });

  it('покрывает все ступени, которые использует лендинг', () => {
    for (const step of [50, 100, 200, 500, 600, 700, 800]) {
      expect(brand[step]).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});
```

- [ ] **Step 2: Запустить тест и убедиться, что он падает**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: FAIL — `Failed to resolve import "./colors.js"`

- [ ] **Step 3: Создать модуль токенов**

Create `src/theme/colors.js`:

```js
/**
 * Бренд-палитра, общая с приложением my.linkeon.io.
 *
 * Источник: шкала `forest` из spirits_front/tailwind.config.js. Обратите
 * внимание: шкала неоднородна — 50–500 зелёные, 600–900 бирюзовые. Так
 * сложилось в приложении, лендинг повторяет её один в один, чтобы CTA на
 * обоих доменах были одного цвета.
 *
 * Нейтраль (gray), ошибки (rose/red) и предупреждения (amber) берутся из
 * штатных шкал Tailwind — приложение делает так же, переопределять нечего.
 *
 * Обычный .js, а не .ts: этот файл читает tailwind.config.js.
 */
export const brand = {
  50: '#f7fdf7',
  100: '#edfaed',
  200: '#d3f4d3',
  300: '#aae8aa',
  400: '#75d675',
  500: '#4ade80',
  600: '#2dd4bf',
  700: '#0d9488',
  800: '#0f766e',
  900: '#134e4a',
};
```

- [ ] **Step 4: Объявить типы модуля**

`tailwind.config.js` — обычный JS, поэтому и токены лежат в `.js`. Но в `tsconfig.app.json` нет `allowJs`, и импорт из `.tsx` без деклараций упадёт на typecheck.

Create `src/theme/colors.d.ts`:

```ts
export declare const brand: Record<number, string>;
```

- [ ] **Step 5: Запустить тест и убедиться, что он проходит**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit && pnpm typecheck
```

Expected: `2 passed`, typecheck зелёный.

- [ ] **Step 6: Подключить токен в Tailwind**

Modify `tailwind.config.js` — добавить импорт первой строкой и блок `colors` в `extend`:

```js
/** @type {import('tailwindcss').Config} */
import { brand } from './src/theme/colors.js';

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
      colors: { brand },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 7: Проверить, что Tailwind видит токен**

```bash
cd ~/Downloads/land_linkeon && pnpm build 2>&1 | tail -5
```

Expected: сборка успешна (`✓ built in`).

- [ ] **Step 8: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/theme/colors.js src/theme/colors.d.ts src/theme/colors.test.ts tailwind.config.js
git commit -m "feat(theme): бренд-палитра общая с приложением"
```

---

## Task 3: Замена цветных классов в компонентах

Механическая правка по фиксированной таблице. Порядок замен важен: сначала длинные ступени (`slate-100`), иначе префиксные совпадения дадут мусор.

**Files:**
- Modify: все `src/components/**/*.tsx` (22 файла с цветными классами)

**Таблица замен:**

| Было | Стало |
|---|---|
| `indigo-50` | `brand-50` |
| `indigo-100` | `brand-100` |
| `indigo-200` | `brand-200` |
| `indigo-400` | `brand-500` |
| `indigo-500` | `brand-600` |
| `indigo-600` | `brand-700` |
| `indigo-700` | `brand-800` |
| `emerald-500` | `brand-500` |
| `slate-N` | `gray-N` (та же ступень) |

- [ ] **Step 1: Заменить indigo и emerald**

```bash
cd ~/Downloads/land_linkeon
files=$(grep -rl 'indigo-\|emerald-' src --include='*.tsx')
# Порядок важен: 700 и 600 раньше, чтобы не поймать префиксом.
sed -i '' \
  -e 's/indigo-700/brand-800/g' \
  -e 's/indigo-600/brand-700/g' \
  -e 's/indigo-500/brand-600/g' \
  -e 's/indigo-400/brand-500/g' \
  -e 's/indigo-200/brand-200/g' \
  -e 's/indigo-100/brand-100/g' \
  -e 's/indigo-50/brand-50/g' \
  -e 's/emerald-500/brand-500/g' \
  $files
grep -rn 'indigo-\|emerald-' src --include='*.tsx' | wc -l
```

Expected: `0`

- [ ] **Step 2: Заменить slate на gray**

```bash
cd ~/Downloads/land_linkeon
sed -i '' 's/\bslate-\([0-9]\{2,3\}\)/gray-\1/g' $(grep -rl 'slate-' src --include='*.tsx')
grep -rn 'slate-' src --include='*.tsx' | wc -l
```

Expected: `0`

- [ ] **Step 3: Заменить slate в глобальных стилях**

Modify `src/index.css` — в `@layer base` заменить строку `@apply antialiased bg-slate-50 text-slate-900 font-sans;` на:

```css
    @apply antialiased bg-gray-50 text-gray-900 font-sans;
```

- [ ] **Step 4: Проверить, что старых классов не осталось нигде**

```bash
cd ~/Downloads/land_linkeon && grep -rn 'indigo-\|slate-\|emerald-' src index.html | grep -v '\.test\.'
```

Expected: пусто (нет вывода).

- [ ] **Step 5: Собрать и проверить типы**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm lint && pnpm build 2>&1 | tail -3
```

Expected: всё зелёное.

- [ ] **Step 6: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src
git commit -m "style(palette): indigo/slate/emerald -> палитра приложения"
```

---

## Task 4: Цвета в canvas-графике

`ValueGraph.tsx` рисует на canvas и держит цвета hex-литералами, мимо Tailwind.

**Files:**
- Modify: `src/components/sections/ValueGraph.tsx`

- [ ] **Step 1: Посмотреть текущий блок цветов**

```bash
cd ~/Downloads/land_linkeon && sed -n '10,25p' src/components/sections/ValueGraph.tsx
```

Expected: видны литералы `#4f46e5`, `#10b981`, `#047857`, `#94a3b8`, `#64748b`, `#cbd5e1`, `#818cf8`.

- [ ] **Step 2: Заменить блок COLORS**

В `src/components/sections/ValueGraph.tsx` добавить импорт третьей строкой, после импорта `useInView`:

```ts
import { brand } from '../../theme/colors.js';
```

и заменить блок `const COLORS = { … }` (строки 15–23) целиком на:

```ts
// Нейтраль — штатная шкала gray Tailwind (та же, что у приложения),
// но здесь canvas, поэтому значения выписаны литералами.
const COLORS = {
  self: brand[700],
  value: brand[500],
  valueLabel: brand[800],
  other: '#9ca3af', // gray-400
  otherLabel: '#6b7280', // gray-500
  link: '#d1d5db', // gray-300
  activeLink: brand[500],
};
```

`#fff` на строке 166 не трогать — это заливка подписей, она остаётся белой.

- [ ] **Step 3: Проверить, что старых литералов не осталось**

```bash
cd ~/Downloads/land_linkeon && grep -nE '#(4f46e5|10b981|047857|94a3b8|64748b|cbd5e1|818cf8)' src/components/sections/ValueGraph.tsx
```

Expected: пусто.

- [ ] **Step 4: Собрать и посмотреть глазами**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm build 2>&1 | tail -3
```

Expected: зелено. Затем `pnpm dev`, открыть секцию Networking и убедиться, что график перекрасился и читается.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/components/sections/ValueGraph.tsx
git commit -m "style(palette): цвета canvas-графика из общих токенов"
```

---

## Task 5: Починить дубликаты в конфиге приложения

**Отдельный репозиторий.** Пока в `spirits_front/tailwind.config.js` ключи продублированы, «общий источник правды» — фикция: любая правка там может незаметно изменить победившее определение.

**Files:**
- Modify: `~/Downloads/spirits_front/tailwind.config.js`

- [ ] **Step 1: Зафиксировать, какие значения работают сейчас**

```bash
cd ~/Downloads/spirits_front && node -e "
import('./tailwind.config.js').then(m => {
  const c = m.default.theme.extend.colors;
  console.log(JSON.stringify({forest: c.forest, warm: c.warm, earth: c.earth, primary: c.primary, secondary: c.secondary, accent: c.accent}, null, 2));
});
" > /tmp/palette-before.json && cat /tmp/palette-before.json
```

Expected: JSON с шестью шкалами. Это эталон — после правки значения обязаны совпасть.

- [ ] **Step 2: Убедиться, что дерево приложения чистое, и завести ветку**

```bash
cd ~/Downloads/spirits_front && git status --short && git checkout -b fix/tailwind-duplicate-color-keys
```

Expected: `git status --short` пуст.

- [ ] **Step 3: Удалить дубликаты**

В `~/Downloads/spirits_front/tailwind.config.js` внутри `theme.extend.colors` оставить по одному определению каждого ключа (`primary`, `secondary`, `accent`, `earth`, `forest`, `warm`), взяв значения из `/tmp/palette-before.json`. Ключи `forest`, `warm`, `earth` встречаются по 3–4 раза, `primary` и `secondary` содержат повторяющиеся ступени внутри одного объекта — убрать всё лишнее, ничего не переименовывая.

- [ ] **Step 4: Проверить, что вычисленная палитра не изменилась**

```bash
cd ~/Downloads/spirits_front && node -e "
import('./tailwind.config.js').then(m => {
  const c = m.default.theme.extend.colors;
  console.log(JSON.stringify({forest: c.forest, warm: c.warm, earth: c.earth, primary: c.primary, secondary: c.secondary, accent: c.accent}, null, 2));
});
" > /tmp/palette-after.json && diff /tmp/palette-before.json /tmp/palette-after.json && echo "ПАЛИТРА НЕ ИЗМЕНИЛАСЬ"
```

Expected: `ПАЛИТРА НЕ ИЗМЕНИЛАСЬ`, diff пуст.

- [ ] **Step 5: Собрать приложение**

```bash
cd ~/Downloads/spirits_front && pnpm build 2>&1 | tail -3
```

Expected: сборка успешна.

- [ ] **Step 6: Коммит**

```bash
cd ~/Downloads/spirits_front
git add tailwind.config.js
git commit -m "fix(tailwind): убрать дублирующиеся ключи цветов (артефакт bolt)"
```

---

## Task 6: Контраст и обложка

**Files:**
- Modify: точечно те `.tsx`, где пара текст/фон не прошла проверку
- Regenerate: `public/og-cover.jpg`

- [ ] **Step 1: Собрать список пар текст-на-бренде**

```bash
cd ~/Downloads/land_linkeon && grep -rn 'bg-brand-[0-9]\{2,3\}' src --include='*.tsx' | grep -o 'bg-brand-[0-9]*[^"]*' | sort -u
```

Expected: список классов вида `bg-brand-700 text-white`. Каждую пару проверить вручную.

- [ ] **Step 2: Проверить контраст**

Для каждой пары посчитать коэффициент контраста (например, на webaim.org/resources/contrastchecker). Опорные значения: `brand-700` `#0d9488` с белым даёт ≈3.9:1 — это проходит AA для крупного/полужирного текста (порог 3:1), но **не** для обычного текста (порог 4.5:1). `brand-800` `#0f766e` с белым даёт ≈4.8:1 и проходит везде.

Правило: если на бренд-фоне лежит обычный текст мельче 18px и не полужирный — поднять фон до `brand-800`.

- [ ] **Step 3: Применить исправления**

Точечно заменить `bg-brand-700` на `bg-brand-800` в тех местах, где Step 2 показал провал. Кнопки (`Button.tsx`, `text-sm font-semibold`) — крупный полужирный, порог 3:1, менять не нужно.

- [ ] **Step 4: Перегенерировать обложку**

```bash
cd ~/Downloads/land_linkeon && pnpm og
```

Expected: `public/og-cover.jpg` перезаписан. Открыть файл и убедиться, что фон перекрасился в бирюзовый и текст читается.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src public/og-cover.jpg
git commit -m "fix(a11y): контраст текста на бренд-фоне + перегенерация og-обложки"
```

---

## Контрольная точка A

- [ ] **Step 1: Полный прогон**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm lint && pnpm test:unit && pnpm test
```

Expected: всё зелёное. Playwright-смоук должен пройти без правок — он не завязан на цвета.

- [ ] **Step 2: Визуальная проверка**

```bash
cd ~/Downloads/land_linkeon && pnpm capture
```

Открыть получившиеся скриншоты и сверить с `my.linkeon.io`: CTA одного цвета, нейтраль не «холоднее» приложения.

---

# ФАЗА B — Шесть языков

## Task 7: Реестр языков

**Files:**
- Create: `src/i18n/languages.ts`, `src/i18n/languages.test.ts`

- [ ] **Step 1: Написать падающий тест**

Create `src/i18n/languages.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { SUPPORTED_LANGUAGES, SUPPORTED_CODES, DEFAULT_LANGUAGE, resolveLanguage } from './languages';

describe('реестр языков', () => {
  it('содержит те же шесть языков, что приложение', () => {
    expect(SUPPORTED_CODES).toEqual(['ru', 'en', 'es', 'de', 'fr', 'zh']);
  });

  it('язык по умолчанию — русский', () => {
    expect(DEFAULT_LANGUAGE).toBe('ru');
  });

  it('у каждого языка есть самоназвание и флаг', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(lang.nativeName.length).toBeGreaterThan(0);
      expect(lang.flag.length).toBeGreaterThan(0);
    }
  });
});

describe('resolveLanguage', () => {
  it('схлопывает региональные теги до корня', () => {
    expect(resolveLanguage('es-MX')).toBe('es');
    expect(resolveLanguage('zh-Hans')).toBe('zh');
    expect(resolveLanguage('en_US')).toBe('en');
  });

  it('неподдерживаемое и пустое уводит в язык по умолчанию', () => {
    expect(resolveLanguage('ja')).toBe('ru');
    expect(resolveLanguage(null)).toBe('ru');
    expect(resolveLanguage(undefined)).toBe('ru');
    expect(resolveLanguage('')).toBe('ru');
  });
});
```

- [ ] **Step 2: Запустить и убедиться, что падает**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: FAIL — `Failed to resolve import "./languages"`

- [ ] **Step 3: Скопировать реестр из приложения**

```bash
cp ~/Downloads/spirits_front/src/i18n/languages.ts ~/Downloads/land_linkeon/src/i18n/languages.ts
```

- [ ] **Step 4: Добавить в скопированный файл пометку про дубль**

В начало `src/i18n/languages.ts`, над `export interface LanguageDef`, вставить:

```ts
/**
 * Копия spirits_front/src/i18n/languages.ts. Репозитории раздельные, общего
 * пакета нет — файл дублируется осознанно. За расхождением следит
 * languages.test.ts (список кодов) и check-locales.test.mjs.
 * Меняете здесь — меняйте и там.
 */
```

- [ ] **Step 5: Запустить тест**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: все тесты `languages` проходят.

- [ ] **Step 6: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/languages.ts src/i18n/languages.test.ts
git commit -m "feat(i18n): реестр из шести языков, общий с приложением"
```

---

## Task 8: Язык из префикса URL

Язык страницы определяется первым сегментом пути, а не детектором браузера. Иначе URL и содержимое расходятся, и получается дублирующийся контент под одним адресом.

**Files:**
- Create: `src/i18n/urlLanguage.ts`, `src/i18n/urlLanguage.test.ts`

- [ ] **Step 1: Написать падающий тест**

Create `src/i18n/urlLanguage.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { languageFromPath, pathForLanguage } from './urlLanguage';

describe('languageFromPath', () => {
  it('корень — язык по умолчанию', () => {
    expect(languageFromPath('/')).toBe('ru');
    expect(languageFromPath('')).toBe('ru');
  });

  it('берёт язык из первого сегмента', () => {
    expect(languageFromPath('/en/')).toBe('en');
    expect(languageFromPath('/es')).toBe('es');
    expect(languageFromPath('/zh/')).toBe('zh');
  });

  it('неизвестный сегмент — язык по умолчанию', () => {
    expect(languageFromPath('/ja/')).toBe('ru');
    expect(languageFromPath('/pricing')).toBe('ru');
  });

  it('ru в пути не считается языковым префиксом: канонический ru — это корень', () => {
    expect(languageFromPath('/ru/')).toBe('ru');
  });
});

describe('pathForLanguage', () => {
  it('русский ведёт на корень', () => {
    expect(pathForLanguage('ru', '/en/')).toBe('/');
    expect(pathForLanguage('ru', '/')).toBe('/');
  });

  it('остальные — на свой префикс', () => {
    expect(pathForLanguage('es', '/')).toBe('/es/');
    expect(pathForLanguage('de', '/en/')).toBe('/de/');
  });

  it('сохраняет query и хеш', () => {
    expect(pathForLanguage('fr', '/en/', '?seg=biz', '#pricing')).toBe('/fr/?seg=biz#pricing');
    expect(pathForLanguage('ru', '/de/', '?utm_source=vk', '')).toBe('/?utm_source=vk');
  });
});
```

- [ ] **Step 2: Запустить и убедиться, что падает**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: FAIL — `Failed to resolve import "./urlLanguage"`

- [ ] **Step 3: Реализовать**

Create `src/i18n/urlLanguage.ts`:

```ts
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages';

/**
 * Язык страницы = первый сегмент пути. Русский живёт в корне (`/`), остальные
 * под префиксом (`/en/`). Детектор навигатора в выборе НЕ участвует: иначе
 * содержимое разъезжается с URL и получается дублирующийся контент.
 */
export function languageFromPath(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return DEFAULT_LANGUAGE;
  return SUPPORTED_CODES.includes(segment) ? segment : DEFAULT_LANGUAGE;
}

/** Путь той же страницы на другом языке — для ссылок переключателя. */
export function pathForLanguage(
  language: string,
  _pathname: string,
  search = '',
  hash = '',
): string {
  const base = language === DEFAULT_LANGUAGE ? '/' : `/${language}/`;
  return `${base}${search}${hash}`;
}
```

- [ ] **Step 4: Запустить тест**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: все тесты проходят.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/urlLanguage.ts src/i18n/urlLanguage.test.ts
git commit -m "feat(i18n): язык страницы определяется префиксом URL"
```

---

## Task 9: Скрипты работы с локалями

**Files:**
- Create: `scripts/locale-utils.mjs`, `scripts/locale-utils.test.mjs`, `scripts/check-locales.mjs`, `scripts/check-locales.test.mjs`
- Create: `src/i18n/locales/{es,de,fr,zh}.json`

- [ ] **Step 1: Скопировать хелперы и их тесты из приложения**

```bash
cp ~/Downloads/spirits_front/scripts/locale-utils.mjs ~/Downloads/land_linkeon/scripts/
cp ~/Downloads/spirits_front/scripts/locale-utils.test.mjs ~/Downloads/land_linkeon/scripts/
cp ~/Downloads/spirits_front/scripts/check-locales.mjs ~/Downloads/land_linkeon/scripts/
cp ~/Downloads/spirits_front/scripts/check-locales.test.mjs ~/Downloads/land_linkeon/scripts/
```

- [ ] **Step 2: Завести пустые локали**

```bash
cd ~/Downloads/land_linkeon
for lng in es de fr zh; do echo '{}' > "src/i18n/locales/$lng.json"; done
ls src/i18n/locales/
```

Expected: шесть файлов — `de.json en.json es.json fr.json ru.json zh.json`

- [ ] **Step 3: Запустить тесты хелперов**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: тесты `locale-utils` и `check-locales` проходят. Тест `check-locales` сверяет продублированный в `.mjs` список языков с реестром — он зелёный, потому что списки совпадают.

- [ ] **Step 4: Убедиться, что гейт паритета видит недостачу**

```bash
cd ~/Downloads/land_linkeon && pnpm check-locales; echo "exit=$?"
```

Expected: `❌ es: не хватает 141 из 141 ключей` (и то же для de/fr/zh), `exit=1`. Это правильно: локали пусты, гейт обязан падать.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add scripts src/i18n/locales
git commit -m "feat(i18n): скрипты локалей и заготовки четырёх новых языков"
```

---

## Task 10: Ленивая загрузка локалей

**Files:**
- Modify: `src/i18n/index.ts`, `package.json`

- [ ] **Step 1: Поставить бэкенд ресурсов и убрать детектор**

```bash
cd ~/Downloads/land_linkeon
pnpm add i18next-resources-to-backend
pnpm remove i18next-browser-languagedetector
```

Expected: детектор удалён из зависимостей — язык теперь берётся из URL, детектор не нужен.

- [ ] **Step 2: Переписать инициализацию**

Replace the whole content of `src/i18n/index.ts`:

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import ru from './locales/ru.json';
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from './languages';
import { languageFromPath } from './urlLanguage';

const initial = languageFromPath(window.location.pathname);

void i18n
  // ru лежит в бандле как фолбэк, остальные локали Vite нарезает в отдельные
  // чанки и подтягивает только для своей языковой страницы.
  .use(
    resourcesToBackend((language: string) =>
      language === DEFAULT_LANGUAGE
        ? Promise.resolve({ default: ru })
        : import(`./locales/${language}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    // Язык задаётся URL'ом, а не детектором: см. urlLanguage.ts
    lng: initial,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_CODES,
    // ru отдан ресурсами, остальные — бэкендом; без флага i18next
    // считает, что раз ресурсы есть, бэкенд не нужен
    partialBundledLanguages: true,
    resources: {
      ru: { translation: ru },
    },
    interpolation: { escapeValue: false },
  })
  .then(() => {
    document.documentElement.lang = i18n.language;
  });

export default i18n;
```

- [ ] **Step 3: Проверить типы и сборку**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm build 2>&1 | tail -5
```

Expected: зелено, в выводе сборки видны отдельные чанки локалей (`es.json-*.js` и т.п.).

- [ ] **Step 4: Проверить руками**

```bash
cd ~/Downloads/land_linkeon && pnpm dev
```

Открыть `http://localhost:5173/` — страница на русском. Открыть `http://localhost:5173/en/` — Vite отдаст тот же `index.html`, страница должна быть на английском.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/index.ts package.json pnpm-lock.yaml
git commit -m "feat(i18n): ленивая загрузка локалей, язык из URL"
```

---

## Task 11: Переключатель языка на шесть пунктов

Две кнопки RU/EN превращаются в дропдаун. Пункты — настоящие ссылки, чтобы языковой версией можно было поделиться и чтобы поисковик видел связь между версиями.

**Files:**
- Modify: `src/components/ui/LangSwitcher.tsx`

- [ ] **Step 1: Переписать компонент**

Replace the whole content of `src/components/ui/LangSwitcher.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../i18n/languages';
import { languageFromPath, pathForLanguage } from '../../i18n/urlLanguage';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const current = typeof window !== 'undefined'
    ? languageFromPath(window.location.pathname)
    : i18n.language;
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === current) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Ссылка, а не changeLanguage: языковая версия должна быть отдельным URL,
  // которым можно поделиться и который проиндексируется.
  const hrefFor = (code: string) =>
    typeof window === 'undefined'
      ? pathForLanguage(code, '/')
      : pathForLanguage(code, window.location.pathname, window.location.search, window.location.hash);

  return (
    <div className="relative" ref={boxRef} data-testid="lang-switcher">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={currentLang.nativeName}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-3 min-h-[40px] rounded-lg bg-gray-100 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
      >
        <Globe aria-hidden="true" className="w-4 h-4" />
        <span className="uppercase">{currentLang.code}</span>
        <ChevronDown aria-hidden="true" className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1 min-w-[180px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === current}>
              <a
                href={hrefFor(lang.code)}
                hrefLang={lang.code}
                data-testid={`lang-option-${lang.code}`}
                className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                  lang.code === current ? 'font-semibold text-gray-900' : 'text-gray-700'
                }`}
              >
                <span aria-hidden="true">{lang.flag}</span>
                <span className="flex-1">{lang.nativeName}</span>
                {lang.code === current && <Check aria-hidden="true" className="w-4 h-4 text-brand-700" />}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Проверить типы и линт**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm lint
```

Expected: зелено.

- [ ] **Step 3: Обновить сломанный смоук-тест**

Существующий тест `language switch toggles EN texts` в `tests/smoke.spec.ts` кликает по тексту `EN` в старом переключателе и больше не пройдёт. Заменить его тело:

```ts
  test('language switcher links to per-language URLs', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="lang-switcher"] button').first().click();
    await expect(page.locator('[data-testid="lang-option-en"]')).toHaveAttribute('href', '/en/');
    await expect(page.locator('[data-testid="lang-option-zh"]')).toHaveAttribute('href', '/zh/');
  });
```

- [ ] **Step 4: Прогнать e2e**

```bash
cd ~/Downloads/land_linkeon && pnpm test
```

Expected: все тесты проходят.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/components/ui/LangSwitcher.tsx tests/smoke.spec.ts
git commit -m "feat(i18n): переключатель языка на шесть пунктов со ссылками"
```

---

## Task 12: Форматирование чисел по активному языку

В `Pricing.tsx` сейчас бинарная развилка `startsWith('en') ? 'en-US' : 'ru-RU'` — на четырёх новых языках она молча отдаст русский формат.

**Files:**
- Modify: `src/components/sections/Pricing.tsx`

- [ ] **Step 1: Заменить форматтер**

В `src/components/sections/Pricing.tsx` заменить строку

```ts
  const fmt = (n: number) => n.toLocaleString(i18n.language.startsWith('en') ? 'en-US' : 'ru-RU');
```

на

```ts
  // Intl понимает голый код языка; отдельная таблица локалей не нужна.
  const fmt = (n: number) => n.toLocaleString(i18n.language);
```

- [ ] **Step 2: Проверить, что `i18n` всё ещё используется в файле**

```bash
cd ~/Downloads/land_linkeon && grep -n "i18n" src/components/sections/Pricing.tsx
```

Expected: `i18n` встречается и в деструктуризации `useTranslation()`, и в новом `fmt`. Если после правки он больше нигде не нужен — `noUnusedLocals` в tsconfig это поймает на следующем шаге.

- [ ] **Step 3: Проверить типы**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck
```

Expected: зелено.

- [ ] **Step 4: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/components/sections/Pricing.tsx
git commit -m "fix(i18n): формат чисел по активному языку, а не по развилке ru/en"
```

---

## Task 13: Ключи метаданных страницы

Пререндеру (Фаза C) нужны локализованные `<title>` и `<meta description>`. Ключи заводятся сейчас, чтобы перевод в Task 14 захватил их одним прогоном.

**Files:**
- Modify: `src/i18n/locales/ru.json`, `src/i18n/locales/en.json`

- [ ] **Step 1: Добавить секцию в ru.json**

В `src/i18n/locales/ru.json` первым ключом верхнего уровня добавить:

```json
  "meta": {
    "title": "LINKEON.IO — AI-команда для роста бизнеса",
    "description": "AI-ассистенты (маркетолог, юрист, бухгалтер, HR, коуч) + единый профиль. Для малого бизнеса, фрилансеров и агентств."
  },
```

- [ ] **Step 2: Добавить ту же секцию в en.json**

В `src/i18n/locales/en.json` первым ключом верхнего уровня добавить:

```json
  "meta": {
    "title": "LINKEON.IO — an AI team for your business",
    "description": "AI assistants (marketer, lawyer, accountant, HR, coach) plus one shared profile. For small businesses, freelancers and agencies."
  },
```

- [ ] **Step 3: Проверить, что JSON валиден и ключи на месте**

```bash
cd ~/Downloads/land_linkeon && node -e "
for (const l of ['ru','en']) {
  const d = JSON.parse(require('fs').readFileSync('src/i18n/locales/'+l+'.json','utf8'));
  if (!d.meta?.title || !d.meta?.description) throw new Error(l+': нет meta');
  console.log(l, 'ok:', d.meta.title);
}"
```

Expected: две строки `ok:` с заголовками.

- [ ] **Step 4: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/locales/ru.json src/i18n/locales/en.json
git commit -m "feat(i18n): локализуемые title и description страницы"
```

---

## Task 14: Перевод локалей

**Files:**
- Create: `scripts/translate-locales.mjs`
- Modify: `package.json`, `src/i18n/locales/{es,de,fr,zh,en}.json`

- [ ] **Step 1: Скопировать скрипт и поставить SDK**

```bash
cp ~/Downloads/spirits_front/scripts/translate-locales.mjs ~/Downloads/land_linkeon/scripts/
cd ~/Downloads/land_linkeon && pnpm add -D @anthropic-ai/sdk
```

- [ ] **Step 2: Заменить глоссарий и правила под лендинг**

Скопированный скрипт написан под интерфейс приложения (упоминает теги `CustomMarkdown`, которых на лендинге нет) и требует коротких строк — для рекламного текста это неверная установка.

В `scripts/translate-locales.mjs` заменить константу `GLOSSARY` на:

```js
const GLOSSARY = `
- "Linkeon" / "LINKEON.IO" — название продукта, НЕ переводить и не транслитерировать.
- «Ассистент» — переводить как assistant / asistente / Assistent / assistant / 助手.
  Это термин продукта: НИКОГДА не использовать «агент» или его эквиваленты.
- «Нетворкинг» — Networking / Networking / Networking / Réseautage / 人脉拓展.
- «токены» — внутренняя валюта: tokens / tokens / Tokens / jetons / 代币.
- Имена ассистентов (Роман, Юля и т.п.) — оставлять как есть в латинской транслитерации
  (Roman, Yulia), для 中文 — транслитерация латиницей.
- Цены указаны в рублях и остаются в рублях: символ ₽ и суммы не переводить.
`;
```

и в системном промпте заменить пункт 3

```
3. Это интерфейс: держать перевод коротким. Длинная строка ломает вёрстку кнопок и меток.
```

на

```
3. Это РЕКЛАМНЫЙ ЛЕНДИНГ, а не служебный интерфейс. Нужен не подстрочник, а текст,
   который звучит как изначально написанный на этом языке промо. Сохраняй смысл и
   обещание, но можешь менять синтаксис и образ, если буквальный перевод звучит
   коряво. Заголовки держи такими же короткими и ударными, как в оригинале —
   длинная строка ломает вёрстку первого экрана.
```

- [ ] **Step 3: Добавить скрипт в package.json**

В блок `"scripts"` добавить:

```json
    "translate-locales": "node scripts/translate-locales.mjs",
```

- [ ] **Step 4: Прогнать перевод**

```bash
cd ~/Downloads/land_linkeon && pnpm translate-locales
```

Expected: для `en` — сообщение про недостающие ключи `meta.*` (остальное уже переведено), для `es/de/fr/zh` — по 4 пачки на 141 ключ. В конце `💾` с путём каждого файла.

Требуется `ANTHROPIC_API_KEY` в окружении. Если ключа нет — остановиться и спросить пользователя, а не искать обходной путь.

- [ ] **Step 5: Проверить паритет**

```bash
cd ~/Downloads/land_linkeon && pnpm check-locales
```

Expected: `✅ en: 143/143 ключей` и то же для es/de/fr/zh. Если какие-то ключи пропущены (модель сломала плейсхолдер) — перезапустить `pnpm translate-locales`, он добирает только недостающее.

- [ ] **Step 6: Собрать и посмотреть**

```bash
cd ~/Downloads/land_linkeon && pnpm build 2>&1 | tail -3 && pnpm dev
```

Открыть `/es/`, `/de/`, `/fr/`, `/zh/` и убедиться, что страницы отрисованы целиком, вёрстка не разъехалась (немецкий длиннее русского — первым делом смотреть кнопки и пункты меню).

- [ ] **Step 7: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add scripts/translate-locales.mjs package.json pnpm-lock.yaml src/i18n/locales
git commit -m "feat(i18n): перевод локалей на es/de/fr/zh"
```

---

## Task 15: Вычитка маркетингового ядра

Машинный прогон дал черновик. Первый экран и CTA — то, ради чего лендинг существует; подстрочник в заголовке это брак.

**Files:**
- Modify: `src/i18n/locales/{en,es,de,fr,zh}.json`

- [ ] **Step 1: Выписать ключи, требующие вычитки**

```bash
cd ~/Downloads/land_linkeon && node -e "
const fs=require('fs');
const flat=(o,p='')=>Object.entries(o).flatMap(([k,v])=>{const n=p?p+'.'+k:k;return v&&typeof v==='object'&&!Array.isArray(v)?flat(v,n):[[n,v]]});
const PREFIX=['hero.','personaCta.','finalCta.','pricing.h2','pricing.sub','meta.'];
const ru=Object.fromEntries(flat(JSON.parse(fs.readFileSync('src/i18n/locales/ru.json','utf8'))));
for (const lng of ['en','es','de','fr','zh']) {
  const t=Object.fromEntries(flat(JSON.parse(fs.readFileSync('src/i18n/locales/'+lng+'.json','utf8'))));
  console.log('\n===== '+lng.toUpperCase());
  for (const k of Object.keys(ru)) {
    if (!PREFIX.some(p=>k.startsWith(p))) continue;
    console.log(k+'\n  ru: '+JSON.stringify(ru[k])+'\n  '+lng+': '+JSON.stringify(t[k]));
  }
}" > /tmp/transcreation-review.txt && wc -l /tmp/transcreation-review.txt
```

Expected: файл на несколько сотен строк с парами ru → перевод.

- [ ] **Step 2: Вычитать и править**

Пройти `/tmp/transcreation-review.txt` по каждому языку. Критерии брака, которые нужно править прямо в JSON-файлах локалей:

- заголовок читается как перевод, а не как реклама;
- заголовок заметно длиннее русского (ломает первый экран);
- потеряно обещание «бесплатно» / «за минуты» — это ядро оффера;
- эмодзи в чипах пропали или переехали;
- имена ассистентов переведены вместо транслитерации.

- [ ] **Step 3: Проверить, что JSON не сломан и паритет сохранён**

```bash
cd ~/Downloads/land_linkeon && pnpm check-locales && pnpm build 2>&1 | tail -3
```

Expected: паритет зелёный, сборка успешна.

- [ ] **Step 4: Проверить первый экран на всех языках**

```bash
cd ~/Downloads/land_linkeon && pnpm dev
```

Открыть `/`, `/en/`, `/es/`, `/de/`, `/fr/`, `/zh/` при ширине 375px и 1440px. Заголовок первого экрана не должен переноситься больше чем на строку против русского, CTA-кнопка не должна ломаться в две строки.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/locales
git commit -m "fix(i18n): вычитка первого экрана и CTA на пяти языках"
```

---

## Task 16: Юрдоки из компонента в контент-файлы

**Files:**
- Create: `src/content/legal/ru.tsx`, `src/content/legal/en.tsx`
- Modify: `src/components/layout/LegalModal.tsx`

Структура файла уже удобна для переноса: тексты живут в двух функциях — `renderRu(type)` (строка 114) и `renderEn(type)` (строка 415), плюс общие подкомпоненты `H3`/`P`/`UL` (строки 102–113). Это перенос функций целиком, а не переписывание текста. **Тексты копируются дословно, без единой правки формулировок: это юридические документы.**

- [ ] **Step 1: Зафиксировать границы блоков**

```bash
cd ~/Downloads/land_linkeon && grep -n "^function \|^const \|^export " src/components/layout/LegalModal.tsx
```

Expected: `H3` (102), `P` (106), `UL` (110), `renderRu` (114), `renderEn` (415) — по этим границам и режем.

- [ ] **Step 2: Вынести общие подкомпоненты**

Create `src/content/legal/primitives.tsx` — перенести туда `H3`, `P`, `UL` из строк 102–113 **как есть**, добавив каждой `export`.

- [ ] **Step 3: Вынести русские тексты**

Create `src/content/legal/ru.tsx` — перенести туда функцию `renderRu` целиком (строки 114–414), переименовав в `renderLegal` и добавив `export`. Импортировать примитивы:

```tsx
import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Политика конфиденциальности',
  offer: 'Пользовательское соглашение (оферта)',
  pdn: 'Согласие на обработку персональных данных',
};

export function renderLegal(type: LegalType) {
  // тело renderRu из строк 115–414, перенесённое дословно
}
```

- [ ] **Step 4: Вынести английские тексты**

Create `src/content/legal/en.tsx` — то же самое для `renderEn` (строки 415–700), с английскими заголовками:

```tsx
import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Privacy Policy',
  offer: 'Terms of Service',
  pdn: 'Personal Data Processing Consent',
};

export function renderLegal(type: LegalType) {
  // тело renderEn из строк 416–700, перенесённое дословно
}
```

- [ ] **Step 5: Переписать компонент на тонкую оболочку**

В `src/components/layout/LegalModal.tsx` удалить строки 102–701 (примитивы и обе render-функции) и заменить выбор языка. Добавить импорты:

```tsx
import * as legalRu from '../../content/legal/ru';
import * as legalEn from '../../content/legal/en';
```

Заменить строку 24 (`const isEn = …`) на:

```tsx
  // Русская редакция — единственная, имеющая юридическую силу. Для всех
  // языков кроме ru показываем английский перевод.
  const lng = i18n.language;
  const pack = lng === 'ru' ? legalRu : legalEn;
  const showFallbackNotice = lng !== 'ru' && lng !== 'en';
```

Заменить блок вычисления `title` (строки 45–56) на:

```tsx
  const title = pack.titles[type];
```

Заменить `{isEn ? renderEn(type) : renderRu(type)}` (строка 85) на:

```tsx
          {showFallbackNotice && (
            <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
              This document is available in Russian and English only. The Russian
              version is the legally binding one.
            </p>
          )}
          {pack.renderLegal(type)}
```

Оставшиеся два `isEn ? 'Close' : 'Закрыть'` (строки 77 и 94) заменить на `lng === 'ru' ? 'Закрыть' : 'Close'`.

- [ ] **Step 6: Убедиться, что текст не потерялся при переносе**

```bash
cd ~/Downloads/land_linkeon
echo "было в компоненте (git HEAD):"
git show HEAD:src/components/layout/LegalModal.tsx | grep -c "[А-Яа-я]"
echo "стало в контент-файлах:"
grep -ch "[А-Яа-я]" src/content/legal/ru.tsx
```

Expected: числа совпадают (плюс-минус строки заголовков, которые переехали в `titles`). Заметное расхождение означает, что кусок текста потерян — вернуться и доперенести.

- [ ] **Step 7: Проверить размер и типы**

```bash
cd ~/Downloads/land_linkeon && wc -l src/components/layout/LegalModal.tsx src/content/legal/*.tsx && pnpm typecheck && pnpm lint
```

Expected: `LegalModal.tsx` около сотни строк, типы и линт зелёные.

- [ ] **Step 8: Проверить руками**

```bash
cd ~/Downloads/land_linkeon && pnpm dev
```

Открыть `/` и кликнуть все три ссылки в подвале — русские тексты, пометки нет. Открыть `/en/` — английские, пометки нет. Открыть `/de/` — английские, пометка есть.

- [ ] **Step 9: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/content/legal src/components/layout/LegalModal.tsx
git commit -m "refactor(legal): вынести тексты юрдоков из компонента"
```

---

## Контрольная точка B

- [ ] **Step 1: Полный прогон**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm lint && pnpm test:unit && pnpm check-locales && pnpm test
```

Expected: всё зелёное.

---

# ФАЗА C — Пререндер и SEO

## Task 17: SSR-гварды

`appUrl.ts` и `attribution.ts` читают `window.location` и `localStorage` во время рендера, а их тянут девять компонентов. В Node это упадёт.

**Files:**
- Modify: `src/lib/attribution.ts`, `src/lib/appUrl.ts`

- [ ] **Step 1: Закрыть attribution.ts**

В `src/lib/attribution.ts` в начало функции `fromUrl()` добавить гвард:

```ts
function fromUrl(): Attr {
  // При рендере на сборке (Node) окна нет — меток тоже.
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
```

и в начало `read()`:

```ts
function read(): Attr {
  if (typeof window === 'undefined') return {};
  try {
```

- [ ] **Step 2: Закрыть appUrl.ts**

В `src/lib/appUrl.ts` заменить строку чтения сегмента

```ts
    const seg = new URLSearchParams(window.location.search).get('seg');
```

на

```ts
    // В пререндере окна нет: в статику уезжает дефолтный вариант ссылки,
    // сегмент подставится на клиенте при первом же рендере.
    const seg = typeof window === 'undefined'
      ? null
      : new URLSearchParams(window.location.search).get('seg');
```

- [ ] **Step 3: Убедиться, что в графе рендера не осталось незакрытых обращений**

```bash
cd ~/Downloads/land_linkeon && grep -rn "window\.\|localStorage\|sessionStorage\|document\." src/lib/appUrl.ts src/lib/attribution.ts
```

Expected: каждое обращение либо внутри функции с гвардом `typeof window === 'undefined'` в начале, либо внутри `try`, которому предшествует гвард.

- [ ] **Step 4: Проверить типы и e2e**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm test
```

Expected: зелено — на клиенте поведение не изменилось.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/lib/appUrl.ts src/lib/attribution.ts
git commit -m "fix(ssr): гварды на window в appUrl и attribution"
```

---

## Task 18: Серверная точка входа

**Files:**
- Create: `src/i18n/server.ts`, `src/entry-server.tsx`

- [ ] **Step 1: Синхронный i18n для Node**

Create `src/i18n/server.ts`:

```ts
import { createInstance, type i18n as I18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import { DEFAULT_LANGUAGE } from './languages';

const BUNDLED: Record<string, unknown> = { ru, en, es, de, fr, zh };

/**
 * Экземпляр i18n для рендера на сборке. В отличие от клиентского, локали
 * загружены синхронно и целиком: асинхронного бэкенда в renderToString быть
 * не может — он рендерит один проход, ждать нечего.
 */
export function createServerI18n(language: string): I18n {
  const instance = createInstance();
  void instance.use(initReactI18next).init({
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    resources: Object.fromEntries(
      Object.entries(BUNDLED).map(([code, translation]) => [code, { translation }]),
    ),
    interpolation: { escapeValue: false },
    initImmediate: false,
  });
  return instance;
}
```

- [ ] **Step 2: Точка входа рендера**

Create `src/entry-server.tsx`:

```tsx
import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { createServerI18n } from './i18n/server';

/**
 * Вызывается scripts/prerender.mjs на сборке. Возвращает разметку и
 * метаданные страницы для подстановки в шаблон.
 *
 * Заметьте: клиент поднимается через createRoot, а не hydrateRoot. Это
 * сознательно — сегментные хиро (?seg=biz) рендерятся из query-параметра,
 * которого на сборке нет, так что гидратация гарантированно расходилась бы
 * с разметкой. Пререндер здесь нужен поисковику и первому кадру, а не для
 * экономии клиентского рендера.
 */
export function render(language: string): { html: string; title: string; description: string } {
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>,
  );
  return {
    html,
    title: i18n.t('meta.title'),
    description: i18n.t('meta.description'),
  };
}
```

- [ ] **Step 3: Проверить, что SSR-бандл собирается**

```bash
cd ~/Downloads/land_linkeon && pnpm exec vite build --ssr src/entry-server.tsx --outDir dist-ssr 2>&1 | tail -5
```

Expected: `✓ built in`, появился `dist-ssr/entry-server.js`.

- [ ] **Step 4: Проверить, что рендер реально отдаёт разметку**

```bash
cd ~/Downloads/land_linkeon && node -e "
import('./dist-ssr/entry-server.js').then(m => {
  const r = m.render('en');
  console.log('title:', r.title);
  console.log('длина html:', r.html.length);
  console.log('есть h1:', /<h1/.test(r.html));
});"
```

Expected: непустой английский заголовок, длина html в десятки тысяч символов, `есть h1: true`.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/server.ts src/entry-server.tsx
git commit -m "feat(ssr): точка входа рендера на сборке"
```

---

## Task 19: Скрипт пререндера

**Files:**
- Create: `scripts/prerender.mjs`
- Modify: `package.json`, `index.html`

- [ ] **Step 1: Убрать из шаблона хардкод og:locale**

В `index.html` удалить две строки — они станут генерироваться на язык:

```html
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:locale:alternate" content="en_US" />
```

- [ ] **Step 2: Написать скрипт**

Create `scripts/prerender.mjs`:

```js
#!/usr/bin/env node
/**
 * Рендерит лендинг на каждом языке в статический HTML.
 *
 * Зачем: без этого поисковик видит пустой <div id="root"> и шесть языковых
 * версий не индексируются вообще. Клиент всё равно перерисует страницу
 * (createRoot), так что эта разметка — для краулера и первого кадра.
 *
 * Запускается из pnpm build ПОСЛЕ обеих сборок vite.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');

const SITE = 'https://linkeon.io';
const DEFAULT_LANGUAGE = 'ru';
// Продублировано из src/i18n/languages.ts: тот файл — TypeScript, node его
// не исполнит. За расхождением следит scripts/prerender.test.mjs.
const CODES = ['ru', 'en', 'es', 'de', 'fr', 'zh'];
const OG_LOCALES = {
  ru: 'ru_RU', en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR', zh: 'zh_CN',
};

const urlFor = (code) => (code === DEFAULT_LANGUAGE ? `${SITE}/` : `${SITE}/${code}/`);

const { render } = await import(join(root, 'dist-ssr', 'entry-server.js'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');

function headFor(code, title, description) {
  const alternates = CODES.map(
    (c) => `    <link rel="alternate" hreflang="${c}" href="${urlFor(c)}" />`,
  ).join('\n');
  const ogAlternates = CODES.filter((c) => c !== code)
    .map((c) => `    <meta property="og:locale:alternate" content="${OG_LOCALES[c]}" />`)
    .join('\n');
  return [
    `    <link rel="canonical" href="${urlFor(code)}" />`,
    alternates,
    `    <link rel="alternate" hreflang="x-default" href="${urlFor(DEFAULT_LANGUAGE)}" />`,
    `    <meta property="og:locale" content="${OG_LOCALES[code]}" />`,
    ogAlternates,
    `    <meta property="og:url" content="${urlFor(code)}" />`,
  ].join('\n');
}

// Заголовок и описание есть в шаблоне в четырёх местах (title, description,
// og:title, og:description, twitter:*) — подменяем все.
function localizeMeta(html, title, description) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
}

for (const code of CODES) {
  const { html, title, description } = render(code);

  let page = template;
  page = page.replace('<html lang="ru">', `<html lang="${code}">`);
  page = localizeMeta(page, title, description);
  page = page.replace('</head>', `${headFor(code, title, description)}\n  </head>`);
  page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  if (!page.includes('<h1')) {
    throw new Error(`${code}: в разметке нет <h1> — пререндер отдал пустую страницу`);
  }

  const outDir = code === DEFAULT_LANGUAGE ? dist : join(dist, code);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), page, 'utf8');
  console.log(`✅ ${code} → ${join(outDir, 'index.html').replace(root + '/', '')}`);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...CODES.map((c) => `  <url><loc>${urlFor(c)}</loc></url>`),
  '</urlset>',
].join('\n');
writeFileSync(join(dist, 'sitemap.xml'), sitemap + '\n', 'utf8');
console.log('✅ sitemap.xml');
```

- [ ] **Step 3: Встроить пререндер в сборку**

В `package.json` заменить строку `"build": "vite build",` на:

```json
    "build": "vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs",
```

- [ ] **Step 4: Собрать**

```bash
cd ~/Downloads/land_linkeon && pnpm build 2>&1 | tail -12
```

Expected: шесть строк `✅ <код> → dist/...` и `✅ sitemap.xml`.

- [ ] **Step 5: Проверить, что в статике есть контент**

```bash
cd ~/Downloads/land_linkeon
for lng in en es de fr zh; do
  printf "%s: " "$lng"
  grep -o '<html lang="[a-z]*"' "dist/$lng/index.html" | head -1
done
echo "--- h1 из сырого HTML:"
grep -o '<h1[^>]*>[^<]*' dist/en/index.html | head -1
echo "--- hreflang:"
grep -c 'rel="alternate" hreflang' dist/en/index.html
```

Expected: у каждого языка свой `<html lang>`, английский `<h1>` присутствует в сыром HTML, `hreflang` — 7 штук (шесть языков + x-default).

- [ ] **Step 6: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add scripts/prerender.mjs package.json index.html
git commit -m "feat(seo): пререндер шести языковых версий с hreflang и sitemap"
```

---

## Task 20: Защита от расхождения списка языков

**Files:**
- Create: `scripts/prerender.test.mjs`

- [ ] **Step 1: Написать тест на дубль списка языков**

Create `scripts/prerender.test.mjs`:

```js
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { SUPPORTED_CODES } from '../src/i18n/languages';

const here = dirname(fileURLToPath(import.meta.url));

describe('prerender', () => {
  it('дублированный список языков совпадает с реестром', () => {
    const src = readFileSync(join(here, 'prerender.mjs'), 'utf8');
    const match = src.match(/const CODES = \[([^\]]+)\]/);
    expect(match).not.toBeNull();
    const duplicated = match[1]
      .split(',')
      .map((s) => s.trim().replace(/^'|'$/g, ''))
      .filter(Boolean);
    expect(duplicated).toEqual(SUPPORTED_CODES);
  });

  it('у каждого языка есть og:locale', () => {
    const src = readFileSync(join(here, 'prerender.mjs'), 'utf8');
    for (const code of SUPPORTED_CODES) {
      expect(src).toMatch(new RegExp(`${code}: '[a-z]{2}_[A-Z]{2}'`));
    }
  });
});
```

- [ ] **Step 2: Запустить тест**

```bash
cd ~/Downloads/land_linkeon && pnpm test:unit
```

Expected: оба теста проходят.

- [ ] **Step 3: Проверить, что robots.txt уже указывает на sitemap**

```bash
cd ~/Downloads/land_linkeon && cat public/robots.txt
```

Expected: строка `Sitemap: https://linkeon.io/sitemap.xml` уже есть — она была прописана раньше, но файла по этому адресу до Task 19 не существовало. Править ничего не нужно. Если строки нет — добавить её.

- [ ] **Step 4: Проверить, что sitemap теперь реально отдаётся**

```bash
cd ~/Downloads/land_linkeon && pnpm build > /dev/null 2>&1 && cat dist/robots.txt && head -3 dist/sitemap.xml
```

Expected: в `robots.txt` есть строка `Sitemap:`, `sitemap.xml` начинается с XML-декларации и `<urlset`.

- [ ] **Step 5: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add scripts/prerender.test.mjs
git commit -m "test(seo): защита от расхождения списка языков в пререндере"
```

---

## Task 21: Предложение перейти на язык браузера

Автоматического редиректа нет намеренно (спека §4.2): он уводит краулер с канонического корня и мешает тем, кто пришёл на русскую версию осознанно. Вместо него — закрываемая подсказка.

**Files:**
- Create: `src/components/ui/LanguageBanner.tsx`
- Modify: `src/App.tsx`

Подпись баннера — самоназвание языка с флагом («🇪🇸 Español»), без перевода. Это снимает две проблемы разом: не нужен новый ключ во всех локалях, и компонент не обязан тянуть экземпляр i18n. Последнее принципиально: `src/i18n/index.ts` читает `window.location.pathname` на уровне модуля, и любой импорт этого файла из графа `App` уронил бы пререндер в Node.

- [ ] **Step 1: Создать компонент**

Create `src/components/ui/LanguageBanner.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { SUPPORTED_LANGUAGES, resolveLanguage, type LanguageDef } from '../../i18n/languages';
import { languageFromPath, pathForLanguage } from '../../i18n/urlLanguage';

const DISMISS_KEY = 'll_lang_banner_dismissed';

/**
 * Предлагает перейти на язык браузера, но НЕ редиректит: автоматический
 * редирект по Accept-Language уводит краулер с канонического корня и мешает
 * тем, кто пришёл на конкретную языковую версию осознанно.
 *
 * Ничего не импортирует из ./i18n: тот модуль читает window на уровне
 * модуля и в графе рендера на сборке оказаться не должен. Подпись —
 * самоназвание языка, перевод для неё не нужен.
 */
export default function LanguageBanner() {
  const [offer, setOffer] = useState<{ lang: LanguageDef; href: string } | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      return; // приватный режим — не навязываемся
    }
    const current = languageFromPath(window.location.pathname);
    const preferred = resolveLanguage(navigator.language);
    if (preferred === current) return;
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === preferred);
    if (!lang) return;
    setOffer({
      lang,
      href: pathForLanguage(preferred, window.location.pathname, window.location.search, window.location.hash),
    });
  }, []);

  if (!offer) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* не смогли запомнить — скроем хотя бы на эту сессию */
    }
    setOffer(null);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-lg">
      <a
        href={offer.href}
        hrefLang={offer.lang.code}
        data-testid="lang-banner-link"
        className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        <span aria-hidden="true">{offer.lang.flag}</span>
        {offer.lang.nativeName}
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Подключить в App**

В `src/App.tsx` добавить импорт рядом с остальными и отрисовать баннер после `<Footer />`:

```tsx
import LanguageBanner from './components/ui/LanguageBanner';
```

```tsx
      <Footer />
      <LanguageBanner />
```

- [ ] **Step 3: Убедиться, что граф рендера не тянет клиентский i18n**

```bash
cd ~/Downloads/land_linkeon && grep -rn "from '.*/i18n'\|from './i18n'" src/App.tsx src/components src/lib
```

Expected: пусто. Любое совпадение здесь означает, что `src/i18n/index.ts` попал в граф `App` и пререндер упадёт на `window is not defined`.

- [ ] **Step 4: Проверить, что баннер не попал в статику**

```bash
cd ~/Downloads/land_linkeon && pnpm build 2>&1 | tail -8 && grep -c 'lang-banner-link' dist/index.html
```

Expected: сборка проходит (шесть `✅`), `grep` даёт `0` — баннер рисуется только после эффекта на клиенте.

- [ ] **Step 5: Проверить руками**

```bash
cd ~/Downloads/land_linkeon && pnpm preview --port 4173
```

Открыть `http://localhost:4173/` в браузере с английской локалью — внизу появляется подсказка «🇺🇸 English» со ссылкой на `/en/`. Закрыть её, перезагрузить — не появляется.

- [ ] **Step 6: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/components/ui/LanguageBanner.tsx src/App.tsx
git commit -m "feat(i18n): подсказка перейти на язык браузера без редиректа"
```

---

## Task 22: E2E по шести языкам

Главная проверка — контент присутствует в **сыром** HTML. Без неё поломка пререндера пройдёт незамеченной: клиент всё дорисует, и глазами всё будет в порядке, а из индекса страницы выпадут.

**Files:**
- Create: `tests/i18n.spec.ts`

- [ ] **Step 1: Написать тест**

Create `tests/i18n.spec.ts`:

```ts
import { test, expect, request } from '@playwright/test';

const LANGUAGES = [
  { code: 'ru', path: '/' },
  { code: 'en', path: '/en/' },
  { code: 'es', path: '/es/' },
  { code: 'de', path: '/de/' },
  { code: 'fr', path: '/fr/' },
  { code: 'zh', path: '/zh/' },
];

test.describe('языковые версии', () => {
  for (const { code, path } of LANGUAGES) {
    // Сырой HTTP, без браузера: именно так страницу видит краулер.
    test(`${code}: контент есть в сыром HTML`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const res = await ctx.get(path);
      expect(res.status()).toBe(200);
      const html = await res.text();

      expect(html).toContain(`<html lang="${code}"`);

      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      expect(h1, 'в сыром HTML нет <h1> — пререндер сломан').not.toBeNull();
      expect(h1![1].replace(/<[^>]*>/g, '').trim().length).toBeGreaterThan(10);

      for (const other of LANGUAGES) {
        expect(html).toContain(`hreflang="${other.code}"`);
      }
      expect(html).toContain('hreflang="x-default"');

      const canonical = code === 'ru' ? 'https://linkeon.io/' : `https://linkeon.io/${code}/`;
      expect(html).toContain(`<link rel="canonical" href="${canonical}"`);

      await ctx.dispose();
    });

    test(`${code}: страница живая и CTA ведёт в приложение`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const cta = page.locator('[data-cta="hero-start"]');
      await expect(cta).toBeVisible();
      await expect(cta).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io/);
    });
  }

  test('sitemap перечисляет все шесть версий', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    for (const { code } of LANGUAGES) {
      const url = code === 'ru' ? 'https://linkeon.io/' : `https://linkeon.io/${code}/`;
      expect(xml).toContain(`<loc>${url}</loc>`);
    }
    await ctx.dispose();
  });
});
```

- [ ] **Step 2: Запустить**

```bash
cd ~/Downloads/land_linkeon && pnpm test
```

Expected: 13 новых тестов проходят, старые смоук-тесты тоже.

Если тесты по `/en/` отдают 404 — это `vite preview`, а не пререндер: убедиться, что `pnpm build` отработал целиком и `dist/en/index.html` на месте.

- [ ] **Step 3: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add tests/i18n.spec.ts
git commit -m "test(e2e): контент в сыром HTML и hreflang на шести языках"
```

---

## Task 23: Финальная проверка и подготовка к деплою

**Files:** нет правок, только проверки

- [ ] **Step 1: Полный прогон всех проверок**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm lint && pnpm test:unit && pnpm check-locales && pnpm test
```

Expected: всё зелёное. Это тот набор, который обязан пройти до слияния.

- [ ] **Step 2: Проверить, что сборка воспроизводится с нуля**

```bash
cd ~/Downloads/land_linkeon && rm -rf dist dist-ssr node_modules && pnpm install && pnpm build 2>&1 | tail -12
```

Expected: сборка проходит с чистого листа — именно так она пойдёт на сервере.

- [ ] **Step 3: Проверить вес бандла**

```bash
cd ~/Downloads/land_linkeon && du -sh dist && ls -la dist/assets/*.js | head -10
```

Expected: локали лежат отдельными чанками, основной бандл не вырос заметно относительно того, что было до задачи.

- [ ] **Step 4: Слить в main**

```bash
cd ~/Downloads/land_linkeon
git checkout main && git pull --ff-only origin main
git merge --no-ff feat/i18n-6-langs-and-palette
git push origin main
```

- [ ] **Step 5: Запушить правку конфига приложения**

```bash
cd ~/Downloads/spirits_front
git checkout main && git pull --ff-only origin main
git merge --no-ff fix/tailwind-duplicate-color-keys
git push origin main
```

- [ ] **Step 6: Остановиться и спросить про деплой**

**Не деплоить самостоятельно.** Деплой лендинга требует на сервере `git pull` **и** `pnpm install` (появились новые зависимости) перед `pnpm build`. Сообщить пользователю, что ветка слита, и спросить, катить ли.

---

## Проверка покрытия спеки

| Требование спеки | Задача |
|---|---|
| §3.1 Реестр языков | Task 7 |
| §3.2 Ленивая загрузка | Task 10 |
| §3.3 Переключатель | Task 11 |
| §3.4 Перевод + транскреация | Task 14, 15 |
| §3.4 Формат чисел | Task 12 |
| §4.1 URL-схема | Task 8, 19 |
| §4.2 Язык из URL, без редиректа | Task 8, 10, 21 |
| §4.3 Механизм пререндера | Task 18, 19 |
| §4.4 SSR-гварды | Task 17 |
| §4.5 Head, hreflang, sitemap | Task 19, 20 |
| §4.6 Сегментные хиро остаются клиентскими | Task 17 (гвард в appUrl), Task 18 (комментарий про createRoot) |
| §5 Юрдоки | Task 16 |
| §6.1 Общие токены | Task 2, 5 |
| §6.2 Маппинг цветов | Task 3, 4 |
| §6.3 og-обложка | Task 6 |
| §6.4 Контраст | Task 6 |
| §7 Проверка | Task 20, 22, 23 |
| §8 Деплой | Task 23 |
