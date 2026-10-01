import type { AssistantPageText } from '../../types';

/** Александра — маркетолог. Перевод pages/ru/alexandra.ts. Пример разговора — docs/assistant-pages/examples/alexandra.md. */
const alexandra: AssistantPageText = {
  title: 'Marketing com IA e análise da concorrência — Alexandra | Linkeon',
  description:
    'A Alexandra é uma assistente de marketing com IA: dados recentes do mercado e da concorrência, posicionamento, publicidade, conteúdo — e o que medir e quando esperar resultados.',
  h1: 'Alexandra — assistente de marketing com IA: análise da concorrência e plano de divulgação',
  lead: 'A publicidade come o orçamento e os pedidos de contacto não aumentam. A Alexandra começa por perguntar o que vende e a quem, procura dados recentes do mercado e da concorrência e propõe passos com resultados que se podem medir.',
  card: 'Mercado e concorrência com dados recentes, posicionamento, publicidade, conteúdo. Diz o que medir e quando esperar resultados.',
  cta: 'Falar com a Alexandra',
  situations: [
    'Vai abrir um estúdio ou uma loja e quer perceber como se distinguir da concorrência da rua ao lado.',
    'Os clientes só chegam por recomendação e não sabe por que publicidade começar.',
    'Mantém as redes sociais, mas os posts não trazem um único pedido de contacto.',
    'Está a lançar um produto novo e a escolher o nome e o tom com que falar dele.',
    'Quer perceber o que se passa agora no seu nicho: preços, tendências, que concorrentes estão a crescer e à custa de quê.',
  ],
  example: {
    question: 'Tenho um estúdio de manicure num bairro residencial. Como atraio clientes novos sem um grande orçamento?',
    answer: `Aqui é a Alexandra. Num bairro residencial, quase todos os clientes vivem a 10–15 minutos de si. Por isso, é melhor investir o orçamento não em publicidade alargada, mas na visibilidade perto de casa e em conseguir que as clientes tragam as amigas.

1. Mapas: o fluxo de clientes mais barato
— Yandex Maps e 2GIS (os serviços de mapas mais usados na Rússia). Preencha a ficha a 100%: fotos dos trabalhos e do espaço, tabela de preços, marcação online, horário. É aí que se procura «manicure perto de mim».
— Avaliações. Depois de cada serviço, envie à cliente o link para deixar uma avaliação; pode também pôr um código QR no balcão. …

2. Comunidades locais
— Os grupos de Telegram e WhatsApp dos condomínios e dos prédios, os grupos do bairro no VKontakte (a rede social russa). Nada de spam. Faça uma oferta útil «para os vizinhos»: por exemplo, 15% de desconto na primeira visita com uma palavra-código. A palavra-código mostra também de onde veio a cliente.
…

4. O passa-palavra como sistema
— Programa de recomendação «Traga uma amiga». As duas recebem 500 ₽ cada para a próxima visita.
…

O que medir
Pergunte a cada cliente nova como soube de si e, uma vez por mês, veja:
— quantos clientes novos vieram de cada canal;
— que parte volta (o normal é a partir de 60%);
— quanto custa cada cliente novo.

O que dá resultado mais depressa: normalmente, em 1–2 meses, o efeito mais visível vem dos mapas com avaliações, dos grupos do bairro e do programa de recomendação.

Para afinar o plano, diga-me: que cidade e que bairro, quantos profissionais tem, qual é o valor médio por serviço e quantos clientes tem agora por mês. Aí monto um plano passo a passo para o mês e vejo o que faz a concorrência perto de si.`,
  },
  can: [
    'Analisa o mercado e a concorrência com dados recentes: procura na internet números, tendências e casos atuais, em vez de repetir informação desatualizada.',
    'Ajuda no posicionamento e na proposta única de valor: em que se distingue e porque é que devem escolhê-lo a si.',
    'Define a estratégia de conteúdo e o funil: redes sociais, blogue, newsletters, vídeo e o percurso do cliente desde o primeiro contacto até à compra.',
    'Analisa os anúncios segmentados nas redes sociais e nos motores de pesquisa, e as métricas: custo de aquisição de cliente, LTV, ROAS, conversões.',
    'Trabalha a marca: nome, tom de voz, estilo visual. Propõe mecânicas de crescimento viral.',
    'Dá passos concretos com resultados mensuráveis: o que fazer, como medir e quando esperar efeito.',
  ],
  cannot: [
    'Não lança campanhas publicitárias nem gere o orçamento de publicidade — isso cabe-lhe a si ou à agência que contratar.',
    'Não garante pedidos nem vendas: o resultado depende do produto, do preço e da execução. A Alexandra diz-lhe o que medir para perceber a tempo se um canal está a funcionar.',
    'Não elogia uma ideia fraca por delicadeza: aponta os pontos fracos com tato, mas com honestidade.',
  ],
  faq: [
    {
      q: 'Onde vai a Alexandra buscar os dados de mercado?',
      a: 'Para analisar o mercado, a concorrência e as tendências, procura dados recentes na internet, em vez de se basear no que o modelo sabia quando foi treinado.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se a Alexandra já sabe a que se dedica e para quem, não vai ter de o explicar outra vez à redatora Ekaterina.',
    },
    {
      q: 'Quem vê as minhas conversas?',
      a: 'Não vendemos as suas conversas nem as usamos para publicidade. O processamento é feito pelos fornecedores de IA.',
    },
  ],
};

export default alexandra;
