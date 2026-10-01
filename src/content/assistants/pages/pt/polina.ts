import type { AssistantPageText } from '../../types';

/**
 * Полина — тренер по образу жизни: сон, питание, движение, восстановление.
 * Перевод pages/ru/polina.ts. Не врач — так сказано в её промпте. 112 в русском
 * тексте сверен в образце Оли (docs/assistant-pages/samples-ru.md, МЧС
 * «Система-112»).
 *
 * Пример — docs/assistant-pages/examples/polina.md, целиком; снят только жирный.
 *
 * В переводе номера нет (бриф, п. 8): «если есть угроза жизни» — местная
 * экстренная служба.
 */
const polina: AssistantPageText = {
  title: 'Melhorar o sono e a rotina: coach de estilo de vida — Polina | Linkeon',
  description:
    'A Polina é coach de estilo de vida. Ajuda a pôr em ordem o sono, a alimentação e o exercício numa semana cheia: uma pequena mudança de cada vez, sem dietas nem ginásio.',
  h1: 'Como melhorar o sono e a rotina: Polina, coach de estilo de vida',
  lead: 'Sono, alimentação, movimento e descanso — à medida de uma semana normal e cheia, não de um horário ideal. A Polina propõe uma pequena mudança e, logo a seguir, a versão dela para um dia mau.',
  card: 'Sono, alimentação, movimento e descanso numa semana cheia. Uma pequena mudança de cada vez — e a versão dela para um dia mau.',
  cta: 'Falar com a Polina',
  situations: [
    'Deita-se depois da meia-noite, levanta-se às sete e à hora de almoço já não tem energia.',
    'Durante o dia come a correr e, à noite, o que houver no frigorífico.',
    'Quer mexer-se mais, mas para o ginásio não tem nem tempo nem energia.',
    'Todas as segundas-feiras começa uma vida nova, e à quinta já não sobra nada dela.',
    'Um prazo apertado, uma mudança de casa ou a doença de alguém próximo — e a rotina de sempre desfez-se.',
  ],
  example: {
    question: 'Deito-me à uma da manhã, levanto-me às sete e ando o dia todo estafada. Por onde começo?',
    answer: `Parece-me que simplesmente não está a dormir o suficiente: da uma da manhã às sete são cerca de seis horas. Para muita gente é pouco, e o cansaço à hora de almoço confirma-o. Vamos começar por uma única mudança.

Deitar-se 15 minutos mais cedo, às 0:45. O despertador fica nas sete. Não mexemos na hora de levantar: uma manhã estável segura a rotina toda. Só mexemos na hora de deitar. Quando uma semana correr bem, adianta mais 15 minutos.

Para isto resultar, é preciso um sinal de «vamos encerrar». Ponha um alarme para as 0:30 com o nome «apagar». Quando tocar, baixe as luzes e arrume o portátil. O telemóvel pode ficar, mas só na cama.

Se o dia for mau (ficou a trabalhar até tarde, não chegou a tudo, apetece-lhe «viver um bocadinho para si»), deite-se simplesmente às 0:45, mesmo com coisas por fazer. Não precisa de fazer melhor do que isso. Se falhar, de manhã não se compensa nada: acorda-se à hora de sempre.

Como saber se está a resultar. Ao fim de uma semana, veja se ficou mais fácil levantar-se pelo menos dia sim, dia não, e se a tarde custa menos. Se não houver diferença nenhuma, procuramos outra coisa.

Hoje à noite, ponha o alarme «apagar» para as 0:30.

O que costuma mantê-la acordada até à uma: tarefas, trabalho, ou é o único tempo que tem para si?`,
  },
  can: [
    'Sono: horários, adormecer, acordar cedo demais, trabalho por turnos, recuperar de noites mal dormidas.',
    'Alimentação como rotina, não como dieta: regularidade, composição do prato, lanches, água, comer a correr.',
    'Movimento sem ginásio: a dose mais pequena que resulta e o regresso depois de uma longa pausa.',
    'Energia: o cansaço a meio do dia, o «não tenho forças para nada» ao fim do dia, a rotina em fases difíceis.',
    'Propõe uma mudança, não uma lista, e um sinal que, ao fim de uma semana, mostra se está a resultar.',
    'Analisa um plano de treino ou recomendações que envie em ficheiro, sem contrariar o especialista que o acompanha.',
  ],
  cannot: [
    'Não é médica e di-lo ela própria: não faz diagnósticos, não receita nem suspende medicamentos, não interpreta análises.',
    'Não dá recomendações em caso de gravidez, perturbações do comportamento alimentar, diabetes, doenças do coração, dos rins ou do aparelho digestivo — explica porque é que aí é preciso um médico.',
    'Não discute rotinas quando há sinais de alarme: dor no peito, desmaios, perda de peso sem explicação, sangue, insónia há meses. Nesses casos, vá logo ao médico; se houver perigo de vida, contacte o serviço de emergência local.',
    'Não aconselha suplementos alimentares de nenhum tipo.',
  ],
  faq: [
    {
      q: 'Porquê uma mudança e não um plano para o mês?',
      a: 'Um hábito que depende da força de vontade raramente chega ao fim do mês. O que resulta é o que cabe num dia mau. Se um passo falhar, a Polina não lhe dá sermões: procura perceber o que exatamente não resultou.',
    },
    {
      q: 'Por onde começa a Polina?',
      a: 'Pelo que mais atrapalha e pelos seus limites: a que horas se levanta e se deita, quanto tempo tem, o que já experimentou. Para ela, o sono é a base: enquanto não estiver resolvido, falar de alimentação e de desporto serve de pouco.',
    },
    {
      q: 'A Polina ajuda a emagrecer?',
      a: 'Não promete resultados, quilos nem prazos, e não define limites de calorias. O trabalho dela é uma rotina que aguente uma semana cheia. Segundo as regras dela, a saúde não se mede pelo peso.',
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

export default polina;
