import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuList from "@/Config/MenuList";
import { Link } from "@inertiajs/react";
import { Height } from "@mui/icons-material";

const drawerWidth = 260;
const settings = [
    { name: "Profile", route: route("profile.edit") },
    { name: "Account", route: "" },
    { name: "Dashboard", route: route("Admin.dashboard") },
    { name: "Logout", route: route("logout"), method: "post", as: "button" },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer({ children, user }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <img src="https://s3-alpha-sig.figma.com/img/b1b7/e437/3a7c0a4f4cd7aa9b06a4c8fb810eb66b?Expires=1704067200&Signature=A2-2A-irZpLeD5xbCie13dLUCyNWXUJ0dHYOLh5WPhkVSovmS68HHN0pTcw-NVx5l7jTBXKPBDQfwS0fYup-IMSDg8vMWgwA30VULnM5ETkGu0FwR3wKsAvCsxPSd~yezbQhcbbUhPP~NS~6OTNiK4NDQgDyvVsj4NSpJxEvFKGZwkvfPRfat~tSbpIYUrnYjvaqoQwUx0jnaxds6AquEZ6yifftqAzgd0v6D3FB18IvMPcKfBsD~n1Tc3ZtWeFsDnFljFtkS4jDAxCAAU2RiK1BTX6hWJwDpYdjc6AsqHEc8e5YLrGvjRYv1DuqWc39zThSnFP6jq0E3RuG6aRkcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            ml: 2,
                            // display: { xs: "flex", md: "none" },
                            flexGrow: 2,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            // letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                            fontSize: 32,
                        }}
                    >
                        Meta AI
                        <br /> <span style={{ fontSize: 18 }}>manager</span>
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 2,
                            // display: { xs: "none", md: "flex" },
                        }}
                    ></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                                <span
                                    style={{
                                        marginLeft: 12,
                                        color: "#ffff",
                                        fontSize: 16,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {user.name}
                                </span>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    onClick={handleCloseUserMenu}
                                >
                                    {setting.method === "post" ? (
                                        <Link
                                            href={setting.route}
                                            as="button"
                                            method="post"
                                        >
                                            <Typography textAlign="center">
                                                {setting.name}
                                            </Typography>
                                        </Link>
                                    ) : (
                                        <Typography textAlign="center">
                                            <Link href={setting.route}>
                                                {setting.name}
                                            </Link>
                                        </Typography>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <div>
                    <DrawerHeader sx={{ mt: "72px" }}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <MenuIcon />
                            ) : (
                                <MenuIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {MenuList.map((menuItem, index) => (
                            <React.Fragment key={index}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {menuItem.sidebarProps.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            disableTypography
                                            primary={
                                                <Typography
                                                    sx={{ fontWeight: "bold" }}
                                                >
                                                    {
                                                        menuItem.sidebarProps
                                                            .displayText
                                                    }
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                                {menuItem.child &&
                                    menuItem.child.length > 0 && (
                                        <List disablePadding>
                                            {menuItem.child.map(
                                                (childItem, childIndex) => (
                                                    <Link
                                                        key={childIndex}
                                                        href={childItem.path}
                                                    >
                                                        <ListItem
                                                            key={childIndex}
                                                            disablePadding
                                                        >
                                                            <ListItemButton
                                                                sx={{
                                                                    pl: 4,
                                                                    ml: 2,
                                                                }}
                                                            >
                                                                <ListItemIcon>
                                                                    {
                                                                        childItem
                                                                            .sidebarProps
                                                                            .icon
                                                                    }
                                                                </ListItemIcon>
                                                                <ListItemText
                                                                    primary={
                                                                        childItem
                                                                            .sidebarProps
                                                                            .displayText
                                                                    }
                                                                />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </Link>
                                                )
                                            )}
                                        </List>
                                    )}
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </div>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
