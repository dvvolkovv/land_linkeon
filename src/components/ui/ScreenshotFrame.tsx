import type { ReactNode } from 'react';

interface Props {
  url: string;
  children: ReactNode;
  className?: string;
  aspect?: string;
}

export default function ScreenshotFrame({ url, children, className = '', aspect = 'aspect-[16/10]' }: Props) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-900/10 overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-xs font-mono text-slate-500 bg-white border border-slate-200 rounded-md px-3 py-0.5">{url}</span>
        </div>
        <div className="w-12" />
      </div>
      <div className={aspect}>{children}</div>
    </div>
  );
}
