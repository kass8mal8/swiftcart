import { Box, Typography } from "@mui/material";
import Categories from "./Categories";
import FilterUI from "./FilterUI";
import { useState, useEffect } from "react"
import ProductCard from "./ProductCard.jsx";
import useFetch from "../hooks/useFetch"
import image from "../../assets/images/image (1).png"

const Shop = () => {
    const [view, setView] = useState('module')
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