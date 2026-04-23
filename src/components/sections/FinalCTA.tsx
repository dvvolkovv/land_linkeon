import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import GradientOrb from '../ui/GradientOrb';
import FadeIn from '../ui/FadeIn';

const LOGIN_URL = 'https://my.linkeon.io';

export default function FinalCTA() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="final-cta-heading" className="px-6 py-16 md:py-24">
      <FadeIn className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white text-center py-20 px-8">
          <GradientOrb className="-top-40 left-1/2 -translate-x-1/2" size={800} from="from-pink-300" to="to-indigo-400" opacity={0.3} />
          <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-balance">
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
