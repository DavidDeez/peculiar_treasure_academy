import React from 'react';
import { Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

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
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-4">
            Hear from Our <span className="italic font-light text-brand-gold">Past Students.</span>
          </h2>
          <p className="text-gray-400 text-sm">Real stories from students who passed through our intensive programs.</p>
        </motion.div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-8 py-4">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, rotateY: 90, scale: 0.8, z: -100 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 70, 
                  damping: 15, 
                  delay: idx * 0.2,
                  mass: 1.2
                }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50, transition: { duration: 0.3 } }}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8 perspective-1000"
              >
                <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm relative transition-all duration-300 h-full shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                  <Quote className="text-brand-gold/30 h-12 w-12 absolute top-6 right-6 z-0" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <p className="text-gray-300 italic mb-8 leading-relaxed text-sm whitespace-normal">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <h4 className="text-white font-bold font-serif">{testimonial.author}</h4>
                      <p className="text-brand-gold text-xs uppercase tracking-wider mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
