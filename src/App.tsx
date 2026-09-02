import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Courses from './components/Courses';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import HallOfFame from './components/HallOfFame';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Countdown />
        <About />
        <Courses />
        <Features />
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
