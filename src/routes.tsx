import React from "react";
import { RouteObject } from "react-router-dom";
import Layout from "./App";
import HomePage from "./pages/HomePage";
import Posts from "./domains/blog/components/Posts";
import PostLoader from "./domains/blog/components/PostLoader";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "posts", element: <Posts /> },
			{ path: "blog/:slug", element: <PostLoader /> },
		],
	},
];

export default routes;
