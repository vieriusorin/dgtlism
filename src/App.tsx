import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./domains/navigation/components/Navigation";
import "./shared/styles/globals.css";

const Layout: React.FC = () => {
	return (
		<div className='min-h-screen bg-black text-white overflow-x-hidden'>
			<Navigation />
			<Outlet />
		</div>
	);
};

export default Layout;
