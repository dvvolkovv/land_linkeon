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
      </main>
      <Footer />
    </div>
  );
}

export default App;
