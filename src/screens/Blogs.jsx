import { Box, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/NavBar'
import { collectionData } from 'rxfire/firestore'
import { publishedBlogsQuery } from '../query/query'
import FullPageLoading from '../components/FullPageLoading'
import BlogCard from '../components/BlogCard'
import { kGreenColor } from '../styles/colors'
import SuggestedCard from '../components/SuggestedCard'




const BlogsPage = () => {

    const [blogs, setBlogs] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        collectionData(publishedBlogsQuery, { idField: 'id' })
            .subscribe(blogs => {
                console.log(blogs)
                setBlogs(blogs)
                setLoading(false)
            })
        return () => {

        }
    }, [])

    return (
        <>
            <Navbar />
            {loading && <FullPageLoading />}
            {/* <div className="container">
                {!loading && blogs &&
                    blogs.map(blog => {
                        return (
                            <>
                                <div onClick={() => {
                                    navigate(`/blogs/${blog.id}`)
                                    console.log(blog.id)
                                }} key={blog.id} className="card">
                                    <div className="card__header">
                                        <img src={blog.coverImage} alt="card__image" className="card__image" width={600} />
                                    </div>
                                    <div className="card__body">
                                        <h4>{blog.title}</h4>
                                        <p>{blog.description}</p>
                                    </div>
                                    <div className="card__footer">
                                        <div className="user">
                                            <Avatar />
                                            <div className="user__info">
                                                <h5>{blog.blogger}</h5>
                                                <small>{moment(blog.createdAt.toDate()).fromNow()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div> */}

            <Grid container>
                {!loading && blogs && blogs.map(blog => {
                    return (
                        <BlogCard blog={blog} />
                    )
                })}

                {!loading && blogs && <Grid item sm={12} lg={3} sx={{ p: 5 }}>
                    <Box sx={{ p: 2, backgroundColor: '#f0efed', borderRadius: 1 }} >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: kGreenColor, m: 1 }} >Suggestion</Typography>
                        <Divider />

                        {blogs.map(blog => {
                            return (
                                <SuggestedCard blog={blog} />
                            )
                        })}
                    </Box>
                </Grid>}
            </Grid>


        </>
    )
}


export default BlogsPage