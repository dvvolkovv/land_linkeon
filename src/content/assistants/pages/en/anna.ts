import type { AssistantPageText } from '../../types';

/**
 * Анна — бухгалтер. Перевод pages/ru/anna.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/anna.md.
 */
const anna: AssistantPageText = {
  title: "AI accountant online for small business tax — Anna | Linkeon",
  description:
    "Anna is an AI accountant. She works out tax and contributions for sole traders and companies and explains Russian tax regimes, VAT and when to pay. 25,000 tokens when you sign up.",
  h1: "Anna — AI accountant online: small business tax in plain language",
  lead: "A letter from the tax office arrives on Friday evening, and your accountant won't reply until Monday. Anna will explain in plain language what they want from you, how much to pay and by what date.",
  card: "Russian small business tax and contributions: the simplified and patent regimes, self-employment, VAT. Uses your figures, no jargon.",
  cta: "Talk to Anna",
  situations: [
    "You're a sole trader on USN (Russia's simplified tax regime) and aren't sure how far your contributions can reduce your tax.",
    "You're registering for the first time and choosing between self-employed status, a sole trader business on USN and the patent regime.",
    "The tax office has sent a request for explanations about your tax return, and you don't know how to respond.",
    "You're hiring your first employee and want to understand what income tax and contributions you'll pay for them.",
    "Your income is growing, and you don't know at what point you'll have to start paying VAT.",
  ],
  example: {
    question:
      "I'm a sole trader on USN “income”, and this year I'll make about 3 million roubles. What taxes and contributions do I pay, and when?",
    answer: `With no employees and an income of ₽3 million for 2026, it works out like this.

What to pay

Fixed contributions “for yourself” — ₽57,390 — by 28 December 2026
1% of income above 300,000 — (3,000,000 − 300,000) × 1% = ₽27,000 — by 1 July 2027
USN 6% — ₽180,000 before deducting contributions — advance payments and the balance on the schedule below

You can reduce the tax by all of your contributions, up to 100%. Sole traders without employees are allowed to do this.
Tax: 180,000 − 57,390 − 27,000 = ₽95,610.
Together with contributions, the total burden is ≈ ₽180,000, or about 6% of income.

Schedule
— USN advance payments are due by 28 April, 28 July and 28 October. …
— The advance payment notice is filed by the 25th of the same month. File the next one by 26 October 2026 (the 25th falls on a Sunday) and pay the nine-month advance by 28 October 2026.
— The tax for the year is due by 28 April 2027, the return by 25 April 2027. …

Important
— You don't pay VAT. In 2026, sole traders on USN are exempt from VAT on income up to ₽20 million. In 2027 the threshold will be ₽15 million, and in 2028, ₽10 million.
…

If you like, I can work out the exact advance payments quarter by quarter. To do that, send me your income for each quarter.`,
  },
  can: [
    "Calculates tax and contributions from your figures: USN “income” and “income minus expenses”, the patent regime, self-employment, the general regime (OSNO).",
    "Explains VAT, corporate profit tax, personal income tax and social insurance contributions — including for employees.",
    "Helps with bookkeeping and paperwork: journal entries, the balance sheet, reporting under Russian Accounting Standards (RAS), source documents, cash-handling rules.",
    "Advises on how to respond to the tax office and the social funds, and helps with payroll and HR paperwork at a basic level.",
    "Looks for legal ways to pay less and warns you if a rule has changed recently.",
    "If a question could go either way, first checks your tax regime and business structure.",
  ],
  cannot: [
    "Doesn't file reports or keep the books for you. Anna is a consultant, not an auditor: her answers are for information only.",
    "Doesn't suggest schemes that break tax law.",
    "Doesn't replace an accountant or a lawyer in a complicated situation. If you can't do without one, Anna will say so plainly.",
  ],
  faq: [
    {
      q: "Which country's laws does Anna work with?",
      a: "By default, Russia's: Russian tax law and Russian Accounting Standards (RAS). If your business is in another country, name it, and Anna will take it into account.",
    },
    {
      q: "Can I send a bank statement or a tax return as a file?",
      a: "Yes, as a PDF, a spreadsheet or a document. The file is read in full, and Anna will work from your figures.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Anna already knows what you do and what your turnover is, you won't have to explain it all over again to Vitaly, the CFO.",
    },
    {
      q: "Who will see my figures?",
      a: "We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default anna;
