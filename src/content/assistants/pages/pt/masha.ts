import type { AssistantPageText } from '../../types';

/**
 * Маша — трансформационная игра с метафорическими картами. Перевод
 * pages/ru/masha.ts. Говорит на «ты» — это её голос, в примере он сохранён
 * (по-португальски — «tu»).
 *
 * Пример — docs/assistant-pages/examples/masha.md. Вырезано «…»: фраза про
 * профиль тестового аккаунта («вижу в твоём профиле…» — отсылка к вопросам,
 * заданным Мише и Ирине в том же сборе) и абзац о переключении на других
 * ассистентов («в левом верхнем углу» — подсказка по интерфейсу кабинета).
 * Картинку первой карты из конца ответа на страницу не берём, хотя поле
 * example.image есть: она из сторонней галереи метафорических карт, прав на неё
 * у нас нет.
 */
const masha: AssistantPageText = {
  title: 'Cartas metafóricas online: jogo transformacional — Macha | Linkeon',
  description:
    'A Macha, facilitadora de jogos, conduz um jogo transformacional com cartas metafóricas online: mostra uma carta e faz perguntas, e o sentido descobre-o quem joga.',
  h1: 'Cartas metafóricas online: a Macha conduz um jogo transformacional',
  lead: 'A Macha mostra uma carta metafórica e pergunta o que vê nela e o que sente. Não há respostas certas: cabe-lhe a si encontrar o sentido, e a Macha ajuda a dar por ele.',
  card: 'Jogo com cartas metafóricas: a Macha mostra uma imagem e faz perguntas, e quem joga vai reparando no que lhe é importante.',
  cta: 'Falar com a Macha',
  situations: [
    'Já ouviu falar de cartas metafóricas e quer experimentar para ver como funcionam.',
    'Quer perceber o que deseja de verdade, mas quando se pergunta diretamente só lhe surgem respostas «certinhas».',
    'Anda com menos energia e quer descobrir o que o sustenta e o inspira.',
    'Tem uma escolha pela frente e quer perceber o que nela importa para si.',
    'Já jogou jogos transformacionais ao vivo e quer experimentar o formato online.',
  ],
  example: {
    question: 'Quero experimentar um jogo transformacional com cartas metafóricas. Como funciona?',
    answer: `Olá! Sou a Macha, facilitadora de jogos e especialista em jogos transformacionais. Fico contente por te ter apetecido experimentar.

É simples. Mostro-te uma carta metafórica: tem uma imagem, uma história ou uma cena sem um sentido único. Tu contas o que vês, o que sentes e com que é que isso ressoa na tua vida. Não há respostas certas nem erradas. A carta é como um espelho: cada um vê nela uma coisa diferente, e através dessas associações aparece o que é realmente importante para ti: valores, desejos, apoios interiores.

Não dou conselhos nem interpreto as cartas por ti. Faço perguntas, ajudo-te a reparar nos sentidos e a apoiar-te no que te dá força. Normalmente passamos por 2–3 cartas e depois vemos o que já ficou mais claro. A partir daí decides tu: ir mais fundo ou fazer o balanço.

Podes jogar só para te conheceres melhor. Ou podes trazer uma questão concreta. … Com qualquer tema destes as cartas também funcionam bem.

…

Tiramos a primeira carta? Podes dizer-me já se há algum tema que queiras explorar, ou se vamos à descoberta.`,
  },
  can: [
    'Mostra as cartas metafóricas no próprio chat, uma a seguir à outra.',
    'Para cada carta, faz perguntas abertas, uma de cada vez: o que vê, o que sente, com que é que isso se liga na sua vida.',
    'Ajuda a reparar no que está por trás das associações: valores, desejos, intenções e aquilo que lhe dá força.',
    'Ao fim de duas ou três cartas, diz o que já ficou claro e propõe escolher: ir mais fundo ou fazer o balanço.',
    'No fim, faz o balanço e propõe continuar com ela ou passar a outro assistente.',
  ],
  cannot: [
    'Não deita as cartas nem prevê o futuro: aqui a carta é uma metáfora, não um sinal do destino.',
    'Não interpreta as cartas em seu lugar nem dá conselhos. A Macha faz as perguntas, e as respostas vêm de si.',
    'Não é psicoterapia: o jogo ajuda a conhecer-se melhor, mas não trata nem substitui um psicólogo.',
  ],
  faq: [
    {
      q: 'O que são cartas metafóricas?',
      a: 'Imagens sem um único significado certo: uma figura, uma história ou uma cena. Cada pessoa vê nelas uma coisa diferente, e a partir dessas associações é mais fácil reparar no que é importante para si neste momento.',
    },
    {
      q: 'Preciso de ter um baralho?',
      a: 'Não. É a Macha que mostra as cartas, no próprio chat.',
    },
    {
      q: 'Quanto tempo dura o jogo?',
      a: 'Normalmente duas ou três cartas, com uma ou duas perguntas para cada uma. Depois a Macha pergunta se quer ir mais fundo ou fazer o balanço. Não o vai apressar.',
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

export default masha;
