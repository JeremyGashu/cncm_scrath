import { Box, Grid, Typography } from "@mui/material"
import { kGreenColor } from "../styles/colors"
import '../styles/search_bar.css'

const SolutionsAndPackages = () => {
    return (
        <Box id='solutions' sx={{ backgroundColor: 'black', p: 5, }}>
            <Grid container justifyContent='center' alignItems='center' gap={2}>
                <Grid item lg={4} md={4} sx={{ p:2, m: 2 }}>
                    <Typography sx={{ fontSize: 37, fontWeight: 'bold', color: '#1DEF55' }}>Solutions &amp; Packages</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>CNCM provides the community</Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>support, debate and foster the work </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>all members</Typography>

                </Grid>

                <Grid item lg={3} md={3} sx={{ p: 3, m: 1 }}>
                    <Box sx={{ width: 280, height: 300, backgroundColor: 'white', borderRadius: 2, p: 2 }}>
                        <Typography sx={{ fontSize: 19, color: kGreenColor, fontWeight: 'bold', textAlign: 'center' }}>Allowing</Typography>
                        <Typography sx={{ fontSize: 20, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Endorsement</Typography>
                        <Typography sx={{ fontSize: 16, color: 'black', fontStyle: 'italic', textAlign: 'center' }}>Opportunities</Typography>
                        <Typography sx={{ fontSize: 12, mt: 3, color: '#555555', textAlign: 'center' }}>Our aim is to collaborate with CMO’s and other interested parties to ensure the collection of these rights are as efficient and streamlined as they can be and that all performers receive the income they are rightfully entitled to.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item md={3} lg={3} sx={{ p: 3, m: 1 }}>
                    <Box sx={{ width: 280, height: 300, backgroundColor: 'white', borderRadius: 2, p: 2 }}>
                        <Typography sx={{ fontSize: 19, color: kGreenColor, fontWeight: 'bold', textAlign: 'center' }}>Allowing</Typography>
                        <Typography sx={{ fontSize: 20, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Endorsement</Typography>
                        <Typography sx={{ fontSize: 16, color: 'black', fontStyle: 'italic', textAlign: 'center' }}>Opportunities</Typography>
                        <Typography sx={{ fontSize: 12, mt: 3, color: '#555555', textAlign: 'center' }}>Our aim is to collaborate with CMO’s and other interested parties to ensure the collection of these rights are as efficient and streamlined as they can be and that all performers receive the income they are rightfully entitled to.
                        </Typography>



                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
export default SolutionsAndPackages