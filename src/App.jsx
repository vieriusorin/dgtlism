import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from './shared/hooks/useIntersectionObserver';
import { SecurityProvider } from './shared/contexts/SecurityContext';
import Navigation from './domains/navigation/components/Navigation';
import HeroSection from './domains/hero/components/HeroSection';
import BlogSection from './domains/blog/components/BlogSection';
import ContactSection from './domains/contact/components/ContactSection';
import './shared/styles/globals.css';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { visibleSections, addToRefs } = useIntersectionObserver();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SecurityProvider>
      <div className='min-h-screen bg-black text-white overflow-x-hidden'>
        <Navigation 
          isVisible={isVisible} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />
        
        <main>
          <HeroSection isVisible={isVisible} />
          <BlogSection visibleSections={visibleSections} addToRefs={addToRefs} />
          <ContactSection visibleSections={visibleSections} addToRefs={addToRefs} />
        </main>
      </div>
    </SecurityProvider>
  );
};

export default App; 