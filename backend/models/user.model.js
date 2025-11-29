const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    Nume: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    Prenume: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Parola: {
        type: String,
        required: true,
        unique: false,
    },
    Telefon: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    Rol: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
},  {
    timestamps: true,
})

const User = mongoose.model("User", userSchema)
module.exports = User