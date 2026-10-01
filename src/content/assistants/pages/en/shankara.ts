import type { AssistantPageText } from '../../types';

/**
 * Шанкара — ведическая астрология (Джйотиш), сидерический зодиак, аянамса Лахири.
 * Перевод pages/ru/shankara.ts.
 * Не «натальная карта» в западном смысле: на странице — «карта рождения»
 * (по-английски — birth chart).
 *
 * Пример — docs/assistant-pages/examples/shankara.md, сокращён. Расчёт в нём
 * сверен 01.10.2026 независимо (astronomy-engine + аянамса Лахири): лагна —
 * Овен 23,7°, Бхарани; Луна — Весы 0,3°, Читра; Марс — Козерог, 10-й дом;
 * маха-даша Юпитера — 2011,5–2027,5, антар-даша Раху — до середины 2027-го.
 */
const shankara: AssistantPageText = {
  title: "Vedic astrology (Jyotish) birth chart online — Shankara | Linkeon",
  description:
    "Shankara is a Vedic astrologer. He calculates your birth chart in the sidereal zodiac and explains your lagna, nakshatras and dashas: what period you're in and what it means.",
  h1: "Vedic astrology (Jyotish): Shankara reads your birth chart",
  lead: "Give your date, time and city of birth — Shankara will calculate your chart the way it's done in Jyotish and explain what period you're in now and what follows from it.",
  card: "A Jyotish birth chart: lagna, the Moon and nakshatras, your current dasha, transits and one next step.",
  cta: "Talk to Shankara",
  situations: [
    "In Western astrology you're a Pisces, but Vedic astrology makes you an Aquarius, and you want to know why.",
    "You want to know which mahadasha you're in now and when it will change.",
    "You're thinking about changing jobs or starting your own business and want to look at it through your chart.",
    "You only know your time of birth roughly, and you're not sure what that affects.",
  ],
  example: {
    question:
      "I was born on 14 March 1990 at 07:30 in Kazan. What does my birth chart show?",
    answer: `Peace to you. I am Shankara. I have calculated your chart in the sidereal zodiac (Lahiri ayanamsa). Birth data: 14/03/1990, 07:30, Kazan, UTC+3.

The key points of your chart

1. Lagna (ascendant) — Aries, 23°, Bharani nakshatra.
You are a person of action: direct, bold, the one who starts things. …

2. The strongest feature of the chart is exalted Mars in the 10th house (Capricorn).
Mars rules your Lagna and stands in its best sign in the house of career. This is Ruchaka yoga, one of the five “great person” yogas. It gives a strong will, a gift for organising and the ability to build a business of your own. …

…

The current period

— Jupiter mahadasha (2011–2027), with the Rahu antardasha running now, until about July 2027. This is a time of ambition, unexpected turns and the urge to change course sharply. …
— From mid-2027, a 19-year Saturn mahadasha begins. …

…

Next step

Use the period until summer 2027 to prepare a new direction: get some training, test the idea, gather your first clients. Save the launch itself for 2027. An upaya (supportive practice) for Mars: on Tuesdays, physical effort — sport or working with your hands — and the mantra “Om Angarakaya Namaha” 108 times.

The chart shows tendencies, and the decisions remain yours.

Which area matters most to you right now: career and your own business, relationships or something else?`,
  },
  can: [
    "Calculates the chart in the sidereal zodiac with the Lahiri ayanamsa, as is standard in Jyotish.",
    "Explains the lagna, the Moon and its nakshatra, the Sun and the planets in key houses — and what this means for your work and relationships.",
    "Names your current mahadasha and antardasha and the strong transits of Saturn, Jupiter, Rahu and Ketu over the next 6–18 months.",
    "Suggests one next step: a window for an important decision, or an upaya — a supportive practice such as a mantra.",
    "Reads the chart of whoever you're asking about — yours, your child's, your partner's — and doesn't mix them up.",
  ],
  cannot: [
    "Doesn't predict death, serious illness or disasters: he talks about tendencies and cycles.",
    "Isn't a prediction of your fate: the chart is a map of the terrain, not a verdict, and the decisions remain yours.",
    "Doesn't replace a doctor, a lawyer or a financial adviser: on health and money, this is astrology, not a diagnosis or financial advice.",
    "Doesn't guess your time of birth: without it, he'll build a Moon chart (Chandra lagna) and warn you that the ascendant and houses are only approximate.",
  ],
  faq: [
    {
      q: "How is Vedic astrology different from Western astrology?",
      a: "Western astrology counts the signs from the spring equinox (the tropical zodiac); Jyotish counts them by the stars (the sidereal zodiac), with the Lahiri correction. The difference is currently about 24°, so your sign often shifts back by one: a Western Pisces quite often turns out to be an Aquarius in Jyotish.",
    },
    {
      q: "What do I need for a reading?",
      a: "Your date, time and city of birth: the lagna and the houses depend on the time. If something's missing, Shankara will work with what there is and ask one question to fill in the rest.",
    },
    {
      q: "What are nakshatras and mahadashas?",
      a: "Nakshatras are the 27 lunar sectors of the zodiac. Mahadashas are the major periods of life “ruled” by the planets: in the Vimshottari system, each lasts from 6 to 20 years.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a calculator or a regular chatbot?",
      a: "A calculator gives generic descriptions, while Shankara reads your own chart and your current period. And Linkeon assistants share one profile: tell one, and they all know.",
    },
  ],
};

export default shankara;
