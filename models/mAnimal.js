const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema({
    sale:{
        type: Boolean,
        required: true,
    },
    client_id:{
        type: String,
        required: false,
    },
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
    },
    species:{
        type: String,
        required: true,
    },
    breed:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false,
    },
    price:{
        type: String,
        required: false,
    }
})


const animal = mongoose.model('animal', animalSchema);

module.exports= animal;