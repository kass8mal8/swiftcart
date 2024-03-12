const addToCart = async(product, user) => {
    // setIsClicked(true)
    const productDetails = {
        user_id: user.user_id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        count: 1
    }

    console.log(productDetails)

    try {
        const response = await post(productDetails)
        if(!error && response) {
            console.log(response)
            setBagCount(bagCount + 1)
        }
        else {
            setIsClicked(false)
            console.log("Could not complete that action")
        }
    } catch (error) {
        setIsClicked(false)
        console.log(error.message)
    }
}

export default addToCart