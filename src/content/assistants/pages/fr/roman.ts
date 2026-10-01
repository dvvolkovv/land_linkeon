import type { AssistantPageText } from '../../types';

/**
 * Роман — личный ассистент. Перевод pages/ru/roman.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/roman.md.
 */
const roman: AssistantPageText = {
  title: "Assistant personnel IA polyvalent en ligne — Roman | Linkeon",
  description:
    "Roman, assistant personnel IA. Mail, proposition commerciale, plan, question mêlant droit, impôts et marketing : il démêle tout lui-même. 25 000 jetons offerts à l'inscription.",
  h1: "Roman — assistant personnel IA pour toutes vos tâches",
  lead: "Une proposition commerciale à rendre vendredi, un mail que vous repoussez depuis trois jours, une question dont on ne sait pas à qui la poser. Racontez tout à Roman avec vos propres mots : il répond lui-même et, au besoin, mobilise le savoir-faire d'un juriste, d'un comptable ou d'un marketeur.",
  card: "Prend en charge toute tâche. Contrat, impôts ou publicité : il traite la question lui-même, avec le savoir du bon spécialiste.",
  cta: "Parler avec Roman",
  situations: [
    "Un client laisse une facture impayée depuis deux mois, et il vous faut un mail poli, mais du genre qui fait payer.",
    "Vous lancez un nouveau service, et les questions tombent toutes en même temps : quel contrat avec les clients, quel impôt, où trouver les premiers acheteurs.",
    "Une question de cinq minutes — une déduction fiscale, le retour d'un achat, une clause de contrat — et vous ne savez pas à qui la poser.",
    "Il vous faut une présentation pour une réunion, une image pour un post, et vous voulez un fichier prêt, pas seulement un conseil.",
    "Votre semaine est minutée, et vous voulez organiser vos tâches pour que l'essentiel ne se noie pas dans les détails.",
  ],
  example: {
    question:
      "Je dois préparer pour vendredi une proposition commerciale pour un nouveau client, un studio de yoga. Par où commencer ?",
    answer: `Vendredi, c'est déjà demain, alors commençons par l'essentiel.

Aujourd'hui, 30 à 40 minutes : rassemblez les informations de départ
1. Quel studio : taille, nombre de salles et de professeurs, type de clientèle, cours en ligne ou en salle.
2. Ce qui leur pose problème : peu de nouveaux clients, des abonnements qui ne sont pas renouvelés, des réservations chaotiques, des réseaux sociaux qui ne décollent pas.
…

Structure de la proposition (5 à 7 pages, pas plus)
1. Le besoin du client, avec ses propres mots : « Vous souhaitez… ».
…
5. Le prix. Mieux vaut 2 ou 3 formules : essentielle, optimale et complète. Ainsi, le client choisit entre des options au lieu de répondre « oui ou non ».
…

Pour un studio de yoga
— Un ton calme et chaleureux, sans vente agressive.
…
— Montrez que vous comprenez leur activité : abonnements, fidélisation des clients, saisonnalité (creux en été, reprise en septembre et en janvier).

Pour tenir le délai de vendredi : aujourd'hui, rassemblez les informations et faites un brouillon ; demain matin, relisez et envoyez.

Pour ne pas perdre l'échéance de vue, j'ai préparé une fiche tâche « Envoyer la proposition au studio de yoga » pour demain, 12 h. … Si un autre horaire vous convient mieux, dites-le-moi.

Ce que je peux faire ensuite : dites-moi ce que vous vendez au studio (marketing, site web, équipement, comptabilité ou autre chose) et ce que vous savez déjà du client. Je rédigerai le texte complet de la proposition et, si vous le souhaitez, j'en ferai un document ou une présentation.`,
  },
  can: [
    "Prend en charge n'importe quelle tâche : un mail, une proposition commerciale, un plan, un texte, une idée. Donne une réponse concrète et pratique : quoi faire et par où commencer.",
    "S'appuie sur le savoir-faire des spécialistes de Linkeon : droit, fiscalité, marketing, rédaction, stratégie d'entreprise, carrière, coaching.",
    "Réunit en une seule réponse une tâche qui touche plusieurs domaines : par exemple le contrat, les impôts et la publicité d'un nouveau service.",
    "Livre le résultat sous forme de fichier, crée des images à partir d'une description et cherche sur le web quand la tâche l'exige.",
  ],
  cannot: [
    "Ne remplace pas un juriste, un comptable ou un autre spécialiste quand leur signature et leur responsabilité sont nécessaires. Les réponses de Roman sont données à titre informatif ; la décision vous appartient.",
    "Ne signe pas de documents et ne paie pas à votre place : c'est vous qui signez le contrat et faites les virements.",
  ],
  faq: [
    {
      q: "Pour quelles tâches venir voir Roman ?",
      a: "Pour toutes : d'un mail ou d'un planning de la semaine à une question où se mêlent contrat, impôts et publicité. Si vous ne savez pas quel assistant choisir, commencez par Roman.",
    },
    {
      q: "Roman s'y connaît-il en droit et en fiscalité ?",
      a: "Il répond lui-même à ces questions, avec le savoir du spécialiste concerné : à une question juridique comme le juriste Alexeï, à une question financière comme la comptable Anna. Et si vous voulez leur parler directement, inutile de tout répéter : les assistants Linkeon partagent un même profil, ce que vous dites à l'un, tous le savent.",
    },
    {
      q: "Puis-je envoyer un fichier ou dicter ?",
      a: "Oui. Roman lit en entier les PDF, les tableaux et les documents, et vous pouvez dicter au lieu de taper.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "Qui verra mes échanges ?",
      a: "Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default roman;
