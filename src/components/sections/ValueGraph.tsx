import { useEffect, useRef } from 'react';
import { useInView } from '../../lib/useInView';

interface Node {
  id: string;
  type: 'self' | 'value' | 'other';
  x: number; y: number; vx: number; vy: number;
  r: number;
  label?: string;
  orbitAngle?: number;
  orbitRadius?: number;
}

const COLORS = {
  self: '#4f46e5',
  value: '#10b981',
  other: '#94a3b8',
  link: '#cbd5e1',
  activeLink: '#818cf8',
};

const VALUES = ['Честность', 'Рост', 'Свобода', 'Семья', 'Вклад', 'Творчество', 'Развитие', 'Доверие'];
const OTHERS = ['А', 'М', 'К', 'Д', 'С', 'Н'];

export default function ValueGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const rafRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const initNodes = (w: number, h: number) => {
      const cx = w / 2, cy = h / 2;
      const nodes: Node[] = [];
      nodes.push({ id: 'self', type: 'self', x: cx, y: cy, vx: 0, vy: 0, r: 10 });
      VALUES.forEach((label, i) => {
        const angle = (i / VALUES.length) * Math.PI * 2;
        const orbit = Math.min(w, h) * 0.22;
        nodes.push({
          id: `value-${i}`, type: 'value', label,
          x: cx + Math.cos(angle) * orbit, y: cy + Math.sin(angle) * orbit,
          vx: 0, vy: 0, r: 5, orbitAngle: angle, orbitRadius: orbit,
        });
      });
      OTHERS.forEach((label, i) => {
        const angle = (i / OTHERS.length) * Math.PI * 2 + Math.PI / 6;
        const dist = Math.min(w, h) * 0.42;
        nodes.push({
          id: `other-${i}`, type: 'other', label,
          x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: 8,
        });
      });
      nodesRef.current = nodes;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      }
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);
    resize();

    const tick = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      const cx = w / 2, cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const self = nodes[0];

      nodes.forEach((n) => {
        if (n.type === 'value' && n.orbitAngle !== undefined && n.orbitRadius !== undefined) {
          n.orbitAngle += 0.003;
          n.x = cx + Math.cos(n.orbitAngle) * n.orbitRadius;
          n.y = cy + Math.sin(n.orbitAngle) * n.orbitRadius;
        } else if (n.type === 'other') {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 40 || n.x > w - 40) n.vx *= -1;
          if (n.y < 40 || n.y > h - 40) n.vy *= -1;
          const dx = n.x - mouseRef.current.x, dy = n.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80 && dist > 0) {
            n.x += (dx / dist) * 0.8;
            n.y += (dy / dist) * 0.8;
          }
        }
      });

      ctx.strokeStyle = COLORS.link;
      ctx.lineWidth = 1;
      nodes.forEach((n) => {
        if (n.type === 'value') {
          ctx.beginPath();
          ctx.moveTo(self.x, self.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      });

      nodes.forEach((n) => {
        if (n.type === 'other') {
          const dx = n.x - self.x, dy = n.y - self.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = Math.min(w, h) * 0.35;
          if (dist < threshold) {
            const opacity = 1 - dist / threshold;
            ctx.strokeStyle = COLORS.activeLink;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(self.x, self.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      nodes.forEach((n) => {
        ctx.fillStyle = COLORS[n.type];
        if (n.type === 'self') {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
          ctx.fillStyle = COLORS.self;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.type === 'other' && n.label) {
          ctx.fillStyle = '#64748b';
          ctx.font = '10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y + n.r + 12);
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    if (inView) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, [inView]);

  return (
    <div ref={containerRef} className="w-full h-[420px] md:h-[560px]">
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full" />
    </div>
  );
}
