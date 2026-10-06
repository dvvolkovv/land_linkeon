import type { AssistantPageText } from '../../types';

/**
 * Кира — дизайн. Перевод pages/ru/kira.ts. Картинки делает сама, но только
 * растровые (PNG и JPEG): векторных файлов у неё не бывает. Вектор на этой
 * странице не обещать.
 *
 * Пример — разговор с прода 01.10.2026 (docs/assistant-pages/examples/kira.md),
 * картинка — копия в public/examples/. На логотипе название по-русски, поэтому
 * в переводе оно транслитерацией с переводом в скобках: “Tyoply Khleb”
 * (“Warm Bread”). src картинки — тот же, что в русском тексте; alt переведён.
 */
const kira: AssistantPageText = {
  title: "AI logo and brand identity designer — Kira | Linkeon",
  description:
    "Kira is an AI designer. She creates logos and brand identities, business cards, banners and presentations, and edits existing images. Files are PNG and JPEG, no vector.",
  h1: "Kira — AI designer: logos, brand identity and layouts",
  lead: "You open in a week, and there's still no sign, menu or flyers. Kira will ask where they'll be displayed and who will see them, then show you a mock-up rather than describe it in words.",
  card: "Logos, brand identity, business cards, banners, presentations. Makes mock-ups and edits existing images; files are PNG and JPEG.",
  cta: "Talk to Kira",
  situations: [
    "A friend drew your logo years ago, and on a dark background it almost disappears.",
    "The banner is nearly done, but you need to remove the colour block, swap the logo and move the heading to the left.",
    "You need ten post covers, and they all have to look like one series.",
    "You're giving a talk tomorrow, and the slides are pieced together from three different templates.",
    "You already have a shop sign, and the business cards, flyers and table sign need to be in the same style.",
    "A designer has sent you a mock-up, and something about it bothers you, but you can't say what.",
  ],
  example: {
    question:
      "Make a logo for the bakery “Tyoply Khleb” (“Warm Bread”). It'll go on the shop sign and on paper bags. The feel should be homely and warm, the colours warm browns and creams, and the symbol an ear of wheat. Show me one version as an image straight away — no need to ask me anything first.",
    answer: `Here's the first version of the logo:

The ear of wheat sits above the lettering. The typeface is soft, with serifs, and the colours are dark brown, caramel and cream. It's kept low on detail so the mark reads both from a distance on the sign and on a kraft paper bag.

What you need to know before printing:
— Format. I only make raster files (PNG or JPEG); I can't produce a vector file. Sign makers usually ask for vector artwork, so the logo will have to be redrawn from this mock-up. That's easiest to do once the version is approved.
— Bags. Kraft paper darkens colours, and cream is almost invisible on it. For the bags, it's better to make a one-colour version: a dark brown logo with no background.

As a next step, I can make that one-colour version on a transparent background, or a horizontal version for the sign with the ear of wheat to the left of the lettering. Which would be more useful?`,
    image: {
      src: '/examples/kira-logo.webp',
      alt: "Logo for the Tyoply Khleb (“Warm Bread”) bakery: an ear of wheat above the name in Cyrillic lettering, brown and caramel on a cream background",
      width: 640,
      height: 640,
    },
  },
  can: [
    "Creates a logo from scratch or refines yours, with versions for different backgrounds and sizes.",
    "Puts together a brand identity — palette, font pairings, logo rules — and keeps it consistent across a whole series of materials.",
    "Designs business cards, flyers, booklets, signs, plaques and certificates, banners and covers sized for each platform, and presentations in a consistent style.",
    "Edits an existing image instead of redrawing it: “move it to the left”, “remove the colour block”, “swap the logo” — all the edits in one go, and everything else stays as it was.",
    "Reviews someone else's design: what isn't working, why, and what to fix first.",
  ],
  cannot: [
    "Doesn't do vector: no SVG, AI, EPS or CDR files, only PNG and JPEG, including with a transparent background. Kira will tell you this upfront.",
    "Doesn't promise print-ready files: colour proofs, CMYK and bleed are checked by the print shop. Kira will tell you what to ask them.",
    "Doesn't copy other people's logos or use photos and fonts without the rights to them. If a licence is unclear, she'll say so.",
    "Doesn't write the sales copy for a layout: it's better to get the wording from Ekaterina, the copywriter.",
  ],
  faq: [
    {
      q: "We already have brand guidelines. Will Kira stick to them?",
      a: "Yes. Send the guidelines as a file or give a link to your website — Kira will take the colours, fonts and logo from there. If your colour is purple, it stays exactly that purple, not “nearly the same”.",
    },
    {
      q: "What do I need for printing?",
      a: "Tell her where and at what size the layout will be printed. Kira will set the dimensions in millimetres, upscale the image if needed and tell you what to check: legibility at actual size, contrast, margins.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Ekaterina already knows what your business does and who your clients are, you won't have to explain it all over again to Kira.",
    },
  ],
};

export default kira;
