import type { AssistantPageText } from '../../types';

/**
 * Полина — тренер по образу жизни: сон, питание, движение, восстановление.
 * Перевод pages/ru/polina.ts. Не врач — так сказано в её промпте. 112 в русском
 * тексте сверен в образце Оли (docs/assistant-pages/samples-ru.md, МЧС
 * «Система-112»); в переводе номера нет — местная экстренная служба (бриф
 * переводчика, п. 8).
 *
 * Пример — docs/assistant-pages/examples/polina.md, целиком; снят только жирный.
 */
const polina: AssistantPageText = {
  title: 'Besser schlafen, Rhythmus finden: Lifestyle-Coach – Polina | Linkeon',
  description:
    'Polina ist Lifestyle-Coach. Sie hilft, Schlaf, Ernährung und Bewegung an eine volle Woche anzupassen: eine kleine Veränderung nach der anderen, ohne Diät und Fitnessstudio.',
  h1: 'Schlaf und Tagesrhythmus verbessern: Polina, Lifestyle-Coach',
  lead: 'Schlaf, Essen, Bewegung und Erholung – passend zu einer ganz normalen vollen Woche, nicht zu einem perfekten Zeitplan. Polina schlägt eine kleine Veränderung vor und gleich eine Version davon für schlechte Tage.',
  card: 'Schlaf, Essen, Bewegung und Erholung für eine volle Woche. Immer nur eine kleine Veränderung – und ihre Version für schlechte Tage.',
  cta: 'Mit Polina sprechen',
  situations: [
    'Sie gehen nach Mitternacht ins Bett, stehen um sieben auf, und mittags ist die Energie schon weg.',
    'Tagsüber essen Sie zwischen Tür und Angel, abends das, was der Kühlschrank hergibt.',
    'Sie möchten sich mehr bewegen, aber fürs Fitnessstudio fehlen Zeit und Kraft.',
    'Jeden Montag beginnen Sie ein neues Leben, und bis Donnerstag ist davon nichts mehr übrig.',
    'Eine Deadline, ein Umzug oder die Krankheit eines Angehörigen – und der gewohnte Rhythmus ist zusammengebrochen.',
  ],
  example: {
    question: 'Ich gehe um eins ins Bett, stehe um sieben auf und bin den ganzen Tag wie gerädert. Womit fange ich an?',
    answer: `Es sieht so aus, als fehle Ihnen einfach Schlaf: Von eins bis sieben Uhr sind es etwa sechs Stunden. Für viele ist das zu wenig, und die Erschöpfung am Mittag bestätigt es. Fangen wir mit einer Veränderung an.

15 Minuten früher ins Bett, um 0:45 Uhr. Der Wecker bleibt auf sieben. Das Aufstehen rühren wir nicht an: Ein stabiler Morgen hält den ganzen Rhythmus. Wir verschieben nur die Schlafenszeit. Wenn eine Woche ruhig gelaufen ist, verschieben Sie um weitere 15 Minuten.

Damit das klappt, brauchen Sie ein Signal „Schluss für heute“. Stellen Sie einen Wecker auf 0:30 Uhr mit der Beschriftung „Licht aus“. Wenn er klingelt, dimmen Sie das Licht und legen den Laptop weg. Das Handy dürfen Sie behalten, aber nur im Bett.

Wenn der Tag schlecht ist (Sie sind länger geblieben, haben nicht alles geschafft, möchten „noch etwas Zeit für sich“), gehen Sie einfach um 0:45 Uhr ins Bett, auch wenn nicht alles erledigt ist. Das Maximum herausholen müssen Sie nicht. Wenn es nicht geklappt hat, holen wir morgens nichts nach und stehen zur gewohnten Zeit auf.

Woran Sie merken, dass es wirkt. Schauen Sie nach einer Woche, ob Ihnen das Aufstehen wenigstens jeden zweiten Tag leichter fällt und ob der Nachmittag nicht mehr so schwer ist. Ändert sich gar nichts, suchen wir weiter.

Stellen Sie heute Abend den Wecker „Licht aus“ auf 0:30 Uhr.

Was hält Sie meist bis eins wach: Erledigungen, Arbeit, oder ist das die einzige Zeit für Sie selbst?`,
  },
  can: [
    'Schlaf: Rhythmus, Einschlafen, frühes Aufwachen, Schichtarbeit, Erholung nach Schlafmangel.',
    'Ernährung als Routine, nicht als Diät: Regelmäßigkeit, was auf den Teller kommt, Snacks, Wasser, Essen zwischen Tür und Angel.',
    'Bewegung ohne Fitnessstudio: die kleinste Dosis, die wirkt, und der Wiedereinstieg nach langer Pause.',
    'Energie: Müdigkeit zur Tagesmitte, das abendliche „für nichts mehr Kraft“, Rhythmus in schweren Phasen.',
    'Schlägt eine Veränderung vor, keine Liste, und ein Zeichen, an dem Sie nach einer Woche sehen, ob sie wirkt.',
    'Geht einen als Datei geschickten Trainingsplan oder Empfehlungen durch, ohne der Fachperson zu widersprechen, bei der Sie in Behandlung sind.',
  ],
  cannot: [
    'Keine Ärztin, und das sagt sie selbst: Sie stellt keine Diagnosen, verordnet keine Medikamente, setzt keine ab und deutet keine Laborwerte.',
    'Gibt keine Empfehlungen bei Schwangerschaft, Essstörungen, Diabetes, Herz-, Nieren- und Magen-Darm-Erkrankungen – sie erklärt, warum hier ein Arzt nötig ist.',
    'Spricht nicht über den Tagesrhythmus, wenn Warnzeichen da sind: Brustschmerzen, Ohnmachtsanfälle, unerklärlicher Gewichtsverlust, Blut, monatelange Schlaflosigkeit. Mit solchen Beschwerden gehen Sie sofort zum Arzt, bei Lebensgefahr rufen Sie den örtlichen Notruf an.',
    'Empfiehlt keine Nahrungsergänzungsmittel oder sonstigen Präparate.',
  ],
  faq: [
    {
      q: 'Warum eine Veränderung und kein Monatsplan?',
      a: 'Eine Gewohnheit, die nur von Willenskraft lebt, hält meist keinen Monat durch. Bestand hat die, die auch in einen schlechten Tag passt. Klappt ein Schritt nicht, macht Polina Ihnen keine Vorwürfe, sondern schaut, was genau nicht funktioniert hat.',
    },
    {
      q: 'Womit fängt Polina an?',
      a: 'Mit dem, was Sie am meisten stört, und mit Ihrem Rahmen: wann Sie aufstehen und ins Bett gehen, wie viel Zeit Sie haben, was Sie schon versucht haben. Schlaf ist für sie das Fundament: Solange er nicht stimmt, bringt das Gespräch über Ernährung und Sport fast nichts.',
    },
    {
      q: 'Hilft Polina beim Abnehmen?',
      a: 'Sie verspricht keine Ergebnisse, kein Gewicht und keine Fristen und legt keine Kalorienziele fest. Ihre Aufgabe ist ein Rhythmus, der eine volle Woche übersteht. Gesundheit misst sich nach ihren Regeln nicht am Gewicht.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Wer sieht meine Chats?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default polina;
