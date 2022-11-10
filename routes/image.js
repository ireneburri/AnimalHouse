const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()

const path = require('path');
//require('dotenv').config({ path: path.resolve(__dirname, './.env') })

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
})


module.exports = router