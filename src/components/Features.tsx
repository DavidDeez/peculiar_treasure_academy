import React from 'react';
import { Users, Clock, Lightbulb, CheckCircle2 } from 'lucide-react';

const features = [
  {
    name: 'Experienced Tutors',
    description: 'Our teachers are highly qualified professionals passionate about student success.',
    icon: <Users className="h-6 w-6" />,
  },
  {
    name: 'Conducive Environment',
    description: 'We provide a safe, quiet, and well-equipped space designed for optimal learning.',
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    name: 'Flexible Timing',
    description: 'Classes are scheduled at convenient times to accommodate regular school hours.',
    icon: <Clock className="h-6 w-6" />,
  },
  {
    name: 'Proven Results',
    description: 'A strong track record of students dramatically improving their grades and passing major exams.',
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Why Choose Peculiar Treasure?</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We go beyond standard teaching. We mentor, guide, and inspire our students to be the best versions of themselves. Here is what sets us apart from the rest.
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-200 border-4 border-white flex items-center justify-center">
              {/* INSTRUCTION: Replace this with a real image */}
              <div className="text-center p-6">
                <div className="text-gray-400 mb-2">📸 Image Placeholder</div>
                <p className="text-sm text-gray-500">Insert classroom/teaching image here</p>
              </div>
            </div>
          </div>

          <div>
            <dl className="space-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-xl font-bold text-gray-900 mb-2">
                    <div className="absolute left-0 top-0 flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 text-primary border border-blue-100">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Features;
