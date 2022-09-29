//global.rootDir = __dirname ;
//.env
require('dotenv').config();

const mongoose = require('mongoose');

//express stuff
const express = require('express');
const app = express();


//const cors = require('cors');
//const path = require('path');

//app.use(cors());
app.use(express.json());

const mongoCredentials = {
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PSW,
    site: process.env.MONGO_SITE
}

//vero server mongodb
/*
const uri = `mongodb://site212224:${mongoCredentials.pwd}@$site212224?writeConcern=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
*/

//per connettere la tua applicazione locale al database (?)
mongoose.connect('mongodb://127.0.0.1/animalHouse', { useNewUrlParser: true});

// vero url per il progetto
//mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}) //comando per connsessione

//prove (?)
const db= mongoose.connection
db.on('error', (error)=> console.log(error))
db.once('open', () => {console.log('Connected to the database')})



//allow us to any middleware we want
app.use(express.json())

const animalRouter = require('./routes/animal')
const itemRouter = require('./routes/item')
const userRouter = require('./routes/user')
const staffRouter = require('./routes/staff')
const serviceRouter = require('./routes/service')
const locationRouter = require('./routes/location')

app.use('/animal', animalRouter)
app.use('/item', itemRouter)
app.use('/user', userRouter)
app.use('/staff', staffRouter)
app.use('/service', serviceRouter)
app.use('/location', locationRouter)

app.listen(8000,()=>console.log("server started"))

/*
app.get('/', (req, res) => {
    res.sendFile(
        global.rootDir + '/public/front-office/index.html'
    )
})

app.get('/staff', (req, res) => {
    res.sendFile(
        global.rootDir + '/public/back-office/index.html'
    )
})

app.get('/dashboard', (req, res) => {
    res.sendFile(
        global.rootDir + '/public/html/dashboard/index.html'
    )
})
*/


