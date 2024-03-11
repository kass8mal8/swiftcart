const Address = require("../model/address")

const addAddress = async(req, res) => {
    const { name, city, telephone, user_id, address } = req.body
    console.log(req.body)

    try {
        const address = await Address.create({ name, city, telephone, user_id })
        res.json({ message: "Address added", address }).status(200)

    } catch (error) {
        res.json({ error }).status(500)
    }
}

const getAddress = async(req, res) => {
    const { user_id } = req.params

    try {
        const address = await Address.find({ user_id })
        res.json({ address }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}

module.exports = {
    addAddress,
    getAddress
}