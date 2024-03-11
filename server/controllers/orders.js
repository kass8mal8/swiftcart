const Order = require("../model/orders")

const addOrders = async(req, res) => {
    const { items, user_id } = req.body
    const randomNumber = Math.random().toString()
    const order_number = +randomNumber.split('.')[1].slice(0, 8)
    const order_status = 'Pending'

    try {
        const order = await Order.create({
            items, order_number, order_status, user_id
        })
        res.json({ message: "Order placed successfully", order }).status(200)
    }
    catch (err) {
        res.json({err}).status(500)
    }
}

const editOrder = async(req, res) => {
    const { order_id } = req.params

    try {
        await Order.findByIdAndUpdate(order_id, { order_status: "Delivered" } )
        res.json({ message: "Nice doing business with you" }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}

const getOrder = async(req, res) => {
    const { user_id } = req.params

    try {
        const order = await Order.find({user_id})
        res.json({ order }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}

module.exports = {
    addOrders,
    editOrder,
    getOrder
}