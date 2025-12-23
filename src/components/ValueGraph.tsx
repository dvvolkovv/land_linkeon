import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  type: 'profile' | 'value';
  profile?: number;
}

interface Edge {
  source: string;
  target: string;
  isConnection?: boolean;
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

    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    const profile1Values = ['Семья', 'Рост', 'Творчество', 'Баланс'];
    const profile2Values = ['Творчество', 'Свобода', 'Рост', 'Природа'];
    const sharedValues = ['Рост', 'Творчество'];
    const profile1OnlyValues = profile1Values.filter(v => !sharedValues.includes(v));
    const profile2OnlyValues = profile2Values.filter(v => !sharedValues.includes(v));

    const leftX = width * 0.25;
    const rightX = width * 0.75;
    const centerX = width / 2;
    const centerY = height / 2;

    const profileNodes: Node[] = [
      {
        id: 'profile1',
        x: leftX,
        y: centerY,
        vx: 0,
        vy: 0,
        label: 'Профиль 1',
        type: 'profile',
        profile: 1
      },
      {
        id: 'profile2',
        x: rightX,
        y: centerY,
        vx: 0,
        vy: 0,
        label: 'Профиль 2',
        type: 'profile',
        profile: 2
      }
    ];

    const profile1Nodes: Node[] = profile1OnlyValues.map((label, i) => ({
      id: `p1-${label}`,
      x: leftX + Math.cos((i / profile1OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      y: centerY + Math.sin((i / profile1OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      label,
      type: 'value' as const,
      profile: 1
    }));

    const profile2Nodes: Node[] = profile2OnlyValues.map((label, i) => ({
      id: `p2-${label}`,
      x: rightX + Math.cos((i / profile2OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      y: centerY + Math.sin((i / profile2OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      label,
      type: 'value' as const,
      profile: 2
    }));

    const sharedNodes: Node[] = sharedValues.map((label, i) => ({
      id: `shared-${label}`,
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (i - sharedValues.length / 2) * 80,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      label,
      type: 'value' as const,
      profile: 0
    }));

    nodesRef.current = [...profileNodes, ...profile1Nodes, ...profile2Nodes, ...sharedNodes];

    edgesRef.current = [
      ...profile1OnlyValues.map(v => ({
        source: 'profile1',
        target: `p1-${v}`
      })),
      ...profile2OnlyValues.map(v => ({
        source: 'profile2',
        target: `p2-${v}`
      })),
      ...sharedValues.map(v => ({
        source: 'profile1',
        target: `shared-${v}`
      })),
      ...sharedValues.map(v => ({
        source: 'profile2',
        target: `shared-${v}`
      }))
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      nodesRef.current.forEach(node => {
        if (node.type === 'value') {
          let targetX: number;
          let targetY: number;
          let targetDistance: number;

          if (node.profile === 0) {
            targetX = centerX;
            targetY = centerY;
            targetDistance = 90;
          } else if (node.profile === 1) {
            targetX = leftX;
            targetY = centerY;
            targetDistance = 100;
          } else {
            targetX = rightX;
            targetY = centerY;
            targetDistance = 100;
          }

          const dx = targetX - node.x;
          const dy = targetY - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (Math.abs(distance - targetDistance) > 5) {
            const factor = (distance - targetDistance) / distance;
            node.vx += dx * factor * 0.02;
            node.vy += dy * factor * 0.02;
          }

          nodesRef.current.forEach(other => {
            if (node.id !== other.id && other.type === 'value') {
              const dx = other.x - node.x;
              const dy = other.y - node.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 70 && distance > 0) {
                node.vx -= (dx / distance) * 0.3;
                node.vy -= (dy / distance) * 0.3;
              }
            }
          });

          node.vx *= 0.93;
          node.vy *= 0.93;

          node.x += node.vx;
          node.y += node.vy;
        }
      });

      edgesRef.current.forEach(edge => {
        const source = nodesRef.current.find(n => n.id === edge.source);
        const target = nodesRef.current.find(n => n.id === edge.target);

        if (source && target) {
          const isSharedEdge = target.id.startsWith('shared-');

          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);

          if (isSharedEdge) {
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
            ctx.lineWidth = 2.5;
          } else {
            ctx.strokeStyle = source.profile === 1 ? 'rgba(14, 165, 233, 0.4)' : 'rgba(20, 184, 166, 0.4)';
            ctx.lineWidth = 2;
          }

          ctx.stroke();
        }
      });

      nodesRef.current.forEach(node => {
        if (node.type === 'profile') {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
          ctx.fillStyle = node.profile === 1 ? '#0ea5e9' : '#14b8a6';
          ctx.fill();
          ctx.strokeStyle = node.profile === 1 ? '#0284c7' : '#0d9488';
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, node.y - 35);
        } else {
          const isShared = node.profile === 0;

          ctx.beginPath();
          ctx.arc(node.x, node.y, isShared ? 12 : 8, 0, Math.PI * 2);
          ctx.fillStyle = isShared ? '#10b981' : (node.profile === 1 ? '#0ea5e9' : '#14b8a6');
          ctx.fill();
          ctx.strokeStyle = isShared ? '#059669' : (node.profile === 1 ? '#0284c7' : '#0d9488');
          ctx.lineWidth = isShared ? 3 : 2;
          ctx.stroke();

          if (isShared) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          ctx.font = isShared ? 'bold 14px Inter, sans-serif' : '12px Inter, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, node.y - (isShared ? 28 : 20));
        }
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
