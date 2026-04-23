import type { ReactNode } from 'react';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({ id, className = '', children }: Props) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </section>
  );
}
