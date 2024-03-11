import { Box, Button } from "@mui/material";
import bag from "../../../assets/images/bags.png"
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate()
    return (  
        <Box sx={{ alginItems: 'center', textAlign: 'center', marginTop: '30px' }}>
            <img src={bag} width='100%' alt="bags" />
            <Button 
                variant='contained'
                disableElevation
                fullWidth
                sx={{
                    background: '#db342a',
                    marginTop: '20px',
                    textTransform: 'capitalize',
                    borderRadius: '20px'
                }}
                onClick={() => navigate('/shop')}
            >Continue shopping
            </Button>
        </Box>
    );
}
 
export default Success;