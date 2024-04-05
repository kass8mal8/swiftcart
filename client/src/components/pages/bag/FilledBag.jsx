import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Add, CancelRounded, CancelSharp, DoneOutlineTwoTone, Remove } from "@mui/icons-material";
import usePost from "../../hooks/usePost";
import { useState, useEffect, useContext } from 'react';
import useCountUpdate from "../../hooks/useAddToCart";
import useDelete from "../../hooks/useDelete";
import { AuthContext } from "../../../App";
import useFetch from "../../hooks/useFetch";
import EmptyCart from "./EmptyCart";
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

const FilledBag = ({ products }) => {
    const { auth: user } = useContext(AuthContext)  
    const { user_id } = user
    const [prods, setProds] = useState(products)
    const navigate = useNavigate()

    const arr = []
    products.forEach( product => {
        arr.push(product.count * product.price)
    })

    const totalPrice = arr.length && arr.reduce((a, b) => a + b)
    const queryClient = useQueryClient()
    const refetchProducts = () => queryClient.invalidateQueries(['products'])

    const handleFilter = async(id) => {
        const url = `http://localhost:5000/api/cart/update/${id}`

        try {
            const response = await initiateDelete(url)
            console.log(response.message)
            refetchProducts()
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const {initiateDelete} = useDelete()

    const handleCountUpdate = async(type, productId) => {
        const url = `http://localhost:5000/api/cart/update/${productId}`
        
        let newCount;
        let countIsOne = false;

        try {
            const newProds = [...prods].map((prod) => {
                if(prod._id === productId) {
                    // prod.count = type === 'add' ? (prod.count += 1) : prod.count === 1 ? prod.count : (prod.count -= 1);

                    if (type === 'add') {
                        prod.count = prod.count += 1
                    } 
                    else {
                        prod.count === 1 ? countIsOne = true : (prod.count -= 1)
                    }
                    newCount = prod.count;
                };

                return prod;
            });

            setProds(() => [...newProds])
            
            if(countIsOne) return;

            const postWithFetch = await fetch( url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({count: newCount})
            })
            const response = await postWithFetch.json()
            
            console.log(response)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    // const orderURI = 'http://localhost:5000/api/orders/place-order'
    // const { post } = usePost(orderURI)

    return (  
        <Box className='bag'>
            { prods.length ?  
            <>
            <Typography variant='h5' sx={{ fontWeight: 'bold', margin: '20px auto'}}>My Bag</Typography>
            { prods.map( product => ( 
                <Stack key={product._id} direction='row' spacing={2} mb={2} sx={{ justifyContent: 'space-between' }} className='card'>
                    <img src={product.image} alt='illustration' width='30%' />
                    <Box>
                        <Typography variant='body1' sx={{ fontWeight: '600', marginTop: '10px' }}>{product.title.slice(0, 15)}</Typography>
                        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', marginTop: '20px' }}>
                            <IconButton sx={{background: 'white'}} onClick={() => handleCountUpdate('minus', product._id)}> <Remove /> </IconButton>
                            <Typography sx={{fontSize: '16pt'}}> {product.count} </Typography>
                            <IconButton sx={{background: 'white'}} onClick={() => handleCountUpdate('add', product._id)}> <Add /> </IconButton>
                        </Stack>
                    </Box>
                    <Box>
                        <IconButton sx={{ marginTop: '10px' }} onClick={() => handleFilter(product._id)} > <CancelRounded /> </IconButton>
                        <Typography variant='body1' sx={{ marginTop: '15px', fontWeight: '600'}}>{product.price } </Typography>
                    </Box>
                </Stack>
            ))}
            <Stack direction='row' sx={{ justifyContent: 'space-between', margin: '30px auto' }}>
                <Typography color='text.secondary'>Total amount</Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>KES {totalPrice}</Typography>
            </Stack>
            <Button 
                className='checkout-btn' 
                variant="contained" 
                fullWidth 
                sx={{ marginBottom: '70px' }}
                onClick={() => navigate('/checkout')}
            > checkout 
            </Button>

            </> : <EmptyCart /> }
        </Box>
    );
}
 
export default FilledBag;