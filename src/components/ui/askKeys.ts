/**
 * Чистая проверка: Enter должен нажать кнопку «Спросить», а не перевести строку
 * в поле или сработать посреди набора через IME (китайский — один из семи
 * языков лендинга). Отдельный файл, а не экспорт из AskBox.tsx — как у
 * bannerOffer.ts: AskBox отдаёт компонент по умолчанию, и
 * react-refresh/only-export-components не пускает в такой файл второй
 * экспорт; вдобавок проверяется без DOM — jsdom в репозитории не настроен
 * (см. bannerOffer.ts).
 *
 * keyCode === 229 — так Safari помечает Enter, подтверждающий выбор при вводе
 * через IME, когда isComposing браузер уже снял.
 */
export function submitsOnEnter(e: {
  key: string;
  shiftKey: boolean;
  isComposing?: boolean;
  keyCode?: number;
}): boolean {
  return e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.keyCode !== 229;
}
