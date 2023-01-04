const mongoose = require('mongoose');

const conflictSchema = new mongoose.Schema({
    conflict: [{
        service: String,
        quantity: Number,
        time_s: Date,
        time_e: Date,
    }]
})

const Conflict = mongoose.model('conflict', conflictSchema);

module.exports= Conflict;