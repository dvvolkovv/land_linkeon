import { ArrowRight } from 'lucide-react';
import ValueGraph from './ValueGraph';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-ocean-50 via-white to-teal-50 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <ValueGraph />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-sky-900 leading-tight">
          Поговори с ассистентом — <br />
          <span className="bg-gradient-to-r from-ocean-600 to-teal-600 bg-clip-text text-transparent">
            создай профиль, который работает везде
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-sky-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Общайся с ИИ-коучем, психологом, HR-наставником или бизнес-ментором.
          Твой профиль формируется автоматически и используется для поиска людей,
          работы и специалистов.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://my.linkeon.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-ocean-600 text-white rounded-full font-semibold text-lg hover:bg-ocean-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Начать диалог
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://my.linkeon.io"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-ocean-600 text-ocean-600 rounded-full font-semibold text-lg hover:bg-ocean-50 transition-all duration-300"
          >
            Уже есть профиль? Войти
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sky-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Один профиль — три сервиса</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Накопительная персонализация</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Поиск по ценностям</span>
          </div>
        </div>
      </div>
    </section>
  );
}
