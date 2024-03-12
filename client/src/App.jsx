import { Box, ThemeProvider, createTheme } from "@mui/material"
import Signin from './components/authentication/Signin'
import Signup from './components/authentication/Signup'
import { Route, Routes, useLocation } from 'react-router-dom'
import "./styles/css/index.css"
import Home from "./components/pages/home/Home"
import { createContext, useContext, useState, useEffect } from "react"
import BottomNav from "./components/navigation/BottomNav"
import Profile from "./components/pages/profile/Profile"
import Shop from "./components/shop/Shop"
import ShoppingCart from "./components/pages/bag/ShoppingCart"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Shipping from "./components/pages/profile/Shipping"
import Main from "./components/pages/profile/Main"
import Checkout from "./components/pages/bag/Checkout"
import Success from "./components/pages/bag/Success"
import Orders from "./components/pages/profile/Orders"

export const AuthContext = createContext({})
export const BagContext = createContext()
export const AddressContext = createContext()

const App =()=> {
  const location = useLocation();
  const paths = ['/signin', '/signup']
  const theme = createTheme({
    typography: {
      fontFamily: 'sen'
    }
  })
  const [auth, setAuth] = useState({})
  const [bagCount, setBagCount] = useState(0)
  const [address, setAddress] = useState({})
  const queryClient = new QueryClient()
  const [tokenState, setTokenState] = useState()

  const userData = localStorage.getItem('user')
  useEffect(() => {
    setTokenState(userData)
  }, [userData]);

  const user = useContext(AuthContext)
  console.log(user)
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
        <BagContext.Provider value={{ bagCount, setBagCount }}>
        <AddressContext.Provider value={{ address, setAddress }}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Box className='container'>
                <Routes>
                    <Route path='/' element= {tokenState ? <Home /> : <Signin /> } />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/basket' element={<ShoppingCart />} />
                    <Route path='/checkout' element={<Checkout /> } />
                    <Route path="/success" element={<Success />} />
                    <Route path='/profile' element={<Profile /> }>
                      <Route path='' element={ <Main /> } />
                      <Route path='address' element={ <Shipping /> } />
                      <Route path='orders' element={ <Orders /> } />
                    </Route>
                    {/* <Route path='/address' element={ <Shipping /> } /> */}
                </Routes>
                </Box>
                { !paths.includes(location.pathname) && <BottomNav /> }
            </ThemeProvider>
          </QueryClientProvider>
        </AddressContext.Provider>
        </BagContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
