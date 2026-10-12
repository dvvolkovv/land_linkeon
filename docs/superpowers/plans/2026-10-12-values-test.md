# Тест ценностей по Шварцу на linkeon.io — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** бесплатный тест ценностей на `linkeon.io/tests/values/` (по-русски): 30 утверждений → круг из 10 ценностей Шварца, три ведущие и одна наименее важная, два напряжения модели → кнопка «Разобрать с Олей», которая открывает чат с готовым черновиком первого сообщения.

**Architecture:** чистый TypeScript-модуль `src/lib/schwartz/` (ценности и оси, 30 утверждений по ключам, расчёт в целых суммах, круг строкой SVG) без браузерных API. Страница лендинга — отдельные ленивые чанки (код и тексты), пререндер даёт поисковику вступление, описания 10 ценностей и FAQ и выключает на этой странице Вебвизор. Прогресс — в `sessionStorage` вкладки. Переход к Оле — тем же механизмом черновика, что у калькулятора Human Design: общая часть `hdDraft.ts` выносится в `chatDraft.ts`. Кабинет не меняется.

**Tech Stack:** лендинг — React 18, TypeScript, Vite 5, Tailwind, i18next, vitest (node), Playwright, tsx (служебный скрипт выгрузки текстов).

**Спека:** [docs/superpowers/specs/2026-10-12-values-test-design.md](../specs/2026-10-12-values-test-design.md)

---

## Что выяснено при подготовке плана (12.10.2026)

1. **Кабинет готов.** На `origin/main` кабинета (`45e3301`) скрипт `data-draft-capture` в `index.html` кладёт черновик в `pending_draft` для любого `?assistant=` — не только для Райи; автоприветствие при ждущем черновике не шлётся. Оля — `assistant=2` (`src/content/assistants/roster.data.js`, `slug: 'olia', id: 2`). Правок кабинета нет.
2. **Метрика лендинга** инициализируется одной строкой в `index.html`: `ym(105902201, 'init', {webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`. Каждая страница лендинга — свой пререндеренный HTML из этого шаблона, переходы между страницами — с перезагрузкой. Поэтому `webvisor:false` (и `clickmap:false`) для одной страницы — замена подстроки в её HTML при пререндере; остальные страницы не меняются.
3. **В основном чекауте лендинга на маке нет `node_modules`.** Ни один тест на маке не запускается — всё через `node-run.sh` на ноде (Task 1). На ноду попадает только закоммиченное, поэтому красный тест коммитится отдельным коммитом `test(…): … (красный)` — так уже принято в репозитории.
4. **Порядок ценностей на круге** — по Шварцу: самостоятельность, стимуляция, гедонизм, достижение, власть, безопасность, конформность, традиция, доброта, универсализм. Сектор 0 начинается сверху, дальше по часовой стрелке. Подписи с таким порядком помещаются в рисунок 520×300 при шрифте 16 (проверяет `texts.test.ts`, Task 5).
5. **Пороги в целых числах.** Балл ценности — сумма трёх ответов / 3 минус личное среднее. Разница осей и разброс баллов от личного среднего не зависят, поэтому сравниваются суммы: «приоритеты не выделились» ⇔ разброс сумм ценностей ≤ 1; ось «в равновесии» ⇔ `|сумма_левых·n_прав − сумма_правых·n_лев| < 0,5·3·n_лев·n_прав`. Ответ ровно на пороге (разница 0,5) — уже не равновесие. Из «не выделились» следует равновесие обеих осей (разброс ≤ 1 даёт разницу осей не больше 1/3).
6. **Утверждения сверены с опубликованными формулировками PVQ-40** по памяти при написании: близкие пересказы («даже когда никто не следит», «равные возможности для всех», «быть богатым… дорогие вещи», «скромным… не привлекать внимания», «понимать несогласных») переписаны своими образами. Независимая сверка — в Task 6.
7. **Локали лендинга** форматированы ровно как `JSON.stringify(…, null, 2) + "\n"` (проверено на всех семи) — ключи добавляются node-скриптом без ручной правки JSON.

## Уточнения спеки, принятые в плане

| Место спеки | Как в плане | Почему |
|---|---|---|
| «все 10 описаний под раскрытием» | под раскрытием — все 10 в личном порядке (по убыванию балла) с названием, строкой и описанием | порядок — то личное, чего нет в разделе о модели ниже |
| «О модели» в пререндере | раздел «Десять ценностей по Шварцу»: название, строка и описание каждой ценности | содержимое для поисковика; те же описания, что в результате |
| «Круг… с общим `alt`» | `alt` — «Круг ценностей»; легенда групп — обычным HTML под картинкой | в `alt` не должно быть данных; легенда — общие слова, не результат |
| цель `values-test-start` — «нажал „Начать“» | и «Начать заново», и «Пройти заново»: каждое начало с первого утверждения по клику; «Продолжить» — не цель | доля «закончили / начали» считается по прохождениям |
| «Продолжить (12 из 30)» | число — сколько утверждений отвечено, продолжение — с того места, где человек был | после «Назад» текущее утверждение может быть раньше последнего отвеченного |
| результат в `sessionStorage` | запись хранит `{answers, index}`; `index = 30` — тест пройден, при загрузке сразу результат без цели `values-test-complete` | цель — только факт прохождения, не перезагрузка |
| ничьи «по порядку круга» | по ответам человека: при равной сумме выше сильнее «похож», ниже — сильнее «не похож»; наименее важная — среди не вошедших в три ведущие; круг — только при полном совпадении ответов (решение владельца 12.10, после ревью Task 2–4). Код модуля в ветке уточнён по ревью: круг 520×300, одна дуга обода на группу, наименее важная — пунктирной обводкой | ничьи у третьего места — около 41% прохождений, порядок круга перекашивал результат к концу круга |
| у третьей по порядку та же сумма, что у последней | ведущих 1–2 (только набравшие больше остальных), наименее важной нет, `restEqual: true`, на странице — «Остальные ценности набрали поровну…», в сообщении — «остальные — поровну» (по ревью 12.10: иначе пометки ничьих перечисляли одно и то же) | случается, когда 8 ценностей из 10 набрали одинаковую сумму |
| полные ничьи (те же три ответа) | помечаются честно: `topTies`/`bottomTies` в результате, строка «С тем же результатом: …» под карточкой третьей ведущей и наименее важной, «(с тем же результатом — …)» в сообщении Оле (решение владельца 12.10; «вровень с ней» не годилось по роду) | полная ничья у третьего места — до 18–41% прохождений |
| карта кликов на странице теста | выключена вместе с Вебвизором (`clickmap:false`) | по ревью Task 5: последовательность кликов по шести кнопкам при общем порядке утверждений восстанавливает ответы так же, как Вебвизор; без этого фраза «ответы не попадают в аналитику» неверна |
| сообщение Оле | `{axes}` — две короткие фразы из `axesInMessage` через «; » (первая с заглавной, вторая со строчной) | одна фраза на обе оси читается естественно |

## Порядок и зависимости

```
Task 1 → Task 2 → Task 3 → Task 4 (модуль)
Task 5 (тексты) → Task 6 (слепая разметка, сверка с PVQ) → [СТОП 1: тексты целиком]
Task 7 (черновик Оле), Task 8 (прогресс), Task 9 (адрес и языки) — после Task 5, не ждут СТОП 1
После «ок» по текстам:
  Task 10 → 11 → 12 → 13 → 14 [СТОП 3] → 15 [СТОП 2] → 16
```

**Стоп-точки владельца.** Без явного «да» дальше не идти.
- **СТОП 1** (конец Task 6) — все тексты одним файлом после слепой разметки и сверки с PVQ. Правки — отдельным коммитом в `texts/ru.ts` до Task 10.
- **СТОП 2** — запуск `deploy.sh` (Task 15): `LANDING_ONLY=1` с ноды со свежих клонов, сборка того же коммита на ноде заранее.
- **СТОП 3** (Task 14) — владелец посмотрел скриншоты (телефон и десктоп: старт, вопрос, результат, «приоритеты не выделились», страница Оли).

## Где работать

- Код правится на маке в воркдереве лендинга `~/Downloads/land_linkeon/.worktrees/values-test` (ветка `feat/values-test`). Основной чекаут не трогать: там работают другие сессии.
- Все прогоны (`pnpm install`, vitest, `tsc`, `eslint`, `pnpm build`, Playwright) — на тестовой ноде `dv@85.192.61.231` в воркдереве `~/ci/wt/values-test`. Код едет туда **git push'ем прямо в CI-клон ноды** (`node-run.sh`, Task 1) — не через GitHub и не rsync; незакоммиченное на ноду не попадает.
- SSH к ноде — через одно мастер-соединение (`-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h`): у ноды `MaxStartups 10:30:100`. В каждой ssh-команде — `source ~/.nvm/nvm.sh` (делает `node-run.sh`). Вывод долгих команд — в файл, не через `| tail`: конвейер вернёт код `tail`, и красное выглядит зелёным.
- Если сессия идёт на самой ноде (`hostname` = `ugliest-salmon`): воркдерево — `~/dev/land_linkeon/.worktrees/values-test`, команды из `node-run.sh` выполнять прямо в нём, без ssh; `~/spirits_back` и `~/spirits_front` (живой стенд) не трогать.
- Тексты — по-русски, к посетителю на «вы»; слово «ассистент», не «агент». Репозиторий публичный: ни секретов, ни номеров, ни рецептов входа, ни цитат промптов ассистентов — ни в коде, ни в коммитах, ни в этом плане.
- Коммиты — по-русски, в стиле репозитория: `test(values): … (красный)`, потом `feat(values): …`/`fix(values): …`. Последняя строка сообщения — `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`. В `git add` — только свои файлы поимённо.

## Публичный интерфейс модуля

Точка входа — `src/lib/schwartz/index.ts`. Страница, черновик и тексты опираются только на неё (кроме `labelLayout`/`CIRCLE` из `circle.ts` — их читает проверка подписей в `texts.test.ts`).

```ts
VALUE_KEYS: readonly ['selfDirection', 'stimulation', 'hedonism', 'achievement', 'power',
                      'security', 'conformity', 'tradition', 'benevolence', 'universalism']  // порядок круга
type ValueKey
HIGHER_ORDER_KEYS: readonly ['openness', 'selfEnhancement', 'conservation', 'selfTranscendence']
type HigherOrderKey
VALUE_GROUP: Record<ValueKey, HigherOrderKey | null>    // гедонизм — null
AXIS_KEYS: readonly ['change', 'focus']; type AxisKey; type AxisLean = 'left' | 'right' | 'balance'
AXES: Record<AxisKey, { left: HigherOrderKey; right: HigherOrderKey }>
valuesOf(group: HigherOrderKey): ValueKey[]

ITEMS: readonly { id: ItemId; value: ValueKey }[]       // 30, в порядке показа
ITEM_IDS: readonly ItemId[]                              // 'selfDirection1' … 'universalism3'
type ItemId = `${ValueKey}${1 | 2 | 3}`

ANSWER_MIN = 1; ANSWER_MAX = 6; BALANCE_THRESHOLD = 0.5; FLAT_THRESHOLD = 0.5
scoreAnswers(answers: readonly number[]): ValuesResult   // 30 целых 1–6, иначе RangeError
interface ValuesResult {
  scores: Record<ValueKey, number>;   // среднее ценности минус личное среднее
  ranking: ValueKey[];                // по убыванию; ничьи — по ответам человека, наименее важная последней
  flat: boolean;                      // приоритеты не выделились
  top: ValueKey[];                    // 3; 1–2 при restEqual; [] при flat
  topTies: ValueKey[];                // вне тройки, но ответы те же, что у третьей (полная ничья)
  bottom: ValueKey | null;            // null при flat и restEqual
  bottomTies: ValueKey[];             // вне тройки, ответы те же, что у наименее важной
  restEqual: boolean;                 // выделились 1–2, остальные набрали поровну: top короче, bottom null
  axes: Record<AxisKey, { lean: AxisLean; diff: number }>;
}

CIRCLE_CLAMP = 2.5; GROUP_COLORS: Record<HigherOrderKey, string>
renderValuesCircleSvg(result: ValuesResult, labels: Record<ValueKey, string>): string  // самостоятельный SVG
```

## Вне рамок

- Другие языки (механизм готов: язык выходит, когда появится `src/content/values/texts/<код>.ts`), 19 ценностей PVQ-RR, сохранение и «поделиться», запись результата в профиль или граф кабинета.
- Правка инструкции Оли — только если живая проверка (Task 16) покажет, что она не опирается на результат; отдельной задачей с OK владельца.
- Кабинет и мобильные приложения: кнопка «Разобрать с Олей» открывает веб-кабинет.

## Файлы

| Файл | Ответственность | Что с ним |
|---|---|---|
| `src/lib/schwartz/values.ts` | 10 ценностей, группы, оси | создать |
| `src/lib/schwartz/items.ts` | 30 утверждений: id, ценность, порядок показа | создать |
| `src/lib/schwartz/score.ts` | расчёт в целых суммах | создать |
| `src/lib/schwartz/circle.ts` | круг строкой SVG, раскладка подписей | создать |
| `src/lib/schwartz/index.ts` | публичный интерфейс модуля | создать |
| `src/lib/schwartz/{boundary,values,items,score,circle}.test.ts` | тесты модуля | создать |
| `src/lib/chatDraft.ts` + `.test.ts` | шаблон, обрезка, ссылка в чат с черновиком | создать |
| `src/lib/hdDraft.ts` | обёртка для Райи поверх `chatDraft` | изменить |
| `src/lib/valuesDraft.ts` + `.test.ts` | сообщение Оле, ссылка к Оле | создать |
| `src/lib/valuesProgress.ts` + `.test.ts` | прогресс в `sessionStorage`, переходы «ответ» и «назад» | создать |
| `src/lib/valuesRoute.ts` + `.test.ts` | адрес теста | создать |
| `scripts/values-test-languages.js` + `.d.ts` + `.test.mjs` | на каких языках выпущен тест | создать |
| `src/content/values/{types,texts.server,load,availability}.ts`, `texts/ru.ts`, `{texts,availability}.test.ts` | тексты и их загрузка | создать |
| `src/components/values/{ValuesQuestion,ValuesCircle,ValuesResult,ValuesTest}.tsx` | тест на странице | создать |
| `src/pages/ValuesTestPage.tsx` | страница | создать |
| `tests/values-test.spec.ts` | сырой HTML и браузер | создать |
| `src/main.tsx`, `src/entry-server.tsx`, `scripts/prerender.mjs` | вход в браузере, пререндер, `webvisor:false`, проверка бандла | изменить |
| `scripts/site-urls.mjs` + `.d.mts` + `.test.mjs`, `tests/i18n.spec.ts` | адрес и sitemap | изменить |
| `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts` | `define` языков теста | изменить |
| `src/components/layout/Footer.tsx`, `src/components/sections/Assistants.tsx`, `src/i18n/locales/*.json` | ссылки на тест | изменить |
| `src/content/assistants/pages/ru/olia.ts` | вторая кнопка наверху страницы Оли | изменить |
| `src/theme/paper.js` | перечень страниц на «бумаге» | изменить (комментарий) |

## Правила текстов

Действуют в Task 5 и при правках по СТОП 1. Механическую часть проверяет `src/content/values/texts.test.ts`; остальное — слепая разметка (Task 6) и ревью владельца.

1. **Самопознание, не диагностика.** Описываем ценность — какой она бывает у людей, — а не «ваш характер». Никаких оценок «хорошо/плохо», медицинских, финансовых и юридических советов.
2. **Голос** — как у страниц ассистентов: на «вы»; без превосходных степеней и эмодзи; эмпатию не называть словами. Поисковые формулировки («тест ценностей», «тест Шварца онлайн») — только в `title`, `description` и H1.
3. **Цена** — только «при регистрации 25 000 токенов в подарок» (тест ловит `₽`, «руб», `$`, `€`).
4. **Утверждения** — портреты без пола: начинаются с «Этот человек», «Этому человеку», «Для этого человека» или «Этого человека»; без «он/она/его/ему/сам/сама», без прошедшего времени и кратких прилагательных с родом («успешен», «согласен»). Длина 40–140 знаков, одна мысль, одно предложение. Не пересказ PVQ: свои образы и детали.
5. **Шварц и его теория** называются открыто; не писать, что тест «официальный», «валидированный» или «клинический».
6. **Описание ценности** — 150–420 знаков, 2–3 предложения, начинается с названия ценности; строка под названием — до 60 знаков, со строчной буквы.
7. **Оси.** Фразы результата — к посетителю («Вам ближе…»), 30–200 знаков. Фразы для сообщения — от первого лица: у оси `change` — с заглавной буквы, у оси `focus` — со строчной (в сообщении они идут через «; »).
8. **Длины страницы:** `title` до 70 знаков, `description` 100–180, вступление 2–4 абзаца, вопросов 4–6.
9. **FAQ** обязательно отвечает: сколько длится; научно ли это (теория Шварца, утверждения свои, не PVQ, не клиника); сохраняются ли ответы (нет: расчёт в браузере, вкладка); почему порядок, а не баллы; что делать с результатом (Оля).
10. **Оговорка** — «Тест для самопознания по мотивам теории базовых ценностей Шалома Шварца. Не клиническая и не официальная методика.» (тест проверяет «самопознани», «Шварц», «не клиническая»).

| Код | Название | В сообщении |
|---|---|---|
| selfDirection | Самостоятельность | самостоятельность |
| stimulation | Стимуляция | стимуляция |
| hedonism | Гедонизм | гедонизм |
| achievement | Достижение | достижение |
| power | Власть | власть |
| security | Безопасность | безопасность |
| conformity | Конформность | конформность |
| tradition | Традиция | традиция |
| benevolence | Доброта | доброта |
| universalism | Универсализм | универсализм |
| группы | openness — Открытость изменениям; selfEnhancement — Самоутверждение; conservation — Сохранение; selfTranscendence — Забота о других | |

---

### Task 1: Рабочая копия и прогон на ноде

**Files:** ничего в репозитории; служебные скрипты — в `~/Downloads/land_linkeon/.superpowers/values-test/` (каталог `.superpowers/` в `.gitignore` лендинга).

- [ ] **Step 1: Воркдерево**

```bash
git -C ~/Downloads/land_linkeon fetch -q origin
git -C ~/Downloads/land_linkeon worktree add .worktrees/values-test -b feat/values-test origin/main
git -C ~/Downloads/land_linkeon/.worktrees/values-test branch --unset-upstream
git -C ~/Downloads/land_linkeon/.worktrees/values-test log --oneline -1
```

Expected: последняя строка — коммит `origin/main` с этим планом или новее. `--unset-upstream` — чтобы случайный `git push` не ушёл в `main`. `node_modules` на маке нет и не нужен: всё запускается на ноде.

- [ ] **Step 2: Скрипты для ноды**

`~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh`:

```bash
#!/usr/bin/env bash
# Прогон на тестовой ноде на ТЕКУЩЕМ коммите воркдерева теста ценностей.
#   bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh 'pnpm test:unit'
# Код едет git push'ем прямо в CI-клон ноды (ветка tmp/values-test), не через
# GitHub и не rsync. Незакоммиченное на ноду не попадает — сначала commit.
set -euo pipefail
WT=~/Downloads/land_linkeon/.worktrees/values-test
NODE_WT=ci/wt/values-test
BRANCH=tmp/values-test
# Одно мастер-соединение: нода рвёт пачки новых ssh-подключений (MaxStartups).
SSH_OPTS="-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h"
GIT_SSH_COMMAND="ssh $SSH_OPTS" git -C "$WT" push -q -f "dv@85.192.61.231:ci/land_linkeon" "HEAD:refs/heads/$BRANCH"
SHA=$(git -C "$WT" rev-parse HEAD)
ssh $SSH_OPTS dv@85.192.61.231 "set -e
  [ -d ~/$NODE_WT ] || git -C ~/ci/land_linkeon worktree add -q --detach ~/$NODE_WT $SHA
  cd ~/$NODE_WT && git checkout -q --detach $SHA
  source ~/.nvm/nvm.sh
  (fuser -k 4173/tcp 2>/dev/null || true)
  pnpm install --frozen-lockfile > /tmp/values-install.log 2>&1 || (tail -20 /tmp/values-install.log; exit 1)
  echo \"== \$(git log --oneline -1)\"
  $1"
```

`~/Downloads/land_linkeon/.superpowers/values-test/node-ssh.sh`:

```bash
#!/usr/bin/env bash
# Произвольная команда на ноде через то же мастер-соединение.
#   bash ~/Downloads/land_linkeon/.superpowers/values-test/node-ssh.sh 'ls ~/ci/wt'
exec ssh -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231 "$1"
```

`fuser -k 4173/tcp` гасит забытый `pnpm preview`: Playwright без `CI=1` подхватил бы чужую сборку. Playwright ниже всегда идёт с `CI=1` — занятый порт тогда даёт ошибку, а не чужой `dist/`. Файлы с ноды — `scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231:<путь> <куда>`.

Журнал работы — `~/Downloads/land_linkeon/.superpowers/values-test/progress.md`: после каждой задачи строка «Task N — коммит, итог прогона».

- [ ] **Step 3: Точка отсчёта**

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(pnpm test:unit > /tmp/values-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED); grep -E "Test Files|Tests " /tmp/values-unit.log; (pnpm build > /tmp/values-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); ls -l dist/assets/index-*.js'
```

Expected: `UNIT_OK`, `BUILD_OK`. Число тестов и размер входного бандла (`index-*.js`) записать в журнал — с ними сравниваются Task 11 и Task 14.

---

### Task 2: Модуль — ценности, оси, утверждения

**Files:**
- Create: `src/lib/schwartz/values.ts`, `src/lib/schwartz/items.ts`, `src/lib/schwartz/index.ts`
- Test: `src/lib/schwartz/values.test.ts`, `src/lib/schwartz/items.test.ts`, `src/lib/schwartz/boundary.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/values-test`.

- [ ] **Step 1: Тесты**

`src/lib/schwartz/values.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { AXES, HIGHER_ORDER_KEYS, VALUE_GROUP, VALUE_KEYS, valuesOf } from './index';

describe('ценности Шварца', () => {
  it('десять, в порядке круга', () => {
    expect(VALUE_KEYS).toEqual([
      'selfDirection', 'stimulation', 'hedonism', 'achievement', 'power',
      'security', 'conformity', 'tradition', 'benevolence', 'universalism',
    ]);
  });

  it('группы высшего порядка; гедонизм — ни в одной', () => {
    expect(valuesOf('openness')).toEqual(['selfDirection', 'stimulation']);
    expect(valuesOf('selfEnhancement')).toEqual(['achievement', 'power']);
    expect(valuesOf('conservation')).toEqual(['security', 'conformity', 'tradition']);
    expect(valuesOf('selfTranscendence')).toEqual(['benevolence', 'universalism']);
    expect(VALUE_GROUP.hedonism).toBeNull();
  });

  // Круг держится на соседстве: ценности одной группы стоят подряд, иначе
  // дуга группы на рисунке разорвалась бы.
  it('ценности одной группы на круге идут подряд', () => {
    for (const group of HIGHER_ORDER_KEYS) {
      const at = valuesOf(group).map((k) => VALUE_KEYS.indexOf(k));
      expect(at[at.length - 1] - at[0], group).toBe(at.length - 1);
    }
  });

  it('оси противопоставляют противоположные группы', () => {
    expect(AXES.change).toEqual({ left: 'openness', right: 'conservation' });
    expect(AXES.focus).toEqual({ left: 'selfTranscendence', right: 'selfEnhancement' });
  });
});
```

`src/lib/schwartz/items.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ITEMS, ITEM_IDS, VALUE_KEYS } from './index';

describe('утверждения теста', () => {
  it('30 штук, по три на каждую ценность', () => {
    expect(ITEMS).toHaveLength(30);
    for (const key of VALUE_KEYS) expect(ITEMS.filter((i) => i.value === key), key).toHaveLength(3);
  });

  it('id — ценность и номер 1–3, без повторов; ITEM_IDS — тот же порядок', () => {
    expect(new Set(ITEM_IDS).size).toBe(30);
    for (const item of ITEMS) expect(item.id).toMatch(new RegExp(`^${item.value}[123]$`));
    expect(ITEMS.map((i) => i.id)).toEqual([...ITEM_IDS]);
  });

  it('двух утверждений одной ценности подряд нет', () => {
    for (let i = 1; i < ITEMS.length; i += 1) {
      expect(ITEMS[i].value, `${ITEMS[i - 1].id} → ${ITEMS[i].id}`).not.toBe(ITEMS[i - 1].value);
    }
  });

  it('в каждой десятке — все ценности по разу', () => {
    for (let round = 0; round < 3; round += 1) {
      const values = ITEMS.slice(round * 10, round * 10 + 10).map((i) => i.value);
      expect([...values].sort(), `десятка ${round + 1}`).toEqual([...VALUE_KEYS].sort());
    }
  });
});
```

`src/lib/schwartz/boundary.test.ts`:

```ts
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import ts from 'typescript';

/**
 * Граница модуля: чистый TypeScript — без браузерных API, React и импортов
 * из лендинга; только соседние файлы. Приём — как в human-design/boundary.test.ts:
 * комментарии вырезает TypeScript (removeComments), строки он не трогает,
 * поэтому `//` внутри строки не прячет код за собой.
 */
const FORBIDDEN =
  /\b(window|document|self|globalThis|process|require|localStorage|sessionStorage|navigator|fetch|React)\b|import\.meta/;

function stripComments(src: string): string {
  return ts.transpileModule(src, {
    compilerOptions: { removeComments: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  }).outputText;
}

const findForbidden = (src: string) => stripComments(src).match(FORBIDDEN);

const dir = new URL('./', import.meta.url);
const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  .map((f) => ({ file: f, code: readFileSync(new URL(f, dir), 'utf8') }));

describe('граница модуля schwartz', () => {
  it('файлы на месте', () => {
    expect(sources.map((s) => s.file)).toContain('index.ts');
  });

  it('без браузерных API и React', () => {
    for (const { file, code } of sources) expect(findForbidden(code), file).toBeNull();
  });

  it('импорты — только свои файлы', () => {
    for (const { file, code } of sources) {
      const { importedFiles } = ts.preProcessFile(code, true, true);
      for (const { fileName: spec } of importedFiles) expect(/^\.\/[\w-]+$/.test(spec), `${file}: ${spec}`).toBe(true);
      expect(stripComments(code), `${file}: динамический импорт`).not.toMatch(/\bimport\(/);
    }
  });

  it('детектор не слепой к строке с «//»', () => {
    const sample = 'const base = "https://example.com"; window.alert(1);';
    expect(findForbidden(sample)).not.toBeNull();
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/schwartz/values.test.ts src/lib/schwartz/items.test.ts src/lib/schwartz/boundary.test.ts
git commit -q -m "test(values): ценности, оси и утверждения теста — порядок круга, группы, по три на ценность (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/schwartz > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests |Failed to|Cannot find" /tmp/values-t.log | head'
```

Expected: `exit 1`, `Failed to resolve import "./index"` (или `Cannot find module`) в `values.test.ts` и `items.test.ts`; `boundary.test.ts` падает на «файлы на месте».

- [ ] **Step 3: Реализация**

`src/lib/schwartz/values.ts`:

```ts
/**
 * Десять базовых ценностей Шварца в порядке круга и их группы высшего
 * порядка. Порядок массива — порядок секторов на рисунке и правило ничьей
 * при расчёте (score.ts).
 */
export const VALUE_KEYS = [
  'selfDirection',
  'stimulation',
  'hedonism',
  'achievement',
  'power',
  'security',
  'conformity',
  'tradition',
  'benevolence',
  'universalism',
] as const;
export type ValueKey = (typeof VALUE_KEYS)[number];

export const HIGHER_ORDER_KEYS = ['openness', 'selfEnhancement', 'conservation', 'selfTranscendence'] as const;
export type HigherOrderKey = (typeof HIGHER_ORDER_KEYS)[number];

/** Гедонизм у Шварца стоит на границе открытости и самоутверждения — ни в одной группе. */
export const VALUE_GROUP: Record<ValueKey, HigherOrderKey | null> = {
  selfDirection: 'openness',
  stimulation: 'openness',
  hedonism: null,
  achievement: 'selfEnhancement',
  power: 'selfEnhancement',
  security: 'conservation',
  conformity: 'conservation',
  tradition: 'conservation',
  benevolence: 'selfTranscendence',
  universalism: 'selfTranscendence',
};

export const AXIS_KEYS = ['change', 'focus'] as const;
export type AxisKey = (typeof AXIS_KEYS)[number];
export type AxisLean = 'left' | 'right' | 'balance';

/** Две оси модели: левая группа против правой. */
export const AXES: Record<AxisKey, { left: HigherOrderKey; right: HigherOrderKey }> = {
  change: { left: 'openness', right: 'conservation' },
  focus: { left: 'selfTranscendence', right: 'selfEnhancement' },
};

export const valuesOf = (group: HigherOrderKey): ValueKey[] => VALUE_KEYS.filter((k) => VALUE_GROUP[k] === group);
```

`src/lib/schwartz/items.ts`:

```ts
import type { ValueKey } from './values';

export type ItemId = `${ValueKey}${1 | 2 | 3}`;
export interface Item {
  id: ItemId;
  value: ValueKey;
}

/**
 * 30 утверждений в порядке показа — одинаковом для всех. Три десятки: в
 * каждой все ценности по разу, на стыках десяток — разные, поэтому двух
 * утверждений одной ценности подряд нет (items.test.ts). Тексты — в
 * src/content/values/texts/<код>.ts по тем же id. Поменялся порядок —
 * поднять версию ключа прогресса (src/lib/valuesProgress.ts).
 */
export const ITEM_IDS: readonly ItemId[] = [
  'selfDirection1', 'power1', 'benevolence1', 'stimulation1', 'security1',
  'achievement1', 'universalism1', 'tradition1', 'hedonism1', 'conformity1',
  'achievement2', 'universalism2', 'selfDirection2', 'conformity2', 'stimulation2',
  'tradition2', 'power2', 'hedonism2', 'security2', 'benevolence2',
  'tradition3', 'stimulation3', 'power3', 'universalism3', 'hedonism3',
  'benevolence3', 'conformity3', 'selfDirection3', 'achievement3', 'security3',
];

export const ITEMS: readonly Item[] = ITEM_IDS.map((id) => ({ id, value: id.slice(0, -1) as ValueKey }));
```

`src/lib/schwartz/index.ts`:

```ts
/**
 * Тест ценностей по Шварцу — публичный интерфейс модуля. Страница, черновик
 * Оле и тексты опираются только на него. Модуль — чистый TypeScript без
 * браузерных API (boundary.test.ts).
 */
export { AXES, AXIS_KEYS, HIGHER_ORDER_KEYS, VALUE_GROUP, VALUE_KEYS, valuesOf } from './values';
export type { AxisKey, AxisLean, HigherOrderKey, ValueKey } from './values';
export { ITEMS, ITEM_IDS } from './items';
export type { Item, ItemId } from './items';
```

- [ ] **Step 4: Зелёный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/schwartz/values.ts src/lib/schwartz/items.ts src/lib/schwartz/index.ts
git commit -q -m "feat(values): ценности Шварца, оси и порядок 30 утверждений

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/schwartz > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/values-t.log'
```

Expected: `exit 0`, `Test Files  3 passed`.

---

### Task 3: Модуль — расчёт

**Files:**
- Create: `src/lib/schwartz/score.ts`
- Modify: `src/lib/schwartz/index.ts`
- Test: `src/lib/schwartz/score.test.ts`

- [ ] **Step 1: Тест**

`src/lib/schwartz/score.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ITEMS, VALUE_KEYS, scoreAnswers, type ItemId, type ValueKey } from './index';

/** Ответы по ценностям: утверждению — число его ценности, остальным — rest. */
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

/** Поправить ответы на отдельные утверждения. */
const withItems = (answers: number[], items: Partial<Record<ItemId, number>>): number[] =>
  ITEMS.map((item, i) => items[item.id] ?? answers[i]);

describe('расчёт теста ценностей', () => {
  it('ответы проверяются: 30 целых от 1 до 6', () => {
    expect(() => scoreAnswers([])).toThrow(RangeError);
    expect(() => scoreAnswers(by({}).slice(1))).toThrow(RangeError);
    expect(() => scoreAnswers(by({}, 0))).toThrow(RangeError);
    expect(() => scoreAnswers(by({}, 7))).toThrow(RangeError);
    expect(() => scoreAnswers(by({ power: 2.5 }))).toThrow(RangeError);
  });

  it('ручной пример: балл — среднее ценности минус личное среднее', () => {
    // 3 ценности × 3 × 6 = 54, власть 3 × 1 = 3, шесть ценностей × 3 × 3 = 54:
    // всего 111, личное среднее 3,7.
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));
    expect(r.scores.selfDirection).toBeCloseTo(2.3, 10);
    expect(r.scores.power).toBeCloseTo(-2.7, 10);
    expect(r.scores.security).toBeCloseTo(-0.7, 10);
    expect(r.top).toEqual(['selfDirection', 'stimulation', 'benevolence']);
    expect(r.bottom).toBe('power');
    expect(r.flat).toBe(false);
    // открытость (6+6)/2 против сохранения (3+3+3)/3; забота (6+3)/2 против самоутверждения (3+1)/2
    expect(r.axes.change).toEqual({ lean: 'left', diff: 3 });
    expect(r.axes.focus).toEqual({ lean: 'left', diff: 2.5 });
  });

  it('баллы в сумме — ноль: это отклонения от личного среднего', () => {
    const r = scoreAnswers(by({ selfDirection: 5, universalism: 4, power: 1 }, 2));
    expect(VALUE_KEYS.reduce((s, k) => s + r.scores[k], 0)).toBeCloseTo(0, 10);
  });

  it('манера отвечать не меняет порядок: +1 ко всем ответам', () => {
    const base = by({ selfDirection: 5, universalism: 4, power: 1, tradition: 3 }, 2);
    const a = scoreAnswers(base);
    const b = scoreAnswers(base.map((x) => x + 1));
    expect(b.ranking).toEqual(a.ranking);
    expect(b.top).toEqual(a.top);
    expect(b.bottom).toBe(a.bottom);
    expect(b.axes).toEqual(a.axes);
    for (const k of VALUE_KEYS) expect(b.scores[k]).toBeCloseTo(a.scores[k], 10);
  });

  it('ничья решается порядком круга — и наверху, и внизу', () => {
    const r = scoreAnswers(by({ tradition: 5, benevolence: 5, security: 5 }));
    expect(r.top).toEqual(['security', 'tradition', 'benevolence']);
    expect(r.ranking).toEqual([
      'security', 'tradition', 'benevolence',
      'selfDirection', 'stimulation', 'hedonism', 'achievement', 'power', 'conformity', 'universalism',
    ]);
    expect(r.bottom).toBe('universalism');
  });

  it('одинаковые ответы — приоритеты не выделились', () => {
    const r = scoreAnswers(by({}, 4));
    expect(r.flat).toBe(true);
    expect(r.top).toEqual([]);
    expect(r.bottom).toBeNull();
    expect(r.axes.change.lean).toBe('balance');
    expect(r.axes.focus.lean).toBe('balance');
    expect(r.ranking).toEqual([...VALUE_KEYS]);
  });

  it('граница «не выделились»: разброс в одну единицу ответа — ещё ровно, в две — уже нет', () => {
    const one = scoreAnswers(withItems(by({}, 4), { selfDirection1: 5 }));
    expect(one.flat).toBe(true);
    expect(one.axes.change.lean).toBe('balance');
    const two = scoreAnswers(withItems(by({}, 4), { selfDirection1: 5, selfDirection2: 5 }));
    expect(two.flat).toBe(false);
    expect(two.top[0]).toBe('selfDirection');
  });

  it('ось: разница меньше 0,5 — равновесие, ровно 0,5 — уже сторона', () => {
    // самостоятельность 4+4+3: открытость (11+9)/6, сохранение 27/9 — разница 1/3
    const below = scoreAnswers(withItems(by({}), { selfDirection1: 4, selfDirection2: 4 }));
    expect(below.axes.change.lean).toBe('balance');
    // 4+4+4: разница ровно 0,5
    const at = scoreAnswers(withItems(by({}), { selfDirection1: 4, selfDirection2: 4, selfDirection3: 4 }));
    expect(at.axes.change).toEqual({ lean: 'left', diff: 0.5 });
    const right = scoreAnswers(by({ security: 6, tradition: 6 }));
    expect(right.axes.change.lean).toBe('right');
  });

  it('персоны', () => {
    const open = scoreAnswers(by({ selfDirection: 6, stimulation: 6, security: 2, conformity: 2, tradition: 2 }, 4));
    expect(open.axes.change.lean).toBe('left');
    expect(open.top.slice(0, 2)).toEqual(['selfDirection', 'stimulation']);

    const keep = scoreAnswers(by({ security: 6, conformity: 6, tradition: 6, selfDirection: 2, stimulation: 2 }, 4));
    expect(keep.axes.change.lean).toBe('right');
    expect(keep.top).toEqual(['security', 'conformity', 'tradition']);

    const care = scoreAnswers(by({ benevolence: 6, universalism: 6, achievement: 2, power: 2 }, 4));
    expect(care.axes.focus.lean).toBe('left');
    expect(care.top.slice(0, 2)).toEqual(['benevolence', 'universalism']);
    expect(care.bottom).toBe('power');

    const ambition = scoreAnswers(by({ achievement: 6, power: 6, benevolence: 2, universalism: 2 }, 4));
    expect(ambition.axes.focus.lean).toBe('right');
    expect(ambition.top.slice(0, 2)).toEqual(['achievement', 'power']);
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/schwartz/score.test.ts
git commit -q -m "test(values): расчёт — личное среднее, ничьи, пороги 0,5, персоны (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/schwartz/score.test.ts > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests |scoreAnswers" /tmp/values-t.log | head'
```

Expected: `exit 1`, `scoreAnswers is not a function` (или `does not provide an export named 'scoreAnswers'`).

- [ ] **Step 3: Реализация**

`src/lib/schwartz/score.ts`:

```ts
import { ITEMS } from './items';
import { AXES, AXIS_KEYS, VALUE_KEYS, valuesOf, type AxisKey, type AxisLean, type ValueKey } from './values';

export const ANSWER_MIN = 1;
export const ANSWER_MAX = 6;
/** Разница групп меньше этого — «в равновесии». В единицах шкалы ответов. */
export const BALANCE_THRESHOLD = 0.5;
/** Разброс баллов ценностей меньше этого — приоритеты не выделились. */
export const FLAT_THRESHOLD = 0.5;
const PER_VALUE = 3;

export interface AxisResult {
  lean: AxisLean;
  /** Средний балл левой группы минус правой. */
  diff: number;
}

export interface ValuesResult {
  /** Балл ценности: среднее её ответов минус личное среднее по всем ответам. */
  scores: Record<ValueKey, number>;
  /** Все десять по убыванию балла; равные — в порядке круга. */
  ranking: ValueKey[];
  /** Приоритеты не выделились: ответы почти одинаковые. */
  flat: boolean;
  /** Три ведущие; пусто, если приоритеты не выделились. */
  top: ValueKey[];
  /** Наименее важная; null, если приоритеты не выделились. */
  bottom: ValueKey | null;
  axes: Record<AxisKey, AxisResult>;
}

/**
 * Расчёт по Шварцу с поправкой на манеру отвечать: балл ценности — среднее её
 * трёх ответов минус личное среднее. Сравнения идут в целых суммах ответов,
 * а не в средних с плавающей точкой: пороги 0,5 сравниваются точно, и ответ
 * ровно на границе не уезжает в другую сторону из-за 0,49999.
 */
export function scoreAnswers(answers: readonly number[]): ValuesResult {
  if (
    answers.length !== ITEMS.length ||
    answers.some((a) => !Number.isInteger(a) || a < ANSWER_MIN || a > ANSWER_MAX)
  ) {
    throw new RangeError(`тест ценностей: нужно ${ITEMS.length} ответов от ${ANSWER_MIN} до ${ANSWER_MAX}`);
  }
  const sums = Object.fromEntries(VALUE_KEYS.map((k) => [k, 0])) as Record<ValueKey, number>;
  ITEMS.forEach((item, i) => {
    sums[item.value] += answers[i];
  });
  const mean = answers.reduce((s, a) => s + a, 0) / answers.length;
  const scores = Object.fromEntries(VALUE_KEYS.map((k) => [k, sums[k] / PER_VALUE - mean])) as Record<ValueKey, number>;
  const ranking = [...VALUE_KEYS].sort((a, b) => sums[b] - sums[a] || VALUE_KEYS.indexOf(a) - VALUE_KEYS.indexOf(b));
  const flat = sums[ranking[0]] - sums[ranking[ranking.length - 1]] < FLAT_THRESHOLD * PER_VALUE;
  const axes = Object.fromEntries(AXIS_KEYS.map((key) => [key, axis(key, sums)])) as Record<AxisKey, AxisResult>;
  return {
    scores,
    ranking,
    flat,
    top: flat ? [] : ranking.slice(0, 3),
    bottom: flat ? null : ranking[ranking.length - 1],
    axes,
  };
}

/**
 * diff = сумма_левых/(3·n_лев) − сумма_правых/(3·n_прав). Умноженная на
 * 3·n_лев·n_прав, она целая — с ней и сравнивается порог.
 */
function axis(key: AxisKey, sums: Record<ValueKey, number>): AxisResult {
  const left = valuesOf(AXES[key].left);
  const right = valuesOf(AXES[key].right);
  const leftSum = left.reduce((s, k) => s + sums[k], 0);
  const rightSum = right.reduce((s, k) => s + sums[k], 0);
  const scaled = leftSum * right.length - rightSum * left.length;
  const unit = PER_VALUE * left.length * right.length;
  const lean: AxisLean = Math.abs(scaled) < BALANCE_THRESHOLD * unit ? 'balance' : scaled > 0 ? 'left' : 'right';
  return { lean, diff: scaled / unit };
}
```

В `src/lib/schwartz/index.ts` дописать в конец:

```ts
export { ANSWER_MAX, ANSWER_MIN, BALANCE_THRESHOLD, FLAT_THRESHOLD, scoreAnswers } from './score';
export type { AxisResult, ValuesResult } from './score';
```

- [ ] **Step 4: Зелёный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/schwartz/score.ts src/lib/schwartz/index.ts
git commit -q -m "feat(values): расчёт теста — баллы от личного среднего, ведущие, оси, «приоритеты не выделились»

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/schwartz > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/values-t.log'
```

Expected: `exit 0`, `Test Files  4 passed`.

---

### Task 4: Модуль — круг строкой SVG

**Files:**
- Create: `src/lib/schwartz/circle.ts`
- Modify: `src/lib/schwartz/index.ts`
- Test: `src/lib/schwartz/circle.test.ts`

- [ ] **Step 1: Тест**

`src/lib/schwartz/circle.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ITEMS, VALUE_KEYS, renderValuesCircleSvg, scoreAnswers, type ValueKey } from './index';
import { CIRCLE, labelLayout, sectorRadius } from './circle';

const LABELS = Object.fromEntries(VALUE_KEYS.map((k) => [k, k])) as Record<ValueKey, string>;
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

/** Радиусы секторов в порядке круга: сектор — путь из центра. */
const sectorRadii = (svg: string) =>
  [...svg.matchAll(/<path d="M 260 210 L [\d.-]+ [\d.-]+ A ([\d.]+) /g)].map((m) => Number(m[1]));

describe('круг ценностей', () => {
  const result = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));

  it('самостоятельный SVG: пространство имён, 10 секторов, 10 подписей', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(sectorRadii(svg)).toHaveLength(10);
    expect((svg.match(/<text /g) ?? []).length).toBe(10);
  });

  it('длина сектора — балл: ведущие длиннее, наименее важная короче всех', () => {
    const radii = sectorRadii(renderValuesCircleSvg(result, LABELS));
    const at = (k: ValueKey) => radii[VALUE_KEYS.indexOf(k)];
    expect(at('selfDirection')).toBeGreaterThan(at('security'));
    expect(Math.min(...radii)).toBe(at('power'));
  });

  it('ведущие — жирной подписью, остальные — обычной', () => {
    const svg = renderValuesCircleSvg(result, LABELS);
    for (const k of VALUE_KEYS) {
      const weight = svg.match(new RegExp(`font-weight="(\\d+)"[^>]*>${k}</text>`))?.[1];
      expect(weight, k).toBe(result.top.includes(k) ? '700' : '400');
    }
  });

  it('шкала постоянная: балл зажат в ±2,5, ровный профиль — ровные сектора', () => {
    expect(sectorRadius(-10)).toBe(sectorRadius(-2.5));
    expect(sectorRadius(-2.5)).toBeCloseTo(CIRCLE.radius * 0.25, 10);
    expect(sectorRadius(2.5)).toBeCloseTo(CIRCLE.radius, 10);
    expect(sectorRadius(0)).toBeGreaterThan(sectorRadius(-1));
    const flat = sectorRadii(renderValuesCircleSvg(scoreAnswers(by({}, 4)), LABELS));
    expect(new Set(flat).size).toBe(1);
  });

  it('подписи экранируются: текст из файла не ломает разметку', () => {
    const svg = renderValuesCircleSvg(result, { ...LABELS, power: 'A & <b>"' });
    expect(svg).toContain('A &amp; &lt;b&gt;&quot;');
    expect(svg).not.toContain('<b>');
  });

  it('подписи справа — от начала строки, слева — до её конца', () => {
    expect(labelLayout(VALUE_KEYS.indexOf('hedonism')).anchor).toBe('start');
    expect(labelLayout(VALUE_KEYS.indexOf('tradition')).anchor).toBe('end');
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/schwartz/circle.test.ts
git commit -q -m "test(values): круг ценностей строкой SVG — сектора по баллу, постоянная шкала, экранирование (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/schwartz/circle.test.ts > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Failed to resolve" /tmp/values-t.log | head -3'
```

Expected: `exit 1`, `Failed to resolve import "./circle"`.

- [ ] **Step 3: Реализация**

`src/lib/schwartz/circle.ts`:

```ts
import type { ValuesResult } from './score';
import { VALUE_GROUP, VALUE_KEYS, type HigherOrderKey, type ValueKey } from './values';

/**
 * Геометрия рисунка. Ширина с запасом под подписи слева и справа: самая
 * длинная («Самостоятельность») стоит справа вверху; проверка, что русские
 * подписи помещаются, — в src/content/values/texts.test.ts.
 */
export const CIRCLE = { width: 520, height: 420, cx: 260, cy: 210, radius: 115, labelRadius: 133, fontSize: 16 } as const;

/** Балл зажимается в ±CIRCLE_CLAMP: шкала постоянная, ровный профиль выглядит ровным. */
export const CIRCLE_CLAMP = 2.5;
/** Доля радиуса у сектора с баллом −CIRCLE_CLAMP. */
const INNER = 0.25;
const SECTOR = 360 / VALUE_KEYS.length;
/** Зазор между секторами, градусы. */
const GAP = 1;

export const GROUP_COLORS: Record<HigherOrderKey, string> = {
  openness: '#b45309',
  selfEnhancement: '#be123c',
  conservation: '#1d4ed8',
  selfTranscendence: '#047857',
};
const NEUTRAL = '#78716c';
const MUTED = '#a8a29e';

export function sectorRadius(score: number): number {
  const s = Math.max(-CIRCLE_CLAMP, Math.min(CIRCLE_CLAMP, score));
  return CIRCLE.radius * (INNER + ((1 - INNER) * (s + CIRCLE_CLAMP)) / (2 * CIRCLE_CLAMP));
}

const rad = (deg: number) => (deg * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const point = (r: number, deg: number) =>
  `${r2(CIRCLE.cx + r * Math.cos(rad(deg)))} ${r2(CIRCLE.cy + r * Math.sin(rad(deg)))}`;
/** Сектор i начинается сверху и идёт по часовой стрелке. */
const startAngle = (i: number) => -90 + SECTOR * i;

export function labelLayout(i: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } {
  const deg = startAngle(i) + SECTOR / 2;
  const cos = Math.cos(rad(deg));
  return {
    x: r2(CIRCLE.cx + CIRCLE.labelRadius * cos),
    y: r2(CIRCLE.cy + CIRCLE.labelRadius * Math.sin(rad(deg))),
    anchor: cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle',
  };
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Круг ценностей строкой SVG — для <img src="data:…">: Вебвизор пишет
 * атрибуты разметки даже внутри ym-hide-content, а src картинки маскирует
 * целиком. Длина сектора — балл ценности на постоянной шкале; пунктир —
 * личное среднее. Ведущие — ярче и жирной подписью, наименее важная —
 * серым. По краю — дуги групп высшего порядка (у гедонизма дуги нет).
 */
export function renderValuesCircleSvg(result: ValuesResult, labels: Record<ValueKey, string>): string {
  const { cx, cy, radius, width, height, fontSize } = CIRCLE;
  const top = new Set(result.top);
  const parts = [
    `<circle cx="${cx}" cy="${cy}" r="${r2(sectorRadius(0))}" fill="none" stroke="#d6d3d1" stroke-dasharray="4 4"/>`,
  ];
  VALUE_KEYS.forEach((key, i) => {
    const a0 = startAngle(i) + GAP / 2;
    const a1 = startAngle(i + 1) - GAP / 2;
    const r = sectorRadius(result.scores[key]);
    const group = VALUE_GROUP[key];
    const color = key === result.bottom ? MUTED : group ? GROUP_COLORS[group] : NEUTRAL;
    const opacity = top.has(key) ? 0.9 : 0.45;
    parts.push(
      `<path d="M ${cx} ${cy} L ${point(r, a0)} A ${r2(r)} ${r2(r)} 0 0 1 ${point(r, a1)} Z" fill="${color}" fill-opacity="${opacity}"/>`,
    );
    if (group) {
      const rim = radius + 7;
      parts.push(
        `<path d="M ${point(rim, a0)} A ${rim} ${rim} 0 0 1 ${point(rim, a1)}" fill="none" stroke="${GROUP_COLORS[group]}" stroke-width="6"/>`,
      );
    }
    const { x, y, anchor } = labelLayout(i);
    const strong = top.has(key);
    parts.push(
      `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${fontSize}" font-weight="${strong ? 700 : 400}" fill="${strong ? '#1c1917' : '#44403c'}">${escapeXml(labels[key])}</text>`,
    );
  });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" ` +
    `font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif">${parts.join('')}</svg>`
  );
}
```

В `src/lib/schwartz/index.ts` дописать в конец:

```ts
export { CIRCLE_CLAMP, GROUP_COLORS, renderValuesCircleSvg } from './circle';
```

- [ ] **Step 4: Зелёный прогон всего модуля**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/schwartz/circle.ts src/lib/schwartz/index.ts
git commit -q -m "feat(values): круг ценностей строкой SVG для картинки

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/schwartz > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/values-t.log'
```

Expected: `exit 0`, `Test Files  5 passed` (values, items, boundary, score, circle).

---

### Task 5: Тексты теста целиком

**Files:**
- Create: `src/content/values/types.ts`, `src/content/values/texts/ru.ts`, `src/content/values/texts.server.ts`, `src/content/values/load.ts`, `src/content/values/availability.ts`
- Create: `scripts/values-test-languages.js`, `scripts/values-test-languages.d.ts`
- Modify: `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts`
- Test: `src/content/values/texts.test.ts`, `src/content/values/availability.test.ts`, `scripts/values-test-languages.test.mjs`

- [ ] **Step 1: Тесты**

`src/content/values/texts.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { VALUES_TEXTS } from './texts.server';
import { AXIS_KEYS, HIGHER_ORDER_KEYS, ITEM_IDS, VALUE_KEYS, type AxisLean } from '../../lib/schwartz';
import { CIRCLE, labelLayout } from '../../lib/schwartz/circle';

/**
 * Механическая часть «Правил текстов» плана теста ценностей. Смысл, тон и
 * точность утверждений — слепая разметка (Task 6) и ревью владельца; здесь
 * то, что ломается молча: пропавший ключ, пустое поле, опечатка в шаблоне,
 * цена, эмодзи, род в утверждении, подпись, вылезающая за рисунок.
 */
const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
const EMOJI = /\p{Extended_Pictographic}/u;
const PRICE = /₽|руб\.|рубл|\$|€/;
// \b в JS не видит кириллицу — границы слова через \p{L}.
const GENDERED = /(?<!\p{L})(он|она|его|ему|него|нему|сам|сама|самому|самой)(?!\p{L})/iu;
const PORTRAIT = /^(Этот человек|Этому человеку|Для этого человека|Этого человека) /;
const LEANS: AxisLean[] = ['left', 'right', 'balance'];

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const keys = (o: object) => Object.keys(o).sort();
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('тексты теста ценностей', () => {
  it('русский — источник переводов — на месте', () => {
    expect(Object.keys(VALUES_TEXTS)).toContain('ru');
  });

  for (const [code, t] of Object.entries(VALUES_TEXTS)) {
    describe(code, () => {
      it('у каждого утверждения, ценности, группы и оси есть текст', () => {
        expect(keys(t.statements)).toEqual([...ITEM_IDS].sort());
        expect(keys(t.values)).toEqual([...VALUE_KEYS].sort());
        expect(keys(t.higherOrder)).toEqual([...HIGHER_ORDER_KEYS].sort());
        for (const table of [t.axes, t.axesInMessage]) {
          expect(keys(table)).toEqual([...AXIS_KEYS].sort());
          for (const axis of AXIS_KEYS) expect(keys(table[axis])).toEqual([...LEANS].sort());
        }
        expect(t.question.scale).toHaveLength(6);
      });

      it('нет пустых строк и заготовок', () => {
        for (const s of strings(t)) {
          expect(s.trim().length).toBeGreaterThan(0);
          expect(s).not.toMatch(PLACEHOLDER);
        }
      });

      it('без эмодзи, без цен, без слова «агент»', () => {
        for (const s of strings(t)) {
          expect(s).not.toMatch(EMOJI);
          expect(s).not.toMatch(PRICE);
          expect(s).not.toMatch(/агент/i);
        }
      });

      it('метатеги, вступление, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(100);
        expect(t.description.length).toBeLessThanOrEqual(180);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('шаблоны: ключи на месте', () => {
        expect(placeholders(t.start.resume)).toEqual(['done', 'total']);
        expect(placeholders(t.question.progress)).toEqual(['n', 'total']);
        expect(placeholders(t.message)).toEqual(['axes', 'rest', 'top']);
        expect(placeholders(t.bottomInMessage)).toEqual(['bottom']);
        expect(placeholders(t.restEqualInMessage)).toEqual([]);
        expect(placeholders(t.messageFlat)).toEqual([]);
        expect(placeholders(t.result.tiedWith)).toEqual(['names']);
        expect(placeholders(t.tiedInMessage)).toEqual(['names']);
      });

      it('ценности: строка до 60 знаков со строчной, описание 150–420 с названием в начале', () => {
        for (const k of VALUE_KEYS) {
          const v = t.values[k];
          expect(v.line.length, k).toBeLessThanOrEqual(60);
          expect(v.line[0], k).toBe(v.line[0].toLowerCase());
          expect(v.text.length, k).toBeGreaterThanOrEqual(150);
          expect(v.text.length, k).toBeLessThanOrEqual(420);
          expect(v.text.startsWith(v.name), k).toBe(true);
          expect(v.inMessage, k).toBe(v.inMessage.toLowerCase());
        }
      });

      it('оси: фразы результата 30–200 знаков; в сообщении change — с заглавной, focus — со строчной', () => {
        for (const axis of AXIS_KEYS) {
          for (const lean of LEANS) {
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeGreaterThanOrEqual(30);
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeLessThanOrEqual(200);
          }
        }
        for (const lean of LEANS) {
          const change = t.axesInMessage.change[lean];
          const focus = t.axesInMessage.focus[lean];
          expect(change[0], lean).toBe(change[0].toUpperCase());
          expect(focus[0], lean).toBe(focus[0].toLowerCase());
          expect(change.endsWith('.') || focus.endsWith('.'), lean).toBe(false);
        }
      });

      it('оговорка: самопознание, Шварц, не клиническая методика', () => {
        expect(t.disclaimer).toMatch(/самопознани/i);
        expect(t.disclaimer).toMatch(/Шварц/);
        expect(t.disclaimer).toMatch(/не клиническ/i);
      });

      it('подписи круга помещаются в рисунок', () => {
        VALUE_KEYS.forEach((k, i) => {
          const { x, anchor } = labelLayout(i);
          // Ширина строки — с запасом: 0,62 кегля на знак, кириллица в системном шрифте уже.
          const w = t.values[k].name.length * 0.62 * CIRCLE.fontSize;
          const [from, to] = anchor === 'start' ? [x, x + w] : anchor === 'end' ? [x - w, x] : [x - w / 2, x + w / 2];
          expect(from, k).toBeGreaterThanOrEqual(4);
          expect(to, k).toBeLessThanOrEqual(CIRCLE.width - 4);
        });
      });
    });
  }

  // Правило 4 — о русском языке; у переводов свои правила рода.
  it('ru: утверждения — портреты без рода, 40–140 знаков, одно предложение', () => {
    const t = VALUES_TEXTS.ru;
    for (const id of ITEM_IDS) {
      const s = t.statements[id];
      expect(s, id).toMatch(PORTRAIT);
      expect(s, id).not.toMatch(GENDERED);
      expect(s.length, id).toBeGreaterThanOrEqual(40);
      expect(s.length, id).toBeLessThanOrEqual(140);
      expect((s.match(/[.!?](\s|$)/g) ?? []).length, id).toBe(1);
      expect(s.endsWith('.'), id).toBe(true);
    }
  });

  it('детектор рода не слепой к кириллице', () => {
    expect('Этому человеку важно, чтобы его ценили.').toMatch(GENDERED);
    expect('Этому человеку важна самостоятельность.').not.toMatch(GENDERED);
  });
});
```

`src/content/values/availability.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { hasValuesTest } from './availability';

// Проверяет не логику (она — один includes), а что define подставлен в
// vitest: без __VALUES_TEST_LANGUAGES__ этот файл не импортируется вовсе.
describe('доступность теста ценностей по языку', () => {
  it('русский выпущен', () => {
    expect(hasValuesTest('ru')).toBe(true);
  });

  it('несуществующий язык — нет', () => {
    expect(hasValuesTest('xx')).toBe(false);
  });
});
```

`scripts/values-test-languages.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { valuesTestCodes } from './values-test-languages.js';
import { translatedCodes } from './translated-languages.js';

describe('языки теста ценностей', () => {
  it('русский выпущен', () => {
    expect(valuesTestCodes()).toContain('ru');
  });

  it('только из выпущенных языков сайта', () => {
    const site = translatedCodes();
    for (const code of valuesTestCodes()) expect(site).toContain(code);
  });

  // Тесты выше проходят и на захардкоженном ['ru']. Здесь — временный каталог:
  // результат обязан быть пересечением «язык сайта» ∩ «есть файл текстов».
  it('язык теста — пересечение языков сайта и файлов текстов', () => {
    const other = translatedCodes().find((code) => code !== 'ru');
    const dir = mkdtempSync(join(tmpdir(), 'values-test-'));
    try {
      writeFileSync(join(dir, 'ru.ts'), '');
      writeFileSync(join(dir, `${other}.ts`), '');
      writeFileSync(join(dir, 'xx.ts'), '');
      expect(valuesTestCodes(dir).sort()).toEqual(['ru', other].sort());
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('без текстов на русском — громкая ошибка', () => {
    const other = translatedCodes().find((code) => code !== 'ru');
    const dir = mkdtempSync(join(tmpdir(), 'values-test-'));
    try {
      writeFileSync(join(dir, `${other}.ts`), '');
      expect(() => valuesTestCodes(dir)).toThrow();
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/content/values/texts.test.ts src/content/values/availability.test.ts scripts/values-test-languages.test.mjs
git commit -q -m "test(values): тексты теста — ключи, длины, род в утверждениях, подписи круга; языки теста (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/content/values scripts/values-test-languages.test.mjs > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Failed to resolve|Cannot find" /tmp/values-t.log | head -5'
```

Expected: `exit 1`, не находятся `./texts.server`, `./availability`, `./values-test-languages.js`.

- [ ] **Step 3: Языки теста и `define`**

`scripts/values-test-languages.js`:

```js
/**
 * На каких языках выпускается тест ценностей.
 *
 * Как у калькулятора Human Design (hd-calc-languages.js): язык выпущен у
 * сайта (непустая локаль) И у теста есть модуль текстов
 * src/content/values/texts/<код>.ts. Тексты на язык доехали — язык включился сам.
 *
 * Читают: vite.config.ts и vitest.config.ts (define для браузера),
 * scripts/prerender.mjs и тесты Playwright.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { translatedCodes } from './translated-languages.js';

const textsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'values', 'texts');

/** `dir` — только для тестов (временный каталог с файлами текстов); без аргумента — textsDir. */
export function valuesTestCodes(dir = textsDir) {
  const codes = translatedCodes().filter((code) => existsSync(join(dir, `${code}.ts`)));
  if (!codes.includes(DEFAULT_LANGUAGE)) {
    throw new Error(`нет src/content/values/texts/${DEFAULT_LANGUAGE}.ts — у теста ценностей нет языка-источника`);
  }
  return codes;
}
```

`scripts/values-test-languages.d.ts`:

```ts
export declare function valuesTestCodes(dir?: string): string[];
```

`vite.config.ts` — импорт под строкой `import { hdCalcCodes } from './scripts/hd-calc-languages.js';`:

```ts
import { valuesTestCodes } from './scripts/values-test-languages.js';
```

и в `define` после строки `__HD_CALC_LANGUAGES__: JSON.stringify(hdCalcCodes()),`:

```ts
    // Языки теста ценностей — так же, см. scripts/values-test-languages.js.
    __VALUES_TEST_LANGUAGES__: JSON.stringify(valuesTestCodes()),
```

`vitest.config.ts` — так же: импорт `import { valuesTestCodes } from './scripts/values-test-languages.js';` под импортом `hdCalcCodes` и строка `__VALUES_TEST_LANGUAGES__: JSON.stringify(valuesTestCodes()),` после `__HD_CALC_LANGUAGES__`.

`src/vite-env.d.ts` — в конец:

```ts

/**
 * Коды языков, на которых выпущен тест ценностей. Подставляется через
 * `define` — см. scripts/values-test-languages.js.
 */
declare const __VALUES_TEST_LANGUAGES__: string[];
```

- [ ] **Step 4: Типы, загрузка, доступность**

`src/content/values/types.ts`:

```ts
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
```

`src/content/values/texts.server.ts`:

```ts
import type { ValuesTexts } from './types';

/**
 * Тексты теста на всех языках сразу и синхронно — для пререндера и тестов
 * (как texts.server.ts калькулятора). В клиентский бандл не попадает: его
 * импортируют только src/entry-server.tsx и тесты.
 */
const modules = import.meta.glob<{ default: ValuesTexts }>('./texts/*.ts', { eager: true });

export const VALUES_TEXTS: Record<string, ValuesTexts> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace(/^.*\/(\w+)\.ts$/, '$1'), mod.default]),
);
```

`src/content/values/load.ts`:

```ts
import type { ValuesTexts } from './types';

/** Тексты теста для браузера — отдельный чанк на язык. */
const loaders = import.meta.glob<{ default: ValuesTexts }>('./texts/*.ts');

export async function loadValuesTexts(language: string): Promise<ValuesTexts | null> {
  const load = loaders[`./texts/${language}.ts`];
  return load ? (await load()).default : null;
}
```

`src/content/values/availability.ts`:

```ts
/**
 * Языки, на которых выпущен тест ценностей. Считается на сборке
 * (scripts/values-test-languages.js) и подставляется через define: браузер в
 * каталог texts/ заглянуть не может.
 */
export const VALUES_TEST_CODES: string[] = __VALUES_TEST_LANGUAGES__;

export const hasValuesTest = (language: string): boolean => VALUES_TEST_CODES.includes(language);
```

- [ ] **Step 5: Русские тексты**

`src/content/values/texts/ru.ts`:

```ts
import type { ValuesTexts } from '../types';

/**
 * Тест ценностей по-русски. Правила — раздел «Правила текстов» плана
 * docs/superpowers/plans/2026-10-12-values-test.md; механическая часть —
 * texts.test.ts. Утверждения свои, по мотивам теории Шварца, не пересказ PVQ;
 * отнесение к ценностям проверено слепой разметкой (Task 6 плана).
 */
const ru: ValuesTexts = {
  title: 'Тест ценностей Шварца онлайн бесплатно — карта ценностей | Linkeon',
  description:
    'Бесплатный тест ценностей по модели Шалома Шварца: 30 утверждений, около 5 минут. Круг из 10 ценностей, ваши ведущие ценности и разбор с Олей.',
  h1: 'Тест ценностей Шварца онлайн — бесплатно',
  breadcrumb: 'Тест ценностей',
  intro: [
    'Тридцать коротких описаний разных людей. Отметьте, насколько каждый из них похож на вас, — и увидите круг из десяти базовых ценностей: что для вас на первом месте, что дальше всего и где проходят главные внутренние напряжения.',
    'Тест построен по мотивам теории базовых ценностей социального психолога Шалома Шварца. Ответы остаются на вашем устройстве: расчёт идёт прямо в браузере, на сервер ничего не отправляется.',
    'Результат — не оценка и не диагноз, а отправная точка для разговора о себе. Продолжить его можно с Олей — ассистентом, который ведёт исследование ценностей.',
  ],
  start: {
    meta: '30 утверждений · около 5 минут · ответы остаются на вашем устройстве',
    begin: 'Начать',
    resume: 'Продолжить ({done} из {total})',
    restart: 'Начать заново',
  },
  question: {
    prompt: 'Насколько этот человек похож на вас?',
    progress: '{n} из {total}',
    back: 'Назад',
    scale: [
      'Совсем не похож на меня',
      'Не похож на меня',
      'Немного похож',
      'Отчасти похож',
      'Похож на меня',
      'Очень похож на меня',
    ],
  },
  statements: {
    selfDirection1: 'Этому человеку важна независимость: выбирать дорогу по-своему, без указаний сверху.',
    selfDirection2: 'Этот человек любит придумывать новое: идеи, решения, собственные способы делать привычные вещи.',
    selfDirection3: 'Для этого человека важно думать своей головой и приходить к собственным выводам.',
    stimulation1: 'Этот человек любит новые впечатления: незнакомые места, необычные занятия, неожиданные повороты.',
    stimulation2: 'Для этого человека жизнь без перемен и разнообразия быстро становится пресной.',
    stimulation3: 'Этого человека тянет туда, где исход заранее неизвестен: к смелым затеям и рискованным вызовам.',
    hedonism1: 'Этому человеку важно, чтобы в жизни было много приятного: вкусная еда, отдых, маленькие радости.',
    hedonism2: 'Этот человек легко позволяет себе приятное и не ищет для этого повода.',
    hedonism3: 'Для этого человека важно проводить время в удовольствие: отдыхать, наслаждаться, веселиться.',
    achievement1: 'Этому человеку важно расти в своём деле: ставить высокие цели и достигать их.',
    achievement2: 'Для этого человека важно, чтобы результаты работы замечали и ценили.',
    achievement3: 'Этот человек стремится оказаться в своём деле в числе лучших.',
    power1: 'Этому человеку нравится держать ситуацию в руках и распределять задачи между людьми.',
    power2: 'Для этого человека важен достаток, который показывает положение в обществе.',
    power3: 'Этому человеку важны высокий статус и авторитет, вес в глазах окружающих.',
    security1: 'Этот человек выбирает осторожность: лишний раз проверить, перестраховаться, не рисковать здоровьем.',
    security2: 'Этому человеку спокойнее, когда в обществе крепкий порядок и угрозы держат под контролем.',
    security3: 'Этому человеку важна стабильность: надёжная работа, запас на чёрный день, предсказуемое завтра.',
    conformity1: 'Для этого человека правила — не формальность: их соблюдают, нравятся они или нет.',
    conformity2: 'Этот человек старается не делать ничего, что расстроит или заденет окружающих.',
    conformity3: 'Этот человек следит, чтобы поведение не выходило за рамки принятого.',
    tradition1: 'Этому человеку важно отмечать праздники и соблюдать обычаи так, как это поколениями делали в семье.',
    tradition2: 'Для этого человека вера и её предписания — опора в повседневной жизни.',
    tradition3: 'Этот человек считает, что большие запросы ни к чему: лучше принимать жизнь такой, какая есть.',
    benevolence1: 'Этот человек сразу приходит на помощь, когда у близких что-то случилось.',
    benevolence2: 'Для этого человека верность друзьям и семье — то, чем не поступаются.',
    benevolence3: 'Этому человеку важно, чтобы в кругу близких было тепло и доверие, и ради этого можно уступить.',
    universalism1: 'Этого человека задевает несправедливость, даже когда страдают незнакомые люди на другом конце света.',
    universalism2: 'Этот человек старается меньше вредить природе: бережёт ресурсы, не мусорит, думает о последствиях.',
    universalism3: 'Для этого человека важно, чтобы в мире было место разным взглядам, культурам и образам жизни.',
  },
  values: {
    selfDirection: {
      name: 'Самостоятельность',
      inMessage: 'самостоятельность',
      line: 'свобода думать, выбирать и создавать своё',
      text: 'Самостоятельность — потребность думать своей головой, выбирать дорогу и создавать своё. Людям, для которых она на первых местах, тесно в жёстких рамках и чужих инструкциях: им важно понимать, зачем они что-то делают, и оставлять в деле собственный почерк.',
    },
    stimulation: {
      name: 'Стимуляция',
      inMessage: 'стимуляция',
      line: 'новизна, азарт и перемены',
      text: 'Стимуляция — тяга к новизне, азарту и переменам. Когда она важна, человек ищет новые места, занятия и задачи, легко загорается и быстро устаёт от рутины. Спокойная и предсказуемая жизнь в таком случае кажется пресной.',
    },
    hedonism: {
      name: 'Гедонизм',
      inMessage: 'гедонизм',
      line: 'удовольствие и радость от жизни',
      text: 'Гедонизм — ценность удовольствия и радости здесь и сейчас. Для тех, кому он важен, жизнь — не только задачи и долг: вкусная еда, отдых, красивые вещи и приятная компания значат не меньше, чем дела.',
    },
    achievement: {
      name: 'Достижение',
      inMessage: 'достижение',
      line: 'успех и признание за умения',
      text: 'Достижение — стремление к успеху, который видят и признают другие. Люди с этой ценностью на первых местах ставят высокие цели, сравнивают себя с лучшими в своём деле и ценят, когда их умения замечают.',
    },
    power: {
      name: 'Власть',
      inMessage: 'власть',
      line: 'статус, влияние и ресурсы',
      text: 'Власть — ценность статуса, влияния и ресурсов. Тем, для кого она важна, хочется держать ситуацию под контролем, принимать решения и занимать положение, с которым считаются. Деньги и авторитет для них — способ влиять на происходящее.',
    },
    security: {
      name: 'Безопасность',
      inMessage: 'безопасность',
      line: 'стабильность, порядок и защищённость',
      text: 'Безопасность — потребность в стабильности и защищённости для себя, близких и общества. Когда она на первых местах, человек думает наперёд, ценит надёжность и порядок, избегает лишнего риска и строит запас прочности.',
    },
    conformity: {
      name: 'Конформность',
      inMessage: 'конформность',
      line: 'сдержанность и следование правилам',
      text: 'Конформность — сдержанность и следование правилам, принятым вокруг. Люди с этой ценностью стараются не задевать других, держат слово и соблюдают договорённости и нормы, даже когда хочется поступить иначе.',
    },
    tradition: {
      name: 'Традиция',
      inMessage: 'традиция',
      line: 'уважение к обычаям, вере и корням',
      text: 'Традиция — уважение к обычаям, вере и корням, принятым в семье и культуре. Для тех, кому она важна, опора — в проверенном поколениями: праздники, обряды, скромность и умение принимать жизнь такой, какая она есть.',
    },
    benevolence: {
      name: 'Доброта',
      inMessage: 'доброта',
      line: 'забота о близких и верность им',
      text: 'Доброта — забота о тех, кто рядом: семье, друзьях, коллегах. Люди с этой ценностью на первых местах надёжны, готовы помочь и уступить ради отношений; верность и доверие для них важнее собственной выгоды.',
    },
    universalism: {
      name: 'Универсализм',
      inMessage: 'универсализм',
      line: 'справедливость для всех и забота о мире',
      text: 'Универсализм — забота обо всех людях и о природе, а не только о своём круге. Тем, для кого он важен, близки справедливость, равенство, терпимость к другим взглядам и бережное отношение к миру.',
    },
  },
  higherOrder: {
    openness: 'Открытость изменениям',
    selfEnhancement: 'Самоутверждение',
    conservation: 'Сохранение',
    selfTranscendence: 'Забота о других',
  },
  axes: {
    change: {
      left: 'Вам ближе открытость переменам — самостоятельность и новизна, — чем сохранение привычного порядка.',
      right: 'Вам ближе сохранение привычного — безопасность, правила и традиции, — чем открытость переменам.',
      balance: 'Открытость переменам и сохранение привычного у вас в равновесии: ни одна сторона заметно не перевешивает.',
    },
    focus: {
      left: 'Забота о других — близких и мире вокруг — для вас важнее личного успеха и влияния.',
      right: 'Личный успех и влияние для вас важнее заботы о других и о мире вокруг.',
      balance: 'Забота о других и личный успех у вас в равновесии.',
    },
  },
  axesInMessage: {
    change: {
      left: 'Мне ближе перемены, чем сохранение привычного',
      right: 'Мне ближе сохранение привычного, чем перемены',
      balance: 'Перемены и сохранение привычного у меня в равновесии',
    },
    focus: {
      left: 'забота о других для меня важнее личного успеха',
      right: 'личный успех для меня важнее заботы о других',
      balance: 'забота о других и личный успех у меня в равновесии',
    },
  },
  result: {
    heading: 'Ваш круг ценностей',
    circleAlt: 'Круг ценностей',
    legend: 'Группы ценностей',
    topHeading: 'Ведущие ценности',
    bottomHeading: 'Наименее важная',
    axesHeading: 'Главные напряжения',
    flatHeading: 'Приоритеты не выделились',
    flatText:
      'Вы оценили почти все утверждения одинаково, поэтому ведущие ценности назвать нельзя. Попробуйте пройти тест ещё раз, сравнивая описания между собой, — или разберитесь с Олей, что для вас по-настоящему важно.',
    cta: 'Разобрать с Олей',
    ctaNote: 'Личный разбор ценностей — у Оли, при регистрации 25 000 токенов в подарок',
    allHeading: 'Все 10 ценностей — в вашем порядке',
    restart: 'Пройти заново',
    tiedWith: 'С тем же результатом: {names}',
    topHeadingOne: 'Ведущая ценность',
    restEqual: 'Остальные ценности набрали поровну, поэтому наименее важную назвать нельзя.',
  },
  modelSection: {
    heading: 'Десять ценностей по Шварцу',
    lead: 'Шварц описал десять ценностей, которые встречаются в разных культурах по всему миру. Они стоят по кругу: соседние легко уживаются, противоположные тянут в разные стороны — например, тяга к новому и желание сохранить привычное.',
  },
  faqHeading: 'Вопросы о тесте',
  faq: [
    {
      q: 'Сколько времени занимает тест?',
      a: 'Около пяти минут: 30 утверждений, на каждое — один ответ по шкале из шести вариантов. Пока вкладка открыта, ответы хранятся в ней, так что случайная перезагрузка не обнулит прогресс.',
    },
    {
      q: 'Это научный тест?',
      a: 'В основе — теория базовых ценностей Шалома Шварца, одна из широко изученных моделей ценностей в психологии. Утверждения мы написали сами по мотивам этой теории: это не официальный опросник PVQ и не клиническая методика, а инструмент для самопознания.',
    },
    {
      q: 'Сохраняются ли мои ответы?',
      a: 'Нет. Расчёт идёт в браузере, ответы не уходят на сервер и не попадают в аналитику. Хранятся они только в этой вкладке — чтобы не пропасть при случайной перезагрузке.',
    },
    {
      q: 'Почему результат — порядок ценностей, а не баллы?',
      a: 'По Шварцу важны не сами оценки, а то, какие ценности перевешивают другие. Поэтому тест учитывает вашу манеру отвечать: если вы всем утверждениям ставите высокие оценки, круг всё равно покажет, что из этого важнее.',
    },
    {
      q: 'Что делать с результатом?',
      a: 'Посмотрите на ведущие ценности и главные напряжения: где решения, время и деньги совпадают с тем, что для вас важно, а где нет. Подробно разобрать это можно с Олей — она ведёт исследование ценностей в разговоре и собирает личную карту ценностей.',
    },
  ],
  disclaimer:
    'Тест для самопознания по мотивам теории базовых ценностей Шалома Шварца. Не клиническая и не официальная методика.',
  and: 'и',
  tiedInMessage: '(с тем же результатом — {names})',
  bottomInMessage: 'на последнем — {bottom}',
  restEqualInMessage: 'остальные — поровну',
  message:
    'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — {top}, {rest}. {axes}. Помоги разобраться, что это значит для меня',
  messageFlat:
    'Оля, привет! В тесте ценностей по Шварцу у меня не выделились приоритеты: всё оценено почти одинаково. Помоги разобраться, что для меня по-настоящему важно',
};

export default ru;
```

- [ ] **Step 6: Зелёный прогон и типы**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add scripts/values-test-languages.js scripts/values-test-languages.d.ts vite.config.ts vitest.config.ts src/vite-env.d.ts src/content/values/types.ts src/content/values/texts.server.ts src/content/values/load.ts src/content/values/availability.ts src/content/values/texts/ru.ts
git commit -q -m "feat(values): тексты теста ценностей по-русски, языки теста и их загрузка

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/content/values src/lib/schwartz scripts/values-test-languages.test.mjs > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests |FAIL|AssertionError" /tmp/values-t.log | head -20; (pnpm typecheck > /tmp/values-tsc.log 2>&1 && echo TSC_OK || (echo TSC_FAILED; grep "error TS" /tmp/values-tsc.log | head))'
```

Expected: `exit 0`, все файлы зелёные; `TSC_OK`. Если красное правило текстов — править текст по «Правилам текстов», а не ослаблять тест.

---

### Task 6: Слепая разметка, сверка с PVQ и СТОП 1

**Files:** в репозитории — только правки `src/content/values/texts/ru.ts` по итогам. Служебное — в `~/Downloads/land_linkeon/.superpowers/values-test/`.

- [ ] **Step 1: Выгрузка текстов**

`~/Downloads/land_linkeon/.superpowers/values-test/dump-texts.ts` (на ноде кладётся в корень воркдерева как `values-dump.ts`, в репозиторий не попадает):

```ts
// Выгрузка текстов теста: файл на ревью владельцу и слепой список для
// разметки. Запуск на ноде из корня воркдерева: ./node_modules/.bin/tsx values-dump.ts
import { writeFileSync } from 'node:fs';
import ru from './src/content/values/texts/ru';
import { AXIS_KEYS, ITEMS, VALUE_KEYS } from './src/lib/schwartz';

// Перемешивание с постоянным зерном: повторный запуск даёт тот же список.
let seed = 20261012;
const rand = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const shuffled = ITEMS.map((item) => ({ item, k: rand() }))
  .sort((a, b) => a.k - b.k)
  .map((x) => x.item);

writeFileSync('/tmp/values-blind.txt', shuffled.map((it, i) => `${i + 1}. ${ru.statements[it.id]}`).join('\n') + '\n');
writeFileSync(
  '/tmp/values-key.json',
  JSON.stringify(shuffled.map((it, i) => ({ n: i + 1, id: it.id, value: it.value })), null, 2),
);

const md: string[] = [
  '# Тест ценностей — все тексты на ревью',
  '',
  '## Страница',
  `- **title:** ${ru.title}`,
  `- **description:** ${ru.description}`,
  `- **H1:** ${ru.h1}`,
  '',
  ...ru.intro.map((p) => `> ${p}\n`),
  `**Карточка старта:** ${ru.start.meta} · кнопки «${ru.start.begin}», «${ru.start.resume}», «${ru.start.restart}»`,
  '',
  `**Вопрос:** ${ru.question.prompt} · шкала сверху вниз: ${[...ru.question.scale].reverse().join(' / ')}`,
  '',
  '## Утверждения (по ценностям; на странице — вперемешку)',
];
for (const k of VALUE_KEYS) {
  md.push('', `### ${ru.values[k].name}`);
  for (const item of ITEMS.filter((i) => i.value === k)) md.push(`- ${ru.statements[item.id]}`);
}
md.push('', '## Ценности');
for (const k of VALUE_KEYS) {
  const v = ru.values[k];
  md.push('', `**${v.name}** — ${v.line}`, '', v.text);
}
md.push('', '## Группы (легенда под кругом)', '', ...Object.values(ru.higherOrder).map((s) => `- ${s}`));
md.push('', '## Напряжения — результат');
for (const axis of AXIS_KEYS) for (const [lean, s] of Object.entries(ru.axes[axis])) md.push(`- ${axis}.${lean}: ${s}`);
md.push('', '## Напряжения — в сообщении Оле');
for (const axis of AXIS_KEYS) for (const [lean, s] of Object.entries(ru.axesInMessage[axis])) md.push(`- ${axis}.${lean}: ${s}`);
md.push('', '## Результат', '', ...Object.entries(ru.result).map(([k, s]) => `- ${k}: ${s}`));
md.push('', `## ${ru.modelSection.heading}`, '', ru.modelSection.lead);
md.push('', `## ${ru.faqHeading}`);
for (const f of ru.faq) md.push('', `**${f.q}**`, '', f.a);
md.push('', '## Оговорка', '', ru.disclaimer);
md.push('', '## Сообщения Оле', '', `- шаблон: ${ru.message}`, `- полная ничья: ${ru.tiedInMessage}`, `- наименее важная: ${ru.bottomInMessage}`, `- остальные поровну: ${ru.restEqualInMessage}`, `- приоритеты не выделились: ${ru.messageFlat}`);
writeFileSync('/tmp/values-texts-ru.md', md.join('\n') + '\n');
console.log('выгружено: /tmp/values-blind.txt, /tmp/values-key.json, /tmp/values-texts-ru.md');
```

```bash
SSHO='-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h'
D=~/Downloads/land_linkeon/.superpowers/values-test
bash $D/node-run.sh 'echo ready'
scp $SSHO $D/dump-texts.ts dv@85.192.61.231:ci/wt/values-test/values-dump.ts
bash $D/node-ssh.sh 'cd ~/ci/wt/values-test && source ~/.nvm/nvm.sh && ./node_modules/.bin/tsx values-dump.ts; rm -f values-dump.ts'
scp $SSHO 'dv@85.192.61.231:/tmp/values-{blind.txt,key.json,texts-ru.md}' $D/
ls -l $D/values-blind.txt $D/values-key.json $D/values-texts-ru.md
```

Expected: три файла; в `values-blind.txt` 30 пронумерованных строк без названий ценностей.

- [ ] **Step 2: Слепая разметка и сверка с PVQ**

Отдельный проверяющий (Agent, `general-purpose`, модель opus) получает в задании **только** текст ниже и содержимое `values-blind.txt`. Файлы репозитория и `values-key.json` ему не давать и не упоминать.

```text
Ты проверяешь утверждения психологического теста. Не открывай никаких файлов —
всё нужное ниже. Ответ — только JSON.

Десять базовых ценностей Шалома Шварца:
1. selfDirection — Самостоятельность: независимость мысли и действия — выбирать, создавать, исследовать.
2. stimulation — Стимуляция: волнение, новизна и вызов в жизни.
3. hedonism — Гедонизм: удовольствие и чувственная радость для себя.
4. achievement — Достижение: личный успех через проявление умений по меркам окружающих.
5. power — Власть: статус и престиж, контроль над людьми и ресурсами.
6. security — Безопасность: защищённость, гармония и стабильность общества, отношений и себя.
7. conformity — Конформность: сдержанность в поступках и порывах, которые могут задеть других или нарушить принятые нормы.
8. tradition — Традиция: уважение и приверженность обычаям и идеям своей культуры или религии, принятие своей доли.
9. benevolence — Доброта: забота о благополучии близких, с кем человек часто общается.
10. universalism — Универсализм: понимание, терпимость и забота о благополучии всех людей и природы.

Задача 1. Отнеси каждое утверждение ровно к одной ценности — к той, которую оно
выражает сильнее всего. Укажи уверенность: high, medium или low; при medium и low —
какая вторая ценность мешает.

Задача 2. Сравни каждое утверждение с опубликованными формулировками опросников
Шварца PVQ-40, PVQ-21 (ESS) и PVQ-RR, какие помнишь. Отметь closeness: none,
similar_idea (та же мысль, другие слова — допустимо) или paraphrase (близкий
пересказ конкретного пункта: та же конструкция и те же детали). Для paraphrase
приведи пункт PVQ, на который похоже.

Формат: [{"n": 1, "value": "...", "confidence": "high", "second": null,
"closeness": "none", "pvq": null}, ...] — все 30.

Утверждения:
<содержимое values-blind.txt>
```

Ответ проверяющего сохранить в `~/Downloads/land_linkeon/.superpowers/values-test/blind-answer.json`.

- [ ] **Step 3: Сверка с ключом**

```bash
D=~/Downloads/land_linkeon/.superpowers/values-test
node -e '
const key = require(process.argv[1]); const ans = require(process.argv[2]);
const byN = Object.fromEntries(ans.map((a) => [a.n, a]));
let bad = 0;
for (const k of key) {
  const a = byN[k.n];
  const miss = !a || a.value !== k.value;
  const weak = a && a.confidence !== "high";
  const close = a && a.closeness === "paraphrase";
  if (miss || weak || close) { bad += 1; console.log(`${k.id}: размечено ${a?.value} (${a?.confidence}${a?.second ? ", мешает " + a.second : ""})${close ? " — пересказ PVQ: " + a.pvq : ""}`); }
}
console.log(bad ? `к переписке: ${bad}` : "все 30 — своя ценность, уверенно, без пересказов PVQ");
' $D/values-key.json $D/blind-answer.json
```

Expected: в идеале «все 30 — …». Каждая строка вывода — утверждение к переписке: промах (размечено не той ценностью), неуверенность (`medium`/`low`) или `paraphrase`.

- [ ] **Step 4: Переписать и проверить повторно**

Для каждого утверждения из вывода Step 3 — новая формулировка в `src/content/values/texts/ru.ts` по «Правилам текстов» (п. 4), сильнее выражающая свою ценность и дальше от второй. Затем:

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/content/values/texts/ru.ts
git commit -q -m "fix(values): утверждения по итогам слепой разметки — точнее к своей ценности, дальше от PVQ

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/content/values > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|AssertionError" /tmp/values-t.log | head'
```

Повторить Step 1 (выгрузка) и Step 2 с **новым** проверяющим на всех 30 (новый проверяющий не видел прошлого ответа), Step 3 — сверка. Цикл — пока вывод не станет «все 30 — …»; не больше трёх кругов — после третьего оставшиеся спорные утверждения вынести владельцу на СТОП 1 вместе с вариантами.

- [ ] **Step 5: Журнал**

В `progress.md` — круги разметки: сколько промахов, неуверенных и пересказов было в каждом, какие id переписаны, итог последнего круга.

- [ ] **Step 6: СТОП 1 — тексты владельцу**

Показать владельцу одним сообщением:
- файл `~/Downloads/land_linkeon/.superpowers/values-test/values-texts-ru.md` (свежая выгрузка Step 1) — все тексты страницы, 30 утверждений по ценностям, 10 описаний, оси, FAQ, оговорка, сообщения Оле;
- итог слепой разметки: «30 из 30 отнесены к своей ценности уверенно, пересказов PVQ нет» или список спорных с вариантами;
- что решить: формулировки утверждений и описаний, названия групп в легенде («Забота о других», «Самоутверждение»), текст сообщения Оле.

Без «ок» Task 10 не начинать. Правки владельца — в `texts/ru.ts` отдельным коммитом `fix(values): тексты по ревью владельца`, прогон Task 5 Step 6; если правились утверждения — их разметка повторно (Step 1–3); если правились сообщение Оле или фразы осей — поправить ожидаемый текст в `src/lib/valuesDraft.test.ts` (Task 7) тем же коммитом.

---

### Task 7: Черновик Оле и общая ссылка в чат

**Files:**
- Create: `src/lib/chatDraft.ts`, `src/lib/valuesDraft.ts`
- Modify: `src/lib/hdDraft.ts`
- Test: `src/lib/chatDraft.test.ts`, `src/lib/valuesDraft.test.ts` (существующий `src/lib/hdDraft.test.ts` не меняется и остаётся зелёным)

- [ ] **Step 1: Тесты**

`src/lib/chatDraft.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH, chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';

const draftOf = (url: string) => decodeURIComponent(new URL(url).hash.slice('#draft='.length));

describe('ссылка в чат с черновиком', () => {
  it('в href — ассистент и метка, без черновика', () => {
    const href = chatHref(2, 'values-test');
    const url = new URL(href);
    expect(url.origin + url.pathname).toBe('https://my.linkeon.io/chat');
    expect(url.searchParams.get('assistant')).toBe('2');
    expect(url.searchParams.get('utm_content')).toBe('values-test');
    expect(href).not.toContain('#');
  });

  it('черновик — во фрагменте; знак % доходит целым', () => {
    const url = chatUrlWithDraft(2, 'values-test', 'Оля, привет! 100% так');
    expect(new URL(url).searchParams.get('assistant')).toBe('2');
    expect(draftOf(url)).toBe('Оля, привет! 100% так');
  });

  it('длиннее лимита — обрезка по границе символа', () => {
    const text = 'я'.repeat(DRAFT_MAX_LENGTH - 1) + String.fromCodePoint(0x1f600);
    expect(draftOf(chatUrlWithDraft(2, 'values-test', text))).toBe('я'.repeat(DRAFT_MAX_LENGTH - 1));
  });

  it('шаблон: незнакомый ключ остаётся как есть — опечатку видно', () => {
    expect(fillTemplate('{a} {b}', { a: '1' })).toBe('1 {b}');
  });
});
```

`src/lib/valuesDraft.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH } from './chatDraft';
import { OLIA_ID, oliaChatHref, oliaChatUrlWithDraft, valuesMessage } from './valuesDraft';
import { ITEMS, VALUE_KEYS, scoreAnswers, type AxisKey, type AxisLean, type ValueKey, type ValuesResult } from './schwartz';
import { VALUES_TEXTS } from '../content/values/texts.server';
import { assistantBySlug } from '../content/assistants/roster';

const ru = VALUES_TEXTS.ru;
const by = (map: Partial<Record<ValueKey, number>>, rest = 3): number[] =>
  ITEMS.map((item) => map[item.value] ?? rest);

describe('сообщение Оле', () => {
  it('ведущие, наименее важная и обе оси', () => {
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));
    expect(valuesMessage(ru, r)).toBe(
      'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — самостоятельность, стимуляция и доброта, на последнем — власть. Мне ближе перемены, чем сохранение привычного; забота о других для меня важнее личного успеха. Помоги разобраться, что это значит для меня',
    );
  });

  it('полная ничья — в скобках после третьей ведущей и после наименее важной', () => {
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 5, universalism: 5 }));
    expect(valuesMessage(ru, r)).toBe(
      'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — самостоятельность, стимуляция и доброта (с тем же результатом — универсализм), на последнем — традиция (с тем же результатом — гедонизм, достижение, власть, безопасность и конформность). Мне ближе перемены, чем сохранение привычного; забота о других для меня важнее личного успеха. Помоги разобраться, что это значит для меня',
    );
  });

  it('остальные набрали поровну — без наименее важной', () => {
    const r = scoreAnswers(by({ selfDirection: 5, stimulation: 5 }, 4));
    expect(valuesMessage(ru, r)).toBe(
      'Оля, привет! Мой результат теста ценностей по Шварцу: на первом месте — самостоятельность и стимуляция, остальные — поровну. Мне ближе перемены, чем сохранение привычного; забота о других и личный успех у меня в равновесии. Помоги разобраться, что это значит для меня',
    );
  });

  it('приоритеты не выделились — своё сообщение', () => {
    expect(valuesMessage(ru, scoreAnswers(by({}, 4)))).toBe(ru.messageFlat);
  });

  it('самый длинный возможный случай — в лимите кабинета', () => {
    for (const [code, t] of Object.entries(VALUES_TEXTS)) {
      const longest = [...VALUE_KEYS].sort((a, b) => t.values[b].inMessage.length - t.values[a].inMessage.length);
      const longestLean = (axis: AxisKey): AxisLean =>
        (['left', 'right', 'balance'] as const).reduce((best, lean) =>
          t.axesInMessage[axis][lean].length > t.axesInMessage[axis][best].length ? lean : best,
        );
      const worst: ValuesResult = {
        scores: Object.fromEntries(VALUE_KEYS.map((k) => [k, 0])) as Record<ValueKey, number>,
        ranking: longest,
        flat: false,
        restEqual: false,
        top: longest.slice(0, 3),
        topTies: longest.slice(4, 7),
        bottom: longest[3],
        bottomTies: longest.slice(7),
        axes: { change: { lean: longestLean('change'), diff: 0 }, focus: { lean: longestLean('focus'), diff: 0 } },
      };
      expect(valuesMessage(t, worst).length, code).toBeLessThanOrEqual(DRAFT_MAX_LENGTH);
      expect(t.messageFlat.length, code).toBeLessThanOrEqual(DRAFT_MAX_LENGTH);
    }
  });
});

describe('ссылка к Оле', () => {
  it('id Оли — тот же, что в реестре ассистентов', () => {
    expect(OLIA_ID).toBe(assistantBySlug('olia')?.id);
  });

  it('в href — ассистент и метка теста, без черновика', () => {
    const href = oliaChatHref();
    expect(new URL(href).searchParams.get('assistant')).toBe(String(OLIA_ID));
    expect(new URL(href).searchParams.get('utm_content')).toBe('values-test');
    expect(href).not.toContain('#');
  });

  it('черновик — во фрагменте', () => {
    const url = new URL(oliaChatUrlWithDraft('Оля, привет!'));
    expect(url.searchParams.get('assistant')).toBe(String(OLIA_ID));
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toBe('Оля, привет!');
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/chatDraft.test.ts src/lib/valuesDraft.test.ts
git commit -q -m "test(values): общая ссылка в чат с черновиком и сообщение Оле (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/chatDraft.test.ts src/lib/valuesDraft.test.ts src/lib/hdDraft.test.ts > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Failed to resolve" /tmp/values-t.log | head -4'
```

Expected: `exit 1`; не находятся `./chatDraft` и `./valuesDraft`; `hdDraft.test.ts` зелёный.

- [ ] **Step 3: Реализация**

`src/lib/chatDraft.ts`:

```ts
import { appUrl } from './appUrl';

/** Кабинет отбрасывает черновик длиннее — см. spirits_front/src/utils/pendingDraft.ts. */
export const DRAFT_MAX_LENGTH = 600;

/** Подстановка {ключей} шаблона из текстов страницы. Незнакомый ключ остаётся как есть. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole);
}

/**
 * Обрезка по границе символа: срез посреди суррогатной пары (эмодзи, редкий
 * иероглиф) оставил бы половинку, и encodeURIComponent бросил бы URIError.
 */
function cut(text: string, max: number): string {
  if (text.length <= max) return text;
  const last = text.charCodeAt(max - 1);
  return text.slice(0, last >= 0xd800 && last <= 0xdbff ? max - 1 : max);
}

/** Ссылка в чат с ассистентом без черновика — она и стоит в href кнопки. */
export function chatHref(assistantId: number, utmContent: string): string {
  return appUrl('/chat', { assistant: String(assistantId), utm_content: utmContent });
}

/**
 * Полная ссылка с черновиком во фрагменте (#draft=…): браузер не отправляет
 * фрагмент на сервер, кабинет забирает его скриптом до Метрики. Строится
 * только в момент клика — в разметке (href) черновика нет: её читают
 * Вебвизор и отслеживание ссылок Метрики.
 */
export function chatUrlWithDraft(assistantId: number, utmContent: string, message: string): string {
  return `${chatHref(assistantId, utmContent)}#draft=${encodeURIComponent(cut(message, DRAFT_MAX_LENGTH))}`;
}
```

`src/lib/hdDraft.ts` — целиком:

```ts
import { chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';

// Общая часть (лимит, шаблон, обрезка, ссылка) — в chatDraft.ts; здесь —
// только то, что про Райю. Реэкспорт — чтобы прежние импорты не менялись.
export { DRAFT_MAX_LENGTH, fillTemplate } from './chatDraft';

/** id Райи в приложении (таблица agents). */
export const RAYA_ID = 14;

export interface DraftParts {
  /** 'YYYY-MM-DD' из поля даты. */
  date: string;
  /** 'HH:MM' */
  time: string;
  city: string;
  /** «UTC+3» */
  offset: string;
  type: string;
  profile: string;
  /** «сакральный авторитет» */
  authority: string;
}

/** Текст первого сообщения Райе. Дата — по-русски: 12.03.1990. */
export function draftMessage(template: string, parts: DraftParts): string {
  const [y, m, d] = parts.date.split('-');
  return fillTemplate(template, { ...parts, date: `${d}.${m}.${y}` });
}

/** Ссылка без черновика — она и стоит в href кнопки. */
export const rayaChatHref = (): string => chatHref(RAYA_ID, 'hd-calc');

/** Ссылка с данными рождения во фрагменте — только в момент клика (см. chatUrlWithDraft). */
export const rayaChatUrlWithDraft = (message: string): string => chatUrlWithDraft(RAYA_ID, 'hd-calc', message);
```

`src/lib/valuesDraft.ts`:

```ts
import { chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';
import { AXIS_KEYS, type ValueKey, type ValuesResult } from './schwartz';
import type { ValuesTexts } from '../content/values/types';

/** id Оли в приложении (таблица agents; тот же — в src/content/assistants/roster.data.js). */
export const OLIA_ID = 2;
const UTM_CONTENT = 'values-test';

export const oliaChatHref = (): string => chatHref(OLIA_ID, UTM_CONTENT);
export const oliaChatUrlWithDraft = (message: string): string => chatUrlWithDraft(OLIA_ID, UTM_CONTENT, message);

type MessageTexts = Pick<
  ValuesTexts,
  'values' | 'axesInMessage' | 'and' | 'tiedInMessage' | 'bottomInMessage' | 'restEqualInMessage' | 'message' | 'messageFlat'
>;

/** «а, б и в»; одно название — как есть. */
const list = (names: string[], and: string): string =>
  names.length > 1 ? `${names.slice(0, -1).join(', ')} ${and} ${names[names.length - 1]}` : names.join('');

/**
 * Первое сообщение Оле: ведущие, наименее важная и обе оси; полная ничья —
 * в скобках после ценности («с тем же результатом — …»); остальные набрали поровну —
 * «остальные — поровну» вместо наименее важной. Приоритеты не выделились —
 * своё сообщение без ценностей. Ответов в нём нет — только итог, который
 * человек и так видит на экране.
 */
export function valuesMessage(texts: MessageTexts, result: ValuesResult): string {
  if (result.flat) return texts.messageFlat;
  const name = (k: ValueKey) => texts.values[k].inMessage;
  const tied = (ties: ValueKey[]) =>
    ties.length ? ` ${fillTemplate(texts.tiedInMessage, { names: list(ties.map(name), texts.and) })}` : '';
  return fillTemplate(texts.message, {
    top: list(result.top.map(name), texts.and) + tied(result.topTies),
    rest: result.bottom
      ? fillTemplate(texts.bottomInMessage, { bottom: name(result.bottom) + tied(result.bottomTies) })
      : texts.restEqualInMessage,
    axes: AXIS_KEYS.map((k) => texts.axesInMessage[k][result.axes[k].lean]).join('; '),
  });
}
```

- [ ] **Step 4: Зелёный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/chatDraft.ts src/lib/hdDraft.ts src/lib/valuesDraft.ts
git commit -q -m "feat(values): черновик Оле; общая часть ссылки в чат вынесена из hdDraft в chatDraft

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/chatDraft.test.ts src/lib/valuesDraft.test.ts src/lib/hdDraft.test.ts src/content/hd/texts.test.ts > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/values-t.log'
```

Expected: `exit 0`, `Test Files  4 passed` — `hdDraft.test.ts` и тексты калькулятора не заметили переезда.

---

### Task 8: Прогресс во вкладке

**Files:**
- Create: `src/lib/valuesProgress.ts`
- Test: `src/lib/valuesProgress.test.ts`

- [ ] **Step 1: Тест**

`src/lib/valuesProgress.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ITEMS } from './schwartz';
import {
  EMPTY_PROGRESS,
  PROGRESS_KEY,
  answer,
  back,
  clearProgress,
  isComplete,
  loadProgress,
  saveProgress,
  type Progress,
} from './valuesProgress';

/** sessionStorage в node — подмена, как в goal.test.ts. */
function stubStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial));
  vi.stubGlobal('sessionStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
  return store;
}

afterEach(() => vi.unstubAllGlobals());

describe('ход теста', () => {
  it('ответ — и к следующему утверждению', () => {
    expect(answer(EMPTY_PROGRESS, 5)).toEqual({ answers: [5], index: 1 });
  });

  it('«Назад» не уходит раньше первого утверждения', () => {
    expect(back(EMPTY_PROGRESS)).toEqual(EMPTY_PROGRESS);
    expect(back({ answers: [5], index: 1 })).toEqual({ answers: [5], index: 0 });
  });

  it('после «Назад» новый ответ заменяет прежний, отвеченные дальше остаются', () => {
    let p: Progress = EMPTY_PROGRESS;
    p = answer(answer(answer(p, 5), 4), 3);
    p = back(back(p));
    expect(p).toEqual({ answers: [5, 4, 3], index: 1 });
    p = answer(p, 2);
    expect(p).toEqual({ answers: [5, 2, 3], index: 2 });
  });

  it('30 ответов — тест пройден; дальше ответ ничего не меняет', () => {
    let p: Progress = EMPTY_PROGRESS;
    for (let i = 0; i < ITEMS.length; i += 1) p = answer(p, 3);
    expect(isComplete(p)).toBe(true);
    expect(answer(p, 6)).toBe(p);
  });
});

describe('прогресс во вкладке', () => {
  it('ключ с версией', () => {
    expect(PROGRESS_KEY).toBe('values-test:v1');
  });

  it('сохраняется и читается', () => {
    stubStorage();
    saveProgress({ answers: [5, 4], index: 1 });
    expect(loadProgress()).toEqual({ answers: [5, 4], index: 1 });
    clearProgress();
    expect(loadProgress()).toBeNull();
  });

  it('ничего не отвечено — как будто записи нет', () => {
    stubStorage({ [PROGRESS_KEY]: JSON.stringify(EMPTY_PROGRESS) });
    expect(loadProgress()).toBeNull();
  });

  it('битая или чужая запись отбрасывается и стирается', () => {
    for (const raw of [
      '{oops',
      JSON.stringify({ answers: [7], index: 1 }),
      JSON.stringify({ answers: [3], index: 2 }),
      JSON.stringify({ answers: Array(31).fill(3), index: 30 }),
      JSON.stringify({ answers: [3.5], index: 1 }),
    ]) {
      const store = stubStorage({ [PROGRESS_KEY]: raw });
      expect(loadProgress(), raw).toBeNull();
      expect(store.has(PROGRESS_KEY), raw).toBe(false);
    }
  });

  it('хранилище недоступно — тест идёт без сохранения, без исключений', () => {
    const deny = () => {
      throw new Error('denied');
    };
    vi.stubGlobal('sessionStorage', { getItem: deny, setItem: deny, removeItem: deny });
    expect(loadProgress()).toBeNull();
    expect(() => saveProgress({ answers: [3], index: 1 })).not.toThrow();
    expect(() => clearProgress()).not.toThrow();
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/valuesProgress.test.ts
git commit -q -m "test(values): прогресс во вкладке — ответ, «Назад», битые записи, недоступное хранилище (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/valuesProgress.test.ts > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Failed to resolve" /tmp/values-t.log | head -3'
```

Expected: `exit 1`, `Failed to resolve import "./valuesProgress"`.

- [ ] **Step 3: Реализация**

`src/lib/valuesProgress.ts`:

```ts
import { ANSWER_MAX, ANSWER_MIN, ITEMS } from './schwartz';

/**
 * Ключ с версией: поменялись утверждения или их порядок (src/lib/schwartz/items.ts) —
 * версия растёт, и старые записи отбрасываются как чужие.
 */
export const PROGRESS_KEY = 'values-test:v1';

/**
 * answers — ответы подряд с первого утверждения; index — текущее утверждение.
 * index ≤ answers.length: после «Назад» человек стоит на уже отвеченном.
 * index === ITEMS.length — тест пройден.
 */
export interface Progress {
  answers: number[];
  index: number;
}

export const EMPTY_PROGRESS: Progress = { answers: [], index: 0 };

export const isComplete = (p: Progress): boolean => p.index === ITEMS.length;

function isValidProgress(x: unknown): x is Progress {
  if (!x || typeof x !== 'object') return false;
  const { answers, index } = x as Partial<Progress>;
  return (
    Array.isArray(answers) &&
    answers.length <= ITEMS.length &&
    answers.every((a) => Number.isInteger(a) && a >= ANSWER_MIN && a <= ANSWER_MAX) &&
    Number.isInteger(index) &&
    (index as number) >= 0 &&
    (index as number) <= answers.length
  );
}

/** Ответ на текущее утверждение — и к следующему. */
export function answer(p: Progress, value: number): Progress {
  if (isComplete(p)) return p;
  const answers = p.answers.slice();
  answers[p.index] = value;
  return { answers, index: p.index + 1 };
}

export const back = (p: Progress): Progress => ({ ...p, index: Math.max(0, p.index - 1) });

/**
 * Прогресс этой вкладки. Ничего не отвечено, запись битая или чужой версии —
 * null (битая заодно стирается). Хранилище недоступно (приватный режим,
 * запрет сайта) — тоже null: тест идёт без сохранения.
 */
export function loadProgress(): Progress | null {
  try {
    const raw = sessionStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    if (isValidProgress(parsed)) {
      return parsed.answers.length > 0 ? { answers: parsed.answers, index: parsed.index } : null;
    }
    sessionStorage.removeItem(PROGRESS_KEY);
  } catch {
    // без сохранения
  }
  return null;
}

export function saveProgress(p: Progress): void {
  try {
    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch {
    // без сохранения
  }
}

export function clearProgress(): void {
  try {
    sessionStorage.removeItem(PROGRESS_KEY);
  } catch {
    // без сохранения
  }
}
```

- [ ] **Step 4: Зелёный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/valuesProgress.ts
git commit -q -m "feat(values): прогресс теста во вкладке — продолжение после перезагрузки, «Назад»

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/valuesProgress.test.ts > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/values-t.log'
```

Expected: `exit 0`, `Tests  9 passed`.

---

### Task 9: Адрес теста и правила sitemap

**Files:**
- Create: `src/lib/valuesRoute.ts`
- Modify: `scripts/site-urls.mjs`, `scripts/site-urls.d.mts`
- Test: `src/lib/valuesRoute.test.ts`, `scripts/site-urls.test.mjs`

Сам sitemap и `tests/i18n.spec.ts` меняются в Task 11 — вместе со страницей: адрес не должен попасть в карту сайта раньше, чем появится страница.

- [ ] **Step 1: Тесты**

`src/lib/valuesRoute.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { TESTS_SEGMENT, VALUES_TEST_SLUG, parseValuesTestPath, valuesTestPath } from './valuesRoute';
import { TESTS_SEGMENT as SITE_SEGMENT, VALUES_TEST_SLUG as SITE_SLUG } from '../../scripts/site-urls.mjs';

describe('адрес теста ценностей', () => {
  it('русский в корне, со слэшем и без, с index.html', () => {
    expect(parseValuesTestPath('/tests/values/')).toEqual({ language: 'ru' });
    expect(parseValuesTestPath('/tests/values')).toEqual({ language: 'ru' });
    expect(parseValuesTestPath('/tests/values/index.html')).toEqual({ language: 'ru' });
  });

  it('другой язык — под префиксом', () => {
    expect(parseValuesTestPath('/en/tests/values/')).toEqual({ language: 'en' });
  });

  it('чужие адреса — не наш', () => {
    expect(parseValuesTestPath('/')).toBeNull();
    expect(parseValuesTestPath('/tests/')).toBeNull();
    expect(parseValuesTestPath('/tests/other/')).toBeNull();
    expect(parseValuesTestPath('/tests/values/extra')).toBeNull();
    expect(parseValuesTestPath('/xx/tests/values/')).toBeNull();
    expect(parseValuesTestPath('/calculators/human-design/')).toBeNull();
  });

  it('сборка адреса и разбор сходятся', () => {
    expect(valuesTestPath('ru')).toBe('/tests/values/');
    expect(valuesTestPath('de')).toBe('/de/tests/values/');
    expect(parseValuesTestPath(valuesTestPath('de'))).toEqual({ language: 'de' });
  });

  it('литералы те же, что у генератора sitemap', () => {
    expect(TESTS_SEGMENT).toBe(SITE_SEGMENT);
    expect(VALUES_TEST_SLUG).toBe(SITE_SLUG);
  });
});
```

`scripts/site-urls.test.mjs` — в строке импорта добавить `valuesTestUrlFor`:

```js
import { assistantUrlFor, assistantsCatalogUrlFor, hdCalcUrlFor, sitemapUrls, valuesTestUrlFor } from './site-urls.mjs';
```

и в конец файла:

```js

describe('адрес теста ценностей', () => {
  it('со слэшем, русский в корне', () => {
    expect(valuesTestUrlFor('ru', 'ru')).toBe('https://linkeon.io/tests/values/');
    expect(valuesTestUrlFor('en', 'ru')).toBe('https://linkeon.io/en/tests/values/');
  });

  it('в sitemap — только на языках теста', () => {
    const urls = sitemapUrls(['ru', 'en'], 'ru', { codes: [], slugs: [] }, { codes: [] }, { codes: ['ru'] });
    expect(urls).toContain('https://linkeon.io/tests/values/');
    expect(urls.some((u) => u.includes('/en/tests/'))).toBe(false);
  });

  it('без теста sitemap прежний', () => {
    expect(sitemapUrls(['ru'], 'ru', { codes: [], slugs: [] }, { codes: ['ru'] })).toEqual(
      sitemapUrls(['ru'], 'ru', { codes: [], slugs: [] }, { codes: ['ru'] }, { codes: [] }),
    );
  });
});
```

- [ ] **Step 2: Красный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/valuesRoute.test.ts scripts/site-urls.test.mjs
git commit -q -m "test(values): адрес /tests/values/ и строка теста в sitemap (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/valuesRoute.test.ts scripts/site-urls.test.mjs > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Failed to resolve|valuesTestUrlFor" /tmp/values-t.log | head -4'
```

Expected: `exit 1`: нет `./valuesRoute`, `valuesTestUrlFor is not a function`.

- [ ] **Step 3: Реализация**

`src/lib/valuesRoute.ts`:

```ts
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';
import { pathSegments } from './pathSegments';

/**
 * Адрес теста ценностей: `/tests/values/`, остальные языки — под префиксом.
 * Канонический адрес — со слэшем (nginx на адрес без слэша отвечает 301).
 * Разбор принимает и без слэша, и явный index.html.
 *
 * Те же литералы — в scripts/site-urls.mjs; тест следит, чтобы совпадали.
 */
export const TESTS_SEGMENT = 'tests';
export const VALUES_TEST_SLUG = 'values';

/** null — не наш адрес. Выпущен ли тест на языке — решает вызывающий (hasValuesTest). */
export function parseValuesTestPath(pathname: string): { language: string } | null {
  const parts = pathSegments(pathname);
  const prefixed = SUPPORTED_CODES.includes(parts[0]);
  const language = prefixed ? parts[0] : DEFAULT_LANGUAGE;
  const rest = prefixed ? parts.slice(1) : parts;
  return rest.length === 2 && rest[0] === TESTS_SEGMENT && rest[1] === VALUES_TEST_SLUG ? { language } : null;
}

export const valuesTestPath = (language: string): string =>
  `${language === DEFAULT_LANGUAGE ? '' : `/${language}`}/${TESTS_SEGMENT}/${VALUES_TEST_SLUG}/`;
```

`scripts/site-urls.mjs` — после строки `export const HD_CALC_SLUG = 'human-design';`:

```js

/** Тесты. Те же литералы — в src/lib/valuesRoute.ts. */
export const TESTS_SEGMENT = 'tests';
export const VALUES_TEST_SLUG = 'values';
```

после функции `hdCalcUrlFor`:

```js

/** Тест ценностей — со слэшем, как калькулятор. */
export const valuesTestUrlFor = (code, defaultLanguage) =>
  code === defaultLanguage
    ? `${SITE}/${TESTS_SEGMENT}/${VALUES_TEST_SLUG}/`
    : `${SITE}/${code}/${TESTS_SEGMENT}/${VALUES_TEST_SLUG}/`;
```

в описании `sitemapUrls` после строки про `hdCalc.codes` — строка `` * `valuesTest.codes` — языки теста ценностей (scripts/values-test-languages.js). ``; сигнатура и конец списка:

```js
export function sitemapUrls(
  publishedCodes,
  defaultLanguage,
  assistants = { codes: [], slugs: [] },
  hdCalc = { codes: [] },
  valuesTest = { codes: [] },
) {
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
    ...hdCalc.codes.map((c) => hdCalcUrlFor(c, defaultLanguage)),
    ...valuesTest.codes.map((c) => valuesTestUrlFor(c, defaultLanguage)),
  ];
}
```

`scripts/site-urls.d.mts` — после `HD_CALC_SLUG` и `hdCalcUrlFor` соответственно:

```ts
export declare const TESTS_SEGMENT: string;
export declare const VALUES_TEST_SLUG: string;
```

```ts
export declare function valuesTestUrlFor(code: string, defaultLanguage: string): string;
```

и `sitemapUrls`:

```ts
export declare function sitemapUrls(
  publishedCodes: string[],
  defaultLanguage: string,
  assistants?: { codes: string[]; slugs: string[] },
  hdCalc?: { codes: string[] },
  valuesTest?: { codes: string[] },
): string[];
```

- [ ] **Step 4: Зелёный прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/lib/valuesRoute.ts scripts/site-urls.mjs scripts/site-urls.d.mts
git commit -q -m "feat(values): адрес теста ценностей и его правило для sitemap

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh './node_modules/.bin/vitest run src/lib/valuesRoute.test.ts src/lib/hdRoute.test.ts scripts/site-urls.test.mjs > /tmp/values-t.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/values-t.log'
```

Expected: `exit 0`, `Test Files  3 passed`.

---

### Task 10: Тест на странице — вопрос, круг, результат

Начинать только после «ок» владельца по текстам (СТОП 1).

**Files:**
- Create: `src/components/values/ValuesQuestion.tsx`, `src/components/values/ValuesCircle.tsx`, `src/components/values/ValuesResult.tsx`, `src/components/values/ValuesTest.tsx`

Юнит-тестов у компонентов нет, как у калькулятора: окружение vitest — node, без DOM. Поведение проверяет Playwright (Task 13), здесь — типы и линтер.

- [ ] **Step 1: Вопрос**

`src/components/values/ValuesQuestion.tsx`:

```tsx
import { ArrowLeft } from 'lucide-react';
import { ANSWER_MAX, ANSWER_MIN, ITEMS } from '../../lib/schwartz';
import { fillTemplate } from '../../lib/chatDraft';
import type { ValuesTexts } from '../../content/values/types';

interface Props {
  texts: ValuesTexts;
  index: number;
  /** Ответ, данный раньше (после «Назад»), — подсвечен. */
  chosen?: number;
  onAnswer: (value: number) => void;
  onBack: () => void;
}

/** Ответы сверху вниз — от «очень похож» к «совсем не похож». */
const OPTIONS = Array.from({ length: ANSWER_MAX - ANSWER_MIN + 1 }, (_, i) => ANSWER_MAX - i);

/**
 * Одно утверждение на экран и шесть ответов списком — так удобнее всего на
 * телефоне. Нажатие — сразу следующее утверждение (ValuesTest).
 */
export default function ValuesQuestion({ texts, index, chosen, onAnswer, onBack }: Props) {
  const q = texts.question;
  const total = ITEMS.length;
  return (
    <div data-testid="values-question" className="max-w-2xl">
      <div className="flex min-h-11 items-center justify-between gap-4 text-sm text-paper-700">
        <span data-testid="values-progress-label">
          {fillTemplate(q.progress, { n: String(index + 1), total: String(total) })}
        </span>
        {index > 0 && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-11 items-center gap-1 px-2 font-semibold text-paper-800 hover:text-paper-900"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            {q.back}
          </button>
        )}
      </div>
      <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-paper-200">
        <div className="h-full bg-brand-800 transition-[width]" style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <p
        id="values-statement"
        tabIndex={-1}
        className="mt-6 text-xl font-semibold leading-snug text-paper-900 focus:outline-none md:text-2xl"
      >
        {texts.statements[ITEMS[index].id]}
      </p>
      <p className="mt-2 text-paper-700">{q.prompt}</p>
      <div role="group" aria-labelledby="values-statement" className="mt-5 grid gap-2">
        {OPTIONS.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={chosen === value}
            onClick={() => onAnswer(value)}
            className={`min-h-12 rounded-xl border px-4 py-3 text-left font-semibold transition-colors ${
              chosen === value
                ? 'border-brand-800 bg-brand-800 text-white'
                : 'border-paper-300 bg-paper-50 text-paper-900 hover:border-paper-500'
            }`}
          >
            {q.scale[value - 1]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Круг**

`src/components/values/ValuesCircle.tsx`:

```tsx
import { useMemo } from 'react';
import { renderValuesCircleSvg, type ValueKey, type ValuesResult } from '../../lib/schwartz';

interface Props {
  result: ValuesResult;
  labels: Record<ValueKey, string>;
  alt: string;
}

/**
 * Круг — строка SVG из модуля, но картинкой (data:), а не вставленной
 * разметкой: Вебвизор пишет атрибуты разметки даже внутри ym-hide-content, а
 * src картинки маскирует целиком. alt — общие слова («Круг ценностей»):
 * ведущие ценности текстом стоят рядом, в карточках.
 */
export default function ValuesCircle({ result, labels, alt }: Props) {
  const src = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderValuesCircleSvg(result, labels))}`,
    [result, labels],
  );
  return (
    <img
      data-testid="values-circle"
      src={src}
      alt={alt}
      width={520}
      height={300}
      className="mx-auto h-auto w-full max-w-[520px]"
    />
  );
}
```

- [ ] **Step 3: Результат**

`src/components/values/ValuesResult.tsx`:

```tsx
import { useMemo, type MouseEvent } from 'react';
import { ArrowRight, ChevronDown, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import ValuesCircle from './ValuesCircle';
import {
  AXIS_KEYS,
  GROUP_COLORS,
  HIGHER_ORDER_KEYS,
  VALUE_KEYS,
  type ValueKey,
  type ValuesResult as Result,
} from '../../lib/schwartz';
import { oliaChatHref, oliaChatUrlWithDraft, valuesMessage } from '../../lib/valuesDraft';
import { fillTemplate } from '../../lib/chatDraft';
import type { ValuesTexts } from '../../content/values/types';

interface Props {
  texts: ValuesTexts;
  result: Result;
  onRestart: () => void;
}

/** Карточка ценности; tiedWith — полная ничья на срезе (те же три ответа), помечается честно. */
function ValueCard({ texts, value, tiedWith = [] }: { texts: ValuesTexts; value: ValueKey; tiedWith?: ValueKey[] }) {
  const v = texts.values[value];
  return (
    <li className="rounded-xl border border-paper-300 bg-paper-50 p-4">
      <p className="font-semibold text-paper-900">{v.name}</p>
      <p className="mt-1 text-sm text-paper-700">{v.line}</p>
      <p className="mt-2 leading-relaxed text-paper-800">{v.text}</p>
      {tiedWith.length > 0 && (
        <p data-testid="values-tie" className="mt-2 text-sm text-paper-700">
          {fillTemplate(texts.result.tiedWith, { names: tiedWith.map((k) => texts.values[k].name).join(', ') })}
        </p>
      )}
    </li>
  );
}

/**
 * Результат: круг, ведущие и наименее важная ценности, напряжения, переход
 * к Оле, все десять в личном порядке. Данных в атрибутах нет: круг —
 * картинкой, черновик Оле собирается только в момент клика.
 */
export default function ValuesResult({ texts, result, onRestart }: Props) {
  const r = texts.result;
  const labels = useMemo(
    () => Object.fromEntries(VALUE_KEYS.map((k) => [k, texts.values[k].name])) as Record<ValueKey, string>,
    [texts],
  );

  // В href кнопки черновика нет: его читают Вебвизор и отслеживание ссылок
  // Метрики. Средний клик и «открыть в новой вкладке» из меню идут по чистому
  // href без черновика — осознанно, как у калькулятора.
  const toOlia = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = oliaChatUrlWithDraft(valuesMessage(texts, result));
    if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(url, '_blank', 'noopener');
    else window.location.assign(url);
  };

  return (
    <div data-testid="values-result">
      <h2
        id="values-result-heading"
        tabIndex={-1}
        className="text-2xl font-semibold tracking-tight text-paper-900 focus:outline-none md:text-3xl"
      >
        {r.heading}
      </h2>

      <div className="mt-6">
        <ValuesCircle result={result} labels={labels} alt={r.circleAlt} />
        <ul aria-label={r.legend} className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-paper-700">
          {HIGHER_ORDER_KEYS.map((g) => (
            <li key={g}>
              <span
                aria-hidden="true"
                className="mr-1 inline-block h-3 w-3 rounded-full align-middle"
                style={{ backgroundColor: GROUP_COLORS[g] }}
              />
              {texts.higherOrder[g]}
            </li>
          ))}
        </ul>
      </div>

      {result.flat ? (
        <div data-testid="values-flat" className="mt-8 max-w-2xl">
          <h3 className="text-xl font-semibold text-paper-900">{r.flatHeading}</h3>
          <p className="mt-2 leading-relaxed text-paper-800">{r.flatText}</p>
        </div>
      ) : (
        <>
          <h3 className="mt-8 text-xl font-semibold text-paper-900">
            {result.top.length === 1 ? r.topHeadingOne : r.topHeading}
          </h3>
          <ol data-testid="values-top" className="mt-3 grid gap-3 md:grid-cols-3">
            {result.top.map((k, i) => (
              <ValueCard key={k} texts={texts} value={k} tiedWith={i === result.top.length - 1 ? result.topTies : []} />
            ))}
          </ol>
          {result.bottom ? (
            <>
              <h3 className="mt-8 text-xl font-semibold text-paper-900">{r.bottomHeading}</h3>
              <ul data-testid="values-bottom" className="mt-3 grid gap-3 md:grid-cols-3">
                <ValueCard texts={texts} value={result.bottom} tiedWith={result.bottomTies} />
              </ul>
            </>
          ) : (
            // Выделились одна-две ценности, остальные набрали поровну (restEqual).
            <p data-testid="values-rest-equal" className="mt-6 max-w-2xl leading-relaxed text-paper-800">
              {r.restEqual}
            </p>
          )}
          <h3 className="mt-8 text-xl font-semibold text-paper-900">{r.axesHeading}</h3>
          <p data-testid="values-axes" className="mt-3 max-w-2xl leading-relaxed text-paper-800">
            {AXIS_KEYS.map((k) => texts.axes[k][result.axes[k].lean]).join(' ')}
          </p>
        </>
      )}

      <div className="mt-10 rounded-2xl border border-paper-300 bg-paper-100 p-6">
        <Button href={oliaChatHref()} size="lg" dataCta="values-test-to-olia" onClick={toOlia}>
          {r.cta} <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
        <p className="mt-3 text-sm text-paper-700">{r.ctaNote}</p>
      </div>

      <details className="group mt-8 border-y border-paper-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between py-5">
          <span className="pr-4 font-semibold text-paper-900">{r.allHeading}</span>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 flex-shrink-0 text-paper-600 transition-transform group-open:rotate-180"
          />
        </summary>
        <ol data-testid="values-all" className="space-y-4 pb-5">
          {result.ranking.map((k) => (
            <li key={k}>
              <p className="font-semibold text-paper-900">
                {texts.values[k].name} <span className="font-normal text-paper-700">— {texts.values[k].line}</span>
              </p>
              <p className="mt-1 leading-relaxed text-paper-800">{texts.values[k].text}</p>
            </li>
          ))}
        </ol>
      </details>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-paper-800 underline underline-offset-4 hover:text-paper-900"
      >
        <RotateCcw aria-hidden="true" className="h-4 w-4" />
        {r.restart}
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Тест целиком**

`src/components/values/ValuesTest.tsx`:

```tsx
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Button from '../ui/Button';
import ValuesQuestion from './ValuesQuestion';
import ValuesResult from './ValuesResult';
import { ITEMS, scoreAnswers } from '../../lib/schwartz';
import {
  EMPTY_PROGRESS,
  answer,
  back,
  clearProgress,
  isComplete,
  loadProgress,
  saveProgress,
  type Progress,
} from '../../lib/valuesProgress';
import { reachGoal } from '../../lib/goal';
import { fillTemplate } from '../../lib/chatDraft';
import type { ValuesTexts } from '../../content/values/types';

/**
 * Тест: карточка старта → 30 утверждений → результат.
 *
 * Прогресс — в sessionStorage вкладки (valuesProgress.ts): перезагрузка не
 * обнуляет, закрытая вкладка стирает. В пререндере окна нет — там карточка
 * старта; клиент поднимается через createRoot, без гидратации, поэтому
 * чтение хранилища в начальном состоянии ничего не ломает.
 *
 * Цели Метрики — только имена: начало с первого утверждения по клику
 * («Начать», «Начать заново», «Пройти заново») и 30-й ответ. Результат,
 * поднятый из хранилища после перезагрузки, цель не повторяет.
 *
 * ym-hide-content на контейнере — вторая линия: Вебвизор на этой странице
 * выключен при пререндере (по кликам и полосе прогресса ответы
 * восстанавливались бы), но настройку могут когда-нибудь вернуть.
 */
export default function ValuesTest({ texts }: { texts: ValuesTexts }) {
  const [saved] = useState(() => (typeof window === 'undefined' ? null : loadProgress()));
  const [progress, setProgress] = useState<Progress>(saved ?? EMPTY_PROGRESS);
  const [started, setStarted] = useState(saved !== null && isComplete(saved));
  // Фокус и прокрутка — только после действия человека, не при загрузке.
  const acted = useRef(false);
  const result = useMemo(() => (isComplete(progress) ? scoreAnswers(progress.answers) : null), [progress]);

  useEffect(() => {
    if (!acted.current || !started) return;
    if (result) {
      // Без фокуса скринридер не объявит результат, а Tab повёл бы мимо него.
      document.getElementById('values-test')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('values-result-heading')?.focus({ preventScroll: true });
    } else {
      document.getElementById('values-statement')?.focus({ preventScroll: true });
    }
  }, [progress, started, result]);

  const update = (next: Progress) => {
    acted.current = true;
    setProgress(next);
    saveProgress(next);
  };

  const begin = () => {
    clearProgress();
    reachGoal('values-test-start');
    setStarted(true);
    update(EMPTY_PROGRESS);
  };

  const resume = () => {
    acted.current = true;
    setStarted(true);
  };

  const onAnswer = (value: number) => {
    const next = answer(progress, value);
    if (isComplete(next)) reachGoal('values-test-complete');
    update(next);
  };

  let body: ReactNode;
  if (!started) {
    body = (
      <div data-testid="values-start" className="max-w-2xl rounded-2xl border border-paper-300 bg-paper-100 p-6">
        <p className="text-paper-800">{texts.start.meta}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {saved && !isComplete(saved) ? (
            <>
              <Button size="lg" onClick={resume}>
                {fillTemplate(texts.start.resume, { done: String(saved.answers.length), total: String(ITEMS.length) })}
              </Button>
              <Button size="lg" variant="outline" onClick={begin}>
                {texts.start.restart}
              </Button>
            </>
          ) : (
            <Button size="lg" onClick={begin}>
              {texts.start.begin}
            </Button>
          )}
        </div>
      </div>
    );
  } else if (result) {
    body = <ValuesResult texts={texts} result={result} onRestart={begin} />;
  } else {
    body = (
      <ValuesQuestion
        texts={texts}
        index={progress.index}
        chosen={progress.answers[progress.index]}
        onAnswer={onAnswer}
        onBack={() => update(back(progress))}
      />
    );
  }

  return (
    <div id="values-test" data-testid="values-test" className="ym-hide-content scroll-mt-20">
      {body}
    </div>
  );
}
```

- [ ] **Step 5: Типы и линтер**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/components/values/ValuesQuestion.tsx src/components/values/ValuesCircle.tsx src/components/values/ValuesResult.tsx src/components/values/ValuesTest.tsx
git commit -q -m "feat(values): тест на странице — утверждение с шестью ответами, круг картинкой, результат, переход к Оле

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(pnpm typecheck > /tmp/values-tsc.log 2>&1 && echo TSC_OK || (echo TSC_FAILED; grep "error TS" /tmp/values-tsc.log | head)); (./node_modules/.bin/eslint src/components/values src/lib src/content/values > /tmp/values-lint.log 2>&1 && echo LINT_OK || (echo LINT_FAILED; head -30 /tmp/values-lint.log))'
```

Expected: `TSC_OK`, `LINT_OK`.

---

### Task 11: Страница, пререндер и вход в браузере

**Files:**
- Create: `src/pages/ValuesTestPage.tsx`
- Modify: `src/entry-server.tsx`, `scripts/prerender.mjs`, `src/main.tsx`, `tests/i18n.spec.ts`, `src/theme/paper.js`

- [ ] **Step 1: Страница**

`src/pages/ValuesTestPage.tsx`:

```tsx
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/assistants/Breadcrumbs';
import JsonLd from '../components/assistants/JsonLd';
import ValuesTest from '../components/values/ValuesTest';
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from '../content/assistants/jsonLd';
import { homePath } from '../lib/assistantRoute';
import { valuesTestPath } from '../lib/valuesRoute';
import { VALUE_KEYS } from '../lib/schwartz';
import type { ValuesTexts } from '../content/values/types';

interface Props {
  texts: ValuesTexts;
  language: string;
}

/**
 * Тест ценностей — вход из поиска. В пререндере: вступление, карточка
 * старта, десять ценностей и вопросы; тест оживает в браузере. FadeIn нет
 * сознательно: в пререндере он отдаёт opacity-0. Без LanguageBanner: тест
 * пока только по-русски, как калькулятор.
 *
 * Вебвизор на этой странице выключен — подстановкой в scripts/prerender.mjs.
 */
export default function ValuesTestPage({ texts, language }: Props) {
  const { t } = useTranslation();
  const home = homePath(language);
  const crumbs: Crumb[] = [
    { name: t('assistantPages.home'), path: home },
    { name: texts.breadcrumb, path: valuesTestPath(language) },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-paper-50">
      <Header homeHref={home} />
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(texts.faq)]} />

      <main className="flex-1">
        <section className="bg-paper-100 border-b border-paper-300 pt-16">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <Breadcrumbs items={crumbs} />
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-paper-900 text-balance break-words hyphens-auto">
              {texts.h1}
            </h1>
            {/* Над тестом — только первый абзац: человек из поиска сразу видит,
                где начать. Остальное вступление — ниже; поисковик видит его целиком. */}
            <p className="mt-5 max-w-2xl text-lg text-paper-800 leading-relaxed">{texts.intro[0]}</p>
          </div>
        </section>

        <section aria-label={texts.breadcrumb} className="max-w-4xl mx-auto px-6 py-10 md:py-12">
          <ValuesTest texts={texts} />
        </section>

        {texts.intro.length > 1 && (
          <section data-testid="values-about" className="max-w-4xl mx-auto px-6 pb-10 md:pb-12">
            <div className="space-y-4 max-w-2xl">
              {texts.intro.slice(1).map((p) => (
                <p key={p} className="text-lg text-paper-800 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        <section
          aria-labelledby="values-model-heading"
          data-testid="values-model"
          className="bg-paper-100 border-y border-paper-300"
        >
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <h2 id="values-model-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
              {texts.modelSection.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-paper-800 leading-relaxed">{texts.modelSection.lead}</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {VALUE_KEYS.map((k) => (
                <li key={k} className="rounded-xl border border-paper-300 bg-paper-50 p-4">
                  <p className="font-semibold text-paper-900">{texts.values[k].name}</p>
                  <p className="mt-1 text-sm text-paper-700">{texts.values[k].line}</p>
                  <p className="mt-2 text-paper-800 leading-relaxed">{texts.values[k].text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="values-faq-heading" data-testid="values-faq" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 id="values-faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {texts.faqHeading}
          </h2>
          <div className="mt-4">
            {texts.faq.map((f) => (
              <details key={f.q} className="group border-b border-paper-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer list-none py-5 min-h-[60px]">
                  <span className="text-paper-900 font-semibold pr-4">{f.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="w-5 h-5 text-paper-600 group-open:rotate-180 transition-transform flex-shrink-0"
                  />
                </summary>
                <p className="pb-5 text-paper-800 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-12 text-xs text-paper-600">
          <p>{texts.disclaimer}</p>
        </section>
      </main>

      <Footer homeHref={home} />
    </div>
  );
}
```

- [ ] **Step 2: Функция пререндера**

`src/entry-server.tsx` — импорты под строками `import HumanDesignPage …` и `import { HD_TEXTS } …` соответственно:

```tsx
import ValuesTestPage from './pages/ValuesTestPage';
```

```tsx
import { VALUES_TEXTS } from './content/values/texts.server';
```

и в конец файла:

```tsx

/** Тест ценностей для пререндера: карточка старта, без прохождения. */
export function renderValuesTest(language: string): { html: string; title: string; description: string } {
  const texts = VALUES_TEXTS[language];
  if (!texts) throw new Error(`нет текстов теста ценностей на ${language}`);
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <ValuesTestPage texts={texts} language={language} />
    </I18nextProvider>,
  );
  return { html, title: texts.title, description: texts.description };
}
```

- [ ] **Step 3: Пререндер — страница, Вебвизор, sitemap, проверка бандла**

`scripts/prerender.mjs`:

1. В шапочный комментарий после абзаца про калькулятор:

```js
 * Тест ценностей (/tests/values/) — по своему списку языков,
 * valuesTestCodes() из values-test-languages.js. На его странице Вебвизор и
 * карта кликов выключены: подстановки webvisor:true → webvisor:false и
 * clickmap:true → clickmap:false только в её HTML.
 *
```

2. Импорты: под `import { hdCalcCodes } from './hd-calc-languages.js';` —

```js
import { valuesTestCodes } from './values-test-languages.js';
```

и в список из `./site-urls.mjs` после `hdCalcUrlFor as siteHdCalcUrlFor,` —

```js
  valuesTestUrlFor as siteValuesTestUrlFor,
```

3. После `const HD_CALC_CODES = hdCalcCodes();`:

```js

// Языки теста ценностей — так же.
const VALUES_TEST_CODES = valuesTestCodes();
```

4. После определения `hdCalcDirFor`:

```js
const valuesTestUrlFor = (code) => siteValuesTestUrlFor(code, DEFAULT_LANGUAGE);
const valuesTestDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'tests', 'values') : join(dist, code, 'tests', 'values');
```

5. Строка импорта функций рендера:

```js
const { render, renderAssistant, renderAssistantsCatalog, renderHdCalculator, renderValuesTest } = await import(
  join(root, 'dist-ssr', 'entry-server.js')
);
```

6. После цикла калькулятора (перед `const sitemap = [`):

```js
// Тест ценностей. Тест работает только в браузере; в пререндере — вступление,
// карточка старта, десять ценностей и вопросы. Вебвизор и карта кликов на
// странице выключены (спека 2026-10-12, «Приватность»): порядок утверждений
// общий для всех, и по последовательности кликов по шести кнопкам
// восстанавливаются ответы, среди них — о вере. Цели и посещаемость остаются.
for (const code of VALUES_TEST_CODES) {
  const where = `${code}/tests/values`;
  const rendered = renderValuesTest(code);
  if (!h1Of(rendered.html)) throw new Error(`${where}: нет <h1>`);
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, rendered.title, rendered.description);
  page = mustReplace(
    page,
    '</head>',
    () => `${headFor(code, rendered.title, rendered.description, null, valuesTestUrlFor, VALUES_TEST_CODES)}\n  </head>`,
    '</head>',
  );
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${rendered.html}</div>`, '<div id="root">');
  page = mustReplace(page, 'webvisor:true', () => 'webvisor:false', 'webvisor (тест ценностей)');
  page = mustReplace(page, 'clickmap:true', () => 'clickmap:false', 'clickmap (тест ценностей)');
  if (!page.includes('webvisor:false') || page.includes('webvisor:true')) {
    throw new Error(`${where}: Вебвизор на странице теста не выключен`);
  }
  if (!page.includes('clickmap:false') || page.includes('clickmap:true')) {
    throw new Error(`${where}: карта кликов на странице теста не выключена`);
  }

  const ld = jsonLdOf(rendered.html, where);
  const faqSection = rendered.html.match(/<section[^>]*data-testid="values-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  if (faqSection === undefined) throw new Error(`${where}: нет блока вопросов — текст не отрендерился`);
  const shown = (faqSection.match(/<details[\s>]/g) ?? []).length;
  const listed = oneOfType(ld, 'FAQPage', where).mainEntity?.length ?? 0;
  if (listed !== shown) {
    throw new Error(`${where}: в FAQPage ${listed} вопросов, а на странице ${shown} <details>`);
  }
  if (shown < 4) throw new Error(`${where}: вопросов ${shown}, нужно не меньше 4`);
  const model = rendered.html.match(/<section[^>]*data-testid="values-model"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  const valueCount = (model.match(/<li[\s>]/g) ?? []).length;
  if (valueCount !== 10) throw new Error(`${where}: описаний ценностей ${valueCount}, нужно 10`);
  if (!rendered.html.includes('data-testid="values-start"')) throw new Error(`${where}: нет карточки старта`);
  checkBreadcrumbs(ld, page, 2, where);

  writePage(valuesTestDirFor(code), page);
  console.log(`✅ ${where} (Вебвизор и карта кликов выключены)`);
}
```

7. Вызов `sitemapUrls` — пятым аргументом языки теста:

```js
  ...sitemapUrls(
    PUBLISHED_CODES,
    DEFAULT_LANGUAGE,
    { codes: ASSISTANT_CODES, slugs: ASSISTANT_SLUGS },
    { codes: HD_CALC_CODES },
    { codes: VALUES_TEST_CODES },
  ).map((loc) => `  <url><loc>${loc}</loc></url>`),
```

8. Проверка входного бандла — после блока `if (HD_CALC_CODES.includes(DEFAULT_LANGUAGE)) { … }`:

```js
  // Тест ценностей: H1 — из чанка текстов, сообщение об ошибке расчёта —
  // из чанка страницы (src/lib/schwartz/score.ts).
  if (VALUES_TEST_CODES.includes(DEFAULT_LANGUAGE)) {
    needles.push({ slug: 'тест ценностей (H1)', needle: textOf(renderValuesTest(DEFAULT_LANGUAGE).html) });
    needles.push({ slug: 'тест ценностей (расчёт)', needle: 'тест ценностей: нужно' });
  }
```

и в тексте ошибки этой проверки — `'динамическим импортом HumanDesignPage в src/main.tsx; …'` заменить на `'динамическим импортом HumanDesignPage и ValuesTestPage в src/main.tsx; …'`; итоговое сообщение — `` `✅ тексты ассистентов, калькулятор и тест ценностей не во входном бандле (${entryFiles.join(', ')})` ``.

- [ ] **Step 4: Вход в браузере**

`src/main.tsx` — импорты под `import { loadHdTexts } from './content/hd/load';`:

```tsx
import { parseValuesTestPath } from './lib/valuesRoute';
import { hasValuesTest } from './content/values/availability';
import { loadValuesTexts } from './content/values/load';
```

после строки `const hdRoute = parsedHd && hasHdCalculator(parsedHd.language) ? parsedHd : null;`:

```tsx
// Тест ценностей — так же: на невыпущенном языке рисуем главную.
const parsedValues = parseValuesTestPath(window.location.pathname);
const valuesRoute = parsedValues && hasValuesTest(parsedValues.language) ? parsedValues : null;
```

и ветку перед завершающим `} else {`:

```tsx
} else if (valuesRoute) {
  // Тест — отдельные чанки: страница с расчётом и тексты языка. Рисуем, когда
  // пришли оба: createRoot не гидратирует, ранний render заменил бы
  // пререндер пустым кадром.
  Promise.all([import('./pages/ValuesTestPage'), loadValuesTexts(valuesRoute.language)])
    .then(([{ default: ValuesTestPage }, texts]) => {
      // Не бывает: язык попадает в VALUES_TEST_CODES, только если есть его
      // модуль текстов (scripts/values-test-languages.js).
      if (!texts) return;
      root.render(
        <StrictMode>
          <ValuesTestPage texts={texts} language={valuesRoute.language} />
        </StrictMode>,
      );
    })
    .catch((error) => console.error('тест ценностей: чанк не загрузился, остаётся пререндер', error));
```

- [ ] **Step 5: Ожидание sitemap в Playwright и перечень «бумаги»**

`tests/i18n.spec.ts` — импорт под `import { hdCalcCodes } …`:

```ts
import { valuesTestCodes } from '../scripts/values-test-languages.js';
```

и в вызове `sitemapUrls` после `{ codes: hdCalcCodes() },`:

```ts
      { codes: valuesTestCodes() },
```

`src/theme/paper.js` — в перечне страниц после «(src/pages/HumanDesignPage.tsx и src/components/hd/)» дописать «, на странице теста ценностей (src/pages/ValuesTestPage.tsx и src/components/values/)».

- [ ] **Step 6: Сборка на ноде**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/pages/ValuesTestPage.tsx src/entry-server.tsx scripts/prerender.mjs src/main.tsx tests/i18n.spec.ts src/theme/paper.js
git commit -q -m "feat(values): страница /tests/values/ — пререндер с выключенным Вебвизором, sitemap, вход в браузере

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(pnpm build > /tmp/values-build.log 2>&1 && echo BUILD_OK || (echo BUILD_FAILED; tail -20 /tmp/values-build.log)); grep -E "tests/values|входном" /tmp/values-build.log; grep -o -E "(webvisor|clickmap):[a-z]*" dist/tests/values/index.html; grep -o -E "(webvisor|clickmap):[a-z]*" dist/index.html; grep -o "<loc>[^<]*tests[^<]*</loc>" dist/sitemap.xml; ls -l dist/assets/index-*.js; (pnpm typecheck > /tmp/values-tsc.log 2>&1 && echo TSC_OK || echo TSC_FAILED)'
```

Expected: `BUILD_OK`; строки `✅ ru/tests/values (Вебвизор и карта кликов выключены)` и `✅ тексты ассистентов, калькулятор и тест ценностей не во входном бандле`; `webvisor:false` и `clickmap:false` у теста, `webvisor:true` и `clickmap:true` у главной; в sitemap одна строка `https://linkeon.io/tests/values/`; входной бандл — не больше точки отсчёта Task 1 + 2 КБ; `TSC_OK`.

---

### Task 12: Входы на тест — страница Оли, главная, подвал

**Files:**
- Modify: `src/content/assistants/pages/ru/olia.ts`, `src/components/sections/Assistants.tsx`, `src/components/layout/Footer.tsx`, `src/i18n/locales/{ru,en,es,de,fr,zh,pt}.json`

- [ ] **Step 1: Вторая кнопка наверху страницы Оли**

`src/content/assistants/pages/ru/olia.ts` — после строки `  cta: 'Поговорить с Олей',`:

```ts
  heroLink: { text: 'Пройти тест ценностей бесплатно', href: '/tests/values/' },
```

Кнопка без `data-cta` — переход внутри сайта (так уже устроен `heroLink` в `AssistantPage.tsx`).

- [ ] **Step 2: Ключи переводов**

`check-locales` требует одинаковые ключи во всех семи локалях, поэтому ключи — везде (ссылки покажутся только на языках, где тест выпущен). Файлы форматированы как `JSON.stringify(…, null, 2)` — правка скриптом:

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
node -e '
const fs = require("fs");
const T = {
  ru: ["Тест ценностей", "Пройти тест ценностей бесплатно"],
  en: ["Values test", "Take the values test for free"],
  es: ["Test de valores", "Haz el test de valores gratis"],
  de: ["Wertetest", "Wertetest kostenlos machen"],
  fr: ["Test des valeurs", "Faire le test des valeurs gratuitement"],
  zh: ["价值观测试", "免费进行价值观测试"],
  pt: ["Teste de valores", "Fazer o teste de valores gratuitamente"],
};
const after = (obj, key, newKey, value) =>
  Object.fromEntries(Object.entries(obj).flatMap(([k, v]) => (k === key ? [[k, v], [newKey, value]] : [[k, v]])));
for (const [lang, [footer, assistants]] of Object.entries(T)) {
  const path = `src/i18n/locales/${lang}.json`;
  const json = JSON.parse(fs.readFileSync(path, "utf8"));
  json.footer.product = after(json.footer.product, "hdCalc", "valuesTest", footer);
  json.assistants = after(json.assistants, "hdCalc", "valuesTest", assistants);
  fs.writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
}
'
git diff --stat src/i18n/locales
```

Expected: семь файлов, по `2 insertions(+)` в каждом.

- [ ] **Step 3: Ссылка в разделе ассистентов на главной**

`src/components/sections/Assistants.tsx` — импорты под `import { hdCalcPath } from '../../lib/hdRoute';`:

```tsx
import { hasValuesTest } from '../../content/values/availability';
import { valuesTestPath } from '../../lib/valuesRoute';
```

и после блока ссылки на калькулятор (`{hasHdCalculator(i18n.language) && ( … )}`):

```tsx
          {hasValuesTest(i18n.language) && (
            <a href={valuesTestPath(i18n.language)} className="inline-flex items-center py-2 min-h-11 text-paper-800 hover:text-paper-900 font-semibold text-sm underline underline-offset-4">
              {t('assistants.valuesTest')}
            </a>
          )}
```

- [ ] **Step 4: Пункт подвала**

`src/components/layout/Footer.tsx` — импорты под `import { hdCalcPath } from '../../lib/hdRoute';`:

```tsx
import { hasValuesTest } from '../../content/values/availability';
import { valuesTestPath } from '../../lib/valuesRoute';
```

и после строки с `footer.product.hdCalc`:

```tsx
            ...(hasValuesTest(language) ? [{ label: t('footer.product.valuesTest'), href: valuesTestPath(language) }] : []),
```

- [ ] **Step 5: Проверка**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add src/content/assistants/pages/ru/olia.ts src/components/sections/Assistants.tsx src/components/layout/Footer.tsx src/i18n/locales/ru.json src/i18n/locales/en.json src/i18n/locales/es.json src/i18n/locales/de.json src/i18n/locales/fr.json src/i18n/locales/zh.json src/i18n/locales/pt.json
git commit -q -m "feat(values): входы на тест — кнопка наверху страницы Оли, ссылка в разделе ассистентов, пункт подвала

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh 'node scripts/check-locales.mjs | tail -2; (pnpm build > /tmp/values-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); grep -o "href=\"/tests/values/\"" dist/index.html | wc -l; grep -o "href=\"/tests/values/\"" dist/assistants/olia/index.html | wc -l; grep -o "href=\"/tests/values/\"" dist/en/index.html | wc -l'
```

Expected: `check-locales` — ✅; `BUILD_OK`; на главной `2` (раздел ассистентов и подвал), на странице Оли `2` и больше (кнопка наверху и подвал), на английской главной `0` — тест там не выпущен.

---

### Task 13: Проверки в сыром HTML и в браузере

**Files:**
- Create: `tests/values-test.spec.ts`

- [ ] **Step 1: Тест**

`tests/values-test.spec.ts`:

```ts
import { test, expect, request, type Page } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { valuesTestCodes } from '../scripts/values-test-languages.js';
import { valuesTestUrlFor } from '../scripts/site-urls.mjs';
import ru from '../src/content/values/texts/ru';
import { ITEMS, type ValueKey } from '../src/lib/schwartz';

const PATH = '/tests/values/';
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
const h1Of = (html: string) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';

// Сырой HTTP — так страницу видит краулер. Код ответа ничего не доказывает:
// SPA-фолбэк отдаёт 200 на любой путь, поэтому смотрим на содержимое.
test.describe('тест ценностей в сыром HTML', () => {
  test('страница, метатеги, hreflang, ценности в пререндере, Вебвизор и карта кликов выключены', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get(PATH)).text();
    const codes = valuesTestCodes();

    expect(html, 'отдана не страница теста').toContain('<html lang="ru"');
    expect(h1Of(html)).toBe(ru.h1);
    expect(count(html, /rel="canonical"/g)).toBe(1);
    expect(html).toContain(`<link rel="canonical" href="${valuesTestUrlFor('ru', DEFAULT_LANGUAGE)}"`);
    expect(count(html, /hreflang="/g), 'hreflang: языки теста + x-default').toBe(codes.length + 1);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html, 'описания ценностей — в пререндере').toContain(ru.values.universalism.text);
    expect(html, 'карточка старта — в пререндере').toContain('data-testid="values-start"');
    expect(html).toContain('webvisor:false');
    expect(html).not.toContain('webvisor:true');
    expect(html).toContain('clickmap:false');
    expect(html).not.toContain('clickmap:true');

    const home = await (await ctx.get('/')).text();
    expect(home, 'на главной Вебвизор должен остаться').toContain('webvisor:true');
    expect(home, 'на главной карта кликов должна остаться').toContain('clickmap:true');
    await ctx.dispose();
  });

  test('на тест ведут главная (раздел ассистентов и подвал) и верх страницы Оли', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const home = await (await ctx.get('/')).text();
    const footer = home.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? '';
    expect(footer, 'в подвале главной нет ссылки на тест').toContain(`href="${PATH}"`);
    const assistants = home.match(/<section[^>]*id="assistants"[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(assistants, 'в разделе ассистентов нет ссылки на тест').toContain(`href="${PATH}"`);
    const olia = await (await ctx.get('/assistants/olia/')).text();
    const hero = olia.match(/<main[^>]*>\s*<section[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(hero, 'наверху страницы Оли нет кнопки теста').toContain(`href="${PATH}"`);
    await ctx.dispose();
  });

  test('sitemap: тест только на выпущенных языках', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const xml = await (await ctx.get('/sitemap.xml')).text();
    for (const code of valuesTestCodes()) expect(xml).toContain(`<loc>${valuesTestUrlFor(code, DEFAULT_LANGUAGE)}</loc>`);
    expect(count(xml, /\/tests\/values\//g)).toBe(valuesTestCodes().length);
    await ctx.dispose();
  });
});

/** Пререндер не гидратируется: ждём, пока React перерисует H1 (см. hd-calculator.spec.ts). */
async function clientRendered(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 !== null && Object.keys(h1).some((key) => key.startsWith('__reactFiber$'));
      }),
    )
    .toBe(true);
}

interface Captured {
  ym: unknown[][];
  events: string[];
}

/**
 * Чужие адреса — заглушки; Метрика и события пишутся в массивы, чтобы
 * проверить, что туда уходят только имена целей. my.linkeon.io/chat — пустая
 * страница: нужен лишь адрес, на который ушёл переход.
 */
async function stubNetwork(page: Page, baseURL: string): Promise<Captured> {
  const captured: Captured = { ym: [], events: [] };
  const own = new URL(baseURL).origin;
  await page.exposeFunction('__captureYm', (args: unknown[]) => void captured.ym.push(args));
  await page.addInitScript(() => {
    const w = window as unknown as { ym: (...a: unknown[]) => void; __captureYm: (a: unknown[]) => void };
    w.ym = (...args: unknown[]) => w.__captureYm(args);
  });
  await page.route(
    (url) => url.origin !== own,
    (route) => {
      const url = new URL(route.request().url());
      if (url.pathname === '/webhook/events/track') captured.events.push(route.request().postData() ?? '');
      if (url.origin === 'https://my.linkeon.io' && url.pathname === '/chat') {
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>чат</title>' });
      }
      const type = route.request().resourceType();
      return route.fulfill({
        status: 200,
        contentType: type === 'stylesheet' ? 'text/css' : type === 'script' ? 'text/javascript' : 'text/plain',
        body: '',
        headers: { 'access-control-allow-origin': '*' },
      });
    },
  );
  return captured;
}

/** Кнопка ответа: подписи шкалы — ответы 1…6 по порядку. */
const answerButton = (page: Page, value: number) =>
  page.getByTestId('values-question').getByRole('button', { name: ru.question.scale[value - 1], exact: true });

/** Ответить на утверждения с from-го по to-е (с нуля), дожидаясь каждого. */
async function answerRange(page: Page, from: number, to: number, pick: (value: ValueKey, i: number) => number) {
  for (let i = from; i < to; i += 1) {
    await expect(page.getByTestId('values-progress-label')).toHaveText(`${i + 1} из ${ITEMS.length}`);
    await answerButton(page, pick(ITEMS[i].value, i)).click();
  }
}

const PERSONA: Partial<Record<ValueKey, number>> = { selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 };
const persona = (v: ValueKey) => PERSONA[v] ?? 3;
const goalsOf = (captured: Captured) => captured.ym.filter((a) => a[1] === 'reachGoal').map((a) => a[2]);

async function begin(page: Page) {
  await page.goto(PATH);
  await clientRendered(page);
  await page.getByRole('button', { name: ru.start.begin, exact: true }).click();
}

test.describe('тест в браузере', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  // Кнопки ответа заблокированы 250 мс после смены утверждения (защита от
  // двойного тапа): полный проход — не меньше 30 × 250 мс, с перезагрузкой дольше.
  test.describe.configure({ timeout: 60_000 });

  test('на чужом HTML тест не запускается: /ru/tests/values/ уводит на канонический адрес', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    // dist/ru/tests/values/ нет — сервер отдаёт главную с Вебвизором; тест на ней запускаться не должен.
    await page.goto('/ru/tests/values/');
    await page.waitForURL((url) => url.pathname === PATH);
    await clientRendered(page);
    await expect(page.getByTestId('values-start')).toBeVisible();
    const html = await page.content();
    expect(html).toContain('webvisor:false');
  });

  test('прохождение: ведущие ценности, ссылка к Оле с черновиком, в аналитику — только имена целей', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, ITEMS.length, persona);

    await expect(page.getByTestId('values-result')).toBeVisible();
    await expect(page.locator('#values-result-heading')).toBeFocused();
    await expect(page.getByTestId('values-top').locator('li')).toHaveCount(3);
    for (const k of ['selfDirection', 'stimulation', 'benevolence'] as const) {
      await expect(page.getByTestId('values-top')).toContainText(ru.values[k].name);
    }
    await expect(page.getByTestId('values-bottom')).toContainText(ru.values.power.name);
    await expect(page.getByTestId('values-axes')).toHaveText(`${ru.axes.change.left} ${ru.axes.focus.left}`);
    await expect(page.getByTestId('values-all').locator('li')).toHaveCount(10);

    // Вторая линия от Вебвизора; круг — картинкой с общими словами в alt.
    await expect(page.getByTestId('values-test')).toHaveClass(/\bym-hide-content\b/);
    await expect(page.getByTestId('values-circle')).toHaveAttribute('src', /^data:image\/svg\+xml/);
    await expect(page.getByTestId('values-circle')).toHaveAttribute('alt', ru.result.circleAlt);

    const cta = page.locator('[data-cta="values-test-to-olia"]');
    const href = (await cta.getAttribute('href')) ?? '';
    expect(href, 'в href не должно быть черновика').not.toContain('#');
    expect(new URL(href).searchParams.get('assistant')).toBe('2');

    await cta.click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const url = new URL(page.url());
    expect(url.searchParams.get('assistant')).toBe('2');
    expect(url.searchParams.get('utm_content')).toBe('values-test');
    expect(url.hash.startsWith('#draft=')).toBe(true);
    const draft = decodeURIComponent(url.hash.slice('#draft='.length));
    for (const k of ['selfDirection', 'stimulation', 'benevolence', 'power'] as const) {
      expect(draft).toContain(ru.values[k].inMessage);
    }
    expect(draft).toContain(ru.axesInMessage.change.left);

    const goals = goalsOf(captured);
    expect(goals).toEqual(expect.arrayContaining(['values-test-start', 'values-test-complete', 'values-test-to-olia']));
    expect(goals.filter((g) => g === 'values-test-complete')).toHaveLength(1);
    const sent = JSON.stringify(captured.ym) + captured.events.join('\n');
    for (const k of ['selfDirection', 'power'] as const) {
      expect(sent, `«${ru.values[k].inMessage}» ушло в аналитику`).not.toContain(ru.values[k].inMessage);
    }
    // Канал событий жив: клик к Оле дошёл как landing_cta_click — иначе проверка
    // «начало и завершение не в таблице» смотрела бы в пустой массив.
    expect(captured.events.some((e) => e.includes('landing_cta_click') && e.includes('values-test-to-olia'))).toBe(true);
    expect(captured.events.join('\n')).not.toContain('values-test-start');
    expect(captured.events.join('\n')).not.toContain('values-test-complete');
  });

  test('«Назад» показывает прежний ответ; перезагрузка — «Продолжить» с того же места', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, 5, (_, i) => 6 - i);
    await expect(page.getByTestId('values-progress-label')).toHaveText(`6 из ${ITEMS.length}`);
    await page.getByRole('button', { name: ru.question.back }).click();
    await expect(page.getByTestId('values-progress-label')).toHaveText(`5 из ${ITEMS.length}`);
    await expect(answerButton(page, 2)).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await clientRendered(page);
    const resume = ru.start.resume.replace('{done}', '5').replace('{total}', String(ITEMS.length));
    await page.getByRole('button', { name: resume }).click();
    await expect(page.getByTestId('values-progress-label')).toHaveText(`5 из ${ITEMS.length}`);
    await expect(answerButton(page, 2)).toHaveAttribute('aria-pressed', 'true');
  });

  test('одинаковые ответы — «приоритеты не выделились» и своё сообщение Оле', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, ITEMS.length, () => 4);
    await expect(page.getByTestId('values-flat')).toContainText(ru.result.flatHeading);
    await expect(page.getByTestId('values-top')).toHaveCount(0);
    await page.locator('[data-cta="values-test-to-olia"]').click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    expect(decodeURIComponent(new URL(page.url()).hash.slice('#draft='.length))).toBe(ru.messageFlat);
  });

  test('полная ничья — помечена под карточками и в сообщении Оле', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await begin(page);
    const tie: Partial<Record<ValueKey, number>> = { selfDirection: 6, stimulation: 6, benevolence: 5, universalism: 5 };
    await answerRange(page, 0, ITEMS.length, (v) => tie[v] ?? 3);
    await expect(page.getByTestId('values-top').getByTestId('values-tie')).toHaveText(
      ru.result.tiedWith.replace('{names}', ru.values.universalism.name),
    );
    await expect(page.getByTestId('values-bottom').getByTestId('values-tie')).toContainText(ru.values.hedonism.name);
    await page.locator('[data-cta="values-test-to-olia"]').click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const draft = decodeURIComponent(new URL(page.url()).hash.slice('#draft='.length));
    expect(draft).toContain(ru.tiedInMessage.replace('{names}', ru.values.universalism.inMessage));
  });

  test('пройденный тест после перезагрузки — сразу результат, цель не повторяется; «Пройти заново»', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await begin(page);
    await answerRange(page, 0, ITEMS.length, persona);
    await expect(page.getByTestId('values-result')).toBeVisible();

    await page.reload();
    await clientRendered(page);
    await expect(page.getByTestId('values-result')).toBeVisible();
    expect(goalsOf(captured).filter((g) => g === 'values-test-complete')).toHaveLength(1);

    await page.getByRole('button', { name: ru.result.restart }).click();
    await expect(page.getByTestId('values-progress-label')).toHaveText(`1 из ${ITEMS.length}`);
    expect(goalsOf(captured).filter((g) => g === 'values-test-start')).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Прогон**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git add tests/values-test.spec.ts
git commit -q -m "test(values): тест ценностей в сыром HTML и в браузере — прохождение, «Назад», перезагрузка, ровный профиль, цели

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(CI=1 ./node_modules/.bin/playwright test tests/values-test.spec.ts tests/i18n.spec.ts > /tmp/values-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED); grep -E "passed|failed|✘" /tmp/values-e2e.log | head -20'
```

Expected: `E2E_OK`, все тесты обоих файлов прошли.

- [ ] **Step 3: Проверка не слепая**

Зелёный прогон ничего не доказывает, пока проверку не сломали нарочно. Временные коммиты — только на ноду, в `origin` не уходят, после прогона снимаются `reset`.

Сначала — поломки, которые должен поймать браузерный тест: оси в черновике через пробел вместо «; » и цель `values-test-complete` на каждом ответе.

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
sed -i '' "s/.join('; '),/.join(' '),/" src/lib/valuesDraft.ts
sed -i '' "s/if (isComplete(next)) reachGoal('values-test-complete');/reachGoal('values-test-complete');/" src/components/values/ValuesTest.tsx
git diff --stat
git commit -q -am "tmp: нарочная поломка — e2e должен её увидеть"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(CI=1 ./node_modules/.bin/playwright test tests/values-test.spec.ts > /tmp/values-e2e-broken.log 2>&1 && echo E2E_OK || echo E2E_FAILED); grep -E "✘|passed|failed" /tmp/values-e2e-broken.log | head'
git reset -q --hard HEAD~1
```

Expected: `git diff --stat` — два файла; `E2E_FAILED`, красные — «прохождение…» и «пройденный тест после перезагрузки…».

Потом — Вебвизор: подстановка, которая ничего не выключает, должна остановить сборку.

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
sed -i '' "s/() => 'webvisor:false', 'webvisor (тест ценностей)'/() => 'webvisor:true', 'webvisor (тест ценностей)'/" scripts/prerender.mjs
git diff --stat
git commit -q -am "tmp: нарочная поломка — сборка должна остановиться"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(pnpm build > /tmp/values-build-broken.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); grep -o "Вебвизор на странице теста не выключен" /tmp/values-build-broken.log'
git reset -q --hard HEAD~1
git log --oneline -1
```

Expected: `BUILD_FAILED` и строка «Вебвизор на странице теста не выключен». После `reset` последний коммит — Step 2. Если какую-то поломку проверка не заметила — дописать проверку, а не идти дальше.

---

### Task 14: Проверка перед выкатом (СТОП 3)

- [ ] **Step 1: Ветка догнала main**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git fetch -q origin
git merge -q origin/main    # если main лендинга ушёл вперёд; конфликты разобрать, тесты ниже их покажут
git log --oneline -3
```

- [ ] **Step 2: Всё зелёное на ноде**

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(pnpm test:unit > /tmp/values-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED); grep -E "Test Files|Tests " /tmp/values-unit.log; node scripts/check-locales.mjs | tail -2; (pnpm typecheck > /tmp/values-tsc.log 2>&1 && echo TSC_OK || echo TSC_FAILED); (./node_modules/.bin/eslint . > /tmp/values-lint.log 2>&1 && echo LINT_OK || echo LINT_FAILED); grep -c error /tmp/values-lint.log; (CI=1 pnpm test > /tmp/values-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED); tail -3 /tmp/values-e2e.log; ls -l dist/assets/index-*.js'
```

Expected: `UNIT_OK` (тестов больше точки отсчёта Task 1 на новые файлы); `check-locales` — ✅; `TSC_OK`; `LINT_OK` (старые предупреждения в `scripts/capture*.ts` — не наши); `E2E_OK` — весь Playwright, не только новый файл; входной бандл — не больше точки отсчёта + 2 КБ.

- [ ] **Step 3: Скриншоты для владельца**

`~/Downloads/land_linkeon/.superpowers/values-test/shots.mjs` (на ноду едет на время прогона, в репозиторий не кладётся):

```js
// Скриншоты теста ценностей для владельца. Запуск на ноде из корня
// воркдерева при работающем `pnpm preview --port 4173`.
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173';
const SCALE = ['Совсем не похож на меня', 'Не похож на меня', 'Немного похож', 'Отчасти похож', 'Похож на меня', 'Очень похож на меня'];
// Порядок утверждений — src/lib/schwartz/items.ts; ответ — по ценности.
const ORDER = ['selfDirection', 'power', 'benevolence', 'stimulation', 'security', 'achievement', 'universalism', 'tradition', 'hedonism', 'conformity',
  'achievement', 'universalism', 'selfDirection', 'conformity', 'stimulation', 'tradition', 'power', 'hedonism', 'security', 'benevolence',
  'tradition', 'stimulation', 'power', 'universalism', 'hedonism', 'benevolence', 'conformity', 'selfDirection', 'achievement', 'security'];
const PERSONA = { selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 };

async function answerAll(page, pick) {
  for (let i = 0; i < ORDER.length; i += 1) {
    await page.getByTestId('values-progress-label').filter({ hasText: `${i + 1} из 30` }).waitFor();
    await page.getByTestId('values-question').getByRole('button', { name: SCALE[pick(ORDER[i]) - 1], exact: true }).click();
  }
}

const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [1280, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, locale: 'ru-RU' });
  await page.route((url) => !url.href.startsWith(BASE), (route) => route.fulfill({ status: 200, body: '' }));

  await page.goto(`${BASE}/tests/values/`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/values-${w}-1-top.png` });
  await page.getByRole('button', { name: 'Начать', exact: true }).click();
  for (const [i, v] of [6, 4, 2].entries()) {
    await page.getByTestId('values-progress-label').filter({ hasText: `${i + 1} из 30` }).waitFor();
    await page.getByTestId('values-question').getByRole('button', { name: SCALE[v - 1], exact: true }).click();
  }
  await page.getByTestId('values-progress-label').filter({ hasText: '4 из 30' }).waitFor();
  await page.screenshot({ path: `/tmp/values-${w}-2-question.png` });
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(`${BASE}/tests/values/`);
  await page.getByRole('button', { name: 'Начать', exact: true }).click();
  await answerAll(page, (v) => PERSONA[v] ?? 3);
  await page.getByTestId('values-result').waitFor();
  await page.waitForTimeout(800);
  await page.getByTestId('values-test').screenshot({ path: `/tmp/values-${w}-3-result.png` });

  await page.evaluate(() => sessionStorage.clear());
  await page.goto(`${BASE}/tests/values/`);
  await page.getByRole('button', { name: 'Начать', exact: true }).click();
  await answerAll(page, () => 4);
  await page.getByTestId('values-flat').waitFor();
  await page.getByTestId('values-test').screenshot({ path: `/tmp/values-${w}-4-flat.png` });

  await page.goto(`${BASE}/assistants/olia/`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/values-${w}-5-olia.png` });
  await page.close();
}
await browser.close();
console.log('снимки: /tmp/values-*.png');
```

```bash
SSHO='-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h'
D=~/Downloads/land_linkeon/.superpowers/values-test
scp $SSHO $D/shots.mjs dv@85.192.61.231:ci/wt/values-test/values-shots.mjs
bash $D/node-ssh.sh 'cd ~/ci/wt/values-test && source ~/.nvm/nvm.sh && rm -f /tmp/values-*.png && pnpm build > /tmp/values-build.log 2>&1 && (fuser -k 4173/tcp >/dev/null 2>&1 || true) && (pnpm preview --port 4173 > /tmp/values-preview.log 2>&1 &) && sleep 3 && node values-shots.mjs; fuser -k 4173/tcp >/dev/null 2>&1 || true; rm -f values-shots.mjs; ls /tmp/values-*.png'
mkdir -p $D/shots
scp $SSHO 'dv@85.192.61.231:/tmp/values-*.png' $D/shots/
```

Expected: 10 файлов (по 5 на 390 и 1280 px): верх страницы, вопрос с полосой прогресса, результат целиком, «приоритеты не выделились», страница Оли с двумя кнопками. Посмотреть самому: на 390 px нет горизонтальной прокрутки, подписи круга читаются и не обрезаны, кнопки ответов во всю ширину, «Разобрать с Олей» видна.

- [ ] **Step 4: СТОП 3 — взгляд владельца**

Показать владельцу одним сообщением: папку `~/Downloads/land_linkeon/.superpowers/values-test/shots/`, итог Step 2 (числа тестов, размер входного бандла против точки отсчёта, размер чанка страницы теста), итог слепой разметки из Task 6. Правки по скриншотам — отдельными коммитами с повтором Step 2.

---

### Task 15: Слияние и выкат (СТОП 2)

Кабинет не выкатывается: черновик для любого ассистента уже на проде.

- [ ] **Step 1: Слить в main и проверить коммит слияния**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-test
git fetch -q origin
git checkout -q --detach origin/main
git merge --no-ff feat/values-test -m "Merge feat/values-test: тест ценностей по Шварцу — 30 утверждений, круг ценностей, переход к Оле с черновиком

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-run.sh '(pnpm test:unit > /tmp/values-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED); (pnpm build > /tmp/values-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); grep -E "tests/values|входном" /tmp/values-build.log; (CI=1 pnpm test > /tmp/values-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED)'
git push origin HEAD:main > /tmp/values-push.log 2>&1; echo "push exit $?"; cat /tmp/values-push.log
git rev-parse HEAD
```

Expected: `UNIT_OK`, `BUILD_OK` с двумя строками ✅ про тест, `E2E_OK`; `push exit 0`; записать SHA. Push — отдельной командой с проверкой кода: в цепочке через `| tail` неудачный push уже выглядел удачным. Сборка этого коммита на ноде обязательна: `deploy.sh` собирает лендинг на проде через `| tail`, и упавшая сборка там выкат не остановит.

- [ ] **Step 2: СТОП 2 — согласие владельца**

Напомнить: только лендинг (`LANDING_ONLY=1`), фазы test у лендинга нет, API не перезапускается, кабинет не меняется; сборка коммита SHA зелёная. Без «да» не выкатывать.

- [ ] **Step 3: Выкат с ноды со свежих клонов**

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-ssh.sh 'pgrep -fa "^bash scripts/deploy.sh" || echo "чужих выкатов нет"'
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-ssh.sh 'set -e
NAME=values-test-landing-$(date +%m%d-%H%M)
mkdir -p ~/deploy-clones/$NAME ~/deploy-logs
git clone -q --branch main git@github.com:dvvolkovv/spirits_back.git ~/deploy-clones/$NAME/spirits_back
git clone -q --branch main git@github.com:dvvolkovv/land_linkeon.git ~/deploy-clones/$NAME/land_linkeon
git -C ~/deploy-clones/$NAME/land_linkeon log --oneline -1
source ~/.nvm/nvm.sh
cd ~/deploy-clones/$NAME/spirits_back
LANDING_ONLY=1 LOCAL_BACK_DIR=$PWD LOCAL_LAND_DIR=~/deploy-clones/$NAME/land_linkeon setsid -f bash -c "echo \$\$ > ~/deploy-logs/$NAME.pid; exec bash scripts/deploy.sh" > ~/deploy-logs/$NAME.log 2>&1 < /dev/null
echo $NAME'
```

Expected: если первая команда показала чужой `deploy.sh` — ждать его конца, не запускать параллельно. `log --oneline -1` в клоне — SHA из Step 1 (иначе в `main` успели влить чужое — остановиться и повторить Step 1). Следить: `bash …/node-ssh.sh 'tail -3 ~/deploy-logs/<NAME>.log; kill -0 $(cat ~/deploy-logs/<NAME>.pid) && echo идёт || echo закончился'`. Итог в логе — `✓ SMOKE GREEN (landing)` и `ALL PHASES GREEN`.

- [ ] **Step 4: Проверка на проде по содержимому**

С мака прод не открывается (исходящий адрес мака режет Selectel) — проверка с ноды:

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-ssh.sh 'SITE=https://linkeon.io
curl -s $SITE/tests/values/ | grep -o -E "<html lang=\"[a-z]+\"|<h1[^>]*>[^<]{0,80}|rel=\"canonical\" href=\"[^\"]+\"|hreflang=\"[a-z-]+\"|(webvisor|clickmap):[a-z]+" | sort -u
curl -s -o /dev/null -w "%{http_code} → %{redirect_url}\n" $SITE/tests/values
curl -s $SITE/sitemap.xml | grep -o "<loc>[^<]*tests[^<]*</loc>"
curl -s $SITE/ | grep -o -E "href=\"/tests/values/\"|(webvisor|clickmap):[a-z]+" | sort | uniq -c
curl -s $SITE/assistants/olia/ | grep -o "href=\"/tests/values/\"" | sort | uniq -c'
```

Плюс проверка по сети в обе стороны (браузерными инструментами с ноды): на `https://linkeon.io/tests/values/` после «Начать» и пяти-шести ответов — ни одного запроса к `mc.yandex.ru/webvisor/105902201` и `mc.yandex.ru/clmap/105902201` и никаких целей на каждый клик; на главной те же запросы есть (фильтр не слепой). Нашлись запросы на странице теста — выкат откатить и разбираться: параметров `init` недостаточно.

`grep -c` по HTML не годится: пререндер — одна длинная строка. Expected: `<html lang="ru"`, H1 теста, `canonical` — `https://linkeon.io/tests/values/`, hreflang только `ru` и `x-default`, `webvisor:false` и `clickmap:false`; адрес без слэша — `301 → https://linkeon.io/tests/values/`; в sitemap одна строка теста; на главной ссылка дважды, `webvisor:true` и `clickmap:true`; на странице Оли — ссылка (кнопка наверху и подвал).

---

### Task 16: После выката

- [ ] **Step 1: Живой проход до Оли**

С ноды, браузерными инструментами или скриптом Playwright из служебного каталога (вход — тестовым аккаунтом по разделу «Тестовые аккаунты» CLAUDE.md кабинета; способ входа в репозиторий и в этот план не записывать): открыть `https://linkeon.io/tests/values/`, пройти тест ответами «персоны» (самостоятельность, стимуляция, доброта — «очень похож», власть — «совсем не похож», остальное — «немного похож»), убедиться, что результат как в e2e. Нажать «Разобрать с Олей» → в кабинете открыт чат с Олей, в поле ввода — черновик, автоприветствия нет, в адресной строке нет `#draft`. Отправить сообщение и дождаться ответа Оли.

Записать в журнал: опирается ли Оля на результат (называет ведущие ценности, связывает их с напряжениями) или начинает своё исследование с нуля. Во втором случае — сказать владельцу и предложить отдельную задачу на инструкцию Оли (только с его OK; цитаты инструкции в репозиторий не класть).

- [ ] **Step 2: СТОП — шаги владельца**

Передать владельцу:
- Метрика, счётчик лендинга 105902201: цели «JavaScript-событие» `values-test-start` (начал тест), `values-test-complete` (ответил на все 30), `values-test-to-olia` (клик «Разобрать с Олей»).
- Яндекс.Вебмастер и Google Search Console: переобход `https://linkeon.io/tests/values/` и `sitemap.xml`.

- [ ] **Step 3: Как смотреть результат — в спеку**

Дописать в раздел «Аналитика» спеки `docs/superpowers/specs/2026-10-12-values-test-design.md` подраздел «Как смотреть результат (после выката <дата>)»: доля завершивших — конверсия `values-test-complete` к `values-test-start` в Метрике; доля перешедших к Оле — `values-test-to-olia` к `values-test-complete`; переходы по дням и регистрации — запросами ниже (выполнить один раз сразу после выката, подключение к базе — вне репозитория; должны вернуть хотя бы собственный проверочный переход):

```sql
-- переходы к Оле по дням, 30 дней
select date_trunc('day', ts) as day, count(*) as to_olia
from events
where name = 'landing_cta_click'
  and props->>'cta' = 'values-test-to-olia'
  and ts > now() - interval '30 days'
group by 1 order by 1;

-- регистрации по метке теста; тестовые аккаунты исключить предикатом
-- excludeTestUsersSql('user_id') из spirits_back/src/admin/admin.service.ts
select count(*)
from ai_profiles_consolidated
where signup_campaign like '%values-test%';
```

Коммит в `main` лендинга: `docs(spec): тест ценностей — как смотреть результат после выката`.

- [ ] **Step 4: Заметки в память**

Новая заметка `project_values_test`: тест ценностей на `linkeon.io/tests/values/` с даты выката — модуль `src/lib/schwartz/` (расчёт в целых суммах, пороги 0,5), тексты `src/content/values/texts/ru.ts` (утверждения проверены слепой разметкой), Вебвизор на странице выключен подстановкой в `prerender.mjs`, черновик Оле — `chatDraft.ts`, цели, итог живого прохода до Оли. В заметке калькулятора (`project_hd_calculator`) — строка, что общая часть черновика теперь в `chatDraft.ts`. Строки в `MEMORY.md`.

- [ ] **Step 5: Убрать воркдерево и временное**

```bash
git -C ~/Downloads/land_linkeon worktree remove .worktrees/values-test
bash ~/Downloads/land_linkeon/.superpowers/values-test/node-ssh.sh 'git -C ~/ci/land_linkeon worktree remove --force ~/ci/wt/values-test; git -C ~/ci/land_linkeon branch -D tmp/values-test; rm -rf ~/deploy-clones/values-test-landing-*'
```

Ветку `feat/values-test` в локальном репозитории оставить до «ок» владельца после выката.
