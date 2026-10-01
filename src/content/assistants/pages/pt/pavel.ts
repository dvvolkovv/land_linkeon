import type { AssistantPageText } from '../../types';

/** Павел — продажи. Перевод pages/ru/pavel.ts. */
const pavel: AssistantPageText = {
  title: 'Scripts de vendas e tratamento de objeções — Pavel | Linkeon',
  description:
    'Especialista em vendas com IA: o Pavel dá respostas prontas a «está caro», «vou pensar» e «mande uma proposta» e analisa as suas mensagens frase a frase. 25 000 tokens no registo.',
  h1: 'Scripts de vendas e tratamento de objeções: o Pavel diz-lhe o que responder ao cliente',
  lead: 'Os pedidos chegam, mas só meia dúzia acaba em pagamento. O Pavel encontra onde se perdem os clientes e dá-lhe frases que lhes pode dizer, palavra por palavra, já hoje.',
  card: 'Scripts, respostas a «está caro» e «vou pensar», negociação, funil. Dá frases para dizer ao cliente palavra por palavra.',
  cta: 'Falar com o Pavel',
  situations: [
    'Depois de saber o preço, o cliente escreve «está caro» e desaparece.',
    'Pedem-lhe «mande uma proposta» e, depois de a enviar, a conversa morre.',
    'Há um mês, um cliente «foi pensar» e não sabe como lhe escrever sem parecer insistente.',
    'Na negociação pedem-lhe desconto e cede sem receber nada em troca.',
    'Vai contratar o primeiro vendedor e não sabe que carga de trabalho e que incentivos lhe dar.',
  ],
  example: {
    question: 'Os clientes dizem «está caro» e vão pensar. Como lido com isto?',
    answer: `«Está caro, vou pensar» quase nunca quer dizer que o cliente acha mesmo caro. Normalmente quer dizer que não viu pelo que está a pagar, ou que tem uma razão que não disse. Por isso, discutir o preço não serve de nada. Primeiro é preciso perceber o que ele quer dizer.

1. No próprio momento do «está caro»

Não se justifique nem ofereça desconto. Faça uma pergunta:

«Compreendo. Diga-me: caro em comparação com quê? Com outra proposta ou com o orçamento que tinha previsto?»

…

2. Se disser «vou pensar»

Não o deixe ir logo, mas também não force. É preciso saber em que é que ele vai pensar, exatamente:

«Claro, é uma decisão séria. Para lhe facilitar: o que o trava mais neste momento — o preço, os prazos, a dúvida se vai resultar no seu caso, ou precisa de validar com alguém?»

…

3. Se o cliente deixou de responder

Passados 3–5 dias, não escreva «então, já pensou?». Escreva de forma a que seja fácil responder:

«Ivan, bom dia. Não o quero apressar. Diga-me numa palavra o que se aproxima mais: 1) continua de pé, preciso de mais tempo; 2) o preço não serviu; 3) já não se aplica. Qualquer resposta me serve.»

…

O que fazer hoje: faça a lista de quem «foi pensar» no último mês e envie-lhes a mensagem do ponto 3.

O que vende e em que momento costuma surgir o «está caro»: logo a seguir ao preço ou já depois da proposta? Mande-me um excerto real da conversa e analiso-o frase a frase.`,
  },
  can: [
    'Dá frases prontas, em discurso direto: a primeira mensagem, como dizer o preço, o que responder a «está caro», «vou pensar» e «mande uma proposta».',
    'Analisa as suas mensagens com o cliente, a proposta comercial ou a transcrição de uma chamada: o que foi dito e o que devia ter sido dito.',
    'Encontra onde o funil se rompe e calcula quantos pedidos são precisos para cumprir o objetivo e quanto rende subir a conversão de uma etapa.',
    'Prepara-o para negociar: como regatear, o que pedir em troca de uma cedência, como conduzir o negócio quando são várias pessoas a decidir.',
    'Sugere alternativas ao desconto e como recuperar um cliente que deixou de responder sem andar a mendigar.',
    'Ajuda a montar a equipa comercial: que carga de trabalho dar, o que medir, que incentivos definir para o primeiro vendedor.',
  ],
  cannot: [
    'Não ensina a pressionar, a mentir sobre escassez nem a inventar «só hoje»: esses truques matam as vendas repetidas.',
    'Não promete taxas de conversão. Qualquer número é uma referência do setor, com ressalvas.',
    'Não traz clientes. De onde vêm os pedidos é pergunta para a Alexandra, do marketing; o Pavel trabalha com quem já chegou.',
    'Não substitui um advogado: contratos, condições gerais de venda e devolução de adiantamentos são com o Alexei.',
  ],
  faq: [
    {
      q: 'Os conselhos do Pavel são para que mercado?',
      a: 'À partida, para o mercado russo: conversas por mensagem em vez de chamadas, aprovações demoradas, desconfiança em relação a pagamentos antecipados, concursos. Se vende noutro país, indique-o: o funil e as respostas a objeções constroem-se da mesma forma, mas os hábitos dos compradores locais é melhor confirmá-los com quem conhece esse mercado.',
    },
    {
      q: 'Posso enviar as mensagens que troquei com um cliente?',
      a: 'Sim, como texto ou em ficheiro — o Pavel analisa-as frase a frase. Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
    {
      q: 'O Pavel ajuda a vender seja o que for?',
      a: 'Não. Se o produto não resolve o problema do cliente, o Pavel diz-lhe que o problema não está nas vendas: mais vendas de um produto assim só aceleram as devoluções e estragam a reputação.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se a Alexandra já sabe quem são os seus clientes, não vai ter de o explicar outra vez ao Pavel.',
    },
  ],
};

export default pavel;
