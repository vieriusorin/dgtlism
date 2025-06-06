import React from 'react';
import MorphingButton from '../../ui/components/MorphingButton';

type TContactSectionProps = {
  visibleSections: Set<number>;
  addToRefs: (el: HTMLElement | null, index: number) => void;
};

const ContactSection: React.FC<TContactSectionProps> = ({ visibleSections, addToRefs }) => {
  return (
    <section className='py-24 px-6 text-center' data-section='2' ref={(el) => addToRefs(el, 2)}>
      <div className='max-w-3xl mx-auto'>
        <div className='overflow-hidden'>
          <h2 
            className='text-5xl lg:text-6xl font-bold mb-8'
            style={{
              animation: visibleSections.has(2) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both' : 'none'
            }}
          >
            Let's Create Something{' '}
            <span className='text-[#def846] bg-clip-text'>
              Amazing
            </span>
          </h2>
        </div>
        <div className='overflow-hidden'>
          <p 
            className='text-gray-400 text-lg mb-12 max-w-2xl mx-auto'
            style={{
              animation: visibleSections.has(2) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both' : 'none'
            }}
          >
            Got an idea worth bringing to life? I’m open to freelance collaborations and full-time roles — let’s create something extraordinary together.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <div className='overflow-hidden'>
            <MorphingButton 
              variant='primary'
              style={{
                animation: visibleSections.has(2) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both' : 'none'
              }}
            >
              Start a Project
            </MorphingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 