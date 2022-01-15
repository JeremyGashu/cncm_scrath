import {
    Avatar,
    Box,
    Button,
    Container,

    MenuItem,
    Skeleton,
    Toolbar,
    Typography,
} from "@mui/material";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CreateIcon from "@mui/icons-material/Create";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { PersonOutline } from "@mui/icons-material";

const Navbar = () => {
    const { signout, user, currentRole, loading } = useAuth();


    const setttingsAdmin = [
        // { name: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
        { name: "Admin Blogs", to: "/admin/blogs", icon: <ChromeReaderModeIcon /> },
        { name: "Users", to: "/admin/users", icon: <PersonOutline /> },
        { name: "Bloggers", to: "/admin/bloggers", icon: <CreateIcon /> },
    ];
    const settingsBloggers = [
        { name: "Create Blog", to: "/blogger/create-blog", icon: <CreateIcon /> },
        { name: "My Blogs", to: "/blogger/my-blogs", icon: <ChromeReaderModeIcon /> },
    ];


    return (
        <>
            <Container maxWidth='lg'>
                <Toolbar
                    sx={{}}
                    disableGutters
                >
                    <Box sx={{ flexGrow: 1, mr: 2, display: { xs: "none", md: "flex" } }}>
                        <Button component={RouterLink} color='primary' to='/'>
                            CNCM
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>

                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <RouterLink to='/'>
                            <Typography>CNCM</Typography>
                        </RouterLink>
                    </Box>

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>

                    </Box>

                    {loading ? (
                        <>
                            <Skeleton sx={{ p: 2 }} />
                        </>
                    ) : user ? (
                        <>

                            {currentRole === 'admin' && setttingsAdmin.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    component={RouterLink}
                                    to={setting.to}
                                >
                                    <Button startIcon={setting.icon} sx={{ color: "black" }}>
                                        {setting.name}
                                    </Button>
                                </MenuItem>
                            ))}


                            {currentRole === 'blogger' && settingsBloggers.map((setting) => (
                                <MenuItem
                                    key={setting.name}
                                    component={RouterLink}
                                    to={setting.to}
                                >
                                    <Button
                                        startIcon={setting.icon} sx={{ color: "black" }}>
                                        {setting.name}
                                    </Button>
                                </MenuItem>
                            ))}


                            <Box sx={{ flexGrow: 0, justifyContent: 'space-around', alignItems: 'center' }}>
                                <Avatar />
                            </Box>

                            <Box sx={{ flexGrow: 0, justifyContent: 'space-around', alignItems: 'center', margin: 2 }}>
                                <Typography fontSize={12} >{user.name}</Typography>
                            </Box>

                            <Button onClick={() => {
                                signout()
                            }} >Log Out</Button>
                        </>
                    ) : (
                        <>
                            <Button component={RouterLink} to='/blogs'>
                                BLOGS
                            </Button>
                            <Box sx={{ width: 30 }} ></Box>
                            <Button component={RouterLink} color='primary' to='/login'>
                                Login
                            </Button>

                            <Button component={RouterLink} color='primary' to='/register'>
                                Register
                            </Button>

                        </>
                    )}
                </Toolbar>
            </Container>
            <Outlet />
        </>
    );
};
export default Navbar