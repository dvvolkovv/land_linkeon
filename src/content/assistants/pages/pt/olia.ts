import type { AssistantPageText } from '../../types';

/**
 * Оля — исследование ценностей. Перевод pages/ru/olia.ts. Одобренный образец:
 * docs/assistant-pages/samples-ru.md.
 *
 * Правки владельца применены: Leadership Development Profile назван один раз (в
 * FAQ) и с пометкой «по мотивам, не официальный тест»; в «Что умеет» — просто
 * «логика действий», без названия методики. Пункт о помощи детям в «Чего не
 * делает» оставлен, как в образце, но без российского номера.
 *
 * В переводе номеров нет (бриф, п. 8): линия психологической помощи,
 * экстренная служба и детская линия — «своей страны» / «местная», смысл
 * каждой фразы сохранён. Пример — на «tu», как «ты» в русском ответе.
 */
const olia: AssistantPageText = {
  title: 'Mapa de valores e Dinâmica da Espiral online — Ólia | Linkeon',
  description:
    'A Ólia conduz uma exploração de valores: herói preferido, tempo, dinheiro, cinco frases por acabar, as cores da Dinâmica da Espiral — e, no fim, o seu mapa de valores pessoal.',
  h1: 'Mapa de valores e Dinâmica da Espiral: uma exploração conduzida pela Ólia',
  lead: 'A Ólia faz uma pergunta de cada vez e repara no que está por trás das suas respostas. No fim, monta o seu mapa de valores: o que o move, qual é a sua lógica de ação e para onde pode crescer.',
  card: 'Cinco passos de conversa — do herói preferido às cores da Dinâmica da Espiral. No fim, um mapa de valores pessoal.',
  cta: 'Falar com a Ólia',
  situations: [
    'Tudo parece certo — o trabalho, os planos, as pessoas à sua volta —, mas não sabe o que disso é seu e o que são expectativas dos outros.',
    'Tem uma escolha pela frente — mudar de profissão, mudar de cidade, abrir um negócio — e quer apoiar-se no que é importante para si.',
    'Repara que diz uma coisa, mas gasta o tempo e o dinheiro noutra.',
    'Leu sobre a Dinâmica da Espiral e quer perceber que níveis lhe estão mais próximos.',
    'Lidera pessoas e quer perceber em que se apoia quando toma decisões.',
  ],
  example: {
    question: 'Quero perceber quais são, de facto, os meus valores. Como funciona a sua exploração?',
    answer: `Olá! Sou a Ólia. Fico contente por quereres explorar os teus valores. É um trabalho bom e muito pessoal.

Como funciona. Isto não é um teste com respostas certas, é uma conversa tranquila. Tu olhas para ti, e eu ajudo-te a reparar no que está por trás das tuas palavras. Vamos passar por alguns passos, uma pergunta de cada vez:

1. Herói. Vamos falar de uma personagem que te é próxima e do que reconheces nela.
2. Tempo. Vamos ver em que gastas o tempo livre quando és tu a escolher.
3. Dinheiro. Vamos lembrar em que gastas o dinheiro para além das despesas obrigatórias e o que isso te dá.
4. Cinco frases por acabar. Completas cada uma como te fizer sentido.
5. Cores. Escolhes que maneiras de viver estão mais perto de ti agora.

No fim, junto tudo no teu mapa de valores pessoal. Vais ver o que te move, qual é a tua lógica de ação e para onde podes continuar a crescer.

Responde como te apetecer: em poucas palavras ou com pormenor. Aqui não há respostas erradas.

Vamos começar. Pensa no teu herói preferido, numa figura conhecida ou numa personagem de um livro, de um filme ou de um conto. Quem é, e o que te atrai nele?`,
  },
  can: [
    'Conduz a exploração por passos: o herói preferido, o tempo livre, os gastos para além dos obrigatórios, cinco frases por acabar, as cores da Dinâmica da Espiral.',
    'Faz uma pergunta de cada vez e aprofunda: o que reconhece no herói, porque é que é precisamente isso que lhe importa.',
    'Devolve-lhe os valores que se ouvem nas suas respostas — sem juízos.',
    'No fim, monta o mapa de valores: valores dominantes, lógica de ação, amplitude de valores segundo a Dinâmica da Espiral e o próximo passo de desenvolvimento.',
  ],
  cannot: [
    'Não é psicoterapia: a Ólia não faz diagnósticos nem trata.',
    'Não é um serviço de emergência. Se está a passar por um momento muito difícil, ligue para a linha de apoio psicológico do seu país. Se houver perigo de vida, contacte o serviço de emergência local. Crianças e adolescentes podem ligar para a linha de apoio à criança do seu país.',
  ],
  faq: [
    {
      q: 'O que é a Dinâmica da Espiral?',
      a: 'É o modelo de Don Beck e Chris Cowan (Spiral Dynamics): nele, as maneiras de viver são designadas por cores — do bege (sobrevivência) ao turquesa (unidade). A Ólia pede-lhe que escolha as duas cores que lhe estão mais próximas agora e que diga as que já deixou para trás ou que está só a descobrir.',
    },
    {
      q: 'O que quer dizer «lógica de ação»?',
      a: 'É um conceito de um modelo de desenvolvimento adulto: a forma como uma pessoa toma decisões e dá sentido ao que lhe acontece. A Ólia conduz a conversa inspirando-se no Leadership Development Profile — não é o teste oficial. Por exemplo, para a lógica Expert o essencial é estar certo e seguir as regras; para a Achiever, o resultado; para a Strategist, o sistema e a influência.',
    },
    {
      q: 'Quanto tempo dura a exploração?',
      a: 'Cinco passos, uma pergunta de cada vez. Pode responder em poucas palavras ou com pormenor — é disso que depende o tempo que a conversa leva.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Quem vê as minhas respostas?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default olia;
