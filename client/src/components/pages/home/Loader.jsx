import { Skeleton, Stack, Box } from '@mui/material'
import { useLocation } from "react-router-dom"

const Loader = () => {
    const location = useLocation()
    return ( 
        <Stack className='card' spacing={1} sx={{height: '300px' }}>
            <Skeleton 
                variant='rectangle'
                animation='wave'
                width= {location.pathname === '/shop' ? '185px' : '160px'}
                height='200px'
                
            />
            <Box className='card-content'>
                <Skeleton variant='text' width='140px'  />
                <Skeleton variant='text' width={location.pathname === "/shop" ? "60px" : '90px'} />
                <Skeleton variant='text' width={location.pathname === '/shop' ? "110px" : '40px'}  />
            </Box>
            
        </Stack>
     );
}
 
export default Loader;