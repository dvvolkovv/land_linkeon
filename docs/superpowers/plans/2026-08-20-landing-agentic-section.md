# Секция «Агенты, а не чат-боты» на лендинге — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Донести на linkeon.io мысль «ассистент не отвечает текстом — он делает работу»: новая секция `Agentic` с тремя сценариями «файл на входе → шаги работы → файл на выходе» плюс правка подзаголовка Hero.

**Architecture:** Одна новая презентационная секция между `Problem` и `Assistants`, собранная из существующего UI-набора (`Section`, `Eyebrow`, `FadeIn`, `Button`). Три сценария переключаются табами по паттерну WAI-ARIA tabs; активный по умолчанию первый, поэтому его текст попадает в пререндер и виден краулерам. Весь текст, включая имена файлов-примеров, живёт в локалях — код не содержит ни одной пользовательской строки.

**Tech Stack:** React 18 + TypeScript, Tailwind, i18next (7 локалей), Vite + SSR-пререндер, vitest (юнит), Playwright (e2e поверх собранного сайта).

**Спека:** `docs/superpowers/specs/2026-08-20-landing-agentic-section-design.md`

**Репозиторий:** `~/Downloads/land_linkeon` (НЕ `spirits_front`). Все пути ниже — относительно него.

---

## Задача 0: Подготовить окружение и ветку

**Files:** нет изменений в коде.

- [ ] **Шаг 1: Убедиться, что рабочее дерево чистое и это нужный репозиторий**

```bash
cd ~/Downloads/land_linkeon
git remote -v          # ожидается git@github.com:dvvolkovv/land_linkeon.git
git status --short     # ожидается пусто
```

Если вывод `git remote -v` показывает `spirits`, `spirits_front` или что угодно
кроме `land_linkeon` — ты не в том репозитории, остановись.

- [ ] **Шаг 2: Создать ветку**

```bash
cd ~/Downloads/land_linkeon
git checkout -b feat/agentic-section
```

- [ ] **Шаг 3: Завести CI-клон лендинга на тестовой ноде**

Тяжёлые прогоны (`pnpm build`, Playwright) на маке запрещены — уходят в
таймаут. Клона лендинга на ноде пока нет (там только `~/ci/spirits_back` и
`~/ci/spirits_front`), заводим:

```bash
ssh dv@85.192.61.231 'git clone git@github.com:dvvolkovv/land_linkeon.git ~/ci/land_linkeon'
```

Ожидается: `Cloning into '/home/dv/ci/land_linkeon'... done.`

Если клонирование упало с `Permission denied (publickey)` — у ноды нет доступа
к этому репозиторию. Не обходи это копированием файлов через `rsync`/`scp`:
останови работу и спроси владельца, как дать ноде доступ.

- [ ] **Шаг 4: Поставить зависимости и браузер Playwright на ноде**

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && source ~/.nvm/nvm.sh && pnpm install && pnpm exec playwright install chromium'
```

Ожидается: установка завершилась без ошибок. `source ~/.nvm/nvm.sh`
обязателен в КАЖДОЙ ssh-команде — без него `node` на ноде не находится.

- [ ] **Шаг 5: Снять базовую линию — на текущем `main` всё зелёное**

```bash
ssh dv@85.192.61.231 'cd ~/ci/land_linkeon && source ~/.nvm/nvm.sh && pnpm check-locales && pnpm typecheck && pnpm test:unit'
```

Ожидается: `✅ en: N/N ключей` для всех шести неруских локалей, `tsc` молча,
vitest — все тесты passed. Если что-то красное УЖЕ сейчас — запиши что именно
и не приписывай это своим изменениям позже.

---

## Задача 1: Гард структурной парности локалей

**Зачем:** `scripts/check-locales.mjs` сводит локали через `flatten()`, а тот
считает массив листом (`!Array.isArray(value)`). Значит локаль, где
`agentic.cases` содержит один сценарий вместо трёх или три шага вместо
четырёх, пройдёт проверку молча — и на немецком лендинге секция окажется
обрезанной. Перед тем как заводить ключи-массивы, ставим гард.

**Files:**
- Create: `src/i18n/locales.structure.test.ts`

- [ ] **Шаг 1: Написать тест**

Создай `src/i18n/locales.structure.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages.data.js';
import ru from './locales/ru.json';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

// check-locales.mjs сверяет только плоские ключи, а массив для его flatten() —
// лист. Локаль с одним сценарием вместо трёх (или тремя шагами вместо
// четырёх) прошла бы ту проверку молча и обрезала бы секцию на чужом языке.
// Здесь сверяем ФОРМУ: длины массивов и набор полей внутри элементов.
const LOCALES: Record<string, unknown> = { en, es, de, fr, pt, zh };

type Shape =
  | { kind: 'leaf' }
  | { kind: 'array'; length: number; items: Shape[] }
  | { kind: 'object'; fields: Record<string, Shape> };

function shapeOf(value: unknown): Shape {
  if (Array.isArray(value)) {
    return { kind: 'array', length: value.length, items: value.map(shapeOf) };
  }
  if (value && typeof value === 'object') {
    const fields: Record<string, Shape> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      fields[key] = shapeOf(inner);
    }
    return { kind: 'object', fields };
  }
  return { kind: 'leaf' };
}

/** Расхождения формы, путями от корня — чтобы падение называло виновный ключ. */
function diff(source: Shape, target: Shape, path = ''): string[] {
  const at = path || '(корень)';
  if (source.kind !== target.kind) {
    return [`${at}: ожидался ${source.kind}, получен ${target.kind}`];
  }
  if (source.kind === 'array' && target.kind === 'array') {
    if (source.length !== target.length) {
      return [`${at}: ожидалось элементов ${source.length}, получено ${target.length}`];
    }
    return source.items.flatMap((item, i) => diff(item, target.items[i], `${path}[${i}]`));
  }
  if (source.kind === 'object' && target.kind === 'object') {
    return Object.entries(source.fields).flatMap(([key, inner]) => {
      const next = path ? `${path}.${key}` : key;
      const other = target.fields[key];
      if (!other) return [`${next}: ключа нет`];
      return diff(inner, other, next);
    });
  }
  return [];
}

describe('структура локалей повторяет ru.json', () => {
  const source = shapeOf(ru);

  // Реестр языков и набор импортов обязаны совпадать: иначе новый язык
  // появится в сборке, но останется без этой проверки.
  it('проверяются все языки реестра', () => {
    expect(Object.keys(LOCALES).sort()).toEqual(
      SUPPORTED_CODES.filter((code) => code !== DEFAULT_LANGUAGE).sort(),
    );
  });

  for (const [code, locale] of Object.entries(LOCALES)) {
    it(`${code}: та же форма, что у ru`, () => {
      expect(diff(source, shapeOf(locale))).toEqual([]);
    });
  }
});
```

- [ ] **Шаг 2: Запустить тест — он должен пройти на текущих локалях**

```bash
cd ~/Downloads/land_linkeon && pnpm vitest run src/i18n/locales.structure.test.ts
```

Ожидается: все тесты passed (локали сейчас в паритете). Это лёгкий прогон, его
можно гонять на маке.

- [ ] **Шаг 3: Сломать проверку нарочно и убедиться, что она краснеет**

Зелёный результат сам по себе не доказывает ничего — тест мог не проверять
ничего. Временно урежь массив в одной локали:

```bash
cd ~/Downloads/land_linkeon
node -e "const fs=require('fs');const p='src/i18n/locales/de.json';const j=JSON.parse(fs.readFileSync(p));j.problem.items.pop();fs.writeFileSync(p,JSON.stringify(j,null,2)+'\n')"
pnpm vitest run src/i18n/locales.structure.test.ts
```

Ожидается: FAIL с сообщением вида `problem.items: ожидалось элементов 3,
получено 2`. Для контраста убедись, что старая проверка это НЕ ловит:

```bash
pnpm check-locales
```

Ожидается: `✅ de: N/N ключей` — то есть без нового гарда дыра реальна.

Верни файл:

```bash
cd ~/Downloads/land_linkeon && git checkout src/i18n/locales/de.json
pnpm vitest run src/i18n/locales.structure.test.ts   # снова зелёный
```

- [ ] **Шаг 4: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/locales.structure.test.ts
git commit -m "test(i18n): гард структурной парности локалей

check-locales сверяет только плоские ключи, а массив для его flatten() —
лист: локаль с одним элементом вместо трёх проходила проверку молча.
Тест сверяет форму (длины массивов, набор полей) с ru.json."
```

---

## Задача 2: Копирайт секции — ru.json и en.json

**Files:**
- Modify: `src/i18n/locales/ru.json` (ветка `agentic`, правка `hero.sub`)
- Modify: `src/i18n/locales/en.json` (то же)

- [ ] **Шаг 1: Добавить ветку `agentic` в `src/i18n/locales/ru.json`**

Вставь блок на верхний уровень, между `"problem"` и `"assistants"` (порядок
ключей в JSON ни на что не влияет, но так файл читается по порядку секций):

```json
"agentic": {
  "eyebrow": "Не чат-бот",
  "h2": "Ассистент не отвечает текстом — он делает работу",
  "sub": "Обычный бот умеет только написать в ответ. У ассистента Linkeon есть свой рабочий стол: он открывает ваши файлы, ищет в интернете, пишет и запускает код, собирает документ — и возвращает готовый файл.",
  "youLabel": "Вы",
  "assistantLabel": "Ассистент",
  "note": "Файлы обрабатываются на стороне Linkeon — ставить на компьютер ничего не нужно. Работает в тех же токенах, что и диалог.",
  "cta": "Дать ассистенту задачу",
  "cases": [
    {
      "tab": "Договор",
      "file": "договор-аренды.pdf",
      "ask": "Проверь риски и подготовь протокол разногласий",
      "steps": [
        "открывает файл — 14 страниц",
        "сверяет условия, ищет практику в сети",
        "находит 4 рискованных пункта",
        "собирает документ с формулировками"
      ],
      "result": "протокол-разногласий.docx"
    },
    {
      "tab": "Таблица",
      "file": "выписка.xlsx",
      "ask": "Разнеси расходы по категориям и покажи, куда утекают деньги",
      "steps": [
        "читает 2 300 строк выписки",
        "пишет и запускает код для разбора",
        "группирует траты по категориям",
        "строит диаграмму по месяцам"
      ],
      "result": "расходы-по-категориям.xlsx"
    },
    {
      "tab": "Видео",
      "file": "фото-товара.jpg",
      "ask": "Сделай из этого ролик для Reels",
      "steps": [
        "пишет сценарий на 15 секунд",
        "генерирует кадры по фотографии",
        "собирает видео",
        "добавляет озвучку"
      ],
      "result": "reels.mp4"
    }
  ]
},
```

- [ ] **Шаг 2: Поправить `hero.sub` в `src/i18n/locales/ru.json`**

Меняется ТОЛЬКО общий `hero.sub`. Сегментные подзаголовки `hero.biz.sub`,
`hero.creator.sub`, `hero.assistant.sub`, `hero.video.sub` не трогаем — они
заточены под рекламные кампании.

- было: `"sub": "16 AI-ассистентов: пишут контент, разбирают договоры, считают налоги, планируют продвижение. Принесите задачу — заберите результат. Первое — бесплатно, без карты."`
- стало: `"sub": "16 AI-ассистентов: читают ваши файлы, ищут, считают и возвращают готовые документы, картинки и видео. Принесите задачу — заберите результат. Первое — бесплатно, без карты."`

- [ ] **Шаг 3: Убедиться, что проверка локалей краснеет**

```bash
cd ~/Downloads/land_linkeon && pnpm check-locales
```

Ожидается: FAIL, шесть строк вида `❌ en: не хватает 31 из N ключей` со
списком `agentic.*`. Это ожидаемое красное — переводы кладём следующими шагами.

- [ ] **Шаг 4: Перевести блок в `src/i18n/locales/en.json`**

Вставь туда же ветку `agentic` и поправь `hero.sub`:

```json
"agentic": {
  "eyebrow": "Not a chatbot",
  "h2": "Your assistant doesn't reply with text — it does the work",
  "sub": "A regular bot can only write back. A Linkeon assistant has a desk of its own: it opens your files, searches the web, writes and runs code, puts a document together — and hands you the finished file.",
  "youLabel": "You",
  "assistantLabel": "Assistant",
  "note": "Files are processed on Linkeon's side — nothing to install on your computer. Runs on the same tokens as the conversation.",
  "cta": "Give your assistant a task",
  "cases": [
    {
      "tab": "Contract",
      "file": "lease-agreement.pdf",
      "ask": "Check the risks and draft a list of objections",
      "steps": [
        "opens the file — 14 pages",
        "checks the terms, searches the web for precedent",
        "finds 4 risky clauses",
        "drafts the document with exact wording"
      ],
      "result": "objections.docx"
    },
    {
      "tab": "Spreadsheet",
      "file": "bank-statement.xlsx",
      "ask": "Break the spending down by category and show where the money leaks",
      "steps": [
        "reads 2,300 rows of the statement",
        "writes and runs code to parse them",
        "groups the spending by category",
        "charts it month by month"
      ],
      "result": "spending-by-category.xlsx"
    },
    {
      "tab": "Video",
      "file": "product-photo.jpg",
      "ask": "Turn this into a Reels clip",
      "steps": [
        "writes a 15-second script",
        "generates frames from the photo",
        "assembles the video",
        "adds a voice-over"
      ],
      "result": "reels.mp4"
    }
  ]
},
```

И `hero.sub` в `en.json`:

```json
"sub": "16 AI assistants: they read your files, search, crunch numbers and hand back finished documents, images and video. Bring a task — take the result. The first one is free, no card needed.",
```

- [ ] **Шаг 5: Проверить, что en больше не в списке недостающих**

```bash
cd ~/Downloads/land_linkeon && pnpm check-locales
```

Ожидается: `✅ en: N/N ключей`, остальные пять по-прежнему красные.

- [ ] **Шаг 6: Проверить типы**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck
```

Ожидается: молча (ошибок нет). `resources.d.ts` типизирует ключи по `ru.json`,
поэтому новая ветка сразу становится частью типа `t()`.

- [ ] **Шаг 7: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/locales/ru.json src/i18n/locales/en.json
git commit -m "feat(i18n): копирайт секции «не чат-бот» (ru, en)

Три сценария «файл на входе → шаги → файл на выходе»: договор, выписка,
фото→видео. hero.sub переписан на файлы и готовые документы; сегментные
подзаголовки не тронуты."
```

Коммит оставляет `check-locales` красным для пяти локалей — это промежуточное
состояние ветки, закрывается следующей задачей. В `main` такое не вливаем.

---

## Задача 3: Перевод на остальные пять локалей

**Files:**
- Modify: `src/i18n/locales/es.json`
- Modify: `src/i18n/locales/de.json`
- Modify: `src/i18n/locales/fr.json`
- Modify: `src/i18n/locales/pt.json`
- Modify: `src/i18n/locales/zh.json`

Скриптом `translate-locales` не пользуемся: он требует `ANTHROPIC_API_KEY`,
которого в окружении нет, и переписывает локаль целиком. Переводим руками.

- [ ] **Шаг 1: Перевести ветку `agentic` и `hero.sub` в каждый из пяти файлов**

Источник — русский блок из Задачи 2, английский держи рядом как сверку тона.

Правила, обязательные для всех пяти языков:

1. **Расширения файлов не переводятся и не меняются:** `.pdf`, `.xlsx`,
   `.jpg`, `.docx`, `.mp4`. Базовое имя файла — переводится
   (`договор-аренды.pdf` → `mietvertrag.pdf`), в нижнем регистре, слова через
   дефис, без пробелов и без кириллицы в нерусских локалях.
2. **`reels.mp4` остаётся как есть** во всех локалях — это имя формата.
   Слово «Reels» в тексте вопроса тоже не переводится.
3. **`Linkeon` не переводится и не склоняется** нигде.
4. **Числа сохраняются:** 14 страниц, 2 300 строк, 4 пункта, 15 секунд.
   Разделитель разрядов — по нормам языка (`2,300` в en, `2.300` в de/es/pt,
   `2 300` в fr, `2300` в zh).
5. **`tab` — одно-два слова**, иначе строка табов ломается на мобильном.
6. **Шаги — строчная буква в начале и без точки в конце**, это элементы
   списка, а не предложения (в zh — просто без точки).
7. **Никаких утверждений про доступ к компьютеру пользователя.** «Свой
   рабочий стол» у ассистента — серверный. Формулировка вида «подключится к
   вашему компьютеру» — ложь, её быть не должно.

- [ ] **Шаг 2: Проверить паритет ключей**

```bash
cd ~/Downloads/land_linkeon && pnpm check-locales
```

Ожидается: `✅` для всех шести локалей.

- [ ] **Шаг 3: Проверить структурную парность (гард из Задачи 1)**

```bash
cd ~/Downloads/land_linkeon && pnpm vitest run src/i18n/locales.structure.test.ts
```

Ожидается: все passed. Если упало с `agentic.cases: ожидалось элементов 3,
получено 2` — в этой локали потерян сценарий, добавь его.

- [ ] **Шаг 4: Коммит**

```bash
cd ~/Downloads/land_linkeon
git add src/i18n/locales/es.json src/i18n/locales/de.json src/i18n/locales/fr.json src/i18n/locales/pt.json src/i18n/locales/zh.json
git commit -m "feat(i18n): секция «не чат-бот» на es, de, fr, pt, zh

Имена файлов-примеров локализованы (расширения и reels.mp4 — нет),
числа сохранены."
```

---

## Задача 4: Playwright-тест секции (красный)

**Files:**
- Modify: `tests/smoke.spec.ts`

- [ ] **Шаг 1: Добавить тесты в конец `test.describe('landing smoke', ...)`**

Вставь перед закрывающей скобкой `describe`:

```ts
  // Секция «не чат-бот»: главное обещание лендинга, которого нет ни в одной
  // другой секции. Проверяем и переключение табов — без него видно только
  // первый сценарий, и секция теряет две трети смысла.
  test('agentic section shows the first case and switches tabs', async ({ page }) => {
    await page.goto('/#agentic');

    const panel = page.locator('[data-testid="agentic-panel"]');
    await expect(panel).toBeVisible();
    // Первый сценарий отрисован без клика — он же уезжает в пререндер.
    await expect(panel).toContainText('договор-аренды.pdf');
    await expect(panel).toContainText('протокол-разногласий.docx');

    await page.locator('[data-testid="agentic-tab-1"]').click();
    await expect(panel).toContainText('выписка.xlsx');
    await expect(panel).not.toContainText('договор-аренды.pdf');

    await page.locator('[data-testid="agentic-tab-2"]').click();
    await expect(panel).toContainText('reels.mp4');

    const cta = page.locator('[data-cta="agentic-start"]');
    await expect(cta).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io/);
  });

  // Секция обязана быть в СЫРОМ html: она несёт позиционирование продукта,
  // и краулер, не исполняющий JS, должен её видеть. Заодно ловит случай,
  // когда табы отрендерились только на клиенте.
  test('agentic section is present in prerendered HTML', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('договор-аренды.pdf');
    expect(html).toContain('протокол-разногласий.docx');
  });
```

- [ ] **Шаг 2: Дописать импорт `request`**

Первая строка файла сейчас `import { test, expect } from '@playwright/test';`.
Замени на:

```ts
import { test, expect, request } from '@playwright/test';
```

- [ ] **Шаг 3: Запустить тесты на ноде и убедиться, что они падают**

Сначала запушь ветку, чтобы нода забрала код через git (не через rsync):

```bash
cd ~/Downloads/land_linkeon && git add tests/smoke.spec.ts && git commit -m "test(landing): секция «не чат-бот» и её присутствие в пререндере" && git push -u origin feat/agentic-section
```

Затем на ноде — по конкретному sha, а не по имени ветки:

```bash
SHA=$(git -C ~/Downloads/land_linkeon rev-parse HEAD)
ssh dv@85.192.61.231 "cd ~/ci/land_linkeon && git fetch -q origin && git checkout -q $SHA && source ~/.nvm/nvm.sh && pnpm install && pnpm test --grep agentic"
```

Ожидается: оба теста FAIL — `agentic-panel` не найден (таймаут ожидания
локатора) и `expect(html).toContain('договор-аренды.pdf')` не выполнен.
Именно так и должно быть: компонента ещё нет.

---

## Задача 5: Компонент `Agentic` и вставка в страницу

**Files:**
- Create: `src/components/sections/Agentic.tsx`
- Modify: `src/App.tsx`

- [ ] **Шаг 1: Создать `src/components/sections/Agentic.tsx`**

```tsx
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Paperclip, FileDown } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import Button from '../ui/Button';
import { appUrl } from '../../lib/appUrl';

interface Case {
  tab: string;
  file: string;
  ask: string;
  steps: string[];
  result: string;
}

export default function Agentic() {
  const { t } = useTranslation();
  const cases = t('agentic.cases', { returnObjects: true }) as Case[];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = cases[active];

  // Паттерн WAI-ARIA tabs: в табстрипе Tab'ом достижим только активный таб,
  // между табами ходят стрелками. Без этого с клавиатуры видно один сценарий.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowRight'
        ? (active + 1) % cases.length
        : (active - 1 + cases.length) % cases.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="agentic" ariaLabelledby="agentic-heading" className="bg-white border-y border-gray-200">
      <FadeIn className="text-center mb-12">
        <Eyebrow className="mb-4">{t('agentic.eyebrow')}</Eyebrow>
        <h2
          id="agentic-heading"
          className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 text-balance max-w-3xl mx-auto"
        >
          {t('agentic.h2')}
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t('agentic.sub')}
        </p>
      </FadeIn>

      <div
        role="tablist"
        aria-label={t('agentic.h2')}
        onKeyDown={onKeyDown}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {cases.map((c, i) => (
          <button
            key={c.tab}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`agentic-tab-${i}`}
            aria-selected={i === active}
            aria-controls="agentic-panel"
            tabIndex={i === active ? 0 : -1}
            data-testid={`agentic-tab-${i}`}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 ${
              i === active
                ? 'bg-brand-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="agentic-panel"
        aria-labelledby={`agentic-tab-${active}`}
        data-testid="agentic-panel"
        className="max-w-2xl mx-auto"
      >
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            {t('agentic.youLabel')}
          </p>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 mb-3">
            <Paperclip aria-hidden="true" className="w-4 h-4 text-gray-500" />
            {current.file}
          </p>
          <p className="text-gray-700 leading-relaxed">«{current.ask}»</p>
        </div>

        <ol className="my-6 pl-1 space-y-3">
          {current.steps.map((step, i) => (
            <FadeIn key={step} delay={i * 120}>
              <li className="flex items-start gap-3 text-gray-600">
                <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                <span className="leading-relaxed">{step}</span>
              </li>
            </FadeIn>
          ))}
        </ol>

        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-3">
            {t('agentic.assistantLabel')}
          </p>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <FileDown aria-hidden="true" className="w-4 h-4 text-brand-700" />
            {current.result}
          </p>
        </div>
      </div>

      <FadeIn delay={200} className="mt-10 text-center max-w-2xl mx-auto">
        <p className="text-gray-600 mb-6">{t('agentic.note')}</p>
        <Button variant="primary" size="lg" href={appUrl()} dataCta="agentic-start">
          {t('agentic.cta')}
        </Button>
      </FadeIn>
    </Section>
  );
}
```

Замечания, которые не надо «улучшать»:

- `<ol>` внутри — семантика последовательности шагов; маркер декоративный,
  поэтому `aria-hidden`, а не текстовый bullet.
- `FadeIn` уже уважает `prefers-reduced-motion` (`motion-reduce:transition-none`),
  отдельной обработки не нужно.
- `key={step}` по тексту шага: шаги внутри сценария уникальны, индекс в ключе
  дал бы залипание анимации при переключении табов.
- Панель одна, а не по панели на таб — поэтому `aria-controls` у всех табов
  указывает на один `agentic-panel`, и он же меняет `aria-labelledby`.

- [ ] **Шаг 2: Вставить секцию в `src/App.tsx`**

Добавь импорт после строки `import Problem from './components/sections/Problem';`:

```tsx
import Agentic from './components/sections/Agentic';
```

И вставь секцию между `<Problem />` и `<Assistants />`:

```tsx
        <Problem />
        <Agentic />
        <Assistants />
```

- [ ] **Шаг 3: Проверить типы и линт**

```bash
cd ~/Downloads/land_linkeon && pnpm typecheck && pnpm lint
```

Ожидается: обе команды молча.

- [ ] **Шаг 4: Прогнать Playwright на ноде — теперь зелено**

```bash
cd ~/Downloads/land_linkeon && git add src/components/sections/Agentic.tsx src/App.tsx && git commit -m "feat(landing): секция «не чат-бот» с тремя сценариями работы ассистента

Файл на входе → шаги работы → файл на выходе, три сценария в табах.
Встаёт между Problem и Assistants: сначала боль, потом почему она
лечится работой, и только потом знакомство с ассистентами." && git push
SHA=$(git -C ~/Downloads/land_linkeon rev-parse HEAD)
ssh dv@85.192.61.231 "cd ~/ci/land_linkeon && git fetch -q origin && git checkout -q $SHA && source ~/.nvm/nvm.sh && pnpm install && pnpm test --grep agentic"
```

Ожидается: оба теста PASS. Если `agentic section is present in prerendered
HTML` красный, а браузерный зелёный — значит секция отрисовалась только на
клиенте: проверь, что активный таб по умолчанию `0` и панель не спрятана за
условием, зависящим от `window`.

---

## Задача 6: Полный прогон и сведение ветки

**Files:** нет изменений в коде.

- [ ] **Шаг 1: Полный прогон на ноде**

```bash
SHA=$(git -C ~/Downloads/land_linkeon rev-parse HEAD)
ssh dv@85.192.61.231 "cd ~/ci/land_linkeon && git fetch -q origin && git checkout -q $SHA && source ~/.nvm/nvm.sh && pnpm install && pnpm check-locales && pnpm typecheck && pnpm lint && pnpm test:unit && pnpm build && pnpm test"
```

Ожидается: `check-locales` — шесть `✅`; `typecheck`, `lint` — молча;
`test:unit` — passed; `build` — собрался вместе с пререндером всех локалей;
`pnpm test` — весь Playwright-набор зелёный, включая существующие тесты
языковых версий (они проверяют, что в сыром HTML каждой локали есть `<h1>` и
корректные `hreflang` — новая секция не должна их сломать).

- [ ] **Шаг 2: Глазами посмотреть на секцию**

```bash
cd ~/Downloads/land_linkeon && pnpm dev
```

Открой `http://localhost:5173/#agentic` и проверь:

- на узком экране (DevTools, 375px) строка табов не разъезжается и не создаёт
  горизонтальную прокрутку;
- переключение табов не дёргает высоту страницы рывком;
- Tab с клавиатуры попадает на активный таб, стрелки ←/→ переключают сценарии;
- на `/de/#agentic` и `/zh/#agentic` имена файлов не русские.

- [ ] **Шаг 3: Спросить владельца про выкат**

`scripts/deploy.sh` из `spirits_back` катает `spirits_front`, а не лендинг; в
README `land_linkeon` процедуры выката нет. НЕ выкатывай лендинг руками через
`rsync`/`scp`/правку файлов на сервере. Спроси владельца, чем деплоится
linkeon.io, и дождись ответа.

- [ ] **Шаг 4: Свести ветку**

Работа вливается в `origin/main` (не в `b2b`): коллега держит `b2b` как свою
основную, и правки, ушедшие туда, перезатираются.

```bash
cd ~/Downloads/land_linkeon
git checkout main && git pull && git merge --no-ff feat/agentic-section
git push origin main
```

---

## Проверка соответствия спеке

| Требование спеки | Задача |
|---|---|
| Секция между `Problem` и `Assistants` | 5 (шаг 2) |
| Eyebrow / H2 / Sub / note / CTA | 2 (шаг 1), 5 (шаг 1) |
| Три сценария в табах: договор, таблица, видео | 2 (шаг 1) |
| Лента шагов с `FadeIn` по индексу | 5 (шаг 1) |
| Первый таб попадает в пререндер | 4 (шаг 1), 5 (шаг 4) |
| Правка только общего `hero.sub` | 2 (шаг 2) |
| Имена файлов в локали, а не в коде | 2 (шаг 1), 3 (шаг 1) |
| Семь локалей в паритете | 2, 3 |
| `role=tablist/tab/tabpanel`, стрелки ←/→ | 5 (шаг 1) |
| `prefers-reduced-motion` | 5 (шаг 1, через `FadeIn`) |
| Проверки ломаем нарочно | 1 (шаг 3) |
| Прогоны на тестовой ноде, не на маке | 0, 4, 5, 6 |
| Уточнить процедуру выката лендинга | 6 (шаг 3) |
