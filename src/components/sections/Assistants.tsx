import { useTranslation } from 'react-i18next';
import { Bot, Megaphone, Scale, Calculator, UserCheck, Compass, ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import FadeIn from '../ui/FadeIn';
import { appUrl } from '../../lib/appUrl';

/**
 * ИСТОЧНИК ПРАВДЫ ДЛЯ ИМЁН — таблица `agent_translations` в базе приложения
 * (spirits_back, ключ `entity_type='agent'`). На лендинге они продублированы
 * руками, и ничто их не связывает: если продукт переименует ассистента в
 * какой-нибудь локали, здесь останется старое написание, а тест не покраснеет.
 * Человек придёт в приложение и не найдёт того, кого ему пообещали.
 *
 * Написания в `assistants.list` сверены с живыми базами test и prod 07.09.2026:
 * Роман (12), Александра (11), Алексей (10), Анна (9), Ирина (4), Миша (1).
 * Расхождения по локалям реальны и намеренны — es «Román»/«Alexéi»,
 * de «Alexej»/«Mischa», fr «Alexeï»/«Micha», pt «Alexei»/«Micha», zh иероглифами;
 * это не опечатки, а транслитерация приложения. Правя имена, сверяйся с базой,
 * а не «выравнивай» их между локалями.
 */
const ICONS = [Bot, Megaphone, Scale, Calculator, UserCheck, Compass];

export default function Assistants() {
  const { t } = useTranslation();
  const raw = t('assistants.list', { returnObjects: true }) as { name: string; role: string; quote: string }[];
  // Локаль — данные снаружи компонента: потерянный ключ здесь снимал бы всю
  // страницу, error boundary в App.tsx нет.
  const list = Array.isArray(raw) ? raw : [];

  return (
    <Section id="assistants" ariaLabelledby="assistants-heading" className="bg-paper-100">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center min-w-0 [&>*]:min-w-0">
        <FadeIn>
          <Eyebrow className="mb-4">{t('assistants.eyebrow')}</Eyebrow>
          <h2 id="assistants-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance">
            {t('assistants.h2')}
          </h2>
          <p className="text-lg text-paper-700 max-w-xl">{t('assistants.sub')}</p>
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

      {/*
        Карточки вынесены из левой колонки сознательно. Внутри `lg:grid-cols-2`
        на реплику оставалось 226px (1152 − 48 паддинга → 1104, пополам с gap-12
        → 528, пополам с gap-3 → 258, минус p-4 → 226) — около 32 знаков в строке.
        Реплики в это не влезали: сокращать пришлось бы вторым предложением, а
        именно там Роман передаёт задачу, Алексей предупреждает, Ирина забирает
        работу на себя. Во всю ширину на карточку приходится 546px, текста — 514.
      */}
      <FadeIn delay={80}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10 md:mt-12 min-w-0">
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

        <a href={appUrl()} data-cta="assistants-link" className="inline-flex items-center gap-1 py-2 min-h-11 mt-6 text-brand-800 hover:text-brand-900 font-semibold text-sm">
          {t('assistants.cta')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
        </a>
      </FadeIn>
    </Section>
  );
}
