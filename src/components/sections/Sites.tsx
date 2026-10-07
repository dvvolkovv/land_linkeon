import { useTranslation } from 'react-i18next';
import { Check, Lock } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';
import Button from '../ui/Button';
import { appUrl } from '../../lib/appUrl';
import { rentInterpolation } from '../../content/products';

interface Term {
  title: string;
  text: string;
}

// Переводчик может уронить ключ, и .map() по строке уронил бы всю страницу и
// пререндер (границы ошибок над секцией нет) — как в Features, пустой список
// вместо падения.
const asList = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

/**
 * Сайты и телеграм-боты, которые Linkeon хостит, а ассистент собирает и правит
 * по словам владельца (в кабинете — Студия → Продукты).
 *
 * Каждое утверждение секции сверено с продуктом — таблица источников в
 * docs/superpowers/specs/2026-10-06-sites-section-design.md. Там же список
 * того, чего писать нельзя: «любой ассистент», правки через телеграм-бота
 * Linkeon, «магазин», автоматический откат «если не понравилось».
 *
 * Иллюстрации нарисованы, а не сняты с настоящего продукта: их текст
 * переводится вместе с локалью. В адресной строке — заглушка своего домена, а
 * не адрес на c.linkeon.io: такой слаг мог бы занять кто угодно, и под нашим
 * примером на нашем же домене открылся бы чужой сайт. Заглушки вроде
 * your-domain.com где-то существуют, но это не ссылка, и иллюстрация скрыта от
 * скринридеров.
 *
 * Фон тёплый: соседи холодные — ContentEngine идёт по фону страницы,
 * HowItWorks белый, и серая или белая полоса слилась бы с одним из них.
 */
export default function Sites() {
  const { t, i18n } = useTranslation();
  const rent = rentInterpolation(i18n.language);

  return (
    <Section id="sites" ariaLabelledby="sites-heading" className="bg-paper-100">
      <FadeIn className="text-center mb-12 max-w-2xl mx-auto">
        <Eyebrow className="mb-4">{t('sites.eyebrow')}</Eyebrow>
        <h2
          id="sites-heading"
          className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance"
        >
          {t('sites.h2')}
        </h2>
        <p className="text-lg text-paper-700 leading-relaxed">{t('sites.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6 min-w-0 [&>*]:min-w-0">
        <FadeIn>
          <div
            data-testid="sites-card-site"
            className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-paper-900 mb-1">{t('sites.site.title')}</h3>
            <p className="text-sm text-paper-600 mb-5">{t('sites.site.kinds')}</p>
            <div aria-hidden="true" className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-2">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="ml-2 inline-flex min-w-0 items-center gap-1 rounded-md bg-white px-2 py-0.5 font-mono text-xs text-gray-500">
                  <Lock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{t('sites.site.mock.url')}</span>
                </span>
              </div>
              <div className="bg-paper-100 p-4 text-sm text-paper-800">
                <p className="text-base font-semibold text-paper-900 mb-2">{t('sites.site.mock.name')}</p>
                {asList<string>(t('sites.site.mock.lines', { returnObjects: true })).map((line) => (
                  <p key={line} className="border-b border-dashed border-paper-400 py-1">
                    {line}
                  </p>
                ))}
                <p className="mt-2 text-paper-700">{t('sites.site.mock.hours')}</p>
              </div>
            </div>
            <Points items={asList<string>(t('sites.site.points', { returnObjects: true }))} />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div
            data-testid="sites-card-bot"
            className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-paper-900 mb-1">{t('sites.bot.title')}</h3>
            <p className="text-sm text-paper-600 mb-5">{t('sites.bot.kinds')}</p>
            <div aria-hidden="true" className="rounded-2xl border border-gray-200 bg-gray-100 p-4 text-sm">
              <p className="ml-auto w-fit max-w-[85%] rounded-xl bg-brand-200 px-3 py-2 text-gray-900">
                {t('sites.bot.mock.ask')}
              </p>
              <div className="mt-2 w-fit max-w-[85%] rounded-xl bg-white px-3 py-2 text-gray-900">
                <p>{t('sites.bot.mock.reply')}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {asList<string>(t('sites.bot.mock.slots', { returnObjects: true })).map((slot) => (
                    <span key={slot} className="rounded-lg border border-brand-800 px-3 py-1 text-brand-800">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <Points items={asList<string>(t('sites.bot.points', { returnObjects: true }))} />
          </div>
        </FadeIn>
      </div>

      <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {asList<Term>(t('sites.terms', { returnObjects: true, ...rent })).map((term) => (
          <li
            key={term.title}
            data-testid="sites-term"
            className="rounded-2xl border border-paper-300 bg-paper-50 p-4"
          >
            <p className="text-sm font-semibold text-paper-900 mb-1">{term.title}</p>
            <p className="text-sm text-paper-700 leading-relaxed">{term.text}</p>
          </li>
        ))}
      </ul>

      <FadeIn delay={200} className="mt-10 text-center">
        <Button
          variant="primary"
          size="lg"
          href={appUrl('/studio?tab=products', { utm_content: 'sites' })}
          dataCta="sites-start"
        >
          {t('sites.cta')}
        </Button>
      </FadeIn>
    </Section>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} data-testid="sites-point" className="flex gap-2.5 text-sm text-paper-800 leading-relaxed">
          <Check aria-hidden="true" className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
