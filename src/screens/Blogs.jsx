import { Box, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/NavBar'
import FullPageLoading from '../components/FullPageLoading'
import { kGreenColor } from '../styles/colors'
import SuggestedCard from '../components/SuggestedCard'
import { fetchPosts, getAuthorName, getImageUrl } from '../controllers/wordpress/posts'
import BlogCardWordpress from '../components/BlogCardWordpress'




const BlogsPage = () => {

    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)
        fetchPosts().then(result => {
            setBlogs(result)
            setLoading(false)
        })
        return () => {

        }
    }, [])

    return (
        <>
            <Navbar />
            {loading && <FullPageLoading />}

            <Grid container alignItems='start'>
                <Grid item sm={12} lg={8} sx={{ p: 1 }}>

                    {!loading && blogs && blogs.map((blog, index, _) => {
                        return (
                            <BlogCardWordpress blog={blog} />
                        )
                    })}
                </Grid>

                {!loading && blogs && <Grid item sm={12} lg={3} sx={{ p: 5 }}>
                    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }} >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: kGreenColor, m: 1 }} >Suggestion</Typography>
                        <Divider />

                        {blogs.map((blog) => {
                            return (
                                <SuggestedCard blog={blog} />
                            )
                        })}
                    </Box>
                </Grid>}
            </Grid>


            {/* {loading && <FullPageLoading />}

            <Grid container alignItems='start'>
                <Grid item sm={12} lg={8} sx={{ p: 5 }}>
                    {!loading && blogs && blogs.map(blog => {
                        return (
                            <BlogCard blog={blog} />
                        )
                    })}
                </Grid>

                {!loading && blogs && <Grid item sm={12} lg={3} sx={{ p: 5 }}>
                    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }} >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: kGreenColor, m: 1 }} >Suggestion</Typography>
                        <Divider />

                        {blogs.map(blog => {
                            return (

                                <SuggestedCard blog={blog} />
                            )
                        })}
                    </Box>
                </Grid>}
            </Grid> */}
        </>
    )
}


export default BlogsPage