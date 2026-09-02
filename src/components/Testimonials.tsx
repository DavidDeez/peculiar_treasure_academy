import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Before I came to Peculiar Treasure, Physics was a nightmare. The tutors here broke it down step by step. I ended up scoring an A1 in my WAEC and 290 in JAMB!",
    author: "Samuel O.",
    role: "Former Science Student (Now at UI)"
  },
  {
    id: 2,
    text: "The mentorship I received from Mr. Olukayode and Mrs. Salaman changed my mindset. It's not just about passing exams, it's about understanding the core concepts.",
    author: "Aisha T.",
    role: "Former Art Student"
  },
  {
    id: 3,
    text: "The conducive environment and the strict discipline here made it impossible to fail. If you are serious about your academics, this is the only lesson centre you need.",
    author: "David B.",
    role: "Former Commercial Student"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
            Hear from Our <span className="italic font-light text-brand-gold">Past Students.</span>
          </h2>
          <p className="text-gray-400 text-sm">Real stories from students who passed through our intensive programs.</p>
        </div>

        <div className="relative overflow-hidden w-full group">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div key={idx} className="w-[320px] md:w-[400px] shrink-0 mx-4 bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-sm relative hover:bg-white/10 transition-colors duration-300">
                <Quote className="text-brand-gold/30 h-12 w-12 absolute top-6 right-6 z-0" />
                <div className="relative z-10">
                  <p className="text-gray-300 italic mb-8 leading-relaxed text-sm whitespace-normal">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <h4 className="text-white font-bold font-serif">{testimonial.author}</h4>
                    <p className="text-brand-gold text-xs uppercase tracking-wider mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
