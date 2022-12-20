import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Page } from "./layouts/Page/Page";
import { QueryClient, QueryClientProvider } from "react-query";

const panelTheme = createTheme();
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<ThemeProvider theme={panelTheme}>
					<Page />
				</ThemeProvider>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
