import { Box, Grid, Typography } from "@mui/material"
import WhatWeCoverCard from "./WhatWeCoverCard"
import blog_image from '../assets/blog_image.svg'


const HowWeGotStarted = () => {
    return (
        <Box sx={{ backgroundColor: '#1D212A', pt: 5 }}>
            <Grid sx={{ position: 'relative', bottom: '200px' }} container direction='row' justifyContent='space-evenly' alignItems='center'>
                <Grid item>
                    <WhatWeCoverCard title='Music' image={blog_image} text='Keeping the ownership of music production and giving rights for cover artists' />
                </Grid>
                <Grid item>
                    <WhatWeCoverCard title='Theatre &amp; Drama' image={blog_image} text='Giving the right credit for theaters &amp; drama plays, making it able to broadcast &amp; show again.' />
                </Grid>
                <Grid item>
                    <WhatWeCoverCard title='Literature' image={blog_image} text='Copyright of authors and distributors related rights' />
                </Grid>
                <Grid item>
                    <WhatWeCoverCard title='AudioVisual &amp; Film' image={blog_image} text='Keeping the right to creators of creative audiovisual &amp; film industry' />
                </Grid>
                <Grid item>
                    <WhatWeCoverCard title='Photography' image={blog_image} text='Keeping the royalty of photo shoots and related rights for reusers' />
                </Grid>
            </Grid>

            <Grid container sx={{ position: 'relative', bottom: '200px', m: 3, p: 3 }} justifyContent='space-evenly' alignItems='center'>
                <Grid item sm={12} lg={2}>
                    <img src={blog_image} />
                </Grid>

                <Grid item sm={12} lg={7} sx={{ px: 5 }}>
                    <Typography sx={{ color: '#1DEF55', fontSize: 24, fontWeight: 'bold' }}>HOW WE STARTED</Typography>
                    <Typography sx={{ color: '#6B6B6B', fontSize: 40, fontWeight: 'bold' }}>How We Got CNCM here?</Typography>
                    <Typography sx={{ color: '#FFFFFF', fontSize: 17 }}>CNCM's mission is to be the focal point for education and advocacy of copyright and neighboring rights, to provide a community for those working in this segment of industries.</Typography>

                    <Typography sx={{ color: '#FFFFFF', fontSize: 17, mt: 3 }}>Although the Rome Treaty has enabled neighbouring and related rights to be a source of income for performers living in any country that has been a signatory since 1961, this income stream has always played second fiddle to copyright owners (labels)</Typography>
                </Grid>

                <Grid item sm={12} lg={3}  sx={{ px: 5 , mt : 2}} >
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>16 <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Individuals</span> </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#1DEF55', mb: 3 }} >LEGAL FIRM MEMBERS</Typography>


                    <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>5+ <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Years</span> </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#1DEF55', mb: 3 }} >YEARS IN THE INDUSTRY</Typography>


                    <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>100+ <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Cases</span> </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#1DEF55', mb: 3 }} >LEGAL CASES HANDLED SUCCESSFULLY</Typography>
                </Grid>


            </Grid>
        </Box>
    )
}

export default HowWeGotStarted