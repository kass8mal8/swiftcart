const express = require('express')
const User = require('../model/users')

const user_get = async(req, res) => {
    const { user_id } = req.params

    try {
        const user = await User.findById(user_id)

        if(user){
            res.json({ user }).status(200)
        }
        else {
            res.json({ message: "No user found" }).status(404)
        }
    } catch (error) {
        res.json({ error }).status(500)
    }
}

const get_users = async(req, res) => {
    try {
        const user = await User.find({})
        res.json({user}).status(200)
    } catch (error) {
        console.log(error.message)
    }
}

const edit_user = async(req, res) => {
    const { user_id } = req.params
    const { address } = req.body
    // console.log(address[0])

    try {
        const user = await User.findByIdAndUpdate(user_id, { address })
        console.log("Edited", user)
        
        !user ? res.json({ message: "Invalid request" }).status(404) : res.json({ user }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}


module.exports = {
    user_get,
    get_users,
    edit_user
}