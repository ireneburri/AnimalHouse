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
    },
    post_id: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        enum: ["None", "Eccolo qua", "Cerco Partner"],
        required: false,
        default: "None",
    },
    comment: {
        type: Boolean,
        required: false,
    }
})


const board = mongoose.model('board', boardSchema);

module.exports = board;