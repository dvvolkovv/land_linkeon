import { Compass, MessageCircle, Sprout, Flame } from 'lucide-react';

const benefits = [
  {
    icon: Compass,
    title: 'Понимание своих ценностей и сильных сторон',
    description: 'Глубокое самопознание через диалог с AI-ассистентами'
  },
  {
    icon: MessageCircle,
    title: 'Настоящие, неформальные связи',
    description: 'Находите людей для искренних отношений и дружбы'
  },
  {
    icon: Sprout,
    title: 'Осознанность и внутренний рост',
    description: 'Развивайтесь вместе с единомышленниками'
  },
  {
    icon: Flame,
    title: 'Возможность создать проект с единомышленниками',
    description: 'Объединяйтесь для реализации общих целей'
  }
];

export default function Benefits() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-amber-50 via-emerald-50 to-stone-50 relative">
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Growth and connection"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Что получает пользователь
        </h2>
        <p className="text-xl text-gray-600 mb-16 text-center max-w-2xl mx-auto">
          Linkeon помогает найти тех, кто действительно на одной волне с вами
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex gap-6 p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-stone-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
