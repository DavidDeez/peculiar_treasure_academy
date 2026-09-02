import React from 'react';
import { Award, Star } from 'lucide-react';

const results = [
  { exam: "JAMB 2023", score: "315", student: "Oluwaseun A.", subject: "Admitted: Medicine & Surgery" },
  { exam: "WAEC 2023", score: "7 A1s", student: "Chidera N.", subject: "Science Department" },
  { exam: "JAMB 2022", score: "298", student: "Aisha M.", subject: "Admitted: Law" },
  { exam: "NECO 2023", score: "8 Distinctions", student: "Daniel K.", subject: "Commercial Department" }
];

const HallOfFame: React.FC = () => {
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

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {results.map((result, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-4 md:p-8 rounded-xl shadow-[0_4px_15px_rgb(0,0,0,0.02)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 p-2 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Star className="w-16 h-16 md:w-32 md:h-32 text-brand-dark fill-current" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] md:text-sm font-semibold text-brand-gold uppercase tracking-widest mb-1 md:mb-2">{result.exam}</p>
                <h3 className="text-2xl md:text-5xl font-black text-brand-dark font-serif mb-2 md:mb-6 tracking-tight">{result.score}</h3>
                <div className="w-8 md:w-12 h-1 bg-brand-gold/20 mb-3 md:mb-6 group-hover:bg-brand-gold transition-colors"></div>
                <p className="font-bold text-gray-800 text-xs md:text-lg">{result.student}</p>
                <p className="text-[10px] md:text-sm text-gray-500 mt-0.5 md:mt-1 leading-tight">{result.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HallOfFame;
