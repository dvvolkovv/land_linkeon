import type { AssistantPageText } from '../../types';

/** Дмитрий — технический директор. Перевод pages/ru/dmitry.ts. */
const dmitry: AssistantPageText = {
  title: "CTO externalisé : directeur technique à la demande — Dmitri | Linkeon",
  description:
    "Dmitri, assistant IA dans le rôle d'un CTO externalisé : il vérifie le devis de votre prestataire et vous dit s'il faut embaucher des développeurs ou prendre un service existant.",
  h1: "Dmitri — directeur technique externalisé pour ceux qui ne sont pas développeurs",
  lead: "Vous devez faire développer quelque chose, sans savoir combien ça devrait coûter. Dmitri propose deux ou trois options, de la plus économique à la plus solide, et vous dit ce que le bon marché vous coûtera en contrepartie.",
  card: "Architecture, délais et devis, prestataires, premiers développeurs. Parle de décisions et de leurs conséquences, pas de jargon.",
  cta: "Parler avec Dmitri",
  situations: [
    "Un prestataire demande trois mois et un budget à six chiffres, et vous ne savez pas ce qui est justifié là-dedans.",
    "Il vous faut un premier développeur dans l'équipe, et vous ne savez pas comment l'évaluer en entretien.",
    "Le site est tombé un vendredi soir, et il s'avère que personne ne faisait de sauvegardes.",
    "Le prestataire ne répond plus, et c'est lui qui a le code et les accès au serveur.",
    "Les développeurs disent qu'il « faut tout réécrire », et vous ne savez pas s'il faut les croire.",
  ],
  example: {
    question:
      "Je veux une application de prise de rendez-vous pour mon salon. Faut-il embaucher des développeurs ou prendre un service existant ?",
    answer: `Prenez un service existant. Faire développer votre propre application pour un seul salon n'en vaut pas la peine : vous paierez des centaines de fois plus cher pour un produit moins bon que ceux qui existent déjà sur le marché.

Les options

DIKIDI
Mise en service — 1 jour
Coût — Formule gratuite disponible, formules payantes à partir de quelques centaines de ₽/mois
Contrepartie — Peu d'outils d'analyse et d'automatisation. …

YCLIENTS (la référence du secteur beauté en Russie)
Mise en service — 2 à 5 jours
Coût — Environ 1 500 à 5 000 ₽/mois pour 1 à 3 praticiens
Contrepartie — Vous payez chaque mois. Beaucoup de réglages : comptez la première semaine pour vous y retrouver

Votre propre application sur mesure
Mise en service — 4 à 8 mois
Coût — 1,5 à 4 M₽ de développement + 50 000 à 150 000 ₽/mois de maintenance
Contrepartie — L'argent, le temps et la dépendance au prestataire. …

Les prix des services sont indicatifs et les tarifs changent. Vérifiez-les sur leurs sites avant de choisir.

…

Le principal risque
Toute votre base clients sera stockée chez le service. Vérifiez d'emblée qu'on peut l'exporter vers Excel : si c'est possible, rien ne vous attache au service pour toujours. Faites un export une fois par mois : c'est votre sauvegarde.

À faire cette semaine : inscrivez-vous sur DIKIDI et sur YCLIENTS (en période d'essai), et saisissez dans les deux vos prestations et vos praticiens. Envoyez le lien de réservation à 5 ou 10 clientes fidèles et regardez où elles préfèrent réserver. Au bout d'une semaine, gardez le service qui vous a plu.

Combien de praticiens avez-vous ? Le choix de la formule en dépend.`,
  },
  can: [
    "Analyse les cahiers des charges et les devis des prestataires : ce qui est justifié dans l'estimation et ce qui ne l'est pas.",
    "Compare les options (service existant, no-code, développement sur mesure) selon le délai, l'ordre de grandeur du coût et les risques. Si un service existant suffit, il vous le dira, même si vous demandiez comment développer.",
    "Aide à constituer l'équipe : qui embaucher en premier, salariés ou prestataires, comment évaluer un développeur quand on n'est pas soi-même programmeur.",
    "Aide avec les prestataires : cahier des charges, recette des livrables, droits sur le code et accès, volet technique du contrat.",
    "Fait le point sur la dette technique, la fiabilité et la sécurité : ce qu'il faut réparer maintenant et ce qui peut attendre, quoi faire quand tout est tombé, comment stocker les données personnelles et à qui donner des accès.",
  ],
  cannot: [
    "Ne fait pas passer une estimation de délai pour une promesse : toute estimation est une fourchette fondée sur des hypothèses, et Dmitri dit ce qui pourrait la faire déraper.",
    "Ne remplace pas un audit de sécurité et ne garantit pas la protection. Il vous dit où sont les risques et ce qui les réduit à peu de frais.",
    "Ne pilote pas le projet à votre place : c'est vous qui donnez les tâches aux développeurs et validez leur travail.",
    "Ne remplace ni le juriste ni le financier : pour la rédaction juridique du contrat, voyez Alexeï ; pour la rentabilité, Vitali.",
  ],
  faq: [
    {
      q: "Faut-il s'y connaître en technique ?",
      a: "Non. Dmitri parle en termes de décisions et de conséquences, et quand un terme technique est inévitable, il l'explique entre parenthèses.",
    },
    {
      q: "Puis-je envoyer un cahier des charges ou le devis d'un prestataire ?",
      a: "Oui, un PDF ou un document. Le fichier est lu en entier. Dmitri vous dira ce qui est justifié dans l'estimation, ce qui manque et ce que le contrat doit prévoir sur le plan technique.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si Andreï sait déjà ce que fait votre entreprise, vous n'aurez pas à le réexpliquer à Dmitri.",
    },
  ],
};

export default dmitry;
