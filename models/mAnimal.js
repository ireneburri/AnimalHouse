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
    breed:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
    }
})


const animal = mongoose.model('animal', animalSchema);

module.exports= animal;