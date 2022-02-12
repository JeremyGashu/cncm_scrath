import { Typography, Grid, Avatar, Button, Divider } from '@mui/material'
import parse from 'html-react-parser'
import moment from 'moment'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BlogContext } from '../contexts/blogcontext'

const BlogCardWordpress = ({ blog }) => {
    const navigate = useNavigate()  
    const [selectedBlog, setSelectedBlog] = useContext(BlogContext)



    return (
        <Grid container alignItems='center'>
            <Grid item sm={12} lg={8} sx={{ p: 5 }}>
                <Grid container direction='row' alignItems='center'>
                    <Grid item>
                        <Avatar src={blog.bloggerImage} />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ fontSize: 12, color: '#444', px: 1 }}>{blog.author_name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontSize: 10, color: '#444444', px: 1 }}>{moment(blog.date).fromNow()}</Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography sx={{ fontSize: 13, my: 1, fontWeight: 'bold' }}>{blog.title.rendered}</Typography>
                    <Typography>
                        {
                            parse(blog.excerpt.rendered)
                        }
                    </Typography>

                </Grid>
                <Grid container direction='row' alignItems='center' >
                    <Grid item sx={{ px: 1 }}>
                        <Button onClick={() => {
                            setSelectedBlog(blog)
                            navigate('/blogs-wp')
                        }} sx={{ fontSize: 11, color: '#444' }}> Read More... </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{pl:5}} item sm={12} lg={4}>
                <img style={{ borderRadius: 5 }} height={100} src={blog.image_url} alt='Blog' />
            </Grid>
            <Grid item sm={12} lg={12} md={12} >
                <Divider />
            </Grid>
        </Grid>)
}

export default BlogCardWordpress