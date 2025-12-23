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
            <span className="inline-block w-3 h-3 bg-sky-500 rounded-full mr-2"></span>
            Большие кружки — профили пользователей
          </p>
          <p className="text-sky-600">
            <span className="inline-block w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
            Маленькие кружки — ценности каждого профиля
          </p>
          <p className="text-sky-600">
            <span className="inline-block w-8 h-0.5 bg-teal-500 mr-2" style={{ borderTop: '3px dashed' }}></span>
            Пунктирные линии — общие ценности, создающие связь
          </p>
        </div>
      </div>
    </section>
  );
}
