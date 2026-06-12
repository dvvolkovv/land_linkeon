import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { persistAttribution } from './lib/attribution';
import { trackLandingVisit } from './lib/track';
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
  if (!goal || !window.ym) return;
  window.ym(105902201, 'reachGoal', goal);
}, { capture: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
