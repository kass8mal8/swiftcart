import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";

const SubmitButton = ({ loading }) => {
    const location = useLocation()
    const text = location.pathname === '/signin' ? 'login' : 'signup'
    const condition = loading ? 'please wait...' : text
    
    return (  
        <Button
            type='submit'
            variant='contained'
            fullWidth
            className="submit-btn"
            disableElevation
        >
            { condition }
        </Button>
    );
}
 
export default SubmitButton;