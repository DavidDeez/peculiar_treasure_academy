import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

const Countdown: React.FC = () => {
  // Target: Nov 15, 2026 (WAEC GCE 2026 approximation)
  const targetDate = new Date('2026-11-15T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-brand-gold text-brand-dark py-4 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center items-center shadow-md z-40">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm md:text-base">
          <Timer className="w-5 h-5 animate-pulse" />
          <span>WAEC GCE EXAMS BEGIN IN:</span>
        </div>
        
        <div className="flex gap-4 md:gap-6 font-serif">
          <div className="flex flex-col items-center min-w-[3rem]">
            <span className="text-2xl md:text-3xl font-black leading-none">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold mt-1">Days</span>
          </div>
          <span className="text-2xl md:text-3xl font-black leading-none opacity-50">:</span>
          <div className="flex flex-col items-center min-w-[3rem]">
            <span className="text-2xl md:text-3xl font-black leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold mt-1">Hrs</span>
          </div>
          <span className="text-2xl md:text-3xl font-black leading-none opacity-50">:</span>
          <div className="flex flex-col items-center min-w-[3rem]">
            <span className="text-2xl md:text-3xl font-black leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold mt-1">Min</span>
          </div>
          <span className="text-2xl md:text-3xl font-black leading-none opacity-50">:</span>
          <div className="flex flex-col items-center min-w-[3rem]">
            <span className="text-2xl md:text-3xl font-black leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold mt-1">Sec</span>
          </div>
        </div>
      </div>
      
      {/* Tiny upcoming exams list underneath */}
      <div className="mt-4 pt-3 border-t border-brand-dark/10 w-full max-w-2xl text-center">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-dark/70">
          Also Upcoming: NECO GCE (TBA) &nbsp;•&nbsp; WAEC (2027) &nbsp;•&nbsp; JAMB (2027) &nbsp;•&nbsp; NECO (2027)
        </p>
      </div>
    </div>
  );
};

export default Countdown;
