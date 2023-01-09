import { Alert, Link, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { TaxonomyTable } from "../components/Taxonomies/TaxonomyTable";
import { deleteTags, getTagsList } from "../api/tags/tags";
import { TaxonomyInterface } from "../types/taxonomy";
import { AddTagPage } from "./AddTagPage";

export const TagsPage = () => {
	const { data, isLoading, isError, error, refetch }: { data?: any; isLoading: any; isError: any; error: any; refetch: any } = useQuery(
		"tagsList",
		() => getTagsList()
	);
	const [alert, setAlert]: [alert: string, setAlert: Dispatch<SetStateAction<string>>] = useState("");
	const [editItem, setEditItem]: [
		editItem: TaxonomyInterface | undefined | boolean,
		setEditItem: Dispatch<SetStateAction<TaxonomyInterface | boolean | undefined>>
	] = useState();

	if (isLoading || isError) return <h1>Loading...</h1>;

	if (isError) console.log(error);

	return (
		<>
			{alert === "error" ? (
				<Alert sx={{ mb: 2 }} severity="error">
					Something went wrong...
				</Alert>
			) : (
				alert === "success" && (
					<Alert sx={{ mb: 2 }} severity="success">
						Your request was handled successfully
					</Alert>
				)
			)}
			<Link href="/add-tag">Add new tag</Link>
			<Typography component="h1" variant="h4" color="inherit" noWrap sx={{ flexGrow: 1, mt: 1, mb: 2 }}>
				Tags page
			</Typography>

			{!isLoading && !editItem && (
				<TaxonomyTable setEditItem={setEditItem} refetch={refetch} type="tags" setAlert={setAlert} data={data} deleteFunc={deleteTags} />
			)}

			{editItem && <AddTagPage data={editItem} setEditItem={setEditItem} />}
		</>
	);
};
