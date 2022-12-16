import { Box, CssBaseline, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Sidebar } from "../Sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CommentIcon from "@mui/icons-material/Comment";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

export const Page = () => {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="absolute" open={drawerOpen}>
					<Toolbar
						sx={{
							pr: "24px", // keep right padding when drawer closed
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "36px",
								...(drawerOpen && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
							Dashboard
						</Typography>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={drawerOpen}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						<ListItemButton>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<CreateIcon />
							</ListItemIcon>
							<ListItemText primary="Add post" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<ArticleIcon />
							</ListItemIcon>
							<ListItemText primary="Posts" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<CategoryIcon />
							</ListItemIcon>
							<ListItemText primary="Categories" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<StyleIcon />
							</ListItemIcon>
							<ListItemText primary="Tags" />
						</ListItemButton>
						<Divider sx={{ my: 1 }} />
						<ListItemButton>
							<ListItemIcon>
								<PermMediaIcon />
							</ListItemIcon>
							<ListItemText primary="Media library" />
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								<CommentIcon />
							</ListItemIcon>
							<ListItemText primary="Comments" />
						</ListItemButton>
						<Divider sx={{ my: 1 }} />
						<ListItemButton>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</ListItemButton>
					</List>
				</Drawer>
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
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}></Container>
				</Box>
				<Header />
				<Sidebar />
				<Main />
			</Box>
		</>
	);
};
