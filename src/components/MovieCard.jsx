import { Box, Typography } from "@mui/material"


const MovieCard = ({ title, image }) => {
    return (
        <Box sx={{ borderRadius: 2, width: 250, height: 350, backgroundColor: 'white', px: 3, py: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
            <img width={250} height={200} src={image} alt='What we cover' />
            <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#333333'}}>{title || ''}</Typography>
            <Typography sx={{ fontSize: 14, fontStyle: 'italic', color: '#333333' }}>Keeping copyright &amp; Royality</Typography>

        </Box>
    )
}

export default MovieCard