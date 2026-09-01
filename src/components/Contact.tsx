import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Take the <span className="italic font-light text-brand-gold">first step.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              We welcome inquiries from prospective students and parents. Reach out to schedule a consultation, tour our facilities, or discuss enrollment.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Location</h4>
                <p className="text-brand-dark font-serif text-lg">123 Education Boulevard<br />Academic District, City</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Direct Line</h4>
                <p className="text-brand-dark font-serif text-lg">+1 (234) 567-8900</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Email Inquiries</h4>
                <p className="text-brand-dark font-serif text-lg">admissions@peculiartreasure.edu</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 shadow-2xl rounded-tr-[80px]">
            <h3 className="font-serif text-2xl font-bold mb-8 text-brand-dark">Send an Inquiry</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-brand-gold bg-transparent transition-colors text-brand-dark"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-brand-gold bg-transparent transition-colors text-brand-dark"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Your Message</label>
                <textarea
                  rows={3}
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-brand-gold bg-transparent transition-colors text-brand-dark resize-none"
                  placeholder="How can we assist you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 mt-8"
              >
                Submit Inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
