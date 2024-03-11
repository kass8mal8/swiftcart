import { Box } from "@mui/material"
import AuthIntro from "./AuthIntro";
import Form from "./Form";

const Signin = () => {
    return (  
        <Box className='auth'>
            <AuthIntro />
            <Form />
        </Box>
    );
}
 
export default Signin;