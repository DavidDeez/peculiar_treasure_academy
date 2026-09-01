import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">Peculiar Treasure</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-primary transition-colors font-medium">About</a>
            <a href="#courses" className="text-gray-700 hover:text-primary transition-colors font-medium">Courses</a>
            <a href="#features" className="text-gray-700 hover:text-primary transition-colors font-medium">Why Us</a>
            <a href="#contact" className="bg-primary text-white px-5 py-2 rounded-md hover:bg-blue-800 transition-colors font-medium">
              Contact Us
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#about" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md font-medium">About</a>
            <a href="#courses" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md font-medium">Courses</a>
            <a href="#features" onClick={toggleMenu} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-md font-medium">Why Us</a>
            <a href="#contact" onClick={toggleMenu} className="block px-3 py-2 text-primary font-bold hover:bg-gray-50 rounded-md">Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
