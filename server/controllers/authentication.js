const User = require('../model/users')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

const createToken = (payload) => {
    return jwt.sign(payload, SECRET, {
        expiresIn: '1h',
        algorithm: 'HS256'
    })
}

const validatePassword = (password) => {
    if(password.length < 8) {
        res.json({ message: "Password must be eight or more characters" }).status(400)
    }
    else {
        const checkerString = [/0-9/]
        if(!checkerString.test(password)) {
            res.json({ message: "Password must contain digits" }).status(400)
        }
    }
}

const signup_post = async(req, res) => {
    console.log(req.body)
    const { first_name, surname, email, password } = req.body

    try {
        const user = await User.create({
            first_name, 
            surname, 
            email,
            password,
        })
        
        const payload = {
            first_name: user.first_name,
            surname: user.surname,
            email: user.email,
            user_id: user._id,
            address: user.address
        }
        console.log("Payload:", payload)
        const token = createToken(payload)

        res.json({ token, message: `${user.first_name} created successfully` }).status(200)

    } catch (error) {
        res.json({ message: error.message }).status(500)
    }
}

const signin_post = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        
        if(user){
            const payload = {
                first_name: user.first_name,
                surname: user.surname,
                email: user.email,
                user_id: user._id,
                address: user.address
            }
            const token = createToken(payload)

            res.json({ 
                token, 
                message: "Signin was successful"
            }).status(200)
        }
        
    } catch (error) {
        res.json({ message: error.message }).status(500)
    }

}

module.exports = {
    signup_post,
    signin_post
}
