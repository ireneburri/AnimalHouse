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
        enum: ["Food", "Health Products", "Toys", "Accessories", "Houses And Kennels", "For Puppies"],
        required: true,
    },
    size:{
        type: String,
        enum:["Small", "Medium", "Large", "All"],
        required:false,
        default:["All"],
    },
    quantity: {
        type: Number,
        required: true,
    },
    species:{
        type:String,
        required:false
    },
    animal:{
        type:String,
        enum: ["For Everyone", "Mammals", "Birds", "Reptiles", "Amphibians", "Fish", "Insects", "Others"],
        required:false
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