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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as yup from "yup";
import { addPost } from "../api/posts/posts";
import { useQuery } from "react-query";
import { getCategoriesList } from "../api/categories/categories";
import { TaxonomyInterface } from "../types/taxonomy";
import { getTagsList } from "../api/tags/tags";

const validationSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Description is required"),
	author: yup.string().required("Author is required"),
	tags: yup.array().min(1, "Tags are required"),
	categories: yup.array().min(1, "Categories are required"),
});

export const AddPostPage = () => {
	const {
		data: categories,
		isLoading: categoriesIsLoading,
		isError: categoriesIsError,
		error: categoriesError,
	} = useQuery("categoriessList", () => getCategoriesList());
	const { data: tags, isLoading: tagsIsLoading, isError: tagsIsError, error: tagsError } = useQuery("tagsList", () => getTagsList());
	const [alert, setAlert]: [string, Dispatch<SetStateAction<string>>] = useState("none");

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			author: "",
			tags: [],
			categories: [],
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const result = await addPost(values);
			if (result.status > 199 && result.status < 300) {
				setAlert("success");
			} else {
				setAlert("error");
			}
		},
	});

	useEffect(() => {
		if (categoriesIsError) console.log(categoriesError);
		if (tagsIsError) console.log(tagsError);
	}, [categories, tags]);

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
				Add post
			</Typography>
			<Box component="form" onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							margin="dense"
							id="title"
							name="title"
							label="Title"
							value={formik.values.title}
							onChange={formik.handleChange}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							margin="dense"
							id="description"
							name="description"
							label="Description"
							multiline
							value={formik.values.description}
							onChange={formik.handleChange}
							error={formik.touched.description && Boolean(formik.errors.description)}
							helperText={formik.touched.description && formik.errors.description}
						/>
					</Grid>
					<Grid item xs={4}>
						{!tagsIsLoading && !tagsIsError && (
							<FormControl fullWidth error={formik.touched.tags && Boolean(formik.errors.tags)}>
								<InputLabel id="tags">Tags</InputLabel>
								<Select
									margin="dense"
									id="tags"
									name="tags"
									label="Tags"
									labelId="tags"
									multiple
									value={formik.values.tags}
									onChange={formik.handleChange}
									input={<OutlinedInput label="Tags" />}
									// MenuProps={MenuProps}
								>
									{tags.map((tag: TaxonomyInterface) => (
										<MenuItem key={tag._id} value={tag._id}>
											{tag.name}
										</MenuItem>
									))}
								</Select>
								<FormHelperText id="tags">Please add tags to your post</FormHelperText>
							</FormControl>
						)}
					</Grid>
					<Grid item xs={4}>
						{!categoriesIsLoading && !categoriesIsError && (
							<FormControl fullWidth error={formik.touched.categories && Boolean(formik.errors.categories)}>
								<InputLabel id="categories">Categories</InputLabel>
								<Select
									margin="dense"
									id="categories"
									name="categories"
									label="Categories"
									labelId="categories"
									multiple
									value={formik.values.categories}
									onChange={formik.handleChange}
									input={<OutlinedInput label="Categories" />}
									// MenuProps={MenuProps}
								>
									{categories.map((category: TaxonomyInterface) => (
										<MenuItem key={category._id} value={category._id}>
											{category.name}
										</MenuItem>
									))}
								</Select>
								<FormHelperText id="categories">Please add tags to your post</FormHelperText>
							</FormControl>
						)}
					</Grid>
					<Grid item xs={4}></Grid>
					<Grid item xs={4}>
						<TextField
							fullWidth
							margin="dense"
							id="author"
							name="author"
							label="Author"
							value={formik.values.author}
							onChange={formik.handleChange}
							error={formik.touched.author && Boolean(formik.errors.author)}
							helperText={formik.touched.author && formik.errors.author}
						/>
					</Grid>
					<Grid item xs={7}></Grid>
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
