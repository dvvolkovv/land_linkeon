import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import { DEFAULT_LANGUAGE } from '../../i18n/languages';

/**
 * Мультфильм «Чем Linkeon отличается от обычного чата» (1:42).
 *
 * Сам ролик — отдельная страница-плеер в public/cartoon/: её собирает
 * репозиторий linkeon_cartoon (Remotion Player, `pnpm web:build`), сюда
 * кладётся готовый dist. Встроена iframe'ом: движок мультфильма и его клипы
 * не попадают в бандл лендинга, а loading="lazy" не грузит плеер, пока
 * секция далеко от экрана.
 *
 * Только русская версия: озвучка и все надписи в мультфильме русские.
 * Язык берём из i18n.language (запрошенный по URL), а не resolvedLanguage:
 * пока грузится чанк чужой локали, resolvedLanguage на миг равен ru, и
 * секция мелькнула бы на /en/.
 *
 * На узком экране рамка вертикальная (9:16): плеер внутри сам выбирает
 * вертикальную раскладку по форме своего окна.
 */
export default function Cartoon() {
  const { t, i18n } = useTranslation();
  if (i18n.language !== DEFAULT_LANGUAGE) return null;

  return (
    <Section id="cartoon" ariaLabelledby="cartoon-heading" className="bg-paper-100">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Eyebrow className="mb-4 justify-center">{t('cartoon.eyebrow')}</Eyebrow>
          <h2 id="cartoon-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 text-balance">
            {t('cartoon.h2')}
          </h2>
          <p className="text-lg text-paper-700 mt-4">{t('cartoon.sub')}</p>
        </div>
      </FadeIn>
      <FadeIn delay={120}>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#0f1424] shadow-xl aspect-[9/16] max-h-[85vh] sm:aspect-video sm:max-h-none">
          <iframe
            src="/cartoon/"
            title={t('cartoon.frameTitle')}
            loading="lazy"
            allow="autoplay; fullscreen"
            allowFullScreen
            data-testid="cartoon-frame"
            className="block h-full w-full border-0"
          />
        </div>
      </FadeIn>
    </Section>
  );
}
