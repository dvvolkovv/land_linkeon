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
    <Section id="content" ariaLabelledby="content-heading">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('content.eyebrow')}</Eyebrow>
        <h2 id="content-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 text-balance">
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
              my.linkeon.io/image-gen <ArrowRight aria-hidden="true" className="w-4 h-4" />
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
                  autoPlay muted loop playsInline preload="none"
                  className="w-full h-full object-cover bg-slate-100"
                  aria-hidden="true"
                />
              </ScreenshotFrame>
            </div>
            <a href="https://my.linkeon.io/video" data-cta="content-video" className="mt-5 inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold" target="_blank" rel="noopener noreferrer">
              my.linkeon.io/video <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
          </Card>
        </FadeIn>
      </div>

      <p className="text-center text-sm text-slate-500 mt-10">{t('content.footer')}</p>
    </Section>
  );
}
