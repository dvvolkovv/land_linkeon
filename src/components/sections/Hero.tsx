import { useMemo } from 'react';
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

  return (
    <section
      aria-labelledby="hero-title"
      className="relative min-h-screen pt-24 md:pt-28 pb-16 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="relative z-10 min-w-0">
          <FadeIn>
            <Eyebrow className="mb-6">{t('hero.eyebrow')}</Eyebrow>
          </FadeIn>
          <FadeIn delay={80}>
            <h1
              id="hero-title"
              className="text-[2rem] leading-tight sm:text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-6 text-balance"
            >
              {t('hero.h1Part1')}{' '}
              <span className="relative inline-grid align-baseline text-indigo-600 max-w-full">
                {/* Invisible longest phrase reserves layout space → no CLS. On mobile allow wrap (normal), desktop keeps single-line pre */}
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-normal sm:whitespace-pre break-words">
                  {longest}
                </span>
                <span className="col-start-1 row-start-1 whitespace-normal sm:whitespace-pre break-words">
                  {rotating}
                  <span className="inline-block w-0.5 h-[0.9em] bg-indigo-600 align-middle ml-0.5 animate-pulse" />
                </span>
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

        <FadeIn delay={320}>
          <div className="relative">
            <GradientOrb className="-top-20 -right-10" size={500} />
            <ScreenshotFrame url="my.linkeon.io/chat">
              <video
                src="/screenshots/hero-loop.mp4"
                poster="/screenshots/hero-chat.webp"
                autoPlay muted loop playsInline preload="metadata"
                className="w-full h-full object-cover bg-slate-100"
                aria-hidden="true"
              >
                <img src="/screenshots/hero-chat.webp" alt="" className="w-full h-full object-cover" />
              </video>
            </ScreenshotFrame>
            <div className="absolute -bottom-6 left-2 sm:-left-4 bg-white border border-slate-200 rounded-xl shadow-lg p-3 flex items-center gap-3">
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
