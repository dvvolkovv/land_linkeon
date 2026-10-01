import type { AssistantPageText } from '../../types';

/** Алексей — юрист. Перевод pages/ru/alexey.ts. Одобренный образец: docs/assistant-pages/samples-ru.md. */
const alexey: AssistantPageText = {
  title: 'Advogado online com IA e revisão de contratos — Alexei | Linkeon',
  description:
    'O Alexei é um advogado online com IA. Revê o seu contrato e explica, à luz da lei, o que fazer num arrendamento, despedimento, divórcio ou herança. 25 000 tokens no registo.',
  h1: 'Alexei — advogado online com IA: revisão de contratos e questões jurídicas',
  lead: 'É tarde, o contrato é para assinar amanhã e não há a quem perguntar. O Alexei explica por palavras simples onde estão os riscos e o que diz a lei sobre isso.',
  card: 'Contratos, arrendamento, trabalho, família, heranças. Explica a lei por palavras simples e diz o que fazer, passo a passo.',
  cta: 'Falar com o Alexei',
  situations: [
    'Um prestador de serviços mandou o contrato e não percebe o que lhe pode custar a cláusula penal.',
    'Propõem-lhe sair «por mútuo acordo», e o salário do mês passado continua por pagar.',
    'A loja não devolve o dinheiro de um aparelho que avariou ao fim de uma semana.',
    'Recebeu uma herança com dívidas e não sabe se a deve aceitar ou repudiar.',
    'Um sócio quer sair da sociedade por quotas e exige a sua parte em dinheiro.',
  ],
  example: {
    question:
      'O senhorio quer rescindir antes do prazo o contrato de arrendamento do apartamento e não devolver a caução. O que posso fazer?',
    answer: `Olá! Sou o Alexei. Em resumo: o senhorio não pode simplesmente pô-lo fora antes do prazo e ficar com a caução. Muito depende do texto do contrato.

1. O senhorio pode rescindir antes do prazo?

Se arrenda o apartamento como particular, trata-se de um contrato de arrendamento para habitação (arts. 671–688 do Código Civil russo).

— Unilateralmente não pode, a menos que o contrato o permita de forma expressa (art. 310 do Código Civil russo).
…
— Se não houver fundamento, tem o direito de viver no apartamento até ao fim do prazo.

2. A caução (pagamento de garantia)

A caução é devolvida se não houver rendas em dívida nem danos no apartamento (art. 381.1 do Código Civil russo). … Se é o senhorio quem rescinde o contrato, regra geral não há fundamento para ficar com a caução. …

3. O que fazer

1. Releia o contrato. Procure o prazo, a cláusula sobre rescisão antecipada e as condições de devolução da caução.
2. Não assine nada nem saia «a bem» enquanto não decidir em que condições.
3. Comunique por escrito, por mensagem ou por e-mail. Guarde as mensagens e os comprovativos de pagamento.
…
5. Envie uma reclamação por carta registada com descrição do conteúdo. Nela, exija a devolução da caução (e, se quiser, o reembolso das despesas de mudança) num prazo, por exemplo, de 10 dias.
6. Se não responder, avance com uma ação em tribunal. …

…

Para lhe dizer com mais precisão, responda a algumas perguntas:
— Por que prazo foi celebrado o contrato e tem alguma cláusula sobre rescisão antecipada?
— O que diz o contrato sobre a caução?
— Que motivo dá o senhorio para a rescisão?
— Precisa de um modelo de reclamação? Posso redigi-lo.`,
  },
  can: [
    'Revê e redige contratos: encontra as cláusulas de risco e explica como rescindir um contrato já assinado.',
    'Ajuda em litígios com uma loja ou um prestador de serviços: o que exigir e como obter uma compensação.',
    'Trata de questões de habitação: arrendamento, compra e doação de casa, litígios com o promotor numa compra em planta, registo da propriedade.',
    'Responde sobre trabalho, família e heranças: despedimento e salários em atraso, divórcio e partilha de bens, pensão de alimentos, herança com dívidas.',
    'Ajuda empresários: abertura e encerramento de atividade em nome individual ou de uma sociedade por quotas, estatutos, saída de um sócio, contratos com clientes e fornecedores.',
    'Cita os artigos concretos dos códigos russos — Civil, do Trabalho, da Família — e organiza tudo por passos: o que fazer, por que ordem, que documentos são precisos.',
  ],
  cannot: [
    'Não o representa em tribunal nem entrega documentos em seu nome. O Alexei é um consultor: as respostas dele têm caráter informativo.',
    'Não substitui um advogado num caso complexo, sobretudo em matéria penal. Se não for possível passar sem um jurista ou um advogado presencial, o Alexei di-lo abertamente.',
    'Não ensina a contornar a lei.',
  ],
  faq: [
    {
      q: 'O Alexei responde segundo a lei de que país?',
      a: 'À partida, segundo a lei russa: o Código Civil, o Código do Trabalho, o Código da Família da Rússia e outros. Se a sua questão diz respeito a outro país, indique-o — o Alexei tem-no em conta.',
    },
    {
      q: 'Posso enviar o contrato em ficheiro?',
      a: 'Sim, em PDF ou como documento. O ficheiro é lido por inteiro, e o Alexei percorre-o cláusula a cláusula e mostra onde estão os riscos.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se a contabilista Anna já sabe que trabalha como empresário em nome individual, não vai ter de o explicar outra vez ao Alexei.',
    },
    {
      q: 'Quem vê as minhas conversas?',
      a: 'Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default alexey;
