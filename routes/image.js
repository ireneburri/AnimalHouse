const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const path = require('path');

const fs = require("fs");
const multer = require('multer');

//per caricare le immagini sul server nella giusta cartella col nome completo:
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
    console.log(req.file);
    try{
        console.log("try");
        //res.status(200).json(req.file)
        res.json({ message: "Successfully uploaded files" });
        console.log("Successfully uploaded files" );
    } catch(err) {
        res.status(400).json({message: err.message})
        console.log(err.message );
    }
})


//DELETE ONE IMAGE
router.delete('/:name', async (req, res)=> {
    console.log(req.params['name'])
    const fullpath = path.join(__dirname, './uploads/' + req.params['name']);
    console.log(fullpath)
    try{
        if (fs.existsSync( fullpath )) {
            fs.unlinkSync(fullpath)
            res.json({message: "File deleted successfully"})
        }
        else res.json({message: "The file doesn't exits"})        
    } catch(err){
        res.status(500).json({message : err.message})
    }
})


module.exports = router