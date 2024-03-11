import { Box } from "@mui/material"

import { Outlet } from "react-router-dom";
const Profile = () => {
    return (  
        <Box className='profile'>
            <Outlet />
        </Box>
    );
}
 
export default Profile;