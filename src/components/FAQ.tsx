import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Как формируется профиль?',
    answer: 'Автоматически, через диалоги с ассистентами. Также ты можешь загрузить резюме, эссе или ссылки на свои ресурсы. Чем больше информации система получает, тем точнее она понимает твои ценности и намерения.'
  },
  {
    question: 'Могу ли я редактировать профиль?',
    answer: 'Да, ты видишь все данные и можешь их корректировать в разделе "Мой профиль". Ты полностью контролируешь, какая информация сохраняется и отображается.'
  },
  {
    question: 'Безопасно ли это?',
    answer: 'Данные хранятся в защищённой графовой базе Neo4j с современными протоколами шифрования. Ты контролируешь, что показывать другим пользователям. Мы не передаём твои данные третьим лицам.'
  },
  {
    question: 'Сколько это стоит?',
    answer: 'Есть 3 тарифа на выбор. Расширенные функции (глубокий поиск совпадений, совместимость) — бесплатно.'
  },
  {
    question: 'Чем Linkeon отличается от обычных знакомств?',
    answer: 'Традиционные сервисы знакомств основаны на внешних параметрах и анкетах. Linkeon анализирует глубинные ценности, намерения и жизненные приоритеты через диалоги с ИИ-ассистентами, что позволяет находить по-настоящему близких людей.'
  },
  {
    question: 'Можно ли использовать только один сервис?',
    answer: 'Да, ты можешь пользоваться любым из трёх сервисов отдельно. Но твой профиль будет работать во всех трёх, становясь со временем всё точнее и полезнее.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-ocean-50 to-teal-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Частые вопросы
        </h2>
        <p className="text-xl text-sky-700 mb-16 text-center">
          Ответы на главные вопросы о платформе
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border-2 border-ocean-100 overflow-hidden hover:border-ocean-300 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-ocean-50 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-sky-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-ocean-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-sky-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
