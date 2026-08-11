import type { LegalType } from '../../components/layout/LegalModal';
import { H3, P, UL } from './primitives';

export const titles: Record<LegalType, string> = {
  privacy: 'Datenschutzerklärung',
  offer: 'Nutzungsbedingungen (öffentliches Angebot)',
  pdn: 'Einwilligung in die Verarbeitung personenbezogener Daten',
};

export function renderLegal(type: LegalType) {
  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900">
        Diese deutsche Fassung ist eine unverbindliche Übersetzung. Bei Abweichungen ist die
        russischsprachige Fassung maßgeblich und nach dem Recht der Russischen Föderation
        rechtsverbindlich.
      </div>
      {type === 'offer' && (
        <>
          <div className="text-xs text-gray-500">Fassung vom 5. August 2026</div>
          <H3>1. Allgemeine Bestimmungen</H3>
          <P>
            Diese Nutzungsbedingungen regeln das Verhältnis zwischen der Administration der
            Anwendung LINKEON.IO (nachfolgend — die „Anwendung“) und den Nutzern der Anwendung.
          </P>
          <P>
            Die Anwendung steht im Eigentum von <strong>Dmitry Viktorovich Volkov
            (INN 463404496646)</strong>, Zahler der Steuer auf Berufseinkommen (Selbstständiger),
            nachfolgend — der „Anbieter“ oder die „Administration“, und wird von ihm betrieben.
          </P>
          <P>Kontakt-E-Mail: support@linkeon.ru</P>
          <P>
            Diese Nutzungsbedingungen stellen ein öffentliches Angebot gemäß Artikel 437 des
            Zivilgesetzbuchs der Russischen Föderation dar. Die Nutzung der Anwendung gilt als
            vollständige und vorbehaltlose Annahme dieser Bedingungen.
          </P>

          <H3>2. Zweck der Anwendung</H3>
          <P>
            Die Anwendung dient dazu, den Nutzern Zugang zu KI-Assistenten (Marketing, Recht,
            Buchhaltung, Personalwesen, Coaching u. a.), zu Funktionen der Inhaltserstellung sowie
            zu einem einheitlichen Profil für geschäftliche Aufgaben und die persönliche
            Entwicklung zu verschaffen.
          </P>

          <H3>3. Registrierung und Konto</H3>
          <P>
            Für die Nutzung der Anwendung ist eine Registrierung unter Angabe einer Telefonnummer
            erforderlich. Der Nutzer verpflichtet sich, wahrheitsgemäße Angaben zu machen, und ist
            für die Sicherheit des Zugangs zu seinem Konto verantwortlich.
          </P>

          <H3>3.1. Altersbeschränkungen</H3>
          <P>
            Die Anwendung richtet sich ausschließlich an Personen, die das 18. Lebensjahr vollendet
            haben. Mit der Registrierung bestätigt der Nutzer, dass er das 18. Lebensjahr vollendet
            hat.
          </P>

          <H3>4. Verhaltensregeln</H3>
          <P>Den Nutzern ist untersagt:</P>
          <UL>
            <li>beleidigende, diskriminierende oder rechtswidrige Inhalte einzustellen</li>
            <li>Spam oder Werbung ohne Zustimmung der Administration zu verbreiten</li>
            <li>sich als eine andere Person auszugeben</li>
            <li>die Anwendung zu betrügerischen Zwecken zu nutzen</li>
            <li>die Rechte anderer Nutzer zu verletzen</li>
          </UL>

          <H3>4.1. Kostenpflichtige Leistungen und Token</H3>
          <P>
            Die Anwendung bietet sowohl kostenlose als auch kostenpflichtige Leistungen an. Die
            wesentliche Verrechnungseinheit sind interne Token, die paketweise über integrierte
            Zahlungssysteme erworben werden. Der Anbieter verarbeitet und speichert keine
            Bankkartendaten. Nach der Zahlung wird ein Beleg gemäß den Anforderungen der
            Gesetzgebung der Russischen Föderation übermittelt.
          </P>
          <P>
            Ein zum Zeitpunkt der Löschung des Kontos nicht verbrauchtes Token-Guthaben wird nicht
            erstattet, ausgenommen die in Abschnitt 8 vorgesehenen Fälle.
          </P>

          <H3>5. Geistiges Eigentum</H3>
          <P>
            Sämtliche Rechte an der Anwendung, einschließlich Quellcode, Design, Logos und
            sonstiger Materialien, stehen Dmitry Viktorovich Volkov zu. Mit der Registrierung
            räumt der Nutzer dem Anbieter ein einfaches (nicht ausschließliches) Nutzungsrecht an
            den hochgeladenen Inhalten für die Zwecke des Betriebs des Dienstes ein.
          </P>

          <H3>6. Haftungsbeschränkung</H3>
          <P>
            Die Anwendung und alle ihre Funktionen werden „wie besehen“ (as is) bereitgestellt,
            ohne ausdrückliche oder stillschweigende Gewährleistungen jeglicher Art. Der Anbieter
            gewährleistet weder einen ununterbrochenen und fehlerfreien Betrieb noch die
            Richtigkeit der Antworten der KI-Assistenten oder die Anwendbarkeit der Ratschläge auf
            die konkrete Situation des Nutzers.
          </P>
          <P>
            Die Haftung des Anbieters ist der Höhe nach auf den Betrag begrenzt, den der Nutzer in
            den letzten 30 Tagen gezahlt hat.
          </P>

          <H3>7. Sicherheitshinweise</H3>
          <UL>
            <li>Lassen Sie Empfehlungen der KI vor einer Entscheidung von einschlägigen Fachleuten prüfen</li>
            <li>Übermitteln Sie der Anwendung keine Angaben, die ein Staats- oder Geschäftsgeheimnis darstellen</li>
            <li>Melden Sie der Administration verdächtige Aktivitäten</li>
          </UL>

          <H3>8. Rückerstattung</H3>
          <P>Eine Rückerstattung erfolgt AUSSCHLIESSLICH in den folgenden Fällen:</P>
          <UL>
            <li>technische Störung von mehr als 72 Stunden ununterbrochen</li>
            <li>doppelte Abbuchung aufgrund eines technischen Fehlers</li>
          </UL>
          <P>
            Die Beanstandung ist an support@linkeon.ru zu richten und wird innerhalb von
            10 Werktagen geprüft. Die Rückerstattung erfolgt innerhalb von 30 Tagen abzüglich der
            Gebühren der Zahlungssysteme (3–5 %).
          </P>

          <H3>9. Streitbeilegung</H3>
          <P>
            Alle Streitigkeiten werden im Verhandlungswege unter Einhaltung des obligatorischen
            vorgerichtlichen Verfahrens beigelegt. Vor Anrufung des Gerichts hat der Nutzer eine
            schriftliche Beanstandung an support@linkeon.ru zu senden. Kommt keine Einigung
            zustande, werden die Streitigkeiten gerichtlich am Sitz des Beklagten nach dem Recht
            der Russischen Föderation entschieden.
          </P>

          <H3>10. Änderung der Bedingungen</H3>
          <P>
            Die Administration behält sich das Recht vor, die Bedingungen dieser
            Nutzungsbedingungen jederzeit zu ändern. Die fortgesetzte Nutzung der Anwendung nach
            Vornahme von Änderungen gilt als Einverständnis des Nutzers mit den neuen Bedingungen.
          </P>
        </>
      )}

      {type === 'privacy' && (
        <>
          <div className="text-xs text-gray-500">Fassung vom 5. August 2026</div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
            <div className="font-semibold text-gray-900">
              Verantwortlicher für die Verarbeitung personenbezogener Daten
            </div>
            <div><strong>Name:</strong> Dmitry Viktorovich Volkov</div>
            <div><strong>INN:</strong> 463404496646</div>
            <div><strong>Status:</strong> Zahler der Steuer auf Berufseinkommen (Selbstständiger)</div>
            <div><strong>Kontakt-E-Mail:</strong> support@linkeon.ru</div>
          </div>
          <P>
            Diese Datenschutzerklärung gilt für alle personenbezogenen Daten, die der
            Verantwortliche während der Nutzung der Anwendung LINKEON.IO über den Nutzer erhalten
            kann.
          </P>

          <H3>1. Erhebung von Informationen</H3>
          <P>Wir erheben die folgenden Informationen:</P>
          <UL>
            <li>Telefonnummer zur Authentifizierung</li>
            <li>Vorname, Nachname, E-Mail-Adresse (freiwillig)</li>
            <li>vom Nutzer eingegebene Angaben zu Unternehmen, Zielen und Kontext</li>
            <li>Verlauf der Nachrichten und der Interaktionen mit den KI-Assistenten</li>
            <li>technische Informationen über das Gerät und die Nutzung der Anwendung</li>
          </UL>

          <H3>1.1. Anmeldung über Dienste Dritter</H3>
          <P>
            Neben der Anmeldung mit einer Telefonnummer und mit einer E-Mail-Adresse ermöglicht die
            Anwendung die Anmeldung über Dienste Dritter: Google, Yandex, Taler ID und Apple.
          </P>
          <P>
            Bei einer solchen Anmeldung erhält der Verantwortliche von dem gewählten Dienst eine
            dauerhafte Kennung des Kontos, eine E-Mail-Adresse sowie die Angabe, ob diese Adresse
            bestätigt ist. Das Passwort des Kontos beim Dienst eines Dritten wird dem
            Verantwortlichen nicht übermittelt und ist ihm nicht bekannt.
          </P>
          <P>
            Apple ermöglicht es, die tatsächliche Adresse zu verbergen. In diesem Fall erhält der
            Verantwortliche eine Ersatzadresse der Form <strong>***@privaterelay.appleid.com</strong> oder
            überhaupt keine Adresse, und das Konto wird allein anhand der Kennung erkannt.
          </P>
          <P>
            Die erhaltene Adresse wird unter anderem zur Verknüpfung von Konten verwendet: Ist sie
            vom Dienst bestätigt und dem Verantwortlichen bereits bekannt, so führt die Anmeldung in
            das bestehende Konto und legt kein neues an.
          </P>
          <P>
            Der Verantwortliche erhält keinen Zugriff auf die Inhalte der Konten bei Diensten
            Dritter und nimmt dort keine Handlungen im Namen des Nutzers vor. Die Liste der
            verknüpften Anmeldeverfahren ist in der Anwendung einsehbar; jedes davon kann entfernt
            werden, sofern es nicht das einzige ist.
          </P>

          <H3>2. Verwendung der Informationen</H3>
          <UL>
            <li>Bereitstellung und Verbesserung der Leistungen der Anwendung</li>
            <li>Verarbeitung der KI-Anfragen des Nutzers</li>
            <li>Personalisierung der Antworten der Assistenten</li>
            <li>Gewährleistung der Sicherheit und Verhinderung von Betrug</li>
            <li>Kontaktaufnahme mit dem Nutzer in wichtigen, die Anwendung betreffenden Angelegenheiten</li>
          </UL>

          <H3>2.1. Verarbeitung von Zahlungsinformationen</H3>
          <P>
            Die Anwendung <strong>verarbeitet und speichert KEINE</strong> Bankkartendaten
            (Kartennummer, Gültigkeitsdauer, CVV). Sämtliche Zahlungsdaten werden ausschließlich
            von zertifizierten Zahlungsdienstleistern verarbeitet, die dem Standard PCI DSS
            entsprechen.
          </P>
          <P>Die Zahlungshistorie wird gemäß dem Steuerrecht der Russischen Föderation 5 Jahre lang aufbewahrt.</P>

          <H3>3. Datenverarbeitung mithilfe künstlicher Intelligenz</H3>
          <P>
            Zur Verarbeitung der Anfragen des Nutzers setzt die Anwendung Technologien künstlicher
            Intelligenz von Anbietern aus Drittunternehmen ein:
          </P>
          <UL>
            <li>
              <strong>OpenAI</strong> (ChatGPT, GPT-4, GPT-5) — Verarbeitung von Textanfragen.
              Sitzland: USA
            </li>
            <li>
              <strong>Anthropic</strong> (Claude) — Verarbeitung von Textanfragen.
              Sitzland: USA
            </li>
            <li>
              <strong>Google</strong> (Gemini — Verarbeitung von Anfragen und Analyse der
              hochgeladenen Stimmprobe; Imagen 4.0 Ultra und Nano Banana — Erzeugung von Bildern;
              Veo — Erzeugung von Videos). Sitzland: USA
            </li>
            <li>
              <strong>ElevenLabs</strong> — Erstellung eines Stimmmodells anhand der hochgeladenen
              Stimmprobe und Vertonung von Videos mit dieser Stimme. Sitzland: USA
            </li>
            <li>
              <strong>DeepSeek</strong> — Erstellung der Begrüßungsnachrichten im Chat mit den
              KI-Assistenten. <strong>Sitzland: Volksrepublik China</strong>
            </li>
            <li>
              <strong>Kling (Kuaishou)</strong> — Erzeugung und Bearbeitung von Videos.{' '}
              <strong>Sitzland: Volksrepublik China</strong>
            </li>
            <li>
              <strong>Yandex SpeechKit</strong> — Spracherkennung bei der Spracheingabe.
              Sitzland: Russische Föderation
            </li>
            <li>sonstige KI-Dienste, die für einzelne Funktionen der Anwendung herangezogen werden</li>
          </UL>
          <P>
            <strong>Übermittelte Daten:</strong> der Text der Anfragen und Nachrichten des Nutzers,
            der Verlauf des Dialogs mit dem Assistenten und der Kontext des Profils; für die
            Funktionen der Erzeugung — Textbeschreibungen sowie vom Nutzer hochgeladene Bilder und
            Audioaufnahmen; bei der Spracheingabe — der Audiostream vom Mikrofon. Im Rahmen des
            Kontexts des Profils werden den KI-Anbietern Vorname und Nachname des Nutzers sowie
            seine Interessen, Werte, Fähigkeiten und Absichten übermittelt. Der Inhalt des
            Schriftverkehrs und des Profils wird in ursprünglicher Form übermittelt und nicht
            anonymisiert. Die Nutzerkennung, die Telefonnummer und Zahlungsdaten werden den
            KI-Anbietern NICHT übermittelt.
          </P>
          <P>
            <strong>Klonen der Stimme.</strong> Im Bereich der Videoerstellung kann der Nutzer die
            Vertonung mit der eigenen Stimme aktivieren. In diesem Fall wird die von ihm
            hochgeladene Stimmprobe an Google (Modell Gemini) übermittelt — zur Erstellung einer
            textlichen Beschreibung der Stimme — sowie an ElevenLabs — zur Erstellung eines
            Stimmmodells, mit dem anschließend das erzeugte Video vertont wird. Die Probe wird
            ausschließlich auf Initiative des Nutzers und nur bei Bestätigung einer gesonderten
            Einwilligung hochgeladen; ohne eine solche Bestätigung erfolgt kein Upload. Die
            Audiodatei der Probe selbst wird vom Verantwortlichen nicht gespeichert — gespeichert
            werden die Kennung des Stimmmodells auf Seiten von ElevenLabs und die textliche
            Beschreibung der Stimme. Der Nutzer kann das Stimmmodell in der Oberfläche der
            Anwendung löschen; es wird dabei auch auf Seiten von ElevenLabs gelöscht.
          </P>
          <P>
            Nach der Übermittlung der Daten an die KI-Anbieter hat der Verantwortliche keine
            Kontrolle über deren weitere Verarbeitung. Mit der Nutzung der Anwendung erklärt sich
            der Nutzer ausdrücklich mit der Übermittlung seiner Daten zur Verarbeitung mithilfe von
            KI-Technologien einverstanden.
          </P>

          <H3>3.1. Übermittlung personenbezogener Daten in Drittländer</H3>
          <P>
            Ein Teil der in Abschnitt 3 aufgeführten Anbieter befindet sich außerhalb der
            Russischen Föderation. Die Verarbeitung der Anfragen des Nutzers hat eine
            grenzüberschreitende Übermittlung personenbezogener Daten im Sinne von Artikel 12 des
            Föderalen Gesetzes vom 27.07.2006 Nr. 152-FZ „Über personenbezogene Daten“ zur Folge.
          </P>
          <P>
            <strong>Wir weisen ausdrücklich darauf hin: Ein Teil der Daten des Nutzers wird in die
            Volksrepublik China übermittelt.</strong> In die VR China übermittelt werden: der Text
            der Nachrichten des Nutzers an den KI-Assistenten zusammen mit dem Kontext seines
            Profils bei der Erstellung der Begrüßungsnachrichten (Anbieter DeepSeek) sowie die
            Textbeschreibungen, Bilder und Audioaufnahmen, auf deren Grundlage
            Videos erzeugt und bearbeitet werden (Anbieter Kling / Kuaishou). Die Volksrepublik
            China ist nicht Vertragspartei des Übereinkommens des Europarats zum Schutz des
            Menschen bei der automatischen Verarbeitung personenbezogener Daten und ist nicht in
            der Liste der ausländischen Staaten enthalten, die einen angemessenen Schutz der Rechte
            der betroffenen Personen gewährleisten. Das Niveau des rechtlichen Schutzes
            personenbezogener Daten in der VR China weicht von dem durch die Gesetzgebung der
            Russischen Föderation festgelegten Niveau ab.
          </P>
          <P>
            Darüber hinaus werden Daten in die USA übermittelt (OpenAI, Anthropic, Google,
            ElevenLabs) — unter anderem die Stimmprobe des Nutzers bei Nutzung der Funktion zur
            Vertonung von Videos mit der eigenen Stimme. Die Spracherkennung bei der Spracheingabe
            erfolgt auf dem Gebiet der Russischen Föderation (Yandex SpeechKit).
          </P>
          <P>
            Mit der Nutzung der KI-Assistenten, der Funktionen zur Erzeugung von Bildern und Videos
            sowie der Spracheingabe willigt der Nutzer in eine solche grenzüberschreitende
            Übermittlung ein, einschließlich der Übermittlung von Daten in die VR China. Ist die
            grenzüberschreitende Übermittlung für den Nutzer nicht hinnehmbar, so sollte er von der
            Nutzung der entsprechenden Funktionen der Anwendung absehen. Teilen Sie den
            KI-Assistenten keine Angaben mit, deren Übermittlung außerhalb der Russischen
            Föderation für Sie nicht zulässig ist.
          </P>

          <H3>4. Weitergabe von Daten an Dritte</H3>
          <P>Wir verkaufen Ihre personenbezogenen Daten nicht und geben sie nicht an Dritte weiter, ausgenommen:</P>
          <UL>
            <li>mit Ihrer ausdrücklichen Einwilligung</li>
            <li>aufgrund von Anforderungen der Gesetzgebung der Russischen Föderation</li>
            <li>zum Schutz unserer Rechte und der Sicherheit der Nutzer</li>
            <li>an Dienstleister, die in unserem Auftrag tätig sind (unter Wahrung der Vertraulichkeit)</li>
          </UL>

          <H3>5. Datensicherheit</H3>
          <P>
            Wir setzen moderne Verschlüsselungs- und Sicherheitstechnologien ein (TLS, geschützte
            Speicherung von Token). Zugriff auf personenbezogene Daten haben ausschließlich befugte
            Mitarbeiter.
          </P>

          <H3>6. Ihre Rechte</H3>
          <UL>
            <li>Auskunft über Ihre personenbezogenen Daten zu erhalten</li>
            <li>unrichtige Daten berichtigen zu lassen</li>
            <li>Ihr Konto und Ihre Daten zu löschen</li>
            <li>die Verarbeitung der Daten einschränken zu lassen</li>
            <li>die Einwilligung in die Verarbeitung der Daten zu widerrufen</li>
          </UL>

          <H3>7. Speicherung der Daten</H3>
          <UL>
            <li><strong>Aktive Konten:</strong> unbefristet bis zur Löschung durch den Nutzer</li>
            <li><strong>Gelöschte Konten:</strong> 30 Kalendertage, danach vollständige Löschung</li>
            <li><strong>Zahlungshistorie:</strong> 5 Jahre (Vorgabe des Steuerrechts der Russischen Föderation)</li>
            <li><strong>Sicherheitsprotokolle:</strong> 6 Monate</li>
            <li><strong>Sicherungskopien:</strong> werden alle 30 Tage überschrieben</li>
          </UL>

          <H3>8. Cookies und Analyse</H3>
          <P>
            Auf der Website linkeon.io werden Cookies, der lokale Speicher des Browsers
            (localStorage, sessionStorage) sowie Zähler von Web-Analyse- und Werbediensten Dritter
            eingesetzt:
          </P>
          <UL>
            <li>
              <strong>Yandex.Metrica</strong>, Zähler Nr. 105902201 — Besuchsstatistik und
              Zielerreichung. Aktiviert sind Webvisor (Aufzeichnung der Handlungen des Nutzers auf
              der Seite), Klickkarte, Verfolgung externer Links und die genaue Absprungrate. Das
              Skript des Zählers wird bei der ersten Handlung des Nutzers auf der Seite geladen
              (Scrollen, Berührung, Mausbewegung, Tastendruck, Klick) oder spätestens 6 Sekunden
              nach dem Laden der Seite.
            </li>
            <li>
              <strong>VK Ads / top.Mail.Ru</strong>, Pixel Nr. 3773048 — Erfassung des Besuchs
              (Ereignis pageView), um einen Klick auf eine Anzeige einem Besuch der Website
              zuzuordnen. Das Pixel wird bei jedem Laden der Seite initialisiert, ohne vorherige
              Handlung des Nutzers und ohne gesonderte Einholung einer Einwilligung.
            </li>
          </UL>
          <P>
            <strong>Eigene Telemetrie.</strong> Die Website linkeon.io übermittelt an den Server des
            Verantwortlichen (my.linkeon.io, Methode /webhook/events/track) folgende Ereignisse:{' '}
            <em>landing_view</em> — den Besuch der Website; <em>landing_cta_click</em> — den Klick
            auf die Schaltfläche zum Wechsel in die Anwendung; <em>landing_engagement</em> — das
            Ergebnis des Besuchs. Zusammen mit den Ereignissen werden übermittelt: die Kennung der
            Sitzung des Browser-Tabs, die Herkunft des Besuchs (Parameter utm_* und ref oder der
            Domainname der verweisenden Website), die Bezeichnung der Werbekampagne, die Adresse
            der verweisenden Seite, die Verweildauer auf der Seite, die maximale Scrolltiefe sowie
            Angaben dazu, ob die Schaltfläche zum Wechsel dem Nutzer angezeigt wurde und ob sie
            angeklickt wurde.
          </P>
          <P>
            <strong>Lokaler Speicher.</strong> Im localStorage des Browsers werden unter dem
            Schlüssel <em>ll_attribution</em> die Herkunftsparameter aus der Adresse der Seite
            gespeichert (utm_source, utm_medium, utm_campaign, utm_term, utm_content, ref); sie
            werden bei späteren Besuchen erneut verwendet. Im sessionStorage werden die Kennung der
            Sitzung des Browser-Tabs und der Vermerk gespeichert, dass der Besuch bereits gezählt
            wurde.
          </P>
          <P>
            Cookies lassen sich in den Einstellungen des Browsers verwalten; die Daten des lokalen
            Speichers werden zusammen mit den Daten der Website mit den Mitteln des Browsers
            gelöscht. Das Deaktivieren von Cookies und von Zählern Dritter kann die Funktionsweise
            einzelner Funktionen einschränken.
          </P>

          <H3>9. Änderungen dieser Erklärung</H3>
          <P>
            Wir können diese Erklärung aktualisieren. Über wesentliche Änderungen informieren wir
            über die Anwendung oder auf anderem Wege.
          </P>

          <H3>10. Kontakt</H3>
          <P>
            Wenn Sie Fragen zu dieser Erklärung oder zur Verarbeitung Ihrer Daten haben, wenden Sie
            sich an uns unter support@linkeon.ru.
          </P>
        </>
      )}

      {type === 'pdn' && (
        <>
          <div className="text-xs text-gray-500">Fassung vom 5. August 2026</div>
          <P>
            Mit der Registrierung und der Nutzung der Anwendung LINKEON.IO willigt der Nutzer
            gegenüber Dmitry Viktorovich Volkov (INN 463404496646, E-Mail support@linkeon.ru),
            nachfolgend — der „Verantwortliche“, in die Verarbeitung seiner personenbezogenen Daten
            zu den nachstehend genannten Bedingungen ein.
          </P>

          <H3>1. Umfang der personenbezogenen Daten</H3>
          <UL>
            <li>Mobiltelefonnummer</li>
            <li>Vorname, Nachname, E-Mail-Adresse (nach Wunsch des Nutzers)</li>
            <li>Inhalt der in die Anwendung eingegebenen Nachrichten, Anfragen und Parameter des Geschäftsprofils</li>
            <li>Verlauf der Interaktionen mit den KI-Assistenten, Protokolle der Sitzungen</li>
            <li>vom Nutzer hochgeladene Bilder und Audioaufnahmen sowie der Audiostream vom
              Mikrofon bei Nutzung der Spracheingabe</li>
            <li>Stimmprobe der eigenen Stimme — nur bei Nutzung der Funktion zur Vertonung von
              Videos mit der eigenen Stimme und nur bei gesonderter Bestätigung der Einwilligung</li>
            <li>technische Informationen über das Gerät und Angaben zu Zahlungen</li>
          </UL>

          <H3>2. Zwecke der Verarbeitung</H3>
          <UL>
            <li>Identifizierung und Authentifizierung des Nutzers</li>
            <li>Erfüllung der Nutzungsbedingungen (des öffentlichen Angebots)</li>
            <li>Verarbeitung von KI-Anfragen und Bereitstellung von Antworten</li>
            <li>Durchführung von Zahlungen und Erstellung von Belegen</li>
            <li>Unterstützung des Nutzers und Bearbeitung von Beanstandungen</li>
            <li>Analyse der Nutzung und Verbesserung des Dienstes (in anonymisierter Form)</li>
          </UL>

          <H3>3. Verzeichnis der Handlungen mit personenbezogenen Daten</H3>
          <P>
            Erhebung, Aufzeichnung, Systematisierung, Ansammlung, Speicherung, Präzisierung
            (Aktualisierung, Änderung), Auslesen, Verwendung, Übermittlung (Bereitstellung,
            Zugang), Anonymisierung, Sperrung, Löschung und Vernichtung personenbezogener Daten —
            sowohl unter Einsatz von Mitteln der Automatisierung als auch ohne solche.
          </P>

          <H3>4. Weitergabe von Daten an Dritte</H3>
          <P>
            Zur Verarbeitung der KI-Anfragen werden personenbezogene Daten an Anbieter aus
            Drittunternehmen übermittelt: OpenAI (USA), Anthropic (USA), Google (USA),
            ElevenLabs (USA), DeepSeek (VR China), Kling / Kuaishou (VR China),
            Yandex SpeechKit (Russische Föderation) sowie an sonstige KI-Dienste, die für einzelne
            Funktionen der Anwendung herangezogen werden.
          </P>
          <P>
            Übermittelt werden: der Text der Nachrichten und Anfragen des Nutzers, der Verlauf des
            Dialogs mit dem Assistenten, der Kontext des Profils (Vorname, Nachname, Interessen,
            Werte, Fähigkeiten, Absichten), hochgeladene Bilder und Audioaufnahmen, der Audiostream
            bei der Spracheingabe sowie die Stimmprobe bei Nutzung der Funktion zur Vertonung von
            Videos mit der eigenen Stimme. Der Inhalt des Schriftverkehrs und des Profils wird in
            ursprünglicher Form übermittelt und nicht anonymisiert. Die Nutzerkennung und die
            Telefonnummer werden den KI-Anbietern nicht übermittelt.
          </P>
          <P>
            Die Übermittlung von Zahlungsdaten erfolgt an zertifizierte Zahlungsdienstleister
            (YooKassa u. a.). An sonstige Dritte werden personenbezogene Daten nicht übermittelt,
            ausgenommen die unmittelbar durch die Gesetzgebung der Russischen Föderation
            vorgesehenen Fälle.
          </P>

          <H3>4.1. Übermittlung personenbezogener Daten in Drittländer, insbesondere in die VR China</H3>
          <P>
            Ein Teil der aufgeführten Anbieter befindet sich außerhalb der Russischen Föderation;
            deshalb willigt der Nutzer auch in die grenzüberschreitende Übermittlung seiner
            personenbezogenen Daten ein (Artikel 12 des Föderalen Gesetzes vom 27.07.2006
            Nr. 152-FZ „Über personenbezogene Daten“).
          </P>
          <P>
            <strong>Daten werden unter anderem in die Volksrepublik China übermittelt:</strong> der
            Text der Nachrichten des Nutzers zusammen mit dem Kontext seines Profils — bei der
            Erstellung der Begrüßungsnachrichten (Anbieter DeepSeek); Textbeschreibungen, Bilder
            und Audioaufnahmen — bei der Erzeugung und Bearbeitung von Videos (Anbieter
            Kling / Kuaishou). Die Volksrepublik China ist nicht Vertragspartei des Übereinkommens
            des Europarats zum Schutz des Menschen bei der automatischen Verarbeitung
            personenbezogener Daten und ist nicht in der Liste der ausländischen Staaten enthalten,
            die einen angemessenen Schutz der Rechte der betroffenen Personen gewährleisten; das
            Niveau des rechtlichen Schutzes personenbezogener Daten in der VR China weicht von dem
            durch die Gesetzgebung der Russischen Föderation festgelegten Niveau ab.
          </P>
          <P>
            Daten werden zudem in die USA übermittelt (OpenAI, Anthropic, Google, ElevenLabs). Eine
            ausführliche Beschreibung der grenzüberschreitenden Übermittlung findet sich in
            Abschnitt 3.1 der Datenschutzerklärung.
          </P>

          <H3>5. Geltungsdauer der Einwilligung</H3>
          <P>
            Diese Einwilligung gilt ab dem Zeitpunkt der Registrierung bis zu ihrem Widerruf durch
            den Nutzer oder bis zur Löschung des Kontos. Der Nutzer ist berechtigt, die
            Einwilligung jederzeit zu widerrufen, indem er eine Anfrage an support@linkeon.ru
            richtet. Der Widerruf führt zur Löschung des Kontos und der Daten innerhalb der in der
            Datenschutzerklärung genannten Fristen (bis zu 30 Kalendertage).
          </P>

          <H3>6. Rechte der betroffenen Person</H3>
          <P>
            Der Nutzer ist berechtigt, Auskunft über den Umfang und die Verarbeitung seiner Daten
            zu erhalten, deren Präzisierung, Sperrung oder Vernichtung zu verlangen, wenn sie
            unvollständig, unrichtig oder nicht mehr aktuell sind, sowie Handlungen des
            Verantwortlichen bei Roskomnadzor oder vor Gericht anzufechten.
          </P>

          <H3>7. Kontakt</H3>
          <P>
            Bei allen Fragen zur Verarbeitung personenbezogener Daten: support@linkeon.ru. Anfragen
            werden innerhalb von 30 Kalendertagen bearbeitet.
          </P>
        </>
      )}
    </>
  );
}
