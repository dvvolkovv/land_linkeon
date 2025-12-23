import { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  type: 'profile' | 'value' | 'belief' | 'intention' | 'interest' | 'desire';
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
  const draggedNodeRef = useRef<Node | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

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

    // Дополнительные элементы профиля
    const profileElements = {
      beliefs: { label: 'Убеждения', type: 'belief' as const, color: '#f59e0b', distance: 160 },
      intentions: { label: 'Намерения', type: 'intention' as const, color: '#8b5cf6', distance: 160 },
      interests: { label: 'Интересы', type: 'interest' as const, color: '#ec4899', distance: 160 },
      desires: { label: 'Желания', type: 'desire' as const, color: '#f43f5e', distance: 160 }
    };

    const createProfileElements = (profileId: number, centerX: number, centerY: number): Node[] => {
      const elements = Object.entries(profileElements);
      return elements.map(([key, config], i) => {
        const angle = (i / elements.length) * Math.PI * 2 - Math.PI / 2;
        return {
          id: `p${profileId}-${key}`,
          x: centerX + Math.cos(angle) * config.distance,
          y: centerY + Math.sin(angle) * config.distance,
          vx: 0,
          vy: 0,
          label: config.label,
          type: config.type,
          profile: profileId
        };
      });
    };

    const profile1Elements = createProfileElements(1, leftX, centerY);
    const profile2Elements = createProfileElements(2, rightX, centerY);

    const profile1Nodes: Node[] = profile1OnlyValues.map((label, i) => ({
      id: `p1-${label}`,
      x: leftX + Math.cos((i / profile1OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      y: centerY + Math.sin((i / profile1OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      label,
      type: 'value' as const,
      profile: 1
    }));

    const profile2Nodes: Node[] = profile2OnlyValues.map((label, i) => ({
      id: `p2-${label}`,
      x: rightX + Math.cos((i / profile2OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      y: centerY + Math.sin((i / profile2OnlyValues.length) * Math.PI * 2 - Math.PI / 2) * 100,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      label,
      type: 'value' as const,
      profile: 2
    }));

    const sharedNodes: Node[] = sharedValues.map((label, i) => ({
      id: `shared-${label}`,
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (i - sharedValues.length / 2) * 80,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      label,
      type: 'value' as const,
      profile: 0
    }));

    nodesRef.current = [...profileNodes, ...profile1Elements, ...profile2Elements, ...profile1Nodes, ...profile2Nodes, ...sharedNodes];

    edgesRef.current = [
      ...Object.keys(profileElements).map(key => ({
        source: 'profile1',
        target: `p1-${key}`
      })),
      ...Object.keys(profileElements).map(key => ({
        source: 'profile2',
        target: `p2-${key}`
      })),
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
        if (draggedNodeRef.current === node) {
          node.x = mousePositionRef.current.x;
          node.y = mousePositionRef.current.y;
          node.vx = 0;
          node.vy = 0;
        } else if (node.type === 'value') {
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
            node.vx += dx * factor * 0.015;
            node.vy += dy * factor * 0.015;
          }

          nodesRef.current.forEach(other => {
            if (node.id !== other.id && other.type === 'value') {
              const dx = other.x - node.x;
              const dy = other.y - node.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 70 && distance > 0) {
                node.vx -= (dx / distance) * 0.4;
                node.vy -= (dy / distance) * 0.4;
              }
            }
          });

          node.vx += (Math.random() - 0.5) * 0.15;
          node.vy += (Math.random() - 0.5) * 0.15;

          node.vx *= 0.95;
          node.vy *= 0.95;

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
          } else if (target.type === 'belief' || target.type === 'intention' || target.type === 'interest' || target.type === 'desire') {
            const colors: Record<string, string> = {
              belief: 'rgba(245, 158, 11, 0.5)',
              intention: 'rgba(139, 92, 246, 0.5)',
              interest: 'rgba(236, 72, 153, 0.5)',
              desire: 'rgba(244, 63, 94, 0.5)'
            };
            ctx.strokeStyle = colors[target.type] || 'rgba(100, 100, 100, 0.3)';
            ctx.lineWidth = 2;
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
        } else if (node.type === 'belief' || node.type === 'intention' || node.type === 'interest' || node.type === 'desire') {
          const colors: Record<string, string> = {
            belief: '#f59e0b',
            intention: '#8b5cf6',
            interest: '#ec4899',
            desire: '#f43f5e'
          };

          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = colors[node.type];
          ctx.fill();
          ctx.strokeStyle = colors[node.type];
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.font = 'bold 12px Inter, sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, node.y - 22);
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

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      const mousePos = getMousePos(e);

      for (const node of nodesRef.current) {
        if (node.type === 'value' || node.type === 'belief' || node.type === 'intention' || node.type === 'interest' || node.type === 'desire') {
          const dx = mousePos.x - node.x;
          const dy = mousePos.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          let radius = 8;
          if (node.type === 'value') {
            radius = node.profile === 0 ? 12 : 8;
          } else {
            radius = 10;
          }

          if (distance <= radius + 5) {
            draggedNodeRef.current = node;
            mousePositionRef.current = mousePos;
            canvas.style.cursor = 'grabbing';
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = getMousePos(e);

      if (draggedNodeRef.current) {
        mousePositionRef.current = mousePos;
      } else {
        let hovering = false;
        for (const node of nodesRef.current) {
          if (node.type === 'value' || node.type === 'belief' || node.type === 'intention' || node.type === 'interest' || node.type === 'desire') {
            const dx = mousePos.x - node.x;
            const dy = mousePos.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            let radius = 8;
            if (node.type === 'value') {
              radius = node.profile === 0 ? 12 : 8;
            } else {
              radius = 10;
            }

            if (distance <= radius + 5) {
              hovering = true;
              break;
            }
          }
        }
        canvas.style.cursor = hovering ? 'grab' : 'default';
      }
    };

    const handleMouseUp = () => {
      draggedNodeRef.current = null;
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
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
