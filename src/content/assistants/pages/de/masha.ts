import type { AssistantPageText } from '../../types';

/**
 * Маша — трансформационная игра с метафорическими картами. Перевод
 * pages/ru/masha.ts. Говорит на «ты» — это её голос, в примере он сохранён
 * (по-немецки — du; текст страницы, как и в русском, на «вы» — Sie).
 *
 * Пример — docs/assistant-pages/examples/masha.md. Вырезано «…»: фраза про
 * профиль тестового аккаунта («вижу в твоём профиле…» — отсылка к вопросам,
 * заданным Мише и Ирине в том же сборе) и абзац о переключении на других
 * ассистентов («в левом верхнем углу» — подсказка по интерфейсу кабинета).
 * Картинку первой карты из конца ответа на страницу не берём, хотя поле
 * example.image есть: она из сторонней галереи метафорических карт, прав на неё
 * у нас нет.
 */
const masha: AssistantPageText = {
  title: 'Metaphorische Karten online: Transformationsspiel – Mascha | Linkeon',
  description:
    'Mascha, Spielleiterin, führt online ein Transformationsspiel mit metaphorischen Karten: Sie zeigt eine Karte und stellt Fragen, die Bedeutung finden Sie selbst.',
  h1: 'Metaphorische Karten online: Mascha leitet Ihr Transformationsspiel',
  lead: 'Mascha zeigt eine metaphorische Karte und fragt, was Sie darauf sehen und was Sie fühlen. Richtige Antworten gibt es nicht: Die Bedeutung finden Sie, und Mascha hilft Ihnen, sie zu bemerken.',
  card: 'Spiel mit metaphorischen Karten: Mascha zeigt ein Bild und stellt Fragen, und Sie bemerken, was Ihnen wichtig ist.',
  cta: 'Mit Mascha sprechen',
  situations: [
    'Sie haben von metaphorischen Karten gehört und möchten ausprobieren, wie das funktioniert.',
    'Sie möchten verstehen, was Sie wirklich wollen, aber auf die direkte Frage an sich selbst kommen nur „richtige“ Antworten.',
    'Ihre Kraft hat nachgelassen, und Sie möchten herausfinden, was Sie stützt und inspiriert.',
    'Eine Entscheidung steht an, und Sie möchten klären, was Ihnen selbst dabei wichtig ist.',
    'Sie haben Transformationsspiele schon live gespielt und möchten das Online-Format ausprobieren.',
  ],
  example: {
    question: 'Ich möchte ein Transformationsspiel mit metaphorischen Karten ausprobieren. Wie funktioniert das?',
    answer: `Hallo! Ich bin Mascha, Spielleiterin und Expertin für Transformationsspiele. Schön, dass du Lust hast, es auszuprobieren.

Es ist ganz einfach. Ich zeige dir eine metaphorische Karte: Darauf ist ein Bild, eine Handlung oder eine Szene ohne eindeutige Bedeutung. Du erzählst, was du siehst, was du fühlst und was davon in deinem Leben anklingt. Richtige und falsche Antworten gibt es nicht. Die Karte ist wie ein Spiegel: Jeder sieht darin etwas anderes, und über diese Assoziationen zeigt sich, was dir wirklich wichtig ist: Werte, Wünsche, innerer Halt.

Ich gebe keine Ratschläge und deute die Karten nicht für dich. Ich stelle Fragen und helfe dir, Bedeutungen zu bemerken und dich auf das zu stützen, was dir Kraft gibt. Meist gehen wir 2–3 Karten durch und schauen dann, was schon klarer geworden ist. Danach entscheidest du: tiefer gehen oder ein Fazit ziehen.

Man kann einfach spielen, um sich selbst kennenzulernen. Oder man nimmt ein konkretes Anliegen. … Bei jedem solchen Thema funktionieren die Karten ebenfalls gut.

…

Ziehen wir die erste Karte? Du kannst gleich sagen, ob es ein Thema gibt, das du erkunden möchtest, oder ob wir einfach drauflos spielen.`,
  },
  can: [
    'Zeigt metaphorische Karten direkt im Chat, eine nach der anderen.',
    'Stellt zu jeder Karte offene Fragen, eine nach der anderen: was Sie sehen, was Sie fühlen, womit das in Ihrem Leben zusammenhängt.',
    'Hilft zu bemerken, was hinter den Assoziationen steckt: Werte, Wünsche, Absichten und das, was Ihnen Kraft gibt.',
    'Sagt nach zwei, drei Karten, was schon klarer geworden ist, und lässt Sie wählen: tiefer gehen oder ein Fazit ziehen.',
    'Zieht am Ende ein Fazit und bietet an, mit ihr weiterzumachen oder zu einem anderen Assistenten zu wechseln.',
  ],
  cannot: [
    'Keine Wahrsagerei und keine Vorhersagen: Die Karte ist hier eine Metapher, kein Schicksalszeichen.',
    'Deutet die Karten nicht für Sie und gibt keine Ratschläge. Mascha stellt Fragen, die Bedeutung finden Sie.',
    'Keine Psychotherapie: Das Spiel hilft, sich selbst besser zu verstehen, heilt aber nicht und ersetzt keinen Psychologen.',
  ],
  faq: [
    {
      q: 'Was sind metaphorische Karten?',
      a: 'Bilder ohne die eine richtige Bedeutung: ein Motiv, eine Handlung oder eine Szene. Jeder sieht darin etwas anderes, und an diesen Assoziationen lässt sich leichter erkennen, was Ihnen gerade wichtig ist.',
    },
    {
      q: 'Brauche ich ein eigenes Kartenset?',
      a: 'Nein. Die Karten zeigt Mascha selbst, direkt im Chat.',
    },
    {
      q: 'Wie lange dauert ein Spiel?',
      a: 'Meist zwei, drei Karten mit je ein, zwei Fragen. Dann fragt Mascha, ob Sie tiefer gehen oder ein Fazit ziehen möchten. Drängen wird sie Sie nicht.',
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

export default masha;
