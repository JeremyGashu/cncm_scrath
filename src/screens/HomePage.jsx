import React from 'react'
import HeaderComponenet from '../components/Header'
import HowWeGotStarted from '../components/HowWeGotStarted'
import Navbar from '../components/NavBar'
import OurPartners from '../components/OurPartners'
import OurWorks from '../components/OurWorks'
import ReadBlogs from '../components/ReadBlogs'
import SolutionsAndPackages from '../components/SolutionAndPackages'
import WhatWeCover from '../components/WhatWeCover'


const HomePage = () => {

    return (
        <>
            <Navbar />
            <HeaderComponenet />
            <ReadBlogs />
            <WhatWeCover />
            <HowWeGotStarted />
            <OurWorks />
            <SolutionsAndPackages />
            <OurPartners />
        </>
    )
}

export default HomePage