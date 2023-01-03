const express = require('express')
const router = express.Router()
const Reservation = require("../models/mReservation")
const Location = require('../models/mLocation');

//Create one reservation
router.post('/post', async (req, res)=> {
    const reservation = new Reservation({
        username: req.body.username,
        service: req.body.service,
        allday: req.body.allday,
        time: req.body.time,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        location: req.body.location,
        total: req.body.total,
        mode: req.body.mode
    })
    try{
        const newReservation = await reservation.save()
        res.status(201).json(newReservation)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Get all reservation
router.get('/', async(req, res) => {
    try {
        const reservations = await Reservation.find()
        res.json(reservations)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

//Get reservations filtered by client username
router.get("/username/:username", async (request , response) => {
    const username = request.params.username
    const reservations = await Reservation.find({username: username});

    try {
      response.send(reservations);
    } catch (error) {
      response.status(500).send(error);
    }
});

//Get reservations filtered by location
router.get("/location/:location", async (request , response) => {
    const location = request.params.location
    const reservations = await Reservation.find({location: location});

    try {
      response.send(reservations);
    } catch (error) {
      response.status(500).send(error);
    }
});

//Find reservations filtered by location and service name
router.post("/find", async (request, response) => {
    try {
      const reservations = await Reservation.find({location: req.body.location, service: req.body.service});
      response.send(reservations);
    } catch (error) {
      response.status(500).send(error);
    }
});

//Delete one reservation by id
router.delete('/:id', getReservation, async (req, res)=> {
    try {
        await res.reservation.remove()
        res.json({message: 'Deleted Successfully'})
    } catch (error) {
        res.status(500).json({message : err.message})
    }
});

//Update one reservation by id
router.patch('/:id', getReservation, async (req, res)=> {

    if(req.body.username != null){
        res.reservation.username=req.body.username
    }
    if(req.body.service != null){
        res.reservation.service=req.body.service
    }
    if(req.body.allday != null){
        res.reservation.allday=req.body.allday
    }
    if(req.body.time != null){
        res.reservation.time=req.body.time
    }
    if(req.body.date_start != null){
        res.reservation.date_start=req.body.date_start
    }
    if(req.body.date_end != null){
        res.reservation.date_end=req.body.date_end
    }
    if(req.body.location != null){
        res.reservation.location=req.body.location
    }
    if(req.body.total != null){
        res.reservation.total=req.body.total
    }
    if(req.body.mode != null){
        res.reservation.mode=req.body.mode
    }

    if(dateOverlap(res.reservation.date_start, res.reservation.date_end, req.params.id, req.body.reservationList, req.body.service, req.body.location)){
        console.log('fata');
        return res.json({message: 'La prenotazione è sbagliata'})
        //return res.status(500).json('Le date richieste si sovrappongo con un altra prenotazione');
    }

    try{
        const updateReservation = await res.reservation.save()
        res.json(updateReservation)
    } catch(err){
        res.status(400).json({message: err.message}) //parametro non accettabile
    }
});


async function getReservation (req, res, next){
    let reservation
    try{
        reservation= await Reservation.findById(req.params.id)
        if(reservation==null){
            return res.status(404).json({message : 'Cannot find reservation'})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
    res.reservation=reservation
    next()
}

//controlla sovrapposizione solo dell'ora (forse non c'è neanche bisogno di distinguere i casi allday e non)
async function dateOverlap(start, end, id, reservationList, serName, locName){
    console.log("sono in dateOverlap");
    start = new Date(start).getTime()
    end = new Date(end).getTime()
    console.log(reservationList);
    console.log(start);
    console.log(end);
    let bEnd
    let bStart

    if (start >= end) {
        return true
    } 

    let count = 0;
    const location = await Location.find({ name: locName });
    console.log("location: "+location);
    console.log("location[0]: "+location[0])
    let quantity = 0;
    console.log("loc.disponibility: "+location.disponibility)
    for (const key in location.disponibility) {
        console.log("loc.disponibility["+ key + "] " + location.disponibility)
        if (location.disponibility[key].service == serName){
            console.log("loc.disponibility[key].service: "+location.disponibility[key].service)
            quantity = location.disponibility[key].quantity;
            console.log("loc.disponibility[key].quantity: "+location.disponibility[key].quantity)
        }
    }
    console.log("quantity of: " + serName + " in: " + locName + " quantity: " + quantity);

    for(let key in reservationList){
        if (reservationList[key].service == serName){ //controllo solo le reservation del mio stesso servizio
            if (reservationList[key].location == locName){ //controllo solo le reservation del mio stesso negozio

                bStart = new Date(reservationList[key]['date_start']).getTime()
                bEnd = new Date(reservationList[key]['date_end']).getTime()
                console.log(bStart);
                console.log(bEnd);
                console.log('idOrigine: '+ id +' idLisato: '+ reservationList[key]['_id']);

                if(id == reservationList[key]['_id']){
                    continue
                }else if(start >= bStart && start < bEnd){ //a tra c e d
                    //return true
                    count = count + 1;
                }else if(end > bStart && end <= bEnd){//b tra c e d
                    //return true
                    count = count + 1;
                }else if(bStart >= start && bStart < end){//c tra a e b
                    //return true
                    count = count + 1;
                }else if(bEnd > start && bEnd <= end){//d tra a e b
                    //return true
                    count = count + 1;
                }
                console.log(count + "giro: " + key)
                if (count >= quantity){
                    return true
                }
            }
        }
    }
    return false
}

module.exports = router
