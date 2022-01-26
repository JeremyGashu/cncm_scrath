import { Box, Typography } from "@mui/material"

const WhatWeCoverCard = ({ image, title, text }) => {
    return <Box sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: 2, m: 1, width: 220, height: 310, backgroundColor: 'white', px: 2, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
        <img width={60} height={60} src={image} alt='What we cover' />
        <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: '#333333', py: 3 }}>{title || ''}</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: 14, color: '#555555' }}>{text || ''}</Typography>
        <Box sx={{ width: 30, my: 3, height: 3, backgroundColor: '#1D212A', borderRadius: 4 }}>

        </Box>
    </Box>
}

export default WhatWeCoverCard