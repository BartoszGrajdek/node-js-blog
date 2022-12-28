import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import CategoryIcon from "@mui/icons-material/Category";
import StyleIcon from "@mui/icons-material/Style";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import CommentIcon from "@mui/icons-material/Comment";
import SettingsIcon from "@mui/icons-material/Settings";
import { Drawer } from "./Drawer/Drawer";
import { Link, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";

export const Sidebar = ({ drawerOpen, toggleDrawer }: { drawerOpen: boolean; toggleDrawer: () => void }) => {
	//test
	return (
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
				<Link href={"/dashboard"}>
					<ListItemButton>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</Link>
				<Link href="/add-post">
					<ListItemButton>
						<ListItemIcon>
							<CreateIcon />
						</ListItemIcon>
						<ListItemText primary="Add post" />
					</ListItemButton>
				</Link>
				<Link href={"/posts"}>
					<ListItemButton>
						<ListItemIcon>
							<ArticleIcon />
						</ListItemIcon>
						<ListItemText primary="Posts" />
					</ListItemButton>
				</Link>
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
	);
};
