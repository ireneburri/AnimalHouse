const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    active_time:{
        type: String,
        required: true,
    },
    length_min:{
        type: Number,
        required: true,
    },
    length_max:{
        type: Number,
        required: true,
    },
    weight_min:{
        type: Number,
        required: true,
    },
    weight_max:{
        type: Number,
        required: true,
    },
    lifespan:{
        type: Number,
        required: true,
    },
    habitat:{
        type: String,
        required: true,
    },
    diet:{
        type: String,
        required: true,
    },
    geo_range:{
        type: String,
        required: true,
    },
    curiosity:{
        type: String,
        required: true,
    },
})


const quiz = mongoose.model('quiz', quizSchema);

module.exports= quiz;