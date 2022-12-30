import { Alert, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { TaxonomyTable } from "../components/Taxonomies/TaxonomyTable";
import { deleteTags, getTagsList } from "../api/tags/tags";

export const TagsPage = () => {
	const { data, isLoading, isError, error, refetch } = useQuery("tagsList", () => getTagsList());
	const [alert, setAlert]: [alert: string, setAlert: Dispatch<SetStateAction<string>>] = useState("");

	if (isLoading || isError) return <h1>Loading...</h1>;

	if (isError) console.log(error);

	if (!isLoading) console.log(data);

	console.log(alert);

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
			<Typography component="h1" variant="h4" color="inherit" noWrap sx={{ flexGrow: 1, mb: 2 }}>
				Posts page
			</Typography>

			{!isLoading && <TaxonomyTable refetch={refetch} setAlert={setAlert} data={data} deleteFunc={deleteTags} />}
		</>
	);
};
