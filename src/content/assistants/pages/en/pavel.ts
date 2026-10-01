import type { AssistantPageText } from '../../types';

/** Павел — продажи. Перевод pages/ru/pavel.ts. */
const pavel: AssistantPageText = {
  title: "Sales scripts and objection handling — Pavel | Linkeon",
  description:
    "Pavel, an AI sales expert, has answers for “too expensive”, “I'll think about it” and “send me a proposal” and reviews your chats line by line. 25,000 tokens when you sign up.",
  h1: "Sales scripts and objection handling: Pavel tells you what to say to clients",
  lead: "Enquiries come in, but only a handful make it to payment. Pavel will find where you're losing clients and give you lines you can say to them word for word, starting today.",
  card: "Scripts, replies to “too expensive” and “I'll think about it”, negotiation, the funnel. Gives you lines to say to a client word for word.",
  cta: "Talk to Pavel",
  situations: [
    "After hearing the price, the client replies “too expensive” and disappears.",
    "They say “send me a proposal”, and once you've sent it, the conversation goes dead.",
    "A month ago a client “went away to think about it”, and you don't know how to follow up without seeming pushy.",
    "In negotiations you're asked for a discount, and you give way without getting anything in return.",
    "You're hiring your first salesperson and don't know what targets and incentives to set them.",
  ],
  example: {
    question: "Clients say “too expensive” and go away to think about it. How do I deal with that?",
    answer: `“Too expensive, I'll think about it” almost never means the price really is too high for the client. Usually it means they didn't see what they'd be paying for, or there's a reason they haven't named. So arguing about the price is pointless. First you need to find out what they mean.

1. The moment you hear “too expensive”

Don't make excuses and don't offer a discount. Ask a question:

“I understand. Could you tell me — expensive compared to what? Another offer, or the budget you'd set aside?”

…

2. If they say “I'll think about it”

Don't let them go straight away, but don't push either. You need to find out what exactly they'll be thinking about:

“Of course, it's a serious decision. To make it easier: what's holding you back most right now — the price, the timing, doubt that it'll work for you specifically, or do you need to run it past someone?”

…

3. If the client has gone quiet

After 3–5 days, don't write “So, have you thought about it?” Write something that's easy to answer:

“Hello, Ivan. I don't want to rush you. Could you tell me in one word which is closest: 1) still interested, need more time; 2) the price didn't work; 3) no longer needed. Any answer is fine with me.”

…

What to do today: list everyone who “went away to think about it” in the last month and send them the message from point 3.

What do you sell, and at what point do you usually hear “too expensive”: straight after the price or after the proposal? Send me a real excerpt from one of your chats, and I'll go through it line by line.`,
  },
  can: [
    "Gives you exact, ready-to-use wording: the first message, how to state the price, what to say to “too expensive”, “I'll think about it” and “send me a proposal”.",
    "Goes through your chat with a client, your proposal or a call transcript: what was said and what should have been said.",
    "Finds where the funnel leaks and works out how many enquiries you need to hit your target and what better conversion at one stage would give you.",
    "Prepares you for negotiations: how to bargain, what to ask for in return for a concession, how to run a deal when several people make the decision.",
    "Suggests what to offer instead of a discount and how to win back a client who's gone quiet, without begging.",
    "Helps set up a sales team: what targets to set, what to measure, what incentives to offer your first salesperson.",
  ],
  cannot: [
    "Doesn't teach pressure tactics, false scarcity or made-up “today only” deals: tricks like these kill repeat sales.",
    "Doesn't promise conversion rates. Any figure is an industry benchmark with caveats.",
    "Doesn't bring you clients. Where enquiries come from is a question for Alexandra, the marketer; Pavel works with the people who have already come to you.",
    "Doesn't replace a lawyer: contracts, terms of sale and refunds of prepayments are questions for Alexey.",
  ],
  faq: [
    {
      q: "Which market is Pavel's advice for?",
      a: "By default, the Russian market: messaging apps instead of calls, long approval chains, distrust of prepayment, tenders. If you sell in another country, name it: the funnel and replies to objections are built the same way, but it's best to check local buying habits with someone who knows that market.",
    },
    {
      q: "Can I send my chat with a client?",
      a: "Yes, as text or a file — Pavel will go through it line by line. We never sell your chats or use them for ads. Processing is handled by our AI providers.",
    },
    {
      q: "Can Pavel help me sell anything?",
      a: "No. If the product doesn't solve the client's problem, Pavel will tell you that sales aren't the issue: selling a product like that will only speed up refunds and damage your reputation.",
    },
    {
      q: "How much does it cost?",
      a: "You get 25,000 tokens when you sign up, no bank card required. After that, you buy token packs — no subscription, and tokens don't expire.",
    },
    {
      q: "How is this different from a regular chatbot?",
      a: "Linkeon assistants share one profile: tell one, and they all know. If Alexandra already knows who your clients are, you won't have to explain it all over again to Pavel.",
    },
  ],
};

export default pavel;
