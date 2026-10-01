import type { AssistantPageText } from '../../types';

/**
 * Александра — маркетолог. Перевод pages/ru/alexandra.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/alexandra.md.
 */
const alexandra: AssistantPageText = {
  title: "Assistant marketing IA : analyse concurrentielle — Alexandra | Linkeon",
  description:
    "Alexandra, assistante marketing IA : données récentes sur le marché et la concurrence, positionnement, pub, contenu. Elle vous dit quoi mesurer et quand attendre des résultats.",
  h1: "Alexandra — assistante marketing IA : analyse de la concurrence et plan de promotion",
  lead: "La publicité dévore le budget, et les demandes n'augmentent pas. Alexandra commence par vous demander ce que vous vendez et à qui, trouve des données récentes sur le marché et la concurrence, puis propose des actions dont on peut mesurer le résultat.",
  card: "Marché et concurrence d'après des données récentes, positionnement, publicité, contenu. Dit quoi mesurer et quand attendre des résultats.",
  cta: "Parler avec Alexandra",
  situations: [
    "Vous ouvrez un studio ou une boutique et voulez savoir comment vous démarquer des concurrents de la rue d'à côté.",
    "Vos clients ne viennent que par recommandation, et vous ne savez pas par quelle publicité commencer.",
    "Vous animez vos réseaux sociaux, mais vos posts ne rapportent pas une seule demande.",
    "Vous lancez un nouveau produit et cherchez son nom et le ton sur lequel en parler.",
    "Vous voulez comprendre ce qui se passe en ce moment dans votre niche : prix, tendances, quels concurrents progressent et grâce à quoi.",
  ],
  example: {
    question: "J'ai un salon de manucure dans un quartier résidentiel. Comment attirer de nouveaux clients sans gros budget ?",
    answer: `Alexandra, à votre écoute. Dans un quartier résidentiel, presque tous les clients habitent à 10 ou 15 minutes de votre salon. Mieux vaut donc consacrer le budget non pas à une publicité tous azimuts, mais à votre visibilité dans le quartier et à faire en sorte que vos clientes amènent leurs amies.

1. Les cartes : la source de clients la moins chère
— Yandex Maps et 2GIS (des services de cartes russes). Remplissez votre fiche à 100 % : photos de vos réalisations et du salon, tarifs, réservation en ligne, horaires. C'est là qu'on cherche « manucure près de chez moi ».
— Les avis. Après chaque prestation, envoyez à la cliente un lien pour laisser un avis ; vous pouvez aussi poser un QR code sur le comptoir. …

2. Les communautés locales
— Les groupes Telegram et WhatsApp des résidences et des immeubles, les groupes du quartier sur VKontakte (réseau social russe). Ne spammez pas. Faites une offre utile « pour les voisins » : par exemple, 15 % de réduction sur la première visite avec un code promo. Le code vous indiquera en même temps d'où vient la cliente.
…

4. Le bouche-à-oreille organisé
— Un programme de parrainage « Amène une amie ». Chacune reçoit 500 ₽ sur sa prochaine visite.
…

Ce qu'il faut mesurer
Demandez à chaque nouvelle cliente comment elle vous a connue, et chaque mois, regardez :
— combien de nouveaux clients chaque canal a apportés ;
— quelle part des clientes revient (la norme : 60 % ou plus) ;
— combien vous coûte un nouveau client.

Ce qui marche le plus vite : en général, en 1 à 2 mois, ce sont les cartes avec les avis, les groupes du quartier et le parrainage qui donnent l'effet le plus visible.

Pour affiner le plan, dites-moi : la ville et le quartier, le nombre de prothésistes ongulaires, votre panier moyen et votre nombre actuel de clients par mois. Je vous préparerai alors un plan étape par étape pour le mois et je regarderai ce que font les concurrents autour de vous.`,
  },
  can: [
    "Analyse le marché et la concurrence sur des données récentes : cherche sur le web les chiffres, tendances et études de cas actuels, au lieu de répéter des informations dépassées.",
    "Aide à trouver votre positionnement et votre proposition de valeur unique : ce qui vous distingue et pourquoi vous choisir.",
    "Construit la stratégie de contenu et le tunnel de vente : réseaux sociaux, blog, newsletters, vidéo, et parcours client du premier contact jusqu'à l'achat.",
    "Décortique la publicité ciblée et les annonces sur les moteurs de recherche, ainsi que les indicateurs : coût d'acquisition client, LTV, ROAS, conversions.",
    "Travaille sur la marque : nom, ton de voix, style visuel. Propose des mécaniques de croissance virale.",
    "Propose des actions concrètes au résultat mesurable : quoi faire, comment mesurer et quand attendre des résultats.",
  ],
  cannot: [
    "Ne lance pas de campagnes publicitaires et ne gère pas votre budget pub : c'est vous ou votre prestataire qui vous en chargez.",
    "Ne garantit ni demandes ni ventes : le résultat dépend du produit, du prix et de l'exécution. Alexandra vous dira quoi mesurer pour voir à temps si un canal fonctionne.",
    "Ne complimente pas une idée bancale par politesse : elle en pointera les faiblesses avec tact, mais honnêtement.",
  ],
  faq: [
    {
      q: "D'où Alexandra tire-t-elle ses données sur le marché ?",
      a: "Pour analyser le marché, la concurrence et les tendances, elle cherche des données récentes sur le web au lieu de se fier à ce que le modèle savait lors de son entraînement.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si Alexandra sait déjà ce que vous faites et pour qui, vous n'aurez pas à le réexpliquer à Ekaterina, la rédactrice.",
    },
    {
      q: "Qui verra mes échanges ?",
      a: "Nous ne vendons pas vos échanges et ne nous en servons pas pour la pub. Traitement chez les fournisseurs d'IA.",
    },
  ],
};

export default alexandra;
