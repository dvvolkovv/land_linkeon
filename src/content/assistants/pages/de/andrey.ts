import type { AssistantPageText } from '../../types';

/** Андрей — запуск бизнеса. Перевод pages/ru/andrey.ts. Пример разговора — docs/assistant-pages/examples/andrey.md. */
const andrey: AssistantPageText = {
  title: 'Unternehmen gründen: Gründungsberatung online – Andrej | Linkeon',
  description:
    'Andrej hilft beim Gründen: Nachfrage testen, bevor Sie investieren, Rechtsform und Steuerregime wählen, Break-even berechnen, einen Plan bis zu den ersten Einnahmen aufstellen.',
  h1: 'Unternehmen gründen: Andrej begleitet Sie von der Idee bis zu den ersten Einnahmen',
  lead: 'Sie haben eine Idee und Erspartes – und Angst, das Geld an der falschen Stelle zu investieren. Andrej fragt zuerst nach Budget und Zeitrahmen und zeigt dann, was sich in einer Woche mit wenig Geld testen lässt.',
  card: 'Gründung: Nachfrage vor der Investition testen, Rechtsform, erste Kunden, Break-even, Plan bis zu den ersten Einnahmen.',
  cta: 'Mit Andrej sprechen',
  situations: [
    'Sie wollen aus der Festanstellung in die Selbstständigkeit und wissen nicht, wie viele Monate Ihre Ersparnisse reichen.',
    'Sie haben eine Produktidee, aber noch kein einziges Gespräch mit einem künftigen Käufer geführt.',
    'Sie schwanken zwischen Selbstbeschäftigung, Einzelunternehmen und GmbH, und jeder Bekannte rät etwas anderes.',
    'Die ersten Kunden kamen über persönliche Kontakte, aber wo Sie die nächsten finden und wie viel Sie verlangen sollen, ist unklar.',
    'Ihr Geschäft läuft seit einem halben Jahr, Aufträge gibt es, aber in die schwarzen Zahlen sind Sie noch nicht gekommen.',
  ],
  example: {
    question:
      'Ich möchte einen Coffee-to-go-Laden an einer Metrostation eröffnen. Womit fange ich an, und wie viel Geld brauche ich für den Start?',
    answer: `Coffee to go an der Metro: womit anfangen und wie viel Geld Sie brauchen

Fangen Sie nicht mit der Kaffeemaschine an, sondern mit dem Standort. Bei einem Coffee-to-go-Laden hängt der Umsatz fast vollständig von der Lage ab. Solange Sie die Passanten an einem bestimmten Metroausgang nicht gezählt haben, ist jede Kalkulation Kaffeesatzleserei.

Wie viel Geld Sie für den Start brauchen

Das ist eine Schätzung nach allgemeiner Praxis. Die genauen Zahlen hängen von der Stadt und der Größe der Fläche ab.

Posten – Regionen – Moskau und Petersburg
…
Summe – ~1,1–2,3 Mio. ₽ – ~2–4,4 Mio. ₽

…

Eine Reserve für die ersten Monate ist ein Pflichtposten. Meist erreicht ein Café nach 2–4 Monaten einen normalen Kundenstrom, und am häufigsten schließen die, denen bis dahin das Geld ausgegangen ist.

Wie viele Becher Sie verkaufen müssen (Schätzung für Moskau)

— Durchschnittsbon etwa 300 ₽. Der Wareneinsatz pro Becher liegt samt Kartengebühren bei etwa 30 %, pro Becher bleiben also rund 200 ₽.
…
— Der Break-even liegt bei etwa 60 Bechern am Tag. An einem guten Standort werden 150–250 Becher am Tag verkauft, an einem schwachen 30–40, und dann arbeitet das Café mit Verlust.

…

Das Hauptrisiko

Ein schwacher Standort. Das Signal zum Aufhören: Nach 3 Monaten verkaufen Sie weniger als 40 Becher am Tag, und der Umsatz wächst nicht. Danach schmilzt nur noch die Reserve.

Was Sie heute tun können: Suchen Sie zwei Standorte an Ihrer Metrostation aus und zählen Sie morgen früh die Passanten an beiden.

In welcher Stadt und an welcher Station möchten Sie eröffnen, und wie viel Geld wollen Sie investieren? Mit diesen Angaben kann ich genauer kalkulieren.`,
  },
  can: [
    'Prüft die Idee, bevor Sie investieren: wie Sie die Nachfrage günstig testen und welche Minimalversion für den ersten Verkauf reicht.',
    'Hilft, Rechtsform und Steuerregime passend zu Ihrem Modell zu wählen: Selbstbeschäftigung, Einzelunternehmen oder GmbH; die vereinfachten Systeme USN und AUSN oder das Patentsystem.',
    'Berechnet mit Ihren Zahlen Break-even, Unit Economics und Sicherheitspolster – wie viele Monate das Geld reicht.',
    'Erstellt einen Plan bis zu den ersten Einnahmen: drei bis fünf Schritte mit Fristen und Kosten, das Hauptrisiko und das Signal zum Aufhören.',
    'Hilft bei Preis, ersten Kunden und der ersten Einstellung – und bei dem, was schon läuft und ins Stocken geraten ist.',
    'Prüft im Internet aktuelle Steuersätze, Grenzen der Steuerregime und Anforderungen von Plattformen und Banken.',
  ],
  cannot: [
    'Verspricht keine Einnahmen und nennt keine Amortisationszeit als Tatsache: Jede Zahl ist eine Schätzung mit genannten Annahmen.',
    'Redet Ihnen nichts ein und nichts aus. Geht die Rechnung mit Ihren Zahlen nicht auf, sagt Andrej es sofort.',
    'Rät nicht zu Steuertricks oder zur künstlichen Aufspaltung des Unternehmens.',
    'Ersetzt weder Buchhalter noch Anwalt: Er sagt, was Sie brauchen werden; für die Steuerberechnung gehen Sie zu Buchhalterin Anna, für den Vertrag zu Anwalt Alexej.',
  ],
  faq: [
    {
      q: 'Für welches Land berät Andrej?',
      a: 'Standardmäßig für Russland: Selbstbeschäftigung, AUSN, Online-Marktplätze, Kartenzahlung. Wenn Sie in einem anderen Land starten, nennen Sie es: Nachfrage und Break-even werden genauso berechnet, Rechtsform und Steuern prüfen Sie aber bitte mit einem Fachmann vor Ort.',
    },
    {
      q: 'Kann ich einen Businessplan oder die Bedingungen einer Plattform schicken?',
      a: 'Ja, als PDF oder Dokument. Andrej prüft Businesspläne, Angebote und Bedingungen von Marktplätzen, die Datei wird vollständig gelesen.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Hat Andrej Ihnen bei der Wahl des Steuerregimes geholfen, müssen Sie Buchhalterin Anna nicht noch einmal erklären, was Sie machen.',
    },
  ],
};

export default andrey;
