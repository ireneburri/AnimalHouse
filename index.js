global.rootDir = __dirname;
//.env
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');

//express stuff
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
/*
const pathGame = __dirname + '/game/dist/';
app.use(express.static(pathGame));

 */

/*const pathFront = __dirname + '/front/build/'
app.use(express.static(pathFront))*/
app.use('/front',express.static(path.join(__dirname, 'build')));
app.use('/front', express.static(global.rootDir + '/routes/uploads'));

app.use('/backOffice', express.static(global.rootDir + '/backOffice'));
app.use('/backOffice', express.static(global.rootDir + '/routes/uploads'));

app.use('/', express.static(global.rootDir + '/routes/uploads'));


/*const mongoCredentials = {
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PWD,
    site: process.env.MONGO_SITE
}*/
const MONGO_PWD = process.env.MONGO_PWD

const uri = `mongodb://site212224:${MONGO_PWD}@mongo_site212224?writeConcern=majority`
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


//feedback se la connessione riesce
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => { console.log('Connected to the database') })



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
const imageRouter = require('./routes/image')
const orderRouter = require('./routes/order')
const reservationRouter = require('./routes/reservation')
const quizRouter = require('./routes/quiz')
const dogFactRouter = require('./routes/dogFact')

app.use('/animal', animalRouter)
app.use('/item', itemRouter)
app.use('/user', userRouter)
app.use('/staff', staffRouter)
app.use('/service', serviceRouter)
app.use('/location', locationRouter)
app.use('/board', boardRouter)
app.use('/auth', authRouter)
app.use('/image', imageRouter)
app.use('/order', orderRouter)
app.use('/reservation', reservationRouter)
app.use('/uploads', express.static('uploads'));
app.use('/quiz', quizRouter)
app.use('/dogFact', dogFactRouter)

app.listen(8000, () => console.log("server started"))


app.get('/backOffice', (req, res) => {
    res.sendFile(
        global.rootDir + '/backOffice/login.html'
    )
})

app.get('/front/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
/*
app.get('/', function(req, res) {
    res.sendFile(pathGame + "index.html");
});
*/

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});
