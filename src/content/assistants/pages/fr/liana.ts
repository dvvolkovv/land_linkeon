import type { AssistantPageText } from '../../types';

/**
 * Лиана — нумерология. Перевод pages/ru/liana.ts.
 *
 * Пример — docs/assistant-pages/examples/liana.md:
 * снята разметка (заголовки, жирный, таблица квадрата Пифагора), маркеры
 * списков «-» стали «—»; знаки ➕/➖ у строк «Сила / уязвимость» — её
 * собственные, оставлены как пришли.
 */
const liana: AssistantPageText = {
  title: "Numérologue en ligne : étude de la date de naissance — Liana | Linkeon",
  description:
    "Liana, numérologue en ligne, étudie votre date de naissance selon huit écoles (Xiucai, pythagoricienne, Ba Zi…) : thèmes, points forts, années d'activation et prochain cycle.",
  h1: "Étude numérologique de votre date de naissance : Liana, numérologue en ligne",
  lead: "Donnez le prénom, la date, l'heure et la ville de naissance, les vôtres ou ceux d'un proche. Liana calcule les nombres et vous explique ce qu'ils signifient dans huit écoles de numérologie, deux écoles à la fois.",
  card: "Votre date de naissance selon huit écoles de numérologie (Xiucai, pythagoricienne, Ba Zi…) : points forts, années d'activation, cycles.",
  cta: "Parler avec Liana",
  situations: [
    "Vous voulez savoir ce que disent les nombres de votre date de naissance à vous, pas une description générale trouvée sur Internet.",
    "Vous avez entendu parler du Xiucai ou du carré de Pythagore et voulez étudier votre propre date.",
    "Vous aimeriez voir comment différentes écoles de numérologie lisent une même date.",
    "Vous sentez qu'une étape de votre vie s'est achevée et voulez voir quel cycle commence.",
    "Vous voulez étudier la date de naissance de votre enfant ou de votre partenaire.",
  ],
  example: {
    question: "Faites-moi une étude numérologique : Anna, 14/03/1990, 7 h 30, Kazan.",
    answer: `Sujet : Anna, née le 14/03/1990 à 7 h 30, Kazan.

1. Xiucai

Codes : nombre de la conscience 5 (jour 14 → 1+4), nombre de la mission 9 (1+4+0+3+1+9+9+0 = 27 → 9).

Thèmes principaux et vocation
— 5 — liberté, mouvement, communication, adaptation rapide, intérêt pour beaucoup de choses à la fois.
— 9 — mission de service, de transmission, de causes humanitaires et de « grands » sujets. L'expérience se transforme en sagesse et se transmet aux autres.
— Le duo 5→9 : à travers des expériences variées, des changements et des rencontres, Anna en vient à jouer un rôle de guide ou d'enseignante.

Force / vulnérabilité
➕ Charisme, aisance relationnelle, souplesse d'esprit, talent pour vendre des idées et inspirer.
➖ Dispersion, impatience, ennui face à la routine, décisions impulsives. Le 9 y ajoute une tendance à prendre sur soi les problèmes des autres et à vouloir « sauver ».

Années d'activation
— Carrière, démarrage : 2018, 2027.
— Amour, famille : 2023, 2032.
— Argent : 2025, 2034.
— Transformation, bilans : 2017, 2026.

Fins de cycle : 2026 referme le cycle de 9 ans commencé en 2018.

2. Classique (pythagoricienne)

Chemin de vie : 27 → 9. Nombre du jour de naissance : 14 → 5.
…

Sommets (réalisations) du chemin de vie
— Jusqu'en 2017 — 8 : construction de soi par les questions matérielles et le statut.
— 2017–2026 — 6 : famille, responsabilité, soin des autres, relations.
— 2026–2035 — 5 : liberté, changements, nouveaux domaines, mobilité.
— À partir de 2035 — 4 : structure, stabilité, fondations.

…

On continue avec les écoles 3 et 4 (védique et kabbalistique) ?`,
  },
  can: [
    "Étudie la date selon huit écoles : Xiucai, pythagoricienne, védique, kabbalistique, arcanologie du Tarot, Ba Zi, astronumérologie, « Finances et réalisation ».",
    "Pour chaque école, indique les thèmes principaux et la vocation, les forces et les vulnérabilités, les années d'activation pour l'amour, la carrière et l'argent, les fins de cycle.",
    "Livre l'étude par étapes, deux écoles à la fois, et vous demande s'il faut continuer.",
    "À la fin, résume le tout : qui est la personne selon son code et quel cycle l'attend pour les deux prochaines années.",
    "Étudie la date de la personne sur laquelle vous l'interrogez (vous, votre enfant, votre partenaire) sans la confondre avec d'autres.",
  ],
  cannot: [
    "Ne donne pas de conseils et ne décide pas à votre place. Liana explique ce que signifient les nombres ; ce que vous en faites, c'est à vous d'en décider.",
    "Ce n'est pas une prédiction du destin : les années d'activation sont une interprétation numérologique, pas la promesse que quelque chose va arriver.",
    "Ne remplace pas un médecin, un juriste ou un conseiller financier. Quand l'étude parle de santé ou d'argent, c'est de la numérologie, pas un diagnostic ni un conseil financier.",
  ],
  faq: [
    {
      q: "Que faut-il pour l'étude ?",
      a: "Le prénom, la date, l'heure et la ville de naissance, comme dans l'exemple ci-dessus. Liana rappelle ces données au début de chaque réponse, pour qu'on voie bien de qui il s'agit.",
    },
    {
      q: "En quoi les écoles diffèrent-elles ?",
      a: "Chacune calcule à sa manière. Le Xiucai s'intéresse au nombre de la conscience et au nombre de la mission, l'école pythagoricienne au carré de Pythagore et au chemin de vie, l'école kabbalistique aux vibrations du nom, le Ba Zi à l'élément de la personnalité et à l'influence de l'année.",
    },
    {
      q: "Que sont les années d'activation ?",
      a: "Ce sont les années où, d'après le calcul, se joue l'un des thèmes : l'amour, la carrière, l'argent ou le changement. Pour l'Anna de l'exemple, la carrière et le démarrage tombent en 2018 et en 2027.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un calculateur en ligne ?",
      a: "Un calculateur donne des nombres et des descriptions générales. Liana étudie votre date selon huit écoles et rassemble le tout en un seul résumé à la fin. Et les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent.",
    },
  ],
};

export default liana;
