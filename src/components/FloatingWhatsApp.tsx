import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  const phoneNumber = "2348164101457";
  const message = encodeURIComponent("Hello Peculiar Treasure Academy, I'd like to inquire about admissions for the upcoming term.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_2px_2px_rgba(255,255,255,0.2)] border border-gray-800 hover:from-gray-600 hover:to-gray-800 hover:scale-110 transition-all duration-300 animate-bounce group"
      aria-label="Chat with us on WhatsApp"
    >
      <img 
        src="/images/whatsapp_3d.png" 
        alt="WhatsApp" 
        className="w-12 h-12 object-contain invert drop-shadow-md transition-transform duration-300"
      />
      {/* Tooltip */}
      <span className="absolute right-16 bg-white text-brand-dark px-4 py-2 rounded shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Need help? Chat with us!
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
