import moment from "moment"
import { Divider, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SuggestedCard = ({ blog }) => {
    const navigate = useNavigate()
    return (<div onClick={() => {
        navigate(`/blogs/${blog.id}`)
    }} >
        <Grid container sx={{mb:2, cursor : 'pointer'}}>
            <Grid container alignItems='center'>
                <Grid item sx={{ mx: 1 }}>
                    <Typography sx={{ fontSize: 13, color: '#444', fontWeight: 'bold' }} >{blog.blogger}</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{ fontSize: 11, color: '#444' }} >{moment(blog.createdAt.toDate()).fromNow()}</Typography>
                </Grid>
            </Grid>

            <Typography sx={{ fontSize: 14, color: '#444', fontWeight: 'bold', m: 1 }}>{blog.title}</Typography>
            <Divider />

        </Grid>
    </div>)
}

export default SuggestedCard