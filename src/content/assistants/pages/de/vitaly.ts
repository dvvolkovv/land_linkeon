import type { AssistantPageText } from '../../types';

/** Виталий — финансовый директор. Перевод pages/ru/vitaly.ts. Пример разговора — docs/assistant-pages/examples/vitaly.md. */
const vitaly: AssistantPageText = {
  title: 'Finanzchef (CFO) online: Finanzmodell und Cashflow – Witali | Linkeon',
  description:
    'Witali – Finanzchef online. Erstellt Finanzmodell und Cashflow-Prognose, berechnet Unit Economics und Break-even und hilft beim privaten Budget.',
  h1: 'Witali – Finanzchef online: Finanzmodell, Cashflow, private Finanzen',
  lead: 'Der Umsatz wächst, aber auf dem Konto ist kein Geld; oder der Notgroschen will seit drei Jahren nicht zusammenkommen. Witali rechnet solche Fragen mit Ihren Zahlen durch und zeigt zwei, drei Szenarien – jeweils mit Annahmen und Hauptrisiko.',
  card: 'Geschäftliche und private Finanzen: Cashflow, Unit Economics, Finanzmodell, Steuerregime, Notgroschen und Sparen.',
  cta: 'Mit Witali sprechen',
  situations: [
    'Bank oder Investor wollen ein Finanzmodell sehen, und Sie haben nur die Umsätze nach Monaten.',
    'Der Umsatz ist gewachsen, und Sie müssen entscheiden: beim vereinfachten Steuersystem mit 6 % bleiben, zur Variante mit 15 % wechseln oder eine GmbH gründen.',
    'Die Werbung bringt Käufer, aber ob sich jeder einzelne davon rechnet, ist unklar.',
    'Sie wissen nicht, wie Sie sich selbst bezahlen sollen: als Gehalt, als Dividende oder ob Sie das Geld im Unternehmen lassen.',
    'Sie haben freies Geld und eine Kreditkarte mit 30 % Zinsen und wissen nicht, was zuerst kommt – tilgen oder anlegen.',
  ],
  example: {
    question:
      'Ich habe einen Onlineshop: Der Umsatz wächst, aber auf dem Konto ist nie Geld da. Wie finde ich heraus, wohin es verschwindet?',
    answer: `Fast immer liegt es daran, dass Gewinn und Geld auf dem Konto zwei verschiedene Dinge sind. Im wachsenden Handel fließt das Geld meist in Warenbestände und in die Lücke zwischen der Zahlung an den Lieferanten und dem Geld vom Käufer. Das lässt sich an einem Abend prüfen.

Schritt 1. Kapitalflussrechnung für 6–12 Monate

Laden Sie die Auszüge aller Konten herunter und ordnen Sie jede Zahlung einer Kategorie zu. …

Schritt 2. Wo in einem Onlineshop meist das Geld verloren geht

1. Warenbestände. Wenn Sie wachsen, kaufen Sie für künftige Verkäufe ein, und der Gewinn verwandelt sich in Ware im Lager. …
2. Finanzzyklus. Er wird so berechnet: Lagerdauer in Tagen + Tage bis zur Auszahlung durch den Marktplatz oder Zahlungsdienstleister − Tage Zahlungsziel beim Lieferanten. Zum Beispiel 60 + 14 − 0 = 74 Tage. Jeder Rubel Umsatz ist 74 Tage lang gebunden, deshalb braucht man umso mehr Geld, je schneller man wächst.
…

Schritt 3. Drei schnelle Checks

— Warenbestand in Geld (zum Einkaufspreis) heute und vor einem Jahr. Ist er ungefähr um dieselbe Summe gewachsen wie das „verschwundene“ Geld, haben Sie die Antwort.
…

Schicken Sie mir den Kontoauszug (Excel oder PDF) und den Export der Warenbestände für das letzte halbe Jahr. Ich ordne die Zahlungen den Kategorien zu, berechne Ihren Finanzzyklus und zeige, wie viel Geld schon gebunden ist und wie viel es beim jetzigen Wachstumstempo sein wird. …`,
  },
  can: [
    'Erstellt Cashflow-Prognose, Budget und Finanzmodell und analysiert die Gewinn- und Verlustrechnung.',
    'Berechnet Unit Economics, Break-even und die Amortisation von Investitionen: was ein Käufer kostet und ab welchem Durchschnittsbon Sie im Plus sind.',
    'Vergleicht Steuerregime und Rechtsformen anhand Ihres Umsatzes und hilft bei der Entscheidung, ob Sie sich Gehalt oder Dividende auszahlen.',
    'Hilft bei privaten Finanzen: Familienbudget, Notgroschen für 3–12 Monate, Sparen für eine Wohnung oder eine Ausbildung, steuerliche Abzüge.',
    'Rechnet mit Code statt nach Augenmaß und liefert ein Basis-, ein optimistisches und ein pessimistisches Szenario.',
    'Liest Kontoauszug, GuV oder Einnahmen-Ausgaben-Buch (KUDiR) aus der Datei und zeichnet Grafiken: Cashflow, Kostenstruktur, Szenarienvergleich.',
  ],
  cannot: [
    'Rät nicht zum Kauf einer bestimmten Aktie oder eines bestimmten Fonds: Witali ist kein Anlageberater. Er spricht über Prinzipien – Anlageklassen, Aufteilung, Risiko, Anlagehorizont.',
    'Garantiert kein Ergebnis: Jede Prognose ist ein Modell mit Annahmen, und Witali nennt die wichtigste davon.',
    'Lässt sich auf keine Steuertricks ein – nur auf legale Optimierung.',
  ],
  faq: [
    {
      q: 'Für welches Land rechnet Witali?',
      a: 'Standardmäßig für Russland: vereinfachtes Steuersystem, Patentsystem, Selbstbeschäftigung, individuelles Investitionskonto (IIS), steuerliche Abzüge. Rechnen kann er auch in Dollar oder Euro. Sitzt Ihr Unternehmen in einem anderen Land, nennen Sie es: Der Cashflow wird genauso berechnet, die lokalen Steuern prüfen Sie aber bitte mit einem Fachmann aus diesem Land.',
    },
    {
      q: 'Worin unterscheidet sich Witali von einem Buchhalter?',
      a: 'Für die Buchhaltung – Buchungen, Steuererklärungen, Lohnabrechnung – ist Buchhalterin Anna da. Bei Witali geht es um Entscheidungen für die Zukunft: was ein Vorgang für den Cashflow bedeutet und wie es weitergeht. Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Wer sieht meine Zahlen?',
      a: 'Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default vitaly;
