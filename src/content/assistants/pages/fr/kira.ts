import type { AssistantPageText } from '../../types';

/**
 * Кира — дизайн. Перевод pages/ru/kira.ts.
 *
 * Картинки делает сама, но только растровые (PNG и JPEG): векторных файлов у
 * неё не бывает. Вектор на этой странице не обещать.
 *
 * Пример — разговор с прода 01.10.2026 (docs/assistant-pages/examples/kira.md),
 * картинка — копия в public/examples/.
 *
 * Надпись на логотипе (один файл на все языки) — по-русски, «Тёплый хлеб»;
 * в переводе — транслитерация с переводом при первом упоминании, как в en и pt:
 * « Tioply Khleb » (« Pain chaud »). alt говорит, что надпись — кириллицей.
 */
const kira: AssistantPageText = {
  title: "Designer IA : création de logo et identité visuelle — Kira | Linkeon",
  description:
    "Kira, designer IA, crée votre logo, votre identité visuelle, une carte de visite, une bannière ou une présentation, et retouche une image existante. PNG et JPEG, sans vectoriel.",
  h1: "Kira — designer IA : logo, identité visuelle et maquettes",
  lead: "L'ouverture est dans une semaine, et il n'y a encore ni enseigne, ni menu, ni flyers. Kira vous demande où ce sera affiché et qui le verra, puis vous montre une maquette au lieu de la décrire avec des mots.",
  card: "Logos, identité visuelle, cartes de visite, bannières, présentations. Crée des maquettes et retouche des images ; fichiers PNG et JPEG.",
  cta: "Parler avec Kira",
  situations: [
    "Votre logo a été dessiné il y a longtemps par une connaissance, et sur fond sombre, on ne le voit presque pas.",
    "La bannière est presque prête, mais il faut enlever un bandeau, changer le logo et décaler le titre vers la gauche.",
    "Il vous faut dix visuels pour des posts, et ils doivent tous former une même série.",
    "Vous intervenez demain, et vos slides viennent de trois modèles différents.",
    "L'enseigne est déjà faite, et les cartes de visite, les flyers et le chevalet de table doivent suivre le même style.",
    "Un designer vous a envoyé une maquette, quelque chose vous déplaît, mais vous ne savez pas dire quoi.",
  ],
  example: {
    question:
      "Faites un logo pour la boulangerie « Tioply Khleb » (« Pain chaud »). Il ira sur l'enseigne et sur des sacs en papier. Style : familial et chaleureux ; couleurs : bruns chauds et crème ; symbole : un épi de blé. Montrez-moi tout de suite une proposition en image, pas besoin de me poser de questions.",
    answer: `Voici une première version du logo :

Un épi surmonte l'inscription. La police est douce, à empattements ; les couleurs sont le brun foncé, le caramel et le crème. Peu de détails, pour que le logo reste lisible de loin sur l'enseigne comme sur un sac kraft.

À savoir avant l'impression :
— Le format. Je ne produis que des fichiers matriciels (PNG ou JPEG) ; je ne pourrai pas vous fournir de fichier vectoriel. Pour une enseigne, le fabricant demande en général du vectoriel : il faudra donc redessiner le logo d'après cette maquette. Le plus simple est de le faire une fois la version validée.
— Les sacs. Le papier kraft assombrit les couleurs, et le crème y est presque invisible. Pour les sacs, mieux vaut une version monochrome : le logo en brun foncé, sans fond.

Ensuite, je peux faire cette version monochrome sur fond transparent, ou une version horizontale pour l'enseigne, avec l'épi à gauche de l'inscription. Laquelle vous serait la plus utile ?`,
    image: {
      src: '/examples/kira-logo.webp',
      alt: "Logo de la boulangerie « Tioply Khleb » (« Pain chaud ») : un épi au-dessus du nom écrit en cyrillique, brun et caramel sur fond crème",
      width: 640,
      height: 640,
    },
  },
  can: [
    "Crée un logo de zéro ou retravaille le vôtre, avec des versions pour différents fonds et formats.",
    "Construit une identité visuelle (palette, associations de polices, règles d'usage du logo) et la tient sur toute une série de supports.",
    "Réalise des maquettes de cartes de visite, flyers, brochures, enseignes, plaques et diplômes, des bannières et des visuels aux formats de chaque plateforme, des présentations dans un style cohérent.",
    "Retouche une image existante au lieu de tout redessiner : « décale à gauche », « enlève le bandeau », « remplace le logo », toutes les corrections en une fois, et le reste ne bouge pas.",
    "Analyse un design fait par d'autres : ce qui ne fonctionne pas, pourquoi, et quoi corriger en priorité.",
  ],
  cannot: [
    "Ne fait pas de vectoriel : pas de SVG, AI, EPS ni CDR, seulement du PNG et du JPEG, y compris sur fond transparent. Kira vous le dit d'emblée.",
    "Ne garantit pas un fichier prêt à imprimer : l'épreuve couleur, le CMJN et les fonds perdus, c'est l'imprimeur qui les vérifie. Kira vous dit quoi lui demander.",
    "Ne copie pas les logos des autres et n'utilise ni photos ni polices sans en avoir les droits. Si la licence n'est pas claire, elle le signale.",
    "N'écrit pas le texte de vente de la maquette : pour la formulation, mieux vaut passer par Ekaterina, la rédactrice.",
  ],
  faq: [
    {
      q: "Nous avons déjà une charte graphique. Kira va-t-elle la respecter ?",
      a: "Oui. Envoyez la charte en fichier ou donnez le lien de votre site : Kira y reprendra les couleurs, les polices et le logo. Si vous avez du violet, il reste violet, pas « à peu près pareil ».",
    },
    {
      q: "Que faut-il pour l'impression ?",
      a: "Dites où et dans quel format la maquette sera imprimée. Kira fixera les dimensions en millimètres, agrandira l'image si nécessaire et vous dira quoi vérifier : la lisibilité à taille réelle, le contraste, les marges.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Si Ekaterina sait déjà ce que fait votre entreprise et qui sont vos clients, vous n'aurez pas à le réexpliquer à Kira.",
    },
  ],
};

export default kira;
