# Linkeon.io Landing Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Полный rewrite лендинга `linkeon.io` под B2B-позиционирование (AI-команда ассистентов + Дозвон + единый профиль) в стиле Linear/Vercel, с i18n RU+EN, реальными скриншотами и loop-видео из `my.linkeon.io`.

**Architecture:** Vite + React 18 + TypeScript + Tailwind. Один `App.tsx` компонует секции по порядку. UI-примитивы в `src/components/ui/`, лейаут в `src/components/layout/`, секции в `src/components/sections/`. i18n через `i18next`. Canvas-граф ценностей в секции Networking — чистый `<canvas>` + requestAnimationFrame. Скриншоты собираем через Playwright-скрипт `scripts/capture.ts`, логинящийся в my.linkeon.io через SMS debug-endpoint.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind 3, lucide-react, i18next + react-i18next + i18next-browser-languagedetector, @playwright/test (devDep), fluent-ffmpeg (devDep), системный ffmpeg.

**Ссылка на спеку:** [docs/superpowers/specs/2026-04-23-linkeon-landing-redesign-design.md](../specs/2026-04-23-linkeon-landing-redesign-design.md) — держим открытой во время работы, тексты и визуальные детали берём оттуда.

---

## Pre-flight

Перед стартом убедиться:
- Репо `land_linkeon` склонирован в `~/Downloads/land_linkeon`, ветка `main`, чистая от неcommitted изменений (кроме закоммиченной спеки).
- `pnpm -v` показывает установленный pnpm (любая версия ≥8).
- `ssh dvolkov@212.113.106.202 'pwd'` работает (нужно для capture и деплоя).
- `ffmpeg -version` установлен локально (`brew install ffmpeg` если нет).

---

## Task 1: Clean slate — удалить старые компоненты и supabase

Стираем всё наследие старого лендинга, чтобы не было zombie-импортов.

**Files:**
- Delete: `src/components/About.tsx`, `Advantages.tsx`, `Assistants.tsx`, `Benefits.tsx`, `CTA.tsx`, `Examples.tsx`, `FAQ.tsx`, `Footer.tsx`, `ForYou.tsx`, `Hero.tsx`, `HowItWorks.tsx`, `ThreeServices.tsx`, `ValueConnection.tsx`, `ValueGraph.tsx`
- Modify: `src/App.tsx` (редуцируем до заглушки)
- Modify: `package.json` (убрать `@supabase/supabase-js`)

- [ ] **Step 1.1: Удалить старые компоненты**

```bash
cd ~/Downloads/land_linkeon
rm src/components/About.tsx src/components/Advantages.tsx \
   src/components/Assistants.tsx src/components/Benefits.tsx \
   src/components/CTA.tsx src/components/Examples.tsx \
   src/components/FAQ.tsx src/components/Footer.tsx \
   src/components/ForYou.tsx src/components/Hero.tsx \
   src/components/HowItWorks.tsx src/components/ThreeServices.tsx \
   src/components/ValueConnection.tsx src/components/ValueGraph.tsx
```

- [ ] **Step 1.2: Редуцировать App.tsx до заглушки**

```tsx
// src/App.tsx
function App() {
  return <div className="min-h-screen" />;
}

export default App;
```

- [ ] **Step 1.3: Убрать supabase из package.json**

Открыть `package.json`, удалить строку `"@supabase/supabase-js": "^2.57.4",` из `dependencies`.

- [ ] **Step 1.4: Переустановить зависимости**

Run: `pnpm install`
Expected: `removed 1 package` (supabase).

- [ ] **Step 1.5: Убедиться, что typecheck и build зелёные**

Run: `pnpm typecheck && pnpm build`
Expected: обе команды без ошибок, `dist/` создаётся.

- [ ] **Step 1.6: Commit**

```bash
git add -A
git commit -m "chore: remove old landing components and supabase dep"
```

---

## Task 2: Фундамент — палитра, шрифты, base CSS, index.html

Настраиваем визуальную систему: Tailwind палитра, шрифты Inter + JetBrains Mono, базовый CSS, обновляем `index.html` (title/description/OG).

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 2.1: Переписать tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

Палитра (indigo / slate / emerald) — используем дефолтные Tailwind-цвета, никаких кастомных `ocean/sage/teal`.

- [ ] **Step 2.2: Переписать src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply antialiased bg-slate-50 text-slate-900 font-sans;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 2.3: Обновить index.html**

Полная замена содержимого:

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo1.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>LINKEON.IO — AI-команда для роста бизнеса</title>
    <meta name="description" content="AI-ассистенты (маркетолог, юрист, бухгалтер, HR, коуч) + автоматический обзвон клиентов + единый профиль. Для малого бизнеса, фрилансеров и агентств." />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="LINKEON.IO" />
    <meta property="og:title" content="LINKEON.IO — AI-команда для роста бизнеса" />
    <meta property="og:description" content="AI-ассистенты + автоматический обзвон клиентов + единый профиль. Для малого бизнеса, фрилансеров и агентств." />
    <meta property="og:url" content="https://linkeon.io" />
    <meta property="og:image" content="https://linkeon.io/og-cover.jpg" />
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:locale:alternate" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="LINKEON.IO — AI-команда для роста бизнеса" />
    <meta name="twitter:description" content="AI-ассистенты + автоматический обзвон клиентов + единый профиль." />
    <meta name="twitter:image" content="https://linkeon.io/og-cover.jpg" />

    <!-- Yandex.Metrika -->
    <script type="text/javascript">
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105902201', 'ym');
        ym(105902201, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  </head>
  <body>
    <noscript><div><img src="https://mc.yandex.ru/watch/105902201" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2.4: Убедиться, что build проходит и шрифты загружаются**

Run: `pnpm dev`
Открыть `http://localhost:5173`, в DevTools Network проверить что `fonts.googleapis.com/css2?family=Inter…JetBrains+Mono` загрузился со статусом 200. Остановить dev-сервер.

- [ ] **Step 2.5: Commit**

```bash
git add -A
git commit -m "chore: base config — new palette, fonts, meta tags"
```

---

## Task 3: i18n scaffold + LangSwitcher

Ставим i18next, конфигурим его, создаём пустые локали и `<LangSwitcher />`.

**Files:**
- Modify: `package.json`
- Create: `src/i18n/index.ts`
- Create: `src/i18n/locales/ru.json`
- Create: `src/i18n/locales/en.json`
- Create: `src/components/ui/LangSwitcher.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 3.1: Установить зависимости**

Run: `pnpm add i18next react-i18next i18next-browser-languagedetector`
Expected: `+ 3 packages`.

- [ ] **Step 3.2: Создать src/i18n/locales/ru.json (заглушка)**

```json
{
  "header": { "nav": { "features": "Возможности", "how": "Как работает", "pricing": "Цены", "faq": "FAQ" }, "cta": { "login": "Войти", "start": "Начать бесплатно" } },
  "placeholder": "Будет заполнено в Task 21"
}
```

- [ ] **Step 3.3: Создать src/i18n/locales/en.json (заглушка)**

```json
{
  "header": { "nav": { "features": "Features", "how": "How it works", "pricing": "Pricing", "faq": "FAQ" }, "cta": { "login": "Log in", "start": "Start free" } },
  "placeholder": "Filled in Task 21"
}
```

- [ ] **Step 3.4: Создать src/i18n/index.ts**

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { ru: { translation: ru }, en: { translation: en } },
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18n-lng',
      caches: ['localStorage'],
    },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;
```

- [ ] **Step 3.5: Подключить i18n в main.tsx**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 3.6: Создать src/components/ui/LangSwitcher.tsx**

```tsx
import { useTranslation } from 'react-i18next';

export default function LangSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language.startsWith('en') ? 'en' : 'ru';

  const setLang = (lng: 'ru' | 'en') => {
    if (lng !== current) i18n.changeLanguage(lng);
  };

  const base = 'px-2.5 py-1 text-xs font-semibold rounded-md transition-colors';
  const active = 'bg-indigo-600 text-white';
  const inactive = 'text-slate-500 hover:text-slate-900';

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5" data-testid="lang-switcher">
      <button type="button" onClick={() => setLang('ru')} className={`${base} ${current === 'ru' ? active : inactive}`}>RU</button>
      <button type="button" onClick={() => setLang('en')} className={`${base} ${current === 'en' ? active : inactive}`}>EN</button>
    </div>
  );
}
```

- [ ] **Step 3.7: Визуальная проверка**

Run: `pnpm dev`
В `App.tsx` временно подключить LangSwitcher чтобы увидеть рендер: `<LangSwitcher />` внутри `<div>`. Проверить что кнопки переключаются, в localStorage появляется ключ `i18n-lng`. Откатить временное изменение `App.tsx`.

- [ ] **Step 3.8: Commit**

```bash
git add -A
git commit -m "feat(i18n): scaffold i18next with RU/EN and LangSwitcher"
```

---

## Task 4: UI-примитивы — Section, Eyebrow, Button, Card

Базовые презентационные компоненты для остальных секций.

**Files:**
- Create: `src/components/ui/Section.tsx`
- Create: `src/components/ui/Eyebrow.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`

- [ ] **Step 4.1: src/components/ui/Section.tsx**

```tsx
import type { ReactNode } from 'react';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className = '', children }: Props) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4.2: src/components/ui/Eyebrow.tsx**

```tsx
interface Props { children: string; className?: string }

export default function Eyebrow({ children, className = '' }: Props) {
  return (
    <span className={`inline-block text-xs md:text-sm font-semibold text-indigo-600 tracking-widest uppercase ${className}`}>
      {children}
    </span>
  );
}
```

- [ ] **Step 4.3: src/components/ui/Button.tsx**

```tsx
import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

interface Props {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  className?: string;
  dataCta?: string;
  type?: 'button' | 'submit';
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30',
  outline: 'border border-slate-300 text-slate-900 bg-white hover:border-slate-400 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100',
};

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  dataCta,
  type = 'button',
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} data-cta={dataCta} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} data-cta={dataCta} className={cls}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4.4: src/components/ui/Card.tsx**

```tsx
import type { ReactNode, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '', ...rest }: Props) {
  return (
    <div
      {...rest}
      className={`bg-white border border-slate-200 rounded-2xl transition-colors hover:border-slate-300 ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4.5: Typecheck**

Run: `pnpm typecheck`
Expected: zero errors.

- [ ] **Step 4.6: Commit**

```bash
git add -A
git commit -m "feat(ui): add base primitives — Section, Eyebrow, Button, Card"
```

---

## Task 5: Медиа-примитивы и хуки — ScreenshotFrame, GradientOrb, FadeIn, useInView, useTypewriter

**Files:**
- Create: `src/lib/useInView.ts`
- Create: `src/lib/useTypewriter.ts`
- Create: `src/components/ui/FadeIn.tsx`
- Create: `src/components/ui/ScreenshotFrame.tsx`
- Create: `src/components/ui/GradientOrb.tsx`

- [ ] **Step 5.1: src/lib/useInView.ts**

```ts
import { useEffect, useRef, useState } from 'react';

export function useInView<T extends Element = Element>(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '-50px' }
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}
```

- [ ] **Step 5.2: src/lib/useTypewriter.ts**

```ts
import { useEffect, useState } from 'react';

interface Options {
  phrases: string[];
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
}

export function useTypewriter({ phrases, typingMs = 55, deletingMs = 35, holdMs = 1800 }: Options) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1));
    }, deleting ? deletingMs : typingMs);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typingMs, deletingMs, holdMs]);

  return text;
}
```

- [ ] **Step 5.3: src/components/ui/FadeIn.tsx**

```tsx
import type { ReactNode } from 'react';
import { useInView } from '../../lib/useInView';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className = '' }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5.4: src/components/ui/GradientOrb.tsx**

```tsx
interface Props {
  className?: string;
  size?: number;
  from?: string;
  to?: string;
  opacity?: number;
}

export default function GradientOrb({ className = '', size = 400, from = 'from-indigo-400', to = 'to-pink-300', opacity = 0.4 }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`absolute -z-10 blur-3xl rounded-full bg-gradient-to-br ${from} ${to} pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity }}
    />
  );
}
```

- [ ] **Step 5.5: src/components/ui/ScreenshotFrame.tsx**

```tsx
import type { ReactNode } from 'react';

interface Props {
  url: string;
  children: ReactNode;
  className?: string;
  aspect?: string;
}

export default function ScreenshotFrame({ url, children, className = '', aspect = 'aspect-[16/10]' }: Props) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-900/10 overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 rounded-md px-3 py-0.5">{url}</span>
        </div>
        <div className="w-12" />
      </div>
      <div className={aspect}>{children}</div>
    </div>
  );
}
```

- [ ] **Step 5.6: Typecheck + визуальная проверка**

Run: `pnpm typecheck`
Expected: zero errors.

В `App.tsx` временно подключить:
```tsx
<ScreenshotFrame url="my.linkeon.io/chat" className="max-w-2xl mx-auto m-12">
  <div className="w-full h-full bg-slate-100" />
</ScreenshotFrame>
```
Run: `pnpm dev` → увидеть фрейм браузера. Откатить временный код.

- [ ] **Step 5.7: Commit**

```bash
git add -A
git commit -m "feat(ui): media primitives — ScreenshotFrame, GradientOrb, FadeIn + hooks"
```

---

## Task 6: Header (sticky с blur, LangSwitcher, CTA)

**Files:**
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 6.1: Создать Header.tsx**

```tsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import LangSwitcher from '../ui/LangSwitcher';

const LINKS = [
  { href: '#features', key: 'header.nav.features' },
  { href: '#how', key: 'header.nav.how' },
  { href: '#pricing', key: 'header.nav.pricing' },
  { href: '#faq', key: 'header.nav.faq' },
];

const LOGIN_URL = 'https://my.linkeon.io';

export default function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight text-slate-900" aria-label="LINKEON.IO">
          <span>LINKEON</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          <Button variant="ghost" size="md" href={LOGIN_URL} dataCta="header-login">{t('header.cta.login')}</Button>
          <Button variant="primary" size="md" href={LOGIN_URL} dataCta="header-start">{t('header.cta.start')}</Button>
        </div>

        <button
          type="button"
          aria-label="Меню"
          className="lg:hidden p-2 text-slate-700"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
            <span className="font-semibold">LINKEON</span>
            <button type="button" aria-label="Закрыть" onClick={() => setMobileOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-6 p-6">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-xl font-semibold text-slate-900">
                {t(l.key)}
              </a>
            ))}
            <div className="mt-auto flex flex-col gap-3">
              <LangSwitcher />
              <Button variant="outline" size="lg" href={LOGIN_URL} dataCta="header-login">{t('header.cta.login')}</Button>
              <Button variant="primary" size="lg" href={LOGIN_URL} dataCta="header-start">{t('header.cta.start')}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 6.2: Подключить Header в App.tsx для визуальной проверки**

```tsx
import Header from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="h-[200vh]" />
    </div>
  );
}

export default App;
```

- [ ] **Step 6.3: Визуальная проверка**

Run: `pnpm dev`
Проверить: хедер прозрачен вверху страницы, после скролла становится белым с blur. Моб (DevTools 375px) — бургер открывает fullscreen drawer. Переключатель RU/EN работает.

- [ ] **Step 6.4: Commit**

```bash
git add -A
git commit -m "feat(layout): sticky blur header with mobile drawer and LangSwitcher"
```

---

## Task 7: Footer (4 колонки, slate-900)

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 7.1: Создать Footer.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { Send, Youtube, MessageCircle } from 'lucide-react';
import LangSwitcher from '../ui/LangSwitcher';

export default function Footer() {
  const { t } = useTranslation();

  const col = (items: { label: string; href: string }[]) => (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it.label}>
          <a href={it.href} className="text-sm text-slate-400 hover:text-slate-200 transition-colors" {...(it.href === '#' ? { 'aria-disabled': 'true' } : {})}>
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 text-white font-semibold mb-3">
            <span>LINKEON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-sm text-slate-400 mb-6">{t('footer.tagline')}</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Telegram" className="text-slate-500 hover:text-slate-200"><Send className="w-5 h-5" /></a>
            <a href="#" aria-label="VK" className="text-slate-500 hover:text-slate-200"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" aria-label="YouTube" className="text-slate-500 hover:text-slate-200"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.product')}</h3>
          {col([
            { label: t('footer.product.assistants'), href: '#features' },
            { label: t('footer.product.dozvon'), href: '#features' },
            { label: t('footer.product.profile'), href: '#features' },
            { label: t('footer.product.networking'), href: '#features' },
            { label: t('footer.product.pricing'), href: '#pricing' },
          ])}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.company')}</h3>
          {col([
            { label: t('footer.company.about'), href: '#' },
            { label: t('footer.company.blog'), href: '#' },
            { label: t('footer.company.referral'), href: 'https://my.linkeon.io/referral' },
            { label: t('footer.company.support'), href: 'https://my.linkeon.io/support' },
          ])}
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider mb-4">{t('footer.sections.legal')}</h3>
          {col([
            { label: t('footer.legal.privacy'), href: '#' },
            { label: t('footer.legal.offer'), href: '#' },
            { label: t('footer.legal.pdn'), href: '#' },
          ])}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-slate-500">© 2026 LINKEON.IO · {t('footer.rights')}</span>
        <LangSwitcher />
      </div>
    </footer>
  );
}
```

- [ ] **Step 7.2: Typecheck**

Run: `pnpm typecheck`
Expected: zero errors (будут missing translation keys в рантайме — ок, заполним в Task 21).

- [ ] **Step 7.3: Commit**

```bash
git add -A
git commit -m "feat(layout): dark footer with 4 columns + social links placeholders"
```

---

## Task 8: Hero-секция

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 8.1: Создать Hero.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import GradientOrb from '../ui/GradientOrb';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';
import { useTypewriter } from '../../lib/useTypewriter';

const START_URL = 'https://my.linkeon.io';

export default function Hero() {
  const { t } = useTranslation();
  const phrases = t('hero.h1Rotating', { returnObjects: true }) as string[];
  const rotating = useTypewriter({ phrases });

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <FadeIn>
            <Eyebrow className="mb-6">{t('hero.eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={80}>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 text-balance">
              {t('hero.h1Part1')}{' '}
              <span className="relative inline-block text-indigo-600">
                {rotating}
                <span className="inline-block w-0.5 h-[0.9em] bg-indigo-600 align-middle ml-0.5 animate-pulse" />
              </span>{' '}
              {t('hero.h1Part2')}
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-8">{t('hero.sub')}</p>
          </FadeIn>
          <FadeIn delay={220}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button variant="primary" size="lg" href={START_URL} dataCta="hero-start">{t('hero.ctaStart')}</Button>
              <Button variant="outline" size="lg" href={START_URL} dataCta="hero-login">{t('hero.ctaLogin')}</Button>
            </div>
          </FadeIn>
          <FadeIn delay={280}>
            <p className="text-sm text-slate-500">{t('hero.trust')}</p>
          </FadeIn>
        </div>

        <FadeIn delay={320} className="relative">
          <GradientOrb className="-top-20 -right-10" size={500} />
          <ScreenshotFrame url="my.linkeon.io/chat">
            <video
              src="/screenshots/hero-loop.mp4"
              poster="/screenshots/hero-chat.webp"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </ScreenshotFrame>
          <div className="absolute -bottom-6 -left-4 bg-white border border-slate-200 rounded-xl shadow-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Phone className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{t('hero.badge.title')}</p>
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                {t('hero.badge.status')}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 8.2: Подключить Hero в App.tsx**

```tsx
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
    </div>
  );
}

export default App;
```

- [ ] **Step 8.3: Визуальная проверка**

Run: `pnpm dev`
Проверить рендер Hero: typewriter работает (подставляется placeholder массив из `en.json` пока). Видео `/screenshots/hero-loop.mp4` будет 404 — норма, плейсхолдер до Task 22.

- [ ] **Step 8.4: Commit**

```bash
git add -A
git commit -m "feat(sections): Hero with typewriter H1, gradient orb, screenshot frame"
```

---

## Task 9: Problem-секция

**Files:**
- Create: `src/components/sections/Problem.tsx`

- [ ] **Step 9.1: Создать Problem.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { Clock, Users, Layers } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

const ICONS = [Clock, Users, Layers];

export default function Problem() {
  const { t } = useTranslation();
  const items = t('problem.items', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Section id="problem" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-16">
        <Eyebrow className="mb-4">{t('problem.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance max-w-3xl mx-auto">
          {t('problem.h2')}
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-12">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <FadeIn key={it.title} delay={i * 100}>
              <div className="inline-flex p-3 rounded-xl bg-slate-100 mb-4">
                <Icon className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{it.title}</h3>
              <p className="text-slate-600 leading-relaxed">{it.text}</p>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={400} className="mt-16 text-center max-w-2xl mx-auto text-lg text-slate-600">
        {t('problem.footer')}
      </FadeIn>
    </Section>
  );
}
```

- [ ] **Step 9.2: Подключить в App.tsx, визуальная проверка, commit**

В `App.tsx` добавить `<Problem />` после `<Hero />`.
Run: `pnpm dev` → 3 колонки рендерятся, плейсхолдеры-тексты.

```bash
git add -A
git commit -m "feat(sections): Problem section with three icons"
```

---

## Task 10: Assistants-секция (AI-команда)

**Files:**
- Create: `src/components/sections/Assistants.tsx`

- [ ] **Step 10.1: Создать Assistants.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { Bot, Megaphone, Scale, Calculator, UserCheck, Compass, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';

const ICONS = [Bot, Megaphone, Scale, Calculator, UserCheck, Compass];
const START_URL = 'https://my.linkeon.io';

export default function Assistants() {
  const { t } = useTranslation();
  const list = t('assistants.list', { returnObjects: true }) as { name: string; role: string }[];

  return (
    <Section id="features">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <Eyebrow className="mb-4">{t('assistants.eyebrow')}</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
            {t('assistants.h2')}
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl">{t('assistants.sub')}</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {list.map((a, i) => {
              const Icon = ICONS[i];
              return (
                <div key={a.name} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{a.name}</p>
                    <p className="text-xs text-slate-500 leading-snug mt-0.5">{a.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a href={START_URL} data-cta="assistants-link" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold text-sm" target="_blank" rel="noopener noreferrer">
            {t('assistants.cta')} <ArrowRight className="w-4 h-4" />
          </a>
        </FadeIn>

        <FadeIn delay={160}>
          <ScreenshotFrame url="my.linkeon.io/chat">
            <video
              src="/screenshots/assistants-switch.mp4"
              poster="/screenshots/assistants-list.webp"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </ScreenshotFrame>
        </FadeIn>
      </div>
    </Section>
  );
}
```

- [ ] **Step 10.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): Assistants section — 6 roles + screenshot"
```

---

## Task 11: Dozvon-секция

**Files:**
- Create: `src/components/sections/Dozvon.tsx`

- [ ] **Step 11.1: Создать Dozvon.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Clock, Phone, Headphones } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';

export default function Dozvon() {
  const { t } = useTranslation();
  const bullets = t('dozvon.bullets', { returnObjects: true }) as string[];

  return (
    <Section className="bg-white border-y border-slate-200">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn className="order-2 lg:order-1">
          <ScreenshotFrame url="my.linkeon.io/dozvon">
            <video
              src="/screenshots/dozvon-results.mp4"
              poster="/screenshots/dozvon-chat.webp"
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </ScreenshotFrame>
        </FadeIn>

        <FadeIn delay={160} className="order-1 lg:order-2">
          <Eyebrow className="mb-4">{t('dozvon.eyebrow')}</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
            {t('dozvon.h2')}
          </h2>
          <p className="text-lg text-slate-600 mb-6 max-w-xl">{t('dozvon.sub')}</p>

          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-start gap-2 mb-4">
              <span className="font-mono text-slate-400 text-sm select-none mt-0.5">→</span>
              <code className="font-mono text-sm text-slate-700 leading-relaxed">{t('dozvon.prompt')}</code>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Clock className="w-3.5 h-3.5" /> {t('dozvon.badges.time')}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Phone className="w-3.5 h-3.5" /> {t('dozvon.badges.calls')}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Headphones className="w-3.5 h-3.5" /> {t('dozvon.badges.recordings')}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
```

- [ ] **Step 11.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): Dozvon — AI outbound calling section"
```

---

## Task 12: Profile-секция

**Files:**
- Create: `src/components/sections/Profile.tsx`

- [ ] **Step 12.1: Создать Profile.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';

export default function Profile() {
  const { t } = useTranslation();
  const bullets = t('profile.bullets', { returnObjects: true }) as string[];

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <Eyebrow className="mb-4">{t('profile.eyebrow')}</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
            {t('profile.h2')}
          </h2>
          <p className="text-lg text-slate-600 mb-6 max-w-xl">{t('profile.sub')}</p>
          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={160}>
          <ScreenshotFrame url="my.linkeon.io/profile">
            <img
              src="/screenshots/profile.webp"
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
          </ScreenshotFrame>
        </FadeIn>
      </div>
    </Section>
  );
}
```

- [ ] **Step 12.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): Profile section"
```

---

## Task 13: Networking + ValueGraph (canvas)

Самая «мясная» секция — canvas-граф связей.

**Files:**
- Create: `src/components/sections/ValueGraph.tsx`
- Create: `src/components/sections/Networking.tsx`

- [ ] **Step 13.1: Создать ValueGraph.tsx (canvas с узлами и связями)**

```tsx
import { useEffect, useRef } from 'react';
import { useInView } from '../../lib/useInView';

interface Node {
  id: string;
  type: 'self' | 'value' | 'other';
  x: number; y: number; vx: number; vy: number;
  r: number;
  label?: string;
  orbitAngle?: number;
  orbitRadius?: number;
}

const COLORS = {
  self: '#4f46e5',
  value: '#10b981',
  other: '#94a3b8',
  link: '#cbd5e1',
  activeLink: '#818cf8',
  bg: 'transparent',
};

const VALUES = ['Честность', 'Рост', 'Свобода', 'Семья', 'Вклад', 'Творчество', 'Развитие', 'Доверие'];
const OTHERS = ['А', 'М', 'К', 'Д', 'С', 'Н'];

export default function ValueGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const rafRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      }
    };

    const initNodes = (w: number, h: number) => {
      const cx = w / 2, cy = h / 2;
      const nodes: Node[] = [];
      nodes.push({ id: 'self', type: 'self', x: cx, y: cy, vx: 0, vy: 0, r: 10 });
      VALUES.forEach((label, i) => {
        const angle = (i / VALUES.length) * Math.PI * 2;
        const orbit = Math.min(w, h) * 0.22;
        nodes.push({
          id: `value-${i}`, type: 'value', label,
          x: cx + Math.cos(angle) * orbit, y: cy + Math.sin(angle) * orbit,
          vx: 0, vy: 0, r: 5, orbitAngle: angle, orbitRadius: orbit,
        });
      });
      OTHERS.forEach((label, i) => {
        const angle = (i / OTHERS.length) * Math.PI * 2 + Math.PI / 6;
        const dist = Math.min(w, h) * 0.42;
        nodes.push({
          id: `other-${i}`, type: 'other', label,
          x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: 8,
        });
      });
      nodesRef.current = nodes;
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);
    resize();

    const tick = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      const cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const self = nodes[0];

      // Update positions
      nodes.forEach((n) => {
        if (n.type === 'value' && n.orbitAngle !== undefined && n.orbitRadius !== undefined) {
          n.orbitAngle += 0.003;
          n.x = cx + Math.cos(n.orbitAngle) * n.orbitRadius;
          n.y = cy + Math.sin(n.orbitAngle) * n.orbitRadius;
        } else if (n.type === 'other') {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 40 || n.x > w - 40) n.vx *= -1;
          if (n.y < 40 || n.y > h - 40) n.vy *= -1;
          const dx = n.x - mouseRef.current.x, dy = n.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80 && dist > 0) {
            n.x += (dx / dist) * 0.8;
            n.y += (dy / dist) * 0.8;
          }
        }
      });

      // Draw self→value links
      ctx.strokeStyle = COLORS.link;
      ctx.lineWidth = 1;
      nodes.forEach((n) => {
        if (n.type === 'value') {
          ctx.beginPath();
          ctx.moveTo(self.x, self.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      });

      // Draw active links (self→other proximity)
      nodes.forEach((n) => {
        if (n.type === 'other') {
          const dx = n.x - self.x, dy = n.y - self.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = Math.min(w, h) * 0.35;
          if (dist < threshold) {
            const opacity = 1 - dist / threshold;
            ctx.strokeStyle = COLORS.activeLink;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(self.x, self.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Draw nodes
      nodes.forEach((n) => {
        ctx.fillStyle = COLORS[n.type];
        if (n.type === 'self') {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.fillStyle = COLORS.self;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.type === 'other' && n.label) {
          ctx.fillStyle = '#64748b';
          ctx.font = '10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y + n.r + 12);
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    if (inView) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [inView]);

  return (
    <div ref={containerRef} className="w-full h-[420px] md:h-[560px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
```

- [ ] **Step 13.2: Создать Networking.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import ValueGraph from './ValueGraph';

const SEARCH_URL = 'https://my.linkeon.io/search';

export default function Networking() {
  const { t } = useTranslation();
  const cols = t('networking.cols', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Section className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('networking.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
          {t('networking.h2')}
        </h2>
        <p className="text-lg text-slate-600">{t('networking.sub')}</p>
      </FadeIn>

      <FadeIn delay={160}>
        <ValueGraph />
      </FadeIn>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-600" /> {t('networking.legend.self')}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {t('networking.legend.values')}</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" /> {t('networking.legend.matches')}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {cols.map((c, i) => (
          <FadeIn key={c.title} delay={i * 100}>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{c.title}</h3>
            <p className="text-slate-600">{c.text}</p>
          </FadeIn>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a href={SEARCH_URL} data-cta="networking-link" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold text-sm" target="_blank" rel="noopener noreferrer">
          {t('networking.cta')} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}
```

- [ ] **Step 13.3: Подключить, проверить**

В `App.tsx` добавить `<Networking />`. Run: `pnpm dev`. Проверить: canvas рисует центральный узел + 8 орбитальных ценностей + 6 «других», линии связи мерцают когда узлы сближаются с центральным. Mouse-hover — «другие» отталкиваются от курсора.

- [ ] **Step 13.4: Commit**

```bash
git add -A
git commit -m "feat(sections): Networking with interactive canvas ValueGraph"
```

---

## Task 14: ContentEngine (ImageGen + Video bento)

**Files:**
- Create: `src/components/sections/ContentEngine.tsx`

- [ ] **Step 14.1: Создать ContentEngine.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Card from '../ui/Card';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';

export default function ContentEngine() {
  const { t } = useTranslation();

  return (
    <Section>
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('content.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
          {t('content.h2')}
        </h2>
        <p className="text-lg text-slate-600">{t('content.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        <FadeIn>
          <Card className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{t('content.images.h3')}</h3>
            <p className="text-sm text-slate-500 mb-5">{t('content.images.caption')}</p>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={`/screenshots/imagegen-${i}.webp`}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <a href="https://my.linkeon.io/image-gen" data-cta="content-imagegen" className="mt-5 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold" target="_blank" rel="noopener noreferrer">
              my.linkeon.io/image-gen <ArrowRight className="w-4 h-4" />
            </a>
          </Card>
        </FadeIn>

        <FadeIn delay={120}>
          <Card className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 mb-1">{t('content.video.h3')}</h3>
            <p className="text-sm text-slate-500 mb-5">{t('content.video.caption')}</p>
            <div className="flex-1">
              <ScreenshotFrame url="my.linkeon.io/video" aspect="aspect-video">
                <video
                  src="/screenshots/video-sample.mp4"
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover"
                  aria-hidden="true"
                />
              </ScreenshotFrame>
            </div>
            <a href="https://my.linkeon.io/video" data-cta="content-video" className="mt-5 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold" target="_blank" rel="noopener noreferrer">
              my.linkeon.io/video <ArrowRight className="w-4 h-4" />
            </a>
          </Card>
        </FadeIn>
      </div>

      <p className="text-center text-sm text-slate-500 mt-10">{t('content.footer')}</p>
    </Section>
  );
}
```

- [ ] **Step 14.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): ContentEngine — ImageGen grid + Video frame"
```

---

## Task 15: HowItWorks-секция

**Files:**
- Create: `src/components/sections/HowItWorks.tsx`

- [ ] **Step 15.1: Создать HowItWorks.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('how.steps', { returnObjects: true }) as { title: string; text: string }[];

  return (
    <Section id="how" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('how.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('how.h2')}
        </h2>
      </FadeIn>

      <div className="relative">
        <div className="hidden md:block absolute top-8 left-0 right-0 border-t border-slate-200" />
        <div className="grid md:grid-cols-4 gap-8 md:gap-6 relative">
          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={i * 100}>
              <div className="text-6xl font-semibold text-indigo-600 tabular-nums leading-none mb-4">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn delay={500} className="text-center mt-12">
        <a href="https://my.linkeon.io" data-cta="how-start" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold" target="_blank" rel="noopener noreferrer">
          {t('how.cta')} <ArrowRight className="w-4 h-4" />
        </a>
      </FadeIn>
    </Section>
  );
}
```

- [ ] **Step 15.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): HowItWorks — 4 steps timeline"
```

---

## Task 16: UseCases-секция

**Files:**
- Create: `src/components/sections/UseCases.tsx`

- [ ] **Step 16.1: Создать UseCases.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { Building2, Rocket, Target, CheckCircle2 } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Card from '../ui/Card';
import FadeIn from '../ui/FadeIn';

const ICONS = [Building2, Rocket, Target];

export default function UseCases() {
  const { t } = useTranslation();
  const items = t('useCases.items', { returnObjects: true }) as { title: string; text: string; benefits: string[] }[];

  return (
    <Section>
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('useCases.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('useCases.h2')}
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <FadeIn key={it.title} delay={i * 100}>
              <Card className="p-6 h-full flex flex-col">
                <div className="inline-flex w-10 h-10 rounded-lg bg-indigo-50 items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{it.title}</h3>
                <p className="text-slate-600 mb-5 flex-1">{it.text}</p>
                <ul className="space-y-2">
                  {it.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
```

- [ ] **Step 16.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): UseCases — 3 personas"
```

---

## Task 17: Pricing-секция

**Files:**
- Create: `src/components/sections/Pricing.tsx`

- [ ] **Step 17.1: Создать Pricing.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { Coins, Lock, Mail, Gift } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';

interface Pkg {
  id: 'starter' | 'extended' | 'professional';
  tokens: number;
  price: number;
  savings?: string;
  popular?: boolean;
}

const PACKAGES: Pkg[] = [
  { id: 'starter', tokens: 50000, price: 149 },
  { id: 'extended', tokens: 200000, price: 499, savings: '15%', popular: true },
  { id: 'professional', tokens: 1000000, price: 1990, savings: '30%' },
];

const TOKENS_URL = 'https://my.linkeon.io/tokens';

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const fmt = (n: number) => n.toLocaleString(i18n.language === 'en' ? 'en-US' : 'ru-RU');

  return (
    <Section id="pricing" className="bg-white border-y border-slate-200">
      <FadeIn className="text-center mb-16 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('pricing.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
          {t('pricing.h2')}
        </h2>
        <p className="text-lg text-slate-600">{t('pricing.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
        {PACKAGES.map((p, i) => {
          const perThousand = (p.price / (p.tokens / 1000)).toFixed(2);
          const msgs = Math.floor(p.tokens / 3500);
          return (
            <FadeIn key={p.id} delay={i * 100}>
              <div className={`relative h-full flex flex-col rounded-2xl p-6 ${p.popular ? 'border-2 border-indigo-600 shadow-lg shadow-indigo-500/10 lg:scale-105' : 'border border-slate-200 bg-white'}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    {t('pricing.popular')}
                  </span>
                )}
                {p.savings && (
                  <span className="absolute -top-3 right-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {t('pricing.savings', { value: p.savings })}
                  </span>
                )}

                <h3 className="text-xl font-semibold text-slate-900 mb-2">{t(`pricing.plans.${p.id}`)}</h3>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <Coins className="w-5 h-5 text-indigo-600" />
                  <span className="text-2xl font-bold text-slate-900">{fmt(p.tokens)}</span>
                  <span className="text-sm text-slate-500">{t('pricing.tokens')}</span>
                </div>
                <p className="text-xs text-slate-400 mb-6">≈ {msgs} {t('pricing.messages')}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-slate-900">{p.price}</span>
                  <span className="text-xl text-slate-600 ml-1">₽</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">≈ {perThousand} ₽ {t('pricing.per1000')}</p>
                <div className="mt-auto">
                  <Button
                    variant={p.popular ? 'primary' : 'outline'}
                    size="lg"
                    href={TOKENS_URL}
                    dataCta={`pricing-${p.id}`}
                    className="w-full"
                  >
                    {t('pricing.cta')}
                  </Button>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={400} className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-slate-500">
        <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> {t('pricing.trust.yookassa')}</span>
        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {t('pricing.trust.email')}</span>
        <span className="flex items-center gap-1.5"><Gift className="w-4 h-4" /> {t('pricing.trust.gift')}</span>
      </FadeIn>
    </Section>
  );
}
```

- [ ] **Step 17.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): Pricing — 3 token packages (149/499/1990 ₽)"
```

---

## Task 18: FAQ-секция

**Files:**
- Create: `src/components/sections/FAQ.tsx`

- [ ] **Step 18.1: Создать FAQ.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

export default function FAQ() {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string }[];

  return (
    <Section id="faq">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('faq.eyebrow')}</Eyebrow>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
          {t('faq.h2')}
        </h2>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="max-w-3xl mx-auto">
          {items.map((item) => (
            <details key={item.q} className="group border-b border-slate-200 py-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-slate-900 font-semibold pr-4">{item.q}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
```

- [ ] **Step 18.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): FAQ accordion with 8 questions"
```

---

## Task 19: FinalCTA-секция

**Files:**
- Create: `src/components/sections/FinalCTA.tsx`

- [ ] **Step 19.1: Создать FinalCTA.tsx**

```tsx
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import GradientOrb from '../ui/GradientOrb';
import FadeIn from '../ui/FadeIn';

const LOGIN_URL = 'https://my.linkeon.io';

export default function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section className="px-6 py-16 md:py-24">
      <FadeIn className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white text-center py-20 px-8">
          <GradientOrb className="-top-40 left-1/2 -translate-x-1/2" size={800} from="from-pink-300" to="to-indigo-400" opacity={0.3} />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            {t('finalCta.h2')}
          </h2>
          <p className="text-lg text-indigo-100 max-w-xl mx-auto mt-4">{t('finalCta.sub')}</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={LOGIN_URL} dataCta="final-start" className="bg-white text-indigo-700 shadow-none hover:bg-slate-100 hover:shadow-xl">
              {t('finalCta.ctaStart')}
            </Button>
            <Button variant="outline" size="lg" href={LOGIN_URL} dataCta="final-login" className="bg-transparent border-white text-white hover:bg-white/10 hover:border-white">
              {t('finalCta.ctaLogin')}
            </Button>
          </div>

          <p className="text-sm text-indigo-200 mt-8">{t('finalCta.trust')}</p>
        </div>
      </FadeIn>
    </section>
  );
}
```

- [ ] **Step 19.2: Подключить, проверить, commit**

```bash
git add -A
git commit -m "feat(sections): FinalCTA with gradient card"
```

---

## Task 20: App.tsx — финальная сборка всех секций

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 20.1: Переписать App.tsx**

```tsx
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Assistants from './components/sections/Assistants';
import Dozvon from './components/sections/Dozvon';
import Profile from './components/sections/Profile';
import Networking from './components/sections/Networking';
import ContentEngine from './components/sections/ContentEngine';
import HowItWorks from './components/sections/HowItWorks';
import UseCases from './components/sections/UseCases';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Assistants />
        <Dozvon />
        <Profile />
        <Networking />
        <ContentEngine />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 20.2: Проверка скроллом**

Run: `pnpm dev`
Проскроллить всю страницу — проверить отсутствие пустых пространств, рабочие anchor-ссылки в Header (`#features`, `#how`, `#pricing`, `#faq`). Многие тексты будут плейсхолдерами из заглушки локалей — нормально, заполним следующим тасsk-ом.

- [ ] **Step 20.3: Commit**

```bash
git add -A
git commit -m "feat: compose full landing in App.tsx"
```

---

## Task 21: Наполнить ru.json и en.json финальным контентом

Теперь, когда все секции на месте, вливаем тексты из спеки.

**Files:**
- Modify: `src/i18n/locales/ru.json`
- Modify: `src/i18n/locales/en.json`

- [ ] **Step 21.1: Полностью переписать src/i18n/locales/ru.json**

```json
{
  "header": {
    "nav": { "features": "Возможности", "how": "Как работает", "pricing": "Цены", "faq": "FAQ" },
    "cta": { "login": "Войти", "start": "Начать бесплатно" }
  },
  "hero": {
    "eyebrow": "AI для роста бизнеса",
    "h1Part1": "Твоя AI-команда,",
    "h1Rotating": ["обзвон клиентов", "создание контента", "консультации юриста", "маркетинговый план"],
    "h1Part2": "и единый профиль",
    "sub": "Шесть AI-ассистентов (маркетолог, юрист, бухгалтер, HR, коуч и Роман), которые звонят клиентам, пишут контент и растут вместе с твоим бизнесом. Один профиль на всё.",
    "ctaStart": "Начать бесплатно",
    "ctaLogin": "Войти",
    "trust": "25 000 токенов в подарок · без карты · 2 минуты на регистрацию",
    "badge": { "title": "Дозвон активен", "status": "3 / 10 звонков" }
  },
  "problem": {
    "eyebrow": "Проблема",
    "h2": "На рост бизнеса не хватает часов в сутках",
    "items": [
      { "title": "Рутина съедает фокус", "text": "Ответить клиенту, написать пост, составить договор, позвонить в 20 компаний — и ты уже не растёшь, а тушишь." },
      { "title": "Нанимать — дорого и долго", "text": "Маркетолог, юрист, HR — это 300–500 тыс. ₽/мес фонда на ранней стадии." },
      { "title": "Инструментов 10, контекст один", "text": "ChatGPT, Notion, CRM, почта — каждый знает о тебе кусочек, а не целое." }
    ],
    "footer": "Linkeon собирает это в один продукт: AI-ассистенты выполняют задачи, а твой профиль — контекст — живёт в одном месте."
  },
  "assistants": {
    "eyebrow": "AI-команда",
    "h2": "Шесть ассистентов в одном окне",
    "sub": "Каждый — эксперт в своей роли. Помнят твой бизнес, знают друг о друге, отвечают голосом или текстом.",
    "list": [
      { "name": "Роман", "role": "Универсальный агент, делает всё" },
      { "name": "Маркетолог", "role": "Планы запусков, контент, аналитика" },
      { "name": "Юрист", "role": "Договоры, чек-листы, консультации" },
      { "name": "Бухгалтер", "role": "Налоги, расчёты, выписки 1С" },
      { "name": "HR", "role": "Вакансии, интервью-вопросы, оценка" },
      { "name": "Коуч", "role": "Стратегия, приоритеты, психология" }
    ],
    "cta": "Посмотреть всех ассистентов"
  },
  "dozvon": {
    "eyebrow": "Дозвон · уникально",
    "h2": "AI звонит клиентам. Сам.",
    "sub": "Опиши задачу текстом — AI найдёт контакты, позвонит, проведёт разговор по-человечески, запишет и пришлёт резюме. Ты получаешь только результат.",
    "bullets": [
      "Находит компании и телефоны по задаче",
      "Звонит голосом (клонированный или стандартный)",
      "Ведёт переговоры, отвечает на возражения",
      "Записывает MP3 и присылает резюме в чат"
    ],
    "prompt": "найди 10 кузовных сервисов BMW в Москве и узнай, во сколько обойдётся перекраска капота X5 2020",
    "badges": { "time": "12 минут", "calls": "10 звонков", "recordings": "10 MP3 + резюме" }
  },
  "profile": {
    "eyebrow": "Единый профиль",
    "h2": "Один контекст — все ассистенты помнят",
    "sub": "В процессе диалогов Linkeon достраивает твой профиль: ценности, бизнес, боли, стиль коммуникации. Каждый ассистент стартует не с нуля, а с полным пониманием.",
    "bullets": [
      "Пополняется из каждого разговора",
      "Работает во всех ассистентах и Дозвоне",
      "Ты управляешь тем, что запоминается",
      "Используется для поиска партнёров по ценностям"
    ]
  },
  "networking": {
    "eyebrow": "Networking",
    "h2": "Партнёры и эксперты, которые совпадают с тобой по ценностям",
    "sub": "Профиль — это не резюме. Это ценности, намерения, стиль. Linkeon находит людей, с которыми есть резонанс — для партнёрств, клиентов, найма, проектов.",
    "legend": { "self": "Твой профиль", "values": "Ценности и намерения", "matches": "Совпадения с другими" },
    "cols": [
      { "title": "Партнёры", "text": "Сооснователи и эксперты с похожей картиной мира." },
      { "title": "Клиенты", "text": "Те, кому близки твои смыслы, а не только цена." },
      { "title": "Сообщество", "text": "Ивенты, созвоны, чаты по интересам." }
    ],
    "cta": "Открыть networking в my.linkeon.io"
  },
  "content": {
    "eyebrow": "Контент-движок",
    "h2": "Плюс визуалы и видео — в тех же токенах",
    "sub": "Ассистент-маркетолог составил план? Тут же сгенерируй обложки, карусели и короткое видео. Без переключения между сервисами и подписками.",
    "images": { "h3": "Изображения", "caption": "Nano Banana, реалистично и быстро. Обложки, карусели, визуалы для соцсетей." },
    "video": { "h3": "Видео", "caption": "Kling 2.1. Короткие ролики из текста или картинки — рекламные креативы, превью, сторис." },
    "footer": "Работает в тех же токенах, что и ассистенты. Никаких отдельных подписок."
  },
  "how": {
    "eyebrow": "Как работает",
    "h2": "От SMS до первого результата — 3 минуты",
    "steps": [
      { "title": "Вход по SMS", "text": "Только номер телефона. Карта не нужна. +25 000 токенов в подарок." },
      { "title": "Разговор с ассистентом", "text": "Опиши задачу голосом или текстом. Профиль сам достроится." },
      { "title": "Запуск фичей", "text": "Обзвон, контент, договор — ассистент сделает и вернёт результат в чат." },
      { "title": "Рост", "text": "Ассистенты помнят контекст. Каждый следующий диалог качественнее." }
    ],
    "cta": "Начать бесплатно"
  },
  "useCases": {
    "eyebrow": "Для кого",
    "h2": "Бизнес-модели, где Linkeon заменяет команду",
    "items": [
      {
        "title": "Малый бизнес без штата",
        "text": "Один человек = вся компания. Linkeon = отдел маркетинга, бухгалтерия, юрист, продажи.",
        "benefits": ["Ассистенты как отдел", "Дозвон = аутсорс продаж", "Единый профиль компании"]
      },
      {
        "title": "Фрилансеры и соло-эксперты",
        "text": "Ты делаешь проекты, а вокруг — 100 мелких задач (договоры, соцсети, лиды). AI снимает их.",
        "benefits": ["Договоры за минуту", "Реклама для себя", "Больше времени на core-работу"]
      },
      {
        "title": "Маркетинговые агентства",
        "text": "Клиентов много, людей мало. AI звонит лидам, пишет рекламные тексты, генерит креативы.",
        "benefits": ["10× скорость кампаний", "AI-обзвон клиентов", "Видео и визуалы в одном окне"]
      }
    ]
  },
  "pricing": {
    "eyebrow": "Цены",
    "h2": "Платишь только за токены. Без подписок.",
    "sub": "Токены не сгорают. Пакет купил один раз — используешь когда нужно.",
    "plans": { "starter": "Стартовый", "extended": "Расширенный", "professional": "Профессиональный" },
    "tokens": "токенов",
    "messages": "сообщений",
    "per1000": "за 1000 токенов",
    "popular": "Популярный",
    "savings": "Экономия {{value}}",
    "cta": "Купить",
    "trust": { "yookassa": "Оплата через ЮKassa", "email": "Чек на e-mail", "gift": "25 000 токенов в подарок новым" }
  },
  "faq": {
    "eyebrow": "Вопросы",
    "h2": "Что важно знать перед стартом",
    "items": [
      { "q": "Что такое токены и как они расходуются?", "a": "Токены — внутренняя валюта. Списываются за каждый ответ ассистента, звонок Дозвона, сгенерированное изображение или секунду видео. Не сгорают." },
      { "q": "Сколько займёт подключение?", "a": "Вход по SMS, 2 минуты. На старте — 25 000 токенов, хватит попробовать все фичи." },
      { "q": "Мои диалоги — приватные?", "a": "Да. Доступ к профилю есть только у тебя. В настройках ты управляешь тем, что ассистенты запоминают." },
      { "q": "Как работает Дозвон юридически?", "a": "Звонки с номера +7 (495) 133-62-76. В начале разговора AI представляется как AI-ассистент. Запись разговора — у тебя." },
      { "q": "Голос Дозвона — мой или стандартный?", "a": "По умолчанию стандартный голос «Алексей». В настройках можно подключить клон собственного голоса (через ElevenLabs)." },
      { "q": "Можно ли отменить покупку токенов?", "a": "Не использованные токены возвращаем по заявке в поддержку в течение 14 дней." },
      { "q": "Есть ли API?", "a": "Пока нет. Готовим — напиши в поддержку, если интересно, ускорим." },
      { "q": "Как отличается от ChatGPT?", "a": "ChatGPT — один помощник. Linkeon — команда ассистентов с общим профилем + Дозвон + генерация визуалов и видео в одной оплате." }
    ]
  },
  "finalCta": {
    "h2": "Собери свой AI-отдел за 2 минуты",
    "sub": "Вход по SMS, 25 000 токенов в подарок, без карты",
    "ctaStart": "Начать бесплатно",
    "ctaLogin": "Войти",
    "trust": "Без подписок · без привязки карты · токены не сгорают"
  },
  "footer": {
    "tagline": "Нейросеть для роста и развития бизнеса",
    "sections": { "product": "Продукт", "company": "Компания", "legal": "Правовое" },
    "product": { "assistants": "AI-ассистенты", "dozvon": "Дозвон", "profile": "Единый профиль", "networking": "Networking", "pricing": "Цены" },
    "company": { "about": "О проекте", "blog": "Блог", "referral": "Реферальная программа", "support": "Поддержка" },
    "legal": { "privacy": "Политика конфиденциальности", "offer": "Оферта", "pdn": "Обработка ПДн" },
    "rights": "Все права защищены."
  }
}
```

- [ ] **Step 21.2: Полностью переписать src/i18n/locales/en.json**

Перевод спеки, точное соответствие ключей из ru.json. Ниже — готовый JSON:

```json
{
  "header": {
    "nav": { "features": "Features", "how": "How it works", "pricing": "Pricing", "faq": "FAQ" },
    "cta": { "login": "Log in", "start": "Start free" }
  },
  "hero": {
    "eyebrow": "AI for business growth",
    "h1Part1": "Your AI team,",
    "h1Rotating": ["outbound sales calls", "content creation", "legal consultations", "marketing strategy"],
    "h1Part2": "and a unified profile",
    "sub": "Six AI assistants (marketer, lawyer, accountant, HR, coach and Roman) that call clients, write content and grow with your business. One profile for everything.",
    "ctaStart": "Start free",
    "ctaLogin": "Log in",
    "trust": "25,000 tokens on the house · no card required · 2 minutes to sign up",
    "badge": { "title": "Outbound active", "status": "3 / 10 calls" }
  },
  "problem": {
    "eyebrow": "The problem",
    "h2": "There aren't enough hours in a day to grow your business",
    "items": [
      { "title": "Busywork eats your focus", "text": "Replying to clients, writing posts, drafting contracts, calling 20 companies — and suddenly you're not growing, you're firefighting." },
      { "title": "Hiring is slow and expensive", "text": "Marketer, lawyer, HR — that's an extra ₽300–500K/mo in payroll at an early stage." },
      { "title": "Ten tools, one context", "text": "ChatGPT, Notion, CRM, email — each knows a fragment about you, not the whole." }
    ],
    "footer": "Linkeon puts this in one product: AI assistants do the work, and your profile — the context — lives in one place."
  },
  "assistants": {
    "eyebrow": "AI Team",
    "h2": "Six assistants in one window",
    "sub": "Each an expert in their role. They remember your business, know about each other, respond by voice or text.",
    "list": [
      { "name": "Roman", "role": "Universal agent, does everything" },
      { "name": "Marketer", "role": "Launch plans, content, market analytics" },
      { "name": "Lawyer", "role": "Contracts, checklists, consultations" },
      { "name": "Accountant", "role": "Taxes, calculations, 1C statements" },
      { "name": "HR", "role": "Job posts, interview prompts, screening" },
      { "name": "Coach", "role": "Strategy, priorities, founder psychology" }
    ],
    "cta": "See all assistants"
  },
  "dozvon": {
    "eyebrow": "Outbound · unique",
    "h2": "AI calls your clients. On its own.",
    "sub": "Describe the task in text — AI finds contacts, calls, holds a natural conversation, records it and sends a summary. You get only the result.",
    "bullets": [
      "Finds companies and phone numbers for the task",
      "Calls by voice (cloned or standard)",
      "Handles objections and negotiates",
      "Records MP3 and delivers a summary to chat"
    ],
    "prompt": "find 10 BMW body shops in Moscow and ask how much a hood repaint on an X5 2020 would cost",
    "badges": { "time": "12 minutes", "calls": "10 calls", "recordings": "10 MP3 + summaries" }
  },
  "profile": {
    "eyebrow": "Unified profile",
    "h2": "One context — every assistant remembers",
    "sub": "Through your conversations Linkeon builds your profile: values, business, pain points, communication style. Every assistant starts not from zero, but with full understanding.",
    "bullets": [
      "Grows from every conversation",
      "Works across all assistants and Outbound",
      "You control what gets remembered",
      "Used to find partners by values"
    ]
  },
  "networking": {
    "eyebrow": "Networking",
    "h2": "Partners and experts who match your values",
    "sub": "A profile is not a resume. It's values, intent, style. Linkeon finds people who resonate with you — for partnerships, clients, hires, projects.",
    "legend": { "self": "Your profile", "values": "Values and intent", "matches": "Matches with others" },
    "cols": [
      { "title": "Partners", "text": "Co-founders and experts with a similar worldview." },
      { "title": "Clients", "text": "Those aligned with your meaning, not just price." },
      { "title": "Community", "text": "Events, calls, chats around interests." }
    ],
    "cta": "Open networking at my.linkeon.io"
  },
  "content": {
    "eyebrow": "Content engine",
    "h2": "Plus visuals and video — in the same tokens",
    "sub": "Your AI marketer wrote the plan? Generate covers, carousels and short videos right there. No switching between services and subscriptions.",
    "images": { "h3": "Images", "caption": "Nano Banana, realistic and fast. Covers, carousels, social visuals." },
    "video": { "h3": "Video", "caption": "Kling 2.1. Short clips from text or image — ad creatives, previews, stories." },
    "footer": "Runs on the same tokens as assistants. No separate subscriptions."
  },
  "how": {
    "eyebrow": "How it works",
    "h2": "From SMS to first result — 3 minutes",
    "steps": [
      { "title": "SMS sign-in", "text": "Just your phone number. No card. +25,000 tokens on the house." },
      { "title": "Talk to an assistant", "text": "Describe the task by voice or text. Your profile grows on its own." },
      { "title": "Launch features", "text": "Outbound, content, contract — the assistant does it and delivers to chat." },
      { "title": "Growth", "text": "Assistants remember context. Every next conversation is better." }
    ],
    "cta": "Start free"
  },
  "useCases": {
    "eyebrow": "Who it's for",
    "h2": "Business models where Linkeon replaces a team",
    "items": [
      {
        "title": "Small business, no staff",
        "text": "One person = the whole company. Linkeon = marketing department, accounting, legal, sales.",
        "benefits": ["Assistants as a department", "Outbound = outsourced sales", "Unified company profile"]
      },
      {
        "title": "Freelancers and solo experts",
        "text": "You do projects, with 100 small tasks around them (contracts, social, leads). AI takes them off.",
        "benefits": ["Contracts in a minute", "Ads for yourself", "More time for core work"]
      },
      {
        "title": "Marketing agencies",
        "text": "Many clients, few people. AI calls leads, writes ad copy, generates creatives.",
        "benefits": ["10× campaign speed", "AI outbound for clients", "Video and visuals in one place"]
      }
    ]
  },
  "pricing": {
    "eyebrow": "Pricing",
    "h2": "You only pay for tokens. No subscriptions.",
    "sub": "Tokens don't expire. Buy a pack once, use when needed.",
    "plans": { "starter": "Starter", "extended": "Extended", "professional": "Professional" },
    "tokens": "tokens",
    "messages": "messages",
    "per1000": "per 1000 tokens",
    "popular": "Popular",
    "savings": "Save {{value}}",
    "cta": "Buy",
    "trust": { "yookassa": "Pay via YooKassa", "email": "Receipt by email", "gift": "25,000 tokens on the house for new users" }
  },
  "faq": {
    "eyebrow": "Questions",
    "h2": "What to know before you start",
    "items": [
      { "q": "What are tokens and how are they spent?", "a": "Tokens are the internal currency. They're used for each assistant reply, Outbound call, generated image or second of video. They don't expire." },
      { "q": "How long does onboarding take?", "a": "SMS sign-in, 2 minutes. You start with 25,000 tokens, enough to try every feature." },
      { "q": "Are my conversations private?", "a": "Yes. Only you have access to your profile. In settings you control what assistants remember." },
      { "q": "How is Outbound legal?", "a": "Calls are from +7 (495) 133-62-76. At the start the AI introduces itself as an AI assistant. The recording is yours." },
      { "q": "Is the Outbound voice mine or standard?", "a": "By default the standard voice «Alexey» is used. In settings you can connect a clone of your own voice (via ElevenLabs)." },
      { "q": "Can I cancel a token purchase?", "a": "Unused tokens are refunded upon request to support within 14 days." },
      { "q": "Is there an API?", "a": "Not yet. We're working on it — ping support if you're interested, we'll speed things up." },
      { "q": "How is it different from ChatGPT?", "a": "ChatGPT is one helper. Linkeon is a team of assistants with a shared profile + Outbound + image and video generation in one bill." }
    ]
  },
  "finalCta": {
    "h2": "Assemble your AI department in 2 minutes",
    "sub": "SMS sign-in, 25,000 tokens on the house, no card",
    "ctaStart": "Start free",
    "ctaLogin": "Log in",
    "trust": "No subscriptions · no card required · tokens don't expire"
  },
  "footer": {
    "tagline": "Neural network for business growth",
    "sections": { "product": "Product", "company": "Company", "legal": "Legal" },
    "product": { "assistants": "AI assistants", "dozvon": "Outbound", "profile": "Unified profile", "networking": "Networking", "pricing": "Pricing" },
    "company": { "about": "About", "blog": "Blog", "referral": "Referral program", "support": "Support" },
    "legal": { "privacy": "Privacy policy", "offer": "Terms of service", "pdn": "Data processing" },
    "rights": "All rights reserved."
  }
}
```

- [ ] **Step 21.3: Визуальная проверка с переключением языка**

Run: `pnpm dev`
Переключить `LangSwitcher` RU → EN, проверить что все секции переводятся. Типичные провалы: нет ключа → i18next рисует ключ в квадратных скобках — искать и чинить.

- [ ] **Step 21.4: Commit**

```bash
git add -A
git commit -m "feat(i18n): full RU + EN content for all sections"
```

---

## Task 22: Capture-пайплайн (Playwright + ffmpeg)

Делаем автоматическую съёмку скриншотов и loop-видео из my.linkeon.io.

**Files:**
- Modify: `package.json` (добавить `@playwright/test`, `fluent-ffmpeg`, скрипт `capture`)
- Create: `scripts/capture.ts`
- Create: `public/screenshots/.gitkeep`

- [ ] **Step 22.1: Установить зависимости**

Run:
```bash
pnpm add -D @playwright/test @types/fluent-ffmpeg fluent-ffmpeg tsx
pnpm exec playwright install chromium
```

Expected: Playwright скачает Chromium в `~/Library/Caches/ms-playwright/`.

- [ ] **Step 22.2: Убедиться что ffmpeg установлен**

Run: `ffmpeg -version`
Expected: версия печатается.
Fail → `brew install ffmpeg`.

- [ ] **Step 22.3: Создать scripts/capture.ts**

```ts
import { chromium, type Page } from '@playwright/test';
import ffmpeg from 'fluent-ffmpeg';
import { mkdir, rename, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE = 'https://my.linkeon.io';
const TEST_PHONE = '79030169187';
const SCREENSHOTS_DIR = resolve(process.cwd(), 'public/screenshots');

async function loginViaSms(page: Page) {
  await page.goto(BASE);
  await page.waitForSelector('input[type="tel"], input[placeholder*="телефон" i]', { timeout: 15000 });
  await page.fill('input[type="tel"], input[placeholder*="телефон" i]', TEST_PHONE);
  await page.getByRole('button', { name: /получить|получить код|дальше/i }).click();

  // Wait a bit for OTP to be generated on backend
  await page.waitForTimeout(2000);

  const codeRes = await page.request.get(`${BASE}/webhook/debug/sms-code/${TEST_PHONE}`);
  if (!codeRes.ok()) throw new Error(`OTP endpoint ${codeRes.status()} — is DEBUG_SMS_CODES=true?`);
  const body = await codeRes.json();
  const code = String(body.code ?? body.otp ?? body);
  if (!/^\d{4,6}$/.test(code)) throw new Error(`Bad OTP payload: ${JSON.stringify(body)}`);

  // Fill OTP (inputs могут быть раздельными ячейками — заполняем по символу)
  const otpInputs = await page.locator('input[inputmode="numeric"], input[maxlength="1"]').all();
  if (otpInputs.length >= code.length) {
    for (let i = 0; i < code.length; i++) {
      await otpInputs[i].fill(code[i]);
    }
  } else {
    await page.fill('input[inputmode="numeric"]', code);
  }

  await page.waitForURL(/\/chat|\/search|\/profile/, { timeout: 20000 });
}

async function convertToMp4(webmPath: string, mp4Path: string, durationSec: number) {
  return new Promise<void>((resolveFn, rejectFn) => {
    ffmpeg(webmPath)
      .outputOptions([
        '-c:v libx264',
        '-crf 28',
        '-preset slow',
        '-movflags +faststart',
        '-an',
        `-t ${durationSec}`,
        '-vf scale=1280:-2',
      ])
      .on('end', () => resolveFn())
      .on('error', rejectFn)
      .save(mp4Path);
  });
}

async function captureStatic(page: Page, path: string, screenshot: string) {
  await page.goto(`${BASE}${path}`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: resolve(SCREENSHOTS_DIR, screenshot),
    type: 'webp',
    quality: 85,
    fullPage: false,
  });
  console.log(`  ✓ screenshot: ${screenshot}`);
}

async function captureVideo(page: Page, path: string, videoFile: string, action: () => Promise<void>, durationMs: number) {
  // Start recording by closing old page and opening new one with video recording
  const ctx = page.context();
  const recordingPage = await ctx.newPage();
  await recordingPage.goto(`${BASE}${path}`);
  await recordingPage.waitForLoadState('networkidle');
  await recordingPage.waitForTimeout(500);

  await action.call({ page: recordingPage });
  await recordingPage.waitForTimeout(durationMs);

  const videoHandle = recordingPage.video();
  await recordingPage.close();
  if (!videoHandle) throw new Error('video() handle unavailable');
  const webmPath = await videoHandle.path();

  const mp4Path = resolve(SCREENSHOTS_DIR, videoFile);
  await convertToMp4(webmPath, mp4Path, durationMs / 1000);
  await unlink(webmPath).catch(() => {});
  console.log(`  ✓ video: ${videoFile}`);
}

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: { dir: resolve(process.cwd(), '.playwright-video-tmp'), size: { width: 1280, height: 800 } },
  });

  const page = await context.newPage();
  console.log('→ logging in via SMS…');
  await loginViaSms(page);
  console.log('  ✓ logged in');

  // Static screenshots
  const STATIC_TARGETS = [
    { path: '/chat', file: 'hero-chat.webp' },
    { path: '/chat', file: 'assistants-list.webp' },
    { path: '/dozvon', file: 'dozvon-chat.webp' },
    { path: '/profile', file: 'profile.webp' },
    { path: '/image-gen', file: 'imagegen-1.webp' },
    { path: '/image-gen', file: 'imagegen-2.webp' },
    { path: '/image-gen', file: 'imagegen-3.webp' },
    { path: '/image-gen', file: 'imagegen-4.webp' },
  ];
  for (const t of STATIC_TARGETS) await captureStatic(page, t.path, t.file);

  // Video captures — simplified: record N seconds of passive scroll/state.
  // Real agent flows (typing, streaming) should be refined per section when wiring up.
  const VIDEO_TARGETS = [
    { path: '/chat', file: 'hero-loop.mp4', duration: 4000 },
    { path: '/chat', file: 'assistants-switch.mp4', duration: 5000 },
    { path: '/dozvon', file: 'dozvon-results.mp4', duration: 6000 },
    { path: '/video', file: 'video-sample.mp4', duration: 5000 },
  ];
  for (const t of VIDEO_TARGETS) {
    await captureVideo(page, t.path, t.file, async () => {}, t.duration);
  }

  await context.close();
  await browser.close();
  console.log('\n✅ Capture complete. Files in public/screenshots/');
}

main().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 22.4: Добавить скрипт в package.json**

В `"scripts"`:
```json
"capture": "tsx scripts/capture.ts"
```

- [ ] **Step 22.5: Создать public/screenshots/.gitkeep**

```bash
mkdir -p public/screenshots
touch public/screenshots/.gitkeep
```

- [ ] **Step 22.6: Обновить пути в видео/картинках в компонентах**

Сейчас в компонентах — `/screenshots/hero-loop.mp4` (без `public` — Vite сам резолвит `public/`). Убедиться что это так.

Grep-проверка:
```bash
grep -r '/screenshots/' src/
```
Expected: все пути начинаются с `/screenshots/…`.

- [ ] **Step 22.7: Запустить capture**

Run: `pnpm capture`
Expected:
- Логин проходит, пишет `✓ logged in`
- Появляются 8 статических WebP-файлов + 4 MP4-файла в `public/screenshots/`.
- Размер каждого MP4 ≤500 KB (если больше — в `convertToMp4` поднять CRF до 30).

**Частые сбои:**
- OTP endpoint 404 → на сервере не `DEBUG_SMS_CODES=true`. Попросить пользователя включить на DEV-бэке.
- Селекторы не находятся (layout поменялся) → подправить селекторы в `loginViaSms`.
- Видео больше 500 KB → в `convertToMp4` поменять `-crf 28` на `-crf 32`.

- [ ] **Step 22.8: Визуальная проверка**

Run: `pnpm dev`
Открыть страницу, убедиться что в Hero и других секциях видео проигрываются (autoplay muted loop).

- [ ] **Step 22.9: Commit**

```bash
git add scripts/capture.ts package.json pnpm-lock.yaml public/screenshots/
git commit -m "feat(assets): Playwright capture pipeline + initial screenshots/videos"
```

---

## Task 23: robots.txt, sitemap.xml, og-cover.jpg

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/og-cover.jpg` (от пользователя или генерим)

- [ ] **Step 23.1: Создать public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://linkeon.io/sitemap.xml
```

- [ ] **Step 23.2: Создать public/sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://linkeon.io/</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="https://linkeon.io/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://linkeon.io/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://linkeon.io/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 23.3: Сгенерировать og-cover.jpg**

Запустить Playwright-скрипт для снятия скриншота Hero 1200×630:

Создать одноразово `scripts/og.ts`:
```ts
import { chromium } from '@playwright/test';
import { resolve } from 'node:path';

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: resolve(process.cwd(), 'public/og-cover.jpg'), type: 'jpeg', quality: 85, fullPage: false, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log('og-cover.jpg saved');
}
main();
```

Запустить:
```bash
pnpm dev &
sleep 5
pnpm tsx scripts/og.ts
kill %1
```

- [ ] **Step 23.4: Commit**

```bash
git add public/robots.txt public/sitemap.xml public/og-cover.jpg scripts/og.ts
git commit -m "feat(seo): robots.txt, sitemap.xml, og-cover.jpg"
```

---

## Task 24: Yandex Metrika click-tracking через data-cta

Глобальный слушатель кликов → `ym(105902201, 'reachGoal', dataCta)`.

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 24.1: Добавить листенер в main.tsx**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

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
  if (!goal || !window.ym) return;
  window.ym(105902201, 'reachGoal', goal);
}, { capture: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 24.2: Проверить в dev**

Run: `pnpm dev`
Открыть DevTools Console, кликнуть на primary CTA Hero. Должно появиться в запросах к `mc.yandex.ru/watch/…/reachGoal/hero-start` (или увидеть в Network tab на `yandex.ru`).

- [ ] **Step 24.3: Commit**

```bash
git add src/main.tsx
git commit -m "feat(analytics): Yandex Metrika reachGoal via data-cta"
```

---

## Task 25: Smoke-тест Playwright

E2E-проверка: лендинг открывается, ключевые CTA ведут на my.linkeon.io, language toggle работает.

**Files:**
- Create: `tests/smoke.spec.ts`
- Modify: `package.json` (скрипт `test`)

- [ ] **Step 25.1: Создать tests/smoke.spec.ts**

```ts
import { test, expect } from '@playwright/test';

const PREVIEW = 'http://localhost:4173';

test.describe('landing smoke', () => {
  test('hero is visible and CTAs link to my.linkeon.io', async ({ page }) => {
    await page.goto(PREVIEW);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const heroStart = page.locator('[data-cta="hero-start"]');
    await expect(heroStart).toBeVisible();
    await expect(heroStart).toHaveAttribute('href', 'https://my.linkeon.io');
  });

  test('pricing section renders 3 packages with correct prices', async ({ page }) => {
    await page.goto(`${PREVIEW}#pricing`);
    await expect(page.locator('[data-cta="pricing-starter"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-extended"]')).toBeVisible();
    await expect(page.locator('[data-cta="pricing-professional"]')).toBeVisible();
    await expect(page.getByText('149')).toBeVisible();
    await expect(page.getByText('499')).toBeVisible();
    await expect(page.getByText('1 990', { exact: false })).toBeVisible();
  });

  test('FAQ has 8 questions', async ({ page }) => {
    await page.goto(`${PREVIEW}#faq`);
    const details = page.locator('#faq details');
    await expect(details).toHaveCount(8);
  });

  test('language switch toggles EN texts', async ({ page }) => {
    await page.goto(PREVIEW);
    const switcher = page.locator('[data-testid="lang-switcher"]').first();
    await switcher.getByText('EN').click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Your AI team/i);
  });
});
```

- [ ] **Step 25.2: Создать playwright.config.ts**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'pnpm build && pnpm preview --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

- [ ] **Step 25.3: Добавить script в package.json**

```json
"test": "playwright test"
```

- [ ] **Step 25.4: Запустить тесты**

Run: `pnpm test`
Expected: `4 passed`.

- [ ] **Step 25.5: Commit**

```bash
git add tests/smoke.spec.ts playwright.config.ts package.json pnpm-lock.yaml
git commit -m "test: Playwright smoke tests for landing"
```

---

## Task 26: Responsive + Lighthouse sanity pass

Фикс проблем с мобильными и проверка Lighthouse целей (≥90 Performance/SEO/Accessibility).

- [ ] **Step 26.1: Ручная проверка responsive**

Run: `pnpm dev`
В DevTools переключиться на Responsive, проверить breakpoints:
- 320px (iPhone SE) — всё читаемо, нет горизонтального скролла, CTA кликабельны.
- 768px (iPad portrait) — grid переключается на md:, секции выровнены.
- 1024px (laptop) — lg: классы включаются, двухколонные layouts работают.
- 1440px (desktop) — max-w-6xl центрирован.

Если нашли проблему — фикс в соответствующем компоненте, переcommit.

- [ ] **Step 26.2: Запустить Lighthouse**

Run:
```bash
pnpm build
pnpm preview --port 4173 &
sleep 3
pnpm dlx lighthouse http://localhost:4173 --preset=desktop --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=./lighthouse-desktop.json --chrome-flags="--headless"
kill %1
```

Expected: scores ≥90 на всех 4 категориях. Mobile profile — отдельно:
```bash
pnpm preview --port 4173 &
sleep 3
pnpm dlx lighthouse http://localhost:4173 --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=./lighthouse-mobile.json --chrome-flags="--headless"
kill %1
```

- [ ] **Step 26.3: Типичные проблемы и фиксы**

| Проблема | Фикс |
|---|---|
| Performance <90 из-за тяжёлых видео | Пересжать: `convertToMp4` с `-crf 32`, `-vf scale=960:-2` |
| Accessibility <90 | Убедиться что у всех CTA есть текст внутри, у декоративных изображений `alt=""` и `aria-hidden="true"` |
| SEO <95 | Проверить что `<html lang>` задан, meta description не пустой, heading hierarchy без пропусков |
| Best Practices <95 | Браузерный console — нет ошибок и deprecated API |

- [ ] **Step 26.4: Commit (если были фиксы)**

```bash
git add -A
git commit -m "perf: lighthouse optimizations — compress videos, fix a11y"
```

---

## Task 27: Деплой на prod

- [ ] **Step 27.1: Финальная сборка**

Run: `pnpm build`
Expected: `dist/` создаётся, в отчёте Vite видно имена чанков, бандл JS ≤150 KB gzip.

- [ ] **Step 27.2: Rsync на сервер**

Run:
```bash
rsync -az --delete dist/ dvolkov@212.113.106.202:/home/dvolkov/land_linkeon/dist/
```

- [ ] **Step 27.3: Проверить live**

Run: `curl -sI https://linkeon.io/ | head`
Expected: `HTTP/1.1 200 OK`, `Cache-Control: no-cache`, `Last-Modified` — свежая дата.

Открыть `https://linkeon.io` в браузере, убедиться:
- Hero виден, typewriter работает
- Скролл по секциям плавный, anchor-ссылки работают
- Pricing показывает 149/499/1990 ₽
- Переключатель RU/EN меняет язык
- CTA ведут на `https://my.linkeon.io`

- [ ] **Step 27.4: Push в origin**

```bash
git push origin main
```

- [ ] **Step 27.5: Обновить OG preview на соцсетях**

Telegram: `@BotFather` → `/revoke_preview` для `linkeon.io`, или просто подождать ~24ч пока кэш обновится.
VK: https://vk.com/dev/pages.clearCache (передать URL).
Facebook: https://developers.facebook.com/tools/debug/ → Fetch new scrape.

---

## Self-Review

Прогоняю план против спеки:

**Spec coverage:**
- ✅ Все 13 секций (Header, Hero, Problem, Assistants, Dozvon, Profile, Networking+ValueGraph, ContentEngine, HowItWorks, UseCases, Pricing, FAQ, FinalCTA, Footer) покрыты тасками 6–19.
- ✅ Визуальная система (палитра, шрифты, primitives) — Tasks 2, 4, 5.
- ✅ i18n RU+EN — Tasks 3, 21.
- ✅ Real screenshots + loop videos через Playwright — Task 22.
- ✅ data-cta attributes + Metrika goal tracking — Button компонент (Task 4) + global listener (Task 24).
- ✅ SEO (meta, OG, robots, sitemap) — Tasks 2, 23.
- ✅ Performance / Accessibility — Task 26.
- ✅ Smoke test — Task 25.
- ✅ Deploy — Task 27.

**Placeholder scan:** Поиск «TBD», «TODO», «implement later» — чисто, нет.

**Type consistency:** Button принимает `dataCta`; во всех вызовах — `dataCta="..."`. Section принимает `id`, используется в Pricing/FAQ/HowItWorks/Assistants. ScreenshotFrame принимает `url` + optional `aspect` — используется везде. `useInView` возвращает `[ref, inView] as const` — используется в FadeIn и ValueGraph. OK.

**Единственное допущение, про которое нужно помнить агенту:**
- Task 22 (capture) полагается на работающий `DEBUG_SMS_CODES=true` на DEV-бэке. Если endpoint не работает — агент должен сообщить пользователю, чтобы тот включил флаг, а не «нагенерировать» плейсхолдерные скриншоты.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-23-linkeon-landing-redesign.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — Я дистрибучу по свежему субагенту на каждый таск, ревью между тасками, быстрая итерация. Подходит для больших планов как этот (27 тасков).

**2. Inline Execution** — Выполняю таски в текущей сессии через `executing-plans`, с чекпоинтами для ревью. Держит контекст, но расходует токены в этой сессии.

**Какой подход?**
