import React from "react";
import { Link } from "react-router-dom";

interface PostMeta {
	title: string;
	description?: string;
	pubDate: string;
	author?: { name: string };
	tags?: string[];
	category?: string;
	difficulty?: string;
	minutesToRead?: number;
}

interface PostPageProps {
	meta: PostMeta;
	children: React.ReactNode;
}

const PostPage: React.FC<PostPageProps> = ({ meta, children }) => {
	return (
		<section className='py-24 px-4 min-h-screen bg-black text-white'>
			<div className='max-w-3xl mx-auto border border-white-200 border-white/10 rounded-lg bg-white/5 shadow-lg p-8 relative animate-fadeIn'>
				<div className='mb-8'>
					<Link
						to='/posts'
						className='text-cyan-400 hover:underline font-mono text-sm'
					>
						← Back to Blog
					</Link>
				</div>
				<h1
					className='text-4xl lg:text-5xl font-bold leading-tight mb-4 text-[#def846]'
					style={{
						animation:
							"slideInFromTop 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both",
					}}
				>
					{meta.title}
				</h1>
				{meta.description && (
					<p
						className='text-gray-400 text-lg mb-6'
						style={{
							animation:
								"slideInFromTop 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s both",
						}}
					>
						{meta.description}
					</p>
				)}
				<div
					className='flex flex-wrap gap-4 items-center text-xs text-gray-400 mb-8 font-mono'
					style={{
						animation:
							"slideInFromTop 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.6s both",
					}}
				>
					<span>
						By <span className='text-white'>{meta.author?.name}</span>
					</span>
					<span>•</span>
					<span>{new Date(meta.pubDate).toLocaleDateString()}</span>
					{meta.minutesToRead && (
						<>
							<span>•</span>
							<span>{meta.minutesToRead} min read</span>
						</>
					)}
					{meta.tags && meta.tags.length > 0 && (
						<>
							<span>•</span>
							<span className='flex gap-2'>
								{meta.tags.map((tag) => (
									<span
										key={tag}
										className='bg-[#def846]/10 text-[#def846] px-2 py-0.5 rounded'
									>
										{tag}
									</span>
								))}
							</span>
						</>
					)}
				</div>
				<article
					className='prose prose-invert max-w-none text-white'
					style={{
						animation:
							"slideInFromTop 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.8s both",
					}}
				>
					{children}
				</article>
			</div>
		</section>
	);
};

export default PostPage;
