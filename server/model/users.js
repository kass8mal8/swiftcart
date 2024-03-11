const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const options = {
    type: String, 
    required: true
}

const userSchema = new Schema({
    first_name: String,
    surname: String,
    email: {...options, unique: true },
    password: options,
    address: Array
})

userSchema.pre( 'save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    next()

})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    try {
        const auth = await bcrypt.compare(password, user.password);
        
        if (auth) {
            return user;
        } else {
            throw new Error('Incorrect credentials');
        }
    } catch (error) {
        throw error; 
    }
};


const User = model('user', userSchema)
module.exports = User