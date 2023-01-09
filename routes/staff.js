const express = require('express')
const router = express.Router()
const Staff = require("../models/mStaff")

const CryptoJS = require("crypto-js");
const auth = require("./auth")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const ENCRIPTION_KEY = process.env.CRYPT_KEY

//get all
router.get('/', auth.verifyLogin, auth.verifyAuth(auth.authLevelDict["staff"]), async(req, res)=> {
    try{
        const staffs = await Staff.find()
        for (let key in staffs) {
            staffs[key].password = CryptoJS.AES.decrypt(staffs[key].password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
        }
        res.json(staffs)
    } catch(err) {
        res.status(500).json({message: err.message})
    }


})

//get one by username
router.get('/username/:username', async(req, res)=> {
    const username = req.params.username
    let staff 
    try{
        staff = await Staff.find({username: username});
        if(staff==null){
            return res.status(404).json({message : 'Cannot find staff'})
        }
        else {
            staff[0].password = CryptoJS.AES.decrypt(staff[0].password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
            res.status(201).json(staff)
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
})

//get one by id
router.get('/id/:id', getStaff, (req, res)=> {
    res.staff.password = CryptoJS.AES.decrypt(res.staff.password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
    res.json(res.staff)
})

//create one
router.post('/', auth.verifyLogin, auth.verifyAuth(auth.authLevelDict["staff"]), async (req, res)=> {
    const staff = new Staff({
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        img: req.body.img,
        password: CryptoJS.AES.encrypt(req.body.password, ENCRIPTION_KEY).toString(),
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
    if(req.body.email != null){
        res.staff.email=req.body.email
    }
    if(req.body.img != null){
        res.staff.img=req.body.img
    }
    if(req.body.password != null){
        res.staff.password=CryptoJS.AES.encrypt(req.body.password, ENCRIPTION_KEY).toString()
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