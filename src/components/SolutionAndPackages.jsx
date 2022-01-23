import { Box, Grid, Typography } from "@mui/material"
import { kGreenColor } from "../styles/colors"

const SolutionsAndPackages = () => {
    return (
        <Box sx={{ backgroundColor: 'black', p: 5, }}>
            <Grid container justifyContent='space-evenly' alignItems='center' gap={2}>
                <Grid item lg={5} sm={12} >
                    <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: kGreenColor }}>Solutions &amp; Packages</Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>CNCM provides the community support, debate and foster the work of all members</Typography>

                </Grid>

                <Grid item lg={3} sm={12} >

                    <Box sx={{ width: 280, height: 300, backgroundColor: 'white', borderRadius: 2, p: 2 }}>
                        <Typography sx={{ fontSize: 19, color: kGreenColor, fontWeight: 'bold', textAlign: 'center' }}>Allowing</Typography>
                        <Typography sx={{ fontSize: 20, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Endorsement</Typography>
                        <Typography sx={{ fontSize: 16, color: 'black', fontStyle: 'italic', textAlign: 'center' }}>Opportunities</Typography>

                        <Typography sx={{ fontSize: 12, mt: 3, color: '#555555', textAlign: 'center' }}>Our aim is to collaborate with CMO’s and other interested parties to ensure the collection of these rights are as efficient and streamlined as they can be and that all performers receive the income they are rightfully entitled to.
                        </Typography>



                    </Box>
                </Grid>

                <Grid item lg={3} sm={12}>
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