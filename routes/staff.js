const express = require('express')
const router = express.Router()
const Staff = require("../models/mStaff")

//get all
router.get('/', async(req, res)=> {
    try{
        const staffs = await Staff.find()
        res.json(staffs)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})
//get one
router.get('/:id', getStaff, (req, res)=> {
    res.json(res.staff)
})
//create one
router.post('/', async (req, res)=> {
    const staff = new Staff({
        username: req.body.username,
        surname: req.body.surname,
        name: req.body.name,
        img: req.body.img,
        password:req.body.password,
        role:req.body.role,
        location:req.body.location,
    })
    try{
        const newStaff = await staff.save()
        res.status(201).json(newStaff)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})
//update one
router.patch('/:id', getStaff, async (req, res)=> {

    if(req.body.username != null){
        res.staff.username=req.body.username
    }
    if(req.body.name != null){
        res.staff.name=req.body.name
    }
    if(req.body.surname != null){
        res.staff.surname=req.body.surname
    }
    if(req.body.img != null){
        res.staff.img=req.body.img
    }
    if(req.body.password != null){
        res.staff.password=req.body.password
    }
    if(req.body.role != null){
        res.staff.role=req.body.role
    }
    if(req.body.location != null){
        res.staff.location=req.body.location
    }
    try{
        const updateStaff = await res.staff.save()
        res.json(updateStaff)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }

})
//delete one
router.delete('/:id', getStaff, async (req, res)=> {
    try{
        await res.staff.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }


})

async function getStaff (req, res, next){
    let staff
    try{
        staff= await Staff.findById(req.params.id)
        if(staff==null){
            return res.status(404).json({message : 'Cannot find staff'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.staff=staff
    next()
}

module.exports = router