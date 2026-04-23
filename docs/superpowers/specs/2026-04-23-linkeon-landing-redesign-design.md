# Linkeon.io Landing Redesign — Design Spec

**Date:** 2026-04-23
**Scope:** Полный редизайн лендинга `linkeon.io` под B2B-позиционирование с учётом новых возможностей `my.linkeon.io` (AI-команда ассистентов, Дозвон, единый профиль, генерация изображений и видео).
**Repo:** https://github.com/dvvolkovv/land_linkeon
**Live:** https://linkeon.io — `/home/dvolkov/land_linkeon/dist/` на `212.113.106.202` (Nginx).

---

## 1. Цель и позиционирование

### Главный посыл

Linkeon — нейросеть для роста бизнеса: AI-команда ассистентов (маркетолог, юрист, бухгалтер, HR, коуч + универсальный Роман) + AI-обзвон клиентов + единый профиль, который помнят все инструменты.

### Целевая аудитория

- **Малый бизнес без штата** — один человек = вся компания, нужен «отдел» на аутсорсе.
- **Фрилансеры и соло-эксперты** — делают проекты, нужен помощник для договоров, соцсетей, клиентов.
- **Маркетинговые агентства** — много клиентов, мало людей, критична скорость контента и обзвон лидов.

### Success criteria

- Лендинг даёт посетителю понять за 10 секунд: что это, кому, почему стоит попробовать.
- Путь «Hero → регистрация» — один клик на CTA → `my.linkeon.io` (SMS-регистрация).
- Производительность: Lighthouse ≥90 (Performance, SEO, Accessibility) на Mobile.
- Бандл JS ≤150 KB gzip, общий вес страницы ≤1.5 MB (включая видео).

### Out of scope

- B2B-формы «запросить демо» / enterprise-sales flow — пока self-serve.
- Логобар клиентов и живые кейсы — клиентов пока нельзя публично показывать.
- API-документация, dev-сайт.
- Блог, статьи, сложные SEO-posadki.

---

## 2. Подход к реализации

**Полный rewrite** — стираем `src/components/*` и `src/App.tsx` (About, Advantages, Assistants, Benefits, CTA, Examples, FAQ, Footer, ForYou, Hero, HowItWorks, ThreeServices, ValueConnection, ValueGraph), пишем с нуля под B2B-позиционирование и минимализм Linear/Vercel.

Сохраняем только:
- `index.html` (обновляя meta и OG-теги, но оставляя Yandex.Metrika counter `105902201`).
- `tailwind.config.js` (перепишем палитру).
- `package.json` (оставляем Vite + React + TS + Tailwind + lucide-react; **удаляем** `@supabase/supabase-js`, **добавляем** `i18next` + `react-i18next` + `i18next-browser-languagedetector`).
- `tsconfig*.json`, `postcss.config.js`, `vite.config.ts`, `eslint.config.js` — без изменений.

Canvas-граф ценностей из старого `ValueGraph.tsx` переписывается с нуля (концепция сохраняется, код — нет: новая палитра, новый API, новый размер, новые анимации).

---

## 3. Визуальная система

### Палитра

| Назначение | Цвет | Tailwind |
|---|---|---|
| Фон страницы | `#f8fafc` | `slate-50` |
| Фон карточек | `#ffffff` | `white` |
| Заголовки | `#0f172a` | `slate-900` |
| Основной текст | `#475569` | `slate-600` |
| Микро-копи | `#94a3b8` | `slate-400` |
| Границы | `#e2e8f0` | `slate-200` |
| Акцент primary | `#4f46e5` → hover `#4338ca` | `indigo-600` / `indigo-700` |
| Акцент secondary | `#10b981` | `emerald-500` |
| CTA-градиент (финальный блок) | `from-indigo-600 to-indigo-500` | — |

Dark mode — не реализуется в этой итерации.

### Типографика

- **Inter** (подключаем через `<link>` в `index.html`) — весь текст.
- **JetBrains Mono** (подключаем через `<link>`) — моноширинный для пример-промпта в секции Дозвона.
- Display-заголовки — Inter с `font-semibold`, `tracking-tight`.
- Размеры:
  - H1: `text-5xl md:text-7xl` (48px → 72px)
  - H2: `text-4xl md:text-5xl` (36px → 48px)
  - H3: `text-xl md:text-2xl` (20px → 24px)
  - Body: `text-base md:text-lg` (16px → 18px)
  - Small/trust: `text-sm` (14px)

### Сетка и ритм

- Container: `max-w-6xl mx-auto px-6`.
- Между секциями: `py-16 md:py-24`.
- Radius: карточки `rounded-2xl`, кнопки `rounded-lg`, pill-бейджи `rounded-full`.
- Тени: `shadow-lg` только на primary CTA и popped-pricing-card; остальное — без теней, работаем границами.

### Базовые UI-компоненты

**`Section`** (`src/components/ui/Section.tsx`)
Обёртка: `<section>` с `py-16 md:py-24`, внутри — `max-w-6xl mx-auto px-6`. Принимает `id` для anchor-ссылок из Header.

**`Eyebrow`** (`src/components/ui/Eyebrow.tsx`)
Маленький uppercase label: `text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-4`. Пример: `AI-КОМАНДА`.

**`Button`** (`src/components/ui/Button.tsx`)
Variants: `primary` (solid indigo-600 + white + shadow-lg), `outline` (border slate-300 + slate-900 text), `ghost` (transparent + slate-900 text).
Sizes: `md` (py-3 px-5), `lg` (py-4 px-6).
Hover: `translate-y-[-2px]` + `shadow-xl` на primary.

**`Card`** (`src/components/ui/Card.tsx`)
`bg-white border border-slate-200 rounded-2xl p-6 transition-colors hover:border-slate-300`.

**`ScreenshotFrame`** (`src/components/ui/ScreenshotFrame.tsx`)
Обёртка для скриншотов/видео в стиле «окно браузера»:
- Верхняя плашка: 3 цветных точки (red/yellow/green, 12px) + центрированный URL `my.linkeon.io/chat` в моно-шрифте (slate-500, 13px).
- Внутри: `aspect-[16/10]` контейнер с переданным `<img>` или `<video>`.
- Обводка: `border border-slate-200`, `rounded-xl`, `shadow-2xl shadow-slate-900/5`.

**`GradientOrb`** (`src/components/ui/GradientOrb.tsx`)
Декоративный blurred div:
```tsx
<div className="absolute -z-10 blur-3xl opacity-40 rounded-full
                bg-gradient-to-br from-indigo-400 to-pink-300"
     style={{ width, height }} />
```
Используется в Hero и Final CTA.

**`FadeIn`** (`src/components/ui/FadeIn.tsx`)
Обёртка с нативным `IntersectionObserver`. Применяет `opacity-0 translate-y-4` → `opacity-100 translate-y-0` через `transition-all duration-500 ease-out` когда элемент попадает в viewport (threshold 0.1, rootMargin '-50px'). Проп `delay` добавляет `transition-delay` в мс.

### Хук `useInView` (`src/lib/useInView.ts`)
Возвращает `[ref, isInView]`. Одноразовый триггер (`unobserve` после первого true). Используется внутри `FadeIn` и для автовоспроизведения loop-видео.

### Анимации

- Fade-in-on-scroll на каждой секции через `FadeIn` (длительность 500ms, stagger между параллельными элементами 100ms).
- Hover-lift на primary CTA (см. Button).
- Typewriter-эффект в Hero H1 (ниже).
- Мягкая pulse-анимация на ключевых маркерах (emerald dots: `animate-pulse`).
- Loop-видео: `autoplay muted playsinline loop`, пауза через `ref.pause()` когда `!isInView`.
- Никакого parallax, никаких Lottie.

---

## 4. Структура страницы

### 4.1. Header (sticky)

**Файл:** `src/components/layout/Header.tsx`

- Позиционирование: `fixed top-0 inset-x-0 z-50`.
- Фон: `bg-white/80 backdrop-blur-md` + `border-b border-slate-200` когда скролл >20px (подписка на `scroll` через `useEffect`), иначе transparent без границы.
- Container: `max-w-6xl mx-auto px-6 h-16 flex items-center justify-between`.
- Слева: `<Logo />` — текстовый `LINKEON` в slate-900, `font-semibold tracking-tight` с маленькой точкой-индикатором emerald-500 справа.
- Центр (скрыт на моб): ссылки — `Возможности` (`#features`), `Как работает` (`#how`), `Цены` (`#pricing`), `FAQ` (`#faq`). `text-sm slate-600 hover:slate-900`.
- Справа: `<LangSwitcher />` (RU/EN toggle) + `<Button variant="ghost" size="md">Войти</Button>` + `<Button variant="primary" size="md">Начать бесплатно</Button>`.
- Моб: burger-иконка, drawer из правого края, те же ссылки + CTA.

### 4.2. Секция Hero

**Файл:** `src/components/sections/Hero.tsx`

- `min-h-screen`, `grid lg:grid-cols-2 gap-12 items-center`, `pt-24` (компенсация sticky header).
- **Левая колонка:**
  - `Eyebrow`: `AI ДЛЯ РОСТА БИЗНЕСА`
  - H1: двустрочный, «Твоя AI-команда,\n[**обзвон клиентов**] и единый профиль».
  - Часть в `[ ]` — typewriter-анимация через хук `useTypewriter(phrases[], msPerChar)`: меняется по циклу каждые 3500ms между `обзвон клиентов` → `создание контента` → `консультации юриста` → `маркетинговый план`. Цвет выделенной фразы — indigo-600 + underline wavy (или `border-b-2 border-indigo-600`).
  - Sub-H1 (slate-600, max-w-xl): «Шесть AI-ассистентов (маркетолог, юрист, бухгалтер, HR, коуч и Роман), которые звонят клиентам, пишут контент и растут вместе с твоим бизнесом. Один профиль на всё.»
  - CTA-группа: primary `Начать бесплатно` + outline `Войти`. Оба → `https://my.linkeon.io`.
  - Trust-строка (slate-500, 14px): `25 000 токенов в подарок · без карты · 2 минуты на регистрацию`.
- **Правая колонка:**
  - `GradientOrb` позади (400×400px, indigo→pink, opacity-40).
  - `ScreenshotFrame` с URL `my.linkeon.io/chat` и loop-видео внутри (`<video>` autoplay muted loop playsinline, `aspect-[16/10]`).
  - Overlap-карточка снизу-справа, `translate-y-8 translate-x-[-12px]`: белая `Card` 240×72px, иконка `Phone` (lucide, indigo-600, 20px) + текст `Дозвон активен` / `3/10 звонков`. С лёгким pulse-индикатором (emerald dot).
- **Мобильный:** `grid-cols-1`, текст сверху, визуал снизу, H1 `text-5xl`.

### 4.3. Секция Problem

**Файл:** `src/components/sections/Problem.tsx`

- `Eyebrow`: `ПРОБЛЕМА`.
- H2: «На рост бизнеса не хватает часов в сутках».
- 3 колонки `grid md:grid-cols-3 gap-12` (моб — стек). Каждая колонка без карточки: большая иконка 48px в slate-100 квадрате `p-3 rounded-xl`, H3 (20px slate-900), параграф (15px slate-600).

| Иконка (lucide) | Заголовок | Текст |
|---|---|---|
| `Clock` | Рутина съедает фокус | Ответить клиенту, написать пост, составить договор, позвонить в 20 компаний — и ты уже не растёшь, а тушишь |
| `Users` | Нанимать — дорого и долго | Маркетолог, юрист, HR — это 300–500 тыс. ₽/мес фонда на ранней стадии |
| `Layers` | Инструментов 10, контекст один | ChatGPT, Notion, CRM, почта — каждый знает о тебе кусочек, а не целое |

- Под колонками, центрированный в `max-w-2xl mx-auto`, slate-600, italic-нет: «Linkeon собирает это в один продукт: AI-ассистенты выполняют задачи, а твой профиль — контекст — живёт в одном месте».

### 4.4. Секция «AI-команда»

**Файл:** `src/components/sections/Assistants.tsx`

Формат `SplitSection`: slate-grid текст слева, визуал справа (на десктопе). Реализуется как `grid lg:grid-cols-2 gap-12`.

- `Eyebrow`: `AI-КОМАНДА`.
- H2: «Шесть ассистентов в одном окне».
- Описание (slate-600, max-w-xl): «Каждый — эксперт в своей роли. Помнят твой бизнес, знают друг о друге, отвечают голосом или текстом.»
- Сетка ассистентов `grid grid-cols-2 gap-3` (6 мини-карточек):

| Имя | Роль | Иконка (lucide) |
|---|---|---|
| Роман | Универсальный агент, делает всё | `Bot` |
| Маркетолог | Планы запусков, контент, аналитика | `Megaphone` |
| Юрист | Договоры, чек-листы, консультации | `Scale` |
| Бухгалтер | Налоги, расчёты, выписки 1С | `Calculator` |
| HR | Вакансии, интервью-вопросы, оценка | `UserCheck` |
| Коуч | Стратегия, приоритеты, психология | `Compass` |

Карточка: `p-3 rounded-xl border border-slate-200 bg-white`, иконка 28px в indigo-50 квадратике, имя — `font-semibold text-slate-900 text-sm`, роль — `text-xs text-slate-500 mt-1`.

- Mini-CTA: `→ Посмотреть всех ассистентов` (indigo-600 text link) → `my.linkeon.io`.
- **Визуал справа:** `ScreenshotFrame` с URL `my.linkeon.io/chat` — скриншот списка ассистентов (из `AssistantSelection.tsx` в `my.linkeon.io`). Под ним loop-видео (5 сек) смены ассистента и отправки сообщения.

### 4.5. Секция «Дозвон»

**Файл:** `src/components/sections/Dozvon.tsx`

Формат `SplitSection`, **порядок обратный** (визуал слева, текст справа) для чередования.

- `Eyebrow`: `ДОЗВОН · уникально`.
- H2: «AI звонит клиентам. Сам.».
- Описание (slate-600, max-w-xl): «Опиши задачу текстом — AI найдёт контакты, позвонит, проведёт разговор по-человечески, запишет и пришлёт резюме. Ты получаешь только результат.»
- Bullets (иконка `CheckCircle2` emerald-500 20px + slate-700 15px), 4 шт:
  - Находит компании и телефоны по задаче
  - Звонит голосом (клонированный или стандартный)
  - Ведёт переговоры, отвечает на возражения
  - Записывает MP3 и присылает резюме в чат
- **Mini-use-case-блок** — карточка `rounded-xl bg-slate-50 border border-slate-200 p-5`:
  - Префикс `→` моно-шрифтом slate-400.
  - Текст промпта в JetBrains Mono, 14px, slate-700: «найди 10 кузовных сервисов BMW в Москве и узнай, во сколько обойдётся перекраска капота X5 2020».
  - Ниже 3 бейджа `rounded-full bg-white border border-slate-200 px-3 py-1 text-xs slate-600 flex items-center gap-1` с иконками: `⏱ 12 минут`, `📞 10 звонков`, `🎧 10 MP3 + резюме`.
- **Визуал слева:** `ScreenshotFrame` с URL `my.linkeon.io/dozvon` — скриншот чата Дозвона (активная кампания, список звонков с inline-плеерами). Под ним loop-видео (6 сек): поочерёдное появление результатов звонков, inline-плеер воспроизводит фрагмент.

### 4.6. Секция «Единый профиль»

**Файл:** `src/components/sections/Profile.tsx`

Формат `SplitSection`, порядок текст-слева / визуал-справа.

- `Eyebrow`: `ЕДИНЫЙ ПРОФИЛЬ`.
- H2: «Один контекст — все ассистенты помнят».
- Описание (slate-600): «В процессе диалогов Linkeon достраивает твой профиль: ценности, бизнес, боли, стиль коммуникации. Каждый ассистент стартует не с нуля, а с полным пониманием.»
- Bullets (`CheckCircle2` emerald):
  - Пополняется из каждого разговора
  - Работает во всех ассистентах и Дозвоне
  - Ты управляешь тем, что запоминается
  - Используется для поиска партнёров по ценностям
- **Визуал справа:** `ScreenshotFrame` с URL `my.linkeon.io/profile` — скриншот ProfileView (заполненный профиль). Под ним декоративный мини-preview canvas-графа (3 узла + 2 линии) в серых тонах — тизер секции Networking.

### 4.7. Секция «Networking по ценностям»

**Файл:** `src/components/sections/Networking.tsx` + `src/components/sections/ValueGraph.tsx`

- Формат: full-width (не split), `max-w-6xl`.
- `Eyebrow`: `NETWORKING`.
- H2 (центрирован): «Партнёры и эксперты, которые совпадают с тобой по ценностям».
- Описание (центрировано, `max-w-2xl mx-auto slate-600`): «Профиль — это не резюме. Это ценности, намерения, стиль. Linkeon находит людей, с которыми есть резонанс — для партнёрств, клиентов, найма, проектов.»
- **Canvas-граф** — компонент `<ValueGraph />`:
  - Полотно `h-[420px] md:h-[560px]` на всю ширину container'а.
  - Canvas с узлами:
    - 1 центральный узел «твой профиль» (indigo-600, радиус 16px, белая рамка 2px).
    - 8–10 узлов «ценности» (emerald-500, радиус 8px), плавно orbitируют вокруг центрального.
    - 6 узлов «другие люди» (slate-400, радиус 12px, лёгкий label-инициал), разбросаны.
    - Линии связи (slate-300, 1px) — от «твоего профиля» к ценностям.
    - **Активная связь** — при proximity (расстояние < threshold) между «твой» и «другой» загорается линия indigo-400, 2px, с мигающим градиентом.
  - Взаимодействие: узлы tick'аются в requestAnimationFrame, реагируют на курсор (мягкое отталкивание). На mobile — без mouse-interaction, только орбиты.
  - Производительность: 60fps на типичном ноутбуке, drop до 30fps → пауза при `!isInView`.
- Под графом — 3 подписи-легенды в ряд (центрированные, 14px slate-500):
  - `● Твой профиль` (indigo dot)
  - `● Ценности и намерения` (emerald dot)
  - `● Совпадения с другими` (indigo dot + `animate-pulse`)
- Под легендой — 3 колонки `grid md:grid-cols-3 gap-8` с текстом (без иконок, минимализм):
  - **Партнёры** — «Сооснователи и эксперты с похожей картиной мира».
  - **Клиенты** — «Те, кому близки твои смыслы, а не только цена».
  - **Сообщество** — «Ивенты, созвоны, чаты по интересам».
- Mini-CTA: `→ Открыть networking в my.linkeon.io` (indigo-600 text link) → `my.linkeon.io/search`.

### 4.8. Секция «Контент-движок»

**Файл:** `src/components/sections/ContentEngine.tsx`

- `Eyebrow`: `КОНТЕНТ-ДВИЖОК`.
- H2: «Плюс визуалы и видео — в тех же токенах».
- Описание: «Ассистент-маркетолог составил план? Тут же сгенерируй обложки, карусели и короткое видео. Без переключения между сервисами и подписками.»
- **Два столбца** `grid md:grid-cols-2 gap-6`, каждая — `Card`:
  - **Левая (Изображения):**
    - H3: `Изображения`.
    - Подпись (slate-500, 14px): `Nano Banana, реалистично и быстро. Обложки, карусели, визуалы для соцсетей.`
    - Визуал: grid 2×2 миниатюр из `assets/screenshots/imagegen-*.webp` (4 реальных примера). Каждая `aspect-square rounded-lg overflow-hidden`, hover — `scale-105 transition-transform`.
    - Footer-линк: `→ my.linkeon.io/image-gen`.
  - **Правая (Видео):**
    - H3: `Видео`.
    - Подпись: `Kling 2.1. Короткие ролики из текста или картинки — рекламные креативы, превью, сторис.`
    - Визуал: `ScreenshotFrame` с URL `my.linkeon.io/video` и autoplay loop-видео 16:9 (реальный пример из my.linkeon.io).
    - Footer-линк: `→ my.linkeon.io/video`.
- Центрированный footer секции (slate-500, 14px): «Работает в тех же токенах, что и ассистенты. Никаких отдельных подписок.»

### 4.9. Секция «Как это работает»

**Файл:** `src/components/sections/HowItWorks.tsx`

- `Eyebrow`: `КАК РАБОТАЕТ`.
- H2: «От SMS до первого результата — 3 минуты».
- 4 шага `grid md:grid-cols-4 gap-8`:

| # | Заголовок | Описание |
|---|---|---|
| **01** | Вход по SMS | Только номер телефона. Карта не нужна. +25 000 токенов в подарок |
| **02** | Разговор с ассистентом | Опиши задачу голосом или текстом. Профиль сам достроится |
| **03** | Запуск фичей | Обзвон, контент, договор — ассистент сделает и вернёт результат в чат |
| **04** | Рост | Ассистенты помнят контекст. Каждый следующий диалог качественнее |

Каждый шаг: номер `text-6xl font-semibold text-indigo-600 tabular-nums`, заголовок H3, параграф slate-600. Между шагами на десктопе — тонкая `border-t border-slate-200` в верхней части колонок (общая линия-timeline).

- Secondary CTA в конце (центрирован): `→ Начать бесплатно` (text-link indigo-600) → `my.linkeon.io`.

### 4.10. Секция «Для кого»

**Файл:** `src/components/sections/UseCases.tsx`

- `Eyebrow`: `ДЛЯ КОГО`.
- H2: «Бизнес-модели, где Linkeon заменяет команду».
- 3 карточки `grid md:grid-cols-3 gap-6`:

| Иконка (lucide) | Заголовок | Описание | Что получают (emerald чекмарки) |
|---|---|---|---|
| `Building2` | Малый бизнес без штата | Один человек = вся компания. Linkeon = отдел маркетинга, бухгалтерия, юрист, продажи | Ассистенты как отдел / Дозвон = аутсорс продаж / Единый профиль компании |
| `Rocket` | Фрилансеры и соло-эксперты | Ты делаешь проекты, а вокруг — 100 мелких задач (договоры, соцсети, лиды). AI снимает их | Договоры за минуту / Реклама для себя / Больше времени на core-работу |
| `Target` | Маркетинговые агентства | Клиентов много, людей мало. AI звонит лидам, пишет рекламные тексты, генерит креативы | 10× скорость кампаний / AI-обзвон клиентов / Видео и визуалы в одном окне |

Карточка: `Card` с иконкой 28px в indigo-50 квадрате сверху, H3, параграф, затем 3 bullet с `CheckCircle2` emerald.

### 4.11. Секция «Цены»

**Файл:** `src/components/sections/Pricing.tsx`

- `Eyebrow`: `ЦЕНЫ`.
- H2: «Платишь только за токены. Без подписок.».
- Описание (slate-600, центрировано): «Токены не сгорают. Пакет купил один раз — используешь когда нужно.»
- 3 карточки `grid md:grid-cols-3 gap-6 items-stretch`:

| Поле | Стартовый | **Расширенный** | Профессиональный |
|---|---|---|---|
| Tokens | 50 000 | 200 000 | 1 000 000 |
| Price | 149 ₽ | 499 ₽ | 1 990 ₽ |
| Badge | — | «Популярный» (indigo bg, white) | — |
| Savings | — | «Экономия 15%» | «Экономия 30%» |
| За 1000 токенов | ≈ 2.98 ₽ | ≈ 2.50 ₽ | ≈ 1.99 ₽ |
| ≈ сообщений | ~14 | ~57 | ~285 |
| CTA | `Купить` (outline) → `my.linkeon.io/tokens` | `Купить` (primary indigo) → `my.linkeon.io/tokens` | `Купить` (outline) → `my.linkeon.io/tokens` |

Средняя карточка (Расширенный):
- `scale-105 lg:scale-110` + `border-2 border-indigo-600` + `shadow-lg shadow-indigo-500/10`.
- Плашка «Популярный» — абсолютно позиционирована `-top-3 left-1/2 -translate-x-1/2`, `bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-semibold`.

Под ценами — trust-строка (slate-500, 14px, центрирована, flex gap-4, wrap на моб):
- 🔒 `Оплата через ЮKassa`
- 📧 `Чек на e-mail`
- 🎁 `25 000 токенов в подарок новым`

### 4.12. Секция «FAQ»

**Файл:** `src/components/sections/FAQ.tsx`

- `Eyebrow`: `ВОПРОСЫ`.
- H2: «Что важно знать перед стартом».
- Один столбец `max-w-3xl mx-auto`.
- Каждый пункт — нативный `<details>`:
  - `<summary>` — `py-5 cursor-pointer flex items-center justify-between text-slate-900 font-semibold`. Chevron `ChevronDown` lucide 20px справа, transition `rotate-180` при открытии.
  - Тело — `pb-5 text-slate-600 text-base`.
- Разделители — `border-b border-slate-200` между пунктами.

**8 вопросов/ответов** (финальный текст см. секцию 9 — i18n):
1. Что такое токены и как они расходуются?
2. Сколько займёт подключение?
3. Мои диалоги — приватные?
4. Как работает Дозвон юридически?
5. Голос Дозвона — мой или стандартный?
6. Можно ли отменить покупку токенов?
7. Есть ли API?
8. Как отличается от ChatGPT?

### 4.13. Секция Final CTA

**Файл:** `src/components/sections/FinalCTA.tsx`

- Одна широкая `Card`-карточка на всю ширину container'а: `bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-3xl py-20 px-8 text-center text-white overflow-hidden relative`.
- Сверху-внутри — декоративный `GradientOrb` (pink→indigo, 800×400px, opacity-30), выходит за пределы на 50%.
- H2 (`text-4xl md:text-5xl font-semibold tracking-tight`): «Собери свой AI-отдел за 2 минуты».
- Sub (`text-lg text-indigo-100 max-w-xl mx-auto mt-4`): «Вход по SMS, 25 000 токенов в подарок, без карты».
- CTA-группа (`mt-10 flex flex-col sm:flex-row gap-4 justify-center`):
  - Solid white button: `Начать бесплатно` (indigo-700 text, bg-white, hover → bg-slate-100) → `my.linkeon.io`.
  - Outline white: `Войти` (border-white, hover bg-white/10) → `my.linkeon.io`.
- Trust-строка `mt-8 text-sm text-indigo-200`: «Без подписок · без привязки карты · токены не сгорают».

### 4.14. Footer

**Файл:** `src/components/layout/Footer.tsx`

- `bg-slate-900 text-slate-400 py-16 px-6`.
- 4 колонки `grid md:grid-cols-4 gap-8 max-w-6xl mx-auto`:

1. **Лого + описание:** `LINKEON` (text-white font-semibold + emerald dot) + «Нейросеть для роста и развития бизнеса» (text-slate-400, 14px) + 3 иконки соцсетей (Telegram, VK, YouTube — `lucide` или кастомные SVG, slate-500 → hover slate-200).
2. **Продукт:** заголовок «Продукт» (text-slate-100 font-semibold mb-4, 13px uppercase tracking-wider), ссылки: AI-ассистенты, Дозвон, Единый профиль, Networking, Цены (slate-400 → hover slate-200).
3. **Компания:** О проекте, Блог (заглушка `#`), Реферальная программа (`my.linkeon.io/referral`), Поддержка (`my.linkeon.io/support`).
4. **Правовое:** Политика конфиденциальности, Оферта, Обработка ПДн. Реальные URL-ы этих документов уточняем у пользователя перед реализацией; до ответа — заглушки `#` с `aria-disabled="true"`.

Иконки соцсетей (Telegram, VK, YouTube) ведут на реальные страницы бренда — URL-ы уточняем у пользователя перед реализацией; до ответа — заглушки `#`.

Нижняя строка `border-t border-slate-800 pt-8 mt-12`:
- Слева: `© 2026 LINKEON.IO · Все права защищены.`
- Справа: `<LangSwitcher />` (дублируется здесь для мобильных).

### 4.15. LangSwitcher

**Файл:** `src/components/ui/LangSwitcher.tsx`

- Кнопка с двумя пилюлями `RU | EN`, активная — solid indigo, неактивная — slate-500.
- Клик → `i18n.changeLanguage('ru' | 'en')`, также записывает в `localStorage` (`i18n-lng`) и обновляет `document.documentElement.lang`.

---

## 5. Внутренние URL, CTA-цели, data-cta атрибуты

Все CTA-кнопки имеют `data-cta` атрибут для трекинга в Yandex.Metrika:

| Расположение | `data-cta` | Href |
|---|---|---|
| Header / primary | `header-start` | `https://my.linkeon.io` |
| Header / ghost | `header-login` | `https://my.linkeon.io` |
| Hero / primary | `hero-start` | `https://my.linkeon.io` |
| Hero / outline | `hero-login` | `https://my.linkeon.io` |
| Assistants / mini | `assistants-link` | `https://my.linkeon.io` |
| Dozvon / (нет CTA в тексте, только визуал) | — | — |
| ContentEngine / image mini | `content-imagegen` | `https://my.linkeon.io/image-gen` |
| ContentEngine / video mini | `content-video` | `https://my.linkeon.io/video` |
| Networking / mini | `networking-link` | `https://my.linkeon.io/search` |
| HowItWorks / secondary | `how-start` | `https://my.linkeon.io` |
| Pricing / carts ×3 | `pricing-starter`, `pricing-extended`, `pricing-professional` | `https://my.linkeon.io/tokens` |
| FinalCTA / primary | `final-start` | `https://my.linkeon.io` |
| FinalCTA / outline | `final-login` | `https://my.linkeon.io` |

Yandex.Metrika: `ym(105902201, 'reachGoal', datasetCta)` при клике на любой элемент с `[data-cta]` — однократный скрипт в `main.tsx` после монтирования (`addEventListener('click', …, true)`).

---

## 6. Скриншоты и видео — capture-пайплайн

**Файл:** `scripts/capture.ts` (Node-скрипт, запускается через `pnpm capture`).

### Алгоритм

1. Запустить headed Chromium через Playwright.
2. Открыть `https://my.linkeon.io`.
3. Авторизоваться тест-аккаунтом `79030169187`:
   - На `OnboardingPage` заполнить телефон.
   - Запросить код (нажать CTA «Получить код»).
   - Через `fetch('https://my.linkeon.io/webhook/debug/sms-code/79030169187')` получить актуальный OTP (работает при `DEBUG_SMS_CODES=true` на бэке).
   - Ввести OTP, дождаться редиректа в `/chat`.
4. Для каждого таргета в списке TARGETS:

```ts
const TARGETS = [
  { path: '/chat', screenshot: 'hero-chat.webp', video: 'hero-loop.webm', actions: ['typeMessage', 'streamResponse'], duration: 4000 },
  { path: '/chat', screenshot: 'assistants-list.webp', video: 'assistants-switch.webm', actions: ['openAssistantPicker', 'selectMarketer'], duration: 5000 },
  { path: '/dozvon', screenshot: 'dozvon-chat.webp', video: 'dozvon-results.webm', actions: ['waitForResults'], duration: 6000 },
  { path: '/profile', screenshot: 'profile.webp', actions: [] },
  { path: '/image-gen', thumbnails: ['imagegen-1.webp', 'imagegen-2.webp', 'imagegen-3.webp', 'imagegen-4.webp'], actions: ['loadHistory'] },
  { path: '/video', video: 'video-sample.webm', actions: ['playLastGeneration'], duration: 5000 },
];
```

5. Скриншоты: `page.screenshot({ type: 'webp', quality: 85 })`.
6. Видео: `page.video().path()` → конвертация в mp4 через ffmpeg (сжатие `-c:v libx264 -crf 28 -preset slow -movflags +faststart -an`), цель ≤400 KB per clip, 5–6 сек loop.
7. Сохранить в `src/assets/screenshots/*.webp` и `src/assets/videos/*.mp4`.

**Зависимости:** `@playwright/test` (devDep), `fluent-ffmpeg` (devDep), системный `ffmpeg` (brew).

Скрипт не автоматически запускается в `build` — запускается вручную перед коммитом при изменении UI в `my.linkeon.io`.

---

## 7. i18n

**Библиотека:** `i18next` + `react-i18next` + `i18next-browser-languagedetector`.

**Конфиг:** `src/i18n/index.ts`:
- `fallbackLng: 'ru'`, `supportedLngs: ['ru', 'en']`.
- `detection.order: ['localStorage', 'navigator']`.
- `resources`: импорт из `locales/ru.json` и `locales/en.json`.

**Структура ключей в JSON:**
- `header.nav.features`, `header.nav.how`, `header.nav.pricing`, `header.nav.faq`, `header.cta.login`, `header.cta.start`
- `hero.eyebrow`, `hero.h1Part1`, `hero.h1Rotating` (массив 4 строк), `hero.h1Part2`, `hero.sub`, `hero.trust`
- `problem.eyebrow`, `problem.h2`, `problem.items[0..2].title|text`, `problem.footer`
- `assistants.eyebrow`, `assistants.h2`, `assistants.sub`, `assistants.list[0..5].name|role`, `assistants.cta`
- `dozvon.*` — аналогично
- `profile.*` — аналогично
- `networking.*`, `content.*`, `how.*`, `useCases.*`, `pricing.*`, `faq.items[0..7].q|a`, `finalCta.*`, `footer.*`

**Правило:** ни один UI-текст не пишется inline в `.tsx`. Все строки — через `t('key')`.

**Перевод EN:** делается AI-транслейтом на этапе реализации, проходит быструю человеческую корректуру тебя до деплоя.

---

## 8. Мета, SEO, перформанс

### `index.html`

- `<title>LINKEON.IO — AI-команда для роста бизнеса</title>`
- `<meta name="description" content="AI-ассистенты (маркетолог, юрист, бухгалтер, HR, коуч) + автоматический обзвон клиентов + единый профиль. Для малого бизнеса, фрилансеров и агентств." />`
- OG: `og:title`, `og:description` (то же что description), `og:image` — новый Hero-скриншот 1200×630 из `public/og-cover.jpg`, `og:url` = `https://linkeon.io`, `og:locale` = `ru_RU`, `og:locale:alternate` = `en_US`.
- Twitter card — `summary_large_image`.
- Preconnect: `fonts.googleapis.com`, `fonts.gstatic.com`.
- Yandex.Metrika — **оставляем как есть**, `ym(105902201, …)` с webvisor, clickmap, trackLinks.
- `<html lang="ru">` — начальный, меняется через JS при смене языка.

### robots.txt и sitemap.xml

`public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://linkeon.io/sitemap.xml
```

`public/sitemap.xml` — один URL `https://linkeon.io/` + alternate hreflang для ru/en.

### Производительность

- Все картинки → WebP (опция Playwright), `loading="lazy"` на всех кроме hero-скриншота.
- Видео: MP4 (H.264), `preload="metadata"`, `muted playsinline autoplay loop`, суммарный вес всех видео ≤2 MB.
- Lazy-loading секций: Hero синхронно, остальные через `React.lazy` + `Suspense` — **отключаем** (лендинг короткий, оптимизация преждевременная, ухудшает SEO).
- Inline critical CSS — Vite делает автоматически.
- Цель Lighthouse Mobile: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95.

### Accessibility

- Все `<video>` получают `aria-hidden="true"` (декоративные).
- Ключевые `<img>` — осмысленный `alt`.
- FAQ через нативный `<details>` (keyboard-friendly без JS).
- Фокус-стили — дефолтные Tailwind ring-2 indigo-500.
- Контраст: проверен для `slate-600 on slate-50` = 5.74:1 (AA ✅).

---

## 9. Deploy

### Процесс

1. `pnpm install` (удалим supabase, добавим i18next).
2. `pnpm capture` — обновить скриншоты/видео (опционально, если UI в my.linkeon.io менялся).
3. `pnpm build` → `dist/`.
4. `rsync -az --delete dist/ dvolkov@212.113.106.202:/home/dvolkov/land_linkeon/dist/`.
5. `git push origin main`.

Nginx кеши: `Cache-Control: no-cache` на `index.html` уже стоит — свежий html отдаётся сразу, JS/CSS с хешем в имени, браузер подтянет новое.

### Откат

Если что-то пошло не так — `ssh dvolkov@212.113.106.202 'cd ~/land_linkeon && git checkout HEAD~1 -- . && <ещё один build/rsync>'`, либо хранить `dist-prev/` на сервере и менять симлинк — **не делаем в рамках этой задачи**, оверинжиниринг для небольшого лендинга.

---

## 10. Риски и как снижаем

| Риск | Сценарий | Снижение |
|---|---|---|
| Playwright не может залогиниться в my.linkeon.io (rate-limit, captcha) | Скрипт capture падает, вручную получаем скриншоты | Фолбэк: скрипт логирует ошибку + падает с инструкцией; скриншоты можно сделать руками и положить в `assets/` |
| Canvas-граф на Networking тормозит на слабых ноутбуках | 20+ узлов + tick 60fps | Ограничить до 16 узлов, пауза rAF при `!isInView`, detect `navigator.hardwareConcurrency < 4` → static fallback без анимации |
| EN-перевод некачественный | Автоперевод + ты как единственный ревьюер | До деплоя прогоняем все EN-строки через native-speaker-style LLM-reviewer, ты делаешь финальную корректуру |
| Видео не крутятся на iOS Safari | Autoplay policy | `playsinline muted autoplay loop` — это всё покрывает для muted видео на iOS 14+ |
| Переменные Yandex.Metrika не работают на staging-домене | Счётчик привязан к `linkeon.io` | Деплоим сразу на прод (staging для лендинга не имеет — `b.linkeon.io` поднят тем же dist, можно им пользоваться для preview) |
| Старые URL-ы в OG-превью кешируются соц-сетями | После деплоя VK/Telegram показывают старую картинку | Регистрируем новый `og:image` URL (например `og-cover-v2.jpg`), чтобы обойти кеш |

---

## 11. Явно НЕ делаем в этой итерации

- Формы (заявка на демо, обратная связь) — нет бэкенда, CTA только self-serve.
- Блог / статьи / SEO-посадки под запросы («AI обзвон», «AI юрист» и т.д.).
- A/B тестирование, сплит-тест CTA.
- Dark mode.
- Supabase (удаляем зависимость).
- Story-компоненты (Storybook) — лендинг маленький.
- Unit-тесты — нет логики; e2e — один smoke-тест на Playwright («лендинг открывается, CTA ведут на my.linkeon.io»).

---

## 12. Критерии готовности (DoD)

- [ ] Все 13 секций (включая Header и Footer) реализованы по этому споку.
- [ ] Все UI-строки через `t()`, `ru.json` + `en.json` наполнены.
- [ ] Скрипт `pnpm capture` работает, скриншоты/видео в `src/assets/`.
- [ ] Все CTA имеют правильный `href` и `data-cta`.
- [ ] Yandex.Metrika `reachGoal` отправляется на клик CTA — проверен в Metrika preview.
- [ ] `index.html` обновлён (title, description, OG).
- [ ] Lighthouse Mobile ≥90 на всех 4 показателях.
- [ ] Responsive проверен на 320px / 768px / 1024px / 1440px.
- [ ] Сборка пушится в `origin/main`, `dist/` залит на сервер, открывается по `https://linkeon.io`.
- [ ] Smoke-тест Playwright (Hero видна, CTA кликабельна, корректный Href) проходит.
