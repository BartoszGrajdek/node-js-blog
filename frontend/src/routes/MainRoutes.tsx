import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PostsPage } from "../pages/PostsPage";
import { AddPostPage } from "../pages/AddPostPage";
import { TagsPage } from "../pages/TagsPage";
import { CategoriesPage } from "../pages/CategoriesPage";

export const LocationDisplay = () => {
	const location = useLocation();

	return <div data-testid="location-display">{location.pathname}</div>;
};

export function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/dashboard" replace />} />
			<Route path="/dashboard" element={<DashboardPage />} />
			<Route path="/add-post" element={<AddPostPage />} />
			<Route path="/posts" element={<PostsPage />} />
			<Route path="/tags" element={<TagsPage />} />
			<Route path="/categories" element={<CategoriesPage />} />
			<Route path="/404" element={<NotFoundPage />} />
			<Route path="*" element={<Navigate to="/404" replace />} />
		</Routes>
	);
}
