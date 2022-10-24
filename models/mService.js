const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum: ['In Store', 'Online', 'At Home'],
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        enum: ["Animal Sitter", "Vet & Doctors", "Grooming", "Pension", "Training", "Store"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    availability: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const Service = mongoose.model('service', serviceSchema);

module.exports= Service;