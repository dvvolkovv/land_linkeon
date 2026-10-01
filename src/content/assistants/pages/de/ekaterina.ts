import type { AssistantPageText } from '../../types';

/**
 * Екатерина — тексты и продвижение. Перевод pages/ru/ekaterina.ts.
 *
 * Тексты пишет только по-русски, даже если написать ей по-немецки (так в её
 * инструкции, проверено вживую). Поэтому здесь, в отличие от русской страницы,
 * title, description, h1, card и lead — про тексты на русском языке, а в
 * «Чего не делает» первым пунктом добавлено, что на других языках она не
 * пишет (бриф переводчика, п. 10).
 */
const ekaterina: AssistantPageText = {
  title: 'KI-Texter für Werbetexte auf Russisch – Jekaterina | Linkeon',
  description:
    'Jekaterina – KI-Texterin für russischsprachige Leser. Schreibt auf Russisch Telegram-Posts, Newsletter, Landingpage-Texte und Slogans, überarbeitet Entwürfe und plant Content.',
  h1: 'Jekaterina – KI-Texterin für russischsprachige Posts, Newsletter und Landingpages',
  lead: 'Der Launch ist am Montag, und die Ankündigung fehlt noch. Erzählen Sie Jekaterina in Ihren eigenen Worten, was Sie verkaufen und an wen – sie liefert einen fertigen Text auf Russisch und eine kürzere Variante.',
  card: 'Posts, Newsletter, Landingpage-Texte und Slogans auf Russisch. Macht aus Idee oder Entwurf einen fertigen Text, in mehreren Varianten.',
  cta: 'Mit Jekaterina sprechen',
  situations: [
    'Sie müssen Ihren Kunden die neuen Preise mitteilen und wollen nicht, dass die E-Mail wie eine Rechtfertigung klingt.',
    'Der Entwurf für den Post steht, aber er ist lang und verworren, und so möchten Sie ihn nicht veröffentlichen.',
    'Ihr Kanal lebt in Schüben: drei Posts an einem Tag, dann einen Monat lang Funkstille.',
    'Sie brauchen einen Text für die Landingpage und wissen nicht, welche Vorteile auf den ersten Bildschirm gehören.',
    'In zwei Wochen startet der Verkauf Ihres Kurses, und Sie möchten Ihre Abonnenten rechtzeitig darauf vorbereiten.',
    'Ihre Marke schreibt mal förmlich, mal witzig, und die Abonnenten erkennen ihre Stimme nicht.',
  ],
  example: {
    question:
      'Schreiben Sie einen Post für unseren Telegram-Kanal über den Start unserer neuen Dienstleistung – mobile Polsterreinigung.',
    answer: `Hier ist der fertige Post. In eckigen Klammern stehen Platzhalter für Ihre Angaben.

🛋 Polsterreinigung jetzt bei Ihnen zu Hause!

Das Sofa, auf dem Kaffee verschüttet wurde. Der Sessel, den die Katze liebt. Die Matratze, die schon längst eine Auffrischung braucht.

Früher hätten Sie die Möbel zur Reinigung bringen oder mit den Flecken leben müssen. Jetzt ist es einfacher: Wir kommen zu Ihnen.

✨ Was wir reinigen:
— Sofas und Sessel
— Matratzen
— Stühle und Hocker
— Teppiche und Teppichböden
— Autoinnenräume (falls Sie das anbieten)

🧼 Warum Sie sich bei uns keine Sorgen machen müssen:
✔️ Profi-Geräte und hypoallergene Mittel: sicher für Kinder und Haustiere
✔️ Wir entfernen Flecken, Gerüche, Staub und Milben
✔️ Die Möbel trocknen in [4–6] Stunden
…

🎁 Geschenk zum Start: bis [Datum] – [20] % Rabatt auf die erste Bestellung mit dem Codewort „SAUBER“.

📲 Termin buchen und Preis erfahren: [Telefon / @username / Link]
Schicken Sie ein Foto der Möbel, und wir nennen Ihnen den Preis in 5 Minuten.

Ihr Sofa verdient eine zweite Chance 💙

Kurzversion (für eine Ankündigung oder Wiederholung):

🛋 Neu: mobile Polsterreinigung!
Wir kommen und reinigen Sofa, Sessel, Matratze oder Teppich direkt bei Ihnen zu Hause. Sichere Mittel, trocknet in wenigen Stunden.
…

Wenn Sie mir Stadt, Preise, Firmennamen und Ihre Zielgruppe nennen (Familien mit Kindern, Büros, Tierhalter), passe ich den Text genauer an. …`,
  },
  can: [
    'Schreibt Texte in allen Formaten: Posts, Skripte für Storys, Nachrichten für Telegram-Kanäle, Landingpage-Texte, Slogans, Newsletter.',
    'Nimmt einen Rohtext und macht ihn klarer, logischer und überzeugender.',
    'Bietet Varianten an – kurz und ausführlich, emotional und fachlich – und passt den Stil an Ihre Leser an.',
    'Erstellt Content-Plan und Rubriken und schreibt eine Postserie, die Abonnenten auf den Kauf vorbereitet.',
    'Hilft, das Produkt zu verpacken: Nutzenversprechen, Vorteile, Argumente, die Vertrauen schaffen, Call to Action.',
    'Rät, wo und wie Sie werben, hilft, die Stimme Ihrer Marke zu finden, und erklärt Marketingprinzipien in einfacher Sprache.',
  ],
  cannot: [
    'Schreibt nur auf Russisch: Auch wenn Sie ihr auf Deutsch schreiben, bekommen Sie den Text auf Russisch. Ihre Texte richten sich an russischsprachige Leser.',
    'Kennt Ihr Unternehmen nicht von innen und kann einen Vorteil hinzudichten, den Sie gar nicht bieten. Prüfen Sie vor der Veröffentlichung Preise, Fristen und Versprechen an Kunden.',
    'Schaltet keine Werbung und kauft keine Platzierungen. Jekaterina nennt Kanäle und Reihenfolge, umsetzen müssen Sie es selbst.',
    'Verspricht keine Reichweite und keine Verkäufe: Das Ergebnis hängt auch von Produkt, Preis und dem Ort ab, an dem der Text erscheint.',
  ],
  faq: [
    {
      q: 'Kann ich meinen eigenen Entwurf schicken?',
      a: 'Ja, als Text in der Nachricht oder als Datei. Jekaterina macht ihn klarer und überzeugender und schlägt bei Bedarf eine kurze und eine ausführliche Version vor.',
    },
    {
      q: 'Was sollte ich erzählen, damit der Text genau passt?',
      a: 'Was Sie verkaufen, an wen und wo der Text erscheint. Fehlt etwas, fragt Jekaterina selbst nach.',
    },
    {
      q: 'Worin unterscheidet sich Jekaterina von Marketingexpertin Alexandra?',
      a: 'Alexandra beginnt beim Markt: an wen Sie verkaufen, wie Sie sich von der Konkurrenz abheben, wie Sie das Ergebnis messen. Jekaterina übernimmt die Texte selbst – vom Post und Newsletter bis zur Landingpage – und den Content-Plan dafür.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Weiß Alexandra schon, wer Ihre Kunden sind, müssen Sie es Jekaterina nicht noch einmal erklären.',
    },
  ],
};

export default ekaterina;
