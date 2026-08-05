import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Privacy Policy',
  offer: 'Terms of Service',
  pdn: 'Personal Data Processing Consent',
};

export function renderLegal(type: LegalType) {
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
            accountant, HR, coach and others), content-generation tools
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
            <div className="font-semibold text-gray-900">Personal data operator</div>
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
