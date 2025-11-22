import { MessageCircle, User, Users } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    number: '1',
    title: 'Исследуй себя с AI-ассистентами',
    description: 'Проходи глубокие диалоги с коучем, психологом, нумерологом и другими специалистами'
  },
  {
    icon: User,
    number: '2',
    title: 'Получи свой ценностный профиль',
    description: 'Узнай о своих сильных сторонах, ценностях и жизненных намерениях'
  },
  {
    icon: Users,
    number: '3',
    title: 'Находи людей по внутреннему резонансу',
    description: 'Встречай тех, кто близок тебе по духу — для дружбы, проектов и роста'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-forest-50 via-earth-50 to-warm-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
          Как работает
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-forest-600 to-forest-700 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-warm-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-forest-300 to-transparent -z-10"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
