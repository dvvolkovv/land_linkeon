# Глоссарий Human Design на шести языках

Для калькулятора бодиграфа (`src/content/hd/texts/<код>.ts`): переводчик и вычитчик берут каждый термин ровно как здесь, во всех полях. План — `docs/superpowers/plans/2026-10-14-hd-calculator-languages.md` (Task 8–10); русские названия — таблица «Что / Названия» плана `2026-10-08-human-design-calculator.md`.

## Решения владельца (СТОП 1, 14.10.2026)

Важнее таблиц ниже; ячейки таблиц, изменённые по этим решениям, помечены «решение владельца 14.10».

1. **Каналы — название, устоявшееся в языке; грубое для широкой публики смягчается вариантом ближе к русскому.**
   - 6-59 «Близость»: en Intimacy, es Intimidad, de Nähe, fr Intimité, pt Intimidade, zh 亲密的通道.
   - 26-44 «Передача»: где устоявшееся читается как «капитуляция» — «передача»: es Transmisión, pt A transmissão, zh 传递的通道. Остаются en Surrender, de Hingebung, fr Transmission.
   - 7-31 в немецком — Das Alpha (не Das Alphatier: в быту «доминирующий человек»).
   - Остальные каналы — как в таблицах, в том числе свои китайские названия (7-31, 13-33, 16-48, 18-58, 30-41).
2. **Стратегии — как принято в языке:** en/es/de/fr — коротко (To respond, Responder, Reagieren, Répondre); pt и zh — «ждать отклика» (Esperar para responder, 等待回应).
3. **Открытые центры — «открытые», как на страницах Райи:** open, abierto, offen, ouvert, aberto (не indefinido), 开放的中心.
4. **Название метода — как на странице Райи этого языка:** es — Diseño Humano во всех полях (и подвал `src/i18n/locales/es.json`: «Calculadora de Human Design» → «Calculadora de Diseño Humano»); zh — 人类图; en, de, fr, pt — Human Design латиницей. Местное поисковое слово — один раз в `description`: fr «design humain», pt «Desenho Humano»; es — «carta de Diseño Humano» в `title` или `description`; de — «Human Design Rechner» раздельно в `title`, `description`, H1.
5. **Остальные сомнения — по рекомендациям составителей** (выбор в колонке языка): en — британское написание (centre, Judgement), Split definition без «(double)», Mental (Environmental); de — Reagieren, Eremit, Der Beat, Geistesblitz, offen; fr — мужской род названий типов и линий, Pulsation, Puissance, Transitoire; pt — Desenho (красная сторона), Gerador Manifestante, Bipartida, Modelo; zh — 人类图 и для бодиграфа, авторитеты без скобок с центром, 环境权威.
6. **По вычитке (14.10):** zh — «G 中心» с пробелом (правило сайта: пробел между латиницей и иероглифами), в таблицах ниже — слитно; de — хлебные крошки «Human-Design-Rechner», как подвал `de.json`; раздельное «Human Design Rechner» — только в `title`, `description`, H1.


## Глоссарий Human Design — английский (en)

Для переводчика `src/content/hd/texts/en.ts` и вычитчика. Источники: таблица «Что / Названия» в разделе «Правила текстов» плана `2026-10-08-human-design-calculator.md` и `src/content/hd/texts/ru.ts`. Статус — на утверждение владельцу (СТОП 1), до перевода.

### Общие правила написания

- **Вариант английского — британский**, как весь английский сайт: страница Райи `pages/en/raya.ts` (centres, sceptical, analyse), даты в черновике Райе — `en-GB` («12 March 1990»). Отсюда **centre**, **Judgement**. См. сомнение 1.
- **С заглавной** — собственные имена системы: типы (Generator, Manifesting Generator — оба слова), центры (Sacral Centre, Solar Plexus, G Centre), каналы (The Beat), линии профиля (Investigator), авторитет в заголовке строки (Emotional (Solar Plexus)). **Со строчной** — родовые слова: type, strategy, authority, profile, line, definition, defined, open, centre, channel, gate, chart, bodygraph, incarnation cross. Так уже написана страница Райи. Заглавные на каждом термине (Type, Authority, Defined Center), как в части англоязычной литературы HD, не используем.
- **Значения в строках результата** (стратегия, определённость) — с заглавной только первая буква, как в русском: «To respond», «Split definition».
- **Описания центров и каналов** идут после «Название —» и начинаются со строчной: «**Inspiration** — connects the G Centre to the Throat Centre: …».
- **В прозе центры — полными именами** («the Sacral Centre», «the Throat Centre»). Короткие «the Sacral», «the Throat» в англоязычной литературе HD встречаются, но на странице для неподготовленного читателя не нужны.

### 1. Общие термины

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| humanDesign | Human Design | Human Design | исходное английское название метода: латиницей, две заглавные, без перевода; сокращение HD в текстах страницы не используем | — |
| bodygraph | бодиграф | bodygraph | общее слово англоязычной литературы HD и калькуляторов; слитно и строчными, как на странице Райи | написание BodyGraph — фирменное у отдельных сервисов, не берём |
| chart | карта («карта считается в браузере», «карты близких») | chart (Human Design chart) | так по-английски называют рассчитанную схему; «map» не говорят | — |
| type | тип (`result.typeLabel`) | type / Type | канон | — |
| strategy | стратегия (`result.strategyLabel`) | strategy / Strategy | канон | — |
| authority | авторитет (`result.authorityLabel`) | authority / Authority | канон; так на странице Райи («Authority — Emotional (Solar Plexus)») | полная форма Inner Authority в подписи строки лишняя, в прозе допустима |
| profile | профиль (`result.profileLabel`) | profile / Profile | канон | — |
| line | линия профиля | line (profile line); в прозе «the first line» … «the sixth line» | канон: профиль складывается из двух линий | пишут и цифрами («1st line», «Line 1»); в прозе — словами, как в русском |
| definition | определённость (`result.definitionLabel`) | definition / Definition | канон (Single Definition, Split Definition…) | — |
| centre | центр | centre, мн. centres | канон — center; британское написание — под весь английский сайт | center — сомнение 1 |
| definedCentre | определённый центр (`result.definedCenters`) | defined centre; подпись — «Defined centres» | канон | — |
| openCentre | открытый центр (`result.openCenters`) | open centre; подпись — «Open centres» | так в популярной англоязычной литературе и на странице Райи («which centres are open») | строгая терминология различает undefined (есть отдельные ворота) и open (ворот нет); калькулятор зовёт open все неопределённые — как русский текст |
| channel | канал (`result.channels`) | channel; подпись — «Channels» | канон | — |
| gate | ворота | gate, мн. gates («64 gates», «Gate 34») | канон | — |
| personality | Личность (легенда схемы, чёрное) | Personality | канон: чёрная, сознательная сторона схемы | — |
| design | Дизайн (легенда схемы, красное) | Design | канон: красная, бессознательная сторона схемы | — |
| legendPersonality | Личность — момент рождения | Personality — the moment of birth | Personality считается на момент рождения — канон | — |
| legendDesign | Дизайн — примерно за 88 дней до рождения | Design — about 88 days before birth | в англоязычной литературе HD — 88° хода Солнца, «roughly 88 days / about three months» до рождения | — |
| incarnationCross | инкарнационный крест | incarnation cross | канон (в литературе часто Incarnation Cross); в прозе строчными, как на странице Райи | — |

### 2. Типы и стратегии

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| generator | Генератор / «Откликаться» | Generator / To respond | канон: стратегия Генератора — «To Respond» | Wait to respond — сомнение 2 |
| manifestingGenerator | Манифестирующий генератор / «Откликаться, затем информировать» | Manifesting Generator / To respond, then inform | в англоязычной литературе — «respond, then inform»; оба слова типа с заглавной | сокращение MG на странице не используем; Wait to respond, then inform — сомнение 2 |
| manifestor | Манифестор / «Информировать» | Manifestor / To inform | канон «To Inform»; глагол именно inform, не notify и не tell | — |
| projector | Проектор / «Ждать приглашения» | Projector / Wait for the invitation | канон «Wait for the Invitation» | — |
| reflector | Рефлектор / «Ждать лунный цикл — около 28 дней» | Reflector / Wait a lunar cycle — about 28 days | канон «Wait a Lunar Cycle», 28 дней — общепринятое пояснение | lunar month тоже встречается; cycle — каноничнее |

Связанные слова из описаний типов: отклик — response; информировать — inform; приглашение — invitation; лунный цикл — lunar cycle.

### 3. Авторитеты

| код | по-русски: name / inMessage | на английском: name / inMessage | обоснование | сомнение |
|---|---|---|---|---|
| emotional | Эмоциональный (солнечное сплетение) / эмоциональный авторитет | Emotional (Solar Plexus) / emotional authority | канон «Emotional – Solar Plexus»; ровно так уже на странице Райи | Solar Plexus authority — тоже встречается |
| sacral | Сакральный / сакральный авторитет | Sacral / sacral authority | канон | — |
| splenic | Селезёночный / селезёночный авторитет | Splenic / splenic authority | канон; прилагательное Splenic (центр — Spleen Centre) | — |
| ego | Эго (сердечный центр) / авторитет эго | Ego (Heart Centre) / ego authority | канон Ego Authority, центр — Heart / Ego | в литературе делится на Ego Manifested (у Манифестора) и Ego Projected (у Проектора); у нас один авторитет — как в русском; Heart authority тоже встречается |
| selfProjected | Самопроецированный / самопроецированный авторитет | Self-Projected / self-projected authority | канон; через дефис | Self Projected без дефиса — встречается на схемах, но по-английски правильнее с дефисом |
| mental | Ментальный (через окружение) / ментальный авторитет | Mental (Environmental) / mental authority | в англоязычной литературе — Mental, он же Environmental (Environment) authority; «через окружение» передаётся прямо | Mental (Sounding Board) — тоже устоялось; Outer Authority / No Inner Authority — так в части школ, но звучит как «авторитета нет» |
| lunar | Лунный / лунный авторитет | Lunar / lunar authority | канон | — |

**inMessage** — всегда строчными и без артикля: «emotional authority», «ego authority». В шаблоне сообщения `{authority}` должен стоять как существительное с определением, а не после «my authority is…»: «My authority is ego» звучит плохо.

Как это звучит (сообщение Райе — от первого лица, к Райе на «you», имя Raya):

- Фраза из брифа «Мой тип — Проектор, профиль 2/4, авторитет — эмоциональный» → **«My type is Projector, my profile is 2/4 and my authority is emotional.»** (то же коротко: «I'm a Projector with a 2/4 profile and emotional authority.»)
- Шаблон калькулятора «Калькулятор показал: {type}, профиль {profile}, {authority}.» → **«The calculator showed: Projector, profile 2/4, emotional authority.»**; с другими авторитетами: «…, profile 2/4, ego authority.», «…, profile 2/4, self-projected authority.», «The calculator showed: Manifesting Generator, profile 2/4, sacral authority.»

### 4. Линии профиля

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| line1 | 1 Исследователь | Investigator | канон | — |
| line2 | 2 Отшельник | Hermit | канон | — |
| line3 | 3 Мученик | Martyr | канон | часть современных авторов смягчает до Experimenter — не берём, не канон |
| line4 | 4 Оппортунист | Opportunist | канон | — |
| line5 | 5 Еретик | Heretic | канон | — |
| line6 | 6 Ролевая модель | Role Model | канон; оба слова с заглавной | — |
| sixthLinePhases | три этапа шестой линии | three phases (of the sixth line) | так в англоязычной литературе описывают жизнь 6-й линии | three stages — допустимо в прозе |
| format | 1/3 · Исследователь / Мученик | 1/3 · Investigator / Martyr | порядок «номера · линия / линия» — как в русском; пробелы вокруг «/» — как на странице Райи («1/3: Investigator / Martyr») | — |

Все 12 названий (`profiles.*.name`): 1/3 Investigator / Martyr; 1/4 Investigator / Opportunist; 2/4 Hermit / Opportunist; 2/5 Hermit / Heretic; 3/5 Martyr / Heretic; 3/6 Martyr / Role Model; 4/6 Opportunist / Role Model; 4/1 Opportunist / Investigator; 5/1 Heretic / Investigator; 5/2 Heretic / Hermit; 6/2 Role Model / Hermit; 6/3 Role Model / Martyr.

### 5. Определённость

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| none | Нет определённости | No definition | канон No Definition (только у Рефлектора) | — |
| single | Одинарная | Single definition | канон Single Definition | — |
| split | Расщеплённая (двойная) | Split definition | канон Split Definition: две группы центров | «(double)» не добавляем — в английском не устоялось и не нужно рядом с Triple split; сомнение 4 |
| triple | Тройная | Triple split definition | канон Triple Split Definition | — |
| quadruple | Четверная | Quadruple split definition | канон Quadruple Split Definition | — |

Значение в строке результата — полным термином («Definition — Single definition»): именно эти сочетания читатель найдёт в англоязычной литературе; короткое «Single» без слова definition не узнаётся.

### 6. Центры

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| head | Теменной центр | Head Centre | канон Head Center | Crown — в части источников; не берём |
| ajna | Аджна | Ajna | канон Ajna (Center); без «Centre» — как в русском | Ajna Centre допустимо в прозе |
| throat | Горловой центр | Throat Centre | канон | — |
| g | Центр G (идентичность) | G Centre (Identity) | канон G Center, второе название Identity Center | Self Centre — тоже встречается |
| heart | Сердечный центр (эго) | Heart Centre (Ego) | канон Heart / Ego Center | Will Centre — тоже встречается |
| spleen | Селезёночный центр | Spleen Centre | канон Spleen Center; прилагательное Splenic — для авторитета | Splenic Centre — тоже встречается |
| solarPlexus | Солнечное сплетение | Solar Plexus | канон Solar Plexus (Center), он же emotional centre; без «Centre» — как в русском | Solar Plexus Centre допустимо в прозе |
| sacral | Сакральный центр | Sacral Centre | канон | — |
| root | Корневой центр | Root Centre | канон | — |

### 7. Каналы

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| 1-8 | Вдохновение | Inspiration | канон; совпадает с русской таблицей | — |
| 2-14 | Пульс | The Beat | канон, с артиклем; совпадает с русской таблицей | — |
| 3-60 | Мутация | Mutation | канон; совпадает с русской таблицей | — |
| 4-63 | Логика | Logic | канон; совпадает с русской таблицей | — |
| 5-15 | Ритм | Rhythm | канон; совпадает с русской таблицей | — |
| 6-59 | Близость | Intimacy | мягкий вариант — **решение владельца 14.10** (Mating — канон, но звучит как «спаривание») | Intimacy — сомнение 3 |
| 7-31 | Альфа | The Alpha | канон, с артиклем; совпадает с русской таблицей | — |
| 9-52 | Концентрация | Concentration | канон; совпадает с русской таблицей | — |
| 10-20 | Пробуждение | Awakening | канон; совпадает с русской таблицей | — |
| 10-34 | Исследование | Exploration | канон; совпадает с русской таблицей | — |
| 10-57 | Совершенная форма | Perfected Form | канон; совпадает с русской таблицей | — |
| 11-56 | Любопытство | Curiosity | канон; совпадает с русской таблицей | — |
| 12-22 | Открытость | Openness | канон; совпадает с русской таблицей | — |
| 13-33 | Блудный сын | The Prodigal | канон, без «Son»; совпадает с русской таблицей | — |
| 16-48 | Длина волны | The Wavelength | слитно — в современных англоязычных перечнях каналов; совпадает с русской таблицей | The Wave Length — старое раздельное написание |
| 17-62 | Принятие | Acceptance | канон; совпадает с русской таблицей | — |
| 18-58 | Суждение | Judgement | так в англоязычных перечнях каналов и в русской таблице; британское написание | Judgment — американское; см. сомнение 1 |
| 19-49 | Синтез | Synthesis | канон; совпадает с русской таблицей | — |
| 20-34 | Харизма | Charisma | канон; совпадает с русской таблицей | — |
| 20-57 | Мозговая волна | The Brainwave | слитно — в современных англоязычных перечнях; совпадает с русской таблицей | The Brain Wave — старое раздельное написание |
| 21-45 | Деньги | The Money Line | так в англоязычных перечнях каналов; совпадает с русской таблицей | Money (Channel of Money) — тоже встречается |
| 23-43 | Структурирование | Structuring | канон; совпадает с русской таблицей | — |
| 24-61 | Осознанность | Awareness | канон; совпадает с русской таблицей | — |
| 25-51 | Инициация | Initiation | канон; совпадает с русской таблицей | — |
| 26-44 | Передача | Surrender | канон; совпадает с русской таблицей | русское «Передача» взято от ключевой фразы канала (a transmitter); название канала по-английски — Surrender, Transmission не изобретать |
| 27-50 | Сохранение | Preservation | канон; совпадает с русской таблицей | — |
| 28-38 | Борьба | Struggle | канон; совпадает с русской таблицей | — |
| 29-46 | Открытие | Discovery | канон; совпадает с русской таблицей | — |
| 30-41 | Узнавание | Recognition | канон; совпадает с русской таблицей | — |
| 32-54 | Трансформация | Transformation | канон; совпадает с русской таблицей | — |
| 34-57 | Сила | Power | канон; совпадает с русской таблицей | — |
| 35-36 | Преходящесть | Transitoriness | канон; совпадает с русской таблицей | — |
| 37-40 | Сообщество | Community | канон; совпадает с русской таблицей | — |
| 39-55 | Эмоциональность | Emoting | канон; совпадает с русской таблицей | не Emotionality — такого названия нет |
| 42-53 | Созревание | Maturation | канон; совпадает с русской таблицей | — |
| 47-64 | Абстракция | Abstraction | канон; совпадает с русской таблицей | — |

### Сквозные слова из текстов

| код | по-русски | на английском | обоснование | сомнение |
|---|---|---|---|---|
| response | отклик, «дело, выбранное по отклику» | response; «chosen in response», «Sacral response» | канон: Генератор отвечает на то, что приходит извне | gut response — разговорный синоним, допустим в прозе |
| sacralSounds | «ага» / «не-а» | “uh-huh” / “uhn-uhn” | так эти звуки сакрального отклика передают в англоязычной литературе HD | “uh-uh” — встречается |
| emotionalWave | волна чувств, «волна улеглась» | emotional wave, «once the wave has settled» | канон; так на странице Райи | — |
| clarity | ясность | clarity | канон (emotional clarity) | — |
| sleepOnIt | «переспать» | sleep on it | так на странице Райи | — |
| lunarNode | лунный узел | lunar node; North Node / South Node | канон | — |
| trueNode | истинный / средний узел | true node / mean node | общепринятые астрономические термины в настройках калькуляторов HD | не average node |
| experiment | эксперимент на 7 дней | 7-day experiment / seven-day experiment | так на странице Райи; «experiment» — канон HD | — |
| utcOffset | смещение от UTC | UTC offset | так на странице Райи («converted the time to UTC») | — |
| dst | летнее время, перевод стрелок | daylight saving time; clocks went forward / back | так на странице Райи | summer time — британское бытовое, но в часовых поясах привычнее DST |
| selfDiscovery | самопознание (оговорка) | self-discovery: «Human Design is a tool for self-discovery, not a forecast» | так на странице Райи | — |

### Сомнения

1. **Британское или американское написание.** Выбрано британское — centre, Judgement, — как весь английский сайт (страница Райи: centres, colour, analyse) и даты `en-GB` в черновике Райе. Американское center / Judgment — то, на чём написана большая часть англоязычной литературы HD и чем ищут («human design centers»). Решение одно на весь `en.ts` (colour, recognise и т. д.).
2. **Стратегия Генератора и Манифестирующего генератора.** Выбрано «To respond» / «To respond, then inform» — канон и ближе к русскому «Откликаться». Альтернатива — «Wait to respond» / «Wait to respond, then inform»: самая частая форма в популярных англоязычных источниках, подчёркивает ожидание.
3. **Канал 6-59: Mating или Intimacy.** Mating — канон и стоит в русской сверочной таблице, но по-английски это прямо «спаривание»: на странице самопознания для широкой публики звучит резко, а описание канала говорит о сближении и доверии. Intimacy — название части англоязычных школ, совпадает с русским «Близость» и с текстом.
4. **«Расщеплённая (двойная)» → «Split definition» без пояснения в скобках.** На СТОП 1 по русскому тексту вы утвердили скобку «(двойная)». По-английски «double» здесь не устоялось и не нужно: Split definition однозначно, рядом стоят Triple split и Quadruple split. Подтвердите, что в английском скобки нет.


## Глоссарий Human Design — испанский (es)

Для переводчика и вычитчика калькулятора (`src/content/hd/texts/es.ts`). Каждый термин — ровно так, как в колонке «на испанском», во всех полях. Черновик до утверждения владельцем (СТОП 1).

Сверялся: страница Райи на сайте (`src/content/assistants/pages/es/raya.ts`), `src/i18n/locales/es.json`, тест ценностей es (`src/content/values/texts/es.ts`); испаноязычные справочники и школы — словарь и блог micartadisenohumano.com, amirarse.com, caminosenespiral.com, испанские разделы arcanepattern.com, humandesignhub.app, gethumandesign.com, переводные книги по Diseño Humano.

### Правила написания (для переводчика)

- **Испанский нейтральный**: читателю — usted (ед. ч.), никаких vosotros и voseo; к Райе в `message` — tú («¡Hola, Raya!», «Cuéntame…»), как «¡Hola, Olia!» в тесте ценностей.
- **Заглавные — у имён системы**: типы (Generador, Proyector), центры (Centro Sacral, Plexo Solar, Centro de la Garganta), каналы (Forma Perfeccionada, La Onda Cerebral), линии профиля (Investigador, Ermitaño). В именах центров и каналов с заглавной — существительные и прилагательные, артикли и предлоги внутри — строчные. Так принято в испаноязычной литературе HD.
- **Строчные — у общих слов**: tipo, estrategia, autoridad, perfil, línea, definición, centro definido, centro abierto, canal, puerta, cruz de encarnación, bodygraph, carta. Авторитет в тексте — тоже строчными: «autoridad emocional», «autoridad del Ego» (Ego — с заглавной, это центр).
- **Названия, которые ставятся после подписи** (`name` у авторитета и определённости, `strategy`): с заглавной первой буквы, остальное строчными: «Emocional (Plexo Solar)», «Partida (doble)», «Responder y luego informar».
- **Род**: autoridad и definición женского рода, поэтому прилагательные согласуются: esplénica, autoproyectada, partida. Названия типов и линий — в общем мужском роде, как в литературе HD («el Generador», «los Proyectores», «Investigador / Mártir»). Где можно, писать о людях без рода: «las personas de tipo Generador».
- **Центр в тексте — полной формой с артиклем**: «conecta el Centro G con el Centro de la Garganta». Сокращений вроде «el Sacral» или «la Garganta» не использовать.
- **Типографика**: кавычки «…», ¡…! и ¿…?, тире «—» с пробелами, как на страницах сайта на испанском. Число токенов — «25.000», как на всех испанских страницах сайта.

### 1. Общие термины

| код | по-русски | на испанском | обоснование | сомнение |
|---|---|---|---|---|
| название метода (`intro`, `typesSection`, `disclaimer`, `faq`) | Human Design (латиницей) | **Diseño Humano**; в тексте — «el Diseño Humano»; в `intro` при первом упоминании — «el Diseño Humano (Human Design)» | так метод называют испаноязычные книги, школы и почти все крупные сайты; так же — в title и H1 страницы Райи es и в подписи Райи в каталоге (`es.json`: «Diseño Humano») | латиница «Human Design» тоже встречается и уже стоит в подвале es и в теле страницы Райи — см. «Сомнения», п. 1 |
| `breadcrumb` | Расчёт Human Design | Calculadora de Diseño Humano | поисковая формулировка из «Правил переводов», п. 4 | в подвале es сейчас «Calculadora de Human Design» — п. 1 |
| бодиграф | бодиграф | bodygraph (м. р.: el bodygraph, los bodygraphs) | так пишут испаноязычные калькуляторы и школы; уже на сайте: страница Райи es, кнопка «Calcula tu bodygraph gratis» | «gráfico corporal», «cuerpo gráfico» встречаются реже; ищут чаще «carta de Diseño Humano» — это для `title`/`description` |
| карта (синоним бодиграфа в тексте) | карта | carta | так на странице Райи es и в испаноязычных школах («carta de Diseño Humano») | — |
| тип | тип | tipo | общепринято | — |
| стратегия | стратегия | estrategia | общепринято | — |
| авторитет | авторитет | autoridad (ж. р.) | общепринято («autoridad interna» — полная форма, в подписях не нужна) | — |
| профиль | профиль | perfil | общепринято | — |
| линия профиля | линия | línea; «la primera línea», «la línea 1» | общепринято | — |
| определённость | определённость | definición | общепринято («Definición Simple», «Definición Partida») | — |
| центр | центр | centro | общепринято | — |
| определённый центр | определённый центр; «центр определён» | centro definido; «el Centro Sacral está definido» | общепринято | — |
| открытый центр | открытый центр; «центр открыт» | centro abierto; «el Centro Sacral está abierto» | так на странице Райи es («qué centros están abiertos») и на большинстве сайтов | в строгих школах различают «indefinido» (белый, но с отдельными воротами) и «abierto» (совсем без ворот); в русском один термин «открытый» — в испанском тоже один, «abierto» |
| канал | канал | canal, мн. canales | общепринято | — |
| ворота | ворота; «64 ворот» | puerta, мн. puertas; «64 puertas», «la puerta 34» | общепринято; так на странице Райи es | — |
| `result.legendPersonality` | Личность — момент рождения | Personalidad — momento del nacimiento | «Personalidad» (чёрное) — общепринято в испаноязычной литературе HD | — |
| `result.legendDesign` | Дизайн — примерно за 88 дней до рождения | Diseño — unos 88 días antes del nacimiento | «Diseño» (красное) — общепринято; «unos» короче и естественнее, чем «aproximadamente» | «Diseño» созвучно «Diseño Humano»; в испаноязычной литературе HD это обычное соседство, менять не нужно |
| инкарнационный крест | инкарнационный крест | cruz de encarnación | общепринято; так на странице Райи es | многие сайты пишут «Cruz de Encarnación» с заглавных; здесь строчными, как у Райи |

**Подписи результата** (`result.*`):

| код | по-русски | на испанском | обоснование | сомнение |
|---|---|---|---|---|
| `typeLabel` / `strategyLabel` / `authorityLabel` / `profileLabel` / `definitionLabel` | Тип / Стратегия / Авторитет / Профиль / Определённость | Tipo / Estrategia / Autoridad / Perfil / Definición | термины выше | — |
| `definedCenters` / `noDefinedCenters` | Определённые центры / Определённых центров нет | Centros definidos / No hay centros definidos | термины выше | — |
| `openCenters` / `noOpenCenters` | Открытые центры / Открытых центров нет | Centros abiertos / No hay centros abiertos | термины выше | — |
| `channels` / `noChannels` | Каналы / Определённых каналов нет | Canales / No hay canales definidos | термины выше | — |
| `bodygraphLabel` / `bodygraphLabelEmpty` | Бодиграф: {type}. Определённые центры: {centers} / …: нет | Bodygraph: {type}. Centros definidos: {centers} / Bodygraph: {type}. Centros definidos: ninguno | термины выше | — |

### 2. Типы и стратегии

| код | по-русски | на испанском | обоснование | сомнение |
|---|---|---|---|---|
| `types.generator.name` | Генератор | Generador | общепринято | — |
| `types.generator.strategy` | Откликаться | Responder | «responder» — глагол стратегии во всех испаноязычных источниках | частая полная форма — «Esperar para responder»; см. «Сомнения», п. 3 |
| `types.manifestingGenerator.name` | Манифестирующий генератор | Generador Manifestante | основная форма на испаноязычных сайтах и в школах | «Generador Manifestador» встречается реже |
| `types.manifestingGenerator.strategy` | Откликаться, затем информировать | Responder y luego informar | так на испаноязычных сайтах: «responde como un Generador y luego informa» | — |
| `types.manifestor.name` | Манифестор | Manifestador | основная испанская форма; так на странице Райи es | «Manifestor» (калька с английского) встречается реже |
| `types.manifestor.strategy` | Информировать | Informar | общепринято («informar antes de actuar») | — |
| `types.projector.name` | Проектор | Proyector | общепринято | — |
| `types.projector.strategy` | Ждать приглашения | Esperar la invitación | общепринято | разговорное «esperar a la invitación» тоже встречается; «esperar la invitación» грамматически чище |
| `types.reflector.name` | Рефлектор | Reflector | общепринято | — |
| `types.reflector.strategy` | Ждать лунный цикл — около 28 дней | Esperar un ciclo lunar (unos 28 días) | «esperar un ciclo lunar» — общепринято; скобки вместо тире, потому что в испанском одиночное тире в конце выглядит обрывом | — |
| мн. ч. в тексте | Генераторы, Манифестирующие генераторы… | Generadores, Generadores Manifestantes, Manifestadores, Proyectores, Reflectores | общепринято | — |
| «информировать» в абзацах о типах | коротко сказать тем, кого затронет решение | informar: avisar brevemente a quienes afectará la decisión | так объясняют на испаноязычных сайтах; так и на странице Райи es | — |

### 3. Авторитеты

`name` идёт после подписи «Autoridad», `inMessage` — в сообщении Райе от первого лица.

| код | по-русски (`name` / `inMessage`) | на испанском (`name` / `inMessage`) | обоснование | сомнение |
|---|---|---|---|---|
| `emotional` | Эмоциональный (солнечное сплетение) / эмоциональный авторитет | Emocional (Plexo Solar) / autoridad emocional | общепринято; `name` — дословно как на странице Райи es | — |
| `sacral` | Сакральный / сакральный авторитет | Sacral / autoridad sacral | общепринято | — |
| `splenic` | Селезёночный / селезёночный авторитет | Esplénica / autoridad esplénica | общепринято; центр при этом — «Centro del Bazo» (см. раздел 6), так и пишут: «autoridad esplénica, del Centro del Bazo» | «autoridad del Bazo» — более редкий вариант |
| `ego` | Эго (сердечный центр) / авторитет эго | Ego (Centro del Corazón) / autoridad del Ego | «autoridad del Ego» — основная форма на испаноязычных сайтах | «autoridad del Corazón», «autoridad egoica» встречаются реже |
| `selfProjected` | Самопроецированный / самопроецированный авторитет | Autoproyectada / autoridad autoproyectada | общепринято в испаноязычных источниках | «autoridad del Yo», «autoridad del Centro G» — реже |
| `mental` | Ментальный (через окружение) / ментальный авторитет | Mental (a través del entorno) / autoridad mental | «autoridad mental» — основная форма; пояснение в скобках повторяет русское | на сайтах также «autoridad del entorno», «autoridad externa», «sin autoridad interna» |
| `lunar` | Лунный / лунный авторитет | Lunar / autoridad lunar | общепринято | — |

**Как это звучит во фразе.** Тип и авторитет лучше ставить перечислением после двоеточия: так фраза не зависит от рода говорящего (не нужно выбирать между «Soy Generador» и «Soy Generadora») и годится для любого авторитета, включая «del Ego».

- «Мой тип — …, профиль 2/4, авторитет — …» → «Mi tipo es Generador, perfil 2/4, autoridad sacral.»
- Со всеми семью `inMessage`: «…perfil 2/4, autoridad emocional / autoridad sacral / autoridad esplénica / autoridad del Ego / autoridad autoproyectada / autoridad mental / autoridad lunar.»
- Сообщение Райе целиком (пример, `message` пишет переводчик): «¡Hola, Raya! Mis datos de nacimiento: 14 de marzo de 1990, 07:30, Kazán (UTC+3). La calculadora me ha dado: Proyector, perfil 5/1, autoridad del Ego. Cuéntame qué significa para mí»
- Конструкцию «Mi autoridad es …» в шаблоне не использовать: «mi autoridad es emocional» звучит нормально, а «mi autoridad es del Ego» — неуклюже.

### 4. Линии профиля

| код | по-русски | на испанском | обоснование | сомнение |
|---|---|---|---|---|
| линия 1 | Исследователь | Investigador | общепринято | — |
| линия 2 | Отшельник | Ermitaño | общепринято | — |
| линия 3 | Мученик | Mártir | общепринято | «Experimentador» — пояснительный синоним, как название не используется |
| линия 4 | Оппортунист | Oportunista | общепринято | «Networker» — англицизм на части сайтов |
| линия 5 | Еретик | Hereje | общепринято | — |
| линия 6 | Ролевая модель | Modelo a seguir | самая естественная испанская форма, часто на испаноязычных сайтах | «Modelo de Rol» — калька с английского, тоже встречается |
| формат строки | «1/3 · Исследователь / Мученик» | «1/3 · Investigador / Mártir» | формат как в русском; так на странице Райи es («Investigador / Mártir») | — |

Все двенадцать (`profiles.*.name`): 1/3 Investigador / Mártir · 1/4 Investigador / Oportunista · 2/4 Ermitaño / Oportunista · 2/5 Ermitaño / Hereje · 3/5 Mártir / Hereje · 3/6 Mártir / Modelo a seguir · 4/6 Oportunista / Modelo a seguir · 4/1 Oportunista / Investigador · 5/1 Hereje / Investigador · 5/2 Hereje / Ermitaño · 6/2 Modelo a seguir / Ermitaño · 6/3 Modelo a seguir / Mártir.

### 5. Определённость

`name` идёт после подписи «Definición».

| код | по-русски | на испанском | обоснование | сомнение |
|---|---|---|---|---|
| `none` | Нет определённости | Sin definición | общепринято | — |
| `single` | Одинарная | Simple | «Definición Simple» — общепринято | «Única» — реже |
| `split` | Расщеплённая (двойная) | Partida (doble) | «Definición Partida», «Partida Doble» — основная форма | «Dividida» встречается реже |
| `triple` | Тройная | Triple | понятно и повторяет русское решение (без «расщеплённая») | в школах полнее: «Partida Triple» / «Triple Partida» |
| `quadruple` | Четверная | Cuádruple | так же, как `triple` | в школах полнее: «Partida Cuádruple» / «Cuádruple Partida» |
| в тексте | одинарная определённость… | definición simple, definición partida, definición triple, definición cuádruple | — | — |

### 6. Центры

| код | по-русски | на испанском (`name`) | в тексте | обоснование | сомнение |
|---|---|---|---|---|---|
| `head` | Теменной центр | Centro de la Cabeza | el Centro de la Cabeza | основная испанская форма | «Centro Coronario» — редко |
| `ajna` | Аджна | Ajna | el Ajna | общепринято («Ajna», «Centro Ajna») | — |
| `throat` | Горловой центр | Centro de la Garganta | el Centro de la Garganta | общепринято | — |
| `g` | Центр G (идентичность) | Centro G (identidad) | el Centro G | «Centro G» — общепринято; пояснение повторяет русское | на части сайтов «Centro G / Ser», «Centro de la Identidad» |
| `heart` | Сердечный центр (эго) | Centro del Corazón (Ego) | el Centro del Corazón | общепринято («Corazón / Ego») | «Centro del Ego», «Centro de la Voluntad» — реже |
| `spleen` | Селезёночный центр | Centro del Bazo | el Centro del Bazo | «Bazo» — основная испанская форма у центра | «Centro Esplénico» тоже встречается; прилагательное «esplénica» оставлено только у авторитета, как принято |
| `solarPlexus` | Солнечное сплетение | Plexo Solar | el Plexo Solar | общепринято; так на странице Райи es | «Centro Emocional», «Centro del Plexo Solar» — реже |
| `sacral` | Сакральный центр | Centro Sacral | el Centro Sacral | общепринято | «Centro Sacro» — редко |
| `root` | Корневой центр | Centro Raíz | el Centro Raíz | общепринято | «Centro de la Raíz» — реже |

### 7. Каналы

Имя канала идёт в строке «20-34 · Carisma — conecta…». Артикль только там, где он есть в каноническом английском названии (The Beat, The Alpha…), — так делают испаноязычные справочники.

| код | по-русски (англ.) | на испанском | обоснование | сомнение |
|---|---|---|---|---|
| 1-8 | Вдохновение (Inspiration) | Inspiración | все испаноязычные источники | — |
| 2-14 | Пульс (The Beat) | El Compás | основная испанская форма: «compás» — и музыкальный такт, и компас | «El Ritmo» на части сайтов (совпадает с 5-15), «El Pulso» — дословно; см. «Сомнения», п. 4 |
| 3-60 | Мутация (Mutation) | Mutación | общепринято | — |
| 4-63 | Логика (Logic) | Lógica | общепринято | — |
| 5-15 | Ритм (Rhythm) | Ritmo | общепринято | — |
| 6-59 | Близость (Mating) | Intimidad | так на ряде крупных испаноязычных сайтов; совпадает с русским | «Apareamiento» — дословно от Mating, тоже распространено, но звучит «по-зоологически»; см. п. 4 |
| 7-31 | Альфа (The Alpha) | El Alfa | общепринято | «El Líder» — на отдельных сайтах |
| 9-52 | Концентрация (Concentration) | Concentración | общепринято | — |
| 10-20 | Пробуждение (Awakening) | Despertar | общепринято | — |
| 10-34 | Исследование (Exploration) | Exploración | общепринято | — |
| 10-57 | Совершенная форма (Perfected Form) | Forma Perfeccionada | общепринято | — |
| 11-56 | Любопытство (Curiosity) | Curiosidad | общепринято | — |
| 12-22 | Открытость (Openness) | Apertura | общепринято | «Apertura Social» — на отдельных сайтах |
| 13-33 | Блудный сын (The Prodigal) | El Pródigo | общепринято | «El Hijo Pródigo» ближе к русскому, но в испанских источниках почти не встречается |
| 16-48 | Длина волны (The Wavelength) | La Longitud de Onda | общепринято | «El Talento» — на части сайтов, по ключевому описанию канала |
| 17-62 | Принятие (Acceptance) | Aceptación | общепринято | — |
| 18-58 | Суждение (Judgement) | Juicio | общепринято | — |
| 19-49 | Синтез (Synthesis) | Síntesis | общепринято | — |
| 20-34 | Харизма (Charisma) | Carisma | общепринято | — |
| 20-57 | Мозговая волна (The Brainwave) | La Onda Cerebral | основная форма | «La Chispa Cerebral» — на отдельных сайтах |
| 21-45 | Деньги (The Money Line) | El Dinero | основная форма («Canal del Dinero»); совпадает с русским | «La Línea del Dinero» — дословно от английского, тоже встречается |
| 23-43 | Структурирование (Structuring) | Estructuración | основная форма; совпадает с английским и русским | «Estructura», «Estructurar» — на отдельных сайтах |
| 24-61 | Осознанность (Awareness) | Consciencia | у испанских школ; «consciencia» — именно «осознание», без оттенка морали | «Conciencia» тоже распространено (и допустимо по норме), но может читаться как «совесть» |
| 25-51 | Инициация (Initiation) | Iniciación | общепринято | — |
| 26-44 | Передача (Surrender) | Transmisión | «Rendición» читается как «капитуляция» — **решение владельца 14.10**; прежнее обоснование: все испаноязычные источники, которые я видел | в русском сознательно «Передача», а не «Капитуляция»; см. «Сомнения», п. 2 |
| 27-50 | Сохранение (Preservation) | Preservación | общепринято | — |
| 28-38 | Борьба (Struggle) | Lucha | общепринято | — |
| 29-46 | Открытие (Discovery) | Descubrimiento | общепринято | — |
| 30-41 | Узнавание (Recognition) | Reconocimiento | общепринято | — |
| 32-54 | Трансформация (Transformation) | Transformación | общепринято | — |
| 34-57 | Сила (Power) | Poder | общепринято | — |
| 35-36 | Преходящесть (Transitoriness) | Transitoriedad | общепринято | — |
| 37-40 | Сообщество (Community) | Comunidad | общепринято | — |
| 39-55 | Эмоциональность (Emoting) | Emotividad | основная форма; ближе всего к русскому | «Emoción» — на части сайтов |
| 42-53 | Созревание (Maturation) | Maduración | общепринято | — |
| 47-64 | Абстракция (Abstraction) | Abstracción | общепринято | — |

### Смежные слова из описаний (держать одинаково во всех полях)

| по-русски | на испанском | обоснование |
|---|---|---|
| отклик, «откликаться» | respuesta (respuesta sacral), responder | термин стратегии Генератора |
| ясное «да» / «нет» | un «sí» claro / un «no» | так в испаноязычных описаниях отклика |
| эмоциональная волна | ola emocional | общепринято в испаноязычной литературе HD |
| «переспать» решение | «consultarlo con la almohada» | так на странице Райи es |
| лунный цикл | ciclo lunar | общепринято |
| Солнце, Луна, лунные узлы | el Sol, la Luna, los nodos lunares | общепринято |
| истинный / средний узел | nodo verdadero / nodo medio | так в испаноязычной астрономии и астрологии |
| часовой пояс, летнее время, перевод стрелок | huso horario, horario de verano, cambio de hora | «huso horario» — как на странице Райи es; все три понятны и в Испании, и в Латинской Америке |
| эксперимент на 7 дней | experimento de 7 días | так на странице Райи es |
| самопознание; не прогноз | autoconocimiento; no una predicción | так на странице Райи es и в тесте ценностей es |
| оговорка (`disclaimer`) | «El Diseño Humano es una herramienta de autoconocimiento, no una predicción, y no sustituye a un médico, un abogado ni un asesor financiero.» | формулировка страницы Райи es, с названием метода по п. 1 |
| при регистрации 25 000 токенов в подарок | al registrarse, 25.000 tokens de regalo | дословно как `ctaNote` теста ценностей es |

### Сомнения

1. **Diseño Humano или Human Design.** В тексте калькулятора выбрано «Diseño Humano»: так метод называют почти все испаноязычные школы, книги и сайты, и так он назван в title и H1 страницы Райи. Но подвал es (`es.json`: «Calculadora de Human Design») и тело страницы Райи («el Human Design es una herramienta…») уже пишут латиницей. Нужно решение: (а) «Diseño Humano» везде, а пункт подвала поменять на «Calculadora de Diseño Humano» (одна строка в `es.json`, вне Task 9); или (б) в тексте «Human Design», как в русском, а «Diseño Humano» — только в `title`/`description`/H1.
2. **26-44: «Rendición» против русского «Передача».** По-испански канал называют только «Rendición» (Surrender), но по-русски выбрано «Передача», а не «Капитуляция». Оставляем испанское «Rendición» (рекомендую) или делаем как в русском — «Transmisión», которой в испанских источниках нет?
3. **Стратегия Генератора: «Responder» или «Esperar para responder».** Короткая форма повторяет русское «Откликаться», но в строке результата «Estrategia: Responder» может прочитаться как «ответить». Полная форма «Esperar para responder» в испаноязычных источниках встречается чаще. Тогда у Манифестирующего генератора будет «Esperar para responder y luego informar».
4. **Каналы, где сообщество расходится**; выбрано ближе к русскому, проверить на слух. 2-14 — «El Compás» (вместо «El Pulso» или «El Ritmo»), 6-59 — «Intimidad» (вместо «Apareamiento»), 24-61 — «Consciencia» (вместо «Conciencia»).
5. **«Bodygraph» и «carta» в поисковых полях.** В тексте бодиграф — «bodygraph», как уже на сайте. Но по-испански чаще ищут «carta de Diseño Humano», поэтому в `title`/`description` рекомендую ставить рядом с «calculadora de Diseño Humano» и «bodygraph» ещё и «carta».


## Глоссарий Human Design — немецкий (de)

Для калькулятора бодиграфа на linkeon.io. Переводчик и вычитчик берут каждый термин ровно в том виде, как в столбце «на немецком», во всех полях `texts/de.ts`.

Источники сверки: немецкоязычные справочники-лексиконы и программы расчёта бодиграфа, сайты немецкоязычных школ и коучей HD, классический немецкий список названий каналов (переводы англоязычной литературы HD), а также наша страница Райи `src/content/assistants/pages/de/raya.ts`. Где сообщество расходится, выбран один вариант, альтернатива указана в столбце «сомнение».

Оформление (как на немецких страницах ассистентов): кавычки „…“, тире — короткое с пробелами « – », число — «25.000». Существительные с заглавной, в том числе в начале описания центра и канала, если оно начинается с существительного.

### 1. Общие термины

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `humanDesign` | Human Design | Human Design (das Human Design) | В немецкоязычной среде метод называют только по-английски, латиницей и без кавычек; так и на странице Райи (de). | Составные слова: по Duden нужны дефисы («Human-Design-Rechner»), сайты HD и поисковые запросы пишут раздельно («Human Design Rechner»). Предлагаю раздельно в `title`/`description`/H1 (поисковая фраза из плана) и обходить составные слова в тексте («Rechner für Human Design»). |
| `bodygraph` | бодиграф | Bodygraph (der Bodygraph, den Bodygraph) | Общепринятое заимствование в немецкоязычных школах; мужской род, как на странице Райи (de): «Ihren Bodygraph». | «Körpergrafik» — ранний немецкий перевод, сейчас встречается редко. Средний род («das Bodygraph») тоже бывает; держимся мужского, как у Райи. |
| `chart` | карта (результат расчёта) | Chart (das Chart) | Так говорят в немецкоязычных школах и на странице Райи (de): «Ihr Chart». | — |
| `result.typeLabel` | тип | Typ | Принятый термин во всех немецкоязычных справочниках. | — |
| `result.strategyLabel` | стратегия | Strategie | Принятый термин во всех немецкоязычных справочниках. | — |
| `result.authorityLabel` | авторитет | Autorität (полное — innere Autorität) | Принятый термин; «innere Autorität» — когда нужно подчеркнуть, что речь о внутреннем ориентире. | — |
| `result.profileLabel` | профиль | Profil | Принятый термин. | — |
| `line` | линия профиля | Linie (Profillinie); «die erste Linie», «die 1. Linie» | Так в немецкоязычных справочниках профилей. | — |
| `result.definitionLabel` | определённость | Definition | Принятый термин немецкоязычных школ и программ расчёта; «Definition» и на странице Райи (de). | — |
| `center` | центр | Zentrum, мн. Zentren | Принято в немецкоязычных справочниках («die 9 Zentren»). | «Center» встречается у части коучей — не берём. |
| `definedCenter` | определённый центр | definiertes Zentrum; подпись `result.definedCenters` — «Definierte Zentren» | Принятый термин (окрашенный центр — «definiert»). | — |
| `openCenter` | открытый центр | offenes Zentrum; подпись `result.openCenters` — «Offene Zentren» | Самое употребимое в немецкоязычных справочниках для белого центра. | В классической терминологии «offen» (ни одних ворот) и «undefiniert» (ворота есть, канала нет) различаются; русский текст их не различает, поэтому всюду «offen». |
| `channel` | канал | Kanal, мн. Kanäle | Принятый термин («die 36 Kanäle»). | — |
| `gate` | ворота | Tor, мн. Tore («64 Tore») | Принятый немецкий термин; так и на странице Райи (de). | «Gate» у части коучей — не берём. |
| `personality` | Личность (чёрное) | Persönlichkeit (schwarz, bewusst) | Так в немецкоязычных справочниках: «Persönlichkeit, schwarz im Chart». | — |
| `design` | Дизайн (красное) | Design (rot, unbewusst) | Так в немецкоязычных справочниках: «Design, rot im Chart». | — |
| `result.legendPersonality` | Личность — момент рождения | Persönlichkeit – Zeitpunkt der Geburt | Термин «Persönlichkeit» + нейтральная формулировка момента. | «Moment der Geburt» тоже верно; «Zeitpunkt» точнее для расчёта по времени. |
| `result.legendDesign` | Дизайн — примерно за 88 дней до рождения | Design – etwa 88 Tage vor der Geburt | В немецкоязычных справочниках: «ca. 88 Tage vor der Geburt»; «etwa» вместо сокращения «ca.». | — |
| `incarnationCross` | инкарнационный крест | Inkarnationskreuz | Принятый термин; так и на странице Райи (de). | — |
| `lunarNode` | лунный узел (истинный / средний) | Mondknoten (wahrer / mittlerer Mondknoten) | Стандартные немецкие астрономические термины, ими пользуются и программы расчёта HD. | — |
| `lunarCycle` | лунный цикл | Mondzyklus | Принятый термин для Рефлектора («einen Mondzyklus abwarten»). | — |
| `response` | отклик / по отклику | Reaktion / aus der Reaktion heraus; про сакральный центр можно «die sakrale Antwort» | Связка со стратегией «Reagieren»; «sakrale Antwort» устоялась у немецкоязычных школ для ответа сакрального центра. | См. сомнение по стратегии Генератора. |
| `selfKnowledge` | самопознание | Selbsterkenntnis («ein Werkzeug der Selbsterkenntnis, keine Prognose») | Так в оговорке на странице Райи (de); держим одинаково. | — |

### 2. Типы и стратегии

Типы не склоняются по роду: «Sie ist Projektor», «Ich bin Generator» (без артикля, как профессия). В «Manifestierender Generator» прилагательное — часть названия, всегда с заглавной и склоняется: «des Manifestierenden Generators», «Manifestierende Generatoren».

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `generator.name` | Генератор | Generator (мн. Generatoren) | Единое название во всех немецкоязычных источниках. | — |
| `generator.strategy` | Откликаться | Reagieren | Самая частая форма в немецкоязычных справочниках и у школ («Strategie: Reagieren», «Warten, um zu reagieren»); без «warten», как и в русском. | «Antworten» — точнее передаёт англ. «respond» и встречается у части программ расчёта; в англоязычной литературе HD «react» имеет оттенок эмоциональной реакции. |
| `manifestingGenerator.name` | Манифестирующий генератор | Manifestierender Generator | Единое название в немецкоязычных справочниках и программах. | — |
| `manifestingGenerator.strategy` | Откликаться, затем информировать | Reagieren, dann informieren | Принятая формула («Reagieren und informieren»); «dann» передаёт порядок шагов, как «затем». | «Antworten, dann informieren» — если для Генератора выберем «Antworten». |
| `manifestor.name` | Манифестор | Manifestor (мн. Manifestoren) | Единое название; так и на странице Райи (de). | — |
| `manifestor.strategy` | Информировать | Informieren | Единая формулировка немецкоязычных источников. | — |
| `projector.name` | Проектор | Projektor (мн. Projektoren) | Единое немецкое написание через k. | — |
| `projector.strategy` | Ждать приглашения | Auf die Einladung warten | Классическая немецкая формулировка («Warten auf die Einladung»). | «Auf Einladung warten» — короче, тоже встречается. |
| `reflector.name` | Рефлектор | Reflektor (мн. Reflektoren) | Единое немецкое написание через k. | — |
| `reflector.strategy` | Ждать лунный цикл — около 28 дней | Einen Mondzyklus abwarten – etwa 28 Tage | Принятая формулировка («Einen Mondzyklus abwarten»); срок добавлен, как в русском. | — |

### 3. Авторитеты

`name` — значение в строке «Autorität» (форма прилагательного или центра, как в немецких программах расчёта; «Emotional (Solarplexus)» — как на странице Райи (de)). `inMessage` — именная группа без артикля в именительном/винительном падеже: она подходит и для перечисления, и после «ich habe».

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `emotional.name` | Эмоциональный (солнечное сплетение) | Emotional (Solarplexus) | Так в немецкоязычных справочниках («Emotionale Autorität (Solarplexus)») и на странице Райи (de). | — |
| `emotional.inMessage` | эмоциональный авторитет | emotionale Autorität | Принятое название. | — |
| `sacral.name` | Сакральный | Sakral | Принятая короткая форма в немецких программах расчёта. | — |
| `sacral.inMessage` | сакральный авторитет | sakrale Autorität | Принятое название. | — |
| `splenic.name` | Селезёночный | Milz | Немецкоязычные школы называют этот авторитет по центру («Milz-Autorität», «Autorität: Milz»); прилагательное «splenisch» почти не встречается. | «Milz-Autorität» как значение строки — длиннее, но не требует подписи «Autorität» рядом. |
| `splenic.inMessage` | селезёночный авторитет | Milz-Autorität | Самая частая форма в немецкоязычных справочниках. | «Milzautorität» слитно — по Duden, но в HD почти всегда через дефис. |
| `ego.name` | Эго (сердечный центр) | Ego (Herzzentrum) | Принятое «Ego-Autorität (Herz)»; пояснение в скобках — как в русском. | — |
| `ego.inMessage` | авторитет эго | Ego-Autorität | Самая частая форма в немецкоязычных справочниках. | «Herz-Autorität» — встречается реже. |
| `selfProjected.name` | Самопроецированный | Selbstprojiziert | Принятое «selbstprojizierte Autorität»; слитно по Duden. | Встречается и «Selbst-projiziert» с дефисом. |
| `selfProjected.inMessage` | самопроецированный авторитет | selbstprojizierte Autorität | Принятое название. | — |
| `mental.name` | Ментальный (через окружение) | Mental (über die Umgebung) | Принятое «mentale Autorität», она же «Umgebungsautorität»; скобка передаёт это второе название. | «Keine innere Autorität» — классическая формулировка, но в калькуляторе звучала бы как отсутствие авторитета. |
| `mental.inMessage` | ментальный авторитет | mentale Autorität | Принятое название. | — |
| `lunar.name` | Лунный | Lunar | Принятое «lunare Autorität». | «Mond-Autorität» — реже. |
| `lunar.inMessage` | лунный авторитет | lunare Autorität | Принятое название. | — |

Как звучит фраза от первого лица (к Райе — на «du»):

- «Мой тип — …, профиль 2/4, авторитет — …»: **Mein Typ ist Generator, Profil 2/4, meine Autorität ist sakral.** Для Milz и Ego предикативная форма неуклюжа («meine Autorität ist die Milz»), поэтому в шаблоне сообщения лучше перечисление с `inMessage`:
- **Der Rechner hat ergeben: Projektor, Profil 2/4, emotionale Autorität.**
- «у меня … авторитет»: **Ich habe emotionale Autorität / sakrale Autorität / Milz-Autorität / Ego-Autorität / selbstprojizierte Autorität / mentale Autorität / lunare Autorität.**
- Не ставить `{authority}` после предлога с дательным («mit {authority}»): прилагательное тогда меняет окончание («mit emotionaler Autorität»), а шаблон этого не умеет.

Набросок `message` (окончательную формулировку даёт переводчик): «Hallo Raya! Meine Geburtsdaten: {date}, {time}, {city} ({offset}). Der Rechner hat ergeben: {type}, Profil {profile}, {authority}. Erzähl mir, was das für mich bedeutet».

### 4. Линии профиля и формат строки

Формат строки профиля: `{профиль} · {линия} / {линия}` — **«1/3 · Forscher / Märtyrer»** (как на странице Райи (de): «1/3: Forscher / Märtyrer»).

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `line1` | Исследователь | Forscher | Единое название в немецкоязычных справочниках и на странице Райи (de). | — |
| `line2` | Отшельник | Eremit | Исходное немецкое название (крупные справочники и программы расчёта, классические описания профилей «Opportunistischer Eremit»). | «Einsiedler» — столь же частое у современных коучей. |
| `line3` | Мученик | Märtyrer | Единое классическое название; так и на странице Райи (de). | «Experimentierer» — смягчённое название у части школ, это уже не перевод. |
| `line4` | Оппортунист | Opportunist | Единое классическое название. | «Netzwerker» — смягчённое название у части школ. |
| `line5` | Еретик | Ketzer | Самое частое в немецкоязычных справочниках и программах расчёта. | «Häretiker» — реже. |
| `line6` | Ролевая модель | Rollenvorbild | Самое частое в немецкоязычных справочниках. | «Rollenmodell», «Vorbild» — реже. |

Все 12 строк `profiles.*.name`:

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `1/3` | Исследователь / Мученик | Forscher / Märtyrer | Из названий линий. | — |
| `1/4` | Исследователь / Оппортунист | Forscher / Opportunist | Из названий линий. | — |
| `2/4` | Отшельник / Оппортунист | Eremit / Opportunist | Из названий линий. | — |
| `2/5` | Отшельник / Еретик | Eremit / Ketzer | Из названий линий. | — |
| `3/5` | Мученик / Еретик | Märtyrer / Ketzer | Из названий линий. | — |
| `3/6` | Мученик / Ролевая модель | Märtyrer / Rollenvorbild | Из названий линий. | — |
| `4/6` | Оппортунист / Ролевая модель | Opportunist / Rollenvorbild | Из названий линий. | — |
| `4/1` | Оппортунист / Исследователь | Opportunist / Forscher | Из названий линий. | — |
| `5/1` | Еретик / Исследователь | Ketzer / Forscher | Из названий линий. | — |
| `5/2` | Еретик / Отшельник | Ketzer / Eremit | Из названий линий. | — |
| `6/2` | Ролевая модель / Отшельник | Rollenvorbild / Eremit | Из названий линий. | — |
| `6/3` | Ролевая модель / Мученик | Rollenvorbild / Märtyrer | Из названий линий. | — |

### 5. Виды определённости

Значение строки «Definition» — полная именная группа, как в немецких программах расчёта. Счёт частей — как в русском: zweifach / dreifach / vierfach = две / три / четыре группы центров.

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `none` | Нет определённости | Keine Definition | Единое название в немецкоязычных справочниках. | — |
| `single` | Одинарная | Einfache Definition | Единое название в немецкоязычных справочниках. | — |
| `split` | Расщеплённая (двойная) | Gespaltene Definition (zweifach) | «Gespaltene Definition» и «zweifache Spaltung» — немецкие названия Split Definition; скобка снимает ту же двусмысленность, что и «(двойная)» в русском. | «Split-Definition» — заимствование, тоже частое. |
| `triple` | Тройная | Dreifach gespaltene Definition | Немецкие справочники пишут «dreifache Spaltung» / «Triple Split»; форма согласована с «Gespaltene Definition». | «Dreifache Spaltung» короче, но без слова «Definition» выбивается из ряда. |
| `quadruple` | Четверная | Vierfach gespaltene Definition | То же: «vierfache Spaltung» / «Quadruple Split». | «Vierfache Spaltung» — см. выше. |

### 6. Центры

Род для текста описаний: das Kopfzentrum, das Ajna (das Ajna-Zentrum), das Kehlzentrum, das G-Zentrum, das Herzzentrum, das Milzzentrum, der Solarplexus, das Sakralzentrum, das Wurzelzentrum. В описаниях каналов: «verbindet das G-Zentrum mit dem Kehlzentrum», «… mit dem Solarplexus», «… mit dem Ajna».

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `head` | Теменной центр | Kopfzentrum | Единое название в немецкоязычных справочниках («Kopf-Zentrum», «Kopfzentrum»). | Дефисное написание тоже встречается; берём слитное по Duden. |
| `ajna` | Аджна | Ajna | Принятое название; без «Zentrum», как «Аджна» в русском. | «Ajna-Zentrum» — полная форма, допустима в тексте описаний. |
| `throat` | Горловой центр | Kehlzentrum | Самое частое название в немецкоязычных справочниках. | «Halszentrum», «Kehle» — реже. |
| `g` | Центр G (идентичность) | G-Zentrum (Identität) | Принятое «G-Zentrum»; в скобках — его тема, как в русском. | «Identitätszentrum», «Selbst» — тоже встречаются. |
| `heart` | Сердечный центр (эго) | Herzzentrum (Ego) | Принятое «Herz-Zentrum», оно же «Ego-Zentrum»; скобка — как в русском. | «Ego-Zentrum» как основное название — у части школ. |
| `spleen` | Селезёночный центр | Milzzentrum | Единое название в немецкоязычных справочниках. | — |
| `solarPlexus` | Солнечное сплетение | Solarplexus | Принятое название; «Solarplexus-Zentrum» — полная форма. | «Emotionalzentrum» — реже. |
| `sacral` | Сакральный центр | Sakralzentrum | Единое название («Sakral-Zentrum», разговорно «das Sakral»). | — |
| `root` | Корневой центр | Wurzelzentrum | Единое название в немецкоязычных справочниках. | — |

### 7. Каналы

За основу взят классический немецкий список названий (переводы англоязычной литературы HD), которым пользуются крупные немецкие справочники и программы расчёта. Артикль — часть названия там, где он есть и в англоязычном названии (The Beat, The Prodigal, The Wavelength, The Money Line, The Alpha).

| код | по-русски | на немецком | обоснование | сомнение |
|---|---|---|---|---|
| `1-8` | Вдохновение | Inspiration | Единое название во всех немецких списках. | — |
| `2-14` | Пульс | Der Beat | Классический немецкий список и крупные справочники. | «Der Puls» — ближе к русскому, встречается реже; «Der Gestalter», «Der Alchemist» — авторские. |
| `3-60` | Мутация | Mutation | Единое название в классическом списке и справочниках. | «Innovation» — авторское. |
| `4-63` | Логика | Logik | Единое название. | — |
| `5-15` | Ритм | Rhythmus | Единое название. | — |
| `6-59` | Близость | Nähe | «Paarung» звучит грубо — **решение владельца 14.10**; прежнее обоснование: Классический немецкий список и крупные справочники (англ. Mating). | «Nähe» / «Intimität» — мягче и ближе к русскому «Близость»; встречается у части школ. |
| `7-31` | Альфа | Das Alpha | «Alphatier» в быту — «доминирующий человек» — **решение владельца 14.10**; прежнее обоснование: Классический список («Das Alpha-Tier») и справочники («Kanal des Alphatieres»); слитно по Duden. | «Das Alpha» — ближе к англ. и русскому; «Alphatier» в быту звучит как «доминирующий человек». |
| `9-52` | Концентрация | Konzentration | Единое название. | — |
| `10-20` | Пробуждение | Erwachen | Единое название. | — |
| `10-34` | Исследование | Erforschung | Классический список и большинство справочников. | «Erkundung» — реже. |
| `10-57` | Совершенная форма | Vollendete Form | Классический немецкий список (англ. Perfected Form). | «Perfekte Form» — у части программ расчёта. |
| `11-56` | Любопытство | Neugier | Единое название. | — |
| `12-22` | Открытость | Offenheit | Единое название. | — |
| `13-33` | Блудный сын | Der verlorene Sohn | Единое название (немецкое название притчи о блудном сыне). | — |
| `16-48` | Длина волны | Die Wellenlänge | Классический список и справочники. | «Talent» — описательное название у части школ. |
| `17-62` | Принятие | Akzeptanz | Существительное, как англ. Acceptance и русское «Принятие»; так в ряде немецких справочников. | «Akzeptieren» — в классическом списке. |
| `18-58` | Суждение | Urteilsvermögen | Классический список и большинство справочников. | «Urteil» — короче, реже. |
| `19-49` | Синтез | Synthese | Классический список и справочники. | «Feinfühligkeit» — описательное. |
| `20-34` | Харизма | Charisma | Единое название. | — |
| `20-57` | Мозговая волна | Geistesblitz | Классический немецкий список: «Geistesblitz» — немецкий эквивалент англ. идиомы brainwave. | «Die Gehirnwelle» — дословное, встречается у части справочников. |
| `21-45` | Деньги | Die Geld-Linie | Классический список (англ. The Money Line). | «Geld» («Kanal des Geldes») — у ряда справочников, ближе к русскому. |
| `23-43` | Структурирование | Strukturierung | Единое название. | — |
| `24-61` | Осознанность | Bewusstheit | Классический список (англ. Awareness). | «Der Denker» — описательное. |
| `25-51` | Инициация | Einweihung | Классический список и большинство справочников. | «Initiation» — заимствование, реже. |
| `26-44` | Передача | Hingebung | Классический список (англ. Surrender). | «Übertragung» / «Übermittlung» — ближе к русскому «Передача», встречаются реже. |
| `27-50` | Сохранение | Erhaltung | Классический список и справочники. | «Bewahrung», «Versorgung» — реже. |
| `28-38` | Борьба | Lebenskampf | Классический список (англ. Struggle). | «Kampf» — короче и ближе к русскому. |
| `29-46` | Открытие | Entdeckung | Единое название. | — |
| `30-41` | Узнавание | Erkennen | Классический список и справочники (англ. Recognition). | «Anerkennung» — значит «признание», по смыслу дальше. |
| `32-54` | Трансформация | Transformation | Большинство справочников. | «Umwandlung» — в классическом списке. |
| `34-57` | Сила | Macht | Классический список и большинство справочников (англ. Power). | «Kraft» — ближе к русскому «Сила». |
| `35-36` | Преходящесть | Vergänglichkeit | Классический список и справочники. | — |
| `37-40` | Сообщество | Gemeinschaft | Единое название. | — |
| `39-55` | Эмоциональность | Emotionen freisetzen | Классический список и справочники (англ. Emoting). | «Emotionalität» — ближе к русскому, но в немецких списках не встречается. |
| `42-53` | Созревание | Reifung | Классический список (англ. Maturation). | «Reife», «Zyklen» — реже. |
| `47-64` | Абстракция | Abstraktion | Единое название. | — |

### Сомнения

Решить владельцу до перевода:

1. **Стратегия Генератора: «Reagieren» или «Antworten».** «Reagieren» — самое частое у немецкоязычных школ. «Antworten» точнее передаёт смысл «откликаться» (не реагировать эмоционально) и встречается у части программ расчёта. От выбора зависят стратегия МГ («Reagieren / Antworten, dann informieren») и слово для «отклик» в текстах («Reaktion» / «Antwort»).
2. **Вторая линия: «Eremit» или «Einsiedler».** Оба частые; «Eremit» — исходное немецкое название в крупных справочниках.
3. **Канал 6-59: «Paarung» или «Nähe».** «Paarung» (спаривание) — устоявшееся классическое название, но звучит грубовато; «Nähe» мягче и совпадает с русским «Близость».
4. **Канал 2-14: «Der Beat» или «Der Puls».** «Der Beat» — классика, «Der Puls» совпадает с русским.
5. **Канал 20-57: «Geistesblitz» или «Die Gehirnwelle».** «Geistesblitz» — классика и естественный немецкий, «Gehirnwelle» — дословно, как в русском.
6. **Канал 26-44: «Hingebung» или «Übertragung».** «Hingebung» (= Surrender) — классика, «Übertragung» совпадает с русским «Передача».
7. **Канал 7-31: «Das Alphatier» или «Das Alpha».** «Alphatier» устоялось, но в быту звучит как «доминирующий человек».
8. **Открытый центр: «offen» или «undefiniert».** Предлагаю «offen» всюду, как в русском. В классической терминологии это два разных случая, и знатоки могут заметить.
9. **Составные слова с «Human Design»:** по Duden пишутся через дефис («Human-Design-Rechner»), в сообществе и в поиске раздельно. Предлагаю раздельное написание в `title`/`description`/H1 и обходить такие составные слова в остальном тексте.


## Глоссарий Human Design — французский (fr)

Для калькулятора бодиграфа на linkeon.io (`/fr/calculators/human-design/`). Обязателен для переводчика `src/content/hd/texts/fr.ts` и вычитчика; утверждает владелец до перевода.

Источники: таблица «Что / Названия» и правила 1–10 плана `2026-10-08-human-design-calculator.md`, поля `src/content/hd/texts/ru.ts`. Французские названия сверены с сайтами франкоязычных школ и практиков HD (sandrinecalmel.fr, elisasorci.fr, alinemaurer.com, virginiepetitjean.fr, sapphirelight.ch, esalune.com, lehumandesign.com, reveildemgrune.fr, iamkoena.com, marytyson.fr, humandesignhub.app/fr) и с уже опубликованной страницей Райи `src/content/assistants/pages/fr/raya.ts`. Её термины (Manifesteur, Émotionnelle (plexus solaire), Investigateur / Martyr, croix d'incarnation, définition, portes, bodygraph) глоссарий сохраняет, чтобы калькулятор и страница Райи говорили одинаково.

### Общие правила для переводчика

- Обращение к читателю — vous; сообщение Райе (`message`, `inMessage`) — от первого лица, к Райе на tu, имя — Raya.
- **Типы и линии профиля** — существительные мужского рода, с заглавной и в тексте (le Générateur, les Projecteurs, la ligne de l'Ermite), как в русском. Не феминизировать (не Génératrice, Projectrice, Investigatrice), хотя на части французских сайтов так пишут: это названия архетипов, а не описание читателя.
- **Авторитет** — autorité, женский род: прилагательные согласуются (émotionnelle, sacrale, splénique, auto-projetée, mentale, lunaire).
- **Центры в тексте:** слово centre — со строчной; Tête, Gorge, Cœur, Racine, G, Ajna — с заглавной; sacral, splénique, plexus solaire — со строчной (с заглавной только в начале названия или заголовка).
- **Каналы:** название — без артикля, с заглавной только первое слово (Forme parfaite, Longueur d'onde); единственное исключение — Le Prodigue. Описание после «Название — » — со строчной, как в русском.
- **Le Human Design** — латиницей, мужской род, с артиклем: le Human Design, du Human Design.
- **Типографика:** неразрывный пробел U+00A0 перед `;` `:` `?` `!` и внутри французских кавычек « … », как в `pages/fr/*.ts`. Во французских примерах ниже он уже стоит (Edit/Write его теряют — после правок проверять perl-ом).
- Основателя метода и организацию, которая держит права на систему, не называть нигде; расчёт не «officiel» и не «certifié».

### 1. Общие термины

| код | по-русски | на французском | обоснование | сомнение |
|---|---|---|---|---|
| — (метод) | Human Design | Human Design (le Human Design) | Латиницей пишет большинство франкоязычных сайтов HD; так уже на fr/raya.ts и в fr.json («Calcul du Human Design»). | «Design humain» тоже широко распространён (Квебек, часть французских практиков); см. «Сомнения» про поисковые формулировки. |
| — | бодиграф | bodygraph (le bodygraph) | Так во франкоязычных калькуляторах и на fr/raya.ts, в fr.json («Calculer votre bodygraph gratuitement»). | Встречаются «schéma corporel» и «charte»; «BodyGraph» с двумя заглавными не писать — выглядит как торговое название. |
| — | карта (общее слово) | carte | Так на fr/raya.ts («votre carte»). | «charte» — калька с chart, у части сайтов; не смешивать. |
| `result.typeLabel` | Тип | Type | Везде; полное «type énergétique» в описаниях не нужно. | — |
| `result.strategyLabel` | Стратегия | Stratégie | Везде. | — |
| `result.authorityLabel` | Авторитет | Autorité (f.) | Везде; «autorité intérieure» — допустимый синоним в связном тексте. | — |
| `result.profileLabel` | Профиль | Profil | Везде («le profil 1/3»). | — |
| — | линия профиля | ligne (la ligne 1, la première ligne) | Везде («ligne 6 — le Modèle»). | — |
| `result.definitionLabel` | Определённость | Définition | Устоявшийся термин франкоязычных школ (définition simple, double…); так на fr/raya.ts. | — |
| — | центр | centre (les 9 centres) | Везде. | «centre énergétique» — допустимо в связном тексте. |
| `result.definedCenters` | Определённые центры; определённый центр | Centres définis; centre défini | Везде. | — |
| `result.openCenters` | Открытые центры; открытый центр | Centres ouverts; centre ouvert | Так на sandrinecalmel.fr и lehumandesign.com («non défini / ouvert»). | «non défini» точнее по канону (ouvert — вовсе без активных ворот), но русский выбрал «открытые»; держим ouvert. |
| `result.channels` | Каналы; канал | Canaux; canal | Везде. | — |
| — | ворота | porte (les 64 portes) | Везде; так на fr/raya.ts. | — |
| — | Личность (чёрное на схеме) | Personnalité | Франкоязычные школы: côté Personnalité — noir, conscient. | — |
| — | Дизайн (красное на схеме) | Design | Франкоязычные школы: côté Design — rouge, inconscient. | — |
| `result.legendPersonality` | Личность — момент рождения | Personnalité — moment de la naissance | Подпись по образцу русской. | — |
| `result.legendDesign` | Дизайн — примерно за 88 дней до рождения | Design — environ 88 jours avant la naissance | Решение владельца по русской подписи (правило 10), перенесено дословно. | Точнее «88° хода Солнца», но, как и в русском, не уточнять. |
| — | инкарнационный крест | croix d'incarnation | Везде; так на fr/raya.ts. | — |
| — | отклик (сакральный) | réponse (la réponse sacrale) | Так во всех французских описаниях Генератора. | — |
| — | эмоциональная волна | vague émotionnelle | Принято у франкоязычных школ; на fr/raya.ts — «la vague». | — |
| — | лунный цикл | cycle lunaire | Везде. | — |
| — | лунные узлы; истинный / средний узел (FAQ) | nœuds lunaires; nœud vrai / nœud moyen | Стандартные французские астрономо-астрологические термины. | — |

### 2. Типы и стратегии

| код | по-русски | на французском | обоснование | сомнение |
|---|---|---|---|---|
| `types.generator.name` | Генератор | Générateur (pl. Générateurs) | Везде. | — |
| `types.generator.strategy` | Откликаться | Répondre (в тексте: « répondre ») | marytyson.fr, sandrinecalmel.fr: « réponds à ce que la vie te propose ». | Длиннее «Attendre pour répondre» / «attendre de répondre» — старая формулировка; русский выбрал короткую. |
| `types.manifestingGenerator.name` | Манифестирующий генератор | Générateur manifesteur (pl. Générateurs manifesteurs) | sandrinecalmel.fr, virginiepetitjean.fr, alinemaurer.com. | «Manifesteur générateur» (macoherence.com), «Générateur manifestant» (humandesignhub); на сайтах часто «Générateur Manifesteur» с заглавной M — пишем вторым словом со строчной, как в русском. |
| `types.manifestingGenerator.strategy` | Откликаться, затем информировать | Répondre, puis informer (в тексте: « répondre, puis informer ») | Так формулируют франкоязычные сайты (« répondre puis informer »); совпадает с решением владельца по русскому. | «Répondre et informer» — тоже встречается. |
| `types.manifestor.name` | Манифестор | Manifesteur (pl. Manifesteurs) | Везде; так на fr/raya.ts. | — |
| `types.manifestor.strategy` | Информировать | Informer (в тексте: « informer ») | Везде; так на fr/raya.ts. | — |
| `types.projector.name` | Проектор | Projecteur (pl. Projecteurs) | Везде. | — |
| `types.projector.strategy` | Ждать приглашения | Attendre l'invitation (в тексте: « attendre l'invitation ») | Самая частая формулировка на франкоязычных сайтах. | «Attendre une invitation» (marytyson.fr); «attendre d'être invité» — требует согласования по роду, не берём. |
| `types.reflector.name` | Рефлектор | Réflecteur (pl. Réflecteurs) | Везде. | — |
| `types.reflector.strategy` | Ждать лунный цикл — около 28 дней | Attendre un cycle lunaire — environ 28 jours | Франкоязычные сайты: « un cycle lunaire complet (28 jours) ». | Иногда пишут «29 jours»; держим 28, как в русском и в описании Рефлектора. |

### 3. Авторитеты

`name` — заголовок после «Autorité»; `inMessage` — подставляется в сообщение Райе как есть, строчными.

| код | по-русски (name / inMessage) | на французском (name / inMessage) | обоснование | сомнение |
|---|---|---|---|---|
| `emotional` | Эмоциональный (солнечное сплетение) / эмоциональный авторитет | Émotionnelle (plexus solaire) / autorité émotionnelle | Везде; заголовок дословно как на fr/raya.ts. | — |
| `sacral` | Сакральный / сакральный авторитет | Sacrale / autorité sacrale | elisasorci.fr, sandrinecalmel.fr. | — |
| `splenic` | Селезёночный / селезёночный авторитет | Splénique / autorité splénique | elisasorci.fr, sandrinecalmel.fr. | — |
| `ego` | Эго (сердечный центр) / авторитет эго | Ego (centre du Cœur) / autorité de l'ego | «Autorité de l'ego (Cœur)» — sandrinecalmel.fr, elisasorci.fr. | «autorité du Cœur» — реже; написание «égo» тоже допустимо, берём словарное «ego». |
| `selfProjected` | Самопроецированный / самопроецированный авторитет | Auto-projetée / autorité auto-projetée | elisasorci.fr, sandrinecalmel.fr. | «autorité du Soi» — sandrinecalmel.fr даёт как синоним. |
| `mental` | Ментальный (через окружение) / ментальный авторитет | Mentale (environnementale) / autorité mentale | «Autorité mentale / environnementale» — франкоязычные школы; elisasorci.fr — «autorité de l'environnement». | «Mentale (par l'entourage)» понятнее новичку и ближе к русскому «через окружение»; см. «Сомнения». |
| `lunar` | Лунный / лунный авторитет | Lunaire / autorité lunaire | Везде. | — |

**Как это звучит** (неразрывный пробел уже стоит).

Фраза «Мой тип — …, профиль 2/4, авторитет — …»:

> « Mon type : Générateur manifesteur ; profil : 2/4 ; autorité : émotionnelle. »
>
> Разговорнее: « Je suis Générateur manifesteur, profil 2/4, avec une autorité émotionnelle. »

«У меня … авторитет» / «мой авторитет — …»:

> « J'ai une autorité émotionnelle. » — « Mon autorité est sacrale. » — « J'ai l'autorité de l'ego. »

Сообщение Райе по шаблону `message` (тип — `name`, авторитет — `inMessage`; для ориентира, окончательный текст — за переводчиком):

> « Salut Raya ! Voici mes données de naissance : 12 mars 1990, 07:30, Lyon (UTC+1). Le calculateur indique : Projecteur, profil 2/4, autorité de l'ego. Dis-moi ce que cela signifie pour moi. »

Все семь `inMessage` после «profil 2/4,» читаются без правок: autorité émotionnelle · autorité sacrale · autorité splénique · autorité de l'ego · autorité auto-projetée · autorité mentale · autorité lunaire.

### 4. Линии профиля

| код | по-русски | на французском | обоснование | сомнение |
|---|---|---|---|---|
| 1 | Исследователь | Investigateur | Везде; так на fr/raya.ts. | — |
| 2 | Отшельник | Ermite | Везде. | — |
| 3 | Мученик | Martyr | Везде; так на fr/raya.ts. | sandrinecalmel.fr пишет «Expérimentateur/Expérimentatrice» — мягче, но это авторское; держим канон. |
| 4 | Оппортунист | Opportuniste | Везде. | — |
| 5 | Еретик | Hérétique | Везде. | — |
| 6 | Ролевая модель | Modèle | iamkoena.com, reveildemgrune.fr, sandrinecalmel.fr («Ligne 6 — le Modèle»). | «Rôle-modèle» — англицизм, встречается реже. |

**Формат строки профиля** — как в русском: `1/3 · Investigateur / Martyr` (дробь без пробелов, средняя точка и косая черта с обычными пробелами, названия без артикля). В связном тексте — «le profil 1/3».

Все 12 значений `profiles.*.name`:

| код | по-русски | на французском |
|---|---|---|
| `1/3` | Исследователь / Мученик | Investigateur / Martyr |
| `1/4` | Исследователь / Оппортунист | Investigateur / Opportuniste |
| `2/4` | Отшельник / Оппортунист | Ermite / Opportuniste |
| `2/5` | Отшельник / Еретик | Ermite / Hérétique |
| `3/5` | Мученик / Еретик | Martyr / Hérétique |
| `3/6` | Мученик / Ролевая модель | Martyr / Modèle |
| `4/6` | Оппортунист / Ролевая модель | Opportuniste / Modèle |
| `4/1` | Оппортунист / Исследователь | Opportuniste / Investigateur |
| `5/1` | Еретик / Исследователь | Hérétique / Investigateur |
| `5/2` | Еретик / Отшельник | Hérétique / Ermite |
| `6/2` | Ролевая модель / Отшельник | Modèle / Ermite |
| `6/3` | Ролевая модель / Мученик | Modèle / Martyr |

### 5. Определённость

`name` — значение после «Définition»; в связном тексте — «définition simple / double / triple / quadruple», «aucune définition».

| код | по-русски | на французском | обоснование | сомнение |
|---|---|---|---|---|
| `none` | Нет определённости | Aucune définition | alinemaurer.com и другие франкоязычные школы. | — |
| `single` | Одинарная | Simple | «définition simple» — везде. | — |
| `split` | Расщеплённая (двойная) | Double | «définition double» — alinemaurer.com и большинство французских сайтов. | «Double (split)» — подсказка тем, кто видел англоязычные карты; «fractionnée» (humandesignhub) — редко. |
| `triple` | Тройная | Triple | «définition triple» — везде. | — |
| `quadruple` | Четверная | Quadruple | «définition quadruple» — везде. | — |

### 6. Центры

| код | по-русски | на французском (название; в тексте) | обоснование | сомнение |
|---|---|---|---|---|
| `head` | Теменной центр | Centre de la Tête; le centre de la Tête, la Tête | lehumandesign.com, sapphirelight.ch. | «centre Couronne» (elisasorci.fr) ближе к русскому «теменной», но реже. |
| `ajna` | Аджна | Ajna; l'Ajna, le centre Ajna | Везде. | — |
| `throat` | Горловой центр | Centre de la Gorge; le centre de la Gorge, la Gorge | Везде. | — |
| `g` | Центр G (идентичность) | Centre G (identité); le centre G | Везде «centre G»; пояснение в скобках — как в русском. | «centre de l'Identité», «centre du Soi» — у части сайтов. |
| `heart` | Сердечный центр (эго) | Centre du Cœur (ego); le centre du Cœur | «Cœur / Ego» — lehumandesign.com, humandesignhub, sandrinecalmel.fr. | «centre de l'Ego» — тоже встречается. |
| `spleen` | Селезёночный центр | Centre splénique; le centre splénique | sandrinecalmel.fr, lehumandesign.com, esalune.com; согласуется с autorité splénique. | «centre de la Rate» (humandesignhub, часть школ). |
| `solarPlexus` | Солнечное сплетение | Plexus solaire; le plexus solaire | Везде; так на fr/raya.ts. | «centre émotionnel» — синоним у части сайтов, не использовать. |
| `sacral` | Сакральный центр | Centre sacral; le centre sacral, le Sacral | Везде. | — |
| `root` | Корневой центр | Centre Racine; le centre Racine, la Racine | lehumandesign.com, sandrinecalmel.fr, humandesignhub. | «centre de la Racine» — реже. |

### 7. Каналы

В скобках — английское название из русской таблицы, для сверки.

| код | по-русски | на французском | обоснование | сомнение |
|---|---|---|---|---|
| `1-8` | Вдохновение (Inspiration) | Inspiration | Во всех французских списках. | — |
| `2-14` | Пульс (The Beat) | Pulsation | virginiepetitjean.fr, humandesignhub; близко к русскому «Пульс». | «Battement» (esalune.com, буквально The Beat), «Cadence» (sapphirelight.ch). |
| `3-60` | Мутация (Mutation) | Mutation | Во всех списках. | — |
| `4-63` | Логика (Logic) | Logique | Во всех списках. | — |
| `5-15` | Ритм (Rhythm) | Rythme | Во всех списках. | — |
| `6-59` | Близость (Mating) | Intimité | sandrinecalmel.fr, esalune.com, humandesignhub; совпадает по смыслу с русским «Близость». | «Accouplement» (virginiepetitjean.fr, sapphirelight.ch) — буквально Mating, по-французски звучит грубо. |
| `7-31` | Альфа (The Alpha) | Alpha | Во всех списках («canal de l'Alpha»). | — |
| `9-52` | Концентрация (Concentration) | Concentration | Во всех списках. | — |
| `10-20` | Пробуждение (Awakening) | Éveil | Во всех списках. | — |
| `10-34` | Исследование (Exploration) | Exploration | Во всех списках. | — |
| `10-57` | Совершенная форма (Perfected Form) | Forme parfaite | sapphirelight.ch, esalune.com, virginiepetitjean.fr. | «Forme perfectionnée» (humandesignhub) — буквальнее, реже. |
| `11-56` | Любопытство (Curiosity) | Curiosité | Почти во всех списках. | «Chercheur» (virginiepetitjean.fr). |
| `12-22` | Открытость (Openness) | Ouverture | Почти во всех списках. | «Ouverture sociale» (virginiepetitjean.fr). |
| `13-33` | Блудный сын (The Prodigal) | Le Prodigue | «canal du Prodigue» во всех списках; артикль нужен, без него читается как прилагательное. | «L'Enfant prodigue» ближе к русскому, но в HD не встречается. |
| `16-48` | Длина волны (The Wavelength) | Longueur d'onde | sapphirelight.ch, esalune.com, humandesignhub. | «Talent» (virginiepetitjean.fr). |
| `17-62` | Принятие (Acceptance) | Acceptation | Во всех списках. | — |
| `18-58` | Суждение (Judgement) | Jugement | Во всех списках. | — |
| `19-49` | Синтез (Synthesis) | Synthèse | Во всех списках. | — |
| `20-34` | Харизма (Charisma) | Charisme | Во всех списках. | — |
| `20-57` | Мозговая волна (The Brainwave) | Onde cérébrale | Во всех списках. | — |
| `21-45` | Деньги (The Money Line) | Argent | Во всех списках («canal de l'Argent»). | — |
| `23-43` | Структурирование (Structuring) | Structuration | Во всех списках. | — |
| `24-61` | Осознанность (Awareness) | Conscience | Во всех списках. | — |
| `25-51` | Инициация (Initiation) | Initiation | Во всех списках. | — |
| `26-44` | Передача (Surrender) | Transmission | sandrinecalmel.fr; по ключевой характеристике канала (a design of a transmitter), как и русское «Передача». | «Abandon» (virginiepetitjean.fr, sapphirelight.ch) и «Reddition» (esalune.com, humandesignhub) — буквально Surrender; см. «Сомнения». |
| `27-50` | Сохранение (Preservation) | Préservation | Во всех списках. | — |
| `28-38` | Борьба (Struggle) | Lutte | Почти во всех списках. | «Difficulté» (sapphirelight.ch). |
| `29-46` | Открытие (Discovery) | Découverte | Во всех списках. | — |
| `30-41` | Узнавание (Recognition) | Reconnaissance | Во всех списках. | — |
| `32-54` | Трансформация (Transformation) | Transformation | Во всех списках. | — |
| `34-57` | Сила (Power) | Puissance | virginiepetitjean.fr, humandesignhub. | «Pouvoir» (sapphirelight.ch) — с оттенком власти над другими. |
| `35-36` | Преходящесть (Transitoriness) | Transitoire | esalune.com, humandesignhub, humdes.info; по смыслу совпадает с английским и русским. | «Transition» (virginiepetitjean.fr, sapphirelight.ch) — естественнее как существительное, но значит «переход». |
| `37-40` | Сообщество (Community) | Communauté | Во всех списках. | — |
| `39-55` | Эмоциональность (Emoting) | Émotivité | virginiepetitjean.fr, sapphirelight.ch. | «Émotion» (esalune.com). |
| `42-53` | Созревание (Maturation) | Maturation | Во всех списках. | — |
| `47-64` | Абстракция (Abstraction) | Abstraction | Почти во всех списках. | «Processus abstrait» (sapphirelight.ch). |

### Сомнения

1. **«Design humain» в поисковых полях.** Везде пишем «Human Design» латиницей, как на fr/raya.ts. Но во Франции и Квебеке часто ищут и «design humain». Русский `title` берёт переведённое «дизайн человека». Решить: добавить ли «design humain» один раз в `description` (`title` и H1 — «calculateur Human Design», как в плане).
2. **Канал 26-44.** Выбрано «Transmission» — совпадает с русским «Передача» и с текстом описания, встречается у франкоязычной школы. Буквальный перевод английского Surrender делится между «Abandon» и «Reddition»; оба по-французски читаются как «сдача» или «покинутость».
3. **Каналы, где сообщество расходится:** 2-14 Pulsation (или Battement), 6-59 Intimité (или Accouplement), 34-57 Puissance (или Pouvoir), 35-36 Transitoire (или Transition). Везде выбран вариант, который встречается во франкоязычных источниках и ближе к русскому названию. Нужно подтвердить этот принцип.
4. **Ментальный авторитет.** «Mentale (environnementale)» — термин франкоязычных школ, а «Mentale (par l'entourage)» понятнее новичку и ближе к русскому «через окружение».
5. **Без феминитивов.** Типы и линии — в мужском роде как названия архетипов (Projecteur, Investigateur), хотя часть французских сайтов для читательниц пишет Projectrice, Investigatrice.


## Глоссарий Human Design — португальский (pt, европейский)

Для переводчика и вычитчика калькулятора `linkeon.io/pt/calculators/human-design/`. Термины в текстах — ровно как в колонке «на португальском». Владелец утверждает глоссарий до перевода; решения по разделу «Сомнения» в конце правят этот файл.

### Источники и сокращения

Португальские (Португалия):
- **PHDS** — Portugal Human Design School (phds.pt): «gráfico (bodygraph)», «64 portas», «Preto-Vermelho, Personalidade e Desenho», «Cruz de Encarnação», «Geradores Manifestadores».
- **siddhi.pt** — португальская школа с бесплатным расчётом и глоссарием: «Bodygraph», «Lado da personalidade / Lado do desenho», «Indefinição», «Gerador Manifestante».
- **omapadotesouro.com** («Desenho Humano Portugal»), **yourselfstory.pt**, **allaboutyou-hd.pt**, **thisisyou.substack.com** — португальские практики.
- **GM pt-pt** — португальская (pt-PT) версия крупного международного HD-сайта Genetic Matrix: полный список каналов и центров. Перевод местами машинный («Sensibilização», «Valete de todas as trocas»), поэтому для сверки, а не как образец.

Бразильские (для сравнения и в колонке «сомнение»): **humandesign.com.br**, **desenhohumano.com.br** (глоссарий), **arquetipos.com.br**, **autoridadeinterna.com**.

Наш сайт: `src/content/assistants/pages/pt/raya.ts` и `src/i18n/locales/pt.json` (уже на португальском: «Human Design», «bodygraph», «Manifestador», «Emocional (Plexo Solar)», «Investigador / Mártir», «portas», «cruz de encarnação»).

### Написание

- Европейский португальский по реформе AO90, как весь `pt` сайта («ação», «exata», «objetivo», но «contacto», «facto»): **Projetor, Refletor, autoprojetada, Abstração**; дореформенные «Projector», «Reflector», «Auto-Projectada» (встречаются у siddhi.pt) не брать. Где португальское и бразильское написание расходится — португальское: **esplénico/esplénica** (не «esplênico»).
- Названия типов в тексте — с заглавной, как в русском и в португальских источниках: «o Gerador», «os Projetores», «os Geradores Manifestantes».
- Названия центров — с заглавной, как в португальских источниках и на нашей `raya.ts` («Plexo Solar»): «liga o Centro G ao Centro da Garganta». Слово «centro» без названия — со строчной.
- Описания центров и каналов после «Название —» начинаются со строчной, как в русском.

### 1. Общие термины

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| humanDesign | Human Design | **Human Design** (o Human Design, м. р.) | Латиницей пишут PHDS, siddhi.pt, yourselfstory.pt, allaboutyou-hd.pt; так уже на нашем сайте (pt.json, raya.ts). | «Desenho Humano» (Бразилия, omapadotesouro.com) и «Design Humano» (GM pt-pt) — только как поисковые слова в title/description/H1, см. «Сомнения», п. 5. |
| bodygraph | бодиграф | **bodygraph** (o bodygraph) | PHDS («o Gráfico (bodygraph)»), siddhi.pt, наши pt.json и raya.ts. | В тексте допустимы синонимы «gráfico», «mapa»; бразильское «CorpoGráfico» не брать. |
| chart | карта (в тексте: «карта считается в браузере») | **mapa** | siddhi.pt, наша raya.ts («o mapa»). | — |
| type | тип | **tipo** | Везде; siddhi.pt пишет «Aura (tipo)». | — |
| strategy | стратегия | **estratégia** | Везде; PHDS говорит и полностью — «Estratégia de Vida». | Полная форма не нужна. |
| authority | авторитет | **autoridade** | Везде; у PHDS полностью — «Autoridade Interna de Decisão». | — |
| profile | профиль | **perfil** | Везде. | — |
| profileLine | линия профиля | **linha** (do perfil) | omapadotesouro.com, yourselfstory.pt: «Linha 1 – O Investigador». | — |
| definition | определённость | **definição** | PHDS, siddhi.pt, omapadotesouro.com. | — |
| center | центр | **centro** | Везде. | — |
| definedCenter | определённый центр | **centro definido** | Везде («definido» — окрашенный). | — |
| openCenter | открытый центр | **centro aberto** (подпись — «Centros abertos») | как на странице Райи — **решение владельца 14.10**; прежнее обоснование: Португальские школы: siddhi.pt («Indefinição — o que está a branco»), omapadotesouro.com («Definido / Indefinido»); так же в Бразилии. | «aberto» — дословно с русского, уже стоит в нашей raya.ts; в HD «aberto» точнее значит «центр без единых ворот». См. «Сомнения», п. 3. |
| channel | канал | **canal** (мн. canais) | Везде. | — |
| gate | ворота | **porta** (мн. portas) | PHDS («64 portas»), siddhi.pt, наша raya.ts. | «portão» (thisisyou) — реже. |
| personality | Личность (чёрное в схеме) | **Personalidade** | PHDS («Preto-Vermelho, Personalidade e Desenho»), siddhi.pt («Lado da personalidade»). | — |
| design | Дизайн (красное в схеме) | **Desenho** | PHDS и siddhi.pt («Lado do desenho»): португальские школы так и говорят при латинском «Human Design». | «Design» — бразильский глоссарий desenhohumano.com.br; ближе к латинскому «Human Design». См. «Сомнения», п. 2. |
| legendPersonality | Личность — момент рождения | **Personalidade — momento do nascimento** | Термин выше. | — |
| legendDesign | Дизайн — примерно за 88 дней до рождения | **Desenho — cerca de 88 dias antes do nascimento** | siddhi.pt: «activações 88 dias antes do teu nascimento». | При выборе «Design»: «Design — cerca de 88 dias antes do nascimento». |
| incarnationCross | инкарнационный крест | **cruz de encarnação** | PHDS, siddhi.pt, наша raya.ts. | «cruz da encarnação» (omapadotesouro.com) — реже. |
| lunarNode | лунный узел (истинный / средний), в FAQ | **nodo lunar** (verdadeiro / médio) | В португальской астрологии и HD — «Nodo Norte / Nodo Sul». | «nó lunar» — астрономический термин, в HD реже. |
| experiment | эксперимент на 7 дней (ctaNote, FAQ) | **experiência de 7 dias** | Так на нашей raya.ts («Experiência de 7 dias»). | В школах — «experimento» (siddhi.pt); оставить как у Райи. |

### 2. Типы и стратегии

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| generator.name | Генератор | **Gerador** | Везде (PHDS, siddhi.pt, omapadotesouro.com, Бразилия). | — |
| generator.strategy | Откликаться | **Esperar para responder** | PHDS («esperar para responder à vida»), allaboutyou-hd.pt, omapadotesouro.com, бразильский глоссарий. | Короткое «Responder» — как русское «Откликаться» и англ. «To Respond»; см. «Сомнения», п. 1. |
| manifestingGenerator.name | Манифестирующий генератор | **Gerador Manifestante** | siddhi.pt, omapadotesouro.com, allaboutyou-hd.pt, GM pt-pt, бразильские сайты. | «Gerador Manifestador» — PHDS и seciente.pt; см. «Сомнения», п. 4. |
| manifestingGenerator.strategy | Откликаться, затем информировать | **Esperar para responder e informar antes de agir** | omapadotesouro.com («Esperar para Responder e Informar Antes de Agir»), бразильские сайты. | Короче, по образцу русского решения, — «Responder e depois informar», но названием стратегии оно нигде не встречается. |
| manifestor.name | Манифестор | **Manifestador** | Везде; так на нашей raya.ts. | — |
| manifestor.strategy | Информировать | **Informar antes de agir** | allaboutyou-hd.pt, omapadotesouro.com, PHDS («devem informar antes de agir»), бразильский глоссарий. | Короткое «Informar» — как русское и англ. «To Inform». |
| projector.name | Проектор | **Projetor** | PHDS («Projetores»), omapadotesouro.com, allaboutyou-hd.pt; написание AO90. | «Projector» — дореформенное (siddhi.pt), не брать. |
| projector.strategy | Ждать приглашения | **Esperar pelo convite** | PHDS, allaboutyou-hd.pt, omapadotesouro.com. | Бразильские варианты — «Esperar o convite», «esperar ser reconhecido e convidado». |
| reflector.name | Рефлектор | **Refletor** | PHDS («Refletores»), omapadotesouro.com, allaboutyou-hd.pt; написание AO90. | «Reflector» — дореформенное (siddhi.pt), не брать. |
| reflector.strategy | Ждать лунный цикл — около 28 дней | **Esperar um ciclo lunar — cerca de 28 dias** | allaboutyou-hd.pt, PHDS («esperar um ciclo lunar»). | «Aguardar um ciclo lunar» (omapadotesouro.com). PHDS пишет «29 dias» (синодический месяц); у нас 28, как в русском тексте: за это время Луна проходит все 64 ворот. |

### 3. Авторитеты

`name` — значение в строке «Autoridade — …» (род женский, к «autoridade»); `inMessage` — подставляется в сообщение Райе после запятой, поэтому это именная группа без артикля.

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| emotional.name | Эмоциональный (солнечное сплетение) | **Emocional (Plexo Solar)** | Ровно так на нашей raya.ts; «Autoridade Emocional» — везде. | — |
| emotional.inMessage | эмоциональный авторитет | **autoridade emocional** | Везде. | — |
| sacral.name | Сакральный | **Sacral** | «Autoridade Sacral» — yourselfstory.pt, бразильские сайты. | — |
| sacral.inMessage | сакральный авторитет | **autoridade sacral** | То же. | — |
| splenic.name | Селезёночный | **Esplénica** | «Autoridade Esplénica» — yourselfstory.pt, omapadotesouro.com. | Бразильское написание — «Esplênica»; «do Baço» — реже. |
| splenic.inMessage | селезёночный авторитет | **autoridade esplénica** | То же. | — |
| ego.name | Эго (сердечный центр) | **Ego (Centro do Coração)** | «Autoridade do Ego» — desenhohumano.com.br; центр — как в разделе 6, порядок — как в русском. | «Egoica» (omapadotesouro.com, там с ошибкой «Egoíca»). Деление на «Ego manifestada / Ego projetada» (autoridadeinterna.com) не нужно: текст у нас один. |
| ego.inMessage | авторитет эго | **autoridade do ego** | desenhohumano.com.br. | — |
| selfProjected.name | Самопроецированный | **Autoprojetada** | autoridadeinterna.com («Autoridade Autoprojetada»), omapadotesouro.com («Auto-Projetada»); по AO90 слитно. | «Self Projetado» (desenhohumano.com.br) — гибрид, не брать. |
| selfProjected.inMessage | самопроецированный авторитет | **autoridade autoprojetada** | То же. | — |
| mental.name | Ментальный (через окружение) | **Mental (ambiental)** | «Mental» — omapadotesouro.com; «Ambiental», «Mental / Ambiente» — autoridadeinterna.com, desenhohumano.com.br; в скобках пояснение, как в русском. | «Mental (através do ambiente)» — дословнее, но длиннее. «Externa» / «sem autoridade interior» (по англ. Outer Authority) читается как «авторитета нет». |
| mental.inMessage | ментальный авторитет | **autoridade mental** | То же. | — |
| lunar.name | Лунный | **Lunar** | Везде («Autoridade Lunar»). | — |
| lunar.inMessage | лунный авторитет | **autoridade lunar** | То же. | — |

Как звучит фраза «Мой тип — …, профиль 2/4, авторитет — …»:

- «O meu tipo é Gerador Manifestante, perfil 2/4, autoridade emocional.»
- «O meu tipo é Manifestador, perfil 2/4, autoridade do ego.»
- «O meu tipo é Projetor, perfil 2/4, autoridade autoprojetada.»
- Отдельной фразой: «A minha autoridade é emocional» / «Tenho autoridade emocional». Для эго так не говорят: «tenho autoridade do ego», а не «a minha autoridade é do ego». Поэтому в сообщении — именная группа из `inMessage`.
- Кусок сообщения Райе с подстановкой (Райя — `Raya`, к ней на «tu»): «… A calculadora mostrou: Refletor, perfil 6/2, autoridade lunar. …»

### 4. Линии профиля

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| line1 | Исследователь | **Investigador** | omapadotesouro.com, yourselfstory.pt, Бразилия; наша raya.ts («Investigador / Mártir»). | — |
| line2 | Отшельник | **Eremita** | То же. | — |
| line3 | Мученик | **Mártir** | То же. | — |
| line4 | Оппортунист | **Oportunista** | То же. | — |
| line5 | Еретик | **Herege** | То же. | — |
| line6 | Ролевая модель | **Modelo** | omapadotesouro.com («Linha 6 – O Modelo»), yourselfstory.pt, Бразилия (англ. Role Model). | «Modelo a seguir» — точнее передаёт Role Model и русское «Ролевая модель», но в HD-источниках не встретилось; см. «Сомнения», п. 7. |

Формат строки профиля — **«1/3 · Investigador / Mártir»**: без артиклей (в источниках «O Investigador/O Mártir», но в строке результата артикли лишние; на raya.ts тоже без них), пробелы вокруг «/» в названии — как в русском.

| код | по-русски | на португальском |
|---|---|---|
| 1/3 | Исследователь / Мученик | Investigador / Mártir |
| 1/4 | Исследователь / Оппортунист | Investigador / Oportunista |
| 2/4 | Отшельник / Оппортунист | Eremita / Oportunista |
| 2/5 | Отшельник / Еретик | Eremita / Herege |
| 3/5 | Мученик / Еретик | Mártir / Herege |
| 3/6 | Мученик / Ролевая модель | Mártir / Modelo |
| 4/6 | Оппортунист / Ролевая модель | Oportunista / Modelo |
| 4/1 | Оппортунист / Исследователь | Oportunista / Investigador |
| 5/1 | Еретик / Исследователь | Herege / Investigador |
| 5/2 | Еретик / Отшельник | Herege / Eremita |
| 6/2 | Ролевая модель / Отшельник | Modelo / Eremita |
| 6/3 | Ролевая модель / Мученик | Modelo / Mártir |

### 5. Определённость

Значение в строке «Definição — …»; род женский, к «definição».

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| none | Нет определённости | **Sem definição** | desenhohumano.com.br («sem definição»). | — |
| single | Одинарная | **Singular** | thisisyou.substack.com (PT), desenhohumano.com.br, arquetipos.com.br. | «Única» — omapadotesouro.com (PT); «Simples» — реже. |
| split | Расщеплённая (двойная) | **Bipartida** | omapadotesouro.com, arquetipos.com.br; приставка «bi-» уже говорит «двойная», скобка не нужна; ряд с «Tripartida», «Quadripartida». | «Partida» (thisisyou, desenhohumano.com.br) — одно слово читается и как «сломанная»; «Dividida» — чаще в Бразилии. См. «Сомнения», п. 8. |
| triple | Тройная | **Tripartida** | Везде (Португалия и Бразилия). | «Tripla» — реже. |
| quadruple | Четверная | **Quadripartida** | Везде. | «Quádrupla» — реже. |

### 6. Центры

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| head | Теменной центр | **Centro da Cabeça** | yourselfstory.pt, GM pt-pt, desenhohumano.com.br; англ. Head Center. | «Centro Coroa» (omapadotesouro.com) ближе к русскому «теменной», но реже. |
| ajna | Аджна | **Ajna** | Везде («Centro Ajna»); коротко, как в русском. | В тексте можно «o Centro Ajna». |
| throat | Горловой центр | **Centro da Garganta** | yourselfstory.pt, desenhohumano.com.br. | — |
| g | Центр G (идентичность) | **Centro G (identidade)** | «Centro G» — везде; пояснение, как в русском. | «Centro do Ser» (yourselfstory.pt), «Centro da Identidade» — реже. |
| heart | Сердечный центр (эго) | **Centro do Coração (ego)** | yourselfstory.pt, GM pt-pt («Centro do Coração»), desenhohumano.com.br («Centro do Coração / Ego»). | — |
| spleen | Селезёночный центр | **Centro Esplénico** | yourselfstory.pt; в паре с «autoridade esplénica». | «Centro do Baço» (omapadotesouro.com, GM pt-pt) — тоже португальское и проще на слух; бразильское написание — «Esplênico». |
| solarPlexus | Солнечное сплетение | **Plexo Solar** | Везде; так на нашей raya.ts. | — |
| sacral | Сакральный центр | **Centro Sacral** | yourselfstory.pt, GM pt-pt, desenhohumano.com.br. | «Centro Sacro» (omapadotesouro.com). |
| root | Корневой центр | **Centro da Raiz** | yourselfstory.pt, desenhohumano.com.br. | — |

### 7. Каналы

Строка результата — «7-31 · O Alfa — liga o Centro G ao Centro da Garganta…». Где у английского названия есть «The», в португальских списках стоит артикль («A batida», «O Alfa»; у бразильских — «Canal do Alfa», «Canal da Onda Cerebral»); оставляем его. Регистр — как в португальском списке GM pt-pt: заглавная только у первого слова, «Alfa» — с заглавной. Источник «оба» — GM pt-pt и бразильский список (humandesign.com.br / arquetipos.com.br).

| код | по-русски | на португальском | обоснование | сомнение |
|---|---|---|---|---|
| 1-8 | Вдохновение | **Inspiração** | англ. Inspiration; оба. | — |
| 2-14 | Пульс | **A batida** | англ. The Beat; GM pt-pt (в бразильском списке оставлено английское). | «O pulso» — как в русском, но «Pulso» в португальских списках — ключевое слово канала 3-60. |
| 3-60 | Мутация | **Mutação** | англ. Mutation; оба. | — |
| 4-63 | Логика | **Lógica** | англ. Logic; оба. | — |
| 5-15 | Ритм | **Ritmo** | англ. Rhythm; оба. | — |
| 6-59 | Близость | **Intimidade** | англ. Mating; GM pt-pt; совпадает с русским «Близость». | «Acasalamento» — бразильский список, дословно Mating, но по-португальски так говорят о животных. |
| 7-31 | Альфа | **O Alfa** | англ. The Alpha; GM pt-pt, бразильское «Canal do Alfa». | — |
| 9-52 | Концентрация | **Concentração** | англ. Concentration; оба. | — |
| 10-20 | Пробуждение | **Despertar** | англ. Awakening; оба. | — |
| 10-34 | Исследование | **Exploração** | англ. Exploration; оба. | — |
| 10-57 | Совершенная форма | **Forma aperfeiçoada** | англ. Perfected Form; оба. | «Forma perfeita» — ближе к русскому, но не устоялось. |
| 11-56 | Любопытство | **Curiosidade** | англ. Curiosity; оба. | — |
| 12-22 | Открытость | **Abertura** | англ. Openness; оба. | — |
| 13-33 | Блудный сын | **O pródigo** | англ. The Prodigal; GM pt-pt, бразильское «Canal do Pródigo». | «O filho pródigo» — как в русском, узнаваемо по Библии, но в HD-списках не встречается. |
| 16-48 | Длина волны | **O comprimento de onda** | англ. The Wavelength; оба. | — |
| 17-62 | Принятие | **Aceitação** | англ. Acceptance; оба. | — |
| 18-58 | Суждение | **Julgamento** | англ. Judgement; оба. | — |
| 19-49 | Синтез | **Síntese** | англ. Synthesis; оба. | — |
| 20-34 | Харизма | **Carisma** | англ. Charisma; оба. | — |
| 20-57 | Мозговая волна | **A onda cerebral** | англ. The Brainwave; оба. | — |
| 21-45 | Деньги | **A linha do dinheiro** | англ. The Money Line; оба. | «Dinheiro» — короче, как русское «Деньги», но в списках не встречается. |
| 23-43 | Структурирование | **Estruturação** | англ. Structuring; оба. | — |
| 24-61 | Осознанность | **Consciência** | англ. Awareness; бразильский список. | В GM pt-pt — «Sensibilização»: машинный перевод, по-португальски это «информационная кампания». |
| 25-51 | Инициация | **Iniciação** | англ. Initiation; оба. | — |
| 26-44 | Передача | **A transmissão** | «Rendição» читается как «капитуляция» — **решение владельца 14.10**; прежнее обоснование: англ. Surrender; оба. | Русское «Передача» — по ключевому слову канала (a Transmitter); «Transmissão» по-португальски названием канала не встречается, а «Rendição» звучит как «капитуляция». См. «Сомнения», п. 6. |
| 27-50 | Сохранение | **Preservação** | англ. Preservation; оба. | — |
| 28-38 | Борьба | **Luta** | англ. Struggle; оба. | — |
| 29-46 | Открытие | **Descoberta** | англ. Discovery; оба. | — |
| 30-41 | Узнавание | **Reconhecimento** | англ. Recognition; оба. | — |
| 32-54 | Трансформация | **Transformação** | англ. Transformation; оба. | — |
| 34-57 | Сила | **Poder** | англ. Power; бразильский список. | «Potência» — GM pt-pt; ближе к физической мощности, чем к Power. |
| 35-36 | Преходящесть | **Transitoriedade** | англ. Transitoriness; оба. | — |
| 37-40 | Сообщество | **Comunidade** | англ. Community; оба. | — |
| 39-55 | Эмоциональность | **Emoção** | англ. Emoting; бразильский список («Canal de Emoção»), единственное число, как у остальных названий. | «Emoções» — GM pt-pt; «Emotividade» ближе к русскому и к Emoting, но не встречается. |
| 42-53 | Созревание | **Maturação** | англ. Maturation; оба. | — |
| 47-64 | Абстракция | **Abstração** | англ. Abstraction; оба; написание AO90. | — |

### Сомнения

Только то, что стоит решить владельцу.

1. **Стратегии: длинные формы сообщества или короткие, как в русском.** В глоссарии — устоявшиеся португальские: «Esperar para responder», «Esperar para responder e informar antes de agir», «Informar antes de agir». Короткие формы по образцу русского решения на СТОП 1 («Откликаться», «Информировать») — «Responder», «Responder e depois informar», «Informar»: они ближе к англ. «To Respond» / «To Inform», но средняя названием нигде не встречается. Длинная форма Манифестирующего генератора — 47 знаков в строке «Estratégia».
2. **Красная сторона схемы: «Desenho» или «Design».** Португальские школы (PHDS, siddhi.pt) говорят «Personalidade / Desenho» и при этом пишут систему латиницей «Human Design». «Design» — бразильский глоссарий, и с латинским названием системы он связан прямее.
3. **«Открытые центры»: «indefinido» или «aberto».** В португальском HD принято «centro indefinido», в глоссарии стоит оно. «Aberto» — дословно с русского, и на нашей странице Райи уже написано «que centros estão abertos»; но в HD «aberto» точнее значит центр без единых ворот.
4. **«Gerador Manifestante» или «Gerador Manifestador».** Большинство португальских и все бразильские источники пишут «Manifestante». «Manifestador» — у PHDS, национальной школы.
5. **Поисковое слово в title/description/H1.** План (правило 4) задаёт «calculadora de Design Humano». В португальских источниках чаще встречается «Desenho Humano» (omapadotesouro.com «Desenho Humano Portugal», thisisyou, вся Бразилия); «Design Humano» встретилось только в pt-pt-версии GM. Сам текст в любом случае пишет «Human Design» латиницей.
6. **Канал 26-44.** Устоявшееся «Rendição» (Surrender) звучит как «капитуляция», а русское «Передача» описывает суть канала (передатчик). Оставить «Rendição» или назвать по-своему («Transmissão»)? Второе по-португальски нигде не встречается.
7. **Линия 6: «Modelo» или «Modelo a seguir».** В источниках — «Modelo»; «Modelo a seguir» понятнее (русское «Ролевая модель», англ. Role Model), но это наш вариант, в HD-текстах он не встретился.
8. **Расщеплённая определённость: «Bipartida» или «Partida (dupla)».** «Bipartida» однозначна и в ряд с «Tripartida» / «Quadripartida»; «Partida» распространена шире, но одно слово читается и как «сломанная». Скобкой «(dupla)» оно повторило бы приём русского «Расщеплённая (двойная)».


## Глоссарий Human Design — китайский (zh)

Для переводчика и вычитчика калькулятора `/zh/calculators/human-design/`. Каждый термин — ровно как в колонке «на китайском», во всех полях `texts/zh.ts`.

**Общие решения**

- **Письмо — упрощённые иероглифы** (материковый Китай). Китайскоязычное сообщество HD выросло из тайваньской школы, поэтому в сети много традиционных форм (人類圖, 薦骨, 閘門, 頭腦, 輪迴): их не берём, только упрощённые (人类图, 荐骨, 闸门, 头脑, 轮回). Термины те же: материковые издания этой школы — те же слова в упрощённом написании.
- **«Human Design» переводим: 人类图.** Латиницей по-китайски не пишут, во всём китайскоязычном сообществе метод называется 人类图. На сайте так уже сделано (`zh.json`: «人类图计算», страница Райи). Поисковые слова: 人类图计算器, 人类图排盘, 免费.
- **Каналы** в сообществе называют «X的通道» (启发的通道) и ставят номер перед названием: «1-8 启发的通道». У нас строку собирает код: «1-8 · 启发的通道», ключ всегда с меньшими воротами впереди. В китайских источниках бывает «1—8» или «63-4», но формат ключа не меняем.
- Обращение к читателю — 你. Райя — 拉娅 (`roster.data.js`).
- Пунктуация полноширинная (，。：（）——), между иероглифами пробелов нет. Цифры ставим вплотную к иероглифам: «人生角色2/4», «约28天», «64个闸门».

**Сокращения в обосновании**

- [К] — книга о 36 каналах крупнейшей китайскоязычной школы, материковое издание (华夏出版社, упрощённые иероглифы): 《活出你的天赋才华：人类图通道开启独一无二的人生》.
- [Ш] — 亚洲人类图学院 (Тайвань, крупнейшая китайскоязычная школа, humandesignasia.org) и её книги.
- [С] — материковые статьи и блоги (知乎, 简书, CSDN, 163.com, 搜狐).
- [Р] — наша страница Райи на китайском (`src/content/assistants/pages/zh/raya.ts`).

---

### 1. Общие термины

| код | по-русски | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| — | Human Design | 人类图 | Так метод называют [Ш], [К] и [С], так же на всём нашем сайте. | 人类设计 — дословный вариант, встречается у немногих авторов на 知乎; не берём. |
| — | бодиграф (схема) | 人类图 (в тексте: 你的人类图) | По-китайски карту называют тем же словом, что и метод: «看懂你的人类图» ([С], [Р]). | 人体图 (китайская Википедия), 身体图 (отдельные калькуляторы) — редкие; если нужен отдельный термин для схемы, то 人体图. |
| — | рассчитать / построить бодиграф | 排盘 (сущ.: 人类图排盘) | Устойчивый глагол для расчёта карты в [С] и [Р] («拉娅帮你排盘»). | — |
| `result.typeLabel` | тип | 类型 | [Ш], [С], [Р]. | — |
| `result.strategyLabel` | стратегия | 策略 | [Ш], [С], [Р]; полная форма 人生策略 допустима в тексте. | — |
| `result.authorityLabel` | авторитет | 内在权威 | [Ш], [С], [Р]; в названиях конкретных авторитетов — «…权威». | — |
| `result.profileLabel` | профиль | 人生角色 | [Ш], [С], [Р] («人生角色 — 1/3»). | — |
| — | линия профиля | 爻 (1爻, 第1爻) | Линии нумеруют как черты гексаграммы: «1爻 研究者» ([Ш], [С]). | 线 («第一条线») понятно, но в сообществе реже. |
| `result.definitionLabel` | определённость | 定义 | [Ш], [С]: «定义：二分人». | — |
| — | центр | 能量中心 (коротко 中心) | [Ш], [С], [Р] («9个能量中心»). | — |
| `result.definedCenters` | определённый центр / Определённые центры | 有定义的中心 | [Ш], [С]. | Разговорно 有颜色的中心 («окрашенный»), в подписях не берём. |
| `result.openCenters` | открытый центр / Открытые центры | 开放的中心 | Так на [Р] («哪些能量中心是开放的») и во многих [С]. | В [Ш] и [К] — 空白中心 («белый центр»); см. «Сомнения». |
| `result.channels` | канал / Каналы | 通道 | [К], [Ш], [С], [Р]. | — |
| — | ворота | 闸门 | [Ш], [С], [Р] («64个闸门»). | — |
| `result.legendPersonality` | Личность (чёрное) | 个性 → подпись «个性——出生时刻» | Чёрное = 个性 (Personality) в [Ш] и [С]. | В пояснениях рядом бывает 意识/显意识 («сознательное»), это не название. |
| `result.legendDesign` | Дизайн (красное) | 设计 → подпись «设计——约出生前88天» | Красное = 设计 (Design), «出生前约88天» — так в [Ш] и [С]. | — |
| — | инкарнационный крест | 轮回交叉 | [Ш], [С], [Р] («轮回交叉指向哪里»). | 化身十字 — калька с английского, редко; 人生使命 — описательное, не название. |

### 2. Типы и стратегии

| код | по-русски | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| `generator` | Генератор | 生产者 | [Ш], [С], китайская Википедия. | — |
| `generator.strategy` | Откликаться | 等待回应 | Стратегия Генератора во всех источниках [Ш], [С] — «等待回应». | Дословно «Откликаться» = 回应, без «ждать»; см. «Сомнения». |
| `manifestingGenerator` | Манифестирующий генератор | 显示生产者 | [Ш], [С], Википедия. | 显化生产者 — у части новых переводов; не берём. |
| `manifestingGenerator.strategy` | Откликаться, затем информировать | 等待回应，然后告知 | В [С] так и пишут: «先等待回应，然后告知». | Короче — «回应，再告知»; держим одну форму с Генератором. |
| `manifestor` | Манифестор | 显示者 | [Ш], [С], [Р] («显示者（Manifestor）»). | 显化者 — реже. |
| `manifestor.strategy` | Информировать | 告知 | [Ш], [С], [Р] («告知不等于请求许可»). | — |
| `projector` | Проектор | 投射者 | [Ш], [С], Википедия. | — |
| `projector.strategy` | Ждать приглашения | 等待被邀请 | [Ш], [С]. | — |
| `reflector` | Рефлектор | 反映者 | [Ш], [С], Википедия. | 反射者 — встречается, реже. |
| `reflector.strategy` | Ждать лунный цикл — около 28 дней | 等待一个月亮周期（约28天） | В [С] — «等待月亮周期二十八天», «等待28天（一个完整的月亮周期）». | — |

### 3. Авторитеты

`name` — заголовок в строке «内在权威»; `inMessage` — как авторитет звучит в сообщении Райе от первого лица. По-китайски обе формы совпадают. Русские скобки («солнечное сплетение», «сердечный центр», «через окружение») здесь не нужны: центр уже есть в китайском названии (情绪 = 情绪中心, 意志力 = 意志力中心), а 环境 и значит «через окружение».

| код | по-русски | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| `emotional.name` | Эмоциональный (солнечное сплетение) | 情绪权威 | [Ш] «情绪内在权威», [С] «情绪权威», [Р]. | На [Р] в примере ответа — «情绪权威（情绪中心）»; со скобкой тоже правильно, но избыточно. |
| `emotional.inMessage` | эмоциональный авторитет | 情绪权威 | Так же. | — |
| `sacral.name` | Сакральный | 荐骨权威 | [Ш], [С]. | 骶骨 — анатомически точнее, но в HD почти не встречается. |
| `sacral.inMessage` | сакральный авторитет | 荐骨权威 | Так же. | — |
| `splenic.name` | Селезёночный | 直觉权威 | Селезёночный центр по-китайски — 直觉中心, отсюда «直觉权威» в [Ш] и [С]. | «脾» (селезёнка) в названии не используют. |
| `splenic.inMessage` | селезёночный авторитет | 直觉权威 | Так же. | — |
| `ego.name` | Эго (сердечный центр) | 意志力权威 | Сердечный центр — 意志力中心, авторитет — «意志力（内在）权威» в [Ш] и [С]. | «自我型权威» у части [С] — не берём: 自我 путается с 自我投射. |
| `ego.inMessage` | авторитет эго | 意志力权威 | Так же. | — |
| `selfProjected.name` | Самопроецированный | 自我投射权威 | [Ш] («自我投射型（G中心内在权威）»), [С]. | — |
| `selfProjected.inMessage` | самопроецированный авторитет | 自我投射权威 | Так же. | — |
| `mental.name` | Ментальный (через окружение) | 环境权威 | В [С] — «环境权威», «环境（无内在权威）»: ясность приходит через окружение. | [Ш] пишет «无内在权威» («нет внутреннего авторитета»); дословное «心智权威» почти не встречается. См. «Сомнения». |
| `mental.inMessage` | ментальный авторитет | 环境权威 | Так же. | — |
| `lunar.name` | Лунный | 月亮权威 | [С] — «月亮权威»; так же стратегия Рефлектора — «月亮周期». | [Ш] пишет «月循环（内在）权威» — тоже понятно. |
| `lunar.inMessage` | лунный авторитет | 月亮权威 | Так же. | — |

**Как звучит фраза «Мой тип — …, профиль 2/4, авторитет — …»**

- Полная форма: 我的类型是投射者，人生角色是2/4，内在权威是情绪权威。
- В шаблоне сообщения Райе (русское «Калькулятор показал: {type}, профиль {profile}, {authority}.»): 计算器显示：投射者，人生角色2/4，情绪权威。
- Разговорное «у меня эмоциональный авторитет»: 我是情绪权威。
- Остальные шесть встают так же: …，人生角色2/4，荐骨权威 / 直觉权威 / 意志力权威 / 自我投射权威 / 环境权威 / 月亮权威。

### 4. Линии профиля и строка профиля

| код | по-русски | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| 1 | Исследователь | 研究者 | [Ш], [С], [Р] («1/3：研究者 / 烈士»). | 研究员 — у отдельных сайтов. |
| 2 | Отшельник | 隐士 | [Ш], [С]. | — |
| 3 | Мученик | 烈士 | [Ш], [С], [Р]. | — |
| 4 | Оппортунист | 机会主义者 | [Ш], [С]. | Слово по-китайски с оттенком осуждения, как и русское; в сообществе устоялось, замены нет. |
| 5 | Еретик | 异端者 | [Ш], [С]. | — |
| 6 | Ролевая модель | 人生典范 | [Ш], [С] («6爻 人生典范»). | 榜样 — бытовое слово, как название линии не устоялось. |

**Формат строки профиля** (код собирает её как `{профиль} · {name}`): `1/3 · 研究者／烈士`. В `profiles.*.name` между линиями ставим полноширинную косую «／» без пробелов (правило 6 плана: полноширинная пунктуация, без пробелов между иероглифами).

Все 12 значений `profiles.*.name`:

| ключ | `name` |
|---|---|
| 1/3 | 研究者／烈士 |
| 1/4 | 研究者／机会主义者 |
| 2/4 | 隐士／机会主义者 |
| 2/5 | 隐士／异端者 |
| 3/5 | 烈士／异端者 |
| 3/6 | 烈士／人生典范 |
| 4/6 | 机会主义者／人生典范 |
| 4/1 | 机会主义者／研究者 |
| 5/1 | 异端者／研究者 |
| 5/2 | 异端者／隐士 |
| 6/2 | 人生典范／隐士 |
| 6/3 | 人生典范／烈士 |

Сомнение: на [Р] — «研究者 / 烈士» (полуширинная косая с пробелами), в [С] чаще «研究者/烈士» без пробелов. Выбрано «／» по правилу 6; [Р] в этой задаче не правим.

### 5. Определённость

| код | по-русски | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| `none` | Нет определённости | 无定义 | [Ш] «無定義», [С]. | — |
| `single` | Одинарная | 一分人 | [Ш], [С]: «五种定义：无定义、一分人、二分人、三分人、四分人». | Это существительные-люди («человек из одной части»), но в строке «定义：一分人» так пишут все китайские карты. Дословные «单一定义» и т. п. — у переводных сайтов, не берём. |
| `split` | Расщеплённая (двойная) | 二分人 | Так же; «две части» уже в слове, скобка не нужна. | — |
| `triple` | Тройная | 三分人 | Так же. | — |
| `quadruple` | Четверная | 四分人 | Так же. | — |

### 6. Центры

| код | по-русски | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| `head` | Теменной центр | 头脑中心 | [Ш] «頭腦中心», [С]. | 头顶中心 («теменной») — встречается, реже. |
| `ajna` | Аджна | 逻辑中心 | [Ш], [С]: Аджну по-китайски зовут «логическим центром». | Транслитерация «阿姬那» почти не встречается. |
| `throat` | Горловой центр | 喉咙中心 | [Ш], [С]. | — |
| `g` | Центр G (идентичность) | G中心 | [Ш], [С] — без пояснения; про любовь, направление и «身份认同» говорит описание. | Если нужна скобка, как в русском, — «G中心（身份认同）»; в сообществе её не пишут. |
| `heart` | Сердечный центр (эго) | 意志力中心 | [Ш], [С] («意志力中心»). | 心脏中心 встречается реже; скобку «（心脏）» не добавляем, чтобы не плодить второе название. |
| `spleen` | Селезёночный центр | 直觉中心 | [Ш], [С]. | — |
| `solarPlexus` | Солнечное сплетение | 情绪中心 | [Ш], [С], [Р] («情绪权威（情绪中心）»). | 太阳神经丛 — анатомическое слово, в HD почти не используют. Во всех текстах (типы, авторитеты) «солнечное сплетение» → 情绪中心. |
| `sacral` | Сакральный центр | 荐骨中心 | [Ш] «薦骨中心», [С]. | 骶骨中心 — реже. |
| `root` | Корневой центр | 根部中心 | [Ш], [С]. | 根中心 — встречается, реже. |

### 7. Каналы

Все названия — по оглавлению [К]; так же их называют [Ш] и сайты [С]. Где китайское название расходится по смыслу с русским/английским, это отмечено в «сомнении»; берём китайское, потому что оно устоялось.

| код | по-русски (англ.) | на китайском | обоснование | сомнение |
|---|---|---|---|---|
| `1-8` | Вдохновение (Inspiration) | 启发的通道 | [К], [Ш], [С]. | — |
| `2-14` | Пульс (The Beat) | 脉动的通道 | [К], [Ш], [С]. | — |
| `3-60` | Мутация (Mutation) | 突变的通道 | [К], [Ш], [С]. | — |
| `4-63` | Логика (Logic) | 逻辑的通道 | [К], [Ш], [С]. | — |
| `5-15` | Ритм (Rhythm) | 韵律的通道 | [К], [Ш], [С]. | — |
| `6-59` | Близость (Mating) | 亲密的通道 | [К], [Ш], [С]. | — |
| `7-31` | Альфа (The Alpha) | 创始者的通道 | [К], [Ш], [С]. | По смыслу «Основатель», не «Альфа»; калька «阿尔法» не встречается. |
| `9-52` | Концентрация (Concentration) | 专心的通道 | [К], [Ш], [С]. | — |
| `10-20` | Пробуждение (Awakening) | 觉醒的通道 | [К], [Ш], [С]. | — |
| `10-34` | Исследование (Exploration) | 探索的通道 | [К], [Ш], [С]. | — |
| `10-57` | Совершенная форма (Perfected Form) | 完美展现的通道 | [К], [Ш], [С]. | Дословно «совершенное проявление». |
| `11-56` | Любопытство (Curiosity) | 好奇的通道 | [К], [Ш], [С]. | — |
| `12-22` | Открытость (Openness) | 开放的通道 | [К], [Ш], [С]. | — |
| `13-33` | Блудный сын (The Prodigal) | 足智多谋的通道 | [К], [Ш], [С]. | По смыслу «Находчивость». У части [С] — калька 浪子的通道; не берём. |
| `16-48` | Длина волны (The Wavelength) | 才华的通道 | [К], [Ш], [С]. | По смыслу «Талант»; калька «波长» не встречается. |
| `17-62` | Принятие (Acceptance) | 接受的通道 | [К], [Ш], [С]. | — |
| `18-58` | Суждение (Judgement) | 批评的通道 | [К], [Ш], [С]. | По смыслу «Критика». |
| `19-49` | Синтез (Synthesis) | 整合综效的通道 | [К], [Ш] («整合綜效»), [С]. | В части материковых перепечаток [К] — «整合纵效»; верное упрощённое написание — 综效. |
| `20-34` | Харизма (Charisma) | 魅力的通道 | [К], [Ш], [С]. | — |
| `20-57` | Мозговая волна (The Brainwave) | 脑波的通道 | [К], [Ш], [С]. | — |
| `21-45` | Деньги (The Money Line) | 金钱线的通道 | [К], [Ш]. | В части [С] — короче «金钱的通道». |
| `23-43` | Структурирование (Structuring) | 架构的通道 | [К], [Ш], [С]. | — |
| `24-61` | Осознанность (Awareness) | 察觉的通道 | [К], [Ш] («察覺»). | В части [С] — «觉察的通道» (те же два знака в обратном порядке). |
| `25-51` | Инициация (Initiation) | 发起的通道 | [К], [Ш], [С]. | — |
| `26-44` | Передача (Surrender) | 传递的通道 | «投降» — «капитуляция» — **решение владельца 14.10**; прежнее обоснование: [К], [Ш], [С]. | Дословно «Капитуляция», звучит резко, но устоялось; см. «Сомнения». |
| `27-50` | Сохранение (Preservation) | 保存的通道 | [К], [Ш], [С]. | — |
| `28-38` | Борьба (Struggle) | 困顿挣扎的通道 | [К], [Ш], [С]. | — |
| `29-46` | Открытие (Discovery) | 发现的通道 | [К], [Ш], [С]. | — |
| `30-41` | Узнавание (Recognition) | 梦想家的通道 | [К], [Ш], [С]. | По смыслу «Мечтатель». |
| `32-54` | Трансформация (Transformation) | 蜕变的通道 | [К], [Ш], [С]. | — |
| `34-57` | Сила (Power) | 力量的通道 | [К], [Ш], [С]. | — |
| `35-36` | Преходящесть (Transitoriness) | 无常的通道 | [К], [Ш], [С]. | — |
| `37-40` | Сообщество (Community) | 经营社群的通道 | [К], [Ш], [С]. | Дословно «Ведение сообщества». |
| `39-55` | Эмоциональность (Emoting) | 情绪的通道 | [К], [Ш], [С]. | — |
| `42-53` | Созревание (Maturation) | 成熟的通道 | [К], [Ш], [С]. | — |
| `47-64` | Абстракция (Abstraction) | 抽象的通道 | [К], [Ш], [С]. | — |

---

### Заметки для переводчика (не для решения владельца)

- `noDefinedCenters`: не писать «没有定义的中心» — читается как «неопределённые центры». Годится «没有有定义的中心» или «所有中心都是开放的». В `bodygraphLabelEmpty` писать «有定义的中心：无».
- Подпись схемы: «人类图：{type}。有定义的中心：{centers}». Центры через «、», а не через запятую. Внимание: код склеивает их через `', '` (`centerNames.join(', ')`), поэтому в zh выйдет «头脑中心, 逻辑中心». Это вопрос к контролёру, а не к переводу.
- Код вставляет « — » и « · » с пробелами между названием центра или канала и описанием (`HdResult.tsx`). По-китайски тире пишут «——» без пробелов. В описаниях `centers.*` и `channels.*` не начинать с тире и не ставить своё.
- «Самопознание, не прогноз» — как на [Р]: «人类图是认识自己的工具，不是预言».
- Ни основателя метода, ни Jovian Archive — ни в текстах, ни в FAQ. На [Р] они есть, но калькулятор — отдельные тексты.

### Сомнения

1. **Стратегия Генератора — «等待回应»** («ждать отклика»), хотя в русском без «ждать»: «Откликаться». По-китайски стратегия устоялась именно так, голое «回应» читается как обрывок. То же для Манифестирующего генератора: «等待回应，然后告知».
2. **Ментальный авторитет — «环境权威»** («авторитет окружения»), так пишут на материке. Альтернатива из крупнейшей школы — «无内在权威» («нет внутреннего авторитета»): в строке «内在权威：无内在权威» выглядит как противоречие. Дословного «心智权威» почти нет.
3. **Открытые центры — «开放的中心»**, как на странице Райи. В книгах и в главной школе — «空白中心» («белые центры»); для знатоков привычнее, новичку может читаться как «пустой, ущербный».
4. **Каналы с другим смыслом, чем в русском и английском.** Берём устоявшиеся китайские названия: 7-31 «Основатель» (вместо «Альфа»), 13-33 «Находчивость» (вместо «Блудный сын»), 16-48 «Талант» (вместо «Длина волны»), 18-58 «Критика» (вместо «Суждение»), 30-41 «Мечтатель» (вместо «Узнавание»), 26-44 «Капитуляция» (投降; в русском — «Передача»). Резче всего звучит 26-44, но замены в сообществе нет.
5. **Бодиграф = 人类图** — то же слово, что и метод, так говорят по-китайски. Отдельное слово для схемы — «人体图» (китайская Википедия), но в сообществе оно редкое.
6. **Авторитеты без русских скобок.** «情绪权威», а не «情绪权威（情绪中心）», потому что центр уже в названии. На странице Райи в примере ответа скобка есть. Если важно совпадение со страницей Райи, скобку можно вернуть для эмоционального авторитета: «情绪权威（情绪中心）».
