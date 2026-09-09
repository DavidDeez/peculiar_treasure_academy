import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer preparation for international exams like IGCSE?",
    answer: "Yes. While our primary focus is on WAEC, NECO, and JAMB, we have specialized tutors equipped to prepare students for IGCSE and Cambridge A-Levels."
  },
  {
    question: "How do the Premium Home Lessons work?",
    answer: "For our exclusive home lessons, learning takes place directly at the Proprietor's residence. This guarantees an environment with zero distractions, maximizing the student's concentration and academic absorption."
  },
  {
    question: "What is your typical class size?",
    answer: "We intentionally keep our class sizes small to ensure personalized attention. Our typical tutorial groups range from 5 to 12 students, allowing tutors to identify and address individual learning gaps."
  },
  {
    question: "Can I register my child for only specific subjects?",
    answer: "Absolutely. While we offer comprehensive packages for science, art, and commercial students, parents can tailor the registration to focus only on the subjects where the child needs the most intervention."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-brand-dark">
            Frequently Asked <span className="italic font-light text-brand-gold">Questions.</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">Everything you need to know about Peculiar Treasure Academy.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-5 py-4 text-left flex justify-between items-center bg-[#faf9f6] hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-bold text-sm md:text-base text-brand-dark pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-brand-gold w-4 h-4 md:w-5 md:h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-4 pt-1 text-gray-600 text-xs md:text-sm leading-relaxed bg-[#faf9f6]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
