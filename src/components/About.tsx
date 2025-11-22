import { Heart } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest-100 to-warm-100 rounded-full mb-8">
              <Heart className="w-8 h-8 text-forest-700" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              О проекте
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">Linkeon</strong> — это платформа, которая соединяет людей по глубинным ценностям и мировоззрению.
              </p>
              <p>
                Без анкет, без лайков. Только осознанность, смысл и живое присутствие.
              </p>
              <p>
                AI-ассистенты помогают раскрыть личность через диалог, а алгоритм совместимости показывает тех, с кем вы действительно в резонансе.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="People in meaningful conversation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
