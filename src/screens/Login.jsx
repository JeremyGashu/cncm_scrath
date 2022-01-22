import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Facebook, Google } from '@mui/icons-material';
import { useAuth } from '../hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validate';
import { useSnackbar } from 'notistack'
import image from '../assets/login_image.png'
import Navbar from '../components/NavBar'
import { googleAndFacebookButton, loginButtonStyle } from '../styles/button_style';
import { kGreenColor } from '../styles/colors';


const LoginPage = () => {

    const navigate = useNavigate()
    const {
        signInWithGoogle, user, isAnonymous, loginManually, signInWithFacebook } = useAuth()
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()



    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let password = data.get('password')
        if (!validateEmail(email)) {
            setLoading(false)
            enqueueSnackbar('Please enter valid email address!', { variant: 'error' })
            return;
        }
        if (!validatePassword(password)) {
            setLoading(false)
            enqueueSnackbar('Password must be at least 8 characters!', { variant: 'error' })
            return;
        }
        let status = await loginManually(email, password)
        if (status.success) {
            setLoading(false)
            // enqueueSnackbar('Registered Successfully!', { variant: 'success' })
            navigate('/')
        }
        else {
            setLoading(false)
            enqueueSnackbar(status.message, { variant: 'error' })
        }
        setLoading(false)
    };


    if (user && !isAnonymous) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item lg={6} sm={12}>
                    <img style={{height : '90vh'}} src={image} alt='Login' />
                </Grid>
                <Grid item lg={6} sm={12}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                // marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    siz='small'
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    sx={{ my: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    name="password"
                                    siz='small'

                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    sx={{ my: 2 }}
                                />
                                <Button
                                    fullWidth
                                    type='submit'
                                    disabled={loading}
                                    sx={loginButtonStyle}
                                >
                                    Login
                                </Button>

                                <Typography sx={{ fontSize: 12, my: 2, textAlign: 'center', fontWeight: 'bold' }} >
                                    Don't have an Account? <Link onClick={() => {
                                        navigate('/register')
                                    }} sx={{ color: kGreenColor, textDecoration: 'none', cursor: 'pointer' }} >Signup</Link>
                                </Typography>

                                <Typography sx={{ fontSize: 12, mt: 5, textAlign: 'center' }} >
                                    Or Signup With
                                </Typography>

                                <Grid container justifyContent='center' gap={3} sx={{ my: 3 }}>
                                    <Grid item>
                                        <Button onClick={() => { signInWithGoogle() }} startIcon={<Google />} sx={googleAndFacebookButton}>
                                            Google
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={() => signInWithFacebook()} startIcon={<Facebook />} sx={googleAndFacebookButton}>
                                            Facebook
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}

export default LoginPage