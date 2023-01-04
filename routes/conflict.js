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

module.exports = router
