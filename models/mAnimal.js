const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: false,
    }
})


const animal = mongoose.model('animal', animalSchema);

module.exports= animal;