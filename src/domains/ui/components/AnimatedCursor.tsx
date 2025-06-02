import { useMousePosition } from '../../../shared/hooks/useMousePosition';

const AnimatedCursor = ({ isVisible }: { isVisible: boolean }) => {
  const mousePosition = useMousePosition();

  return (
    <div 
      className='fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ease-out'
      style={{
        left: mousePosition.x - 12,
        top: mousePosition.y - 12,
        transform: `scale(${isVisible ? 1 : 0})`
      }}
    />
  );
};

export default AnimatedCursor; 