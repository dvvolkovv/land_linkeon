import { Check } from 'lucide-react';

export default function ForYou() {
  const points = [
    'Ты устал от поверхностных связей и хочешь найти настоящих единомышленников',
    'Ищешь работу, где разделяют твои ценности, а не только навыки',
    'Выбираешь коуча или психолога не по отзывам, а по глубокой совместимости',
    'Хочешь понять себя лучше — через диалог с мудрыми ассистентами',
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-sky-900">
          Это для тебя, если:
        </h2>

        <div className="mt-12 space-y-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex gap-4 items-start p-6 rounded-2xl bg-ocean-50 border border-ocean-100 hover:border-ocean-300 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg text-sky-800 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
