import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  // Typewriter variants
  const sentence = "Exceptional Grades.";
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08
      }
    }
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#faf9f6] overflow-hidden min-h-screen flex items-center">
      {/* Decorative background accent */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold-light/30 rounded-bl-[100px] -z-10" 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold mb-8 text-sm font-medium tracking-wide hover:bg-brand-gold/20 transition-colors cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
              Enrolling for New Batches
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-brand-dark">
              Dedicated Tutorials for <br className="hidden md:block" />
              <motion.span 
                className="italic font-light text-brand-gold inline-flex overflow-hidden"
                variants={sentenceVariants}
                initial="hidden"
                animate="visible"
              >
                {sentence.split('').map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              We are a dedicated lesson centre. We provide focused, intensive tutorials in all Science and Art subjects, ensuring every student masters the curriculum.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <a href="#contact" className="group bg-brand-dark text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-xl rounded-sm">
                Join Our Classes 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#courses" className="bg-transparent text-brand-dark border border-gray-300 px-8 py-4 text-sm uppercase tracking-wider font-medium hover:border-brand-dark transition-all flex items-center justify-center transform hover:-translate-y-1 hover:bg-gray-50 rounded-sm">
                View Subjects
              </a>
            </motion.div>
          </motion.div>

          {/* Image Layout with Parallax */}
          <div className="relative group perspective-1000 mt-10 lg:mt-0">
            <motion.img 
              src="/images/hero_main.webp" 
              alt="Students studying in library" 
              className="aspect-[4/5] object-cover shadow-2xl relative z-10 rounded-sm transition-transform duration-700 group-hover:scale-[1.02]" 
              style={{ y: y1 }}
            />
            
            {/* Offset decorative image */}
            <motion.img 
              src="/images/hero_accent.webp" 
              alt="Academic books and pen" 
              className="hidden xl:block absolute -bottom-12 -left-12 aspect-square w-64 object-cover border-8 border-[#faf9f6] shadow-2xl z-20 rounded-sm transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4" 
              style={{ y: y2 }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
