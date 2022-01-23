import { Box, Grid, Typography } from "@mui/material"
import nahom from '../assets/nahom.png'
import twof from '../assets/twof.svg'
import sewasew from '../assets/sewasew.png'
import omni from '../assets/omni.svg'


const OurPartners = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 40, color: '#555555', fontWeight: 'bold', textAlign: 'center' }}>Our Partners</Typography>

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