const BackgroundEffects = () => {
  return (
    <>
      {/* Background gradient */}
      <div className='fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20' />

      {/* Grid overlay */}
      <div className='fixed inset-0 opacity-10'>
        <div className='grid grid-cols-12 h-full'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className='border-r border-white/10' />
          ))}
        </div>
      </div>
    </>
  );
};

export default BackgroundEffects; 