import React from "react";
import HeroSection from "../domains/hero/components/HeroSection";
import BlogSection from "../domains/blog/components/BlogSection";
import ContactSection from "../domains/contact/components/ContactSection";

const HomePage: React.FC = () => {
	return (
		<main>
			<HeroSection />
			<BlogSection />
			<ContactSection />
		</main>
	);
};

export default HomePage;
