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
    services: {
        type: [String],
        required: true,
    },
    img: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
    }
});

const Location = mongoose.model('location', locationSchema);

module.exports= Location;