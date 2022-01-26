import { Button, Grid, Typography } from "@mui/material"
import community from '../assets/community_coverage.svg'

const BuildingCommunityCoverage = () => {
    return (
        <Grid container sx={{ backgroundColor: '#1D212A', px: 6, py: 6 }}>
            <Grid item lg={6} sx={{ p: 3 }}>
                <img style={{ maxHeight: 300 }} src={community} alt='Community' />

            </Grid>
            <Grid item lg={6} sx={{ p: 3 }}>
                <Typography sx={{ color: '#1DEF55', fontWeight: 'bold', fontSize: 20 }}>We're Building a</Typography>
                <Typography sx={{ color: '#1DEF55', fontWeight: 'bold', fontSize: 38 }}>Community of Coverage</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>With provider copyright and neighboring right across the Ethiopia,
                </Typography>

                <Typography sx={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>our professionals are both personally invested in
                </Typography>

                <Typography sx={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>your case and well acquainted with local laws and regulations.
                </Typography>


                <Grid container sx={{ py: 1, px: 2, backgroundColor: 'white', mt: 3 }} justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography sx={{ color: '#1DEF55', fontSize: 14, fontWeight: 'bold',my:1 }}>Download Brochure</Typography>
                        <Typography sx={{ color: 'black', fontSize : 14, fontWeight : 'bold' ,my:1}}>Get in detail what we offer, we stand for your Royality</Typography>
                    </Grid>
                    <Grid item>
                        <Button sx={{
                            '&:hover': {
                                backgroundColor: '#1DEF55',
                            }, backgroundColor: '#1DEF55', color: 'black', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                        }}>Download Now</Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>)
}

export default BuildingCommunityCoverage