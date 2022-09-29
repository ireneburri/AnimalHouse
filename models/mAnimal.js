const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    age:{
        type: Number,
        required: false,
    },
    sex:{
        type: String,
        enum: ["Maschio", "Femmina"],
        required: false,
    }
})


const animal = mongoose.model('animal', animalSchema);

module.exports= animal;