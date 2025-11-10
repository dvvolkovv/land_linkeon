import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Assistants from './components/Assistants';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <HowItWorks />
      <Assistants />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
