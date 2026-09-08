import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';


export default function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="final-cta-heading" className="px-6 py-16 md:py-24">
      <FadeIn className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 text-white text-center py-20 px-8">
          <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-balance">
            {t('finalCta.h2')}
          </h2>
          <p className="text-lg text-brand-100 max-w-xl mx-auto mt-4">{t('finalCta.sub')}</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" size="lg" href={appUrl()} dataCta="final-start" className="!bg-white !text-brand-800 !shadow-none hover:!bg-gray-100 hover:!shadow-xl">
              {t('finalCta.ctaStart')}
            </Button>
            <Button variant="outline" size="lg" href={appUrl()} dataCta="final-login" className="!bg-transparent !border-white !text-white hover:!bg-white/10 hover:!border-white">
              {t('finalCta.ctaLogin')}
            </Button>
          </div>

          <p className="text-sm text-brand-200 mt-8">{t('finalCta.trust')}</p>
        </div>
      </FadeIn>
    </section>
  );
}
