import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          <div className="md:col-span-5">
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-6">
              Peculiar Treasure.
            </h2>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-8">
              Transforming potential into brilliance. An academy dedicated to academic rigor and personal growth.
            </p>
            <div className="flex space-x-6 text-sm font-medium tracking-wide">
              <a href="#" className="text-brand-gold hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-brand-gold hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-brand-gold hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-6">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#about" className="hover:text-brand-gold transition-colors">Philosophy</a></li>
              <li><a href="#courses" className="hover:text-brand-gold transition-colors">Academics</a></li>
              <li><a href="#features" className="hover:text-brand-gold transition-colors">The Experience</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Admissions</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-20 pt-8 flex justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Peculiar Treasure Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
