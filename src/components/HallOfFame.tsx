import React, { useEffect, useState } from 'react';
import { Award, Star } from 'lucide-react';
import { sanityClient } from '../sanityClient';

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
  { _id: '4', exam: "JAMB UTME", score: "275", student: "Seyi Okunade", subject: "Great Performance" }
];

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
    <section id="results" className="py-24 bg-white relative border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-brand-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-brand-dark mb-4">
            The Hall of <span className="italic font-light text-brand-gold">Fame.</span>
          </h2>
          <p className="text-gray-600 text-lg">Consistent academic excellence. Our track record speaks for itself.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {displayResults.length > 0 ? (
              displayResults.map((result) => (
                <div key={result._id} className="bg-white border border-gray-100 p-4 md:p-8 rounded-xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 p-2 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Star className="w-16 h-16 md:w-32 md:h-32 text-brand-dark fill-current" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] md:text-sm font-semibold text-brand-gold uppercase tracking-widest mb-1 md:mb-2">{result.exam}</p>
                    <h3 className="text-xl md:text-3xl font-black text-brand-dark font-serif mb-2 md:mb-6 tracking-tight leading-tight">{result.score}</h3>
                    <div className="w-8 md:w-12 h-1 bg-brand-gold/20 mb-3 md:mb-6 group-hover:bg-brand-gold transition-colors"></div>
                    <p className="font-bold text-gray-800 text-xs md:text-lg">{result.student}</p>
                    <p className="text-[10px] md:text-sm text-gray-500 mt-0.5 md:mt-1 leading-tight">{result.subject}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No students found. Add some in the Sanity Dashboard!
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HallOfFame;
