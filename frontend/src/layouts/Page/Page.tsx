import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { MainRoutes } from "../../routes/MainRoutes";

export const Page = () => {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<Header drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
				<Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Toolbar />
					<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
						<MainRoutes />
					</Container>
				</Box>
			</Box>
		</>
	);
};
