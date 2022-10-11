const mongoose = require('mongoose');
const boardSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    data: {
        type: Date,
        required: false,
        default: Date.now,
    },
    img: {
        type: String,
        required: false,
    }
})


const board = mongoose.model('board', aboardSchema);

module.exports= board;