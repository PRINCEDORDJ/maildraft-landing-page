import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="min-h-screen">
      <Navbar onJoinClick={toggleModal} />
      <main>
        <Hero onJoinClick={toggleModal} />
        <Benefits />
        <HowItWorks />
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
