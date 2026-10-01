import type { AssistantPageText } from '../../types';

/**
 * Андрей — запуск бизнеса. Перевод pages/ru/andrey.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/andrey.md.
 */
const andrey: AssistantPageText = {
  title: "How to start a business: startup advice — Andrey | Linkeon",
  description:
    "Andrey helps you start a business: test demand before you invest, choose a legal form and tax regime, work out your break-even point and plan your way to first revenue.",
  h1: "How to start a business: Andrey takes you from idea to first revenue",
  lead: "You have an idea and some savings, and you're afraid of investing them in the wrong thing. Andrey will first ask about your budget and timeline, then show you what you can test within a week for very little money.",
  card: "Starting a business: testing demand before you invest, sole trader or self-employed, first clients, break-even, a plan to first revenue.",
  cta: "Talk to Andrey",
  situations: [
    "You want to leave your job for a business of your own and don't know how many months your savings will last.",
    "You have a product idea but haven't yet had a single conversation with a potential customer.",
    "You're choosing between self-employment, a sole trader business and a limited company, and everyone you ask says something different.",
    "Your first clients came through people you know, and you're not sure where to find the next ones or how much to charge them.",
    "You launched six months ago, the orders are coming in, but you still haven't turned a profit.",
  ],
  example: {
    question:
      "I want to open a takeaway coffee shop by a metro station. Where do I start, and how much money do I need up front?",
    answer: `A takeaway coffee shop by the metro: where to start and how much money you need

Start with the location, not the coffee machine. For a takeaway coffee shop, revenue depends almost entirely on the spot. Until you've counted the people at a specific metro exit, any budget is guesswork.

How much money you need to start

This is a rough estimate based on common practice. The exact figures depend on the city and the size of the premises.

Item — Other regions — Moscow and St Petersburg
…
Total — ~₽1.1–2.3 million — ~₽2–4.4 million

…

A reserve for the first few months is a must-have line in the budget. A coffee shop usually reaches a normal flow of customers in 2–4 months, and the ones that close are most often those that have run out of money by then.

How many cups you need to sell (rough estimate for Moscow)

— The average spend is about ₽300. The cost of a cup, including card processing fees, is about 30%, so each cup leaves you roughly ₽200.
…
— Break-even is about 60 cups a day. A good spot sells 150–250 cups a day, a weak one 30–40, and then the coffee shop runs at a loss.

…

The main risk

A weak location. The sign it's time to stop: after 3 months you're selling fewer than 40 cups a day and revenue isn't growing. From there, you'll only be burning through your reserve.

What to do today: pick two spots near your metro station and tomorrow morning count the foot traffic at each.

Which city and which station are you thinking of opening near, and how much are you ready to invest? With that, I'll work out a more precise budget.`,
  },
  can: [
    "Tests the idea before you invest: how to confirm demand cheaply and what minimal version you need for a first sale.",
    "Helps you choose a legal form and a tax regime for your model: self-employed, sole trader or limited company; the simplified regimes (USN, AUSN) or the patent regime.",
    "Works out your break-even point, unit economics and safety margin from your figures — how many months your money will last.",
    "Gives you a plan to your first revenue: three to five steps with timings and costs, the main risk and the sign that it's time to stop.",
    "Works through pricing, first clients, first hires, and a business that's already running but stalling.",
    "Looks up current rates, regime thresholds and marketplace and bank requirements online.",
  ],
  cannot: [
    "Doesn't promise income or present a payback period as fact: every figure is an estimate with its assumptions spelled out.",
    "Doesn't talk you into it or out of it. If the idea doesn't add up on your figures, Andrey will say so straight away.",
    "Doesn't recommend tax evasion schemes or splitting a business up to stay under tax thresholds.",
    "Doesn't stand in for an accountant or a lawyer: he'll tell you what you'll need; for working out tax, go to Anna, the accountant, and for drafting a contract, to Alexey, the lawyer.",
  ],
  faq: [
    {
      q: "Which country is Andrey's advice for?",
      a: "By default, for Russia: self-employed status, the AUSN regime, selling on marketplaces, card payment processing. If you're launching in another country, name it: demand and break-even are worked out the same way, but check the business structure and taxes with a local specialist.",
    },
    {
      q: "Can I send a business plan or a marketplace's terms?",
      a: "Yes, as a PDF or a document. Andrey goes through business plans, sales proposals and marketplace terms, and the file is read in full.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. Once Andrey has helped you choose a tax regime, you won't have to explain to Anna, the accountant, what you do all over again.",
    },
  ],
};

export default andrey;
