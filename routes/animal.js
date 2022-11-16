const express = require('express')
const router = express.Router()
const Animal = require("../models/mAnimal")

//get all
router.get('/', async(req, res)=> {
    try{
        const animals = await Animal.find()
        res.json(animals)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})

//get one
router.get('/id/:id', getAnimal, (req, res)=> {
    res.json(res.animal)
})

//get posts filtered by sale
router.get("/sale/:sale", async (request , response) => {
    const sale = request.params.sale
    const animals = await Animal.find({sale: sale});

    try {
      response.send(animals);
    } catch (error) {
      response.status(500).send(error);
    }
});

//create one
router.post('/', async (req, res)=> {
    const animal = new Animal({
        sale: req.body.sale,
        client_id: req.body.client_id,
        name: req.body.name,
        img: req.body.img,
        age: req.body.age,
        sex: req.body.sex,
        breed: req.body.breed,
        description: req.body.description,

    })
    try{
        const newAnimal = await animal.save()
        res.status(201).json(newAnimal)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//update one
router.patch('/:id', getAnimal, async (req, res)=> {
    if(req.body.sale != null){
        res.animal.sale=req.body.sale
    }
    if(req.body.client_id != null){
        res.animal.client_id=req.body.client_id
    }
    if(req.body.name != null){
        res.animal.name=req.body.name
    }
    if(req.body.img != null){
        res.animal.img=req.body.img
    }
    if(req.body.age != null){
        res.animal.age=req.body.age
    }
    if(req.body.sex != null){
        res.animal.sex=req.body.sex
    }
    if(req.body.breed != null){
        res.animal.breed=req.body.breed
    }
    if(req.body.description != null){
        res.animal.description=req.body.description
    }
    try{
        const updateAnimal = await res.animal.save()
        res.json(updateAnimal)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})

//delete one
router.delete('/:id', getAnimal, async (req, res)=> {
    try{
        await res.animal.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }


})

async function getAnimal (req, res, next){
    let animal
    try{
        animal= await Animal.findById(req.params.id)
        if(animal==null){
            return res.status(404).json({message : 'Cannot find animal'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.animal=animal
    next()
}

module.exports = router