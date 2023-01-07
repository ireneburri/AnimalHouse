export default function createQuestion(animalOne, animalQuestion, par) {
    console.log('id1, id2, falseVar', animalOne._id, animalQuestion._id)
    switch (par) {
        case 2:
            if (animalOne.type === animalQuestion.type) {
                return [`${animalOne.name} is a ${animalQuestion.type}`, true]
            } else {
                return [`${animalOne.name} is a ${animalQuestion.type}`, false]
            }

        case 3:
            if (animalOne.active_time === animalQuestion.active_time) {
                return [`${animalOne.name} is a ${animalQuestion.active_time}`, true]
            } else {
                return [`${animalOne.name} is a ${animalQuestion.active_time}`, false]
            }

        case 4:
            if (animalOne.length_min === animalQuestion.length_min) {
                return [`The minimum length of ${animalOne.name} is ${animalQuestion.length_min} meter`, true]
            } else {
                return [`The minimum length of ${animalOne.name} is ${animalQuestion.length_min} meter`, false]
            }

        case 5:
            if (animalOne.length_max === animalQuestion.length_max) {
                return [`The maximum length of  ${animalOne.name} is ${animalQuestion.length_max} meter`, true]
            } else {
                return [`The maximum length of  ${animalOne.name} is ${animalQuestion.length_max} meter`, false]
            }


        case 6:
            if (animalOne.weight_min === animalQuestion.weight_min) {
                return [`The minimum weight of ${animalOne.name} is ${animalQuestion.weight_min} kg`, true]
            } else {
                return [`The minimum weight of ${animalOne.name} is ${animalQuestion.weight_min} kg`, false]
            }

        case 7:
            if (animalOne.weight_max === animalQuestion.weight_max) {
                return [`The maximum weight of ${animalOne.name} is ${animalQuestion.weight_max} kg`, true]
            } else {
                return [`The maximum weight of ${animalOne.name} is ${animalQuestion.weight_max} kg`, false]
            }

        case 8:
            if (animalOne.lifespan === animalQuestion.lifespan) {
                return [`${animalOne.name} lives approximately ${animalQuestion.lifespan} years`, true]
            } else {
                return [`${animalOne.name} lives approximately ${animalQuestion.lifespan} years`, false]
            }

        case 9:
            if (animalOne.habitat === animalQuestion.habitat) {
                return [`${animalQuestion.habitat} is the habitat of ${animalOne.name}`, true]
            } else {
                return [`${animalQuestion.habitat} is the habitat of ${animalOne.name}`, false]
            }

        case 10:
            if (animalOne.diet === animalQuestion.diet) {
                return [`${animalOne.name}'s diet is: ${animalQuestion.diet}`, true]
            } else {
                return [`${animalOne.name}'s diet is: ${animalQuestion.diet}`, false]
            }

        default:
            if (animalOne.name === animalQuestion.name) {
                return [`The name of this animal is ${animalQuestion.name}`, true]
            } else {
                return [`The name of this animal is ${animalQuestion.name}`, false]
            }
    }
}