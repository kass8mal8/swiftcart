import { Add } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext, BagContext } from "../../App";
import usePost from "../hooks/usePost";
import useAddToCart from "../hooks/useAddToCart";

const ProductList = ({ products }) => {
    const { auth: user } = useContext(AuthContext)

    const { addToCart } = useAddToCart()

    return (  
        <Grid container spacing={2} >
            { products?.map( product => (
                <Grid xs={6} sm={6} key={product.id} >
                        <Card sx={{marginLeft: '8px', marginBottom: '10px'}}>
                        <CardMedia 
                            component='img'
                            height='150'
                            image={product.image}
                            alt={product.title}
                        />
                        <CardContent>
                            <Stack direction='row'>
                                <Box>
                                    <Typography variant='body2' color='text.secondary' sx={{fontWeight: 'bold'}} >{product.title?.slice(0, 26)}</Typography>
                                    <Typography variant='h6' gutterbottom sx={{fontWeight: 'bold'}}>Ksh {product.price}</Typography>
                                </Box>
                                <IconButton  onClick={() => addToCart(product, user)} sx={{ background: 'whitesmoke', height: '50px', width: '50px', padding: '10px',  marginTop: '-40px' }} >
                                    <Add sx={{ color: '#db3022' }} />
                                </IconButton>
                            </Stack>
                        </CardContent>
                        
                    </Card>
                </Grid>
            )) }
        </Grid>
    );
}
 
export default ProductList;