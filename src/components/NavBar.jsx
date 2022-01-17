import {
    Avatar,
    Box,
    Button,
    Container,

    Skeleton,
    Toolbar,
    Typography,
} from "@mui/material";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { PersonOutline } from "@mui/icons-material";
import { useSnackbar } from 'notistack'

const Navbar = () => {
    const { signout, user, currentRole, loading, active } = useAuth();
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()


    const setttingsAdmin = [
        // { name: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
        { name: "Admin Blogs", to: "/admin/blogs", icon: <ChromeReaderModeIcon /> },
        { name: "Users", to: "/admin/users", icon: <PersonOutline /> },
        // { name: "Bloggers", to: "/admin/bloggers", icon: <CreateIcon /> },
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
                                <Button component={RouterLink} to={setting.to} sx={{ color: "black" }}>
                                    {setting.name}
                                </Button>
                            ))}

                            {currentRole === 'blogger' &&
                                <>
                                    <Box>
                                        <Button onClick={() => {
                                            if (active) {
                                                navigate('/blogger/create');
                                            }
                                            else {
                                                enqueueSnackbar('Cannot create blogs. You are suspended temporarily!', { variant: 'warning' });
                                            }
                                        }} sx={{ color: "black" }}>
                                            Create Blog
                                        </Button>
                                    </Box>

                                    <Box>
                                        <Button onClick={() => {
                                            navigate('/blogger/blogs');

                                        }} sx={{ color: "black" }}>
                                            My Blogs
                                        </Button>
                                    </Box>
                                </>
                            }


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
                            {/* <Button component={RouterLink} to='/blogs'>
                                BLOGS
                            </Button> */}
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