const mongoose = require('mongoose');
const dogFactSchema = new mongoose.Schema({
    dogFact:{
        type: String,
        required: true,
    }
})


const DogFact = mongoose.model('dogFact', dogFactSchema);

module.exports= DogFact;