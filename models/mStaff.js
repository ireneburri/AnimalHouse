const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        require: false,
    },
    role: {
        type: [String],
        required: true,
    },
    location: {
        type : [String],
        required: true,
    },
});

const Staff = mongoose.model('staff', staffSchema);

module.exports= Staff;