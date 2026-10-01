import type { AssistantPageText } from '../../types';

/**
 * Оля — исследование ценностей. Перевод pages/ru/olia.ts. Одобренный образец:
 * docs/assistant-pages/samples-ru.md.
 *
 * Правки владельца применены: Leadership Development Profile назван один раз (в
 * FAQ) и с пометкой «по мотивам, не официальный тест»; в «Что умеет» — просто
 * «логика действий», без названия методики. Пункт о помощи детям в «Чего не
 * делает» оставлен, как в образце, но без российского номера.
 *
 * В переводе российских номеров нет: вместо них — местная линия кризисной
 * помощи, местный экстренный номер и местный телефон доверия для детей
 * (бриф переводчика, п. 8). Оля в примере говорит на «ты» — так и оставлено.
 */
const olia: AssistantPageText = {
  title: 'Wertekarte: persönliche Werte und Spiral Dynamics – Olja | Linkeon',
  description:
    'Olja führt Sie durch eine Werte-Erkundung: Lieblingsheld, Zeit, Geld, fünf unvollendete Sätze, die Farben von Spiral Dynamics – und am Ende Ihre persönliche Wertekarte.',
  h1: 'Wertekarte und Spiral Dynamics: eine Werte-Erkundung mit Olja',
  lead: 'Olja stellt eine Frage nach der anderen und bemerkt, was hinter Ihren Antworten steckt. Am Ende fasst sie alles in einer Wertekarte zusammen: was Sie antreibt, welche Handlungslogik Sie haben und wohin Sie wachsen können.',
  card: 'Fünf Gesprächsschritte – vom Lieblingshelden bis zu den Farben von Spiral Dynamics. Am Ende Ihre persönliche Wertekarte.',
  cta: 'Mit Olja sprechen',
  situations: [
    'Eigentlich stimmt alles – Arbeit, Pläne, Freundeskreis –, aber Sie wissen nicht, was davon wirklich Ihres ist und was fremde Erwartungen sind.',
    'Eine Entscheidung steht an – den Beruf wechseln, umziehen, sich selbstständig machen –, und Sie möchten sich auf das stützen, was Ihnen selbst wichtig ist.',
    'Sie merken, dass Sie über das eine reden, Zeit und Geld aber für etwas anderes ausgeben.',
    'Sie haben über Spiral Dynamics gelesen und wollen wissen, welche Ebenen Ihnen näher sind.',
    'Sie führen Menschen und wollen verstehen, worauf Sie sich stützen, wenn Sie Entscheidungen treffen.',
  ],
  example: {
    question: 'Ich möchte verstehen, welche Werte ich wirklich habe. Wie läuft Ihre Erkundung ab?',
    answer: `Hallo! Ich bin Olja. Schön, dass du deinen Werten auf den Grund gehen möchtest. Das ist eine gute und sehr persönliche Arbeit.

So funktioniert es. Das ist kein Test mit richtigen Antworten, sondern ein ruhiges Gespräch. Du schaust auf dich, und ich helfe dir zu bemerken, was hinter deinen Worten steckt. Wir gehen mehrere Schritte, eine Frage nach der anderen:

1. Held. Wir sprechen über eine Figur, die dir nahe ist, und darüber, was du in ihr wiedererkennst.
2. Zeit. Wir schauen, womit du deine freie Zeit verbringst, wenn du selbst wählst.
3. Geld. Wir überlegen, wofür du Geld über die Pflichtausgaben hinaus ausgibst und was dir das gibt.
4. Fünf unvollendete Sätze. Du ergänzt sie so, wie es sich für dich stimmig anfühlt.
5. Farben. Du wählst, welche Lebensweisen dir jetzt näher sind.

Am Ende fasse ich alles in deiner persönlichen Wertekarte zusammen. Du siehst, was dich antreibt, welche Handlungslogik du hast und wohin du weiter wachsen kannst.

Antworte, wie du magst: kurz oder ausführlich. Falsch machen kannst du hier nichts.

Fangen wir an. Denk an deinen Lieblingshelden, eine berühmte Person oder eine Figur aus einem Buch, Film oder Märchen. Wer ist das, und was zieht dich an ihm an?`,
  },
  can: [
    'Führt Schritt für Schritt durch die Erkundung: Lieblingsheld, Freizeit, Ausgaben über das Nötige hinaus, fünf unvollendete Sätze, die Farben von Spiral Dynamics.',
    'Stellt immer nur eine Frage und hakt nach: was Sie im Helden wiedererkennen, warum gerade das für Sie wichtig ist.',
    'Spiegelt, welche Werte in Ihren Antworten anklingen – ohne zu bewerten.',
    'Fasst am Ende alles in einer Wertekarte zusammen: tragende Werte, Handlungslogik, Ihr Wertespektrum nach Spiral Dynamics und der nächste Entwicklungsschritt.',
  ],
  cannot: [
    'Keine Psychotherapie: Olja stellt keine Diagnosen und behandelt nicht.',
    'Keine Notfallhilfe. Wenn es Ihnen gerade sehr schlecht geht, rufen Sie ein Krisentelefon in Ihrem Land an. Besteht Lebensgefahr, rufen Sie den örtlichen Notruf an. Kinder und Jugendliche finden Hilfe beim Kinder- und Jugendtelefon in ihrem Land.',
  ],
  faq: [
    {
      q: 'Was ist Spiral Dynamics?',
      a: 'Ein Modell von Don Beck und Chris Cowan: Die Lebensweisen sind darin mit Farben bezeichnet – von Beige (Überleben) bis Türkis (Einheit). Olja bittet Sie, zwei Farben zu wählen, die Ihnen jetzt näher sind, und die zu nennen, aus denen Sie herausgewachsen sind oder die Sie gerade erst entdecken.',
    },
    {
      q: 'Was bedeutet „Handlungslogik“?',
      a: 'Ein Begriff aus einem Modell der Erwachsenenentwicklung: wie ein Mensch Entscheidungen trifft und dem Geschehen Sinn gibt. Olja führt das Gespräch in Anlehnung an das Leadership Development Profile – das ist kein offizieller Test. Für die Logik Expert etwa zählen Korrektheit und Regeln, für Achiever das Ergebnis, für Strategist das System und der Einfluss.',
    },
    {
      q: 'Wie lange dauert die Erkundung?',
      a: 'Fünf Schritte, eine Frage nach der anderen. Sie können kurz oder ausführlich antworten – davon hängt ab, wie lange das Gespräch dauert.',
    },
    {
      q: 'Was kostet das?',
      a: 'Bei der Registrierung erhalten Sie 25.000 Tokens, eine Bankkarte ist nicht nötig. Danach gibt es Token-Pakete ohne Abo, und die Tokens verfallen nicht.',
    },
    {
      q: 'Wer sieht meine Antworten?',
      a: 'Die Assistenten von Linkeon teilen ein Profil: Was Sie einem erzählen, wissen alle. Ihre Chats verkaufen wir nicht und nutzen sie nicht für Werbung. Verarbeitet werden sie bei KI-Anbietern.',
    },
  ],
};

export default olia;
