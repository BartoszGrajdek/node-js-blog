import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Link } from "@mui/material";
import { deletePosts } from "../../api/posts/posts";
import { TaxonomyInterface } from "../../types/taxonomy";

interface HeadCell {
	id: keyof TaxonomyInterface;
	disablePadding: boolean;
	label: string;
	numeric: boolean;
}

interface DeleteResponse {
	status: number;
}

const headCells: readonly HeadCell[] = [
	{
		id: "name",
		numeric: false,
		disablePadding: true,
		label: "Name",
	},
	{
		id: "font",
		numeric: false,
		disablePadding: true,
		label: "Font",
	},
	{
		id: "color",
		numeric: false,
		disablePadding: true,
		label: "Color",
	},
	{
		id: "_id",
		numeric: false,
		disablePadding: false,
		label: "Edit",
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick, numSelected, rowCount } = props;

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						size={"small"}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
	deleteHandler: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected, deleteHandler } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
					Posts
				</Typography>
			)}
			{numSelected > 0 && (
				<Tooltip title="Delete">
					<IconButton onClick={() => deleteHandler()}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

export function TaxonomyTable({
	data,
	type,
	setEditItem,
	setAlert,
	refetch,
	deleteFunc,
}: {
	data: Array<TaxonomyInterface>;
	type: "tags" | "categories";
	setEditItem: any;
	setAlert: React.Dispatch<React.SetStateAction<string>>;
	refetch: any;
	deleteFunc: (i: Array<string>) => Promise<any>;
}) {
	const [rows, setRows] = React.useState(data);
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const deleteHandler = async () => {
		const response = await deleteFunc([...selected]);
		console.log(response);
		setAlert(response.status > 199 && response.status < 300 ? "success" : "error");

		if (response.status > 199 && response.status < 300) {
			setSelected([]);
			refetch();
		}
	};

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n._id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
		const selectedIndex = selected.indexOf(_id);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, _id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		console.log(newSelected);
		setSelected(newSelected);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const isSelected = (title: string) => selected.indexOf(title) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} deleteHandler={deleteHandler} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
						<EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={rows.length} />
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
								const isItemSelected = isSelected(row._id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row._id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row._id}
										selected={isItemSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": labelId,
												}}
											/>
										</TableCell>
										<TableCell component="th" id={labelId} scope="row" padding="none">
											{row.name}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.font}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.color}
										</TableCell>
										<TableCell align="left" padding="none" onClick={() => setEditItem(row)}>
											<Button>Edit</Button>
										</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
