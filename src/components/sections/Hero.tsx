import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import GradientOrb from '../ui/GradientOrb';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';
import { useTypewriter } from '../../lib/useTypewriter';
import { appUrl } from '../../lib/appUrl';


export default function Hero() {
  const { t, i18n } = useTranslation();
  const phrases = useMemo(
    () => t('hero.h1Rotating', { returnObjects: true }) as string[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  );
  const rotating = useTypewriter({ phrases });
  const longest = useMemo(
    () => phrases.reduce((acc, p) => (p.length > acc.length ? p : acc), ''),
    [phrases]
  );

  // Сегментный первый экран: ссылка из рекламной кампании несёт ?seg=<персона>,
  // и hero говорит сразу на языке этой персоны (biz — юрист/бухгалтер/маркетолог;
  // creator — контент: тексты/картинки/видео/SMM), чтобы обещание объявления
  // совпадало с лендингом. Цены/CTA те же — отличается только подача (f070368b).
  // seg влияет только на отображение — utm в app пробрасывается как обычно.
  const SEGMENTS = ['biz', 'creator', 'assistant', 'video'];
  const rawSeg = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('seg')
    : null;
  const segKey = rawSeg && SEGMENTS.includes(rawSeg) ? rawSeg : null;
  // Динамический ключ i18n под выбранный сегмент (ключи hero.biz.* / hero.creator.*).
  const segT = (suffix: string): string => t(`hero.${segKey}.${suffix}` as never);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen pt-24 md:pt-28 pb-16 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <div className="relative z-10 min-w-0">
          <FadeIn>
            <Eyebrow className="mb-6">{segKey ? segT('eyebrow') : t('hero.eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={80}>
            {segKey ? (
              <h1
                id="hero-title"
                className="text-[2rem] leading-tight sm:text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6 text-balance"
              >
                {segT('h1Part1')}{' '}
                <span className="text-brand-700">{segT('h1Accent')}</span>{' '}
                {segT('h1Part2')}
              </h1>
            ) : (
              <h1
                id="hero-title"
                className="text-[2rem] leading-tight sm:text-5xl md:text-7xl font-semibold tracking-tight text-gray-900 mb-6 text-balance"
              >
                {t('hero.h1Part1')}{' '}
                <span className="relative inline-grid align-baseline text-brand-700 max-w-full">
                  {/* Invisible longest phrase reserves layout space → no CLS. On mobile allow wrap (normal), desktop keeps single-line pre */}
                  <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-normal sm:whitespace-pre break-words">
                    {longest}
                  </span>
                  <span className="col-start-1 row-start-1 whitespace-normal sm:whitespace-pre break-words">
                    {rotating}
                    <span className="inline-block w-0.5 h-[0.9em] bg-brand-700 align-middle ml-0.5 animate-pulse" />
                  </span>
                </span>{' '}
                {t('hero.h1Part2')}
              </h1>
            )}
          </FadeIn>
          <FadeIn delay={160}>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">{segKey ? segT('sub') : t('hero.sub')}</p>
          </FadeIn>
          <FadeIn delay={220}>
            {/* Один основной CTA для холодного трафика: вторая кнопка «Войти»
                размывала действие (у холодного юзера ещё нет аккаунта) — вход
                остаётся в шапке. Risk-reversal двигаем прямо под кнопку — в точку
                принятия решения, чтобы снять страх коммитмента. */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Button variant="primary" size="lg" href={appUrl()} dataCta="hero-start">{segKey ? segT('ctaStart') : t('hero.ctaStart')}</Button>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-6">{t('hero.trust')}</p>
          </FadeIn>
          <FadeIn delay={260}>
            {(() => {
              // as never — тот же приём, что и в segT выше: ключ здесь юнион
              // литерала и шаблонного типа, и overload t() на нём не сходится.
              const chipsKey = (segKey ? `hero.${segKey}.chips` : 'hero.chips') as never;
              const chips = t(chipsKey, { returnObjects: true }) as unknown;
              return Array.isArray(chips) && chips.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {(chips as string[]).map((c) => (
                    <span key={c} className="text-sm text-gray-700 bg-gray-100 rounded-full px-3 py-1">{c}</span>
                  ))}
                </div>
              ) : null;
            })()}
          </FadeIn>
          <FadeIn delay={280}>
            <p className="text-sm text-gray-500">{t('hero.privacy')}</p>
          </FadeIn>
        </div>

        <FadeIn delay={320}>
          <div className="relative">
            <GradientOrb className="-top-20 -right-10" size={500} />
            <ScreenshotFrame url="my.linkeon.io/chat">
              <video
                src="/screenshots/hero-loop.mp4"
                poster="/screenshots/hero-chat.webp"
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full object-cover bg-gray-100"
                aria-hidden="true"
              >
                <img src="/screenshots/hero-chat.webp" alt="" className="w-full h-full object-cover" />
              </video>
            </ScreenshotFrame>
            <div className="absolute -bottom-6 left-2 sm:-left-4 bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{t('hero.badge.title')}</p>
                <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
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
