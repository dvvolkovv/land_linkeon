import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-ocean-600 via-teal-600 to-sage-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">Начни прямо сейчас</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Начни с диалога —<br />создай свой профиль
        </h2>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Поговори с ассистентом и получи профиль, который работает в трёх сервисах
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://my.linkeon.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ocean-700 text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Поговорить с ассистентом
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="https://my.linkeon.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Уже есть профиль? Войти
          </a>
        </div>
      </div>
    </section>
  );
}
