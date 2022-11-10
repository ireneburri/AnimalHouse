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
    tel: {
        type: String,
        required: false,
    },
    paymentmethod: {
        type: String,
        enum: ["Card", "PayPal", "In Store", "None"],
        required: false,
    },
    residence: {
        type: String,
        required: false,
    },
    preferences: {
        type: [String],
        required: true,
    },
    myanimal: {
        type: [String],
        required: false,
    },
    vip: {
        type: Boolean,
        required: false,
        default: false,
    },
})


const User = mongoose.model('user', userSchema);

module.exports= User;