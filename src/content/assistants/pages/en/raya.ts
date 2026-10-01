import type { AssistantPageText } from '../../types';

/** Райя — дизайн человека. Перевод pages/ru/raya.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const raya: AssistantPageText = {
  title: "Human Design chart reading: your bodygraph online — Raya | Linkeon",
  description:
    "Raya calculates your Human Design chart from your date, time and place of birth using the Swiss Ephemeris and explains what your type, strategy, authority and profile mean.",
  h1: "Human Design: Raya calculates and reads your bodygraph",
  lead: "You'll need your date, exact time and city of birth. Raya will calculate your chart using the Swiss Ephemeris and explain what your type, strategy and authority mean in practice.",
  card: "Calculates your bodygraph from your date, time and place of birth and explains your type, strategy and authority.",
  cta: "Talk to Raya",
  situations: [
    "You've heard about Human Design and want to find out your type and strategy.",
    "You've already generated your chart with a free calculator, but you don't understand what the centres and channels mean.",
    "Decisions don't come easily, and you want to understand your authority — what to rely on when you choose.",
    "You only know your time of birth approximately and want to understand what that affects.",
    "You'd like a reading of your child's or your partner's chart.",
  ],
  example: {
    question:
      "Calculate my Human Design: 14 March 1990, 07:30, Kazan. What are my type and strategy?",
    answer: `I calculated it using the Swiss Ephemeris. I converted the time to UTC like this: in March 1990, Kazan was on Moscow winter time, UTC+3, so 07:30 local time = 04:30 UTC.

Your chart

Type — Manifestor
Strategy — To inform the people your decision will affect before you act
Authority — Emotional (Solar Plexus)
Profile — 1/3: Investigator / Martyr

…

What this means in practice
— Informing doesn't mean asking permission. It's a short “I'm going to do X”. It removes the resistance from the people around you that Manifestors often run into.
— Emotional authority: don't make decisions at the peak of an emotion, whether it's a high or a low. The right decision comes once the wave has settled. The “sleep on it” rule helps.
…

A 7-day experiment
Before every significant action, be it a work decision, a purchase or an important conversation, briefly tell the people it affects. But only once the emotion has settled, at least the next day. In the evening, note how much resistance and anger there was compared with usual.

If you've already looked at your chart on jovianarchive.com or mybodygraph.com, tell me what you got there, and I'll check it against mine.`,
  },
  can: [
    "Calculates the chart with the Swiss Ephemeris rather than by eye: converts your time of birth to UTC, allowing for the time zone and daylight saving time of those years.",
    "Explains your type, strategy, authority, profile and definition: which centres are open, what the key channels give you, where your incarnation cross leads.",
    "Suggests one seven-day experiment based on your strategy and authority.",
    "If you send a chart from jovianarchive.com or mybodygraph.com, she'll check it against her own calculation and tell you plainly if the results differ.",
    "Reads the chart of whoever you're asking about — yours, your child's, your partner's — and doesn't mix it up with others.",
  ],
  cannot: [
    "Doesn't predict fate or events: here, Human Design is a tool for self-discovery, not a forecast.",
    "Doesn't give medical or financial recommendations and doesn't replace a doctor, a lawyer or a financial adviser.",
    "Doesn't guess your time of birth: if you don't have it, she'll tell you an accurate calculation isn't possible.",
  ],
  faq: [
    {
      q: "What do I need for the calculation?",
      a: "Your date, exact time and city of birth. A shift of even 15–30 minutes can change the profile, and sometimes the type and authority.",
    },
    {
      q: "Is this astrology?",
      a: "No, although the calculation is also based on the positions of the planets. Here they're only a coordinate system; the interpretation goes through the 64 gates, 9 centres and 36 channels. Raya works in the classical school of Ra Uru Hu.",
    },
    {
      q: "How is this different from a calculator or a regular chatbot?",
      a: "A calculator draws the chart and gives generic descriptions. Raya reads your own chart and suggests an experiment based on your strategy. And Linkeon assistants share one profile: tell one, and they all know.",
    },
    {
      q: "What if I'm sceptical about Human Design?",
      a: "Raya won't try to change your mind. She'll suggest a seven-day experiment: test the strategy in your own experience and decide for yourself.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
  ],
};

export default raya;
