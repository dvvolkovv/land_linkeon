import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LegalPage from './pages/LegalPage';
import DeleteAccountPage from './pages/DeleteAccountPage';
import AssistantPage from './pages/AssistantPage';
import AssistantsCatalogPage from './pages/AssistantsCatalogPage';
import { parseDeleteAccountPath, parseLegalPath } from './lib/legalRoute';
import { parseAssistantPath } from './lib/assistantRoute';
import { loadPack } from './content/assistants/load';
import { assistantBySlug } from './content/assistants/roster';
import { hasAssistantPages } from './content/assistants/availability';
import { parseHdCalcPath } from './lib/hdRoute';
import { hasHdCalculator } from './content/hd/availability';
import { loadHdTexts } from './content/hd/load';
import { parseValuesTestPath, valuesTestPath } from './lib/valuesRoute';
import { hasValuesTest } from './content/values/availability';
import { loadValuesTexts } from './content/values/load';
import { persistAttribution } from './lib/attribution';
import { trackLandingVisit, initLandingEngagement } from './lib/track';
import { reachCtaGoal } from './lib/goal';
import { initVkPixel } from './lib/vkPixel';
import './i18n';
import './index.css';

// Сначала зафиксировать метки привлечения (utm_*/ref) в localStorage — до того,
// как URL «почистится» скроллом/якорем/перезагрузкой. Дальше и трекер, и CTA на
// приложение читают метку отсюда (не теряется на стыке лендинг→app).
persistAttribution();

// Адрес теста ценностей разбирается один раз: он нужен и пикселю, и выбору
// страницы ниже.
const parsedValues = parseValuesTestPath(window.location.pathname);

// VK-пиксель: pageView для связки клик по рекламе → визит (цель «registration»
// срабатывает в приложении). На адресе теста ценностей пиксель не грузим
// (на любом, и на невыпущенном языке тоже, где по нему рисуется главная):
// счётчик Top.Mail.Ru по своим настройкам может собирать клики, а клики на
// тесте выдают ответы — по той же причине там выключены Вебвизор и карта
// кликов Метрики (scripts/prerender.mjs).
if (!parsedValues) initVkPixel();

// Зафиксировать заход на лендинг с источником (VK/utm и пр.) — верх воронки.
trackLandingVisit();

// Итог визита (скролл/время/увидел-ли-CTA) при уходе — чтобы разложить отвал
// «пришёл, но не кликнул» на причины (внимание vs оффер vs не докрутил).
initLandingEngagement();

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  const el = target?.closest<HTMLElement>('[data-cta]');
  if (!el) return;
  const goal = el.dataset.cta;
  if (!goal) return;
  // Пишем клик и в нашу БД (видеть шаг лендинг→клик), и в Я.Метрику.
  reachCtaGoal(goal);
}, { capture: true });

// Роутера в проекте нет и заводить его ради статических страниц не стоит:
// путь разбирается один раз при загрузке, переходы между лендингом,
// документами и страницами ассистентов — обычные ссылки с перезагрузкой.
const legal = parseLegalPath(window.location.pathname);
const deleteAccount = parseDeleteAccountPath(window.location.pathname);
const parsedAssistant = parseAssistantPath(window.location.pathname);
// Язык без выпущенных страниц: nginx отдал сюда главную (SPA-фолбэк) — её и
// рисуем, как до появления раздела. Иначе осталась бы застывшая русская
// главная: loadPack вернул бы null, и render не случился бы вовсе.
const assistantRoute =
  parsedAssistant && hasAssistantPages(parsedAssistant.language) ? parsedAssistant : null;
// Калькулятор на языке, где он не выпущен, — тоже SPA-фолбэк: рисуем главную.
const parsedHd = parseHdCalcPath(window.location.pathname);
const hdRoute = parsedHd && hasHdCalculator(parsedHd.language) ? parsedHd : null;
// Тест ценностей — так же: на невыпущенном языке рисуем главную.
const valuesRoute = parsedValues && hasValuesTest(parsedValues.language) ? parsedValues : null;
const root = createRoot(document.getElementById('root')!);

if (assistantRoute) {
  // Тексты страниц — отдельный чанк на язык. Ждём его ДО первого render:
  // createRoot не гидратирует, и первый же render заменил бы готовый HTML из
  // пререндера пустым кадром. Не пришёл чанк (офлайн, снятый ассет) —
  // оставляем пререндер: текст и ссылки в нём рабочие, пропадёт только
  // интерактив шапки. Язык без выпущенных страниц сюда не доходит — для него
  // выше выбрана главная (см. assistantRoute).
  loadPack(assistantRoute.language)
    .then((pack) => {
      // Не бывает: язык «выпущен», только если есть его модуль текстов
      // (scripts/assistant-page-languages.js), а loadPack берёт модули из того
      // же каталога pages/.
      if (!pack) return;
      const entry = assistantRoute.kind === 'assistant' ? assistantBySlug(assistantRoute.slug) : undefined;
      root.render(
        <StrictMode>
          {entry ? (
            <AssistantPage entry={entry} pack={pack} language={assistantRoute.language} />
          ) : (
            <AssistantsCatalogPage pack={pack} language={assistantRoute.language} />
          )}
        </StrictMode>,
      );
    })
    .catch((error) => console.error('страницы ассистентов: тексты не загрузились, остаётся пререндер', error));
} else if (hdRoute) {
  // Калькулятор — отдельные чанки: страница с кодом расчёта (astronomy-engine)
  // и тексты языка. Главная их не грузит; пререндер проверяет это по dist/.
  // Рисуем, когда пришли оба: createRoot не гидратирует, и ранний render
  // заменил бы пререндер пустым кадром.
  Promise.all([import('./pages/HumanDesignPage'), loadHdTexts(hdRoute.language)])
    .then(([{ default: HumanDesignPage }, texts]) => {
      // Не бывает: язык попадает в HD_CALC_CODES, только если есть его модуль
      // текстов (scripts/hd-calc-languages.js), а loadHdTexts берёт модули из
      // того же каталога texts/.
      if (!texts) return;
      root.render(
        <StrictMode>
          <HumanDesignPage texts={texts} language={hdRoute.language} />
        </StrictMode>,
      );
    })
    .catch((error) => console.error('калькулятор: чанк не загрузился, остаётся пререндер', error));
} else if (valuesRoute) {
  const canonical = valuesTestPath(valuesRoute.language);
  if (!document.querySelector('#root [data-testid="values-test"]')) {
    // Отдан не пререндер теста, а чужой HTML (SPA-фолбэк nginx: /ru/tests/values/,
    // сироты выкатов) — в нём Метрика с Вебвизором и картой кликов. Тест здесь не
    // запускаем: уводим на канонический адрес, где они выключены. Уже на нём —
    // оставляем отданную страницу как есть, без петли переадресаций.
    if (window.location.pathname !== canonical) window.location.replace(canonical + window.location.search);
  } else {
    // Тест — отдельные чанки: страница с расчётом и тексты языка. Рисуем, когда
    // пришли оба: createRoot не гидратирует, ранний render заменил бы
    // пререндер пустым кадром.
    Promise.all([import('./pages/ValuesTestPage'), loadValuesTexts(valuesRoute.language)])
      .then(([{ default: ValuesTestPage }, texts]) => {
        // Не бывает: язык попадает в VALUES_TEST_CODES, только если есть его
        // модуль текстов (scripts/values-test-languages.js).
        if (!texts) return;
        root.render(
          <StrictMode>
            <ValuesTestPage texts={texts} language={valuesRoute.language} />
          </StrictMode>,
        );
      })
      .catch((error) => console.error('тест ценностей: чанк не загрузился, остаётся пререндер', error));
  }
} else {
  root.render(
    <StrictMode>
      {legal ? <LegalPage doc={legal.doc} /> : deleteAccount ? <DeleteAccountPage /> : <App />}
    </StrictMode>,
  );
}
