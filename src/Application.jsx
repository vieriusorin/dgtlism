import React, { useState, useEffect } from 'react';
import AnimatedCursor from './domains/ui/components/AnimatedCursor';
import BackgroundEffects from './domains/ui/components/BackgroundEffects';
import Navigation from './domains/navigation/components/Navigation';
import HeroSection from './domains/hero/components/HeroSection';
import BlogSection from './domains/blog/components/BlogSection';
import ContactSection from './domains/contact/components/ContactSection';
import { useIntersectionObserver } from './shared/hooks/useIntersectionObserver';
import './shared/styles/globals.css';

const Application = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const { visibleSections, addToRefs } = useIntersectionObserver();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden relative'>
      <AnimatedCursor isVisible={isVisible} />
      <BackgroundEffects />
      
      <Navigation 
        isVisible={isVisible} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <HeroSection isVisible={isVisible} />
      
      <BlogSection 
        visibleSections={visibleSections} 
        addToRefs={addToRefs} 
      />
      
      <ContactSection 
        visibleSections={visibleSections} 
        addToRefs={addToRefs} 
      />
    </div>
  );
};

export default Application; 