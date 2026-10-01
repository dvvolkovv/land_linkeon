import type { AssistantPageText } from '../../types';

/**
 * Кира — дизайн. Перевод pages/ru/kira.ts. Картинки делает сама, но только
 * растровые (PNG и JPEG): векторных файлов у неё не бывает. Вектор на этой
 * странице не обещать.
 *
 * Пример — разговор с прода 01.10.2026 (docs/assistant-pages/examples/kira.md),
 * картинка — копия в public/examples/.
 *
 * Картинка одна на все языки, и надпись на логотипе — по-русски («Тёплый хлеб»).
 * Поэтому в вопросе название — транслитерацией с переводом при первом
 * упоминании, как в английском тексте: «Tyoply Khleb» («Pão Quente»); alt
 * называет надпись так же и говорит, что она кириллицей. В «Чего не делает» к
 * совету взять текст у Екатерины добавлено «que escreve só em russo»: она пишет
 * только по-русски (бриф, п. 10), без оговорки страница отправляла бы к ней за
 * португальским текстом.
 */
const kira: AssistantPageText = {
  title: 'Designer com IA: logótipo e identidade visual — Kira | Linkeon',
  description:
    'A Kira é designer com IA. Cria o logótipo e a identidade visual, cartões de visita, banners ou apresentações e corrige imagens já feitas. Ficheiros PNG e JPEG, sem vetor.',
  h1: 'Kira — designer com IA: logótipo, identidade visual e maquetas',
  lead: 'A inauguração é daqui a uma semana e ainda não há letreiro, ementa nem folhetos. A Kira pergunta onde tudo isso vai estar e quem o vai ver, e mostra-lhe a maqueta em vez de a descrever por palavras.',
  card: 'Logótipos, identidade visual, cartões de visita, banners, apresentações. Faz maquetas e corrige imagens prontas, em PNG e JPEG.',
  cta: 'Falar com a Kira',
  situations: [
    'O logótipo foi desenhado há anos por um conhecido e quase não se vê em fundo escuro.',
    'O banner está quase pronto, mas é preciso tirar uma faixa, trocar o logótipo e passar o título para a esquerda.',
    'Precisa de dez capas para posts, e todas têm de parecer da mesma série.',
    'Amanhã tem uma palestra e os diapositivos foram montados a partir de três modelos diferentes.',
    'O letreiro já existe, e os cartões de visita, os folhetos e a placa de mesa têm de seguir o mesmo estilo.',
    'O designer enviou uma maqueta, há qualquer coisa de que não gosta, mas não consegue dizer o quê.',
  ],
  example: {
    question:
      'Faça um logótipo para a padaria «Tyoply Khleb» («Pão Quente»). Vai estar no letreiro e nos sacos de papel. Estilo caseiro e acolhedor, cores quentes em castanho e creme, símbolo — uma espiga. Mostre já uma versão em imagem, não é preciso perguntar nada.',
    answer: `Aqui está a primeira versão do logótipo:

Por cima do nome está a espiga. A letra é suave, com serifas; as cores são castanho-escuro, caramelo e creme. Tem poucos pormenores, para que o símbolo se leia tanto ao longe, no letreiro, como no saco de papel kraft.

O que precisa de saber antes de imprimir:
— Formato. Só faço ficheiros raster (PNG ou JPEG); um ficheiro vetorial não lhe consigo dar. Para o letreiro, quem o produz costuma pedir vetor, por isso o logótipo vai ter de ser redesenhado a partir desta maqueta. O mais simples é fazê-lo quando a versão estiver aprovada.
— Sacos. O papel kraft escurece as cores, e o creme quase não se vê nele. Para os sacos, é melhor uma versão monocromática: o logótipo em castanho-escuro, sem fundo.

Como próximo passo, posso fazer essa versão monocromática com fundo transparente ou uma versão horizontal para o letreiro, com a espiga à esquerda do nome. Qual lhe faz mais falta?`,
    image: {
      src: '/examples/kira-logo.webp',
      alt: 'Logótipo da padaria «Tyoply Khleb»: uma espiga por cima do nome, escrito em cirílico, a castanho e caramelo sobre fundo creme',
      width: 640,
      height: 640,
    },
  },
  can: [
    'Cria um logótipo de raiz ou melhora o seu, com versões para diferentes fundos e tamanhos.',
    'Monta a identidade visual — paleta, pares de tipos de letra, regras de uso do logótipo — e mantém-na em toda a série de materiais.',
    'Faz maquetas de cartões de visita, folhetos, brochuras, letreiros, placas e diplomas, banners e capas à medida de cada plataforma, e apresentações com um estilo coerente.',
    'Corrige uma imagem já feita em vez de a desenhar de novo: «passa mais para a esquerda», «tira a faixa», «troca o logótipo» — todas as alterações de uma vez, e o resto fica como estava.',
    'Analisa o design de outros: o que não funciona, porquê e o que corrigir primeiro.',
  ],
  cannot: [
    'Não faz vetor: nada de SVG, AI, EPS ou CDR, só PNG e JPEG, incluindo com fundo transparente. A Kira avisa logo à partida.',
    'Não garante que o ficheiro está pronto para impressão: a prova de cor, o CMYK e a sangria são verificados pela gráfica. A Kira diz-lhe o que perguntar à gráfica.',
    'Não copia logótipos alheios nem usa fotos e tipos de letra sem direito a isso. Se a licença não for clara, avisa.',
    'Não escreve o texto de venda para a maqueta: a formulação é melhor pedi-la à redatora Ekaterina, que escreve só em russo.',
  ],
  faq: [
    {
      q: 'Já temos um manual de marca. A Kira vai segui-lo?',
      a: 'Sim. Envie o manual em ficheiro ou o link do site — a Kira vai buscar lá as cores, os tipos de letra e o logótipo. Se a sua cor é um roxo, fica esse roxo, e não um «quase igual».',
    },
    {
      q: 'O que é preciso para imprimir?',
      a: 'Diga onde e em que tamanho a maqueta vai ser impressa. A Kira define as medidas em milímetros, aumenta a imagem se for preciso e diz-lhe o que verificar: legibilidade no tamanho real, contraste, margens.',
    },
    {
      q: 'Quanto custa?',
      a: 'Ao registar-se, recebe 25 000 tokens — não é preciso cartão bancário. Depois, há pacotes de tokens sem subscrição, e os tokens não expiram.',
    },
    {
      q: 'Em que é diferente de um chatbot comum?',
      a: 'Os assistentes da Linkeon partilham o mesmo perfil: o que conta a um, todos ficam a saber. Se a Ekaterina já sabe a que se dedica o seu negócio e quem são os seus clientes, não vai ter de o explicar outra vez à Kira.',
    },
  ],
};

export default kira;
