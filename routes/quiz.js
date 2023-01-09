const express = require('express')
const router = express.Router()
const Quiz = require("../models/mQuiz")


//get all
router.get('/', async(req, res) => {
    try {
        const quiz = await Quiz.find()
        res.json(quiz)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})


//get one
router.get('/:id', getQuiz, (req, res) => {
    res.json(res.quiz)
})


//get array og img
router.get('/img/size/:size', async(req, res) => {
    try{
        var size= req.params.size
        console.log(size)
        var db= await Quiz.find()
        var quiz=[]
        var random=0

        do{

            random=Math.floor(Math.random()*db.length)
            console.log('random: ', random)
            //console.log('random:', db[Math.floor(random)]["img"])
            console.log('prescelto:', db[random])
            quiz.push(db[random])
            //db.pop(db[random])
            db.splice(random, 1);
            console.log('db aggiornato:', db)

            //console.log(db)
            //console.log(quiz)
            size=size-1
            //console.log(size)


        }while(size>0)
        console.log(quiz)
        res.json(quiz)


    }
    catch(err){
        res.status(500).json({ message: err.message })
    }


})

//get a tot
router.get('/size/:size', async(req, res) => {
    try{
        var size= req.params.size
        console.log(size)
        var db= await Quiz.find()
        var quiz=[]
        var random=0

        do{
            random=Math.random()*db.length
            quiz.push(db[Math.floor(random)])
            db.pop(db[Math.floor(random)])

            console.log(db)
            //console.log(quiz)
            size=size-1
            //console.log(size)

        }while(size>0)
        res.json(quiz)


    }
    catch(err){
        res.status(500).json({ message: err.message })
    }


})
//get filtered
router.get('/type/:type/size/:size', async(req, res) => {
    try{
        //1 big -1 small
        const size=req.params.size
        //console.log('size: ', size)

        const type=req.params.type
        //console.log('type: ', type)

        let quiz
        if(type==="all"){
            quiz = await Quiz.find()
        }else{
            quiz = await Quiz.find({ type: type })
        }
        if(size==0){
            quiz=quiz[Math.floor(Math.random()*quiz.length)]
            //console.log(quiz)
        }else{
            let sortedQuiz = quiz.sort(
                (q1, q2) => (size*q1.length_max < size*q2.length_max) ? 1 : (size*q1.length_max > size*q2.length_max) ? -1 : 0)
            quiz=sortedQuiz[Math.floor(Math.random()*3)]
        }
        res.json(quiz)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
})

//create one
router.post('/', async(req, res) => {
    console.log(req.file, req.body)
    const quiz = new Quiz({
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        active_time: req.body.active_time,
        length_min: req.body.length_min,
        length_max: req.body.length_max,
        weight_min: req.body.weight_min,
        weight_max: req.body.weight_max,
        lifespan:req.body.lifespan,
        habitat: req.body.habitat,
        diet: req.body.diet,
        curiosity: req.body.curiosity
    })
    try {
        const newQuiz = await quiz.save()
        res.status(201).json(newQuiz)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//update one
router.patch('/:id', getQuiz, async(req, res) => {


    if (req.body.name != null) {
        res.quiz.name = req.body.name
    }
    if (req.body.img != null) {
        res.quiz.img = req.body.img
    }
    if (req.body.type != null) {
        res.quiz.type = req.body.type
    }
    if (req.body.active_time != null) {
        res.quiz.active_time = req.body.active_time
    }
    if (req.body.length_min != null) {
        res.quiz.length_min = req.body.length_min
    }
    if (req.body.length_max != null) {
        res.quiz.length_max = req.body.length_max
    }
    if (req.body.weight_min != null) {
        res.quiz.weight_min = req.body.weight_min
    }
    if (req.body.weight_max != null) {
        res.quiz.weight_max = req.body.weight_max
    }
    if (req.body.lifespan != null) {
        res.quiz.lifespan = req.body.lifespan
    }
    if (req.body.habitat != null) {
        res.quiz.habitat = req.body.habitat
    }
    if (req.body.diet != null) {
        res.quiz.diet = req.body.diet
    }
    if (req.body.curiosity != null) {
        res.quiz.curiosity = req.body.curiosity
    }

    try {
        const updateQuiz = await res.quiz.save()
        res.json(updateQuiz)
    } catch (err) {
        res.status(400).json({ message: err.message }) //parametro non accettabile
    }

})


//delete one
router.delete('/:id', getQuiz, async(req, res) => {
    try {
        await res.quiz.remove()
        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})

async function getQuiz(req, res, next) {
    let quiz
    try {
        quiz = await Quiz.findById(req.params.id)
        if (quiz == null) {
            return res.status(404).json({ message: 'Cannot find quiz' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.quiz = quiz
    next()
}


module.exports = router