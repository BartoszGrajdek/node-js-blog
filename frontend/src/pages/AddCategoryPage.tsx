import {
	Alert,
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import * as yup from "yup";
import { addCategory } from "../api/categories/categories";
import { TaxonomyInterface } from "../types/taxonomy";

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	font: yup.string().required("Font is required"),
	color: yup.string().required("Color is required"),
});

export const AddCategoryPage = ({ data }: { data?: TaxonomyInterface }) => {
	const [alert, setAlert]: [string, Dispatch<SetStateAction<string>>] = useState("none");

	const formik = useFormik({
		initialValues: {
			name: "",
			font: "",
			color: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const result = await addCategory(values);
			if (result.status > 199 && result.status < 300) {
				setAlert("success");
			} else {
				setAlert("error");
			}
		},
	});

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
				Add category
			</Typography>
			<Box component="form" onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField
							fullWidth
							margin="dense"
							id="name"
							name="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={(formik.touched.name && formik.errors.name) || "Please provide category name"}
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							fullWidth
							margin="dense"
							id="color"
							name="color"
							label="Color"
							multiline
							value={formik.values.color}
							onChange={formik.handleChange}
							error={formik.touched.color && Boolean(formik.errors.color)}
							helperText={(formik.touched.color && formik.errors.color) || "Please provide category color"}
						/>
					</Grid>
					<Grid item xs={4} />
					<Grid item xs={4}>
						<FormControl fullWidth error={formik.touched.font && Boolean(formik.errors.font)}>
							<InputLabel id="font">Font</InputLabel>
							<Select
								margin="dense"
								id="font"
								name="font"
								label="Font"
								labelId="font"
								value={formik.values.font}
								onChange={formik.handleChange}
								input={<OutlinedInput label="Font" />}
								// MenuProps={MenuProps}
							>
								{[
									{ _id: 1, name: "light" },
									{ _id: 2, name: "dark" },
								].map((font: any) => (
									<MenuItem key={font._id} value={font.name}>
										{font.name}
									</MenuItem>
								))}
							</Select>
							<FormHelperText id="font">Please add font type to your category</FormHelperText>
						</FormControl>
					</Grid>
					<Grid item xs={8} />
					<Grid item xs={2}>
						<Button onClick={() => console.log(formik.values)} color="primary" variant="contained" type="submit">
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};
