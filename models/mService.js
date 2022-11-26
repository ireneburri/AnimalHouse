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
    allday: {
        type: Boolean,
        required: false,
    },
    time: {
        type: String,
        required: false,
    },
    vip: {
        type: Boolean,
        required: false,
    },
});

const Service = mongoose.model('service', serviceSchema);

module.exports= Service;