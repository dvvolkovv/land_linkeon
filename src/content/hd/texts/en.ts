import type { HdTexts } from '../types';

/**
 * Калькулятор Human Design на английском. Перевод texts/ru.ts по плану
 * docs/superpowers/plans/2026-10-14-hd-calculator-languages.md, «Правила переводов»;
 * термины — docs/hd-calculator/glossary-languages.md.
 */
const en: HdTexts = {
  title: "Free Human Design calculator — bodygraph by date of birth | Linkeon",
  description:
    "Free Human Design calculator, no sign-up: your bodygraph from your date, time and city of birth — type, strategy, authority and profile, with short descriptions.",
  h1: "Human Design calculator online — free bodygraph",
  breadcrumb: "Human Design calculator",
  intro: [
    "To draw your bodygraph, you need your date, exact time and city of birth. The calculator shows your type, strategy, authority, profile and definition, followed by your centres and channels. Each part comes with a short description of how it usually shows up in people.",
    "Human Design describes a person using a chart of nine centres, 64 gates and 36 channels. What is defined in it depends on the positions of the Sun, the Moon, the lunar nodes and the planets at the moment of birth and about 88 days before it. From this come a person's type, strategy and authority — pointers to how they can make decisions and spend their energy more easily.",
    "Here, Human Design is a tool for self-discovery, not a forecast: the descriptions speak of tendencies, not events, and they're best tested against your own experience. The chart is calculated right in your browser with no sign-up: your date, time and city of birth aren't sent to a server.",
  ],
  form: {
    heading: "Your birth details",
    date: "Date of birth",
    time: "Time of birth",
    timeHint: "The time is required: without it, your type could turn out to be different.",
    city: "City of birth",
    cityPlaceholder: "Start typing a city",
    cityHint: "Can't find your city? Choose the nearest large city in the same time zone.",
    cityLoading: "Loading the list of cities…",
    cityLoadError: "The list of cities didn't load. Check your connection and click the field again.",
    cityNotFound: "That city isn't on the list — choose the nearest large city in the same time zone.",
    zoneLine: "{city}: {offset} on your date of birth",
    zoneUnknown: "Your browser doesn't know this city's time zone — choose a nearby large city.",
    dstGap: "The clocks went forward that night, so they never showed {time}. How was the time of birth recorded?",
    dstAmbiguous: "The clocks went back that night, so {time} happened twice. Which of the two was it?",
    dstBefore: "Before the clocks changed ({offset})",
    dstAfter: "After the clocks changed ({offset})",
    dstChoose: "Choose whether it was before or after the clocks changed.",
    missing: "Fill in the date and time and choose a city from the list.",
    futureDate: "Check the date: it must be between 1900 and today.",
    submit: "Calculate",
  },
  result: {
    heading: "Your bodygraph",
    dataLine: "{date}, {time}, {city} ({offset})",
    bodygraphLabel: "Bodygraph: {type}. Defined centres: {centers}",
    bodygraphLabelEmpty: "Bodygraph: {type}. Defined centres: none",
    legendPersonality: "Personality — the moment of birth",
    legendDesign: "Design — about 88 days before birth",
    typeLabel: "Type",
    strategyLabel: "Strategy",
    authorityLabel: "Authority",
    profileLabel: "Profile",
    definitionLabel: "Definition",
    definedCenters: "Defined centres",
    noDefinedCenters: "No defined centres",
    openCenters: "Open centres",
    noOpenCenters: "No open centres",
    channels: "Channels",
    noChannels: "No defined channels",
    cta: "Talk it through with Raya",
    ctaNote: "A personal reading and a 7-day experiment with Raya — you get 25,000 tokens when you sign up",
  },
  types: {
    generator: {
      name: "Generator",
      strategy: "To respond",
      text: "A Generator has a defined Sacral Centre — a steady supply of energy for work that absorbs them. The strategy is “to respond”: not to start from scratch by sheer willpower, but to wait for life to offer something — a question, a request, a task — and listen for a clear inner “yes”. Work chosen in response usually brings satisfaction, while work taken on against it brings frustration and fatigue.",
    },
    manifestingGenerator: {
      name: "Manifesting Generator",
      strategy: "To respond, then inform",
      text: "A Manifesting Generator has a defined Sacral Centre, and their energy is linked to the Throat Centre and quickly turns into action. The strategy is “to respond, then inform”: to wait for a clear “yes” to what life offers and, before acting, to briefly tell the people the decision will affect. People like this often juggle several things at once and skip steps, then go back to what they missed.",
    },
    manifestor: {
      name: "Manifestor",
      strategy: "To inform",
      text: "A Manifestor's Sacral Centre is open, but another energy source (the Heart Centre, Solar Plexus or Root Centre) is linked to the Throat Centre, so they can initiate without waiting for life to offer something. The strategy is “to inform”: to briefly tell those affected by a decision before acting. It isn't asking permission: this way, others usually resist less, and the Manifestor feels less anger and more peace.",
    },
    projector: {
      name: "Projector",
      strategy: "Wait for the invitation",
      text: "A Projector's Sacral Centre is open, and they usually lack a Generator's steady supply of energy for sustained work. But they often have a keen eye for others: they see how people and processes work and what could be improved. The strategy “wait for the invitation” applies to big things — work, relationships, a move: unasked-for advice is often ignored, while the same advice, once invited, is welcome.",
    },
    reflector: {
      name: "Reflector",
      strategy: "Wait a lunar cycle — about 28 days",
      text: "A Reflector has all nine centres open — a rare type. Reflectors subtly mirror their surroundings: how they feel can reveal the mood in a family or team, so who they live and work with, and where, matters a lot to them. Important decisions are easier to make after living with the question for about 28 days: in that time the Moon passes through all 64 gates, and the decision can show itself from every side.",
    },
  },
  authorities: {
    emotional: {
      name: "Emotional (Solar Plexus)",
      inMessage: "emotional authority",
      text: "Everyone with a defined Solar Plexus has emotional authority, whatever other centres are defined. Feelings move in a wave, from highs to lows, and at any point on it a decision can seem obvious. Clarity usually comes once the wave has settled, so it helps to sleep on important decisions and check whether the answer still holds a day or two later.",
    },
    sacral: {
      name: "Sacral",
      inMessage: "sacral authority",
      text: "Generators and Manifesting Generators have sacral authority when the Solar Plexus is open. The answer comes at once and from within — a clear “yes” or “no”, sometimes a sound like “uh-huh” or “uhn-uhn” — before the mind has time to step in. This response is easiest to hear when the question is put simply and can be answered in one word.",
    },
    splenic: {
      name: "Splenic",
      inMessage: "splenic authority",
      text: "Splenic authority comes with a defined Spleen Centre when the Solar Plexus and the Sacral Centre are open. It's a quiet instinct in the moment: it speaks once, straight away, and doesn't repeat itself. Reasoning can easily drown it out, so people with this authority are better off trusting their first instinct, especially when it comes to safety and to what fits right now.",
    },
    ego: {
      name: "Ego (Heart Centre)",
      inMessage: "ego authority",
      text: "Ego authority comes with a defined Heart Centre when the Solar Plexus, the Sacral Centre and the Spleen Centre are open. A decision is tested with a simple question: does the person really want this, and what will they get out of it? For a Manifestor, the answer can usually be heard in what they say spontaneously; for a Projector, it becomes clear in conversation with people they trust.",
    },
    selfProjected: {
      name: "Self-Projected",
      inMessage: "self-projected authority",
      text: "Self-projected authority is found in Projectors whose defined G Centre is linked to the Throat Centre, while the Solar Plexus, Spleen Centre and Heart Centre are open. Clarity comes through their own voice: talking the question through aloud with someone they trust and hearing what they say themselves. The other person is there to listen, not to advise, and the right answer usually sounds like “this is me”.",
    },
    mental: {
      name: "Mental (Environmental)",
      inMessage: "mental authority",
      text: "Mental authority is found in Projectors whose defined centres are limited to the Head Centre, the Ajna and the Throat Centre, or some of these. There's no inner “yes” or “no” signal here, and clarity comes from outside: from conversations with different people they trust and from how they feel in different places. It helps not to rush decisions: in time, what's right can be heard in their own words.",
    },
    lunar: {
      name: "Lunar",
      inMessage: "lunar authority",
      text: "Only Reflectors have lunar authority: they have no defined centres, and no constant inner signal either. Important matters are best decided over a lunar cycle, about 28 days: discussing the question with different people, noticing how their feelings about it change from day to day, and waiting until the answer settles. Rushing usually gets in the way here, while time helps them see the question as a whole.",
    },
  },
  profiles: {
    "1/3": {
      name: "Investigator / Martyr",
      text: "The first line looks for a foundation in knowledge: before acting, it wants to understand the basics. The third tests everything through its own experience, by trial and error. Together they make a person who studies first and then tries things out, and for whom setbacks are discoveries rather than failures: that's how they learn what can really be relied on.",
    },
    "1/4": {
      name: "Investigator / Opportunist",
      text: "The first line looks for a foundation in knowledge: a person feels most confident once they've got to grips with the basics. The fourth is built on people: opportunities usually come through acquaintances, friends and colleagues. People with this profile do well to study what interests them in depth and share it with their own circle — that's usually where they're listened to.",
    },
    "2/4": {
      name: "Hermit / Opportunist",
      text: "The second line is a natural talent that the person often doesn't notice themselves, and a need to be alone, doing their own thing without an audience. The fourth connects them with people: it's usually their close circle that sees this talent and calls on them to use it. With this profile, it helps them to protect time for themselves and to respond to invitations from people they know.",
    },
    "2/5": {
      name: "Hermit / Heretic",
      text: "The second line is a natural talent and a need for solitude. The fifth attracts other people's expectations: such a person is often expected to provide a practical solution, or even to come to the rescue in a difficult situation. They may be called on for help more often than they'd like, so with this profile it helps them to protect time for themselves and take on what they can really manage.",
    },
    "3/5": {
      name: "Martyr / Heretic",
      text: "The third line learns from experience: it tries, makes mistakes and finds what works. The fifth attracts other people's expectations: the person is expected to provide practical solutions. In this combination, mistakes become the experience such solutions grow from, and a habit of not promising more than they've tried out themselves protects their reputation.",
    },
    "3/6": {
      name: "Martyr / Role Model",
      text: "The third line learns from experience, through trial and error. The sixth is usually described in three phases: lots of trial and error in youth, as with the third line, then a time of watching from the sidelines, and later being an example to others. People with this profile tend to have a great deal of experience, and over time it often grows into calm and wisdom that others look to.",
    },
    "4/6": {
      name: "Opportunist / Role Model",
      text: "The fourth line is built on people: friends and acquaintances are the main source of opportunities and support. The sixth is usually described in three phases: lots of trial and error at first, then a view from the sidelines, and later experience that others look to. People with this profile are often listened to within their circle, especially when they practise what they preach.",
    },
    "4/1": {
      name: "Opportunist / Investigator",
      text: "The fourth line is built on the people in one's own circle, the first on solid knowledge. People with this profile tend to stick to their own course: they're reluctant to change under pressure from others, and it's usually easier for them to find their own crowd than to fit in with someone else's. Their firm foundations often make them a reliable support to those around them.",
    },
    "5/1": {
      name: "Heretic / Investigator",
      text: "The fifth line attracts other people's expectations: the person is expected to come up with a practical solution. The first gives those solutions a foundation: before offering anything, the person gets to grips with the basics. People with this profile are often called in when things get difficult, and their reputation rests on their solutions being tested and working.",
    },
    "5/2": {
      name: "Heretic / Hermit",
      text: "The fifth line attracts other people's expectations: the person is expected to find a way out. The second is a natural talent and a need for solitude. Sometimes they're called on to solve other people's problems just when they want to be alone, so with this profile it helps them to choose which calls to answer and to protect time for themselves.",
    },
    "6/2": {
      name: "Role Model / Hermit",
      text: "The sixth line is usually described in three phases: lots of trial and error in youth, then a time of watching from the sidelines, and later being an example to others. The second adds a natural talent and a need for solitude. People with this profile often keep a little apart, while others notice their example and their talent.",
    },
    "6/3": {
      name: "Role Model / Martyr",
      text: "The sixth line is usually described in three phases: lots of trial and error at first, then a view from the sidelines, and later being an example to others. The third adds trial and error in the later phases too, so the experience of people with this profile is rarely smooth. But it often adds up to a practical, lived wisdom that others value precisely because it has been tested.",
    },
  },
  definitions: {
    none: {
      name: "No definition",
      text: "This happens only in Reflectors: not a single channel is defined. Definition appears only for a while — from the people nearby and from the movement of the Moon. That's why no two days are alike. Time helps them separate what is their own from what has come from outside.",
    },
    single: {
      name: "Single definition",
      text: "All the defined centres are connected in a single group. People with this definition usually have a steady sense of wholeness: they don't need anyone to “complete” them, and they process information on their own and fairly quickly. Sometimes they find it hard to understand why others need more time for the same thing.",
    },
    split: {
      name: "Split definition",
      text: "The defined centres form two separate groups, as if a bridge between them were missing. There can be a sense that something is lacking, and a pull towards people who complete that bridge: around them, everything joins up into one whole. Decisions usually benefit from time, so that both parts can come to an agreement.",
    },
    triple: {
      name: "Triple split definition",
      text: "The defined centres form three separate groups. People with this definition usually need more time to think things through and benefit from varied contact with others: in busy places and on the move, the different parts seem to join up. When decisions aren't rushed, their view turns out well-rounded and balanced.",
    },
    quadruple: {
      name: "Quadruple split definition",
      text: "The defined centres form four separate groups — a rare combination. People with this definition usually process experience slowly and thoroughly, and haste tends to get in their way. Decisions are best made without pressure, taking time, and views formed this way are usually stable and change little under others' influence.",
    },
  },
  centers: {
    head: {
      name: "Head Centre",
      defined:
        "a constant flow of questions and ideas coming from within: the mind usually has something to think about. People with it often inspire others, and those around them start having questions too.",
      open: "questions and inspiration come from other people and grow stronger around them. A person may end up racking their brains over other people's questions, and then it helps to ask which of them are really their own.",
    },
    ajna: {
      name: "Ajna",
      defined:
        "a consistent way of thinking: opinions and conclusions follow an inner logic of their own and depend little on who the conversation is with. People with it are usually sure of how they understand things, and can find it hard to accept that other people's logic works differently.",
      open: "a flexible mind that easily sees a question from different angles and tries on other people's views. There can be a temptation to feign a certainty that isn't there, although openness to different opinions is exactly the strength here.",
    },
    throat: {
      name: "Throat Centre",
      defined:
        "a consistent, recognisable way of speaking and of expressing oneself through action. People with it usually don't have to fight for attention, and exactly how they come across depends on which centres the Throat Centre is linked to.",
      open: "the way of speaking changes depending on who is around, and there can be an urge to speak first in order to be noticed. What people like this say usually carries more weight when others have turned to them first.",
    },
    g: {
      name: "G Centre (Identity)",
      defined:
        "a stable sense of self and direction: people with it usually know who they are and where they're going, and this depends little on their surroundings. Around them, others can find it easier to sense their own path.",
      open: "the sense of self and direction is flexible and depends a lot on the place and the people around. That's why it matters so much where, and with whom, people like this live and work: the right surroundings point the way by themselves.",
    },
    heart: {
      name: "Heart Centre (Ego)",
      defined:
        "constant access to willpower and a sense of self-worth. People with it can usually make a promise and keep it if it really matters to them, and for willpower to last, it needs breaks too.",
      open: "willpower is inconsistent, and a person's worth doesn't depend on how much they've managed to force themselves to do. Sometimes a person makes promises to prove something, and then keeping them is especially hard.",
    },
    spleen: {
      name: "Spleen Centre",
      defined:
        "a constant instinct that signals in the moment what is safe and what fits. It speaks quietly and only once, and people with it have a steady sense of well-being that those around them often feel too.",
      open: "sensitivity to how others are feeling: the person readily notices when someone nearby is uneasy. There can be a tendency to hold on to the familiar — people, relationships, habits — even when it no longer does any good, simply because it feels safer.",
    },
    solarPlexus: {
      name: "Solar Plexus",
      defined:
        "an emotional rhythm of one's own: highs and lows come in their own time and aren't always tied to outside events. The mood of people with it noticeably rubs off on those around them.",
      open: "a fine sensitivity to other people's feelings: around others, emotions grow stronger and feel like one's own. A person may steer clear of conflicts and unpleasant conversations so as not to get caught up in someone else's storm.",
    },
    sacral: {
      name: "Sacral Centre",
      defined:
        "life force and energy for work that renews itself when the activity is to one's liking. People with it usually energise those around them: in their company, others find it easier to get down to work too.",
      open: "there's no constant access to working energy, and around people with a defined Sacral Centre it can seem there's more energy than there really is. It helps people like this to notice when enough is enough and not to measure their workload against those who have this centre defined.",
    },
    root: {
      name: "Root Centre",
      defined:
        "steady inner pressure that helps to get things started and meet deadlines. People with it usually handle haste and tension calmly and work at their own pace.",
      open: "sensitivity to outside pressure and haste: other people's tension gets amplified and feels like one's own. A person may rush to finish everything just to be rid of the tension, although much of it could wait.",
    },
  },
  channels: {
    "1-8": {
      name: "Inspiration",
      text: "connects the G Centre to the Throat Centre: a person's individuality seeks expression in words and deeds. People with this channel often inspire others not through advice but by doing everything their own way, and their creative contribution is better received when they themselves have been noticed and invited.",
    },
    "2-14": {
      name: "The Beat",
      text: "connects the G Centre to the Sacral Centre: people with this channel have the energy to go in their own direction, even if it's unlike anyone else's. They often set the course and find the resources for work they're sure of, and others follow.",
    },
    "3-60": {
      name: "Mutation",
      text: "connects the Root Centre to the Sacral Centre: energy comes in pulses, and in the pauses there can be melancholy and no sense of where to go. But out of such pauses, something truly new is often born in people with this channel, if it's given time to ripen and not rushed.",
    },
    "4-63": {
      name: "Logic",
      text: "connects the Head Centre to the Ajna: doubt drives the search for patterns and logical answers. People with this channel usually spot where an argument doesn't hold together, and their conclusions are most useful when they're tested in practice rather than taken on trust.",
    },
    "5-15": {
      name: "Rhythm",
      text: "connects the Sacral Centre to the G Centre: people with this channel usually have their own natural rhythm — the pace at which they work, rest and take on new things. When they live by it rather than by an imposed schedule, things go more smoothly, and around them others fall into their own rhythm too.",
    },
    "6-59": {
      name: "Intimacy",
      text: "connects the Solar Plexus to the Sacral Centre: this is the energy of getting close, which helps to break the ice and build trust. Closeness usually matters to people with this channel, and around them others find it easier to open up, especially when feelings aren't rushed.",
    },
    "7-31": {
      name: "The Alpha",
      text: "connects the G Centre to the Throat Centre: this is leadership that rests on recognition. People with this channel are often chosen to lead, and their influence is stronger when they've been asked to lead than when they've taken on the role themselves.",
    },
    "9-52": {
      name: "Concentration",
      text: "connects the Root Centre to the Sacral Centre: energy is gathered into one point, and the person can keep their attention on a task and its details calmly and for a long time. When the activity is chosen in response, this focus brings satisfaction, but without something to do it often turns into restlessness.",
    },
    "10-20": {
      name: "Awakening",
      text: "connects the G Centre to the Throat Centre: what matters here is being oneself right now, speaking and acting on one's own convictions. People with this channel often awaken others not by lecturing but by the example of living life their own way.",
    },
    "10-34": {
      name: "Exploration",
      text: "connects the G Centre to the Sacral Centre: energy goes into living by one's own convictions. People with this channel usually go their own way and don't take well to being told what to do, and their independence, when it comes from response rather than stubbornness, can be an example to others.",
    },
    "10-57": {
      name: "Perfected Form",
      text: "connects the G Centre to the Spleen Centre: intuition in the moment shows how to act so as to stay true to oneself. People with this channel often have a sense of form and style, and they're better off trusting their inner instinct than a plan worked out in advance.",
    },
    "11-56": {
      name: "Curiosity",
      text: "connects the Ajna to the Throat Centre: ideas and impressions come together into stories. People with this channel often seek out the new for the sake of the search itself, and their stories leave others with thoughts they want to mull over.",
    },
    "12-22": {
      name: "Openness",
      text: "connects the Solar Plexus to the Throat Centre: feelings seek expression in words, tone of voice and creativity. A lot depends on mood: at the right moment, people with this channel can move others with their words, and when they're not in the mood, they're better off staying quiet.",
    },
    "13-33": {
      name: "The Prodigal",
      text: "connects the G Centre to the Throat Centre: this is the ability to listen, remember and later make sense of what has been lived through — one's own experience and other people's. People with this channel are often trusted with stories and secrets, and after a pause and some solitude, their experience turns into insights useful to others.",
    },
    "16-48": {
      name: "The Wavelength",
      text: "connects the Spleen Centre to the Throat Centre: here depth of knowledge meets the ability to show it. In people with this channel, mastery usually grows out of repetition and practice, and a well-honed talent can speak for itself.",
    },
    "17-62": {
      name: "Acceptance",
      text: "connects the Ajna to the Throat Centre: thoughts take shape as opinions backed by facts and details. People with this channel are usually good at explaining and putting things in order, and their opinion is more readily accepted when it has been asked for.",
    },
    "18-58": {
      name: "Judgement",
      text: "connects the Root Centre to the Spleen Centre: here there's an insatiable urge to notice what could be put right, and joy when things get better. People with this channel often see the weak spots in projects and systems, and their remarks are more useful when they've been asked for than when they sound like a reproach.",
    },
    "19-49": {
      name: "Synthesis",
      text: "connects the Root Centre to the Solar Plexus: this is sensitivity to what people need — closeness, a roof over their heads, a sense of belonging. Principles and fair exchange in relationships matter to people with this channel, and they are often the first to notice what others lack.",
    },
    "20-34": {
      name: "Charisma",
      text: "connects the Sacral Centre to the Throat Centre: energy turns straight into action, without lengthy preparation. People with this channel are usually busy with something and act fast, and the speed pays off when the task is chosen in response rather than simply being the first thing to hand.",
    },
    "20-57": {
      name: "The Brainwave",
      text: "connects the Spleen Centre to the Throat Centre: intuition kicks in instantly and finds the words straight away. People with this channel often grasp the essence of a situation before others do, and their first impression tends to be accurate, as long as they don't argue themselves out of it.",
    },
    "21-45": {
      name: "The Money Line",
      text: "connects the Heart Centre to the Throat Centre: this is the will to manage resources and make sure one's own people have everything they need. People with this channel usually want to be in charge of their own part of the work, and they organise others well when that role is recognised as theirs.",
    },
    "23-43": {
      name: "Structuring",
      text: "connects the Ajna to the Throat Centre: sudden insights search for words others can understand. People with this channel often have ideas ahead of their time, and they're easier to hear when the listener has asked and the explanation is simple.",
    },
    "24-61": {
      name: "Awareness",
      text: "connects the Head Centre to the Ajna: the mind returns again and again to one puzzle until understanding comes. People with this channel can find it hard to let a question go, and insight usually arrives on its own, in quiet, rather than under pressure.",
    },
    "25-51": {
      name: "Initiation",
      text: "connects the G Centre to the Heart Centre, hence the wish to be first and the courage to step into the unknown. For people with this channel, shake-ups and sudden turns often become the start of something new, and their example can spur others to take a step of their own.",
    },
    "26-44": {
      name: "Surrender",
      text: "connects the Spleen Centre to the Heart Centre: instinct senses what people need right now, and willpower helps to get it across to them. People with this channel are often good at negotiating: they know how to present an idea so that others want to take it up, and they remember what has worked before.",
    },
    "27-50": {
      name: "Preservation",
      text: "connects the Sacral Centre to the Spleen Centre: this is the energy of caring — the wish to protect and support one's own people and to preserve what they value. People with this channel often take on responsibility for many, and it helps them to choose whom to look after so as not to carry more than they want to.",
    },
    "28-38": {
      name: "Struggle",
      text: "connects the Root Centre to the Spleen Centre: here there is persistence in the search for meaning. People with this channel are ready to fight for what matters to them, and difficulties tend to toughen them rather than stop them — as long as the struggle is for their own cause and not for its own sake.",
    },
    "29-46": {
      name: "Discovery",
      text: "connects the Sacral Centre to the G Centre: when the “yes” comes from response, there's enough energy to see an experience through to the end. People with this channel often succeed where others give up, which is why it matters so much what they say yes to.",
    },
    "30-41": {
      name: "Recognition",
      text: "connects the Root Centre to the Solar Plexus: this is a hunger for new experiences and strong desires with dreams behind them. For people with this channel, an experience is usually more rewarding if they enter it once the emotion has settled rather than at its peak.",
    },
    "32-54": {
      name: "Transformation",
      text: "connects the Root Centre to the Spleen Centre: here there's ambition and an instinct for what will take root and last. People with this channel usually strive to rise and change their position, and they move up more easily when others notice and support their efforts.",
    },
    "34-57": {
      name: "Power",
      text: "connects the Sacral Centre to the Spleen Centre: strength and intuition work together, in the moment. People with this channel often react to a situation before they've had time to think it over, and such a reaction, when it comes from response, usually proves accurate.",
    },
    "35-36": {
      name: "Transitoriness",
      text: "connects the Solar Plexus to the Throat Centre: this is a craving for new impressions and for experience for its own sake. People with this channel want to try a great deal, and over time the highs and disappointments they've lived through turn into wisdom they share.",
    },
    "37-40": {
      name: "Community",
      text: "connects the Heart Centre to the Solar Plexus: this is the channel of agreements — who does what for the common cause and what they get in return. Loyalty and fair exchange matter to people with this channel, and so does time for themselves to recharge.",
    },
    "39-55": {
      name: "Emoting",
      text: "connects the Root Centre to the Solar Plexus: moods here shift strongly and often, and creativity frequently grows out of these swings. People with this channel don't need to look for an outside cause for every bout of sadness: a mood can come and go on its own.",
    },
    "42-53": {
      name: "Maturation",
      text: "connects the Root Centre to the Sacral Centre: this is the energy of cycles — beginning, going through and completing. It matters to people with this channel to finish what they start, and an experience lived through in full becomes a source of maturity for them and for others.",
    },
    "47-64": {
      name: "Abstraction",
      text: "connects the Head Centre to the Ajna: images and memories swirl in the mind until they add up to meaning. People with this channel know the kind of confusion that turns into clarity by itself in time, and their conclusions about what they've lived through can be valuable to others.",
    },
  },
  typesSection: {
    heading: "The five Human Design types",
    lead: "A person's type depends on which centres are defined and how they're connected to each other. No type is better than another: each has its own strategy — a pointer to how to start things and make decisions more easily, so that less energy goes into resistance.",
  },
  faqHeading: "Questions",
  faq: [
    {
      q: "Why do I need an exact time of birth?",
      a: "The Moon moves fast and passes into the next gate in about half a day. As its gate changes, channels can appear or disappear — and then the defined centres change, and sometimes the type and authority. The profile depends on the lines of the Sun: it moves more slowly, but near the edge of a line even a few hours can change the profile. If you only know the time roughly, calculate the chart for two or three possible times: you can rely on whatever is the same in all of them.",
    },
    {
      q: "My city isn't on the list — what should I do?",
      a: "Choose the nearest large city in the same time zone, preferably in the same region: time zone boundaries have shifted in the past. The city is only needed for its time zone and daylight saving time in your year of birth: they're used to convert your local time of birth to UTC. Coordinates aren't part of the calculation, so a neighbouring city in the same time zone gives the same chart, while a time zone that's an hour out is the same as a time of birth that's an hour out.",
    },
    {
      q: "Is my data saved?",
      a: "No. The chart is calculated right in your browser: your date, time and city of birth aren't sent to a server, and the form is empty after the page reloads. If you click “Talk it through with Raya”, a draft message with these details waits in your browser while you sign in to Linkeon, and is deleted as soon as it lands in the message box or you sign out. Raya will only see them if you send her the message yourself.",
    },
    {
      q: "How is this different from a reading with Raya?",
      a: "The calculator is free and works without signing up: it draws the chart and describes how each part of it usually shows up in people. Raya reads the chart as a whole: how the parts are connected and what that means in practice. She answers questions and suggests a 7-day experiment, and she also explains the incarnation cross and reads the charts of people close to you. To talk to Raya, you need to sign in to Linkeon; you get 25,000 tokens when you sign up.",
    },
    {
      q: "Why did another website show something different?",
      a: "First, compare the UTC offset for your date of birth — we show it below the city field. The same city has had different time zones and daylight saving rules in different years, and not every website takes this into account; an hour's error shifts the Moon, and sometimes the channels and type along with it. Another reason is the lunar node: we use the true node, and with the mean node the nodes can land in a different line, occasionally even a different gate. And a planet right at the edge of a line may be placed on different sides of it by different programs.",
    },
  ],
  disclaimer: "Human Design is a tool for self-discovery, not a forecast, and no substitute for a doctor, a lawyer or a financial adviser.",
  credits: "Cities and time zones from",
  licenses: "Third-party licences",
  message:
    "Hi Raya! Here are my birth details: {date}, {time}, {city} ({offset}). The calculator showed: {type}, profile {profile}, {authority}. Tell me what this means for me",
};

export default en;
