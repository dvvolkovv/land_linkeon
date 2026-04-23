import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Assistants from './components/sections/Assistants';
import Dozvon from './components/sections/Dozvon';
import Profile from './components/sections/Profile';
import Networking from './components/sections/Networking';
import ContentEngine from './components/sections/ContentEngine';
import HowItWorks from './components/sections/HowItWorks';
import UseCases from './components/sections/UseCases';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Assistants />
        <Dozvon />
        <Profile />
        <Networking />
        <ContentEngine />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
