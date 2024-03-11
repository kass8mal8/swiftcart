import { Button, AppBar, Toolbar } from "@mui/material";

const Categories = ({setProductFilter, productFilter}) => {
    const clothing = ['men\'s clothing', 'women\'s clothing']
    console.log(productFilter)
    return (  
        <AppBar position='fixed' className='categories'>
            <Toolbar>
            <Button variant='contained' className='selection'>clothing</Button>
            <Button variant='contained' className='selection' onClick={()=> setProductFilter('jewelery')} >Jewelery</Button>
            <Button variant='contained' className='selection' onClick={()=> setProductFilter('electronics')} >Electronics</Button>
            </Toolbar>
        </AppBar>
    );
}
 
export default Categories;