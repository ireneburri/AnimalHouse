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
        enum: ["Food", "health products", "Toys", "accessories", "houses and kennels", "for puppies"],
        required: true,
    },
    size:{
        type: [String],
        enum:["Small", "Medium", "Large", "All"],
        required:false,
        default:["Small", "Medium", "Large"],
    },
    quantity: {
        type: Number,
        required: true,
    },
    species:{
        type:String,
        required:true
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