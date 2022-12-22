const express = require('express')
const router = express.Router()
const DogFact = require("../models/mDogFact")

//get all
router.get('/', async(req, res)=> {
    try{
        const dogFact = await DogFact.find()
        res.json(dogFact)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})
//get one
router.get('/id/:id', getDogFact, (req, res)=> {
    res.json(res.dogFact)
})

//get one random
router.get('/random', async(req, res)=>{
    try{
        console.log('ao')
        var dogFact= await DogFact.find()
        dogFact=dogFact[Math.floor(Math.random()*dogFact.length)]
        res.json(dogFact)


    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
})

//create one
router.post('/', async (req, res)=> {
    console.log(req.body)
    const dogFact = new DogFact({
        dogFact: req.body.dogFact,

    })
    try{
        const newDogFact = await dogFact.save()
        console.log(newDogFact)
        res.status(201).json(newDogFact)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getDogFact, async (req, res)=> {
    if(req.body.dogFact != null){
        res.dogFact.dogFact=req.body.dogFact
    }
    try{
        const updateDogFact = await res.dogFact.save()
        res.json(updateDogFact)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})
//delete one
router.delete('/:id', getDogFact, async (req, res)=> {
    try{
        await res.dogFact.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }


})

async function getDogFact (req, res, next){
    let dogFact
    try{
        dogFact= await DogFact.findById(req.params.id)
        if(dogFact==null){
            return res.status(404).json({message : 'Cannot find animal'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.dogFact=dogFact
    next()
}

module.exports = router