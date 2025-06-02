import React from 'react';
import { useScrollBehavior } from '../../../shared/hooks/useScrollBehavior';
import logo from '../../../assets/logo.svg';

const Navigation = ({ isVisible, setActiveSection }) => {
  const { scrolled } = useScrollBehavior();

  // const navItems = ['Blog', 'About', 'Contact'];
  const navItems = [];

  return (
    <nav className='fixed top-0 left-0 right-0 z-40 p-6'>
      <div className={`mx-auto max-w-6xl transition-all duration-500 ${
        scrolled 
          ? 'mt-4 bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg' 
          : 'bg-transparent'
      }`} style={{ borderRadius: scrolled ? '100px' : '0px' }}>
        <div className='flex justify-between items-center px-8 py-4'>
          <div className={`text-2xl font-bold transition-all duration-500 ${
            scrolled ? 'text-black' : 'text-white'
          } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <img src={logo} alt='DGTLISM' className='w-[200px]' />
          </div>
          <div className={`flex space-x-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            {navItems.map((item, i) => (
              <button 
                key={item}
                className={`transition-colors duration-500  ${
                  scrolled 
                    ? 'text-gray-700 hover:text-black' 
                    : 'text-white hover:text-[#def846]'
                }`}
                onClick={() => setActiveSection(i)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 