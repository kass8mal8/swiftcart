import { Box } from "@mui/material"; 
import AuthIntro from "./AuthIntro";
import Form from "./Form";

const Signup = () => {
    return (  
        <Box className='auth'>
            <AuthIntro />
            <Form />
        </Box>
    );
}
 
export default Signup;