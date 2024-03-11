import { Box } from "@mui/material"

import ProductList from "./ProductList"
import Loader from "../pages/home/Loader"
import { useState } from "react"

const ProductCard =({ loading, data })=> {
    const mapSkeleton = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <Box spacing={2} sx={{ marginTop: '50px' }}>
            {loading 
            ? <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {mapSkeleton.map((x, index) => (
                    <Loader key={index} />
                ))}
              </Box>
            : <ProductList products={data}/>}
        </Box>
    )
}

export default ProductCard