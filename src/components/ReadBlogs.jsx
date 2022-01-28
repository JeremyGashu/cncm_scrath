import { Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import blog_image from '../assets/blogs_image.png'

const ReadBlogs = () => {
    const navigate = useNavigate()
    return (<Grid container alignItems='center' justifyContent='space-between' sx={{ textAlign: "center", p: 6, backgroundColor: '#f5f5f5' }}>
        <Grid item lg={5} sx={{pl:1}}>

            <img style={{ maxHeight: 450 }} src={blog_image} alt="" />
        </Grid>
        <Grid item lg={5} sx={{pl:1}}>
            <Typography sx={{ color: 'black', textAlign: 'left', fontWeight: 'bold', fontSize: 35 }} >BLOG</Typography>
            <Typography sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: 20, color: '#00B80C', marginBottom: 2 }}>Don't Miss out Useful Blog Posts</Typography>
            <Typography sx={{ fontWeight: 'normal', textAlign: 'left', fontSize: 22, }}>Easily connect and get access to all our</Typography>
            <Typography sx={{ fontWeight: 'normal', textAlign: 'left', fontSize: 22, mb: 2 }}> useful and amazing blog posts</Typography>

            <p onClick={() => { navigate('/blogs') }} style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', cursor: 'pointer', width: '150px', textAlign: 'left', textDecoration: 'none', borderRadius: 5, fontSize: 14, fontWeight: 'bold', color: 'white', padding: '10px 35px 10px 35px', backgroundColor: '#00B80C' }}  >Read Blogs</p>

        </Grid>
    </Grid >)
}

export default ReadBlogs