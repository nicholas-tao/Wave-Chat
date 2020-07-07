const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        default: ["food"]

    },
    university: {
        type: String,
        default: 'waterloo'
    },
    faculty: {
        type: String,
        default: 'No Faculty Entered'
    },
    program: {
        type: String,
        default: 'No Program Entered'
    },
    gradYear: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User