import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Page } from "./layouts/Page/Page";

const panelTheme = createTheme();

function App() {
	return (
		<Router>
			<ThemeProvider theme={panelTheme}>
				<Page />
			</ThemeProvider>
		</Router>
	);
}

export default App;
