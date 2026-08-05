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
  primary: 'bg-brand-700 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-800 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/30',
  outline: 'border border-gray-300 text-gray-900 bg-white hover:border-gray-400 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
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
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 ${variantClasses[variant]} ${sizeClasses[size]} ${disabledCls} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const external = href.startsWith('http');
    // Приложение (my.linkeon.io) — это ЦЕЛЬ воронки, а не «внешняя ссылка»:
    // переходим в той же вкладке. target="_blank" из VK in-app браузера
    // (мобильный трафик с рекламы) часто молча не срабатывает — тап «вникуда»,
    // и пользователь не доходит до логина. Прочие http-ссылки — в новой вкладке.
    const toApp = href.includes('my.linkeon.io');
    const openNewTab = external && !toApp;
    return (
      <a
        {...anchorRest}
        href={href}
        data-cta={dataCta}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        target={openNewTab ? '_blank' : undefined}
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
