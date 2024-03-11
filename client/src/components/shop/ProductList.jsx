import { Add } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext, BagContext } from "../../App";
import usePost from "../hooks/usePost";

const ProductList = ({ products }) => {
    const url = 'http://localhost:5000/api/cart/add'
    const { bagCount, setBagCount } = useContext(BagContext)
    const { post, error } = usePost(url)
    const { auth: user } = useContext(AuthContext)
    const [isClicked, setIsClicked] = useState(false)

    const addToCart = async(product) => {
        setIsClicked(true)
        const productDetails = {
            user_id: user.user_id,
            title: product.title,
            price: product.price,
            description: product.description,
            image: product.image,
            count: 1
        }

        console.log(productDetails)

        try {
            const response = await post(productDetails)
            if(!error && response) {
                console.log(response)
                setBagCount(bagCount + 1)
            }
            else {
                setIsClicked(false)
                console.log("Could not complete that action")
            }
        } catch (error) {
            setIsClicked(false)
            console.log(error.message)
        }
    }
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
                                    <Typography variant='h6' gutterbottom sx={{fontWeight: 'bold'}}>${product.price}</Typography>
                                </Box>
                                <IconButton  onClick={() => addToCart(product)} sx={{ background: 'whitesmoke', height: '50px', width: '50px', padding: '10px',  marginTop: '-40px' }} >
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