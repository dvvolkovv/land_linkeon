import type { AssistantPageText } from '../../types';

/** Александра — маркетолог. Перевод pages/ru/alexandra.ts. Пример разговора — docs/assistant-pages/examples/alexandra.md. */
const alexandra: AssistantPageText = {
  title: 'KI-Marketing-Assistent und Wettbewerbsanalyse – Alexandra | Linkeon',
  description:
    'Alexandra – KI-Marketing-Assistentin. Findet aktuelle Daten zu Markt und Konkurrenz, hilft bei Positionierung, Werbung und Content und sagt, was zu messen ist und wann es wirkt.',
  h1: 'Alexandra – KI-Marketing-Assistentin: Wettbewerbsanalyse und Marketingplan',
  lead: 'Die Werbung frisst das Budget, aber die Zahl der Anfragen steigt nicht. Alexandra fragt zuerst, was Sie verkaufen und an wen, sucht aktuelle Daten zu Markt und Konkurrenz und schlägt Schritte vor, deren Ergebnis sich messen lässt.',
  card: 'Markt und Konkurrenz nach aktuellen Daten, Positionierung, Werbung, Content. Sagt, was zu messen ist und wann es wirkt.',
  cta: 'Mit Alexandra sprechen',
  situations: [
    'Sie eröffnen ein Studio oder einen Laden und wollen wissen, wie Sie sich von der Konkurrenz in der Nachbarstraße abheben.',
    'Kunden kommen nur über Empfehlungen, und Sie wissen nicht, mit welcher Werbung Sie anfangen sollen.',
    'Sie bespielen Ihre Social-Media-Kanäle, aber die Posts bringen keine einzige Anfrage.',
    'Sie bringen ein neues Produkt auf den Markt und suchen einen Namen und den Ton, in dem Sie darüber sprechen.',
    'Sie wollen wissen, was gerade in Ihrer Nische passiert: Preise, Trends, welcher Konkurrent wächst und womit.',
  ],
  example: {
    question: 'Ich habe ein Nagelstudio in einem Wohnviertel am Stadtrand. Wie gewinne ich neue Kunden ohne großes Budget?',
    answer: `Hier ist Alexandra. In einem Wohnviertel wohnen fast alle Kundinnen 10–15 Minuten von Ihnen entfernt. Deshalb sollte das Budget nicht in breite Werbung fließen, sondern in Sichtbarkeit in der Nachbarschaft und darin, dass Kundinnen ihre Freundinnen mitbringen.

1. Karten: der günstigste Kundenstrom
— Yandex Maps und 2GIS (in Russland verbreitete Kartendienste). Füllen Sie Ihren Eintrag zu 100 % aus: Fotos Ihrer Arbeiten und der Einrichtung, Preisliste, Online-Buchung, Öffnungszeiten. Genau dort wird nach „Maniküre in der Nähe“ gesucht.
— Bewertungen. Schicken Sie jeder Kundin nach der Behandlung einen Link zur Bewertung, am Empfang kann auch ein QR-Code stehen. …

2. Lokale Communities
— Chats von Wohnanlagen und Häusern in Telegram und WhatsApp, Gruppen des Viertels auf VKontakte. Kein Spam. Machen Sie ein nützliches Angebot „für Nachbarn“: zum Beispiel 15 % Rabatt auf den ersten Besuch mit einem Codewort. Das Codewort zeigt nebenbei, woher die Kundin kam.
…

4. Mundpropaganda als System
— Empfehlungsprogramm „Bring eine Freundin mit“. Beide bekommen je 500 ₽ für den nächsten Besuch.
…

Was Sie messen sollten
Fragen Sie jede neue Kundin, woher sie von Ihnen weiß, und schauen Sie einmal im Monat:
— wie viele neue Kunden aus jedem Kanal gekommen sind;
— welcher Anteil wiederkommt (normal sind ab 60 %);
— was ein Neukunde kostet.

Was am schnellsten wirkt: Meist bringen Karteneinträge mit Bewertungen, die Chats im Viertel und das Empfehlungsprogramm in 1–2 Monaten den deutlichsten Effekt.

Damit der Plan genauer wird, schreiben Sie mir: welche Stadt und welches Viertel, wie viele Nageldesignerinnen bei Ihnen arbeiten, wie hoch der Durchschnittsbon ist und wie viele Kunden Sie derzeit im Monat haben. Dann stelle ich einen Schritt-für-Schritt-Plan für einen Monat zusammen und schaue, was die Konkurrenz in Ihrer Nähe macht.`,
  },
  can: [
    'Analysiert Markt und Konkurrenz anhand aktueller Daten: Sie sucht im Internet nach aktuellen Zahlen, Trends und Fallbeispielen, statt Veraltetes wiederzugeben.',
    'Hilft bei Positionierung und Alleinstellungsmerkmal (USP): was Sie unterscheidet und warum man Sie wählen sollte.',
    'Entwickelt Content-Strategie und Funnel: Social Media, Blog, Newsletter, Video und die Customer Journey vom ersten Kontakt bis zum Kauf.',
    'Nimmt Targeting- und Suchmaschinenwerbung und ihre Kennzahlen unter die Lupe: Kundengewinnungskosten, LTV, ROAS, Conversions.',
    'Arbeitet an der Marke: Name, Tone of Voice, visueller Stil. Schlägt virale Wachstumsmechaniken vor.',
    'Gibt konkrete Schritte mit messbarem Ergebnis: was zu tun ist, wie man misst und wann mit einer Wirkung zu rechnen ist.',
  ],
  cannot: [
    'Startet keine Werbekampagnen und verwaltet kein Werbebudget – das machen Sie oder Ihr Dienstleister.',
    'Garantiert keine Anfragen und Verkäufe: Das Ergebnis hängt von Produkt, Preis und Umsetzung ab. Alexandra sagt Ihnen, was Sie messen sollten, um rechtzeitig zu erkennen, ob ein Kanal funktioniert.',
    'Lobt keine schwache Idee aus Höflichkeit: Sie benennt die Schwachstellen taktvoll, aber ehrlich.',
  ],
  faq: [
    {
      q: 'Woher hat Alexandra ihre Marktdaten?',
      a: 'Für Analysen von Markt, Konkurrenz und Trends sucht sie aktuelle Daten im Internet, statt sich auf das zu verlassen, was das Modell beim Training gelernt hat.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Weiß Alexandra schon, was Sie machen und für wen, müssen Sie es Texterin Jekaterina nicht noch einmal erklären.',
    },
    {
      q: 'Wer sieht meine Chats?',
      a: 'Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default alexandra;
