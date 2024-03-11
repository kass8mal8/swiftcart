const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    user_id: { type: String, required: 'true' }, // secondary key
    title: String,
    price: Number,
    description: String,
    image: String,
    count: Number
})

const Cart = model('cart', cartSchema)
module.exports = Cart