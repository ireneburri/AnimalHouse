const express = require('express')
const router = express.Router()
const Item = require("../models/mItem")
const auth = require("./auth")

//get all
router.get('/', async(req, res)=> {
    try{
        const items = await Item.find()
        res.json(items)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})
//get one
router.get('/:id', getItem, (req, res)=> {
    res.json(res.item)
})

//get filtered
router.get('/species/:species/size/:size', async(req, res)=> {
    //console.log('ao')
    const species = req.params.species
    //console.log(species)
    const size = req.params.size
    //console.log(size)
    var items
    if(species!=='all'){
        items= await Item.find({$and: [{species: species}, {quantity: {$gt: 0}}, {$or: [{size: size}, {size:'all'}]}]}).limit(3)
    }
    else{
        items= await Item.find({quantity: {$gt: 0}}).limit(3)
    }
    //console.log(items)
    //console.log(items)
    try{
        res.json(items)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})


//create one
router.post('/', auth.verifyLogin, auth.verifyAuth(auth.authLevelDict["staff"]), async (req, res)=> {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        category: req.body.category,
        species: req.body.species,
        animal: req.body.animal,
        quantity: req.body.quantity,
        description: req.body.description,
        brand: req.body.brand,
        vip: req.body.vip,
    })
    try{
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getItem, async (req, res)=> {
    if(req.body.name != null){
        res.item.name=req.body.name
    }
    if(req.body.price != null){
        res.item.price=req.body.price
    }
    if(req.body.img != null){
        res.item.img=req.body.img
    }
    if(req.body.category != null){
        res.item.category=req.body.category
    }
    if(req.body.species != null){
        res.item.species=req.body.species
    }
    if(req.body.animal != null){
        res.item.animal=req.body.animal
    }
    if(req.body.quantity != null){
        res.item.quantity=req.body.quantity
    }
    if(req.body.description != null){
        res.item.description=req.body.description
    }
    if(req.body.brand != null){
        res.item.brand=req.body.brand
    }
    if(req.body.vip != null){
        res.item.vip=req.body.vip
    }

    try{
        const updateItem = await res.item.save()
        res.json(updateItem)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})
//delete one
router.delete('/:id', getItem, async (req, res)=> {
    try{
        await res.item.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

async function getItem (req, res, next){
    let item
    try{
        item= await Item.findById(req.params.id)
        if(item==null){
            return res.status(404).json({message : 'Cannot find item'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.item=item
    next()
}

module.exports = router