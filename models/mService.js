const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    /*
    staff: {
        type: [String],
        required: true,
    },
     */
    location: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    /*
    mode: {
        type: String,
        enum: ['presenza', 'online'],
        required: true,
    },
     */
    description: {
        type: String,
        required: false,
    }
});

const Service = mongoose.model('service', serviceSchema);

module.exports= Service;