const express = require('express')
const router = express.Router()
const Service = require("../models/mService")

//Get all
router.get('/', async(req, res)=> {
    try{
        const services = await Service.find()
        res.json(services)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})


//get tot random
router.get('/size/:size', async(req, res) => {
    try{
        var size= req.params.size
        var db = await Service.find()
        console.log(db)
        var service = []

        var random=0
        do{
            random=Math.random()*db.length
            console.log(random)
            service.push(db[Math.floor(random)])
            db.pop(db[Math.floor(random)])

            console.log(db)
            //console.log(quiz)
            size=size-1
            //console.log(size)

        }while(size>0)
        res.json(service)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
})


//Get service filtered by mode
router.get("/mode/:mode", async (request , response) => {
    const mode = request.params.mode
    const services = await Service.find({mode: mode});

    try {
      response.send(services);
    } catch (error) {
      response.status(500).send(error);
    }
});

//Get one
router.get('/id/:id', getService, (req, res)=> {
    res.json(res.service)
})

//get one by name
router.get('/name/:name', async(req, res) => {
    const name = req.params.name
    let service
    try {
        service = await Service.find({ name: name });
        if (service == null) {
            return res.status(404).json({ message: 'Cannot find service' })
        } else {
            res.status(201).json(service)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


//get one by location
router.get('/location/:location?', async(req, res) => {
    const location = req.params.location
    let service
    try {
        service = await Service.aggregate([{ $match: { location: location } }, { $sample: { size: 3 }} ])

        if(service.length<3){
            const moreService = await Service.aggregate([{ $match: { location: {$not:{$eq:location}} } }, { $sample: { size: 3-service.length }}])
            service.push(moreService)
        }
        if (service == null) {
            return res.status(404).json({ message: 'Cannot find service' })
        } else {
            res.status(201).json(service)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

//Create one
router.post('/', async (req, res)=> {
    const service = new Service({
        mode: req.body.mode,
        name: req.body.name,
        img: req.body.img,
        location: req.body.location,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        allday: req.body.allday,
        time: req.body.time,
        vip: req.body.vip,
    })
    try{
        const newService = await service.save()
        res.status(201).json(newService)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Update one
router.patch('/:id', getService, async (req, res)=> {

    if(req.body.mode != null){
        res.service.mode=req.body.mode
    }
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
    if(req.body.allday != null){
        res.service.allday=req.body.allday
    }
    if(req.body.time != null){
        res.service.time=req.body.time
    }
    if(req.body.vip != null){
        res.service.vip=req.body.vip
    }

    try{
        const updateService = await res.service.save()
        res.json(updateService)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})

//Delete one
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