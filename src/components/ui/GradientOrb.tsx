interface Props {
  className?: string;
  size?: number;
  from?: string;
  to?: string;
  opacity?: number;
}

export default function GradientOrb({ className = '', size = 400, from = 'from-indigo-400', to = 'to-pink-300', opacity = 0.4 }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`absolute -z-10 blur-3xl rounded-full bg-gradient-to-br ${from} ${to} pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity }}
    />
  );
}
