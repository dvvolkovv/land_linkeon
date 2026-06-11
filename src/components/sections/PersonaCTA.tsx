import { useTranslation } from 'react-i18next';
import { Briefcase, PenTool, HeartHandshake, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';

// CRO-секция под персоны с наибольшим ARPPU (бэклог 1a5adfbc). Каждый блок ведёт
// на приложение с проброшенной UTM-меткой + своим utm_content, чтобы видеть,
// какой оффер конвертит (атрибуция d5245dce).
const CARDS = [
  { key: 'business', Icon: Briefcase,    utm: 'cta_business' },
  { key: 'creator',  Icon: PenTool,      utm: 'cta_creator' },
  { key: 'personal', Icon: HeartHandshake, utm: 'cta_personal' },
] as const;

export default function PersonaCTA() {
  const { t } = useTranslation();

  return (
    <Section id="for-you" ariaLabelledby="personacta-heading">
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Eyebrow className="mb-4 justify-center">{t('personaCta.eyebrow')}</Eyebrow>
          <h2 id="personacta-heading" className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance">
            {t('personaCta.h2')}
          </h2>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-5">
        {CARDS.map(({ key, Icon, utm }, i) => (
          <FadeIn key={key} delay={i * 120}>
            <div className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <Icon aria-hidden="true" className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{t(`personaCta.cards.${key}.title`)}</h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">{t(`personaCta.cards.${key}.text`)}</p>
              <a
                href={appUrl('/', { utm_content: utm })}
                data-cta={`persona-${key}`}
                className="mt-5 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
              >
                {t(`personaCta.cards.${key}.cta`)} <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Социальное доказательство — честные цифры из БД (16 ассистентов) */}
      <FadeIn delay={400}>
        <p className="mt-8 text-center text-sm text-slate-500">{t('personaCta.social')}</p>
      </FadeIn>
    </Section>
  );
}
