import React from 'react';
import { BLOG_POSTS } from '../../../shared/constants/animations';
import MorphingButton from '../../ui/components/MorphingButton';

type TBlogSectionProps = {
  visibleSections: Set<number>;
  addToRefs: (el: HTMLElement | null, index: number) => void;
};

const BlogSection: React.FC<TBlogSectionProps> = ({ visibleSections, addToRefs }) => {
  return (
    <section className='py-24 px-6 relative' data-section='1' ref={(el) => addToRefs(el, 1)}>
      <div className='max-w-4xl mx-auto text-center'>

        <div className='absolute inset-0 opacity-5'>
          <div className='grid grid-cols-6 h-full gap-px'>
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className='bg-white/10' />
            ))}
          </div>
        </div>

        <div className='relative z-10 space-y-12'>
          <div className='space-y-6'>
            <div className='overflow-hidden'>
              <span 
                className='inline-block font-mono text-sm tracking-widest text-[#def846]'
                style={{
                  animation: visibleSections.has(1) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both' : 'none'
                }}
              >
                DIGITAL INSIGHTS
              </span>
            </div>
            <div className='overflow-hidden'>
              <h2 
                className='text-4xl lg:text-5xl font-bold leading-tight'
                style={{
                  animation: visibleSections.has(1) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both' : 'none'
                }}
              >
                Thoughts on{' '}
                <span className='text-[#def846] bg-clip-text'>
                  Technology
                </span>{' '}
                & Design
              </h2>
            </div>
            <div className='overflow-hidden'>
              <p 
                className='text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto'
                style={{
                  animation: visibleSections.has(1) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both' : 'none'
                }}
              >
                Dive into the latest trends in web development, design thinking, and digital innovation. 
                I share insights from real projects, emerging technologies, and the creative process behind modern digital experiences.
              </p>
            </div>
          </div>

          {/* Blog highlights */}
          <div className='space-y-4 max-w-2xl mx-auto'>
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className='overflow-hidden'>
                <div 
                  className='flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors duration-300 cursor-pointer group'
                  style={{
                    animation: visibleSections.has(1) ? `slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.8 + i * 0.1}s both` : 'none'
                  }}
                >
                  <div>
                    <h3 className='font-medium group-hover:text-cyan-400 transition-colors duration-300'>{post.title}</h3>
                  </div>
                  <span className='text-white group-hover:translate-x-1 transition-transform duration-300'>→</span>
                </div>
              </div>
            ))}
          </div>

          <div className='overflow-hidden'>
            <MorphingButton
            className='mx-auto'
              variant='primary'
              style={{
                animation: visibleSections.has(1) ? 'slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s both' : 'none'
              }}
            >
              Read All Posts
            </MorphingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 