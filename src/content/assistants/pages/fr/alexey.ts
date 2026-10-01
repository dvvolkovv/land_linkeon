import type { AssistantPageText } from '../../types';

/**
 * Алексей — юрист. Перевод pages/ru/alexey.ts.
 *
 * Одобренный образец: docs/assistant-pages/samples-ru.md.
 */
const alexey: AssistantPageText = {
  title: "Juriste IA en ligne et relecture de contrat — Alexeï | Linkeon",
  description:
    "Alexeï, juriste IA en ligne, relit votre contrat et vous explique, loi à l'appui, que faire : bail, licenciement, divorce, succession. 25 000 jetons offerts à l'inscription.",
  h1: "Alexeï — juriste IA en ligne : relecture de contrat et questions juridiques",
  lead: "Il est tard, le contrat se signe demain, et personne à qui poser la question. Alexeï vous explique avec des mots simples où sont les risques et ce que dit la loi à ce sujet.",
  card: "Contrats, location, travail, famille, succession. Explique la loi avec des mots simples et indique quoi faire, étape par étape.",
  cta: "Parler avec Alexeï",
  situations: [
    "Un prestataire vous a envoyé un contrat, et vous ne savez pas ce que vous risquez avec la clause pénale.",
    "On vous propose de partir « d'un commun accord », alors que le salaire du mois dernier n'a toujours pas été versé.",
    "Un magasin refuse de rembourser un appareil tombé en panne au bout d'une semaine.",
    "Vous héritez, mais avec des dettes, et ne savez pas s'il faut accepter la succession ou y renoncer.",
    "Un associé veut quitter votre SARL et exige sa part en argent.",
  ],
  example: {
    question:
      "Mon propriétaire veut résilier le bail de mon appartement avant son terme et garder le dépôt de garantie. Que puis-je faire ?",
    answer: `Bonjour ! Je suis Alexeï. En bref : votre propriétaire ne peut pas simplement vous faire partir avant la fin du bail et garder le dépôt de garantie. Tout dépend en grande partie de ce que dit le contrat.

1. Peut-il résilier le bail avant son terme ?

Si vous louez l'appartement en tant que particulier, il s'agit d'un bail d'habitation (art. 671 à 688 du Code civil russe).

— Il ne peut pas le faire unilatéralement, sauf si le contrat le prévoit expressément (art. 310 du Code civil russe).
…
— S'il n'y a pas de motif, vous avez le droit de rester dans l'appartement jusqu'à la fin du bail.

2. Le dépôt de garantie (paiement de sûreté)

Le dépôt est restitué s'il n'y a ni loyers impayés ni dégâts dans l'appartement (art. 381.1 du Code civil russe). … Si c'est le propriétaire qui résilie le bail, il n'a en règle générale aucune raison de garder le dépôt. …

3. Que faire

1. Relisez le contrat. Cherchez la durée, la clause de résiliation anticipée et les conditions de restitution du dépôt.
2. Ne signez rien et ne partez pas « à l'amiable » tant que vous n'avez pas décidé à quelles conditions.
3. Communiquez par écrit, par messagerie ou par mail. Conservez les échanges et les reçus de paiement.
…
5. Envoyez une mise en demeure par lettre recommandée avec inventaire du contenu. Exigez-y la restitution du dépôt (et, si vous le souhaitez, le remboursement des frais de déménagement) dans un délai donné, par exemple 10 jours.
6. Sans réponse, saisissez le tribunal. …

…

Pour vous répondre plus précisément, j'ai quelques questions :
— Pour quelle durée le bail a-t-il été signé, et contient-il une clause de résiliation anticipée ?
— Que dit le contrat au sujet du dépôt de garantie ?
— Comment le propriétaire justifie-t-il la résiliation ?
— Vous faut-il un modèle de mise en demeure ? Je peux le rédiger.`,
  },
  can: [
    "Relit et rédige des contrats : repère les clauses à risque et explique comment résilier un contrat déjà signé.",
    "Aide en cas de litige avec un magasin ou un prestataire : quoi exiger et comment obtenir réparation.",
    "Traite les questions de logement : location, achat et donation d'un appartement, litiges avec le promoteur pour un logement acheté sur plan, enregistrement du droit de propriété.",
    "Répond sur le travail, la famille et les successions : licenciement et salaires impayés, divorce et partage des biens, pension alimentaire, succession grevée de dettes.",
    "Aide les entrepreneurs : création et fermeture d'une entreprise individuelle ou d'une SARL, statuts, sortie d'un associé de SARL, contrats avec les partenaires commerciaux.",
    "Cite les articles précis des codes russes (civil, du travail, de la famille) et détaille les étapes : quoi faire, dans quel ordre, avec quels documents.",
  ],
  cannot: [
    "Ne vous représente pas en justice et ne dépose pas de documents à votre place. Alexeï est un consultant : ses réponses sont données à titre informatif.",
    "Ne remplace pas un avocat dans une affaire complexe, surtout au pénal. Si un juriste ou un avocat en personne est indispensable, Alexeï vous le dira franchement.",
    "N'explique pas comment contourner la loi.",
  ],
  faq: [
    {
      q: "Selon le droit de quel pays Alexeï répond-il ?",
      a: "Par défaut, selon le droit russe : Code civil, Code du travail, Code de la famille de la Fédération de Russie, entre autres. Si votre question concerne un autre pays, indiquez-le : Alexeï en tiendra compte.",
    },
    {
      q: "Puis-je envoyer le contrat en fichier ?",
      a: "Oui, un PDF ou un document. Le fichier est lu en entier : Alexeï le passe en revue clause par clause et vous montre où sont les risques.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si la comptable Anna sait déjà que vous êtes entrepreneur individuel, vous n'aurez pas à le réexpliquer à Alexeï.",
    },
    {
      q: "Qui verra mes échanges ?",
      a: "Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default alexey;
