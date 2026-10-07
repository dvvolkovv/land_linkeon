# Секция «Сайты и боты» на linkeon.io — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** на главной linkeon.io появляется секция про сайты и телеграм-ботов на хостинге Linkeon (семь языков), пункт меню, строки в «Возможностях», три вопроса в FAQ; кнопка секции доводит нового человека до вкладки продуктов в кабинете.

**Architecture:** лендинг (`land_linkeon`) — новая секция `Sites.tsx` между `ContentEngine` и `HowItWorks`, тексты в общих локалях, числа аренды подставляются интерполяцией из одного модуля (`src/content/products.ts`), прайс переезжает в общий модуль. Кабинет (`spirits_front`) запоминает адрес `/studio?tab=products` до входа и после любого входа переводит с голого `/chat` туда.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind (палитры `paper`/`brand`), i18next с типизированными ключами, vitest, Playwright; кабинет — React Router 6, vitest + jsdom.

**Спека:** [docs/superpowers/specs/2026-10-06-sites-section-design.md](../specs/2026-10-06-sites-section-design.md)

---

## Порядок и зависимости

```
Task 1 (рабочие копии)
  ├─ кабинет:  Task 2 → Task 3 → Task 4 → Task 5 (прогон, слияние, выкат кабинета)
  └─ лендинг:  Task 6 → Task 7 → Task 8 → Task 9 → Task 10 → Task 11 → Task 12 → Task 13
                                                                 ↓
Task 5 (кабинет на проде) — обязательно раньше Task 14 (выкат лендинга) → Task 15
```

Кабинет и лендинг независимы до выката. Кабинет первым: если лендинг выйдет раньше, новый человек с кнопки попадёт в чат — неудобно, но не сломано.

**Стоп-точки, где нужен владелец:** Task 5 (каждый запуск `deploy.sh`), Task 13 (взгляд на скриншоты), Task 14 (запуск `deploy.sh`), Task 15 (Метрика, оферта). Без явного «да» дальше стоп-точки не идти.

**Где работать.** Код правится на маке в воркдеревьях. Тяжёлое (`pnpm build`, Playwright, полный vitest, `tsc`) — только на тест-ноде `dv@85.192.61.231` (решение владельца: мак не тянет). Локально допустимы точечные прогоны одного-двух файлов — **под Node 22** (на маке системный Node 26 ломает `localStorage` в jsdom):

```bash
PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run <файл>
```

Если сессия идёт на самой ноде (`hostname` = `ugliest-salmon`), то же самое делается в `~/dev/<репо>` без ssh.

**Тексты** — по-русски, обращение на «вы» (zh — «你», es — usted, de — Sie, fr — vous, pt — европейский португальский, как на всём лендинге). Слово «ассистент», не «агент». Правила для текстов о продуктах — в спеке, раздел «Чего не пишем».

**Репозитории публичные.** В коммиты не попадают секреты, телефоны, рецепты входа. Скрипты с текстами и проверками — в `~/Downloads/land_linkeon/.superpowers/sites-section/` (каталог в `.gitignore`).

**Базовая линия на `main` лендинга (`120a5f5`, замерено 06.10.2026 на ноде):** `tsc` — 0 ошибок, `pnpm test:unit` — 1780 тестов зелёные. После работы `tsc` обязан остаться на нуле.

## Файлы

| Файл | Ответственность | Что с ним |
|---|---|---|
| **spirits_front** `src/utils/pendingDestination.ts` | раздел кабинета, куда человек шёл до входа: белый список, срок | создать |
| **spirits_front** `src/utils/loginIntent.ts` | что запомнить до входа; последнее намерение побеждает | создать |
| **spirits_front** `src/utils/pendingAssistant.ts` | + `forgetPendingAssistant` | изменить |
| **spirits_front** `src/pages/OnboardingPage.tsx` | запоминает намерение через `loginIntent` | изменить |
| **spirits_front** `src/components/PendingDestinationRedirect.tsx` | после входа: голый `/chat` → запомненный раздел | создать |
| **spirits_front** `src/App.tsx` | монтирует редирект в оболочке вошедшего | изменить |
| `src/content/tokenPackages.ts` | рублёвый прайс — общий для витрины и секции | создать (перенос из `Pricing.tsx`) |
| `src/content/products.ts` | аренда продукта: токены, рубли, переменные для текстов | создать |
| `src/components/sections/Sites.tsx` | секция «Сайты и боты» | создать |
| `src/components/sections/FAQ.tsx` | подставляет переменные аренды в ответы | изменить |
| `src/components/sections/Pricing.tsx` | читает прайс из общего модуля | изменить |
| `src/components/layout/Header.tsx`, `Footer.tsx` | пункт «Сайты и боты» | изменить |
| `src/App.tsx` | секция на главной | изменить |
| `src/theme/paper.js` | перечень тёплых секций в комментарии | изменить |
| `src/i18n/locales/*.json` | тексты секции, меню, подвал, «Возможности», FAQ, попутные правки | изменить (7 файлов) |
| `src/i18n/locales.script.test.ts` | нерусские локали без кириллицы и «₽» | создать |
| `tests/sites.spec.ts`, `tests/smoke.spec.ts` | сырой HTML, браузер, шапка на 1024 px; FAQ — 9 вопросов | создать / изменить |

---

### Task 1: Рабочие копии

**Files:** ничего в репозиториях; служебный скрипт в gitignore-каталоге.

- [ ] **Step 1: Воркдерево лендинга на маке** (уже создано вместе со спекой — проверить)

```bash
cd ~/Downloads/land_linkeon/.worktrees/sites-section
git status -sb        # ожидается: ## feat/sites-section — без upstream, дерево чистое
git log --oneline -2  # коммиты спеки и плана поверх origin/main
ls -l node_modules    # символьная ссылка на ~/Downloads/land_linkeon/node_modules
PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/i18n/locales.structure.test.ts
```

Expected: `Test Files  1 passed`. Если ссылки нет: `ln -sfn ~/Downloads/land_linkeon/node_modules node_modules`.

У ветки **нет upstream** сознательно: она создана от `origin/main`, и `git push` без аргументов ушёл бы в `main`. Пушить только явно: `git push -u origin feat/sites-section`.

- [ ] **Step 2: Рабочая копия лендинга на ноде** (уже заведена при замере базовой линии — проверить)

```bash
ssh dv@85.192.61.231 'git -C ~/ci/wt/sites-section log -1 --format="%h %s"'
```

Expected: строка коммита. Если каталога нет:
`ssh dv@85.192.61.231 'git -C ~/ci/land_linkeon fetch -q origin && git -C ~/ci/land_linkeon worktree add --detach ~/ci/wt/sites-section origin/main'`.

- [ ] **Step 3: Скрипт прогона лендинга на ноде**

Создать `~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh`:

```bash
#!/usr/bin/env bash
# Прогон на ноде на ТЕКУЩЕМ коммите воркдерева sites-section.
#   bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'pnpm test:unit'
# Коммит уезжает в служебную ветку ci/sites-section принудительно — так можно
# прогонять и временные «ломающие» коммиты, не трогая feat/sites-section.
set -euo pipefail
WT=~/Downloads/land_linkeon/.worktrees/sites-section
git -C "$WT" push -q -f origin HEAD:refs/heads/ci/sites-section
SHA=$(git -C "$WT" rev-parse HEAD)
ssh dv@85.192.61.231 "set -e; cd ~/ci/wt/sites-section && git fetch -q origin && git checkout -q --detach $SHA && source ~/.nvm/nvm.sh && (fuser -k 4173/tcp 2>/dev/null || true) && pnpm install --frozen-lockfile >/dev/null 2>&1 && $1"
```

Проверка: `bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'pnpm test:unit 2>&1 | tail -4'` → `Tests  1780 passed`.

`fuser -k 4173/tcp` гасит забытый `pnpm preview`: иначе Playwright подхватил бы старый `dist/` (`reuseExistingServer`). Playwright дальше всегда запускается с `CI=1` — с ним занятый порт даёт ошибку, а не чужую сборку.

- [ ] **Step 4: Воркдерево кабинета**

```bash
cd ~/Downloads/spirits_front
git fetch -q origin
git worktree add .worktrees/sites-destination -b feat/sites-destination origin/main
git -C .worktrees/sites-destination branch --unset-upstream
ln -s ~/Downloads/spirits_front/node_modules .worktrees/sites-destination/node_modules
cd .worktrees/sites-destination
PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/utils/pendingAssistant.test.ts
```

Expected: `Test Files  1 passed`. В общем чекауте `~/Downloads/spirits_front` ничего не менять: там работают другие сессии.

---

### Task 2: Кабинет — раздел, куда человек шёл до входа

Все пути — от корня воркдерева `~/Downloads/spirits_front/.worktrees/sites-destination`.

**Files:**
- Create: `src/utils/pendingDestination.ts`
- Test: `src/utils/pendingDestination.test.ts`

- [ ] **Step 1: Написать тест**

`src/utils/pendingDestination.test.ts`:

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import {
  allowedDestination,
  forgetPendingDestination,
  rememberPendingDestination,
  takePendingDestination,
} from './pendingDestination';

const NOW = 1_700_000_000_000;
const HOUR = 60 * 60 * 1000;

describe('раздел, куда человек шёл до входа', () => {
  beforeEach(() => localStorage.clear());

  it('вкладка продуктов запоминается и отдаётся один раз', () => {
    expect(rememberPendingDestination('/studio', '?tab=products', NOW)).toBe(true);
    expect(takePendingDestination(NOW + 1000)).toBe('/studio?tab=products');
    expect(takePendingDestination(NOW + 2000)).toBeNull();
  });

  it('лишние параметры адреса отбрасываются', () => {
    rememberPendingDestination('/studio', '?tab=products&utm_content=sites&lang=en', NOW);
    expect(takePendingDestination(NOW)).toBe('/studio?tab=products');
  });

  // Белый список: иначе адрес из ссылки превратил бы кабинет в открытый редирект.
  it('адреса не из списка не запоминаются', () => {
    const others: [string, string][] = [
      ['/studio', '?tab=bots'],
      ['/studio', ''],
      ['/admin', '?tab=products'],
      ['//evil.example/studio', '?tab=products'],
      ['/chat', ''],
    ];
    for (const [path, search] of others) {
      expect(rememberPendingDestination(path, search, NOW), `${path}${search}`).toBe(false);
    }
    expect(takePendingDestination(NOW)).toBeNull();
  });

  it('через час забывается', () => {
    rememberPendingDestination('/studio', '?tab=products', NOW);
    expect(takePendingDestination(NOW + HOUR + 1)).toBeNull();
    expect(localStorage.getItem('pending_destination')).toBeNull();
  });

  it('подменённая запись не уводит за пределы списка', () => {
    localStorage.setItem('pending_destination', JSON.stringify({ value: 'https://evil.example/', expires: NOW + HOUR }));
    expect(takePendingDestination(NOW)).toBeNull();
  });

  it('битая запись не роняет и стирается', () => {
    localStorage.setItem('pending_destination', '{oops');
    expect(takePendingDestination(NOW)).toBeNull();
    expect(localStorage.getItem('pending_destination')).toBeNull();
  });

  it('forget стирает запомненное', () => {
    rememberPendingDestination('/studio', '?tab=products', NOW);
    forgetPendingDestination();
    expect(takePendingDestination(NOW)).toBeNull();
  });

  it('канонический вид адреса', () => {
    expect(allowedDestination('/studio', '?tab=products')).toBe('/studio?tab=products');
    expect(allowedDestination('/studio', '?tab=agents')).toBeNull();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/utils/pendingDestination.test.ts`
Expected: FAIL — нет модуля `./pendingDestination`.

- [ ] **Step 3: Реализация**

`src/utils/pendingDestination.ts`:

```ts
/**
 * Раздел кабинета, в который человек шёл до входа.
 *
 * Кнопка «Сделать сайт или бота» на linkeon.io ведёт на /studio?tab=products.
 * Новый человек сначала видит экран входа, а все пути входа кончаются голым
 * /chat: SMS и OAuth — navigate('/chat'), экран привязки —
 * window.location.replace('/chat'), ссылка из письма — страница бэкенда с
 * location.replace('/chat'). Поэтому адрес запоминается здесь до входа, а
 * после входа его забирает PendingDestinationRedirect, стоящий на /chat.
 *
 * Только из белого списка: произвольный адрес из ссылки сделал бы кабинет
 * открытым редиректом. Хранилище и срок — как у pendingAssistant:
 * localStorage (ссылку из письма часто открывают в новой вкладке), час.
 */
const KEY = 'pending_destination';
const TTL_MS = 60 * 60 * 1000;

/** Разрешённые разделы: путь и обязательная вкладка. */
const ALLOWED: { path: string; tab: string }[] = [{ path: '/studio', tab: 'products' }];

interface Stored {
  value: string;
  expires: number;
}

/** Канонический адрес из белого списка или null. Лишние параметры отбрасываются. */
export function allowedDestination(pathname: string, search: string): string | null {
  const tab = new URLSearchParams(search).get('tab');
  const hit = ALLOWED.find((a) => a.path === pathname && a.tab === tab);
  return hit ? `${hit.path}?tab=${hit.tab}` : null;
}

export function forgetPendingDestination(): void {
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
  forgetPendingDestination();
  return null;
}

/** Запомнить раздел до входа, если он из белого списка. Возвращает, запомнен ли. */
export function rememberPendingDestination(pathname: string, search: string, now = Date.now()): boolean {
  const value = allowedDestination(pathname, search);
  if (!value) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify({ value, expires: now + TTL_MS }));
    return true;
  } catch {
    /* переполненное хранилище не должно ломать вход */
    return false;
  }
}

/**
 * Запомненное — один раз: отдаёт и стирает. Просроченное не отдаётся. Запись
 * сверяется со списком повторно: в хранилище могли положить что угодно, а
 * отдаётся всегда канонический адрес из списка, не строка из хранилища.
 */
export function takePendingDestination(now = Date.now()): string | null {
  const stored = read();
  forgetPendingDestination();
  if (!stored || stored.expires <= now) return null;
  let url: URL;
  try {
    url = new URL(stored.value, 'https://cabinet.invalid');
  } catch {
    return null;
  }
  if (url.origin !== 'https://cabinet.invalid') return null;
  return allowedDestination(url.pathname, url.search);
}
```

- [ ] **Step 4: Тест проходит**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/utils/pendingDestination.test.ts`
Expected: PASS, 8 тестов.

- [ ] **Step 5: Проверка на излом**

Временно в `rememberPendingDestination` заменить `const value = allowedDestination(pathname, search);` на `const value = `${pathname}${search}`;` → прогон из Step 4 → FAIL в «адреса не из списка не запоминаются». Вернуть строку (`git checkout -- src/utils/pendingDestination.ts` не годится — файл новый; вернуть правкой) → PASS.

- [ ] **Step 6: Commit**

```bash
git add src/utils/pendingDestination.ts src/utils/pendingDestination.test.ts
git commit -m "feat(auth): запоминать раздел кабинета, куда человек шёл до входа

Кнопка «Сделать сайт или бота» на linkeon.io ведёт на /studio?tab=products,
а все пути входа кончаются голым /chat. Белый список из одного адреса,
срок — час, запись сверяется со списком и при чтении.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Кабинет — последнее намерение побеждает

**Files:**
- Create: `src/utils/loginIntent.ts`
- Modify: `src/utils/pendingAssistant.ts`, `src/pages/OnboardingPage.tsx`
- Test: `src/utils/loginIntent.test.ts`

- [ ] **Step 1: Написать тест**

`src/utils/loginIntent.test.ts`:

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { rememberLoginIntent } from './loginIntent';
import { peekPendingAssistant } from './pendingAssistant';
import { takePendingDestination } from './pendingDestination';

const NOW = 1_700_000_000_000;

describe('намерение до входа: побеждает последнее', () => {
  beforeEach(() => localStorage.clear());

  it('кнопка «Сделать сайт или бота» запоминает вкладку продуктов', () => {
    rememberLoginIntent('/studio', '?tab=products&utm_content=sites', NOW);
    expect(takePendingDestination(NOW)).toBe('/studio?tab=products');
  });

  it('страница ассистента — как раньше: запоминается ассистент', () => {
    rememberLoginIntent('/chat', '?assistant=14', NOW);
    expect(peekPendingAssistant(NOW)).toBe('14');
  });

  it('сначала сайт, потом ассистент — после входа к ассистенту', () => {
    rememberLoginIntent('/studio', '?tab=products', NOW);
    rememberLoginIntent('/chat', '?assistant=14', NOW + 1000);
    expect(peekPendingAssistant(NOW + 2000)).toBe('14');
    expect(takePendingDestination(NOW + 2000)).toBeNull();
  });

  it('сначала ассистент, потом сайт — после входа в Студию', () => {
    rememberLoginIntent('/chat', '?assistant=14', NOW);
    rememberLoginIntent('/studio', '?tab=products', NOW + 1000);
    expect(takePendingDestination(NOW + 2000)).toBe('/studio?tab=products');
    expect(peekPendingAssistant(NOW + 2000)).toBeNull();
  });

  it('обычная страница ничего не трогает', () => {
    rememberLoginIntent('/chat', '?assistant=14', NOW);
    rememberLoginIntent('/chat', '', NOW + 1000);
    rememberLoginIntent('/profile', '', NOW + 1000);
    expect(peekPendingAssistant(NOW + 2000)).toBe('14');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/utils/loginIntent.test.ts`
Expected: FAIL — нет модуля `./loginIntent`.

- [ ] **Step 3: `forgetPendingAssistant`**

В конец `src/utils/pendingAssistant.ts` дописать:

```ts
/** Стереть запомненное: у человека появилось более новое намерение (utils/loginIntent.ts). */
export function forgetPendingAssistant(): void {
  forget();
}
```

- [ ] **Step 4: `loginIntent`**

`src/utils/loginIntent.ts`:

```ts
import { forgetPendingAssistant, rememberPendingAssistant } from './pendingAssistant';
import { forgetPendingDestination, rememberPendingDestination } from './pendingDestination';

/**
 * Что человек собирался сделать, когда его встретил экран входа.
 *
 * Намерений два: ассистент со страницы на linkeon.io (?assistant=) и раздел
 * кабинета (кнопка «Сделать сайт или бота» → /studio?tab=products).
 * Побеждает последнее: кто сначала нажал «Сделать сайт», а потом пришёл со
 * страницы Райи, после входа должен попасть к Райе, а не в Студию, — и
 * наоборот. Иначе старое намерение всплыло бы после входа поверх нового.
 */
export function rememberLoginIntent(pathname: string, search: string, now = Date.now()): void {
  const assistant = new URLSearchParams(search).get('assistant');
  if (assistant?.trim()) {
    rememberPendingAssistant(assistant, now);
    forgetPendingDestination();
    return;
  }
  if (rememberPendingDestination(pathname, search, now)) forgetPendingAssistant();
}
```

- [ ] **Step 5: Тест проходит**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/utils/loginIntent.test.ts src/utils/pendingAssistant.test.ts`
Expected: PASS, 11 тестов (5 новых + 6 прежних в `pendingAssistant.test.ts`).

- [ ] **Step 6: Проверка на излом**

Временно удалить строку `forgetPendingDestination();` в `loginIntent.ts` → прогон Step 5 → FAIL в «сначала сайт, потом ассистент». Вернуть → PASS.

- [ ] **Step 7: OnboardingPage — запоминать намерение**

В `src/pages/OnboardingPage.tsx`:

импорт `import { useSearchParams } from 'react-router-dom';` заменить на

```tsx
import { useLocation, useSearchParams } from 'react-router-dom';
```

импорт `import { rememberPendingAssistant } from '../utils/pendingAssistant';` заменить на

```tsx
import { rememberLoginIntent } from '../utils/loginIntent';
```

после `const [searchParams] = useSearchParams();` добавить

```tsx
  const location = useLocation();
```

в первом `useEffect` блок

```tsx
    // Пришёл со страницы ассистента (linkeon.io/assistants/…): запоминаем, к
    // кому, — после входа кабинет откроет чат с ним, а не экран выбора темы.
    rememberPendingAssistant(searchParams.get('assistant'));
  }, [searchParams]);
```

заменить на

```tsx
    // Пришёл со страницы ассистента (?assistant=) или с кнопки «Сделать сайт
    // или бота» (/studio?tab=products): запоминаем — после входа кабинет
    // откроет нужное, а не голый чат. Последнее намерение побеждает
    // (utils/loginIntent.ts).
    rememberLoginIntent(location.pathname, location.search);
  }, [searchParams, location.pathname, location.search]);
```

- [ ] **Step 8: Тесты онбординга и чата не покраснели**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/pages src/utils`
Expected: PASS. Полный набор — в Task 5 на ноде.

- [ ] **Step 9: Commit**

```bash
git add src/utils/loginIntent.ts src/utils/loginIntent.test.ts src/utils/pendingAssistant.ts src/pages/OnboardingPage.tsx
git commit -m "feat(auth): до входа запоминать намерение — ассистента или раздел; побеждает последнее

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Кабинет — после входа в запомненный раздел

**Files:**
- Create: `src/components/PendingDestinationRedirect.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/PendingDestinationRedirect.test.tsx`

- [ ] **Step 1: Написать тест**

`src/components/PendingDestinationRedirect.test.tsx`:

```tsx
// @vitest-environment jsdom
//
// Все пути входа кончаются голым /chat. Человек, нажавший на linkeon.io
// «Сделать сайт или бота», после входа должен оказаться во вкладке продуктов,
// а явные адреса (/chat?assistant=…, другие разделы) перехватывать нельзя.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { flush, mount, visibleText, type Mounted } from '../test/dom';
import PendingDestinationRedirect from './PendingDestinationRedirect';
import { rememberPendingDestination } from '../utils/pendingDestination';

// Экран-свидетель: показывает, где человек оказался.
const Where = () => {
  const l = useLocation();
  return <div>at:{l.pathname}{l.search}</div>;
};

let view: Mounted | null = null;

async function open(url: string): Promise<string> {
  view = mount(
    <MemoryRouter initialEntries={[url]}>
      <PendingDestinationRedirect />
      <Routes>
        <Route path="*" element={<Where />} />
      </Routes>
    </MemoryRouter>,
  );
  await flush();
  return visibleText(view.container);
}

beforeEach(() => localStorage.clear());

afterEach(() => {
  view?.unmount();
  view = null;
});

describe('после входа — в раздел, куда человек шёл', () => {
  it('голый /chat и запомненная Студия → вкладка продуктов, запись стёрта', async () => {
    rememberPendingDestination('/studio', '?tab=products');
    expect(await open('/chat')).toBe('at:/studio?tab=products');
    expect(localStorage.getItem('pending_destination')).toBeNull();
  });

  it('ничего не запомнено — остаётся в чате', async () => {
    expect(await open('/chat')).toBe('at:/chat');
  });

  it('/chat с явным адресом не перехватывается', async () => {
    rememberPendingDestination('/studio', '?tab=products');
    expect(await open('/chat?assistant=14')).toBe('at:/chat?assistant=14');
  });

  it('другой раздел не перехватывается', async () => {
    rememberPendingDestination('/studio', '?tab=products');
    expect(await open('/profile')).toBe('at:/profile');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/PendingDestinationRedirect.test.tsx`
Expected: FAIL — нет модуля `./PendingDestinationRedirect`.

- [ ] **Step 3: Реализация**

`src/components/PendingDestinationRedirect.tsx`:

```tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { takePendingDestination } from '../utils/pendingDestination';

// После входа — в раздел, куда человек шёл до него (utils/pendingDestination.ts).
//
// Все пути входа кончаются голым /chat: SMS и OAuth, экран привязки, ссылка
// из письма (её обслуживает страница бэкенда с location.replace('/chat')).
// Поэтому ловим именно голый /chat, а не правим каждый путь — так покрыт и
// вход по письму, до которого фронт не дотягивается. /chat с параметрами —
// чей-то явный адрес (?assistant=, ?view=tokens), его не трогаем.
const PendingDestinationRedirect: React.FC = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/chat' || search) return;
    const destination = takePendingDestination();
    if (destination) navigate(destination, { replace: true });
  }, [pathname, search, navigate]);

  return null;
};

export default PendingDestinationRedirect;
```

- [ ] **Step 4: Тест проходит**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/PendingDestinationRedirect.test.tsx`
Expected: PASS, 4 теста.

- [ ] **Step 5: Проверка на излом**

Временно заменить `if (pathname !== '/chat' || search) return;` на `if (pathname !== '/chat') return;` → FAIL в «/chat с явным адресом не перехватывается». Вернуть → PASS.

- [ ] **Step 6: Смонтировать в оболочке вошедшего**

В `src/App.tsx` после `import RootRedirect from './components/RootRedirect';`:

```tsx
import PendingDestinationRedirect from './components/PendingDestinationRedirect';
```

В ветке вошедшего пользователя (`return ( <div className="flex h-screen bg-gray-50">`) перед `<ReferralWelcomeBanner />`:

```tsx
      {/* После входа — в раздел, куда человек шёл до него (кнопка «Сделать сайт или бота» на linkeon.io). */}
      <PendingDestinationRedirect />
```

Внутри `AppContent`, а не рядом с публичными маршрутами: редирект нужен только вошедшему, а `/auth/*` и `/room/*` живут снаружи и после входа сами уводят на `/chat`, где его и ждут.

- [ ] **Step 7: Commit**

```bash
git add src/components/PendingDestinationRedirect.tsx src/components/PendingDestinationRedirect.test.tsx src/App.tsx
git commit -m "feat(auth): после входа — в раздел, куда человек шёл до него

Ловим голый /chat в оболочке вошедшего: так покрыты все пути входа, включая
ссылку из письма, которую обслуживает страница бэкенда.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Кабинет — прогон, слияние, выкат

- [ ] **Step 1: Полный прогон на ноде**

```bash
WT=~/Downloads/spirits_front/.worktrees/sites-destination
git -C "$WT" push -q -u origin feat/sites-destination
SHA=$(git -C "$WT" rev-parse HEAD)
BASE=$(git -C "$WT" merge-base HEAD origin/main)
ssh dv@85.192.61.231 "git -C ~/ci/spirits_front fetch -q origin && (git -C ~/ci/spirits_front worktree add --detach ~/ci/wt/sites-destination $SHA 2>/dev/null || git -C ~/ci/wt/sites-destination checkout -q --detach $SHA) && cd ~/ci/wt/sites-destination && source ~/.nvm/nvm.sh && pnpm install --frozen-lockfile >/dev/null 2>&1; (pnpm test > /tmp/sd-test.log 2>&1 && echo TESTS_OK || echo TESTS_FAILED); tail -6 /tmp/sd-test.log; (pnpm build > /tmp/sd-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); echo \"tsc errors (ветка): \$(pnpm typecheck 2>&1 | grep -c 'error TS')\"; git checkout -q --detach $BASE && echo \"tsc errors (main): \$(pnpm typecheck 2>&1 | grep -c 'error TS')\"; git checkout -q --detach $SHA"
```

Вывод — в файлы, а не в конвейер с `tail`: конвейер вернул бы код `tail`, и красные тесты выглядели бы прошедшими.

Expected: `TESTS_OK`, `BUILD_OK`; ошибок `tsc` на ветке не больше, чем на `main` (их там несколько десятков старых — сравнивается разница, а не ноль).

- [ ] **Step 2: Слить в main (без общего чекаута)**

```bash
cd ~/Downloads/spirits_front/.worktrees/sites-destination
git fetch -q origin
git checkout -q --detach origin/main
git merge --no-ff feat/sites-destination -m "Merge feat/sites-destination: после входа — в раздел, куда человек шёл (кнопка «Сделать сайт или бота»)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
git push origin HEAD:main
```

В общем чекауте `~/Downloads/spirits_front` ничего не менять: там работают другие сессии.

- [ ] **Step 3: СТОП — согласие владельца на выкат на test**

Спросить владельца. Напомнить: `deploy.sh` без явного «да» не запускается; раскатку может вести другая сессия — спросить, не катит ли кто-то сейчас.

- [ ] **Step 4: Выкат только на test**

```bash
CLONE=$(mktemp -d)/spirits_front
git clone -q --branch main git@github.com:dvvolkovv/spirits.git "$CLONE"
mkdir -p ~/deploy-logs
cd ~/Downloads/spirits_back
( TEST_ONLY=1 FRONT_ONLY=1 LOCAL_FRONT_DIR="$CLONE" nohup bash scripts/deploy.sh > ~/deploy-logs/sites-destination-test.log 2>&1 < /dev/null & )
```

Чистый клон — потому что `deploy.sh` пушит локальную `main` фронта, а в общем чекауте может лежать чужой незапушенный коммит. Запуск отвязанный: убитый процесс `deploy.sh` откатывает test на прежний коммит. Следить за логом Monitor-ом, без `| tail` в самой команде запуска. Итог — `ALL SMOKE LAYERS GREEN` / `ALL PHASES GREEN`. Красное на SSH-звеньях (`kex_exchange_identification`, `Connection closed`) — это троттлинг sshd ноды, а не код: показать лог владельцу, не откатывать вслепую.

- [ ] **Step 5: Живая проверка на test.linkeon.io**

Скрипт (Playwright, в репозиторий не кладётся) — на ноде в `/tmp/e2e-sites-destination.cjs`, по образцу `/tmp/e2e-assistant-deeplink.cjs` от 01.10: новый номер из тестового диапазона, Basic Auth через `page.route`, вход через отладочный код. Код скрипта здесь сознательно не приводится: репозиторий публичный, а готовый сценарий входа в него не кладут. Образец лежит на ноде — прочитать его там. Отличия от образца:

- старт — `${BASE}/studio?tab=products&utm_content=sites&lang=ru`;
- отладочные ручки с 01.10 требуют заголовок секрета: значение `DEBUG_SECRET` читается из `.env` бэка тестовой среды (путь — `TEST_BACK_PATH` в `test-server.env.local`) в переменную окружения при запуске и в файлы не пишется;
- после входа ждать навигацию, затем записать `location.pathname + location.search`, наличие текста вкладки продуктов (`Мои продукты`) и остаток `localStorage.pending_destination`;
- результат — JSON `{phone, url, productsTab, pendingLeft}` и скриншот `/tmp/e2e-sites-destination.png`; код выхода 0 только при `url` = `/studio?tab=products`, `productsTab > 0`, `pendingLeft === null`.

Run (с мака): `ssh dv@85.192.61.231 'set -a; . ~/dev/spirits_back/scripts/test-server.env.local; set +a; DEBUG_SECRET=$(grep -E "^DEBUG_SECRET=" "$TEST_BACK_PATH/.env" | cut -d= -f2-) ; source ~/.nvm/nvm.sh; BASIC_AUTH="$TEST_BASIC_AUTH" DEBUG_SECRET="$DEBUG_SECRET" NODE_PATH=~/dev/spirits_back/tests/node_modules node /tmp/e2e-sites-destination.cjs'`

Expected: `{"phone":"<новый тестовый номер>","url":"https://test.linkeon.io/studio?tab=products","productsTab":1,"pendingLeft":null}` и код выхода 0. Скриншот забрать (`scp dv@85.192.61.231:/tmp/e2e-sites-destination.png <scratchpad>/`) и посмотреть: открыта вкладка «Продукты» Студии, пустое состояние с кнопкой «Новый продукт».

Обратная проверка тем же скриптом со стартом `${BASE}/chat?assistant=14&lang=ru` — поведение страниц ассистентов не изменилось: открыт чат с Райей.

- [ ] **Step 6: СТОП — согласие владельца на прод**

Показать результат Step 5. Предложить `FRONT_ONLY=1`: меняется только фронт, а перезапуск API рвёт живые разговоры.

- [ ] **Step 7: Выкат на прод**

```bash
CLONE=$(mktemp -d)/spirits_front
git clone -q --branch main git@github.com:dvvolkovv/spirits.git "$CLONE"
cd ~/Downloads/spirits_back
( FRONT_ONLY=1 LOCAL_FRONT_DIR="$CLONE" nohup bash scripts/deploy.sh > ~/deploy-logs/sites-destination.log 2>&1 < /dev/null & )
```

Клон свежий: между Step 4 и этим шагом в `main` могли влить чужое. Итог — `ALL PHASES GREEN`. Что код доехал — по содержимому свежего бандла, а не по коду ответа: `ssh dvolkov@212.113.106.202 'grep -l pending_destination /home/dvolkov/spirits_front/dist/assets/*.js | head -1'` → один файл.

---

### Task 6: Лендинг — прайс в общий модуль, аренда продукта

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/sites-section`.

**Files:**
- Create: `src/content/tokenPackages.ts`, `src/content/products.ts`
- Modify: `src/components/sections/Pricing.tsx`
- Test: `src/content/products.test.ts`

- [ ] **Step 1: Написать тест**

`src/content/products.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { RENT_TOKENS, rentInterpolation, rentRubles } from './products';
import { PACKAGES } from './tokenPackages';

describe('аренда продукта', () => {
  it('рубли считаются по цене стартового пакета', () => {
    const starter = PACKAGES.find((p) => p.id === 'starter')!;
    expect(rentRubles()).toBe(Math.round((RENT_TOKENS * starter.price) / starter.tokens));
  });

  // Сегодняшние числа — чтобы правка аренды или прайса не прошла незамеченной:
  // в FAQ на семи языках есть слова, которые интерполяцией не выражаются.
  it('сегодня аренда — 50 000 токенов, по стартовому пакету 149 ₽', () => {
    expect(RENT_TOKENS).toBe(50_000);
    expect(rentRubles()).toBe(149);
  });

  it('числа — в формате языка страницы', () => {
    expect(rentInterpolation('ru').tokens).toBe('50 000');
    expect(rentInterpolation('en').tokens).toBe('50,000');
    expect(rentInterpolation('de').tokens).toBe('50.000');
    expect(rentInterpolation('zh').tokens).toBe('50,000');
    expect(rentInterpolation('ru').price).toBe('149');
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/content/products.test.ts`
Expected: FAIL — нет модулей `./products` и `./tokenPackages`.

- [ ] **Step 3: `tokenPackages.ts` — перенос прайса**

`src/content/tokenPackages.ts`:

```ts
export interface Pkg {
  id: 'starter' | 'extended' | 'professional' | 'business' | 'maximum';
  tokens: number;
  price: number;
  savings?: string;
  popular?: boolean;
}

/**
 * Рублёвый прайс. Продублирован из приложения (spirits_front,
 * src/config/tokenPackages.ts): лендинг — отдельный репозиторий, общего
 * модуля у них нет. При изменении цен править оба места, иначе витрина
 * обещает не то, что покажет касса.
 *
 * Отдельным модулем, а не внутри Pricing.tsx: отсюда же секция «Сайты и
 * боты» считает рубли месячной аренды (src/content/products.ts).
 *
 * Проценты экономии — ярлыки, округлённые вниз до пятёрки, как и в приложении.
 */
export const PACKAGES: Pkg[] = [
  { id: 'starter', tokens: 50000, price: 149 },
  { id: 'extended', tokens: 200000, price: 499, savings: '15%' },
  { id: 'professional', tokens: 1000000, price: 1990, savings: '30%', popular: true },
  { id: 'business', tokens: 3000000, price: 4990, savings: '40%' },
  { id: 'maximum', tokens: 7000000, price: 9990, savings: '50%' },
];
```

В `src/components/sections/Pricing.tsx` удалить `interface Pkg { … }`, комментарий «Прайс продублирован из приложения …» и `const PACKAGES: Pkg[] = [ … ];` целиком, а к импортам добавить:

```tsx
import { PACKAGES, type Pkg } from '../../content/tokenPackages';
```

- [ ] **Step 4: `products.ts` — аренда**

`src/content/products.ts`:

```ts
import { PACKAGES } from './tokenPackages';
import { formattingLocale } from '../i18n/languages';

/**
 * Месячная аренда продукта Linkeon (сайта или телеграм-бота) в токенах.
 *
 * Зеркало RENT_TOKENS из spirits_back/src/products/rent.service.ts; второе
 * зеркало — spirits_front/src/components/products/rent.ts. Бэкенд это число
 * наружу не отдаёт, поэтому копии и ссылки между ними. Поменяли аренду —
 * правьте все три.
 *
 * Потолок «до двух продуктов на аккаунт» (DEFAULT_MAX_PRODUCTS в
 * spirits_back/src/products/limits.service.ts) числом не подставляется: он
 * написан словом в ответе FAQ о цене на семи языках. Поменяли потолок —
 * правьте эти семь строк.
 */
export const RENT_TOKENS = 50_000;

/**
 * Аренда в рублях по цене стартового пакета. Формула, а не число в тексте:
 * фраза «это N ₽ по стартовому пакету» остаётся верной при любой аренде и
 * любом прайсе.
 */
export function rentRubles(): number {
  const starter = PACKAGES.find((p) => p.id === 'starter');
  if (!starter) throw new Error('В прайсе нет стартового пакета — нечем считать аренду в рублях');
  return Math.round((RENT_TOKENS * starter.price) / starter.tokens);
}

/** Переменные для текстов об аренде ({{tokens}}, {{price}}) — в формате языка страницы. */
export function rentInterpolation(language: string): { tokens: string; price: string } {
  const locale = formattingLocale(language);
  return {
    tokens: RENT_TOKENS.toLocaleString(locale),
    price: rentRubles().toLocaleString(locale),
  };
}
```

- [ ] **Step 5: Тест проходит**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/content/products.test.ts`
Expected: PASS, 3 теста.

- [ ] **Step 6: Commit**

```bash
git add src/content/tokenPackages.ts src/content/products.ts src/content/products.test.ts src/components/sections/Pricing.tsx
git commit -m "feat(landing): прайс — общим модулем, аренда продукта — из одного места

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Лендинг — нерусские локали без кириллицы и рублей

**Files:**
- Test: `src/i18n/locales.script.test.ts`

- [ ] **Step 1: Написать тест**

`src/i18n/locales.script.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages.data.js';
import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

/**
 * Нерусская версия главной не несёт ни кириллицы, ни рублей. Кириллица там —
 * непереведённый кусок; рубль — цена, по которой иностранец заплатить не
 * сможет (витрина на других языках валютная).
 *
 * Такая проверка уже была, но только для текстов страниц ассистентов
 * (src/content/assistants/packs.test.ts) — файлы главной она не видит.
 * Проверяется весь файл, а не отдельные ветки: на 06.10.2026 все шесть чистые.
 */
const LOCALES: Record<string, unknown> = { en, es, de, fr, pt, zh };

function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
      strings(v, path ? `${path}.${k}` : k),
    );
  }
  return [];
}

describe('нерусские локали главной: без кириллицы и рублей', () => {
  it('проверяются все языки реестра', () => {
    expect(Object.keys(LOCALES).sort()).toEqual(
      SUPPORTED_CODES.filter((code) => code !== DEFAULT_LANGUAGE).sort(),
    );
  });

  for (const [code, locale] of Object.entries(LOCALES)) {
    it(code, () => {
      const leaks = strings(locale)
        .filter(([, s]) => /[Ѐ-ӿ₽]/.test(s))
        .map(([p, s]) => `${p}: ${s}`);
      expect(leaks).toEqual([]);
    });
  }
});
```

- [ ] **Step 2: Тест проходит на нынешних файлах**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/i18n/locales.script.test.ts`
Expected: PASS, 7 тестов.

- [ ] **Step 3: Проверка на излом**

Временно в `src/i18n/locales/en.json` дописать « ₽» в конец `pricing.trust.gift` → прогон Step 2 → FAIL с путём `pricing.trust.gift`. Вернуть: `git checkout -- src/i18n/locales/en.json` → PASS.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/locales.script.test.ts
git commit -m "test(i18n): нерусские локали главной — без кириллицы и рублей

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Лендинг — тексты на семи языках

Тексты вносятся скриптом, а не 56 ручными правками: так невозможно пропустить язык или сломать JSON. Скрипт вне репозитория; в репозиторий попадают только локали.

**Files:**
- Modify: `src/i18n/locales/{ru,en,es,de,fr,pt,zh}.json`
- Скрипт: `~/Downloads/land_linkeon/.superpowers/sites-section/apply-texts.mjs` (gitignore)

- [ ] **Step 1: Скрипт с текстами**

`~/Downloads/land_linkeon/.superpowers/sites-section/apply-texts.mjs`:

```js
#!/usr/bin/env node
// Тексты секции «Сайты и боты» и попутные правки главной — во все семь локалей.
//   node ~/Downloads/land_linkeon/.superpowers/sites-section/apply-texts.mjs \
//        ~/Downloads/land_linkeon/.worktrees/sites-section/src/i18n/locales
//
// Повторный запуск безопасен: вставки перезаписывают свои ключи, замены
// пропускаются, если уже сделаны, вопросы FAQ не дублируются. Файлы пишутся
// через JSON.stringify(…, 2): en, fr, zh уже в этом виде; в ru, es, de, pt
// однострочные отзывы (testimonials.items) развернутся в многострочные —
// разница только в переносах строк.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) throw new Error('Укажите каталог src/i18n/locales');

const NB = ' '; // неразрывный пробел французской типографики, как во всём fr.json

const TEXTS = {
  ru: {
    nav: 'Сайты и боты',
    footer: 'Сайты и боты',
    replace: [
      ['hero.creator.sub', 'Юлия спрашивает', 'Роман спрашивает'],
      ['hero.video.sub', 'Юлия придумает', 'Роман придумает'],
      ['hero.video.sub', '— она соберёт', '— он соберёт'],
      ['content.images.caption', 'Imagen 4.0 Ultra — реалистично и быстро.', 'Реалистично и быстро.'],
    ],
    features: {
      title: 'Контент, сайты и боты',
      items: [
        'Сайт или телеграм-бот: ассистент соберёт и будет поправлять по вашим словам',
        'Хостинг и свой домен — в том же балансе',
      ],
    },
    faq: [
      {
        q: 'Сколько стоят сайт или бот?',
        a: 'Создать — бесплатно, первый месяц тоже. Дальше {{tokens}} токенов в месяц за каждый — по стартовому пакету это {{price}} ₽. Правки списываются отдельно, по объёму работы — как ответы ассистента. Если токенов не хватит, сайт уснёт: код, адрес и домен сохранятся, а после пополнения он проснётся сам. Долг не копится. На аккаунт — до двух сайтов или ботов; нужно больше — напишите в поддержку.',
      },
      {
        q: 'Можно подключить свой домен?',
        a: 'Да, бесплатно — это входит в аренду. Впишите домен в карточке сайта: Linkeon покажет, какие записи создать у регистратора, сам их проверит и выпустит сертификат. Адрес на Linkeon продолжит работать рядом. Свой домен бывает у сайта; у бота адреса нет.',
      },
      {
        q: 'Что, если правка сломает сайт?',
        a: 'После каждой правки Linkeon проверяет, что сайт открывается. Если нет — сам возвращает прошлую версию, и токены за такую правку не списываются. Любую правку из истории можно откатить и вручную — одной кнопкой.',
      },
    ],
    sites: {
      eyebrow: 'Сайты и боты',
      h2: 'Сайт и телеграм-бот — тоже словами',
      sub: 'Опишите своими словами, что нужно. Ассистент соберёт сайт или бота и запустит его, а дальше будет поправлять по вашим просьбам. Сервер, адрес и обновления — на Linkeon.',
      site: {
        title: 'Сайт',
        kinds: 'Визитка, лендинг, меню, портфолио',
        mock: {
          url: 'ваш-домен.рф',
          name: 'Кофейня «Зерно»',
          lines: ['Эспрессо · Капучино · Раф', 'Выпечка каждое утро'],
          hours: 'Ежедневно 8:00–21:00',
        },
        points: [
          'Адрес на Linkeon появляется сразу, свой домен подключается бесплатно',
          'Правки словами — «добавь страницу с ценами» — в чате сайта или у ассистента, с которым вы работаете',
          'Сайт не открылся после правки — Linkeon сам вернёт прошлую версию. Любую правку можно откатить кнопкой',
        ],
      },
      bot: {
        title: 'Телеграм-бот',
        kinds: 'Запись, заявки, ответы на частые вопросы',
        mock: { ask: 'Хочу записаться на субботу', reply: 'Свободно в субботу:', slots: ['12:00', '15:00'] },
        points: [
          'Нужен только токен от @BotFather — остальное сделает ассистент',
          'Что бот умеет, вы объясняете словами — и так же его правите',
          'Работает на сервере Linkeon круглосуточно, ваш компьютер не нужен',
        ],
      },
      terms: [
        { title: 'Первый месяц бесплатно', text: 'Создать сайт или бота ничего не стоит' },
        { title: 'Дальше — {{tokens}} токенов в месяц', text: 'Это {{price}} ₽ по стартовому пакету. Правки — по объёму работы, как ответы ассистента' },
        { title: 'Свой домен — бесплатно', text: 'Входит в аренду, сертификат Linkeon выпустит сам' },
        { title: 'Кончились токены — уснёт, а не пропадёт', text: 'Код и домен сохранятся, после пополнения проснётся сам. Долг не копится' },
      ],
      cta: 'Сделать сайт или бота',
    },
  },

  en: {
    nav: 'Websites & bots',
    footer: 'Websites and bots',
    replace: [
      ['hero.creator.sub', 'Yulia asks', 'Roman asks'],
      ['hero.video.sub', 'Yulia writes', 'Roman writes'],
      ['hero.video.sub', "and she'll build", "and he'll build"],
      ['content.images.caption', 'Imagen 4.0 Ultra — realistic and fast.', 'Realistic and fast.'],
    ],
    features: {
      title: 'Content, websites and bots',
      items: [
        'A website or a Telegram bot: the assistant builds it and keeps changing it at your word',
        'Hosting and your own domain — from the same balance',
      ],
    },
    faq: [
      {
        q: 'How much does a website or bot cost?',
        a: "Creating one is free, and so is the first month. After that it's {{tokens}} tokens a month for each. Changes are charged separately, by the amount of work — like assistant replies. If you run out of tokens, the site goes to sleep: code, address and domain are kept, and it wakes up by itself once you top up. No debt builds up. Each account can have up to two websites or bots; if you need more, write to support.",
      },
      {
        q: 'Can I connect my own domain?',
        a: "Yes, for free — it's included in the rent. Enter the domain on the website's card: Linkeon shows which records to create at your registrar, checks them itself and issues the certificate. The Linkeon address keeps working alongside. Only a website can have its own domain; a bot has no address.",
      },
      {
        q: 'What if a change breaks the site?',
        a: "After every change, Linkeon checks that the site opens. If it doesn't, Linkeon rolls back to the previous version by itself, and no tokens are charged for that change. Any change from the history can also be undone by hand — with one click.",
      },
    ],
    sites: {
      eyebrow: 'Websites and bots',
      h2: 'A website or a Telegram bot — also in plain words',
      sub: 'Describe what you need in your own words. The assistant builds the website or bot and launches it, then keeps making changes whenever you ask. Server, address and updates are on Linkeon.',
      site: {
        title: 'Website',
        kinds: 'Business card, landing page, menu, portfolio',
        mock: {
          url: 'your-domain.com',
          name: 'Grain Coffee House',
          lines: ['Espresso · Cappuccino · Flat white', 'Fresh pastries every morning'],
          hours: 'Open daily, 8 am – 9 pm',
        },
        points: [
          'You get an address on Linkeon right away; connecting your own domain is free',
          "Changes in plain words — “add a pricing page” — in the website's chat or with the assistant you work with",
          "If the site doesn't open after a change, Linkeon rolls back to the previous version by itself. Any change can be undone with one click",
        ],
      },
      bot: {
        title: 'Telegram bot',
        kinds: 'Bookings, requests, answers to common questions',
        mock: { ask: "I'd like to book for Saturday", reply: 'Free on Saturday:', slots: ['12 pm', '3 pm'] },
        points: [
          'All you need is a token from @BotFather — the assistant does the rest',
          'You explain in words what the bot should do — and change it the same way',
          "Runs on Linkeon's server around the clock; your computer isn't needed",
        ],
      },
      terms: [
        { title: 'First month free', text: 'Creating a website or bot costs nothing' },
        { title: 'Then {{tokens}} tokens a month', text: 'Changes are charged by the amount of work, like assistant replies' },
        { title: 'Your own domain — free', text: 'Included in the rent; Linkeon issues the certificate itself' },
        { title: "Out of tokens — it sleeps, it isn't lost", text: 'Code and domain are kept, and it wakes up by itself after you top up. No debt builds up' },
      ],
      cta: 'Make a website or bot',
    },
  },

  es: {
    nav: 'Sitios y bots',
    footer: 'Sitios web y bots',
    replace: [
      ['hero.creator.sub', 'Yulia pregunta', 'Román pregunta'],
      ['hero.video.sub', 'Yulia escribe', 'Román escribe'],
      ['hero.video.sub', 'y ella monta', 'y él monta'],
      ['content.images.caption', 'Imagen 4.0 Ultra: realista y rápido.', 'Realista y rápido.'],
    ],
    features: {
      title: 'Contenido, sitios web y bots',
      items: [
        'Un sitio web o un bot de Telegram: el asistente lo monta y lo va ajustando según sus palabras',
        'Alojamiento y dominio propio, con el mismo saldo',
      ],
    },
    faq: [
      {
        q: '¿Cuánto cuesta un sitio web o un bot?',
        a: 'Crearlo es gratis, y el primer mes también. Después, {{tokens}} tokens al mes por cada uno. Los cambios se cobran aparte, según el trabajo, como las respuestas de un asistente. Si no le alcanzan los tokens, el sitio se duerme: el código, la dirección y el dominio se conservan, y al recargar el saldo se despierta solo. No se acumula deuda. Cada cuenta puede tener hasta dos sitios o bots; si necesita más, escriba a soporte.',
      },
      {
        q: '¿Puedo conectar mi propio dominio?',
        a: 'Sí, gratis: está incluido en el alquiler. Escriba el dominio en la ficha del sitio: Linkeon le indica qué registros crear en su registrador, los comprueba por su cuenta y emite el certificado. La dirección en Linkeon sigue funcionando a la vez. Solo un sitio web puede tener dominio propio; un bot no tiene dirección.',
      },
      {
        q: '¿Y si un cambio rompe el sitio?',
        a: 'Después de cada cambio, Linkeon comprueba que el sitio abre. Si no abre, vuelve solo a la versión anterior y no cobra tokens por ese cambio. Cualquier cambio del historial también se puede deshacer a mano, con un botón.',
      },
    ],
    sites: {
      eyebrow: 'Sitios web y bots',
      h2: 'Un sitio web o un bot de Telegram, también con palabras',
      sub: 'Describa con sus propias palabras lo que necesita. El asistente monta el sitio o el bot y lo pone en marcha, y después lo va ajustando cada vez que usted se lo pida. Servidor, dirección y actualizaciones corren a cargo de Linkeon.',
      site: {
        title: 'Sitio web',
        kinds: 'Tarjeta de visita, landing, carta, portafolio',
        mock: {
          url: 'su-dominio.es',
          name: 'Cafetería Grano',
          lines: ['Espresso · Capuchino · Cortado', 'Bollería recién hecha cada mañana'],
          hours: 'Todos los días, 8:00–21:00',
        },
        points: [
          'La dirección en Linkeon aparece al momento; conectar su propio dominio es gratis',
          'Cambios con palabras —«añade una página de precios»— en el chat del sitio o con el asistente con el que trabaja',
          'Si el sitio no abre tras un cambio, Linkeon vuelve solo a la versión anterior. Cualquier cambio se deshace con un botón',
        ],
      },
      bot: {
        title: 'Bot de Telegram',
        kinds: 'Reservas, solicitudes, respuestas a preguntas frecuentes',
        mock: { ask: 'Quiero reservar para el sábado', reply: 'Libre el sábado:', slots: ['12:00', '15:00'] },
        points: [
          'Solo hace falta un token de @BotFather; el resto lo hace el asistente',
          'Lo que hace el bot se lo explica con palabras, y del mismo modo lo cambia',
          'Funciona en el servidor de Linkeon día y noche; su ordenador no hace falta',
        ],
      },
      terms: [
        { title: 'Primer mes gratis', text: 'Crear un sitio o un bot no cuesta nada' },
        { title: 'Después, {{tokens}} tokens al mes', text: 'Los cambios se cobran según el trabajo, como las respuestas del asistente' },
        { title: 'Dominio propio, gratis', text: 'Incluido en el alquiler; Linkeon emite el certificado por su cuenta' },
        { title: 'Sin tokens, se duerme, no se pierde', text: 'El código y el dominio se conservan y, al recargar, se despierta solo. No se acumula deuda' },
      ],
      cta: 'Crear un sitio o un bot',
    },
  },

  de: {
    nav: 'Websites & Bots',
    footer: 'Websites und Bots',
    replace: [
      ['hero.creator.sub', 'Yulia fragt', 'Roman fragt'],
      ['hero.video.sub', 'Yulia schreibt', 'Roman schreibt'],
      ['hero.video.sub', 'daraus baut sie den Clip', 'daraus baut er den Clip'],
      ['content.images.caption', 'Imagen 4.0 Ultra — realistisch und schnell.', 'Realistisch und schnell.'],
    ],
    features: {
      title: 'Content, Websites und Bots',
      items: [
        'Website oder Telegram-Bot: Der Assistent baut und ändert alles auf Zuruf',
        'Hosting und eigene Domain — aus demselben Guthaben',
      ],
    },
    faq: [
      {
        q: 'Was kostet eine Website oder ein Bot?',
        a: 'Das Anlegen ist kostenlos, der erste Monat auch. Danach kostet jedes Projekt {{tokens}} Tokens im Monat. Änderungen werden extra nach Aufwand abgerechnet — wie Antworten eines Assistenten. Reichen die Tokens nicht, schläft die Website ein: Code, Adresse und Domain bleiben erhalten, und nach dem Aufladen wacht sie von selbst auf. Schulden entstehen keine. Pro Konto sind bis zu zwei Websites oder Bots möglich; brauchen Sie mehr, schreiben Sie dem Support.',
      },
      {
        q: 'Kann ich meine eigene Domain verbinden?',
        a: 'Ja, kostenlos — das ist in der Miete enthalten. Tragen Sie die Domain in der Karte der Website ein: Linkeon zeigt, welche Einträge Sie beim Registrar anlegen müssen, prüft sie selbst und stellt das Zertifikat aus. Die Linkeon-Adresse funktioniert daneben weiter. Eine eigene Domain gibt es nur für Websites; ein Bot hat keine Adresse.',
      },
      {
        q: 'Was, wenn eine Änderung die Website kaputt macht?',
        a: 'Nach jeder Änderung prüft Linkeon, ob sich die Website öffnet. Wenn nicht, stellt Linkeon selbst die vorige Version wieder her — und für diese Änderung werden keine Tokens abgebucht. Jede Änderung aus dem Verlauf lässt sich auch von Hand zurücknehmen — mit einem Klick.',
      },
    ],
    sites: {
      eyebrow: 'Websites und Bots',
      h2: 'Website oder Telegram-Bot — ebenfalls in Worten',
      sub: 'Beschreiben Sie in eigenen Worten, was Sie brauchen. Der Assistent baut Website oder Bot, bringt alles online und passt es danach auf Zuruf an. Server, Adresse und Updates übernimmt Linkeon.',
      site: {
        title: 'Website',
        kinds: 'Visitenkarte, Landingpage, Speisekarte, Portfolio',
        mock: {
          url: 'ihre-domain.de',
          name: 'Café Korn',
          lines: ['Espresso · Cappuccino · Flat White', 'Jeden Morgen frisches Gebäck'],
          hours: 'Täglich 8–21 Uhr',
        },
        points: [
          'Eine Adresse bei Linkeon gibt es sofort, die eigene Domain verbinden Sie kostenlos',
          'Änderungen in Worten — „füge eine Preisseite hinzu“ — im Chat der Website oder beim Assistenten, mit dem Sie arbeiten',
          'Öffnet sich die Website nach einer Änderung nicht, stellt Linkeon die vorige Version selbst wieder her. Jede Änderung lässt sich per Klick zurücknehmen',
        ],
      },
      bot: {
        title: 'Telegram-Bot',
        kinds: 'Terminbuchung, Anfragen, Antworten auf häufige Fragen',
        mock: { ask: 'Ich möchte einen Termin am Samstag', reply: 'Am Samstag frei:', slots: ['12:00', '15:00'] },
        points: [
          'Sie brauchen nur einen Token von @BotFather — den Rest erledigt der Assistent',
          'Was der Bot können soll, erklären Sie in Worten — und ändern es genauso',
          'Läuft rund um die Uhr auf dem Linkeon-Server, Ihr Computer wird nicht gebraucht',
        ],
      },
      terms: [
        { title: 'Erster Monat kostenlos', text: 'Eine Website oder einen Bot anzulegen kostet nichts' },
        { title: 'Danach {{tokens}} Tokens im Monat', text: 'Änderungen werden nach Aufwand abgerechnet, wie Antworten des Assistenten' },
        { title: 'Eigene Domain — kostenlos', text: 'In der Miete enthalten, das Zertifikat stellt Linkeon selbst aus' },
        { title: 'Keine Tokens mehr — schläft, verschwindet nicht', text: 'Code und Domain bleiben erhalten, nach dem Aufladen wacht alles von selbst auf. Schulden entstehen keine' },
      ],
      cta: 'Website oder Bot erstellen',
    },
  },

  fr: {
    nav: 'Sites et bots',
    footer: 'Sites et bots',
    replace: [
      ['hero.creator.sub', 'Yulia demande', 'Roman demande'],
      ['hero.video.sub', 'Yulia écrit', 'Roman écrit'],
      ['hero.video.sub', 'elle construira', 'il construira'],
      ['content.images.caption', 'Imagen 4.0 Ultra — réaliste et rapide.', 'Réaliste et rapide.'],
    ],
    features: {
      title: 'Contenu, sites et bots',
      items: [
        `Site ou bot Telegram${NB}: l'assistant le monte et le retouche selon vos mots`,
        'Hébergement et domaine à vous — sur le même solde',
      ],
    },
    faq: [
      {
        q: `Combien coûte un site ou un bot${NB}?`,
        a: `La création est gratuite, le premier mois aussi. Ensuite, {{tokens}} jetons par mois pour chacun. Les retouches sont facturées à part, selon le travail — comme les réponses d'un assistant. Si les jetons viennent à manquer, le site s'endort${NB}: le code, l'adresse et le domaine sont conservés, et il se réveille tout seul après la recharge. Aucune dette ne s'accumule. Jusqu'à deux sites ou bots par compte${NB}; s'il vous en faut plus, écrivez au support.`,
      },
      {
        q: `Puis-je brancher mon propre domaine${NB}?`,
        a: `Oui, gratuitement — c'est inclus dans la location. Saisissez le domaine dans la fiche du site${NB}: Linkeon indique quels enregistrements créer chez votre registraire, les vérifie lui-même et émet le certificat. L'adresse sur Linkeon continue de fonctionner à côté. Seul un site peut avoir son propre domaine${NB}; un bot n'a pas d'adresse.`,
      },
      {
        q: `Et si une retouche casse le site${NB}?`,
        a: `Après chaque retouche, Linkeon vérifie que le site s'ouvre. Sinon, il remet tout seul la version précédente, et aucun jeton n'est débité pour cette retouche. Toute retouche de l'historique peut aussi être annulée à la main — d'un clic.`,
      },
    ],
    sites: {
      eyebrow: 'Sites et bots',
      h2: 'Un site ou un bot Telegram — aussi avec des mots',
      sub: `Décrivez avec vos mots ce qu'il vous faut. L'assistant monte le site ou le bot, le met en ligne, puis le retouche à chaque demande. Serveur, adresse et mises à jour${NB}: Linkeon s'en occupe.`,
      site: {
        title: 'Site web',
        kinds: 'Carte de visite, landing page, menu, portfolio',
        mock: {
          url: 'votre-domaine.fr',
          name: 'Café Le Grain',
          lines: ['Expresso · Cappuccino · Crème', 'Viennoiseries chaque matin'],
          hours: `Tous les jours, 8${NB}h – 21${NB}h`,
        },
        points: [
          `L'adresse sur Linkeon est là tout de suite${NB}; brancher votre propre domaine est gratuit`,
          `Des retouches avec des mots — «${NB}ajoute une page de tarifs${NB}» — dans le chat du site ou avec l'assistant avec qui vous travaillez`,
          `Le site ne s'ouvre plus après une retouche${NB}? Linkeon remet tout seul la version précédente. Toute retouche s'annule d'un clic`,
        ],
      },
      bot: {
        title: 'Bot Telegram',
        kinds: 'Rendez-vous, demandes, réponses aux questions fréquentes',
        mock: { ask: 'Je voudrais réserver pour samedi', reply: `Libre samedi${NB}:`, slots: [`12${NB}h`, `15${NB}h`] },
        points: [
          "Il suffit du token fourni par @BotFather — l'assistant fait le reste",
          "Ce que fait le bot, vous l'expliquez avec des mots — et vous le modifiez de la même façon",
          'Il tourne jour et nuit sur le serveur de Linkeon, sans votre ordinateur',
        ],
      },
      terms: [
        { title: 'Premier mois offert', text: 'Créer un site ou un bot ne coûte rien' },
        { title: 'Ensuite, {{tokens}} jetons par mois', text: "Les retouches sont facturées selon le travail, comme les réponses de l'assistant" },
        { title: 'Votre domaine — gratuit', text: `Inclus dans la location${NB}; Linkeon émet le certificat lui-même` },
        { title: `Plus de jetons${NB}? Il s'endort, il ne disparaît pas`, text: "Le code et le domaine sont conservés, il se réveille tout seul après la recharge. Aucune dette ne s'accumule" },
      ],
      cta: 'Créer un site ou un bot',
    },
  },

  pt: {
    nav: 'Sites e bots',
    footer: 'Sites e bots',
    replace: [
      ['hero.creator.sub', 'A Yulia pergunta', 'O Roman pergunta'],
      ['hero.video.sub', 'A Yulia escreve', 'O Roman escreve'],
      ['hero.video.sub', 'e ela monta', 'e ele monta'],
      ['content.images.caption', 'Imagen 4.0 Ultra — realista e rápido.', 'Realista e rápido.'],
    ],
    features: {
      title: 'Conteúdo, sites e bots',
      items: [
        'Site ou bot do Telegram: o assistente monta-o e vai alterando-o conforme as suas palavras',
        'Alojamento e domínio próprio — com o mesmo saldo',
      ],
    },
    faq: [
      {
        q: 'Quanto custa um site ou um bot?',
        a: 'Criar é gratuito, e o primeiro mês também. Depois, {{tokens}} tokens por mês por cada um. As alterações são cobradas à parte, consoante o trabalho — como as respostas de um assistente. Se os tokens não chegarem, o site adormece: o código, o endereço e o domínio ficam guardados, e depois de carregar o saldo ele acorda sozinho. Não se acumula dívida. Cada conta pode ter até dois sites ou bots; se precisar de mais, escreva ao suporte.',
      },
      {
        q: 'Posso ligar o meu próprio domínio?',
        a: 'Sim, gratuitamente — está incluído no aluguer. Escreva o domínio na ficha do site: a Linkeon mostra que registos criar no seu registador, verifica-os sozinha e emite o certificado. O endereço na Linkeon continua a funcionar ao lado. Só um site pode ter domínio próprio; um bot não tem endereço.',
      },
      {
        q: 'E se uma alteração estragar o site?',
        a: 'Depois de cada alteração, a Linkeon verifica se o site abre. Se não abrir, repõe sozinha a versão anterior, e essa alteração não gasta tokens. Qualquer alteração do histórico também pode ser desfeita à mão — com um botão.',
      },
    ],
    sites: {
      eyebrow: 'Sites e bots',
      h2: 'Um site ou um bot do Telegram — também por palavras',
      sub: 'Descreva por palavras suas o que precisa. O assistente monta o site ou o bot e põe-no a funcionar, e depois vai ajustando sempre que pedir. Servidor, endereço e atualizações ficam a cargo da Linkeon.',
      site: {
        title: 'Site',
        kinds: 'Cartão de visita, landing page, menu, portefólio',
        mock: {
          url: 'o-seu-dominio.pt',
          name: 'Café Grão',
          lines: ['Expresso · Cappuccino · Galão', 'Pastelaria fresca todas as manhãs'],
          hours: 'Todos os dias, 8h–21h',
        },
        points: [
          'O endereço na Linkeon aparece de imediato; ligar o seu próprio domínio é gratuito',
          'Alterações por palavras — «acrescenta uma página de preços» — no chat do site ou com o assistente com quem trabalha',
          'Se o site não abrir depois de uma alteração, a Linkeon repõe sozinha a versão anterior. Qualquer alteração pode ser desfeita com um botão',
        ],
      },
      bot: {
        title: 'Bot do Telegram',
        kinds: 'Marcações, pedidos, respostas a perguntas frequentes',
        mock: { ask: 'Queria marcar para sábado', reply: 'Livre no sábado:', slots: ['12:00', '15:00'] },
        points: [
          'Só precisa de um token do @BotFather — o resto fica com o assistente',
          'O que o bot faz, explica-o por palavras — e altera-o da mesma forma',
          'Funciona dia e noite no servidor da Linkeon; o seu computador não é preciso',
        ],
      },
      terms: [
        { title: 'Primeiro mês grátis', text: 'Criar um site ou um bot não custa nada' },
        { title: 'Depois, {{tokens}} tokens por mês', text: 'As alterações são cobradas consoante o trabalho, como as respostas do assistente' },
        { title: 'Domínio próprio — grátis', text: 'Incluído no aluguer; a Linkeon emite o certificado sozinha' },
        { title: 'Sem tokens, adormece — não se perde', text: 'O código e o domínio ficam guardados e, depois de carregar o saldo, acorda sozinho. Não se acumula dívida' },
      ],
      cta: 'Criar um site ou um bot',
    },
  },

  zh: {
    nav: '网站和机器人',
    footer: '网站和机器人',
    replace: [
      ['hero.creator.sub', '尤利娅会问清楚', '罗曼会问清楚'],
      ['hero.video.sub', '尤利娅写脚本', '罗曼写脚本'],
      ['hero.video.sub', '她会围着它', '他会围着它'],
      ['content.images.caption', 'Imagen 4.0 Ultra——真实又快。', '真实又快。'],
    ],
    features: {
      title: '内容、网站和机器人',
      items: ['网站或 Telegram 机器人：助手来搭，按你的话随时修改', '托管和自有域名——用同一份余额'],
    },
    faq: [
      {
        q: '网站或机器人怎么收费？',
        a: '创建免费，第一个月也免费。之后每个每月 {{tokens}} 代币。修改另外按工作量扣费，和助手回复一样。代币不够时网站会休眠：代码、地址和域名都保留，充值后自动恢复。不会欠费。每个账号最多两个网站或机器人；需要更多，请联系客服。',
      },
      {
        q: '可以绑定自己的域名吗？',
        a: '可以，免费——包含在租用费里。在网站的卡片里填上域名：Linkeon 会告诉你在域名注册商那里要添加哪些记录，自己检查并签发证书。Linkeon 上的地址照样能用。只有网站能绑定自有域名；机器人没有地址。',
      },
      {
        q: '改坏了网站怎么办？',
        a: '每次修改后，Linkeon 都会检查网站能不能打开。打不开就自动退回上一个版本，这次修改也不扣代币。历史里的任何一次修改也可以手动撤销——点一下就行。',
      },
    ],
    sites: {
      eyebrow: '网站和机器人',
      h2: '网站、Telegram 机器人——也是说一说就行',
      sub: '用你自己的话说说需要什么。助手会把网站或机器人搭好、上线，之后你想改什么，说一声它就接着改。服务器、地址和更新都由 Linkeon 负责。',
      site: {
        title: '网站',
        kinds: '名片页、落地页、菜单、作品集',
        mock: {
          url: 'your-domain.com',
          name: '谷粒咖啡',
          lines: ['浓缩 · 卡布奇诺 · 拿铁', '每天早上现烤点心'],
          hours: '每天 8:00–21:00',
        },
        points: [
          'Linkeon 上的地址马上就有，绑定自己的域名免费',
          '用说的来改——“加一个价格页”——在网站的对话里说，或者告诉你平时合作的助手',
          '改完网站打不开，Linkeon 会自动退回上一个版本。任何一次修改都能一键撤销',
        ],
      },
      bot: {
        title: 'Telegram 机器人',
        kinds: '预约、收集需求、回答常见问题',
        mock: { ask: '我想预约周六', reply: '周六还有空位：', slots: ['12:00', '15:00'] },
        points: [
          '只需要 @BotFather 给的 token，其余交给助手',
          '机器人要做什么，你用话说清楚——想改也一样说',
          '全天候运行在 Linkeon 的服务器上，不用开着你的电脑',
        ],
      },
      terms: [
        { title: '首月免费', text: '创建网站或机器人不花钱' },
        { title: '之后每月 {{tokens}} 代币', text: '修改按实际工作量计费，和助手回复一样' },
        { title: '自有域名——免费', text: '包含在租用费里，证书由 Linkeon 自动签发' },
        { title: '代币用完——休眠，不会丢', text: '代码和域名都保留，充值后自动恢复。不会欠费' },
      ],
      cta: '做一个网站或机器人',
    },
  },
};

const getPath = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);
function setPath(obj, path, value) {
  const keys = path.split('.');
  const last = keys.pop();
  keys.reduce((o, k) => o[k], obj)[last] = value;
}

/** Копия объекта с ключом `key` сразу после `afterKey` (старое значение ключа заменяется). */
function insertAfter(obj, afterKey, key, value) {
  if (!(afterKey in obj)) throw new Error(`нет ключа «${afterKey}»`);
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === key) continue;
    out[k] = v;
    if (k === afterKey) out[key] = value;
  }
  return out;
}

for (const [code, t] of Object.entries(TEXTS)) {
  const file = join(dir, `${code}.json`);
  let json = JSON.parse(readFileSync(file, 'utf8'));

  json.header.nav = insertAfter(json.header.nav, 'features', 'sites', t.nav);
  json.footer.product = insertAfter(json.footer.product, 'networking', 'sites', t.footer);

  for (const [path, from, to] of t.replace) {
    const s = getPath(json, path);
    if (typeof s !== 'string') throw new Error(`${code}: ${path} — не строка`);
    if (s.includes(to) && !s.includes(from)) continue; // уже заменено прошлым запуском
    const n = s.split(from).length - 1;
    if (n !== 1) throw new Error(`${code}: ${path}: «${from}» встречается ${n} раз`);
    setPath(json, path, s.replace(from, to));
  }

  const group = json.features.groups[1];
  if (!Array.isArray(group?.items) || group.items.length !== 5) {
    throw new Error(`${code}: во второй группе «Возможностей» не пять строк`);
  }
  group.title = t.features.title;
  group.items[3] = t.features.items[0];
  group.items[4] = t.features.items[1];

  const added = new Set(t.faq.map((f) => f.q));
  json.faq.items = json.faq.items.filter((f) => !added.has(f.q)).concat(t.faq);

  json = insertAfter(json, 'content', 'sites', t.sites);

  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`✅ ${code}: FAQ ${json.faq.items.length}, «Возможности» — ${group.title}`);
}
```

- [ ] **Step 2: Применить**

```bash
node ~/Downloads/land_linkeon/.superpowers/sites-section/apply-texts.mjs ~/Downloads/land_linkeon/.worktrees/sites-section/src/i18n/locales
```

Expected: семь строк `✅ <код>: FAQ 9, «Возможности» — …`. Повторный запуск даёт тот же результат, а `git diff --stat` не меняется.

- [ ] **Step 3: Проверки локалей**

```bash
cd ~/Downloads/land_linkeon/.worktrees/sites-section
PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/i18n/locales.structure.test.ts src/i18n/locales.script.test.ts src/components/sections/Features.test.tsx
node scripts/check-locales.mjs
grep -c 'Юли\|Yulia\|尤利娅\|Imagen' src/i18n/locales/*.json
```

Expected: vitest PASS; `check-locales` без пропусков; `grep -c` — по `0` в каждом файле.

- [ ] **Step 4: Изменилось только задуманное**

`git diff --stat` — семь файлов. В ru, es, de, pt среди изменений будут развёрнутые `testimonials.items` — построчный diff этого не отличит от правки текста, поэтому сверка смысловая, по значениям:

```bash
cd ~/Downloads/land_linkeon/.worktrees/sites-section
for l in ru en es de fr pt zh; do node -e '
const { execSync } = require("child_process");
const l = process.argv[1];
const before = JSON.parse(execSync(`git show HEAD:src/i18n/locales/${l}.json`, { encoding: "utf8" }));
const after = JSON.parse(require("fs").readFileSync(`src/i18n/locales/${l}.json`, "utf8"));
const flat = (v, p = "", out = {}) => { if (v && typeof v === "object") { for (const [k, x] of Object.entries(v)) flat(x, p ? `${p}.${k}` : k, out); } else out[p] = v; return out; };
const a = flat(before), b = flat(after);
const changed = [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => a[k] !== b[k]);
const unexpected = changed.filter((k) => !/^(sites\.|header\.nav\.sites$|footer\.product\.sites$|hero\.(creator|video)\.sub$|content\.images\.caption$|features\.groups\.1\.(title|items\.[34])$|faq\.items\.[678]\.)/.test(k));
console.log(l, "изменено:", changed.length, "неожиданно:", unexpected.length ? unexpected.join(", ") : "—");
' $l; done
```

Expected: семь строк, у каждой `неожиданно: —`.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales/*.json
git commit -m "feat(landing): тексты «Сайты и боты» на семи языках; попутно — Роман вместо Юлии, без Imagen, без мёртвых строк SMM

Секция, пункт меню и подвала, две строки в «Возможностях» на месте
«Подключение соцсетей» и «Кампании» (SMM убран из кабинета 23.09), три
вопроса в FAQ. Числа аренды — переменными {{tokens}} и {{price}}.
В ru, es, de, pt однострочные отзывы развёрнуты — файлы приведены к виду
JSON.stringify, как en, fr, zh.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Лендинг — секция «Сайты и боты»

**Files:**
- Create: `src/components/sections/Sites.tsx`
- Modify: `src/App.tsx`, `src/theme/paper.js`
- Test: `src/components/sections/Sites.test.tsx`

- [ ] **Step 1: Написать тест**

`src/components/sections/Sites.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import Sites from './Sites';
import { createServerI18n } from '../../i18n/server';
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../../i18n/languages';
import { rentInterpolation } from '../../content/products';

const render = (language: string) =>
  renderToStaticMarkup(
    <I18nextProvider i18n={createServerI18n(language)}>
      <Sites />
    </I18nextProvider>,
  );

const count = (html: string, needle: string) => html.split(needle).length - 1;

describe('секция «Сайты и боты»', () => {
  for (const code of SUPPORTED_CODES) {
    describe(code, () => {
      const html = render(code);

      it('две карточки по три пункта и четыре условия', () => {
        expect(count(html, 'data-testid="sites-card-site"')).toBe(1);
        expect(count(html, 'data-testid="sites-card-bot"')).toBe(1);
        expect(count(html, 'data-testid="sites-point"')).toBe(6);
        expect(count(html, 'data-testid="sites-term"')).toBe(4);
      });

      it('без непереведённых ключей и сырых переменных', () => {
        expect(html).not.toMatch(/sites\.(eyebrow|h2|sub|site|bot|terms|cta)/);
        expect(html).not.toContain('{{');
      });

      it('аренда — числом из константы, в формате языка', () => {
        expect(html).toContain(rentInterpolation(code).tokens);
      });

      // В пререндере у ссылки нет ?lang= — его дописывает клиент (appUrl читает
      // язык глобального i18n). Поэтому проверяется начало адреса.
      it('кнопка ведёт во вкладку продуктов кабинета с меткой', () => {
        expect(html).toContain('href="https://my.linkeon.io/studio?tab=products&amp;utm_content=sites');
        expect(html).toContain('data-cta="sites-start"');
      });

      if (code === DEFAULT_LANGUAGE) {
        it('рубли — из прайса, а не из текста', () => {
          expect(html).toContain(`${rentInterpolation(code).price} ₽`);
        });
      } else {
        it('без рублей: витрина на этом языке валютная', () => {
          expect(html).not.toContain('₽');
        });
      }
    });
  }
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/sections/Sites.test.tsx`
Expected: FAIL — нет модуля `./Sites`.

- [ ] **Step 3: Реализация**

`src/components/sections/Sites.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import { Check, Lock } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import Button from '../ui/Button';
import { appUrl } from '../../lib/appUrl';
import { rentInterpolation } from '../../content/products';

interface Term {
  title: string;
  text: string;
}

// Переводчик может уронить ключ, и .map() по строке снял бы всю секцию —
// как в Features, пустой список вместо падения.
const asList = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

/**
 * Сайты и телеграм-боты, которые Linkeon хостит, а ассистент собирает и правит
 * по словам владельца (в кабинете — Студия → Продукты).
 *
 * Каждое утверждение секции сверено с продуктом — таблица источников в
 * docs/superpowers/specs/2026-10-06-sites-section-design.md. Там же список
 * того, чего писать нельзя: «любой ассистент», правки через телеграм-бота
 * Linkeon, «магазин», автоматический откат «если не понравилось».
 *
 * Иллюстрации нарисованы, а не сняты с настоящего продукта: их текст
 * переводится вместе с локалью. В адресной строке — заглушка своего домена, а
 * не адрес на c.linkeon.io: такой слаг мог бы занять кто угодно, и под нашим
 * примером открылся бы чужой сайт.
 *
 * Фон тёплый: соседи холодные — ContentEngine идёт по фону страницы,
 * HowItWorks белый, и серая или белая полоса слилась бы с одним из них.
 */
export default function Sites() {
  const { t, i18n } = useTranslation();
  const rent = rentInterpolation(i18n.language);

  return (
    <Section id="sites" ariaLabelledby="sites-heading" className="bg-paper-100">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('sites.eyebrow')}</Eyebrow>
        <h2
          id="sites-heading"
          className="text-4xl md:text-5xl font-semibold tracking-tight text-paper-900 mb-4 text-balance"
        >
          {t('sites.h2')}
        </h2>
        <p className="text-lg text-paper-700 leading-relaxed">{t('sites.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6 min-w-0 [&>*]:min-w-0">
        <FadeIn>
          <div
            data-testid="sites-card-site"
            className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-paper-900 mb-1">{t('sites.site.title')}</h3>
            <p className="text-sm text-paper-600 mb-5">{t('sites.site.kinds')}</p>
            <div aria-hidden="true" className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="ml-2 inline-flex min-w-0 items-center gap-1 rounded-md bg-white px-2 py-0.5 font-mono text-xs text-gray-500">
                  <Lock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{t('sites.site.mock.url')}</span>
                </span>
              </div>
              <div className="bg-paper-100 p-4 text-sm text-paper-800">
                <p className="text-base font-semibold text-paper-900 mb-2">{t('sites.site.mock.name')}</p>
                {asList<string>(t('sites.site.mock.lines', { returnObjects: true })).map((line) => (
                  <p key={line} className="border-b border-dashed border-paper-400 py-1">
                    {line}
                  </p>
                ))}
                <p className="mt-2 text-paper-700">{t('sites.site.mock.hours')}</p>
              </div>
            </div>
            <Points items={asList<string>(t('sites.site.points', { returnObjects: true }))} />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div
            data-testid="sites-card-bot"
            className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-paper-900 mb-1">{t('sites.bot.title')}</h3>
            <p className="text-sm text-paper-600 mb-5">{t('sites.bot.kinds')}</p>
            <div aria-hidden="true" className="rounded-2xl border border-gray-200 bg-gray-100 p-4 text-sm">
              <p className="ml-auto w-fit max-w-[85%] rounded-xl bg-brand-200 px-3 py-2 text-gray-900">
                {t('sites.bot.mock.ask')}
              </p>
              <div className="mt-2 w-fit max-w-[85%] rounded-xl bg-white px-3 py-2 text-gray-900">
                <p>{t('sites.bot.mock.reply')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {asList<string>(t('sites.bot.mock.slots', { returnObjects: true })).map((slot) => (
                    <span key={slot} className="rounded-lg border border-brand-800 px-3 py-1 text-brand-800">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Points items={asList<string>(t('sites.bot.points', { returnObjects: true }))} />
          </div>
        </FadeIn>
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {asList<Term>(t('sites.terms', { returnObjects: true, ...rent })).map((term) => (
          <li
            key={term.title}
            data-testid="sites-term"
            className="rounded-2xl border border-paper-300 bg-paper-50 p-4"
          >
            <p className="text-sm font-semibold text-paper-900 mb-1">{term.title}</p>
            <p className="text-sm text-paper-700 leading-relaxed">{term.text}</p>
          </li>
        ))}
      </ul>

      <FadeIn delay={200} className="mt-10 text-center">
        <Button
          variant="primary"
          size="lg"
          href={appUrl('/studio?tab=products', { utm_content: 'sites' })}
          dataCta="sites-start"
        >
          {t('sites.cta')}
        </Button>
      </FadeIn>
    </Section>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} data-testid="sites-point" className="flex gap-2.5 text-sm text-paper-800 leading-relaxed">
          <Check aria-hidden="true" className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Тест проходит**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/sections/Sites.test.tsx`
Expected: PASS, 35 тестов (7 языков × 5).

- [ ] **Step 5: Проверка на излом — рубли идут из прайса**

Временно: в `src/i18n/locales/ru.json` в `sites.terms[1].text` заменить `{{price}}` на `149`, а в `src/content/tokenPackages.ts` у `starter` поставить `price: 150`. Прогон Step 4 → FAIL в «ru › рубли — из прайса» (ожидалось «150 ₽»). Вернуть оба файла: `git checkout -- src/i18n/locales/ru.json src/content/tokenPackages.ts` → PASS.

- [ ] **Step 6: Секция на главной**

В `src/App.tsx` после `import ContentEngine from './components/sections/ContentEngine';`:

```tsx
import Sites from './components/sections/Sites';
```

и после `<ContentEngine />`:

```tsx
        <Sites />
```

- [ ] **Step 7: Перечень тёплых секций**

В `src/theme/paper.js` в комментарии строку

```
 * в фонах Hero, PersonaCTA, Problem, Assistants и Features главной, а также
```

заменить на

```
 * в фонах Hero, Cartoon, PersonaCTA, Problem, Assistants, Sites и Features главной, а также
```

(Cartoon тоже на `bg-paper-100` и в перечень не попал раньше — комментарий сам требует совпадать с кодом.)

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/Sites.tsx src/components/sections/Sites.test.tsx src/App.tsx src/theme/paper.js
git commit -m "feat(landing): секция «Сайты и боты» на главной

Две карточки (сайт и телеграм-бот), четыре условия аренды, кнопка во
вкладку продуктов кабинета (utm_content=sites, data-cta=sites-start).
Числа аренды — из src/content/products.ts.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Лендинг — FAQ подставляет числа аренды

**Files:**
- Modify: `src/components/sections/FAQ.tsx`
- Test: `src/components/sections/FAQ.test.tsx`

- [ ] **Step 1: Написать тест**

`src/components/sections/FAQ.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import FAQ from './FAQ';
import { createServerI18n } from '../../i18n/server';
import { SUPPORTED_CODES } from '../../i18n/languages';
import { rentInterpolation } from '../../content/products';

const render = (language: string) =>
  renderToStaticMarkup(
    <I18nextProvider i18n={createServerI18n(language)}>
      <FAQ />
    </I18nextProvider>,
  );

describe('FAQ', () => {
  for (const code of SUPPORTED_CODES) {
    it(`${code}: девять вопросов, числа аренды подставлены`, () => {
      const html = render(code);
      expect(html.split('<details').length - 1).toBe(9);
      expect(html).not.toContain('{{');
      expect(html).toContain(rentInterpolation(code).tokens);
    });
  }

  it('ru: в ответе о цене — рубли из прайса', () => {
    expect(render('ru')).toContain(`${rentInterpolation('ru').price} ₽`);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/sections/FAQ.test.tsx`
Expected: FAIL — в ответах стоит сырое `{{tokens}}`.

- [ ] **Step 3: Реализация**

В `src/components/sections/FAQ.tsx` к импортам добавить

```tsx
import { rentInterpolation } from '../../content/products';
```

строку

```tsx
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];
```

заменить на

```tsx
  const { t, i18n } = useTranslation();
  // Ответ о цене сайта несёт {{tokens}} и {{price}} — числа из того же места,
  // что у секции «Сайты и боты» (src/content/products.ts).
  const items = t('faq.items', {
    returnObjects: true,
    ...rentInterpolation(i18n.language),
  }) as { q: string; a: string }[];
```

- [ ] **Step 4: Тест проходит**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/sections/FAQ.test.tsx`
Expected: PASS, 8 тестов.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FAQ.tsx src/components/sections/FAQ.test.tsx
git commit -m "feat(landing): FAQ — три вопроса о сайтах и ботах, числа аренды подставляются

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Лендинг — меню и подвал

**Files:**
- Modify: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Test: `src/components/layout/layout.test.tsx`

- [ ] **Step 1: Написать тесты**

В `src/components/layout/layout.test.tsx` в `describe('шапка', …)` добавить:

```tsx
  it('пункт «Сайты и боты» ведёт к секции — на главной и с подстраницы', () => {
    expect(render(<Header />)).toContain('href="#sites"');
    expect(render(<Header homeHref="/en/" />, 'en')).toContain('href="/en/#sites"');
  });
```

в `describe('подвал', …)`:

```tsx
  it('в колонке «Продукт» есть «Сайты и боты»', () => {
    expect(render(<Footer />)).toContain('href="#sites"');
    expect(render(<Footer homeHref="/" />)).toContain('href="/#sites"');
  });
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/layout/layout.test.tsx`
Expected: FAIL в двух новых тестах.

- [ ] **Step 3: Шапка**

В `src/components/layout/Header.tsx` массив `LINKS`:

```tsx
const LINKS = [
  { href: '#features', key: 'header.nav.features' },
  { href: '#sites', key: 'header.nav.sites' },
  { href: '#how', key: 'header.nav.how' },
  { href: '#pricing', key: 'header.nav.pricing' },
  { href: '#faq', key: 'header.nav.faq' },
] as const;
```

У ссылок десктопного меню (`<nav className="hidden lg:flex items-center gap-8">`) класс

```tsx
className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
```

заменить на

```tsx
className="text-sm text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
```

Без `whitespace-nowrap` длинный пункт («Websites & Bots») молча переносился бы на две строки, и проверка «шапка помещается» (Task 12) этого бы не увидела.

- [ ] **Step 4: Подвал**

В `src/components/layout/Footer.tsx` в колонке «Продукт» после строки `{ label: t('footer.product.networking'), href: section('#networking') },`:

```tsx
            { label: t('footer.product.sites'), href: section('#sites') },
```

- [ ] **Step 5: Тесты проходят**

Run: `PATH=$HOME/.nvm/versions/node/v22.19.0/bin:$PATH ./node_modules/.bin/vitest run src/components/layout/layout.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Footer.tsx src/components/layout/layout.test.tsx
git commit -m "feat(landing): «Сайты и боты» в меню и в подвале

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Лендинг — проверки в сыром HTML и в браузере

**Files:**
- Create: `tests/sites.spec.ts`
- Modify: `tests/smoke.spec.ts`

- [ ] **Step 1: Тесты**

`tests/sites.spec.ts`:

```ts
import { test, expect, request } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from '../scripts/translated-languages.js';

const pathFor = (code: string) => (code === DEFAULT_LANGUAGE ? '/' : `/${code}/`);
const LANGUAGES = translatedCodes().map((code) => ({ code, path: pathFor(code) }));

// Сырой HTTP, без браузера: так страницу видит краулер, и клиентский редирект
// `/` → `/en/` (headless ходит как en-US) не подменяет язык.
test.describe('секция «Сайты и боты» в сыром HTML', () => {
  for (const { code, path } of LANGUAGES) {
    test(`${code}: секция, две карточки, кнопка во вкладку продуктов`, async ({ baseURL }) => {
      const ctx = await request.newContext({ baseURL });
      const html = await (await ctx.get(path)).text();
      const section = html.match(/<section id="sites"[\s\S]*?<\/section>/)?.[0];

      expect(section, 'в пререндере нет секции #sites').toBeTruthy();
      expect(section).toContain('data-testid="sites-card-site"');
      expect(section).toContain('data-testid="sites-card-bot"');
      expect(section).toContain('href="https://my.linkeon.io/studio?tab=products&amp;utm_content=sites');
      if (code === DEFAULT_LANGUAGE) expect(section).toContain('₽');
      else expect(section).not.toContain('₽');

      await ctx.dispose();
    });
  }
});

test.describe('секция «Сайты и боты» в браузере', () => {
  test('en: секция видна, кнопка ведёт во вкладку продуктов с языком', async ({ page }) => {
    await page.goto('/en/#sites');
    await expect(page.locator('#sites')).toBeVisible();
    await expect(page.getByTestId('sites-card-site')).toBeVisible();
    await expect(page.getByTestId('sites-card-bot')).toBeVisible();

    const cta = page.locator('[data-cta="sites-start"]');
    await expect(cta).toHaveAttribute('href', /^https:\/\/my\.linkeon\.io\/studio\?tab=products&/);
    await expect(cta).toHaveAttribute('href', /[?&]utm_content=sites(&|$)/);
    await expect(cta).toHaveAttribute('href', /[?&]lang=en(&|$)/);
  });
});

// Пятый пункт меню на 1024 px (с этой ширины меню видно целиком) не должен ни
// вылезать за шапку, ни переноситься. Пункты — whitespace-nowrap, поэтому
// нехватка места видна как переполнение шапки.
test.describe('шапка на 1024 px', () => {
  for (const { code, path } of LANGUAGES) {
    test(`${code}: меню в одну строку, ничего не вылезает`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 1024, height: 768 },
        locale: code === 'zh' ? 'zh-CN' : code,
      });
      const page = await context.newPage();
      await page.goto(path);

      const box = await page.evaluate(() => {
        const bar = document.querySelector('header > div') as HTMLElement;
        const links = [...document.querySelectorAll('header nav a')] as HTMLElement[];
        return {
          barOverflow: bar.scrollWidth - bar.clientWidth,
          pageOverflow: document.documentElement.scrollWidth - window.innerWidth,
          heights: links.map((a) => Math.round(a.getBoundingClientRect().height)),
        };
      });

      expect(box.heights.length).toBe(5);
      expect(box.barOverflow, 'шапка шире экрана').toBeLessThanOrEqual(0);
      expect(box.pageOverflow, 'появилась горизонтальная прокрутка').toBeLessThanOrEqual(0);
      expect(new Set(box.heights).size, 'пункт меню перенёсся на вторую строку').toBe(1);

      await context.close();
    });
  }
});
```

В `tests/smoke.spec.ts` тест `'FAQ has 6 questions'`:

```ts
  test('FAQ has 9 questions', async ({ page }) => {
    await page.goto('/#faq');
    const details = page.locator('#faq details');
    await expect(details).toHaveCount(9);
  });
```

- [ ] **Step 2: Commit и прогон на ноде**

```bash
git add tests/sites.spec.ts tests/smoke.spec.ts
git commit -m "test(landing): «Сайты и боты» — пререндер, браузер, шапка на 1024 px; FAQ — 9 вопросов

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'CI=1 pnpm test > /tmp/ss-e2e.log 2>&1; echo "exit=$?"; grep -E "passed|failed|flaky|skipped" /tmp/ss-e2e.log | tail -4'
```

Expected: `exit=0`; в сводке `failed` нет.

Если красная только «шапка на 1024 px» на каком-то языке — места не хватило: в `Header.tsx` у `<nav className="hidden lg:flex items-center gap-8">` поставить `gap-6 xl:gap-8`, закоммитить отдельно и повторить прогон.

- [ ] **Step 3: Проверка на излом — секции нет**

```bash
cd ~/Downloads/land_linkeon/.worktrees/sites-section
sed -i '' '/<Sites \/>/d' src/App.tsx && git commit -qam "tmp: без секции (на излом)"
bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'CI=1 pnpm exec playwright test tests/sites.spec.ts > /tmp/ss-break.log 2>&1; echo "exit=$?"; grep -c "в пререндере нет секции" /tmp/ss-break.log'
git reset -q --hard HEAD~1
```

Expected: `exit=1` и ненулевой счётчик — каждый язык красный. После `reset` секция на месте (`grep -c '<Sites />' src/App.tsx` → `1`).

- [ ] **Step 4: Проверка на излом — пункт меню не помещается**

```bash
node -e 'const f="src/i18n/locales/de.json";const j=JSON.parse(require("fs").readFileSync(f,"utf8"));j.header.nav.sites="Websites, Landingpages und Telegram-Bots für Ihr Geschäft";require("fs").writeFileSync(f,JSON.stringify(j,null,2)+"\n")'
git commit -qam "tmp: длинный пункт меню (на излом)"
bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'CI=1 pnpm exec playwright test tests/sites.spec.ts -g "шапка" > /tmp/ss-break2.log 2>&1; echo "exit=$?"; grep -E "✘|failed" /tmp/ss-break2.log | head -3'
git reset -q --hard HEAD~1
```

Expected: `exit=1`, красный тест `de: меню в одну строку`. После `reset` — прежний текст.

---

### Task 13: Лендинг — полный прогон, скриншоты, взгляд владельца

- [ ] **Step 1: Ветка догнала main, всё зелёное**

```bash
cd ~/Downloads/land_linkeon/.worktrees/sites-section
git fetch -q origin && git merge -q origin/main   # если в main лендинга появилось новое
bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'pnpm test:unit > /tmp/ss-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED; tail -4 /tmp/ss-unit.log; node scripts/check-locales.mjs > /tmp/ss-loc.log 2>&1 && echo LOCALES_OK || echo LOCALES_FAILED; echo "tsc errors: $(pnpm typecheck 2>&1 | grep -c "error TS")"; pnpm lint > /tmp/ss-lint.log 2>&1 && echo LINT_OK || echo LINT_FAILED; pnpm build > /tmp/ss-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED; CI=1 pnpm test > /tmp/ss-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED; grep -E "passed|failed" /tmp/ss-e2e.log | tail -2'
```

Expected: `UNIT_OK` (1780 + новые), `LOCALES_OK`, `tsc errors: 0`, `LINT_OK` с `0 errors` и не больше двух предупреждений (база `main` на 06.10.2026 — `0 errors, 2 warnings`, оба старые: `grep -E "problems" /tmp/ss-lint.log`), `BUILD_OK`, `E2E_OK`.

- [ ] **Step 2: Скриншоты для владельца**

Создать `~/Downloads/land_linkeon/.superpowers/sites-section/shots.mjs`:

```js
// Скриншоты секции и шапки для взгляда владельца. Запускается на ноде из
// корня рабочей копии лендинга при поднятом `pnpm preview --port 4173`.
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();

const section = [
  { name: 'ru-1280', path: '/', locale: 'ru-RU', width: 1280 },
  { name: 'ru-390', path: '/', locale: 'ru-RU', width: 390 },
  { name: 'en-1280', path: '/en/', locale: 'en-US', width: 1280 },
  { name: 'de-390', path: '/de/', locale: 'de-DE', width: 390 },
  { name: 'zh-1280', path: '/zh/', locale: 'zh-CN', width: 1280 },
];
for (const s of section) {
  const ctx = await browser.newContext({ viewport: { width: s.width, height: 900 }, locale: s.locale });
  const page = await ctx.newPage();
  await page.goto(BASE + s.path);
  const el = page.locator('#sites');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000); // FadeIn проявляет карточки по мере прокрутки
  await el.screenshot({ path: `/tmp/sites-${s.name}.png` });
  await ctx.close();
}

for (const [code, path] of [['ru', '/'], ['en', '/en/'], ['es', '/es/'], ['de', '/de/'], ['fr', '/fr/'], ['pt', '/pt/'], ['zh', '/zh/']]) {
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 300 }, locale: code === 'zh' ? 'zh-CN' : code });
  const page = await ctx.newPage();
  await page.goto(BASE + path);
  await page.locator('header').screenshot({ path: `/tmp/sites-header-${code}.png` });
  await ctx.close();
}

await browser.close();
console.log('shots done');
```

```bash
scp ~/Downloads/land_linkeon/.superpowers/sites-section/shots.mjs dv@85.192.61.231:ci/wt/sites-section/.shots.mjs
bash ~/Downloads/land_linkeon/.superpowers/sites-section/node-run.sh 'pnpm build >/dev/null && (pnpm preview --port 4173 >/dev/null 2>&1 &) && sleep 3 && node .shots.mjs; fuser -k 4173/tcp || true'
mkdir -p ~/Downloads/land_linkeon/.superpowers/sites-section/shots
scp 'dv@85.192.61.231:/tmp/sites-*.png' ~/Downloads/land_linkeon/.superpowers/sites-section/shots/
```

Посмотреть самому (Read по каждому файлу): на 390 px ничего не наезжает и нет горизонтальной прокрутки, карточки одна под другой, условия читаются; на 1280 — карточки рядом, одной высоты; шапка на 1024 px во всех языках — пять пунктов в строку.

- [ ] **Step 3: СТОП — взгляд владельца**

Показать владельцу скриншоты (путь к папке `shots/`) и ссылку на ветку `feat/sites-section`. Правки — отдельными коммитами с повтором Step 1.

---

### Task 14: Лендинг — слияние и выкат

Требует выкаченного кабинета (Task 5): иначе новички с кнопки попадут в чат, а не во вкладку продуктов.

- [ ] **Step 1: Слить в main (без общего чекаута)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/sites-section
git fetch -q origin
git checkout -q --detach origin/main
git merge --no-ff feat/sites-section -m "Merge feat/sites-section: секция «Сайты и боты» на главной, семь языков

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
git push origin HEAD:main
git push origin --delete ci/sites-section
git checkout -q feat/sites-section
```

- [ ] **Step 2: СТОП — согласие владельца на выкат лендинга**

- [ ] **Step 3: Выкат**

```bash
mkdir -p ~/deploy-logs
cd ~/Downloads/spirits_back
( LANDING_ONLY=1 nohup bash scripts/deploy.sh > ~/deploy-logs/sites-section-landing.log 2>&1 < /dev/null & )
```

Фазы test у лендинга нет — её роль сыграл Task 13. API не перезапускается. Следить за логом Monitor-ом; итог — зелёный smoke лендинга.

- [ ] **Step 4: Проверка на проде по содержимому**

```bash
for p in / /en/ /es/ /de/ /fr/ /pt/ /zh/; do
  html=$(curl -s "https://linkeon.io$p")
  sec=$(printf '%s' "$html" | grep -o '<section id="sites".*' | sed 's#</section>.*##')
  echo "== $p lang=$(printf '%s' "$html" | grep -o '<html lang="[a-z]*"' | head -1) section=$(printf '%s' "$sec" | grep -c 'sites-card-bot') cta=$(printf '%s' "$sec" | grep -c 'studio?tab=products&amp;utm_content=sites') rub=$(printf '%s' "$sec" | grep -o '₽' | head -1)"
done
curl -s https://linkeon.io/ | grep -o '/assets/index-[A-Za-z0-9_-]*\.js' | head -1
ssh dvolkov@212.113.106.202 'ls -t /home/dvolkov/land_linkeon/dist/assets/index-*.js | head -1'
```

`grep -c` на пререндере считает строки, а пререндер — по сути одна длинная строка, поэтому значения `section` и `cta` равны 1 или 0, этого достаточно.

Expected: у каждого адреса свой `lang`, `section=1`, `cta=1`; `rub=₽` только у `/`. Бандл, на который ссылается главная, — самый свежий файл в `dist/assets` на сервере (иначе проверка смотрела бы на сироту прошлого выката).

---

### Task 15: После выката

- [ ] **Step 1: СТОП — шаги владельца**

Передать владельцу:
- Метрика: цель «JavaScript-событие» с идентификатором `sites-start` (кнопка секции);
- оферта не описывает хостинг продуктов (аренда, сон, гашение администратором) — решение за ним;
- в политике конфиденциальности (все семь языков, `src/content/legal/*.tsx`) среди обработчиков всё ещё назван Imagen 4.0 Ultra, хотя в коде его нет с 17.08 — юридический текст, правится только с его согласия.

- [ ] **Step 2: Заметки в память**

Новая заметка: секция «Сайты и боты» на linkeon.io — тексты в `sites.*` семи локалей, числа аренды — `src/content/products.ts` (зеркало `RENT_TOKENS`), потолок «до двух» словом в FAQ; кнопка ведёт на `/studio?tab=products`, кабинет держит адрес через вход (`pendingDestination`, редирект с голого `/chat`). Обновить `project_linkeon_landing_repo` ссылкой на неё.

- [ ] **Step 3: Убрать воркдеревья**

```bash
rm ~/Downloads/land_linkeon/.worktrees/sites-section/node_modules ~/Downloads/spirits_front/.worktrees/sites-destination/node_modules
git -C ~/Downloads/land_linkeon worktree remove .worktrees/sites-section
git -C ~/Downloads/spirits_front worktree remove .worktrees/sites-destination
ssh dv@85.192.61.231 'git -C ~/ci/land_linkeon worktree remove --force ~/ci/wt/sites-section; git -C ~/ci/spirits_front worktree remove --force ~/ci/wt/sites-destination'
```

Ветки `feat/sites-section` и `feat/sites-destination` удалять только с согласия владельца.
