import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Overview from './components/Overview';
import MissionVision from './components/MissionVision';
import Services from './components/Services';
import Industries from './components/Industries';
import WhyChooseUs from './components/WhyChooseUs';
import HowWeWork from './components/HowWeWork';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenContactModal = () => setIsContactModalOpen(true);
  const handleCloseContactModal = () => setIsContactModalOpen(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffffff' }}>
      
      {/* Sticky Navigation Header */}
      <Header onOpenContactModal={handleOpenContactModal} />

      {/* Main Website Sections */}
      <main style={{ flex: 1 }}>
        <Hero onOpenContactModal={handleOpenContactModal} />
        <Overview onOpenContactModal={handleOpenContactModal} />
        <MissionVision onOpenContactModal={handleOpenContactModal} />
        <Services onOpenContactModal={handleOpenContactModal} />
        <Industries onOpenContactModal={handleOpenContactModal} />
        <WhyChooseUs onOpenContactModal={handleOpenContactModal} />
        <HowWeWork />
        <Testimonials />
      </main>

      {/* Footer & Location Details */}
      <Footer onOpenContactModal={handleOpenContactModal} />

      {/* Direct Hiring Inquiry Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />

    </div>
  );
}
