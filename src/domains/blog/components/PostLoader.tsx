import React from "react";
import { useParams } from "react-router-dom";
import PostPage from "./PostPage";

// @ts-expect-error: Vite import.meta.glob is not typed
const postModules = import.meta.glob("/src/posts/*.mdx");

const PostLoader: React.FC = () => {
	const { slug } = useParams();
	const [mod, setMod] = React.useState<any>(null);

	React.useEffect(() => {
		const importPost = async () => {
			const match = Object.entries(postModules).find(([path]) =>
				path.endsWith(`${slug}.mdx`)
			);
			if (match) {
				// @ts-expect-error: dynamic import result
				const mod = await match[1]();
				setMod(mod);
			}
		};
		importPost();
	}, [slug]);

	if (!mod)
		return <div className='text-center py-24 text-gray-400'>Loading...</div>;

	const { frontmatter, default: Content } = mod;
	if (!frontmatter)
		return (
			<div className='text-center py-24 text-red-400'>
				Error: This post is missing frontmatter or could not be loaded.
			</div>
		);

	return (
		<PostPage meta={frontmatter}>
			<Content />
		</PostPage>
	);
};

export default PostLoader;
