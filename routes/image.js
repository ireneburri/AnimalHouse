const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const fs = require("fs");

//const fileUpload = require('express-fileupload')
//router.use(fileUpload());

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

/*
// For handling the upload request
router.post("/upload", function (req, res) {
  
    // When a file has been uploaded
    if (req.files && Object.keys(req.files).length !== 0) {
        
        console.log(req.files.uploadedFile);
        // Uploaded path
        const uploadedFile = req.files.uploadFile;

        // Logging uploading file
        console.log(uploadedFile);

        // Upload path
        const uploadPath = __dirname + "/uploads/" + uploadedFile.name;

        // To save the file using mv() function
        uploadedFile.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send("Failed");
            } else res.send({ status: "Success", path: path, message: "Successfully Uploaded"});
      });

    } else res.status(400).send("No files were uploaded");
});
*/

//UPLOAD DI UN IMMAGINE
//da rivedere
router.post('/', upload.single("file"), async (req, res)=> {
    try{
        res.status(200).json(req.file)
        console.log(req.file);
        res.json({ message: "Successfully uploaded files" });
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})


/*
//MODIFY AD IMAGE
router.patch('/:name', upload.single("file"), async (req, res)=> {
    console.log(req.file)
    try{
        const newimg = await req.file.save()
        res.json(newimg)
    } catch(err) {
        res.status(400).json({message: err.message})
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
            res.json({message: "Deleted Successfully"})
        }
        else res.json({message: "The file doesn't exits"})        
    } catch(err){
        res.status(500).json({message : err.message})
    }
})
*/

module.exports = router