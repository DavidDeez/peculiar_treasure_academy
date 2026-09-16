import React, { useEffect, useState, useRef } from 'react';
import { Book, GraduationCap, BookOpen, Library } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: number;
  rotation: number;
  vRot: number;
}

const FloatingIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Track if we've initialized to avoid StrictMode double-init issues
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    // Use a small timeout to ensure the container is fully painted and sized
    const timer = setTimeout(() => {
      const width = containerRef.current?.clientWidth || window.innerWidth || 1000;
      const height = containerRef.current?.clientHeight || 600; // fallback to 600
      
      const particleCount = 12;
      const initialParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        const radius = 35;
        // Ensure they start inside the bounds
        const safeWidth = Math.max(width - radius * 2, 100);
        const safeHeight = Math.max(height - radius * 2, 100);
        
        initialParticles.push({
          id: i,
          x: (Math.random() * safeWidth) + radius,
          y: (Math.random() * safeHeight) + radius,
          vx: (Math.random() - 0.5) * 2.0, 
          vy: (Math.random() - 0.5) * 2.0,
          radius: radius,
          type: i % 4, // Guarantee even distribution of 4 icons
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 1.5 
        });
      }
      
      setParticles(initialParticles);
      initialized.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      // Use delta time to ensure consistent speed regardless of refresh rate
      const dt = Math.min((time - lastTime) / 16.66, 2.0); // cap at 2.0 to avoid huge jumps
      lastTime = time;

      const width = containerRef.current?.clientWidth || window.innerWidth;
      const height = containerRef.current?.clientHeight || 600;

      setParticles((prev) => {
        // We must clone the array and objects to mutate them safely in React state
        const p = prev.map(particle => ({ ...particle }));

        for (let i = 0; i < p.length; i++) {
          p[i].x += p[i].vx * dt;
          p[i].y += p[i].vy * dt;
          p[i].rotation += p[i].vRot * dt;

          // Wall collisions
          if (p[i].x - p[i].radius <= 0) { p[i].x = p[i].radius; p[i].vx *= -1; }
          if (p[i].x + p[i].radius >= width) { p[i].x = width - p[i].radius; p[i].vx *= -1; }
          if (p[i].y - p[i].radius <= 0) { p[i].y = p[i].radius; p[i].vy *= -1; }
          if (p[i].y + p[i].radius >= height) { p[i].y = height - p[i].radius; p[i].vy *= -1; }

          // Particle collisions
          for (let j = i + 1; j < p.length; j++) {
            const dx = p[j].x - p[i].x;
            const dy = p[j].y - p[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = p[i].radius + p[j].radius;

            if (dist < minDist && dist > 0) {
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              const vx1 = p[i].vx * cos + p[i].vy * sin;
              const vy1 = p[i].vy * cos - p[i].vx * sin;
              const vx2 = p[j].vx * cos + p[j].vy * sin;
              const vy2 = p[j].vy * cos - p[j].vx * sin;

              p[i].vx = vx2 * cos - vy1 * sin;
              p[i].vy = vy1 * cos + vx2 * sin;
              p[j].vx = vx1 * cos - vy2 * sin;
              p[j].vy = vy2 * cos + vx1 * sin;
              
              const overlap = (minDist - dist) / 2.0;
              p[i].x -= overlap * cos;
              p[i].y -= overlap * sin;
              p[j].x += overlap * cos;
              p[j].y += overlap * sin;
            }
          }
        }
        return p;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [particles.length]);

  const getIcon = (type: number) => {
    const props = { size: 60, strokeWidth: 1.5 };
    switch (type) {
      case 0: return <Book {...props} />;
      case 1: return <GraduationCap {...props} />;
      case 2: return <BookOpen {...props} />;
      case 3: return <Library {...props} />;
      default: return <Book {...props} />;
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 left-0 text-brand-gold will-change-transform drop-shadow-lg"
          style={{ 
            width: p.radius * 2, 
            height: p.radius * 2,
            transform: `translate(${p.x - p.radius}px, ${p.y - p.radius}px) rotate(${p.rotation}deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 1s ease-in', // Fade in smoothly
            opacity: 1 // Start visible
          }}
        >
          {getIcon(p.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
