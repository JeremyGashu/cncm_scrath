import { Box, CircularProgress} from '@mui/material'
import React from 'react'

const FullPageLoading = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', }} >
            <CircularProgress size={100} />
        </Box>
    );
}


export default FullPageLoading