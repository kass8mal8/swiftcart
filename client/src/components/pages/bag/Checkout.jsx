import { Box, IconButton, Paper, Stack, Typography, Button } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../../App";
import { ArrowBackIosNew } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";
import useDelete from "../../hooks/useDelete";

const Checkout = () => {
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const navigate = useNavigate()
    const url = `https://swiftcart-xdrc.onrender.com/api/cart/${user_id}`
    const orderURI = 'https://swiftcart-xdrc.onrender.com/api/orders/place-order'
    const deleteURI = `https://swiftcart-xdrc.onrender.com/api/cart/delete/${user_id}`
    const { data: products, loading, error } = useFetch(url)
    // const [checkoutProds, setCheckoutProds] = useState(products?.product || [])

    const { post } = usePost(orderURI)
    const { initiateDelete } = useDelete()
    const arr = [];
    if (products && products.product) {
        products.product.forEach((product) => {
            arr.push(product.count * product.price);
        });
    }

    const orderDetails = {
        items: products && products.product, user_id
    }
    console.log(orderDetails)
    const handleOrderSubmit = async(e) => {
        e.preventDefault()
        try {
            await post(orderDetails)
            await initiateDelete(deleteURI)

            navigate('/success')
        } catch (error) {
            console.log(error.message)
        }
    }

    const initialPrice = arr.length && arr.reduce( (a, b) => a + b)
    const fee = 10

    return (  
        <Box>
            <Stack 
                direction='row' 
                spacing={4} 
                alignItems='center' 
                sx={{ 
                    background: 'whitesmoke', 
                    width: '105%',
                    p: 2,
                    ml: '-20px',
                    mt: '-10px'
                }}
            >
                <IconButton onClick={() => navigate('/basket')}>
                    <ArrowBackIosNew />
                </IconButton>
                <Typography variant="h6" sx={{fontWeight: 'bold' }}>Checkout</Typography>
            </Stack>

            <Box my={3}>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Shipping address</Typography>
                <Paper sx={{ padding: '15px', marginTop: '10px', display: 'flex', flexFlow: 'row' }}>
                    <Stack>
                        <Typography variant="body1">{user.address[0]?.name}</Typography>
                        <Typography>{user.address[0]?.address}</Typography>
                        <Typography>{user.address[0]?.city}</Typography>
                    </Stack>
                    <Button sx={{ color: '#db342a', position: 'abolute', right: '-140px', top: '-25px', textTransform: 'lowercase' }}>change</Button>
                </Paper>
            </Box>

            <Box>
                <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body1" color='text.secondary'>Order</Typography>
                    <Typography>KES {initialPrice}</Typography>
                </Stack>

                <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body1" color='text.secondary'>Delivery</Typography>
                    <Typography>KES {fee}</Typography>
                </Stack>

                <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body1" color='text.secondary'>Summary</Typography>
                    <Typography>KES {initialPrice + fee}</Typography>
                </Stack>
            </Box>
            <Button 
                variant='contained' 
                disableElevation 
                fullWidth 
                className='btn'
                sx={{ 
                    background: "#db342a", 
                    marginTop: '30px' ,
                    padding: '10px',
                    textTransform: 'capitalize'
                }}
                onClick={handleOrderSubmit}
            >Submit order
            </Button>

            {/* { products?./product?.map( product => { arr.push(product.count * product.price) } ) } */}

        </Box>
    );
}
 
export default Checkout;