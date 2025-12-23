import { X, Check } from 'lucide-react';

const comparisons = [
  {
    feature: 'Сохранение профиля между сессиями',
    others: false,
    linkeon: true
  },
  {
    feature: 'Накопительная персонализация',
    others: false,
    linkeon: true
  },
  {
    feature: 'Использование в нескольких сервисах',
    others: false,
    linkeon: true
  },
  {
    feature: 'Рекомендации людей по ценностям',
    others: false,
    linkeon: true
  },
  {
    feature: 'Подбор работы по смыслу',
    others: false,
    linkeon: true
  },
  {
    feature: 'Выбор специалистов по совместимости',
    others: false,
    linkeon: true
  }
];

export default function Advantages() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-ocean-50 to-teal-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Преимущество накопительного профиля
        </h2>
        <p className="text-xl text-sky-700 mb-16 text-center max-w-3xl mx-auto">
          В отличие от ChatGPT и Claude, где каждый раз начинаешь с нуля
        </p>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-ocean-100">
          <div className="grid grid-cols-3 gap-px bg-ocean-100">
            <div className="bg-white p-6"></div>
            <div className="bg-sky-50 p-6 text-center">
              <h3 className="font-bold text-sky-800">Другие сервисы</h3>
              <p className="text-sm text-sky-600 mt-1">ChatGPT, Claude</p>
            </div>
            <div className="bg-gradient-to-br from-ocean-600 to-teal-600 p-6 text-center">
              <h3 className="font-bold text-white">Linkeon</h3>
              <p className="text-sm text-ocean-100 mt-1">Экосистема</p>
            </div>
          </div>

          <div className="divide-y divide-ocean-100">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-px bg-ocean-100 hover:bg-ocean-200 transition-colors"
              >
                <div className="bg-white p-6">
                  <p className="text-sky-900 font-medium">{item.feature}</p>
                </div>
                <div className="bg-white p-6 flex items-center justify-center">
                  {item.others ? (
                    <Check className="w-6 h-6 text-sage-500" />
                  ) : (
                    <X className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div className="bg-gradient-to-br from-ocean-50 to-teal-50 p-6 flex items-center justify-center">
                  {item.linkeon ? (
                    <Check className="w-6 h-6 text-teal-600" />
                  ) : (
                    <X className="w-6 h-6 text-red-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg border-2 border-ocean-200">
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
            <p className="text-sky-800 font-semibold">
              Твой профиль растёт с каждым диалогом и становится всё точнее
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
