import Hero from './components/Hero';
import ForYou from './components/ForYou';
import ValueConnection from './components/ValueConnection';
import HowItWorks from './components/HowItWorks';
import ThreeServices from './components/ThreeServices';
import Advantages from './components/Advantages';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ForYou />
      <ValueConnection />
      <HowItWorks />
      <ThreeServices />
      <Advantages />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
