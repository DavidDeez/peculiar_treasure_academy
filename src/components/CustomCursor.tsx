import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateTouchPosition = (e: TouchEvent) => {
      setIsVisible(true);
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const hideTouch = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent | TouchEvent) => {
      try {
        const target = e.target as HTMLElement;
        if (!target || !target.tagName) {
          setIsHovering(false);
          return;
        }
        
        const tagName = target.tagName.toLowerCase();
        const isHoverable = 
          tagName === 'a' || 
          tagName === 'button' || 
          (target.closest && (target.closest('a') || target.closest('button'))) ||
          (target.classList && target.classList.contains('cursor-pointer'));

        setIsHovering(!!isHoverable);
      } catch (err) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchstart', updateTouchPosition, { passive: true });
    window.addEventListener('touchmove', updateTouchPosition, { passive: true });
    window.addEventListener('touchend', hideTouch);
    window.addEventListener('touchcancel', hideTouch);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', updateTouchPosition);
      window.removeEventListener('touchmove', updateTouchPosition);
      window.removeEventListener('touchend', hideTouch);
      window.removeEventListener('touchcancel', hideTouch);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: mousePosition.x - 2, // slight offset to align the tip
        y: mousePosition.y - 2,
        scale: isHovering ? 1.2 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
    >
      <MousePointer2 
        className="w-4 h-4 text-brand-dark fill-brand-gold drop-shadow-md" 
        strokeWidth={2}
      />
    </motion.div>
  );
};

export default CustomCursor;
