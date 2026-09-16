import React, { useEffect, useRef } from 'react';
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
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // Initialize particles
    const particleCount = 12;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 35; // approx half the icon size
      newParticles.push({
        id: i,
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 1.5, // slow speed
        vy: (Math.random() - 0.5) * 1.5,
        radius: radius,
        type: Math.floor(Math.random() * 4), // 4 different icons
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 0.8 // slow rotation
      });
    }
    
    particlesRef.current = newParticles;
    setIsReady(true);

    const animate = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      const p = particlesRef.current;

      // Update positions
      for (let i = 0; i < p.length; i++) {
        p[i].x += p[i].vx;
        p[i].y += p[i].vy;
        p[i].rotation += p[i].vRot;

        // Wall collisions
        if (p[i].x - p[i].radius <= 0) { p[i].x = p[i].radius; p[i].vx *= -1; }
        if (p[i].x + p[i].radius >= w) { p[i].x = w - p[i].radius; p[i].vx *= -1; }
        if (p[i].y - p[i].radius <= 0) { p[i].y = p[i].radius; p[i].vy *= -1; }
        if (p[i].y + p[i].radius >= h) { p[i].y = h - p[i].radius; p[i].vy *= -1; }

        // Particle collisions
        for (let j = i + 1; j < p.length; j++) {
          const dx = p[j].x - p[i].x;
          const dy = p[j].y - p[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p[i].radius + p[j].radius;

          if (dist < minDist) {
            // Simple elastic collision response
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities to align with collision angle
            const vx1 = p[i].vx * cos + p[i].vy * sin;
            const vy1 = p[i].vy * cos - p[i].vx * sin;
            const vx2 = p[j].vx * cos + p[j].vy * sin;
            const vy2 = p[j].vy * cos - p[j].vx * sin;

            // Swap velocities (assuming equal mass)
            const vx1Final = vx2;
            const vx2Final = vx1;

            // Rotate back
            p[i].vx = vx1Final * cos - vy1 * sin;
            p[i].vy = vy1 * cos + vx1Final * sin;
            p[j].vx = vx2Final * cos - vy2 * sin;
            p[j].vy = vy2 * cos + vx2Final * sin;
            
            // Move apart to prevent sticking
            const overlap = (minDist - dist) / 2.0;
            p[i].x -= overlap * cos;
            p[i].y -= overlap * sin;
            p[j].x += overlap * cos;
            p[j].y += overlap * sin;
          }
        }
      }

      // Update DOM directly for performance without React state overhead
      p.forEach((particle) => {
        const el = document.getElementById(`particle-${particle.id}`);
        if (el) {
          el.style.transform = `translate(${particle.x - particle.radius}px, ${particle.y - particle.radius}px) rotate(${particle.rotation}deg)`;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const getIcon = (type: number) => {
    const props = { size: 60, strokeWidth: 1 };
    switch (type) {
      case 0: return <Book {...props} />;
      case 1: return <GraduationCap {...props} />;
      case 2: return <BookOpen {...props} />;
      case 3: return <Library {...props} />;
      default: return <Book {...props} />;
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden opacity-5 pointer-events-none">
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          id={`particle-${p.id}`}
          className="absolute top-0 left-0 text-white will-change-transform"
          style={{ 
            width: p.radius * 2, 
            height: p.radius * 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {getIcon(p.type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
