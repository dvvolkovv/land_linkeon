import type { AssistantPageText } from '../../types';

/**
 * Райя — дизайн человека. Перевод pages/ru/raya.ts. Одобренный образец:
 * docs/assistant-pages/samples-ru.md.
 *
 * Термины — как в португалоязычных материалах по Human Design: Manifestador,
 * Plexo Solar, Investigador / Mártir, portas, cruz de encarnação; само название
 * системы не переводится (так и в assistantPages.roles локали pt).
 */
const raya: AssistantPageText = {
  title: 'Human Design: leitura do bodygraph online — Raya | Linkeon',
  description:
    'A Raya calcula o seu Human Design pela data, hora e local de nascimento com a Swiss Ephemeris e explica o que significam o tipo, a estratégia, a autoridade e o perfil.',
  h1: 'Leitura de Human Design: a Raya calcula e interpreta o seu bodygraph',
  lead: 'São precisas a data, a hora exata e a cidade de nascimento. A Raya calcula o mapa com a Swiss Ephemeris e explica o que o seu tipo, a sua estratégia e a sua autoridade significam na prática.',
  card: 'Calcula o bodygraph pela data, hora e local de nascimento e explica o tipo, a estratégia e a autoridade.',
  cta: 'Falar com a Raya',
  situations: [
    'Ouviu falar de Human Design e quer saber o seu tipo e a sua estratégia.',
    'Já fez o mapa numa calculadora gratuita, mas não percebe o que significam os centros e os canais.',
    'Custa-lhe tomar decisões e quer perceber a sua autoridade — em que se apoiar quando escolhe.',
    'A hora de nascimento é aproximada e quer perceber o que isso altera.',
    'Quer analisar o mapa de um filho ou do seu parceiro.',
  ],
  example: {
    question: 'Calcule o meu Human Design: 14 de março de 1990, 07:30, Cazã. Qual é o meu tipo e a minha estratégia?',
    answer: `Calculei com a Swiss Ephemeris. Converti a hora para UTC assim: em março de 1990, Cazã estava na hora de inverno de Moscovo, UTC+3, por isso 07:30 hora local = 04:30 UTC.

O seu mapa

Tipo — Manifestador
Estratégia — Informar as pessoas afetadas pela sua decisão antes de agir
Autoridade — Emocional (Plexo Solar)
Perfil — 1/3: Investigador / Mártir

…

O que isto significa na prática
— Informar não é pedir autorização. É um breve «vou fazer X». Isso desfaz a resistência de quem está à volta, uma resistência com que os Manifestadores se deparam muitas vezes.
— Autoridade emocional: não decida no pico da emoção, nem em alta nem em baixa. A decisão certa chega quando a onda acalma. Ajuda a regra de «consultar a almofada».
…

Experiência de 7 dias
Antes de cada ação relevante, seja uma decisão de trabalho, uma compra ou uma conversa importante, informe brevemente as pessoas a quem diz respeito. Mas só depois de a emoção assentar, pelo menos no dia seguinte. À noite, registe quanta resistência e quanta raiva houve em comparação com o habitual.

Se já viu o seu mapa em jovianarchive.com ou mybodygraph.com, diga-me o que lá saiu e eu comparo.`,
  },
  can: [
    'Calcula o mapa com a Swiss Ephemeris, não «a olho»: converte a hora de nascimento para UTC tendo em conta o fuso horário e a hora de verão em vigor nesses anos.',
    'Explica o tipo, a estratégia, a autoridade, o perfil e a definição: que centros estão abertos, o que dão os canais-chave, para onde aponta a cruz de encarnação.',
    'Propõe uma experiência de sete dias com base na sua estratégia e autoridade.',
    'Se enviar o mapa do jovianarchive.com ou do mybodygraph.com, compara-o com o cálculo dela e diz-lhe abertamente se os resultados não coincidem.',
    'Analisa o mapa da pessoa por quem pergunta — o seu, o de um filho, o do parceiro — e não o confunde com outros.',
  ],
  cannot: [
    'Não prevê o destino nem acontecimentos: aqui o Human Design é uma ferramenta de autoconhecimento, não uma previsão.',
    'Não dá recomendações médicas nem financeiras e não substitui um médico, um advogado ou um consultor financeiro.',
    'Não inventa a hora de nascimento: se não a tiver, diz-lhe que não é possível calcular com precisão.',
  ],
  faq: [
    {
      q: 'O que é preciso para o cálculo?',
      a: 'A data, a hora exata e a cidade de nascimento. Uma diferença de apenas 15–30 minutos pode mudar o perfil e, às vezes, o tipo e a autoridade.',
    },
    {
      q: 'Isto é astrologia?',
      a: 'Não, embora o cálculo também se baseie na posição dos planetas. Aqui, essa posição é só o sistema de coordenadas; a interpretação faz-se através das 64 portas, dos 9 centros e dos 36 canais. A Raya trabalha na escola clássica de Ra Uru Hu.',
    },
    {
      q: 'Em que é diferente de uma calculadora ou de um chatbot comum?',
      a: 'Uma calculadora faz o mapa e dá descrições genéricas. A Raya analisa o seu mapa e propõe uma experiência com base na sua estratégia. E os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber.',
    },
    {
      q: 'E se eu tiver dúvidas sobre o Human Design?',
      a: 'A Raya não vai tentar convencê-lo. Propõe uma experiência de sete dias: testar a estratégia na prática e decidir por si.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
  ],
};

export default raya;
