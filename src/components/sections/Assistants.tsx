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
    <Section id="features" ariaLabelledby="assistants-heading">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <Eyebrow className="mb-4">{t('assistants.eyebrow')}</Eyebrow>
          <h2 id="assistants-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
            {t('assistants.h2')}
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl">{t('assistants.sub')}</p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {list.map((a, i) => {
              const Icon = ICONS[i];
              return (
                <div key={a.name} className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Icon aria-hidden="true" className="w-5 h-5 text-indigo-600" />
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
            {t('assistants.cta')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </a>
        </FadeIn>

        <FadeIn delay={160}>
          <ScreenshotFrame url="my.linkeon.io/chat">
            <video
              src="/screenshots/assistants-switch.mp4"
              poster="/screenshots/assistants-list.webp"
              autoPlay muted loop playsInline preload="none"
              className="w-full h-full object-cover bg-slate-100"
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
