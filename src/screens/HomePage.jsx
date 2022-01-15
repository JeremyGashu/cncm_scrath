import React from 'react'
import Navbar from '../components/NavBar'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import blog_image from '../assets/blog_image.svg'


const HomePage = () => {

    return (
        <>
            <Navbar />
            <Grid container alignItems='center' style={{ textAlign: "center", padding: 50 }}>
                <Grid item md={12} lg={6} xs={12}>
                    <img style={{ maxWidth: 600 }} src={blog_image} alt="" />
                </Grid>
                <Grid style={{ textAlign: 'center', padding: 30 }} item md={12} lg={6} xs={12}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 28 }} >BLOG</Typography>
                    <Typography style={{ fontSize: 15, color: '#00B80C', marginBottom: 20 }}>Don't Miss out Useful Blog Posts</Typography>
                    <Typography style={{ fontSize: 19, fontWeight: 'bold' }}>Easily connect and get access to all our</Typography>
                    <Typography style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}> useful and amazing blog posts</Typography>

                    <Link style={{ textDecoration: 'none', borderRadius: 5, fontSize: 14, color: 'white', padding: '10px 35px 10px 35px', backgroundColor: '#00B80C' }} to='/blogs' >Read Blogs</Link>

                </Grid>
            </Grid >
        </>
    )
}

export default HomePage