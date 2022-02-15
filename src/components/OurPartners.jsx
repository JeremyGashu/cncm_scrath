import { Box, Grid, Typography } from "@mui/material"
import nahom from '../assets/nahom.png'
import twof from '../assets/twof.svg'
import sewasew from '../assets/sewasew.png'
import omni from '../assets/omni.svg'


const OurPartners = () => {
    return (
        <Box id='becomePartner' sx={{ p: 3, mt: 4 }}>
            <Typography sx={{ fontSize: 37, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>OUR PARTNERS</Typography>

            <Grid sx={{ mb: 2 }} container direction='row' justifyContent='space-evenly' alignItems='center' gap={1}>
                <Grid item>
                    <img width={100} height={100} src={nahom} alt='Nahom' />
                </Grid>
                <Grid item>
                    <img width={100} height={100} src={sewasew} alt='Nahom' />
                </Grid>
                <Grid item>
                    <img width={100} height={100} src={twof} alt='Nahom' />
                </Grid>
                <Grid item>
                    <img width={100} height={100} src={omni} alt='Nahom' />
                </Grid>
                <Grid item>
                    <img width={100} height={100} src={sewasew} alt='Nahom' />
                </Grid>

            </Grid>
        </Box>
    )
}

export default OurPartners