import type { AssistantPageText } from '../../types';

/**
 * Лиана — нумерология. Перевод pages/ru/liana.ts.
 *
 * Пример — docs/assistant-pages/examples/liana.md: снята разметка (заголовки,
 * жирный, таблица квадрата Пифагора), маркеры списков «-» стали «—»; знаки
 * ➕/➖ у строк «Сила / уязвимость» — её собственные, оставлены как пришли.
 */
const liana: AssistantPageText = {
  title: "Numerology reading by date of birth online — Liana | Linkeon",
  description:
    "Liana is an online numerologist. She reads your birth date through eight schools — Xiucai, Pythagorean, BaZi and others: themes, strengths, activation years and the next cycle.",
  h1: "Numerology reading by date of birth: Liana, online numerologist",
  lead: "Give a name, date, time and city of birth — yours or a loved one's. Liana will work out the numbers and tell you what they mean in eight schools of numerology, two schools at a time.",
  card: "A birth-date reading through eight schools of numerology — Xiucai, Pythagorean, BaZi and others: strengths, activation years, cycles.",
  cta: "Talk to Liana",
  situations: [
    "You want to know what the numbers of your own date of birth say, not a generic description from the internet.",
    "You've heard of Xiucai or the Pythagorean square and want your own date read.",
    "You're curious how different schools of numerology read the same date.",
    "You feel that one stage of your life has ended and want to see which cycle is beginning.",
    "You'd like a reading of your child's or your partner's date of birth.",
  ],
  example: {
    question: "Do a numerology reading: Anna, 14/03/1990, 07:30, Kazan.",
    answer: `Subject: Anna, born 14/03/1990, 07:30, Kazan.

1. Xiucai

Codes: consciousness number 5 (day 14 → 1+4), mission number 9 (1+4+0+3+1+9+9+0 = 27 → 9).

Main themes and purpose
— 5 — freedom, movement, communication, quick adaptation, interest in many things at once.
— 9 — a mission of service, mentoring, humanitarian and “big” themes. Experience gathers into wisdom and is passed on to others.
— The 5→9 link: through varied experience, change and contacts, Anna comes to the role of a guide or teacher.

Strength / vulnerability
➕ Charisma, ease with people, a flexible mind, a knack for selling ideas and inspiring others.
➖ Scattered energy, impatience, boredom with routine, impulsive decisions. With 9, there's also a tendency to take on other people's burdens and to “rescue” them.

Activation years
— Career, new starts: 2018, 2027.
— Love, family: 2023, 2032.
— Money: 2025, 2034.
— Transformation, taking stock: 2017, 2026.

Completions: 2026 closes the 9-year cycle that began in 2018.

2. Classical (Pythagorean)

Life path number: 27 → 9. Birthday number: 14 → 5.
…

Life path pinnacles (peaks)
— Until 2017 — 8: establishing herself through material goals and status.
— 2017–2026 — 6: family, responsibility, care, relationships.
— 2026–2035 — 5: freedom, change, new areas, mobility.
— From 2035 — 4: structure, stability, foundations.

…

Shall I continue with 3–4 (Vedic and Kabbalistic)?`,
  },
  can: [
    "Reads a date through eight schools: Xiucai, Pythagorean, Vedic, Kabbalistic, Tarot arcanology, BaZi, astro-numerology and “Finance and Self-Realisation”.",
    "In each school, names the main themes and purpose, strengths and vulnerabilities, activation years in love, career and money, and the completion of cycles.",
    "Gives the reading in parts, two schools at a time, and asks whether to continue.",
    "At the end, brings everything into a short summary: who the person is according to their code and what cycle lies ahead of them over the next two years.",
    "Reads the date of whoever you're asking about — yours, your child's, your partner's — and doesn't mix it up with others.",
  ],
  cannot: [
    "Doesn't give advice or decide for you. Liana tells you what the numbers mean; what to do about it is up to you.",
    "Isn't a prediction of your fate: activation years are a numerological interpretation, not a promise that something will happen.",
    "Doesn't replace a doctor, a lawyer or a financial adviser. If a reading touches on health or money, it's numerology, not a diagnosis or financial advice.",
  ],
  faq: [
    {
      q: "What do I need for a reading?",
      a: "A name, date, time and city of birth — as in the example above. Liana repeats these details at the start of every answer so it's clear whose reading it is.",
    },
    {
      q: "How do the schools differ?",
      a: "Each calculates in its own way. Xiucai works with the consciousness number and the mission number, the Pythagorean school with the Pythagorean square and the life path number, the Kabbalistic school with the vibrations of the name, and BaZi with your personal element and the influence of the year.",
    },
    {
      q: "What are activation years?",
      a: "Years in which, according to the calculation, one of the themes comes into play: love, career, money or change. For Anna in the example, career and new starts fall in 2018 and 2027.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from an online calculator?",
      a: "A calculator gives you numbers and generic descriptions. Liana reads your date through eight schools and pulls everything together into one summary at the end. And Linkeon assistants share one profile: tell one, and they all know.",
    },
  ],
};

export default liana;
