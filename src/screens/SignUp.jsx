import { useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CameraAlt, Facebook, Google } from '@mui/icons-material';
import { useAuth } from '../hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { validateEmail, validateName, validatePassword } from '../utils/validate';
import image from '../assets/login_image.png'
import Navbar from '../components/NavBar';
import { googleAndFacebookButton, loginButtonStyle } from '../styles/button_style';
import { kGreenColor } from '../styles/colors';
import { IconButton } from '@mui/material';

import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { userRegistered } from '../utils/firebase/user_management';






const SignUpPage = () => {

    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [downloadUrl, setDownloadUrl] = useState()
    const [preview, setPreview] = useState()
    const { registerUserManually } = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            //If the user does not select a file
            return
        }


        if (e.target.files[0]['type'].indexOf('image') === -1) {
            //if the user selected file that is not image
            enqueueSnackbar('Please select an Image.', { variant: 'warning' })
            return
        }
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        const name = data.get('name')
        if (await userRegistered(email)) {
            enqueueSnackbar('Email is already registered!', { variant: 'error' })
            setLoading(false)
            return;
        }
        if (!validateEmail(email)) {
            enqueueSnackbar('Please enter valid email address!', { variant: 'error' })
            setLoading(false)
            return;
        }
        if (!validateName(name)) {
            enqueueSnackbar('Please enter valid name!', { variant: 'error' })
            setLoading(false)
            return;
        }
        if (!validatePassword(password)) {
            enqueueSnackbar('Password must be at least 8 characters!', { variant: 'error' })
            setLoading(false)
            return;
        }

        //uploading image

        const storageRef = ref(storage, "images/" + selectedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress)
            },
            (error) => {
                enqueueSnackbar('Error uploading profile picture!', { variant: 'error' })
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    let status = await registerUserManually(email, password, name, downloadURL || '')
                    if (status.success) {
                        setLoading(false)
                        enqueueSnackbar('Registered Successfully!', { variant: 'success' })
                        navigate('/')
                    }
                    else {
                        setLoading(false)
                        enqueueSnackbar(status.message, { variant: 'error' })
                    }
                });
            }
        );



    };

    const inputFile = useRef(null)

    const selectImage = () => {
        inputFile.current.click();
    };

    const {
        signInWithGoogle, user, isAnonymous } = useAuth()
    if (user && !isAnonymous) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Navbar />
            <Grid container >
                <Grid item lg={6} sm={12}>
                    <img style={{height : '100vh'}} src={image} alt='Login' />
                </Grid>
                <Grid item lg={6} sm={12}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Box sx={{ mt: 2, width: 100, height: 100, backgroundColor: '#00000017', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {selectedFile && <img alt='Profile' style={{ width: '100%', height: '100%', border: '1px solid grey', borderRadius: '50%' }} onClick={selectImage} src={preview} />}
                                {!selectedFile && <IconButton onClick={selectImage} ><CameraAlt /></IconButton>}
                            </Box>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                <input onChange={onSelectFile} type='file' name='profile-picture' id='file' ref={inputFile} style={{ display: 'none' }} />

                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    sx={{ my: 2 }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    sx={{ my: 2 }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    sx={{ my: 2 }}
                                />

                                <Button
                                    disabled={loading}
                                    type="submit"
                                    fullWidth
                                    sx={loginButtonStyle}
                                >
                                    Sign Up
                                </Button>

                                <Typography sx={{ fontSize: 12, my: 2, textAlign: 'center', fontWeight: 'bold' }} >
                                    Have an Account? <Link onClick={() => {
                                        navigate('/login')
                                    }} sx={{ color: kGreenColor, textDecoration: 'none', cursor: 'pointer' }} >Login</Link>
                                </Typography>

                                <Typography sx={{ fontSize: 12, mt: 5, textAlign: 'center' }} >
                                    Or Login With
                                </Typography>

                                <Grid container justifyContent='center' gap={3} sx={{ my: 3 }}>
                                    <Grid item>
                                        <Button onClick={() => { signInWithGoogle() }} startIcon={<Google />} sx={googleAndFacebookButton}>
                                            Google
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button startIcon={<Facebook />} sx={googleAndFacebookButton}>
                                            Facebook
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Box>
                        </Box>
                        {/* <Copyright sx={{ mt: 5 }} /> */}
                    </Container>
                </Grid>
            </Grid>
        </>
    );
}

export default SignUpPage