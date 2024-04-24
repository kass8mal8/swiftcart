import { Box, Stack, Typography, Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import EmptyCart from "../bag/EmptyCart";

const Orders = () => {
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = `https://swiftcartnpm.onrender.com/api/orders/${user_id}`
    const fetchOrders = async() => {
        const res = await axios.get(url)
        console.log(res)
        if(res.status === 200) return res.data
    }

    const { data: orders, loading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders
    })

    const arr = []
    if(orders && orders.order.length && orders.order[0].items) {
        console.log(orders.order[0])
        orders.order[0].items.forEach( item => {
            arr.push(item.count * item.price)
        })
    }

    const itemPrice = arr.length && arr.reduce( (a, b) => a + b)

    return ( 
        <Box className='orders'>
            { orders?.order.length ?
                orders.order.map( order => (
                    <Box key={order._id}>
                        <Box sx={{ marginBottom: '30px' }}>
                            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Order No: {order.order_number}</Typography>
                                <Typography variant="body1" sx={{color: 'red' }}>{order.order_status}</Typography>
                            </Stack>
                            <Typography variant='body2' color='text.secondary'>{order.createdAt.slice(0, 10)}</Typography>
                            
                        </Box>

                        <Typography variant='body2' sx={{ fontWeight: '600' }}>{order.items.length} Items</Typography>
                        { order.items && order.items?.map( item => (
                            <Box key={item._id} sx={{ margin: '10px auto', background: 'whitesmoke', borderRadius: '5px' }}>
                                <Stack direction='row' spacing={2}>
                                    <img src={item.image} alt="an item" width='25%' />
                                    <Box sx={{ paddingBlock: '10px' }}>
                                        <Typography variant='body2' sx={{ fontWeight: '600' }}>{item.title.slice(0, 35)}</Typography>
                                        <Typography variant="body2">Units: {item.count}</Typography>
                                        <Typography variant="body2">KES {item.price}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        ))}

                        <Box sx={{ marginTop:'20px', marginBottom: '20px' }}>
                            <Typography variant="body2" sx={{ fontWeight: '600', marginBottom: '10px' }}>Order Information</Typography>
                            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color='text.secondary'>Shipping Address</Typography>
                                <Typography variant='body2'>{`${user.address[0].address}, ${user.address[0].city} `}</Typography>
                            </Stack>
                            <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" color='text.secondary'>Total Amount</Typography>
                                <Typography variant='body2'>KES {itemPrice + 10}</Typography>
                            </Stack>
                        </Box>
                        <Stack direction='row' spacing={2} sx={{marginBottom: '70px', marginTop: '20px'}}>
                            <Button 
                                variant='outlined'
                                disableElevation
                                fullWidth
                                sx={{
                                    borderRadius: '20px',
                                    textTransform: 'capitalize',
                                    color: 'black',
                                    borderColor: 'black'
                                }}
                            >reorder
                            </Button>
                            <Button 
                                variant='contained' 
                                disableElevation
                                fullWidth
                                sx={{
                                    background:'#db342a',
                                    borderRadius: '20px',
                                    textTransform: 'capitalize'
                                }}
                            >leave feedback
                            </Button>
                        </Stack>

                    </Box>
                )) : <EmptyCart />
            }
        </Box>
    );
}
 
export default Orders;