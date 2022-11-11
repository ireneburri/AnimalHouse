const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const fs = require("fs");

const path = require('path');
//require('dotenv').config({ path: path.resolve(__dirname, './.env') })


//per caricare le immagini sul server nella giusta cartella col nome completo:
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,  path.join(__dirname, './uploads'))        
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage})


//UPLOAD DI UN IMMAGINE
//da rivedere
router.post('/', upload.single("file"), async (req, res)=> {
    console.log(req.file, req.body)
    try{
        const newimg = await req.file.save()
        res.status(201).json(newimg)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})


//DELETE ONE IMAGE
router.delete('/:name', async (req, res)=> {
    console.log(req.params['name'])
    const fullpath = path.join(__dirname, './uploads/' + request.params['name']);
    console.log(fullpath)
    try{
        fs.unlinkSync(fullpath)
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }
})


module.exports = router