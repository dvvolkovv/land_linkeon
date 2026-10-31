import { useId, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { DRAFT_MAX_LENGTH, askTarget } from '../../lib/chatDraft';
import { submitsOnEnter } from './askKeys';

interface Props {
  assistantId: number;
  /** Цель воронки (landing_cta_click) — её пишет общий обработчик кликов по [data-cta] в main.tsx. */
  cta: string;
  utmContent: string;
  placeholder: string;
  className?: string;
}

/**
 * Поле вопроса ассистенту (проба без входа, spec 2026-10-30-guest-trial). Вопрос
 * уезжает в кабинет фрагментом #ask=…, кабинет отправляет его сам — первые
 * ответы приходят без регистрации.
 *
 * Поле скрыто от Вебвизора (ym-disable-keys): Метрика лендинга пишет сессии. В
 * разметке и в пререндере текста вопроса нет — адрес строится по нажатию.
 * Enter нажимает кнопку, а не отправляет форму напрямую: так цель воронки
 * засчитывается тем же обработчиком кликов, что и у остальных кнопок, и ровно один раз.
 */
export default function AskBox({ assistantId, cta, utmContent, placeholder, className = '' }: Props) {
  const { t } = useTranslation();
  const id = useId();
  const [text, setText] = useState('');
  const button = useRef<HTMLButtonElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.assign(askTarget(assistantId, utmContent, text));
  };

  return (
    <form onSubmit={onSubmit} className={`w-full max-w-xl ${className}`} data-ask-box>
      <label htmlFor={id} className="sr-only">{t('ask.label')}</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <textarea
          id={id}
          name="question"
          rows={2}
          maxLength={DRAFT_MAX_LENGTH}
          value={text}
          placeholder={placeholder}
          enterKeyHint="send"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (submitsOnEnter({ key: e.key, shiftKey: e.shiftKey, isComposing: e.nativeEvent.isComposing, keyCode: e.keyCode })) {
              e.preventDefault();
              button.current?.click();
            }
          }}
          className="ym-disable-keys min-h-11 flex-1 resize-none rounded-lg border border-paper-300 bg-paper-50 px-4 py-3 text-base text-paper-900 placeholder:text-paper-600 focus:outline-none focus:ring-2 focus:ring-brand-800"
        />
        <button
          ref={button}
          type="submit"
          data-cta={cta}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-800 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-800/20 transition-all hover:bg-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
        >
          {t('ask.button')} <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-sm text-paper-600">{t('ask.note')}</p>
    </form>
  );
}
