import * as React from 'react';
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
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { validateEmail, validatePassword } from '../utils/validate';




const theme = createTheme();

const SignUpPage = () => {

    const [loading, setLoading] = useState(false)
    const { registerUserManually } = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        let email = data.get('email')
        let password = data.get('password')
        if (!validateEmail(email)) {
            enqueueSnackbar('Please enter valid email address!', { variant: 'error' })
            return;
        }
        if (!validatePassword(password)) {
            enqueueSnackbar('Password must be at least 8 characters!', { variant: 'error' })
            return;
        }
        let status = await registerUserManually(email, password)
        if (status.success) {
            setLoading(false)
            enqueueSnackbar('Registered Successfully!', { variant: 'success' })
            navigate('/')
        }
        else {
            setLoading(false)
            enqueueSnackbar(status.message, { variant: 'error' })
        }
    };

    const {
        signInWithGoogle, user } = useAuth()
    if (user) {
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
                        Sign up
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
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
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
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}

export default SignUpPage