import type { ReactNode, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = '', ...rest }: Props) {
  return (
    <div
      {...rest}
      className={`bg-white border border-slate-200 rounded-2xl transition-colors hover:border-slate-300 ${className}`}
    >
      {children}
    </div>
  );
}
