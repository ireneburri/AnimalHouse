const mongoose=require('mongoose');

const reservationSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
})

const Reservation = mongoose.model('reservation', reservationSchema);

module.exports= Reservation;
