import { FavoriteBorderOutlined, CommentSharp } from '@mui/icons-material'
import { Typography, Grid, Avatar, Button, Divider } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'





const BlogCard = ({ blog }) => {
    const navigate = useNavigate()
    return (<Grid item sm={12} lg={9} sx={{ p: 5, cursor: 'pointer' }}>
        <Grid container alignItems='center'>
            <Grid item sm={12} lg={8} sx={{ p: 5 }}>
                <Grid container direction='row' alignItems='center'>
                    <Grid item>
                        <Avatar src={blog.bloggerImage} />
                    </Grid>
                    <Grid item >
                        <Typography sx={{ fontSize: 12, color: '#444', px: 1 }}>{blog.blogger}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontSize: 10, color: '#444444', px: 1 }}>{moment(blog.createdAt.toDate()).fromNow()}</Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography sx={{ fontSize: 13, my: 1, fontWeight: 'bold' }}>{blog.title}</Typography>

                    <Typography sx={{ fontSize: 12, my: 1, color: '#444' }}> {blog.description}</Typography>
                </Grid>

                <Grid container direction='row' alignItems='center' >
                    <Grid item sx={{ px: 1 }}>

                        <FavoriteBorderOutlined sx={{ color: '#444', width: 20 }} />
                    </Grid>
                    <Grid item sx={{ px: 1 }}>

                        <Typography>{blog.likesCount || 0}</Typography>
                    </Grid>

                    <Grid item sx={{ px: 1 }}>

                        <CommentSharp sx={{ color: '#444', width: 20 }} />
                    </Grid>
                    <Grid item sx={{ px: 1 }}>
                        <Typography>{blog.commentsCount || 0}</Typography>
                    </Grid>

                    <Grid item sx={{ px: 1 }}>
                        <Typography sx={{ fontSize: 11, color: '#444' }}>{blog.readTime} Min Read</Typography>
                    </Grid>
                    <Grid item sx={{ px: 1 }}>
                        <Button onClick={() => {
                            navigate(`/blogs/${blog.id}`)
                        }} sx={{ fontSize: 11, color: '#444' }}> Read More... </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12} lg={4}>
                <img height={100} src={blog.coverImage} alt='Blog' />
            </Grid>
            <Grid item sm={12} lg={12} md={12} >
                <Divider />
            </Grid>
        </Grid>
    </Grid>)
}

export default BlogCard