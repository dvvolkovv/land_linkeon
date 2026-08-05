import type { ReactNode, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = '', ...rest }: Props) {
  return (
    <div
      {...rest}
      className={`bg-white border border-gray-200 rounded-2xl transition-colors hover:border-gray-300 ${className}`}
    >
      {children}
    </div>
  );
}
