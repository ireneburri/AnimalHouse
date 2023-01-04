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
router.get('/id/:id', getLocation, (req, res)=> {
    res.json(res.location)
})

//get by name
router.get('/name/:name', async(req, res)=>{
    let location
    const name=req.params.name
    try{
        location= await Location.find({name:name})
        if(location==null){
            return res.status(404).json({message : 'Cannot find location'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.location=location
})

//create one
router.post('/', async (req, res)=> {
    const location = new Location({
        name: req.body.name,
        img: req.body.img,
        address: req.body.address,
        tel: req.body.tel,
        staff: req.body.staff,
        description: req.body.description,
        disponibility: req.body.disponibility
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
    if(req.body.tel != null){
        res.location.tel=req.body.tel
    }
    if(req.body.staff != null){
        res.location.staff=req.body.staff
    }
    if(req.body.description != null){
        res.location.description=req.body.description
    }
    if(req.body.disponibility != null){
        res.location.disponibility=req.body.disponibility
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

//aggiungi una disponibilità nuova (nuovo servizio + quantity = 1)
router.patch('/disponibility/:name', async (req, res)=> {
    let loc
    loc = await Location.findOne({ name: req.params.name })

    if(req.body.disponibility != null){
        for (const key in req.body.disponibility) {
            loc.disponibility.push(req.body.disponibility[key])
        }
    }
    
    try{
        const updateLocation = await loc.save()
        res.json(updateLocation)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//rimuovi una disponibilità 
router.patch('/rmdisponibility/:name', async (req, res)=> {
    let loc
    loc = await Location.findOne({ name: req.params.name })

    if(req.body.disponibility.service != null){

        console.log(req.body.disponibility.service)
        console.log(loc.disponibility)
        
        let index = -1;
        for (let k in loc.disponibility){
            if (loc.disponibility[k].service === req.body.disponibility.service){
                index = k;
            }
        }
        console.log(index)
        loc.disponibility.splice(index, 1);
        console.log(loc.disponibility)
    }
    
    try{
        const updateLocation = await loc.save()
        res.json(updateLocation)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})


module.exports = router