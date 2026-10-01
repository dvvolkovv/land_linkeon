import type { AssistantPageText } from '../../types';

/** Анна — бухгалтер. Перевод pages/ru/anna.ts. Пример разговора — docs/assistant-pages/examples/anna.md. */
const anna: AssistantPageText = {
  title: 'KI-Buchhalter online: Steuern für Selbstständige – Anna | Linkeon',
  description:
    'Anna – KI-Buchhalterin online. Berechnet Steuern und Abgaben für Selbstständige und GmbH, erklärt Steuerregime, Mehrwertsteuer und Fristen. 25.000 Tokens bei der Registrierung.',
  h1: 'Anna – KI-Buchhalterin online: Steuern für Selbstständige und GmbH einfach erklärt',
  lead: 'Der Brief vom Finanzamt kam am Freitagabend, und Ihre Buchhaltung meldet sich erst am Montag. Anna erklärt in einfachen Worten, was man von Ihnen will, wie viel Sie zahlen müssen und bis wann.',
  card: 'Steuern und Abgaben für Selbstständige und GmbH, Steuerregime, Mehrwertsteuer. Rechnet mit Ihren Zahlen und erklärt ohne Fachjargon.',
  cta: 'Mit Anna sprechen',
  situations: [
    'Sie sind Einzelunternehmer im vereinfachten Steuersystem (USN) und nicht sicher, um wie viel Sie die Steuer mit Ihren Sozialbeiträgen senken können.',
    'Sie gründen zum ersten Mal und wählen zwischen Selbstbeschäftigung, Einzelunternehmen mit USN und dem Patentsystem (einer Pauschalsteuer).',
    'Das Finanzamt verlangt Erläuterungen zu Ihrer Steuererklärung, und Sie wissen nicht, was Sie antworten sollen.',
    'Sie stellen den ersten Mitarbeiter ein und möchten wissen, welche Lohnsteuer und welche Sozialabgaben Sie für ihn zahlen müssen.',
    'Ihre Einnahmen wachsen, und Sie wissen nicht, ab welchem Umsatz Mehrwertsteuer fällig wird.',
  ],
  example: {
    question:
      'Ich bin Einzelunternehmer mit USN „Einnahmen“ und komme dieses Jahr auf etwa 3 Mio. Rubel. Welche Steuern und Beiträge muss ich zahlen und wann?',
    answer: `Wenn Sie keine Angestellten haben, sieht es bei Einnahmen von 3 Mio. ₽ für 2026 so aus.

Was zu zahlen ist

Feste Beiträge „für sich selbst“ – 57.390 ₽ – bis 28.12.2026
1 % der Einnahmen über 300 Tsd. – (3.000.000 − 300.000) × 1 % = 27.000 ₽ – bis 01.07.2027
USN 6 % – 180.000 ₽ vor Abzug der Beiträge – Vorauszahlungen und Restbetrag nach dem Zeitplan unten

Die Steuer lässt sich um alle Beiträge mindern, bis zu 100 %. Das ist Einzelunternehmern ohne Angestellte erlaubt.
Steuer: 180.000 − 57.390 − 27.000 = 95.610 ₽.
Zusammen mit den Beiträgen liegt die Belastung bei ≈ 180 Tsd. ₽, also bei etwa 6 % der Einnahmen.

Zeitplan
— Die USN-Vorauszahlungen sind bis zum 28. April, 28. Juli und 28. Oktober fällig. …
— Die Meldung zur Vorauszahlung ist bis zum 25. desselben Monats fällig. Die nächste reichen Sie bis zum 26.10.2026 ein (der 25. fällt auf einen Sonntag) und zahlen bis zum 28.10.2026 für 9 Monate.
— Jahressteuer – bis 28.04.2027. Steuererklärung – bis 25.04.2027. …

Wichtig
— Mehrwertsteuer zahlen Sie nicht. 2026 sind Einzelunternehmer mit USN bei Einnahmen bis 20 Mio. ₽ von der Mehrwertsteuer befreit. 2027 liegt die Schwelle bei 15 Mio. ₽, 2028 bei 10 Mio. ₽.
…

Wenn Sie möchten, kann ich die genauen Vorauszahlungen pro Quartal ausrechnen. Schicken Sie mir dafür Ihre Einnahmen für jedes Quartal.`,
  },
  can: [
    'Berechnet Steuern und Beiträge mit Ihren Zahlen: USN „Einnahmen“ und „Einnahmen minus Ausgaben“, Patentsystem, Selbstbeschäftigung, allgemeines Steuersystem (OSNO).',
    'Erklärt Mehrwertsteuer, Gewinnsteuer, Einkommensteuer und Sozialversicherungsbeiträge – auch für Mitarbeiter.',
    'Hilft bei Buchführung und Belegen: Buchungssätze, Bilanz, Abschlüsse nach den russischen Rechnungslegungsstandards (RSBU), Ursprungsbelege, Kassenführung.',
    'Sagt, wie Sie dem Finanzamt und den Sozialkassen antworten, und hilft bei den Grundlagen von Lohnabrechnung und Personalwesen.',
    'Sucht legale Wege, weniger zu zahlen, und warnt, wenn sich eine Regel kürzlich geändert hat.',
    'Ist eine Frage nicht eindeutig, fragt sie zuerst nach Ihrem Steuerregime und Ihrer Rechtsform.',
  ],
  cannot: [
    'Reicht keine Meldungen und Abschlüsse für Sie ein und führt nicht Ihre Bücher. Anna ist Beraterin, keine Wirtschaftsprüferin: Ihre Antworten dienen der Information.',
    'Empfiehlt keine Konstrukte, die gegen das Steuerrecht verstoßen.',
    'Ersetzt in einer schwierigen Lage weder Buchhalter noch Juristen. Wenn es ohne sie nicht geht, sagt Anna das offen.',
  ],
  faq: [
    {
      q: 'Nach welchem Recht antwortet Anna?',
      a: 'Standardmäßig nach russischem Recht: dem Steuerrecht der Russischen Föderation und den russischen Rechnungslegungsstandards (RSBU). Wenn Ihr Unternehmen in einem anderen Land sitzt, nennen Sie es – Anna berücksichtigt es.',
    },
    {
      q: 'Kann ich einen Kontoauszug oder eine Steuererklärung als Datei schicken?',
      a: 'Ja, als PDF, Tabelle oder Dokument. Die Datei wird vollständig gelesen, und Anna rechnet mit Ihren Zahlen.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Weiß Anna schon, womit Sie Ihr Geld verdienen und welche Umsätze Sie haben, müssen Sie es Finanzchef Witali nicht noch einmal erklären.',
    },
    {
      q: 'Wer sieht meine Zahlen?',
      a: 'Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default anna;
