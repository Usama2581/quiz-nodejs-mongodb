const mongoose = require('mongoose')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('../config/jwt')
const serverSecret = config.secret


const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    tokens: {
        type: String,
        default: ''
    }
})


// UserSchema.methods.generateToken = function() {

// }

UserSchema.pre('save', function(next) {
    const user = this

    if (user.isModified('password')) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(user.password, salt)   
        
        user.password = hash
    }
    
    next()
})


UserSchema.methods.comparePassword = function(password) {
    const user = this

    return bcryptjs.compareSync(password, user.password)
}


UserSchema.methods.generateToken = function() {
    const user = this
    const { _id } = user

    const token = jwt.sign({ _id }, serverSecret)
    user.tokens = token
    return user.save().then(() => token)
}


UserSchema.statics.removeToken = function(token) {
    const Users = this

    const decoded = jwt.verify(token, serverSecret)

    return Users.findOneAndUpdate({ _id: decoded._id }, { $pull: { tokens: token }})
}

const Users = mongoose.model('Users', UserSchema)

module.exports = Users


/*
    methods vs statics

    1. methods will be used on specific data returned
    from Mongodb.
    For example: 
        const user = Users.find({ email })
        user.generateToken()
        
        UserSchema.methods.generateToken(() => {
            this //refers to the database user
        })

    2. statics will be used on the collection
    For example:
        Users.removeToken()

        UserSchema.static.removeToken(() => {

        })
*/






