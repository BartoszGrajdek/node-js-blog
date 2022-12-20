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
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { PostInterface } from "../../types/post";

interface HeadCell {
	id: keyof PostInterface;
	disablePadding: boolean;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: "title",
		numeric: false,
		disablePadding: true,
		label: "Title",
	},
	{
		id: "status",
		numeric: false,
		disablePadding: true,
		label: "Status",
	},
	{
		id: "description",
		numeric: false,
		disablePadding: true,
		label: "Description",
	},
	{
		id: "createdAt",
		numeric: false,
		disablePadding: true,
		label: "Created Date",
	},
	{
		id: "updatedAt",
		numeric: false,
		disablePadding: true,
		label: "Updated date",
	},
	{
		id: "author",
		numeric: false,
		disablePadding: true,
		label: "Author",
	},
	{
		id: "_id",
		numeric: false,
		disablePadding: true,
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
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected } = props;

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
			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

export function PostsTable({ data }: { data: Array<PostInterface> }) {
	const [rows, setRows] = React.useState(data);
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	React.useEffect(() => {
		setRows(data);
	}, [data]);

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.title);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event: React.MouseEvent<unknown>, title: string) => {
		const selectedIndex = selected.indexOf(title);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, title);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

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
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
						<EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={rows.length} />
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
								const isItemSelected = isSelected(row.title);
								const labelId = `enhanced-table-checkbox-${index}`;
								row.createdAt = new Date(row.createdAt);
								row.updatedAt = new Date(row.updatedAt);

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.title)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.title}
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
											{row.title}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.status}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.description}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.createdAt.getDate()}-
											{row.createdAt.getMonth() + 1 > 9 ? row.createdAt.getMonth() + 1 : `0${row.createdAt.getMonth() + 1}`}-
											{row.createdAt.getFullYear()}{" "}
											{row.createdAt.getHours() > 9 ? row.createdAt.getHours() : `0${row.createdAt.getHours()}`}:
											{row.createdAt.getMinutes() > 9 ? row.createdAt.getMinutes() : `0${row.createdAt.getMinutes()}`}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.updatedAt.getDate()}-
											{row.updatedAt.getMonth() + 1 > 9 ? row.updatedAt.getMonth() + 1 : `0${row.updatedAt.getMonth() + 1}`}-
											{row.updatedAt.getFullYear()}{" "}
											{row.updatedAt.getHours() > 9 ? row.updatedAt.getHours() : `0${row.updatedAt.getHours()}`}:
											{row.updatedAt.getMinutes() > 9 ? row.updatedAt.getMinutes() : `0${row.updatedAt.getMinutes()}`}
										</TableCell>
										<TableCell align="left" padding="none">
											{row.author}
										</TableCell>
										<TableCell align="left" padding="none">
											Edit
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
