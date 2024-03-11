import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ShippingForm from "./ShippingForm";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const navigate = useNavigate()

    return (  
        <Box className='shipping'>
            <Stack 
                className='header' 
                spacing={2} 
                direction='row' 
                alignItems='center'
                mt={3}
                ml={-1}
            >
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBackIosNew />
                </IconButton>
                <Typography variant='h6' fontWeight='bold'>
                    Add Shipping Address
                </Typography>
            </Stack>
            <ShippingForm />
        </Box>
    );
}
 
export default Shipping;