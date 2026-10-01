import type { AssistantPageText } from '../../types';

/**
 * Миша — коучинг по стандартам ICF. Перевод pages/ru/misha.ts. Пример
 * разговора — целиком, без правок: docs/assistant-pages/examples/misha.md.
 * Российский номер 112 в переводе заменён отсылкой к местной экстренной
 * службе (бриф переводчика, п. 8).
 */
const misha: AssistantPageText = {
  title: 'Coaching-Session online nach ICF-Standards – Mischa | Linkeon',
  description:
    'Mischa – KI-Coach nach ICF-Standards. Ohne Rat und Urteil: Er stellt Fragen, hilft zu sehen, was Sie bremst, und den ersten Schritt zu wählen. 25.000 Tokens bei der Registrierung.',
  h1: 'Coaching-Session online: Mischa, Coach nach ICF-Standards',
  lead: 'Ein Gespräch, das Sie seit drei Monaten aufschieben, oder eine Entscheidung, um die Ihre Gedanken ständig kreisen. Mischa sagt Ihnen nicht, was richtig ist: Er stellt Fragen, und die Antwort und den ersten Schritt finden Sie selbst.',
  card: 'Coaching-Session nach ICF-Standards: Fragen statt Ratschläge, und am Ende ein Schritt, den Sie selbst gewählt haben.',
  cta: 'Mit Mischa sprechen',
  situations: [
    'Ein wichtiges Gespräch wird Woche für Woche verschoben, und Sie wissen nicht, was Sie zurückhält.',
    'Das Jahresziel steht seit Januar auf dem Papier, aber Sie haben es noch nicht einmal angepackt.',
    'Man bietet Ihnen eine Beförderung an, aber Freude kommt nicht auf, und Sie sind nicht sicher, ob Sie sie wirklich wollen.',
    'Es gibt zwei Möglichkeiten, und Sie drehen sich zwischen ihnen im Kreis und entscheiden jedes Mal neu.',
    'Ratschläge haben Sie genug gehört, jetzt möchten Sie verstehen, was Sie selbst wollen.',
  ],
  example: {
    question:
      'Seit drei Monaten schiebe ich ein wichtiges Gespräch mit meinem Geschäftspartner auf. Helfen Sie mir zu verstehen, was mich zurückhält.',
    answer: `Guten Tag! Ich bin Mischa, Coach. Gut, dass Sie das angehen wollen. Wenn ein Gespräch schon drei Monate aufgeschoben wird, steckt fast immer etwas dahinter, und es lohnt sich, das zu verstehen.

Kurz dazu, wie ich arbeite. Eine Coaching-Session ist ein Gespräch, in dem Sie selbst die Antworten suchen. Ich gebe keine Ratschläge, bewerte nicht und sage nicht, was richtig ist. Ich stelle Fragen, die helfen, die Situation breiter zu sehen und zu bemerken, was Ihnen bisher entgeht. Meist geht man aus einer Session mit Klarheit und einem konkreten nächsten Schritt heraus, den man selbst gewählt hat.

Hier können Sie ehrlich sprechen, ohne Eile und in Ihrem Tempo.

Bevor wir anfangen: Wie darf ich Sie ansprechen?`,
  },
  can: [
    'Erklärt zu Beginn, wie eine Coaching-Session abläuft und was Sie davon erwarten können.',
    'Hilft, Thema und Ziel zu vereinbaren: worüber Sie sprechen möchten und womit Sie am Ende herausgehen wollen.',
    'Stellt immer nur eine offene Frage und richtet sich nach Ihrem Tempo. Führt das Gespräch zu Gefühlen, gibt er ihnen Raum.',
    'Hilft zu sehen, was Sie festhält, welche Möglichkeiten es gibt und auf welche eigenen Stärken Sie sich stützen können.',
    'Hilft am Ende, den ersten Schritt zu wählen und festzulegen, woran Sie merken, dass Sie vorangekommen sind.',
  ],
  cannot: [
    'Gibt keine Ratschläge, Listen oder fertigen Lösungen und bewertet nicht. Mischa arbeitet nur mit dem, was Sie mitbringen.',
    'Kein Psychologe und kein Psychiater: Coaching ist keine Psychotherapie. Geht es im Gespräch um ein Trauma, eine Depression oder eine Gefahr für Sie selbst oder andere, schlägt Mischa vor, sich an eine Fachperson zu wenden. Besteht Lebensgefahr, rufen Sie den örtlichen Notruf an.',
  ],
  faq: [
    {
      q: 'Wie läuft eine Session ab?',
      a: 'Zuerst fragt Mischa, worüber Sie sprechen möchten und was für Sie ein gutes Ergebnis wäre. Dann folgen Fragen, eine nach der anderen: Was ist hier das Wichtigste, was hält Sie zurück, welche Möglichkeiten sehen Sie? Am Ende steht ein Schritt, den Sie selbst wählen, und ein kurzes Fazit: welche Gedanken Sie mitnehmen.',
    },
    {
      q: 'Ist Mischa ein zertifizierter Coach?',
      a: 'Nein, Mischa ist ein KI-Assistent. Er führt die Session nach den Standards der ICF, der International Coaching Federation: Er gibt keine Ratschläge, bewertet nicht, stellt offene Fragen und folgt Ihrem Thema.',
    },
    {
      q: 'Mit welchem Thema kann ich kommen?',
      a: 'Mit jedem, bei dem die Entscheidung bei Ihnen liegt: Arbeit, Veränderungen, ein Ziel, bei dem Sie nicht vorankommen, ein Gespräch, das Sie aufschieben. Das Thema wählen Sie, und Mischa folgt ihm, statt Ihnen ein eigenes unterzuschieben.',
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

export default misha;
