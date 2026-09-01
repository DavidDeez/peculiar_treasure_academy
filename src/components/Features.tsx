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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
          
          {/* Box 1 */}
          <div className="md:col-span-8 bg-[#faf9f6] p-10 rounded-2xl flex flex-col justify-end relative overflow-hidden group">
            <img src="/images/study_hall.jpg" alt="Study Hall" className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Immersive Study Spaces</h3>
              <p className="text-gray-200 text-sm max-w-md">Quiet environments equipped with the resources needed for deep focus.</p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="md:col-span-4 bg-brand-dark p-10 rounded-2xl flex flex-col justify-center text-center">
            <div className="text-brand-gold text-5xl font-serif font-bold mb-4">98%</div>
            <h3 className="text-xl font-bold text-white mb-2">Exam Success Rate</h3>
            <p className="text-gray-400 text-sm">Consistent excellence across all major boards.</p>
          </div>

          {/* Box 3 */}
          <div className="md:col-span-4 bg-brand-gold p-10 rounded-2xl flex flex-col justify-center text-center">
            <h3 className="text-xl font-bold text-brand-dark mb-4">Elite Faculty</h3>
            <p className="text-brand-dark/80 text-sm leading-relaxed">
              Our educators are carefully selected experts with years of proven pedagogical success.
            </p>
          </div>

          {/* Box 4 */}
          <div className="md:col-span-8 bg-[#faf9f6] p-10 rounded-2xl flex flex-col justify-end relative overflow-hidden group">
            <img src="/images/mentorship.jpg" alt="Mentorship Session" className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2">Personalized Mentorship</h3>
              <p className="text-gray-200 text-sm max-w-md">Beyond teaching, we guide students through career choices, university prep, and personal development.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
