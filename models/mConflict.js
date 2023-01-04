const mongoose = require('mongoose');

const conflictSchema = new mongoose.Schema({
    service: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    location: {
        type: String,
    },
    timeS: {
        type: Date,
    },
    timeE: {
        type: Date,
    }
})

const Conflict = mongoose.model('conflict', conflictSchema);

module.exports= Conflict;