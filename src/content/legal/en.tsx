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
          <div className="text-xs text-gray-500">Version dated 5 August 2026</div>
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
          <div className="text-xs text-gray-500">Version dated 5 August 2026</div>
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

          <H3>1.1. Signing in through third-party services</H3>
          <P>
            In addition to signing in with a phone number or an email address, the Application
            supports signing in through third-party services: Google, Yandex, Taler ID and Apple.
          </P>
          <P>
            In that case the Operator receives from the chosen service a persistent account
            identifier, an email address and a flag indicating whether that address is verified.
            The password to the third-party account is never transmitted to the Operator and is
            not known to it.
          </P>
          <P>
            Apple allows the user to hide their real address. The Operator then receives a relay
            address of the form <strong>***@privaterelay.appleid.com</strong>, or no address at
            all, and the account is identified solely by its identifier.
          </P>
          <P>
            The address received is also used to link accounts: if it is verified by the service
            and already known to the Operator, the sign-in resolves to the existing account
            instead of creating a new one.
          </P>
          <P>
            The Operator gains no access to the contents of third-party accounts and performs no
            actions in them on the user's behalf. The list of linked sign-in methods is available
            in the Application; any of them can be removed unless it is the only one left.
          </P>

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
            The Application uses AI technologies provided by the following third-party vendors:
          </P>
          <UL>
            <li>
              <strong>OpenAI</strong> (ChatGPT, GPT-4, GPT-5) — processing of text requests.
              Country of operation: USA
            </li>
            <li>
              <strong>Anthropic</strong> (Claude) — processing of text requests.
              Country of operation: USA
            </li>
            <li>
              <strong>Google</strong> (Gemini — request processing and analysis of an uploaded
              voice sample; Imagen 4.0 Ultra and Nano Banana — image generation; Veo — video
              generation). Country of operation: USA
            </li>
            <li>
              <strong>ElevenLabs</strong> — creation of a voice model from an uploaded voice
              sample and narration of videos with that voice. Country of operation: USA
            </li>
            <li>
              <strong>DeepSeek</strong> — generation of greeting messages in chats with AI
              assistants. <strong>Country of operation: People's Republic of China</strong>
            </li>
            <li>
              <strong>Kling (Kuaishou)</strong> — video generation and processing.{' '}
              <strong>Country of operation: People's Republic of China</strong>
            </li>
            <li>
              <strong>Yandex SpeechKit</strong> — speech recognition for voice input.
              Country of operation: Russian Federation
            </li>
            <li>Other AI services engaged for particular features of the Application</li>
          </UL>
          <P>
            <strong>Data transmitted:</strong> the text of the user's requests and messages, the
            history of the conversation with the assistant and the profile context; for generation
            features — text prompts together with images and audio uploaded by the user; for voice
            input — the audio stream from the microphone. The profile context transmitted to AI
            vendors includes the user's first and last name, together with their interests, values,
            skills and intentions. The content of the conversation and of the profile is
            transmitted as-is and is not anonymized. The user identifier, the phone number and
            payment data are NOT transmitted to AI vendors.
          </P>
          <P>
            <strong>Voice cloning.</strong> In the video creation section the user may enable
            narration in their own voice. In that case the voice sample they upload is transmitted
            to Google (the Gemini model) to produce a textual description of the voice, and to
            ElevenLabs to create a voice model that is then used to narrate the generated video.
            The sample is uploaded solely at the user's initiative and only where the user has
            confirmed a separate consent; without such confirmation no upload takes place. The
            audio file of the sample itself is not retained by the Operator — what is retained is
            the identifier of the voice model held by ElevenLabs and the textual description of the
            voice. The user may delete the voice model within the Application, upon which it is
            also deleted on the ElevenLabs side.
          </P>
          <P>
            Once data has been transmitted to an AI vendor, the Operator does not control its
            further processing. By using the Application the user expressly agrees to the transfer
            of their data for processing by means of AI technologies.
          </P>

          <H3>3.1. Cross-border transfer of personal data</H3>
          <P>
            Several of the vendors listed in Section 3 are located outside the Russian Federation.
            Processing of user requests therefore entails a cross-border transfer of personal data
            within the meaning of Article 12 of Federal Law No. 152-FZ of 27 July 2006 "On Personal
            Data".
          </P>
          <P>
            <strong>Please note in particular: part of the user's data is transferred to the
            People's Republic of China.</strong> The following is transferred to the PRC: the text
            of the user's messages to an AI assistant together with their profile context when
            greeting messages are generated (vendor DeepSeek), and the text prompts, images and
            audio used to generate and process video
            (vendor Kling / Kuaishou). The People's Republic of China is not a party to the Council
            of Europe Convention for the Protection of Individuals with regard to Automatic
            Processing of Personal Data and is not included in the list of foreign states providing
            adequate protection of the rights of personal data subjects. The level of legal
            protection of personal data in the PRC differs from that established by the legislation
            of the Russian Federation.
          </P>
          <P>
            Data is also transferred to the USA (OpenAI, Anthropic, Google, ElevenLabs), including
            the user's voice sample where the feature narrating videos in the user's own voice is
            used. Speech recognition for voice input is performed within the Russian Federation
            (Yandex SpeechKit).
          </P>
          <P>
            By using AI assistants, the image- and video-generation features and voice input, the
            user consents to such cross-border transfer, including transfer to the PRC. If such a
            transfer is unacceptable to the user, they should refrain from using the corresponding
            features of the Application. Do not disclose to AI assistants any information whose
            transfer outside the Russian Federation is unacceptable to you.
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
            The linkeon.io website uses cookies, browser local storage (localStorage,
            sessionStorage) and the counters of the following third-party web analytics and
            advertising services:
          </P>
          <UL>
            <li>
              <strong>Yandex Metrica</strong>, counter No. 105902201 — visit statistics and goal
              tracking. Session Replay (recording of user actions on the page), click map, outbound
              link tracking and accurate bounce rate are enabled. The counter script is loaded upon
              the user's first interaction with the page (scroll, touch, mouse movement, key press,
              click) or no later than 6 seconds after the page has loaded.
            </li>
            <li>
              <strong>VK Ads / top.Mail.Ru</strong>, pixel No. 3773048 — records the visit (pageView
              event) so that an ad click can be matched to a site visit. The pixel is initialised on
              every page load, without any prior user action and without a separate consent request.
            </li>
          </UL>
          <P>
            <strong>First-party telemetry.</strong> The linkeon.io website sends the following
            events to the Operator's server (my.linkeon.io, endpoint /webhook/events/track):{' '}
            <em>landing_view</em> — the fact of a site visit; <em>landing_cta_click</em> — a click
            on the button leading to the Application; <em>landing_engagement</em> — a summary of the
            visit. The events carry: the tab session identifier, the traffic source (utm_* and ref
            parameters, or the domain name of the referring site), the advertising campaign name,
            the referrer page address, the time spent on the page, the maximum scroll depth, and
            whether the button leading to the Application was displayed to the user and whether it
            was clicked.
          </P>
          <P>
            <strong>Local storage.</strong> The attribution parameters taken from the page address
            (utm_source, utm_medium, utm_campaign, utm_term, utm_content, ref) are stored in the
            browser's localStorage under the key <em>ll_attribution</em> and reused on subsequent
            visits. The tab session identifier and a flag indicating that the visit has already been
            counted are stored in sessionStorage.
          </P>
          <P>
            Cookies can be managed in your browser settings; local storage data is cleared together
            with the site data by browser means. Disabling cookies and third-party counters may
            limit the operation of certain features.
          </P>

          <H3>9. Policy changes</H3>
          <P>We may update this Policy. We will notify you of material changes through the Application or by other means.</P>

          <H3>10. Contacts</H3>
          <P>For questions about this Policy or the processing of your data: support@linkeon.ru.</P>
        </>
      )}

      {type === 'pdn' && (
        <>
          <div className="text-xs text-gray-500">Version dated 5 August 2026</div>
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
            <li>Images and audio uploaded by the user, and the microphone audio stream where voice
              input is used</li>
            <li>A sample of the user's own voice — only where the feature narrating videos in the
              user's own voice is used and only upon a separate confirmation of consent</li>
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
            For AI-request processing, personal data is transferred to third-party vendors:
            OpenAI (USA), Anthropic (USA), Google (USA), ElevenLabs (USA), DeepSeek (PRC),
            Kling / Kuaishou (PRC), Yandex SpeechKit (Russian Federation), as well as other AI
            services engaged for particular features of the Application.
          </P>
          <P>
            The following is transferred: the text of the user's messages and requests, the history
            of the conversation with the assistant, the profile context (first and last name,
            interests, values, skills, intentions), uploaded images and audio, the audio stream
            from voice input, and a voice sample where the feature narrating videos in the user's
            own voice is used. The content of the conversation and of the profile is transferred
            as-is and is not anonymized. The user identifier and the phone number are not
            transferred to AI vendors.
          </P>
          <P>
            Payment data is transferred to certified payment aggregators (YooKassa and others). No
            other transfers are performed except where directly required by Russian law.
          </P>

          <H3>4.1. Cross-border transfer of personal data, including to the PRC</H3>
          <P>
            Some of the vendors listed above are located outside the Russian Federation, and the
            user therefore also consents to the cross-border transfer of their personal data
            (Article 12 of Federal Law No. 152-FZ of 27 July 2006 "On Personal Data").
          </P>
          <P>
            <strong>Data is transferred, among other destinations, to the People's Republic of
            China:</strong> the text of the user's messages together with their profile context —
            when greeting messages are generated (vendor DeepSeek); text prompts, images and audio
            — when video is generated and processed (vendor Kling / Kuaishou). The People's
            Republic of China is not a party to the Council of Europe Convention for the Protection
            of Individuals with regard to Automatic Processing of Personal Data and is not included
            in the list of foreign states providing adequate protection of the rights of personal
            data subjects; the level of legal protection of personal data in the PRC differs from
            that established by the legislation of the Russian Federation.
          </P>
          <P>
            Data is also transferred to the USA (OpenAI, Anthropic, Google, ElevenLabs). A detailed
            description of cross-border transfers is set out in Section 3.1 of the Privacy Policy.
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
