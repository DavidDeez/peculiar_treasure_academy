import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">About Peculiar Treasure Academy</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto rounded"></div>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We believe that every child is a unique treasure with immense potential. Our mission is to discover, nurture, and polish that potential into brilliance through dedicated teaching and a supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Mission */}
          <div className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To provide top-tier educational support that empowers students to achieve academic excellence and lifelong success.
            </p>
          </div>

          {/* Vision */}
          <div className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading lesson centre recognized for transforming ordinary learners into extraordinary achievers.
            </p>
          </div>

          {/* Values */}
          <div className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Core Values</h3>
            <p className="text-gray-600">
              Excellence, Integrity, Patience, and a continuous Commitment to our students' holistic growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
