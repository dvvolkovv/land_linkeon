import type { AssistantPageText } from '../../types';

/** Дмитрий — технический директор. Перевод pages/ru/dmitry.ts. */
const dmitry: AssistantPageText = {
  title: "CTO as a service: fractional CTO online — Dmitry | Linkeon",
  description:
    "Dmitry is an AI assistant acting as your outsourced CTO. He checks a contractor's estimate and tells you whether to hire developers or use an off-the-shelf service.",
  h1: "Dmitry — outsourced CTO for non-technical business owners",
  lead: "You need something built, and you have no idea what it should cost. Dmitry will offer two or three options, from cheap to thorough, and tell you what going cheap will cost you.",
  card: "Architecture, timelines and estimates, contractors, first developers. Explains in terms of decisions and their consequences, not jargon.",
  cta: "Talk to Dmitry",
  situations: [
    "A contractor quotes three months and a seven-figure sum, and you can't tell how much of it is justified.",
    "You need to hire your first developer and don't know how to assess them in an interview.",
    "The website went down on a Friday evening, and it turned out nobody had been making backups.",
    "A contractor has stopped replying, and they still have the code and the server access.",
    "The developers say “it all needs rewriting”, and you don't know whether to believe them.",
  ],
  example: {
    question:
      "I want an app for clients to book appointments at my salon. Should I hire developers or use a ready-made service?",
    answer: `Go with a ready-made service. Commissioning custom development for a single salon isn't worth it: you'll pay hundreds of times more and get a worse product than the ones already on the market.

Options

DIKIDI
Time to launch — 1 day
Cost — There's a free plan; paid plans start at a few hundred roubles a month
Trade-off — Little analytics and automation. …

YCLIENTS (the standard for the beauty industry in Russia)
Time to launch — 2–5 days
Cost — Around ₽1,500–5,000 a month for 1–3 staff
Trade-off — You pay every month. There are lots of settings, so expect to spend the first week figuring them out

A custom-built app
Time to launch — 4–8 months
Cost — ₽1.5–4 million for development + ₽50,000–150,000 a month for support
Trade-off — Money, time and dependence on the contractor. …

Service prices are approximate, and plans change. Check them on the websites before you choose.

…

The main risk
Your whole client database will be stored with the service. Check straight away that you can export it to Excel: if you can, you're not tied to the service forever. Export it once a month — that's your backup.

What to do this week: sign up for DIKIDI and for a YCLIENTS trial, and set up your services and staff in both. Send the booking link to 5–10 regular clients and see where they find it easier to book. After a week, keep the service you liked.

How many staff do you have? That decides which plan to choose.`,
  },
  can: [
    "Goes through specifications and contractors' proposals: what in the estimate is justified and what isn't.",
    "Compares the options — an off-the-shelf service, no-code, custom development — on timing, ballpark cost and risks. If an off-the-shelf service will do, he'll say so, even if you asked how to build it.",
    "Helps you build a team: who to hire first, in-house or outsourced, how to assess a developer when you're not a programmer yourself.",
    "Helps with contractors: the specification, signing off the work, rights to the code and access credentials, the technical part of the contract.",
    "Deals with tech debt, reliability and security: what to fix now and what can wait, what to do when everything's down, how to store personal data and who to give access to.",
  ],
  cannot: [
    "Doesn't pass off a time estimate as a promise: every estimate is a range with assumptions, and Dmitry will name what could break it.",
    "Doesn't replace a security audit or guarantee that you're protected. He'll tell you where the risks are and how to reduce them cheaply.",
    "Doesn't run the project for you: you set the developers' tasks and you sign off the work.",
    "Doesn't stand in for a lawyer or a finance specialist: the legal wording of a contract is for Alexey, payback is for Vitaly.",
  ],
  faq: [
    {
      q: "Do I need to understand the technical side?",
      a: "No. Dmitry talks in terms of decisions and their consequences, and when a technical term can't be avoided, he explains it in brackets.",
    },
    {
      q: "Can I send a specification or a contractor's estimate?",
      a: "Yes, as a PDF or a document. The file is read in full. Dmitry will tell you what in the estimate is justified, what's missing and what the contract should cover on the technical side.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Andrey already knows what your business does, you won't have to explain it all over again to Dmitry.",
    },
  ],
};

export default dmitry;
