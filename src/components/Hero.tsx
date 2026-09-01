import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#faf9f6] overflow-hidden min-h-screen flex items-center">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold-light/30 rounded-bl-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold mb-8 text-sm font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              Enrolling for the Fall Term
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
              Where exceptional <br className="hidden md:block" />
              <span className="italic font-light text-brand-gold">minds</span> are shaped.
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              We move beyond standard curriculum. Peculiar Treasure Academy provides rigorous, tailored academic mentorship designed to cultivate intellectual curiosity and lifelong success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="group bg-brand-dark text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-3">
                Begin Application 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#courses" className="bg-transparent text-brand-dark border border-gray-300 px-8 py-4 text-sm uppercase tracking-wider font-medium hover:border-brand-dark transition-colors flex items-center justify-center">
                Explore Curriculum
              </a>
            </div>
          </div>

          {/* Image Layout */}
          <div className="relative">
            {/* INSTRUCTION: Replace these divs with an actual <img> tag when you have the picture */}
            <div className="aspect-[4/5] bg-gray-200 object-cover shadow-2xl flex items-center justify-center text-center p-6 relative z-10">
               <div className="text-gray-500">
                  <div className="text-xl mb-2 font-serif">📸 Primary Image</div>
                  <p className="text-sm">E.g., Students in a focused discussion</p>
               </div>
            </div>
            
            {/* Offset decorative image */}
            <div className="hidden md:flex absolute -bottom-12 -left-12 aspect-square w-64 bg-gray-300 border-8 border-[#faf9f6] shadow-xl items-center justify-center text-center p-4 z-20">
               <div className="text-gray-500">
                  <div className="text-sm mb-1 font-serif">📸 Accent Image</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
