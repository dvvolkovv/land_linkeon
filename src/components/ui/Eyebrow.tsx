interface Props { children: string; className?: string }

export default function Eyebrow({ children, className = '' }: Props) {
  return (
    <span className={`inline-block text-xs md:text-sm font-semibold text-brand-800 tracking-widest uppercase ${className}`}>
      {children}
    </span>
  );
}
