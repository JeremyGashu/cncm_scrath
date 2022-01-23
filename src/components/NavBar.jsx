import {
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
import cncm_logo from '../assets/cncm_logo.svg'
import { kGreenColor } from "../styles/colors";

const Navbar = () => {
    const { signout, user, currentRole, loading, active, isAnonymous } = useAuth();
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()


    const setttingsAdmin = [
        // { name: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
        { name: "Admin Blogs", to: "/admin/blogs", icon: <ChromeReaderModeIcon /> },
        { name: "Users", to: "/admin/users", icon: <PersonOutline /> },
        // { name: "Bloggers", to: "/admin/bloggers", icon: <CreateIcon /> },
    ];

    const ordinarySettings = ['OUR WORK', 'SOLUTION', 'BECOME PARTNER', 'BLOG'];


    return (
        <>
            <Container maxWidth='lg'>
                <Toolbar
                    sx={{}}
                    disableGutters
                >
                    <Box sx={{ flexGrow: 1, mr: 2, display: { lg: 'flex', md: "flex" } }}>
                        <img height={45} onClick={() => {
                            navigate('/')
                        }} style={{ padding: '5px', cursor: 'pointer' }} src={cncm_logo} alt='CNCM' />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>

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



                            {currentRole != 'admin' && ordinarySettings.map((setting) => (
                                <Button sx={{ color: "black",}}>
                                    {setting}
                                </Button>


                            ))}





                            {currentRole === 'blogger' &&
                                <>
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

                                    <Button onClick={() => {
                                        navigate('/blogger/blogs');

                                    }} sx={{ color: "black" }}>
                                        My Blogs
                                    </Button>

                                </>
                            }

                            {
                                (currentRole === 'admin' || currentRole === 'blogger' || currentRole === 'user') &&
                                <Button onClick={() => {
                                    signout()

                                }} sx={{ color: kGreenColor, backgroundColor: 'white', fontWeight: 'bold' }}>
                                    Log Out
                                </Button>
                            }

                            {isAnonymous &&
                                <>
                                    {/* <Box sx={{ flexGrow: 0, justifyContent: 'space-around', alignItems: 'center', margin: 2 }}>
                                        <Typography fontSize={12} >{user.name}</Typography>
                                    </Box> */}

                                    <Button sx={{ color: kGreenColor, backgroundColor: 'white', fontWeight: 'bold' }} component={RouterLink} color='primary' to='/login'>
                                        Login
                                    </Button>

                                    <Button sx={{ backgroundColor: kGreenColor, color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: kGreenColor, } }} component={RouterLink} color='primary' to='/register'>
                                        Register
                                    </Button>
                                </>
                            }

                        </>
                    ) : (
                        <>
                            {/* <Button component={RouterLink} to='/blogs'>
                                BLOGS
                            </Button> */}
                            <Button sx={{ color: kGreenColor, backgroundColor: 'white', fontWeight: 'bold' }} component={RouterLink} color='primary' to='/login'>
                                Login
                            </Button>

                            <Button sx={{ backgroundColor: kGreenColor, color: 'white', fontWeight: 'bold', '&:hover': { backgroundColor: kGreenColor, } }} component={RouterLink} color='primary' to='/register'>
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