const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Provide correct email address!')
            }
        }
    },
    password: {type: String, required: true, trim: true, minlength: 6},
    tokens: {type: String},
})

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 11);
    }
})

userSchema.methods.generateAuthTokens = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}).process.env.SECRET_JWT;
    user.tokens = token;
    await user.save()
    return token
}

userSchema.statics.loginUser = async (email, pass) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Wrong password or username');
    }
    const checkPassword = await bcrypt.compare(pass, user.password)
    if(!checkPassword) {
        throw new Error('Wrong password or username');
    }
    return user;
}

const User = mongoose.model('user', userSchema);

module.exports = User