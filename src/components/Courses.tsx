import React from 'react';
import { BookOpen, GraduationCap, PenTool } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Primary Education Support',
    description: 'Foundational coaching in Mathematics, English, and Basic Sciences to give younger children a strong start.',
    icon: <PenTool className="h-6 w-6" />,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 2,
    title: 'Secondary School Coaching',
    description: 'Comprehensive tutorials covering all major subjects for Junior and Senior Secondary school students.',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 3,
    title: 'Exam Preparation (WAEC/NECO/JAMB)',
    description: 'Intensive preparatory classes tailored to help students ace their final and entrance examinations with flying colors.',
    icon: <GraduationCap className="h-6 w-6" />,
    color: 'bg-purple-100 text-purple-600',
  },
];

const Courses: React.FC = () => {
  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Programs</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600">
            We offer a variety of programs designed to cater to different educational levels and needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${course.color} group-hover:scale-110 transition-transform`}>
                {course.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {course.description}
              </p>
              <a href="#contact" className="text-primary font-semibold hover:text-blue-800 flex items-center gap-1">
                Learn more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
