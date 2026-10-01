import type { AssistantPageText } from '../../types';

/**
 * Маша — трансформационная игра с метафорическими картами. Перевод
 * pages/ru/masha.ts. Говорит на «ты» — это её голос, в примере он сохранён.
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
  title: "Cartes métaphoriques, jeu transformationnel en ligne — Macha | Linkeon",
  description:
    "Macha, animatrice de jeux, mène en ligne un jeu transformationnel avec des cartes métaphoriques : elle montre une carte, pose des questions, et c'est vous qui trouvez le sens.",
  h1: "Cartes métaphoriques en ligne : Macha anime votre jeu transformationnel",
  lead: "Macha vous montre une carte métaphorique et vous demande ce que vous y voyez et ce que vous ressentez. Il n'y a pas de bonne réponse : c'est vous qui trouvez le sens, et Macha vous aide à le remarquer.",
  card: "Un jeu avec des cartes métaphoriques : Macha montre une image et pose des questions, et vous remarquez ce qui compte pour vous.",
  cta: "Parler avec Macha",
  situations: [
    "Vous avez entendu parler des cartes métaphoriques et voulez essayer pour voir comment ça marche.",
    "Vous voulez comprendre ce que vous désirez vraiment, mais quand vous vous posez la question directement, seules les « bonnes » réponses vous viennent.",
    "Vous avez moins d'énergie qu'avant et voulez trouver ce qui vous soutient et vous inspire.",
    "Un choix se profile, et vous voulez démêler ce qui compte vraiment pour vous dans cette décision.",
    "Vous avez déjà joué à des jeux transformationnels en présentiel et voulez essayer en ligne.",
  ],
  example: {
    question: "J'aimerais essayer un jeu transformationnel avec des cartes métaphoriques. Comment ça marche ?",
    answer: `Salut ! Moi, c'est Macha, animatrice de jeux et spécialiste des jeux transformationnels. Je suis contente que tu aies envie d'essayer.

C'est tout simple. Je te montre une carte métaphorique : une image, une histoire ou une scène sans signification évidente. Tu racontes ce que tu vois, ce que tu ressens et ce que ça évoque dans ta vie. Il n'y a ni bonnes ni mauvaises réponses. La carte est comme un miroir : chacun y voit autre chose, et à travers ces associations apparaît ce qui compte vraiment pour toi — tes valeurs, tes désirs, tes appuis intérieurs.

Je ne donne pas de conseils et je n'interprète pas les cartes à ta place. Je pose des questions, je t'aide à repérer le sens et à t'appuyer sur ce qui te donne de la force. En général, on tire 2 ou 3 cartes, puis on regarde ce qui s'est déjà éclairci. Ensuite, c'est toi qui décides : aller plus loin ou faire le bilan.

On peut jouer simplement pour mieux se connaître. On peut aussi partir d'une question précise. … Avec n'importe lequel de ces sujets, les cartes fonctionnent bien aussi.

…

On tire la première carte ? Tu peux me dire tout de suite si tu as un sujet à explorer, ou bien on y va librement.`,
  },
  can: [
    "Montre les cartes métaphoriques directement dans le chat, l'une après l'autre.",
    "Pour chaque carte, pose des questions ouvertes, une à la fois : ce que vous voyez, ce que vous ressentez, à quoi cela renvoie dans votre vie.",
    "Aide à repérer ce qui se cache derrière les associations : valeurs, désirs, intentions et ce qui vous donne de la force.",
    "Après deux ou trois cartes, dit ce qui s'est déjà éclairci et vous propose de choisir : aller plus loin ou faire le bilan.",
    "À la fin, fait le bilan et vous propose de continuer avec elle ou de passer à un autre assistant.",
  ],
  cannot: [
    "Ne fait ni voyance ni prédictions : ici, la carte est une métaphore, pas un signe du destin.",
    "N'interprète pas les cartes à votre place et ne donne pas de conseils. Macha pose des questions, et c'est vous qui trouvez le sens.",
    "Ce n'est pas une psychothérapie : le jeu aide à mieux se comprendre, mais il ne soigne pas et ne remplace pas un psychologue.",
  ],
  faq: [
    {
      q: "Que sont les cartes métaphoriques ?",
      a: "Des images qui n'ont pas une seule bonne signification : une figure, une histoire ou une scène. Chacun y voit autre chose, et ces associations aident à remarquer ce qui compte pour vous en ce moment.",
    },
    {
      q: "Faut-il avoir son propre jeu de cartes ?",
      a: "Non. Macha montre les cartes elle-même, directement dans le chat.",
    },
    {
      q: "Combien de temps dure le jeu ?",
      a: "En général, deux ou trois cartes, avec une ou deux questions pour chacune. Ensuite, Macha vous demandera s'il faut aller plus loin ou faire le bilan. Elle ne vous pressera pas.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "Qui verra mes réponses ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default masha;
