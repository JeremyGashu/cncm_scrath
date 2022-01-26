import { ArrowRight } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import community from '../assets/cccc.png'

const MemberAndCopyrightChecking = () => {
    return (
        <Grid container sx={{ px: 6, py: 6 }} alignItems='center' justifyContent='space-between'>
            <Grid item lg={6} sx={{ p: 3 }}>
                <img style={{ maxHeight: 300 }} src={community} alt='Community' />

            </Grid>
            <Grid item lg={6} sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 28 }}>MEMBER AND COPYRIGHT CHECKING</Typography>
                <Typography sx={{ fontSize: 15, mb: 5 }}>Check and confirm creative souls and their works here by entering Member ID and search</Typography>
                <Grid container>
                    <Grid item lg={8} sm={8}>
                        <TextField
                            sx={{ border: '1px solid #1DEF55', px: 3, py: 1, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, }}
                            variant="standard"
                            required
                            fullWidth
                            placeholder="Enter member ID or work title here"
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    </Grid>
                    <Grid item lg={4} sm={8}>
                        <Button endIcon={<ArrowRight sx={{color : 'white'}} />} sx={{ '&:hover': { backgroundColor: '#1DEF55' }, color: 'white',fontWeight : 'bold', backgroundColor: '#1DEF55', border: '1px solid #1DEF55', px: 3, py: 1.5, borderRadius: 0, borderTopRightRadius: 25, borderBottomRightRadius: 25, }}>Search</Button>
                    </Grid>
                </Grid>






                {/* <Grid container sx={{ py: 1, px: 2, backgroundColor: 'white', mt: 3 }} justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography sx={{ color: '#1DEF55', fontSize: 14, fontWeight: 'bold' }}>Download Brochure</Typography>
                        <Typography sx={{ color: 'black', fontSize: 14, fontWeight: 'bold' }}>Get in detail what we offer, we stand for your Royality</Typography>
                    </Grid>
                    <Grid item>
                        <Button sx={{
                            '&:hover': {
                                backgroundColor: '#1DEF55',
                            }, backgroundColor: '#1DEF55', color: 'black', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                        }}>Download Now</Button>
                    </Grid>
                </Grid> */}

            </Grid>
        </Grid>)
}

export default MemberAndCopyrightChecking