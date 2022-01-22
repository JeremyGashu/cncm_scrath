import { Box, Typography } from "@mui/material"


const MovieCard = ({ title, image }) => {
    return (
        <Box sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: 2, m: 2, width: 200, height: 320, backgroundColor: 'white', px: 3, py: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
            <img width={200} height={200} src={image} alt='What we cover' />
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#333333', pt: 3 }}>{title || ''}</Typography>
            <Typography sx={{ fontSize: 14, fontStyle: 'italic', color: '#333333', py: 3 }}>Keeping copyright &amp; Royality</Typography>

        </Box>
    )
}

export default MovieCard