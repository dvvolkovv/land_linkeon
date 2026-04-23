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
    <Section id="profile" ariaLabelledby="profile-heading">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <FadeIn>
          <Eyebrow className="mb-4">{t('profile.eyebrow')}</Eyebrow>
          <h2 id="profile-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
            {t('profile.h2')}
          </h2>
          <p className="text-lg text-slate-600 mb-6 max-w-xl">{t('profile.sub')}</p>
          <ul className="space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 aria-hidden="true" className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="min-w-0 break-words text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={160}>
          <ScreenshotFrame url="my.linkeon.io/profile">
            <img
              src="/screenshots/profile.webp"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover bg-slate-100"
            />
          </ScreenshotFrame>
        </FadeIn>
      </div>
    </Section>
  );
}
