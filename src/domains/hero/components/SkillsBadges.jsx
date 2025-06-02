import React from 'react';
import { SKILLS_LIST, ANIMATION_DELAYS } from '../../../shared/constants/animations';

const SkillsBadges = ({ isVisible }) => {
  return (
    <div className={`flex flex-wrap gap-3 justify-center lg:justify-start transition-all duration-1000 delay-1100 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
      {SKILLS_LIST.map((skill, i) => (
        <div key={skill} className='overflow-hidden'>
          <div 
            className='skill-badge relative'
            style={{ 
              animation: isVisible ? `slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${ANIMATION_DELAYS.HERO_SKILLS + i * 0.1}s both` : 'none'
            }}
          >
            <span className='skill-content'>
              {skill}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsBadges; 