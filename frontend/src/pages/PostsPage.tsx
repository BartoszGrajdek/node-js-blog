import { useQuery } from "react-query";
import { getPostsList } from "../api/posts/posts";
import { Typography } from "@mui/material";
import { PostsTable } from "../components/Posts/PostsTable";
import { PostInterface } from "../types/post";

export const PostsPage = () => {
	const { data, isLoading, isError, error } = useQuery("postsList", () => getPostsList());

	if (isLoading || isError) return <h1>Loading...</h1>;

	if (isError) console.log(error);

	if (!isLoading) console.log(data);

	return (
		<>
			<Typography component="h1" variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
				Posts page
			</Typography>

			{!isLoading && <PostsTable data={data} />}
		</>
	);
};
