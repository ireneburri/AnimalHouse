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
    }
    /*name:{
        type: String,
        required: false,
    },
    quantity:{
        type: String,
        required: false,
    },
    type:{
        type: String,
        enum: ["Item", "Service", "Animal"],
        required: false,
    },
    category:{
        type: String,
        required: false,
    }*/
})


const Order = mongoose.model('order', orderSchema);

module.exports= Order;