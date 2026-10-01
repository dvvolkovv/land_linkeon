import type { AssistantPageText } from '../../types';

/**
 * Виталий — финансовый директор. Перевод pages/ru/vitaly.ts.
 *
 * Пример разговора — docs/assistant-pages/examples/vitaly.md.
 */
const vitaly: AssistantPageText = {
  title: "AI CFO online: financial model and cash flow — Vitaly | Linkeon",
  description:
    "Vitaly is an AI CFO. He builds a financial model and a cash flow forecast, works out unit economics and break-even, and helps with your personal budget.",
  h1: "Vitaly — AI CFO online: financial models, cash flow, personal finance",
  lead: "Revenue is growing, but there's no money in the account; or you've been trying to build an emergency fund for three years and it still isn't there. Vitaly works through questions like these with your own figures and shows you two or three scenarios — each with its assumptions and main risk.",
  card: "Business and personal finance: cash flow, unit economics, financial models, tax regime, emergency fund and savings.",
  cta: "Talk to Vitaly",
  situations: [
    "A bank or an investor wants a financial model, and all you have is monthly revenue.",
    "Your turnover has grown and it's time to decide: stay on USN 6% (Russia's simplified tax), switch to the 15% option or set up a limited company.",
    "Advertising brings in customers, but you can't tell whether each one pays for itself.",
    "You don't know how to pay yourself: a salary, dividends, or leaving the money in the business.",
    "You have some spare cash and a credit card at 30%, and you don't know which comes first — paying it off or investing.",
  ],
  example: {
    question:
      "I run an online shop: revenue is growing, but there's never any money in the account. How do I work out where it's going?",
    answer: `Almost always, it's because profit and the money in your account are two different things. In a growing retail business, money most often goes into stock and into the gap between paying your supplier and getting paid by the customer. You can check this in an evening.

Step 1. A cash flow statement for 6–12 months

Export statements for all your accounts and assign each payment to a category. …

Step 2. Where money usually gets lost in an online shop

1. Stock. As you grow, you buy ahead for future sales, and profit turns into goods in the warehouse. …
2. The cash conversion cycle. It's calculated like this: days of inventory + days waiting for payout from the marketplace or card acquirer − days of credit from your supplier. For example, 60 + 14 − 0 = 74 days. Every rouble of revenue is frozen for 74 days, so the faster you grow, the more money you need.
…

Step 3. Three quick checks

— Your stock in money terms (at purchase price) now and a year ago. If it has grown by roughly the same amount as the “missing” money, there's your answer.
…

Send me your bank statement (Excel or PDF) and a stock report for the last six months. I'll assign the payments to categories, work out your cash conversion cycle and show you how much money is already frozen and how much will be frozen at your current growth rate. …`,
  },
  can: [
    "Builds a cash flow forecast, a budget and a financial model, and goes through your profit and loss statement.",
    "Works out unit economics, break-even and return on investment: what a customer costs you and what average order value puts you into profit.",
    "Compares tax regimes and business structures at your turnover, and helps you decide whether to pay yourself a salary or dividends.",
    "Covers personal finance: the family budget, an emergency fund covering 3–12 months, saving for a flat or for education, tax deductions.",
    "Runs the numbers in code rather than by eye, and gives base, optimistic and pessimistic scenarios.",
    "Reads a bank statement, a P&L or an income and expense ledger from a file and draws charts: cash flow, cost structure, scenario comparisons.",
  ],
  cannot: [
    "Doesn't tell you to buy a specific share or fund: Vitaly isn't an investment adviser. He talks in principles — asset classes, allocation, risk, time horizon.",
    "Doesn't guarantee results: any forecast is a model built on assumptions, and Vitaly names the main one.",
    "Doesn't work with tax evasion schemes — only legal tax optimisation.",
  ],
  faq: [
    {
      q: "Which country does Vitaly work with?",
      a: "By default, Russia: USN, the patent regime, self-employment, IIS (individual investment accounts), tax deductions. He can also do the numbers in dollars or euros. If your business is in another country, name it: cash flow is calculated the same way, but check local taxes with a specialist in that country.",
    },
    {
      q: "How is Vitaly different from an accountant?",
      a: "Bookkeeping — journal entries, tax returns, payroll — is for Anna, the accountant. Vitaly is about decisions for the future: what a transaction means for your cash flow and where to go next. Linkeon assistants share one profile: tell one, and they all know.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "Who will see my figures?",
      a: "We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
  ],
};

export default vitaly;
