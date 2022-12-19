const express = require('express')
const router = express.Router()
const Quiz = require("../models/mQuiz")

//get all
router.get('/', async(req, res)=> {
    try{
        const quiz = await Quiz.find()
        res.json(quiz)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})

//get one
router.get('/id/:id', getQuiz, (req, res)=> {
    res.json(res.quiz)
})

//get one random
router.get('/randomOne', async(req, res) =>{
    try{
        const count = await Quiz.estimatedDocumentCount();
        const random = Math.floor(Math.random() * count);
        Quiz.findOne()
            .skip(random)
            .then((quiz) => {x
                return res.status(200).json({
                    statusCode: 200,
                    quiz: quiz,
                });
            });

    }
    catch(err){
        res.status(500).json({ message: err.message })
    }

})


//create one
router.post('/', async (req, res)=> {
    const quiz = new Quiz({
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        active_time: req.body.active_time,
        length_min: req.body.length_min,
        length_max: req.body.length_max,
        weight_min: req.body.weight_min,
        weight_max: req.body.weight_max,
        lifespan: req.body.lifespan,
        habitat: req.body.habitat,
        diet: req.body.diet,
        geo_range: req.body.geo_range,
        curiosity: req.body.curiosity,

    })
    try{
        const newQuiz = await quiz.save()
        res.status(201).json(newQuiz)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//update one
router.patch('/:id', getQuiz, async (req, res)=> {
    if(req.body.name != null){
        res.quiz.name=req.body.name
    }
    if(req.body.img != null) {
        res.quiz.img = req.body.img
    }
    if(req.body.type != null) {
        res.quiz.type = req.body.type
    }
    if(req.body.active_time != null) {
        res.quiz.active_time = req.body.active_time
    }
    if(req.body.length_min != null) {
        res.quiz.length_min = req.body.length_min
    }
    if(req.body.length_max != null) {
        res.quiz.length_max = req.body.length_max
    }
    if(req.body.weight_min != null) {
        res.quiz.weight_min = req.body.weight_min
    }
    if(req.body.weight_max != null) {
        res.quiz.weight_max = req.body.weight_max
    }
    if(req.body.lifespan != null) {
        res.quiz.lifespan = req.body.lifespan
    }
    if(req.body.habitat != null) {
        res.quiz.habitat = req.body.habitat
    }
    if(req.body.diet != null) {
        res.quiz.diet = req.body.diet
    }
    if(req.body.geo_range != null) {
        res.quiz.geo_range = req.body.geo_range
    }
    if(req.body.curiosity != null) {
        res.quiz.curiosity = req.body.curiosity
    }
    try{
        const updateQuiz = await res.animal.save()
        res.json(updateQuiz)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})

//delete one
router.delete('/:id', getQuiz, async (req, res)=> {
    try{
        await res.quiz.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }


})

async function getQuiz (req, res, next){
    let quiz
    try{
        quiz= await Quiz.findById(req.params.id)
        if(quiz==null){
            return res.status(404).json({message : 'Cannot find animal'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.quiz=quiz
    next()
}

module.exports = router