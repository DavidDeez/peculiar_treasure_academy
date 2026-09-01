import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const courses = [
  {
    id: '01',
    title: 'Core Subjects',
    subtitle: 'English & Mathematics',
    description: 'The foundation of all academic success. We provide intensive drilling in English language, essay writing, and mathematical problem-solving to ensure students never struggle with the basics.',
  },
  {
    id: '02',
    title: 'Science Department',
    subtitle: 'Physics, Chemistry, Biology',
    description: 'Practical, theory, and calculation-based tutorials for all major science subjects. We break down complex formulas and scientific principles into easy-to-grasp concepts.',
  },
  {
    id: '03',
    title: 'Arts & Commercial',
    subtitle: 'Literature, Govt, Economics',
    description: 'In-depth analysis of literary texts, comprehensive coverage of government structures, and mastery of economic and accounting principles.',
  },
];

const Courses: React.FC = () => {
  return (
    <section id="courses" className="py-32 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold mb-4 text-sm font-medium tracking-wide">
              Aligned with NERDC Curriculum
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Subjects We <br/><span className="italic font-light text-brand-gold">Teach.</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-2">
            Comprehensive lesson plans covering the entire NERDC secondary school curriculum, specifically tailored to help students ace WAEC, NECO, and JAMB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-800">
          {courses.map((course) => (
            <div key={course.id} className="p-10 border-r border-b border-gray-800 group hover:bg-gray-800/80 transition-all duration-300 relative overflow-hidden">
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-brand-gold/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              
              <div className="relative z-10">
                <span className="text-brand-gold font-serif text-xl block mb-8 transition-transform duration-300 group-hover:-translate-y-2">{course.id}</span>
                <h3 className="text-2xl font-bold mb-2 text-white">{course.title}</h3>
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6">{course.subtitle}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {course.description}
                </p>
                
                <a href="#contact" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium text-white group-hover:text-brand-gold transition-colors">
                  Enroll Now <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Courses;
