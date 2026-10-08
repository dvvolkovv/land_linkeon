# Калькулятор Human Design на linkeon.io — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** бесплатный расчёт Human Design на `linkeon.io/calculators/human-design/` (по-русски): форма → бодиграф с короткими описаниями → кнопка «Разобрать с Райей», которая открывает чат с готовым черновиком первого сообщения — и черновик переживает вход в кабинет.

**Architecture:** чистый TypeScript-модуль `src/lib/human-design/` (эфемериды astronomy-engine, колесо ворот, правила, перевод местного времени через `Intl`, схема строкой SVG) с явным публичным интерфейсом — его же второй этап возьмёт на бэкенд. Страница лендинга — отдельные ленивые чанки (код и тексты), пререндер даёт поисковику вводный текст, пять типов и FAQ. Кабинет `spirits_front` забирает `#draft=` скриптом в `index.html` до Метрики и подставляет текст в поле ввода чата с Райей. Точность — эталон Swiss Ephemeris (300 рождений) плюс 10 карт ручной сверки.

**Tech Stack:** лендинг — React 18, TypeScript, Vite 5, Tailwind, i18next, vitest (node), Playwright; `astronomy-engine` 2.1.19 (MIT); эталон — Python 3.12 + pyswisseph 2.10.3.2 (только на ноде, не в продукте); города — GeoNames (CC BY 4.0). Кабинет — React Router 6, vitest + jsdom.

**Спека:** [docs/superpowers/specs/2026-10-08-human-design-calculator-design.md](../specs/2026-10-08-human-design-calculator-design.md)

---

## Что выяснено при подготовке плана (08.10.2026)

Всё ниже проверено прототипом на тестовой ноде: код модуля, страницы и кабинета из этого плана собран в черновых воркдеревьях от `6aa5ab1` (лендинг) и `fa29492` (кабинет). Юнит-тесты лендинга (1986), `tsc`, `eslint`, `pnpm build` с пререндером и Playwright (56 тестов) — зелёные; кабинет — 1235 тестов, ошибок `tsc` столько же, сколько на `main` (45).

1. **Истинный узел по формулам Миуса не годится.** Средний узел + пять периодических членов (Миус, гл. 47) расходится с `SE_TRUE_NODE` Swiss Ephemeris до **16,5′** (3000 случайных дат 1920–2025: медиана 3,2′, p95 8,7′). Линия — 56′15″, так что каждая двадцатая активация узла расходилась бы с Райей, и условие выката не выполнилось бы. План считает **оскулирующий узел** — пересечение мгновенной плоскости лунной орбиты (r × v из `GeoMoonState`) с истинной эклиптикой даты, как сам `SE_TRUE_NODE`: расхождение до **16″**.
2. **Точность остального.** astronomy-engine против Swiss Ephemeris (файлы `sepl_18`/`semo_18`): Солнце до 2,4″, Луна до 4,8″, планеты до 20″ (Нептун систематически ~11″), Плутон до 3,4″; момент дизайна — до 71 с (это Луна дизайна до ~40″). На прототипе эталона: 7800 активаций, **0 расхождений вне пограничных**, 8 пограничных (ближе 1′ к границе линии).
3. **Колесо ворот** сверено с двумя независимыми таблицами градусов (barneyandflow.com/gate-zodiac-degrees, bonniesorsby.com/human-design-gates-by-degree) — совпало полностью; 36 каналов — с gethumandesign.com/docs/channels.
4. **Города.** В `cities15000` сейчас **34 155** городов (не 26 тысяч), русские названия у 18 765, поясов 356. Компактный JSON — **1 553 482 байта, gzip −9 — 582 КБ**: цель «до 1 МБ сжатым» выполнена.
5. **nginx лендинга не сжимает JS и JSON** — только HTML (замер 08.10: `index-*.js` отдаётся 528 817 байт без `Content-Encoding`). Значит, база городов уйдёт человеку 1,5 МБ как есть, а сам лендинг — 529 КБ. Включить `gzip_types` для `application/javascript` и `application/json` — отдельное решение владельца (правка прод-nginx), в этот план не входит; вопрос задаётся в Task 27.
6. **Метрика лендинга** инициализирована с `webvisor:true, trackLinks:true`: и Вебвизор, и отслеживание внешних ссылок читают `href`. Поэтому черновик (`#draft=…`) в разметку не попадает вовсе — ссылка собирается в момент клика.
7. **Классы Вебвизора** (yandex.ru/support/metrica/ru/webvisor/settings, сверено 08.10): `ym-disable-keys` — для `input` и `textarea`, содержимое заменяется звёздочками; `ym-hide-content` — для любого элемента и всех его потомков. Про атрибуты (`href`) документация молчит — ещё одна причина держать данные вне атрибутов.
8. **Кабинет пишет Вебвизором всё поле ввода чата** — масок там нет. Подставленный черновик ушёл бы в Метрику раньше, чем человек решит его отправить, поэтому поле ввода получает `ym-disable-keys` (Task 16; это меняет записи Вебвизора для всех сообщений — владелец решает на стоп-точке выката кабинета).
9. **pyswisseph** колёс под ноду не имеет и собирается из исходников, а у системного Python 3.12 нет `Python.h` и `ensurepip`. Рабочий путь без sudo — `uv` с управляемым Python (Task 10).
10. **tsx не видит именованных экспортов astronomy-engine** (`does not provide an export named 'Body'`); обычный `node` и сборка Vite — видят. Скрипт подбора карт ручной сверки запускается сборкой `vite build --ssr` и `node` (Task 11).
11. **Кабинет:** `pnpm lint` на `main` сломан (нет `eslint-plugin-i18next`), `pnpm check-hardcoded` на `main` красный (две старые находки в `formatters.ts`), `tsc` — 45 старых ошибок. Мерить дельтой, не абсолютом.
12. **Входной бандл** лендинга с калькулятором — 530 074 байта против 528 817 на `main`: +1,3 КБ на разбор адреса, флаг языка и пункт подвала. Сам калькулятор (73 КБ, из них astronomy-engine ~50 КБ) и тексты — в своих чанках.
13. **Пример из спеки** («12.03.1990, 14:25, Казань → Генератор, 3/5, сакральный») иллюстративный: этот момент даёт Манифестора, 5/2, эмоциональный авторитет (26 активаций совпали со Swiss Ephemeris). Тесты берут посчитанное, не пример.
14. npm-пакет astronomy-engine **не содержит файла LICENSE** — MIT-текст лежит в шапке `esm/astronomy.js`; в `public/licenses.txt` он перенесён оттуда.

## Уточнения спеки, принятые в плане

| Место спеки | Как в плане | Почему |
|---|---|---|
| «Истинный узел — по формулам Миуса» | оскулирующий узел из `GeoMoonState` | Миус расходится с `SE_TRUE_NODE` до 16′ (п. 1 выше) |
| «Эталон: … тип, авторитет, профиль, определённость» | эталон проверяет **позиции**: долготы 26 активаций и ворота.линии (кроме ближе 1′ к границе линии) и перевод местного времени; правила и колесо — 10 карт ручной сверки | у эталона та же таблица и те же правила — общая ошибка обеих реализаций им не ловится |
| «7 авторитетов» | эго-манифестированный и эго-проецированный — один `ego` | так в спеке выходит семь |
| «ссылка содержит `assistant=14` и `#draft`» | в `href` — только `assistant=14&utm_content=hd-calc`; `#draft=` добавляется в момент клика; e2e проверяет адрес, куда ушёл переход | Вебвизор и `trackLinks` читают `href` (п. 6) |
| `hd-calc-submit` «тем же механизмом data-cta» | та же функция `reachGoal()`, что у `data-cta`, но вызывается после **удачного** расчёта, а не по клику | клик по кнопке с пустой формой — не расчёт |
| «определённые центры и каналы — по строке» | плюс открытые центры по строке | в текстах есть оба вида центров (18 описаний) |
| черновик в кабинете | привязан к `?assistant=` из той же ссылки и подставляется только в чат с этим ассистентом | иначе данные рождения всплыли бы в чате Романа |
| «Входной бандл лендинга не растёт» | растёт на ~1,3 КБ (разбор адреса, ссылка в подвале); код и тексты калькулятора — только в своих чанках, пререндер это проверяет | без разбора адреса страницу не открыть |
| «MIT-уведомление … вместе с остальными лицензиями» | у лендинга нет страницы лицензий; заводится `public/licenses.txt` с astronomy-engine и GeoNames, ссылка — в подписи калькулятора | остальные библиотеки сайта — вне границ спеки |
| «поиск города … грузится, только когда человек начинает вводить» | грузится по первому фокусу на поле | к первой букве база уже в пути |
| «IANA-пояс из самого GeoNames» | да, кроме `Europe/Kyiv` → `Europe/Kiev` | новое имя не знают браузеры с ICU старше 72; старое осталось в tzdata ссылкой и работает везде |
| 12 профилей, 5 видов определённости | текстов ровно столько; других сочетаний не бывает | 88° — это 93,9 линии, поэтому линия Солнца дизайна всегда на две-три больше линии личности по кругу из шести (1/3, 1/4 … 6/2, 6/3); групп центров — не больше четырёх |

## Порядок и зависимости

```
Task 1 → Task 2 → [СТОП 1: образцы текстов]

Пока владелец читает образцы:
  модуль:  Task 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 (эталон) → 11 (ручная сверка)
  лендинг: Task 12 (города), Task 13 (черновик и цели) — после Task 8
  кабинет: Task 14 → 15 → 16 → 17 (выкат кабинета, СТОП 2 перед каждым deploy.sh)

После «ок» по образцам:
  Task 18 (тексты) → 19 → 20 → 21 → 22 → 23 → 24 → 25 [СТОП 3] → 26 [СТОП 2] → 27

Task 17 (кабинет на проде) — обязательно раньше Task 26 (лендинг): иначе
#draft= придёт в старый кабинет и останется в адресе, который пишет Метрика.
```

**Стоп-точки владельца.** Без явного «да» дальше не идти.
- **СТОП 1** (конец Task 2) — образцы русских текстов: вводный текст, 3 типа, 2 канала, FAQ, подписи формы, правка FAQ Райи. Правки — в «Правила текстов» отдельным коммитом до Task 18.
- **СТОП 2** — каждый запуск `deploy.sh`: кабинет — `TEST_ONLY=1 FRONT_ONLY=1`, затем `FRONT_ONLY=1` (Task 17), с ноды, со свежих клонов; лендинг — `LANDING_ONLY=1` с `LOCAL_LAND_DIR` на свежий клон, сборка того же коммита на ноде заранее (Task 26).
- **СТОП 3** (Task 25) — условие точности выполнено (эталон зелёный, 10 карт сверены на двух калькуляторах каждая) и владелец посмотрел скриншоты. Без этого лендинг не выкатывается.

## Где работать

- Код правится на маке в воркдеревьях: лендинг — `~/Downloads/land_linkeon/.worktrees/hd-calc` (ветка `feat/hd-calculator`), кабинет — `~/Downloads/spirits_front/.worktrees/hd-draft` (ветка `feat/hd-draft`). Общие чекауты не трогать: там работают другие сессии.
- Всё тяжёлое (`pnpm install`, `pnpm build`, полный vitest, Playwright, `tsc`) — на тестовой ноде `dv@85.192.61.231`, в своих воркдеревьях `~/ci/wt/hd-calc` и `~/ci/wt/hd-draft`. Код едет туда **git push'ем прямо в CI-клон ноды** (`git push dv@85.192.61.231:ci/<репо> HEAD:refs/heads/tmp/<имя>`), не через GitHub и не rsync. Всё это делает `node-run.sh` из Task 1; на ноду попадает только закоммиченное.
- SSH к ноде — только через одно мастер-соединение (`-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h`): у ноды `MaxStartups 10:30:100`, пачка новых подключений рвётся. В каждой ssh-команде — `source ~/.nvm/nvm.sh`. Вывод долгих команд — в файл, не через `| tail`: конвейер возвращает код `tail`, и красное выглядит зелёным.
- На маке допустим только точечный vitest одного файла под Node 22: `source ~/.nvm/nvm.sh >/dev/null && nvm use -s 22 >/dev/null && ./node_modules/.bin/vitest run <файл>` — и только для файлов без `astronomy-engine` (её нет в `node_modules` основного чекаута). Во всех шагах ниже проверка — на ноде.
- Если сессия идёт на самой ноде (`hostname` = `ugliest-salmon`): воркдеревья — в `~/dev/<репо>/.worktrees/…`, команды из `node-run.sh` выполнять прямо в них, без ssh; `~/spirits_back` и `~/spirits_front` (живой стенд) не трогать.
- Тексты и ответы — по-русски, к посетителю на «вы». Слово «ассистент», не «агент». Репозитории публичные: ни секретов, ни номеров, ни рецептов входа, ни цитат промптов — ни в коде, ни в коммитах, ни в этом плане.
- Коммиты — по-русски, в стиле репозитория: сначала `test(…): … (красный)`, потом `feat(…)`/`fix(…)`. Последняя строка каждого сообщения — `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`. В `git add` — только свои файлы поимённо.

## Публичный интерфейс модуля (контракт второго этапа)

Единственная точка входа — `src/lib/human-design/index.ts`. Второй этап (Райя в чате, MCP на бэкенде) опирается ровно на это; менять — только вместе со спекой второго этапа.

```ts
// Вход: местные дата и время рождения и IANA-пояс.
interface BirthInput {
  date: string;              // 'YYYY-MM-DD'
  time: string;              // 'HH:MM', 24 часа
  zone: string;              // 'Europe/Moscow'
  dst?: 'before' | 'after';  // ответ на вопрос о переводе стрелок, если время в него попало
}

calculateChart(input: BirthInput): ChartResult
// { kind: 'ok', chart: HdChart, offsetSeconds }
// | { kind: 'needsDstChoice', transition: 'gap' | 'ambiguous', beforeOffsetSeconds, afterOffsetSeconds }
// Неверная дата/время или неизвестный пояс — RangeError.

chartFromUtc(birth: Date | string): HdChart          // если момент в UTC уже известен
renderBodygraphSvg(chart: HdChart, options?: { label?: string; colors?: Partial<BodygraphColors> }): string
localToUtc / formatOffset                            // для формы: вопрос о стрелках до расчёта

interface HdChart {                                  // сериализуется в JSON как есть
  birthUtc: string;            // ISO, UTC
  designUtc: string;           // Солнце на 88° позади
  personality: Activation[];   // 13: sun, earth, northNode, southNode, moon, mercury, venus,
  design: Activation[];        //     mars, jupiter, saturn, uranus, neptune, pluto — всего 26
  gates: number[];             // все активированные, по возрастанию
  channels: string[];          // '20-34', меньшие ворота первыми
  definedCenters: CenterId[];  // head ajna throat g heart spleen solarPlexus sacral root
  openCenters: CenterId[];
  type: HdType;                // generator | manifestingGenerator | manifestor | projector | reflector
  strategy: HdStrategy;        // respond | respondThenInform | inform | waitForInvitation | waitLunarCycle
  authority: HdAuthority;      // emotional | sacral | splenic | ego | selfProjected | mental | lunar
  profile: string;             // '5/2' — линия Солнца личности / дизайна
  definition: HdDefinition;    // none | single | split | triple | quadruple
}
interface Activation { body: BodyId; longitude: number; gate: number; line: number }
```

Гарантии, которые держат тесты: модуль без браузерных API, React и импортов из лендинга (`boundary.test.ts`); `renderBodygraphSvg` работает в окружении node и даёт самостоятельный SVG (`svg.test.ts`); позиции совпадают со Swiss Ephemeris (`reference.test.ts`), правила — с независимыми калькуляторами (`manual.test.ts`).

## Вне рамок

- **Второй этап** (отдельный подпроект, своя спека): Райя в чате считает и рисует бодиграф этим же модулем — инструмент MCP на бэкенде (NestJS, Node). Как модуль окажется на бэкенде — копией `src/lib/human-design/` с общим эталонным тестом (`__fixtures__/reference.json` + `reference.test.ts`) или общим пакетом — решается в спеке второго этапа. Этот план только готовит почву: граница модуля, контракт, SVG без DOM, эталон в репозитории.
- Другие языки калькулятора (механизм готов: язык выходит, когда появится `src/content/hd/texts/<код>.ts`), джйотиш и нумерология, сохранение карт, «поделиться», PDF, крест воплощения, переменные, транзиты, совместимость.
- Сжатие JS/JSON на nginx лендинга (п. 5 выше) — решение владельца отдельно.
- Мобильные приложения: ссылка «Разобрать с Райей» открывает веб-кабинет.

## Файлы

| Файл | Ответственность | Что с ним |
|---|---|---|
| `src/lib/human-design/index.ts` | публичный интерфейс модуля | создать |
| `src/lib/human-design/wheel.ts` | 64 ворот, линии, расстояние до границы | создать |
| `src/lib/human-design/bodygraph.ts` | центры, их ворота, 36 каналов, моторы | создать |
| `src/lib/human-design/rules.ts` | тип, стратегия, авторитет, определённость | создать |
| `src/lib/human-design/ephemeris.ts` | 13 тел, истинный узел, момент дизайна | создать |
| `src/lib/human-design/time.ts` | местное время → UTC через `Intl`, подпись смещения | создать |
| `src/lib/human-design/chart.ts` | `chartFromUtc`, `calculateChart`, тип `HdChart` | создать |
| `src/lib/human-design/layout.ts`, `svg.ts` | геометрия схемы, бодиграф строкой SVG | создать |
| `src/lib/human-design/*.test.ts`, `__fixtures__/reference.json` | тесты, эталон | создать |
| `scripts/hd-reference.py` | генератор эталона (pyswisseph, вручную на ноде) | создать |
| `scripts/hd-pick-manual.ts` | подбор 10 карт ручной сверки | создать |
| `scripts/build-hd-cities.py` | сборка базы городов из GeoNames (вручную на ноде) | создать |
| `src/content/hd/cities.ru.json` | база городов (сгенерирована) | создать |
| `src/lib/cities.ts`, `src/lib/cityLoader.ts` | поиск города, ленивая загрузка базы | создать |
| `src/lib/hdDraft.ts` | черновик Райе, ссылка в кабинет | создать |
| `src/lib/goal.ts` | цель Метрики + событие лендинга | создать |
| `src/lib/hdRoute.ts` | адрес калькулятора | создать |
| `scripts/hd-calc-languages.js` + `.d.ts` | на каких языках выпущен калькулятор | создать |
| `src/content/hd/{types,texts.server,load,availability}.ts`, `texts/ru.ts` | тексты и их загрузка | создать |
| `src/components/hd/{Bodygraph,CityInput,HdForm,HdResult}.tsx`, `src/pages/HumanDesignPage.tsx` | страница | создать |
| `public/licenses.txt` | MIT astronomy-engine, CC BY GeoNames | создать |
| `docs/hd-calculator/samples-ru.md` | образцы текстов на ревью | создать |
| `tests/hd-calculator.spec.ts` | сырой HTML и браузер | создать |
| `src/main.tsx`, `src/entry-server.tsx`, `scripts/prerender.mjs` | вход в браузере, пререндер, проверка бандла | изменить |
| `scripts/site-urls.mjs` + `.d.mts` + `.test.mjs`, `tests/i18n.spec.ts` | адрес и sitemap | изменить |
| `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts` | `define` языков калькулятора | изменить |
| `src/components/layout/Footer.tsx`, `src/i18n/locales/*.json` | пункт «Расчёт Human Design» | изменить |
| `src/content/assistants/types.ts`, `src/pages/AssistantPage.tsx`, `src/content/assistants/pages/ru/raya.ts` | ссылка из FAQ Райи | изменить |
| `src/theme/paper.js` | перечень страниц на «бумаге» | изменить (комментарий) |
| `package.json`, `pnpm-lock.yaml` | `astronomy-engine` 2.1.19 | изменить |
| **spirits_front** `src/utils/pendingDraft.ts` | черновик до и после входа | создать |
| **spirits_front** `index.html` | скрипт `#draft=` до Метрики | изменить |
| **spirits_front** `src/components/chat/ChatInterface.tsx` | черновик в поле ввода, `ym-disable-keys` | изменить |
| **spirits_front** тесты `src/utils/{pendingDraft,draftCapture}.test.ts`, `src/components/chat/draftWiring.test.ts` | | создать |

## Правила текстов

Действуют в Task 2 и Task 18. Механическую часть проверяет `src/content/hd/texts.test.ts`; остальное — ревью владельца.

1. **Самопознание, не прогноз.** Описываем склонности и смысл («часто», «бывает», «удобно»), а не судьбу и события. Никаких медицинских, финансовых и юридических советов.
2. **Голос** — как у страниц ассистентов (спека `2026-09-07-landing-warmth-design.md`): на «вы»; обстоятельства вместо превосходных степеней; без эмодзи; эмпатию не называть словами. Поисковые формулировки («рассчитать дизайн человека», «бодиграф по дате рождения») — только в `title`, `description` и H1.
3. **Цена** — только «при регистрации 25 000 токенов в подарок». Ни рублей, ни пакетов (тест ловит `₽`, «руб», `$`, `€`).
4. **Human Design и бодиграф** — общие названия метода. Jovian Archive не упоминать и о связи не писать; не называть расчёт «официальным» или «сертифицированным».
5. **Общий смысл, не «ваша карта».** Описание типа, авторитета, профиля, центра, канала — каким он бывает у людей вообще. Личное — у Райи; переход к ней — под результатом, а не в каждом описании.
6. **Длины** (тест): каждое описание 60–420 знаков; центр и канал — одно-два предложения («по строке»); тип, авторитет, профиль, определённость — абзац в 2–4 предложения. `title` до 70 знаков, `description` 100–180, вводный текст — 2–4 абзаца, вопросов — 4–6.
7. **FAQ** обязательно отвечает: зачем точное время; что делать, если своего города нет (и почему важен пояс); сохраняются ли данные (нет: расчёт на устройстве, ничего не уходит на сервер); чем калькулятор отличается от разбора у Райи; почему другой сайт может показать иначе (пояс и летнее время в год рождения, истинный узел).
8. **Оговорка** — «Human Design — инструмент самопознания, не прогноз и не замена врачу, юристу или финансисту.» (тест проверяет «самопознани», «не прогноз», «врач»).
9. **Названия** — как в таблице; меняются только вместе с образцами на СТОП 1.

| Что | Названия (код → по-русски) |
|---|---|
| Типы и стратегии | generator — Генератор, «Откликаться»; manifestingGenerator — Манифестирующий генератор, «Откликаться, затем сообщать о действии»; manifestor — Манифестор, «Сообщать о своих действиях заранее»; projector — Проектор, «Ждать приглашения»; reflector — Рефлектор, «Ждать лунный цикл — около 28 дней» |
| Авторитеты (`name` / `inMessage`) | emotional — Эмоциональный (солнечное сплетение) / эмоциональный авторитет; sacral — Сакральный / сакральный авторитет; splenic — Селезёночный / селезёночный авторитет; ego — Эго (сердечный центр) / авторитет эго; selfProjected — Самопроецированный / самопроецированный авторитет; mental — Ментальный (через окружение) / ментальный авторитет; lunar — Лунный / лунный авторитет |
| Линии профиля | 1 Исследователь, 2 Отшельник, 3 Мученик, 4 Оппортунист, 5 Еретик, 6 Ролевая модель → «1/3 · Исследователь / Мученик» |
| Определённость | none — Нет определённости; single — Одинарная; split — Расщеплённая (двойная); triple — Тройная; quadruple — Четверная |
| Центры | head — Теменной центр; ajna — Аджна; throat — Горловой центр; g — Центр G (идентичность); heart — Сердечный центр (эго); spleen — Селезёночный центр; solarPlexus — Солнечное сплетение; sacral — Сакральный центр; root — Корневой центр |
| Каналы (англ. — для сверки) | 1-8 Вдохновение (Inspiration); 2-14 Пульс (The Beat); 3-60 Мутация (Mutation); 4-63 Логика (Logic); 5-15 Ритм (Rhythm); 6-59 Близость (Mating); 7-31 Альфа (The Alpha); 9-52 Концентрация (Concentration); 10-20 Пробуждение (Awakening); 10-34 Исследование (Exploration); 10-57 Совершенная форма (Perfected Form); 11-56 Любопытство (Curiosity); 12-22 Открытость (Openness); 13-33 Блудный сын (The Prodigal); 16-48 Длина волны (The Wavelength); 17-62 Принятие (Acceptance); 18-58 Суждение (Judgement); 19-49 Синтез (Synthesis); 20-34 Харизма (Charisma); 20-57 Мозговая волна (The Brainwave); 21-45 Деньги (The Money Line); 23-43 Структурирование (Structuring); 24-61 Осознанность (Awareness); 25-51 Инициация (Initiation); 26-44 Передача (Surrender); 27-50 Сохранение (Preservation); 28-38 Борьба (Struggle); 29-46 Открытие (Discovery); 30-41 Узнавание (Recognition); 32-54 Трансформация (Transformation); 34-57 Сила (Power); 35-36 Преходящесть (Transitoriness); 37-40 Сообщество (Community); 39-55 Эмоциональность (Emoting); 42-53 Созревание (Maturation); 47-64 Абстракция (Abstraction) |

---

### Task 1: Рабочие копии и прогон на ноде

**Files:** ничего в репозиториях; служебные скрипты — в `~/Downloads/land_linkeon/.superpowers/hd-calc/` (каталог `.superpowers/` в `.gitignore` лендинга).

- [ ] **Step 1: Воркдерево лендинга**

```bash
git -C ~/Downloads/land_linkeon fetch -q origin
git -C ~/Downloads/land_linkeon worktree add .worktrees/hd-calc -b feat/hd-calculator origin/main
git -C ~/Downloads/land_linkeon/.worktrees/hd-calc branch --unset-upstream
ln -s ~/Downloads/land_linkeon/node_modules ~/Downloads/land_linkeon/.worktrees/hd-calc/node_modules
git -C ~/Downloads/land_linkeon/.worktrees/hd-calc log --oneline -1
```

Expected: последняя строка — коммит `origin/main` (спека калькулятора `6aa5ab1` или новее). `--unset-upstream` — чтобы случайный `git push` не ушёл в `main`.

- [ ] **Step 2: Воркдерево кабинета**

```bash
git -C ~/Downloads/spirits_front fetch -q origin
git -C ~/Downloads/spirits_front worktree add .worktrees/hd-draft -b feat/hd-draft origin/main
git -C ~/Downloads/spirits_front/.worktrees/hd-draft branch --unset-upstream
ln -s ~/Downloads/spirits_front/node_modules ~/Downloads/spirits_front/.worktrees/hd-draft/node_modules
```

- [ ] **Step 3: Скрипты для ноды**

`~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh`:

```bash
#!/usr/bin/env bash
# Прогон на тестовой ноде на ТЕКУЩЕМ коммите воркдерева.
#   bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'pnpm test:unit'
#   bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front 'pnpm test'
# Код едет git push'ем прямо в CI-клон ноды (ветка tmp/…), не через GitHub
# и не rsync. Незакоммиченное на ноду не попадает — сначала commit.
set -euo pipefail
case "${1:-}" in
  land)  WT=~/Downloads/land_linkeon/.worktrees/hd-calc;   REPO=land_linkeon;  NODE_WT=ci/wt/hd-calc;  BRANCH=tmp/hd-calc ;;
  front) WT=~/Downloads/spirits_front/.worktrees/hd-draft; REPO=spirits_front; NODE_WT=ci/wt/hd-draft; BRANCH=tmp/hd-draft ;;
  *) echo "первый аргумент: land или front" >&2; exit 2 ;;
esac
# Одно мастер-соединение: нода рвёт пачки новых ssh-подключений (MaxStartups).
SSH_OPTS="-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h"
GIT_SSH_COMMAND="ssh $SSH_OPTS" git -C "$WT" push -q -f "dv@85.192.61.231:ci/$REPO" "HEAD:refs/heads/$BRANCH"
SHA=$(git -C "$WT" rev-parse HEAD)
ssh $SSH_OPTS dv@85.192.61.231 "set -e
  [ -d ~/$NODE_WT ] || git -C ~/ci/$REPO worktree add -q --detach ~/$NODE_WT $SHA
  cd ~/$NODE_WT && git checkout -q --detach $SHA
  source ~/.nvm/nvm.sh
  (fuser -k 4173/tcp 2>/dev/null || true)
  pnpm install --frozen-lockfile > /tmp/hd-$1-install.log 2>&1 || (tail -20 /tmp/hd-$1-install.log; exit 1)
  echo \"== \$(git log --oneline -1)\"
  $2"
```

`~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh`:

```bash
#!/usr/bin/env bash
# Произвольная команда на ноде через то же мастер-соединение.
#   bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'ls ~/ci/wt'
exec ssh -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231 "$1"
```

`fuser -k 4173/tcp` гасит забытый `pnpm preview`: Playwright без `CI=1` подхватил бы старую сборку. Playwright ниже всегда идёт с `CI=1` — тогда занятый порт даёт ошибку, а не чужой `dist/`. Копировать файлы с ноды — `scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231:<путь> <куда>`.

- [ ] **Step 4: Точка отсчёта — лендинг**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(pnpm test:unit > /tmp/hd-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED); grep -E "Test Files|Tests " /tmp/hd-unit.log; (pnpm build > /tmp/hd-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); ls -l dist/assets/index-*.js'
```

Expected: `UNIT_OK`, `BUILD_OK`, размер входного бандла записать — на `6aa5ab1` это 528 817 байт. С ним сравнивается Task 22.

- [ ] **Step 5: Точка отсчёта — кабинет**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front '(pnpm test > /tmp/hd-front-test.log 2>&1 && echo TESTS_OK || echo TESTS_FAILED); grep -E "Test Files|Tests " /tmp/hd-front-test.log; echo "tsc errors: $(pnpm typecheck 2>&1 | grep -c "error TS")"; (pnpm check-hardcoded > /tmp/hd-front-hc.log 2>&1 && echo HC_OK || echo HC_FAILED); grep -cE "^\s+src/" /tmp/hd-front-hc.log'
```

Expected: `TESTS_OK`; `tsc errors: 45` (на `fa29492`; записать фактическое — с ним сравнивается Task 17); `HC_FAILED` и `2` — две старые находки в `src/utils/formatters.ts`, наши правки их число не меняют. `pnpm lint` кабинета на `main` не запускается вовсе (нет `eslint-plugin-i18next`) — им не пользоваться.

---

### Task 2: Образцы текстов на ревью

**Files:**
- Create: `docs/hd-calculator/samples-ru.md` (лендинг)

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

- [ ] **Step 1: Написать образцы**

По разделу «Правила текстов» этого плана. Структура файла:

```markdown
# Калькулятор Human Design — образцы текстов на ревью

Что смотреть: тон (на «вы», без эмодзи и оценок), честность (самопознание, не прогноз),
поисковые формулировки (только title, description, H1), длину. Правки к образцам станут
правилами для остальных ~80 описаний (Task 18).

## Страница — /calculators/human-design/
**title:** …(до 70 знаков)
**description:** …(100–180 знаков)
**H1:** Расчёт Human Design онлайн — бодиграф бесплатно
**Хлебные крошки:** Главная → Расчёт Human Design

### Вводный текст (2–4 абзаца, видит и поисковик)
…

## Типы — 3 из 5
### Генератор · «Откликаться»
…(абзац 2–4 предложения)
### Проектор · «Ждать приглашения»
…
### Рефлектор · «Ждать лунный цикл — около 28 дней»
…

## Каналы — 2 из 36 (по строке)
**20-34 · Харизма** — …
**25-51 · Инициация** — …

## Вопросы (4–6)
**Зачем точное время рождения?** …
**Моего города нет в списке — что делать?** …
**Сохраняются ли мои данные?** …
**Чем это отличается от разбора у Райи?** …
**Почему другой сайт показал иначе?** …

## Под результатом
**Кнопка:** Разобрать с Райей
**Строка под кнопкой:** Личный разбор и эксперимент на 7 дней — у Райи, при регистрации 25 000 токенов в подарок
**Оговорка:** Human Design — инструмент самопознания, не прогноз и не замена врачу, юристу или финансисту.

## Сообщение Райе (шаблон из спеки, дословно)
Райя, привет! Мои данные рождения: {date}, {time}, {city} ({offset}). Калькулятор показал: {type}, профиль {profile}, {authority}. Расскажи, что это значит для меня

## FAQ Райи — правка ответа про калькулятор
**Было:** Калькулятор строит карту и даёт общие описания. Райя разбирает именно вашу карту…
**Стало:** Калькулятор строит карту и даёт общие описания — такой есть и у нас. Райя разбирает именно вашу карту… + ссылка «Рассчитать бодиграф бесплатно» → /calculators/human-design/

## Подписи формы и результата
(все строки блоков `form` и `result` из каркаса Task 18 Step 3 — списком)

## Что решить владельцу
- названия стратегий Манифестора и Манифестирующего генератора;
- упоминать ли основателя метода во вводном тексте.
```

«…» в структуре — места для текста; в готовом файле их не остаётся.

- [ ] **Step 2: Самопроверка**

По каждому блоку: длины из п. 6 правил; H1 дословно; нет эмодзи, цен кроме «25 000 токенов в подарок», слова «агент», упоминаний Jovian Archive; описания — общий смысл, без «ваш тип такой-то»; FAQ закрывает все пять тем п. 7.

- [ ] **Step 3: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add docs/hd-calculator/samples-ru.md
git commit -m "docs(hd): образцы текстов калькулятора на ревью

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 4: СТОП 1 — ревью владельца**

Показать владельцу файл (путь в воркдереве и коротко — что смотреть: тон, честность, формулировки под поиск, решения из последнего раздела). Ждать «ок» или правок. Правки к образцам — это правки правил для остальных текстов: внести их в раздел «Правила текстов» этого плана отдельным коммитом `docs(hd): правила текстов калькулятора по ревью образцов` и только потом браться за Task 18. Пока владелец читает — Task 3–17.

---
### Task 3: Колесо ворот

**Files:**
- Create: `src/lib/human-design/wheel.ts`
- Test: `src/lib/human-design/wheel.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Модуль `src/lib/human-design/` — чистый TypeScript: ни `window`, ни `document`, ни React, ни импортов из лендинга (его возьмёт второй этап на бэкенд; границу закрепит Task 8). Таблица ворот сверена с двумя независимыми таблицами градусов — см. «Что выяснено», п. 3.

- [ ] **Step 1: Написать тест**

`src/lib/human-design/wheel.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { GATE_ORDER, LINE_SPAN, WHEEL_START, gateLine, minutesToLineBoundary, normalizeDegrees } from './wheel';

describe('колесо ворот', () => {
  it('64 разных ворот, каждые ровно один раз', () => {
    expect(GATE_ORDER).toHaveLength(64);
    expect([...GATE_ORDER].sort((a, b) => a - b)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });

  it('41-е ворота начинаются на 302°', () => {
    expect(gateLine(WHEEL_START)).toEqual({ gate: 41, line: 1 });
    expect(gateLine(WHEEL_START - 1e-9)).toEqual({ gate: 60, line: 6 });
  });

  // Опорные точки — из независимых таблиц градусов (см. комментарий в wheel.ts):
  // 25-е ворота стоят на точке весеннего равноденствия, 15-е — на летнем
  // солнцестоянии, 46-е — на осеннем равноденствии, 10-е — на зимнем.
  it('ворота на точках равноденствий и солнцестояний', () => {
    expect(gateLine(0).gate).toBe(25);
    expect(gateLine(90).gate).toBe(15);
    expect(gateLine(180).gate).toBe(46);
    expect(gateLine(270).gate).toBe(10);
  });

  it('начала ворот по таблице градусов', () => {
    // 27-е — 2°00′ Тельца, 31-е — 2°00′ Льва, 28-е — 2°00′ Скорпиона.
    expect(gateLine(32)).toEqual({ gate: 27, line: 1 });
    expect(gateLine(122)).toEqual({ gate: 31, line: 1 });
    expect(gateLine(212)).toEqual({ gate: 28, line: 1 });
    // 20-е — 0°07′30″ Близнецов.
    expect(gateLine(60.125)).toEqual({ gate: 20, line: 1 });
    expect(gateLine(60.124)).toEqual({ gate: 8, line: 6 });
  });

  it('шесть линий по 56′15″', () => {
    expect(LINE_SPAN).toBe(0.9375);
    for (let line = 1; line <= 6; line++) {
      expect(gateLine(WHEEL_START + (line - 1) * LINE_SPAN + 0.0001)).toEqual({ gate: 41, line });
    }
    expect(gateLine(WHEEL_START + 6 * LINE_SPAN)).toEqual({ gate: 19, line: 1 });
  });

  it('долгота за пределами 0–360 приводится', () => {
    expect(normalizeDegrees(-1)).toBe(359);
    expect(normalizeDegrees(721)).toBe(1);
    expect(gateLine(-58)).toEqual(gateLine(302));
  });

  it('расстояние до границы линии', () => {
    expect(minutesToLineBoundary(WHEEL_START)).toBe(0);
    expect(minutesToLineBoundary(WHEEL_START + LINE_SPAN / 2)).toBeCloseTo(28.125, 6);
    expect(minutesToLineBoundary(WHEEL_START + LINE_SPAN - 1 / 60)).toBeCloseTo(1, 6);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/wheel.test.ts
git commit -m "test(hd): колесо ворот — 64 ворот с 302°, линии по 56′15″ (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/wheel.test.ts'`
Expected: FAIL — `Failed to resolve import "./wheel"`.

- [ ] **Step 4: Реализация**

`src/lib/human-design/wheel.ts`:

```ts
/**
 * Колесо Human Design: 64 ворот по 5,625° (5°37′30″), у каждых — 6 линий по
 * 0,9375° (56′15″). 41-е ворота начинаются на 302° тропической долготы
 * (2° Водолея), дальше ворота идут по возрастанию долготы.
 *
 * Порядок сверен 08.10.2026 с двумя независимыми таблицами градусов:
 * barneyandflow.com/gate-zodiac-degrees и
 * bonniesorsby.com/human-design-gates-by-degree — совпал полностью.
 * Эталон Swiss Ephemeris колесо НЕ проверяет (он режет долготу той же
 * таблицей), его проверяют карты ручной сверки (manual.test.ts).
 */
export const GATE_ORDER = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
  28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
] as const;

/** Начало 41-х ворот, градусы тропической эклиптической долготы. */
export const WHEEL_START = 302;
export const GATE_SPAN = 360 / 64;
export const LINE_SPAN = GATE_SPAN / 6;

export interface GateLine {
  gate: number;
  line: number;
}

export function normalizeDegrees(degrees: number): number {
  const x = degrees % 360;
  return x < 0 ? x + 360 : x;
}

/** Ворота и линия для эклиптической долготы в градусах. */
export function gateLine(longitude: number): GateLine {
  const offset = normalizeDegrees(longitude - WHEEL_START);
  // min: долгота на волосок меньше 302° даёт offset, округлённый до 360.
  const index = Math.min(Math.floor(offset / LINE_SPAN), 64 * 6 - 1);
  return { gate: GATE_ORDER[Math.floor(index / 6)], line: (index % 6) + 1 };
}

/** До ближайшей границы линии — в угловых минутах. */
export function minutesToLineBoundary(longitude: number): number {
  const within = normalizeDegrees(longitude - WHEEL_START) % LINE_SPAN;
  return Math.min(within, LINE_SPAN - within) * 60;
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/wheel.ts
git commit -m "feat(hd): колесо ворот Human Design

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/wheel.test.ts'`
Expected: PASS, 7 тестов.

---

### Task 4: Центры, ворота центров и 36 каналов

**Files:**
- Create: `src/lib/human-design/bodygraph.ts`
- Test: `src/lib/human-design/bodygraph.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

- [ ] **Step 1: Написать тест**

`src/lib/human-design/bodygraph.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { CENTER_GATES, CENTER_IDS, CHANNELS, GATE_CENTER, MOTORS, channelKey } from './bodygraph';

describe('устройство бодиграфа', () => {
  it('каждые из 64 ворот — ровно в одном центре', () => {
    const all = CENTER_IDS.flatMap((c) => CENTER_GATES[c]);
    expect(all).toHaveLength(64);
    expect(new Set(all).size).toBe(64);
  });

  it('число ворот по центрам', () => {
    const counts = Object.fromEntries(CENTER_IDS.map((c) => [c, CENTER_GATES[c].length]));
    expect(counts).toEqual({ head: 3, ajna: 6, throat: 11, g: 8, heart: 4, spleen: 7, solarPlexus: 7, sacral: 9, root: 9 });
  });

  it('36 разных каналов, меньшие ворота первыми', () => {
    expect(CHANNELS).toHaveLength(36);
    expect(new Set(CHANNELS.map(channelKey)).size).toBe(36);
    for (const [a, b] of CHANNELS) expect(a).toBeLessThan(b);
  });

  it('канал соединяет два разных центра', () => {
    for (const [a, b] of CHANNELS) {
      expect(GATE_CENTER[a], `${a}`).toBeDefined();
      expect(GATE_CENTER[b], `${b}`).toBeDefined();
      expect(GATE_CENTER[a], channelKey([a, b])).not.toBe(GATE_CENTER[b]);
    }
  });

  // Пары центров — по схеме бодиграфа; ошибка в одном номере ворот перекинула
  // бы канал в чужой центр, и тип посчитался бы неверно.
  it('известные каналы ведут куда надо', () => {
    const between = (a: number, b: number) => [GATE_CENTER[a], GATE_CENTER[b]].sort().join('–');
    expect(between(20, 34)).toBe('sacral–throat');
    expect(between(21, 45)).toBe('heart–throat');
    expect(between(25, 51)).toBe('g–heart');
    expect(between(6, 59)).toBe('sacral–solarPlexus');
    expect(between(10, 57)).toBe('g–spleen');
    expect(between(47, 64)).toBe('ajna–head');
    expect(between(19, 49)).toBe('root–solarPlexus');
  });

  it('моторы — сакрал, солнечное сплетение, сердце, корень', () => {
    expect([...MOTORS].sort()).toEqual(['heart', 'root', 'sacral', 'solarPlexus']);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/bodygraph.test.ts
git commit -m "test(hd): центры и 36 каналов бодиграфа (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/bodygraph.test.ts'`
Expected: FAIL — `Failed to resolve import "./bodygraph"`.

- [ ] **Step 4: Реализация**

`src/lib/human-design/bodygraph.ts`:

```ts
/**
 * Устройство бодиграфа: девять центров, их ворота и 36 каналов.
 * Списки сверены 08.10.2026 с gethumandesign.com/docs/channels (36 каналов).
 */
export type CenterId =
  | 'head' | 'ajna' | 'throat' | 'g' | 'heart' | 'spleen' | 'solarPlexus' | 'sacral' | 'root';

/** Порядок — сверху вниз по схеме: так центры и перечисляются в результате. */
export const CENTER_IDS: readonly CenterId[] = [
  'head', 'ajna', 'throat', 'g', 'heart', 'spleen', 'solarPlexus', 'sacral', 'root',
];

/** Моторы: их связь с горлом делает тип «манифестирующим». */
export const MOTORS: readonly CenterId[] = ['sacral', 'solarPlexus', 'heart', 'root'];

export const CENTER_GATES: Readonly<Record<CenterId, readonly number[]>> = {
  head: [64, 61, 63],
  ajna: [47, 24, 4, 17, 43, 11],
  throat: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
  g: [7, 1, 13, 10, 25, 15, 46, 2],
  heart: [21, 40, 26, 51],
  spleen: [48, 57, 44, 50, 32, 28, 18],
  solarPlexus: [6, 37, 22, 36, 30, 55, 49],
  sacral: [5, 14, 29, 59, 9, 3, 42, 27, 34],
  root: [53, 60, 52, 19, 39, 41, 58, 38, 54],
};

export type Channel = readonly [number, number];

/** Меньшие ворота — первыми; так же канал и называется: «20-34». */
export const CHANNELS: readonly Channel[] = [
  [1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52], [10, 20],
  [10, 34], [10, 57], [11, 56], [12, 22], [13, 33], [16, 48], [17, 62], [18, 58], [19, 49],
  [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51], [26, 44], [27, 50], [28, 38],
  [29, 46], [30, 41], [32, 54], [34, 57], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64],
];

export const GATE_CENTER: Readonly<Record<number, CenterId>> = Object.fromEntries(
  CENTER_IDS.flatMap((center) => CENTER_GATES[center].map((gate) => [gate, center])),
);

export const channelKey = ([a, b]: Channel): string => `${a}-${b}`;
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/bodygraph.ts
git commit -m "feat(hd): центры, их ворота и 36 каналов

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/bodygraph.test.ts'`
Expected: PASS, 6 тестов.

---

### Task 5: Правила: тип, стратегия, авторитет, определённость

**Files:**
- Create: `src/lib/human-design/rules.ts`
- Test: `src/lib/human-design/rules.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Правила сверены с независимыми источниками: тип — мотор связан с горлом «напрямую или цепочкой каналов» (gethumandesign.com, страница Manifesting Generator); авторитет — иерархия «эмоциональный → сакральный → селезёночный → эго → самопроецированный → ментальный, у Рефлектора лунный». Окончательно их подтверждают карты ручной сверки (Task 11).

- [ ] **Step 1: Написать тест**

`src/lib/human-design/rules.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import type { Channel } from './bodygraph';
import { HD_STRATEGIES, HD_TYPES, STRATEGY_OF, definedCenters, definedChannels, hdAuthority, hdDefinition, hdType } from './rules';

/** Определённые каналы набора ворот — так их видят правила. */
const ch = (...gates: number[]): Channel[] => definedChannels(new Set(gates));

describe('определённые каналы и центры', () => {
  it('канал определён, только когда активны оба ворот', () => {
    expect(ch(20)).toEqual([]);
    expect(ch(20, 34)).toEqual([[20, 34]]);
    expect(ch(10, 20, 34, 57).map(([a, b]) => `${a}-${b}`)).toEqual(['10-20', '10-34', '10-57', '20-34', '20-57', '34-57']);
  });

  it('центры — концы определённых каналов, сверху вниз', () => {
    expect(definedCenters(ch(20, 34, 19, 49))).toEqual(['throat', 'solarPlexus', 'sacral', 'root']);
  });
});

describe('тип', () => {
  it('ни одного канала — Рефлектор', () => {
    expect(hdType(ch(1, 3, 5, 7, 9))).toBe('reflector');
  });

  it('сакрал без мотора к горлу — Генератор', () => {
    expect(hdType(ch(2, 14))).toBe('generator');
  });

  it('сакрал напрямую к горлу — Манифестирующий генератор', () => {
    expect(hdType(ch(20, 34))).toBe('manifestingGenerator');
  });

  // Мотор связан с горлом цепочкой: сакрал → G (2-14) → горло (1-8).
  it('сакрал к горлу через G — тоже Манифестирующий генератор', () => {
    expect(hdType(ch(2, 14, 1, 8))).toBe('manifestingGenerator');
  });

  it('сердце к горлу без сакрала — Манифестор', () => {
    expect(hdType(ch(21, 45))).toBe('manifestor');
  });

  it('корень к горлу через солнечное сплетение — Манифестор', () => {
    expect(hdType(ch(19, 49, 12, 22))).toBe('manifestor');
  });

  it('без сакрала и без мотора к горлу — Проектор', () => {
    expect(hdType(ch(1, 8))).toBe('projector');
    // Мотор есть (корень — сплетение), но к горлу не связан.
    expect(hdType(ch(19, 49, 47, 64))).toBe('projector');
  });
});

describe('авторитет — первый сверху', () => {
  it('солнечное сплетение главнее сакрала', () => {
    expect(hdAuthority(ch(6, 59))).toBe('emotional');
  });
  it('сакральный', () => {
    expect(hdAuthority(ch(2, 14))).toBe('sacral');
  });
  it('селезёночный', () => {
    expect(hdAuthority(ch(18, 58))).toBe('splenic');
  });
  it('эго — и через горло, и через G', () => {
    expect(hdAuthority(ch(21, 45))).toBe('ego');
    expect(hdAuthority(ch(25, 51))).toBe('ego');
  });
  it('самопроецированный — G к горлу', () => {
    expect(hdAuthority(ch(1, 8))).toBe('selfProjected');
  });
  it('ментальный — определены только голова, аджна, горло', () => {
    expect(hdAuthority(ch(47, 64, 17, 62))).toBe('mental');
  });
  it('у Рефлектора — лунный', () => {
    expect(hdAuthority(ch())).toBe('lunar');
  });
});

describe('определённость — число связных групп центров', () => {
  it('нет определённых центров', () => {
    expect(hdDefinition(ch())).toBe('none');
  });
  it('одна группа', () => {
    expect(hdDefinition(ch(20, 34, 2, 14))).toBe('single');
  });
  it('две группы', () => {
    expect(hdDefinition(ch(47, 64, 18, 58))).toBe('split');
  });
  it('три группы', () => {
    expect(hdDefinition(ch(47, 64, 18, 58, 25, 51))).toBe('triple');
  });
  it('четыре группы', () => {
    // голова–аджна, G–сердце, селезёнка–корень, сакрал–сплетение
    expect(hdDefinition(ch(47, 64, 25, 51, 18, 58, 6, 59))).toBe('quadruple');
  });
});

describe('стратегия', () => {
  it('у каждого типа своя', () => {
    expect(HD_TYPES.map((t) => STRATEGY_OF[t])).toEqual([...HD_STRATEGIES]);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/rules.test.ts
git commit -m "test(hd): тип, стратегия, авторитет и определённость по каналам (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/rules.test.ts'`
Expected: FAIL — `Failed to resolve import "./rules"`.

- [ ] **Step 4: Реализация**

`src/lib/human-design/rules.ts`:

```ts
import { CENTER_IDS, CHANNELS, GATE_CENTER, MOTORS, type CenterId, type Channel } from './bodygraph';

/** Порядок — для показа и для проверки текстов. */
export const HD_TYPES = ['generator', 'manifestingGenerator', 'manifestor', 'projector', 'reflector'] as const;
export type HdType = (typeof HD_TYPES)[number];

export const HD_STRATEGIES = ['respond', 'respondThenInform', 'inform', 'waitForInvitation', 'waitLunarCycle'] as const;
export type HdStrategy = (typeof HD_STRATEGIES)[number];

/** Стратегия однозначно следует из типа. */
export const STRATEGY_OF: Readonly<Record<HdType, HdStrategy>> = {
  generator: 'respond',
  manifestingGenerator: 'respondThenInform',
  manifestor: 'inform',
  projector: 'waitForInvitation',
  reflector: 'waitLunarCycle',
};

/**
 * Иерархия авторитетов сверху вниз; лунный — у Рефлектора. Эго-манифестированный
 * и эго-проецированный — один авторитет «ego»: в спеке их семь.
 */
export const HD_AUTHORITIES = ['emotional', 'sacral', 'splenic', 'ego', 'selfProjected', 'mental', 'lunar'] as const;
export type HdAuthority = (typeof HD_AUTHORITIES)[number];

/** Индекс — число связных групп определённых центров. */
export const HD_DEFINITIONS = ['none', 'single', 'split', 'triple', 'quadruple'] as const;
export type HdDefinition = (typeof HD_DEFINITIONS)[number];

/** Каналы, у которых активны оба ворот. */
export function definedChannels(gates: ReadonlySet<number>): Channel[] {
  return CHANNELS.filter(([a, b]) => gates.has(a) && gates.has(b));
}

/** Определённые центры — концы определённых каналов, в порядке CENTER_IDS. */
export function definedCenters(channels: readonly Channel[]): CenterId[] {
  const set = new Set<CenterId>();
  for (const [a, b] of channels) {
    set.add(GATE_CENTER[a]);
    set.add(GATE_CENTER[b]);
  }
  return CENTER_IDS.filter((c) => set.has(c));
}

/** Центры, достижимые из `from` по определённым каналам (включая сам `from`). */
function reachable(from: CenterId, channels: readonly Channel[]): Set<CenterId> {
  const seen = new Set<CenterId>([from]);
  const queue: CenterId[] = [from];
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const [a, b] of channels) {
      const [ca, cb] = [GATE_CENTER[a], GATE_CENTER[b]];
      const next = ca === current ? cb : cb === current ? ca : null;
      if (next && !seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return seen;
}

/**
 * Тип. Мотор связан с горлом — напрямую или цепочкой определённых каналов
 * (gethumandesign.com: «directly or through a chain of channels»).
 */
export function hdType(channels: readonly Channel[]): HdType {
  const centers = definedCenters(channels);
  if (centers.length === 0) return 'reflector';
  const fromThroat = reachable('throat', channels);
  const motorToThroat = MOTORS.some((m) => fromThroat.has(m));
  if (centers.includes('sacral')) return motorToThroat ? 'manifestingGenerator' : 'generator';
  return motorToThroat ? 'manifestor' : 'projector';
}

/**
 * Внутренний авторитет — первый сверху в иерархии. До G дело доходит, только
 * когда G определён каналом к горлу: остальные его каналы ведут в сакрал,
 * селезёнку и сердце — они выше по иерархии.
 */
export function hdAuthority(channels: readonly Channel[]): HdAuthority {
  const centers = new Set(definedCenters(channels));
  if (centers.size === 0) return 'lunar';
  if (centers.has('solarPlexus')) return 'emotional';
  if (centers.has('sacral')) return 'sacral';
  if (centers.has('spleen')) return 'splenic';
  if (centers.has('heart')) return 'ego';
  if (centers.has('g')) return 'selfProjected';
  return 'mental';
}

/** Определённость — число связных групп определённых центров (больше четырёх не бывает). */
export function hdDefinition(channels: readonly Channel[]): HdDefinition {
  const remaining = new Set(definedCenters(channels));
  let groups = 0;
  for (const center of CENTER_IDS) {
    if (!remaining.has(center)) continue;
    groups += 1;
    for (const c of reachable(center, channels)) remaining.delete(c);
  }
  return HD_DEFINITIONS[groups];
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/rules.ts
git commit -m "feat(hd): тип, стратегия, авторитет и определённость

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/rules.test.ts'`
Expected: PASS, 22 теста.

---

### Task 6: Эфемериды: 13 тел, истинный узел, момент дизайна

**Files:**
- Create: `src/lib/human-design/ephemeris.ts`
- Modify: `package.json`, `pnpm-lock.yaml` (`astronomy-engine` 2.1.19)
- Test: `src/lib/human-design/ephemeris.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Ожидаемые долготы в тесте — Swiss Ephemeris (pyswisseph 2.10.03, файлы `sepl_18`/`semo_18`), сняты на ноде 08.10.2026. Истинный узел — оскулирующий, не по Миусу: см. «Что выяснено», п. 1.

- [ ] **Step 1: Написать тест**

`src/lib/human-design/ephemeris.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { BODIES, designDate, longitudes } from './ephemeris';

/**
 * Долготы Swiss Ephemeris 2.10.03 (файлы sepl_18/semo_18, видимые
 * геоцентрические, истинное равноденствие даты, SE_TRUE_NODE), сняты
 * pyswisseph на тестовой ноде 08.10.2026. Порядок — BODIES. Дизайн — момент
 * swe.solcross_ut(Солнце − 88°). Полная сверка по 300 картам — reference.test.ts.
 */
const SWISS = [
  {
    utc: '1990-03-12T11:25:00Z',
    design: '1989-12-15T15:03:16.493Z',
    lon: [351.625109, 171.625109, 316.102305, 136.102305, 183.218065, 345.522581, 306.600812,
      300.601743, 91.211936, 293.101051, 279.140717, 284.238407, 227.656249],
  },
  {
    utc: '2001-11-23T22:50:00Z',
    design: '2001-08-26T21:58:58.850Z',
    lon: [241.719121, 61.719121, 87.485919, 267.485919, 342.341215, 235.540486, 229.301596,
      319.165002, 104.938991, 72.264591, 321.154427, 306.371534, 254.597482],
  },
  {
    utc: '1962-01-30T13:00:00Z',
    design: '1961-11-04T19:59:57.425Z',
    lon: [310.166213, 130.166213, 138.076059, 318.076059, 238.378714, 322.028993, 310.913518,
      298.122247, 317.309254, 303.160739, 149.274015, 223.433574, 159.547232],
  },
];

/** Разность долгот в угловых секундах, с учётом перехода через 0°. */
const arcsec = (a: number, b: number) => Math.abs((((a - b) % 360) + 540) % 360 - 180) * 3600;

describe('эфемериды против Swiss Ephemeris', () => {
  for (const c of SWISS) {
    it(`${c.utc}: все 13 тел ближе 1′`, () => {
      const lon = longitudes(new Date(c.utc));
      const far = BODIES.map((body, i) => ({ body, sec: arcsec(lon[body], c.lon[i]) })).filter((x) => x.sec >= 60);
      expect(far).toEqual([]);
    });

    it(`${c.utc}: момент дизайна — в пределах 2 минут`, () => {
      const ours = designDate(new Date(c.utc)).getTime();
      expect(Math.abs(ours - new Date(c.design).getTime())).toBeLessThan(120_000);
    });
  }

  it('Земля напротив Солнца, южный узел напротив северного', () => {
    const lon = longitudes(new Date(SWISS[0].utc));
    expect(arcsec(lon.earth, lon.sun + 180)).toBeLessThan(1e-6);
    expect(arcsec(lon.southNode, lon.northNode + 180)).toBeLessThan(1e-6);
  });

  it('Солнце дизайна ровно на 88° позади', () => {
    const birth = new Date(SWISS[1].utc);
    const sunBirth = longitudes(birth).sun;
    const sunDesign = longitudes(designDate(birth)).sun;
    expect(arcsec(sunDesign, sunBirth - 88)).toBeLessThan(0.5);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/ephemeris.test.ts
git commit -m "test(hd): эфемериды против Swiss Ephemeris — 13 тел ближе 1′, дизайн ближе 2 минут (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/ephemeris.test.ts'`
Expected: FAIL — `Failed to resolve import "./ephemeris"`.

- [ ] **Step 4: Зависимость — на ноде, обратно на мак**

`pnpm install` на маке не запускается, поэтому зависимость добавляется в воркдереве ноды (оно стоит на коммите из Step 2), а `package.json` и `pnpm-lock.yaml` копируются обратно:

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'cd ~/ci/wt/hd-calc && source ~/.nvm/nvm.sh && pnpm add astronomy-engine@2.1.19 > /tmp/hd-add.log 2>&1 && grep -n astronomy package.json'
scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231:ci/wt/hd-calc/package.json dv@85.192.61.231:ci/wt/hd-calc/pnpm-lock.yaml ~/Downloads/land_linkeon/.worktrees/hd-calc/
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'git -C ~/ci/wt/hd-calc checkout -- package.json pnpm-lock.yaml'
git -C ~/Downloads/land_linkeon/.worktrees/hd-calc diff --stat
```

Expected: в `package.json` строка `"astronomy-engine": "2.1.19"` (точная версия), в диффе — `package.json` (+1) и `pnpm-lock.yaml` (+8). Последний `checkout` на ноде — чтобы следующий `node-run` не споткнулся о локальную правку.

- [ ] **Step 5: Реализация**

`src/lib/human-design/ephemeris.ts`:

```ts
import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoMoonState,
  GeoVector,
  MakeTime,
  RotateState,
  Rotation_EQJ_ECT,
  SunPosition,
} from 'astronomy-engine';
import { normalizeDegrees } from './wheel';

/** 13 тел карты — в принятом в Human Design порядке. */
export const BODIES = [
  'sun', 'earth', 'northNode', 'southNode', 'moon', 'mercury', 'venus',
  'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
] as const;
export type BodyId = (typeof BODIES)[number];

const PLANETS = {
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
  pluto: Body.Pluto,
} as const;

const RAD = Math.PI / 180;

/**
 * Истинный (оскулирующий) восходящий узел Луны: пересечение мгновенной
 * плоскости лунной орбиты с истинной эклиптикой даты. Плоскость — из векторов
 * положения и скорости Луны (r × v), так же считает SE_TRUE_NODE Swiss
 * Ephemeris. Формула Миуса (гл. 47, средний узел + 5 периодических членов)
 * расходится с SE_TRUE_NODE до 16′ (замер 08.10.2026, 3000 дат 1920–2025:
 * медиана 3,2′), а этот способ — до 16″.
 */
export function trueNodeLongitude(date: Date): number {
  const time = MakeTime(date);
  const s = RotateState(Rotation_EQJ_ECT(time), GeoMoonState(time));
  const hx = s.y * s.vz - s.z * s.vy;
  const hy = s.z * s.vx - s.x * s.vz;
  return normalizeDegrees(Math.atan2(hx, -hy) / RAD);
}

/** Видимые геоцентрические долготы 13 тел: тропический зодиак, истинная эклиптика даты. */
export function longitudes(date: Date): Record<BodyId, number> {
  const sun = SunPosition(date).elon;
  const node = trueNodeLongitude(date);
  const planets = Object.fromEntries(
    Object.entries(PLANETS).map(([id, body]) => [id, Ecliptic(GeoVector(body, date, true)).elon]),
  ) as Record<keyof typeof PLANETS, number>;
  return {
    sun,
    earth: normalizeDegrees(sun + 180),
    northNode: node,
    southNode: normalizeDegrees(node + 180),
    moon: EclipticGeoMoon(date).lon,
    ...planets,
  };
}

const DAY_MS = 86_400_000;
/** Средняя скорость Солнца, °/сутки: шаг итерации. */
const SUN_DEG_PER_DAY = 360 / 365.2422;

/**
 * Момент дизайна: Солнце ровно на 88° эклиптической долготы позади Солнца
 * рождения (около 88–89 суток раньше). Ньютон по долготе Солнца сходится
 * за 3–4 шага; 10 — с запасом.
 */
export function designDate(birth: Date): Date {
  const target = normalizeDegrees(SunPosition(birth).elon - 88);
  let t = birth.getTime() - (88 / SUN_DEG_PER_DAY) * DAY_MS;
  for (let i = 0; i < 10; i++) {
    let delta = normalizeDegrees(target - SunPosition(new Date(t)).elon);
    if (delta > 180) delta -= 360;
    t += (delta / SUN_DEG_PER_DAY) * DAY_MS;
    if (Math.abs(delta) < 1e-7) break;
  }
  return new Date(Math.round(t));
}
```

- [ ] **Step 6: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/ephemeris.ts package.json pnpm-lock.yaml
git commit -m "feat(hd): эфемериды astronomy-engine — 13 тел, оскулирующий узел, дизайн по 88°

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/ephemeris.test.ts'`
Expected: PASS, 8 тестов. Падение «ближе 1′» по узлу — проверить, что узел считается через `GeoMoonState` и `Rotation_EQJ_ECT`, а не формулой.

---

### Task 7: Местное время → UTC через Intl

**Files:**
- Create: `src/lib/human-design/time.ts`
- Test: `src/lib/human-design/time.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Ожидания посчитаны независимо — Python `zoneinfo` с tzdata 2026e — и совпали с `Intl` в Node 22 (ICU, tzdata 2026a). Декретное время 1930, зима 1991/92, «вечное летнее» 2011 и возврат 2014, пропущенный и повторённый час.

- [ ] **Step 1: Написать тест**

`src/lib/human-design/time.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { formatOffset, localToUtc, type Conversion } from './time';

/**
 * Ожидания посчитаны независимо — Python zoneinfo с tzdata 2026e — и совпали
 * с Intl в Node 22 (ICU, tzdata 2026a), 08.10.2026.
 */
const utc = (c: Conversion) => (c.kind === 'ok' ? c.utc.toISOString() : c.kind);
const at = (date: string, time: string, zone: string) => localToUtc({ date, time }, zone);

describe('местное время → UTC', () => {
  it('декретное время 1930: Москва с 21 июня — UTC+3 вместо UTC+2', () => {
    expect(utc(at('1930-06-20', '12:00', 'Europe/Moscow'))).toBe('1930-06-20T10:00:00.000Z');
    expect(utc(at('1930-06-22', '12:00', 'Europe/Moscow'))).toBe('1930-06-22T09:00:00.000Z');
  });

  it('1991–1992: Москва зимой UTC+2, потом снова UTC+3', () => {
    expect(utc(at('1991-03-31', '12:00', 'Europe/Moscow'))).toBe('1991-03-31T09:00:00.000Z');
    expect(utc(at('1991-12-01', '12:00', 'Europe/Moscow'))).toBe('1991-12-01T10:00:00.000Z');
    expect(utc(at('1992-02-01', '12:00', 'Europe/Moscow'))).toBe('1992-02-01T09:00:00.000Z');
    // Самара в ту же зиму осталась на UTC+4.
    expect(utc(at('1991-12-01', '12:00', 'Europe/Samara'))).toBe('1991-12-01T08:00:00.000Z');
  });

  it('2011–2014: «вечное летнее» время и возврат', () => {
    expect(utc(at('2012-01-15', '12:00', 'Europe/Moscow'))).toBe('2012-01-15T08:00:00.000Z');
    expect(utc(at('2015-01-15', '12:00', 'Europe/Moscow'))).toBe('2015-01-15T09:00:00.000Z');
    expect(utc(at('2012-01-15', '12:00', 'Asia/Yekaterinburg'))).toBe('2012-01-15T06:00:00.000Z');
    expect(utc(at('2015-01-15', '12:00', 'Asia/Yekaterinburg'))).toBe('2015-01-15T07:00:00.000Z');
    expect(utc(at('2012-01-15', '12:00', 'Europe/Kaliningrad'))).toBe('2012-01-15T09:00:00.000Z');
    expect(utc(at('2015-01-15', '12:00', 'Europe/Kaliningrad'))).toBe('2015-01-15T10:00:00.000Z');
  });

  it('пропущенный час: стрелки вперёд — спрашиваем', () => {
    const c = at('2010-03-28', '02:30', 'Europe/Moscow');
    expect(c.kind).toBe('gap');
    if (c.kind !== 'gap') return;
    expect(c.before.utc.toISOString()).toBe('2010-03-27T23:30:00.000Z');
    expect(c.before.offsetSeconds).toBe(3 * 3600);
    expect(c.after.utc.toISOString()).toBe('2010-03-27T22:30:00.000Z');
    expect(c.after.offsetSeconds).toBe(4 * 3600);
    expect(at('1930-06-21', '00:30', 'Europe/Moscow').kind).toBe('gap');
    expect(at('1992-01-19', '02:30', 'Europe/Moscow').kind).toBe('gap');
    expect(at('2011-03-27', '02:30', 'Europe/Moscow').kind).toBe('gap');
  });

  it('повторённый час: стрелки назад — спрашиваем', () => {
    const c = at('2014-10-26', '01:30', 'Europe/Moscow');
    expect(c.kind).toBe('ambiguous');
    if (c.kind !== 'ambiguous') return;
    expect(c.before.utc.toISOString()).toBe('2014-10-25T21:30:00.000Z');
    expect(c.after.utc.toISOString()).toBe('2014-10-25T22:30:00.000Z');
    expect(at('2010-10-31', '02:30', 'Europe/Moscow').kind).toBe('ambiguous');
    expect(at('1991-09-29', '02:30', 'Europe/Moscow').kind).toBe('ambiguous');
  });

  it('не только Россия: Нью-Йорк, пояса с получасом', () => {
    expect(at('2021-03-14', '02:30', 'America/New_York').kind).toBe('gap');
    expect(at('2021-11-07', '01:30', 'America/New_York').kind).toBe('ambiguous');
    expect(utc(at('1990-03-12', '14:25', 'Asia/Kolkata'))).toBe('1990-03-12T08:55:00.000Z');
    expect(utc(at('1990-03-12', '14:25', 'Asia/Kathmandu'))).toBe('1990-03-12T08:40:00.000Z');
    expect(utc(at('1990-03-12', '14:25', 'America/Los_Angeles'))).toBe('1990-03-12T22:25:00.000Z');
  });

  it('неизвестный пояс — ошибка, а не тихий UTC', () => {
    expect(() => at('1990-03-12', '14:25', 'Mars/Olympus')).toThrow(RangeError);
  });
});

describe('подпись смещения', () => {
  it('часы, минуты, знак', () => {
    expect(formatOffset(3 * 3600)).toBe('UTC+3');
    expect(formatOffset(5.5 * 3600)).toBe('UTC+5:30');
    expect(formatOffset(5.75 * 3600)).toBe('UTC+5:45');
    expect(formatOffset(-8 * 3600)).toBe('UTC-8');
    expect(formatOffset(0)).toBe('UTC+0');
    // Местное среднее время 1920-х: секунды не показываем.
    expect(formatOffset(2 * 3600 + 31 * 60 + 19)).toBe('UTC+2:31');
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/time.test.ts
git commit -m "test(hd): местное время → UTC — декрет 1930, 1991, 2011, 2014, перевод стрелок (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/time.test.ts'`
Expected: FAIL — `Failed to resolve import "./time"`.

- [ ] **Step 4: Реализация**

`src/lib/human-design/time.ts`:

```ts
/**
 * Местное время рождения → момент в UTC через встроенную базу поясов браузера
 * (Intl): она знает историю поясов, декретное и летнее время.
 *
 * Перевод стрелок даёт два особых случая — оба возвращаются явно, выбор
 * делает человек:
 *  - gap: такого времени на часах не было (стрелки перевели вперёд);
 *  - ambiguous: время было дважды (стрелки перевели назад).
 * В обоих случаях `before` — прочтение по времени ДО перевода, `after` — ПОСЛЕ.
 */
export interface LocalDateTime {
  /** 'YYYY-MM-DD' */
  date: string;
  /** 'HH:MM' */
  time: string;
}

export interface Moment {
  utc: Date;
  /** Смещение пояса в секундах: +10800 = UTC+3. */
  offsetSeconds: number;
}

export type Conversion =
  | ({ kind: 'ok' } & Moment)
  | { kind: 'gap' | 'ambiguous'; before: Moment; after: Moment };

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(zone: string): Intl.DateTimeFormat {
  let f = formatters.get(zone);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    formatters.set(zone, f);
  }
  return f;
}

/** Смещение пояса (секунды) в момент `ms` UTC. */
export function zoneOffsetSeconds(zone: string, ms: number): number {
  const parts: Record<string, number> = {};
  for (const p of formatter(zone).formatToParts(new Date(ms))) {
    if (p.type !== 'literal') parts[p.type] = Number(p.value);
  }
  // Старые движки отдают полночь как «24».
  const hour = parts.hour === 24 ? 0 : parts.hour;
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, hour, parts.minute, parts.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 1000);
}

const DAY_MS = 86_400_000;

function parseLocal({ date, time }: LocalDateTime): number {
  const [y, mo, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  return Date.UTC(y, mo - 1, d, h, mi, 0);
}

/**
 * Перевод. Смещения берутся за сутки до и через сутки после: между ними
 * укладывается любой перевод стрелок. Каждое проверяется обратным ходом.
 */
export function localToUtc(local: LocalDateTime, zone: string): Conversion {
  const wall = parseLocal(local);
  const before = zoneOffsetSeconds(zone, wall - DAY_MS);
  const after = zoneOffsetSeconds(zone, wall + DAY_MS);
  const moment = (offsetSeconds: number): Moment => ({ utc: new Date(wall - offsetSeconds * 1000), offsetSeconds });
  const fits = (offset: number) => zoneOffsetSeconds(zone, wall - offset * 1000) === offset;
  const valid = [...new Set([before, after])].filter(fits);
  if (valid.length === 1) return { kind: 'ok', ...moment(valid[0]) };
  return { kind: valid.length === 0 ? 'gap' : 'ambiguous', before: moment(before), after: moment(after) };
}

/** «UTC+3», «UTC+5:30», «UTC-8», «UTC+0». Секунды старых поясов отбрасываются. */
export function formatOffset(offsetSeconds: number): string {
  const sign = offsetSeconds < 0 ? '-' : '+';
  const total = Math.floor(Math.abs(offsetSeconds) / 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/time.ts
git commit -m "feat(hd): перевод местного времени в UTC через Intl, вопрос о переводе стрелок

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/time.test.ts'`
Expected: PASS, 8 тестов.

---

### Task 8: Карта и публичный интерфейс модуля

**Files:**
- Create: `src/lib/human-design/chart.ts`, `src/lib/human-design/index.ts`
- Test: `src/lib/human-design/chart.test.ts`, `src/lib/human-design/boundary.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Здесь фиксируется контракт из раздела «Публичный интерфейс модуля». `HdChart` сериализуется в JSON как есть: второй этап отдаст его из MCP-инструмента.

- [ ] **Step 1: Написать тесты**

`src/lib/human-design/chart.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { calculateChart, chartFromUtc, type Activation } from './chart';

const gl = (xs: Activation[]) => xs.map((a) => `${a.gate}.${a.line}`).join(' ');

describe('карта по моменту в UTC', () => {
  // Ворота.линии — Swiss Ephemeris на тот же момент (см. ephemeris.test.ts).
  const c = chartFromUtc('1990-03-12T11:25:00Z');

  it('26 активаций как у Swiss Ephemeris', () => {
    expect(c.personality).toHaveLength(13);
    expect(c.design).toHaveLength(13);
    expect(gl(c.personality)).toBe('22.5 47.5 13.4 7.4 46.6 63.5 41.5 60.5 15.4 61.3 58.6 38.6 1.5');
    expect(gl(c.design)).toBe('11.2 12.2 13.5 7.5 31.1 38.3 41.2 14.4 52.4 38.5 58.1 38.3 1.4');
  });

  it('каналы, центры, профиль', () => {
    expect(c.channels).toEqual(['7-31', '12-22']);
    expect(c.definedCenters).toEqual(['throat', 'g', 'solarPlexus']);
    expect(c.openCenters).toEqual(['head', 'ajna', 'heart', 'spleen', 'sacral', 'root']);
    expect(c.profile).toBe('5/2');
  });

  it('стратегия следует из типа', () => {
    expect(c.type).toBe('manifestor');
    expect(c.strategy).toBe('inform');
  });

  it('сериализуется в JSON без потерь', () => {
    expect(JSON.parse(JSON.stringify(c))).toEqual(c);
    expect(c.birthUtc).toBe('1990-03-12T11:25:00.000Z');
  });

  it('ворота без повторов и по возрастанию', () => {
    expect(c.gates).toEqual([...new Set(c.gates)].sort((a, b) => a - b));
  });
});

describe('карта по местному времени — публичный вход', () => {
  it('обычное время — сразу карта и смещение пояса', () => {
    const r = calculateChart({ date: '1990-03-12', time: '14:25', zone: 'Europe/Moscow' });
    expect(r.kind).toBe('ok');
    if (r.kind !== 'ok') return;
    expect(r.chart.birthUtc).toBe('1990-03-12T11:25:00.000Z');
    expect(r.offsetSeconds).toBe(3 * 3600);
  });

  it('час перевода стрелок без выбора — вопрос, с выбором — карта', () => {
    const ask = calculateChart({ date: '2014-10-26', time: '01:30', zone: 'Europe/Moscow' });
    expect(ask).toEqual({ kind: 'needsDstChoice', transition: 'ambiguous', beforeOffsetSeconds: 14400, afterOffsetSeconds: 10800 });
    const after = calculateChart({ date: '2014-10-26', time: '01:30', zone: 'Europe/Moscow', dst: 'after' });
    expect(after.kind === 'ok' && after.chart.birthUtc).toBe('2014-10-25T22:30:00.000Z');
  });

  it('выбор вне часа перевода ни на что не влияет', () => {
    const a = calculateChart({ date: '1990-03-12', time: '14:25', zone: 'Europe/Moscow', dst: 'before' });
    expect(a.kind === 'ok' && a.chart.birthUtc).toBe('1990-03-12T11:25:00.000Z');
  });

  it('неверный ввод и неизвестный пояс — RangeError', () => {
    expect(() => calculateChart({ date: '12.03.1990', time: '14:25', zone: 'Europe/Moscow' })).toThrow(RangeError);
    expect(() => calculateChart({ date: '1990-02-30', time: '14:25', zone: 'Europe/Moscow' })).toThrow(RangeError);
    expect(() => calculateChart({ date: '1990-03-12', time: '24:10', zone: 'Europe/Moscow' })).toThrow(RangeError);
    expect(() => calculateChart({ date: '1990-03-12', time: '14:25', zone: 'Mars/Olympus' })).toThrow(RangeError);
  });
});
```

`src/lib/human-design/boundary.test.ts`:

```ts
import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * Граница модуля: второй этап возьмёт его на бэкенд (Node), поэтому здесь
 * нет браузерных API, React, сборочных трюков Vite и импортов из лендинга.
 * Разрешены только соседние файлы модуля и astronomy-engine.
 */
const dir = new URL('./', import.meta.url);
const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  .map((f) => ({
    file: f,
    // Комментарии не в счёт: «ни window, ни document» в пояснении — не код.
    code: readFileSync(new URL(f, dir), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, ''),
  }));

describe('граница модуля human-design', () => {
  it('файлы на месте', () => {
    expect(sources.map((s) => s.file)).toContain('index.ts');
  });

  it('без браузерных API и React', () => {
    const forbidden = /\b(window|document|localStorage|sessionStorage|navigator|fetch|React)\b|import\.meta/;
    for (const { file, code } of sources) expect(code, file).not.toMatch(forbidden);
  });

  it('импорты — только свои файлы и astronomy-engine', () => {
    for (const { file, code } of sources) {
      for (const [, spec] of code.matchAll(/from\s+'([^']+)'/g)) {
        expect(spec === 'astronomy-engine' || /^\.\/[\w-]+$/.test(spec), `${file}: ${spec}`).toBe(true);
      }
      expect(code, `${file}: динамический импорт`).not.toMatch(/\bimport\(/);
    }
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/chart.test.ts src/lib/human-design/boundary.test.ts
git commit -m "test(hd): карта по UTC и по местному времени, граница модуля без браузера (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тесты падают**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/chart.test.ts src/lib/human-design/boundary.test.ts'`
Expected: FAIL — `Failed to resolve import "./chart"`; в `boundary.test.ts` — «файлы на месте» (нет `index.ts`).

- [ ] **Step 4: Реализация**

`src/lib/human-design/chart.ts`:

```ts
import { BODIES, designDate, longitudes, type BodyId } from './ephemeris';
import { gateLine } from './wheel';
import { CENTER_IDS, channelKey, type CenterId } from './bodygraph';
import {
  STRATEGY_OF,
  definedCenters,
  definedChannels,
  hdAuthority,
  hdDefinition,
  hdType,
  type HdAuthority,
  type HdDefinition,
  type HdStrategy,
  type HdType,
} from './rules';
import { localToUtc } from './time';

export interface Activation {
  body: BodyId;
  /** Видимая геоцентрическая долгота, градусы, тропический зодиак. */
  longitude: number;
  gate: number;
  line: number;
}

/** Карта — всё, что считает модуль. Сериализуется в JSON как есть. */
export interface HdChart {
  /** Момент рождения, ISO в UTC. */
  birthUtc: string;
  /** Момент дизайна: Солнце на 88° эклиптической долготы позади Солнца рождения. */
  designUtc: string;
  /** По 13 активаций в порядке BODIES — личность (рождение) и дизайн, всего 26. */
  personality: Activation[];
  design: Activation[];
  /** Все активированные ворота, по возрастанию. */
  gates: number[];
  /** Определённые каналы: «7-31», меньшие ворота первыми. */
  channels: string[];
  definedCenters: CenterId[];
  openCenters: CenterId[];
  type: HdType;
  strategy: HdStrategy;
  authority: HdAuthority;
  /** «5/2»: линия Солнца личности / линия Солнца дизайна. */
  profile: string;
  definition: HdDefinition;
}

function activations(date: Date): Activation[] {
  const lon = longitudes(date);
  return BODIES.map((body) => ({ body, longitude: lon[body], ...gateLine(lon[body]) }));
}

/** Карта по моменту рождения в UTC. Место рождения в формулы не входит. */
export function chartFromUtc(birth: Date | string): HdChart {
  const birthDate = new Date(birth);
  if (Number.isNaN(birthDate.getTime())) throw new RangeError(`нет такого момента: ${String(birth)}`);
  const design = designDate(birthDate);
  const personality = activations(birthDate);
  const designActs = activations(design);
  const gates = [...new Set([...personality, ...designActs].map((a) => a.gate))].sort((a, b) => a - b);
  const channels = definedChannels(new Set(gates));
  const defined = definedCenters(channels);
  const type = hdType(channels);
  return {
    birthUtc: birthDate.toISOString(),
    designUtc: design.toISOString(),
    personality,
    design: designActs,
    gates,
    channels: channels.map(channelKey),
    definedCenters: defined,
    openCenters: CENTER_IDS.filter((c) => !defined.includes(c)),
    type,
    strategy: STRATEGY_OF[type],
    authority: hdAuthority(channels),
    profile: `${personality[0].line}/${designActs[0].line}`,
    definition: hdDefinition(channels),
  };
}

/** Вход публичного интерфейса: местные дата и время рождения и IANA-пояс. */
export interface BirthInput {
  /** 'YYYY-MM-DD' */
  date: string;
  /** 'HH:MM', 24 часа */
  time: string;
  /** IANA: 'Europe/Moscow' */
  zone: string;
  /** Если время попало в час перевода стрелок: по часам до перевода или после. */
  dst?: 'before' | 'after';
}

export type ChartResult =
  | { kind: 'ok'; chart: HdChart; offsetSeconds: number }
  | {
      kind: 'needsDstChoice';
      /** gap — такого времени на часах не было, ambiguous — было дважды. */
      transition: 'gap' | 'ambiguous';
      beforeOffsetSeconds: number;
      afterOffsetSeconds: number;
    };

const DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME = /^(\d{2}):(\d{2})$/;

/**
 * Карта по местному времени рождения. Время в час перевода стрелок без `dst`
 * не угадывается — возвращается вопрос. Неверный ввод или неизвестный
 * пояс — RangeError.
 */
export function calculateChart(input: BirthInput): ChartResult {
  const d = DATE.exec(input.date);
  const t = TIME.exec(input.time);
  if (!d || !t) throw new RangeError(`дата 'YYYY-MM-DD' и время 'HH:MM', получено ${input.date} ${input.time}`);
  const [y, m, day] = [Number(d[1]), Number(d[2]), Number(d[3])];
  const check = new Date(Date.UTC(y, m - 1, day));
  if (check.getUTCMonth() !== m - 1 || check.getUTCDate() !== day || Number(t[1]) > 23 || Number(t[2]) > 59) {
    throw new RangeError(`нет такой даты или времени: ${input.date} ${input.time}`);
  }
  const conversion = localToUtc({ date: input.date, time: input.time }, input.zone);
  if (conversion.kind === 'ok') {
    return { kind: 'ok', chart: chartFromUtc(conversion.utc), offsetSeconds: conversion.offsetSeconds };
  }
  if (!input.dst) {
    return {
      kind: 'needsDstChoice',
      transition: conversion.kind,
      beforeOffsetSeconds: conversion.before.offsetSeconds,
      afterOffsetSeconds: conversion.after.offsetSeconds,
    };
  }
  const moment = conversion[input.dst];
  return { kind: 'ok', chart: chartFromUtc(moment.utc), offsetSeconds: moment.offsetSeconds };
}
```

`src/lib/human-design/index.ts` (экспорт схемы SVG добавит Task 9):

```ts
/**
 * Модуль расчёта Human Design — публичный интерфейс.
 *
 * Чистый TypeScript без браузерных API и без React: тот же модуль возьмёт
 * второй этап — Райя считает и рисует бодиграф в чате через инструмент MCP
 * на бэкенде (Node). Границу держит boundary.test.ts. Местное время
 * переводится через Intl — он есть и в браузере, и в Node.
 *
 * Контракт:
 *   calculateChart({ date: 'YYYY-MM-DD', time: 'HH:MM', zone: IANA, dst? })
 *     → { kind: 'ok', chart, offsetSeconds }
 *     | { kind: 'needsDstChoice', transition, beforeOffsetSeconds, afterOffsetSeconds }
 *   chartFromUtc(момент в UTC) → HdChart
 *   renderBodygraphSvg(chart, { label?, colors? }) → строка SVG
 * HdChart: birthUtc, designUtc, personality[13] + design[13] (26 активаций),
 * gates, channels, definedCenters, openCenters, type, strategy, authority,
 * profile, definition. Неверный ввод и неизвестный пояс — RangeError.
 */
export { calculateChart, chartFromUtc } from './chart';
export type { Activation, BirthInput, ChartResult, HdChart } from './chart';
export { formatOffset, localToUtc } from './time';
export type { Conversion, LocalDateTime, Moment } from './time';
export { BODIES } from './ephemeris';
export type { BodyId } from './ephemeris';
export { CENTER_IDS, CHANNELS, channelKey } from './bodygraph';
export type { CenterId, Channel } from './bodygraph';
export { HD_AUTHORITIES, HD_DEFINITIONS, HD_STRATEGIES, HD_TYPES, STRATEGY_OF } from './rules';
export type { HdAuthority, HdDefinition, HdStrategy, HdType } from './rules';
export { gateLine } from './wheel';
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/chart.ts src/lib/human-design/index.ts
git commit -m "feat(hd): карта Human Design и публичный интерфейс модуля

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тесты проходят, граница держит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design'`
Expected: PASS — `chart.test.ts` 9 тестов, `boundary.test.ts` 3, остальные файлы модуля зелёные.

Проверка, что граница не слепая: временно дописать в `src/lib/human-design/wheel.ts` строку `export const x = typeof window;` и повторить Run — `boundary.test.ts` обязан упасть на «без браузерных API и React». Правку откатить (`git checkout -- src/lib/human-design/wheel.ts`), ничего не коммитить.

---

### Task 9: Схема бодиграфа строкой SVG

**Files:**
- Create: `src/lib/human-design/layout.ts`, `src/lib/human-design/svg.ts`
- Modify: `src/lib/human-design/index.ts`
- Test: `src/lib/human-design/layout.test.ts`, `src/lib/human-design/svg.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Схема рисуется чистой функцией `renderBodygraphSvg(chart, options) → string` — без React и DOM: ту же строку вставит страница (Task 21) и отдаст бэкенд второго этапа. Цвета — атрибутами, не классами Tailwind: вне лендинга его стилей нет. Геометрия — своя, графику Jovian Archive не используем.

- [ ] **Step 1: Написать тесты**

`src/lib/human-design/layout.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { CENTER_GATES, CENTER_IDS, CHANNELS, channelKey } from './bodygraph';
import { CENTER_SHAPES, GATE_POINTS, GATE_RADIUS, VIEWBOX, channelHalves } from './layout';

const pts = (s: string) => s.split(' ').map((p) => p.split(',').map(Number) as [number, number]);

describe('геометрия схемы', () => {
  it('у каждых из 64 ворот есть точка', () => {
    expect(Object.keys(GATE_POINTS).map(Number).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 64 }, (_, i) => i + 1),
    );
  });

  it('ворота стоят в своём центре', () => {
    for (const center of CENTER_IDS) {
      const shape = pts(CENTER_SHAPES[center].points);
      const xs = shape.map(([x]) => x);
      const ys = shape.map(([, y]) => y);
      for (const gate of CENTER_GATES[center]) {
        const [x, y] = GATE_POINTS[gate];
        expect(x, `${gate} в ${center}`).toBeGreaterThanOrEqual(Math.min(...xs));
        expect(x, `${gate} в ${center}`).toBeLessThanOrEqual(Math.max(...xs));
        expect(y, `${gate} в ${center}`).toBeGreaterThanOrEqual(Math.min(...ys));
        expect(y, `${gate} в ${center}`).toBeLessThanOrEqual(Math.max(...ys));
      }
    }
  });

  it('кружки ворот не наезжают друг на друга', () => {
    const all = Object.entries(GATE_POINTS);
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const [[a, [ax, ay]], [b, [bx, by]]] = [all[i], all[j]];
        expect(Math.hypot(ax - bx, ay - by), `${a} и ${b}`).toBeGreaterThanOrEqual(2 * GATE_RADIUS);
      }
    }
  });

  it('всё внутри viewBox', () => {
    for (const [x, y] of Object.values(GATE_POINTS)) {
      expect(x - GATE_RADIUS).toBeGreaterThanOrEqual(0);
      expect(x + GATE_RADIUS).toBeLessThanOrEqual(VIEWBOX.width);
      expect(y - GATE_RADIUS).toBeGreaterThanOrEqual(0);
      expect(y + GATE_RADIUS).toBeLessThanOrEqual(VIEWBOX.height);
    }
  });

  it('половины канала начинаются в своих воротах и сходятся в середине', () => {
    for (const ch of CHANNELS) {
      const [first, second] = channelHalves(ch).map(pts);
      expect(first[0], channelKey(ch)).toEqual([...GATE_POINTS[ch[0]]]);
      expect(second[second.length - 1], channelKey(ch)).toEqual([...GATE_POINTS[ch[1]]]);
      expect(first[first.length - 1], channelKey(ch)).toEqual(second[0]);
    }
  });

  it('20-34 огибает G слева', () => {
    const [first, second] = channelHalves([20, 34]).map(pts);
    const xs = [...first, ...second].map(([x]) => x);
    expect(Math.min(...xs)).toBeLessThan(136);
  });
});
```

`src/lib/human-design/svg.test.ts`:

```ts
// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { renderBodygraphSvg } from './svg';
import { chartFromUtc } from './chart';

/**
 * Схема рисуется строкой без DOM — второй этап вызовет ту же функцию в Node
 * на бэкенде. Окружение здесь — node: ни window, ни document.
 */
const chart = chartFromUtc('1990-03-12T11:25:00Z');
const svg = renderBodygraphSvg(chart, { label: 'Бодиграф: Манифестор' });
const count = (re: RegExp) => (svg.match(re) ?? []).length;

/** Самозакрытые и парные теги сходятся — строка разбирается как XML. */
function unbalanced(xml: string): string[] {
  const stack: string[] = [];
  const problems: string[] = [];
  for (const [, closing, name, , selfClosing] of xml.matchAll(/<(\/?)([a-zA-Z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*(\/?)>/g)) {
    if (selfClosing) continue;
    if (!closing) stack.push(name);
    else if (stack.pop() !== name) problems.push(`</${name}>`);
  }
  return [...problems, ...stack.map((n) => `<${n}> не закрыт`)];
}

describe('бодиграф строкой SVG', () => {
  it('работает без браузера', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it('самостоятельный SVG: пространство имён, размеры, подпись', () => {
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 548"')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(svg).toContain('<title>Бодиграф: Манифестор</title>');
    expect(svg).toContain('role="img"');
  });

  it('теги сходятся, лишнего в строке нет', () => {
    expect(unbalanced(svg)).toEqual([]);
    // Всё, что не тег, — текст между тегами: номера ворот и подпись.
    expect(svg.replace(/<[^>]+>/g, '').replace(/\d+/g, '').replace('Бодиграф: Манифестор', '')).toBe('');
    expect(svg).not.toMatch(/undefined|NaN|null/);
  });

  it('девять центров, 36 каналов, 64 ворот; закрашены определённые', () => {
    expect(count(/<polygon /g)).toBe(9);
    expect(count(/data-channel="/g)).toBe(36);
    expect(count(/<circle /g)).toBe(64);
    const defined = [...svg.matchAll(/data-center="(\w+)" data-defined="true"/g)].map((m) => m[1]);
    expect(defined).toEqual(chart.definedCenters);
  });

  it('подпись экранируется', () => {
    const evil = renderBodygraphSvg(chart, { label: '<script>"&' });
    expect(evil).toContain('<title>&lt;script&gt;&quot;&amp;</title>');
    expect(evil).not.toContain('<script>');
  });

  it('цвета можно заменить', () => {
    expect(renderBodygraphSvg(chart, { colors: { design: '#ff0000' } })).toContain('#ff0000');
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/layout.test.ts src/lib/human-design/svg.test.ts
git commit -m "test(hd): геометрия схемы и бодиграф строкой SVG в node (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тесты падают**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/layout.test.ts src/lib/human-design/svg.test.ts'`
Expected: FAIL — `Failed to resolve import "./layout"` и `"./svg"`.

- [ ] **Step 4: Геометрия**

`src/lib/human-design/layout.ts`:

```ts
import type { CenterId, Channel } from './bodygraph';

/**
 * Геометрия своей схемы бодиграфа (графику Jovian Archive не используем).
 * Координаты — в единицах viewBox 0 0 360 548. Каждые ворота — точка внутри
 * своего центра; канал — ломаная от ворот к воротам. Промежуточная точка
 * нужна одному каналу, 20-34: прямая прошла бы сквозь центр G.
 */
export const VIEWBOX = { width: 360, height: 548 } as const;

/** Радиус кружка ворот. */
export const GATE_RADIUS = 7;

export const CENTER_SHAPES: Readonly<Record<CenterId, { points: string }>> = {
  head: { points: '180,8 222,66 138,66' },
  ajna: { points: '138,82 222,82 180,140' },
  throat: { points: '142,160 218,160 218,230 142,230' },
  g: { points: '180,256 224,300 180,344 136,300' },
  heart: { points: '228,350 276,326 276,374' },
  spleen: { points: '24,352 96,402 24,452' },
  solarPlexus: { points: '336,352 264,402 336,452' },
  sacral: { points: '142,380 218,380 218,450 142,450' },
  root: { points: '142,466 218,466 218,536 142,536' },
};

export const GATE_POINTS: Readonly<Record<number, readonly [number, number]>> = {
  // голова
  64: [158, 58], 61: [180, 58], 63: [202, 58],
  // аджна
  47: [158, 90], 24: [180, 90], 4: [202, 90], 17: [164, 108], 11: [196, 108], 43: [180, 128],
  // горло
  62: [164, 168], 23: [180, 168], 56: [196, 168], 16: [150, 186], 20: [150, 212],
  35: [210, 180], 12: [210, 196], 45: [210, 212], 31: [164, 222], 8: [180, 222], 33: [196, 222],
  // G
  1: [180, 266], 7: [166, 282], 13: [194, 282], 10: [146, 300], 25: [214, 300],
  15: [166, 318], 46: [194, 318], 2: [180, 334],
  // сердце
  21: [262, 337], 51: [240, 350], 26: [252, 358], 40: [268, 364],
  // селезёнка
  48: [36, 364], 57: [52, 374], 44: [70, 386], 50: [86, 402], 32: [70, 418], 28: [52, 430], 18: [36, 440],
  // солнечное сплетение
  36: [324, 364], 22: [312, 372], 37: [290, 386], 6: [274, 402], 49: [290, 418], 55: [308, 430], 30: [324, 440],
  // сакрал
  5: [164, 388], 14: [180, 388], 29: [196, 388], 34: [150, 402], 27: [150, 430], 59: [210, 416],
  42: [164, 442], 3: [180, 442], 9: [196, 442],
  // корень
  53: [164, 474], 60: [180, 474], 52: [196, 474], 54: [150, 492], 38: [150, 510], 58: [150, 528],
  19: [210, 492], 39: [210, 510], 41: [210, 528],
};

/** Промежуточные точки каналов, которым прямая не годится. */
const WAYPOINTS: Readonly<Record<string, readonly (readonly [number, number])[]>> = {
  '20-34': [[126, 300]],
};

/**
 * Две половины канала: от первых ворот до середины ломаной и от середины до
 * вторых. Половина закрашивается, если активны её ворота.
 */
export function channelHalves([a, b]: Channel): [string, string] {
  const points = [GATE_POINTS[a], ...(WAYPOINTS[`${a}-${b}`] ?? []), GATE_POINTS[b]];
  const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  let rest = lengths.reduce((x, y) => x + y, 0) / 2;
  let i = 0;
  while (rest > lengths[i]) {
    rest -= lengths[i];
    i += 1;
  }
  const t = rest / lengths[i];
  const mid: [number, number] = [
    points[i][0] + (points[i + 1][0] - points[i][0]) * t,
    points[i][1] + (points[i + 1][1] - points[i][1]) * t,
  ];
  const fmt = (p: readonly [number, number]) => `${Math.round(p[0] * 10) / 10},${Math.round(p[1] * 10) / 10}`;
  const first = [...points.slice(0, i + 1), mid].map(fmt).join(' ');
  const second = [mid, ...points.slice(i + 1)].map(fmt).join(' ');
  return [first, second];
}
```

- [ ] **Step 5: Отрисовка**

`src/lib/human-design/svg.ts`:

```ts
import { CENTER_IDS, CHANNELS, channelKey } from './bodygraph';
import { CENTER_SHAPES, GATE_POINTS, GATE_RADIUS, VIEWBOX, channelHalves } from './layout';
import type { HdChart } from './chart';

/**
 * Бодиграф строкой SVG — без React и DOM: одна и та же функция рисует схему
 * на странице калькулятора и (второй этап) в ответе Райи с бэкенда.
 * Свою графику рисуем сами, графику Jovian Archive не используем.
 *
 * Цвета — атрибутами, а не классами: строка должна выглядеть одинаково и
 * вне лендинга, где его стилей нет.
 */
export interface BodygraphColors {
  /** Ворота и половины каналов личности (момент рождения). */
  personality: string;
  /** Дизайн — около 88 дней до рождения. */
  design: string;
  /** Неактивный канал. */
  channel: string;
  centerDefined: string;
  centerDefinedStroke: string;
  centerOpen: string;
  centerOpenStroke: string;
  gateText: string;
  gateTextActive: string;
}

/** Палитра лендинга: paper-900, rose-700, paper-300, brand-200/800, paper-50/500/600. */
export const DEFAULT_COLORS: BodygraphColors = {
  personality: '#292524',
  design: '#be123c',
  channel: '#ece3d4',
  centerDefined: '#d3f4d3',
  centerDefinedStroke: '#0f766e',
  centerOpen: '#fffdf9',
  centerOpenStroke: '#c9b99a',
  gateText: '#7a6a52',
  gateTextActive: '#ffffff',
};

export interface BodygraphSvgOptions {
  /** Подпись для скринридера и <title>; по умолчанию «Бодиграф». */
  label?: string;
  colors?: Partial<BodygraphColors>;
}

export type GateSource = 'personality' | 'design' | 'both';

/** Чьи активации у ворот: личности, дизайна или обеих карт. */
export function gateSources(chart: HdChart): Map<number, GateSource> {
  const personality = new Set(chart.personality.map((a) => a.gate));
  const design = new Set(chart.design.map((a) => a.gate));
  const sources = new Map<number, GateSource>();
  for (const gate of chart.gates) {
    sources.set(gate, personality.has(gate) && design.has(gate) ? 'both' : personality.has(gate) ? 'personality' : 'design');
  }
  return sources;
}

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function renderBodygraphSvg(chart: HdChart, options: BodygraphSvgOptions = {}): string {
  const c = { ...DEFAULT_COLORS, ...options.colors };
  const label = escape(options.label ?? 'Бодиграф');
  const sources = gateSources(chart);
  const defined = new Set(chart.definedCenters);
  const half = (points: string, source: GateSource | undefined) => {
    if (!source) return '';
    const stroke = source === 'design' ? c.design : c.personality;
    const base = `<polyline points="${points}" stroke="${stroke}"/>`;
    return source === 'both' ? `${base}<polyline points="${points}" stroke="${c.design}" stroke-dasharray="4 4"/>` : base;
  };

  const out: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX.width} ${VIEWBOX.height}" width="${VIEWBOX.width}" height="${VIEWBOX.height}" role="img" aria-label="${label}" font-family="Inter, system-ui, sans-serif">`,
    `<title>${label}</title>`,
    '<g fill="none" stroke-width="5" stroke-linecap="round">',
  ];
  for (const channel of CHANNELS) {
    const [first, second] = channelHalves(channel);
    out.push(
      `<g data-channel="${channelKey(channel)}">`,
      `<polyline points="${first} ${second}" stroke="${c.channel}"/>`,
      half(first, sources.get(channel[0])),
      half(second, sources.get(channel[1])),
      '</g>',
    );
  }
  out.push('</g>');
  for (const id of CENTER_IDS) {
    const on = defined.has(id);
    out.push(
      `<polygon points="${CENTER_SHAPES[id].points}" data-center="${id}"${on ? ' data-defined="true"' : ''} fill="${on ? c.centerDefined : c.centerOpen}" stroke="${on ? c.centerDefinedStroke : c.centerOpenStroke}" stroke-width="2" stroke-linejoin="round"/>`,
    );
  }
  for (const [gate, [x, y]] of Object.entries(GATE_POINTS)) {
    const source = sources.get(Number(gate));
    const fill = source === 'design' ? c.design : source ? c.personality : c.centerOpen;
    const stroke = source === 'both' ? c.design : source ? fill : c.centerOpenStroke;
    out.push(
      `<g data-gate="${gate}"${source ? ` data-source="${source}"` : ''}>`,
      `<circle cx="${x}" cy="${y}" r="${GATE_RADIUS}" fill="${fill}" stroke="${stroke}" stroke-width="${source === 'both' ? 2 : 1}"/>`,
      `<text x="${x}" y="${y + 2.6}" text-anchor="middle" font-size="7.5" font-weight="600" fill="${source ? c.gateTextActive : c.gateText}">${gate}</text>`,
      '</g>',
    );
  }
  out.push('</svg>');
  return out.join('');
}
```

В `src/lib/human-design/index.ts` после строки `export type { Activation, BirthInput, ChartResult, HdChart } from './chart';` добавить:

```ts
export { DEFAULT_COLORS, gateSources, renderBodygraphSvg } from './svg';
export type { BodygraphColors, BodygraphSvgOptions, GateSource } from './svg';
```

- [ ] **Step 6: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/layout.ts src/lib/human-design/svg.ts src/lib/human-design/index.ts
git commit -m "feat(hd): своя схема бодиграфа строкой SVG без DOM

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Тесты проходят**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design'`
Expected: PASS — `layout.test.ts` 6 тестов, `svg.test.ts` 6, `boundary.test.ts` по-прежнему зелёный (новые файлы под ту же границу).

- [ ] **Step 8: Взгляд на схему**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'pnpm exec vite build --ssr src/lib/human-design/index.ts --outDir node_modules/.cache/hd-svg --emptyOutDir --logLevel warn && node --input-type=module -e "import { chartFromUtc, renderBodygraphSvg } from \"./node_modules/.cache/hd-svg/index.js\"; import { writeFileSync } from \"node:fs\"; writeFileSync(\"/tmp/hd-bodygraph.svg\", renderBodygraphSvg(chartFromUtc(\"2001-11-23T22:50:00Z\")));" && ls -l /tmp/hd-bodygraph.svg'
scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231:/tmp/hd-bodygraph.svg ~/Downloads/land_linkeon/.superpowers/hd-calc/
```

Открыть `~/Downloads/land_linkeon/.superpowers/hd-calc/hd-bodygraph.svg` в браузере. Expected: центры не перекрываются, каналы 11-56, 20-34 (огибает G слева), 39-55 закрашены целиком, у висячих ворот — половинки линий, номера читаются. Правки координат — только вместе с `layout.test.ts` (кружки не ближе 14 единиц, ворота внутри своего центра).

---

### Task 10: Эталон Swiss Ephemeris — условие выката

**Files:**
- Create: `scripts/hd-reference.py`, `src/lib/human-design/__fixtures__/reference.json` (сгенерирован)
- Test: `src/lib/human-design/reference.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Спека: «тест сверяет наш расчёт с эталоном; всё должно совпасть, кроме пограничных случаев — ближе 1′ к границе линии». Эталон — 300 случайных рождений 1920–2025 в 30 поясах, посчитанных Swiss Ephemeris по правилам Райи. Swiss Ephemeris (библиотека и файлы `.se1`) живёт только во временном каталоге ноды `~/ci/wt/hd-ref` — ни в репозиторий, ни в продукт не попадает; в репозиторий идут только числа.

Эталон проверяет **позиции**: долготы 26 активаций, ворота.линии и перевод местного времени (zoneinfo против `Intl`). Колесо ворот и правила он не проверяет — это Task 11.

- [ ] **Step 1: Написать тест**

`src/lib/human-design/reference.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BODIES, designDate, longitudes } from './ephemeris';
import { gateLine, minutesToLineBoundary } from './wheel';
import { localToUtc } from './time';

/**
 * Условие выката (спека, «Точность»): наш расчёт совпадает с эталоном Swiss
 * Ephemeris по воротам и линиям всех 26 активаций 300 рождений 1920–2025.
 * Исключение — пограничные случаи: долгота эталона ближе 1′ к границе линии,
 * там решает погрешность эфемерид. Их тест считает и печатает отдельно.
 *
 * Эталон проверяет ПОЗИЦИИ. Колесо ворот и правила типа, авторитета, профиля и
 * определённости он не проверяет — у него та же таблица; это работа карт ручной
 * сверки (manual.test.ts). Генератор — scripts/hd-reference.py.
 */
interface RefChart {
  zone: string;
  local: string;
  utc: string;
  designUtc: string;
  p: number[];
  d: number[];
  pg: string[];
  dg: string[];
}
const reference = JSON.parse(readFileSync(new URL('./__fixtures__/reference.json', import.meta.url), 'utf8')) as {
  meta: { bodies: string[]; count: number };
  charts: RefChart[];
};
const charts = reference.charts;

const arcsec = (a: number, b: number) => Math.abs((((a - b) % 360) + 540) % 360 - 180) * 3600;
const gl = (lon: number) => {
  const g = gateLine(lon);
  return `${g.gate}.${g.line}`;
};

/** Наши долготы личности и дизайна для карты эталона. */
const ours = new Map(
  charts.map((c) => {
    const birth = new Date(c.utc);
    const design = designDate(birth);
    return [c.utc, { design, p: longitudes(birth), d: longitudes(design) }];
  }),
);

describe('эталон Swiss Ephemeris', () => {
  it('300 рождений, тела в порядке BODIES', () => {
    expect(charts).toHaveLength(300);
    expect(reference.meta.bodies).toEqual([...BODIES]);
  });

  it('таблица ворот эталона и наша дают одно и то же по долготам эталона', () => {
    for (const c of charts) {
      expect(c.p.map(gl), c.utc).toEqual(c.pg);
      expect(c.d.map(gl), c.utc).toEqual(c.dg);
    }
  });

  it('ворота и линии 26 активаций совпадают — кроме пограничных', () => {
    const mismatches: string[] = [];
    const boundary: string[] = [];
    let checked = 0;
    for (const c of charts) {
      const o = ours.get(c.utc)!;
      for (const [label, lon, refLon, refGl] of [
        ['личность', o.p, c.p, c.pg],
        ['дизайн', o.d, c.d, c.dg],
      ] as const) {
        BODIES.forEach((body, i) => {
          checked += 1;
          const got = gl(lon[body]);
          if (got === refGl[i]) return;
          const line = `${c.utc} ${label} ${body}: ${got}, эталон ${refGl[i]}`;
          (minutesToLineBoundary(refLon[i]) < 1 ? boundary : mismatches).push(line);
        });
      }
    }
    console.log(`эталон: сверено ${checked} активаций, пограничных расхождений ${boundary.length}`);
    for (const b of boundary) console.log(`  пограничное: ${b}`);
    expect(checked).toBe(300 * 26);
    expect(mismatches).toEqual([]);
  });

  it('долготы ближе 1′, момент дизайна — ближе 2 минут', () => {
    const far: string[] = [];
    for (const c of charts) {
      const o = ours.get(c.utc)!;
      BODIES.forEach((body, i) => {
        if (arcsec(o.p[body], c.p[i]) >= 60) far.push(`${c.utc} личность ${body}`);
        if (arcsec(o.d[body], c.d[i]) >= 60) far.push(`${c.utc} дизайн ${body}`);
      });
      if (Math.abs(o.design.getTime() - new Date(c.designUtc).getTime()) >= 120_000) far.push(`${c.utc} момент дизайна`);
    }
    expect(far).toEqual([]);
  });

  it('местное время → UTC совпадает с zoneinfo эталона', () => {
    const wrong: string[] = [];
    for (const c of charts) {
      const [date, time] = c.local.split('T');
      const conv = localToUtc({ date, time }, c.zone);
      const got = conv.kind === 'ok' ? conv.utc.toISOString() : conv.kind;
      if (got !== c.utc) wrong.push(`${c.local} ${c.zone}: ${got}, эталон ${c.utc}`);
    }
    expect(wrong).toEqual([]);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/reference.test.ts
git commit -m "test(hd): сверка с эталоном Swiss Ephemeris — 300 рождений, 26 активаций (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/reference.test.ts'`
Expected: FAIL — `ENOENT: no such file or directory` (`__fixtures__/reference.json`).

- [ ] **Step 4: Генератор эталона**

`scripts/hd-reference.py`:

```python
#!/usr/bin/env python3
"""
Эталон для проверки расчёта Human Design: случайные рождения 1920–2025 в
разных часовых поясах, посчитанные Swiss Ephemeris по правилам Райи —
истинный узел (SE_TRUE_NODE), дизайн по 88° солнечной дуги, тропический
зодиак, видимые геоцентрические долготы.

Swiss Ephemeris только здесь — в продукт и в репозиторий не попадает ни
библиотека, ни файлы эфемерид. Запуск вручную, на тестовой ноде; как
поставить pyswisseph и где взять файлы — план
docs/superpowers/plans/2026-10-08-human-design-calculator.md, задача
«Эталон Swiss Ephemeris».

  python hd-reference.py --ephe /путь/к/ephe --count 300 --seed 20261008 \
      --out src/lib/human-design/__fixtures__/reference.json

Местное время берётся случайным (целые минуты), UTC — через zoneinfo с
tzdata из PyPI (PYTHONTZPATH="" — системная база не участвует). Время, которое
при переводе стрелок пропущено или повторено, пропускается: эталон проверяет
позиции, а вопрос «до или после» — тесты time.test.ts.
"""
import argparse
import json
import random
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

import swisseph as swe
import tzdata

# Пояса без перемен в tzdata за последние годы — чтобы эталон не зависел от
# свежести базы поясов у того, кто запускает тест.
ZONES = [
    'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Samara', 'Europe/Volgograd', 'Asia/Yekaterinburg',
    'Asia/Omsk', 'Asia/Novosibirsk', 'Asia/Krasnoyarsk', 'Asia/Irkutsk', 'Asia/Yakutsk',
    'Asia/Vladivostok', 'Asia/Magadan', 'Asia/Kamchatka', 'Europe/Minsk', 'Asia/Tbilisi',
    'Asia/Yerevan', 'Asia/Tashkent', 'Europe/Berlin', 'Europe/London', 'Europe/Paris',
    'Europe/Istanbul', 'America/New_York', 'America/Los_Angeles', 'America/Sao_Paulo',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai', 'Australia/Sydney', 'Asia/Jerusalem',
]

# Та же таблица, что в src/lib/human-design/wheel.ts, набранная заново: расхождение
# двух копий эталон поймает.
GATE_ORDER = [
    41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
    27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
    31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
    28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
]

# Порядок — как BODIES в src/lib/human-design/ephemeris.ts. None — точка напротив
# предыдущего тела (Земля напротив Солнца, южный узел напротив северного).
BODIES = [
    ('sun', swe.SUN), ('earth', None), ('northNode', swe.TRUE_NODE), ('southNode', None),
    ('moon', swe.MOON), ('mercury', swe.MERCURY), ('venus', swe.VENUS), ('mars', swe.MARS),
    ('jupiter', swe.JUPITER), ('saturn', swe.SATURN), ('uranus', swe.URANUS),
    ('neptune', swe.NEPTUNE), ('pluto', swe.PLUTO),
]
FLAGS = swe.FLG_SWIEPH


def gate_line(lon):
    offset = (lon - 302.0) % 360.0
    index = min(int(offset // 0.9375), 383)
    return f'{GATE_ORDER[index // 6]}.{index % 6 + 1}'


def longitudes(jd_ut):
    out = []
    for name, body in BODIES:
        if body is None:
            out.append((out[-1] + 180.0) % 360.0)
            continue
        xx, ret = swe.calc_ut(jd_ut, body, FLAGS)
        # Без файлов эфемерид Swiss Ephemeris молча берёт Moshier — эталон
        # другого качества. Узел считается из Луны, флаг у него свой.
        if body != swe.TRUE_NODE and not ret & swe.FLG_SWIEPH:
            raise SystemExit(f'{name}: нет файлов эфемерид (флаг {ret}) — проверьте --ephe')
        out.append(xx[0])
    return out


def jd_of(moment):
    hours = moment.hour + moment.minute / 60 + moment.second / 3600 + moment.microsecond / 3.6e9
    return swe.julday(moment.year, moment.month, moment.day, hours)


def utc_of(jd_ut):
    return datetime(1970, 1, 1, tzinfo=timezone.utc) + timedelta(days=jd_ut - 2440587.5)


def unique_utc(local, zone):
    """UTC для местного времени или None, если его не было или было дважды."""
    tz = ZoneInfo(zone)
    a = local.replace(tzinfo=tz, fold=0).astimezone(timezone.utc)
    b = local.replace(tzinfo=tz, fold=1).astimezone(timezone.utc)
    if a != b or a.astimezone(tz).replace(tzinfo=None) != local:
        return None
    return a


def iso(moment):
    return moment.strftime('%Y-%m-%dT%H:%M:%S.') + f'{moment.microsecond // 1000:03d}Z'


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ephe', required=True)
    parser.add_argument('--count', type=int, default=300)
    parser.add_argument('--seed', type=int, default=20261008)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()

    swe.set_ephe_path(args.ephe)
    rng = random.Random(args.seed)
    first = datetime(1920, 1, 1)
    minutes = int((datetime(2026, 1, 1) - first).total_seconds() // 60)

    charts = []
    while len(charts) < args.count:
        zone = ZONES[len(charts) % len(ZONES)]
        local = first + timedelta(minutes=rng.randrange(minutes))
        utc = unique_utc(local, zone)
        if utc is None:
            continue
        jd = jd_of(utc)
        p = longitudes(jd)
        jd_design = swe.solcross_ut((p[0] - 88.0) % 360.0, jd - 100.0, FLAGS)
        d = longitudes(jd_design)
        charts.append({
            'zone': zone,
            'local': local.strftime('%Y-%m-%dT%H:%M'),
            'utc': iso(utc),
            'designUtc': iso(utc_of(jd_design)),
            'p': [round(x, 6) for x in p],
            'd': [round(x, 6) for x in d],
            'pg': [gate_line(x) for x in p],
            'dg': [gate_line(x) for x in d],
        })

    meta = {
        'generator': 'scripts/hd-reference.py',
        'swisseph': swe.version,
        'ephemeris': 'sepl_18.se1, semo_18.se1',
        'tzdata': tzdata.IANA_VERSION,
        'seed': args.seed,
        'count': args.count,
        'rules': 'SE_TRUE_NODE, design = Sun - 88°, tropical, apparent geocentric',
        'bodies': [name for name, _ in BODIES],
    }
    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump({'meta': meta, 'charts': charts}, f, ensure_ascii=False, separators=(',', ':'))
        f.write('\n')
    print(f'{len(charts)} карт → {args.out}')


if __name__ == '__main__':
    main()
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add scripts/hd-reference.py
git commit -m "feat(hd): генератор эталона Swiss Ephemeris для тестов

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Swiss Ephemeris на ноде — во временном каталоге**

pyswisseph колёс под ноду не имеет и собирается из исходников; у системного Python нет `Python.h` и `ensurepip`. Поэтому — `uv` и управляемый им Python, всё внутри `~/ci/wt/hd-ref`, без sudo:

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'set -e
mkdir -p ~/ci/wt/hd-ref/ephe && cd ~/ci/wt/hd-ref
export UV_INSTALL_DIR=$PWD/uvbin UV_PYTHON_INSTALL_DIR=$PWD/uvpy UV_CACHE_DIR=$PWD/uvcache
[ -x uvbin/uv ] || (curl -LsSf --max-time 120 https://astral.sh/uv/install.sh | env INSTALLER_NO_MODIFY_PATH=1 sh >/dev/null)
[ -d venv ] || uvbin/uv venv -q --python-preference only-managed --python 3.12 venv
uvbin/uv pip install -q --python venv/bin/python pyswisseph==2.10.3.2 tzdata
for f in sepl_18.se1 semo_18.se1; do [ -s ephe/$f ] || curl -sSfL --max-time 120 -o ephe/$f https://raw.githubusercontent.com/aloistr/swisseph/master/ephe/$f; done
sha256sum ephe/*.se1
venv/bin/python -c "import swisseph, tzdata; print(\"swe\", swisseph.version, \"tzdata\", tzdata.IANA_VERSION)"'
```

Expected:
```
1ca07bd67c24374d77226180c20a4f9996cba013697894810518e7eb582ca4f7  ephe/semo_18.se1
ca1393ceab3a44fbc895887cf789c68819ae6a1cbc9b22225872dbe4ccd99a66  ephe/sepl_18.se1
swe 2.10.03 tzdata 2026e
```
(tzdata может быть новее.) Другие суммы — файлы эфемерид поменялись: остановиться и сказать владельцу. Зеркало файлов, если GitHub недоступен: `https://www.astro.com/ftp/swisseph/ephe/`.

- [ ] **Step 7: Сгенерировать эталон и забрать на мак**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'mkdir -p src/lib/human-design/__fixtures__ && PYTHONTZPATH="" ~/ci/wt/hd-ref/venv/bin/python scripts/hd-reference.py --ephe ~/ci/wt/hd-ref/ephe --count 300 --seed 20261008 --out src/lib/human-design/__fixtures__/reference.json && ls -l src/lib/human-design/__fixtures__/reference.json'
mkdir -p ~/Downloads/land_linkeon/.worktrees/hd-calc/src/lib/human-design/__fixtures__
scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231:ci/wt/hd-calc/src/lib/human-design/__fixtures__/reference.json ~/Downloads/land_linkeon/.worktrees/hd-calc/src/lib/human-design/__fixtures__/
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'rm ~/ci/wt/hd-calc/src/lib/human-design/__fixtures__/reference.json'
```

Expected: `300 карт → src/lib/human-design/__fixtures__/reference.json`, около 180 КБ. `PYTHONTZPATH=""` — zoneinfo берёт tzdata из PyPI, а не системную базу ноды (там 2024a). Последняя команда убирает неотслеживаемую копию на ноде — иначе следующий checkout на коммит с этим файлом откажется.

- [ ] **Step 8: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/__fixtures__/reference.json
git commit -m "test(hd): эталон Swiss Ephemeris — 300 рождений 1920–2025 в 30 поясах

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 9: Сверка проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/reference.test.ts'`
Expected: PASS, 5 тестов; в выводе — строка `эталон: сверено 7800 активаций, пограничных расхождений N` и список пограничных (на прототипе N = 8). Число и список записать — их увидит владелец на СТОП 3.

Красное вне пограничных — **не ослаблять тест и не трогать эталон**: это либо ошибка расчёта, либо иной эталон (не те файлы, Moshier). Разбирать по superpowers:systematic-debugging; начать с расхождения долгот (`долготы ближе 1′…`) — оно показывает, какое тело и на сколько.

---

### Task 11: Карты ручной сверки с независимыми калькуляторами

**Files:**
- Create: `scripts/hd-pick-manual.ts`
- Test: `src/lib/human-design/manual.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Вторая половина условия выката: колесо ворот и правила типа, авторитета, профиля и определённости проверяются 10 картами, посчитанными **не нашим кодом** — на двух сторонних калькуляторах каждая. Данные рождения — случайные, вымышленные: в сторонние сервисы не уходит ничего о реальных людях.

- [ ] **Step 1: Написать тест**

`src/lib/human-design/manual.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { calculateChart } from './chart';
import { HD_AUTHORITIES, HD_TYPES, type HdAuthority, type HdDefinition, type HdType } from './rules';

/**
 * Карты ручной сверки (спека, «Точность»). Эталон Swiss Ephemeris колесо ворот
 * и правила типа, авторитета, профиля и определённости не проверяет — у него
 * та же таблица. Эти десять карт посчитаны на двух независимых калькуляторах
 * каждая; подобраны scripts/hd-pick-manual.ts так, чтобы встретились все
 * типы, авторитеты и виды определённости. Данные рождения вымышленные.
 */
interface ManualChart {
  date: string;
  time: string;
  zone: string;
  expect: { type: HdType; authority: HdAuthority; profile: string; definition: HdDefinition; channels: string[] };
  /** Где сверено: два калькулятора, не наш код. */
  checkedWith: string[];
}

/** Когда сверено. */
const CHECKED_AT = '2026-10-08';

const MANUAL: ManualChart[] = [
  // Заполняется в Step 7: вывод scripts/hd-pick-manual.ts, сверенный
  // на двух сторонних калькуляторах.
];

describe(`карты ручной сверки (${CHECKED_AT})`, () => {
  it('десять карт: все типы, все авторитеты, каждая сверена дважды', () => {
    expect(MANUAL).toHaveLength(10);
    expect(new Set(MANUAL.map((m) => m.expect.type))).toEqual(new Set(HD_TYPES));
    expect(new Set(MANUAL.map((m) => m.expect.authority))).toEqual(new Set(HD_AUTHORITIES));
    for (const m of MANUAL) expect(m.checkedWith.length, `${m.date} ${m.time}`).toBeGreaterThanOrEqual(2);
  });

  for (const m of MANUAL) {
    it(`${m.date} ${m.time} ${m.zone}`, () => {
      const r = calculateChart({ date: m.date, time: m.time, zone: m.zone });
      expect(r.kind).toBe('ok');
      if (r.kind !== 'ok') return;
      const { type, authority, profile, definition, channels } = r.chart;
      expect({ type, authority, profile, definition, channels }).toEqual(m.expect);
    });
  }
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/manual.test.ts
git commit -m "test(hd): карты ручной сверки — 10 карт, все типы и авторитеты (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/manual.test.ts'`
Expected: FAIL — `expected [] to have a length of 10 but got +0`.

- [ ] **Step 4: Скрипт подбора**

`scripts/hd-pick-manual.ts`:

```ts
/**
 * Подбор 10 карт для ручной сверки с независимыми калькуляторами.
 *
 * Эталон Swiss Ephemeris колесо ворот и правила типа/авторитета не проверяет —
 * у него та же таблица. Это делают 10 карт, посчитанных на двух сторонних
 * калькуляторах (план, задача «Карты ручной сверки»). Скрипт подбирает
 * рождения так, чтобы встретились все пять типов, все семь авторитетов и все
 * виды определённости, и печатает их с НАШИМ результатом — заготовкой для
 * src/lib/human-design/manual.test.ts. Данные рождения случайные, реальных людей нет.
 *
 * tsx здесь не годится (его загрузчик не видит именованных экспортов
 * astronomy-engine), поэтому — сборкой Vite и обычным node:
 *   pnpm exec vite build --ssr scripts/hd-pick-manual.ts --outDir node_modules/.cache/hd-pick --emptyOutDir --logLevel warn
 *   node node_modules/.cache/hd-pick/hd-pick-manual.js
 */
import { HD_AUTHORITIES, HD_DEFINITIONS, HD_TYPES, calculateChart, formatOffset, type HdChart } from '../src/lib/human-design';

/** Пояс → город, который вводить в сторонний калькулятор. */
const CITY_OF: Record<string, string> = {
  'Europe/Moscow': 'Москва',
  'Asia/Yekaterinburg': 'Екатеринбург',
  'Asia/Novosibirsk': 'Новосибирск',
  'Europe/Berlin': 'Berlin',
  'America/New_York': 'New York',
  'Asia/Tokyo': 'Tokyo',
};
const ZONES = Object.keys(CITY_OF);

interface Candidate {
  date: string;
  time: string;
  zone: string;
  chart: HdChart;
  offsetSeconds: number;
}

// Детерминированный генератор: подбор воспроизводим.
let seed = 20261008;
const random = () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};
const pad = (n: number) => String(n).padStart(2, '0');

function birth(date: string, time: string, zone: string): Candidate | null {
  const r = calculateChart({ date, time, zone });
  return r.kind === 'ok' ? { date, time, zone, chart: r.chart, offsetSeconds: r.offsetSeconds } : null;
}

function randomBirth(): Candidate | null {
  const d = new Date(Date.UTC(1950, 0, 1) + random() * (Date.UTC(2015, 0, 1) - Date.UTC(1950, 0, 1)));
  const date = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
  return birth(date, `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`, ZONES[Math.floor(random() * ZONES.length)]);
}

const categories = (c: HdChart) => [`type:${c.type}`, `authority:${c.authority}`, `definition:${c.definition}`];
const WANTED = new Set([
  ...HD_TYPES.map((t) => `type:${t}`),
  ...HD_AUTHORITIES.map((a) => `authority:${a}`),
  ...HD_DEFINITIONS.map((d) => `definition:${d}`),
]);

// Пример из спеки и e2e-теста — первым и обязательно.
const picked: Candidate[] = [birth('1990-03-12', '14:25', 'Europe/Moscow')!];
const uncovered = new Set(WANTED);
for (const k of categories(picked[0].chart)) uncovered.delete(k);

// Пул: по нескольку примеров на каждую категорию, редкие (эго, четверная,
// Рефлектор) попадаются раз на сотню-другую рождений.
const pool = new Map<string, Candidate[]>();
for (let tries = 0; tries < 60_000; tries++) {
  const c = randomBirth();
  if (!c) continue;
  for (const k of categories(c.chart)) {
    const list = pool.get(k) ?? [];
    if (list.length < 5) pool.set(k, [...list, c]);
  }
}
const candidates = [...new Set([...pool.values()].flat())];

// Жадное покрытие: каждый раз — карта, закрывающая больше всего непокрытого.
while (uncovered.size > 0 && picked.length < 10) {
  const gain = (c: Candidate) => categories(c.chart).filter((k) => uncovered.has(k)).length;
  const best = candidates.reduce((a, b) => (gain(b) > gain(a) ? b : a));
  if (gain(best) === 0) break;
  picked.push(best);
  for (const k of categories(best.chart)) uncovered.delete(k);
}
// Оставшиеся места — карты с ещё не встреченными профилями.
for (const c of candidates) {
  if (picked.length >= 10) break;
  if (!picked.some((p) => p.chart.profile === c.chart.profile)) picked.push(c);
}

console.log(`// Не встретилось: ${uncovered.size ? [...uncovered].join(', ') : 'всё встретилось'}`);
for (const p of picked) {
  const c = p.chart;
  console.log(`  {
    date: '${p.date}', time: '${p.time}', zone: '${p.zone}',
    expect: { type: '${c.type}', authority: '${c.authority}', profile: '${c.profile}', definition: '${c.definition}',
      channels: [${c.channels.map((k) => `'${k}'`).join(', ')}] },
    // вводить: ${CITY_OF[p.zone]}, ${p.date} ${p.time} (${formatOffset(p.offsetSeconds)}); Солнце личности ${c.personality[0].gate}.${c.personality[0].line}, дизайна ${c.design[0].gate}.${c.design[0].line}
    checkedWith: [],
  },`);
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add scripts/hd-pick-manual.ts
git commit -m "feat(hd): подбор карт ручной сверки — все типы, авторитеты и виды определённости

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Подобрать карты**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'pnpm exec vite build --ssr scripts/hd-pick-manual.ts --outDir node_modules/.cache/hd-pick --emptyOutDir --logLevel warn && node node_modules/.cache/hd-pick/hd-pick-manual.js'`

Expected (генератор детерминированный; на коде этого плана вывод такой):

```
// Не встретилось: всё встретилось
  {
    date: '1990-03-12', time: '14:25', zone: 'Europe/Moscow',
    expect: { type: 'manifestor', authority: 'emotional', profile: '5/2', definition: 'single',
      channels: ['7-31', '12-22'] },
    // вводить: Москва, 1990-03-12 14:25 (UTC+3); Солнце личности 22.5, дизайна 11.2
    checkedWith: [],
  },
  {
    date: '1964-06-22', time: '17:06', zone: 'America/New_York',
    expect: { type: 'generator', authority: 'sacral', profile: '4/6', definition: 'split',
      channels: ['9-52', '10-20'] },
    // вводить: New York, 1964-06-22 17:06 (UTC-4); Солнце личности 15.4, дизайна 25.6
    checkedWith: [],
  },
  {
    date: '2010-03-20', time: '14:01', zone: 'America/New_York',
    expect: { type: 'projector', authority: 'splenic', profile: '2/5', definition: 'triple',
      channels: ['4-63', '11-56', '17-62', '18-58', '25-51'] },
    // вводить: New York, 2010-03-20 14:01 (UTC-4); Солнце личности 25.2, дизайна 10.5
    checkedWith: [],
  },
  {
    date: '1955-01-11', time: '22:04', zone: 'Europe/Berlin',
    expect: { type: 'reflector', authority: 'lunar', profile: '1/3', definition: 'none',
      channels: [] },
    // вводить: Berlin, 1955-01-11 22:04 (UTC+1); Солнце личности 61.1, дизайна 32.3
    checkedWith: [],
  },
  {
    date: '1979-05-18', time: '15:28', zone: 'Europe/Moscow',
    expect: { type: 'manifestingGenerator', authority: 'emotional', profile: '3/5', definition: 'quadruple',
      channels: ['1-8', '2-14', '28-38', '37-40', '47-64'] },
    // вводить: Москва, 1979-05-18 15:28 (UTC+3); Солнце личности 8.3, дизайна 30.5
    checkedWith: [],
  },
  {
    date: '2006-11-12', time: '17:30', zone: 'Asia/Tokyo',
    expect: { type: 'projector', authority: 'selfProjected', profile: '1/4', definition: 'single',
      channels: ['4-63', '7-31', '23-43'] },
    // вводить: Tokyo, 2006-11-12 17:30 (UTC+9); Солнце личности 43.1, дизайна 4.4
    checkedWith: [],
  },
  {
    date: '1953-08-06', time: '10:22', zone: 'America/New_York',
    expect: { type: 'manifestor', authority: 'ego', profile: '1/3', definition: 'single',
      channels: ['1-8', '7-31', '21-45'] },
    // вводить: New York, 1953-08-06 10:22 (UTC-4); Солнце личности 7.1, дизайна 2.3
    checkedWith: [],
  },
  {
    date: '1991-11-01', time: '16:25', zone: 'Asia/Tokyo',
    expect: { type: 'projector', authority: 'mental', profile: '1/3', definition: 'single',
      channels: ['47-64'] },
    // вводить: Tokyo, 1991-11-01 16:25 (UTC+9); Солнце личности 44.1, дизайна 33.3
    checkedWith: [],
  },
  {
    date: '1984-01-11', time: '20:06', zone: 'Europe/Moscow',
    expect: { type: 'generator', authority: 'sacral', profile: '6/3', definition: 'single',
      channels: ['32-54', '42-53'] },
    // вводить: Москва, 1984-01-11 20:06 (UTC+3); Солнце личности 54.6, дизайна 32.3
    checkedWith: [],
  },
  {
    date: '2007-07-18', time: '01:08', zone: 'America/New_York',
    expect: { type: 'generator', authority: 'emotional', profile: '5/1', definition: 'triple',
      channels: ['4-63', '9-52', '37-40'] },
    // вводить: New York, 2007-07-18 01:08 (UTC-4); Солнце личности 62.5, дизайна 3.1
    checkedWith: [],
  },
```

Если первая строка не «всё встретилось» — увеличить число попыток в скрипте, не урезать требования теста.

- [ ] **Step 7: Сверить каждую карту на двух калькуляторах**

Для каждой из 10 карт ввести город, дату и время из комментария «вводить» минимум в два калькулятора без регистрации — например `bodygraph.io`, `astrolium.com/tools/human-design-calculator`, `thehumandesignsystem.com/free-chart`, `datemyst.com/human-design` (браузерными инструментами; если их нет — отдать список владельцу). Записать: тип, авторитет, профиль, определённость, определённые каналы.

- Всё совпало с выводом Step 6 — перенести запись в `MANUAL` как есть, в `checkedWith` — домены двух калькуляторов, `CHECKED_AT` — дата сверки.
- Калькуляторы разошлись между собой только в каналах с воротами узлов — посмотреть, какой узел у калькулятора (средний или истинный); засчитывать тот, что с истинным, и взять третий калькулятор.
- Сторонние калькуляторы сходятся между собой и расходятся с нами — **СТОП**: в `expect` пишется то, что показали калькуляторы, тест краснеет, причина ищется по superpowers:systematic-debugging (таблица ворот, каналы центров, правило мотора к горлу, иерархия авторитетов). Подгонять ожидания под наш вывод нельзя — это и есть то, что сверка должна поймать.

- [ ] **Step 8: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/human-design/manual.test.ts
git commit -m "test(hd): 10 карт ручной сверки с независимыми калькуляторами

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 9: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/human-design/manual.test.ts'`
Expected: PASS, 11 тестов.

---

### Task 12: База городов и поиск

**Files:**
- Create: `src/lib/cities.ts`, `src/lib/cityLoader.ts`, `scripts/build-hd-cities.py`, `src/content/hd/cities.ru.json` (сгенерирована)
- Test: `src/lib/cities.test.ts`, `src/content/hd/cities.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Город нужен только ради IANA-пояса. Поиск — не часть модуля `human-design` (бэкенду второго этапа он не нужен), поэтому живёт в `src/lib/`. Сырые дампы GeoNames — во временном каталоге ноды; в репозиторий идёт только готовый JSON.

- [ ] **Step 1: Написать тест поиска**

`src/lib/cities.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { cityPlace, indexCities, normalize, searchCities, type CityDb } from './cities';

const DB: CityDb = {
  v: 1,
  zones: ['Europe/Moscow', 'Europe/Berlin', 'Asia/Yekaterinburg'],
  countries: { RU: 'Россия', DE: 'Германия' },
  regions: ['Москва', 'Татарстан', 'Нижегородская область', 'Берлин'],
  cities: [
    ['Москва', 'Moscow', 'RU', 0, 10381, 0],
    ['Нижний Новгород', 'Nizhniy Novgorod', 'RU', 0, 1259, 2],
    ['Казань', 'Kazan', 'RU', 0, 1244, 1],
    ['Берлин', 'Berlin', 'DE', 1, 3426, 3],
    ['Великий Новгород', 'Velikiy Novgorod', 'RU', 0, 218, -1],
    ['Ёлкино', '', 'RU', 2, 20, -1],
    ['Zürich', 'Zurich', 'CH', 1, 341, -1],
  ],
};
const index = indexCities(DB);
const names = (q: string) => searchCities(index, q).map((c) => c.name);

describe('поиск города', () => {
  it('по началу названия, крупные первыми', () => {
    expect(names('каз')).toEqual(['Казань']);
    expect(names('Мо')).toEqual(['Москва']);
  });

  it('по началу слова — после совпадений с начала', () => {
    expect(names('нов')).toEqual(['Нижний Новгород', 'Великий Новгород']);
    expect(names('ниж')).toEqual(['Нижний Новгород']);
  });

  it('латиницей и без диакритики', () => {
    expect(names('kazan')).toEqual(['Казань']);
    expect(names('zur')).toEqual(['Zürich']);
  });

  it('ё и е не различаются, дефис — как пробел', () => {
    expect(names('елкино')).toEqual(['Ёлкино']);
    expect(normalize('Санкт-Петербург')).toBe('санкт петербург');
  });

  it('короче двух букв — ничего', () => {
    expect(names('к')).toEqual([]);
    expect(names('  ')).toEqual([]);
  });

  it('город несёт свой пояс и место', () => {
    const [kazan] = searchCities(index, 'казань');
    expect(kazan.zone).toBe('Europe/Moscow');
    expect(cityPlace(kazan)).toBe('Татарстан, Россия');
    // Регион совпал с названием — не повторяем: «Москва, Москва, Россия».
    expect(cityPlace(searchCities(index, 'москва')[0])).toBe('Россия');
    // Нет страны в справочнике — показываем код.
    expect(cityPlace(searchCities(index, 'zurich')[0])).toBe('CH');
  });

  it('не больше limit подсказок', () => {
    expect(searchCities(index, 'нов', 1)).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/cities.test.ts
git commit -m "test(hd): поиск города — по началу названия и слова, латиницей, ё/е (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/cities.test.ts'`
Expected: FAIL — `Failed to resolve import "./cities"`.

- [ ] **Step 4: Реализация поиска**

`src/lib/cities.ts`:

```ts
/**
 * Города для поля «Город рождения». Город нужен только ради часового пояса:
 * в формулы Human Design входит лишь момент рождения в UTC.
 *
 * База — src/content/hd/cities.ru.json, её собирает
 * scripts/build-hd-cities.py из GeoNames (cities15000 + русские названия из
 * alternateNamesV2, CC BY 4.0). Записи отсортированы по населению — первые
 * совпадения и есть самые вероятные.
 */
export interface CityDb {
  v: 1;
  zones: string[];
  /** Код страны → название по-русски. */
  countries: Record<string, string>;
  regions: string[];
  /** [название, латиницей или '', код страны, индекс пояса, население в тыс., индекс региона или -1] */
  cities: [string, string, string, number, number, number][];
}

export interface City {
  name: string;
  region: string | null;
  country: string;
  zone: string;
}

interface Indexed {
  city: City;
  /** Нормализованное название и написание латиницей. */
  keys: string[];
}

export type CityIndex = Indexed[];

/** Без регистра, ё/й и диакритики, любые разделители — один пробел. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function indexCities(db: CityDb): CityIndex {
  return db.cities.map(([name, latin, cc, zone, , region]) => ({
    city: {
      name,
      region: region >= 0 && db.regions[region] !== name ? db.regions[region] : null,
      country: db.countries[cc] ?? cc,
      zone: db.zones[zone],
    },
    keys: latin ? [normalize(name), normalize(latin)] : [normalize(name)],
  }));
}

/**
 * Подсказки: сначала города, чьё название начинается с запроса, потом — где с
 * запроса начинается слово («новгород» → Нижний Новгород). Порядок внутри —
 * по населению. Короче двух букв — ничего: подсказок были бы тысячи.
 */
export function searchCities(index: CityIndex, query: string, limit = 8): City[] {
  const q = normalize(query);
  if (q.length < 2) return [];
  const starts: City[] = [];
  const words: City[] = [];
  for (const { city, keys } of index) {
    if (keys.some((k) => k.startsWith(q))) {
      starts.push(city);
      if (starts.length >= limit) break;
    } else if (words.length < limit && keys.some((k) => k.includes(` ${q}`))) {
      words.push(city);
    }
  }
  return [...starts, ...words].slice(0, limit);
}

/** «Татарстан, Россия» — для подсказки под названием. */
export function cityPlace(city: City): string {
  return city.region ? `${city.region}, ${city.country}` : city.country;
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/cities.ts
git commit -m "feat(hd): поиск города по русскому и латинскому названию

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/cities.test.ts'`
Expected: PASS, 7 тестов.

- [ ] **Step 7: Написать тест базы**

`src/content/hd/cities.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { cityPlace, indexCities, searchCities, type CityDb } from '../../lib/cities';

/**
 * Сгенерированная база городов (scripts/build-hd-cities.py). Тест держит то,
 * что ломается молча при пересборке: размер, форму записей, пояса, которых не
 * знает браузер, и пропавшие русские названия.
 */
const raw = readFileSync(new URL('./cities.ru.json', import.meta.url));
const db = JSON.parse(raw.toString('utf8')) as CityDb;
const index = indexCities(db);

describe('база городов GeoNames', () => {
  // Цель спеки — до 1 МБ сжатым. Сервер лендинга сейчас JSON не сжимает
  // (замер 08.10.2026), поэтому держим и сырой размер.
  it('размер: сжатым до 1 МБ, как есть — до 2 МБ', () => {
    expect(gzipSync(raw, { level: 9 }).length).toBeLessThan(1_000_000);
    expect(raw.length).toBeLessThan(2_000_000);
  });

  it('форма записей и ссылки на справочники', () => {
    expect(db.v).toBe(1);
    expect(db.cities.length).toBeGreaterThan(25_000);
    for (const [name, latin, cc, zone, population, region] of db.cities) {
      expect(typeof name).toBe('string');
      expect(typeof latin).toBe('string');
      expect(db.countries[cc] ?? cc).toBeTruthy();
      expect(db.zones[zone], name).toBeDefined();
      expect(population).toBeGreaterThanOrEqual(0);
      expect(region === -1 || db.regions[region] !== undefined, name).toBe(true);
    }
  });

  it('от крупных к мелким', () => {
    const populations = db.cities.map((c) => c[4]);
    expect(populations).toEqual([...populations].sort((a, b) => b - a));
  });

  it('каждый пояс понимает Intl', () => {
    for (const zone of db.zones) {
      expect(() => new Intl.DateTimeFormat('en-US', { timeZone: zone }), zone).not.toThrow();
    }
  });

  it('крупные города находятся по-русски, с поясом и местом', () => {
    const first = (q: string) => searchCities(index, q)[0];
    expect(first('Казань')).toMatchObject({ name: 'Казань', zone: 'Europe/Moscow' });
    expect(cityPlace(first('Казань'))).toContain('Россия');
    expect(first('Новосибирск').zone).toBe('Asia/Novosibirsk');
    expect(first('Екатеринбург').zone).toBe('Asia/Yekaterinburg');
    expect(first('Калининград').zone).toBe('Europe/Kaliningrad');
    expect(first('Нью-Йорк').zone).toBe('America/New_York');
    expect(first('Берлин').zone).toBe('Europe/Berlin');
    expect(first('Алматы').zone).toBe('Asia/Almaty');
    expect(first('Киев').zone).toBe('Europe/Kiev');
  });

  it('латиницей тоже находится', () => {
    expect(searchCities(index, 'kazan')[0].name).toBe('Казань');
  });
});
```

- [ ] **Step 8: Сборщик базы**

`scripts/build-hd-cities.py`:

```python
#!/usr/bin/env python3
"""
База городов калькулятора Human Design: src/content/hd/cities.ru.json.

Источник — GeoNames (CC BY 4.0): cities15000 (города от 15 000 жителей),
alternateNamesV2 (русские названия), countryInfo и admin1CodesASCII. Город
нужен только ради IANA-пояса — координаты в файл не попадают.

Запускается вручную, на тестовой ноде (alternateNamesV2.zip — около 200 МБ);
сырые дампы — во временном каталоге, в репозиторий не кладутся. Готовый JSON
коммитится. Только стандартная библиотека Python.

  python3 scripts/build-hd-cities.py --src /tmp/geonames --out src/content/hd/cities.ru.json

Формат — интерфейс CityDb в src/lib/cities.ts:
  {"v":1,"zones":[…],"countries":{"RU":"Россия",…},"regions":[…],
   "cities":[[название, латиницей или "", страна, пояс, население в тыс., регион или -1], …]}
Города — по убыванию населения: так подсказки сами идут от крупных к мелким.
"""
import argparse
import csv
import gzip
import io
import json
import zipfile

# Новые имена поясов, которых не знают старые браузеры (ICU до 72): берём
# прежнее имя — оно осталось в tzdata ссылкой и работает везде.
ZONE_ALIASES = {'Europe/Kyiv': 'Europe/Kiev'}

csv.field_size_limit(10**9)


def tsv(binary):
    return csv.reader(io.TextIOWrapper(binary, encoding='utf-8'), delimiter='\t', quoting=csv.QUOTE_NONE)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--src', required=True, help='каталог со скачанными файлами GeoNames')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    src = args.src

    cities = []
    with zipfile.ZipFile(f'{src}/cities15000.zip') as z, z.open('cities15000.txt') as f:
        for r in tsv(f):
            cities.append({'id': int(r[0]), 'name': r[1], 'ascii': r[2], 'cc': r[8], 'a1': r[10],
                           'pop': int(r[14] or 0), 'tz': ZONE_ALIASES.get(r[17], r[17])})

    countries = {}
    with open(f'{src}/countryInfo.txt', encoding='utf-8') as f:
        for line in f:
            if line.startswith('#'):
                continue
            r = line.rstrip('\n').split('\t')
            if r[16]:
                countries[r[0]] = {'name': r[4], 'id': int(r[16])}

    admin1 = {}
    with open(f'{src}/admin1CodesASCII.txt', encoding='utf-8') as f:
        for line in f:
            r = line.rstrip('\n').split('\t')
            admin1[r[0]] = {'name': r[1], 'id': int(r[3])}

    # Русское название: предпочтительное, иначе полное, иначе короткое;
    # разговорные и исторические («Питер», «Ленинград») — нет.
    wanted = {c['id'] for c in cities} | {c['id'] for c in countries.values()} | {a['id'] for a in admin1.values()}
    ru = {}
    with zipfile.ZipFile(f'{src}/alternateNamesV2.zip') as z, z.open('alternateNamesV2.txt') as f:
        for r in tsv(f):
            if r[2] != 'ru' or int(r[1]) not in wanted or r[6] == '1' or r[7] == '1':
                continue
            rank = (0 if r[4] == '1' else 1, 1 if r[5] == '1' else 0)
            gid = int(r[1])
            if gid not in ru or rank < ru[gid][0]:
                ru[gid] = (rank, r[3])

    def ru_name(gid, fallback):
        return ru[gid][1] if gid in ru else fallback

    cities.sort(key=lambda c: (-c['pop'], c['id']))
    zones = sorted({c['tz'] for c in cities})
    zone_index = {z: i for i, z in enumerate(zones)}
    regions, region_index, rows = [], {}, []
    for c in cities:
        name = ru_name(c['id'], c['name'])
        latin = c['ascii'] if c['ascii'] and c['ascii'].lower() != name.lower() else ''
        ri = -1
        a = admin1.get(f"{c['cc']}.{c['a1']}")
        if a:
            region = ru_name(a['id'], a['name'])
            if region not in region_index:
                region_index[region] = len(regions)
                regions.append(region)
            ri = region_index[region]
        rows.append([name, latin, c['cc'], zone_index[c['tz']], round(c['pop'] / 1000), ri])

    used = sorted({c['cc'] for c in cities})
    data = {
        'v': 1,
        'zones': zones,
        'countries': {cc: ru_name(countries[cc]['id'], countries[cc]['name']) if cc in countries else cc for cc in used},
        'regions': regions,
        'cities': rows,
    }
    raw = json.dumps(data, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    with open(args.out, 'wb') as f:
        f.write(raw)
    with_ru = sum(1 for c in cities if c['id'] in ru)
    print(f'{len(rows)} городов, с русским названием {with_ru}, поясов {len(zones)}, регионов {len(regions)}')
    print(f'размер {len(raw)} байт, gzip -9 {len(gzip.compress(raw, 9))} байт')


if __name__ == '__main__':
    main()
```

- [ ] **Step 9: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/content/hd/cities.test.ts scripts/build-hd-cities.py
git commit -m "test(hd): база городов — размер, пояса, русские названия; сборщик из GeoNames (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/content/hd/cities.test.ts'`
Expected: FAIL — `ENOENT` (`cities.ru.json`).

- [ ] **Step 10: Скачать GeoNames и собрать базу на ноде**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'set -e; mkdir -p ~/ci/wt/hd-geonames && cd ~/ci/wt/hd-geonames && for f in cities15000.zip alternateNamesV2.zip admin1CodesASCII.txt countryInfo.txt; do [ -s $f ] || curl -sSf --max-time 900 -o $f https://download.geonames.org/export/dump/$f; done; ls -l'
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'python3 scripts/build-hd-cities.py --src ~/ci/wt/hd-geonames --out src/content/hd/cities.ru.json'
scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231:ci/wt/hd-calc/src/content/hd/cities.ru.json ~/Downloads/land_linkeon/.worktrees/hd-calc/src/content/hd/
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'rm ~/ci/wt/hd-calc/src/content/hd/cities.ru.json'
```

Expected: `alternateNamesV2.zip` около 205 МБ; сборщик (~15 с, только стандартная библиотека) печатает около `34155 городов, с русским названием 18765, поясов 356, регионов 2712` и `размер 1553482 байт, gzip -9 582395 байт` (на дампе 08.10.2026; на свежем числа чуть другие). Сжатый размер больше 1 МБ — остановиться: тест его не пропустит, и это вопрос к владельцу, а не к порогу.

- [ ] **Step 11: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/content/hd/cities.ru.json
git commit -m "feat(hd): база городов GeoNames — русские названия и пояса, 34 тыс. городов

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 12: Тест базы проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/content/hd/cities.test.ts'`
Expected: PASS, 6 тестов.

- [ ] **Step 13: Ленивая загрузка**

`src/lib/cityLoader.ts`:

```ts
import citiesUrl from '../content/hd/cities.ru.json?url';
import { indexCities, type CityDb, type CityIndex } from './cities';

let pending: Promise<CityIndex> | null = null;

/**
 * База городов — отдельным файлом (около 1,5 МБ), только когда человек
 * взялся за поле города: остальным посетителям страницы она не нужна.
 * Сорвалась загрузка — следующий фокус пробует снова.
 */
export function loadCityIndex(): Promise<CityIndex> {
  if (!pending) {
    pending = fetch(citiesUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`города: HTTP ${response.status}`);
        return response.json() as Promise<CityDb>;
      })
      .then(indexCities);
    pending.catch(() => {
      pending = null;
    });
  }
  return pending;
}
```

`?url` — Vite кладёт файл в `dist/assets/` с хешем в имени и отдаёт адрес строкой; база не попадает ни в один JS-чанк. Отдельного теста у загрузчика нет: его проверяет e2e (Task 24 — запрос базы только после фокуса на поле).

- [ ] **Step 14: Commit и проверка типов**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/cityLoader.ts
git commit -m "feat(hd): база городов грузится по первому фокусу на поле

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'pnpm typecheck > /tmp/hd-tsc.log 2>&1 && echo TSC_OK || (echo TSC_FAILED; head -20 /tmp/hd-tsc.log)'`
Expected: `TSC_OK`.

---

### Task 13: Черновик Райе и цели Метрики

**Files:**
- Create: `src/lib/hdDraft.ts`, `src/lib/goal.ts`
- Modify: `src/main.tsx`
- Test: `src/lib/hdDraft.test.ts`, `src/lib/goal.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Черновик собирается только в момент клика и уходит во фрагменте `#draft=…`: браузер не отправляет фрагмент на сервер, а в `href` кнопки данных нет — его читают Вебвизор и `trackLinks` Метрики. Цели: `hd-calc-submit` — после удачного расчёта, `hd-calc-to-raya` — клик по кнопке (`data-cta`). Обе идут одной функцией `reachGoal()`.

- [ ] **Step 1: Написать тесты**

`src/lib/hdDraft.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { DRAFT_MAX_LENGTH, RAYA_ID, draftMessage, fillTemplate, rayaChatHref, rayaChatUrlWithDraft } from './hdDraft';

const TEMPLATE =
  'Райя, привет! Мои данные рождения: {date}, {time}, {city} ({offset}). Калькулятор показал: {type}, профиль {profile}, {authority}. Расскажи, что это значит для меня';

const PARTS = {
  date: '1990-03-12',
  time: '14:25',
  city: 'Казань',
  offset: 'UTC+3',
  type: 'Генератор',
  profile: '3/5',
  authority: 'сакральный авторитет',
};

describe('черновик сообщения Райе', () => {
  it('текст как в спеке', () => {
    expect(draftMessage(TEMPLATE, PARTS)).toBe(
      'Райя, привет! Мои данные рождения: 12.03.1990, 14:25, Казань (UTC+3). Калькулятор показал: Генератор, профиль 3/5, сакральный авторитет. Расскажи, что это значит для меня',
    );
  });

  it('незнакомый ключ остаётся как есть — опечатку видно', () => {
    expect(fillTemplate('{city} {oops}', { city: 'Казань' })).toBe('Казань {oops}');
  });

  it('самый длинный реальный случай укладывается в лимит кабинета', () => {
    const long = draftMessage(TEMPLATE, {
      ...PARTS,
      city: 'Петропавловск-Камчатский',
      offset: 'UTC+12',
      type: 'Манифестирующий генератор',
      authority: 'ментальный авторитет (через окружение)',
    });
    expect(long.length).toBeLessThan(DRAFT_MAX_LENGTH);
  });
});

describe('ссылка к Райе', () => {
  it('в href — без черновика: его читают Вебвизор и отслеживание ссылок', () => {
    const href = rayaChatHref();
    expect(href).toMatch(/^https:\/\/my\.linkeon\.io\/chat\?/);
    expect(new URL(href).searchParams.get('assistant')).toBe(String(RAYA_ID));
    expect(new URL(href).searchParams.get('utm_content')).toBe('hd-calc');
    expect(href).not.toContain('#');
  });

  it('черновик — во фрагменте, целиком и в кодировке', () => {
    const url = new URL(rayaChatUrlWithDraft('Райя, привет! 12.03.1990, 14:25'));
    expect(url.searchParams.get('assistant')).toBe('14');
    expect(url.hash.startsWith('#draft=')).toBe(true);
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toBe('Райя, привет! 12.03.1990, 14:25');
  });

  it('длиннее лимита — обрезается, а не теряется целиком', () => {
    const url = new URL(rayaChatUrlWithDraft('я'.repeat(DRAFT_MAX_LENGTH + 50)));
    expect(decodeURIComponent(url.hash.slice('#draft='.length))).toHaveLength(DRAFT_MAX_LENGTH);
  });
});
```

`src/lib/goal.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Цель лендинга уходит и в Метрику, и в нашу таблицу событий — одним именем.
 * Окружение браузера подменяется: vitest здесь идёт в node (как в track.test.ts).
 */
function stubBrowser() {
  const store = new Map<string, string>();
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
  const ym = vi.fn<(id: number, action: string, goal?: string) => void>();
  vi.stubGlobal('window', { ym, location: { pathname: '/calculators/human-design/', search: '', hostname: 'linkeon.io' } });
  vi.stubGlobal('document', { referrer: '' });
  vi.stubGlobal('sessionStorage', storage);
  vi.stubGlobal('localStorage', storage);
  const fetch = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(async () => new Response(null));
  vi.stubGlobal('fetch', fetch);
  return { ym, fetch };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe('цель лендинга', () => {
  it('Метрика и таблица событий получают только имя цели', async () => {
    const { ym, fetch } = stubBrowser();
    const { METRIKA_ID, reachGoal } = await import('./goal');
    reachGoal('hd-calc-submit');
    expect(ym).toHaveBeenCalledWith(METRIKA_ID, 'reachGoal', 'hd-calc-submit');
    const body = JSON.parse(fetch.mock.calls[0][1]!.body as string);
    expect(body.name).toBe('landing_cta_click');
    expect(body.props.cta).toBe('hd-calc-submit');
    expect(body.props.path).toBe('/calculators/human-design/');
  });

  it('без Метрики (заблокирована) — не падает', async () => {
    stubBrowser();
    vi.stubGlobal('window', { location: { pathname: '/', search: '', hostname: 'linkeon.io' } });
    const { reachGoal } = await import('./goal');
    expect(() => reachGoal('hd-calc-to-raya')).not.toThrow();
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/hdDraft.test.ts src/lib/goal.test.ts
git commit -m "test(hd): черновик Райе во фрагменте, цель Метрики только с именем (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тесты падают**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/hdDraft.test.ts src/lib/goal.test.ts'`
Expected: FAIL — `Failed to resolve import "./hdDraft"` и `"./goal"`.

- [ ] **Step 4: Реализация**

`src/lib/hdDraft.ts`:

```ts
import { appUrl } from './appUrl';

/** id Райи в приложении (таблица agents). */
export const RAYA_ID = 14;

/** Кабинет отбрасывает черновик длиннее — см. spirits_front/src/utils/pendingDraft.ts. */
export const DRAFT_MAX_LENGTH = 600;

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

/** Подстановка {ключей} шаблона из текстов страницы. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => values[key] ?? whole);
}

/** Текст первого сообщения Райе. Дата — по-русски: 12.03.1990. */
export function draftMessage(template: string, parts: DraftParts): string {
  const [y, m, d] = parts.date.split('-');
  return fillTemplate(template, { ...parts, date: `${d}.${m}.${y}` });
}

/** Ссылка без черновика — она и стоит в href кнопки. */
export function rayaChatHref(): string {
  return appUrl('/chat', { assistant: String(RAYA_ID), utm_content: 'hd-calc' });
}

/**
 * Полная ссылка с черновиком во фрагменте (#draft=…): браузер не отправляет
 * фрагмент на сервер. Строится только в момент клика — в разметке (href)
 * данных рождения нет: её читают Вебвизор и отслеживание ссылок Метрики.
 */
export function rayaChatUrlWithDraft(message: string): string {
  return `${rayaChatHref()}#draft=${encodeURIComponent(message.slice(0, DRAFT_MAX_LENGTH))}`;
}
```

`src/lib/goal.ts`:

```ts
import { trackLandingCta } from './track';

/** Счётчик Яндекс Метрики лендинга (тот же — в index.html). */
export const METRIKA_ID = 105902201;

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string) => void;
  }
}

/**
 * Цель лендинга: в нашу таблицу событий (landing_cta_click) и в Метрику.
 * Уходит только имя цели — никаких данных со страницы.
 */
export function reachGoal(goal: string): void {
  trackLandingCta(goal);
  if (window.ym) window.ym(METRIKA_ID, 'reachGoal', goal);
}
```

- [ ] **Step 5: main.tsx — тот же `reachGoal`**

В `src/main.tsx` строку

```tsx
import { trackLandingVisit, trackLandingCta, initLandingEngagement } from './lib/track';
```

заменить на

```tsx
import { trackLandingVisit, initLandingEngagement } from './lib/track';
import { reachGoal } from './lib/goal';
```

и блок

```tsx
declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string) => void;
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  const el = target?.closest<HTMLElement>('[data-cta]');
  if (!el) return;
  const goal = el.dataset.cta;
  if (!goal) return;
  // Пишем клик и в нашу БД (видеть шаг лендинг→клик), и в Я.Метрику.
  trackLandingCta(goal);
  if (window.ym) window.ym(105902201, 'reachGoal', goal);
}, { capture: true });
```

на

```tsx
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  const el = target?.closest<HTMLElement>('[data-cta]');
  if (!el) return;
  const goal = el.dataset.cta;
  if (!goal) return;
  // Пишем клик и в нашу БД (видеть шаг лендинг→клик), и в Я.Метрику.
  reachGoal(goal);
}, { capture: true });
```

(`declare global` для `window.ym` переехал в `goal.ts`.)

- [ ] **Step 6: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/hdDraft.ts src/lib/goal.ts src/main.tsx
git commit -m "feat(hd): черновик Райе во фрагменте ссылки, цели Метрики одной функцией

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Тесты и типы**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(./node_modules/.bin/vitest run src/lib/hdDraft.test.ts src/lib/goal.test.ts src/lib/track.test.ts > /tmp/hd-t13.log 2>&1 && echo OK || echo FAILED); grep -E "Test Files|Tests " /tmp/hd-t13.log; pnpm typecheck > /tmp/hd-tsc.log 2>&1 && echo TSC_OK || echo TSC_FAILED'`
Expected: `OK` (hdDraft 6, goal 2, track — прежние), `TSC_OK`.

---

### Task 14: Кабинет — черновик в хранилище

**Files:**
- Create: `src/utils/pendingDraft.ts`
- Test: `src/utils/pendingDraft.test.ts`

Все пути — от корня воркдерева кабинета `~/Downloads/spirits_front/.worktrees/hd-draft`.

Образец — `src/utils/pendingAssistant.ts` (тот же `localStorage`, тот же час жизни). Черновик привязан к ассистенту из `?assistant=` и отдаётся только ему, один раз. Выбор ассистента до входа уже запоминает `utils/loginIntent.ts` (`?assistant=14` → `pending_assistant`), а `RootRedirect` не участвует — ссылка ведёт сразу на `/chat`; оба файла не меняются. Черновик — отдельная запись: у него своя жизнь (только в чат своего ассистента, один раз), и снимается он из адреса ещё до React — скриптом в `index.html` (Task 15).

- [ ] **Step 1: Написать тест**

`src/utils/pendingDraft.test.ts`:

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { DRAFT_KEY, DRAFT_MAX_LENGTH, DRAFT_TTL_MS, takePendingDraftFor } from './pendingDraft';

const NOW = 1_700_000_000_000;
const put = (value: unknown) => localStorage.setItem(DRAFT_KEY, JSON.stringify(value));

describe('черновик сообщения со страницы linkeon.io', () => {
  beforeEach(() => localStorage.clear());

  it('отдаётся своему ассистенту один раз', () => {
    put({ text: 'Райя, привет!', assistant: '14', expires: NOW + DRAFT_TTL_MS });
    expect(takePendingDraftFor(14, NOW)).toBe('Райя, привет!');
    expect(takePendingDraftFor(14, NOW)).toBeNull();
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it('чужому ассистенту — не отдаётся и не стирается', () => {
    put({ text: 'Райя, привет!', assistant: '14', expires: NOW + DRAFT_TTL_MS });
    expect(takePendingDraftFor(12, NOW)).toBeNull();
    expect(takePendingDraftFor('14', NOW)).toBe('Райя, привет!');
  });

  it('через час забывается', () => {
    put({ text: 'Райя, привет!', assistant: '14', expires: NOW + DRAFT_TTL_MS });
    expect(takePendingDraftFor(14, NOW + DRAFT_TTL_MS + 1)).toBeNull();
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it('битое, пустое и длинное отбрасывается', () => {
    localStorage.setItem(DRAFT_KEY, '{oops');
    expect(takePendingDraftFor(14, NOW)).toBeNull();
    put({ text: '   ', assistant: '14', expires: NOW + DRAFT_TTL_MS });
    expect(takePendingDraftFor(14, NOW)).toBeNull();
    put({ text: 'я'.repeat(DRAFT_MAX_LENGTH + 1), assistant: '14', expires: NOW + DRAFT_TTL_MS });
    expect(takePendingDraftFor(14, NOW)).toBeNull();
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git add src/utils/pendingDraft.test.ts
git commit -m "test(chat): черновик со страницы linkeon.io — один раз, своему ассистенту, час (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front './node_modules/.bin/vitest run src/utils/pendingDraft.test.ts'`
Expected: FAIL — `Failed to resolve import "./pendingDraft"`.

- [ ] **Step 4: Реализация**

`src/utils/pendingDraft.ts`:

```ts
/**
 * Черновик первого сообщения ассистенту, пришедший со страницы linkeon.io.
 *
 * Калькулятор Human Design ведёт на /chat?assistant=14#draft=<текст>.
 * Скрипт в index.html (стоит ДО Метрики) забирает текст сюда и стирает
 * фрагмент из адреса: вебвизор Метрики пишет адрес страницы, и данные
 * рождения в нём оказались бы у Метрики. Формат записи этот скрипт повторяет —
 * его тест (draftCapture.test.ts) читает запись через этот модуль.
 *
 * localStorage, а не sessionStorage — как у pendingAssistant: ссылка входа из
 * письма открывается в новой вкладке. Срок — час. Черновик привязан к
 * ассистенту из ?assistant= и подставляется один раз — в чат с ним.
 */
export const DRAFT_KEY = 'pending_draft';
export const DRAFT_TTL_MS = 60 * 60 * 1000;
export const DRAFT_MAX_LENGTH = 600;

interface Stored {
  text: string;
  assistant: string;
  expires: number;
}

function forget(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* хранилище недоступно — забывать нечего */
  }
}

/** Запись из хранилища; битая, просроченная или подозрительная — стирается. */
function read(now: number): Stored | null {
  let raw: string | null;
  try {
    raw = localStorage.getItem(DRAFT_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<Stored>;
    if (
      typeof p.text === 'string' &&
      p.text.trim() !== '' &&
      p.text.length <= DRAFT_MAX_LENGTH &&
      typeof p.assistant === 'string' &&
      typeof p.expires === 'number' &&
      p.expires > now
    ) {
      return { text: p.text, assistant: p.assistant, expires: p.expires };
    }
  } catch {
    /* не JSON — стираем ниже */
  }
  forget();
  return null;
}

/**
 * Текст черновика для этого ассистента — один раз: отдаёт и стирает.
 * Черновик другому ассистенту не трогается: человек может дойти до нужного
 * чата позже в пределах часа.
 */
export function takePendingDraftFor(assistantId: string | number, now = Date.now()): string | null {
  const stored = read(now);
  if (!stored || stored.assistant !== String(assistantId)) return null;
  forget();
  return stored.text;
}
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git add src/utils/pendingDraft.ts
git commit -m "feat(chat): черновик первого сообщения со страницы linkeon.io

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front './node_modules/.bin/vitest run src/utils/pendingDraft.test.ts'`
Expected: PASS, 4 теста.

---

### Task 15: Кабинет — скрипт до Метрики

**Files:**
- Modify: `index.html` (перед блоком `<!-- Yandex.Metrika counter -->`, сейчас строка 44)
- Test: `src/utils/draftCapture.test.ts`

Все пути — от корня воркдерева кабинета `~/Downloads/spirits_front/.worktrees/hd-draft`.

Метрика кабинета (`webvisor:true`) пишет адрес страницы, а её `tag.js` грузится асинхронно и может выполниться раньше любого скрипта ниже по разметке. Поэтому скрипт стоит **до** сниппета Метрики и стирает фрагмент первым делом — даже битый или слишком длинный черновик. Тест исполняет настоящий скрипт из `index.html`, а не его копию.

- [ ] **Step 1: Написать тест**

`src/utils/draftCapture.test.ts`:

```ts
// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { DRAFT_KEY, DRAFT_MAX_LENGTH, takePendingDraftFor } from './pendingDraft';

/**
 * Скрипт в index.html, который забирает #draft=… до Метрики. Тест исполняет
 * НАСТОЯЩИЙ скрипт из index.html: копия логики здесь зеленела бы при любой
 * правке файла.
 */
const HTML = readFileSync(join(__dirname, '..', '..', 'index.html'), 'utf8');
const SCRIPT = HTML.match(/<script data-draft-capture>([\s\S]*?)<\/script>/)?.[1] ?? '';

function open(url: string): void {
  window.history.replaceState(null, '', url);
  new Function(SCRIPT)();
}

const DRAFT = 'Райя, привет! Мои данные рождения: 12.03.1990, 14:25, Казань (UTC+3).';

describe('черновик из адреса', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('скрипт есть и стоит раньше Метрики', () => {
    expect(SCRIPT).not.toBe('');
    expect(HTML.indexOf('data-draft-capture')).toBeLessThan(HTML.indexOf('mc.yandex.ru/metrika/tag.js'));
  });

  it('забирает текст и стирает фрагмент из адреса', () => {
    open(`/chat?assistant=14&utm_content=hd-calc#draft=${encodeURIComponent(DRAFT)}`);
    expect(window.location.hash).toBe('');
    expect(window.location.href).not.toContain('draft');
    expect(window.location.pathname + window.location.search).toBe('/chat?assistant=14&utm_content=hd-calc');
    expect(takePendingDraftFor(14)).toBe(DRAFT);
  });

  it('битый, длинный и без ассистента — не сохраняется, но из адреса стирается', () => {
    open('/chat?assistant=14#draft=%E0%A4%A');
    expect(window.location.hash).toBe('');
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();

    open(`/chat?assistant=14#draft=${encodeURIComponent('я'.repeat(DRAFT_MAX_LENGTH + 1))}`);
    expect(window.location.hash).toBe('');
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();

    open(`/chat#draft=${encodeURIComponent(DRAFT)}`);
    expect(window.location.hash).toBe('');
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it('другие фрагменты не трогает', () => {
    open('/chat#settings');
    expect(window.location.hash).toBe('#settings');
    expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git add src/utils/draftCapture.test.ts
git commit -m "test(chat): #draft= забирается до Метрики и стирается из адреса (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front './node_modules/.bin/vitest run src/utils/draftCapture.test.ts'`
Expected: FAIL — «скрипт есть и стоит раньше Метрики» (`expected '' not to be ''`) и остальные.

- [ ] **Step 4: Скрипт в index.html**

В `index.html` строку

```html
    <!-- Yandex.Metrika counter -->
```

заменить на

```html
    <!-- Черновик сообщения ассистенту со страницы linkeon.io (#draft=…):
         забрать в localStorage и стереть из адреса ДО Метрики — вебвизор пишет
         адрес страницы, и данные рождения в нём ушли бы в Метрику. Формат
         записи и чтение — src/utils/pendingDraft.ts, тест — draftCapture.test.ts. -->
    <script data-draft-capture>
      (function () {
        try {
          var hash = location.hash;
          if (hash.indexOf('#draft=') !== 0) return;
          // Сначала стереть: битый или длинный черновик тоже не должен
          // остаться в адресе.
          history.replaceState(history.state, '', location.pathname + location.search);
          var text = decodeURIComponent(hash.slice(7)).trim();
          var assistant = (new URLSearchParams(location.search).get('assistant') || '').trim();
          if (!text || text.length > 600 || !assistant) return;
          localStorage.setItem('pending_draft', JSON.stringify({
            text: text,
            assistant: assistant,
            expires: Date.now() + 3600000
          }));
        } catch (e) { /* битый черновик отбрасывается */ }
      })();
    </script>

    <!-- Yandex.Metrika counter -->
```

- [ ] **Step 5: Commit**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git add index.html
git commit -m "feat(chat): черновик из #draft= забирается до Метрики, адрес чистится

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front './node_modules/.bin/vitest run src/utils/draftCapture.test.ts src/utils/pendingDraft.test.ts'`
Expected: PASS, 8 тестов.

---

### Task 16: Кабинет — черновик в поле ввода чата

**Files:**
- Modify: `src/components/chat/ChatInterface.tsx` (импорт; эффект перед блоком `?say=` ~строка 2010; `className` поля ввода ~строка 3208)
- Test: `src/components/chat/draftWiring.test.ts`

Все пути — от корня воркдерева кабинета `~/Downloads/spirits_front/.worktrees/hd-draft`.

`?say=` (автоотправка) не меняется. Черновик — только в поле ввода, отправляет человек сам. Эффект ждёт историю **именно выбранного** ассистента (`historyLoadedForRef`, как эффект первичной прокрутки): `historyLoading` при смене ассистента ещё старый. Поле ввода получает `ym-disable-keys` — иначе Вебвизор кабинета записал бы подставленные данные рождения до того, как человек решил их отправить (это меняет записи Вебвизора для всех сообщений — владелец подтверждает на СТОП 2 в Task 17).

Почему сторож связки, а не тест на `src/test/dom.tsx`: `ChatInterface` (3300 строк) в jsdom не монтируется без десятков заглушек. Так же устроены `listenWiring.test.ts` и `interactivityWiring.test.ts`; поведение целиком проверяет живой прогон на test.linkeon.io (Task 17 Step 5).

- [ ] **Step 1: Написать тест**

`src/components/chat/draftWiring.test.ts`:

```ts
// src/components/chat/draftWiring.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Сторож связки черновика: pendingDraft.ts покрыт своими тестами, а вот что
 * ChatInterface его зовёт, ждёт истории нужного ассистента и НЕ отправляет
 * текст сам — видно только здесь.
 */
const SRC = readFileSync(join(__dirname, 'ChatInterface.tsx'), 'utf8');

const effect = (): string => {
  const a = SRC.indexOf('takePendingDraftFor(selectedAssistant.id)');
  expect(a).toBeGreaterThan(-1);
  const start = SRC.lastIndexOf('useEffect(', a);
  return SRC.slice(start, SRC.indexOf('}, [', a));
};

describe('черновик со страницы linkeon.io', () => {
  it('ChatInterface забирает черновик из utils/pendingDraft', () => {
    expect(SRC).toContain("import { takePendingDraftFor } from '../../utils/pendingDraft';");
  });

  it('ждёт, пока загрузится история именно выбранного ассистента', () => {
    expect(effect()).toContain('historyLoadedForRef.current !== selectedAssistant.id');
    expect(effect()).toContain('historyLoading');
  });

  it('кладёт текст в поле ввода и не отправляет его', () => {
    expect(effect()).toContain('setInput(');
    expect(effect()).not.toContain('sendMessageText');
    expect(effect()).not.toContain('handleSend');
  });

  // Иначе вебвизор кабинета записал бы подставленные данные рождения до того,
  // как человек решил их отправить.
  it('поле ввода чата скрыто от Вебвизора', () => {
    const at = SRC.indexOf('data-testid="chat-input"');
    expect(at).toBeGreaterThan(-1);
    expect(SRC.slice(SRC.lastIndexOf('<textarea', at), at)).toContain('ym-disable-keys');
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git add src/components/chat/draftWiring.test.ts
git commit -m "test(chat): черновик в поле ввода чата без отправки, поле скрыто от Вебвизора (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front './node_modules/.bin/vitest run src/components/chat/draftWiring.test.ts'`
Expected: FAIL — все 4 теста (импорта и эффекта нет, `ym-disable-keys` нет).

- [ ] **Step 4: Импорт**

В `src/components/chat/ChatInterface.tsx` после строки

```tsx
import { askBlocksToPlainText } from '../../utils/askBlock';
```

добавить

```tsx
import { takePendingDraftFor } from '../../utils/pendingDraft';
```

- [ ] **Step 5: Эффект**

Перед строкой

```tsx
  // ?say=<text> → автоотправка первого сообщения. Ждём, пока ассистент выбран
```

вставить

```tsx
  // Черновик со страницы linkeon.io (калькулятор Human Design → Райя, см.
  // utils/pendingDraft.ts): текст в поле ввода, БЕЗ отправки — отправляет
  // человек сам. Ждём историю именно выбранного ассистента: её загрузка
  // перерисовывает чат, а флаг historyLoading при смене ассистента ещё
  // старый. Набранное человеком не затираем.
  useEffect(() => {
    if (!selectedAssistant || historyLoading) return;
    if (historyLoadedForRef.current !== selectedAssistant.id) return;
    const draft = takePendingDraftFor(selectedAssistant.id);
    if (!draft) return;
    setInput((current) => (current.trim() ? current : draft));
    textareaRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssistant?.id, historyLoading]);

```

- [ ] **Step 6: Поле ввода — мимо Вебвизора**

В том же файле у `<textarea>` с `data-testid="chat-input"` строку

```tsx
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              rows={2}
              style={{ minHeight: '72px', maxHeight: '240px' }}
              data-testid="chat-input"
```

заменить на

```tsx
              // ym-disable-keys: вебвизор не пишет набираемое — в том числе
              // подставленный черновик с данными рождения (utils/pendingDraft.ts).
              className="ym-disable-keys w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
              rows={2}
              style={{ minHeight: '72px', maxHeight: '240px' }}
              data-testid="chat-input"
```

(Второй `<textarea>` — в модалке файла — не трогать.)

- [ ] **Step 7: Commit**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git add src/components/chat/ChatInterface.tsx
git commit -m "feat(chat): черновик со страницы linkeon.io — в поле ввода чата, без автоотправки

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 8: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front './node_modules/.bin/vitest run src/components/chat/draftWiring.test.ts src/utils/draftCapture.test.ts src/utils/pendingDraft.test.ts'`
Expected: PASS, 12 тестов.

---

### Task 17: Кабинет — прогон, слияние, выкат

Кабинет выкатывается **раньше** лендинга: иначе `#draft=` придёт в старый кабинет, останется в адресе и уйдёт в Метрику.

- [ ] **Step 1: Полный прогон на ноде**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front '(pnpm test > /tmp/hd-front-test.log 2>&1 && echo TESTS_OK || echo TESTS_FAILED); grep -E "Test Files|Tests " /tmp/hd-front-test.log; echo "tsc errors: $(pnpm typecheck 2>&1 | grep -c "error TS")"; (pnpm build > /tmp/hd-front-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); grep -n "data-draft-capture\|metrika/tag.js" dist/index.html | cut -c1-80; (pnpm check-hardcoded > /tmp/hd-front-hc.log 2>&1 || true); grep -cE "^\s+src/" /tmp/hd-front-hc.log'
```

Expected: `TESTS_OK`; `tsc errors:` — столько же, сколько в Task 1 Step 5 (45); `BUILD_OK`; в `dist/index.html` строка с `data-draft-capture` — **раньше** строки с `metrika/tag.js`; находок `check-hardcoded` — 2, как до правок.

- [ ] **Step 2: Слить в main (не через общий чекаут)**

```bash
cd ~/Downloads/spirits_front/.worktrees/hd-draft
git fetch -q origin
git checkout -q --detach origin/main
git merge --no-ff feat/hd-draft -m "Merge feat/hd-draft: черновик со страницы linkeon.io переживает вход и не попадает в адрес для Метрики

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh front '(pnpm test > /tmp/hd-front-test.log 2>&1 && echo TESTS_OK || echo TESTS_FAILED); echo "tsc errors: $(pnpm typecheck 2>&1 | grep -c "error TS")"'
git push origin HEAD:main
git log --oneline -1 origin/main
```

Прогон — на коммите слияния: если `main` ушёл вперёд, проверяется то, что поедет. Expected: `TESTS_OK`, ошибок `tsc` не больше прежнего, после push `origin/main` — наш merge. В общем чекауте `~/Downloads/spirits_front` ничего не менять.

- [ ] **Step 3: СТОП 2 — согласие владельца на выкат на test**

Спросить владельца. Сказать: выкат идёт с ноды со свежих клонов, сначала только test (`TEST_ONLY=1 FRONT_ONLY=1`); поле ввода чата теперь скрыто от Вебвизора для всех сообщений (Task 16) — если владелец против, убрать класс отдельным коммитом до выката. `deploy.sh` без явного «да» не запускается.

- [ ] **Step 4: Выкат на test с ноды**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'pgrep -fa "^bash scripts/deploy.sh" || echo "чужих выкатов нет"'
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'set -e
NAME=hd-draft-test-$(date +%m%d-%H%M)
mkdir -p ~/deploy-clones/$NAME ~/deploy-logs
git clone -q --branch main git@github.com:dvvolkovv/spirits_back.git ~/deploy-clones/$NAME/spirits_back
git clone -q --branch main git@github.com:dvvolkovv/spirits.git ~/deploy-clones/$NAME/spirits_front
install -m 600 ~/dev/spirits_back/scripts/test-server.env.local ~/deploy-clones/$NAME/spirits_back/scripts/
source ~/.nvm/nvm.sh
(cd ~/deploy-clones/$NAME/spirits_back/tests && npm ci --silent > /dev/null 2>&1)
cd ~/deploy-clones/$NAME/spirits_back
TEST_ONLY=1 FRONT_ONLY=1 LOCAL_BACK_DIR=$PWD LOCAL_FRONT_DIR=~/deploy-clones/$NAME/spirits_front setsid -f bash -c "echo \$\$ > ~/deploy-logs/$NAME.pid; exec bash scripts/deploy.sh" > ~/deploy-logs/$NAME.log 2>&1 < /dev/null
echo $NAME'
```

Если первая команда нашла чужой `deploy.sh` — ждать, не запускать свой. Свежие клоны — потому что `deploy.sh` пушит локальную `main`, а в общих чекаутах бывает чужой незапушенный коммит; `test-server.env.local` (gitignored) и `npm ci` в `tests/` нужны смоку. `setsid` — чтобы обрыв ssh не убил выкат (убитый `deploy.sh` откатывает стенд).

Следить, не блокируя сессию дольше пары минут (`<NAME>` — из вывода выше):

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'tail -3 ~/deploy-logs/<NAME>.log; kill -0 $(cat ~/deploy-logs/<NAME>.pid) 2>/dev/null && echo ИДЁТ || echo ЗАКОНЧИЛ'
```

Expected в конце лога: `ALL SMOKE LAYERS GREEN` и `ALL PHASES GREEN`.

- [ ] **Step 5: Живая проверка на test.linkeon.io**

Скрипт Playwright — в `/tmp` на ноде, в репозиторий не кладётся (в нём вход тестовым номером; рецепт входа — в заметках владельца, не в репозитории). Запуск — с `NODE_PATH=~/dev/spirits_back/tests/node_modules` и Basic Auth стенда из `~/dev/spirits_back/scripts/test-server.env.local`. Что он делает:
1. Без входа открывает `https://test.linkeon.io/chat?assistant=14&utm_content=hd-calc#draft=<encodeURIComponent("Райя, привет! Проверка черновика 12.03.1990")>`, перехватывая запросы к `mc.yandex.*`: ни в одном адресе и теле нет `draft` и `12.03.1990`; после загрузки `location.hash` пуст, в `localStorage` есть `pending_draft` с `assistant: "14"`.
2. Входит новым номером из тестового диапазона: открылся чат с Райей, в поле `[data-testid="chat-input"]` — текст черновика; запроса на отправку сообщения не было; у поля есть класс `ym-disable-keys`.

Expected: `{"hashCleared":true,"metrikaSawDraft":false,"stored":true,"inputHasDraft":true,"sent":false,"masked":true}` и код выхода 0; скриншот чата забрать на мак (`scp … /tmp/hd-draft-check.png`) и посмотреть.

- [ ] **Step 6: СТОП 2 — согласие владельца на прод**

Показать результат Step 5. Правило владельца — `deploy.sh` без флагов; предложить `FRONT_ONLY=1`: меняется только фронт, а перезапуск API рвёт живые разговоры. Перед запуском: нет идущих разговоров (`curl -s https://my.linkeon.io/webhook/chat/active-streams`) и чужих выкатов.

- [ ] **Step 7: Выкат на прод с ноды**

Тот же рецепт, что в Step 4, с новыми свежими клонами (между шагами в `main` могли влить чужое), `NAME=hd-draft-prod-$(date +%m%d-%H%M)` и флагом `FRONT_ONLY=1` вместо `TEST_ONLY=1 FRONT_ONLY=1` (флаги — как решил владелец). Expected: `ALL PHASES GREEN`.

Проверка, что код доехал: `curl -s https://my.linkeon.io/chat | grep -n "data-draft-capture\|metrika/tag.js" | cut -c1-60` — две строки, `data-draft-capture` первой.

---

### Task 18: Тексты калькулятора целиком

**Files:**
- Create: `src/content/hd/types.ts`, `src/content/hd/texts.server.ts`, `src/content/hd/load.ts`, `src/content/hd/texts/ru.ts`
- Test: `src/content/hd/texts.test.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Только после «ок» на СТОП 1 и коммита правок к правилам. Тексты — модулем на язык, как у страниц ассистентов: браузер грузит свой язык отдельным чанком (`load.ts`), пререндер и тесты — все сразу (`texts.server.ts`). Новый язык калькулятора — это новый файл `texts/<код>.ts` (следующий заход).

- [ ] **Step 1: Тип текстов и загрузчики**

`src/content/hd/types.ts`:

```ts
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
```

`src/content/hd/texts.server.ts`:

```ts
import type { HdTexts } from './types';

/**
 * Тексты калькулятора на всех языках сразу и синхронно — для пререндера и
 * тестов (как packs.server.ts у страниц ассистентов). В клиентский бандл не
 * попадает: его импортируют только src/entry-server.tsx и тесты.
 */
const modules = import.meta.glob<{ default: HdTexts }>('./texts/*.ts', { eager: true });

export const HD_TEXTS: Record<string, HdTexts> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.replace(/^.*\/(\w+)\.ts$/, '$1'), mod.default]),
);
```

`src/content/hd/load.ts`:

```ts
import type { HdTexts } from './types';

/** Тексты калькулятора для браузера — отдельный чанк на язык. */
const loaders = import.meta.glob<{ default: HdTexts }>('./texts/*.ts');

export async function loadHdTexts(language: string): Promise<HdTexts | null> {
  const load = loaders[`./texts/${language}.ts`];
  return load ? (await load()).default : null;
}
```

- [ ] **Step 2: Написать тест правил**

`src/content/hd/texts.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { HD_TEXTS } from './texts.server';
import { PROFILES } from './types';
import { CENTER_IDS, CHANNELS, HD_AUTHORITIES, HD_DEFINITIONS, HD_TYPES, channelKey } from '../../lib/human-design';
import { DRAFT_MAX_LENGTH, draftMessage } from '../../lib/hdDraft';

/**
 * Механическая часть «Правил текстов» плана калькулятора. Смысл, тон и
 * честность границ — ревью владельца; здесь то, что ломается молча:
 * пропавший канал, пустое поле, ключ шаблона с опечаткой, цена, эмодзи.
 */
const PLACEHOLDER = /TODO|TBD|Lorem|\{\{|\}\}/;
const EMOJI = /\p{Extended_Pictographic}/u;
// Цена — только «25 000 токенов в подарок»; рубли, доллары и пакеты не называем.
const PRICE = /₽|руб\.|рубл|\$|€/;

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const keys = (o: object) => Object.keys(o).sort();
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('тексты калькулятора', () => {
  it('русский — источник переводов — на месте', () => {
    expect(Object.keys(HD_TEXTS)).toContain('ru');
  });

  for (const [code, t] of Object.entries(HD_TEXTS)) {
    describe(code, () => {
      it('описан каждый тип, авторитет, профиль, определённость, центр и канал', () => {
        expect(keys(t.types)).toEqual([...HD_TYPES].sort());
        expect(keys(t.authorities)).toEqual([...HD_AUTHORITIES].sort());
        expect(keys(t.profiles)).toEqual([...PROFILES].sort());
        expect(keys(t.definitions)).toEqual([...HD_DEFINITIONS].sort());
        expect(keys(t.centers)).toEqual([...CENTER_IDS].sort());
        expect(keys(t.channels)).toEqual(CHANNELS.map(channelKey).sort());
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

      it('метатеги, вводный текст, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(100);
        expect(t.description.length).toBeLessThanOrEqual(180);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('описания короткие: 60–420 знаков', () => {
        const texts = [
          ...Object.values(t.types).map((x) => x.text),
          ...Object.values(t.authorities).map((x) => x.text),
          ...Object.values(t.profiles).map((x) => x.text),
          ...Object.values(t.definitions).map((x) => x.text),
          ...Object.values(t.centers).flatMap((x) => [x.defined, x.open]),
          ...Object.values(t.channels).map((x) => x.text),
        ];
        expect(texts).toHaveLength(5 + 7 + 12 + 5 + 18 + 36);
        for (const s of texts) {
          expect(s.length, s).toBeGreaterThanOrEqual(60);
          expect(s.length, s).toBeLessThanOrEqual(420);
        }
      });

      it('шаблоны с нужными ключами', () => {
        expect(placeholders(t.message)).toEqual(['authority', 'city', 'date', 'offset', 'profile', 'time', 'type']);
        expect(placeholders(t.form.zoneLine)).toEqual(['city', 'offset']);
        expect(placeholders(t.result.dataLine)).toEqual(['city', 'date', 'offset', 'time']);
        expect(placeholders(t.form.dstGap)).toEqual(['time']);
        expect(placeholders(t.form.dstAmbiguous)).toEqual(['time']);
        expect(placeholders(t.form.dstBefore)).toEqual(['offset']);
        expect(placeholders(t.form.dstAfter)).toEqual(['offset']);
        expect(placeholders(t.result.bodygraphLabel)).toEqual(['centers', 'type']);
      });

      it('сообщение Райе укладывается в лимит кабинета при любом сочетании', () => {
        for (const type of HD_TYPES) {
          for (const authority of HD_AUTHORITIES) {
            const message = draftMessage(t.message, {
              date: '1990-03-12',
              time: '14:25',
              city: 'Петропавловск-Камчатский',
              offset: 'UTC+12',
              type: t.types[type].name,
              profile: '3/5',
              authority: t.authorities[authority].inMessage,
            });
            expect(message.length).toBeLessThan(DRAFT_MAX_LENGTH);
          }
        }
      });
    });
  }

  describe('ru — решения из спеки', () => {
    const t = HD_TEXTS.ru;
    it('H1', () => {
      expect(t.h1).toBe('Расчёт Human Design онлайн — бодиграф бесплатно');
    });
    it('кнопка и строка под ней', () => {
      expect(t.result.cta).toBe('Разобрать с Райей');
      expect(t.result.ctaNote).toMatch(/эксперимент на 7 дней/);
      expect(t.result.ctaNote).toMatch(/25\s000 токенов в подарок/);
    });
    it('оговорка: самопознание, не прогноз и не замена специалисту', () => {
      expect(t.disclaimer).toMatch(/самопознани/);
      expect(t.disclaimer).toMatch(/не прогноз/);
      expect(t.disclaimer).toMatch(/врач/);
    });
    it('пункт крошек — как в спеке', () => {
      expect(t.breadcrumb).toBe('Расчёт Human Design');
    });
  });
});
```

- [ ] **Step 3: Каркас русских текстов**

`src/content/hd/texts/ru.ts` — названия и строки интерфейса уже на месте; пустые строки (`title`, `description`, `intro`, все `text`, `defined`/`open`, `typesSection.lead`, ответы FAQ) заполняются в Step 5:

```ts
import type { HdTexts } from '../types';

/**
 * Калькулятор Human Design — русский, источник переводов.
 * Правила — «Правила текстов» плана docs/superpowers/plans/2026-10-08-human-design-calculator.md,
 * одобренные образцы — docs/hd-calculator/samples-ru.md.
 */
const ru: HdTexts = {
  title: '',
  description: '',
  h1: 'Расчёт Human Design онлайн — бодиграф бесплатно',
  breadcrumb: 'Расчёт Human Design',
  intro: ['', ''],
  form: {
    heading: 'Ваши данные рождения',
    date: 'Дата рождения',
    time: 'Время рождения',
    timeHint: 'Время обязательно: без него тип может оказаться другим.',
    city: 'Город рождения',
    cityPlaceholder: 'Начните вводить город',
    cityHint: 'Нет своего города — выберите ближайший крупный в том же часовом поясе.',
    cityLoading: 'Загружаем список городов…',
    cityLoadError: 'Список городов не загрузился. Проверьте связь и нажмите на поле ещё раз.',
    cityNotFound: 'Такого города нет в списке — выберите ближайший крупный в том же поясе.',
    zoneLine: '{city}, {offset} на дату рождения',
    zoneUnknown: 'Браузер не знает часовой пояс этого города — выберите соседний крупный город.',
    dstGap: 'В эту ночь стрелки переводили вперёд: времени {time} на часах не было. Как записано время рождения?',
    dstAmbiguous: 'В эту ночь стрелки переводили назад: время {time} было дважды. Какое из двух?',
    dstBefore: 'До перевода стрелок ({offset})',
    dstAfter: 'После перевода стрелок ({offset})',
    dstChoose: 'Выберите, до или после перевода стрелок.',
    missing: 'Заполните дату и время и выберите город из списка.',
    futureDate: 'Проверьте дату: она должна быть между 1900 годом и сегодняшним днём.',
    submit: 'Рассчитать',
  },
  result: {
    heading: 'Ваш бодиграф',
    dataLine: '{date}, {time}, {city} ({offset})',
    bodygraphLabel: 'Бодиграф: {type}. Определённые центры: {centers}',
    legendPersonality: 'Личность — момент рождения',
    legendDesign: 'Дизайн — около 88 дней до рождения',
    typeLabel: 'Тип',
    strategyLabel: 'Стратегия',
    authorityLabel: 'Авторитет',
    profileLabel: 'Профиль',
    definitionLabel: 'Определённость',
    definedCenters: 'Определённые центры',
    noDefinedCenters: 'Определённых центров нет',
    openCenters: 'Открытые центры',
    channels: 'Каналы',
    noChannels: 'Определённых каналов нет.',
    cta: 'Разобрать с Райей',
    ctaNote: 'Личный разбор и эксперимент на 7 дней — у Райи, при регистрации 25 000 токенов в подарок',
  },
  types: {
    generator: { name: 'Генератор', strategy: 'Откликаться', text: '' },
    manifestingGenerator: { name: 'Манифестирующий генератор', strategy: 'Откликаться, затем сообщать о действии', text: '' },
    manifestor: { name: 'Манифестор', strategy: 'Сообщать о своих действиях заранее', text: '' },
    projector: { name: 'Проектор', strategy: 'Ждать приглашения', text: '' },
    reflector: { name: 'Рефлектор', strategy: 'Ждать лунный цикл — около 28 дней', text: '' },
  },
  authorities: {
    emotional: { name: 'Эмоциональный (солнечное сплетение)', inMessage: 'эмоциональный авторитет', text: '' },
    sacral: { name: 'Сакральный', inMessage: 'сакральный авторитет', text: '' },
    splenic: { name: 'Селезёночный', inMessage: 'селезёночный авторитет', text: '' },
    ego: { name: 'Эго (сердечный центр)', inMessage: 'авторитет эго', text: '' },
    selfProjected: { name: 'Самопроецированный', inMessage: 'самопроецированный авторитет', text: '' },
    mental: { name: 'Ментальный (через окружение)', inMessage: 'ментальный авторитет', text: '' },
    lunar: { name: 'Лунный', inMessage: 'лунный авторитет', text: '' },
  },
  profiles: {
    '1/3': { name: 'Исследователь / Мученик', text: '' },
    '1/4': { name: 'Исследователь / Оппортунист', text: '' },
    '2/4': { name: 'Отшельник / Оппортунист', text: '' },
    '2/5': { name: 'Отшельник / Еретик', text: '' },
    '3/5': { name: 'Мученик / Еретик', text: '' },
    '3/6': { name: 'Мученик / Ролевая модель', text: '' },
    '4/6': { name: 'Оппортунист / Ролевая модель', text: '' },
    '4/1': { name: 'Оппортунист / Исследователь', text: '' },
    '5/1': { name: 'Еретик / Исследователь', text: '' },
    '5/2': { name: 'Еретик / Отшельник', text: '' },
    '6/2': { name: 'Ролевая модель / Отшельник', text: '' },
    '6/3': { name: 'Ролевая модель / Мученик', text: '' },
  },
  definitions: {
    none: { name: 'Нет определённости', text: '' },
    single: { name: 'Одинарная', text: '' },
    split: { name: 'Расщеплённая (двойная)', text: '' },
    triple: { name: 'Тройная', text: '' },
    quadruple: { name: 'Четверная', text: '' },
  },
  centers: {
    head: { name: 'Теменной центр', defined: '', open: '' },
    ajna: { name: 'Аджна', defined: '', open: '' },
    throat: { name: 'Горловой центр', defined: '', open: '' },
    g: { name: 'Центр G (идентичность)', defined: '', open: '' },
    heart: { name: 'Сердечный центр (эго)', defined: '', open: '' },
    spleen: { name: 'Селезёночный центр', defined: '', open: '' },
    solarPlexus: { name: 'Солнечное сплетение', defined: '', open: '' },
    sacral: { name: 'Сакральный центр', defined: '', open: '' },
    root: { name: 'Корневой центр', defined: '', open: '' },
  },
  channels: {
    '1-8': { name: 'Вдохновение', text: '' },
    '2-14': { name: 'Пульс', text: '' },
    '3-60': { name: 'Мутация', text: '' },
    '4-63': { name: 'Логика', text: '' },
    '5-15': { name: 'Ритм', text: '' },
    '6-59': { name: 'Близость', text: '' },
    '7-31': { name: 'Альфа', text: '' },
    '9-52': { name: 'Концентрация', text: '' },
    '10-20': { name: 'Пробуждение', text: '' },
    '10-34': { name: 'Исследование', text: '' },
    '10-57': { name: 'Совершенная форма', text: '' },
    '11-56': { name: 'Любопытство', text: '' },
    '12-22': { name: 'Открытость', text: '' },
    '13-33': { name: 'Блудный сын', text: '' },
    '16-48': { name: 'Длина волны', text: '' },
    '17-62': { name: 'Принятие', text: '' },
    '18-58': { name: 'Суждение', text: '' },
    '19-49': { name: 'Синтез', text: '' },
    '20-34': { name: 'Харизма', text: '' },
    '20-57': { name: 'Мозговая волна', text: '' },
    '21-45': { name: 'Деньги', text: '' },
    '23-43': { name: 'Структурирование', text: '' },
    '24-61': { name: 'Осознанность', text: '' },
    '25-51': { name: 'Инициация', text: '' },
    '26-44': { name: 'Передача', text: '' },
    '27-50': { name: 'Сохранение', text: '' },
    '28-38': { name: 'Борьба', text: '' },
    '29-46': { name: 'Открытие', text: '' },
    '30-41': { name: 'Узнавание', text: '' },
    '32-54': { name: 'Трансформация', text: '' },
    '34-57': { name: 'Сила', text: '' },
    '35-36': { name: 'Преходящесть', text: '' },
    '37-40': { name: 'Сообщество', text: '' },
    '39-55': { name: 'Эмоциональность', text: '' },
    '42-53': { name: 'Созревание', text: '' },
    '47-64': { name: 'Абстракция', text: '' },
  },
  typesSection: { heading: 'Пять типов Human Design', lead: '' },
  faqHeading: 'Вопросы',
  faq: [
    { q: 'Зачем точное время рождения?', a: '' },
    { q: 'Моего города нет в списке — что делать?', a: '' },
    { q: 'Сохраняются ли мои данные?', a: '' },
    { q: 'Чем это отличается от разбора у Райи?', a: '' },
    { q: 'Почему другой сайт показал иначе?', a: '' },
  ],
  disclaimer: 'Human Design — инструмент самопознания, не прогноз и не замена врачу, юристу или финансисту.',
  credits: 'Города и часовые пояса —',
  licenses: 'Лицензии сторонних компонентов',
  message:
    'Райя, привет! Мои данные рождения: {date}, {time}, {city} ({offset}). Калькулятор показал: {type}, профиль {profile}, {authority}. Расскажи, что это значит для меня',
};

export default ru;
```

- [ ] **Step 4: Commit (красный) и падение**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/content/hd/types.ts src/content/hd/texts.server.ts src/content/hd/load.ts src/content/hd/texts.test.ts src/content/hd/texts/ru.ts
git commit -m "test(hd): правила текстов калькулятора и каркас русских текстов (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/content/hd/texts.test.ts'`
Expected: FAIL — «нет пустых строк и заготовок», «метатеги, вводный текст, вопросы», «описания короткие: 60–420 знаков»; остальные 9 тестов — PASS.

- [ ] **Step 5: Написать тексты**

По «Правилам текстов» и одобренным образцам (`docs/hd-calculator/samples-ru.md`): образцы переносятся с правками владельца, остальные описания пишутся тем же тоном. Вопросы FAQ можно уточнить по образцам; их 4–6. Кавычки внутри текста — «ёлочки».

- [ ] **Step 6: Тест проходит**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/content/hd/texts.test.ts'`
Expected: PASS, 12 тестов. Падение по длине — дописать или сократить текст, не менять пороги.

- [ ] **Step 7: Самопроверка смысла**

Пройтись по всем 83 описаниям: нет предсказаний и советов врача/юриста/финансиста; нет «ваш тип такой-то» — только общий смысл; названия совпадают с таблицей правил; нет Jovian Archive.

- [ ] **Step 8: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/content/hd/texts/ru.ts
git commit -m "feat(hd): тексты калькулятора по-русски — типы, авторитеты, профили, центры, каналы, FAQ

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 19: Адрес калькулятора, языки и sitemap

**Files:**
- Create: `src/lib/hdRoute.ts`, `scripts/hd-calc-languages.js`, `scripts/hd-calc-languages.d.ts`, `src/content/hd/availability.ts`
- Modify: `scripts/site-urls.mjs`, `scripts/site-urls.d.mts`, `vite.config.ts`, `vitest.config.ts`, `src/vite-env.d.ts`, `tests/i18n.spec.ts`
- Test: `src/lib/hdRoute.test.ts`, `scripts/hd-calc-languages.test.mjs`, `scripts/site-urls.test.mjs`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Адрес — `/calculators/human-design/`, русский без префикса, со слэшем на конце (nginx на адрес без слэша отвечает 301). Язык калькулятора выпущен, если выпущен сайт на этом языке И есть `src/content/hd/texts/<код>.ts` — как у страниц ассистентов. Отсюда же hreflang и строки sitemap: сейчас только `ru`.

- [ ] **Step 1: Написать тесты**

`src/lib/hdRoute.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { CALCULATORS_SEGMENT, HD_CALC_SLUG, hdCalcPath, parseHdCalcPath } from './hdRoute';
import { CALCULATORS_SEGMENT as SITE_SEGMENT, HD_CALC_SLUG as SITE_SLUG } from '../../scripts/site-urls.mjs';

describe('адрес калькулятора', () => {
  it('русский в корне, со слэшем и без, с index.html', () => {
    expect(parseHdCalcPath('/calculators/human-design/')).toEqual({ language: 'ru' });
    expect(parseHdCalcPath('/calculators/human-design')).toEqual({ language: 'ru' });
    expect(parseHdCalcPath('/calculators/human-design/index.html')).toEqual({ language: 'ru' });
  });

  it('другой язык — под префиксом', () => {
    expect(parseHdCalcPath('/en/calculators/human-design/')).toEqual({ language: 'en' });
  });

  it('чужие адреса — не наш', () => {
    expect(parseHdCalcPath('/')).toBeNull();
    expect(parseHdCalcPath('/calculators/')).toBeNull();
    expect(parseHdCalcPath('/calculators/numerology/')).toBeNull();
    expect(parseHdCalcPath('/calculators/human-design/extra')).toBeNull();
    expect(parseHdCalcPath('/xx/calculators/human-design/')).toBeNull();
    expect(parseHdCalcPath('/assistants/raya/')).toBeNull();
  });

  it('сборка адреса и разбор сходятся', () => {
    expect(hdCalcPath('ru')).toBe('/calculators/human-design/');
    expect(hdCalcPath('de')).toBe('/de/calculators/human-design/');
    expect(parseHdCalcPath(hdCalcPath('de'))).toEqual({ language: 'de' });
  });

  it('литералы те же, что у генератора sitemap', () => {
    expect(CALCULATORS_SEGMENT).toBe(SITE_SEGMENT);
    expect(HD_CALC_SLUG).toBe(SITE_SLUG);
  });
});
```

`scripts/hd-calc-languages.test.mjs`:

```js
import { describe, expect, it } from 'vitest';
import { hdCalcCodes } from './hd-calc-languages.js';
import { translatedCodes } from './translated-languages.js';

describe('языки калькулятора Human Design', () => {
  it('русский выпущен', () => {
    expect(hdCalcCodes()).toContain('ru');
  });

  it('только из выпущенных языков сайта', () => {
    const site = translatedCodes();
    for (const code of hdCalcCodes()) expect(site).toContain(code);
  });
});
```

`scripts/site-urls.test.mjs` — правка 1. Было:

```js
import { assistantUrlFor, assistantsCatalogUrlFor, sitemapUrls } from './site-urls.mjs';
```

Стало:

```js
import { assistantUrlFor, assistantsCatalogUrlFor, hdCalcUrlFor, sitemapUrls } from './site-urls.mjs';
```

`scripts/site-urls.test.mjs` — правка 2. Было:

```js
  it('без раздела ассистентов sitemap прежний', () => {
    expect(sitemapUrls(['ru'], 'ru')).toEqual(sitemapUrls(['ru'], 'ru', { codes: [], slugs: [] }));
  });
});
```

Стало:

```js
  it('без раздела ассистентов sitemap прежний', () => {
    expect(sitemapUrls(['ru'], 'ru')).toEqual(sitemapUrls(['ru'], 'ru', { codes: [], slugs: [] }));
  });
});

describe('адрес калькулятора Human Design', () => {
  it('со слэшем, русский в корне', () => {
    expect(hdCalcUrlFor('ru', 'ru')).toBe('https://linkeon.io/calculators/human-design/');
    expect(hdCalcUrlFor('en', 'ru')).toBe('https://linkeon.io/en/calculators/human-design/');
  });

  it('в sitemap — только на языках калькулятора', () => {
    const urls = sitemapUrls(['ru', 'en'], 'ru', { codes: [], slugs: [] }, { codes: ['ru'] });
    expect(urls).toContain('https://linkeon.io/calculators/human-design/');
    expect(urls.some((u) => u.includes('/en/calculators/'))).toBe(false);
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/hdRoute.test.ts scripts/hd-calc-languages.test.mjs scripts/site-urls.test.mjs
git commit -m "test(hd): адрес калькулятора, его языки и строка в sitemap (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/lib/hdRoute.test.ts scripts/hd-calc-languages.test.mjs scripts/site-urls.test.mjs'`
Expected: FAIL — нет `./hdRoute`, `./hd-calc-languages.js`, `hdCalcUrlFor is not a function`.

- [ ] **Step 3: Адрес**

`src/lib/hdRoute.ts`:

```ts
import { DEFAULT_LANGUAGE, SUPPORTED_CODES } from '../i18n/languages';
import { pathSegments } from './pathSegments';

/**
 * Адрес калькулятора Human Design: `/calculators/human-design/`, остальные
 * языки — под префиксом. Канонический адрес — со слэшем (nginx на адрес без
 * слэша отвечает 301). Разбор принимает и без слэша, и явный index.html.
 *
 * Те же литералы — в scripts/site-urls.mjs; тест следит, чтобы совпадали.
 */
export const CALCULATORS_SEGMENT = 'calculators';
export const HD_CALC_SLUG = 'human-design';

/** null — не наш адрес. Выпущен ли калькулятор на языке — решает вызывающий (hasHdCalculator). */
export function parseHdCalcPath(pathname: string): { language: string } | null {
  const parts = pathSegments(pathname);
  const prefixed = SUPPORTED_CODES.includes(parts[0]);
  const language = prefixed ? parts[0] : DEFAULT_LANGUAGE;
  const rest = prefixed ? parts.slice(1) : parts;
  return rest.length === 2 && rest[0] === CALCULATORS_SEGMENT && rest[1] === HD_CALC_SLUG ? { language } : null;
}

export const hdCalcPath = (language: string): string =>
  `${language === DEFAULT_LANGUAGE ? '' : `/${language}`}/${CALCULATORS_SEGMENT}/${HD_CALC_SLUG}/`;
```

- [ ] **Step 4: Языки калькулятора и `define`**

`scripts/hd-calc-languages.js`:

```js
/**
 * На каких языках выпускается калькулятор Human Design.
 *
 * Как у страниц ассистентов (assistant-page-languages.js): язык выпущен у
 * сайта (непустая локаль) И у калькулятора есть модуль текстов
 * src/content/hd/texts/<код>.ts. Тексты на язык доехали — язык включился сам.
 *
 * Читают: vite.config.ts и vitest.config.ts (define для браузера),
 * scripts/prerender.mjs и тесты Playwright.
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translatedCodes } from './translated-languages.js';

const textsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'hd', 'texts');

export function hdCalcCodes() {
  return translatedCodes().filter((code) => existsSync(join(textsDir, `${code}.ts`)));
}
```

`scripts/hd-calc-languages.d.ts`:

```ts
export declare function hdCalcCodes(): string[];
```

`src/content/hd/availability.ts`:

```ts
/**
 * Языки, на которых выпущен калькулятор. Считается на сборке
 * (scripts/hd-calc-languages.js) и подставляется через define: браузер в
 * каталог texts/ заглянуть не может.
 */
export const HD_CALC_CODES: string[] = __HD_CALC_LANGUAGES__;

export const hasHdCalculator = (language: string): boolean => HD_CALC_CODES.includes(language);
```

`vite.config.ts` — правка 1. Было:

```ts
import { assistantPageCodes } from './scripts/assistant-page-languages.js';
```

Стало:

```ts
import { assistantPageCodes } from './scripts/assistant-page-languages.js';
import { hdCalcCodes } from './scripts/hd-calc-languages.js';
```

`vite.config.ts` — правка 2. Было:

```ts
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
  },
```

Стало:

```ts
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
    // Языки калькулятора Human Design — так же, см. scripts/hd-calc-languages.js.
    __HD_CALC_LANGUAGES__: JSON.stringify(hdCalcCodes()),
  },
```

`vitest.config.ts` — правка 1. Было:

```ts
import { assistantPageCodes } from './scripts/assistant-page-languages.js';
```

Стало:

```ts
import { assistantPageCodes } from './scripts/assistant-page-languages.js';
import { hdCalcCodes } from './scripts/hd-calc-languages.js';
```

`vitest.config.ts` — правка 2. Было:

```ts
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
  },
```

Стало:

```ts
    __ASSISTANT_PAGE_LANGUAGES__: JSON.stringify(assistantPageCodes()),
    __HD_CALC_LANGUAGES__: JSON.stringify(hdCalcCodes()),
  },
```

`src/vite-env.d.ts` — правка 1. Было:

```ts
declare const __ASSISTANT_PAGE_LANGUAGES__: string[];
```

Стало:

```ts
declare const __ASSISTANT_PAGE_LANGUAGES__: string[];

/**
 * Коды языков, на которых выпущен калькулятор Human Design. Подставляется
 * через `define` — см. scripts/hd-calc-languages.js.
 */
declare const __HD_CALC_LANGUAGES__: string[];
```

- [ ] **Step 5: Адрес в sitemap**

`scripts/site-urls.mjs` — правка 1. Было:

```js
/** Раздел ассистентов. Тот же литерал — в src/lib/assistantRoute.ts. */
export const ASSISTANTS_SEGMENT = 'assistants';
```

Стало:

```js
/** Раздел ассистентов. Тот же литерал — в src/lib/assistantRoute.ts. */
export const ASSISTANTS_SEGMENT = 'assistants';

/** Калькуляторы. Те же литералы — в src/lib/hdRoute.ts. */
export const CALCULATORS_SEGMENT = 'calculators';
export const HD_CALC_SLUG = 'human-design';
```

`scripts/site-urls.mjs` — правка 2. Было:

```js
    : `${SITE}/${code}/${ASSISTANTS_SEGMENT}/${slug}/`;

/**
 * Полный список адресов в sitemap
```

Стало:

```js
    : `${SITE}/${code}/${ASSISTANTS_SEGMENT}/${slug}/`;

/** Калькулятор Human Design — со слэшем, как страницы ассистентов. */
export const hdCalcUrlFor = (code, defaultLanguage) =>
  code === defaultLanguage
    ? `${SITE}/${CALCULATORS_SEGMENT}/${HD_CALC_SLUG}/`
    : `${SITE}/${code}/${CALCULATORS_SEGMENT}/${HD_CALC_SLUG}/`;

/**
 * Полный список адресов в sitemap
```

`scripts/site-urls.mjs` — правка 3. Было:

```js
 * `assistants.codes` — языки, на которых выпущены страницы ассистентов
 * (scripts/assistant-page-languages.js), `assistants.slugs` — реестр.
 */
export function sitemapUrls(publishedCodes, defaultLanguage, assistants = { codes: [], slugs: [] }) {
```

Стало:

```js
 * `assistants.codes` — языки, на которых выпущены страницы ассистентов
 * (scripts/assistant-page-languages.js), `assistants.slugs` — реестр.
 * `hdCalc.codes` — языки калькулятора Human Design (scripts/hd-calc-languages.js).
 */
export function sitemapUrls(
  publishedCodes,
  defaultLanguage,
  assistants = { codes: [], slugs: [] },
  hdCalc = { codes: [] },
) {
```

`scripts/site-urls.mjs` — правка 4. Было:

```js
    ...assistants.codes.flatMap((c) =>
      assistants.slugs.map((slug) => assistantUrlFor(c, slug, defaultLanguage)),
    ),
  ];
```

Стало:

```js
    ...assistants.codes.flatMap((c) =>
      assistants.slugs.map((slug) => assistantUrlFor(c, slug, defaultLanguage)),
    ),
    ...hdCalc.codes.map((c) => hdCalcUrlFor(c, defaultLanguage)),
  ];
```

`scripts/site-urls.d.mts` — правка 1. Было:

```ts
export declare const ASSISTANTS_SEGMENT: string;
```

Стало:

```ts
export declare const ASSISTANTS_SEGMENT: string;
export declare const CALCULATORS_SEGMENT: string;
export declare const HD_CALC_SLUG: string;
```

`scripts/site-urls.d.mts` — правка 2. Было:

```ts
export declare function assistantUrlFor(code: string, slug: string, defaultLanguage: string): string;
export declare function sitemapUrls(
  publishedCodes: string[],
  defaultLanguage: string,
  assistants?: { codes: string[]; slugs: string[] },
): string[];
```

Стало:

```ts
export declare function assistantUrlFor(code: string, slug: string, defaultLanguage: string): string;
export declare function hdCalcUrlFor(code: string, defaultLanguage: string): string;
export declare function sitemapUrls(
  publishedCodes: string[],
  defaultLanguage: string,
  assistants?: { codes: string[]; slugs: string[] },
  hdCalc?: { codes: string[] },
): string[];
```

`tests/i18n.spec.ts` — правка 1. Было:

```ts
import { assistantPageCodes } from '../scripts/assistant-page-languages.js';
```

Стало:

```ts
import { assistantPageCodes } from '../scripts/assistant-page-languages.js';
import { hdCalcCodes } from '../scripts/hd-calc-languages.js';
```

`tests/i18n.spec.ts` — правка 2. Было:

```ts
    const expected = sitemapUrls(PUBLISHED, DEFAULT_LANGUAGE, {
      codes: assistantPageCodes(),
      slugs: ASSISTANT_SLUGS,
    });
```

Стало:

```ts
    const expected = sitemapUrls(
      PUBLISHED,
      DEFAULT_LANGUAGE,
      { codes: assistantPageCodes(), slugs: ASSISTANT_SLUGS },
      { codes: hdCalcCodes() },
    );
```

- [ ] **Step 6: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/lib/hdRoute.ts scripts/hd-calc-languages.js scripts/hd-calc-languages.d.ts src/content/hd/availability.ts vite.config.ts vitest.config.ts src/vite-env.d.ts scripts/site-urls.mjs scripts/site-urls.d.mts tests/i18n.spec.ts
git commit -m "feat(hd): адрес калькулятора, языки по наличию текстов, строка в sitemap

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Тесты и типы**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(./node_modules/.bin/vitest run src/lib/hdRoute.test.ts scripts/hd-calc-languages.test.mjs scripts/site-urls.test.mjs > /tmp/hd-t19.log 2>&1 && echo OK || echo FAILED); grep -E "Test Files|Tests " /tmp/hd-t19.log; pnpm typecheck > /tmp/hd-tsc.log 2>&1 && echo TSC_OK || echo TSC_FAILED'`
Expected: `OK` (hdRoute 5, языки 2, site-urls 5), `TSC_OK`.

---

### Task 20: Форма и поле города

**Files:**
- Create: `src/components/hd/CityInput.tsx`, `src/components/hd/HdForm.tsx`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Своего юнит-теста у формы нет: jsdom в лендинге не стоит, а интерактив проверяет e2e на собранной странице (Task 24: известное рождение, вопрос о переводе стрелок, пустая форма после перезагрузки, классы Вебвизора, загрузка базы городов по фокусу). Статическую разметку формы проверяет тест страницы (Task 21).

Поля формы — `ym-disable-keys`; строка «город, пояс на дату рождения», вопрос о стрелках и список подсказок — `ym-hide-content`. Цель `hd-calc-submit` уходит после удачного расчёта, только имя.

- [ ] **Step 1: Поле города**

`src/components/hd/CityInput.tsx`:

```tsx
import { useMemo, useState, type KeyboardEvent } from 'react';
import type { HdTexts } from '../../content/hd/types';
import { cityPlace, searchCities, type City, type CityIndex } from '../../lib/cities';
import { loadCityIndex } from '../../lib/cityLoader';

interface Props {
  texts: HdTexts;
  value: City | null;
  onChange: (city: City | null) => void;
}

const LIST_ID = 'hd-city-list';
const INPUT_CLASS =
  'ym-disable-keys mt-1 w-full rounded-lg border border-paper-400 bg-white px-3 py-2.5 text-paper-900 focus:outline-none focus:ring-2 focus:ring-brand-800';

/**
 * Поле города с подсказками (combobox по образцу APG). База городов грузится
 * при первом фокусе. Поле и список скрыты от Вебвизора: ym-disable-keys —
 * значение поля, ym-hide-content — текст подсказок.
 */
export default function CityInput({ texts, value, onChange }: Props) {
  const f = texts.form;
  const [query, setQuery] = useState(value?.name ?? '');
  const [index, setIndex] = useState<CityIndex | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const options = useMemo(() => (index ? searchCities(index, query) : []), [index, query]);
  const listShown = open && options.length > 0;

  const load = () => {
    if (index || status === 'loading') return;
    setStatus('loading');
    loadCityIndex()
      .then((loaded) => {
        setIndex(loaded);
        setStatus('idle');
      })
      .catch(() => setStatus('error'));
  };

  const choose = (city: City) => {
    onChange(city);
    setQuery(city.name);
    setOpen(false);
  };

  const onInput = (text: string) => {
    setQuery(text);
    setActive(0);
    setOpen(true);
    if (value) onChange(null);
    load();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!listShown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(options[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hint =
    status === 'loading'
      ? f.cityLoading
      : status === 'error'
        ? f.cityLoadError
        : open && index && query.trim().length >= 2 && options.length === 0
          ? f.cityNotFound
          : f.cityHint;

  return (
    <div className="relative">
      <label htmlFor="hd-city" className="block text-sm font-semibold text-paper-900">
        {f.city}
      </label>
      <input
        id="hd-city"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={listShown}
        aria-controls={LIST_ID}
        aria-activedescendant={listShown ? `hd-city-option-${active}` : undefined}
        aria-describedby="hd-city-hint"
        autoComplete="off"
        spellCheck={false}
        placeholder={f.cityPlaceholder}
        value={query}
        onFocus={load}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        className={INPUT_CLASS}
      />
      {listShown && (
        <ul
          id={LIST_ID}
          role="listbox"
          className="ym-hide-content absolute z-20 mt-1 w-full max-h-72 overflow-auto rounded-lg border border-paper-300 bg-white py-1 shadow-lg"
        >
          {options.map((city, i) => (
            <li
              key={`${i}-${city.name}`}
              id={`hd-city-option-${i}`}
              role="option"
              aria-selected={i === active}
              // mousedown, а не click: иначе поле теряет фокус и список
              // закрывается раньше, чем выбор дойдёт до обработчика.
              onMouseDown={(e) => {
                e.preventDefault();
                choose(city);
              }}
              className={`cursor-pointer px-3 py-2 ${i === active ? 'bg-brand-100' : ''}`}
            >
              <span className="font-medium text-paper-900">{city.name}</span>{' '}
              <span className="text-sm text-paper-600">{cityPlace(city)}</span>
            </li>
          ))}
        </ul>
      )}
      <p id="hd-city-hint" className="mt-1 text-xs text-paper-600">
        {hint}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Форма**

`src/components/hd/HdForm.tsx`:

```tsx
import { useMemo, useState, type FormEvent } from 'react';
import Button from '../ui/Button';
import CityInput from './CityInput';
import type { HdTexts } from '../../content/hd/types';
import type { City } from '../../lib/cities';
import { fillTemplate } from '../../lib/hdDraft';
import { reachGoal } from '../../lib/goal';
import { calculateChart, formatOffset, localToUtc, type Conversion, type HdChart } from '../../lib/human-design';

export interface HdResultData {
  chart: HdChart;
  /** Ввод человека — только для строки результата и черновика Райе, никуда не уходит. */
  date: string;
  time: string;
  city: City;
  offsetSeconds: number;
}

type DstChoice = 'before' | 'after';

/** null — данных не хватает; 'unknownZone' — браузер не знает пояс города. */
function convert(date: string, time: string, city: City | null): Conversion | 'unknownZone' | null {
  if (!date || !time || !city) return null;
  try {
    return localToUtc({ date, time }, city.zone);
  } catch {
    return 'unknownZone';
  }
}

const FIELD_CLASS =
  'ym-disable-keys mt-1 w-full rounded-lg border border-paper-400 bg-white px-3 py-2.5 text-paper-900 focus:outline-none focus:ring-2 focus:ring-brand-800';

/**
 * Форма: дата, время, город. Считает на устройстве — по кнопке, мгновенно.
 * Ничего не хранит: после перезагрузки форма пустая. Поля скрыты от
 * Вебвизора (ym-disable-keys), строки с данными — ym-hide-content.
 */
export default function HdForm({ texts, onResult }: { texts: HdTexts; onResult: (r: HdResultData) => void }) {
  const f = texts.form;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [choice, setChoice] = useState<DstChoice | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Перевод — заранее, до кнопки: показать пояс на дату рождения и, если
  // время попало в час перевода стрелок, спросить «до или после».
  const conversion = useMemo(() => convert(date, time, city), [date, time, city]);
  const transition = conversion && conversion !== 'unknownZone' && conversion.kind !== 'ok' ? conversion : null;
  const today = new Date().toISOString().slice(0, 10);

  // Любая правка ввода сбрасывает ответ на вопрос о переводе стрелок и ошибку.
  const edit = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setChoice(null);
    setError(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !time || !city) return setError(f.missing);
    if (date > today || date < '1900-01-01') return setError(f.futureDate);
    if (conversion === 'unknownZone') return setError(f.zoneUnknown);
    let result;
    try {
      result = calculateChart({ date, time, zone: city.zone, dst: choice ?? undefined });
    } catch {
      return setError(f.missing);
    }
    if (result.kind !== 'ok') return setError(f.dstChoose);
    setError(null);
    onResult({ chart: result.chart, date, time, city, offsetSeconds: result.offsetSeconds });
    // Только факт расчёта: ни даты, ни города в цели нет.
    reachGoal('hd-calc-submit');
  };

  return (
    <form onSubmit={submit} autoComplete="off" noValidate className="space-y-5" data-testid="hd-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="hd-date" className="block text-sm font-semibold text-paper-900">
            {f.date}
          </label>
          <input
            id="hd-date"
            type="date"
            min="1900-01-01"
            max={today}
            value={date}
            onChange={(e) => edit(setDate)(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div>
          <label htmlFor="hd-time" className="block text-sm font-semibold text-paper-900">
            {f.time}
          </label>
          <input
            id="hd-time"
            type="time"
            value={time}
            aria-describedby="hd-time-hint"
            onChange={(e) => edit(setTime)(e.target.value)}
            className={FIELD_CLASS}
          />
          <p id="hd-time-hint" className="mt-1 text-xs text-paper-600">
            {f.timeHint}
          </p>
        </div>
      </div>

      <CityInput texts={texts} value={city} onChange={edit(setCity)} />

      {city && conversion && conversion !== 'unknownZone' && conversion.kind === 'ok' && (
        <p className="ym-hide-content text-sm text-paper-800" data-testid="hd-zone-line">
          {fillTemplate(f.zoneLine, { city: city.name, offset: formatOffset(conversion.offsetSeconds) })}
        </p>
      )}

      {transition && (
        <fieldset className="ym-hide-content rounded-xl border border-amber-300 bg-amber-50 p-4" data-testid="hd-dst">
          <legend className="px-1 text-sm font-semibold text-paper-900">
            {fillTemplate(transition.kind === 'gap' ? f.dstGap : f.dstAmbiguous, { time })}
          </legend>
          {(['before', 'after'] as const).map((key) => (
            <label key={key} className="mt-2 flex items-center gap-2 text-sm text-paper-800">
              <input
                type="radio"
                name="hd-dst"
                value={key}
                checked={choice === key}
                onChange={() => {
                  setChoice(key);
                  setError(null);
                }}
              />
              {fillTemplate(key === 'before' ? f.dstBefore : f.dstAfter, {
                offset: formatOffset(transition[key].offsetSeconds),
              })}
            </label>
          ))}
        </fieldset>
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-rose-700">
          {error}
        </p>
      )}

      <Button type="submit" size="lg">
        {f.submit}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/components/hd/CityInput.tsx src/components/hd/HdForm.tsx
git commit -m "feat(hd): форма калькулятора — дата, время, город с поясом, вопрос о переводе стрелок

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 4: Типы и линтер**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land 'pnpm typecheck > /tmp/hd-tsc.log 2>&1 && echo TSC_OK || (echo TSC_FAILED; head -20 /tmp/hd-tsc.log); ./node_modules/.bin/eslint src/components/hd src/lib src/content/hd'`
Expected: `TSC_OK`, линтер без ошибок и предупреждений.

---

### Task 21: Результат, страница, подпись GeoNames и лицензии

**Files:**
- Create: `src/components/hd/Bodygraph.tsx`, `src/components/hd/HdResult.tsx`, `src/pages/HumanDesignPage.tsx`, `public/licenses.txt`
- Modify: `src/theme/paper.js` (комментарий-перечень)
- Test: `src/components/hd/Bodygraph.test.tsx`, `src/components/hd/HdResult.test.tsx`, `src/pages/HumanDesignPage.test.tsx`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Схема на странице — та же строка `renderBodygraphSvg`, что отдаст бэкенд второго этапа: обёртка только вставляет её. Кнопка «Разобрать с Райей» — `<a>` с чистым `href` (`assistant=14&utm_content=hd-calc`), черновик добавляется в момент клика. Страница без `LanguageBanner`: калькулятор пока только по-русски, а баннер предложил бы чужую главную.

- [ ] **Step 1: Написать тесты**

`src/components/hd/Bodygraph.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Bodygraph from './Bodygraph';
import { chartFromUtc, renderBodygraphSvg } from '../../lib/human-design';

const chart = chartFromUtc('1990-03-12T11:25:00Z');

describe('схема на странице', () => {
  it('вставляет ровно строку renderBodygraphSvg', () => {
    const html = renderToStaticMarkup(<Bodygraph chart={chart} label="Бодиграф" />);
    expect(html).toContain(renderBodygraphSvg(chart, { label: 'Бодиграф' }));
    expect(html).toContain('data-testid="hd-bodygraph"');
  });
});
```

`src/components/hd/HdResult.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HdResult from './HdResult';
import { chartFromUtc } from '../../lib/human-design';
import { HD_TEXTS } from '../../content/hd/texts.server';

const texts = HD_TEXTS.ru;
const chart = chartFromUtc('1990-03-12T11:25:00Z');
const html = renderToStaticMarkup(
  <HdResult
    texts={texts}
    result={{
      chart,
      date: '1990-03-12',
      time: '14:25',
      city: { name: 'Казань', region: 'Татарстан', country: 'Россия', zone: 'Europe/Moscow' },
      offsetSeconds: 3 * 3600,
    }}
  />,
);

describe('результат расчёта', () => {
  it('тип, профиль и их описания', () => {
    expect(html).toContain(texts.types[chart.type].name);
    expect(html).toContain(texts.types[chart.type].text);
    expect(html).toContain(`${chart.profile} · ${texts.profiles['5/2'].name}`);
    expect(html).toContain(texts.authorities[chart.authority].text);
    expect(html).toContain(texts.definitions[chart.definition].text);
  });

  it('строка с данными рождения скрыта от Вебвизора', () => {
    expect(html).toMatch(/class="ym-hide-content[^"]*" data-testid="hd-data-line">12\.03\.1990, 14:25, Казань \(UTC\+3\)</);
  });

  it('по строке на каждый определённый центр и канал', () => {
    for (const c of chart.definedCenters) expect(html).toContain(texts.centers[c].defined);
    for (const c of chart.openCenters) expect(html).toContain(texts.centers[c].open);
    expect(html).toContain(`7-31 · ${texts.channels['7-31'].name}`);
    expect(html).toContain(`12-22 · ${texts.channels['12-22'].name}`);
  });

  // Черновик собирается в момент клика: в разметке, которую читает Вебвизор,
  // данных рождения нет.
  it('кнопка к Райе: цель Метрики, ссылка без черновика', () => {
    const tag = html.match(/<a[^>]*data-cta="hd-calc-to-raya"[^>]*>/)?.[0] ?? '';
    expect(tag).toContain('href="https://my.linkeon.io/chat?assistant=14&amp;utm_content=hd-calc');
    expect(tag).not.toContain('#');
    expect(tag).not.toContain('1990');
    expect(html).toContain(texts.result.ctaNote);
  });
});
```

`src/pages/HumanDesignPage.test.tsx`:

```tsx
import { renderToStaticMarkup } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import HumanDesignPage from './HumanDesignPage';
import { createServerI18n } from '../i18n/server';
import { HD_TEXTS } from '../content/hd/texts.server';

const texts = HD_TEXTS.ru;
const html = renderToStaticMarkup(
  <I18nextProvider i18n={createServerI18n('ru')}>
    <HumanDesignPage texts={texts} language="ru" />
  </I18nextProvider>,
);
const pick = (re: RegExp) => html.match(re)?.[0] ?? '';

describe('страница калькулятора (пререндер)', () => {
  it('один H1 — из текстов', () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain(`>${texts.h1}</h1>`);
  });

  it('вводный текст, пять типов и вопросы — в разметке для поисковика', () => {
    for (const p of texts.intro) expect(html).toContain(p);
    const types = pick(/<section[^>]*data-testid="hd-types"[\s\S]*?<\/section>/);
    expect(types.match(/<li[\s>]/g)).toHaveLength(5);
    const faq = pick(/<section[^>]*data-testid="hd-faq"[\s\S]*?<\/section>/);
    expect(faq.match(/<details/g)).toHaveLength(texts.faq.length);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });

  it('крошки: Главная → Расчёт Human Design', () => {
    const crumbs = pick(/<nav aria-label="[^"]*"[\s\S]*?<\/nav>/);
    expect(crumbs).toContain('href="/"');
    expect(crumbs).toContain(`aria-current="page" class="font-medium text-paper-900">${texts.breadcrumb}<`);
  });

  it('поля формы скрыты от Вебвизора, результата до расчёта нет', () => {
    for (const id of ['hd-date', 'hd-time', 'hd-city']) {
      expect(pick(new RegExp(`<input[^>]*id="${id}"[^>]*>`))).toContain('ym-disable-keys');
    }
    expect(html).not.toContain('data-testid="hd-result"');
  });

  it('оговорка и подпись GeoNames', () => {
    expect(html).toContain(texts.disclaimer);
    expect(html).toContain('href="https://www.geonames.org/"');
    expect(html).toContain('href="https://creativecommons.org/licenses/by/4.0/"');
    expect(html).toContain('href="/licenses.txt"');
  });
});
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/components/hd/Bodygraph.test.tsx src/components/hd/HdResult.test.tsx src/pages/HumanDesignPage.test.tsx
git commit -m "test(hd): результат и страница калькулятора — схема, описания, кнопка без черновика в href (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/components/hd src/pages/HumanDesignPage.test.tsx'`
Expected: FAIL — нет `./Bodygraph`, `./HdResult`, `./HumanDesignPage`.

- [ ] **Step 3: Схема на странице**

`src/components/hd/Bodygraph.tsx`:

```tsx
import { useMemo } from 'react';
import { renderBodygraphSvg, type HdChart } from '../../lib/human-design';

/**
 * Схема на странице — та же строка SVG, что отдаст бэкенд второго этапа
 * (renderBodygraphSvg, без DOM). Обёртка только вставляет её и растягивает
 * по ширине колонки.
 */
export default function Bodygraph({ chart, label }: { chart: HdChart; label: string }) {
  const svg = useMemo(() => renderBodygraphSvg(chart, { label }), [chart, label]);
  return (
    <div
      data-testid="hd-bodygraph"
      className="mx-auto w-full max-w-[360px] [&>svg]:h-auto [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
```

- [ ] **Step 4: Результат**

`src/components/hd/HdResult.tsx`:

```tsx
import type { MouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Bodygraph from './Bodygraph';
import type { HdResultData } from './HdForm';
import type { HdTexts, ProfileKey } from '../../content/hd/types';
import { draftMessage, fillTemplate, rayaChatHref, rayaChatUrlWithDraft } from '../../lib/hdDraft';
import { formatOffset } from '../../lib/human-design';

function Row({ label, value, text, testId }: { label: string; value: string; text?: string; testId?: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-paper-600">{label}</dt>
      <dd className="mt-1">
        <span className="text-lg font-semibold text-paper-900" data-testid={testId}>
          {value}
        </span>
        {text && <p className="mt-1 text-paper-800 leading-relaxed">{text}</p>}
      </dd>
    </div>
  );
}

/**
 * Результат: схема, пять характеристик с абзацем смысла, центры и каналы по
 * строке, переход к Райе. Строка с данными рождения скрыта от Вебвизора.
 */
export default function HdResult({ texts, result }: { texts: HdTexts; result: HdResultData }) {
  const r = texts.result;
  const { chart } = result;
  const type = texts.types[chart.type];
  const authority = texts.authorities[chart.authority];
  const profile = texts.profiles[chart.profile as ProfileKey];
  const definition = texts.definitions[chart.definition];
  const offset = formatOffset(result.offsetSeconds);
  const [y, m, d] = result.date.split('-');
  const dataLine = fillTemplate(r.dataLine, { date: `${d}.${m}.${y}`, time: result.time, city: result.city.name, offset });
  const label = fillTemplate(r.bodygraphLabel, {
    type: type.name,
    centers: chart.definedCenters.map((c) => texts.centers[c].name).join(', ') || r.noDefinedCenters,
  });

  // Черновик Райе собирается только здесь, в момент клика: в href кнопки
  // данных рождения нет — его читают Вебвизор и отслеживание ссылок Метрики.
  const toRaya = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = rayaChatUrlWithDraft(
      draftMessage(texts.message, {
        date: result.date,
        time: result.time,
        city: result.city.name,
        offset,
        type: type.name,
        profile: chart.profile,
        authority: authority.inMessage,
      }),
    );
    if (e.metaKey || e.ctrlKey || e.shiftKey) window.open(url, '_blank', 'noopener');
    else window.location.assign(url);
  };

  return (
    <section
      id="hd-result"
      aria-labelledby="hd-result-heading"
      data-testid="hd-result"
      className="max-w-4xl mx-auto px-6 pb-12 scroll-mt-20"
    >
      <h2 id="hd-result-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
        {r.heading}
      </h2>
      <p className="ym-hide-content mt-2 text-sm text-paper-600" data-testid="hd-data-line">
        {dataLine}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,360px)_1fr]">
        <div>
          <Bodygraph chart={chart} label={label} />
          <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-paper-700">
            <span>
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-paper-900 align-middle mr-1" />
              {r.legendPersonality}
            </span>
            <span>
              <span aria-hidden="true" className="inline-block w-3 h-3 rounded-full bg-rose-700 align-middle mr-1" />
              {r.legendDesign}
            </span>
          </p>
        </div>
        <dl className="space-y-5">
          <Row label={r.typeLabel} value={type.name} text={type.text} testId="hd-type" />
          <Row label={r.strategyLabel} value={type.strategy} />
          <Row label={r.authorityLabel} value={authority.name} text={authority.text} testId="hd-authority" />
          <Row label={r.profileLabel} value={`${chart.profile} · ${profile.name}`} text={profile.text} testId="hd-profile" />
          <Row label={r.definitionLabel} value={definition.name} text={definition.text} testId="hd-definition" />
        </dl>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold text-paper-900">{r.definedCenters}</h3>
          {chart.definedCenters.length > 0 ? (
            <ul className="mt-3 space-y-2" data-testid="hd-defined-centers">
              {chart.definedCenters.map((c) => (
                <li key={c} className="text-paper-800 leading-relaxed">
                  <strong className="text-paper-900">{texts.centers[c].name}</strong> — {texts.centers[c].defined}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-paper-800">{r.noDefinedCenters}</p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-paper-900">{r.openCenters}</h3>
          <ul className="mt-3 space-y-2">
            {chart.openCenters.map((c) => (
              <li key={c} className="text-paper-800 leading-relaxed">
                <strong className="text-paper-900">{texts.centers[c].name}</strong> — {texts.centers[c].open}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-10 text-xl font-semibold text-paper-900">{r.channels}</h3>
      {chart.channels.length > 0 ? (
        <ul className="mt-3 space-y-2" data-testid="hd-channels">
          {chart.channels.map((key) => (
            <li key={key} className="text-paper-800 leading-relaxed">
              <strong className="text-paper-900">
                {key} · {texts.channels[key].name}
              </strong>{' '}
              — {texts.channels[key].text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-paper-800">{r.noChannels}</p>
      )}

      <div className="mt-10 rounded-2xl border border-paper-300 bg-paper-100 p-6">
        <Button href={rayaChatHref()} size="lg" dataCta="hd-calc-to-raya" onClick={toRaya}>
          {r.cta} <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </Button>
        <p className="mt-3 text-sm text-paper-700">{r.ctaNote}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Страница**

`src/pages/HumanDesignPage.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Breadcrumbs from '../components/assistants/Breadcrumbs';
import JsonLd from '../components/assistants/JsonLd';
import HdForm, { type HdResultData } from '../components/hd/HdForm';
import HdResult from '../components/hd/HdResult';
import { breadcrumbJsonLd, faqJsonLd, type Crumb } from '../content/assistants/jsonLd';
import { homePath } from '../lib/assistantRoute';
import { hdCalcPath } from '../lib/hdRoute';
import { HD_TYPES } from '../lib/human-design';
import type { HdTexts } from '../content/hd/types';

interface Props {
  texts: HdTexts;
  language: string;
}

/**
 * Калькулятор Human Design — вход из поиска. В пререндере: вводный текст,
 * пустая форма, пять типов и вопросы; форма и расчёт оживают в браузере.
 * FadeIn нет сознательно: в пререндере он отдаёт opacity-0.
 */
export default function HumanDesignPage({ texts, language }: Props) {
  const { t } = useTranslation();
  const home = homePath(language);
  const [result, setResult] = useState<HdResultData | null>(null);
  const crumbs: Crumb[] = [
    { name: t('assistantPages.home'), path: home },
    { name: texts.breadcrumb, path: hdCalcPath(language) },
  ];

  useEffect(() => {
    if (result) document.getElementById('hd-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [result]);

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
            <div className="mt-5 space-y-4 max-w-2xl">
              {texts.intro.map((p) => (
                <p key={p} className="text-lg text-paper-800 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="hd-form-heading" className="max-w-4xl mx-auto px-6 py-10 md:py-12">
          <h2 id="hd-form-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {texts.form.heading}
          </h2>
          <div className="mt-6 max-w-2xl">
            <HdForm texts={texts} onResult={setResult} />
          </div>
        </section>

        {result && <HdResult texts={texts} result={result} />}

        <section aria-labelledby="hd-types-heading" data-testid="hd-types" className="bg-paper-100 border-y border-paper-300">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <h2 id="hd-types-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
              {texts.typesSection.heading}
            </h2>
            <p className="mt-3 text-paper-800 leading-relaxed max-w-2xl">{texts.typesSection.lead}</p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {HD_TYPES.map((type) => (
                <li key={type} className="rounded-xl border border-paper-300 bg-paper-50 p-4">
                  <p className="font-semibold text-paper-900">{texts.types[type].name}</p>
                  <p className="mt-1 text-sm text-paper-700">{texts.types[type].strategy}</p>
                  <p className="mt-2 text-paper-800 leading-relaxed">{texts.types[type].text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="hd-faq-heading" data-testid="hd-faq" className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 id="hd-faq-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-paper-900">
            {texts.faqHeading}
          </h2>
          <div className="mt-4">
            {texts.faq.map((f) => (
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

        <section className="max-w-4xl mx-auto px-6 pb-12 space-y-2 text-xs text-paper-600">
          <p>{texts.disclaimer}</p>
          <p data-testid="hd-credits">
            {texts.credits}{' '}
            <a href="https://www.geonames.org/" className="underline hover:text-paper-900" rel="noopener noreferrer" target="_blank">
              GeoNames
            </a>
            ,{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="underline hover:text-paper-900"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC BY 4.0
            </a>
            .{' '}
            <a href="/licenses.txt" className="underline hover:text-paper-900">
              {texts.licenses}
            </a>
          </p>
        </section>
      </main>

      <Footer homeHref={home} />
    </div>
  );
}
```

- [ ] **Step 6: Лицензии**

`public/licenses.txt` — только ASCII: nginx отдаёт `.txt` как `text/plain` без кодировки, и кириллица в нём превратилась бы в кракозябры. Текст MIT — дословно из шапки `node_modules/astronomy-engine/esm/astronomy.js` (отдельного файла LICENSE в пакете нет):

```text
Third-party software and data used by the Human Design calculator
https://linkeon.io/calculators/human-design/

The chart is calculated in the browser with Astronomy Engine. The list of
cities and time zones comes from GeoNames. Their licenses follow.


1. Astronomy Engine 2.1.19
   https://github.com/cosinekitty/astronomy

MIT License

Copyright (c) 2019-2023 Don Cross <cosinekitty@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


2. GeoNames
   https://www.geonames.org/

Cities with a population of 15,000 or more (cities15000), their Russian names
(alternateNamesV2) and IANA time zones. Licensed under Creative Commons
Attribution 4.0 (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/

Changes: only the name, country, region, time zone and population are kept;
the file is built by scripts/build-hd-cities.py
(https://github.com/dvvolkovv/land_linkeon).
```

`src/theme/paper.js` — правка 1. Было:

```js
 * src/pages/AssistantsCatalogPage.tsx и их части из src/components/assistants/)
 * — это весь список, и он обязан совпадать с кодом.
```

Стало:

```js
 * src/pages/AssistantsCatalogPage.tsx и их части из src/components/assistants/),
 * а также на странице калькулятора Human Design (src/pages/HumanDesignPage.tsx
 * и src/components/hd/) — это весь список, и он обязан совпадать с кодом.
```

- [ ] **Step 7: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/components/hd/Bodygraph.tsx src/components/hd/HdResult.tsx src/pages/HumanDesignPage.tsx public/licenses.txt src/theme/paper.js
git commit -m "feat(hd): страница калькулятора — результат, схема, переход к Райе, подпись GeoNames и лицензии

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 8: Тесты проходят**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/components/hd src/pages/HumanDesignPage.test.tsx'`
Expected: PASS — Bodygraph 1, HdResult 4, страница 5.

---

### Task 22: Пререндер и вход в браузере

**Files:**
- Modify: `src/entry-server.tsx`, `src/main.tsx`, `scripts/prerender.mjs`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Пререндер: вводный текст, пустая форма, пять типов, FAQ с `FAQPage`, крошки `BreadcrumbList` до canonical, hreflang только по языкам калькулятора. Браузер: страница и тексты — динамическим импортом, отдельными чанками; входной бандл о калькуляторе знает только разбор адреса. Пререндер проверяет это по `dist/`: H1 калькулятора и начало таблицы ворот не должны найтись во входном бандле, но обязаны найтись в каком-то другом чанке (иначе проверка слепа).

- [ ] **Step 1: entry-server**

`src/entry-server.tsx` — правка 1. Было:

```tsx
import AssistantsCatalogPage from './pages/AssistantsCatalogPage';
import type { LegalType } from './components/layout/LegalModal';
```

Стало:

```tsx
import AssistantsCatalogPage from './pages/AssistantsCatalogPage';
import HumanDesignPage from './pages/HumanDesignPage';
import type { LegalType } from './components/layout/LegalModal';
```

`src/entry-server.tsx` — правка 2. Было:

```tsx
import { assistantBySlug } from './content/assistants/roster';
```

Стало:

```tsx
import { assistantBySlug } from './content/assistants/roster';
import { HD_TEXTS } from './content/hd/texts.server';
```

В конец `src/entry-server.tsx` дописать:

```tsx

/** Калькулятор Human Design для пререндера: пустая форма, без результата. */
export function renderHdCalculator(language: string): { html: string; title: string; description: string } {
  const texts = HD_TEXTS[language];
  if (!texts) throw new Error(`нет текстов калькулятора на ${language}`);
  const i18n = createServerI18n(language);
  const html = renderToString(
    <I18nextProvider i18n={i18n}>
      <HumanDesignPage texts={texts} language={language} />
    </I18nextProvider>,
  );
  return { html, title: texts.title, description: texts.description };
}
```

- [ ] **Step 2: main.tsx**

После строки

```tsx
import { hasAssistantPages } from './content/assistants/availability';
```

добавить

```tsx
import { parseHdCalcPath } from './lib/hdRoute';
import { hasHdCalculator } from './content/hd/availability';
import { loadHdTexts } from './content/hd/load';
```

Было:

```tsx
const assistantRoute =
  parsedAssistant && hasAssistantPages(parsedAssistant.language) ? parsedAssistant : null;
const root = createRoot(document.getElementById('root')!);
```

Стало:

```tsx
const assistantRoute =
  parsedAssistant && hasAssistantPages(parsedAssistant.language) ? parsedAssistant : null;
// Калькулятор на языке, где он не выпущен, — тоже SPA-фолбэк: рисуем главную.
const parsedHd = parseHdCalcPath(window.location.pathname);
const hdRoute = parsedHd && hasHdCalculator(parsedHd.language) ? parsedHd : null;
const root = createRoot(document.getElementById('root')!);
```

Было:

```tsx
    .catch((error) => console.error('страницы ассистентов: тексты не загрузились, остаётся пререндер', error));
} else {
```

Стало:

```tsx
    .catch((error) => console.error('страницы ассистентов: тексты не загрузились, остаётся пререндер', error));
} else if (hdRoute) {
  // Калькулятор — отдельные чанки: страница с кодом расчёта (astronomy-engine)
  // и тексты языка. Главная их не грузит; пререндер проверяет это по dist/.
  // Рисуем, когда пришли оба: createRoot не гидратирует, и ранний render
  // заменил бы пререндер пустым кадром.
  Promise.all([import('./pages/HumanDesignPage'), loadHdTexts(hdRoute.language)])
    .then(([{ default: HumanDesignPage }, texts]) => {
      if (!texts) return;
      root.render(
        <StrictMode>
          <HumanDesignPage texts={texts} language={hdRoute.language} />
        </StrictMode>,
      );
    })
    .catch((error) => console.error('калькулятор: чанк не загрузился, остаётся пререндер', error));
} else {
```

`HumanDesignPage` в `main.tsx` — **только** через `import()`: статический импорт затащил бы astronomy-engine и тексты во входной бандл (это ловит Step 4).

- [ ] **Step 3: prerender.mjs**

Правка 1. Было:

```js
 * Последним блоком скрипт проверяет, что тексты страниц ассистентов не
 * попали во входной бандл клиента: их место — в чанке своего языка.
```

Стало:

```js
 * Калькулятор Human Design (/calculators/human-design/) — по своему списку
 * языков, hdCalcCodes() из hd-calc-languages.js, тем же способом.
 *
 * Последним блоком скрипт проверяет, что тексты страниц ассистентов и код
 * калькулятора не попали во входной бандл клиента: их место — в своих чанках.
```

Правка 2. Было:

```js
import { assistantPageCodes } from './assistant-page-languages.js';
```

Стало:

```js
import { assistantPageCodes } from './assistant-page-languages.js';
import { hdCalcCodes } from './hd-calc-languages.js';
```

Правка 3. Было:

```js
  assistantUrlFor as siteAssistantUrlFor,
} from './site-urls.mjs';
```

Стало:

```js
  assistantUrlFor as siteAssistantUrlFor,
  hdCalcUrlFor as siteHdCalcUrlFor,
} from './site-urls.mjs';
```

Правка 4. Было:

```js
const ASSISTANT_CODES = assistantPageCodes();
```

Стало:

```js
const ASSISTANT_CODES = assistantPageCodes();

// Языки калькулятора Human Design — так же: выпущенные у сайта И с текстами.
const HD_CALC_CODES = hdCalcCodes();
```

Правка 5. Было:

```js
const assistantsDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'assistants') : join(dist, code, 'assistants');
```

Стало:

```js
const assistantsDirFor = (code) =>
  code === DEFAULT_LANGUAGE ? join(dist, 'assistants') : join(dist, code, 'assistants');
const hdCalcUrlFor = (code) => siteHdCalcUrlFor(code, DEFAULT_LANGUAGE);
const hdCalcDirFor = (code) =>
  code === DEFAULT_LANGUAGE
    ? join(dist, 'calculators', 'human-design')
    : join(dist, code, 'calculators', 'human-design');
```

Правка 6. Было:

```js
const { render, renderAssistant, renderAssistantsCatalog } = await import(join(root, 'dist-ssr', 'entry-server.js'));
```

Стало:

```js
const { render, renderAssistant, renderAssistantsCatalog, renderHdCalculator } = await import(
  join(root, 'dist-ssr', 'entry-server.js')
);
```

Правка 7. Было:

```js
  console.log(`✅ ${code}/assistants: каталог и ${ASSISTANTS.length} страниц`);
}
```

Стало:

```js
  console.log(`✅ ${code}/assistants: каталог и ${ASSISTANTS.length} страниц`);
}

// Калькулятор Human Design. Форма и расчёт работают только в браузере; в
// пререндере — вводный текст, пять типов и вопросы. Проверяется содержимое:
// FAQPage ровно о видимых вопросах, пять описаний типов, крошки до canonical.
for (const code of HD_CALC_CODES) {
  const where = `${code}/calculators/human-design`;
  const rendered = renderHdCalculator(code);
  if (!h1Of(rendered.html)) throw new Error(`${where}: нет <h1>`);
  let page = template;
  page = mustReplace(page, '<html lang="ru">', () => `<html lang="${code}">`, '<html lang>');
  page = localizeMeta(page, rendered.title, rendered.description);
  page = mustReplace(
    page,
    '</head>',
    () => `${headFor(code, rendered.title, rendered.description, null, hdCalcUrlFor, HD_CALC_CODES)}\n  </head>`,
    '</head>',
  );
  page = mustReplace(page, '<div id="root"></div>', () => `<div id="root">${rendered.html}</div>`, '<div id="root">');

  const ld = jsonLdOf(rendered.html, where);
  const faqSection = rendered.html.match(/<section[^>]*data-testid="hd-faq"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  if (faqSection === undefined) throw new Error(`${where}: нет блока вопросов — текст не отрендерился`);
  const shown = (faqSection.match(/<details[\s>]/g) ?? []).length;
  const listed = oneOfType(ld, 'FAQPage', where).mainEntity?.length ?? 0;
  if (listed !== shown) {
    throw new Error(`${where}: в FAQPage ${listed} вопросов, а на странице ${shown} <details>`);
  }
  if (shown < 4) throw new Error(`${where}: вопросов ${shown}, нужно не меньше 4`);
  const types = rendered.html.match(/<section[^>]*data-testid="hd-types"[^>]*>([\s\S]*?)<\/section>/)?.[1] ?? '';
  const typeCount = (types.match(/<li[\s>]/g) ?? []).length;
  if (typeCount !== 5) throw new Error(`${where}: описаний типов ${typeCount}, нужно 5`);
  checkBreadcrumbs(ld, page, 2, where);

  writePage(hdCalcDirFor(code), page);
  console.log(`✅ ${where}`);
}
```

Правка 8. Было:

```js
  ...sitemapUrls(PUBLISHED_CODES, DEFAULT_LANGUAGE, { codes: ASSISTANT_CODES, slugs: ASSISTANT_SLUGS })
    .map((loc) => `  <url><loc>${loc}</loc></url>`),
```

Стало:

```js
  ...sitemapUrls(
    PUBLISHED_CODES,
    DEFAULT_LANGUAGE,
    { codes: ASSISTANT_CODES, slugs: ASSISTANT_SLUGS },
    { codes: HD_CALC_CODES },
  ).map((loc) => `  <url><loc>${loc}</loc></url>`),
```

Правка 9. Было:

```js
// Тексты страниц ассистентов — во входном бандле? Им положено жить в чанке
// своего языка (src/content/assistants/load.ts): главная их не грузит вовсе.
```

Стало:

```js
// Тексты страниц ассистентов и код калькулятора — во входном бандле? Им
// положено жить в своих чанках (src/content/assistants/load.ts, динамический
// импорт HumanDesignPage в main.tsx): главная их не грузит вовсе.
```

Правка 10. Было:

```js
  const needles = ['roman', 'raya'].map((slug) => {
    const h1 = decodeHtml(h1Of(renderAssistant(DEFAULT_LANGUAGE, slug).html).replace(/<[^>]+>/g, ''))
      .replace(SPACES, ' ')
      .trim();
    if (h1.length < 15) throw new Error(`${DEFAULT_LANGUAGE}/assistants/${slug}: H1 «${h1}» слишком короткий для проверки бандла`);
    return { slug, h1 };
  });
```

Стало:

```js
  const textOf = (html) => decodeHtml(h1Of(html).replace(/<[^>]+>/g, '')).replace(SPACES, ' ').trim();
  const needles = ['roman', 'raya'].map((slug) => {
    const h1 = textOf(renderAssistant(DEFAULT_LANGUAGE, slug).html);
    if (h1.length < 15) throw new Error(`${DEFAULT_LANGUAGE}/assistants/${slug}: H1 «${h1}» слишком короткий для проверки бандла`);
    return { slug, h1 };
  });
  // Калькулятор: H1 — из чанка текстов, начало таблицы ворот (литерал массива
  // GATE_ORDER, минификатор пишет его без пробелов) — из чанка расчёта.
  if (HD_CALC_CODES.includes(DEFAULT_LANGUAGE)) {
    needles.push({ slug: 'калькулятор (H1)', h1: textOf(renderHdCalculator(DEFAULT_LANGUAGE).html) });
    needles.push({ slug: 'калькулятор (таблица ворот)', h1: '41,19,13,49,30,55,37,63,22,36' });
  }
```

Правка 11. Было:

```js
        throw new Error(
          `тексты страниц ассистентов попали во входной бандл — где-то статический импорт pages/<код>.ts ` +
            `(в ${file} нашёлся H1 страницы ${slug}: «${h1}»). Тексты грузятся только через ` +
            'src/content/assistants/load.ts (браузер) и packs.server.ts (пререндер).',
        );
```

Стало:

```js
        throw new Error(
          `во входной бандл попало то, что должно жить в своём чанке (в ${file} нашлось «${h1}» — ${slug}). ` +
            'Тексты ассистентов грузятся через src/content/assistants/load.ts, калькулятор — ' +
            'динамическим импортом HumanDesignPage в src/main.tsx; статический импорт их в клиентский код недопустим.',
        );
```

Правка 12. Было:

```js
  console.log(`✅ тексты ассистентов не во входном бандле (${entryFiles.join(', ')})`);
```

Стало:

```js
  console.log(`✅ тексты ассистентов и калькулятор не во входном бандле (${entryFiles.join(', ')})`);
```

- [ ] **Step 4: Commit и сборка**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/entry-server.tsx src/main.tsx scripts/prerender.mjs
git commit -m "feat(hd): пререндер калькулятора, ленивые чанки, проверка входного бандла

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(pnpm build > /tmp/hd-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); grep -E "calculators|входном|HumanDesignPage|cities" /tmp/hd-build.log; ls -l dist/assets/index-*.js; ls dist/calculators/human-design/'`

Expected: `BUILD_OK`; строки `✅ ru/calculators/human-design` и `✅ тексты ассистентов и калькулятор не во входном бандле (…)`; `HumanDesignPage-*.js` около 73 КБ; `cities.ru-*.json` около 1,55 МБ; входной `index-*.js` — не больше записанного в Task 1 Step 4 плюс 2 КБ (на прототипе +1,3 КБ); `index.html` в `dist/calculators/human-design/`.

- [ ] **Step 5: Проверка проверки**

Временно добавить в `src/main.tsx` строку `import './pages/HumanDesignPage';` после остальных импортов, закоммитить (`git commit -am "tmp: проверка проверки бандла"`), прогнать тот же Run. Expected: `BUILD_FAILED`, в логе — `во входной бандл попало то, что должно жить в своём чанке`. Затем `git reset --hard HEAD~1` и Run снова — `BUILD_OK`. Так видно, что проверка не слепая.

---

### Task 23: Ссылки на калькулятор: подвал и FAQ Райи

**Files:**
- Modify: `src/components/layout/Footer.tsx`, `src/i18n/locales/{ru,en,es,de,fr,zh,pt}.json`, `src/content/assistants/types.ts`, `src/pages/AssistantPage.tsx`, `src/content/assistants/pages/ru/raya.ts`
- Test: `src/components/layout/layout.test.tsx`, `src/pages/AssistantPage.test.tsx`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Пункт подвала — только на языках, где калькулятор выпущен (ссылка на невыпущенную версию вела бы в SPA-фолбэк). Подпись есть во всех семи локалях: `check-locales` требует одинаковых ключей, и когда калькулятор выйдет на новом языке, подпись уже будет. FAQ Райи противопоставляет её «калькулятору» — там встаёт ссылка на наш (текст ответа — тот, что одобрен на СТОП 1). В `FAQPage` уходит только текст ответа.

- [ ] **Step 1: Написать тесты**

`src/components/layout/layout.test.tsx` — было:

```tsx
  it('в колонке «Продукт» есть «Сайты и боты»', () => {
    expect(render(<Footer />)).toContain('href="#sites"');
    expect(render(<Footer homeHref="/" />)).toContain('href="/#sites"');
  });
});
```

Стало:

```tsx
  it('в колонке «Продукт» есть «Сайты и боты»', () => {
    expect(render(<Footer />)).toContain('href="#sites"');
    expect(render(<Footer homeHref="/" />)).toContain('href="/#sites"');
  });

  it('ru: пункт «Расчёт Human Design» ведёт на калькулятор', () => {
    expect(render(<Footer />)).toMatch(/href="\/calculators\/human-design\/"[^>]*>Расчёт Human Design<\/a>/);
  });

  // Калькулятор пока только на русском: ссылка на /en/calculators/… вела бы
  // в SPA-фолбэк.
  it('на языке без калькулятора пункта нет', () => {
    expect(render(<Footer />, 'en')).not.toContain('/calculators/');
  });
});
```

`src/pages/AssistantPage.test.tsx` — правка 1. Было:

```tsx
  it('«Работает в паре с» ведёт ровно на страницы соседей', () => {
```

Стало:

```tsx
  // FAQ Райи противопоставляет её калькулятору — там ссылка на наш.
  it('FAQ Райи ведёт на калькулятор Human Design', () => {
    const faq = pick(html, /<section[^>]*data-testid="assistant-faq"[\s\S]*?<\/section>/);
    expect(faq).toContain('href="/calculators/human-design/"');
  });

  it('«Работает в паре с» ведёт ровно на страницы соседей', () => {
```

- [ ] **Step 2: Commit (красный)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/components/layout/layout.test.tsx src/pages/AssistantPage.test.tsx
git commit -m "test(hd): на калькулятор ведут подвал и FAQ Райи (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land './node_modules/.bin/vitest run src/components/layout/layout.test.tsx src/pages/AssistantPage.test.tsx'`
Expected: FAIL — «ru: пункт «Расчёт Human Design» ведёт на калькулятор», «FAQ Райи ведёт на калькулятор Human Design».

- [ ] **Step 3: Подвал**

`src/components/layout/Footer.tsx` — правка 1. Было:

```tsx
import { assistantPath, assistantsCatalogPath } from '../../lib/assistantRoute';
```

Стало:

```tsx
import { assistantPath, assistantsCatalogPath } from '../../lib/assistantRoute';
import { hasHdCalculator } from '../../content/hd/availability';
import { hdCalcPath } from '../../lib/hdRoute';
```

`src/components/layout/Footer.tsx` — правка 2. Было:

```tsx
            { label: t('footer.product.sites'), href: section('#sites') },
            { label: t('footer.product.pricing'), href: section('#pricing') },
```

Стало:

```tsx
            { label: t('footer.product.sites'), href: section('#sites') },
            // Калькулятор есть не на всех языках: ссылка на невыпущенную
            // версию вела бы в SPA-фолбэк.
            ...(hasHdCalculator(language) ? [{ label: t('footer.product.hdCalc'), href: hdCalcPath(language) }] : []),
            { label: t('footer.product.pricing'), href: section('#pricing') },
```

- [ ] **Step 4: Подпись во всех локалях**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
node --input-type=module -e '
import { readFileSync, writeFileSync } from "node:fs";
const LABELS = {
  ru: "Расчёт Human Design", en: "Human Design calculator", es: "Calculadora de Human Design",
  de: "Human-Design-Rechner", fr: "Calcul du Human Design", zh: "人类图计算", pt: "Calculadora de Human Design",
};
for (const [code, label] of Object.entries(LABELS)) {
  const file = `src/i18n/locales/${code}.json`;
  const data = JSON.parse(readFileSync(file, "utf8"));
  const product = {};
  for (const [key, value] of Object.entries(data.footer.product)) {
    product[key] = value;
    if (key === "sites") product.hdCalc = label;
  }
  if (!product.hdCalc) throw new Error(`${code}: нет footer.product.sites`);
  data.footer.product = product;
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}'
git diff --stat src/i18n/locales
```

Expected: 7 файлов, по одной вставке (`hdCalc` после `sites`). Локали форматированы ровно как `JSON.stringify(…, null, 2)` — больше в диффе ничего нет.

- [ ] **Step 5: Ссылка из FAQ Райи**

`src/content/assistants/types.ts` — правка 1. Было:

```ts
  /** Вопросы и ответы: 4–5. */
  faq: { q: string; a: string }[];
```

Стало:

```ts
  /**
   * Вопросы и ответы: 4–5. `link` — ссылка после ответа (FAQ Райи ведёт на
   * калькулятор Human Design). В FAQPage уходит только текст ответа.
   */
  faq: { q: string; a: string; link?: { text: string; href: string } }[];
```

`src/pages/AssistantPage.tsx` — правка 1. Было:

```tsx
                <p className="pb-5 text-paper-800 leading-relaxed">{f.a}</p>
```

Стало:

```tsx
                <p className="pb-5 text-paper-800 leading-relaxed">
                  {f.a}
                  {f.link && (
                    <>
                      {' '}
                      <a href={f.link.href} className="font-semibold text-brand-800 underline hover:text-brand-900">
                        {f.link.text}
                      </a>
                    </>
                  )}
                </p>
```

`src/content/assistants/pages/ru/raya.ts` — правка 1. Было:

```ts
      a: 'Калькулятор строит карту и даёт общие описания. Райя разбирает именно вашу карту и предлагает эксперимент по вашей стратегии. А профиль у ассистентов Linkeon общий: рассказали одному — знают все.',
    },
```

Стало:

```ts
      a: 'Калькулятор строит карту и даёт общие описания — такой есть и у нас. Райя разбирает именно вашу карту и предлагает эксперимент по вашей стратегии. А профиль у ассистентов Linkeon общий: рассказали одному — знают все.',
      link: { text: 'Рассчитать бодиграф бесплатно', href: '/calculators/human-design/' },
    },
```

Текст ответа и подпись ссылки — как одобрил владелец на СТОП 1; если он поправил формулировку, взять её.

- [ ] **Step 6: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add src/components/layout/Footer.tsx src/i18n/locales src/content/assistants/types.ts src/pages/AssistantPage.tsx src/content/assistants/pages/ru/raya.ts
git commit -m "feat(hd): ссылки на калькулятор — пункт подвала и ответ в FAQ Райи

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

- [ ] **Step 7: Тесты и локали**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(./node_modules/.bin/vitest run src/components/layout/layout.test.tsx src/pages/AssistantPage.test.tsx src/content/assistants > /tmp/hd-t23.log 2>&1 && echo OK || echo FAILED); grep -E "Test Files|Tests " /tmp/hd-t23.log; node scripts/check-locales.mjs | tail -3'`
Expected: `OK`; `check-locales` — `✅` у всех шести языков.

---

### Task 24: Проверки в сыром HTML и в браузере

**Files:**
- Test: `tests/hd-calculator.spec.ts`

Все пути — от корня воркдерева `~/Downloads/land_linkeon/.worktrees/hd-calc`.

Сырой HTTP — так страницу видит краулер; код ответа ничего не доказывает (SPA-фолбэк отдаёт 200 на любой путь), поэтому проверяется содержимое. В браузере — известное рождение (первая карта ручной сверки: 1990-03-12, 14:25, Казань → Манифестор, 5/2), переход к Райе с черновиком во фрагменте и то, что в аналитику уходят только имена целей.

- [ ] **Step 1: Написать спеку**

`tests/hd-calculator.spec.ts`:

```ts
import { test, expect, request, type Page } from '@playwright/test';
import { DEFAULT_LANGUAGE } from '../src/i18n/languages.data.js';
import { hdCalcCodes } from '../scripts/hd-calc-languages.js';
import { hdCalcUrlFor } from '../scripts/site-urls.mjs';
import ru from '../src/content/hd/texts/ru';

const PATH = '/calculators/human-design/';
const count = (html: string, re: RegExp) => (html.match(re) ?? []).length;
const h1Of = (html: string) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';

// Сырой HTTP — так страницу видит краулер. Код ответа ничего не доказывает:
// SPA-фолбэк отдаёт 200 на любой путь, поэтому смотрим на содержимое.
test.describe('калькулятор Human Design в сыром HTML', () => {
  test('страница, метатеги, hreflang только по выпущенным языкам', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const html = await (await ctx.get(PATH)).text();
    const codes = hdCalcCodes();

    expect(html, 'отдана не страница калькулятора').toContain('<html lang="ru"');
    expect(h1Of(html)).toBe(ru.h1);
    expect(count(html, /rel="canonical"/g)).toBe(1);
    expect(html).toContain(`<link rel="canonical" href="${hdCalcUrlFor('ru', DEFAULT_LANGUAGE)}"`);
    expect(count(html, /hreflang="/g), 'hreflang: языки калькулятора + x-default').toBe(codes.length + 1);
    expect(html).toContain(`hreflang="x-default" href="${hdCalcUrlFor(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE)}"`);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html, 'описания пяти типов — в пререндере').toContain(ru.types.reflector.text);
    expect(html, 'подпись GeoNames').toContain('href="https://www.geonames.org/"');
    expect(html).toContain('href="/licenses.txt"');
    await ctx.dispose();
  });

  test('лицензии — текстом, с MIT astronomy-engine и GeoNames', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const res = await ctx.get('/licenses.txt');
    expect(res.headers()['content-type'] ?? '').toContain('text/plain');
    const text = await res.text();
    expect(text).toContain('Astronomy Engine');
    expect(text).toContain('MIT License');
    expect(text).toContain('GeoNames');
    expect(text).toContain('CC BY 4.0');
    await ctx.dispose();
  });

  test('на калькулятор ведут подвал главной и FAQ Райи', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const home = await (await ctx.get('/')).text();
    const footer = home.match(/<footer[\s\S]*<\/footer>/)?.[0] ?? '';
    expect(footer, 'в подвале главной нет ссылки на калькулятор').toContain(`href="${PATH}"`);
    const raya = await (await ctx.get('/assistants/raya/')).text();
    const faq = raya.match(/<section[^>]*data-testid="assistant-faq"[\s\S]*?<\/section>/)?.[0] ?? '';
    expect(faq, 'в FAQ Райи нет ссылки на калькулятор').toContain(`href="${PATH}"`);
    await ctx.dispose();
  });

  test('sitemap: калькулятор только на выпущенных языках', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const xml = await (await ctx.get('/sitemap.xml')).text();
    for (const code of hdCalcCodes()) expect(xml).toContain(`<loc>${hdCalcUrlFor(code, DEFAULT_LANGUAGE)}</loc>`);
    expect(count(xml, /\/calculators\/human-design\//g)).toBe(hdCalcCodes().length);
    await ctx.dispose();
  });
});

/** Пререндер не гидратируется: ждём, пока React перерисует H1 (см. assistants.spec.ts). */
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
  cityRequests: number;
}

/**
 * Чужие адреса — заглушки; Метрика и события пишутся в массивы, чтобы проверить,
 * что туда уходит только факт расчёта. my.linkeon.io/chat — пустая страница:
 * нужен лишь адрес, на который ушёл переход.
 */
async function stubNetwork(page: Page, baseURL: string): Promise<Captured> {
  const captured: Captured = { ym: [], events: [], cityRequests: 0 };
  const own = new URL(baseURL).origin;
  await page.exposeFunction('__captureYm', (args: unknown[]) => void captured.ym.push(args));
  await page.addInitScript(() => {
    const w = window as unknown as { ym: (...a: unknown[]) => void; __captureYm: (a: unknown[]) => void };
    w.ym = (...args: unknown[]) => w.__captureYm(args);
  });
  page.on('request', (r) => {
    if (/\/assets\/cities\.ru-[\w-]+\.json$/.test(new URL(r.url()).pathname)) captured.cityRequests += 1;
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

async function pickCity(page: Page, typed: string, name: string) {
  await page.locator('#hd-city').fill(typed);
  await page.getByRole('option', { name: new RegExp(`^${name}`) }).first().click();
}

test.describe('калькулятор в браузере', () => {
  test('известное рождение: тип и профиль, ссылка к Райе с черновиком, без утечек', async ({ page, baseURL }) => {
    const captured = await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);

    // База городов — только по фокусу на поле города.
    expect(captured.cityRequests, 'города загрузились без фокуса').toBe(0);
    await page.locator('#hd-date').fill('1990-03-12');
    await page.locator('#hd-time').fill('14:25');
    await page.locator('#hd-city').focus();
    await pickCity(page, 'Каза', 'Казань');
    expect(captured.cityRequests).toBe(1);
    await expect(page.getByTestId('hd-zone-line')).toHaveText('Казань, UTC+3 на дату рождения');

    // Поля и строки с данными спрятаны от Вебвизора.
    for (const id of ['#hd-date', '#hd-time', '#hd-city']) {
      await expect(page.locator(id)).toHaveClass(/\bym-disable-keys\b/);
    }
    await expect(page.getByTestId('hd-zone-line')).toHaveClass(/\bym-hide-content\b/);

    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByTestId('hd-type')).toHaveText(ru.types.manifestor.name);
    await expect(page.getByTestId('hd-profile')).toContainText('5/2');
    await expect(page.getByTestId('hd-data-line')).toHaveClass(/\bym-hide-content\b/);
    await expect(page.getByTestId('hd-data-line')).toHaveText('12.03.1990, 14:25, Казань (UTC+3)');

    const cta = page.locator('[data-cta="hd-calc-to-raya"]');
    const href = (await cta.getAttribute('href')) ?? '';
    expect(href, 'в href не должно быть черновика').not.toContain('#');
    expect(href).not.toContain('1990');
    expect(new URL(href).searchParams.get('assistant')).toBe('14');

    await cta.click();
    await page.waitForURL(/^https:\/\/my\.linkeon\.io\/chat/);
    const url = new URL(page.url());
    expect(url.searchParams.get('assistant')).toBe('14');
    expect(url.searchParams.get('utm_content')).toBe('hd-calc');
    expect(url.hash.startsWith('#draft=')).toBe(true);
    const draft = decodeURIComponent(url.hash.slice('#draft='.length));
    for (const part of ['12.03.1990', '14:25', 'Казань', 'UTC+3', ru.types.manifestor.name, '5/2', ru.authorities.emotional.inMessage]) {
      expect(draft).toContain(part);
    }

    // Метрика и наша таблица событий получили только имена целей.
    const goals = captured.ym.filter((a) => a[1] === 'reachGoal').map((a) => a[2]);
    expect(goals).toEqual(expect.arrayContaining(['hd-calc-submit', 'hd-calc-to-raya']));
    const sent = JSON.stringify(captured.ym) + captured.events.join('\n');
    for (const secret of ['1990', '14:25', 'Казань']) expect(sent, `«${secret}» ушло в аналитику`).not.toContain(secret);
  });

  test('час перевода стрелок: спрашиваем «до или после»', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);
    await page.locator('#hd-date').fill('2014-10-26');
    await page.locator('#hd-time').fill('01:30');
    await page.locator('#hd-city').focus();
    await pickCity(page, 'Москв', 'Москва');
    await expect(page.getByTestId('hd-dst')).toBeVisible();
    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByRole('alert')).toHaveText(ru.form.dstChoose);
    await expect(page.getByTestId('hd-result')).toHaveCount(0);
    await page.getByRole('radio').last().check();
    await page.getByRole('button', { name: ru.form.submit }).click();
    await expect(page.getByTestId('hd-result')).toBeVisible();
    await expect(page.getByTestId('hd-data-line')).toHaveText('26.10.2014, 01:30, Москва (UTC+3)');
  });

  test('после перезагрузки форма пустая', async ({ page, baseURL }) => {
    await stubNetwork(page, baseURL!);
    await page.goto(PATH);
    await clientRendered(page);
    await page.locator('#hd-date').fill('1990-03-12');
    await page.reload();
    await clientRendered(page);
    await expect(page.locator('#hd-date')).toHaveValue('');
  });
});
```

- [ ] **Step 2: Прогнать на ноде**

Run: `bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(CI=1 pnpm exec playwright test tests/hd-calculator.spec.ts tests/i18n.spec.ts tests/assistants.spec.ts --reporter=line > /tmp/hd-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED); tail -5 /tmp/hd-e2e.log'`
Expected: `E2E_OK` (на прототипе: 56 passed, 2 skipped). Красное — разбирать по логу и скриншотам в `test-results/`, не ослаблять проверку.

- [ ] **Step 3: Проверка проверки**

Временно убрать `ym-disable-keys` из `FIELD_CLASS` в `src/components/hd/HdForm.tsx`, закоммитить (`git commit -am "tmp: проверка e2e"`), прогнать Step 2: Expected — `E2E_FAILED` на «известное рождение…» (`toHaveClass`). Затем `git reset --hard HEAD~1`. Без этого зелёный прогон ничего не доказывает.

- [ ] **Step 4: Commit**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git add tests/hd-calculator.spec.ts
git commit -m "test(hd): калькулятор в сыром HTML и в браузере — расчёт, переход к Райе, приватность

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 25: Лендинг — проверка перед выкатом (СТОП 3)

- [ ] **Step 1: Ветка догнала main**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git fetch -q origin
git merge -q origin/main     # если main лендинга ушёл вперёд; конфликты — разобрать, тесты ниже их покажут
git log --oneline -3
```

- [ ] **Step 2: Всё зелёное на ноде**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(pnpm test:unit > /tmp/hd-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED); grep -E "Test Files|Tests |пограничных" /tmp/hd-unit.log; node scripts/check-locales.mjs | tail -2; (pnpm typecheck > /tmp/hd-tsc.log 2>&1 && echo TSC_OK || echo TSC_FAILED); (./node_modules/.bin/eslint . > /tmp/hd-lint.log 2>&1 && echo LINT_OK || echo LINT_FAILED); grep -c error /tmp/hd-lint.log; (CI=1 pnpm test > /tmp/hd-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED); tail -3 /tmp/hd-e2e.log; ls -l dist/assets/index-*.js'
```

Expected: `UNIT_OK` (в том числе `reference.test.ts` и `manual.test.ts`), строка `эталон: сверено 7800 активаций, пограничных расхождений N`; `check-locales` — ✅; `TSC_OK`; `LINT_OK` (два старых предупреждения в `scripts/capture*.ts` — не наши); `E2E_OK` — весь Playwright, не только новый файл; входной бандл — не больше точки отсчёта Task 1 + 2 КБ.

- [ ] **Step 3: Скриншоты для владельца**

Скрипт — в служебном каталоге на маке, на ноду едет на время прогона, в репозиторий не кладётся. `~/Downloads/land_linkeon/.superpowers/hd-calc/shots.mjs`:

```js
// Скриншоты калькулятора для владельца. Запуск на ноде из корня воркдерева
// лендинга при работающем `pnpm preview --port 4173`; в репозиторий не кладётся.
import { chromium } from '@playwright/test';

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [1280, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, locale: 'ru-RU', timezoneId: 'Europe/Moscow' });
  // Чужие адреса (Метрика, шрифты, трекер) — пустышки: снимки не зависят от сети.
  await page.route((url) => !url.href.startsWith(BASE), (route) => route.fulfill({ status: 200, body: '' }));

  await page.goto(`${BASE}/calculators/human-design/`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/hd-${w}-1-top.png` });
  await page.locator('#hd-date').fill('1990-03-12');
  await page.locator('#hd-time').fill('14:25');
  await page.locator('#hd-city').focus();
  await page.locator('#hd-city').fill('Каза');
  await page.getByRole('option').first().waitFor();
  await page.screenshot({ path: `/tmp/hd-${w}-2-city.png` });
  await page.getByRole('option').first().click();
  await page.getByRole('button', { name: 'Рассчитать' }).click();
  await page.getByTestId('hd-result').waitFor();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/hd-${w}-3-result.png`, fullPage: true });

  await page.goto(`${BASE}/calculators/human-design/`);
  await page.waitForTimeout(800);
  await page.locator('#hd-date').fill('2014-10-26');
  await page.locator('#hd-time').fill('01:30');
  await page.locator('#hd-city').focus();
  await page.locator('#hd-city').fill('Москв');
  await page.getByRole('option').first().click();
  await page.getByTestId('hd-dst').screenshot({ path: `/tmp/hd-${w}-4-dst.png` });

  await page.goto(`${BASE}/assistants/raya/`);
  await page.locator('[data-testid="assistant-faq"] details').nth(2).evaluate((d) => {
    d.open = true;
  });
  await page.locator('[data-testid="assistant-faq"]').screenshot({ path: `/tmp/hd-${w}-5-raya-faq.png` });
  await page.close();
}
await browser.close();
console.log('снимки: /tmp/hd-*.png');
```

```bash
scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h ~/Downloads/land_linkeon/.superpowers/hd-calc/shots.mjs dv@85.192.61.231:ci/wt/hd-calc/hd-shots.mjs
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'cd ~/ci/wt/hd-calc && source ~/.nvm/nvm.sh && rm -f /tmp/hd-*.png && pnpm build > /tmp/hd-build.log 2>&1 && (fuser -k 4173/tcp >/dev/null 2>&1 || true) && (pnpm preview --port 4173 > /tmp/hd-preview.log 2>&1 &) && sleep 3 && node hd-shots.mjs; fuser -k 4173/tcp >/dev/null 2>&1 || true; rm -f hd-shots.mjs; ls /tmp/hd-*.png'
mkdir -p ~/Downloads/land_linkeon/.superpowers/hd-calc/shots
scp -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h 'dv@85.192.61.231:/tmp/hd-*.png' ~/Downloads/land_linkeon/.superpowers/hd-calc/shots/
```

Expected: 10 файлов (по 5 на 390 и 1280 px): первый экран, подсказки города, результат целиком, вопрос о переводе стрелок, FAQ Райи со ссылкой. Посмотреть самому: на 390 px нет горизонтальной прокрутки, схема целиком в колонке, номера ворот читаются, кнопка «Разобрать с Райей» видна, подпись GeoNames и оговорка на месте.

- [ ] **Step 4: СТОП 3 — точность и взгляд владельца**

Показать владельцу одним сообщением:
- эталон: «сверено 7800 активаций, вне пограничных расхождений нет, пограничных N» — со списком из Step 2;
- 10 карт ручной сверки: какие калькуляторы, совпало ли всё (из `manual.test.ts`);
- папку скриншотов `~/Downloads/land_linkeon/.superpowers/hd-calc/shots/`;
- размеры: входной бандл (+1,3 КБ к `main`), чанк калькулятора (~73 КБ), база городов 1,55 МБ — и что nginx лендинга JS/JSON не сжимает (решение о `gzip_types` — за владельцем, вне плана).

Без «да» по условию точности лендинг не выкатывается (спека, «Точность — условие выката»). Правки по скриншотам — отдельными коммитами с повтором Step 2.

---

### Task 26: Лендинг — слияние и выкат

Требует выкаченного кабинета (Task 17): иначе `#draft=` останется в адресе старого кабинета и уйдёт в Метрику.

- [ ] **Step 1: Слить в main и проверить коммит слияния**

```bash
cd ~/Downloads/land_linkeon/.worktrees/hd-calc
git fetch -q origin
git checkout -q --detach origin/main
git merge --no-ff feat/hd-calculator -m "Merge feat/hd-calculator: калькулятор Human Design — расчёт в браузере, бодиграф, переход к Райе с черновиком

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-run.sh land '(pnpm test:unit > /tmp/hd-unit.log 2>&1 && echo UNIT_OK || echo UNIT_FAILED); (pnpm build > /tmp/hd-build.log 2>&1 && echo BUILD_OK || echo BUILD_FAILED); grep -E "calculators|входном" /tmp/hd-build.log; (CI=1 pnpm test > /tmp/hd-e2e.log 2>&1 && echo E2E_OK || echo E2E_FAILED)'
git push origin HEAD:main
git rev-parse HEAD
```

Expected: `UNIT_OK`, `BUILD_OK` с двумя строками ✅ про калькулятор, `E2E_OK`; push проходит; записать SHA. Сборка именно этого коммита на ноде — обязательна: `deploy.sh` собирает лендинг на проде через `| tail`, и упавшая сборка там не остановит выкат.

- [ ] **Step 2: СТОП 2 — согласие владельца на выкат лендинга**

Напомнить: кабинет уже на проде (Task 17), сборка коммита SHA зелёная, выкат — `LANDING_ONLY=1` с ноды, API не перезапускается, фазы test у лендинга нет.

- [ ] **Step 3: Выкат с ноды со свежих клонов**

```bash
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'pgrep -fa "^bash scripts/deploy.sh" || echo "чужих выкатов нет"'
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'set -e
NAME=hd-calc-landing-$(date +%m%d-%H%M)
mkdir -p ~/deploy-clones/$NAME ~/deploy-logs
git clone -q --branch main git@github.com:dvvolkovv/spirits_back.git ~/deploy-clones/$NAME/spirits_back
git clone -q --branch main git@github.com:dvvolkovv/land_linkeon.git ~/deploy-clones/$NAME/land_linkeon
git -C ~/deploy-clones/$NAME/land_linkeon log --oneline -1
source ~/.nvm/nvm.sh
cd ~/deploy-clones/$NAME/spirits_back
LANDING_ONLY=1 LOCAL_BACK_DIR=$PWD LOCAL_LAND_DIR=~/deploy-clones/$NAME/land_linkeon setsid -f bash -c "echo \$\$ > ~/deploy-logs/$NAME.pid; exec bash scripts/deploy.sh" > ~/deploy-logs/$NAME.log 2>&1 < /dev/null
echo $NAME'
```

Expected: `log --oneline -1` в клоне — SHA из Step 1 (иначе в `main` успели влить чужое — остановиться и повторить Step 1). Следить, как в Task 17 Step 4 (`tail -3 ~/deploy-logs/<NAME>.log`, `kill -0 $(cat ~/deploy-logs/<NAME>.pid)`). Итог в логе — `✓ SMOKE GREEN (landing)` и `ALL PHASES GREEN`.

- [ ] **Step 4: Проверка на проде по содержимому**

```bash
SITE=https://linkeon.io
curl -s $SITE/calculators/human-design/ | grep -o -E '<html lang="[a-z]+"|<h1[^>]*>[^<]{0,80}|rel="canonical" href="[^"]+"|hreflang="[a-z-]+"' | sort -u
curl -s -o /dev/null -w '%{http_code} → %{redirect_url}\n' $SITE/calculators/human-design
curl -s $SITE/sitemap.xml | grep -o '<loc>[^<]*calculators[^<]*</loc>'
curl -s $SITE/ | grep -o 'href="/calculators/human-design/"' | sort -u
curl -s $SITE/assistants/raya/ | grep -o 'href="/calculators/human-design/"' | sort -u
curl -s -o /dev/null -w '%{content_type}\n' $SITE/licenses.txt
ENTRY=$(curl -s $SITE/calculators/human-design/ | grep -o '/assets/index-[A-Za-z0-9_-]*\.js' | head -1)
CHUNK=$(curl -s $SITE$ENTRY | grep -o 'HumanDesignPage-[A-Za-z0-9_-]*\.js' | head -1)
CITIES=$(curl -s $SITE/assets/$CHUNK | grep -o '/assets/cities\.ru-[A-Za-z0-9_-]*\.json' | head -1)
echo "$ENTRY $CHUNK $CITIES"
curl -s -o /dev/null -D - -H 'Accept-Encoding: gzip' $SITE$CITIES | grep -i -E 'content-type|content-encoding|content-length'
```

`grep -c` по HTML не годится: пререндер — одна длинная строка. Expected: `<html lang="ru"`, H1 калькулятора, `canonical` — `https://linkeon.io/calculators/human-design/`, hreflang только `ru` и `x-default`; адрес без слэша — `301 → https://linkeon.io/calculators/human-design/`; в sitemap одна строка калькулятора; ссылка на калькулятор есть на главной (подвал) и на странице Райи; `licenses.txt` — `text/plain`; база городов — `application/json` (сжата ли — записать для владельца).

- [ ] **Step 5: Сквозная проверка в браузере**

В обычном браузере (или браузерными инструментами): открыть `https://linkeon.io/calculators/human-design/`, посчитать 12.03.1990, 14:25, Казань → «Манифестор», «5/2 · Еретик / Отшельник»; нажать «Разобрать с Райей» → открывается чат с Райей в кабинете (после входа, если не вошли), в поле ввода — черновик, отправки не было, в адресной строке нет `#draft`. Ничего не отправлять.

---

### Task 27: После выката

- [ ] **Step 1: СТОП — шаги владельца**

Передать владельцу:
- Метрика, счётчик лендинга 105902201: цели «JavaScript-событие» с идентификаторами `hd-calc-submit` (расчёт сделан) и `hd-calc-to-raya` (клик «Разобрать с Райей»).
- Яндекс.Вебмастер и Google Search Console: переобход `https://linkeon.io/calculators/human-design/` и `sitemap.xml`.
- Решение про сжатие на nginx лендинга (`gzip_types` для `application/javascript` и `application/json`): сейчас входной бандл уходит 529 КБ вместо ~152 КБ, база городов — 1,55 МБ вместо ~586 КБ. Правка прод-nginx — отдельной задачей, не этим планом.

- [ ] **Step 2: Как смотреть результат**

Дописать в спеку (раздел «Аналитика») готовые запросы — успех по спеке: доля расчётов, дошедших до клика, и регистрации по метке. Выполнить их один раз сразу после выката (подключение к базе — вне репозитория): они должны вернуть хотя бы собственные проверочные расчёты.

```sql
-- расчёты и переходы к Райе по дням, 30 дней
select date_trunc('day', ts) as day,
       count(*) filter (where props->>'cta' = 'hd-calc-submit') as calculations,
       count(*) filter (where props->>'cta' = 'hd-calc-to-raya') as to_raya
from events
where name = 'landing_cta_click'
  and props->>'path' like '%/calculators/human-design/%'
  and ts > now() - interval '30 days'
group by 1 order by 1;

-- регистрации по метке калькулятора; тестовые аккаунты исключить тем же
-- списком, что AdminService.excludeTest в бэкенде
select count(*)
from ai_profiles_consolidated
where signup_campaign like '%hd-calc%';
```

- [ ] **Step 3: Заметки в память**

Новая заметка: калькулятор Human Design на linkeon.io — модуль `land_linkeon/src/lib/human-design/` (чистый, с публичным интерфейсом для второго этапа), эталон пересобирается `scripts/hd-reference.py` на ноде (uv + pyswisseph во временном каталоге), база городов — `scripts/build-hd-cities.py`; узел — оскулирующий, не Миус (до 16′ расхождения); черновик в кабинете — `pending_draft`, скрипт в `index.html` до Метрики. Обновить заметку о лендинге (`project_linkeon_landing_repo`) ссылкой на неё.

- [ ] **Step 4: Убрать воркдеревья и временное**

```bash
rm ~/Downloads/land_linkeon/.worktrees/hd-calc/node_modules ~/Downloads/spirits_front/.worktrees/hd-draft/node_modules
git -C ~/Downloads/land_linkeon worktree remove .worktrees/hd-calc
git -C ~/Downloads/spirits_front worktree remove .worktrees/hd-draft
bash ~/Downloads/land_linkeon/.superpowers/hd-calc/node-ssh.sh 'git -C ~/ci/land_linkeon worktree remove --force ~/ci/wt/hd-calc; git -C ~/ci/spirits_front worktree remove --force ~/ci/wt/hd-draft; git -C ~/ci/land_linkeon branch -D tmp/hd-calc; git -C ~/ci/spirits_front branch -D tmp/hd-draft; rm -rf ~/ci/wt/hd-ref ~/ci/wt/hd-geonames ~/deploy-clones/hd-draft-* ~/deploy-clones/hd-calc-landing-*'
```

Ветки `feat/hd-calculator` и `feat/hd-draft` в локальных репозиториях оставить до «ок» владельца после выката.
