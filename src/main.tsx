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
import { persistAttribution } from './lib/attribution';
import { trackLandingVisit, trackLandingCta, initLandingEngagement } from './lib/track';
import { initVkPixel } from './lib/vkPixel';
import './i18n';
import './index.css';

// Сначала зафиксировать метки привлечения (utm_*/ref) в localStorage — до того,
// как URL «почистится» скроллом/якорем/перезагрузкой. Дальше и трекер, и CTA на
// приложение читают метку отсюда (не теряется на стыке лендинг→app).
persistAttribution();

// VK-пиксель: pageView для связки клик по рекламе → визит (цель «registration»
// срабатывает в приложении).
initVkPixel();

// Зафиксировать заход на лендинг с источником (VK/utm и пр.) — верх воронки.
trackLandingVisit();

// Итог визита (скролл/время/увидел-ли-CTA) при уходе — чтобы разложить отвал
// «пришёл, но не кликнул» на причины (внимание vs оффер vs не докрутил).
initLandingEngagement();

declare global {
  interface Window {
    ym?: (id: number, action: string, goal?: string) => void;
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement | null;
  const el = target?.closest<HTMLElement>('[data-cta]');
  if (!el) return;
  const goal = el.dataset.cta;
  if (!goal) return;
  // Пишем клик и в нашу БД (видеть шаг лендинг→клик), и в Я.Метрику.
  trackLandingCta(goal);
  if (window.ym) window.ym(105902201, 'reachGoal', goal);
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
} else {
  root.render(
    <StrictMode>
      {legal ? <LegalPage doc={legal.doc} /> : deleteAccount ? <DeleteAccountPage /> : <App />}
    </StrictMode>,
  );
}
