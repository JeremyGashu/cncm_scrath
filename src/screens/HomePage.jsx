import React from 'react'
import HeaderComponenet from '../components/Header'
import HowWeGotStarted from '../components/HowWeGotStarted'
import Navbar from '../components/NavBar'
import OurWorks from '../components/OurWorks'
import ReadBlogs from '../components/ReadBlogs'
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
        </>
    )
}

export default HomePage