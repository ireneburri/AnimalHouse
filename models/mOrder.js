const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    client_id:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: false,
    },
    address:{
        type: String,
        required: false,
    },
    products:{
        type: [String],
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
    },
    vip: {
        type: Boolean,
        required: false,
    },
    completed: {
        type: Boolean,
        required: true,
        default: true,
    }
})


const Order = mongoose.model('order', orderSchema);

module.exports= Order;