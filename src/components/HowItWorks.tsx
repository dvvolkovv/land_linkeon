import { useEffect, useState } from 'react';
import { UserCircle, MessageCircle, Share2 } from 'lucide-react';

interface Assistant {
  id: string;
  name: string;
  role: string;
  description: string;
}

const AVATAR_BASE_URL = 'https://travel-n8n.up.railway.app/webhook/0cdacf32-7bfd-4888-b24f-3a6af3b5f99e/agent/avatar';

const steps = [
  {
    icon: UserCircle,
    number: '1',
    title: 'Выбери ассистента',
    description: 'Миша-коуч, Оля-психолог, Ирина-HR, Андрей-наставник и другие'
  },
  {
    icon: MessageCircle,
    number: '2',
    title: 'Общайся',
    description: 'Профиль формируется автоматически. Чем больше общаешься — тем глубже система тебя понимает'
  },
  {
    icon: Share2,
    number: '3',
    title: 'Используй профиль',
    description: 'Один профиль работает в трёх сервисах: поиск людей, работы и специалистов'
  }
];

export default function HowItWorks() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await fetch('https://travel-n8n.up.railway.app/webhook/agents');
        const data = await response.json();
        setAssistants(data);
      } catch (error) {
        console.error('Error fetching assistants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-ocean-50 to-teal-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-sky-900 mb-4 text-center">
          Как это работает
        </h2>
        <p className="text-xl text-sky-700 mb-16 text-center max-w-2xl mx-auto">
          Три простых шага к накопительному профилю
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-3xl bg-white hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-ocean-500 to-teal-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-sky-900">
                    {step.title}
                  </h3>

                  <p className="text-sky-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-teal-300 to-transparent -z-10"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-sky-900 mb-8 text-center">
            Познакомься с ассистентами
          </h3>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-ocean-200 border-t-ocean-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assistants.map((assistant) => (
                <div
                  key={assistant.id}
                  className="group bg-white p-6 rounded-2xl border-2 border-ocean-100 hover:border-ocean-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-24 h-24 mb-4 group-hover:scale-110 transition-all duration-300">
                    <img
                      src={`${AVATAR_BASE_URL}/${assistant.id}`}
                      alt={assistant.name}
                      className="w-full h-full rounded-xl object-cover shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-24 h-24 bg-gradient-to-br from-ocean-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <UserCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-sky-900 mb-1">
                    {assistant.name}
                  </h4>

                  <p className="text-teal-700 font-semibold mb-2 text-sm">
                    {assistant.role}
                  </p>

                  <p className="text-sky-700 text-sm leading-relaxed">
                    {assistant.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
