
type TMorphingButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
};

const MorphingButton: React.FC<TMorphingButtonProps> = ({ 
  children, 
  variant = 'primary', 
  style = {}, 
  onClick,
  className = '' 
}) => {
  const baseClasses = 'morphing-btn group relative overflow-hidden';
  const variantClasses = variant === 'primary' ? 'morphing-btn-primary' : 'morphing-btn-secondary';

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style}
      onClick={onClick}
    >
      <svg className='morphing-border' viewBox='0 0 200 60' xmlns='http://www.w3.org/2000/svg'>
        <path className='border-path' d='M10,10 L190,10 L190,50 L10,50 Z' />
      </svg>
      <span className='btn-content'>
        {children}
        <span className='btn-arrow'>→</span>
      </span>
      <div className='morphing-bg'></div>
    </button>
  );
};

export default MorphingButton; 