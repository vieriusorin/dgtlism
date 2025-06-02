import { ANIMATION_DELAYS } from "../../../shared/constants/animations";
import CinematicVisual from "./CinematicVisual";
import SkillsBadges from "./SkillsBadges";
import MorphingButton from "../../ui/components/MorphingButton";

type THeroSectionProps = {};

const HeroSection: React.FC<THeroSectionProps> = () => {
	return (
		<section className='min-h-screen flex items-center justify-center relative px-6 pt-24 overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none'>
				<svg
					className='absolute w-full h-full'
					viewBox='0 0 1200 800'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M800,0 Q1000,100 1200,200'
						fill='none'
						stroke='rgba(255, 255, 255, 0.12)'
						strokeWidth='1'
					/>
					<path
						d='M600,50 Q850,120 1200,180'
						fill='none'
						stroke='rgba(255, 255, 255, 0.08)'
						strokeWidth='1'
					/>
					<path
						d='M900,200 Q1100,300 1200,450'
						fill='none'
						stroke='rgba(255, 255, 255, 0.10)'
						strokeWidth='1'
					/>
					<path
						d='M400,300 Q700,250 1200,320'
						fill='none'
						stroke='rgba(255, 255, 255, 0.09)'
						strokeWidth='1'
					/>
					<path
						d='M500,400 Q800,380 1200,420'
						fill='none'
						stroke='rgba(255, 255, 255, 0.11)'
						strokeWidth='1'
					/>
					<path
						d='M700,500 Q950,550 1200,600'
						fill='none'
						stroke='rgba(255, 255, 255, 0.08)'
						strokeWidth='1'
					/>
					<path
						d='M600,600 Q900,580 1200,650'
						fill='none'
						stroke='rgba(255, 255, 255, 0.07)'
						strokeWidth='1'
					/>
					<path
						d='M800,700 Q1000,720 1200,750'
						fill='none'
						stroke='rgba(255, 255, 255, 0.06)'
						strokeWidth='1'
					/>
					<path
						d='M1000,100 Q1050,300 1100,500 Q1120,600 1150,700'
						fill='none'
						stroke='rgba(255, 255, 255, 0.09)'
						strokeWidth='1'
					/>
					<path
						d='M850,150 Q1000,200 950,350 Q900,500 1050,600'
						fill='none'
						stroke='rgba(255, 255, 255, 0.08)'
						strokeWidth='1'
					/>
					<path
						d='M400,250 Q650,200 900,240'
						fill='none'
						stroke='rgba(222, 248, 70, 0.12)'
						strokeWidth='1.5'
					/>
					<path
						d='M300,450 Q600,400 800,430'
						fill='none'
						stroke='rgba(222, 248, 70, 0.08)'
						strokeWidth='1'
					/>
				</svg>
			</div>

			<div className='max-w-9xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-items-center relative z-10'>
				<div className='space-y-10 text-center lg:text-left'>
					<div className='transition-all duration-1000 delay-500 translate-x-0 opacity-100'>
						<h1 className='text-5xl lg:text-7xl xl:text-5xl font-bold leading-tight overflow-hidden'>
							<div className='relative'>
								<span className='block overflow-hidden'>
									<span
										className='inline-block'
										style={{
											animation:
												"slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both",
										}}
									>
										Design your
									</span>
								</span>
								<span className='block overflow-hidden'>
									<span
										className='inline-block'
										style={{
											color: "#def846",
											animation:
												"slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both",
										}}
									>
										future.
									</span>
								</span>
								<span className='block overflow-hidden'>
									<span
										className='inline-block'
										style={{
											animation:
												"slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both",
										}}
									>
										One pixel at a time
									</span>
								</span>
							</div>
						</h1>
					</div>

					<div className='transition-all duration-1000 delay-700 translate-x-0 opacity-100'>
						<div className='overflow-hidden'>
							<p
								className='text-gray-400 text-lg max-w-md font-light leading-relaxed mx-auto lg:mx-0'
								style={{
									animation:
										"slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s both",
								}}
							>
								I craft modern web applications that blend beautiful design with
								powerful functionality. Currently building the future of digital
								experiences.
							</p>
						</div>
					</div>

					<div className='flex justify-center lg:justify-start transition-all duration-1000 delay-900 translate-x-0 opacity-100'>
						<div className='overflow-hidden'>
							<MorphingButton
								variant='secondary'
								style={{
									animation:
										"slideInFromTop 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.0s both",
								}}
							>
								Get In Touch
							</MorphingButton>
						</div>
					</div>

					<SkillsBadges />
				</div>
				<CinematicVisual />
			</div>

			<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1300 translate-y-0 opacity-100'>
				<div className='flex flex-col items-center space-y-2'>
					<span className='text-xs font-mono text-gray-500 tracking-widest'>
						SCROLL
					</span>
					<div className='w-[1px] h-12 bg-linear-to-b from-white to-transparent animate-pulse' />
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
