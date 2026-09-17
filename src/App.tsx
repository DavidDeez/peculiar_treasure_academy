import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Courses from './components/Courses';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import HallOfFame from './components/HallOfFame';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CustomCursor from './components/CustomCursor';
import FloatingIcons from './components/FloatingIcons';
import StudentPortal from './components/StudentPortal';

function App() {
  const [showPortal, setShowPortal] = useState(() => window.location.hash === '#portal');

  useEffect(() => {
    const handleHashChange = () => {
      setShowPortal(window.location.hash === '#portal');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenPortal = () => {
    window.location.hash = 'portal';
  };

  const handleClosePortal = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  if (showPortal) {
    return (
      <div className="min-h-screen bg-[#faf9f6]">
        <CustomCursor />
        <FloatingIcons />
        <StudentPortal onBack={handleClosePortal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <CustomCursor />
      <FloatingIcons />
      <Navbar onOpenPortal={handleOpenPortal} />
      <main className="flex-grow">
        <Hero />
        <Countdown />
        <About />
        <Courses />
        <Features />
        <FAQ />
        <HallOfFame />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
