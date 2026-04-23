import type { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

interface Props {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  className?: string;
  dataCta?: string;
  type?: 'button' | 'submit';
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30',
  outline: 'border border-slate-300 text-slate-900 bg-white hover:border-slate-400 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100',
};

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  dataCta,
  type = 'button',
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} data-cta={dataCta} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} data-cta={dataCta} className={cls}>
      {children}
    </button>
  );
}
