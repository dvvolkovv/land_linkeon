import type { AssistantPageText } from '../../types';

/**
 * Екатерина — тексты и продвижение. Перевод pages/ru/ekaterina.ts.
 *
 * Тексты пишет только по-русски, на каком бы языке ей ни написали (так в её
 * инструкции; проверено вживую). Поэтому title, description, h1, card и lead —
 * про тексты на русском для русскоязычной аудитории, а в cannot первым идёт
 * пункт о языке — единственный пункт сверх русского текста.
 */
const ekaterina: AssistantPageText = {
  title: "Rédactrice IA : textes de vente en russe — Ekaterina | Linkeon",
  description:
    "Ekaterina, rédactrice IA pour un public russophone : posts Telegram, newsletters, landing pages et slogans en russe. Elle peaufine vos brouillons et bâtit un plan de contenu.",
  h1: "Ekaterina — rédactrice IA : textes de vente, posts et newsletters en russe",
  lead: "Le lancement est lundi, et l'annonce n'est toujours pas écrite. Expliquez à Ekaterina, avec vos propres mots, ce que vous vendez et à qui : elle vous rendra un texte fini en russe, pour un public russophone, avec une version plus courte.",
  card: "Posts, newsletters, landing pages, slogans en russe. Transforme une idée ou un brouillon en texte fini et propose plusieurs versions.",
  cta: "Parler avec Ekaterina",
  situations: [
    "Il est temps d'annoncer vos nouveaux prix à vos clients, et vous ne voulez pas que le mail sonne comme une excuse.",
    "Le brouillon du post est prêt, mais il est long et confus, et vous n'avez pas envie de le publier.",
    "Votre canal vit par à-coups : trois posts en une journée, puis un mois de silence.",
    "Il vous faut le texte d'une landing page, et vous ne savez pas quels bénéfices mettre en haut de page.",
    "Les ventes de votre formation démarrent dans deux semaines, et vous voulez préparer vos abonnés à l'avance.",
    "Votre marque écrit tantôt sur un ton officiel, tantôt sur le ton de la blague, et vos abonnés ne reconnaissent pas sa voix.",
  ],
  example: {
    question:
      "Écrivez un post pour notre canal Telegram sur le lancement de notre nouveau service : le nettoyage de meubles à domicile.",
    answer: `Voici le post, prêt à publier. Entre crochets, les emplacements pour vos informations.

🛋 Le nettoyage de vos meubles, maintenant chez vous !

Le canapé sur lequel on a renversé du café. Le fauteuil que le chat adore. Le matelas qui aurait bien besoin d'un coup de frais depuis longtemps.

Avant, il aurait fallu faire transporter vos meubles pour les nettoyer, ou vivre avec les taches. Maintenant, c'est plus simple : c'est nous qui venons chez vous.

✨ Ce que nous nettoyons :
— canapés et fauteuils
— matelas
— chaises et poufs
— tapis et moquettes
— intérieurs de voiture (si vous le proposez)

🧼 Pourquoi vous pouvez être tranquille :
✔️ Matériel professionnel et produits hypoallergéniques : sans danger pour les enfants et les animaux
✔️ Nous éliminons taches, odeurs, poussière et acariens
✔️ Vos meubles sèchent en [4–6] heures
…

🎁 Cadeau de lancement : jusqu'au [date], [20] % de réduction sur la première commande avec le mot « PROPRE ».

📲 Pour réserver et connaître le prix : [téléphone / @username / lien]
Envoyez une photo de vos meubles, et nous calculons le prix en 5 minutes.

Votre canapé mérite une seconde chance 💙

Version courte (pour une annonce ou une relance) :

🛋 Nouveau service : le nettoyage de meubles à domicile !
Nous venons nettoyer votre canapé, vos fauteuils, votre matelas ou votre tapis directement chez vous. Produits sans danger, séchage en quelques heures.
…

Si vous m'indiquez la ville, les prix, le nom de l'entreprise et votre public (familles avec enfants, bureaux, propriétaires d'animaux), je rendrai le texte plus précis. …`,
  },
  can: [
    "Écrit des textes de tous formats : posts, scripts de stories, messages pour un canal Telegram, textes de landing pages, slogans, newsletters.",
    "Reprend un texte brut et le rend plus clair, plus logique et plus convaincant.",
    "Propose plusieurs versions, courte et longue, émotionnelle et experte, et adapte le style à vos lecteurs.",
    "Élabore un plan de contenu et des rubriques, et rédige une série de posts qui prépare vos abonnés à l'achat.",
    "Aide à présenter votre produit : proposition de valeur, bénéfices, arguments qui inspirent confiance, appel à l'action.",
    "Indique où et comment vous faire connaître, aide à trouver la voix de votre marque et explique les principes du marketing avec des mots simples.",
  ],
  cannot: [
    "N'écrit pas dans d'autres langues : même si vous lui écrivez en français, le texte sera en russe. Ses textes s'adressent à des lecteurs russophones.",
    "Ne connaît pas votre activité de l'intérieur et peut ajouter un avantage que vous n'offrez pas. Avant de publier, vérifiez les prix, les délais et les promesses faites aux clients.",
    "Ne lance pas de publicité et n'achète pas d'espaces. Ekaterina vous indique les canaux et la marche à suivre, mais c'est vous qui passez à l'action.",
    "Ne promet ni portée ni ventes : le résultat dépend aussi du produit, du prix et de l'endroit où le texte sera lu.",
  ],
  faq: [
    {
      q: "Puis-je envoyer mon propre brouillon ?",
      a: "Oui, en texte dans un message ou en fichier. Ekaterina le rendra plus clair et plus convaincant et, si besoin, vous proposera une version courte et une version longue.",
    },
    {
      q: "Que lui dire pour que le texte soit juste ?",
      a: "Ce que vous vendez, à qui, et où le texte sera publié. S'il manque quelque chose, Ekaterina vous le demandera.",
    },
    {
      q: "Quelle différence entre Ekaterina et Alexandra, l'assistante marketing ?",
      a: "Alexandra part du marché : à qui vendre, comment se démarquer de la concurrence, comment mesurer le résultat. Ekaterina se charge des textes eux-mêmes, du post et de la newsletter jusqu'à la landing page, et du plan de contenu qui va avec.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si Alexandra sait déjà qui sont vos clients, vous n'aurez pas à le réexpliquer à Ekaterina.",
    },
  ],
};

export default ekaterina;
