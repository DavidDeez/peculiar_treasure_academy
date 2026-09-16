import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const openLogo = () => {
    setLogoOpen(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLogoOpen(false), 3000);
  };

  const closeLogo = () => {
    setLogoOpen(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <>
      {/* Logo Lightbox */}
      {logoOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center cursor-pointer"
          style={{ backdropFilter: 'blur(16px)', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeLogo}
        >
          {/* Close Button */}
          <button
            onClick={closeLogo}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border border-white/30"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src="/images/logo.png"
            alt="Peculiar Treasure Academy Logo"
            className="w-[80vw] max-w-lg h-auto object-contain drop-shadow-2xl"
            style={{ animation: 'zoomIn 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          />
          <style>{`
            @keyframes zoomIn {
              from { transform: scale(0.5); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center gap-3" 
            >
              <div
                className="flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
                onClick={openLogo}
                title="Click to view logo"
              >
                <img src="/images/logo.png" alt="Peculiar Treasure Academy Logo" className="h-14 md:h-16 w-auto object-contain" />
              </div>
              <h1
                className="font-serif text-xl md:text-2xl font-bold tracking-tight text-brand-dark m-0 leading-tight md:leading-normal cursor-pointer"
                onClick={() => window.scrollTo(0, 0)}
              >
                Peculiar Treasure <br className="block md:hidden" />
                <span className="uppercase text-brand-gold text-xs md:text-lg tracking-widest block md:inline md:ml-1.5">ACADEMY.</span>
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <a href="#about" className="text-sm tracking-wide text-gray-600 hover:text-brand-gold transition-colors uppercase font-medium">Philosophy</a>
              <a href="#courses" className="text-sm tracking-wide text-gray-600 hover:text-brand-gold transition-colors uppercase font-medium">Academics</a>
              <a href="#features" className="text-sm tracking-wide text-gray-600 hover:text-brand-gold transition-colors uppercase font-medium">The Experience</a>
              <a href="#contact" className="bg-brand-dark text-white px-6 py-2.5 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors">
                Admissions
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-brand-dark p-2">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full pb-6 shadow-xl">
            <div className="px-6 pt-4 space-y-4">
              <a href="#about" onClick={toggleMenu} className="block text-gray-800 text-lg font-serif">Philosophy</a>
              <a href="#courses" onClick={toggleMenu} className="block text-gray-800 text-lg font-serif">Academics</a>
              <a href="#features" onClick={toggleMenu} className="block text-gray-800 text-lg font-serif">The Experience</a>
              <a href="#contact" onClick={toggleMenu} className="block text-brand-gold text-lg font-serif italic">Admissions</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;


