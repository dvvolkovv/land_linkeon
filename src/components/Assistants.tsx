import { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';

interface Assistant {
  id: string;
  name: string;
  role: string;
  description: string;
}

const AVATAR_BASE_URL = 'https://travel-n8n.up.railway.app/webhook/0cdacf32-7bfd-4888-b24f-3a6af3b5f99e/agent/avatar';

export default function Assistants() {
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
    <section className="py-20 bg-white w-full">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Ассистенты
        </h2>
        <p className="text-xl text-gray-600 mb-16 text-center max-w-2xl mx-auto">
          Каждый ассистент — эксперт в своей области, готовый помочь раскрыть вашу уникальность
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assistants.map((assistant) => (
              <div
                key={assistant.id}
                className="group relative bg-white p-8 rounded-3xl border-2 border-forest-100 hover:border-forest-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-32 h-32 mb-6 group-hover:scale-110 transition-all duration-300">
                  <img
                    src={`${AVATAR_BASE_URL}/${assistant.id}`}
                    alt={assistant.name}
                    className="w-full h-full rounded-2xl object-cover shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-32 h-32 bg-gradient-to-br from-forest-500 to-forest-600 rounded-2xl flex items-center justify-center">
                    <UserCircle className="w-16 h-16 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {assistant.name}
                </h3>

                <p className="text-forest-700 font-semibold mb-3">
                  {assistant.role}
                </p>

                <p className="text-gray-600 leading-relaxed">
                  {assistant.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
