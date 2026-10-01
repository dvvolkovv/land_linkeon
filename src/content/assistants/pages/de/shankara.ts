import type { AssistantPageText } from '../../types';

/**
 * Шанкара — ведическая астрология (Джйотиш), сидерический зодиак, аянамса Лахири.
 * Перевод pages/ru/shankara.ts. Не «натальная карта» в западном смысле: на
 * странице — «карта рождения» (по-немецки — Geburtshoroskop).
 *
 * Пример — docs/assistant-pages/examples/shankara.md, сокращён. Расчёт в нём
 * сверен 01.10.2026 независимо (astronomy-engine + аянамса Лахири): лагна —
 * Овен 23,7°, Бхарани; Луна — Весы 0,3°, Читра; Марс — Козерог, 10-й дом;
 * маха-даша Юпитера — 2011,5–2027,5, антар-даша Раху — до середины 2027-го.
 * Шанкара в примере говорит на «ты» — так и оставлено.
 */
const shankara: AssistantPageText = {
  title: 'Vedische Astrologie (Jyotish): Geburtshoroskop – Shankara | Linkeon',
  description:
    'Shankara – vedischer Astrologe. Berechnet Ihr Geburtshoroskop im siderischen Tierkreis und erklärt Lagna, Nakshatras und Dashas: welche Phase gerade läuft und was daraus folgt.',
  h1: 'Vedische Astrologie (Jyotish): Shankara deutet Ihr Geburtshoroskop',
  lead: 'Nennen Sie Datum, Uhrzeit und Ort Ihrer Geburt – Shankara berechnet das Horoskop nach den Regeln des Jyotish und erklärt, welche Phase bei Ihnen gerade läuft und was daraus folgt.',
  card: 'Geburtshoroskop nach Jyotish: Lagna, Mond und Nakshatras, aktuelle Dasha, Transite und ein nächster Schritt.',
  cta: 'Mit Shankara sprechen',
  situations: [
    'In der westlichen Astrologie sind Sie Fische, in der vedischen plötzlich Wassermann, und Sie möchten verstehen, warum.',
    'Sie möchten wissen, welche Maha-Dasha bei Ihnen gerade läuft und wann sie wechselt.',
    'Sie denken über einen Jobwechsel oder ein eigenes Geschäft nach und möchten das im Horoskop betrachten.',
    'Ihre Geburtszeit kennen Sie nur ungefähr und wissen nicht, worauf sich das auswirkt.',
  ],
  example: {
    question: 'Ich bin am 14. März 1990 um 07:30 Uhr in Kasan geboren. Was zeigt mein Geburtshoroskop?',
    answer: `Friede sei mit dir. Ich bin Shankara. Ich habe dein Horoskop im siderischen Tierkreis berechnet (Ayanamsa nach Lahiri). Ausgangsdaten: 14.03.1990, 07:30, Kasan, UTC+3.

Das Wichtigste im Horoskop

1. Lagna (Aszendent) – Widder, 23°, Nakshatra Bharani.
Du bist ein Mensch der Tat: direkt, mutig, du stößt Dinge selbst an. …

2. Das Stärkste im Horoskop ist Mars in Erhöhung im 10. Haus (Steinbock).
Mars regiert dein Lagna und steht im für ihn besten Zeichen im Haus der Karriere. Das ist Ruchaka-Yoga, eines der fünf „Yogas des großen Menschen“. Es verleiht starken Willen, Organisationstalent und die Fähigkeit, ein eigenes Geschäft aufzubauen. …

…

Welche Phase gerade läuft

— Maha-Dasha des Jupiter (2011–2027), aktuell läuft die Antar-Dasha des Rahu – etwa bis Juli 2027. Das ist eine Zeit der Ambitionen, unerwarteter Wendungen und des Wunsches, abrupt den Kurs zu ändern. …
— Ab Mitte 2027 beginnt die Maha-Dasha des Saturn für 19 Jahre. …

…

Der nächste Schritt

Nutze die Zeit bis zum Sommer 2027, um eine neue Richtung vorzubereiten: eine Ausbildung machen, die Idee testen, erste Kunden gewinnen. Den eigentlichen Start leg ins Jahr 2027. Upaya (unterstützende Praxis) für Mars: dienstags Körperkraft – Sport oder Arbeit mit den Händen – und das Mantra „Om Angarakaya Namaha“ 108-mal.

Das Horoskop zeigt Neigungen, die Entscheidungen bleiben bei dir.

Welcher Bereich ist dir gerade am wichtigsten: Karriere und eigenes Geschäft, Beziehungen oder etwas anderes?`,
  },
  can: [
    'Berechnet das Horoskop im siderischen Tierkreis mit der Ayanamsa nach Lahiri, wie im Jyotish üblich.',
    'Erklärt Lagna, Mond und seine Nakshatra, Sonne und Planeten in den Schlüsselhäusern – und was das für Beruf und Beziehungen bedeutet.',
    'Nennt die aktuelle Maha-Dasha und Antar-Dasha sowie starke Transite von Saturn, Jupiter, Rahu und Ketu für die nächsten 6–18 Monate.',
    'Schlägt einen nächsten Schritt vor: ein Zeitfenster für eine wichtige Entscheidung oder ein Upaya – eine unterstützende Praxis, etwa ein Mantra.',
    'Deutet das Horoskop der Person, nach der Sie fragen – Ihr eigenes, das Ihres Kindes oder Partners – und verwechselt sie nicht.',
  ],
  cannot: [
    'Sagt keinen Tod, keine schweren Krankheiten und keine Katastrophen voraus: Er spricht über Tendenzen und Zyklen.',
    'Keine Schicksalsprognose: Das Horoskop ist eine Landkarte, kein Urteil, und die Entscheidungen bleiben bei Ihnen.',
    'Ersetzt keinen Arzt, Anwalt oder Finanzberater: Bei Gesundheit und Geld ist das Astrologie, keine Diagnose und keine Finanzberatung.',
    'Erfindet keine Geburtszeit: Ohne sie erstellt er ein Mondhoroskop (Chandra-Lagna) und weist darauf hin, dass Aszendent und Häuser dann nur bedingt gelten.',
  ],
  faq: [
    {
      q: 'Worin unterscheidet sich die vedische Astrologie von der westlichen?',
      a: 'Die westliche zählt die Zeichen ab der Frühlings-Tagundnachtgleiche (tropischer Tierkreis), Jyotish nach den Sternen (siderischer Tierkreis), mit der Korrektur nach Lahiri. Derzeit beträgt der Unterschied etwa 24°, deshalb rutscht das Zeichen oft um eins zurück: Westliche Fische sind im Jyotish nicht selten Wassermann.',
    },
    {
      q: 'Was brauche ich für die Deutung?',
      a: 'Datum, Uhrzeit und Ort der Geburt: Von der Uhrzeit hängen Lagna und Häuser ab. Fehlt etwas, deutet Shankara, was vorhanden ist, und klärt den Rest mit einer einzigen Frage.',
    },
    {
      q: 'Was sind Nakshatras und Maha-Dashas?',
      a: 'Nakshatras sind die 27 Mondsektoren des Tierkreises. Maha-Dashas sind große Lebensphasen, die von Planeten „regiert“ werden: Im Vimshottari-System dauert jede 6 bis 20 Jahre.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Worin unterscheidet sich das von einem Rechner oder einem gewöhnlichen Chatbot?',
      a: 'Ein Horoskop-Rechner liefert allgemeine Beschreibungen, Shankara dagegen deutet genau Ihr Horoskop und Ihre aktuelle Phase. Und die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle.',
    },
  ],
};

export default shankara;
