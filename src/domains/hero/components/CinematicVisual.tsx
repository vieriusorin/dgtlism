type TCinematicVisualProps = {
  isVisible: boolean;
};

const CinematicVisual: React.FC<TCinematicVisualProps> = ({ isVisible }) => {
  return (
    <div className={`relative transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
      <div className='relative w-full h-96 max-w-2xl mx-auto overflow-hidden'>
        {/* Film grain overlay */}
        <div className='absolute inset-0 bg-black/30 mix-blend-overlay z-10' 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
               animation: 'grain 0.8s steps(8) infinite'
             }} />
        
        {/* Cinematic bars */}
        <div className='absolute top-0 left-0 right-0 h-16 bg-black z-20' />
        <div className='absolute bottom-0 left-0 right-0 h-16 bg-black z-20' />
        
        {/* Scanning lines effect */}
        <div className='absolute inset-0 z-20'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent w-full'
              style={{
                top: `${15 + i * 12}%`,
                animation: `scan ${2 + i * 0.3}s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Holographic display */}
        <div className='absolute inset-16 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-400/30 z-10'
             style={{
               backdropFilter: 'blur(2px)',
               boxShadow: '0 0 50px rgba(34, 211, 238, 0.2), inset 0 0 50px rgba(34, 211, 238, 0.1)'
             }}>
          
          {/* Terminal-like text display */}
          <div className='p-6 font-mono text-sm text-cyan-400 h-full flex flex-col justify-center'>
            <div className='mb-4 opacity-70'>
              <span className='text-green-400'>$</span> initializing_portfolio.exe
            </div>
            <div className='mb-2'>
              <span className='text-yellow-400'>[LOADING]</span> Creative assets... ✓
            </div>
            <div className='mb-2'>
              <span className='text-yellow-400'>[LOADING]</span> Code repositories... ✓
            </div>
            <div className='mb-2'>
              <span className='text-yellow-400'>[LOADING]</span> Design systems... ✓
            </div>
            <div className='mb-4'>
              <span className='text-green-400'>[SUCCESS]</span> Portfolio ready
            </div>
            <div className='text-cyan-300 text-xl font-bold tracking-wider'>
              <span className='inline-block animate-pulse'>{'>'}</span> DGTLISM
            </div>
          </div>
        </div>

        {/* Floating data particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60'
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animation: `dataFloat ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        {/* Corner brackets */}
        <div className='absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50 z-30' />
        <div className='absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50 z-30' />
        <div className='absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50 z-30' />
        <div className='absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 z-30' />
      </div>
    </div>
  );
};

export default CinematicVisual; 