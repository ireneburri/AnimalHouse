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
    disponibility: {
        type: String,
        enum: ['available', 'available soon', 'unavailable'],
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
})


const item = mongoose.model('item', itemSchema);

module.exports= item;