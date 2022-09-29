const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
})


const item = mongoose.model('item', itemSchema);

module.exports= item;