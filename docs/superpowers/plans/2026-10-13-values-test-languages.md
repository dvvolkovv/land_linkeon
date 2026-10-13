# Тест ценностей на шести языках — план

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** открыть тест ценностей (`/tests/values/`) на en, es, de, fr, pt, zh — те же 30 утверждений и подсчёт, разбор с Олей на языке страницы.

**Architecture:** язык теста включается сам, когда появляется `src/content/values/texts/<код>.ts` (`scripts/values-test-languages.js`); пререндер, hreflang, sitemap, приватность (Вебвизор и карта кликов выключены, пиксель VK не грузится) уже работают по языкам. Код меняется в четырёх местах: склейка текста по правилам языка (`Intl.ListFormat`, «、», «；»), переключатель языка на этих страницах, кнопка на тест со страниц Оли только на выпущенных языках, проверки текстов для нерусских языков. Тексты — шесть переводов с `ru.ts`, вычитка, слепая разметка утверждений на каждом языке.

**Tech Stack:** React 18 + TypeScript, Vite, vitest, Playwright, пререндер `scripts/prerender.mjs`. Сборки и тесты — только на тестовой ноде.

**Спека:** `docs/superpowers/specs/2026-10-13-values-test-languages-design.md`.

---

## Порядок и остановки

Task 1 (рабочая копия) → Task 2–7 (код и проверки) → Task 8 (переводы) → Task 9 (вычитка) → Task 10 (слепая разметка и сверка с PVQ) → Task 11 (полный прогон, скриншоты) → **СТОП 1** → Task 12 (выкат) → **СТОП 2** перед `deploy.sh` → Task 13 (проверка на проде) → Task 14 (память, уборка).

- **СТОП 1** (конец Task 11) — владельцу: скриншоты en и zh, итоги разметки по шести языкам, спорные утверждения (если остались после трёх кругов).
- **СТОП 2** (Task 12) — OK владельца на `deploy.sh`; если маршрут нода → прод всё ещё недоступен — отдельный OK на обход.

## Где что запускать

- Мак — только чтение, правка файлов, git. `node_modules` в воркдереве на маке нет и не нужен.
- Нода — `pnpm test:unit`, `pnpm typecheck`, `pnpm build`, Playwright. Код едет на ноду `git push`-ем в CI-клон (Task 1), незакоммиченное туда не попадает.
- Переводчики, вычитчики и разметчики (Task 8–10) пишут только свои файлы; коммитит контролёр. Параллельно — потому что файлы не пересекаются.

## Файлы

- Create: `src/lib/textJoin.ts`, `src/lib/textJoin.test.ts` — склейка перечней, частей фразы и предложений по языку.
- Create: `src/lib/sitePageReleased.ts`, `src/lib/sitePageReleased.test.ts` — выпущена ли страница сайта по адресу (тест, калькулятор).
- Modify: `src/lib/valuesDraft.ts`, `src/lib/valuesDraft.test.ts` — сообщение Оле с языком.
- Modify: `src/content/values/types.ts`, `src/content/values/texts/ru.ts` — без поля `and`.
- Modify: `src/components/values/ValuesTest.tsx`, `src/components/values/ValuesResult.tsx`, `src/pages/ValuesTestPage.tsx` — язык до результата, баннер языка.
- Modify: `src/i18n/urlLanguage.ts`, `src/i18n/urlLanguage.test.ts` — переключатель на тесте и калькуляторе.
- Modify: `src/pages/AssistantPage.tsx` — вторая кнопка только на выпущенную страницу.
- Modify: `src/content/values/texts.test.ts` — правила нерусских текстов.
- Modify: `tests/values-test.spec.ts` — сырой HTML всех языков теста.
- Create: `src/content/values/texts/{en,es,de,fr,pt,zh}.ts`.
- Modify: `src/content/assistants/pages/{en,es,de,fr,pt,zh}/olia.ts` — `heroLink`.
- Служебное (вне git, `.superpowers/` в `.gitignore`): `~/Downloads/land_linkeon/.superpowers/values-langs/` — скрипты ноды, выгрузки, журнал `progress.md`.

---

## Правила переводов

Действуют в Task 8–10. Механическую часть проверяет `texts.test.ts` (Task 6), остальное — вычитка и слепая разметка.

1. **Источник** — `src/content/values/texts/ru.ts` той же ветки. Утверждения свои, по мотивам теории Шварца; переводится наш текст, официальные переводы PVQ не используются и не пересказываются.
2. **Утверждение** — портрет «этот человек» без рода, одно предложение, живой разговорный регистр: «This person…», «A esta persona…», «Dieser Person…», «Pour cette personne…», «Para esta pessoa…», «这个人…». Смысл и детали — как в русском; не усиливать и не смягчать.
3. **Обращение к читателю** (вступление, вопросы и ответы, результат, кнопки): en — you; es — usted; de — Sie; fr — vous; pt — безличная форма, европейский португальский (как весь pt сайта: `src/i18n/languages.data.js`); zh — 你.
4. **Сообщение Оле** (`message`, `messageFlat`, `axesInMessage`, `bottomInMessage`, `restEqualInMessage`, `tiedInMessage`, `values.*.inMessage`) — от первого лица, обращение к Оле на «ты» языка (you / tú / du / tu / tu / 你), имя Оли — как на её странице этого языка (`src/content/assistants/roster.data.js`). В `axesInMessage.change` — с заглавной (начало предложения после точки), `axesInMessage.focus` — со строчной там, где это требует язык (после «;» в en, es, de, fr, pt); в zh регистра нет. Фразы `axesInMessage` — без точки в конце: её ставит шаблон `message` после `{axes}`.
5. **Глоссарий** — одно и то же слово во всех текстах языка (утверждения, `values.*.name`, `inMessage`, описания, легенда круга):

   | ключ | en | es | de | fr | pt | zh |
   |---|---|---|---|---|---|---|
   | selfDirection | Self-Direction | Autodirección | Selbstbestimmung | Autonomie | Autodireção | 自我导向 |
   | stimulation | Stimulation | Estimulación | Stimulation | Stimulation | Estimulação | 刺激 |
   | hedonism | Hedonism | Hedonismo | Hedonismus | Hédonisme | Hedonismo | 享乐主义 |
   | achievement | Achievement | Logro | Leistung | Réussite | Realização | 成就 |
   | power | Power | Poder | Macht | Pouvoir | Poder | 权力 |
   | security | Security | Seguridad | Sicherheit | Sécurité | Segurança | 安全 |
   | conformity | Conformity | Conformidad | Konformität | Conformité | Conformidade | 遵从 |
   | tradition | Tradition | Tradición | Tradition | Tradition | Tradição | 传统 |
   | benevolence | Benevolence | Benevolencia | Wohlwollen | Bienveillance | Benevolência | 仁慈 |
   | universalism | Universalism | Universalismo | Universalismus | Universalisme | Universalismo | 普世主义 |
   | openness | Openness to Change | Apertura al cambio | Offenheit für Wandel | Ouverture au changement | Abertura à mudança | 对变化的开放 |
   | selfEnhancement | Self-Enhancement | Autopromoción | Selbststärkung | Affirmation de soi | Autopromoção | 自我提升 |
   | conservation | Conservation | Conservación | Bewahrung | Continuité | Conservação | 保守 |
   | selfTranscendence | Self-Transcendence | Autotrascendencia | Selbsttranszendenz | Dépassement de soi | Autotranscendência | 自我超越 |

   Вычитчик может предложить другое слово только с обоснованием (устоявшееся в литературе по Шварцу на этом языке) — тогда оно меняется во всех текстах языка.
6. **Ограничения русского текста сохраняются:** без цен и валют, эмодзи, слова «агент» и его переводов в значении «ассистент»; Linkeon не переводится; никаких заявлений о валидности, официальности, клинической пригодности, кроме отрицания; оговорка (`disclaimer`) — «самопознание по мотивам теории Шварца, не клиническая и не официальная методика». Слово agent / agente / Agent / 智能体 в значении «ассистент» не используется. Иероглифы и полноширинная пунктуация — только в zh.
7. **Заголовок и описание страницы** — с поисковыми словами языка («Schwartz values test», «test de valores de Schwartz», «Schwartz Wertetest», «test des valeurs de Schwartz», «teste de valores de Schwartz», «施瓦茨价值观测试») и «бесплатно» языка; `title` ≤ 70 знаков, `description` 100–180 (zh — 40–120).
8. **Длины** — как у русского: описание ценности 150–420 знаков (zh 45–200), строка под названием ≤ 60 (zh ≤ 30), фраза оси 30–200 (zh 12–100). Не влезает — сокращать текст, а не пределы; не хватает до нижнего предела — дописать смысл из русского, а не воду. В zh каждая фраза `axes` кончается на «。»: две фразы встают в абзац без пробела.
9. **Описание ценности** начинается с её названия (как в русском) — в en, de, zh. В es, fr, pt допустим артикль: название — в начале, сразу после него («La autodirección…», «L'autonomie…», «A autodireção…»).

---

### Task 1: Рабочая копия и прогон на ноде

**Files:** ничего в репозитории; скрипты — в `~/Downloads/land_linkeon/.superpowers/values-langs/`.

- [ ] **Step 1: Воркдерево**

```bash
git -C ~/Downloads/land_linkeon fetch -q origin
git -C ~/Downloads/land_linkeon worktree add .worktrees/values-langs -b feat/values-langs origin/main
git -C ~/Downloads/land_linkeon/.worktrees/values-langs branch --unset-upstream
git -C ~/Downloads/land_linkeon/.worktrees/values-langs log --oneline -1
```

Expected: последняя строка — коммит `origin/main` с этим планом или новее.

- [ ] **Step 2: Скрипты для ноды**

`~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh`:

```bash
#!/usr/bin/env bash
# Прогон на тестовой ноде на ТЕКУЩЕМ коммите воркдерева.
#   bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh 'pnpm test:unit'
# Код едет git push'ем прямо в CI-клон ноды (ветка tmp/values-langs), не через
# GitHub и не rsync. Незакоммиченное на ноду не попадает — сначала commit.
set -euo pipefail
WT=~/Downloads/land_linkeon/.worktrees/values-langs
NODE_WT=ci/wt/values-langs
BRANCH=tmp/values-langs
# Одно мастер-соединение: нода рвёт пачки новых ssh-подключений (MaxStartups).
SSH_OPTS="-o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h"
GIT_SSH_COMMAND="ssh $SSH_OPTS" git -C "$WT" push -q -f "dv@85.192.61.231:ci/land_linkeon" "HEAD:refs/heads/$BRANCH"
SHA=$(git -C "$WT" rev-parse HEAD)
ssh $SSH_OPTS dv@85.192.61.231 "set -e
  [ -d ~/$NODE_WT ] || git -C ~/ci/land_linkeon worktree add -q --detach ~/$NODE_WT $SHA
  cd ~/$NODE_WT && git checkout -q --detach $SHA
  source ~/.nvm/nvm.sh
  (fuser -k 4173/tcp 2>/dev/null || true)
  pnpm install --frozen-lockfile > /tmp/values-langs-install.log 2>&1 || (tail -20 /tmp/values-langs-install.log; exit 1)
  echo \"== \$(git log --oneline -1)\"
  set +e
  $1"
```

`~/Downloads/land_linkeon/.superpowers/values-langs/node-ssh.sh`:

```bash
#!/usr/bin/env bash
# Произвольная команда на ноде через то же мастер-соединение.
exec ssh -o ControlMaster=auto -o ControlPath=~/.ssh/cm-lnode -o ControlPersist=2h dv@85.192.61.231 "$1"
```

```bash
chmod +x ~/Downloads/land_linkeon/.superpowers/values-langs/*.sh
```

- [ ] **Step 3: Исходный прогон**

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run > /tmp/vl-unit.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/vl-unit.log'
```

Expected: `exit 0`, «Test Files … passed». Число тестов записать в `progress.md` — это база.

---

### Task 2: Склейка текста по правилам языка

**Files:**
- Create: `src/lib/textJoin.ts`
- Test: `src/lib/textJoin.test.ts`

- [ ] **Step 1: Красный тест**

`src/lib/textJoin.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { joinAnd, joinClauses, joinComma, joinSentences } from './textJoin';

describe('склейка текста по языку', () => {
  it('ru: перечень с «и» — как прежняя склейка сообщения Оле', () => {
    expect(joinAnd(['самостоятельность'], 'ru')).toBe('самостоятельность');
    expect(joinAnd(['самостоятельность', 'стимуляция'], 'ru')).toBe('самостоятельность и стимуляция');
    expect(joinAnd(['а', 'б', 'в'], 'ru')).toBe('а, б и в');
  });

  it('союз и запятые — языка', () => {
    expect(joinAnd(['a', 'b', 'c'], 'en')).toBe('a, b, and c');
    expect(joinAnd(['a', 'b', 'c'], 'de')).toBe('a, b und c');
    expect(joinAnd(['a', 'b', 'c'], 'fr')).toBe('a, b et c');
    expect(joinAnd(['a', 'b', 'c'], 'es')).toBe('a, b y c');
    expect(joinAnd(['a', 'b', 'c'], 'pt')).toBe('a, b e c');
    expect(joinAnd(['自我导向', '刺激', '仁慈'], 'zh')).toBe('自我导向、刺激和仁慈');
  });

  it('перечень без союза', () => {
    expect(joinComma(['Доброта', 'Универсализм'], 'ru')).toBe('Доброта, Универсализм');
    expect(joinComma(['仁慈', '普世主义'], 'zh')).toBe('仁慈、普世主义');
  });

  it('части фразы через точку с запятой и предложения подряд', () => {
    expect(joinClauses(['Раз', 'два'], 'ru')).toBe('Раз; два');
    expect(joinClauses(['甲', '乙'], 'zh')).toBe('甲；乙');
    expect(joinSentences(['One.', 'Two.'], 'en')).toBe('One. Two.');
    expect(joinSentences(['一。', '二。'], 'zh')).toBe('一。二。');
  });
});
```

- [ ] **Step 2: Убедиться, что падает**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/lib/textJoin.test.ts
git commit -q -m "test(values): склейка текста по языку (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/lib/textJoin.test.ts 2>&1 | tail -5'
```

Expected: FAIL — `Failed to resolve import "./textJoin"`.

- [ ] **Step 3: Реализация**

`src/lib/textJoin.ts`:

```ts
/**
 * Склейка частей текста по правилам языка страницы. Русские правила —
 * «, … и …», «; » и пробел между предложениями — китайскому не подходят:
 * там «、», «和» без пробелов, полноширинная «；» и предложения подряд.
 */

/** «а, б и в» — перечень с союзом языка. */
export function joinAnd(items: string[], language: string): string {
  return new Intl.ListFormat(language, { style: 'long', type: 'conjunction' }).format(items);
}

/** «а, б, в» — перечень без союза. */
export function joinComma(items: string[], language: string): string {
  return items.join(language === 'zh' ? '、' : ', ');
}

/** Части одной фразы через точку с запятой. */
export function joinClauses(parts: string[], language: string): string {
  return parts.join(language === 'zh' ? '；' : '; ');
}

/** Предложения подряд в одном абзаце. */
export function joinSentences(parts: string[], language: string): string {
  return parts.join(language === 'zh' ? '' : ' ');
}
```

- [ ] **Step 4: Зелёный**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/lib/textJoin.ts
git commit -q -m "feat(values): склейка текста по правилам языка (Intl.ListFormat, «、», «；»)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/lib/textJoin.test.ts 2>&1 | tail -5'
```

Expected: PASS, 4 теста.

---

### Task 3: Сообщение Оле и результат — на языке страницы

**Files:**
- Modify: `src/lib/valuesDraft.ts`, `src/lib/valuesDraft.test.ts`
- Modify: `src/content/values/types.ts:82-83`, `src/content/values/texts/ru.ts:210`
- Modify: `src/components/values/ValuesResult.tsx`, `src/components/values/ValuesTest.tsx:41,114`, `src/pages/ValuesTestPage.tsx`

- [ ] **Step 1: Красные тесты**

В `src/lib/valuesDraft.test.ts` во всех вызовах `valuesMessage(ru, r)` добавить третий аргумент `'ru'`; в тесте «самый длинный возможный случай» — `valuesMessage(t, worst, code)`. В конец `describe('сообщение Оле', …)` добавить:

```ts
  // Склейка — по языку страницы, а не по русским правилам: в китайском «、»,
  // «和» без пробелов и полноширинная «；». Тексты здесь русские — проверяется
  // только склейка.
  it('перечень и оси склеиваются по правилам языка страницы', () => {
    const r = scoreAnswers(by({ selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 }));
    const zh = valuesMessage(ru, r, 'zh');
    expect(zh).toContain('самостоятельность、стимуляция和доброта');
    expect(zh).toContain('привычного；забота');
  });
```

- [ ] **Step 2: Убедиться, что падает**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/lib/valuesDraft.test.ts
git commit -q -m "test(values): сообщение Оле склеивается по языку страницы (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/lib/valuesDraft.test.ts 2>&1 | tail -8'
```

Expected: FAIL в новом тесте (`expected … to contain 'самостоятельность、стимуляция和доброта'`); прежние — PASS (лишний аргумент пока игнорируется).

- [ ] **Step 3: Сообщение Оле**

`src/lib/valuesDraft.ts` — заменить импорты, тип `MessageTexts`, функцию `list` и `valuesMessage`:

```ts
import { chatHref, chatUrlWithDraft, fillTemplate } from './chatDraft';
import { joinAnd, joinClauses } from './textJoin';
import { AXIS_KEYS, type ValueKey, type ValuesResult } from './schwartz';
import type { ValuesTexts } from '../content/values/types';
```

```ts
type MessageTexts = Pick<
  ValuesTexts,
  'values' | 'axesInMessage' | 'tiedInMessage' | 'bottomInMessage' | 'restEqualInMessage' | 'message' | 'messageFlat'
>;

/**
 * Первое сообщение Оле: ведущие, наименее важная и обе оси; полная ничья —
 * в скобках после ценности («с тем же результатом — …»); остальные набрали поровну —
 * «остальные — поровну» вместо наименее важной. Приоритеты не выделились —
 * своё сообщение без ценностей. Ответов в нём нет — только итог, который
 * человек и так видит на экране. Перечни и оси склеиваются по правилам языка
 * страницы (src/lib/textJoin.ts).
 */
export function valuesMessage(texts: MessageTexts, result: ValuesResult, language: string): string {
  if (result.flat) return texts.messageFlat;
  const name = (k: ValueKey) => texts.values[k].inMessage;
  const list = (keys: ValueKey[]) => joinAnd(keys.map(name), language);
  const tied = (ties: ValueKey[]) =>
    ties.length ? ` ${fillTemplate(texts.tiedInMessage, { names: list(ties) })}` : '';
  return fillTemplate(texts.message, {
    top: list(result.top) + tied(result.topTies),
    rest: result.bottom
      ? fillTemplate(texts.bottomInMessage, { bottom: name(result.bottom) + tied(result.bottomTies) })
      : texts.restEqualInMessage,
    axes: joinClauses(
      AXIS_KEYS.map((k) => texts.axesInMessage[k][result.axes[k].lean]),
      language,
    ),
  });
}
```

`src/content/values/types.ts` — удалить две строки:

```ts
  /** Союз перед последним названием в перечне сообщения: «и». */
  and: string;
```

`src/content/values/texts/ru.ts` — удалить строку `  and: 'и',`.

- [ ] **Step 4: Язык — до результата**

`src/components/values/ValuesResult.tsx`:

```ts
import { joinComma, joinSentences } from '../../lib/textJoin';
```

```ts
interface Props {
  texts: ValuesTexts;
  /** Язык страницы — для склейки перечней и сообщения Оле. */
  language: string;
  result: Result;
  onRestart: () => void;
}
```

`ValueCard` получает язык и склеивает ничьи по нему:

```tsx
function ValueCard({
  texts,
  language,
  value,
  tiedWith = [],
}: {
  texts: ValuesTexts;
  language: string;
  value: ValueKey;
  tiedWith?: ValueKey[];
}) {
```

```tsx
          {fillTemplate(texts.result.tiedWith, { names: joinComma(tiedWith.map((k) => texts.values[k].name), language) })}
```

В `ValuesResult`: сигнатура `export default function ValuesResult({ texts, language, result, onRestart }: Props)`; в `toOlia` — `valuesMessage(texts, result, language)`; у обоих `<ValueCard …>` добавить `language={language}`; абзац осей:

```tsx
            {joinSentences(AXIS_KEYS.map((k) => texts.axes[k][result.axes[k].lean]), language)}
```

`src/components/values/ValuesTest.tsx`:

```tsx
export default function ValuesTest({ texts, language }: { texts: ValuesTexts; language: string }) {
```

```tsx
    body = <ValuesResult texts={texts} language={language} result={result} onRestart={begin} />;
```

`src/pages/ValuesTestPage.tsx`:

```tsx
          <ValuesTest texts={texts} language={language} />
```

- [ ] **Step 5: Зелёный и типы**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add -A src/lib/valuesDraft.ts src/content/values/types.ts src/content/values/texts/ru.ts src/components/values/ValuesResult.tsx src/components/values/ValuesTest.tsx src/pages/ValuesTestPage.tsx
git commit -q -m "feat(values): сообщение Оле и результат склеиваются по языку страницы

Перечень ценностей — Intl.ListFormat вместо «, … и …» (поле and больше не нужно),
оси в сообщении — «；» в китайском, абзац осей и ничьи на карточках — без
пробелов и с «、» в китайском. Русский вывод не меняется.

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/lib src/content/values > /tmp/vl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL" /tmp/vl.log | head; pnpm typecheck > /tmp/vl-tsc.log 2>&1; echo "tsc $?"; tail -5 /tmp/vl-tsc.log'
```

Expected: `unit 0`, `tsc 0`. Русские тексты сообщения в прежних тестах совпали без правок — значит, русский вывод тот же.

---

### Task 4: Переключатель языка на тесте и калькуляторе, баннер языка на тесте

**Files:**
- Modify: `src/i18n/urlLanguage.ts`, `src/i18n/urlLanguage.test.ts`
- Modify: `src/pages/ValuesTestPage.tsx`

- [ ] **Step 1: Красные тесты**

В `src/i18n/urlLanguage.test.ts` после мока `../content/assistants/availability` добавить:

```ts
vi.mock('../content/values/availability', () => ({
  hasValuesTest: (code: string) => code === 'ru' || code === 'en',
}));
vi.mock('../content/hd/availability', () => ({
  hasHdCalculator: (code: string) => code === 'ru',
}));
```

В конец файла:

```ts
describe('pathForLanguage на тесте ценностей и калькуляторе', () => {
  // Без этого переключатель (и баннер языка) с теста уводили на главную.
  it('тест: та же страница на выпущенном языке', () => {
    expect(pathForLanguage('en', '/tests/values/')).toBe('/en/tests/values/');
    expect(pathForLanguage('ru', '/en/tests/values/', '?a=1', '#faq')).toBe('/tests/values/?a=1#faq');
    expect(pathForLanguage('en', '/tests/values/index.html')).toBe('/en/tests/values/');
  });

  it('тест: на невыпущенном языке — главная этого языка', () => {
    expect(pathForLanguage('de', '/tests/values/', '?a=1')).toBe('/de/?a=1');
  });

  it('калькулятор: та же страница только там, где выпущен', () => {
    expect(pathForLanguage('ru', '/en/calculators/human-design/')).toBe('/calculators/human-design/');
    expect(pathForLanguage('en', '/calculators/human-design/')).toBe('/en/');
  });
});
```

- [ ] **Step 2: Убедиться, что падает**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/i18n/urlLanguage.test.ts
git commit -q -m "test(i18n): переключатель языка на тесте ценностей и калькуляторе (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/i18n/urlLanguage.test.ts 2>&1 | tail -12'
```

Expected: FAIL — `expected '/en/' to be '/en/tests/values/'` и `expected '/' to be '/calculators/human-design/'`.

- [ ] **Step 3: Реализация**

`src/i18n/urlLanguage.ts` — импорты:

```ts
import { SUPPORTED_CODES, DEFAULT_LANGUAGE } from './languages';
import { hasAssistantPages } from '../content/assistants/availability';
import { hasValuesTest } from '../content/values/availability';
import { hasHdCalculator } from '../content/hd/availability';
import { ASSISTANTS_SEGMENT, assistantPath, assistantsCatalogPath, parseAssistantPath } from '../lib/assistantRoute';
import { parseValuesTestPath, valuesTestPath } from '../lib/valuesRoute';
import { hdCalcPath, parseHdCalcPath } from '../lib/hdRoute';
import { pathSegments } from '../lib/pathSegments';
```

Перед последним `return \`${base}${search}${hash}\`;`:

```ts
  // С теста ценностей и калькулятора — на ту же страницу другого языка, если
  // она у него выпущена; иначе на главную языка, как у страниц ассистентов.
  // Этим же путём строит адрес баннер языка (LanguageBanner).
  if (parseValuesTestPath(pathname) && hasValuesTest(language)) {
    return `${valuesTestPath(language)}${search}${hash}`;
  }
  if (parseHdCalcPath(pathname) && hasHdCalculator(language)) {
    return `${hdCalcPath(language)}${search}${hash}`;
  }
```

- [ ] **Step 4: Баннер языка на странице теста**

`src/pages/ValuesTestPage.tsx` — импорт `import LanguageBanner from '../components/ui/LanguageBanner';`; в комментарии над компонентом заменить «Без LanguageBanner: тест пока только по-русски, как калькулятор.» на «LanguageBanner — как на страницах ассистентов: предлагает этот же тест на языке браузера, если он выпущен.»; после `<Footer … />`:

```tsx
      {/* В пререндере пусто — предложение считается в эффекте, по языку браузера. */}
      <LanguageBanner />
```

- [ ] **Step 5: Зелёный**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/i18n/urlLanguage.ts src/pages/ValuesTestPage.tsx
git commit -q -m "feat(i18n): переключатель языка ведёт на тот же тест или калькулятор; баннер языка на тесте

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/i18n > /tmp/vl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL" /tmp/vl.log | head; pnpm typecheck > /tmp/vl-tsc.log 2>&1; echo "tsc $?"'
```

Expected: `unit 0`, `tsc 0`.

---

### Task 5: Вторая кнопка на страницах ассистентов — только на выпущенную страницу

**Files:**
- Create: `src/lib/sitePageReleased.ts`, `src/lib/sitePageReleased.test.ts`
- Modify: `src/pages/AssistantPage.tsx:88`

- [ ] **Step 1: Красный тест**

`src/lib/sitePageReleased.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest';
import { isSitePageReleased } from './sitePageReleased';

vi.mock('../content/values/availability', () => ({
  hasValuesTest: (code: string) => code === 'ru' || code === 'en',
}));
vi.mock('../content/hd/availability', () => ({
  hasHdCalculator: (code: string) => code === 'ru',
}));

describe('выпущена ли страница сайта', () => {
  it('тест ценностей — по языку адреса', () => {
    expect(isSitePageReleased('/tests/values/')).toBe(true);
    expect(isSitePageReleased('/en/tests/values/')).toBe(true);
    expect(isSitePageReleased('/de/tests/values/')).toBe(false);
  });

  it('калькулятор — по языку адреса', () => {
    expect(isSitePageReleased('/calculators/human-design/')).toBe(true);
    expect(isSitePageReleased('/en/calculators/human-design/')).toBe(false);
  });

  it('прочие адреса не проверяются', () => {
    expect(isSitePageReleased('/assistants/olia/')).toBe(true);
  });
});
```

- [ ] **Step 2: Убедиться, что падает**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/lib/sitePageReleased.test.ts
git commit -q -m "test(assistants): вторая кнопка — только на выпущенную страницу (красный)

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/lib/sitePageReleased.test.ts 2>&1 | tail -5'
```

Expected: FAIL — `Failed to resolve import "./sitePageReleased"`.

- [ ] **Step 3: Реализация**

`src/lib/sitePageReleased.ts`:

```ts
import { hasHdCalculator } from '../content/hd/availability';
import { hasValuesTest } from '../content/values/availability';
import { parseHdCalcPath } from './hdRoute';
import { parseValuesTestPath } from './valuesRoute';

/**
 * Выпущена ли страница сайта по этому адресу. Тест ценностей и калькулятор
 * выходят по языкам; на невыпущенном языке их адреса нет — nginx отдал бы
 * туда SPA-фолбэк, то есть главную. Прочие адреса считаются существующими.
 */
export function isSitePageReleased(href: string): boolean {
  const values = parseValuesTestPath(href);
  if (values) return hasValuesTest(values.language);
  const hd = parseHdCalcPath(href);
  if (hd) return hasHdCalculator(hd.language);
  return true;
}
```

`src/pages/AssistantPage.tsx` — импорт `import { isSitePageReleased } from '../lib/sitePageReleased';`; условие второй кнопки:

```tsx
              {page.heroLink && isSitePageReleased(page.heroLink.href) && (
```

- [ ] **Step 4: Зелёный**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/lib/sitePageReleased.ts src/pages/AssistantPage.tsx
git commit -q -m "feat(assistants): вторая кнопка наверху — только если её страница выпущена на этом языке

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/lib/sitePageReleased.test.ts src/pages > /tmp/vl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL" /tmp/vl.log | head'
```

Expected: `unit 0` — в том числе прежний тест «вторая кнопка наверху — калькулятор» у Райи на ru.

---

### Task 6: Проверки нерусских текстов

**Files:**
- Modify: `src/content/values/texts.test.ts`

- [ ] **Step 1: Правила в тесте**

В начало `src/content/values/texts.test.ts`, после `const LEANS…`:

```ts
const CYRILLIC = /\p{Script=Cyrillic}/u;
const HAN = /\p{Script=Han}/u;
/** Ширина подписи в кеглях: иероглиф — во весь кегль, прочее — 0,62 (с запасом). */
const labelWidthEm = (s: string): number => [...s].reduce((w, ch) => w + (HAN.test(ch) ? 1 : 0.62), 0);

// Китайский передаёт ту же мысль вдвое меньшим числом знаков — пределы как у
// страниц ассистентов (src/content/assistants/packs.test.ts: zh 40–120).
const limitsFor = (code: string) =>
  code === 'zh'
    ? { description: [40, 120], valueText: [45, 200], valueLine: 30, axis: [12, 100] }
    : { description: [100, 180], valueText: [150, 420], valueLine: 60, axis: [30, 200] };
// Описание ценности начинается с названия; в es, fr, pt — допустим артикль
// («La autodirección…», «L'autonomie…»): название — в первых 60 знаках.
const ARTICLE_LANGUAGES = new Set(['es', 'fr', 'pt']);
```

Перед `describe('тексты теста ценностей', …)`:

```ts
describe('ширина подписи круга', () => {
  // Без этого правило «иероглиф — во весь кегль» могло бы не сработать молча.
  it('иероглиф — 1 кегль, остальное — 0,62', () => {
    expect(labelWidthEm('自我')).toBe(2);
    expect(labelWidthEm('ab')).toBeCloseTo(1.24);
  });
});
```

Внутри цикла `for (const [code, t] …)` заменить тесты «метатеги, вступление, вопросы», «ценности: …», «оси: …» и «подписи круга помещаются в рисунок» на:

```ts
      const limits = limitsFor(code);

      it('метатеги, вступление, вопросы', () => {
        expect(t.title.length).toBeLessThanOrEqual(70);
        expect(t.description.length).toBeGreaterThanOrEqual(limits.description[0]);
        expect(t.description.length).toBeLessThanOrEqual(limits.description[1]);
        expect(t.intro.length).toBeGreaterThanOrEqual(2);
        expect(t.intro.length).toBeLessThanOrEqual(4);
        expect(t.faq.length).toBeGreaterThanOrEqual(4);
        expect(t.faq.length).toBeLessThanOrEqual(6);
      });

      it('ценности: строка под названием, описание с названием в начале', () => {
        for (const k of VALUE_KEYS) {
          const v = t.values[k];
          expect(v.line.length, k).toBeLessThanOrEqual(limits.valueLine);
          expect(v.text.length, k).toBeGreaterThanOrEqual(limits.valueText[0]);
          expect(v.text.length, k).toBeLessThanOrEqual(limits.valueText[1]);
          if (ARTICLE_LANGUAGES.has(code)) {
            expect(v.text.slice(0, 60).toLowerCase(), k).toContain(v.name.toLowerCase());
          } else {
            expect(v.text.startsWith(v.name), k).toBe(true);
          }
        }
      });

      it('оси: фразы результата в пределах языка', () => {
        for (const axis of AXIS_KEYS) {
          for (const lean of LEANS) {
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeGreaterThanOrEqual(limits.axis[0]);
            expect(t.axes[axis][lean].length, `${axis}.${lean}`).toBeLessThanOrEqual(limits.axis[1]);
          }
        }
      });

      it('подписи круга помещаются в рисунок', () => {
        VALUE_KEYS.forEach((k, i) => {
          const { x, anchor } = labelLayout(i);
          const w = labelWidthEm(t.values[k].name) * CIRCLE.fontSize;
          const [from, to] = anchor === 'start' ? [x, x + w] : anchor === 'end' ? [x - w, x] : [x - w / 2, x + w / 2];
          expect(from, k).toBeGreaterThanOrEqual(4);
          expect(to, k).toBeLessThanOrEqual(CIRCLE.width - 4);
        });
      });

      if (code !== 'ru') {
        it('перевод: ни кириллицы, ни рублей', () => {
          for (const { path, s } of stringsWithPath(t)) expect(s, path).not.toMatch(CYRILLIC);
        });
      }
```

- [ ] **Step 2: Проверка не слепая — сломать нарочно**

Временный «перевод» — копия русского под кодом en: правило «ни кириллицы» обязано упасть, остальные — пройти.

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
cp src/content/values/texts/ru.ts src/content/values/texts/en.ts
sed -i '' 's/^const ru: ValuesTexts/const en: ValuesTexts/; s/^export default ru;/export default en;/' src/content/values/texts/en.ts
git add -A src/content/values && git commit -q -m "tmp: проверка правил на копии русского (будет отменено)"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/content/values/texts.test.ts > /tmp/vl.log 2>&1; echo "exit $?"; grep -E "✓|×|FAIL" /tmp/vl.log | grep -E "en >" | head'
git reset -q --hard HEAD~1
git status --short
```

Expected: `exit 1`; у `en` падает только «перевод: ни кириллицы, ни рублей». После `reset` — рабочее дерево чистое, `en.ts` нет.

- [ ] **Step 3: Зелёный и коммит**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/content/values/texts.test.ts
git commit -q -m "test(values): правила переводов — без кириллицы, пределы длины zh, ширина иероглифа в круге, артикль в es/fr/pt

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/content/values > /tmp/vl.log 2>&1; echo "exit $?"; grep -E "Test Files|Tests " /tmp/vl.log'
```

Expected: `exit 0`.

---

### Task 7: Сырой HTML всех языков теста (e2e)

**Files:**
- Modify: `tests/values-test.spec.ts`

- [ ] **Step 1: Тест**

В `describe('тест ценностей в сыром HTML', …)` добавить:

```ts
  // Каждая нерусская версия: свой язык в <html>, свой canonical, тот же
  // кластер hreflang, Вебвизор и карта кликов выключены. До переводов цикл
  // пуст; после Task 8 обязан пройти по шести языкам.
  test('нерусские версии: язык, canonical, hreflang, Вебвизор и карта кликов выключены', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });
    const codes = valuesTestCodes();
    for (const code of codes.filter((c) => c !== DEFAULT_LANGUAGE)) {
      const html = await (await ctx.get(`/${code}/tests/values/`)).text();
      expect(html, code).toContain(`<html lang="${code}"`);
      expect(html, code).toContain(`<link rel="canonical" href="${valuesTestUrlFor(code, DEFAULT_LANGUAGE)}"`);
      expect(count(html, /hreflang="/g), `${code}: hreflang`).toBe(codes.length + 1);
      expect(html, code).toContain('webvisor:false');
      expect(html, code).not.toContain('webvisor:true');
      expect(html, code).toContain('clickmap:false');
      expect(html, code).not.toContain('clickmap:true');
      expect(html, `${code}: карточка старта`).toContain('data-testid="values-start"');
    }
    await ctx.dispose();
  });
```

- [ ] **Step 2: Прогон (пока только русский)**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add tests/values-test.spec.ts
git commit -q -m "test(values): сырой HTML нерусских версий теста — язык, canonical, hreflang, приватность

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh 'pnpm build > /tmp/vl-build.log 2>&1; echo "build $?"; npx playwright test tests/values-test.spec.ts > /tmp/vl-e2e.log 2>&1; echo "e2e $?"; tail -5 /tmp/vl-e2e.log'
```

Expected: `build 0`, `e2e 0`. Новый тест проходит вхолостую — языков ещё нет; по-настоящему он работает в Task 11.

---

### Task 8: Переводы на шесть языков

**Files:**
- Create: `src/content/values/texts/{en,es,de,fr,pt,zh}.ts`
- Modify: `src/content/assistants/pages/{en,es,de,fr,pt,zh}/olia.ts`

- [ ] **Step 1: Шесть переводчиков параллельно**

Контролёр запускает шесть агентов (`general-purpose`, модель opus), по одному на язык, одним сообщением. Каждый получает бриф ниже с подставленными `<КОД>`, `<ЯЗЫК>`, `<ПУТЬ>` = `~/Downloads/land_linkeon/.worktrees/values-langs`, и полностью раздел «Правила переводов» этого плана с глоссарием. Агент пишет только два файла и ничего не коммитит.

```text
Ты переводишь бесплатный тест ценностей Шварца на сайте linkeon.io с русского
на <ЯЗЫК> (код <КОД>). Читай файлы, но ничего не запускай и не коммить.

Источник: <ПУТЬ>/src/content/values/texts/ru.ts. Тип: <ПУТЬ>/src/content/values/types.ts.
Механические проверки, которые твой файл обязан пройти: <ПУТЬ>/src/content/values/texts.test.ts
(общий цикл по языкам и правило «перевод: ни кириллицы»; правила с префиксом «ru:» — только для русского).

Сделай:
1. <ПУТЬ>/src/content/values/texts/<КОД>.ts — тот же объект, что ru.ts, все ключи,
   переведённые по «Правилам переводов» ниже. Шапка файла — комментарий:
   «Тест ценностей на <ЯЗЫК>. Перевод texts/ru.ts по плану
   docs/superpowers/plans/2026-10-13-values-test-languages.md, «Правила переводов».»
   Константа — `const <КОД>: ValuesTexts = { … }; export default <КОД>;`.
   Шаблоны {top}, {rest}, {axes}, {bottom}, {names}, {n}, {total}, {done} — ровно как в ru.ts.
2. <ПУТЬ>/src/content/assistants/pages/<КОД>/olia.ts — после поля `cta` добавь
   `heroLink: { text: '<«Пройти тест ценностей бесплатно» на языке>', href: '/<КОД>/tests/values/' },`
   — больше в этом файле ничего не меняй.

Перед ответом сам проверь: все ключи на месте; длины по правилу 8; ни одной
кириллической буквы; названия ценностей — строго по глоссарию во всех полях;
каждое утверждение — портрет «этот человек» без рода, одно предложение.

Ответ: два пути и список мест, где ты сомневаешься (утверждение, слово глоссария, длина).

<раздел «Правила переводов» плана целиком>
```

- [ ] **Step 2: Проверка и коммит**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git status --short
git add src/content/values/texts src/content/assistants/pages
git commit -q -m "feat(values): тексты теста на en, es, de, fr, pt, zh; кнопка на тест со страниц Оли

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/content src/lib > /tmp/vl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL|AssertionError" /tmp/vl.log | head -20; pnpm typecheck > /tmp/vl-tsc.log 2>&1; echo "tsc $?"; tail -5 /tmp/vl-tsc.log'
```

Expected: в `git status` — шесть новых `texts/*.ts` и шесть изменённых `olia.ts`, ничего больше. `unit 0`, `tsc 0`. Красное — вернуть агенту этого языка (SendMessage) с выводом теста, повторить Step 2.

- [ ] **Step 3: Журнал**

В `progress.md` — по языку: путь, сомнения переводчика, итог проверок.

---

### Task 9: Вычитка

**Files:** те же 12 файлов из Task 8.

- [ ] **Step 1: Шесть вычитчиков параллельно**

Новые агенты (`general-purpose`, opus), по одному на язык; переводчика не переиспользовать.

```text
Ты вычитываешь перевод теста ценностей Шварца на <ЯЗЫК> (код <КОД>) для сайта
linkeon.io. Ничего не запускай и не коммить; правь только два файла ниже.

Русский оригинал: <ПУТЬ>/src/content/values/texts/ru.ts.
Перевод: <ПУТЬ>/src/content/values/texts/<КОД>.ts и поле heroLink в
<ПУТЬ>/src/content/assistants/pages/<КОД>/olia.ts.

Проверь и исправь прямо в файле:
1. Смысл: каждое утверждение, описание, вопрос и ответ FAQ говорит то же, что
   русское, без усиления и смягчения. Утверждение не должно сползти к соседней
   ценности (например, «доброта» к «универсализму», «безопасность» к «традиции»).
2. Естественность: так говорит носитель языка; без кальки с русского.
3. Правила переводов ниже — обращение, портрет без рода, глоссарий, ограничения, длины.
4. Сообщение Оле: от первого лица, на «ты» языка, перечни ценностей встанут
   через запятую и союз языка (это делает код) — в шаблоне не должно быть
   своего союза перед {top} или {names}.

Ответ: список правок (было → стало, почему) и места, где сомневаешься.

<раздел «Правила переводов» плана целиком>
```

- [ ] **Step 2: Проверка и коммит**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git diff --stat
git add src/content/values/texts src/content/assistants/pages
git commit -q -m "fix(values): вычитка переводов теста — смысл, естественность, глоссарий

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/content src/lib > /tmp/vl.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests |FAIL" /tmp/vl.log | head'
```

Expected: `unit 0`. Правки вычитчиков — в `progress.md`.

---

### Task 10: Слепая разметка и сверка с PVQ на каждом языке

**Files:** служебные, вне git: `~/Downloads/land_linkeon/.superpowers/values-langs/`.

- [ ] **Step 1: Выгрузка утверждений**

`~/Downloads/land_linkeon/.superpowers/values-langs/values-blind.ts`:

```ts
// Слепой список утверждений и ключ — для разметки на одном языке.
// Запуск на ноде из корня воркдерева: ./node_modules/.bin/tsx values-blind.ts <код>
import { writeFileSync } from 'node:fs';
import { ITEMS } from './src/lib/schwartz';

const code = process.argv[2];
const t = (await import(`./src/content/values/texts/${code}.ts`)).default;

// Перемешивание с постоянным зерном на язык: повтор даёт тот же список.
let seed = 20261013 + [...code].reduce((s, ch) => s + ch.charCodeAt(0), 0);
const rand = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
const shuffled = ITEMS.map((item) => ({ item, k: rand() }))
  .sort((a, b) => a.k - b.k)
  .map((x) => x.item);

writeFileSync(`/tmp/values-blind-${code}.txt`, shuffled.map((it, i) => `${i + 1}. ${t.statements[it.id]}`).join('\n') + '\n');
writeFileSync(
  `/tmp/values-key-${code}.json`,
  JSON.stringify(shuffled.map((it, i) => ({ n: i + 1, id: it.id, value: it.value })), null, 2),
);
console.log(`${code}: ${shuffled.length}`);
```

```bash
D=~/Downloads/land_linkeon/.superpowers/values-langs
bash $D/node-run.sh 'true'
scp -q -o ControlPath=~/.ssh/cm-lnode $D/values-blind.ts dv@85.192.61.231:ci/wt/values-langs/values-blind.ts
bash $D/node-ssh.sh 'cd ~/ci/wt/values-langs && source ~/.nvm/nvm.sh && for c in en es de fr pt zh; do ./node_modules/.bin/tsx values-blind.ts $c; done; rm -f values-blind.ts'
for c in en es de fr pt zh; do scp -q -o ControlPath=~/.ssh/cm-lnode dv@85.192.61.231:/tmp/values-blind-$c.txt dv@85.192.61.231:/tmp/values-key-$c.json $D/; done
ls $D/values-blind-*.txt $D/values-key-*.json | wc -l
```

Expected: шесть строк `<код>: 30`, на маке 12 файлов.

- [ ] **Step 2: Разметка — шесть проверяющих параллельно**

На каждый язык — новый агент (`general-purpose`, opus). Он получает **только** текст ниже и содержимое `values-blind-<код>.txt`; файлы репозитория и ключ ему не давать и не упоминать.

```text
You are checking the statements of a psychological questionnaire. Do not open any
files — everything you need is below. Answer with JSON only.

Shalom Schwartz's ten basic values:
1. selfDirection — independent thought and action: choosing, creating, exploring.
2. stimulation — excitement, novelty and challenge in life.
3. hedonism — pleasure and sensuous gratification for oneself.
4. achievement — personal success through demonstrating competence according to social standards.
5. power — social status and prestige, control or dominance over people and resources.
6. security — safety, harmony and stability of society, of relationships and of self.
7. conformity — restraint of actions and impulses likely to upset others or violate social norms.
8. tradition — respect for and commitment to the customs and ideas of one's culture or religion.
9. benevolence — caring for the welfare of people with whom one is in frequent personal contact.
10. universalism — understanding, tolerance and protection of the welfare of all people and of nature.

Task 1. Assign each statement to exactly one value — the one it expresses most
strongly. Give confidence: high, medium or low; for medium and low, name the
competing second value.

Task 2. Compare each statement with the published wording of Schwartz's PVQ-40,
PVQ-21 (ESS) and PVQ-RR items, in any language you remember them in. Mark
closeness: none, similar_idea (same idea, different words — acceptable) or
paraphrase (a close rendering of a specific item: same construction and details).
For paraphrase, quote the PVQ item it resembles.

Format: [{"n": 1, "value": "...", "confidence": "high", "second": null,
"closeness": "none", "pvq": null}, ...] — all 30.

Statements (<ЯЗЫК>):
<содержимое values-blind-<код>.txt>
```

Ответ — в `~/Downloads/land_linkeon/.superpowers/values-langs/blind-answer-<код>.json`.

- [ ] **Step 3: Сверка с ключом**

```bash
D=~/Downloads/land_linkeon/.superpowers/values-langs
for c in en es de fr pt zh; do
  echo "== $c"
  node -e '
const key = require(process.argv[1]); const ans = require(process.argv[2]);
const byN = Object.fromEntries(ans.map((a) => [a.n, a]));
let bad = 0;
for (const k of key) {
  const a = byN[k.n];
  const miss = !a || a.value !== k.value;
  const weak = a && a.confidence !== "high";
  const close = a && a.closeness === "paraphrase";
  if (miss || weak || close) { bad += 1; console.log(`${k.id}: размечено ${a?.value} (${a?.confidence}${a?.second ? ", мешает " + a.second : ""})${close ? " — пересказ PVQ: " + a.pvq : ""}`); }
}
console.log(bad ? `к переписке: ${bad}` : "все 30 — своя ценность, уверенно, без пересказов PVQ");
' $D/values-key-$c.json $D/blind-answer-$c.json
done
```

Expected: в идеале у каждого языка «все 30 — …». Каждая строка вывода — утверждение к переписке.

- [ ] **Step 4: Переписать и проверить повторно**

Утверждения из вывода Step 3 переписывает новый агент этого языка (`general-purpose`, opus) по «Правилам переводов» — сильнее к своей ценности, дальше от второй и от PVQ; он видит русский оригинал этого утверждения, строку вывода и правит только `texts/<код>.ts`. Затем:

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git add src/content/values/texts
git commit -q -m "fix(values): утверждения переводов по итогам слепой разметки

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run src/content/values > /tmp/vl.log 2>&1; echo "exit $?"; grep -E "Test Files|FAIL" /tmp/vl.log | head'
```

Повторить Step 1 и Step 2 для этих языков с **новыми** проверяющими (все 30 утверждений), Step 3 — сверка. Не больше трёх кругов на язык; после третьего оставшиеся спорные — владельцу на СТОП 1 вместе с вариантами.

- [ ] **Step 5: Журнал**

В `progress.md` — по языку и кругу: промахи, неуверенные, пересказы, переписанные id, итог последнего круга.

---

### Task 11: Полный прогон, скриншоты, СТОП 1

**Files:** служебные: `~/Downloads/land_linkeon/.superpowers/values-langs/values-labels.ts`, `shots.mjs`.

- [ ] **Step 1: Полный прогон на ноде**

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run > /tmp/vl-unit.log 2>&1; echo "unit $?"; grep -E "Test Files|Tests " /tmp/vl-unit.log; pnpm typecheck > /tmp/vl-tsc.log 2>&1; echo "tsc $?"; pnpm build > /tmp/vl-build.log 2>&1; echo "build $?"; grep -c "tests/values (Вебвизор и карта кликов выключены)" /tmp/vl-build.log; grep -c "<loc>https://linkeon.io/[a-z/]*tests/values/</loc>" dist/sitemap.xml; npx playwright test > /tmp/vl-e2e.log 2>&1; echo "e2e $?"; tail -4 /tmp/vl-e2e.log'
```

Expected: `unit 0`, число тестов больше базы из Task 1; `tsc 0`; `build 0`; строк «✅ …/tests/values (Вебвизор и карта кликов выключены)» — **7**; адресов теста в sitemap — **7**; `e2e 0`.

- [ ] **Step 2: Подписи для скриншотов**

`~/Downloads/land_linkeon/.superpowers/values-langs/values-labels.ts`:

```ts
// Подписи кнопок на одном языке — для скриншотов и живого прохода.
// Запуск на ноде из корня воркдерева: ./node_modules/.bin/tsx values-labels.ts <код>
import { writeFileSync } from 'node:fs';

const code = process.argv[2];
const t = (await import(`./src/content/values/texts/${code}.ts`)).default;
writeFileSync(
  `/tmp/values-labels-${code}.json`,
  JSON.stringify({ begin: t.start.begin, scale: t.question.scale, progress: t.question.progress, cta: t.result.cta }),
);
console.log(code);
```

- [ ] **Step 3: Скриншоты en и zh**

`~/Downloads/land_linkeon/.superpowers/values-langs/shots.mjs`:

```js
// Скриншоты теста на одном языке для владельца: вступление, вопрос, результат.
// Запуск на ноде из корня воркдерева при работающем `pnpm preview --port 4173`:
//   node shots.mjs <код>
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';

const code = process.argv[2];
const L = JSON.parse(readFileSync(`/tmp/values-labels-${code}.json`, 'utf8'));
const BASE = 'http://localhost:4173';
// Порядок утверждений — src/lib/schwartz/items.ts; ответ — по ценности.
const ORDER = ['selfDirection', 'power', 'benevolence', 'stimulation', 'security', 'achievement', 'universalism', 'tradition', 'hedonism', 'conformity',
  'achievement', 'universalism', 'selfDirection', 'conformity', 'stimulation', 'tradition', 'power', 'hedonism', 'security', 'benevolence',
  'tradition', 'stimulation', 'power', 'universalism', 'hedonism', 'benevolence', 'conformity', 'selfDirection', 'achievement', 'security'];
const PERSONA = { selfDirection: 6, stimulation: 6, benevolence: 6, power: 1 };
const progress = (n) => L.progress.replace('{n}', String(n)).replace('{total}', '30');

const browser = await chromium.launch();
for (const [w, h] of [[390, 844], [1280, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.route((url) => !url.href.startsWith(BASE), (route) => route.fulfill({ status: 200, body: '' }));
  await page.goto(`${BASE}/${code}/tests/values/`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/values-${code}-${w}-1-top.png` });
  await page.getByRole('button', { name: L.begin, exact: true }).click();
  await page.waitForTimeout(800);
  await page.getByTestId('values-question').screenshot({ path: `/tmp/values-${code}-${w}-2-question.png` });
  for (let i = 0; i < ORDER.length; i += 1) {
    await page.getByTestId('values-progress-label').filter({ hasText: progress(i + 1) }).waitFor();
    await page.getByTestId('values-question').getByRole('button', { name: L.scale[(PERSONA[ORDER[i]] ?? 3) - 1], exact: true }).click();
  }
  await page.getByTestId('values-result').waitFor();
  await page.waitForTimeout(800);
  await page.getByTestId('values-result').screenshot({ path: `/tmp/values-${code}-${w}-3-result.png` });
  await page.close();
}
await browser.close();
console.log(`${code}: 6 скриншотов`);
```

```bash
D=~/Downloads/land_linkeon/.superpowers/values-langs
scp -q -o ControlPath=~/.ssh/cm-lnode $D/values-labels.ts $D/shots.mjs dv@85.192.61.231:ci/wt/values-langs/
bash $D/node-ssh.sh 'cd ~/ci/wt/values-langs && source ~/.nvm/nvm.sh && for c in en zh; do ./node_modules/.bin/tsx values-labels.ts $c; done; (pnpm preview --port 4173 > /tmp/vl-preview.log 2>&1 &); sleep 3; for c in en zh; do node shots.mjs $c; done; fuser -k 4173/tcp; rm -f values-labels.ts shots.mjs'
mkdir -p $D/shots && scp -q -o ControlPath=~/.ssh/cm-lnode 'dv@85.192.61.231:/tmp/values-{en,zh}-*.png' $D/shots/ && ls $D/shots | wc -l
```

Expected: «en: 6 скриншотов», «zh: 6 скриншотов», на маке 12 файлов. Контролёр сам смотрит все 12 (Read): тексты на месте, ничего не обрезано, китайские подписи круга помещаются.

- [ ] **Step 4: СТОП 1 — владельцу**

Показать: скриншоты en и zh (вступление, вопрос, результат на телефоне), итоги разметки по шести языкам (`progress.md`), спорные утверждения, если остались. Правки владельца — отдельным коммитом, затем Step 1 заново.

---

### Task 12: Слияние и выкат (СТОП 2)

- [ ] **Step 1: В main**

```bash
cd ~/Downloads/land_linkeon/.worktrees/values-langs
git fetch -q origin
git rebase -q origin/main && git log --oneline origin/main..HEAD | wc -l
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-run.sh './node_modules/.bin/vitest run > /tmp/vl-unit.log 2>&1; echo "unit $?"; pnpm build > /tmp/vl-build.log 2>&1; echo "build $?"'
git push -q origin HEAD:main && git log --oneline -1 origin/main
```

Expected: `unit 0`, `build 0`, `origin/main` = HEAD ветки.

- [ ] **Step 2: СТОП 2 — OK владельца на выкат**

Спросить: «Катить лендинг (`LANDING_ONLY=1 deploy.sh`)?». Если маршрут тестовая нода → прод всё ещё недоступен — отдельно спросить про обход через релей (порядок — в памяти, заметка «Прод недоступен — обход через релей»; рецепт в репозиторий не записывать).

- [ ] **Step 3: Выкат**

С ноды, со свежих клонов, отвязанным запуском (правила — `spirits_back/CLAUDE.md` и память: «Выкат лендинга», «Выкат со свежих клонов», «deploy.sh — отвязанно»). Сначала убедиться, что чужого выката нет:

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-ssh.sh 'pgrep -fa "^bash scripts/deploy.sh" || echo "чужих выкатов нет"'
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-ssh.sh 'set -e
NAME=values-langs-$(date +%m%d-%H%M)
mkdir -p ~/deploy-clones/$NAME ~/deploy-logs
git clone -q --branch main git@github.com:dvvolkovv/spirits_back.git ~/deploy-clones/$NAME/spirits_back
git clone -q --branch main git@github.com:dvvolkovv/land_linkeon.git ~/deploy-clones/$NAME/land_linkeon
install -m 600 ~/dev/spirits_back/scripts/test-server.env.local ~/deploy-clones/$NAME/spirits_back/scripts/test-server.env.local
ln -s ~/dev/spirits_back/tests/node_modules ~/deploy-clones/$NAME/spirits_back/tests/node_modules
git -C ~/deploy-clones/$NAME/land_linkeon log --oneline -1
source ~/.nvm/nvm.sh
cd ~/deploy-clones/$NAME/spirits_back
LANDING_ONLY=1 LOCAL_LAND_DIR=~/deploy-clones/$NAME/land_linkeon setsid -f bash -c "echo \$\$ > ~/deploy-logs/$NAME.pid; exec bash scripts/deploy.sh" > ~/deploy-logs/$NAME.log 2>&1 < /dev/null
echo $NAME'
```

Expected: коммит лендинга — тот, что в `origin/main` после Step 1. Ждать в логе `~/deploy-logs/<NAME>.log` зелёную PHASE 3. При обходе через релей к переменным добавляется `PROD_HOST=<псевдоним из заметки>` — только с OK владельца, обход убрать сразу после выката.

---

### Task 13: Проверка на проде

- [ ] **Step 1: Сырой HTML и приватность**

```bash
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-ssh.sh 'for c in en es de fr pt zh; do h=$(curl -s https://linkeon.io/$c/tests/values/); printf "%s lang=%s webvisor_off=%s clickmap_off=%s hreflang=%s\n" $c "$(echo "$h" | grep -c "<html lang=\"$c\"")" "$(echo "$h" | grep -c "webvisor:false")" "$(echo "$h" | grep -c "clickmap:false")" "$(echo "$h" | grep -o "hreflang=\"" | wc -l)"; done; curl -s https://linkeon.io/ | grep -c "webvisor:true"'
```

Expected: у каждого языка `lang=1 webvisor_off=1 clickmap_off=1 hreflang=8`; на главной `webvisor:true` — 1 (проверка не слепая).

- [ ] **Step 2: Живой проход на en и zh**

Скрипт по образцу `~/Downloads/land_linkeon/.superpowers/values-test/prod-live.cjs` (вне git): адрес `https://linkeon.io/<код>/tests/values/`, подписи кнопок — из `/tmp/values-labels-<код>.json` (Task 11), кнопка к Оле — `[data-cta="values-test-to-olia"]`. Вход — служебным тестовым аккаунтом по разделу «Тестовые аккаунты» CLAUDE.md кабинета; способ входа в репозиторий и в этот план не записывать. Проверить и записать в `progress.md`:
- запросов к `top-fwz1.mail.ru` на странице теста — 0;
- в поле Оли — сообщение на языке страницы, слово в слово как в черновике; автоприветствие не ушло;
- Оля отвечает на языке страницы и опирается на результат.

Если Оля ответила не на языке страницы — остановиться и сказать владельцу: по спеке это правка в кабинете отдельной задачей.

---

### Task 14: Память и уборка

- [ ] **Step 1: Память**

Обновить заметку `project_values_test` (тест на семи языках с даты выката; правила переводов и глоссарий — в этом плане; слепая разметка на каждом языке) и строку в `MEMORY.md`.

- [ ] **Step 2: Итоги в плане**

В конец этого плана — раздел «Итоги выката»: дата, коммит, отклонения от плана, итоги разметки. Коммит в main лендинга.

- [ ] **Step 3: Уборка**

```bash
git -C ~/Downloads/land_linkeon worktree remove .worktrees/values-langs
bash ~/Downloads/land_linkeon/.superpowers/values-langs/node-ssh.sh 'git -C ~/ci/land_linkeon worktree remove --force ~/ci/wt/values-langs; git -C ~/ci/land_linkeon branch -D tmp/values-langs; rm -f /tmp/values-blind-* /tmp/values-key-* /tmp/values-labels-* /tmp/values-{en,zh}-*.png /tmp/vl*.log'
```

Ветку `feat/values-langs` удалить после «ок» владельца.
