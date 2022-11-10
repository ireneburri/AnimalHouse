const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const path = require('path');
//require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const Image = require("./uploads")


//per caricare le immagini sul server nella giusta cartella col nome completo:
const multer = require('multer')
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
router.delete('/:name', getImage, async (req, res)=> {
    try{
        await res.image.remove()
        res.json({message: 'Deleted Successfully'})
    } catch(err){
        res.status(500).json({message : err.message})
    }
})


async function getImage (req, res, next){
    let image
    try{
        image = await Image.filename(req.params.name)
        if(image==null){
            return res.status(404).json({message : 'Cannot find image'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.image=image
    next()
}


module.exports = router