import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Community connection"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">Начни прямо сейчас</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Создай свой профиль и найди<br />близких по духу
        </h2>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Без анкет. Через живой диалог.
        </p>

        <a
          href="https://my.linkeon.io"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Перейти в Linkeon
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
