import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';

export default function Hero() {
  const { t, i18n } = useTranslation();

  // Сегментный первый экран: ссылка из рекламной кампании несёт ?seg=<персона>,
  // и hero говорит сразу на языке этой персоны. Цены/CTA те же — отличается
  // только подача (f070368b). seg влияет только на отображение.
  const SEGMENTS = ['biz', 'creator', 'assistant', 'video'];
  const rawSeg = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('seg')
    : null;
  const segKey = rawSeg && SEGMENTS.includes(rawSeg) ? rawSeg : null;
  // Ключ сегмента с запасным базовым. Массив нужен ровно для trust/privacy/
  // badge.*: их нет ни под одним сегментом ни в одной локали, и без запасного
  // ключа на странице отрисовалось бы имя ключа. На «ключ есть в ru, но нет в
  // переводе» этот массив не отвечает: i18next перебирает ключ-мажорно —
  // сначала первый ключ по всей цепочке языков (перевод → ru), и только если
  // его нигде нет, берётся второй. То есть недостающий сегментный ключ
  // отдаст русский текст, а не базовый на своём языке; от этого стережёт
  // check-locales. as never — t() не сводит overload на шаблонном типе ключа.
  const heroT = (suffix: string): string => {
    const keys = segKey ? [`hero.${segKey}.${suffix}`, `hero.${suffix}`] : [`hero.${suffix}`];
    return t(keys as never);
  };

  // Заголовок склеивается из двух частей, вторая — акцентная. В языках со
  // словесным пробелом их разделяет пробел; в китайском такой разделитель —
  // видимая дыра посреди самого крупного текста на странице, а перенос строки
  // CJK делает по любому знаку, так что разделитель не нужен.
  //
  // Именно resolvedLanguage, не language: language — это ЗАПРОШЕННЫЙ язык.
  // main.tsx рендерит синхронно, пока ./i18n ещё грузит чанк локали (в бандле
  // лежит только ru), и в этом окне language уже 'zh', а t() отдаёт русский
  // фолбэк — русский заголовок склеился бы без пробела. Если чанк не доедет
  // вовсе (офлайн, прокси), это состояние станет постоянным: i18n/index.ts
  // написан так, чтобы страница оставалась читаемой. Тот же приём — в
  // lib/appUrl.ts.
  const h1Separator = (i18n.resolvedLanguage ?? i18n.language ?? '').startsWith('zh') ? '' : ' ';

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen pt-24 md:pt-28 pb-16 overflow-x-clip bg-paper-100"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <div className="relative z-10 min-w-0">
          <FadeIn>
            <Eyebrow className="mb-6">{heroT('eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={80}>
            <h1
              id="hero-title"
              className="text-[2rem] leading-[1.2] sm:text-5xl md:text-6xl font-medium tracking-tight text-paper-900 mb-6 text-balance"
            >
              {heroT('h1')}{h1Separator}
              <span className="text-brand-700">{heroT('h1Accent')}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg md:text-xl leading-relaxed text-paper-700 max-w-xl mb-8">{heroT('sub')}</p>
          </FadeIn>
          <FadeIn delay={220}>
            {/* Один основной CTA для холодного трафика: вторая кнопка «Войти»
                размывала действие — вход остаётся в шапке. Risk-reversal стоит
                прямо под кнопкой, в точке принятия решения. */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Button variant="primary" size="lg" href={appUrl()} dataCta="hero-start">{heroT('ctaStart')}</Button>
            </div>
            <p className="text-sm text-paper-600 mb-6">{heroT('trust')}</p>
          </FadeIn>
          <FadeIn delay={280}>
            <p className="text-sm text-paper-600">{heroT('privacy')}</p>
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
                <p className="text-xs text-paper-600">{heroT('badge.title')}</p>
                <p className="text-sm font-semibold text-paper-900 flex items-center gap-2">
                  {heroT('badge.status')}
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
