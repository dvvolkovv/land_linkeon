import { useTranslation } from 'react-i18next';
import { Bot, Megaphone, Scale, Calculator, UserCheck, Compass, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';

const ICONS = [Bot, Megaphone, Scale, Calculator, UserCheck, Compass];

export default function Assistants() {
  const { t } = useTranslation();
  const list = t('assistants.list', { returnObjects: true }) as { name: string; role: string; quote: string }[];

  return (
    <Section id="features" ariaLabelledby="assistants-heading">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <FadeIn>
          <Eyebrow className="mb-4">{t('assistants.eyebrow')}</Eyebrow>
          <h2 id="assistants-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance">
            {t('assistants.h2')}
          </h2>
          <p className="text-lg text-paper-700 mb-8 max-w-xl">{t('assistants.sub')}</p>

          <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,minmax(0,1fr))] gap-3 mb-8">
            {list.map((a, i) => {
              const Icon = ICONS[i];
              return (
                <div key={a.name} className="min-w-0 flex flex-col gap-2 p-4 rounded-xl border border-paper-300 bg-paper-50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <Icon aria-hidden="true" className="w-5 h-5 text-brand-700" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-paper-900">{a.name}</p>
                      <p className="text-xs text-paper-600 leading-snug">{a.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-paper-800 leading-relaxed">«{a.quote}»</p>
                </div>
              );
            })}
          </div>

          <a href={appUrl()} data-cta="assistants-link" className="inline-flex items-center gap-1 py-2 min-h-11 text-brand-800 hover:text-brand-900 font-semibold text-sm">
            {t('assistants.cta')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </FadeIn>

        <FadeIn delay={160}>
          <ScreenshotFrame url="my.linkeon.io/chat">
            <video
              src="/screenshots/assistants-switch.mp4"
              poster="/screenshots/assistants-list.webp"
              autoPlay muted loop playsInline preload="none"
              className="w-full h-full object-cover bg-paper-200"
              aria-hidden="true"
            >
              <img src="/screenshots/assistants-list.webp" alt="" className="w-full h-full object-cover" />
            </video>
          </ScreenshotFrame>
        </FadeIn>
      </div>
    </Section>
  );
}
