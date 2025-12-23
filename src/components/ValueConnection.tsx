import ValueGraph from './ValueGraph';

export default function ValueConnection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Связи через ценности
        </h2>
        <p className="text-xl text-sky-700 mb-12 text-center max-w-3xl mx-auto">
          Визуализация того, как ценности образуют уникальные связи между людьми
        </p>

        <div className="w-full h-[500px] bg-gradient-to-br from-ocean-50/30 to-teal-50/30 rounded-3xl border-2 border-ocean-100 shadow-lg overflow-hidden">
          <ValueGraph />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sky-600 italic">
            Каждая точка представляет ценность. Линии показывают, как они связаны между собой
          </p>
        </div>
      </div>
    </section>
  );
}
