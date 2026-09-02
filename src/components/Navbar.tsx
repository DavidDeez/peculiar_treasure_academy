import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => window.scrollTo(0,0)}
          >
            <h1 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-brand-dark m-0 leading-tight md:leading-normal">
              Peculiar Treasure <br className="block md:hidden" />
              <span className="uppercase text-brand-gold text-xs md:text-lg tracking-widest block md:inline">ACADEMY.</span>
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
  );
};

export default Navbar;
