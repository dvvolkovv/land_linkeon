import type { AssistantPageText } from '../../types';

/**
 * Ирина — карьера самого человека. Перевод pages/ru/irina.ts.
 *
 * Не рекрутер: по инструкции вакансий не подбирает и людей на работу не ищет.
 * Найм, вакансии и вопросы к собеседованию на этой странице не обещать.
 */
const irina: AssistantPageText = {
  title: "Coach carrière IA en ligne : changer de métier — Irina | Linkeon",
  description:
    "Irina, conseillère en carrière et assistante IA de Linkeon, vous aide à trouver votre voie si vous voulez changer de métier : points forts, motivations, valeurs au travail.",
  h1: "Irina — conseillère en carrière en ligne : reconversion et orientation professionnelle pour adultes",
  lead: "Vous avez envie de quitter votre travail, mais pour aller où ? Irina pose ses questions une à une et vous aide à démêler ce qui vous donnait de l'énergie au travail, ce qui vous en prenait, et quelle direction en découle.",
  card: "Explore votre parcours, vos points forts et vos motivations, et vous aide à voir dans quelle direction aller professionnellement.",
  cta: "Parler avec Irina",
  situations: [
    "Des années dans le même métier, de moins en moins d'énergie pour l'exercer, et aucune idée de quoi faire à la place.",
    "On vous propose de passer manager, et vous ne savez pas si vous avez envie d'encadrer une équipe.",
    "Vous avez un CV, mais vous ne savez pas vous-même expliquer vos points forts ni pourquoi vous avez quitté vos postes précédents.",
    "Vous pensez quitter le bureau pour le freelance ou votre propre activité et voulez savoir si ce mode de travail vous conviendrait.",
    "Vous reprenez le travail après une longue pause et ne savez pas par où commencer.",
    "Trois emplois en deux ans, et vous voulez comprendre ce qui n'a pas marché à chaque fois.",
  ],
  example: {
    question:
      "Je suis comptable depuis huit ans et j'ai l'impression d'être en burn-out. Je veux changer de métier, mais je ne sais pas vers quoi.",
    answer: `Merci de m'en parler. Huit ans dans le même métier, c'est une solide expérience. Souvent, le burn-out ne signale pas que vous n'êtes « pas à votre place », mais que quelque chose d'important dans votre travail a cessé de vous nourrir.

Ne nous précipitons pas sur le choix d'un nouveau métier. D'abord, essayons de comprendre ce qui vous épuise exactement et ce qui vous donne encore de l'énergie. La direction deviendra alors plus claire, et vous n'emporterez pas la même fatigue dans votre nouveau poste.

Commençons par une question simple :

Repensez à votre travail sur les deux dernières années. Y a-t-il eu des tâches ou des moments où vous ressentiez de l'intérêt, de l'implication, ou simplement où « le temps filait » ? Lesquels ?

S'il n'y en a presque pas eu, dites-le simplement. C'est important aussi.`,
  },
  can: [
    "Explore votre parcours, une question à la fois : quelles tâches vous donnaient de l'énergie, ce qui vous fatiguait, pourquoi vous avez changé de poste.",
    "Vous aide à voir vos points forts, compétences professionnelles comme qualités personnelles, sans jugement ni étiquette.",
    "Éclaire ce qui vous motive au travail et ce qui ne vous convient vraiment pas : valeurs, motivations, environnement de travail, façon d'interagir avec les autres.",
    "Si vous envoyez votre CV, en dégage les compétences clés et vous interroge sur ce qu'il ne montre pas : pourquoi vous avez pris telle ou telle décision.",
    "Fait la synthèse : votre portrait professionnel et quelques pistes à envisager, en termes de postes et de modes de travail.",
  ],
  cannot: [
    "N'est pas recruteuse : ne cherche pas d'offres d'emploi et n'aide pas à recruter. Irina travaille sur votre propre carrière.",
    "Ne décide pas à votre place. Elle propose des pistes à étudier, et le choix vous revient.",
    "Ne remplace pas un psychologue ou un médecin : si la fatigue dure depuis des mois et pèse sur votre santé, c'est une raison de les consulter.",
  ],
  faq: [
    {
      q: "Comment se passe la conversation ?",
      a: "Irina pose une question à la fois et commence par écouter : votre dernier poste, les tâches qui vous donnaient de l'énergie, ce qui vous fatiguait. Ensuite, elle approfondit et rassemble le tout en une vue d'ensemble : points forts, motivations, ce qui ne vous convient pas et les pistes à envisager.",
    },
    {
      q: "Faut-il un CV ?",
      a: "Non. Si vous en avez un, envoyez-le en fichier : Irina partira de là et vous interrogera sur ce qu'il ne montre pas. Sinon, elle commencera par votre dernière expérience et vos objectifs.",
    },
    {
      q: "Quelle différence entre Irina et un recruteur ?",
      a: "Un recruteur cherche une personne pour un poste. Irina fait le chemin inverse : elle vous aide à comprendre quel travail vous convient. Elle ne propose pas d'offres d'emploi.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "Qui verra mes réponses ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si vous avez déjà exploré vos valeurs avec Olia, Irina n'aura pas à repartir de zéro. Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default irina;
