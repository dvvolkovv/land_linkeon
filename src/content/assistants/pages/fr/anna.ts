import type { AssistantPageText } from '../../types';

/**
 * Анна — бухгалтер. Перевод pages/ru/anna.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/anna.md.
 */
const anna: AssistantPageText = {
  title: "Comptable IA en ligne : impôts des entreprises — Anna | Linkeon",
  description:
    "Anna, comptable IA en ligne, calcule impôts et cotisations des entreprises, explique les régimes fiscaux russes, la TVA et les échéances. 25 000 jetons offerts à l'inscription.",
  h1: "Anna — comptable IA en ligne : la fiscalité des entrepreneurs et des sociétés, en termes simples",
  lead: "Le courrier des impôts est arrivé vendredi soir, et votre comptable ne répondra que lundi. Anna vous explique avec des mots simples ce qu'on attend de vous, combien payer et avant quelle date.",
  card: "Impôts et cotisations en Russie : régime simplifié (USN), patente, statut d'indépendant, TVA. Calcule sur vos chiffres, sans jargon.",
  cta: "Parler avec Anna",
  situations: [
    "Vous êtes entrepreneur individuel à l'USN (le régime fiscal simplifié russe) et ne savez pas de combien vos cotisations peuvent réduire l'impôt.",
    "Vous vous lancez pour la première fois et hésitez entre le statut russe de travailleur indépendant, l'entreprise individuelle à l'USN et le régime de la patente.",
    "Le fisc vous demande des explications sur votre déclaration, et vous ne savez pas quoi répondre.",
    "Vous embauchez votre premier salarié et voulez savoir quel impôt sur le revenu et quelles cotisations payer pour lui.",
    "Votre chiffre d'affaires augmente, et vous ne savez pas à partir de quel montant vous devrez payer la TVA.",
  ],
  example: {
    question:
      "Je suis entrepreneur individuel au régime simplifié russe (USN « revenus »), et cette année je vais atteindre environ 3 millions de roubles. Quels impôts et cotisations dois-je payer, et quand ?",
    answer: `Sans salariés, avec un revenu de 3 000 000 ₽ en 2026, voici ce que ça donne.

Ce qu'il faut payer

Cotisations forfaitaires « pour vous-même » — 57 390 ₽ — au plus tard le 28/12/2026
1 % du revenu au-delà de 300 000 ₽ — (3 000 000 − 300 000) × 1 % = 27 000 ₽ — au plus tard le 01/07/2027
USN 6 % — 180 000 ₽ avant déduction des cotisations — acomptes et solde selon le calendrier ci-dessous

Vous pouvez déduire de l'impôt la totalité des cotisations, jusqu'à 100 %. C'est permis aux entrepreneurs individuels sans salariés.
Impôt : 180 000 − 57 390 − 27 000 = 95 610 ₽.
Cotisations comprises, la charge totale est ≈ 180 000 ₽, soit environ 6 % du revenu.

Calendrier
— Les acomptes d'USN se paient au plus tard le 28 avril, le 28 juillet et le 28 octobre. …
— La notification d'acompte se dépose au plus tard le 25 du même mois. Déposez la prochaine d'ici le 26/10/2026 (le 25 tombe un dimanche) et payez d'ici le 28/10/2026 pour les 9 mois.
— Impôt de l'année : au plus tard le 28/04/2027. Déclaration : au plus tard le 25/04/2027. …

Important
— Pas de TVA à payer. En 2026, les entrepreneurs individuels à l'USN sont exonérés de TVA jusqu'à 20 millions de roubles de revenu. En 2027, le seuil sera de 15 millions, et en 2028 de 10 millions.
…

Si vous voulez, je peux calculer le montant exact des acomptes trimestre par trimestre. Pour cela, envoyez-moi votre revenu de chaque trimestre.`,
  },
  can: [
    "Calcule impôts et cotisations sur vos chiffres : USN « revenus » et « revenus moins dépenses », régime de la patente, statut de travailleur indépendant, régime général (OSNO).",
    "Explique la TVA, l'impôt sur les bénéfices, l'impôt sur le revenu et les cotisations sociales, y compris pour les salariés.",
    "Fait le point sur la comptabilité et les documents : écritures, bilan, états financiers aux normes comptables russes (RSBU), pièces justificatives, règles de caisse.",
    "Indique comment répondre au fisc et aux caisses sociales, et aide, à un niveau de base, pour la paie et les ressources humaines.",
    "Cherche des moyens légaux de payer moins et prévient quand une règle a changé récemment.",
    "Si la question est ambiguë, commence par vous demander votre régime fiscal et la forme de votre entreprise.",
  ],
  cannot: [
    "Ne dépose pas vos déclarations et ne tient pas votre comptabilité. Anna est une consultante, pas une auditrice : ses réponses sont données à titre informatif.",
    "Ne propose pas de montages contraires à la législation fiscale.",
    "Ne remplace pas un comptable ou un juriste dans une situation complexe. Si vous ne pouvez pas vous en passer, Anna vous le dira franchement.",
  ],
  faq: [
    {
      q: "Selon le droit de quel pays Anna répond-elle ?",
      a: "Par défaut, selon le droit russe : la législation fiscale de la Fédération de Russie et les normes comptables russes (RSBU). Si votre entreprise est dans un autre pays, indiquez-le : Anna en tiendra compte.",
    },
    {
      q: "Puis-je envoyer un relevé ou une déclaration en fichier ?",
      a: "Oui, un PDF, un tableau ou un document. Le fichier est lu en entier, et Anna fait les calculs sur vos chiffres.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si Anna sait déjà ce que vous faites et quel est votre chiffre d'affaires, vous n'aurez pas à le réexpliquer à Vitali, le directeur financier.",
    },
    {
      q: "Qui verra mes chiffres ?",
      a: "Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default anna;
