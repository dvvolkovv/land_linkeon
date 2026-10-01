import type { AssistantPageText } from '../../types';

/**
 * Ирина — карьера самого человека. Перевод pages/ru/irina.ts. Не рекрутер: по
 * инструкции вакансий не подбирает и людей на работу не ищет. Найм, вакансии и
 * вопросы к собеседованию на этой странице не обещать.
 */
const irina: AssistantPageText = {
  title: 'KI-Karriereberatung: berufliche Neuorientierung – Irina | Linkeon',
  description:
    'Irina – Karriereberaterin online, eine KI-Assistentin von Linkeon. Wenn Sie den Beruf wechseln wollen, hilft sie zu klären, wohin es gehen soll: Stärken, Motive, Werte im Job.',
  h1: 'Irina – Karriereberaterin online: Berufswechsel und Neuorientierung für Erwachsene',
  lead: 'Sie wollen weg aus Ihrem Job, wissen aber nicht, wohin. Irina stellt eine Frage nach der anderen und hilft herauszufinden, was Ihnen bei der Arbeit Kraft gegeben hat, was sie Ihnen genommen hat und welche Richtung sich daraus ergibt.',
  card: 'Geht Ihre Erfahrung, Stärken und Motive mit Ihnen durch und hilft zu erkennen, in welche Richtung Sie sich beruflich bewegen wollen.',
  cta: 'Mit Irina sprechen',
  situations: [
    'Seit vielen Jahren im selben Beruf, die Kraft dafür schwindet, und was Sie stattdessen tun könnten, wissen Sie nicht.',
    'Man bietet Ihnen eine Führungsposition an, und Sie sind nicht sicher, ob Sie Menschen führen wollen.',
    'Ein Lebenslauf ist da, aber Sie können selbst nicht erklären, worin Ihre Stärken liegen und warum Sie frühere Stellen verlassen haben.',
    'Sie überlegen, das Büro gegen Freelancing oder ein eigenes Geschäft zu tauschen, und wollen wissen, ob dieses Modell zu Ihnen passt.',
    'Sie kehren nach einer langen Pause in den Beruf zurück und wissen nicht, wo Sie anfangen sollen.',
    'In zwei Jahren haben Sie dreimal den Job gewechselt und wollen verstehen, was jedes Mal schiefgelaufen ist.',
  ],
  example: {
    question:
      'Ich arbeite seit acht Jahren als Buchhalterin und fühle mich ausgebrannt. Ich möchte den Beruf wechseln, weiß aber nicht, wohin.',
    answer: `Danke, dass Sie davon erzählen. Acht Jahre im selben Beruf sind viel Erfahrung. Ein Burn-out zeigt oft nicht, dass Sie „am falschen Platz“ sind, sondern dass etwas Wichtiges in der Arbeit Sie nicht mehr erfüllt.

Lassen Sie uns die Wahl eines neuen Berufs nicht überstürzen. Zuerst sollten wir verstehen, was genau Sie erschöpft und was Ihnen nach wie vor Kraft gibt. Dann wird die Richtung klarer, und Sie nehmen dieselbe Müdigkeit nicht in den neuen Job mit.

Fangen wir mit einer einfachen Frage an:

Denken Sie an die letzten ein, zwei Jahre im Job. Gab es Aufgaben oder Momente, in denen Sie Interesse, Engagement gespürt haben oder einfach „die Zeit verflog“? Welche waren das?

Wenn es solche Momente kaum gab, sagen Sie es ruhig. Auch das ist wichtig.`,
  },
  can: [
    'Geht Ihre Erfahrung Frage für Frage durch: welche Aufgaben Energie gegeben haben, was ermüdet hat, warum Sie den Job gewechselt haben.',
    'Hilft Ihnen, Ihre Stärken zu sehen – fachliche Fähigkeiten und persönliche Eigenschaften – ohne Bewertungen und Etiketten.',
    'Klärt, was Sie bei der Arbeit antreibt und was gar nicht passt: Werte, Motive, Arbeitsumfeld, Art des Umgangs mit Menschen.',
    'Wenn Sie Ihren Lebenslauf schicken, hebt sie die wichtigsten Fähigkeiten hervor und fragt nach dem, was darin nicht steht: warum Sie diese oder jene Entscheidung getroffen haben.',
    'Fasst zusammen: Ihr Profil als Fachkraft und einige Richtungen, die sich anzusehen lohnen – Rollen und Beschäftigungsformen.',
  ],
  cannot: [
    'Keine Recruiterin: Sie sucht keine Stellen heraus und hilft nicht, Mitarbeiter einzustellen. Irina arbeitet an Ihrer eigenen Karriere.',
    'Entscheidet nicht für Sie. Sie schlägt Richtungen zum Nachdenken vor, die Wahl treffen Sie.',
    'Ersetzt keinen Psychologen und keinen Arzt: Wenn die Erschöpfung seit Monaten anhält und auf die Gesundheit schlägt, ist das ein Grund, ärztliche oder psychologische Hilfe zu suchen.',
  ],
  faq: [
    {
      q: 'Wie läuft das Gespräch ab?',
      a: 'Irina stellt eine Frage nach der anderen und hört zuerst zu – was Sie über Ihre letzte Stelle erzählen, über Aufgaben, die Ihnen Kraft gegeben haben, und über das, was Sie ermüdet hat. Dann fragt sie nach und fügt alles zu einem Bild zusammen: Stärken, Motive, was nicht zu Ihnen passt und welche Richtungen sich anzusehen lohnen.',
    },
    {
      q: 'Brauche ich einen Lebenslauf?',
      a: 'Nein. Wenn Sie einen haben, schicken Sie ihn als Datei – Irina beginnt damit und fragt nach dem, was darin nicht steht. Wenn nicht, beginnt sie mit Ihrer letzten Erfahrung und Ihren Zielen.',
    },
    {
      q: 'Worin unterscheidet sich Irina von einem Recruiter?',
      a: 'Ein Recruiter sucht einen Menschen für eine Stelle. Irina geht den umgekehrten Weg: Sie hilft zu verstehen, welche Arbeit zu Ihnen passt. Stellenangebote macht sie keine.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Wer sieht meine Antworten?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Haben Sie Ihre Werte schon mit Olja erkundet, muss Irina nicht bei null anfangen. Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default irina;
