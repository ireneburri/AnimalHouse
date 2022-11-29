const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    staff: {
        type: [String],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    disponibility: [{
        service: String,
        quantity: Number
    }]
});

const Location = mongoose.model('location', locationSchema);

module.exports= Location;