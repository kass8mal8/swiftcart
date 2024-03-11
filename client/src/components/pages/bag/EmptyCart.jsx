import { Box, Typography } from "@mui/material";
import nothing from "../../../assets/images/nothing.jpg"

const EmptyCart = () => {
    return (  
        <Box sx={{ textAlign: 'center', marginTop: '40%' }}>
            <img src={nothing} alt="nothing" width="80%" />
            <Typography variant='body2'>
                You have nothing here at the moment!
            </Typography>
        </Box>
    );
}
 
export default EmptyCart;