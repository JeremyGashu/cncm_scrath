import { Box, Button, Grid, Typography } from "@mui/material"
import MovieCard from "./MovieCard"
import blog_image from '../assets/blog_image.svg'
import WhatWeStandForCard from "./WhatWeStandForCard"


const OurWorks = () => {
    return (
        <Box >
            <Grid container sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <Typography sx={{ color: '#333333', fontSize: 30, fontWeight: 'bold' }}>OUR WORKS</Typography>
                    <Typography sx={{ color: '#1DEF55', fontSize: 20, fontWeight: 'bold' }}>Cases we handled</Typography>
                </Grid>

                <Grid item>
                    <Button sx={{ color: 'black', fontSize: 12, backgroundColor: 'white', mx: 1, '&:hover': { backgroundColor: 'white' } }} >All</Button>

                    <Button sx={{ color: 'black', fontSize: 12, backgroundColor: '#1DEF55', mx: 1, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', '&:hover': { backgroundColor: '#1DEF55' } }} >Film</Button>
                    <Button sx={{ color: 'black', fontSize: 12, backgroundColor: 'white', mx: 1, '&:hover': { backgroundColor: 'white' } }} >Music</Button>

                    <Button sx={{ color: 'black', fontSize: 12, backgroundColor: 'white', mx: 1, '&:hover': { backgroundColor: 'white' } }} >Author</Button>

                    <Button sx={{ color: 'black', fontSize: 12, backgroundColor: 'white', mx: 1, '&:hover': { backgroundColor: 'white' } }} >Performace</Button>

                </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='space-evenly' alignItems='center'>
                <Grid item>
                    <MovieCard title='Title' image={blog_image} />
                </Grid>
                <Grid item>
                    <MovieCard title='Title' image={blog_image} />                </Grid><Grid item>
                    <MovieCard title='Title' image={blog_image} />                </Grid><Grid item>
                    <MovieCard title='Title' image={blog_image} />                </Grid><Grid item>
                    <MovieCard title='Title' image={blog_image} />                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, mb: 3 }} ><Button sx={{ textAlign: 'center', color: 'black', fontSize: 12, fontWeight: 'bold', backgroundColor: '#1DEF55', mx: 1, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', '&:hover': { backgroundColor: '#1DEF55' } }} >View more projects</Button>
            </Box>

            <Typography sx={{ fontSize: 48, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>WHAT WE STAND FOR</Typography>
            <Typography sx={{ fontSize: 18, color: '#1DEF55', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>CNCM provides the community support, debate and foster the work of all members</Typography>


            <Grid container direction='row' justifyContent='space-evenly' alignItems='center'>
                <Grid item>
                    <WhatWeStandForCard title='ROYALITY' image={blog_image} text='Handling issues related with Royalties of Ethiopian art works, handing over Royalty issues to the court process &amp; properly executing the Judgement process.' />
                </Grid>

                <Grid item>
                    <WhatWeStandForCard title='COLLABORATION' image={blog_image} text='We work and collaborate with companies &amp; associations like us and also with Government and Non Government Organizations.' />
                </Grid>

                <Grid item>
                    <WhatWeStandForCard title='OWNERSHIP' image={blog_image} text='We help the signage process of property ownership and getting legal enforcement of infringements to get justice.' />
                </Grid>

            </Grid>

        </Box>

    )
}

export default OurWorks