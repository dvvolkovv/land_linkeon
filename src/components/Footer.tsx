import { ExternalLink, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-sky-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo1.png"
              alt="Linkeon Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold">Linkeon</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <a
              href="https://linkeon.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ocean-200 hover:text-teal-300 transition-colors"
            >
              linkeon.io
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://my.linkeon.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ocean-200 hover:text-teal-300 transition-colors"
            >
              my.linkeon.io
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://hr.linkeon.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ocean-200 hover:text-teal-300 transition-colors"
            >
              hr.linkeon.io
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://hearty.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ocean-200 hover:text-teal-300 transition-colors"
            >
              hearty.pro
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/ainomira"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ocean-200 hover:text-teal-300 transition-colors"
            >
              Telegram канал
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-sky-700">
          <p className="text-ocean-200 flex items-center justify-center gap-2">
            Создаём пространство осознанных связей
          </p>
        </div>
      </div>
    </footer>
  );
}
