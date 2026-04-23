import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export type LegalType = 'privacy' | 'offer' | 'pdn';

interface LegalModalProps {
  type: LegalType | null;
  onClose: () => void;
}

/**
 * Legal documents for linkeon.io (offer / privacy policy / personal-data consent).
 *
 * Content source: mirrors the modals shown in my.linkeon.io
 * (`src/components/onboarding/LegalModal.tsx` in spirits_front). The SPA there
 * only surfaces these docs as modals (not as addressable URLs), so we ship the
 * same text on the landing so footer links actually resolve to real content
 * instead of dead `#` anchors.
 */
export default function LegalModal({ type, onClose }: LegalModalProps) {
  const { i18n } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isEn = i18n.language.startsWith('en');

  useEffect(() => {
    if (!type) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Prevent background scroll while modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog for accessibility.
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [type, onClose]);

  if (!type) return null;

  const title = isEn
    ? type === 'privacy'
      ? 'Privacy Policy'
      : type === 'offer'
        ? 'Terms of Service'
        : 'Personal Data Processing Consent'
    : type === 'privacy'
      ? 'Политика конфиденциальности'
      : type === 'offer'
        ? 'Пользовательское соглашение (оферта)'
        : 'Согласие на обработку персональных данных';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close' : 'Закрыть'}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X aria-hidden="true" className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 text-[15px] leading-relaxed text-slate-700 space-y-4">
          {isEn ? renderEn(type) : renderRu(type)}
        </div>

        <div className="p-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {isEn ? 'Close' : 'Закрыть'}
          </button>
        </div>
      </div>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-700">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">{children}</ul>;
}

function renderRu(type: LegalType) {
  if (type === 'offer') {
    return (
      <>
        <H3>1. Общие положения</H3>
        <P>
          Настоящее Пользовательское соглашение регулирует отношения между администрацией приложения
          LINKEON.IO (далее — «Приложение») и пользователями Приложения.
        </P>
        <P>
          Приложение принадлежит и управляется <strong>Волковым Дмитрием Викторовичем
          (ИНН 463404496646)</strong>, плательщиком налога на профессиональный доход (самозанятый),
          далее — «Исполнитель» или «Администрация».
        </P>
        <P>Контактный email: support@linkeon.ru</P>
        <P>
          Настоящее Соглашение является публичной офертой в соответствии со статьёй 437 Гражданского
          кодекса РФ. Использование Приложения означает полное и безоговорочное принятие условий
          настоящего Соглашения.
        </P>

        <H3>2. Цель Приложения</H3>
        <P>
          Приложение предназначено для предоставления пользователям доступа к AI-ассистентам
          (маркетолог, юрист, бухгалтер, HR, коуч и др.), функциям генерации контента,
          автоматического обзвона и единого профиля для задач бизнеса и личного развития.
        </P>

        <H3>3. Регистрация и аккаунт</H3>
        <P>
          Для использования Приложения необходима регистрация с использованием номера телефона.
          Пользователь обязуется предоставлять достоверную информацию и несёт ответственность
          за сохранность доступа к своему аккаунту.
        </P>

        <H3>3.1. Возрастные ограничения</H3>
        <P>
          Приложение предназначено исключительно для лиц, достигших 18 лет. Регистрируясь,
          пользователь подтверждает, что ему исполнилось полных 18 лет.
        </P>

        <H3>4. Правила поведения</H3>
        <P>Пользователям запрещается:</P>
        <UL>
          <li>Размещать оскорбительный, дискриминационный или незаконный контент</li>
          <li>Распространять спам или рекламу без согласия администрации</li>
          <li>Выдавать себя за другое лицо</li>
          <li>Использовать Приложение в мошеннических целях</li>
          <li>Нарушать права других пользователей</li>
        </UL>

        <H3>4.1. Платные услуги и токены</H3>
        <P>
          Приложение предоставляет как бесплатные, так и платные услуги. Основной расчётной единицей
          являются внутренние токены, приобретаемые пакетами через интегрированные платёжные системы.
          Исполнитель не обрабатывает и не хранит данные банковских карт. После оплаты направляется
          чек в соответствии с требованиями законодательства РФ.
        </P>
        <P>
          Неиспользованный остаток токенов на момент удаления аккаунта не возвращается, за
          исключением случаев, предусмотренных разделом 8.
        </P>

        <H3>5. Интеллектуальная собственность</H3>
        <P>
          Все права на Приложение, включая исходный код, дизайн, логотипы и другие материалы,
          принадлежат Волкову Дмитрию Викторовичу. Регистрируясь, пользователь предоставляет
          Исполнителю неисключительную лицензию на использование загруженного контента для целей
          функционирования сервиса.
        </P>

        <H3>6. Ограничение ответственности</H3>
        <P>
          Приложение и все его функции предоставляются на условиях «как есть» (as is), без каких-либо
          явных или подразумеваемых гарантий. Исполнитель не гарантирует непрерывную и безошибочную
          работу, точность ответов AI-ассистентов и применимость советов к конкретной ситуации
          пользователя.
        </P>
        <P>
          Максимальная ответственность Исполнителя ограничена суммой, уплаченной пользователем
          за последние 30 дней.
        </P>

        <H3>7. Рекомендации по безопасности</H3>
        <UL>
          <li>Проверяйте рекомендации AI у профильных специалистов перед принятием решений</li>
          <li>Не передавайте Приложению сведения, составляющие государственную или коммерческую тайну</li>
          <li>Сообщайте администрации о подозрительной активности</li>
        </UL>

        <H3>8. Возврат средств</H3>
        <P>Возврат денежных средств производится ТОЛЬКО в следующих случаях:</P>
        <UL>
          <li>Технический сбой более 72 часов подряд</li>
          <li>Двойное списание по технической ошибке</li>
        </UL>
        <P>
          Претензия направляется на email support@linkeon.ru и рассматривается в течение 10 рабочих
          дней. Возврат производится в течение 30 дней за вычетом комиссий платёжных систем (3–5%).
        </P>

        <H3>9. Разрешение споров</H3>
        <P>
          Все споры разрешаются путём переговоров с соблюдением обязательного досудебного порядка.
          До обращения в суд пользователь обязан направить письменную претензию на email
          support@linkeon.ru. При недостижении согласия споры разрешаются в судебном порядке
          по месту нахождения ответчика в соответствии с законодательством РФ.
        </P>

        <H3>10. Изменение условий</H3>
        <P>
          Администрация оставляет за собой право изменять условия настоящего Соглашения в любое
          время. Продолжение использования Приложения после внесения изменений означает согласие
          пользователя с новыми условиями.
        </P>
      </>
    );
  }

  if (type === 'privacy') {
    return (
      <>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
          <div className="font-semibold text-slate-900">Оператор персональных данных</div>
          <div><strong>Наименование:</strong> Волков Дмитрий Викторович</div>
          <div><strong>ИНН:</strong> 463404496646</div>
          <div><strong>Статус:</strong> плательщик налога на профессиональный доход (самозанятый)</div>
          <div><strong>Контактный email:</strong> support@linkeon.ru</div>
        </div>
        <P>
          Настоящая Политика конфиденциальности действует в отношении всех персональных данных,
          которые Оператор может получить о пользователе во время использования Приложения
          LINKEON.IO.
        </P>

        <H3>1. Сбор информации</H3>
        <P>Мы собираем следующую информацию:</P>
        <UL>
          <li>Номер телефона для аутентификации</li>
          <li>Имя, фамилия, email (по желанию)</li>
          <li>Информация о бизнесе, целях и контексте, введённая пользователем</li>
          <li>История сообщений и взаимодействий с AI-ассистентами</li>
          <li>Техническая информация об устройстве и использовании Приложения</li>
        </UL>

        <H3>2. Использование информации</H3>
        <UL>
          <li>Предоставление и улучшение услуг Приложения</li>
          <li>Обработка AI-запросов пользователя</li>
          <li>Персонализация ответов ассистентов</li>
          <li>Обеспечение безопасности и предотвращение мошенничества</li>
          <li>Связь с пользователем по важным вопросам, касающимся Приложения</li>
        </UL>

        <H3>2.1. Обработка платёжной информации</H3>
        <P>
          Приложение <strong>НЕ обрабатывает и НЕ хранит</strong> данные банковских карт
          (номер карты, срок действия, CVV). Все платёжные данные обрабатываются исключительно
          сертифицированными платёжными агрегаторами, соответствующими стандарту PCI DSS.
        </P>
        <P>История платежей хранится в течение 5 лет согласно налоговому законодательству РФ.</P>

        <H3>3. Обработка данных с помощью искусственного интеллекта</H3>
        <P>
          Для обработки запросов пользователя Приложение использует технологии искусственного
          интеллекта сторонних провайдеров: OpenAI (ChatGPT, GPT-4, GPT-5), Anthropic (Claude),
          другие AI-сервисы.
        </P>
        <P>
          <strong>Передаваемые данные:</strong> текст запросов и контекст профиля, необходимые
          для ответа. Номер телефона и платёжные данные AI-провайдерам НЕ передаются.
        </P>
        <P>
          После передачи данных AI-провайдерам Оператор не контролирует их дальнейшую обработку.
          Используя Приложение, пользователь явно соглашается с передачей своих данных для
          обработки с помощью AI-технологий.
        </P>

        <H3>4. Передача данных третьим лицам</H3>
        <P>Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением:</P>
        <UL>
          <li>С вашего явного согласия</li>
          <li>По требованию законодательства РФ</li>
          <li>Для защиты наших прав и безопасности пользователей</li>
          <li>Поставщикам услуг, работающим от нашего имени (с соблюдением конфиденциальности)</li>
        </UL>

        <H3>5. Защита данных</H3>
        <P>
          Мы применяем современные технологии шифрования и безопасности (TLS, хранение токенов
          в защищённом виде). Доступ к персональным данным имеют только уполномоченные сотрудники.
        </P>

        <H3>6. Ваши права</H3>
        <UL>
          <li>Получить доступ к своим персональным данным</li>
          <li>Исправить неточные данные</li>
          <li>Удалить свой аккаунт и данные</li>
          <li>Ограничить обработку данных</li>
          <li>Отозвать согласие на обработку данных</li>
        </UL>

        <H3>7. Хранение данных</H3>
        <UL>
          <li><strong>Активные аккаунты:</strong> бессрочно до удаления пользователем</li>
          <li><strong>Удалённые аккаунты:</strong> 30 календарных дней, затем полное удаление</li>
          <li><strong>История платежей:</strong> 5 лет (требование налогового законодательства РФ)</li>
          <li><strong>Логи безопасности:</strong> 6 месяцев</li>
          <li><strong>Резервные копии:</strong> перезаписываются каждые 30 дней</li>
        </UL>

        <H3>8. Cookies и аналитика</H3>
        <P>
          Мы используем cookies и аналогичные технологии для улучшения работы Приложения и анализа
          использования (включая Яндекс.Метрику). Управление cookies доступно в настройках браузера.
        </P>

        <H3>9. Изменения в политике</H3>
        <P>
          Мы можем обновлять настоящую Политику. О существенных изменениях уведомим через
          Приложение или другими способами.
        </P>

        <H3>10. Контакты</H3>
        <P>
          Если у вас есть вопросы о настоящей Политике или об обработке ваших данных, свяжитесь
          с нами по адресу support@linkeon.ru.
        </P>
      </>
    );
  }

  // pdn
  return (
    <>
      <P>
        Регистрируясь и используя Приложение LINKEON.IO, пользователь даёт согласие
        Волкову Дмитрию Викторовичу (ИНН 463404496646, email support@linkeon.ru), далее — «Оператор»,
        на обработку своих персональных данных на условиях, указанных ниже.
      </P>

      <H3>1. Состав персональных данных</H3>
      <UL>
        <li>Номер мобильного телефона</li>
        <li>Имя, фамилия, email (по желанию пользователя)</li>
        <li>Содержимое введённых в Приложение сообщений, запросов и параметров бизнес-профиля</li>
        <li>История взаимодействий с AI-ассистентами, журналы сессий</li>
        <li>Техническая информация об устройстве и факты оплат</li>
      </UL>

      <H3>2. Цели обработки</H3>
      <UL>
        <li>Идентификация и аутентификация пользователя</li>
        <li>Исполнение Пользовательского соглашения (оферты)</li>
        <li>Обработка AI-запросов и предоставление ответов</li>
        <li>Проведение платежей и формирование чеков</li>
        <li>Поддержка пользователя и разрешение претензий</li>
        <li>Анализ использования и улучшение сервиса (в обезличенной форме)</li>
      </UL>

      <H3>3. Перечень действий с персональными данными</H3>
      <P>
        Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение),
        извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование,
        удаление, уничтожение персональных данных — как с использованием средств автоматизации,
        так и без таковых.
      </P>

      <H3>4. Передача данных третьим лицам</H3>
      <P>
        Для обработки AI-запросов данные в обезличенном и минимально необходимом объёме передаются
        сторонним провайдерам: OpenAI, Anthropic и другим AI-сервисам. Передача платёжных данных
        производится сертифицированным платёжным агрегаторам (YooKassa и пр.). Иным третьим лицам
        персональные данные не передаются, за исключением случаев, прямо предусмотренных
        законодательством РФ.
      </P>

      <H3>5. Срок действия согласия</H3>
      <P>
        Настоящее согласие действует с момента регистрации и до момента его отзыва пользователем
        или удаления аккаунта. Пользователь вправе в любой момент отозвать согласие,
        направив запрос на support@linkeon.ru. Отзыв влечёт удаление аккаунта и данных в сроки,
        указанные в Политике конфиденциальности (до 30 календарных дней).
      </P>

      <H3>6. Права субъекта персональных данных</H3>
      <P>
        Пользователь вправе получать информацию о составе и обработке своих данных, требовать
        их уточнения, блокирования или уничтожения в случае их неполноты, неточности или
        неактуальности, обжаловать действия Оператора в Роскомнадзоре или в суде.
      </P>

      <H3>7. Контакты</H3>
      <P>
        По всем вопросам обработки персональных данных: support@linkeon.ru. Запросы
        рассматриваются в течение 30 календарных дней.
      </P>
    </>
  );
}

function renderEn(type: LegalType) {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        This English version is a courtesy translation. In case of any discrepancy, the
        Russian-language version is governing and legally binding under the laws of the Russian
        Federation.
      </div>
      {type === 'offer' && (
        <>
          <H3>1. General provisions</H3>
          <P>
            These Terms of Service govern the relationship between the administration of the
            LINKEON.IO application (hereinafter — the "Application") and its users.
          </P>
          <P>
            The Application is owned and operated by <strong>Dmitry Viktorovich Volkov
            (INN 463404496646)</strong>, payer of professional-income tax (self-employed),
            hereinafter — the "Operator" or "Administration".
          </P>
          <P>Contact email: support@linkeon.ru</P>
          <P>
            These Terms constitute a public offer under Article 437 of the Civil Code of the
            Russian Federation. Use of the Application means full and unconditional acceptance
            of these Terms.
          </P>

          <H3>2. Purpose of the Application</H3>
          <P>
            The Application provides users with access to AI assistants (marketer, lawyer,
            accountant, HR, coach and others), content-generation tools, automated calling
            and a unified profile for business and personal-development tasks.
          </P>

          <H3>3. Registration and account</H3>
          <P>
            Registration requires a phone number. The user undertakes to provide truthful
            information and is responsible for the security of their account.
          </P>

          <H3>3.1. Age restrictions</H3>
          <P>
            The Application is intended exclusively for persons aged 18 and over. By registering
            the user confirms they are at least 18 years old.
          </P>

          <H3>4. Rules of conduct</H3>
          <P>Users are prohibited from:</P>
          <UL>
            <li>Posting offensive, discriminatory or unlawful content</li>
            <li>Distributing spam or advertising without consent of the administration</li>
            <li>Impersonating another person</li>
            <li>Using the Application for fraudulent purposes</li>
            <li>Violating the rights of other users</li>
          </UL>

          <H3>4.1. Paid services and tokens</H3>
          <P>
            The Application provides both free and paid services. The unit of account is internal
            tokens purchased in packs via integrated payment systems. The Operator does not process
            or store bank card data. A receipt is issued in accordance with the legislation of the
            Russian Federation after each payment.
          </P>
          <P>
            Unused token balances at the moment of account deletion are not refunded, except in
            the cases provided for in Section 8.
          </P>

          <H3>5. Intellectual property</H3>
          <P>
            All rights to the Application, including source code, design, logos and other
            materials, belong to Dmitry Viktorovich Volkov. By registering, the user grants the
            Operator a non-exclusive license to use uploaded content for the purposes of operating
            the service.
          </P>

          <H3>6. Limitation of liability</H3>
          <P>
            The Application and all its features are provided on an "as is" basis, without express
            or implied warranties of any kind. The Operator does not guarantee continuous
            error-free operation, the accuracy of AI answers or the applicability of advice to the
            user's specific situation.
          </P>
          <P>
            The Operator's maximum liability is limited to the amount paid by the user during the
            last 30 days.
          </P>

          <H3>7. Safety recommendations</H3>
          <UL>
            <li>Verify AI recommendations with qualified specialists before making decisions</li>
            <li>Do not share state or trade secrets with the Application</li>
            <li>Report suspicious activity to the administration</li>
          </UL>

          <H3>8. Refunds</H3>
          <P>Refunds are made ONLY in the following cases:</P>
          <UL>
            <li>Technical failure lasting more than 72 consecutive hours</li>
            <li>Duplicate charge due to a technical error</li>
          </UL>
          <P>
            Complaints are submitted to support@linkeon.ru and reviewed within 10 business days.
            Refunds are processed within 30 days, less payment-system fees (3–5%).
          </P>

          <H3>9. Dispute resolution</H3>
          <P>
            Disputes are resolved through negotiations with a mandatory pre-litigation procedure.
            Before going to court, the user must send a written claim to support@linkeon.ru. If no
            agreement is reached, disputes are resolved in court at the respondent's location in
            accordance with the legislation of the Russian Federation.
          </P>

          <H3>10. Changes to the Terms</H3>
          <P>
            The administration may change these Terms at any time. Continued use of the Application
            after changes means the user's agreement to the new terms.
          </P>
        </>
      )}

      {type === 'privacy' && (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
            <div className="font-semibold text-slate-900">Personal data operator</div>
            <div><strong>Name:</strong> Dmitry Viktorovich Volkov</div>
            <div><strong>INN:</strong> 463404496646</div>
            <div><strong>Status:</strong> payer of professional-income tax (self-employed)</div>
            <div><strong>Contact email:</strong> support@linkeon.ru</div>
          </div>
          <P>
            This Privacy Policy applies to all personal data that the Operator may receive about
            the user during the use of the LINKEON.IO Application.
          </P>

          <H3>1. Information collected</H3>
          <UL>
            <li>Phone number for authentication</li>
            <li>First name, last name, email (optional)</li>
            <li>Information about your business, goals and context that you enter</li>
            <li>History of messages and interactions with AI assistants</li>
            <li>Technical information about your device and use of the Application</li>
          </UL>

          <H3>2. Use of information</H3>
          <UL>
            <li>Providing and improving the Application's services</li>
            <li>Processing user AI requests</li>
            <li>Personalizing assistant responses</li>
            <li>Ensuring security and preventing fraud</li>
            <li>Contacting the user regarding important matters</li>
          </UL>

          <H3>2.1. Processing of payment information</H3>
          <P>
            The Application <strong>DOES NOT process and DOES NOT store</strong> bank card data
            (card number, expiry, CVV). All payment data is processed exclusively by certified
            PCI-DSS-compliant payment aggregators.
          </P>
          <P>Payment history is stored for 5 years per the tax legislation of the Russian Federation.</P>

          <H3>3. Data processing via artificial intelligence</H3>
          <P>
            The Application uses AI technologies provided by third-party vendors: OpenAI (ChatGPT,
            GPT-4, GPT-5), Anthropic (Claude) and other AI services.
          </P>
          <P>
            <strong>Data transmitted:</strong> request text and the minimal profile context needed
            to produce a response. Phone number and payment data are NOT transmitted to AI vendors.
          </P>

          <H3>4. Transfer of data to third parties</H3>
          <P>We do not sell or transfer your personal data to third parties, except:</P>
          <UL>
            <li>With your explicit consent</li>
            <li>As required by the legislation of the Russian Federation</li>
            <li>To protect our rights and the safety of users</li>
            <li>To service providers acting on our behalf (subject to confidentiality)</li>
          </UL>

          <H3>5. Data protection</H3>
          <P>
            We apply modern encryption and security technologies (TLS, secured token storage).
            Access to personal data is limited to authorized personnel only.
          </P>

          <H3>6. Your rights</H3>
          <UL>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Restrict the processing of data</li>
            <li>Withdraw consent to the processing of data</li>
          </UL>

          <H3>7. Data retention</H3>
          <UL>
            <li><strong>Active accounts:</strong> indefinitely until deleted by the user</li>
            <li><strong>Deleted accounts:</strong> 30 calendar days, then fully removed</li>
            <li><strong>Payment history:</strong> 5 years (tax-legislation requirement)</li>
            <li><strong>Security logs:</strong> 6 months</li>
            <li><strong>Backups:</strong> overwritten every 30 days</li>
          </UL>

          <H3>8. Cookies and analytics</H3>
          <P>
            We use cookies and similar technologies (including Yandex Metrika) to improve the
            Application and analyze usage. You can manage cookie settings in your browser.
          </P>

          <H3>9. Policy changes</H3>
          <P>We may update this Policy. We will notify you of material changes through the Application or by other means.</P>

          <H3>10. Contacts</H3>
          <P>For questions about this Policy or the processing of your data: support@linkeon.ru.</P>
        </>
      )}

      {type === 'pdn' && (
        <>
          <P>
            By registering and using the LINKEON.IO Application the user consents to the processing
            of their personal data by Dmitry Viktorovich Volkov (INN 463404496646, email
            support@linkeon.ru), hereinafter — the "Operator", on the terms set out below.
          </P>

          <H3>1. Personal data covered</H3>
          <UL>
            <li>Mobile phone number</li>
            <li>First name, last name, email (optional)</li>
            <li>Content of messages, requests and business-profile parameters entered in the Application</li>
            <li>History of interactions with AI assistants, session logs</li>
            <li>Technical information about the device and payment records</li>
          </UL>

          <H3>2. Purposes of processing</H3>
          <UL>
            <li>User identification and authentication</li>
            <li>Performance of the Terms of Service (public offer)</li>
            <li>Processing of AI requests and provision of responses</li>
            <li>Processing payments and generating receipts</li>
            <li>User support and claim handling</li>
            <li>Usage analysis and service improvement (in anonymized form)</li>
          </UL>

          <H3>3. Actions performed with personal data</H3>
          <P>
            Collection, recording, systematization, accumulation, storage, clarification (updating,
            modification), extraction, use, transfer (provision, access), anonymization, blocking,
            deletion, destruction — both with and without use of automated means.
          </P>

          <H3>4. Transfer to third parties</H3>
          <P>
            For AI-request processing, anonymized and minimally necessary data is transferred to
            third-party vendors: OpenAI, Anthropic and other AI services. Payment data is
            transferred to certified payment aggregators (YooKassa and others). No other transfers
            are performed except where directly required by Russian law.
          </P>

          <H3>5. Duration of consent</H3>
          <P>
            This consent is effective from the moment of registration until it is withdrawn by the
            user or the account is deleted. The user may withdraw consent at any time by writing
            to support@linkeon.ru. Withdrawal leads to deletion of the account and data within
            the time frames specified in the Privacy Policy (up to 30 calendar days).
          </P>

          <H3>6. Data subject rights</H3>
          <P>
            The user has the right to obtain information about the composition and processing of
            their data, require clarification, blocking or destruction in case of incompleteness,
            inaccuracy or obsolescence, and to appeal the Operator's actions to Roskomnadzor or
            in court.
          </P>

          <H3>7. Contacts</H3>
          <P>
            For all questions about the processing of personal data: support@linkeon.ru. Requests
            are reviewed within 30 calendar days.
          </P>
        </>
      )}
    </>
  );
}
