const express = require('express')
const router = express.Router()
const Location = require("../models/mLocation")

//get all
router.get('/', async(req, res)=> {
    try{
        const locations = await Location.find()
        res.json(locations)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})
//get one
router.get('/:id', getLocation, (req, res)=> {
    res.json(res.location)
})
//create one
router.post('/', async (req, res)=> {
    const location = new Location({
        name: req.body.name,
        img: req.body.img,
        address: req.body.address,
        staff: req.body.staff,
        services: req.body.services,
        description: req.body.description
    })
    try{
        const newLocation = await location.save()
        res.status(201).json(newLocation)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getLocation, async (req, res)=> {

    if(req.body.name != null){
        res.location.name=req.body.name
    }
    if(req.body.img != null){
        res.location.img=req.body.img
    }
    if(req.body.address != null){
        res.location.address=req.body.address
    }
    if(req.body.staff != null){
        res.location.staff=req.body.staff
    }
    if(req.body.services != null){
        res.location.services=req.body.services
    }
    if(req.body.description != null){
        res.location.description=req.body.description
    }
    try{
        const updateLocation = await res.location.save()
        res.json(updateLocation)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})
//delete one
router.delete('/:id', getLocation, async (req, res)=> {
    try{
        await res.location.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }


})

async function getLocation (req, res, next){
    let location
    try{
        location= await Location.findById(req.params.id)
        if(location==null){
            return res.status(404).json({message : 'Cannot find location'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.location=location
    next()
}

module.exports = router