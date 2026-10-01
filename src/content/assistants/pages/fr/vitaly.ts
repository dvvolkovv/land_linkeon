import type { AssistantPageText } from '../../types';

/**
 * Виталий — финансовый директор. Перевод pages/ru/vitaly.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/vitaly.md.
 */
const vitaly: AssistantPageText = {
  title: "Directeur financier en ligne et modèle financier — Vitali | Linkeon",
  description:
    "Vitali, directeur financier en ligne : modèle financier, prévisionnel de trésorerie, économie unitaire, seuil de rentabilité. Il vous aide aussi à tenir votre budget personnel.",
  h1: "Vitali — directeur financier en ligne : modèle financier, trésorerie, finances personnelles",
  lead: "Le chiffre d'affaires grimpe, mais le compte reste vide ; ou bien, depuis trois ans, vous n'arrivez pas à vous constituer une épargne de précaution. Vitali traite ces questions sur vos chiffres et vous montre deux ou trois scénarios, avec les hypothèses et le principal risque de chacun.",
  card: "Finances d'entreprise et personnelles : trésorerie, économie unitaire, modèle financier, régime fiscal, matelas de sécurité, épargne.",
  cta: "Parler avec Vitali",
  situations: [
    "Une banque ou un investisseur vous demande un modèle financier, et vous n'avez que votre chiffre d'affaires mois par mois.",
    "Votre chiffre d'affaires a augmenté, et il faut trancher : rester à l'USN (le régime fiscal simplifié russe) à 6 %, passer à 15 % ou créer une SARL.",
    "La publicité vous amène des clients, mais vous ne savez pas si chacun d'eux est rentable.",
    "Vous ne savez pas comment vous rémunérer : salaire, dividendes, ou laisser l'argent dans l'entreprise.",
    "Vous avez de l'argent disponible et une carte de crédit à 30 %, et vous ne savez pas par quoi commencer : rembourser ou investir.",
  ],
  example: {
    question:
      "J'ai une boutique en ligne : le chiffre d'affaires augmente, mais le compte est toujours vide. Comment savoir où passe l'argent ?",
    answer: `Presque toujours, c'est parce que le bénéfice et l'argent sur le compte sont deux choses différentes. Dans un commerce de détail en croissance, l'argent part le plus souvent dans les stocks et dans le décalage entre le paiement du fournisseur et l'encaissement des clients. Vous pouvez le vérifier en une soirée.

Étape 1. Un tableau des flux de trésorerie sur 6 à 12 mois

Exportez les relevés de tous vos comptes et classez chaque paiement par poste. …

Étape 2. Où l'argent se perd d'habitude dans une boutique en ligne

1. Les stocks. Quand l'activité grandit, vous achetez en vue des ventes à venir, et le bénéfice se transforme en marchandise dans l'entrepôt. …
2. Le cycle de trésorerie. Il se calcule ainsi : jours de rotation des stocks + jours d'attente du versement de la marketplace ou du prestataire de paiement − jours de délai accordés par le fournisseur. Par exemple, 60 + 14 − 0 = 74 jours. Chaque rouble de chiffre d'affaires est immobilisé pendant 74 jours : plus la croissance est rapide, plus il faut d'argent.
…

Étape 3. Trois vérifications rapides

— La valeur de votre stock (au prix d'achat) aujourd'hui et il y a un an. Si elle a augmenté à peu près du montant de l'argent « disparu », vous tenez la réponse.
…

Envoyez-moi le relevé de compte (Excel ou PDF) et l'état de vos stocks sur les six derniers mois. Je classerai les paiements par poste, calculerai votre cycle de trésorerie et vous montrerai combien d'argent est déjà immobilisé et combien le sera au rythme de croissance actuel. …`,
  },
  can: [
    "Établit un prévisionnel de trésorerie, un budget et un modèle financier, et analyse le compte de résultat.",
    "Calcule l'économie unitaire, le seuil de rentabilité et le retour sur investissement : combien coûte un client et à partir de quel panier moyen vous devenez rentable.",
    "Compare les régimes fiscaux et les formes d'entreprise sur votre chiffre d'affaires ; aide à choisir entre vous verser un salaire ou des dividendes.",
    "S'occupe des finances personnelles : budget familial, épargne de précaution de 3 à 12 mois, épargne pour un logement ou des études, déductions fiscales.",
    "Fait ses calculs avec du code, pas « à vue de nez », et donne trois scénarios : central, optimiste et pessimiste.",
    "Lit dans un fichier un relevé bancaire, un compte de résultat ou un livre des recettes et des dépenses, et trace des graphiques : flux de trésorerie, structure des dépenses, comparaison des scénarios.",
  ],
  cannot: [
    "Ne vous conseille pas d'acheter telle action ou tel fonds : Vitali n'est pas conseiller en investissement. Il raisonne en principes : classes d'actifs, répartition, risque, horizon.",
    "Ne garantit aucun résultat : toute prévision est un modèle fondé sur des hypothèses, et Vitali nomme la principale.",
    "Ne travaille pas sur des montages d'évasion fiscale : uniquement de l'optimisation légale.",
  ],
  faq: [
    {
      q: "Pour quel pays Vitali fait-il ses calculs ?",
      a: "Par défaut, pour la Russie : USN, régime de la patente, statut de travailleur indépendant, compte d'investissement individuel (IIS), déductions fiscales. Il peut aussi calculer en dollars ou en euros. Si votre entreprise est dans un autre pays, indiquez-le : la trésorerie se calcule de la même façon, mais vérifiez les impôts locaux auprès d'un spécialiste de ce pays.",
    },
    {
      q: "Quelle différence entre Vitali et un comptable ?",
      a: "La comptabilité (écritures, déclarations, calcul des salaires), c'est l'affaire d'Anna, la comptable. Vitali s'occupe des décisions pour l'avenir : ce qu'une opération signifie pour votre trésorerie et dans quelle direction avancer. Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "Qui verra mes chiffres ?",
      a: "Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default vitaly;
