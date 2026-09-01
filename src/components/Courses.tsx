import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const courses = [
  {
    id: '01',
    title: 'Foundational Years',
    subtitle: 'Primary Education Support',
    description: 'Establishing strong roots in literacy, numeracy, and basic sciences. We build the crucial framework that supports a lifetime of academic inquiry.',
  },
  {
    id: '02',
    title: 'Advanced Studies',
    subtitle: 'Secondary School Coaching',
    description: 'Comprehensive subject mastery for Junior and Senior stages. We transition students from rote memorization to analytical problem-solving.',
  },
  {
    id: '03',
    title: 'Examination Excellence',
    subtitle: 'WAEC / NECO / JAMB',
    description: 'Intensive, strategy-focused preparation. Our targeted approach guarantees outstanding performance in high-stakes entrance and final exams.',
  },
];

const Courses: React.FC = () => {
  return (
    <section id="courses" className="py-32 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Our Academic <br/><span className="italic font-light text-brand-gold">Curriculum</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed mb-2">
            Tailored programs designed to meet students exactly where they are, and take them exactly where they need to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-gray-800">
          {courses.map((course) => (
            <div key={course.id} className="p-10 border-r border-b border-gray-800 group hover:bg-gray-800/50 transition-colors relative">
              <span className="text-brand-gold font-serif text-xl block mb-8">{course.id}</span>
              <h3 className="text-2xl font-bold mb-2 text-white">{course.title}</h3>
              <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-6">{course.subtitle}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {course.description}
              </p>
              
              <a href="#contact" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium text-white group-hover:text-brand-gold transition-colors">
                View Details <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Courses;
