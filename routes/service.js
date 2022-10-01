const express = require('express')
const router = express.Router()
const Service = require("../models/mService")

//get all
router.get('/', async(req, res)=> {
    try{
        const services = await Service.find()
        res.json(services)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})
//get one
router.get('/:id', getService, (req, res)=> {
    res.json(res.service)
})
//create one
router.post('/', async (req, res)=> {
    const service = new Service({
        name: req.body.name,
        img: req.body.img,
        location: req.body.location,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description
    })
    try{
        const newService = await service.save()
        res.status(201).json(newService)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getService, async (req, res)=> {

    if(req.body.name != null){
        res.service.name=req.body.name
    }
    if(req.body.img != null){
        res.service.img=req.body.img
    }
    if(req.body.location != null){
        res.service.location=req.body.location
    }
    if(req.body.price != null){
        res.service.price=req.body.price
    }
    if(req.body.category != null){
        res.service.category=req.body.category
    }
    if(req.body.description != null){
        res.service.description=req.body.description
    }
    try{
        const updateService = await res.service.save()
        res.json(updateService)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})
//delete one
router.delete('/:id', getService, async (req, res)=> {
    try{
        await res.service.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }


})

async function getService (req, res, next){
    let service
    try{
        service= await Service.findById(req.params.id)
        if(service==null){
            return res.status(404).json({message : 'Cannot find service'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.service=service
    next()
}

module.exports = router