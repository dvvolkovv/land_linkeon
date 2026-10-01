import type { AssistantPageText } from '../../types';

/** Алексей — юрист. Перевод pages/ru/alexey.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const alexey: AssistantPageText = {
  title: "AI lawyer online and contract review — Alexey | Linkeon",
  description:
    "Alexey is an AI lawyer online. He reviews contracts and explains the law on leases, dismissals, divorce and inheritance — and what to do next. 25,000 tokens when you sign up.",
  h1: "Alexey — AI lawyer online: contract review and legal questions",
  lead: "It's late, you're signing a contract tomorrow, and there's no one to ask. Alexey will explain in plain language where the risks are and what the law says about them.",
  card: "Contracts, leases, employment, family, inheritance. Explains the law in plain language and tells you what to do, step by step.",
  cta: "Talk to Alexey",
  situations: [
    "A contractor has sent you a contract, and you can't tell what the penalty clause could cost you.",
    "You're being asked to leave “by mutual agreement”, and last month's salary still hasn't been paid.",
    "A shop won't refund you for an appliance that broke down after a week.",
    "You've inherited an estate that comes with debts, and you don't know whether to accept it or turn it down.",
    "A partner wants to leave your limited company and is demanding their share in cash.",
  ],
  example: {
    question:
      "My landlord wants to end the tenancy on my flat early and keep the deposit. What can I do?",
    answer: `Hello! I'm Alexey. In short: a landlord can't simply evict you before the term is up and keep the deposit. A lot depends on the wording of the agreement.

1. Can the landlord end the agreement early?

If you rent the flat as a private individual, this is a residential tenancy agreement (Articles 671–688 of the Russian Civil Code).

— Ending it unilaterally isn't allowed unless the agreement expressly permits it (Article 310 of the Civil Code).
…
— If there are no grounds, you're entitled to live in the flat until the end of the term.

2. The deposit (security payment)

The deposit is returned if you have no rent arrears and the flat isn't damaged (Article 381.1 of the Civil Code). … If it's the landlord who is ending the agreement, there are, as a rule, no grounds for keeping the deposit. …

3. What to do

1. Reread the agreement. Look for the term, a clause on early termination and the conditions for returning the deposit.
2. Don't sign anything or move out “amicably” until you've settled on the terms.
3. Communicate in writing, in a messaging app or by email. Keep the messages and your payment receipts.
…
5. Send a formal letter of claim by registered post with a list of enclosures. In it, demand the return of the deposit (and, if you wish, compensation for your moving costs) within a set time, say 10 days.
6. If there's no reply, take it to court. …

…

To give you a more precise answer, I have a few questions:
— What is the term of the agreement, and does it have a clause on early termination?
— How is the deposit set out in the agreement?
— What reason does the landlord give for ending it?
— Would you like a template for the letter of claim? I can draft one.`,
  },
  can: [
    "Reviews and drafts contracts: finds risky clauses and explains how to terminate one you've already signed.",
    "Helps in disputes with a shop or a service provider: what to demand and how to get compensation.",
    "Deals with housing questions: renting, buying or gifting a flat, disputes with a developer over an off-plan purchase, registering ownership.",
    "Answers questions on employment, family and inheritance: dismissal and unpaid wages, divorce and division of property, maintenance, inheriting debts.",
    "Helps business owners: setting up and closing a sole trader business or a limited company, articles of association, a member leaving a company, contracts with clients and suppliers.",
    "Cites specific articles of the Russian Civil, Labour and Family Codes and sets things out step by step: what to do, in what order, which documents you need.",
  ],
  cannot: [
    "Doesn't represent you in court or file documents for you. Alexey is a consultant: his answers are for information only.",
    "Doesn't replace a practising lawyer in a complex case, especially a criminal one. If you need a lawyer in person, Alexey will say so plainly.",
    "Doesn't advise on how to get around the law.",
  ],
  faq: [
    {
      q: "Which country's laws does Alexey work with?",
      a: "By default, Russian law: the Civil Code, the Labour Code, the Family Code and others. If your question concerns another country, name it, and Alexey will take it into account.",
    },
    {
      q: "Can I send the contract as a file?",
      a: "Yes, as a PDF or a document. The file is read in full, and Alexey will go through it clause by clause and show you where the risks are.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Anna, the accountant, already knows you're a sole trader, you won't have to explain it to Alexey all over again.",
    },
    {
      q: "Who will see my chats?",
      a: "We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default alexey;
