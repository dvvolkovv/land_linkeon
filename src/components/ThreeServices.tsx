import { Users, Briefcase, Heart, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Users,
    name: 'Linkeon',
    url: 'https://my.linkeon.io',
    title: 'Найди людей по ценностям',
    description: 'Ищешь партнёра для экопоселения? Или сооснователя для стартапа? Система покажет людей с комплиментарными ценностями.',
    color: 'from-ocean-500 to-ocean-600'
  },
  {
    icon: Briefcase,
    name: 'HR Linkeon',
    url: 'https://hr.linkeon.io',
    title: 'Найди работу по смыслу',
    description: 'Не просто вакансии по навыкам, а компании, где твои ценности совпадают с культурой.',
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Heart,
    name: 'Hearty',
    url: 'https://hearty.pro',
    title: 'Найди своего специалиста',
    description: 'Не гадай по отзывам — система сама подберёт коуча или психолога по глубокой совместимости.',
    color: 'from-sage-500 to-sage-600'
  }
];

export default function ThreeServices() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Один профиль — три применения
        </h2>
        <p className="text-xl text-sky-700 mb-16 text-center max-w-3xl mx-auto">
          Создай профиль один раз и используй его во всех трёх сервисах
        </p>

        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex-1 w-full max-w-sm">
                  <div className="group relative bg-gradient-to-br from-ocean-50 to-teal-50 p-8 rounded-3xl border-2 border-ocean-100 hover:border-ocean-300 hover:shadow-2xl transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-sky-900 mb-2">
                      {service.name}
                    </h3>

                    <h4 className="text-lg font-semibold text-teal-700 mb-3">
                      {service.title}
                    </h4>

                    <p className="text-sky-700 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-ocean-700 transition-colors group"
                    >
                      Перейти
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
            <div className="relative w-32 h-32 bg-gradient-to-br from-ocean-600 to-teal-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs font-medium">профиль</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-400 to-teal-400 rounded-full blur-xl opacity-50 -z-10"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-ocean-100 rounded-full">
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
            <p className="text-sky-800 font-medium">
              Чем больше ты общаешься с системой, тем точнее рекомендации во всех сервисах
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
