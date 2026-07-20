import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import InteractiveWidget from './components/InteractiveWidget';
import Science from './components/Science';
import Ingredients from './components/Ingredients';
import ImagesSection from './components/ImagesSection';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-midnight min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <InteractiveWidget />
        <Science />
        <Ingredients />
        <ImagesSection />
        <Benefits />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
