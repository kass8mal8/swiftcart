import { Box, Button, Stack, Typography } from "@mui/material";
import Hero from "./Hero";
import useFetch from "../../hooks/useFetch";
import SalePreviewCard from "./SalePreviewCard";
import NewPreview from "./NewPreview";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const url = 'https://fakestoreapi.com/products?limit=4'
    const { data, error, loading } = useFetch(url)
    const navigate = useNavigate()

    console.log(data)
    return (  
        <Box className='home'>
            <Hero />
            <Box className='new'>
                <Stack direction='row' justifyContent='space-between'>
                    <Box>
                        <Typography variant='h4' sx={{ fontWeight: '600' }}>New</Typography>
                        <Typography variant='body2' color='text.secondary'>You have never seen it before!</Typography>
                    </Box>

                    <Button 
                        onClick={() => navigate('/shop')}
                        sx={{ 
                            textTransform: 'lowercase', 
                            fontSize: '18px', 
                            color: 'black',
                            borderRadius: '40px',
                        }}>
                        View all
                    </Button>
                </Stack>
                <SalePreviewCard products={data} />
            </Box>
            <Box>
            <Stack direction='row' justifyContent='space-between'>
                    <Box>
                        <Typography variant='h4' sx={{ fontWeight: '600' }}>Sale</Typography>
                        <Typography variant='body2' color='text.secondary'>Super sales</Typography>
                    </Box>

                    <Button 
                        onClick={() => navigate('/shop')}
                        sx={{ 
                            textTransform: 'lowercase', 
                            fontSize: '18px', 
                            color: 'black',
                            borderRadius: '40px',
                        }}>
                        View all
                    </Button>
                </Stack>
                <NewPreview products={data} /> 
            </Box>
        </Box>
    );
}
 
export default Home;