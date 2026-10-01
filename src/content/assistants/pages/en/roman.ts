import type { AssistantPageText } from '../../types';

/**
 * Роман — личный ассистент. Перевод pages/ru/roman.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/roman.md.
 */
const roman: AssistantPageText = {
  title: "Personal AI assistant online for any task — Roman | Linkeon",
  description:
    "Roman is a personal AI assistant. An email, a sales proposal, a plan or a question spanning law, tax and marketing — he works it out himself. 25,000 tokens when you sign up.",
  h1: "Roman — personal AI assistant for any task",
  lead: "A proposal due on Friday, an email you've been putting off for three days, a question you don't know who to take to. Tell Roman in your own words — he'll answer it himself, and where it takes a lawyer, an accountant or a marketer, he'll draw on what they know.",
  card: "Takes on any task. He'll handle a question about a contract, tax or advertising himself, drawing on the right specialist's knowledge.",
  cta: "Talk to Roman",
  situations: [
    "A client still hasn't paid an invoice after two months, and you need an email — polite, but the kind that gets you paid.",
    "You're launching a new service and the questions come all at once: what contract to use with clients, what tax applies, where to find your first customers.",
    "A five-minute question — about a tax deduction, returning a purchase or a clause in a contract — and no idea who to take it to.",
    "You need a presentation for a meeting or an image for a post, and you want a finished file, not just advice.",
    "Your week is scheduled down to the minute, and you want to organise your tasks so the important things don't get lost in the small stuff.",
  ],
  example: {
    question:
      "I need to put together a proposal for a new client — a yoga studio — by Friday. Where do I start?",
    answer: `Friday is tomorrow, so let's start with what matters most.

Today, 30–40 minutes: gather the basics
1. What kind of studio it is: size, number of rooms and instructors, who the clients are, online or in person.
2. What's hurting them: too few new clients, people not renewing memberships, chaotic bookings, weak social media.
…

Proposal structure (5–7 pages, no more)
1. The client's goal in their own words: “You want…”
…
5. Price. Better to offer 2–3 packages: basic, standard and advanced. That way the client chooses between options instead of deciding “yes or no”.
…

For a yoga studio
— Keep the tone calm and warm, with no hard sell.
…
— Show that you understand their business: memberships, client retention, seasonality (a dip in summer, growth in September and January).

To make the Friday deadline: today, gather the basics and write a draft; tomorrow morning, proofread it and send it.

So you don't lose track of the deadline, I've set up a task card, “Send the proposal to the yoga studio”, for tomorrow at 12:00. … If another time suits you better, just say.

What I can do next: tell me what you're selling the studio (marketing, a website, equipment, bookkeeping or something else) and what you already know about the client. I'll put together the finished text of the proposal and, if you like, lay it out as a document or a presentation.`,
  },
  can: [
    "Takes on any task: an email, a sales proposal, a plan, a piece of writing, an idea. Gives a concrete, practical answer: what to do and where to start.",
    "Draws on the knowledge of Linkeon's specialists: law, tax, marketing, copywriting, business strategy, careers, coaching.",
    "Brings a task that spans several fields together into one answer — for example, the contract, the tax and the advertising for a new service.",
    "Delivers the result as a file, makes images from a description and searches the web when the task calls for it.",
  ],
  cannot: [
    "Doesn't replace a lawyer, an accountant or another specialist where their signature and professional responsibility are needed. Roman's answers are for information only; the decision is yours.",
    "Doesn't sign documents or pay on your behalf: you sign the contract and you send the money.",
  ],
  faq: [
    {
      q: "What kind of tasks can I bring to Roman?",
      a: "Any kind: from an email or a plan for the week to a question where a contract, tax and advertising are all mixed up together. If you don't know which assistant to go to, start with Roman.",
    },
    {
      q: "Does Roman know about law and tax?",
      a: "He answers questions like these himself, drawing on the right specialist's knowledge: a legal question the way the lawyer Alexey would, a financial one the way the accountant Anna would. If you'd like to talk to them directly, you won't have to repeat yourself: Linkeon assistants share one profile — tell one, and they all know.",
    },
    {
      q: "Can I send a file or dictate?",
      a: "Yes. Roman reads PDFs, spreadsheets and documents in full, and instead of typing, you can dictate.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "Who will see my chats?",
      a: "We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default roman;
