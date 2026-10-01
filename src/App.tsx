import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Cartoon from './components/sections/Cartoon';
import PersonaCTA from './components/sections/PersonaCTA';
import Problem from './components/sections/Problem';
import Agentic from './components/sections/Agentic';
import Assistants from './components/sections/Assistants';
import Profile from './components/sections/Profile';
import Networking from './components/sections/Networking';
import ContentEngine from './components/sections/ContentEngine';
import HowItWorks from './components/sections/HowItWorks';
import UseCases from './components/sections/UseCases';
import Features from './components/sections/Features';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';
import LanguageBanner from './components/ui/LanguageBanner';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Cartoon />
        <PersonaCTA />
        <Problem />
        <Agentic />
        <Assistants />
        <Profile />
        <Networking />
        <ContentEngine />
        <HowItWorks />
        <UseCases />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <LanguageBanner />
    </div>
  );
}

export default App;
