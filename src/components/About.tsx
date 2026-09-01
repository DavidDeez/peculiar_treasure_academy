import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Every student possesses a <span className="italic font-light text-brand-gold">unique brilliance.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded on the belief that traditional schooling often leaves potential untapped, Peculiar Treasure Academy exists to bridge the gap. We don't just teach subjects; we teach students how to think critically, approach problems creatively, and develop a genuine love for learning.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our approach is holistic. We combine rigorous academic standards with a deeply supportive environment, ensuring that when our students face their final examinations, they do so with absolute confidence and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-[#faf9f6] p-8 border-t-4 border-brand-dark">
              <h3 className="font-serif text-2xl font-bold mb-4">Academic Rigor</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A curriculum designed to challenge, push boundaries, and prepare students for the highest levels of global education.
              </p>
            </div>
            <div className="bg-[#faf9f6] p-8 border-t-4 border-brand-gold mt-0 sm:mt-12">
              <h3 className="font-serif text-2xl font-bold mb-4">Dedicated Mentorship</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Small group sizes ensure that no student is left behind, with personalized guidance from industry-leading educators.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
