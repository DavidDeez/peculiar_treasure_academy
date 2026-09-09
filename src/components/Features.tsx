import React from 'react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The <span className="italic font-light text-brand-gold">Peculiar</span> Experience
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            An environment meticulously crafted for academic immersion and personal growth.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[250px]">
          
          {/* Box 1: Study Spaces (with Mobile Overlays) */}
          <div className="col-span-2 md:col-span-8 bg-[#faf9f6] p-6 md:p-10 rounded-2xl flex flex-col justify-end relative overflow-hidden group min-h-[200px] md:min-h-0">
            <img src="/images/study_hall.webp" alt="Study Hall" className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 z-10" />
            
            {/* Mobile Decorative Stats Overlay */}
            <div className="absolute top-4 right-4 z-20 flex md:hidden flex-col gap-2 items-end">
              <div className="bg-brand-dark/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-brand-gold/40 shadow-xl flex items-center gap-2">
                <span className="text-brand-gold font-serif font-bold text-lg leading-none">98%</span>
                <span className="text-white text-[9px] uppercase tracking-widest font-medium leading-none">Success<br/>Rate</span>
              </div>
              <div className="bg-brand-gold/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20 shadow-xl">
                <span className="text-brand-dark font-bold text-[10px] uppercase tracking-widest">Elite Faculty</span>
              </div>
            </div>

            <div className="relative z-20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 drop-shadow-md">Immersive Study Spaces</h3>
              <p className="text-gray-200 text-xs md:text-sm max-w-md drop-shadow-md">Quiet environments equipped with the resources needed for deep focus.</p>
            </div>
          </div>

          {/* Box 2 (Desktop Only) */}
          <div className="hidden md:flex md:col-span-4 bg-brand-dark p-10 rounded-2xl flex-col justify-center text-center">
            <div className="text-brand-gold text-5xl font-serif font-bold mb-4">98%</div>
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">Exam Success</h3>
            <p className="text-gray-400 text-sm">Consistent excellence across all major boards.</p>
          </div>

          {/* Box 3 (Desktop Only) */}
          <div className="hidden md:flex md:col-span-4 bg-brand-gold p-10 rounded-2xl flex-col justify-center text-center">
            <h3 className="text-xl font-bold text-brand-dark mb-4 leading-tight">Elite Faculty</h3>
            <p className="text-brand-dark/80 text-sm leading-relaxed">
              Our educators are carefully selected experts with years of proven pedagogical success.
            </p>
          </div>

          {/* Box 4 */}
          <div className="col-span-2 md:col-span-8 bg-[#faf9f6] p-6 md:p-10 rounded-2xl flex flex-col justify-end relative overflow-hidden group">
            <img src="/images/mentorship.webp" alt="Mentorship Session" className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="relative z-20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">Personalized Mentorship</h3>
              <p className="text-gray-200 text-xs md:text-sm max-w-md">Beyond teaching, we guide students through career choices, university prep, and personal development.</p>
            </div>
          </div>

          {/* Box 5: Schedule */}
          <div className="col-span-2 md:col-span-6 bg-brand-dark p-6 md:p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-bold text-brand-gold mb-4 border-b border-gray-800 pb-3">Our Schedule</h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-400 uppercase tracking-widest font-bold">Mon - Thu</span>
                <span className="text-white font-serif">9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-400 uppercase tracking-widest font-bold">Fridays</span>
                <span className="text-white font-serif">3:00 PM - 6:00 PM</span>
              </li>
              <li className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-gray-400 uppercase tracking-widest font-bold">Saturdays</span>
                <span className="text-white font-serif">9:00 AM - 1:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Box 6: Home Lessons */}
          <div className="col-span-2 md:col-span-6 bg-gradient-to-br from-brand-dark to-[#1a1c23] border border-gray-800 p-6 md:p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden group hover:border-brand-gold/50 transition-colors">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl transition-all group-hover:bg-brand-gold/20"></div>
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse shrink-0"></span>
                Premium Home Lessons
              </h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 max-w-sm">
                Top tutors deployed directly to your residence for maximum concentration and zero distractions.
              </p>
              <a href="#contact" className="inline-flex items-center text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                Request Tutor &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
