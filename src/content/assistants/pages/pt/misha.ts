import type { AssistantPageText } from '../../types';

/**
 * Миша — коучинг по стандартам ICF. Перевод pages/ru/misha.ts. Пример
 * разговора — целиком, без правок: docs/assistant-pages/examples/misha.md.
 *
 * Номер 112 из «Чего не делает» не перенесён: на нерусской странице —
 * «местная экстренная служба» (бриф, п. 8).
 */
const misha: AssistantPageText = {
  title: 'Sessão de coaching online segundo as normas da ICF — Micha | Linkeon',
  description:
    'O Micha, coach com IA, segue as normas da ICF. Sem conselhos nem juízos: faz perguntas, ajuda a perceber o que o trava e a escolher o primeiro passo. 25 000 tokens no registo.',
  h1: 'Sessão de coaching online: Micha, coach segundo as normas da ICF',
  lead: 'A conversa que anda a adiar há três meses, ou uma escolha em que dá voltas e voltas sem sair do sítio. O Micha não lhe diz o que está certo: faz perguntas, e cabe-lhe a si encontrar a resposta e o primeiro passo.',
  card: 'Sessão de coaching segundo as normas da ICF: perguntas em vez de conselhos e, no fim, um passo escolhido por si.',
  cta: 'Falar com o Micha',
  situations: [
    'Uma conversa importante vai sendo adiada semana após semana, e não percebe o que o trava.',
    'O objetivo do ano está escrito desde janeiro, e ainda nem lhe pegou.',
    'Propõem-lhe uma promoção, mas não sente alegria nenhuma e não tem a certeza de que a quer mesmo.',
    'Há duas opções e anda às voltas entre elas, a escolher de novo de cada vez.',
    'Conselhos já ouviu que cheguem; agora quer perceber o que quer realmente.',
  ],
  example: {
    question:
      'Há três meses que adio uma conversa importante com o meu sócio. Ajude-me a perceber o que me trava.',
    answer: `Olá! Sou o Micha, coach. Ainda bem que decidiu olhar para isto. Se a conversa anda a ser adiada há três meses, quase sempre há alguma coisa por trás, e vale a pena perceber o quê.

Em poucas palavras, eis como trabalho. Uma sessão de coaching é uma conversa em que procura as respostas por si. Não dou conselhos, não avalio e não digo o que está certo. Faço perguntas que ajudam a ver a situação de forma mais ampla e a reparar no que, por agora, escapa. Normalmente, a pessoa sai da sessão com clareza e com um próximo passo concreto, escolhido por ela.

Aqui pode falar com franqueza, sem pressa e ao seu ritmo.

Antes de começarmos: como lhe devo chamar?`,
  },
  can: [
    'No início, explica como funciona uma sessão de coaching e o que esperar dela.',
    'Ajuda a definir consigo o tema e o resultado: sobre o que quer falar e com que quer sair no fim.',
    'Faz uma pergunta aberta de cada vez e segue o seu ritmo. Se a conversa chegar às emoções, dá-lhes espaço.',
    'Ajuda a ver o que o prende, que opções existem e em que pontos fortes seus se pode apoiar.',
    'No fim, ajuda a escolher o primeiro passo e a perceber por que sinais vai notar que avançou.',
  ],
  cannot: [
    'Não dá conselhos, listas nem soluções feitas, e não avalia. O Micha trabalha só com o que traz.',
    'Não é psicólogo nem psiquiatra: coaching não é psicoterapia. Se a conversa tocar em trauma, depressão ou risco para si ou para outros, o Micha sugere procurar um especialista. Se houver perigo de vida, contacte o serviço de emergência local.',
  ],
  faq: [
    {
      q: 'Como decorre a sessão?',
      a: 'Primeiro, o Micha pergunta sobre o que quer falar e o que seria, para si, um bom resultado. Depois vêm as perguntas, uma a uma: o que é mais importante aqui, o que o prende, que opções vê. No fim, um passo que escolhe por si e um breve balanço: que ideias leva consigo.',
    },
    {
      q: 'O Micha é um coach certificado?',
      a: 'Não, o Micha é um assistente de IA. Conduz a sessão segundo as normas da ICF, a Federação Internacional de Coaching: não aconselha, não avalia, faz perguntas abertas e segue o seu tema.',
    },
    {
      q: 'Com que tema posso vir?',
      a: 'Com qualquer tema em que a decisão seja sua: trabalho, mudanças, um objetivo que não sai do lugar, uma conversa que vai sendo adiada. O tema é escolhido por si, e o Micha segue-o em vez de lhe impor o dele.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Quem vê as minhas conversas?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default misha;
