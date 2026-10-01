import type { AssistantPageText } from '../../types';

/** Алексей — юрист. Перевод pages/ru/alexey.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const alexey: AssistantPageText = {
  title: 'KI-Anwalt online: Vertrag prüfen lassen – Alexej | Linkeon',
  description:
    'Alexej – KI-Anwalt online. Prüft Verträge und erklärt nach dem Gesetz, was bei Mietstreit, Kündigung, Scheidung oder Erbschaft zu tun ist. 25.000 Tokens bei der Registrierung.',
  h1: 'Alexej – KI-Anwalt online: Vertragsprüfung und Rechtsfragen',
  lead: 'Es ist spät am Abend, morgen soll der Vertrag unterschrieben werden, und niemand ist da, den Sie fragen könnten. Alexej erklärt in einfachen Worten, wo die Risiken stecken und was das Gesetz dazu sagt.',
  card: 'Verträge, Miete, Arbeit, Familie, Erbschaft. Erklärt die Rechtslage in einfachen Worten und sagt Schritt für Schritt, was zu tun ist.',
  cta: 'Mit Alexej sprechen',
  situations: [
    'Ein Auftragnehmer hat Ihnen einen Vertrag geschickt, und Sie wissen nicht, welche Folgen die Klausel zur Vertragsstrafe haben kann.',
    'Man bietet Ihnen einen Aufhebungsvertrag an, aber das Gehalt für den letzten Monat steht immer noch aus.',
    'Der Händler erstattet den Kaufpreis für ein Gerät nicht, das schon nach einer Woche kaputt war.',
    'Mit dem Erbe kommen auch Schulden, und Sie wissen nicht, ob Sie es annehmen oder ausschlagen sollen.',
    'Ein Mitgesellschafter will aus der GmbH aussteigen und will sich seinen Anteil auszahlen lassen.',
  ],
  example: {
    question:
      'Mein Vermieter will den Mietvertrag für die Wohnung vorzeitig kündigen und die Kaution nicht zurückzahlen. Was kann ich tun?',
    answer: `Guten Tag! Ich bin Alexej. Kurz gesagt: Der Vermieter kann Sie nicht einfach vor Ablauf der Mietzeit vor die Tür setzen und die Kaution behalten. Vieles hängt vom Wortlaut des Vertrags ab.

1. Kann er den Vertrag vorzeitig kündigen

Wenn Sie die Wohnung als Privatperson mieten, ist das ein Wohnraummietvertrag (Art. 671–688 des russischen Zivilgesetzbuchs, ZGB RF).

— Einseitig geht das nicht, wenn der Vertrag es nicht ausdrücklich erlaubt (Art. 310 ZGB RF).
…
— Gibt es keine Gründe, dürfen Sie bis zum Ende der Mietzeit in der Wohnung bleiben.

2. Kaution (Sicherheitsleistung)

Die Kaution wird zurückgezahlt, wenn es keine Zahlungsrückstände und keine Schäden an der Wohnung gibt (Art. 381.1 ZGB RF). … Wenn der Vermieter den Vertrag selbst kündigt, hat er in der Regel keinen Grund, die Kaution zu behalten. …

3. Was tun

1. Lesen Sie den Vertrag noch einmal. Suchen Sie nach der Laufzeit, einer Klausel zur vorzeitigen Kündigung und den Bedingungen für die Rückzahlung der Kaution.
2. Unterschreiben Sie nichts und ziehen Sie nicht „im Guten“ aus, bevor Sie entschieden haben, zu welchen Bedingungen.
3. Kommunizieren Sie schriftlich, per Messenger oder E-Mail. Bewahren Sie den Schriftverkehr und die Zahlungsbelege auf.
…
5. Schicken Sie ein Forderungsschreiben per Einschreiben mit Anlagenverzeichnis. Fordern Sie darin, die Kaution (und auf Wunsch auch die Umzugskosten) fristgerecht zu erstatten, zum Beispiel binnen 10 Tagen.
6. Antwortet er nicht, reichen Sie Klage ein. …

…

Für eine genauere Antwort brauche ich noch ein paar Angaben:
— Für welche Laufzeit wurde der Vertrag geschlossen, und gibt es eine Klausel zur vorzeitigen Kündigung?
— Wie ist die Kaution im Vertrag geregelt?
— Wie begründet der Vermieter die Kündigung?
— Brauchen Sie ein Muster für das Forderungsschreiben? Ich kann eines aufsetzen.`,
  },
  can: [
    'Prüft und entwirft Verträge: findet riskante Klauseln und erklärt, wie Sie einen bereits unterschriebenen Vertrag wieder auflösen.',
    'Hilft bei Streit mit einem Geschäft oder Dienstleister: was Sie verlangen können und wie Sie eine Erstattung durchsetzen.',
    'Klärt Fragen rund ums Wohnen: Miete, Kauf und Schenkung einer Wohnung, Streit mit dem Bauträger um eine Neubauwohnung, Eintragung des Eigentums.',
    'Antwortet zu Arbeit, Familie und Erbe: Kündigung und ausstehender Lohn, Scheidung und Vermögensaufteilung, Unterhalt, Erbschaft mit Schulden.',
    'Hilft Unternehmern: Gründung und Schließung von Einzelunternehmen und GmbH, Satzung, Austritt eines Gesellschafters, Verträge mit Geschäftspartnern.',
    'Verweist auf konkrete Artikel des russischen Zivil-, Arbeits- und Familiengesetzbuchs und zerlegt alles in Schritte: was zu tun ist, in welcher Reihenfolge, welche Unterlagen Sie brauchen.',
  ],
  cannot: [
    'Vertritt Sie nicht vor Gericht und reicht keine Unterlagen für Sie ein. Alexej ist Berater: Seine Antworten dienen der Information.',
    'Ersetzt keinen Rechtsanwalt in einem komplexen Fall, schon gar nicht im Strafrecht. Wenn es ohne Juristen oder Anwalt vor Ort nicht geht, sagt Alexej das offen.',
    'Zeigt keine Wege, das Gesetz zu umgehen.',
  ],
  faq: [
    {
      q: 'Nach welchem Recht antwortet Alexej?',
      a: 'Standardmäßig nach russischem Recht: dem Zivil-, Arbeits- und Familiengesetzbuch der Russischen Föderation und weiteren Gesetzen. Wenn Ihre Frage ein anderes Land betrifft, nennen Sie es – Alexej berücksichtigt es.',
    },
    {
      q: 'Kann ich den Vertrag als Datei schicken?',
      a: 'Ja, als PDF oder Dokument. Die Datei wird vollständig gelesen, und Alexej geht sie Punkt für Punkt durch und zeigt, wo die Risiken liegen.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Weiß Buchhalterin Anna schon, dass Sie Einzelunternehmer sind, müssen Sie es Alexej nicht noch einmal erklären.',
    },
    {
      q: 'Wer sieht meine Chats?',
      a: 'Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default alexey;
