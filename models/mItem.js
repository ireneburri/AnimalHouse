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
    category: {
        type: String,
        enum: ["Cibo", "Prodotti Sanitari", "accessoristica"]
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