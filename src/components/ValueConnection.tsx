import ValueGraph from './ValueGraph';

export default function ValueConnection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Связи через ценности
        </h2>
        <p className="text-xl text-sky-700 mb-12 text-center max-w-3xl mx-auto">
          Два профиля находят друг друга через общие ценности
        </p>

        <div className="w-full h-[500px] bg-gradient-to-br from-ocean-50/30 to-teal-50/30 rounded-3xl border-2 border-ocean-100 shadow-lg overflow-hidden">
          <ValueGraph />
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sky-600">
            <span className="inline-block w-5 h-5 bg-sky-500 rounded-full mr-2"></span>
            Профили пользователей
          </p>
          <p className="text-sky-600">
            <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mr-2 ring-2 ring-emerald-300"></span>
            Общие ценности — точки пересечения
          </p>
          <p className="text-sky-600">
            <span className="inline-block w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
            <span className="inline-block w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            Уникальные ценности каждого профиля
          </p>
        </div>
      </div>
    </section>
  );
}
