import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#faf9f6] overflow-hidden min-h-screen flex items-center">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold-light/30 rounded-bl-[100px] -z-10 animate-fade-in-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl transform transition-all duration-1000 translate-y-0 opacity-100">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold mb-8 text-sm font-medium tracking-wide hover:bg-brand-gold/20 transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              Enrolling for New Batches
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-brand-dark">
              Dedicated Tutorials for <br className="hidden md:block" />
              <span className="italic font-light text-brand-gold">Exceptional Grades.</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              We are a dedicated lesson centre. We provide focused, intensive tutorials in all Science and Art subjects, ensuring every student masters the curriculum.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#contact" className="group bg-brand-dark text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-xl rounded-sm">
                Join Our Classes 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#courses" className="bg-transparent text-brand-dark border border-gray-300 px-8 py-4 text-sm uppercase tracking-wider font-medium hover:border-brand-dark transition-all flex items-center justify-center transform hover:-translate-y-1 hover:bg-gray-50 rounded-sm">
                View Subjects
              </a>
            </div>
          </div>

          {/* Image Layout */}
          <div className="relative group perspective-1000">
            <img 
              src="/images/hero_main.webp" 
              alt="Students studying in library" 
              className="aspect-[4/5] object-cover shadow-2xl relative z-10 rounded-sm transition-transform duration-700 group-hover:scale-[1.02]" 
            />
            
            {/* Offset decorative image */}
            <img 
              src="/images/hero_accent.webp" 
              alt="Academic books and pen" 
              className="hidden md:block absolute -bottom-12 -left-12 aspect-square w-64 object-cover border-8 border-[#faf9f6] shadow-2xl z-20 rounded-sm transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
