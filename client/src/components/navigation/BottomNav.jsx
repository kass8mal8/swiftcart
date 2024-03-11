import { Avatar, Badge, BottomNavigation, BottomNavigationAction, useTheme } from "@mui/material";
import { Home, PersonOutlined, ShoppingBagOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BagContext } from "../../App";


const BottomNav = () => {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()
    const { bagCount } = useContext(BagContext)
    // const theme = useTheme

    return (  
        <BottomNavigation 
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
        >
            <BottomNavigationAction label='Home' icon={<Home />} onClick={() => navigate('/')} />
            <BottomNavigationAction label="Shop" icon={<ShoppingCartOutlined />} onClick={() => navigate('/shop')} />
            <BottomNavigationAction 
                label="Bag" 
                icon={
                    <Badge badgeContent={bagCount} sx={{ color: '#db3022' }} >
                        <ShoppingBagOutlined sx={{ color: 'gray' }} />
                    </Badge>
                } 
                onClick={() => navigate('/basket')} 
            />
            <BottomNavigationAction label='Profile' icon={<PersonOutlined />} onClick={() => navigate('/profile')} />
        </BottomNavigation>
    );
}
 
export default BottomNav;