import type { AssistantPageText } from '../../types';

/**
 * Полина — тренер по образу жизни: сон, питание, движение, восстановление.
 * Перевод pages/ru/polina.ts. Не врач — так сказано в её промпте. 112 в русском
 * тексте сверен в образце Оли (docs/assistant-pages/samples-ru.md, МЧС
 * «Система-112»); в переводе номера нет — экстренные службы своей страны (бриф
 * переводчика, п. 8).
 *
 * Пример — docs/assistant-pages/examples/polina.md, целиком; снят только жирный.
 */
const polina: AssistantPageText = {
  title: "Mieux dormir et trouver son rythme de vie — Polina | Linkeon",
  description:
    "Polina, coach mode de vie, vous aide à régler sommeil, alimentation et activité physique sur une semaine chargée : un petit changement à la fois, sans régime ni salle de sport.",
  h1: "Mieux dormir et trouver son rythme : Polina, coach mode de vie",
  lead: "Sommeil, alimentation, mouvement et repos, adaptés à une semaine ordinaire et chargée, pas à un emploi du temps idéal. Polina propose un seul petit changement, et d'emblée sa version pour les mauvais jours.",
  card: "Sommeil, alimentation, mouvement et repos pour une semaine chargée. Un petit changement à la fois, et sa version pour les mauvais jours.",
  cta: "Parler avec Polina",
  situations: [
    "Vous vous couchez après minuit, vous vous levez à 7 h, et dès midi vous n'avez plus d'énergie.",
    "En journée, vous mangez sur le pouce ; le soir, tout ce que vous trouvez dans le frigo.",
    "Vous voulez bouger davantage, mais pour la salle de sport, vous n'avez ni le temps ni l'énergie.",
    "Chaque lundi, vous commencez une nouvelle vie, et le jeudi, il n'en reste plus rien.",
    "Une échéance, un déménagement ou la maladie d'un proche, et votre routine habituelle s'est effondrée.",
  ],
  example: {
    question: "Je me couche à 1 h du matin, je me lève à 7 h et je me sens vidée toute la journée. Par où commencer ?",
    answer: `On dirait que vous manquez tout simplement de sommeil : de 1 h à 7 h du matin, cela fait environ six heures. Pour beaucoup de gens, c'est trop peu, et la fatigue qui vous gagne dès midi le confirme. Commençons par un seul changement.

Vous coucher 15 minutes plus tôt, à 0 h 45. Garder le réveil à 7 h. On ne touche pas à l'heure du lever : c'est un matin régulier qui tient tout le rythme. On ne déplace que le coucher. Quand une semaine se sera bien passée, vous avancerez encore de 15 minutes.

Pour que ça marche, il faut un signal « on termine ». Réglez une alarme à 0 h 30 intitulée « on éteint ». Quand elle sonne, baissez la lumière et rangez l'ordinateur portable. Vous pouvez garder le téléphone, mais seulement au lit.

Si la journée est mauvaise (vous avez fini tard, vous n'avez pas tout fait, vous avez envie de « vivre un peu pour vous »), couchez-vous simplement à 0 h 45, même si tout n'est pas terminé. Pas besoin de faire mieux. Si ça dérape, le matin on ne rattrape rien et on se lève à l'heure habituelle.

Comment savoir si ça marche. Au bout d'une semaine, regardez s'il est devenu plus facile de vous lever, au moins un jour sur deux, et si l'après-midi est moins lourd. S'il n'y a aucune différence, nous chercherons plus loin.

Ce soir, réglez l'alarme « on éteint » à 0 h 30.

Qu'est-ce qui vous fait veiller jusqu'à 1 h du matin, d'habitude : les tâches, le travail, ou est-ce le seul moment pour vous ?`,
  },
  can: [
    "Sommeil : horaires, endormissement, réveils trop précoces, travail en horaires décalés, récupération après un manque de sommeil.",
    "L'alimentation comme une routine, pas comme un régime : régularité, composition de l'assiette, en-cas, hydratation, repas sur le pouce.",
    "Bouger sans salle de sport : la plus petite dose qui fonctionne, et la reprise après une longue pause.",
    "Énergie : le coup de fatigue de la mi-journée, le « je n'ai plus la force de rien » du soir, le rythme dans les périodes difficiles.",
    "Propose un seul changement, pas une liste, et un signe qui montrera au bout d'une semaine s'il fonctionne.",
    "Examine un programme d'entraînement ou des recommandations envoyés en fichier, sans contredire le spécialiste qui vous suit.",
  ],
  cannot: [
    "N'est pas médecin, et le dit elle-même : ne pose pas de diagnostic, ne prescrit ni n'arrête de médicaments, n'interprète pas les analyses.",
    "Ne donne pas de recommandations en cas de grossesse, de troubles du comportement alimentaire, de diabète, de maladies du cœur, des reins ou de l'appareil digestif : elle explique pourquoi il faut un médecin.",
    "Ne parle pas de routine en présence de signes inquiétants : douleur dans la poitrine, évanouissements, perte de poids inexpliquée, saignements, insomnie depuis des mois. Dans ces cas, consultez tout de suite un médecin, et en cas de danger de mort, appelez les services d'urgence de votre pays.",
    "Ne recommande pas de compléments alimentaires, quels qu'ils soient.",
  ],
  faq: [
    {
      q: "Pourquoi un seul changement plutôt qu'un plan sur un mois ?",
      a: "Une habitude qui ne tient que par la volonté survit rarement un mois. Celle qui marche, c'est celle qui tient même un mauvais jour. Si une étape n'a pas tenu, Polina ne vous culpabilise pas : elle cherche ce qui n'a pas fonctionné.",
    },
    {
      q: "Par quoi Polina commence-t-elle ?",
      a: "Par ce qui vous gêne le plus, et par votre cadre : à quelle heure vous vous levez et vous couchez, combien de temps vous avez, ce que vous avez déjà essayé. Pour elle, le sommeil est la base : tant qu'il n'est pas réglé, parler d'alimentation et de sport ne sert presque à rien.",
    },
    {
      q: "Polina peut-elle m'aider à maigrir ?",
      a: "Elle ne promet ni résultat, ni poids, ni délai, et ne fixe pas de quota de calories. Son objectif : une routine qui tienne une semaine chargée. Selon ses règles, la santé ne se mesure pas au poids.",
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

export default polina;
