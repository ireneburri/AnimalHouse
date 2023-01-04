const express = require('express')
const router = express.Router()
const Conflict = require("../models/mConflict")

//Get all
router.get('/', async(req, res)=> {
    try{
        const conflicts = await Conflict.find()
        res.json(conflicts)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//create one
router.post('/', async (req, res)=> {
    const conflict = new Conflict({
        service: req.body.service,
        quantity: req.body.quantity,
        timeS: req.body.timeS,
        timeE: req.body.timeE
    })
    try{
        const newConflict = await conflict.save()
        res.status(201).json(newConflict)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router
