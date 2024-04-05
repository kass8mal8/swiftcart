import { TextField, Stack, Typography, InputAdornment } from "@mui/material"; 
import { ArrowRightAlt, Visibility, VisibilityOff } from "@mui/icons-material"; 
import SubmitButton from "./SubmitButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react"; 
import usePost from "../hooks/usePost";
import { AuthContext } from "../../App";
import { jwtDecode } from 'jwt-decode'

const Form = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const url = 'http://localhost:5000/auth'
    const endpoint = location.pathname === "/signin" ? `${url}/signin` : `${url}/signup`
    
    const { post, error, loading } = usePost(endpoint)
    const [ userData, setUserData ] = useState({})
    const [isVisible, setIsVisible] = useState(false)
    const { auth, setAuth } = useContext(AuthContext)
    console.log(useContext(AuthContext))

    const handleChange = (e) => {
        setUserData({
            ...userData, [e.target.name]: e.target.value 
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(userData)
        try {
            const response = await post(userData)
            error && console.log(error)
            const decodedToken = jwtDecode(response?.token)
            console.log("token:", decodedToken)
            setAuth(decodedToken)
            

            if(!error && location.pathname === '/signup') {
                navigate('/signin')
            }
            else if(!error && (location.pathname === '/signin')) {
                navigate('/')
            }

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(()=>console.log('auth', auth), [auth])
    // console.log(auth)

    return (  
        <form className='form' onSubmit={handleSubmit}>
                { location.pathname === '/signup' && 
                    <Stack direction='row' spacing={2} mb={1}>
                        <TextField 
                            type='text'
                            fullWidth
                            // className="input"
                            label='First name'
                            placeholder="John"
                            name='first_name'
                            onChange={handleChange}
                        />
                        <TextField 
                            type='text'
                            fullWidth
                            placeholder="Doe"
                            label='Last name'
                            name='surname'
                            onChange={handleChange}
                        />
                    </Stack>
                }
                <TextField 
                    type='email' 
                    name='email' 
                    label='Email'
                    aria-label="email" 
                    fullWidth
                    className="input"
                    placeholder="email@example.com"
                    onChange={handleChange}
                    // InputProps={{
                    //     endAdornment: 
                    //         <InputAdornment>
                    //             <RampRight />
                    //         </InputAdornment>
                    // }}
                />
                <TextField 
                    type={ isVisible ? "text" : 'password' }
                    label="Password"
                    name='password'
                    fullWidth
                    className="input"
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment>
                                {!isVisible 
                                    ? <VisibilityOff onClick={() => setIsVisible(true)} /> 
                                    : <Visibility onClick={() => setIsVisible(false)} /> 
                                }
                            </InputAdornment>
                    }}
                />
                { location.pathname === '/signin' && 
                    <Stack direction='row' spacing={1} sx={{ alignItems: 'center', marginLeft: '51%'}}>
                        <Typography variant='body2'>Forgot your password?</Typography>
                        <ArrowRightAlt sx={{ color: '#ff5c00' }} /> 
                    </Stack> 
                }
                <SubmitButton loading={loading} />
            </form>
    );
}
 
export default Form;