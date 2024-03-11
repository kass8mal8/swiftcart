import { useState } from 'react';

const useCountUpdate = async(type, product) => {
    const [counter, setCounter] = useState(0)
    const url = `http://localhost:5000/api/cart/update/${product._id}`
    try {
        if(type === "minus") {
            if(product.count === 1) return
            else {
                setCounter(product.count - 1)
            }
        }
        else {
            setCounter(product.count + 1)
        }
        
        const post = await fetch( url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'UPDATE',
            body: JSON.stringify(counter)
        })
        const response = await post.json()
        
        console.log(response)
        
    } catch (error) {
        console.log(error.message)
    }
}
 
export default useCountUpdate;