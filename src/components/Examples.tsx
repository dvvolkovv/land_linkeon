import { Network } from 'lucide-react';

const profiles = [
  {
    id: 1,
    values: ['Осознанность', 'Семья', 'Природа', 'Баланс'],
    description: 'Найдены совпадения по ценностям "Осознанность", "Семья", "Природа"'
  },
  {
    id: 2,
    values: ['Творчество', 'Свобода', 'Рост', 'Инновации'],
    description: 'Найдены совпадения по ценностям "Творчество", "Свобода", "Рост"'
  },
  {
    id: 3,
    values: ['Доверие', 'Партнёрство', 'Развитие', 'Целостность'],
    description: 'Найдены совпадения по ценностям "Доверие", "Партнёрство", "Развитие"'
  }
];

export default function Examples() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Живые примеры
        </h2>
        <p className="text-xl text-sky-700 mb-16 text-center max-w-3xl mx-auto">
          Так выглядят профили пользователей и их связи через ценности
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="group relative bg-gradient-to-br from-ocean-50 to-teal-50 p-8 rounded-3xl border-2 border-ocean-100 hover:border-ocean-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-ocean-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-sky-900 mb-4 text-center">
                Профиль {profile.id}
              </h3>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {profile.values.map((value, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-ocean-700 text-sm font-medium rounded-full border border-ocean-200"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-ocean-50 rounded-3xl p-8 border-2 border-teal-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-sky-900 mb-3">
                Пример матчинга
              </h3>
              <p className="text-lg text-sky-700 leading-relaxed mb-3">
                Александр и Мария нашли друг друга через общие ценности
                <span className="font-semibold text-teal-700"> "Осознанность"</span>,
                <span className="font-semibold text-teal-700"> "Семья"</span> и
                <span className="font-semibold text-teal-700"> "Природа"</span>
              </p>
              <p className="text-sky-600">
                Система автоматически выявила глубокую совместимость их профилей
                и рекомендовала знакомство. Сейчас они вместе развивают экопроект.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sky-600 italic">
            Все примеры обезличены и используются с согласия пользователей
          </p>
        </div>
      </div>
    </section>
  );
}
