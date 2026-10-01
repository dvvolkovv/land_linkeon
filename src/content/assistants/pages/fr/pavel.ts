import type { AssistantPageText } from '../../types';

/** Павел — продажи. Перевод pages/ru/pavel.ts. */
const pavel: AssistantPageText = {
  title: "Scripts de vente et traitement des objections — Pavel | Linkeon",
  description:
    "Pavel, expert IA en vente : réponses prêtes à « c'est cher », « je vais réfléchir », « envoyez un devis », analyse de vos échanges clients. 25 000 jetons offerts à l'inscription.",
  h1: "Scripts de vente et traitement des objections : Pavel vous dit quoi répondre au client",
  lead: "Les demandes arrivent, mais très peu vont jusqu'au paiement. Pavel trouve où vous perdez vos clients et vous donne une formulation à leur dire mot pour mot, dès aujourd'hui.",
  card: "Scripts, réponses à « c'est cher » et « je vais réfléchir », négociation, tunnel de vente. Des phrases à dire telles quelles au client.",
  cta: "Parler avec Pavel",
  situations: [
    "Après avoir vu le prix, le client écrit « c'est cher » et disparaît.",
    "On vous dit « envoyez-moi un devis », et après l'envoi, plus de nouvelles.",
    "Il y a un mois, un client est « parti réfléchir », et vous ne savez pas comment le relancer sans paraître insistant.",
    "En négociation, on vous demande une remise, et vous cédez sans rien obtenir en échange.",
    "Vous recrutez votre premier commercial et ne savez pas quels objectifs lui fixer ni comment le motiver.",
  ],
  example: {
    question: "Mes clients disent « c'est cher » et partent réfléchir. Comment gérer ça ?",
    answer: `« C'est cher, je vais réfléchir » ne veut presque jamais dire que c'est vraiment trop cher pour le client. En général, cela signifie qu'il n'a pas vu ce qu'il paie, ou qu'il lui reste une raison qu'il n'a pas formulée. Discuter du prix ne sert donc à rien. Il faut d'abord comprendre ce qu'il veut dire.

1. Au moment même du « c'est cher »

Ne vous justifiez pas et ne proposez pas de remise. Posez une question :

« Je comprends. Dites-moi, cher par rapport à quoi ? À une autre offre ou au budget que vous aviez prévu ? »

…

2. S'il dit « je vais réfléchir »

Ne le laissez pas partir tout de suite, mais ne forcez pas non plus. Il faut savoir à quoi exactement il va réfléchir :

« Bien sûr, c'est une décision importante. Pour vous faciliter les choses : qu'est-ce qui vous retient le plus en ce moment — le prix, les délais, un doute sur le fait que ça marche dans votre cas, ou faut-il en parler à quelqu'un ? »

…

3. Si le client ne répond plus

Au bout de 3 à 5 jours, n'écrivez pas « Alors, vous avez réfléchi ? ». Écrivez de façon à ce qu'il soit facile de répondre :

« Bonjour Ivan. Je ne veux pas vous presser. Dites-moi en un mot ce qui correspond le mieux : 1) c'est toujours d'actualité, il me faut encore du temps ; 2) le prix ne m'a pas convenu ; 3) ce n'est plus d'actualité. Toute réponse me va. »

…

À faire aujourd'hui : listez ceux qui sont « partis réfléchir » le mois dernier et envoyez-leur le message du point 3.

Que vendez-vous, et à quel moment entendez-vous d'habitude « c'est cher » : juste après le prix ou après le devis ? Envoyez-moi un vrai extrait de vos échanges, et je le décortiquerai phrase par phrase.`,
  },
  can: [
    "Donne des formulations prêtes à l'emploi, à dire telles quelles : le premier message, comment annoncer le prix, que répondre à « c'est cher », « je vais réfléchir » et « envoyez-moi un devis ».",
    "Analyse vos échanges avec un client, votre proposition commerciale ou la transcription d'un appel : ce qui a été dit et ce qu'il aurait fallu dire.",
    "Repère où votre tunnel de vente fuit, calcule combien de demandes il faut pour atteindre l'objectif et ce que rapporterait une meilleure conversion à une seule étape.",
    "Vous prépare aux négociations : comment marchander, que demander en échange d'une concession, comment mener une vente quand plusieurs personnes décident.",
    "Suggère quoi proposer à la place d'une remise et comment relancer un client silencieux sans quémander.",
    "Aide à monter un service commercial : quels objectifs fixer, quoi mesurer, quelle rémunération variable prévoir pour le premier commercial.",
  ],
  cannot: [
    "N'apprend pas à mettre la pression, à mentir sur une pénurie ou à inventer des « aujourd'hui seulement » : ces procédés ruinent les ventes récurrentes.",
    "Ne promet pas de taux de conversion. Tout chiffre est un repère sectoriel, assorti d'une réserve.",
    "N'apporte pas de clients. Où trouver des demandes, c'est une question pour Alexandra, l'assistante marketing ; Pavel travaille avec ceux qui sont déjà venus.",
    "Ne remplace pas un juriste : pour le contrat, les conditions générales de vente et le remboursement d'un acompte, voyez Alexeï.",
  ],
  faq: [
    {
      q: "Pour quel marché Pavel donne-t-il ses conseils ?",
      a: "Par défaut, pour le marché russe : échanges par messagerie plutôt qu'au téléphone, validations interminables, méfiance envers le paiement d'avance, appels d'offres. Si vous vendez dans un autre pays, indiquez-le : le tunnel de vente et les réponses aux objections se construisent de la même façon, mais mieux vaut vérifier les habitudes des acheteurs locaux auprès de quelqu'un qui connaît ce marché.",
    },
    {
      q: "Puis-je envoyer mes échanges avec un client ?",
      a: "Oui, en texte ou en fichier : Pavel les décortique phrase par phrase. Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
    {
      q: "Pavel peut-il m'aider à vendre n'importe quoi ?",
      a: "Non. Si le produit ne répond pas au besoin du client, Pavel vous dira que le problème n'est pas la vente : bien vendre un tel produit ne ferait qu'accélérer les retours et abîmer votre réputation.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si Alexandra sait déjà qui sont vos clients, vous n'aurez pas à le réexpliquer à Pavel.",
    },
  ],
};

export default pavel;
