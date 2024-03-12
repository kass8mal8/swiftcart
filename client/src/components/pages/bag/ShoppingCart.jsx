import EmptyCart from "./EmptyCart";
import FilledBag from "./FilledBag";
import image from "../../../assets/images/image (1).png"
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../../App";
import { Outlet, useLocation } from "react-router-dom";
import Checkout from "./Checkout";

const ShoppingCart = () => {
    const { auth: user } = useContext(AuthContext)
    const { user_id } = user
    const url = `https://swiftcart-xdrc.onrender.com/api/cart/${user_id}`
    const { data: products, loading, error } = useFetch(url)
    console.log(user_id)
    console.log(products)
    const location = useLocation()
    return (  
        <>
            { loading ? <Loader /> : products && <FilledBag products={products?.product || []} /> }
            {/* { location.pathname === '/checkout' && <Checkout products={products?.product || []} /> } */}
            <Outlet />
        </>
    );
}
 
export default ShoppingCart;