global.rootDir = __dirname ;
//.env

const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');

//express stuff
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

/*const mongoCredentials = {
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PWD,
    site: process.env.MONGO_SITE
}*/
const MONGO_PWD = process.env.MONGO_PWD

const uri = `mongodb://site212224:${MONGO_PWD}@mongo_site212224?writeConcern=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})



//per connettere la tua applicazione ad un database locale
//mongoose.connect('mongodb://127.0.0.1/animalHouse', { useNewUrlParser: true});

//feedback se la connessione riesce
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
const boardRouter = require('./routes/board')
const authRouter = require('./routes/auth')

app.use('/animal', animalRouter)
app.use('/item', itemRouter)
app.use('/user', userRouter)
app.use('/staff', staffRouter)
app.use('/service', serviceRouter)
app.use('/location', locationRouter)
app.use('/board', boardRouter)
app.use('/auth', authRouter)
app.use('/uploads', express.static('uploads'));

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


