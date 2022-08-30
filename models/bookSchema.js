const { text } = require('body-parser')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: Array,
        default: []
    },

})

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
        
    },
    email: {
        required: true,
        type: String
        
    },
    password: {
        required: true,
        type: String
        
    },
    role:{
        required: true,
        type: Number
    },
    bookIssued: {
        type: Array,
        default: []
    }
})
const Book = mongoose.model('Book', bookSchema)
const User = mongoose.model('User', userSchema)
module.exports = { Book, User };
