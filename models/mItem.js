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
        required: true,
    },
    category: {
        type: String,
        enum: ["Cibo", "Prodotti Sanitari", "Giochi", "Accessori", "Case e Cucce", "Per Cuccioli"],
        required: true,
    },
    animal: {
        type: String,
        enum: ["Per Tutti", "Mammiferi", "Uccelli", "Rettili", "Anfibi", "Pesci", "Insetti", "Altro"],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    vip: {
        type: Boolean,
        required: false,
    },
})


const item = mongoose.model('item', itemSchema);

module.exports= item;