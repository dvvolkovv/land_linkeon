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
    <Section id="dozvon" ariaLabelledby="dozvon-heading" className="bg-white border-y border-slate-200">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <FadeIn className="order-2 lg:order-1">
          <ScreenshotFrame url="my.linkeon.io/dozvon">
            <video
              src="/screenshots/dozvon-results.mp4"
              poster="/screenshots/dozvon-chat.webp"
              autoPlay muted loop playsInline preload="none"
              className="w-full h-full object-cover bg-slate-100"
              aria-hidden="true"
            >
              <img src="/screenshots/dozvon-chat.webp" alt="" className="w-full h-full object-cover" />
            </video>
          </ScreenshotFrame>
        </FadeIn>

        <FadeIn delay={160} className="order-1 lg:order-2">
          <Eyebrow className="mb-4">{t('dozvon.eyebrow')}</Eyebrow>
          <h2 id="dozvon-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
            {t('dozvon.h2')}
          </h2>
          <p className="text-lg text-slate-600 mb-6 max-w-xl">{t('dozvon.sub')}</p>

          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="min-w-0 break-words text-slate-700">{b}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-start gap-2 mb-4">
              <span aria-hidden="true" className="font-mono text-slate-400 text-sm select-none mt-0.5">→</span>
              <code className="min-w-0 break-words font-mono text-sm text-slate-700 leading-relaxed">{t('dozvon.prompt')}</code>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Clock aria-hidden="true" className="w-3.5 h-3.5" /> {t('dozvon.badges.time')}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Phone aria-hidden="true" className="w-3.5 h-3.5" /> {t('dozvon.badges.calls')}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <Headphones aria-hidden="true" className="w-3.5 h-3.5" /> {t('dozvon.badges.recordings')}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
