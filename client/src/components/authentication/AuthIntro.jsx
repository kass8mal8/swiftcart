import { IconButton, Typography } from "@mui/material"
import { ArrowBackIos } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const AuthIntro = () => {
    const location = useLocation()
    const arr = ['/signin','/']

    return (  
        <>
            <Typography variant='h4' className="auth-text" mt={12}>
                { arr.includes(location.pathname) ? "Login" : "Signup" }
            </Typography>
        </>
    );
}
 
export default AuthIntro;