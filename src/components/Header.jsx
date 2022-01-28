import { Box, Button, Grid, Typography } from "@mui/material"
import image from '../assets/singer.png'
import { kGreenColor } from "../styles/colors"


const HeaderComponenet = () => {
    return <Box sx={{ backgroundImage: `url(${image})`, backgroundColor: '#f0f0f0', backgroundBlendMode: 'multiply', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100vw', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 3 }}>
        <Typography sx={{ textAlign: 'center', color: '#1DEF55', fontWeight: 'bold', fontSize: 24 }}>WORKING TOGETHER FOR</Typography>

        <Typography sx={{ textAlign: 'center', fontSize: 38, color: 'white', fontWeight: 'bold', pl: 2 }}>
            COPYRIGHT &amp; NEIGHBORING RIGHTS
        </Typography>

        <Typography sx={{ textAlign: 'center', fontSize: 16, color: 'white', pt: 2, pl: 2 }}>
            We are a society standing for copyrights &amp; Neighboring rights for the creative
        </Typography>

        <Typography sx={{ textAlign: 'center', fontSize: 16, color: 'white', pl: 2, mb: 1 }}>
            industry over all the country, striving to attain a well mannered society avoiding stilling minds.
        </Typography>

        <Grid container justifyContent='center' alignItems='center' gap={4}>
            <Grid item>
                <Button sx={{ color: 'black', backgroundColor: '#1DEF55', px: 4, py: 1, '&:hover': { backgroundColor: kGreenColor } }}>View More</Button>
            </Grid>
            <Grid item>
                <Button sx={{ color: 'white', border: '1px solid white', backgroundColor: 'transparent', px: 4, py: 1, '&:hover': { backgroundColor: 'transparent' } }}>Contact Us</Button>
            </Grid>
        </Grid>
    </Box>
}

export default HeaderComponenet