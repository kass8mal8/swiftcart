const express = require("express");
require('dotenv').config()
const cors = require('cors')
const logger = require('morgan')

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

const authRoute = require('./routes/authentication')
const userRoute = require('./routes/users')
const cartRoute = require('./routes/shoppingCart')
const orderRoute = require('./routes/orders')
const addressRoute = require('./routes/address')

app.use('/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/address', addressRoute)

module.exports = app