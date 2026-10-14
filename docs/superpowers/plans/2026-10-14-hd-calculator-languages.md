# Калькулятор Human Design на шести языках — план

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** открыть калькулятор Human Design (`/calculators/human-design/`) на en, es, de, fr, pt, zh — поиск города на языке человека, тексты на языке, переход к Райе, которая посчитает карту инструментом по городу на любом языке.

**Architecture:** язык калькулятора включается сам, когда появляется `src/content/hd/texts/<код>.ts`. Базы городов — семь файлов `cities.<код>.json` из одного дампа GeoNames, один список и порядок городов: строка N — один город во всех базах; страница грузит базу своего языка, инструмент Райи в `spirits_back` ищет город по названиям всех семи баз. Дата на нерусских языках — месяцем словом через `Intl`. Тексты — глоссарий терминов HD, шесть переводов с `ru.ts`, вычитка.

**Tech Stack:** лендинг — React 18 + TypeScript, Vite, vitest, Playwright, пререндер; база городов — Python (`scripts/build-hd-cities.py`); бэкенд — NestJS, jest, `scripts/sync-human-design.sh`. Сборки и тесты — только на тестовой ноде.

**Спека:** `docs/superpowers/specs/2026-10-14-hd-calculator-languages-design.md`.

---

## Порядок и остановки

Task 1 (рабочие копии) → Task 2 (базы городов) → Task 3–7 (код лендинга и проверки) → Task 8 (глоссарий) → **СТОП 1** → Task 9 (переводы) → Task 10 (вычитка) → Task 11 (полный прогон, скриншоты) → **СТОП 2** → Task 12 (бэкенд) → Task 13 (слияние) → **СТОП 3** выкат бэкенда → **СТОП 4** инструкция Райи → **СТОП 5** выкат лендинга → Task 16 (проверка на проде) → Task 17 (память, итоги, уборка).

- **СТОП 1** (конец Task 8) — глоссарий терминов HD на шести языках владельцу **до** перевода: смена термина после переводов — правка шести файлов по 58 КБ. (В спеке глоссарий шёл вместе со скриншотами; вынесен раньше ради этого.)
- **СТОП 2** (конец Task 11) — скриншоты en и zh.
- **СТОП 3–5** — каждый выкат и правка инструкции Райи — с OK владельца; обход через релей (пока маршрут нода → прод оборван) — тоже с OK.

## Где что запускать

- Мак — чтение, правка, git. Нода — `pnpm`/`vitest`/`playwright` (лендинг), `npm ci`/`jest`/`tsc` (бэкенд), сборка баз городов (дамп GeoNames ~400 МБ).
- Переводчики, вычитчики (Task 8–10) пишут только свои файлы; коммитит контролёр.

## Файлы

**land_linkeon**
- Modify: `scripts/build-hd-cities.py` — семь языков за прогон.
- Create: `src/content/hd/cities.{en,es,de,fr,pt,zh}.json`; Modify: `src/content/hd/cities.ru.json` (пересборка).
- Modify: `src/content/hd/cities.test.ts` — все семь баз, согласованность, поиск на языках.
- Modify: `src/lib/cities.ts` (комментарии), `src/lib/cityLoader.ts` (база по языку), `src/components/hd/CityInput.tsx`, `src/components/hd/HdForm.tsx`, `src/components/hd/HdResult.tsx`, `src/pages/HumanDesignPage.tsx`, `src/lib/hdDraft.ts` (+ тесты).
- Create: `src/lib/cityLoader.test.ts`.
- Modify: `src/content/hd/texts.test.ts`, `tests/hd-calculator.spec.ts`, `public/licenses.txt`.
- Create: `docs/hd-calculator/glossary-languages.md`, `src/content/hd/texts/{en,es,de,fr,pt,zh}.ts`.
- Modify: `src/content/assistants/pages/{en,es,de,fr,pt,zh}/raya.ts` — `heroLink` и ссылка в FAQ.

**spirits_back**
- Modify: `scripts/sync-human-design.sh` — все семь баз.
- Create: `src/human-design/multilang-index.ts`, `src/human-design/multilang-index.spec.ts`.
- Modify: `src/human-design/city-resolver.ts` (+ spec) — подсказки региона на всех языках; `src/human-design/hd-tool.service.ts` (+ spec) — семь баз; `src/chat/chat-tools.ts`, `src/chat/chat-tools.hd.spec.ts` — описание инструмента.

Служебное (вне git): `~/Downloads/land_linkeon/.superpowers/hd-langs/`.

---

## Правила переводов

Действуют в Task 8–10. Механическая часть — `src/content/hd/texts.test.ts` (Task 6), остальное — вычитка.

1. **Источник** — `src/content/hd/texts/ru.ts` той же ветки; правила русского текста — раздел «Правила текстов» плана `2026-10-08-human-design-calculator.md` — действуют и в переводах: самопознание, не прогноз; основателя метода и Jovian Archive не называть, о связи не писать; расчёт не «официальный» и не «сертифицированный»; описания — о людях вообще, личное — у Райи; цена — только «при регистрации 25 000 токенов в подарок»; без эмодзи; FAQ отвечает на те же вопросы; оговорка — «инструмент самопознания, не прогноз и не замена врачу, юристу или финансисту».
2. **Глоссарий** — `docs/hd-calculator/glossary-languages.md` (Task 8, одобрен на СТОП 1): каждый термин — ровно как в глоссарии, во всех полях.
3. **Обращение к читателю:** en — you; es — usted; de — Sie; fr — vous; pt — безличная форма, европейский португальский; zh — 你. **Сообщение Райе** (`message`, `authorities.*.inMessage`) — от первого лица, к Райе на «ты» языка, имя — как на её странице этого языка (`src/content/assistants/roster.data.js`).
4. **Поисковые слова языка** — в `title`, `description`, H1 («Human Design calculator», «bodygraph», «Human Design Rechner», «calculadora de Diseño Humano», «calculateur Human Design», «calculadora de Design Humano», «人类图计算器»); «бесплатно» языка.
5. **Длины:** `title` ≤ 70; `description` 100–180 (zh 40–120); каждое описание (тип, авторитет, профиль, определённость, центр — определённый/открытый, канал) 60–420 (zh 25–200). Не влезает — сокращать текст, а не пределы.
6. **Без кириллицы**, без слова agent/agente/Agent/智能体 в значении «ассистент», иероглифы и полноширинная пунктуация — только в zh; в zh — полноширинная пунктуация, без пробелов между иероглифами.
7. Названия центров и каналов в русском идут после «Название —» со строчной буквы; в переводе — по правилам языка (в немецком существительные с заглавной).

---

### Task 1: Рабочие копии и прогон на ноде

**Files:** ничего в репозиториях; скрипты — `~/Downloads/land_linkeon/.superpowers/hd-langs/`.

- [ ] **Step 1: Воркдеревья**

```bash
git -C ~/Downloads/land_linkeon fetch -q origin
git -C ~/Downloads/land_linkeon worktree add -q .worktrees/hd-langs -b feat/hd-langs origin/main
git -C ~/Downloads/land_linkeon/.worktrees/hd-langs branch --unset-upstream 2>/dev/null || true
git -C ~/Downloads/spirits_back fetch -q origin
git -C ~/Downloads/spirits_back worktree add -q .worktrees/hd-langs -b feat/hd-langs origin/main
git -C ~/Downloads/spirits_back/.worktrees/hd-langs branch --unset-upstream 2>/dev/null || true
git -C ~/Downloads/land_linkeon/.worktrees/hd-langs log --oneline -1
git -C ~/Downloads/spirits_back/.worktrees/hd-langs log --oneline -1
```

- [ ] **Step 2: Скрипты ноды**

`node-run-land.sh` — копия `~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh` с заменой `values-langs` → `hd-langs` (WT `~/Downloads/land_linkeon/.worktrees/hd-langs`, NODE_WT `ci/wt/hd-langs`, BRANCH `tmp/hd-langs`, лог установки `/tmp/hd-langs-install.log`).

`node-run-back.sh`:

```bash
#!/usr/bin/env bash
# Прогон бэкенда на ноде на ТЕКУЩЕМ коммите воркдерева spirits_back/.worktrees/hd-langs.
#   bash ~/Downloads/land_linkeon/.superpowers/hd-langs/node-run-back.sh 'npx jest src/human-design'
set -euo pipefail
WT=~/Downloads/spirits_back/.worktrees/hd-langs
NODE_WT=ci/wt/hd-langs-back
BRANCH=tmp/hd-langs-back
SSH_OPTS="-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h"
GIT_SSH_COMMAND="ssh $SSH_OPTS" git -C "$WT" push -q -f "dv@85.192.61.231:ci/spirits_back" "HEAD:refs/heads/$BRANCH"
SHA=$(git -C "$WT" rev-parse HEAD)
ssh $SSH_OPTS dv@85.192.61.231 "set -e
  [ -d ~/$NODE_WT ] || git -C ~/ci/spirits_back worktree add -q --detach ~/$NODE_WT $SHA
  cd ~/$NODE_WT && git checkout -q --detach $SHA
  source ~/.nvm/nvm.sh
  npm ci > /tmp/hd-langs-back-install.log 2>&1 || (tail -20 /tmp/hd-langs-back-install.log; exit 1)
  echo \"== \$(git log --oneline -1)\"
  set +e
  $1"
```

`node-ssh.sh` — как в `values-langs`. Затем `chmod +x ~/Downloads/land_linkeon/.superpowers/hd-langs/*.sh`.

- [ ] **Step 3: Исходные прогоны**

```bash
D=~/Downloads/land_linkeon/.superpowers/hd-langs
bash $D/node-run-land.sh './node_modules/.bin/vitest run > /tmp/hl-unit.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/hl-unit.log'
bash $D/node-run-back.sh 'npx jest src/human-design src/chat/chat-tools.hd.spec.ts > /tmp/hlb.log 2>&1; echo "jest $?"; grep -E "^Tests:|^Test Suites:" /tmp/hlb.log; npx tsc -p tsconfig.build.json --noEmit; echo "tsc $?"'
```

Expected: всё зелёное; числа — в `progress.md` как база.

---

### Task 2: Базы городов на семи языках

**Files:** Modify `scripts/build-hd-cities.py`, `src/content/hd/cities.test.ts`, `src/lib/cities.ts` (комментарии); Create `src/content/hd/cities.{en,es,de,fr,pt,zh}.json`; Modify `src/content/hd/cities.ru.json`.

- [ ] **Step 1: Красные тесты баз**

В `src/content/hd/cities.test.ts` — общие проверки для каждой из семи баз и согласованность. Заменить загрузку одной базы на:

```ts
const CODES = ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh'] as const;
const load = (code: string) => {
  const raw = readFileSync(new URL(`./cities.${code}.json`, import.meta.url));
  return { raw, db: JSON.parse(raw.toString('utf8')) as CityDb };
};
const DBS = Object.fromEntries(CODES.map((c) => [c, load(c)])) as Record<(typeof CODES)[number], { raw: Buffer; db: CityDb }>;
const index = indexCities(DBS.ru.db);
const db = DBS.ru.db;
```

Тесты «размер», «форма записей», «от крупных к мелким», «каждый пояс понимает Intl» — в цикле `for (const code of CODES) describe(code, …)` по `DBS[code]`. Русские проверки поиска — как были (по `index`). Добавить:

```ts
describe('семь баз — один список городов', () => {
  // На этом держится поиск инструмента Райи по всем языкам (spirits_back):
  // строка N — один и тот же город во всех базах.
  it('одинаковая длина, страна и пояс у каждой строки', () => {
    for (const code of CODES) {
      const other = DBS[code].db;
      expect(other.cities.length, code).toBe(db.cities.length);
      other.cities.forEach((row, i) => {
        expect(row[2], `${code}#${i}`).toBe(db.cities[i][2]);
        expect(other.zones[row[3]], `${code}#${i}`).toBe(db.zones[db.cities[i][3]]);
      });
    }
  });
});

describe('поиск на языке страницы', () => {
  const first = (code: (typeof CODES)[number], q: string) => searchCities(indexCities(DBS[code].db), q)[0];
  it('крупные города — названием на языке и с местом на языке', () => {
    expect(first('en', 'Munich').zone).toBe('Europe/Berlin');
    expect(first('de', 'München').zone).toBe('Europe/Berlin');
    expect(cityPlace(first('de', 'München'))).toContain('Deutschland');
    expect(first('es', 'Sevilla').zone).toBe('Europe/Madrid');
    expect(first('fr', 'Séville').zone).toBe('Europe/Madrid');
    expect(first('pt', 'Lisboa').zone).toBe('Europe/Lisbon');
    expect(first('zh', '北京').zone).toBe('Asia/Shanghai');
    expect(first('zh', '莫斯科').zone).toBe('Europe/Moscow');
  });
  it('латиницей — на любом языке', () => {
    for (const code of CODES) expect(first(code, 'kazan').zone, code).toBe('Europe/Moscow');
  });
});
```

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-langs
git add src/content/hd/cities.test.ts
git commit -q -m "test(hd): базы городов на семи языках, один список городов (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/hd-langs/node-run-land.sh './node_modules/.bin/vitest run src/content/hd/cities.test.ts 2>&1 | tail -6'
```

Expected: FAIL — нет `cities.en.json`.

- [ ] **Step 2: Скрипт — семь языков за прогон**

В `scripts/build-hd-cities.py`: аргументы `--src` и `--out-dir` (вместо `--out`); языки и предпочтения кодов GeoNames:

```python
# Код сайта → коды языка в alternateNames по убыванию предпочтения.
LANGS = {
    'ru': ['ru'],
    'en': ['en'],
    'es': ['es'],
    'de': ['de'],
    'fr': ['fr'],
    'pt': ['pt-PT', 'pt'],
    'zh': ['zh-CN', 'zh-Hans', 'zh'],
}
```

Чтение `alternateNamesV2.txt` — один проход: для каждой записи с `r[2]` из любого списка `LANGS`, `gid in wanted`, не разговорной (`r[6] != '1'`) и не исторической (`r[7] != '1'`) — ранг `(индекс кода в списке языка, 0 если preferred r[4]=='1' иначе 1, 1 если short r[5]=='1' иначе 0)`; хранить лучший ранг в `names[code][gid]`. Функция `local_name(code, gid, fallback)`.

Сборка: города сортируются ОДИН раз (`-pop, id`); `zones` — общий список; для каждого `code` из `LANGS` — свои `regions`, `region_index`, `countries` (`local_name(code, …)` вместо `ru_name`), строки `[name, latin, cc, zone_index, pop, ri]`, где `name = local_name(code, c['id'], c['name'])`, `latin = c['ascii'] if c['ascii'] and c['ascii'].lower() != name.lower() else ''`; файл `f'{out_dir}/cities.{code}.json'`; печать — число городов, с названием на языке, размер и gzip по каждому языку. Шапку скрипта (формат, запуск) обновить: `python3 scripts/build-hd-cities.py --src ~/geonames --out-dir src/content/hd`.

- [ ] **Step 3: Дамп GeoNames и сборка на ноде**

```bash
D=~/Downloads/land_linkeon/.superpowers/hd-langs
cd ~/Downloads/land_linkeon/.worktrees/hd-langs && git add scripts/build-hd-cities.py && git commit -q -m "feat(hd): build-hd-cities.py — базы городов на семи языках за один прогон, один список городов

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash $D/node-run-land.sh 'mkdir -p ~/geonames && cd ~/geonames && for f in cities15000.zip alternateNamesV2.zip countryInfo.txt admin1CodesASCII.txt; do [ -s $f ] || curl -fsSO https://download.geonames.org/export/dump/$f; done; ls -la ~/geonames | tail -4; cd ~/ci/wt/hd-langs && python3 scripts/build-hd-cities.py --src ~/geonames --out-dir src/content/hd'
for c in ru en es de fr pt zh; do scp -q -o ControlPath=~/.ssh/cm-lnode dv@85.192.61.231:ci/wt/hd-langs/src/content/hd/cities.$c.json ~/Downloads/land_linkeon/.worktrees/hd-langs/src/content/hd/; done
ls -la ~/Downloads/land_linkeon/.worktrees/hd-langs/src/content/hd/cities.*.json
```

Expected: семь файлов, у каждого ~34 000 городов; размеры и доля названий на языке — в `progress.md`. Проверить глазами 10 строк zh: упрощённые иероглифы (北京, 上海, 莫斯科, 慕尼黑); если массово традиционные — сменить порядок кодов zh в `LANGS` и пересобрать.

- [ ] **Step 4: Зелёный, комментарии, лицензия**

`src/lib/cities.ts`: в шапке — «база на каждый язык сайта — `src/content/hd/cities.<код>.json`, … названия на языке файла из alternateNamesV2»; в `CityDb.countries` — «Код страны → название на языке файла».

`public/licenses.txt`, блок GeoNames: «their Russian names (alternateNamesV2)» → «their names in the site languages — Russian, English, Spanish, German, French, Portuguese, Chinese (alternateNamesV2)»; «only the name (Russian and Latin)» → «only the name (in the file's language and in Latin)»; «The file is built by» → «The files (one per language) are built by».

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-langs
git add src/content/hd/cities.*.json src/lib/cities.ts public/licenses.txt
git commit -q -m "feat(hd): базы городов на семи языках (GeoNames, один дамп); русская пересобрана

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/hd-langs/node-run-land.sh './node_modules/.bin/vitest run src/content/hd/cities.test.ts src/lib/cities.test.ts src/lib/human-design 2>&1 | tail -6'
```

Expected: PASS. Пересборка русской базы не ломает русские проверки и эталон модуля.

---

### Task 3: Загрузка базы городов по языку страницы

**Files:** Modify `src/lib/cityLoader.ts`, `src/components/hd/CityInput.tsx`, `src/components/hd/HdForm.tsx`, `src/pages/HumanDesignPage.tsx`; Create `src/lib/cityLoader.test.ts`.

- [ ] **Step 1: Красный тест**

`src/lib/cityLoader.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { cityDbUrl } from './cityLoader';

describe('база городов по языку страницы', () => {
  it('свой файл на каждый язык сайта', () => {
    for (const code of ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh']) {
      expect(cityDbUrl(code), code).toMatch(new RegExp(`cities\\.${code}`));
    }
  });
  it('незнакомый язык — русская база', () => {
    expect(cityDbUrl('xx')).toMatch(/cities\.ru/);
  });
});
```

Commit, run on node — FAIL (`cityDbUrl` не экспортирован).

- [ ] **Step 2: Реализация**

`src/lib/cityLoader.ts`:

```ts
import { indexCities, type CityDb, type CityIndex } from './cities';

// Адреса всех семи баз; браузер скачивает только ту, что нужна странице.
const URLS = import.meta.glob('../content/hd/cities.*.json', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

/** Адрес базы городов на языке страницы; незнакомый язык — русская. */
export function cityDbUrl(language: string): string {
  return URLS[`../content/hd/cities.${language}.json`] ?? URLS['../content/hd/cities.ru.json'];
}

const pending = new Map<string, Promise<CityIndex>>();

/**
 * База городов — отдельным файлом (около 1,5 МБ), только когда человек
 * взялся за поле города, и только на языке страницы. Сорвалась загрузка —
 * следующий фокус пробует снова.
 */
export function loadCityIndex(language: string): Promise<CityIndex> {
  let p = pending.get(language);
  if (!p) {
    p = fetch(cityDbUrl(language))
      .then((response) => {
        if (!response.ok) throw new Error(`города: HTTP ${response.status}`);
        return response.json() as Promise<CityDb>;
      })
      .then(indexCities);
    pending.set(language, p);
    p.catch(() => pending.delete(language));
  }
  return p;
}
```

`CityInput.tsx`: prop `language: string`, вызов `loadCityIndex(language)`. `HdForm.tsx`: prop `language: string`, передать в `<CityInput … language={language} />`. `HumanDesignPage.tsx`: `<HdForm texts={texts} language={language} onResult={setResult} />`. Существующие тесты, рендерящие `HdForm`/`CityInput`, — добавить `language="ru"`.

- [ ] **Step 3: Зелёный**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-langs
git add -A src/lib/cityLoader.ts src/lib/cityLoader.test.ts src/components/hd src/pages/HumanDesignPage.tsx
git commit -q -m "feat(hd): база городов — на языке страницы

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/hd-langs/node-run-land.sh './node_modules/.bin/vitest run src/lib src/components/hd src/pages > /tmp/hl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL" /tmp/hl.log | head; pnpm typecheck > /tmp/hl-tsc.log 2>&1; echo "tsc $?"'
```

Expected: `unit 0`, `tsc 0`.

---

### Task 4: Дата месяцем словом и склейка по языку

**Files:** Modify `src/lib/hdDraft.ts`, `src/lib/hdDraft.test.ts`, `src/components/hd/HdResult.tsx`, `src/components/hd/HdResult.test.tsx`, `src/pages/HumanDesignPage.tsx`, `src/content/hd/texts.test.ts` (вызов `draftMessage`).

- [ ] **Step 1: Красные тесты**

В `src/lib/hdDraft.test.ts`:

```ts
import { formatBirthDate } from './hdDraft';

describe('дата рождения по языку', () => {
  it('русский — 12.03.1990, как было', () => {
    expect(formatBirthDate('1990-03-12', 'ru')).toBe('12.03.1990');
  });
  it('остальные — месяц словом', () => {
    expect(formatBirthDate('1990-03-12', 'en')).toBe('12 March 1990');
    expect(formatBirthDate('1990-03-12', 'de')).toBe('12. März 1990');
    expect(formatBirthDate('1990-03-12', 'es')).toBe('12 de marzo de 1990');
    expect(formatBirthDate('1990-03-12', 'fr')).toBe('12 mars 1990');
    expect(formatBirthDate('1990-03-12', 'pt')).toBe('12 de março de 1990');
    expect(formatBirthDate('1990-03-12', 'zh')).toBe('1990年3月12日');
  });
  it('старые даты — тоже', () => {
    expect(formatBirthDate('1799-01-05', 'en')).toBe('5 January 1799');
  });
});
```

Во всех вызовах `draftMessage(...)` в тестах (`hdDraft.test.ts`, `texts.test.ts`) — третий аргумент: `'ru'` / `code`. Commit, run — FAIL (нет `formatBirthDate`). Если какой-то язык на ноде даёт другую строку `Intl` — остановиться и сообщить точную строку.

- [ ] **Step 2: Реализация**

`src/lib/hdDraft.ts`:

```ts
/**
 * Дата рождения для строки данных и черновика Райе. По-русски — 12.03.1990,
 * как было; на других языках — месяц словом: «12 March 1990» не спутать с
 * 3 декабря, как американское 03/12.
 */
export function formatBirthDate(date: string, language: string): string {
  const [y, m, d] = date.split('-');
  if (language === 'ru') return `${d}.${m}.${y}`;
  const locale = language === 'en' ? 'en-GB' : language === 'pt' ? 'pt-PT' : language;
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(Number(y), Number(m) - 1, Number(d))),
  );
}

/** Текст первого сообщения Райе на языке страницы. */
export function draftMessage(template: string, parts: DraftParts, language: string): string {
  return fillTemplate(template, { ...parts, date: formatBirthDate(parts.date, language) });
}
```

(`Date.UTC` для лет 0–99 сдвигает в 1900-е — в калькуляторе год от 1800; при сомнении — `new Date(Date.UTC(2000, m-1, d)).setUTCFullYear(y)`.)

`HdResult.tsx`: prop `language: string`; `dataLine` — `date: formatBirthDate(result.date, language)`; `draftMessage(texts.message, {...}, language)`; перечень центров — `joinComma(centerNames, language)`; тире между названием и описанием центра (определённые и открытые) и канала — `dashParts(language)` (как в `src/components/values/ValuesResult.tsx`: для ru разметка « — » не меняется, в zh — «——» без пробелов) (`import { dashParts, joinComma } from '../../lib/textJoin'`). `HumanDesignPage.tsx`: `<HdResult texts={texts} language={language} result={result} />`. `HdResult.test.tsx` — `language="ru"`; плюс красный тест: тот же результат с `language="zh"` — в списках центров и каналов нет « — », есть «——»; подпись схемы с двумя центрами склеена «、».

- [ ] **Step 3: Зелёный**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-langs
git add -A src/lib/hdDraft.ts src/lib/hdDraft.test.ts src/components/hd src/pages/HumanDesignPage.tsx src/content/hd/texts.test.ts
git commit -q -m "feat(hd): дата рождения месяцем словом на языке страницы, перечень центров по правилам языка

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/hd-langs/node-run-land.sh './node_modules/.bin/vitest run src/lib src/components/hd src/content/hd src/pages > /tmp/hl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL" /tmp/hl.log | head; pnpm typecheck > /tmp/hl-tsc.log 2>&1; echo "tsc $?"'
```

Expected: `unit 0`, `tsc 0`; русские ожидания в `HdResult.test.tsx` и `hdDraft.test.ts` не меняются.

---

### Task 5: Баннер языка на калькуляторе

**Files:** Modify `src/pages/HumanDesignPage.tsx`, `src/pages/HumanDesignPage.test.tsx`.

- [ ] **Step 1: Красный тест** — в `HumanDesignPage.test.tsx`, по образцу `src/pages/ValuesTestPage.test.tsx` (баннер подменён меткой, пропсы захватываются): страница ставит баннер, и он получает ровно `hasHdCalculator` (`expect(captured.available).toBe(hasHdCalculator)` после `resetModules` и импорта `../content/hd/availability`). Commit, run — FAIL.

- [ ] **Step 2: Реализация** — `import LanguageBanner from '../components/ui/LanguageBanner'; import { hasHdCalculator } from '../content/hd/availability';`; после `<Footer … />`:

```tsx
      {/* В пререндере пусто — предложение считается в эффекте, по языку браузера. */}
      <LanguageBanner available={hasHdCalculator} />
```

В комментарии над компонентом заменить абзац «Без LanguageBanner сознательно: калькулятор пока только по-русски…» на «LanguageBanner — как на тесте ценностей: предлагает этот же калькулятор на языке браузера, если он выпущен.»

- [ ] **Step 3: Зелёный** — commit «feat(hd): баннер языка на калькуляторе — только выпущенные языки», run `vitest run src/pages` и `pnpm typecheck` → `0`.

---

### Task 6: Проверки нерусских текстов калькулятора

**Files:** Modify `src/content/hd/texts.test.ts`.

- [ ] **Step 1: Правила** — по образцу `src/content/values/texts.test.ts` (ветка от 13.10):

```ts
const CYRILLIC = /\p{Script=Cyrillic}/u;
const WIDE = /[\p{Script=Han}　-〿＀-￯]/u;
const AGENT_WORD = /(?<!\p{L})agent(?:es?|s|en)?(?!\p{L})|智能体/iu;
// Китайский — в 2,5–3 раза короче по знакам (замер на текстах сайта).
const limitsFor = (code: string) =>
  code === 'zh' ? { description: [40, 120], text: [25, 200] } : { description: [100, 180], text: [60, 420] };
```

Escape-последовательности `　…` писать видимыми (инструменты Edit/Write раскодируют `\uXXXX` в символ — писать через python/node и проверить `grep -n 'u3000'` и `LC_ALL=C grep -c $'\xe3\x80\x80' = 0`).

В цикле: «метатеги…» и «описания короткие…» — с `limitsFor(code)`; для `code !== 'ru'`: ни кириллицы, ни `AGENT_WORD` во всех строках (`strings(t)`); для `code !== 'zh' && code !== 'ru'`: ни `WIDE`. Проверка длины черновика — `draftMessage(t.message, {...}, code)` и город `'Petropavlovsk-Kamchatsky'` для нерусских.

- [ ] **Step 2: Сломать нарочно** — временная копия `ru.ts` как `en.ts` (константа `en`) → коммит `tmp:` → прогон `texts.test.ts`: у `en` падает только «ни кириллицы…»; `git reset --hard HEAD~1`, дерево чистое. Записать красную строку в `progress.md`.

- [ ] **Step 3: Зелёный и коммит** — «test(hd): правила переводов калькулятора — без кириллицы, пределы zh, agent, иероглифы только в zh»; `vitest run src/content/hd` → `0`.

---

### Task 7: e2e калькулятора на других языках

**Files:** Modify `tests/hd-calculator.spec.ts`.

- [ ] **Step 1: Сырой HTML** — в `test.describe('калькулятор Human Design в сыром HTML', …)` тест по образцу `tests/values-test.spec.ts` («нерусские версии…»): для каждого `code` из `hdCalcCodes()` кроме ru — `<html lang="code"`, один canonical на `hdCalcUrlFor(code, DEFAULT_LANGUAGE)`, hreflang по адресам (хелпер `wrongHreflang`, как в `tests/assistants.spec.ts`), H1 = `(await import(`../src/content/hd/texts/${code}.ts`)).default.h1` (с раскодированием сущностей, как в тесте ценностей), блок кредитов GeoNames на месте; `expect(codes.filter((c) => c !== DEFAULT_LANGUAGE)).toHaveLength(6)`. Импорт `hdCalcCodes` — из `scripts/hd-calc-languages.js`, `hdCalcUrlFor` — из `scripts/site-urls.mjs` (проверить имена в файлах).

- [ ] **Step 2: Полный проход zh и en в браузере** — по образцу теста «известное рождение…» (строка ~125): страница `/zh/tests/…` → `/zh/calculators/human-design/`, контекст браузера с `locale` = язык страницы; дата 1990-03-12, время 14:25, город — набрать «北京» (zh) / «London» (en) и выбрать первую подсказку; посчитать; проверить: результат есть и скрыт от Вебвизора тем же признаком, что в русском тесте; запрос базы городов — `cities.zh-*.json` / `cities.en-*.json` (русскую страница не грузит); черновик Райе содержит «1990年3月12日» и «北京» / «12 March 1990» и «London», в ссылке `lang=zh` / `lang=en`. Проверка ожиданий — литералами (не вызовом `formatBirthDate`).

- [ ] **Step 3: Прогон (пока вхолостую)** — commit; на ноде `pnpm build && npx playwright test tests/hd-calculator.spec.ts` → `0`. Новые тесты по-настоящему работают после Task 9.

---

### Task 8: Глоссарий терминов HD на шести языках

**Files:** Create `docs/hd-calculator/glossary-languages.md`.

- [ ] **Step 1: Шесть составителей параллельно** — агенты `general-purpose` (opus), по одному на язык. Бриф:

```text
Составь глоссарий терминов Human Design на <ЯЗЫК> (код <КОД>) для калькулятора
linkeon.io. Ничего не запускай и не коммить; пиши только файл
<ПУТЬ>/docs/hd-calculator/glossary-<КОД>.md.
Источник терминов — русская таблица названий в
<ПУТЬ>/docs/superpowers/plans/2026-10-08-human-design-calculator.md (раздел
«Правила текстов», таблица «Что / Названия») и <ПУТЬ>/src/content/hd/texts/ru.ts
(поля name, strategy, inMessage, названия каналов).
Для каждого термина — название, устоявшееся в сообществе Human Design на этом
языке (англоязычные — по сверочной таблице в той же русской таблице). Таблица:
код | по-русски | на <ЯЗЫК> | источник/обоснование (одной фразой) | сомнение (если есть).
Разделы: 5 типов + стратегии; 7 авторитетов (name и форма для фразы «мой
авторитет — …»); 6 линий профиля и формат «1/3 · Исследователь / Мученик»;
5 видов определённости; 9 центров; 36 каналов.
Правила: основателя метода и Jovian Archive не называть; не придумывать
термины, если устоявшийся есть; где сообщество расходится — выбрать один и
указать альтернативу в «сомнении».
Ответ: путь и список сомнений.
```

- [ ] **Step 2: Свести** — контролёр объединяет шесть файлов в `docs/hd-calculator/glossary-languages.md` (раздел на язык), удаляет `glossary-<код>.md`, коммит «docs(hd): глоссарий терминов Human Design на шести языках».

- [ ] **Step 3: СТОП 1** — владельцу: ссылка на глоссарий и список сомнений по языкам. Правки — коммитом в глоссарий до Task 9.

---

### Task 9: Переводы

**Files:** Create `src/content/hd/texts/{en,es,de,fr,pt,zh}.ts`; Modify `src/content/assistants/pages/{en,es,de,fr,pt,zh}/raya.ts`.

- [ ] **Step 1: Шесть переводчиков параллельно** — агенты `general-purpose` (opus), бриф (подставить язык, код, имя Райи с её страницы этого языка):

```text
Ты переводишь калькулятор Human Design на сайте linkeon.io с русского на
<ЯЗЫК> (код <КОД>). Читай файлы, ничего не запускай (никаких npm/pnpm/node/
vitest) и не коммить. <ПУТЬ> = /Users/dmitry/Downloads/land_linkeon/.worktrees/hd-langs.
Источник: <ПУТЬ>/src/content/hd/texts/ru.ts; тип: <ПУТЬ>/src/content/hd/types.ts;
глоссарий (обязателен): <ПУТЬ>/docs/hd-calculator/glossary-languages.md, раздел <КОД>;
правила: раздел «## Правила переводов» в
<ПУТЬ>/docs/superpowers/plans/2026-10-14-hd-calculator-languages.md;
механические проверки: <ПУТЬ>/src/content/hd/texts.test.ts;
тон и обращение — <ПУТЬ>/src/content/assistants/pages/<КОД>/raya.ts.
Сделай:
1. <ПУТЬ>/src/content/hd/texts/<КОД>.ts — все ключи ru.ts, константа
   `const <КОД>: HdTexts = {…}; export default <КОД>;`, шапка-комментарий
   «Калькулятор Human Design на <ЯЗЫК>. Перевод texts/ru.ts по плану
   docs/superpowers/plans/2026-10-14-hd-calculator-languages.md, «Правила переводов».»
   Шаблоны {date} {time} {city} {offset} {type} {profile} {authority} {centers}
   — ровно как в ru.ts. Пиши символы как есть, без \uXXXX.
2. <ПУТЬ>/src/content/assistants/pages/<КОД>/raya.ts — после `cta`:
   `heroLink: { text: '<«Рассчитать бодиграф бесплатно» на языке>', href: '/<КОД>/calculators/human-design/' },`
   и в FAQ — тот вопрос, где в ru/raya.ts есть `link` на калькулятор: добавь
   `link` с тем же текстом и href `/<КОД>/calculators/human-design/` (если такого
   вопроса в файле языка нет — сообщи, не придумывай вопрос).
Перед ответом проверь: ключи; длины по правилу 5; ни кириллицы, ни agent;
термины строго по глоссарию.
Ответ: пути, длины описаний (min/max), места сомнений.
```

Французский: неразрывный пробел U+00A0 перед «; : ? !» и внутри «« … »» — как в `pages/fr/*.ts`; после правок проверить perl-ом (Edit/Write теряют U+00A0). Португальский: «25 000» с U+00A0, как в `pages/pt/*.ts`.

- [ ] **Step 2: Проверка и коммит** — `git status`: шесть новых `texts/*.ts` и шесть `raya.ts`; commit «feat(hd): тексты калькулятора на en, es, de, fr, pt, zh; кнопка и ссылка на калькулятор со страниц Райи»; на ноде `vitest run src/content src/lib src/pages` и `pnpm typecheck` → `0`. Красное — вернуть агенту языка.

---

### Task 10: Вычитка

- [ ] **Step 1: Шесть вычитчиков параллельно** — новые агенты; бриф: русский оригинал и перевод, правки только в `texts/<КОД>.ts` и ссылках в `raya.ts`; проверить смысл (без усиления и смягчения), естественность, обращение, глоссарий, правила 1 и 5–7, читаемость сообщения Райе при подстановке (`{date}` — «12 March 1990» / «1990年3月12日», `{city}` — название на языке). Ответ — правки «было → стало» и сомнения. fr/pt — те же проверки неразрывного пробела.

- [ ] **Step 2: Коммит и прогон** — «fix(hd): вычитка переводов калькулятора»; `vitest run src/content src/lib` → `0`.

---

### Task 11: Полный прогон, скриншоты, СТОП 2

- [ ] **Step 1: Полный прогон** — на ноде: `vitest run`, `pnpm typecheck`, `pnpm build` (в логе пререндера — по строке на каждую из семи версий калькулятора, sitemap — 7 адресов калькулятора), `npx playwright test` → всё `0` (новые e2e Task 7 работают по шести языкам).

- [ ] **Step 2: Скриншоты en и zh** — по образцу `.superpowers/values-langs/shots.mjs`: `pnpm preview --port 4173`, `/en/` и `/zh/calculators/human-design/`, телефон 390 и десктоп 1280, `locale` = язык страницы: вступление, форма с подсказками города (набрать «Lond» / «北京»), результат (1990-03-12, 14:25). Контролёр смотрит все снимки сам.

- [ ] **Step 3: СТОП 2** — владельцу скриншоты и сомнения вычитчиков.

---

### Task 12: Бэкенд — поиск города на всех языках

**Files (spirits_back):** Modify `scripts/sync-human-design.sh`; Create `src/human-design/multilang-index.ts`, `src/human-design/multilang-index.spec.ts`; Modify `src/human-design/city-resolver.ts`, `src/human-design/city-resolver.spec.ts`, `src/human-design/hd-tool.service.ts`, `src/human-design/hd-tool.service.spec.ts`, `src/chat/chat-tools.ts`, `src/chat/chat-tools.hd.spec.ts`.

- [ ] **Step 1: Перенос семи баз** — в `scripts/sync-human-design.sh`: пути проверки «незакоммиченных правок» и `SHA` — `src/content/hd/cities.*.json` вместо `cities.ru.json`; копирование — `for f in "$LAND"/src/content/hd/cities.*.json; do cp "$f" src/human-design/data/; done`; README данных — «`cities.<код>.json` — города GeoNames от 15 000 жителей с названиями на семи языках сайта (один список и порядок)». Запуск из воркдерева бэкенда на ветку лендинга:

```bash
cd ~/Downloads/spirits_back/.worktrees/hd-langs
bash scripts/sync-human-design.sh ~/Downloads/land_linkeon/.worktrees/hd-langs
git status --short | head
git add -A scripts/sync-human-design.sh src/human-design
git commit -q -m "chore(hd): перенос — базы городов на семи языках из land_linkeon

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 2: Красные тесты общего указателя** — `src/human-design/multilang-index.spec.ts`:

```ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { multilingualCities, SITE_LANGUAGES } from './multilang-index';
import { resolveCity } from './city-resolver';
import type { CityDb } from './cities';

const load = (code: string) => JSON.parse(readFileSync(join(__dirname, 'data', `cities.${code}.json`), 'utf8')) as CityDb;
const dbs = Object.fromEntries(SITE_LANGUAGES.map((c) => [c, load(c)])) as Record<string, CityDb>;
const { index, places, populations } = multilingualCities(dbs);
const found = (q: string) => resolveCity(index, q, undefined, populations, places);

describe('город по названию на любом языке сайта', () => {
  it('Мюнхен — на четырёх языках и иероглифами', () => {
    for (const q of ['Мюнхен', 'München', 'Munich', '慕尼黑']) {
      const r = found(q);
      expect(r.kind, q).toBe('found');
      if (r.kind === 'found') expect(r.city.zone, q).toBe('Europe/Berlin');
    }
  });
  it('Пекин — иероглифами; Севилья — по-испански и по-французски', () => {
    for (const q of ['北京', 'Sevilla', 'Séville']) expect(found(q).kind, q).toBe('found');
  });
  it('подсказка региона — на любом языке', () => {
    const r = found('München, Bayern');
    expect(r.kind).not.toBe('not_found');
  });
  it('неоднозначность — по-прежнему варианты', () => {
    expect(found('Железногорск').kind).toBe('choose');
  });
  it('подписи — русские, как раньше', () => {
    const r = found('München');
    if (r.kind === 'found') expect(r.city.name).toBe('Мюнхен');
  });
  it('семь баз согласованы — иначе ошибка', () => {
    const broken = { ...dbs, en: { ...dbs.en, cities: dbs.en.cities.slice(1) } };
    expect(() => multilingualCities(broken)).toThrow();
  });
});
```

Commit; run on node `npx jest src/human-design/multilang-index.spec.ts` — FAIL (нет модуля).

- [ ] **Step 3: Реализация**

`src/human-design/multilang-index.ts`:

```ts
import { indexCities, normalize, type CityDb, type CityIndex } from './cities';

/** Языки сайта: базы городов — data/cities.<код>.json, один список и порядок городов. */
export const SITE_LANGUAGES = ['ru', 'en', 'es', 'de', 'fr', 'pt', 'zh'] as const;

/**
 * Общий указатель для инструмента Райи: подписи — русские (база ru), ключи
 * поиска — названия на всех семи языках и латиница; places — «регион страна»
 * на всех языках, для подсказок после запятой. Строка N — один и тот же город
 * во всех базах (собраны одним прогоном build-hd-cities.py); расхождение — ошибка.
 */
export function multilingualCities(dbs: Record<string, CityDb>): {
  index: CityIndex;
  places: string[];
  populations: number[];
} {
  const ru = dbs.ru;
  const index = indexCities(ru);
  const places = index.map(({ city }) => normalize(`${city.region ?? ''} ${city.country}`));
  for (const code of SITE_LANGUAGES) {
    if (code === 'ru') continue;
    const db = dbs[code];
    if (!db || db.cities.length !== ru.cities.length) throw new Error(`база городов ${code} не совпадает с ru`);
    const local = indexCities(db);
    local.forEach(({ city, keys }, i) => {
      if (db.cities[i][2] !== ru.cities[i][2]) throw new Error(`база городов ${code}: строка ${i} — другой город`);
      for (const k of keys) if (!index[i].keys.includes(k)) index[i].keys.push(k);
      places[i] += ` ${normalize(`${city.region ?? ''} ${city.country}`)}`;
    });
  }
  return { index, places, populations: ru.cities.map((c) => c[4]) };
}
```

`city-resolver.ts`: `resolveCity(index, query, cityId?, populations?, places?: string[])`; в `search` — `fits(city, id)`: если `places` передан — `hintList.every((h) => places[id].includes(h))`, иначе прежняя проверка по русским `region`/`country`; `index.forEach(({ city, keys }, id) => { if (!fits(city, id)) return; …`.

`hd-tool.service.ts`: вместо `CITIES_PATH`/`citiesPath` — `CITIES_DIR = join(__dirname, 'data')` и `protected citiesDir`; `cityData()` читает `cities.<код>.json` для `SITE_LANGUAGES`, строит `multilingualCities(...)`, хранит `index`, `places`, `populations`; вызов `resolveCity(index, city, cityId, populations, places)`. В `hd-tool.service.spec.ts` тест «база городов недоступна» — `(svc as any).citiesDir = '/no/such/dir'`.

`chat-tools.ts`, описание `calculate_human_design` и поля `city`: «Город передавай так, как назвал человек, на любом языке сайта (ru, en, es, de, fr, pt, zh); подходит и нынешнее официальное название по-русски (Ленинград → Санкт-Петербург …)» — прежние примеры переименований оставить. `chat-tools.hd.spec.ts`: ожидание `'по-русски'` оставить, добавить `toMatch(/на любом языке/)`.

- [ ] **Step 4: Зелёный** — commit «feat(hd): инструмент Райи находит город по названию на любом языке сайта»; на ноде `npx jest src/human-design src/chat/chat-tools.hd.spec.ts` и `npx tsc -p tsconfig.build.json --noEmit` → `0`; `npm run build` → `0` (nest-cli `assets` уже копирует `human-design/data/*.json` — проверить, что семь файлов в `dist/human-design/data/`).

---

### Task 13: Слияние

- [ ] **Step 1: Лендинг** — `git fetch`, `git rebase origin/main`, на ноде `vitest run` + `pnpm build`, `git push origin HEAD:main`.
- [ ] **Step 2: Бэкенд** — заново `bash scripts/sync-human-design.sh ~/Downloads/land_linkeon` (уже main лендинга; SHA в README — коммит main); если изменилось только README — commit; `git rebase origin/main`; на ноде `npx jest src/human-design src/chat` + `tsc`; `git push origin HEAD:main`.

---

### Task 14: Выкат бэкенда (СТОП 3) и инструкция Райи (СТОП 4)

- [ ] **Step 1: СТОП 3** — OK владельца на `deploy.sh` бэкенда (test → прод, `BACK_ONLY=1`); если маршрут нода → прод оборван — OK на обход через релей (заметка памяти «Прод недоступен — обход через релей»; рецепт в репозиторий не записывать).
- [ ] **Step 2: Выкат** — со свежих клонов на ноде (в клон бэка — `scripts/test-server.env.local` и ссылка `tests/node_modules`), отвязанно; ждать ALL PHASES GREEN.
- [ ] **Step 3: Проверка инструмента на проде** — прямой вызов `/mcp` (скрипт по образцу `.superpowers/raya-hd/mcp-call.mjs`, секрет — через `dotenv.parse` на проде, в вывод не попадает): «München», «北京», «Мюнхен» → `chart`, пояс верный.
- [ ] **Step 4: СТОП 4 — инструкция Райи** — снимок `agents.system_prompt` id 14 в `.superpowers/hd-langs/raya-prompt-before.txt`; в копии `raya-prompt-after.txt` заменить строку ««Город не найден» — вызови ещё раз с нынешним официальным названием по-русски; если не помогло — спроси ближайший крупный город в том же часовом поясе.» на «Город передавай так, как назвал человек, на его языке. «Город не найден» — вызови ещё раз с нынешним официальным названием; если не помогло — спроси ближайший крупный город в том же часовом поясе.»; показать владельцу дифф; запись — `psql … <<< "update … :'body' …"` с проверкой md5 против снимка (как в `spirits_back/docs/superpowers/plans/2026-10-12-raya-hd-tool.md`, Task 10, с поправкой «psql -c не подставляет переменные»).

---

### Task 15: Выкат лендинга (СТОП 5)

- [ ] **Step 1: СТОП 5** — OK владельца; при оборванном маршруте — `SKIP_SMOKE=1 NO_ROLLBACK=1` и проверки smoke с релея (как 14.10, итоги плана `2026-10-13-values-test-languages.md`).
- [ ] **Step 2: Выкат** — `LANDING_ONLY=1` со свежих клонов (`LOCAL_LAND_DIR` — клон лендинга), отвязанно.
- [ ] **Step 3: Проверки с релея** — главная и языковые главные (`<html lang>`), sitemap, семь версий калькулятора (`<html lang>`, H1, hreflang 8, кредиты GeoNames), семь баз городов отдаются (`/assets/cities.<код>-*.json` из HTML/бандла — 200 и JSON), страницы Райи на шести языках ведут на калькулятор своего языка.

---

### Task 16: Живая проверка с Райей

- [ ] **Step 1: Черновики** — tsx-скрипт на ноде (по образцу `.superpowers/values-langs/values-draft.ts`): `draftMessage(zh.message, {date:'1990-03-12', time:'14:25', city:'北京', offset:'UTC+8', type, profile, authority}, 'zh')` и то же для en с «London», «UTC+1»; адрес — `https://my.linkeon.io/chat?assistant=14&utm_content=hd-calc&lang=<код>#draft=…`.
- [ ] **Step 2: Проход** — скрипт по образцу `.superpowers/values-langs/olia-live.cjs` (вход служебным аккаунтом; **страну телефона выбрать RU** — иначе код уйдёт на чужой номер; секрет — через релей с OK владельца, ключ снять сразу): черновик в поле Райи, автоприветствие не ушло, Райя вызвала инструмент (`grep calculate_human_design` в логе API прода через релей), ответ на языке страницы, в ответе картинка схемы (`img` с `linkeon-assets`), тип и профиль совпадают с калькулятором (Пекин 14:25 UTC+8 и Лондон 14:25 UTC+1 — эталон считает Task 11 скриншотами/прямым вызовом инструмента).

---

### Task 17: Память, итоги, уборка

- [ ] **Step 1: Память** — заметки `project_hd_calculator` (калькулятор на 7 языках, базы городов, дата) и `project_raya_hd_tool` (поиск города на всех языках, `multilang-index.ts`, перенос семи баз), строки в `MEMORY.md`.
- [ ] **Step 2: Итоги** — раздел «Итоги выката» в конце этого плана (дата, коммиты, отклонения, решения владельца), коммит в main лендинга.
- [ ] **Step 3: Уборка** — воркдеревья обоих репозиториев, `tmp/hd-langs*` и `ci/wt/hd-langs*` на ноде, клоны выкатов, `/tmp/hl*` и черновики на ноде; `~/geonames` на ноде — оставить (дамп пригодится) или удалить по слову владельца. Ветки `feat/hd-langs` — после «ок» владельца.
