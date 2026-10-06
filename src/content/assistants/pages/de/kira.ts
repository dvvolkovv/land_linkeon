import type { AssistantPageText } from '../../types';

/**
 * Кира — дизайн. Перевод pages/ru/kira.ts. Картинки делает сама, но только
 * растровые (PNG и JPEG): векторных файлов у неё не бывает. Вектор на этой
 * странице не обещать.
 *
 * Пример — разговор с прода 01.10.2026 (docs/assistant-pages/examples/kira.md),
 * картинка — копия в public/examples/. Название пекарни на картинке кириллицей;
 * в переводе — немецкая транслитерация «Tjoply Chleb» с переводом в скобках.
 *
 * В последнем пункте «Чего не делает» раньше стояла оговорка, что Екатерина
 * пишет только по-русски. 06.10.2026 её инструкцию исправили — теперь она
 * пишет на языке человека, — и оговорка снята.
 */
const kira: AssistantPageText = {
  title: 'KI-Designer: Logo und Corporate Design erstellen – Kira | Linkeon',
  description:
    'Kira – KI-Designerin. Gestaltet Logo und Corporate Design, Visitenkarte, Banner oder Präsentation und überarbeitet fertige Bilder. Dateien als PNG und JPEG, ohne Vektordateien.',
  h1: 'Kira – KI-Designerin: Logo, Corporate Design und Layouts',
  lead: 'In einer Woche ist Eröffnung, und es gibt noch kein Schild, keine Speisekarte und keine Flyer. Kira fragt, wo das hängen wird und wer es sieht, und zeigt Ihnen einen Entwurf, statt ihn mit Worten zu beschreiben.',
  card: 'Logos, Corporate Design, Visitenkarten, Banner, Präsentationen. Erstellt Layouts und bearbeitet fertige Bilder, Dateien als PNG und JPEG.',
  cta: 'Mit Kira sprechen',
  situations: [
    'Ihr Logo hat einmal ein Bekannter gezeichnet, und auf dunklem Hintergrund ist es kaum zu sehen.',
    'Das Banner ist fast fertig, aber die Farbfläche muss weg, das Logo ausgetauscht und die Überschrift nach links verschoben werden.',
    'Sie brauchen zehn Titelbilder für Posts, und alle sollen wie eine Serie aussehen.',
    'Morgen ist Ihr Vortrag, und die Folien stammen aus drei verschiedenen Vorlagen.',
    'Das Ladenschild gibt es schon, und Visitenkarten, Flyer und Tischaufsteller sollen im selben Stil sein.',
    'Ein Designer hat einen Entwurf geschickt, Ihnen gefällt etwas daran nicht, aber Sie können nicht sagen, was.',
  ],
  example: {
    question:
      'Machen Sie ein Logo für die Bäckerei „Tjoply Chleb“ („Warmes Brot“). Es kommt auf das Ladenschild und auf Papiertüten. Charakter – gemütlich und warm, Farben – warme Braun- und Cremetöne, Symbol – eine Ähre. Zeigen Sie gleich eine Variante als Bild, Rückfragen sind nicht nötig.',
    answer: `Hier ist die erste Variante des Logos:

Über dem Schriftzug steht eine Ähre. Die Schrift ist weich, mit Serifen, die Farben sind Dunkelbraun, Karamell und Creme. Details gibt es wenige, damit das Zeichen sowohl von Weitem auf dem Schild als auch auf der Kraftpapiertüte gut erkennbar ist.

Was Sie vor dem Druck wissen sollten:
— Format. Ich erstelle nur Rastergrafiken (PNG oder JPEG), eine Vektordatei kann ich nicht liefern. Für ein Schild verlangt der Schilderhersteller meist eine Vektordatei, deshalb muss das Logo nach diesem Entwurf neu gezeichnet werden. Das geht am einfachsten, sobald die Variante freigegeben ist.
— Tüten. Kraftpapier dunkelt Farben ab, und Creme ist darauf kaum zu sehen. Für die Tüten ist eine einfarbige Version besser: das Logo in Dunkelbraun ohne Hintergrund.

Als Nächstes kann ich diese einfarbige Version auf transparentem Hintergrund machen oder eine waagerechte Variante für das Schild, bei der die Ähre links vom Schriftzug steht. Was brauchen Sie zuerst?`,
    image: {
      src: '/examples/kira-logo.webp',
      alt: 'Logo der Bäckerei „Tjoply Chleb“ („Warmes Brot“): eine Ähre über dem kyrillischen Schriftzug, Braun und Karamell auf cremefarbenem Hintergrund',
      width: 640,
      height: 640,
    },
  },
  can: [
    'Entwirft ein Logo von Grund auf oder überarbeitet Ihres, mit Versionen für verschiedene Hintergründe und Größen.',
    'Stellt ein Corporate Design zusammen – Farbpalette, Schriftpaare, Regeln für das Logo – und hält es über die ganze Serie von Materialien hinweg ein.',
    'Gestaltet Layouts für Visitenkarten, Flyer, Broschüren, Ladenschilder, Hinweisschilder und Urkunden, Banner und Titelbilder im Format der jeweiligen Plattform, Präsentationen in einheitlichem Stil.',
    'Bearbeitet ein fertiges Bild, statt es neu zu zeichnen: „weiter nach links“, „Farbfläche weg“, „Logo austauschen“ – alle Änderungen in einem Durchgang, der Rest bleibt, wie er war.',
    'Analysiert fremdes Design: was nicht funktioniert, warum und was zuerst zu korrigieren ist.',
  ],
  cannot: [
    'Erstellt keine Vektorgrafiken: SVG, AI, EPS und CDR gibt es nicht, nur PNG und JPEG, auch mit transparentem Hintergrund. Kira sagt das gleich zu Beginn.',
    'Verspricht keine Druckreife: Farbproof, CMYK und Beschnittzugabe prüft die Druckerei. Kira sagt Ihnen, was Sie dort klären sollten.',
    'Kopiert keine fremden Logos und verwendet keine Fotos und Schriften ohne Nutzungsrecht. Ist die Lizenz unklar, sagt sie das.',
    'Schreibt keinen Verkaufstext für das Layout: Die Formulierung holen Sie sich besser bei Texterin Jekaterina.',
  ],
  faq: [
    {
      q: 'Wir haben schon ein Brandbook. Hält sich Kira daran?',
      a: 'Ja. Schicken Sie das Brandbook als Datei oder geben Sie einen Link zur Website – Kira übernimmt daraus Farben, Schriften und Logo. Ist Ihre Farbe Violett, bleibt sie Violett – und nicht „so ähnlich“.',
    },
    {
      q: 'Was brauche ich für den Druck?',
      a: 'Sagen Sie, wo und in welcher Größe das Layout gedruckt wird. Kira legt die Maße in Millimetern fest, vergrößert das Bild bei Bedarf und nennt, was zu prüfen ist: Lesbarkeit in Originalgröße, Kontrast, Ränder.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem gewöhnlichen Chatbot?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Weiß Jekaterina schon, was Ihr Unternehmen macht und wer Ihre Kunden sind, müssen Sie es Kira nicht noch einmal erklären.',
    },
  ],
};

export default kira;
