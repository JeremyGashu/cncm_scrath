import { ArrowUpwardOutlined, Facebook, Google, LinkedIn, Twitter } from "@mui/icons-material"
import { Divider, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import cncm_logo from '../assets/white logo.svg'
import { kGreenColor } from "../styles/colors"

const Footer = () => {
    return (
        <Box sx={{ mt: 3, p: 5, backgroundColor: '#1D212A' }}>
            <Grid sx={{}} container direaction='row' justifyContent='space-between' alignItems='start'>
                <Grid item sx={{ p: 1 }} lg={4}>
                    <img height={50} src={cncm_logo} alt='Logo' />
                    <Typography sx={{ color: '#C0C0C0', fotnSize: 14, my: 2 }}>
                        Our aim is to collaborate with CMO’s and other interested parties to ensure the collection of these rights are as efficient and streamlined as they can be and that all performers receive the income they are rightfully entitled to.
                    </Typography>
                    <Box sx={{ mx: 1 }}>
                        <Facebook sx={{ color: '#8B8D94' }} />
                        <Twitter sx={{ color: '#8B8D94' }} />
                        <LinkedIn sx={{ color: '#8B8D94' }} />
                        <Google sx={{ color: '#8B8D94' }} />
                    </Box>



                </Grid>
                <Grid item sx={{ p: 1, mb: 2 }}>
                    <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 'bold', mb: 4 }}>Useful Links </Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>About </Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>Our Story </Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>Proffessional Team </Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>Services </Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>Testimonies</Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>Copuright</Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, cursor: 'pointer' }}>Contacts</Typography>


                </Grid>
                <Grid item sx={{ p: 1 }}>
                    <Typography sx={{ color: 'white', fontSize: 18, fontWeight: 'bold', mb: 4 }}>Contact Us </Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, mb: 3 }}>Phone: +251 - 911 - 233 - 445</Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14 }}>Monday - Friday from 9.00 am to 8.00 pm</Typography>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 14, mb: 3 }}>Saturday from 10.00 am to 6.00 pm </Typography>
                    <p><Link href='mailto:info@cncm.com' sx={{ color: kGreenColor, fontSize: 14, textDecoration: 'none', cursor: 'pointer' }}>info@cncm.com </Link></p>
                    <Link href='mailto:support@cncm.com' sx={{ color: kGreenColor, fontSize: 14, textDecoration: 'none', cursor: 'pointer' }}>support@cncm.com </Link>

                </Grid>
            </Grid>

            <Divider color='#C0C0C0' sx={{ m: 2, color: 'white' }} />
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 12 }} >© 2021 <span style={{ color: kGreenColor }} >CNCM</span> - Copyright and neighboring right collective management society of Ethiopia.</Typography>

                </Grid>

                <Grid item>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 12 }} >Designed by <span style={{ color: kGreenColor }} >twoftime</span>  plc</Typography>

                </Grid>

                <Grid item>
                    <Typography sx={{ color: '#C0C0C0', fontSize: 12 }} >Back to top <ArrowUpwardOutlined sx={{ color: kGreenColor }} /></Typography>

                </Grid>


            </Grid>
        </Box>
    )
}

export default Footer