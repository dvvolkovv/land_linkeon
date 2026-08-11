import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

import Footer from '../components/layout/Footer';
import { DEFAULT_LANGUAGE } from '../i18n/languages';

/**
 * Как удалить аккаунт — публичная страница.
 *
 * Обязательное требование Google Play: у приложения, позволяющего завести
 * учётную запись, должен быть адрес, где порядок удаления описан ДО
 * установки и БЕЗ входа. Поле «Account deletion URL» в Play Console без
 * этого не заполнить, а без него приложение не публикуется.
 *
 * Apple такого адреса не требует — там достаточно удаления внутри
 * приложения, и оно есть. Но давать один и тот же понятный адрес обоим
 * магазинам проще, чем объяснять разницу.
 *
 * Текст описывает то, что делает код: удаление стирает профиль и переписку,
 * а баланс токенов сохраняется, чтобы человек не терял оплаченное при
 * повторной регистрации тем же способом входа.
 */

interface Copy {
  back: string;
  title: string;
  lead: string;
  inAppTitle: string;
  inApp: string[];
  byMailTitle: string;
  byMail: string;
  whatTitle: string;
  removed: string[];
  keptTitle: string;
  kept: string[];
  appleTitle: string;
  apple: string;
}

const RU: Copy = {
  back: 'На главную',
  title: 'Удаление аккаунта Linkeon',
  lead: 'Аккаунт можно удалить самостоятельно — из приложения или из личного кабинета. Обращаться в поддержку для этого не нужно.',
  inAppTitle: 'В приложении и в кабинете',
  inApp: [
    'Откройте «Профиль».',
    'Пролистайте вниз до пункта «Удалить аккаунт».',
    'Подтвердите удаление в диалоге.',
  ],
  byMailTitle: 'Письмом',
  byMail: 'Если доступа к приложению нет, напишите на support@linkeon.ru с адреса или с номера телефона, привязанного к аккаунту. Мы удалим учётную запись в течение 30 дней.',
  whatTitle: 'Что удаляется',
  removed: [
    'Профиль: имя, фотография, ценности, цели, интересы и навыки.',
    'Переписка с AI-ассистентами и созданные задачи.',
    'Личные переписки с другими пользователями и заявки на контакт.',
    'Привязанные способы входа: телефон, почта, Google, Яндекс, Apple, Taler ID.',
  ],
  keptTitle: 'Что сохраняется и почему',
  kept: [
    'Баланс токенов — чтобы оплаченное не пропало, если вы вернётесь и войдёте тем же способом.',
    'История платежей — 5 лет, этого требует налоговое законодательство.',
    'Обезличенные записи о расходе токенов — без связи с вашей личностью.',
  ],
  appleTitle: 'Вход через Apple',
  apple: 'Если вы входили через Apple, при удалении аккаунта мы отзываем доступ приложения к вашей учётной записи Apple. Приложение пропадает из списка в настройках Apple ID автоматически.',
};

const EN: Copy = {
  back: 'Back to home',
  title: 'Deleting your Linkeon account',
  lead: 'You can delete your account yourself — from the app or from the web account. There is no need to contact support.',
  inAppTitle: 'In the app and on the web',
  inApp: [
    'Open “Profile”.',
    'Scroll down to “Delete account”.',
    'Confirm deletion in the dialog.',
  ],
  byMailTitle: 'By email',
  byMail: 'If you no longer have access to the app, write to support@linkeon.ru from the email address or phone number linked to your account. We will delete it within 30 days.',
  whatTitle: 'What is deleted',
  removed: [
    'Your profile: name, photo, values, goals, interests and skills.',
    'Conversations with AI assistants and the tasks created from them.',
    'Private conversations with other users and contact requests.',
    'Linked sign-in methods: phone, email, Google, Yandex, Apple, Taler ID.',
  ],
  keptTitle: 'What is kept, and why',
  kept: [
    'Your token balance — so that what you paid for is not lost if you come back and sign in the same way.',
    'Payment records — for 5 years, as required by tax law.',
    'Anonymised token-usage records, no longer linked to you.',
  ],
  appleTitle: 'Sign in with Apple',
  apple: 'If you signed in with Apple, deleting your account also revokes the app’s access to your Apple ID. The app disappears from the list in your Apple ID settings automatically.',
};

export default function DeleteAccountPage() {
  const { i18n } = useTranslation();
  // Русская и английская редакции: страница нужна магазинам и поддержке,
  // а не для охвата — переводить её на семь языков смысла нет.
  const c = i18n.language === DEFAULT_LANGUAGE ? RU : EN;
  const home = i18n.language === DEFAULT_LANGUAGE ? '/' : `/${i18n.language}/`;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 mx-auto w-full max-w-3xl px-5 py-10">
        <a
          href={home}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="w-4 h-4" />
          {c.back}
        </a>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">{c.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-gray-700">{c.lead}</p>

        <Section title={c.inAppTitle}>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {c.inApp.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </Section>

        <Section title={c.byMailTitle}>
          <p className="text-gray-700">{c.byMail}</p>
        </Section>

        <Section title={c.whatTitle}>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {c.removed.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Section>

        <Section title={c.keptTitle}>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {c.kept.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Section>

        <Section title={c.appleTitle}>
          <p className="text-gray-700">{c.apple}</p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
