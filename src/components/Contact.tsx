import React from 'react';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-brand-dark">
              Register <span className="italic font-light text-brand-gold">today.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Whether you need extra help in Sciences, Arts, or core subjects, our doors are open. Visit our lesson centre or send us a message below.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="group cursor-pointer">
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 group-hover:text-brand-gold transition-colors">Location</h4>
                <p className="text-brand-dark font-serif text-lg">Jubilee Villa, Gospel Town<br />Ojoo, Ibadan, Nigeria</p>
              </div>
              <div className="group cursor-pointer">
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 group-hover:text-brand-gold transition-colors">Direct Line</h4>
                <p className="text-brand-dark font-serif text-lg">+234 (0) 800 000 0000</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 bg-gray-200 rounded-sm overflow-hidden shadow-md group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126601.27255106598!2d3.821360098522329!3d7.433246473138834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d77ee6ebf8b%3A0xc3f8319696ce22a4!2sOjoo%2C%20Ibadan%2C%20Oyo!5e0!3m2!1sen!2sng!4v1716912345678!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                title="Google Maps Location of Ojoo, Ibadan"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-10 shadow-2xl rounded-tr-[80px] transform transition-transform duration-500 hover:-translate-y-2">
            <h3 className="font-serif text-2xl font-bold mb-8 text-brand-dark">Send an Inquiry</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 group-focus-within:text-brand-gold transition-colors">Full Name</label>
                <input
                  type="text"
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-brand-gold bg-transparent transition-colors text-brand-dark"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 group-focus-within:text-brand-gold transition-colors">Email Address</label>
                <input
                  type="email"
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-brand-gold bg-transparent transition-colors text-brand-dark"
                  placeholder="Enter your email"
                />
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 group-focus-within:text-brand-gold transition-colors">Your Message</label>
                <textarea
                  rows={4}
                  className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-brand-gold bg-transparent transition-colors text-brand-dark resize-none"
                  placeholder="Which subjects do you need help with?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark text-white px-8 py-4 text-sm uppercase tracking-wider font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 mt-8 transform hover:scale-[1.02]"
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
