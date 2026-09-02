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
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2 group-hover:text-brand-gold transition-colors">Direct Line & WhatsApp</h4>
                <p className="text-brand-dark font-serif text-lg">0816 410 1457</p>
                <p className="text-brand-dark font-serif text-lg">0808 830 6825</p>
                <a 
                  href="https://wa.me/2348164101457" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm text-green-500 font-bold hover:text-green-600 hover:underline transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.031 0C5.402 0 .016 5.385.016 12.016c0 2.115.553 4.18 1.603 5.992L.032 24l6.16-1.616c1.761 1 3.766 1.528 5.839 1.528 6.627 0 12.013-5.385 12.013-12.016C24.044 5.385 18.658 0 12.031 0zm-.016 21.905c-1.802 0-3.562-.485-5.11-1.403l-.367-.217-3.799.996.996-3.702-.238-.378a10.057 10.057 0 01-1.543-5.384c0-5.545 4.512-10.057 10.061-10.057 5.548 0 10.06 4.512 10.06 10.057 0 5.547-4.512 10.058-10.06 10.058zm5.518-7.53c-.302-.152-1.794-.886-2.07-.988-.276-.102-.477-.152-.678.152-.201.303-.781.988-.958 1.19-.176.202-.353.228-.654.076-1.526-.777-2.673-1.41-3.69-3.14-.202-.345.201-.318.647-.912.1-.152.05-.278 0-.43-.05-.151-.678-1.636-.928-2.241-.242-.587-.487-.507-.678-.517h-.578c-.201 0-.528.076-.804.38s-1.056 1.036-1.056 2.527 1.082 2.932 1.233 3.134c.15.203 2.137 3.262 5.176 4.57 2.05.88 2.89.967 3.966.814 1.157-.165 3.565-1.458 4.067-2.868.503-1.41.503-2.619.352-2.868-.15-.253-.552-.405-.853-.557z" clipRule="evenodd" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Google Map Link wrapper */}
            <a 
              href="https://maps.app.goo.gl/DDcQXzp6EDwxW8Wo6" 
              target="_blank" 
              rel="noreferrer"
              className="block w-full h-64 bg-gray-200 rounded-sm overflow-hidden shadow-md group relative"
              title="Click to view exact location on Google Maps"
            >
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 z-10 transition-colors flex items-center justify-center">
                <span className="bg-white text-brand-dark px-4 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Open in Google Maps
                </span>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126601.27255106598!2d3.821360098522329!3d7.433246473138834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d77ee6ebf8b%3A0xc3f8319696ce22a4!2sOjoo%2C%20Ibadan%2C%20Oyo!5e0!3m2!1sen!2sng!4v1716912345678!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0, pointerEvents: 'none' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              ></iframe>
            </a>
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
