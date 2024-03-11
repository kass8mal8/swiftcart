import { Box, IconButton, Typography } from "@mui/material";
import Loader from "./Loader";
import { Add } from "@mui/icons-material"
import { useContext } from "react";
import { BagContext } from "../../../App";

const SalePreviewCard = ({ products }) => {
    const mapSkeleton = [1, 2, 3, 4, 5]
    const { bagCount, setBagCount } = useContext(BagContext)
  return (  
    <Box className='preview'>
      {products ? 
          products.map( product => (
            <Box key={product.id} className='card'>
              
                <img src={product.image} alt='product' width='150px' />
              
                <Box className='card-content'>
                    <Typography gutterBottom variant='h6' sx={{ marginTop: '20px', fontFamily: 'bold', fontSize: '15px'}}>
                    {product.title.slice(0, 20)}
                    </Typography>
                    <Typography gutterBottom variant='body2'  sx={{ fontSize: '18px', fontWeight: '600', color: 'gray' }}>
                    ${product.price}
                    </Typography>

                    <IconButton 
                      onClick={() => setBagCount(bagCount + 1)} 
                      sx={{ 
                        position: 'relative', 
                        top: '-48px', left: '60%',
                        height: '50px', width: '50px', 
                        padding: '10px',
                      }}
                    >
                        <Add sx={{ color: '#db3022' }} />
                    </IconButton>
                </Box>
            </Box>
              
          )) 
          : <>
                { mapSkeleton.map( (x, index) => (
                    <Loader />
                )) }
          </>
        }
    </Box>
  );
}
 
export default SalePreviewCard;
