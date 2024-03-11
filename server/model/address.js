const { model, Schema } = require('mongoose')

const addressSchema = new Schema({
    name: String,
    user_id: String,
    address: String,
    city: String,
    telephone: Number
})

const Address = model('address', addressSchema)
module.exports = Address