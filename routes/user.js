const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

//per criptare e decriptare le password nel database:
const CryptoJS = require("crypto-js");
const ENCRIPTION_KEY = process.env.CRYPT_KEY

const User = require("../models/mUser")


//get all
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        for (let key in users) {
            users[key].password = CryptoJS.AES.decrypt(users[key].password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
        }
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})


//get one
router.get('/id/:id', getUser, (req, res) => {
    res.user.password = CryptoJS.AES.decrypt(res.user.password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
    res.json(res.user)
})

//get one by username
router.get('/username/:username', async(req, res) => {
    const username = req.params.username
    let user
    try {
        user = await User.find({ username: username });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        } else {
            user[0].password = CryptoJS.AES.decrypt(user[0].password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)
            res.status(201).json(user)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})


//create one
router.post('/', async(req, res) => {
    console.log(req.file, req.body)
    const user = new User({
        username: req.body.username,
        surname: req.body.surname,
        name: req.body.name,
        img: req.body.img,
        password: CryptoJS.AES.encrypt(req.body.password, ENCRIPTION_KEY).toString(),
        tel: req.body.tel,
        residence: req.body.residence,
        preferences: req.body.preferences,
        vip: req.body.vip,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//update one by id
router.patch('/id/:id', getUser, async(req, res) => {

    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.surname != null) {
        res.user.surname = req.body.surname
    }
    if (req.body.img != null) {
        res.user.img = req.body.img
    }
    if (req.body.password != null) {
        //res.user.password=req.body.password
        res.user.password = CryptoJS.AES.encrypt(req.body.password, ENCRIPTION_KEY).toString()
    }
    if (req.body.tel != null) {
        res.user.tel = req.body.tel
    }
    if (req.body.residence != null) {
        res.user.residence = req.body.residence
    }
    if (req.body.preferences != null) {
        res.user.preferences = req.body.preferences
    }
    if (req.body.vip != null) {
        res.user.vip = req.body.vip
    }

    try {
        const updateUser = await res.user.save()
        res.json(updateUser)
    } catch (err) {
        res.status(400).json({ message: err.message }) //parametro non accettabile
    }

})

//update one by username
router.patch('/username/:username',  async(req, res) => {

    const username=req.params.username
    let user
    try {
        user = await User.findOne({username:username})
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    if (user.username != null) {
        res.user.username = user.username
    }
    if (user.name != null) {
        res.user.name = user.name
    }
    if (user.surname != null) {
        res.user.surname = user.surname
    }
    if (user.img != null) {
        res.user.img = user.img
    }
    if (user.password != null) {
        //res.user.password=req.body.password
        user.password = CryptoJS.AES.encrypt(user.password, ENCRIPTION_KEY).toString()
    }
    if (user.tel != null) {
        res.user.tel = user.tel
    }
    if (user.residence != null) {
        res.user.residence = user.residence
    }
    if (user.preferences != null) {
        res.user.preferences = user.preferences
    }
    if (user.vip != null) {
        res.user.vip = user.vip
    }

    try {
        const updateUser = await res.user.save()
        res.json(updateUser)
    } catch (err) {
        res.status(400).json({ message: err.message }) //parametro non accettabile
    }

})




//delete one
router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }


})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router