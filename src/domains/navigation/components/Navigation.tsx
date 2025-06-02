import React, { useEffect, useState } from "react";
import { useScrollBehavior } from "../../../shared/hooks/useScrollBehavior";
import { Link } from "react-router-dom";
//@ts-ignore
import logo from "../../../assets/logo.svg";

type TNavigationProps = {};

const Navigation: React.FC<TNavigationProps> = () => {
	const { scrolled } = useScrollBehavior();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const navItems: { label: string; to: string }[] = [
		{ label: "Blog", to: "/posts" },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 p-6'>
			<div
				className={`mx-auto max-w-6xl transition-all duration-500 z-50 ${
					scrolled
						? "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg"
						: "bg-transparent"
				}`}
				style={{ borderRadius: scrolled ? "100px" : "0px" }}
			>
				<div className='flex justify-between items-center px-8 py-4'>
					<Link
						to='/'
						className={`text-2xl font-bold transition-all duration-500 ${
							scrolled ? "text-black" : "text-white"
						} ${
							isVisible
								? "translate-y-0 opacity-100"
								: "-translate-y-10 opacity-0"
						}`}
						style={{ display: "flex", alignItems: "center" }}
					>
						<img src={logo} alt='DGTLISM' className='w-[200px]' />
					</Link>
					<div
						className={`flex space-x-8 transition-all duration-1000 delay-300 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "-translate-y-10 opacity-0"
						}`}
					>
						{navItems.map((item) => (
							<Link
								key={item.to}
								to={item.to}
								className={`transition-colors duration-500  ${
									scrolled
										? "text-gray-700 hover:text-black"
										: "text-white hover:text-[#def846]"
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
