import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material'
import { Box, Grid, IconButton, } from '@mui/material'
import React from 'react'
import BuildingCommunityCoverage from '../components/BuildingCommunityCoverage'
import Footer from '../components/Footer'
import HeaderComponenet from '../components/Header'
import HowWeGotStarted from '../components/HowWeGotStarted'
import MemberAndCopyrightChecking from '../components/MemberAndCopyright'
import Navbar from '../components/NavBar'
import OurPartners from '../components/OurPartners'
import OurWorks from '../components/OurWorks'
import ReadBlogs from '../components/ReadBlogs'
import SolutionsAndPackages from '../components/SolutionAndPackages'
import WhatWeCover from '../components/WhatWeCover'
import { kGreenColor } from '../styles/colors'

const HomePage = () => {

    return (
        <Box sx={{ position: 'relative' }}>
            <Navbar />
            <HeaderComponenet />
            <ReadBlogs />
            <WhatWeCover />
            <HowWeGotStarted />
            <OurWorks />
            <SolutionsAndPackages />
            <OurPartners />
            <BuildingCommunityCoverage />
            <MemberAndCopyrightChecking />
            <Footer />
            <Grid container direction='column' sx={{ position: 'fixed', left: '0px', bottom: '50%', backgroundColor: kGreenColor, width: '50px', transform: 'translate(0, 50%)' }} alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <IconButton onClick={() => {
                        window.open('https://www.facebook.com/profile.php?id=100073732779523')
                    }} ><Facebook sx={{ color: 'white' }} /></IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => {
                        window.open('https://www.instagram.com/cmoethiopia/')
                    }}><Instagram sx={{ color: 'white' }} /></IconButton>
                </Grid>

                <Grid item>
                    <IconButton onClick={() => {
                        window.open('https://twitter.com/CmoEthiopia/media')
                    }}><Twitter sx={{ color: 'white' }} /></IconButton>
                </Grid>

                <Grid item>
                    <IconButton onClick={() => {
                        window.open('https://www.linkedin.com/in/cmo-ethiopia-a406b7223/')
                    }}><LinkedIn sx={{ color: 'white' }} /></IconButton>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => {
                        window.open('https://www.youtube.com/channel/UCgrSCMrakq8iZgbR0A2HscA')
                    }}><YouTube sx={{ color: 'white' }} /></IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomePage