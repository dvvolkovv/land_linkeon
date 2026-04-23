import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';

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
