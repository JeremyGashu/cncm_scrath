import { Box, Typography } from "@mui/material"

const WhatWeCover = () => {
    return (
        <Box sx={{mb:30, p:1}}>
            <Typography sx={{ fontSize: 48, fontWeight: 'bold', color: '#333333', textAlign: 'center' }}>What We Cover</Typography>
            <Typography sx={{ fontSize: 22, fontWeight: 'bold', color: '#1DEF55', textAlign: 'center' }}>We're taking legal representation for different sectors</Typography>
        </Box>
    )
}

export default WhatWeCover