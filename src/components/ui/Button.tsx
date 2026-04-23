import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  dataCta?: string;
  disabled?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | 'href'> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type Props = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30',
  outline: 'border border-slate-300 text-slate-900 bg-white hover:border-slate-400 hover:bg-slate-50',
  ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100',
};

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export default function Button(props: Props) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    dataCta,
    disabled,
    ...rest
  } = props;

  const disabledCls = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${disabledCls} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const external = href.startsWith('http');
    return (
      <a
        {...anchorRest}
        href={href}
        data-cta={dataCta}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
      >
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonRest}
      type={buttonRest.type ?? 'button'}
      disabled={disabled}
      data-cta={dataCta}
      className={cls}
    >
      {children}
    </button>
  );
}
