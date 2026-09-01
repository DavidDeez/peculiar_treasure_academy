import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome from Proprietor */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group overflow-hidden rounded-sm shadow-xl">
            <img 
              src="/images/mrs_salaman.jpg" 
              alt="Mrs. Salaman, Proprietor" 
              className="w-full h-auto aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark to-transparent p-8 pt-20">
              <h3 className="text-white text-2xl font-serif font-bold">Mrs. Salaman</h3>
              <p className="text-brand-gold text-sm tracking-widest uppercase font-medium">Proprietor</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-brand-dark">
              A Message from <br/><span className="italic font-light text-brand-gold">Our Proprietor.</span>
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-6 leading-relaxed">
                "Welcome to Peculiar Treasure Academy. When I started this lesson centre, my goal was simple: to create a space where students who might be struggling in their regular schools could find clarity, confidence, and ultimately, success."
              </p>
              <p className="mb-6 leading-relaxed">
                "We are not a traditional school. We are a supplementary academic incubator. Whether your child needs help mastering complex Physics equations, understanding Literature, or just solidifying their English and Mathematics foundation, we have the specialized tutors and the conducive environment to make it happen."
              </p>
              <p className="font-serif text-xl text-brand-dark italic mt-8 border-l-4 border-brand-gold pl-6">
                "Every child is a peculiar treasure. Sometimes, they just need the right polishing to shine."
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-brand-dark">
              Our Academic <span className="italic font-light text-brand-gold">Philosophy.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our approach is targeted. Because we are a dedicated lesson centre, our tutors focus entirely on bridging knowledge gaps and preparing students for competitive examinations without the distractions of a full-time school day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-[#faf9f6] p-8 border-t-4 border-brand-dark transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg rounded-sm">
              <h3 className="font-serif text-2xl font-bold mb-4 text-brand-dark">Focused Tutorials</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Concentrated lessons designed to tackle difficult topics and simplify them for easy understanding.
              </p>
            </div>
            <div className="bg-[#faf9f6] p-8 border-t-4 border-brand-gold mt-0 sm:mt-12 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg rounded-sm">
              <h3 className="font-serif text-2xl font-bold mb-4 text-brand-dark">Exam Readiness</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Past question drilling, time management strategies, and intensive prep for WAEC, NECO, and JAMB.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
