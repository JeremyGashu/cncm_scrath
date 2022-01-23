import { Box, Typography } from "@mui/material"

const WhatWeStandForCard = ({ image, title, text }) => {
    return <Box sx={{  borderRadius: 2, m: 2, width: 300, height: 400, backgroundColor: 'white', px: 3, py: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', }}>
        <img width={130} height={130} src={image} alt='What we cover' />
        <Typography sx={{ fontSize: 15, fontWeight: 'bold', color: 'black', py: 3 }}>{title || ''}</Typography>
        <Typography sx={{ textAlign: 'center', fontSize: 13, color: '#444444' }}>{text || ''}</Typography>
        {/* <Box sx={{ width: 30, my: 3, height: 3, backgroundColor: '#1D212A', borderRadius: 4 }}>

        </Box> */}
    </Box>
}

export default WhatWeStandForCard