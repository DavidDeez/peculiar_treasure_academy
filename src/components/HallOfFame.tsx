import React, { useEffect, useState } from 'react';
import { Award, Star } from 'lucide-react';
import { sanityClient } from '../sanityClient';
import { motion } from 'framer-motion';

interface HallOfFameStudent {
  _id: string;
  exam: string;
  score: string;
  student: string;
  subject: string;
}

const defaultResults = [
  { _id: '1', exam: "JAMB UTME", score: "313", student: "Success Goodluck", subject: "Outstanding Performance" },
  { _id: '2', exam: "JAMB UTME", score: "306", student: "Seun Okunade", subject: "Excellent Performance" },
  { _id: '3', exam: "JAMB UTME", score: "301", student: "Femi Omidiwura", subject: "Excellent Performance" },
  { _id: '4', exam: "JAMB UTME", score: "275", student: "Seyi Okunade", subject: "Great Performance" },
  { _id: '5', exam: "WAEC 2023", score: "7 A1s", student: "Chidera N.", subject: "Science Department" },
  { _id: '6', exam: "NECO 2023", score: "8 Distinctions", student: "Daniel K.", subject: "Commercial Department" }
];

const cardVariants = {
  hidden: (i: number) => {
    // Generate a central origin point for the spreading animation
    const xOffset = i % 3 === 0 ? 150 : i % 3 === 2 ? -150 : 0;
    const yOffset = i < 3 ? 150 : -150;
    return {
      opacity: 0,
      scale: 0.3,
      x: xOffset,
      y: yOffset,
      rotate: i % 2 === 0 ? -25 : 25,
      zIndex: 10 - i
    };
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
    zIndex: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      delay: i * 0.1,
      mass: 0.8
    }
  })
};

const HallOfFame: React.FC = () => {
  const [results, setResults] = useState<HallOfFameStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const query = '*[_type == "hallOfFameStudent"] | order(_createdAt asc)';
        const data = await sanityClient.fetch(query);
        if (data && data.length > 0) {
          setResults(data);
        } else {
          setUseFallback(true);
        }
      } catch (error) {
        console.error("Failed to fetch Hall of Fame students:", error);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const displayResults = useFallback ? defaultResults : results;

  return (
    <section id="results" className="py-24 bg-white relative border-t border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-brand-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-brand-dark mb-4">
            The Hall of <span className="italic font-light text-brand-gold">Fame.</span>
          </h2>
          <p className="text-gray-600 text-lg">Consistent academic excellence. Our track record speaks for itself.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 perspective-1000"
          >
            {displayResults.length > 0 ? (
              displayResults.map((result, index) => (
                <motion.div 
                  key={result._id} 
                  custom={index}
                  variants={cardVariants}
                  className="bg-white border border-gray-100 p-6 md:p-8 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] md:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-shadow duration-300 relative overflow-hidden group origin-center"
                >
                  <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 p-2 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Star className="w-16 h-16 md:w-32 md:h-32 text-brand-dark fill-current" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] md:text-sm font-semibold text-brand-gold uppercase tracking-widest mb-1 md:mb-2">{result.exam}</p>
                    <h3 className="text-2xl md:text-4xl font-black text-brand-dark font-serif mb-2 md:mb-6 tracking-tight leading-tight">{result.score}</h3>
                    <div className="w-8 md:w-12 h-1 bg-brand-gold/20 mb-3 md:mb-6 group-hover:bg-brand-gold transition-colors"></div>
                    <p className="font-bold text-gray-800 text-sm md:text-lg">{result.student}</p>
                    <p className="text-[10px] md:text-sm text-gray-500 mt-0.5 md:mt-1 leading-tight">{result.subject}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No students found. Add some in the Sanity Dashboard!
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HallOfFame;

