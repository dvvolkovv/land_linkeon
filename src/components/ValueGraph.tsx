import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
}

interface Edge {
  source: string;
  target: string;
}

export default function ValueGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const values = [
      'Осознанность',
      'Семья',
      'Природа',
      'Творчество',
      'Свобода',
      'Рост',
      'Доверие',
      'Баланс',
    ];

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    nodesRef.current = values.map((label, i) => ({
      id: label,
      x: width / 2 + Math.cos((i / values.length) * Math.PI * 2) * 150,
      y: height / 2 + Math.sin((i / values.length) * Math.PI * 2) * 150,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      label,
    }));

    edgesRef.current = [
      { source: 'Осознанность', target: 'Семья' },
      { source: 'Семья', target: 'Природа' },
      { source: 'Природа', target: 'Баланс' },
      { source: 'Творчество', target: 'Свобода' },
      { source: 'Свобода', target: 'Рост' },
      { source: 'Рост', target: 'Доверие' },
      { source: 'Доверие', target: 'Осознанность' },
      { source: 'Творчество', target: 'Осознанность' },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      nodesRef.current.forEach(node => {
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          node.vx += (dx / distance) * 0.01;
          node.vy += (dy / distance) * 0.01;
        }

        nodesRef.current.forEach(other => {
          if (node.id !== other.id) {
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100 && distance > 0) {
              node.vx -= (dx / distance) * 0.5;
              node.vy -= (dy / distance) * 0.5;
            }
          }
        });

        node.vx *= 0.95;
        node.vy *= 0.95;

        node.x += node.vx;
        node.y += node.vy;
      });

      edgesRef.current.forEach(edge => {
        const source = nodesRef.current.find(n => n.id === edge.source);
        const target = nodesRef.current.find(n => n.id === edge.target);

        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      nodesRef.current.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#0ea5e9';
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y - 20);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
