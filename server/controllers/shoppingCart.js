const express = require('express')
const Cart = require('../model/shoppingCart')

const addToCart = async(req, res) => {
    const { user_id, title, price, description, image, count } = req.body

    try {
        const product = await Cart.create({
            user_id, description, title, price, image, count
        })

        res.json({ message: "Successfully added to bag", product }).status(200)
    } catch (error) {
        res.json({error}).status(500)
    }
}

const getCart = async(req, res) => {
    const { user_id } = req.params

    try {
        const product = await Cart.find({ user_id })
        if(product) {
            res.json({ product }).status(200)
        }
        else {
            res.status(404).json({ message: "Not found" })
        }
    } catch (error) {
        res.json({error}).status(500)
    }
}

const removeCartItem = async(req, res) => {
    const { product_id } = req.params

    try {
        const product = await Cart.findByIdAndDelete(product_id)

        if(product) {
            res.json({ message: `${product_id} removed successfully` }).status(200)
        }
    }
    catch(error) {
        res.json({error}).status(500)
    }
}

const removeUserCart = async(req, res) => {
    const { user_id } = req.params

    try {
        const product = await Cart.deleteMany({ user_id })
        if(product) {
            console.log(product)
            res.json({ message: `operation successfully executed` }).status(200)
        }
        else {
            res.status(404).json({ message: "Not found" })
        }
    } catch (error) {
        res.json({error}).status(500)
    }
}

const updateCart = async(req, res) => {
    const { product_id } = req.params
    const { count, price } = req.body
    console.log(req.body)

    console.log("id:", product_id)
    console.log("count:", count, "Price:",price)

    const updateDetails = { count }

    try {
        const product = await Cart.findByIdAndUpdate(product_id, updateDetails)
        console.log(product)
        res.json({ message: `${product.title} updated successfully` }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}


module.exports = {
    addToCart,
    getCart,
    removeCartItem,
    updateCart,
    removeUserCart
}