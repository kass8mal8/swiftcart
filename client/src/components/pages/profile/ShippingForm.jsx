import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import usePost from "../../hooks/usePost";
import { useState, useContext, useEffect } from 'react';
import { AddressContext, AuthContext } from "../../../App";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query"

const ShippingForm = () => {
    const [shipDetails, setShipDetails] = useState({})
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = 'https://swiftcart-xdrc.onrender.com/api/address/add'
    const userEditURI = `https://swiftcart-xdrc.onrender.com/api/users/edit/${user_id}`
    const { post, loading, error } = usePost(url)
    const navigate = useNavigate()
    const { setAddress } = useContext(AddressContext)

    const handleChange = (e) => {
        setShipDetails({
            ...shipDetails, [e.target.name]: e.target.value
        })
        setAddress({
            ...shipDetails, [e.target.name]: e.target.value
        })
        console.log(address)

    }

    const name = `${user.first_name} ${user.surname}`
    useEffect(() => {
        setShipDetails({...shipDetails, user_id, name})
    }, []);

    const queryClient = useQueryClient()
    const refetchUser = () => queryClient.invalidateQueries(['users'])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const address = [shipDetails]
        console.log("Address:", address)

        try {
            const response = await post(shipDetails)
            const editUserAddress = await axios.put(userEditURI, {address} )
            const result = await editUserAddress.data

            refetchUser()
            navigate('/profile')
        } catch (error) {
            console.log(error.message)
        }
    }

    
    
    return (  
        <form style={{ marginTop: '30px' }} onSubmit={handleSubmit}>
            <TextField 
                name='name' 
                label='Full name' 
                type='text' 
                fullWidth 
                sx={{ my: 1.5 }} 
                value={`${user.first_name} ${user.surname}`}
            />
            <TextField name='address' label='Address' type='text' fullWidth sx={{ my: 1.5 }} onChange={handleChange} />
            <TextField name='city' label='City' type='text' fullWidth sx={{ my: 1.5 }} onChange={handleChange} />
            <TextField 
                name='telephone'
                label='Phone number' 
                type='telephone' 
                fullWidth 
                sx={{ my: 1.5 }} 
                InputProps={{
                    startAdornment:
                    <InputAdornment>
                        <Typography sx={{ mr: '10px', fontSize: '13pt' }}>+254 </Typography>
                    </InputAdornment>  
                }}
                onChange={handleChange}
            />

            <Button 
                type='submit' 
                className='btn' 
                fullWidth
                sx={{ 
                    background: '#db3022', 
                    p: 2, 
                    color: 'white', 
                    fontWeight: 'bold', 
                    textTransform: 'capitalize',
                    fontSize: '14pt',
                    mt: 2
                }}
            > save address
            </Button>
        </form>
    );
}
 
export default ShippingForm;