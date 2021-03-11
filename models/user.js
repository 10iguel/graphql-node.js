const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        email: {
            required: true,
            type: String,
            unique: true,
            match: [
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                , 'please pass a valid email'
            ]
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'I am new'
        },
        posts: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Post'
        }]
    }
)

module.exports = mongoose.model('User', UserSchema)
