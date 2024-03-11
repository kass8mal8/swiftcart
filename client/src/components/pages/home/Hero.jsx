import { Box, Button, Typography } from "@mui/material";
import banner from "../../../assets/images/Small banner.png"

const Hero = () => {
    return (  
        <Box className='hero'>
            <img src={banner} alt='banner' />
            <Box className='hero-text'>
                <Typography variant='h2' sx={{ fontWeight: '700' }}>Street wear</Typography>
            </Box>
            
        </Box>
    );
}
 
export default Hero;