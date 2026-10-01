import type { AssistantPageText } from '../../types';

/**
 * Оля — исследование ценностей. Перевод pages/ru/olia.ts.
 *
 * Одобренный образец: docs/assistant-pages/samples-ru.md.
 *
 * Правки владельца применены: Leadership Development Profile назван один раз (в
 * FAQ) и с пометкой «по мотивам, не официальный тест»; в «Что умеет» — просто
 * «логика действий», без названия методики. Пункт о помощи детям в «Чего не
 * делает» оставлен, как в образце, но, как и остальные телефоны помощи, без
 * российского номера: в переводе — местная линия психологической помощи,
 * экстренные службы и линия помощи детям своей страны (бриф переводчика, п. 8).
 */
const olia: AssistantPageText = {
  title: "Carte des valeurs et Spirale dynamique en ligne — Olia | Linkeon",
  description:
    "Olia mène une exploration de vos valeurs : héros préféré, temps, argent, cinq phrases à compléter, couleurs de la Spirale dynamique. À la fin, votre carte des valeurs personnelle.",
  h1: "Carte des valeurs et Spirale dynamique : une exploration menée par Olia",
  lead: "Olia pose ses questions une à une et remarque ce qui se cache derrière vos réponses. À la fin, elle dresse votre carte des valeurs : ce qui vous anime, quelle est votre logique d'action et dans quelle direction grandir.",
  card: "Une conversation en cinq étapes, du héros préféré aux couleurs de la Spirale dynamique. À la fin, votre carte des valeurs personnelle.",
  cta: "Parler avec Olia",
  situations: [
    "Tout semble en ordre (travail, projets, entourage), mais vous ne savez pas ce qui vient de vous et ce qui relève des attentes des autres.",
    "Un choix vous attend (changer de métier, déménager, vous lancer à votre compte), et vous voulez vous appuyer sur ce qui compte vraiment pour vous.",
    "Vous remarquez que vous parlez d'une chose, mais que vous consacrez votre temps et votre argent à une autre.",
    "Vous avez découvert la Spirale dynamique et voulez savoir de quels niveaux vous êtes le plus proche.",
    "Vous dirigez une équipe et voulez comprendre sur quoi vous vous appuyez pour prendre vos décisions.",
  ],
  example: {
    question: "Je voudrais comprendre quelles sont vraiment mes valeurs. Comment se passe votre exploration ?",
    answer: `Salut ! Moi, c'est Olia. Je suis contente que tu veuilles explorer tes valeurs. C'est un beau travail, et très personnel.

Comment ça se passe. Ce n'est pas un test avec de bonnes réponses, mais une conversation tranquille. Tu te regardes toi-même, et moi, je t'aide à remarquer ce qui se cache derrière tes mots. Nous passerons par quelques étapes, une question à la fois :

1. Le héros. Nous parlerons d'un personnage qui te touche et de ce que tu reconnais en lui.
2. Le temps. Nous regarderons à quoi tu choisis de consacrer ton temps libre.
3. L'argent. Nous verrons à quoi tu dépenses ton argent au-delà des dépenses obligatoires, et ce que cela t'apporte.
4. Cinq phrases inachevées. Tu les compléteras comme elles résonnent en toi.
5. Les couleurs. Tu choisiras les manières de vivre dont tu te sens le plus proche en ce moment.

À la fin, je rassemblerai tout dans ta carte des valeurs personnelle. Tu verras ce qui t'anime, quelle est ta logique d'action et dans quelle direction tu peux continuer à grandir.

Réponds comme tu veux, en quelques mots ou en détail. Ici, impossible de se tromper.

Commençons. Pense à ton héros préféré, à une célébrité ou à un personnage de livre, de film ou de conte. Qui est-ce, et qu'est-ce qui t'attire chez lui ?`,
  },
  can: [
    "Mène l'exploration étape par étape : héros préféré, temps libre, dépenses au-delà de l'indispensable, cinq phrases à compléter, couleurs de la Spirale dynamique.",
    "Pose une question à la fois et approfondit : ce que vous reconnaissez dans le héros, pourquoi c'est justement cela qui compte pour vous.",
    "Vous renvoie les valeurs qu'on entend dans vos réponses, sans jugement.",
    "À la fin, dresse votre carte des valeurs : valeurs dominantes, logique d'action, éventail de valeurs selon la Spirale dynamique et prochaine étape de développement.",
  ],
  cannot: [
    "Ce n'est pas une psychothérapie : Olia ne pose pas de diagnostic et ne soigne pas.",
    "Ce n'est pas un service d'urgence. Si c'est très dur en ce moment, appelez une ligne locale d'aide psychologique. En cas de danger de mort, contactez les services d'urgence de votre pays. Les enfants et les adolescents peuvent appeler la ligne d'écoute pour les jeunes de leur pays.",
  ],
  faq: [
    {
      q: "Qu'est-ce que la Spirale dynamique ?",
      a: "Un modèle de Don Beck et Chris Cowan, où les manières de vivre sont désignées par des couleurs, du beige (la survie) au turquoise (l'unité). Olia vous demandera de choisir les deux couleurs dont vous vous sentez le plus proche aujourd'hui, et de nommer celles que vous avez dépassées ou que vous commencez tout juste à découvrir.",
    },
    {
      q: "Que signifie « logique d'action » ?",
      a: "C'est une notion issue d'un modèle du développement de l'adulte : la manière dont une personne prend ses décisions et donne du sens à ce qui lui arrive. Olia s'inspire du Leadership Development Profile pour mener la conversation ; ce n'est pas le test officiel. Par exemple, pour la logique Expert, l'essentiel, c'est d'avoir raison et de respecter les règles ; pour Achiever, le résultat ; pour Strategist, le système et l'influence.",
    },
    {
      q: "Combien de temps dure l'exploration ?",
      a: "Cinq étapes, une question à la fois. Vous pouvez répondre brièvement ou en détail : c'est de là que dépend la durée de la conversation.",
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

export default olia;
