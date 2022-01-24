import {
    Box,
    Button,
    Skeleton,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Link,
    MenuItem,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { CreateOutlined, DashboardOutlined, MenuOutlined, PersonOutline } from "@mui/icons-material";
import { useSnackbar } from 'notistack'
import cncm_logo from '../assets/cncm_logo.svg'
import { kGreenColor } from "../styles/colors";



const headersData = [
    {
        label: "Listings",
        href: "/listings",
    },
    {
        label: "Mentors",
        href: "/mentors",
    },
    {
        label: "My Account",
        href: "/account",
    },
    {
        label: "Log Out",
        href: "/logout",
    },
];

export default function Navbar() {

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    const { mobileView, drawerOpen } = state;

    const { signout, user, currentRole, loading, active, isAnonymous } = useAuth();
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()



    const setttingsAdmin = [
        { name: "Dashboard", to: "/admin/dashboard", icon: <DashboardOutlined /> },
        { name: "Blogs", to: "/admin/blogs", icon: <ChromeReaderModeIcon /> },
        { name: "Users", to: "/admin/users", icon: <PersonOutline /> },
        { name: "Bloggers", to: "/admin/bloggers", icon: <CreateOutlined /> },
    ];

    const ordinarySettings = ['OUR WORK', 'SOLUTION', 'BECOME PARTNER', 'BLOG'];

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };

        setResponsiveness();

        window.addEventListener("resize", () => setResponsiveness());

        return () => {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);

    const displayDesktop = () => {
        return (
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                {cncmLogo}
                <div>{loading ? (
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

                        {currentRole !== 'admin' && ordinarySettings.map((setting) => (
                            <Button sx={{ color: "black", }}>
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
                )}</div>
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuOutlined sx={{ color: '#444444' }} />
                </IconButton>

                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <Box sx={{
                        padding: "20px 30px",
                    }}>

                        <>
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

                                    {currentRole !== 'admin' && ordinarySettings.map((setting) => (
                                        <Button sx={{ color: "black", }}>
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
                        </>
                    </Box>
                </Drawer>

                <div>{cncmLogo}</div>
            </Toolbar>
        );
    };


    const cncmLogo = (
        <Typography variant="h6" component="h1" sx={{
            fontFamily: "Work Sans, sans-serif",
            fontWeight: 600,
            color: "#FFFEFE",
            textAlign: "left",
        }}>
            <img height={40} src={cncm_logo} alt='CNCM Logo' />
        </Typography>
    );


    return (
        <header>
            <AppBar sx={{
                position: 'relative',
                backgroundColor: "white",
                paddingRight: "79px",
                paddingLeft: "30px",
                "@media (max-width: 900px)": {
                    paddingLeft: 0,
                },
            }}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}

