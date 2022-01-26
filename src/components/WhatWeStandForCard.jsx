import { Box, Typography } from "@mui/material"

const WhatWeStandForCard = ({ image, title, text }) => {
    return <Box sx={{ borderRadius: 2, m: 1, width: 300, height: 330, backgroundColor: 'white', px: 3, py: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', }}>
        <img height={100} src={image} alt='What we stand for' />
        <Typography sx={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{title || ''}</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: 13, color: '#444444' }}>{text || ''}</Typography>
        {/* <Box sx={{ width: 30, my: 3, height: 3, backgroundColor: '#1D212A', borderRadius: 4 }}>

        </Box> */}
    </Box>
}

export default WhatWeStandForCard