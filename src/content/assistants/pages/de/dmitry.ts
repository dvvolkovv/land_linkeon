import type { AssistantPageText } from '../../types';

/** Дмитрий — технический директор. Перевод pages/ru/dmitry.ts. */
const dmitry: AssistantPageText = {
  title: 'CTO as a Service: externer technischer Leiter – Dmitrij | Linkeon',
  description:
    'Dmitrij – KI-Assistent als externer CTO. Prüft Kostenvoranschläge von Dienstleistern und sagt, ob Sie Entwickler einstellen oder einen fertigen Dienst nutzen sollten.',
  h1: 'Dmitrij – externer technischer Leiter für alle, die selbst nicht programmieren',
  lead: 'Sie müssen etwas entwickeln lassen und wissen nicht, was das kosten darf. Dmitrij schlägt zwei, drei Varianten vor, von günstig bis gründlich, und sagt, womit Sie für die günstige Lösung bezahlen.',
  card: 'Architektur, Zeitpläne und Kosten, Dienstleister, erste Entwickler. Spricht über Entscheidungen und ihre Folgen, nicht in Fachbegriffen.',
  cta: 'Mit Dmitrij sprechen',
  situations: [
    'Der Dienstleister verlangt drei Monate und eine sechsstellige Summe, und Sie wissen nicht, was davon gerechtfertigt ist.',
    'Sie brauchen den ersten Entwickler fürs Team und wissen nicht, wie Sie ihn im Vorstellungsgespräch prüfen sollen.',
    'Die Website ist am Freitagabend ausgefallen, und es stellt sich heraus, dass niemand Backups gemacht hat.',
    'Der Dienstleister antwortet nicht mehr, und Code und Serverzugänge liegen bei ihm.',
    'Die Entwickler sagen, man müsse „alles neu schreiben“, und Sie wissen nicht, ob Sie das glauben sollen.',
  ],
  example: {
    question:
      'Ich möchte eine App für Terminbuchungen in meinem Salon. Soll ich Entwickler einstellen oder einen fertigen Dienst nehmen?',
    answer: `Nehmen Sie einen fertigen Dienst. Eine eigene Entwicklung für einen einzelnen Salon lohnt sich nicht: Sie zahlen hundertmal so viel und bekommen ein schlechteres Produkt als die, die es schon auf dem Markt gibt.

Varianten

DIKIDI
Bis zum Start – 1 Tag
Kosten – Es gibt einen kostenlosen Tarif, bezahlte ab einigen Hundert ₽/Monat
Was Sie in Kauf nehmen – Wenig Analytik und Automatisierung. …

YCLIENTS (Standard der Beauty-Branche in Russland)
Bis zum Start – 2–5 Tage
Kosten – Etwa 1.500–5.000 ₽/Monat für 1–3 Mitarbeiter
Was Sie in Kauf nehmen – Sie zahlen jeden Monat. Viele Einstellungen, in der ersten Woche müssen Sie sich einarbeiten

Eigene App als Auftragsentwicklung
Bis zum Start – 4–8 Monate
Kosten – 1,5–4 Mio. ₽ für die Entwicklung + 50–150 Tsd. ₽/Monat für den Support
Was Sie in Kauf nehmen – Geld, Zeit und Abhängigkeit vom Dienstleister. …

Die Preise der Dienste sind Richtwerte, die Tarife ändern sich. Prüfen Sie sie vor der Wahl auf den Websites.

…

Das Hauptrisiko
Die gesamte Kundendatenbank liegt beim Dienst. Prüfen Sie gleich, ob sie sich nach Excel exportieren lässt: Wenn ja, sind Sie nicht für immer an den Dienst gebunden. Exportieren Sie einmal im Monat – das ist Ihr Backup.

Was Sie diese Woche tun können: Registrieren Sie sich bei DIKIDI und für die Testphase von YCLIENTS und legen Sie in beiden Ihre Leistungen und Mitarbeiter an. Schicken Sie den Buchungslink an 5–10 Stammkundinnen und schauen Sie, wo sie lieber buchen. Nach einer Woche behalten Sie den Dienst, der besser ankam.

Wie viele Mitarbeiter haben Sie? Davon hängt ab, welchen Tarif Sie wählen sollten.`,
  },
  can: [
    'Prüft Lastenhefte und Angebote von Dienstleistern: was an der Schätzung begründet ist und was nicht.',
    'Vergleicht Varianten – fertiger Dienst, No-Code, eigene Entwicklung – nach Dauer, Kostenrahmen und Risiken. Reicht ein fertiger Dienst, sagt er das, auch wenn Sie gefragt haben, wie man etwas entwickelt.',
    'Hilft beim Aufbau des Teams: wen Sie zuerst einstellen, Festanstellung oder Outsourcing, wie Sie einen Entwickler prüfen, wenn Sie selbst nicht programmieren.',
    'Hilft bei Dienstleistern: Lastenheft, Abnahme, Rechte am Code und Zugänge, technischer Teil des Vertrags.',
    'Klärt technische Schulden, Zuverlässigkeit und Sicherheit: was jetzt repariert werden muss und was warten kann, was zu tun ist, wenn alles ausgefallen ist, wie man personenbezogene Daten speichert und wer Zugänge bekommt.',
  ],
  cannot: [
    'Gibt keine Zeitschätzung als Versprechen aus: Jede Schätzung ist eine Spanne mit Annahmen, und Dmitrij sagt, was sie kippen kann.',
    'Ersetzt kein Sicherheitsaudit und garantiert keine Sicherheit. Er sagt, wo Risiken liegen und womit man sie kostengünstig senkt.',
    'Führt das Projekt nicht für Sie: Aufgaben an die Entwickler verteilen und die Arbeit abnehmen müssen Sie selbst.',
    'Ersetzt weder Anwalt noch Finanzexperten: Für juristische Vertragsformulierungen ist Alexej da, für die Wirtschaftlichkeit Witali.',
  ],
  faq: [
    {
      q: 'Muss ich mich mit Technik auskennen?',
      a: 'Nein. Dmitrij spricht über Entscheidungen und ihre Folgen, und einen Fachbegriff, der sich nicht vermeiden lässt, erklärt er in Klammern.',
    },
    {
      q: 'Kann ich ein Lastenheft oder den Kostenvoranschlag eines Dienstleisters schicken?',
      a: 'Ja, als PDF oder Dokument. Die Datei wird vollständig gelesen. Dmitrij sagt, was an der Schätzung begründet ist, was fehlt und was aus technischer Sicht in den Vertrag gehört.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Weiß Andrej schon, was Ihr Unternehmen macht, müssen Sie es Dmitrij nicht noch einmal erklären.',
    },
  ],
};

export default dmitry;
