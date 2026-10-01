import type { AssistantPageText } from '../../types';

/** Роман — личный ассистент. Перевод pages/ru/roman.ts. Пример разговора — docs/assistant-pages/examples/roman.md. */
const roman: AssistantPageText = {
  title: 'Assistente pessoal com IA para qualquer tarefa — Roman | Linkeon',
  description:
    'O Roman é um assistente pessoal com IA. Um e-mail, uma proposta, um plano ou uma questão que mistura direito, impostos e marketing — trata ele de tudo. 25 000 tokens no registo.',
  h1: 'Roman — assistente pessoal com IA para qualquer tarefa',
  lead: 'Uma proposta comercial para entregar na sexta, o e-mail que anda a adiar há três dias, a pergunta que não sabe a quem fazer. Conte ao Roman por palavras suas: é ele próprio que responde e, onde for preciso, recorre ao que sabe um advogado, um contabilista ou alguém de marketing.',
  card: 'Aceita qualquer tarefa. Uma questão de contratos, impostos ou publicidade, resolve-a ele próprio, com o saber do especialista certo.',
  cta: 'Falar com o Roman',
  situations: [
    'Há dois meses que um cliente não paga uma fatura, e é preciso um e-mail — educado, mas daqueles que fazem pagar.',
    'Está a lançar um serviço novo e as perguntas chovem todas de uma vez: que contrato fazer com os clientes, que imposto pagar, onde encontrar os primeiros compradores.',
    'Uma pergunta de cinco minutos — sobre uma dedução fiscal, a devolução de um produto ou uma cláusula do contrato — e não sabe a quem a fazer.',
    'Para a reunião falta uma apresentação, para o post falta uma imagem, e quer receber o ficheiro pronto, não apenas um conselho.',
    'Tem a semana marcada ao minuto e quer arrumar as tarefas de forma a que o importante não se perca no meio das miudezas.',
  ],
  example: {
    question:
      'Até sexta tenho de preparar uma proposta comercial para um cliente novo — um estúdio de ioga. Por onde começo?',
    answer: `Sexta-feira já é amanhã, por isso vamos ao essencial.

Hoje, 30–40 minutos: reúna a informação de base
1. Que estúdio é: dimensão, número de salas e de professores, quem são os clientes, se é online ou presencial.
2. Onde lhes dói: poucos clientes novos, as pessoas não renovam as mensalidades, caos nas marcações, redes sociais fracas.
…

Estrutura da proposta (5–7 páginas, não mais)
1. O objetivo do cliente nas palavras dele: «Pretende…».
…
5. Preço. Melhor 2–3 pacotes: básico, ideal e alargado. Assim o cliente escolhe entre opções, em vez de decidir «sim ou não».
…

Para um estúdio de ioga
— Tom calmo e caloroso, sem venda agressiva.
…
— Mostre que percebe o negócio deles: mensalidades, retenção de clientes, sazonalidade (quebra no verão, subida em setembro e em janeiro).

Para chegar a tempo de sexta: hoje reúna os dados e faça um rascunho; amanhã de manhã reveja e envie.

Para o prazo não se perder, preparei uma tarefa «Enviar a proposta ao estúdio de ioga» para amanhã, às 12:00. … Se preferir outra hora, diga-me.

O que posso fazer a seguir: diga-me o que está a vender ao estúdio (marketing, site, equipamento, contabilidade ou outra coisa) e o que já sabe sobre o cliente. Monto o texto final da proposta e, se quiser, passo-o para um documento ou uma apresentação.`,
  },
  can: [
    'Encarrega-se de qualquer tarefa: um e-mail, uma proposta comercial, um plano, um texto, uma ideia. Dá uma resposta concreta e prática: o que fazer e por onde começar.',
    'Apoia-se nos conhecimentos dos especialistas da Linkeon: direito, impostos, marketing, textos, estratégia de negócio, carreira, coaching.',
    'Junta numa só resposta uma tarefa que cruza vários temas: por exemplo, o contrato, os impostos e a publicidade de um serviço novo.',
    'Entrega o resultado em ficheiro, cria imagens a partir de uma descrição e pesquisa na internet quando a tarefa o pede.',
  ],
  cannot: [
    'Não substitui um advogado, um contabilista ou outro especialista quando são precisas a assinatura e a responsabilidade deles. As respostas do Roman são informativas; a decisão é sua.',
    'Não assina documentos nem faz pagamentos em seu nome: assinar o contrato e transferir o dinheiro cabe-lhe a si.',
  ],
  faq: [
    {
      q: 'Que tarefas posso levar ao Roman?',
      a: 'Qualquer uma: de um e-mail ou do plano da semana a uma questão em que se misturam contrato, impostos e publicidade. Se não sabe a que assistente recorrer, comece pelo Roman.',
    },
    {
      q: 'O Roman percebe de direito e de impostos?',
      a: 'A essas perguntas responde ele próprio, com os conhecimentos do especialista certo: a uma questão jurídica, como o advogado Alexei; a uma financeira, como a contabilista Anna. Se quiser falar diretamente com eles, não vai ter de repetir nada: os assistentes da Linkeon partilham o mesmo perfil — o que conta a um, todos ficam a saber.',
    },
    {
      q: 'Posso enviar um ficheiro ou ditar?',
      a: 'Sim. O Roman lê PDF, folhas de cálculo e documentos por inteiro, e em vez de escrever pode ditar.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Quem vê as minhas conversas?',
      a: 'Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default roman;
