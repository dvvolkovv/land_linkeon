import type { AssistantPageText } from '../../types';

/**
 * Миша — коучинг по стандартам ICF. Перевод pages/ru/misha.ts.
 *
 * Пример разговора — целиком, без правок: docs/assistant-pages/examples/misha.md.
 */
const misha: AssistantPageText = {
  title: "Séance de coaching en ligne selon les standards ICF — Micha | Linkeon",
  description:
    "Micha, coach IA (standards ICF) : ni conseils ni jugement, des questions pour voir ce qui vous freine et choisir un premier pas. 25 000 jetons offerts à l'inscription.",
  h1: "Séance de coaching en ligne : Micha, coach selon les standards ICF",
  lead: "Une conversation que vous repoussez depuis trois mois, ou un choix autour duquel vous tournez en rond. Micha ne vous dira pas ce qu'il faut faire : il pose des questions, et c'est vous qui trouvez la réponse et le premier pas.",
  card: "Une séance de coaching selon les standards ICF : des questions plutôt que des conseils, et à la fin, un pas que vous avez choisi vous-même.",
  cta: "Parler avec Micha",
  situations: [
    "Une conversation importante est repoussée de semaine en semaine, et vous ne savez pas ce qui vous retient.",
    "Votre objectif de l'année est noté depuis janvier, et rien n'a encore été fait pour l'atteindre.",
    "On vous propose une promotion, mais elle ne vous réjouit pas, et vous ne savez pas si vous la voulez vraiment.",
    "Vous hésitez entre deux options et tournez en rond, en refaisant votre choix à chaque fois.",
    "Des conseils, vous en avez assez entendu ; ce que vous voulez comprendre, c'est ce que vous voulez, vous.",
  ],
  example: {
    question:
      "Depuis trois mois, je repousse une conversation importante avec mon associé. Aidez-moi à comprendre ce qui me retient.",
    answer: `Bonjour ! Je suis Micha, coach. C'est bien que vous ayez décidé de vous pencher là-dessus. Quand une conversation est repoussée depuis trois mois, il y a presque toujours quelque chose derrière, et cela vaut la peine de le comprendre.

En bref, voici comment je travaille. Une séance de coaching est une conversation dans laquelle vous cherchez vous-même les réponses. Je ne donne pas de conseils, je ne juge pas et je ne dis pas ce qu'il faut faire. Je pose des questions qui aident à voir la situation plus largement et à remarquer ce qui vous échappe encore. En général, on sort d'une séance avec plus de clarté et une prochaine étape concrète, choisie par soi-même.

Ici, vous pouvez parler franchement, sans vous presser, à votre rythme.

Avant de commencer, comment dois-je vous appeler ?`,
  },
  can: [
    "Explique au départ comment se déroule une séance de coaching et ce qu'on peut en attendre.",
    "Vous aide à définir le sujet et l'objectif : de quoi vous voulez parler et avec quoi repartir à la fin.",
    "Pose une question ouverte à la fois et suit votre rythme. Si la conversation touche aux émotions, il leur laisse de la place.",
    "Aide à voir ce qui vous retient, quelles options s'offrent à vous et sur quelles forces vous pouvez vous appuyer.",
    "À la fin, aide à choisir un premier pas et à savoir à quoi vous reconnaîtrez que vous avancez.",
  ],
  cannot: [
    "Ne donne ni conseils, ni listes, ni solutions toutes faites, et ne juge pas. Micha travaille uniquement avec ce que vous apportez.",
    "N'est ni psychologue ni psychiatre : le coaching n'est pas une psychothérapie. Si la conversation touche à un traumatisme, à une dépression ou à un danger pour vous ou pour autrui, Micha vous proposera de consulter un spécialiste. En cas de danger de mort, contactez les services d'urgence de votre pays.",
  ],
  faq: [
    {
      q: "Comment se déroule une séance ?",
      a: "Micha vous demande d'abord de quoi vous voulez parler et ce qui serait pour vous un bon résultat. Ensuite viennent les questions, une à une : qu'est-ce qui compte le plus ici, qu'est-ce qui vous retient, quelles options voyez-vous. À la fin, un pas que vous choisirez vous-même et un bref bilan : les idées que vous emportez.",
    },
    {
      q: "Micha est-il un coach certifié ?",
      a: "Non, Micha est un assistant IA. Il mène la séance selon les standards de l'ICF, la Fédération internationale de coaching : il ne conseille pas, ne juge pas, pose des questions ouvertes et suit votre sujet.",
    },
    {
      q: "Avec quel sujet peut-on venir ?",
      a: "Avec un sujet sur lequel c'est à vous de décider : le travail, un changement, un objectif qui n'avance pas, une conversation que vous repoussez. C'est vous qui choisissez le sujet, et Micha le suit au lieu d'imposer le sien.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "Qui verra mes échanges ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default misha;
