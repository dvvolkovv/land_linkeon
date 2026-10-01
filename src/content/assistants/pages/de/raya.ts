import type { AssistantPageText } from '../../types';

/** Райя — дизайн человека. Перевод pages/ru/raya.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const raya: AssistantPageText = {
  title: 'Human Design berechnen: Bodygraph online deuten – Raya | Linkeon',
  description:
    'Raya berechnet Ihr Human Design aus Datum, Uhrzeit und Ort der Geburt mit Swiss Ephemeris und erklärt, was Typ, Strategie, Autorität und Profil bedeuten.',
  h1: 'Human Design: Raya berechnet und deutet Ihren Bodygraph',
  lead: 'Sie brauchen Datum, genaue Uhrzeit und Ort Ihrer Geburt. Raya berechnet das Chart mit Swiss Ephemeris und erklärt, was Ihr Typ, Ihre Strategie und Ihre Autorität in der Praxis bedeuten.',
  card: 'Berechnet den Bodygraph aus Datum, Uhrzeit und Ort der Geburt und erklärt Typ, Strategie und Autorität.',
  cta: 'Mit Raya sprechen',
  situations: [
    'Sie haben von Human Design gehört und möchten Ihren Typ und Ihre Strategie kennen.',
    'Ihr Chart haben Sie schon mit einem kostenlosen Rechner erstellt, aber Sie wissen nicht, was Zentren und Kanäle bedeuten.',
    'Entscheidungen fallen Ihnen schwer, und Sie möchten Ihre Autorität verstehen – worauf Sie sich bei einer Wahl stützen können.',
    'Ihre Geburtszeit ist nur ungefähr bekannt, und Sie möchten wissen, worauf sich das auswirkt.',
    'Sie möchten das Chart Ihres Kindes oder Partners deuten lassen.',
  ],
  example: {
    question: 'Berechnen Sie mein Human Design: 14. März 1990, 07:30, Kasan. Welchen Typ und welche Strategie habe ich?',
    answer: `Berechnet habe ich mit Swiss Ephemeris. Die Uhrzeit habe ich so in UTC umgerechnet: Im März 1990 galt in Kasan die Moskauer Winterzeit UTC+3, daher entspricht 07:30 Ortszeit 04:30 UTC.

Ihr Chart

Typ – Manifestor
Strategie – Die Menschen informieren, die Ihre Entscheidung betrifft, bevor Sie handeln
Autorität – Emotional (Solarplexus)
Profil – 1/3: Forscher / Märtyrer

…

Was das in der Praxis bedeutet
— Informieren heißt nicht, um Erlaubnis zu bitten. Es ist ein kurzes „Ich habe vor, X zu tun“. Das baut den Widerstand ab, auf den Manifestoren in ihrem Umfeld oft stoßen.
— Emotionale Autorität: Entscheiden Sie nicht auf dem Höhepunkt einer Emotion, weder im Hoch noch im Tief. Die richtige Entscheidung kommt, wenn sich die Welle gelegt hat. Hilfreich ist die Regel „eine Nacht darüber schlafen“.
…

Experiment für 7 Tage
Informieren Sie vor jeder nennenswerten Handlung, sei es eine berufliche Entscheidung, ein Kauf oder ein wichtiges Gespräch, kurz die Menschen, die sie betrifft. Aber erst, wenn sich die Emotion gelegt hat, frühestens am nächsten Tag. Notieren Sie abends, wie viel Widerstand und Ärger es im Vergleich zu sonst gab.

Wenn Sie Ihr Chart schon auf jovianarchive.com oder mybodygraph.com angesehen haben, schreiben Sie mir, was dort herauskam, und ich gleiche es ab.`,
  },
  can: [
    'Berechnet das Chart mit Swiss Ephemeris statt nach Augenmaß: Sie rechnet die Geburtszeit in UTC um und berücksichtigt Zeitzone und Sommerzeit der jeweiligen Jahre.',
    'Erklärt Typ, Strategie, Autorität, Profil und Definition: welche Zentren offen sind, was die wichtigsten Kanäle bewirken, wohin das Inkarnationskreuz führt.',
    'Schlägt ein Experiment für sieben Tage vor, passend zu Ihrer Strategie und Autorität.',
    'Wenn Sie ein Chart von jovianarchive.com oder mybodygraph.com schicken, gleicht sie es mit ihrer eigenen Berechnung ab und sagt offen, wenn die Ergebnisse voneinander abweichen.',
    'Deutet das Chart der Person, nach der Sie fragen – Ihr eigenes, das Ihres Kindes oder Partners – und verwechselt es nicht mit anderen.',
  ],
  cannot: [
    'Sagt weder Schicksal noch Ereignisse voraus: Human Design ist hier ein Werkzeug der Selbsterkenntnis, keine Prognose.',
    'Gibt keine medizinischen oder finanziellen Empfehlungen und ersetzt keinen Arzt, Anwalt oder Finanzberater.',
    'Erfindet keine Geburtszeit: Fehlt sie, sagt Raya, dass sich das Chart nicht genau berechnen lässt.',
  ],
  faq: [
    {
      q: 'Was brauche ich für die Berechnung?',
      a: 'Datum, genaue Uhrzeit und Ort der Geburt. Schon eine Abweichung von 15–30 Minuten kann das Profil ändern, manchmal auch Typ und Autorität.',
    },
    {
      q: 'Ist das Astrologie?',
      a: 'Nein, auch wenn die Berechnung ebenfalls auf den Positionen der Planeten beruht. Hier sind sie nur das Koordinatensystem, gedeutet wird über 64 Tore, 9 Zentren und 36 Kanäle. Raya arbeitet in der klassischen Schule von Ra Uru Hu.',
    },
    {
      q: 'Worin unterscheidet sich das von einem Rechner oder einem gewöhnlichen Chatbot?',
      a: 'Ein Online-Rechner erstellt das Chart und liefert allgemeine Beschreibungen. Raya deutet genau Ihr Chart und schlägt ein Experiment nach Ihrer Strategie vor. Und die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle.',
    },
    {
      q: 'Und wenn ich an Human Design zweifle?',
      a: 'Raya versucht nicht, Sie umzustimmen. Sie schlägt ein Experiment für sieben Tage vor: die Strategie an der eigenen Erfahrung prüfen und selbst entscheiden.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
  ],
};

export default raya;
