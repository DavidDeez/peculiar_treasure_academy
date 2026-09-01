import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24 bg-gray-50 flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Unlock Your Child's <span className="text-primary">True Potential</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
            Peculiar Treasure Academy offers premium tutoring, tailored learning plans, and an environment where every student shines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <a href="#courses" className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              Explore Courses <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#contact" className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
              Enroll Now
            </a>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="flex-1 w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-200 flex items-center justify-center border-4 border-white">
            {/* INSTRUCTION: Replace this div with an actual <img> tag when you have the picture */}
            <div className="text-center p-6">
              <div className="text-gray-400 mb-2">📸 Image Placeholder</div>
              <p className="text-sm text-gray-500">Insert hero image here (e.g., students studying, academy front)</p>
            </div>
            
            {/* Example image tag (commented out): */}
            {/* <img src="/hero-image.jpg" alt="Students learning" className="w-full h-full object-cover" /> */}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
