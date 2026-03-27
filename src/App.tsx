import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar onJoinClick={toggleModal} />
      <main>
        <Hero onJoinClick={toggleModal} />
        <Benefits />
        <HowItWorks />
        <CTA onJoinClick={toggleModal} />
      </main>
      <Footer onJoinClick={toggleModal} />
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;
