const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: false,
    },
    surname:{
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    paymentmethod: {
        /*type: mongoose.Schema.Types.String,
        ref: 'Payment_Methods.name',*/
        type: String,
        required: false,
    },
    residence: {
        type: String,
        required: false,
    },
    preferences: {
        type: String,
        enum: ["Dog", "Cat", "Fish", "Bird", "Hamster"],
        required: false,
    }
})


const User = mongoose.model('user', userSchema);

module.exports= User;