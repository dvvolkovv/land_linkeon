import type { AssistantPageText } from '../../types';

/**
 * Андрей — запуск бизнеса. Перевод pages/ru/andrey.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/andrey.md.
 */
const andrey: AssistantPageText = {
  title: "Créer son entreprise : conseils pour se lancer — Andreï | Linkeon",
  description:
    "Créer votre entreprise avec Andreï : tester la demande avant d'investir, choisir statut et régime fiscal, calculer le seuil de rentabilité, planifier jusqu'aux premières ventes.",
  h1: "Créer son entreprise : Andreï vous accompagne de l'idée aux premières rentrées d'argent",
  lead: "Vous avez une idée et de l'argent de côté, et vous avez peur de l'investir au mauvais endroit. Andreï vous demande d'abord votre budget et vos délais, puis vous montre ce que vous pouvez vérifier en une semaine, pour une somme modique.",
  card: "Se lancer : tester la demande avant d'investir, choisir son statut, premiers clients, point mort, plan jusqu'aux premières ventes.",
  cta: "Parler avec Andreï",
  situations: [
    "Vous voulez quitter le salariat pour votre propre affaire et ne savez pas combien de mois vos économies vont tenir.",
    "Vous avez une idée de produit, mais vous n'en avez encore parlé à aucun futur client.",
    "Vous hésitez entre statut d'indépendant, entreprise individuelle et SARL, et chacun autour de vous dit autre chose.",
    "Vos premiers clients sont venus par votre réseau, mais où trouver les suivants et combien leur facturer, vous ne le savez pas.",
    "Votre activité a démarré il y a six mois, les commandes arrivent, mais vous n'êtes toujours pas rentable.",
  ],
  example: {
    question: "Je veux ouvrir un café à emporter près d'une station de métro. Par où commencer et combien faut-il au départ ?",
    answer: `Un café à emporter près du métro : par où commencer et combien d'argent prévoir

Commencez non pas par la machine à café, mais par l'emplacement. Dans un café à emporter, le chiffre d'affaires dépend presque entièrement du lieu. Tant que vous n'avez pas compté les passants à une sortie de métro précise, tout budget prévisionnel relève de la devinette.

Combien d'argent faut-il au départ

C'est une estimation fondée sur la pratique courante. Les chiffres exacts dépendent de la ville et de la surface du local.

Poste — Régions — Moscou et Saint-Pétersbourg
…
Total — ~1,1–2,3 M₽ — ~2–4,4 M₽

…

La réserve pour les premiers mois est un poste obligatoire. En général, un café atteint une fréquentation normale au bout de 2 à 4 mois, et ce sont surtout ceux qui n'ont plus d'argent à ce moment-là qui ferment.

Combien de tasses faut-il vendre (estimation pour Moscou)

— Ticket moyen : environ 300 ₽. Le coût de revient d'une tasse, frais de paiement par carte compris, avoisine 30 % : il reste donc environ 200 ₽ par tasse.
…
— Seuil de rentabilité : environ 60 tasses par jour. Un bon emplacement en vend 150 à 250 par jour, un mauvais 30 à 40, et le café travaille alors à perte.

…

Le principal risque

Un mauvais emplacement. Le signe qu'il faut arrêter : au bout de 3 mois, vous vendez moins de 40 tasses par jour et le chiffre d'affaires ne progresse pas. Ensuite, vous ne ferez que brûler votre réserve.

À faire aujourd'hui : choisissez deux emplacements près de votre station et, demain matin, comptez le flux de passants devant chacun.

Dans quelle ville et près de quelle station voulez-vous ouvrir, et combien comptez-vous investir ? Avec ces informations, je chiffrerai le budget plus précisément.`,
  },
  can: [
    "Teste l'idée avant tout investissement : comment vérifier la demande à moindre coût et quelle version minimale suffit pour une première vente.",
    "Aide à choisir le statut et le régime fiscal adaptés à votre modèle : statut d'indépendant, entreprise individuelle ou SARL ; régimes simplifiés russes (USN, AUSN) ou régime de la patente.",
    "Calcule sur vos chiffres le seuil de rentabilité, l'économie unitaire et la marge de sécurité : combien de mois votre argent tiendra.",
    "Établit un plan jusqu'aux premières rentrées d'argent : trois à cinq étapes avec délais et coûts, le principal risque et le signe qu'il est temps d'arrêter.",
    "Travaille sur le prix, les premiers clients, la première embauche, et sur ce qui est déjà lancé mais patine.",
    "Vérifie en ligne les taux en vigueur, les plafonds des régimes et les exigences des plateformes et des banques.",
  ],
  cannot: [
    "Ne promet pas de revenus et ne présente pas un délai de retour sur investissement comme un fait : chaque chiffre est une estimation, avec ses hypothèses énoncées.",
    "Ne cherche ni à vous convaincre ni à vous dissuader. Si, d'après vos chiffres, le projet ne tient pas, Andreï vous le dit tout de suite.",
    "Ne conseille ni montages d'évasion fiscale ni découpage artificiel de l'activité.",
    "Ne remplace ni le comptable ni le juriste : il vous dit ce dont vous aurez besoin ; pour calculer l'impôt, voyez Anna, la comptable, et pour rédiger un contrat, Alexeï, le juriste.",
  ],
  faq: [
    {
      q: "Pour quel pays Andreï donne-t-il ses conseils ?",
      a: "Par défaut, pour la Russie : statut russe de travailleur indépendant, régime AUSN, marketplaces, encaissement par carte. Si vous vous lancez dans un autre pays, indiquez-le : la demande et le seuil de rentabilité se calculent de la même façon, mais vérifiez le statut juridique et les impôts auprès d'un spécialiste local.",
    },
    {
      q: "Puis-je envoyer un business plan ou les conditions d'une plateforme ?",
      a: "Oui, un PDF ou un document. Andreï analyse les business plans, les propositions commerciales et les conditions des marketplaces ; le fichier est lu en entier.",
    },
    {
      q: "Combien ça coûte ?",
      a: "25 000 jetons offerts à l'inscription, aucune carte bancaire demandée. Ensuite, des packs de jetons sans abonnement ; les jetons n'expirent pas.",
    },
    {
      q: "En quoi est-ce différent d'un chatbot classique ?",
      a: "Les assistants Linkeon partagent un même profil : ce que vous dites à l'un, tous le savent. Une fois qu'Andreï vous aura aidé à choisir votre régime, vous n'aurez pas à réexpliquer votre activité à Anna, la comptable.",
    },
  ],
};

export default andrey;
