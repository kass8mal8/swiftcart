const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
    user_id: String,
    order_number: Number,
    order_status: String,
    items: Array,
}, { timestamps: true } )

const Order = model('order', orderSchema)
module.exports = Order 