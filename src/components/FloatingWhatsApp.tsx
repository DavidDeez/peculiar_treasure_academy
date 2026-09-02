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
      <svg className="w-8 h-8 translate-x-[1px] -translate-y-[1px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.031 0C5.402 0 .016 5.385.016 12.016c0 2.115.553 4.18 1.603 5.992L.032 24l6.16-1.616c1.761 1 3.766 1.528 5.839 1.528 6.627 0 12.013-5.385 12.013-12.016C24.044 5.385 18.658 0 12.031 0zm-.016 21.905c-1.802 0-3.562-.485-5.11-1.403l-.367-.217-3.799.996.996-3.702-.238-.378a10.057 10.057 0 01-1.543-5.384c0-5.545 4.512-10.057 10.061-10.057 5.548 0 10.06 4.512 10.06 10.057 0 5.547-4.512 10.058-10.06 10.058zm5.518-7.53c-.302-.152-1.794-.886-2.07-.988-.276-.102-.477-.152-.678.152-.201.303-.781.988-.958 1.19-.176.202-.353.228-.654.076-1.526-.777-2.673-1.41-3.69-3.14-.202-.345.201-.318.647-.912.1-.152.05-.278 0-.43-.05-.151-.678-1.636-.928-2.241-.242-.587-.487-.507-.678-.517h-.578c-.201 0-.528.076-.804.38s-1.056 1.036-1.056 2.527 1.082 2.932 1.233 3.134c.15.203 2.137 3.262 5.176 4.57 2.05.88 2.89.967 3.966.814 1.157-.165 3.565-1.458 4.067-2.868.503-1.41.503-2.619.352-2.868-.15-.253-.552-.405-.853-.557z" clipRule="evenodd" />
      </svg>
      {/* Tooltip */}
      <span className="absolute right-16 bg-white text-brand-dark px-4 py-2 rounded shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Need help? Chat with us!
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
