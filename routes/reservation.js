const express = require('express')
const router = express.Router()
const Reservation = require("../models/mReservation")

//Create one reservation
router.post('/post', async (req, res)=> {
    const reservation = new Reservation({
        username: req.body.username,
        service: req.body.service,
        date_start: req.body.date_start,
        date_end: req.body.date_end,
        location: req.body.location,
        total: req.body.total
    })
    try{
        const newReservation = await reservation.save()
        res.status(201).json(newReservation)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

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

    if(dateOverlap(res.reservation.date_start, res.reservation.date_end, request.params.id, req.body.bookingList)){
        console.log('fata');
        return response.status(500).send('Le date richieste si sovrappongo con un altra prenotazione');
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

function dateOverlap(start, end, id, bookingList){
    start = new Date(start).getTime()
    end = new Date(end).getTime()
    console.log(bookingList);
    for(b in bookingList){
        bStart = new Date(bookingList[b]['start']).getTime()
        bEnd = new Date(bookingList[b]['end']).getTime()
        console.log('idOrigine: '+id+' idLisato: '+bookingList[b]['id']);
  
        if(id == bookingList[b]['id']){
          continue
        }
        if(start >= bStart && start <= bEnd){ //a tra c e d
            return true
        }
        if(start >= bStart && start <= bEnd){//b tra c e d
            return true
        }
        if(bStart >= start && bStart <= end){//c tra a e b
            return true
        }
        if(bEnd >= start && bEnd <= end){//d tra a e b
            return true
        }
    }
    return false
}

module.exports = router