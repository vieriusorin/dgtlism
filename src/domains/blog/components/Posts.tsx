import React from "react";
import { Link } from "react-router-dom";

// @ts-expect-error: import.meta.glob is a Vite feature
const postModules = import.meta.glob("/src/posts/*.mdx", { eager: true });

// Extract post metadata and slug
const posts = Object.entries(postModules).map(([path, mod]: any) => {
	const slug = path
		.split("/")
		.pop()
		.replace(/\.mdx$/, "");
	const { title, date } = mod.frontmatter || {};
	return {
		slug,
		title: title || slug,
		date: date || "",
	};
});

const Posts: React.FC = () => {
	return (
		<div className='max-w-3xl mx-auto py-16 px-4'>
			<h1 className='text-4xl font-bold mb-8'>Blog</h1>
			<ul className='space-y-8'>
				{posts.map((post) => (
					<li key={post.slug} className='border-b border-white/10 pb-6'>
						<Link
							to={`/blog/${post.slug}`}
							className='text-2xl font-semibold text-[#def846] hover:underline'
						>
							{post.title}
						</Link>
						<div className='text-gray-400 text-sm mt-1'>{post.date}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;
