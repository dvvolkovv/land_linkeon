import type { AssistantPageText } from '../../types';

/** Роман — личный ассистент. Перевод pages/ru/roman.ts. Пример разговора — docs/assistant-pages/examples/roman.md. */
const roman: AssistantPageText = {
  title: 'Persönlicher KI-Assistent online für alle Aufgaben – Roman | Linkeon',
  description:
    'Roman – persönlicher KI-Assistent. Ob E-Mail, Angebot, Plan oder eine Frage zu Recht, Steuern und Marketing zugleich: Er klärt das selbst. 25.000 Tokens bei der Registrierung.',
  h1: 'Roman – persönlicher KI-Assistent für alle Aufgaben',
  lead: 'Ein Angebot bis Freitag, eine E-Mail, die Sie seit drei Tagen vor sich herschieben, eine Frage, bei der unklar ist, an wen Sie sich wenden sollen. Erzählen Sie Roman davon in Ihren eigenen Worten – er antwortet selbst und greift, wo nötig, auf das Wissen eines Anwalts, Buchhalters oder Marketers zurück.',
  card: 'Übernimmt jede Aufgabe. Fragen zu Vertrag, Steuern oder Werbung klärt er selbst – mit dem Wissen des passenden Spezialisten.',
  cta: 'Mit Roman sprechen',
  situations: [
    'Ein Kunde zahlt seine Rechnung seit zwei Monaten nicht, und Sie brauchen eine E-Mail – höflich, aber so, dass danach gezahlt wird.',
    'Sie starten eine neue Dienstleistung, und die Fragen kommen alle auf einmal: welcher Vertrag mit den Kunden, welche Steuer, wo Sie die ersten Käufer finden.',
    'Eine Fünf-Minuten-Frage – zur Steuererstattung, zur Warenrückgabe oder zu einer Vertragsklausel –, und Sie wissen nicht, wen Sie fragen sollen.',
    'Für das Meeting brauchen Sie eine Präsentation, für den Post ein Bild, und Sie möchten eine fertige Datei, nicht nur einen Rat.',
    'Die Woche ist auf die Minute verplant, und Sie möchten die Aufgaben so ordnen, dass das Wichtigste nicht im Kleinkram untergeht.',
  ],
  example: {
    question:
      'Bis Freitag muss ich ein Angebot für einen neuen Kunden vorbereiten – ein Yogastudio. Womit fange ich an?',
    answer: `Freitag ist schon morgen, also fangen wir mit dem Wichtigsten an.

Heute, 30–40 Minuten: Sammeln Sie die Eckdaten
1. Was für ein Studio: Größe, Zahl der Räume und Lehrer, wer die Kunden sind, online oder vor Ort.
2. Wo es hakt: wenige Neukunden, die Leute verlängern ihre Abos nicht, Chaos bei der Terminbuchung, schwache Social-Media-Kanäle.
…

Aufbau des Angebots (5–7 Seiten, nicht mehr)
1. Die Aufgabe des Kunden in seinen eigenen Worten: „Sie möchten …“.
…
5. Preis. Besser 2–3 Pakete: Basis, Optimal und Erweitert. So wählt der Kunde zwischen Varianten, statt „ja oder nein“ zu entscheiden.
…

Speziell für ein Yogastudio
— Ruhiger, warmer Ton, ohne aggressives Verkaufen.
…
— Zeigen Sie, dass Sie ihr Geschäft verstehen: Abos, Kundenbindung, Saisonalität (im Sommer flaut es ab, im September und Januar zieht es an).

Damit es bis Freitag klappt: Heute die Eckdaten sammeln und einen Entwurf schreiben, morgen früh gegenlesen und abschicken.

Damit die Frist nicht untergeht, habe ich für morgen, 12:00 Uhr, eine Aufgabe „Angebot an das Yogastudio schicken“ angelegt. … Wenn Ihnen eine andere Uhrzeit besser passt, sagen Sie es mir.

Was ich als Nächstes tun kann: Schreiben Sie mir, was Sie dem Studio verkaufen (Marketing, Website, Ausstattung, Buchhaltung oder etwas anderes) und was Sie schon über den Kunden wissen. Dann schreibe ich den fertigen Text des Angebots und mache daraus auf Wunsch ein Dokument oder eine Präsentation.`,
  },
  can: [
    'Übernimmt jede Aufgabe: E-Mail, Angebot, Plan, Text, Idee. Gibt eine konkrete, praktische Antwort: was zu tun ist und womit Sie anfangen.',
    'Stützt sich auf das Wissen der Linkeon-Spezialisten: Recht, Steuern, Marketing, Texte, Geschäftsstrategie, Karriere, Coaching.',
    'Bündelt eine Aufgabe, die mehrere Themen berührt, in einer Antwort: zum Beispiel Vertrag, Steuern und Werbung für eine neue Dienstleistung.',
    'Liefert das Ergebnis als Datei, erstellt Bilder nach Beschreibung und recherchiert im Internet, wenn die Aufgabe es verlangt.',
  ],
  cannot: [
    'Ersetzt keinen Anwalt, Buchhalter oder anderen Fachmann, wo deren Unterschrift und Haftung gefragt sind. Romans Antworten dienen der Information, die Entscheidung liegt bei Ihnen.',
    'Unterschreibt keine Dokumente und zahlt nicht für Sie: Den Vertrag unterschreiben und das Geld überweisen Sie selbst.',
  ],
  faq: [
    {
      q: 'Mit welchen Aufgaben kann ich zu Roman kommen?',
      a: 'Mit allen: von der E-Mail und dem Wochenplan bis zur Frage, in der sich Vertrag, Steuern und Werbung vermischen. Wenn Sie nicht wissen, an welchen Assistenten Sie sich wenden sollen, beginnen Sie mit Roman.',
    },
    {
      q: 'Kennt sich Roman mit Recht und Steuern aus?',
      a: 'Solche Fragen beantwortet er selbst und greift dabei auf das Wissen des passenden Spezialisten zurück: bei juristischen wie Anwalt Alexej, bei finanziellen wie Buchhalterin Anna. Wenn Sie direkt mit den beiden sprechen möchten, müssen Sie nichts noch einmal erzählen: Die Assistenten von Linkeon teilen ein Profil – was Sie einem erzählen, wissen alle.',
    },
    {
      q: 'Kann ich eine Datei schicken oder diktieren?',
      a: 'Ja. PDFs, Tabellen und Dokumente liest Roman vollständig, und statt zu tippen, können Sie diktieren.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Wer sieht meine Chats?',
      a: 'Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default roman;
