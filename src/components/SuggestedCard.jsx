import moment from "moment"
import { Divider, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import { BlogContext } from "../contexts/blogcontext"
import { getAuthorName } from "../controllers/wordpress/posts"
import { useEffect } from "react"
import { useState } from "react"

const SuggestedCard = ({ blog }) => {
    const [selectedBlog, setSelectedBlog] = useContext(BlogContext)
    const navigate = useNavigate()
    const [author, setAuthor] = useState()
    useEffect(() => {


        if (selectedBlog) {
            getAuthorName(selectedBlog.author).then(res => {
                setAuthor(res)
            })
        }

        return () => {

        }
    }, [selectedBlog])
    return (<div style={{marginBottom : 20}} onClick={() => {
        setSelectedBlog(blog)
        navigate('/blogs-wp')
    }} >

        <Grid container sx={{cursor: 'pointer' }}>
            <Grid container alignItems='center'>
                <Grid item sx={{ mx: 1 }}>
                    <Typography sx={{ fontSize: 13, color: '#444', fontWeight: 'bold' }} >{author}</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ fontSize: 11, color: '#444' }} >{moment(blog.date).fromNow()}</Typography>
                </Grid>
            </Grid>

            <Typography sx={{ fontSize: 14, color: '#444', fontWeight: 'bold', m: 1 }}>{blog.title.rendered}</Typography>
            

        </Grid>
        <Divider color='white' />
    </div>)
}

export default SuggestedCard