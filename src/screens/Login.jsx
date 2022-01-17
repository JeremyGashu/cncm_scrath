import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Google } from '@mui/icons-material';
import { useAuth } from '../hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validate';
import { useSnackbar } from 'notistack'


const theme = createTheme();

const LoginPage = () => {

    const navigate = useNavigate()
    const { loginManually } = useAuth()
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

    const {
        signInWithGoogle, user, isAnonymous } = useAuth()
    if (user && !isAnonymous) {
        return <Navigate to='/' />
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>

                        <Button
                            fullWidth
                            onClick={() => { signInWithGoogle() }}
                            variant="contained"
                            startIcon={<Google />}
                        >
                            Login With Google
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => {
                                    navigate('/register')
                                }} variant="body2">
                                    Create Account?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LoginPage