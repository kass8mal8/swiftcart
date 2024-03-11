import { Box, Typography } from "@mui/material";
import Categories from "./Categories";
import FilterUI from "./FilterUI";
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard.jsx";
import useFetch from "../hooks/useFetch"
import image from "../../assets/images/image (1).png"

const Shop = () => {
    const [view, setView] = useState('module')

    // const data = [
    //     {
    //         user_id: 'xncncidi',
    //         price: 51,
    //         count: 1,
    //         title: 'Sweater',
    //         image: image,
    //         id: 1
    //     },
    //     {
    //         user_id: 'bdjueiwb',
    //         price: 35,
    //         count: 1,
    //         title: 'Pullover',
    //         image: image,
    //         id: 2
    //     },
    //     {
    //         user_id: 'bdjueiwb',
    //         price: 20,
    //         count: 2,
    //         title: 'Computer',
    //         image: image,
    //         id: 3
    //     }
    // ]
    
    // const loading = 'false'
    const url = 'https://fakestoreapi.com/products'
    const { data, error, loading } = useFetch(url)
    const [productFilter, setProductFilter] = useState('all')
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if(productFilter !== 'all') {
            const response =  data.filter( product => product.category === productFilter )
            setFilteredProducts(response)
        }
        else {
            setFilteredProducts(data)
        }
    }, [data]);

    return (  
        <Box >
            {/* <Categories setProductFilter={setProductFilter} productFilter={productFilter} /> */}
            <FilterUI view={view} setView={setView} />
            <Typography> ""</Typography>
            <ProductCard loading={loading} data={filteredProducts} />
        </Box>
    );
}
 
export default Shop;