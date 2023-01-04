export default function createQuestion(animalOne, animalQuestion, par) {7
    const trueVar=true
    var falseVar
    if(animalOne._id===animalQuestion._id){
        falseVar=true
    }else{
        falseVar=false
    }
    console.log('id1, id2, falseVar', animalOne._id, animalQuestion._id, falseVar)
    switch (par) {
        case 2:
            if (animalOne.animal_type === animalQuestion.type) {
                return [`${animalOne.name} is a ${animalQuestion.type}`, trueVar]
            } else {
                return [`${animalOne.name} is a ${animalQuestion.type}`, falseVar]
            }

        case 3:
            if (animalOne.active_time === animalQuestion.active_time) {
                return [`${animalOne.name} is a ${animalQuestion.active_time}`, trueVar]
            } else {
                return [`${animalOne.name} is a ${animalQuestion.active_time}`, falseVar]
            }

        case 4:
            if (animalOne.length_min === animalQuestion.length_min) {
                return [`The minimum length of ${animalOne.name} is ${animalQuestion.length_min} feet`, trueVar]
            } else {
                return [`The minimum length of ${animalOne.name} is ${animalQuestion.length_min} feet`, falseVar]
            }

        case 5:
            if (animalOne.length_max === animalQuestion.length_max) {
                return [`The maximum length of  ${animalOne.name} is ${animalQuestion.length_max} feet`, trueVar]
            } else {
                return [`The maximum length of  ${animalOne.name} is ${animalQuestion.length_max} feet`, falseVar]
            }


        case 6:
            if (animalOne.weight_min === animalQuestion.weight_min) {
                return [`The minimum weight of ${animalOne.name} is ${animalQuestion.weight_min} lb`, trueVar]
            } else {
                return [`The minimum weight of ${animalOne.name} is ${animalQuestion.weight_min} lb`, falseVar]
            }

        case 7:
            if (animalOne.weight_max === animalQuestion.weight_max) {
                return [`The maximum weight of ${animalOne.name} is ${animalQuestion.weight_max} lb`, trueVar]
            } else {
                return [`The maximum weight of ${animalOne.name} is ${animalQuestion.weight_max} lb`, falseVar]
            }

        case 8:
            if (animalOne.lifespan === animalQuestion.lifespan) {
                return [`${animalOne.name} lives approximately ${animalQuestion.lifespan} years`, trueVar]
            } else {
                return [`${animalOne.name} lives approximately ${animalQuestion.lifespan} years`, falseVar]
            }

        case 9:
            if (animalOne.habitat === animalQuestion.habitat) {
                return [`${animalQuestion.habitat} is the habitat of ${animalOne.name}`, trueVar]
            } else {
                return [`${animalQuestion.habitat} is the habitat of ${animalOne.name}`, falseVar]
            }

        case 10:
            if (animalOne.diet === animalQuestion.diet) {
                return [`${animalOne.name}'s diet is: ${animalQuestion.diet}`, trueVar]
            } else {
                return [`${animalOne.name}'s diet is: ${animalQuestion.diet}`, falseVar]
            }

        case 11:
            if (animalOne.geo_range === animalQuestion.geo_range) {
                return [`${animalOne.name} lives in ${animalQuestion.geo_range}`, trueVar]
            } else {
                return [`${animalOne.name} lives in ${animalQuestion.geo_range}`, falseVar]
            }

        default:
            if (animalOne.name === animalQuestion.name) {
                return [`The name of this animal is ${animalQuestion.name}`, trueVar]
            } else {
                return [`The name of this animal is ${animalQuestion.name}`, falseVar]
            }
    }
}