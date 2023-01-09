import { useQuery } from "react-query";
import { deleteCategories, getCategoriesList } from "../api/categories/categories";
import { Dispatch, SetStateAction, useState } from "react";
import { Alert, Link, Typography } from "@mui/material";
import { TaxonomyTable } from "../components/Taxonomies/TaxonomyTable";
import { TaxonomyInterface } from "../types/taxonomy";

export const CategoriesPage = () => {
	const { data, isLoading, isError, error, refetch } = useQuery("tagsList", () => getCategoriesList());
	const [alert, setAlert]: [alert: string, setAlert: Dispatch<SetStateAction<string>>] = useState("");
	const [editItem, setEditItem]: [
		editItem: TaxonomyInterface | undefined | boolean,
		setEditItem: Dispatch<SetStateAction<TaxonomyInterface | undefined>>
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
			<Link href="/add-category">Add new category</Link>
			<Typography component="h1" variant="h4" color="inherit" noWrap sx={{ flexGrow: 1, mt: 1, mb: 2 }}>
				Categories page
			</Typography>

			{!isLoading && !editItem && (
				<TaxonomyTable
					setEditItem={setEditItem}
					refetch={refetch}
					type="categories"
					setAlert={setAlert}
					data={data}
					deleteFunc={deleteCategories}
				/>
			)}
		</>
	);
};
