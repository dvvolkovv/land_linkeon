import { useTranslation } from 'react-i18next';
import { Check, Minus } from 'lucide-react';
import Section from '../ui/Section';
import Eyebrow from '../ui/Eyebrow';
import FadeIn from '../ui/FadeIn';

// Каталог возможностей и матрица каналов.
//
// Матрица стареет быстрее всего остального на странице: канал получает функцию —
// таблица начинает врать адресно, и это хуже, чем её отсутствие. Меняется набор
// каналов или функций — таблица перепроверяется живым прогоном.
//
// Сплошной проверки ещё не было: и список, и галочки собраны по роутам и
// модулям приложения, а роут не доказывает, что функция работает у обычного
// пользователя. Поэтому со страницы СНЯТЫ две строки — features.matrix.note
// («таблица проверена вручную») и features.matrix.checked («Проверено
// ДД.ММ.ГГГГ»): обе утверждают факт, которого пока нет, а датированное
// обещание ручной проверки хуже её отсутствия.
//
// Возвращать их — когда docs/features-audit-2026-09.md заполнен живым прогоном:
// ключи `note` и `checked` в features.matrix во всех семи локалях, <p> с note
// над таблицей и <p> с checked под ней, дата — днём прогона. Дальше устаревшая
// дата на странице видна и читателю, и нам, и это ровно та польза, ради которой
// подпись задумана.

type Group = { title: string; items: string[] };
type Row = { label: string; web: boolean; tg: boolean; android: boolean };

export default function Features() {
  const { t } = useTranslation();
  // Всё, что приходит из локали, — данные снаружи компонента: аудит или
  // переводчик может уронить ключ, и тогда .map() по undefined снимает всю
  // страницу целиком (error boundary в App.tsx нет). Сводим к массивам здесь,
  // один раз, а не защищаемся по месту.
  const rawGroups = t('features.groups', { returnObjects: true }) as Group[];
  const rawRows = t('features.matrix.rows', { returnObjects: true }) as Row[];
  const groups = (Array.isArray(rawGroups) ? rawGroups : [])
    .map((g) => ({ ...g, items: Array.isArray(g?.items) ? g.items : [] }));
  const rows = Array.isArray(rawRows) ? rawRows : [];

  // Доступное имя ячейки обязано нести ЗНАЧЕНИЕ, а не название колонки:
  // колонку и строку скринридер и так объявляет сам по th/scope, а вот «есть»
  // и «нет» он различает только по тексту. Текст прячем в sr-only, а не вешаем
  // aria-label на иконку: у <svg> нет надёжной роли, дающей ему имя.
  const yes = t('features.matrix.yes');
  const no = t('features.matrix.no');

  const cell = (on: boolean) => (
    <td className="px-3 py-2.5 text-center border-b border-paper-200">
      {on
        ? <Check aria-hidden="true" className="w-4 h-4 text-brand-700 inline-block" />
        : <Minus aria-hidden="true" className="w-4 h-4 text-paper-400 inline-block" />}
      <span className="sr-only">{on ? yes : no}</span>
    </td>
  );

  return (
    <Section id="features" ariaLabelledby="features-heading" className="bg-paper-100">
      <FadeIn className="max-w-2xl mb-12">
        <Eyebrow className="mb-4">{t('features.eyebrow')}</Eyebrow>
        <h2 id="features-heading" className="text-4xl md:text-5xl font-medium tracking-tight text-paper-900 mb-4 text-balance">
          {t('features.h2')}
        </h2>
        <p className="text-lg text-paper-700">{t('features.sub')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-5">
        {groups.map((g, i) => (
          <FadeIn key={g.title} delay={i * 100}>
            <div className="h-full rounded-2xl border border-paper-300 bg-paper-50 p-6">
              <h3 className="text-base font-semibold text-paper-900 mb-4">{g.title}</h3>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-paper-800 leading-relaxed">
                    <Check aria-hidden="true" className="w-4 h-4 text-brand-700 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Ни одной строки — прячем блок целиком: заголовок «Где что работает»
          с шапкой колонок над пустым tbody обещает таблицу, которой нет. */}
      {rows.length > 0 && (
      <FadeIn delay={200}>
        <h3 id="features-matrix-heading" className="text-base font-semibold text-paper-900 mt-12 mb-4">{t('features.matrix.title')}</h3>
        {/* Таблица уезжает в горизонтальный скролл на узком экране: сжимать
            колонки до нечитаемости хуже, чем прокрутить. Скроллящийся контейнер
            обязан быть фокусируемым (WCAG 2.1.1): в Firefox и Safari div с
            overflow-x не получает фокус сам, и таблица становится недоступна
            с клавиатуры. tabIndex даёт фокус, role+aria-labelledby — имя, без
            которого фокусируемая область объявляется скринридером как «группа». */}
        <div
          tabIndex={0}
          role="region"
          aria-labelledby="features-matrix-heading"
          className="overflow-x-auto rounded-2xl border border-paper-300 bg-paper-50"
        >
          <table className="w-full min-w-[480px] text-sm">
            <caption className="sr-only">{t('features.matrix.title')}</caption>
            <thead>
              <tr className="text-xs uppercase tracking-wide text-paper-600">
                <th scope="col" className="px-4 py-3 text-left font-semibold border-b border-paper-300">{t('features.matrix.columns.feature')}</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold border-b border-paper-300">{t('features.matrix.columns.web')}</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold border-b border-paper-300">{t('features.matrix.columns.tg')}</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold border-b border-paper-300">{t('features.matrix.columns.android')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-4 py-2.5 text-left font-normal text-paper-800 border-b border-paper-200">{r.label}</th>
                  {cell(r.web)}
                  {cell(r.tg)}
                  {cell(r.android)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
      )}
    </Section>
  );
}
