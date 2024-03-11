import { Avatar, Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import { useContext } from "react"
import { AddressContext, AuthContext } from "../../../App";
import { ArrowForwardIos, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Main = () => {
    const { auth: user } = useContext(AuthContext)
    const { address } = useContext(AddressContext)
    const navigate = useNavigate()
    console.log(address )
    
    return (  
        <Box className='profile'>
            <Stack direction='row' spacing={2} mb={4}>
                { user ? 
                    <>
                        <Avatar>{user.first_name[0]}</Avatar>
                        <Box>
                            <Typography variant='h5'> {`${user.first_name} ${user.surname}`}    </Typography>
                            <Typography variant='body2' color='text.secondary'> {user.email} </Typography>
                        </Box>
                        {/* <IconButton sx={{ position: 'absolute', right: '0' }}>
                            <Edit />
                        </IconButton> */}
                    </>
                : "" }
            </Stack>
            <Stack className='aside' direction='row'>
                <Box>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgb(49, 49, 49)' }}>My orders</Typography>
                    <Typography variant='body2' color='text.secondary'>See orders</Typography>
                </Box>

                <IconButton onClick={() => navigate('orders')}>
                    <ArrowForwardIos sx={{height: '20px'}} />
                </IconButton>
            </Stack>
            <Divider />
            <Stack className='aside' direction='row'>
                <Box>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgb(49, 49, 49)' }}>Shipping address</Typography>
                    <Typography variant='body2' color='text.secondary'>
                        { user.address.length ? `${user.address[0].address} ${user.address[0].city}` : Object.keys(address).length ? `${address.address} ${address.city}` : "Not Specified" }
                    </Typography>
                </Box>

                <IconButton onClick={() => navigate('address')}>
                    <ArrowForwardIos sx={{height: '20px'}} />
                </IconButton>
            </Stack>
            <Divider />
            <Stack className='aside' direction='row'>
                <Box>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgb(49, 49, 49)' }}>Payment methods</Typography>
                    <Typography variant='body2' color='text.secondary'>Not set up</Typography>
                </Box>

                <IconButton>
                    <ArrowForwardIos sx={{height: '20px'}} />
                </IconButton>
            </Stack>

        </Box>
    );
}
 
export default Main;