import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-50 via-primary-50 to-warm-50">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-warm-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-earth-200 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="People connecting"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <img
            src="/logo1.png"
            alt="Linkeon Logo"
            className="w-20 h-20 object-contain"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Linkeon — найди людей,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-700 to-warm-700">близких по духу</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Создай связи, основанные на ценностях, смыслах и намерениях
        </p>

        <a
          href="https://my.linkeon.io"
          className="inline-flex items-center gap-2 px-8 py-4 bg-forest-600 hover:bg-forest-700 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          Начать исследование себя
          <Sparkles className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
