import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar/navbar';
import styled from 'styled-components';
import immagine from '../img/dog.jpg';
import Footer from '../components/Footer/footer';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import getDayOfYear from "date-fns/esm/getDayOfYear";

import * as bootstrap from "bootstrap";
import Toast from 'react-bootstrap/Toast';

const Container = styled.div`
`
const Wrapper = styled.div`
    padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    display: flex;
    @media (max-width: 1024px) {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        font-size: smaller;
}
`
const ImgContainer = styled.div`
    width: 40%;
    @media (max-width: 1024px) {
        width: 100%;
}
`
const Image = styled.img`
    flex: 1;
    width: 100%;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 30px;
`
const PrenoContainer = styled.div`
`
const Category = styled.span`
    color: white;
    background-color: teal;
    border-radius: 30px;
    padding-left: 10px;
    padding-right: 10px;
`
const Title = styled.h2`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0px;
    font-size: 20px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 20px;
`
const LocationContainer = styled.div`
    margin-top: 1em;
`

function SingleService() {
    const navigate = useNavigate();
    const data = useParams();
    const name = data.name;

    const [datas, setDatas] = useState([]);
    const duration = datas.time

    const [locations, setLocations] = useState([]);
    const [loc, setLoc] = useState({
        location: ""
    })

    //data attuale + 1 e orario settato alle 8:00
    var today = new Date()
    var tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const [dateTime, setDateTime] = useState(setHours(setMinutes(new Date().setDate(tomorrow.getDate()), 0), 16));
    console.log(dateTime.getDate())
    const [endDate, setEndDate] = useState(null);

    const [booking, setBooking] = useState([])
    const [bookingDays, setBookingDays] = useState([])
    const [bookingDaysForCheckFormat, setBookingDaysForCheckFormat] = useState([])

    const [complete, setComplete] = useState([])
    const [completeDays, setCompleteDays] = useState([])

    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);

    var booked = []

    useEffect(() => {
        console.log("stocazzo")
        fetchData();
        fetchBookings();
    }, [loc, dateTime]);

    function handleLoc(e) {
        const newloc = { ...loc }
        newloc.location = e.target.value
        setLoc(newloc)
        // console.log(newloc)
    }

    function handleLoc2(e) {
        const newloc = { ...loc }
        newloc.location = e.target.value
        setLoc(newloc)
        // console.log(newloc.location)
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setDateTime(start);
        setEndDate(end);
        //console.log(start);
        //console.log(end);
    }; //setta data di inizio e data di fine

    const fetchData = async () => {
        const items = await fetch(`https://site212224.tw.cs.unibo.it/Service/name/${name.substring(1)}`);
        const fetched = await items.json();

        setDatas(fetched[0])
        setLocations(fetched[0].location);
    }

    const changeFormat = (e) => {
        e.start = setMinutes(new Date(e.start), 0, 0);
        e.end = setMinutes(new Date(e.end), 0, 0);
        return e;
    } //setta a 0 i minuti

    const fetchBookings = async () => {
        const data = await fetch("https://site212224.tw.cs.unibo.it/Reservation");
        const items = await data.json();
        // console.log(items)

        for (let booking in items) {
            if (items[booking].mode === "In Store") {
                // console.log('in store')
                if (items[booking].service === name.substring(1) && items[booking].location === loc.location)
                    booked.push({ start: items[booking].date_start, end: items[booking].date_end })
            } else if (items[booking].mode === "Online") {
                // console.log('online')
                if (items[booking].service === name.substring(1))
                    booked.push({ start: items[booking].date_start, end: items[booking].date_end })
            }
        }

        booked = booked.map(e => (
            e = changeFormat(e)
        ))

        // console.log(booked)

        var arrayBooking = []; //tutte le prenotazioni in un giorno per un servizio a ore
        var arrayBookingDays = []; //tutte le prenotazioni per un servizio a giorni
        setBookingDaysForCheckFormat(booked);


        var arrayBookingNotAvailable = []; // ore in cui il servizio non è più dispnibile
        var arrayBookingDaysNotAvailable = []; // giorni in cui il servizio non è più disponibile

        var hoursAvailability = 0
        var daysAvailability = 0

        if (!datas.allday) {
            for (let i in booked) {
                if (booked[i].start.toDateString() === dateTime.toDateString()) {
                    // se la data di inizio è = alla data che selezioni 
                    let x = booked[i].start.getHours();
                    let z = booked[i].end.getHours();
                    while (x < z) {
                        arrayBooking.push(setHours(setMinutes(new Date(dateTime), 0), x++));
                        //blocco tutte le ore singolarmente di un singolo appuntamento
                    }
                }
            }
            console.log(arrayBooking)
            for (let h in arrayBooking) {
                // console.log(booking[h])
                for (let j in arrayBooking) {
                    if (arrayBooking[h].getHours() === arrayBooking[j].getHours()) {
                        hoursAvailability = hoursAvailability + 1
                    }
                }
                console.log(arrayBooking[h])
                console.log(hoursAvailability)
                if (hoursAvailability >= 2) {
                    arrayBookingNotAvailable.push(arrayBooking[h])
                }
                hoursAvailability = 0;
            }
        }

        if (datas.allday) {
            for (let i in booked) {
                let x = getDayOfYear(booked[i].start);
                let z = getDayOfYear(booked[i].end);
                let j = 0;
                while (x <= z) {
                    arrayBookingDays.push(addDays(booked[i].start, j++));
                    x++;
                    //blocco tutte le date di un appuntamento a giorni
                }
            }
            console.log(arrayBookingDays)
            for (let h in arrayBookingDays){
                for (let j in arrayBookingDays){
                    if (arrayBookingDays[h].getDate() === arrayBookingDays[j].getDate() 
                    && arrayBookingDays[h].getMonth() === arrayBookingDays[j].getMonth() 
                    && arrayBookingDays[h].getFullYear() === arrayBookingDays[j].getFullYear()){
                        daysAvailability = daysAvailability + 1
                    }
                }
                console.log(arrayBookingDays[h])
                console.log(daysAvailability)
                if (daysAvailability >= 2){
                    arrayBookingDaysNotAvailable.push(arrayBookingDays[h])
                }
                daysAvailability = 0
            }
        }

        setBooking(arrayBooking);
        setBookingDays(arrayBookingDays);

        setComplete(arrayBookingNotAvailable);
        setCompleteDays(arrayBookingDaysNotAvailable);

        // console.log(arrayBookingDaysNotAvailable)
        // arrayBookingDaysNotAvailable = arrayBookingDaysNotAvailable.map(e => (
        //     e = changeFormat(e)
        // ))
        // console.log(arrayBookingDaysNotAvailable)

        setBookingDaysForCheckFormat(arrayBookingDaysNotAvailable)
    }

    function addHoursToDate(date, hours) {
        return new Date(new Date(date).setHours(new Date(date).getHours() + (hours)));
    } //agagiunge x ore alla x data
    
    function dateDiffInDays(a, b) { //differenza tra due date
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return (Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1);
    }

    // tomorrow.setDate(today.getDate() + 1)

    function dateOverlap(start, end, bookingList) {
        console.log(bookingList)
        var start = new Date(start)
        var end = new Date(end)
        var dateDiff = dateDiffInDays(start, end)
            for (let x = 0; x < dateDiff; x++) {
                for (let y in bookingList){
                    if (start.getDate() === bookingList[y].getDate() && start.getMonth() === bookingList[y].getMonth() && start.getFullYear() === bookingList[y].getFullYear())
                        return true
                }
                start.setDate(start.getDate() + 1)
            }
        return false
    }


    const handleSubmit = (event) => {
        if (localStorage.token) {
            event.preventDefault();
            let start = setHours(new Date(dateTime), dateTime.getHours())
            var end;
            var total;

            if (!datas.allday) { //stesso giorno
                var tmp = addHoursToDate(start, Number(datas.time)) //data di fine
                end = setHours(new Date(tmp), tmp.getHours())
                total = datas.price;
            } else {
                end = setHours(endDate, 20);
                total = datas.price * dateDiffInDays(start, end); //calcoli il prezzo per diffenza in giorni
            }


            const body = {
                username: localStorage.username,
                service: datas.name,
                time: datas.time,
                date_start: start,
                date_end: end,
                location: loc.location,
                total: Math.ceil(total), //arrotondare per eccesso
                allday: datas.allday,
                mode: datas.mode
            }

            let containsBookedTimes = false;
            let containsBookedDays = false;
            // let available = true;

            if (!datas.allday) {
                console.log(complete)
                for (let x = 0; x < datas.time; x++) {
                    for (let h in complete) {
                        if (complete[h].getHours() === (start.getHours() + x)) {
                            containsBookedTimes = true; //prenotazioni in ore
                        }
                    }
                }
            }
            else {
                containsBookedDays = dateOverlap(start, end, bookingDaysForCheckFormat);
            }

            console.log(containsBookedDays)


            if (end === undefined) {
                var myAlert = document.getElementById('toastNotice');//select id of toast
                var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
                bsAlert.show();//show it
            }
            else if (containsBookedTimes) {
                var myAlert = document.getElementById('toastNotice2');//select id of toast
                var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
                bsAlert.show();//show it
            }
            else if (containsBookedDays) {
                var myAlert = document.getElementById('toastNotice4');//select id of toast
                var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
                bsAlert.show();//show it
            }
            else if (loc.location === "" || loc.location === undefined) {
                var myAlert = document.getElementById('toastNotice3');//select id of toast
                var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
                bsAlert.show();//show it
            }
            else {
                console.log(body); //richiesta api
                axios.post("http://site212224.tw.cs.unibo.it/Reservation/post",
                    body).then(res =>
                        console.log(res)
                        // ).then(() => navigate('/account')
                    ).catch(error => console.log(error));
            }
        } else {
            event.preventDefault();
            var myAlert = document.getElementById('toastNotice5');//select id of toast
            var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
            bsAlert.show();//show it
        }
    }

    return (
        <Container>
            <Navbar />
            <Wrapper className='container'>
                <ImgContainer className='col-lg-3'>
                    <Image src={immagine} />
                </ImgContainer>
                <InfoContainer className='col-lg-5'>
                    <Category> {datas.category} </Category>
                    <Title style={{ marginTop: '1em', marginBottom: '0px' }}> {datas.name} </Title>
                    <Desc> Description: {datas.description} </Desc>
                    <p> Duration: {datas.allday ? "all day" : datas.time + " hour/s"} </p>
                    <Price> Price: €{datas.price} </Price>
                    <LocationContainer >
                        {datas.mode === "At Home" || datas.mode === "online" ?
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"> ADDRESS </span>
                                <input type="text" className="form-control" placeholder="Flat 6, 10 London Road, Brighton" aria-label="address" aria-describedby="basic-addon1" onChange={(e) => handleLoc(e)} />
                            </div> :
                            <select id="locSelector" className="form-select" aria-label="Default select example" onChange={(e) => handleLoc2(e)}>
                                <option value="select location" key="default" disabled > select location </option>
                                {locations.map(loc => (
                                    <option value={loc} key={loc}>{loc}</option>
                                ))};
                            </select>}
                    </LocationContainer>
                </InfoContainer>

                <PrenoContainer className='col-lg-4'>
                    <div style={{ marginLeft: '2em' }}>
                        {!datas.allday && <form>
                            <div className="section">
                                <h4 className="section-title mb-2">Seleziona data e orario</h4>
                                <div className="section-content">
                                    <DatePicker
                                        selected={dateTime}
                                        onChange={date => setDateTime(date)}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={60}
                                        timeCaption="time"
                                        dateFormat="d MMMM yyyy - h:mm"
                                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                                        maxTime={setHours(setMinutes(new Date(), 0), (20 - datas.time))}

                                        excludeTimes={
                                            complete
                                        }
                                        minDate={new Date().setDate(new Date().getDate() + 1)}
                                    />
                                </div>
                            </div>
                            <hr></hr>

                            <div className="section">
                            </div>
                            <button className="btn btn-warning" onClick={handleSubmit}> Prenota </button>
                        </form>}
                        {datas.allday && <form>

                            <div className="section">
                                <h4 className="section-title mb-2">Seleziona data di inizio e di fine</h4>
                                <div className="section-content">
                                    <DatePicker
                                        selected={dateTime}
                                        onChange={onChange}
                                        startDate={dateTime}
                                        endDate={endDate}
                                        excludeDates={completeDays}
                                        selectsRange
                                        minDate={new Date().setDate(new Date().getDate() + 1)}
                                        inline
                                    />
                                </div>
                            </div>
                            <hr></hr>
                            <button className="btn btn-warning" onClick={handleSubmit}> Prenota </button>
                        </form>}

                        <div id="toastNotice" className="toast" style={{ marginTop: "1em", marginLeft: "1.7em" }}>
                            <div className="toast-header">
                                <strong className="mr-auto">AN ERROR HAS OCCURRED</strong>
                            </div>
                            <div className="toast-body">
                                Please, select the end date before submitting!
                            </div>
                        </div>

                        <div id="toastNotice2" className="toast" style={{ marginTop: "1em", marginLeft: "1.7em" }}>
                            <div className="toast-header">
                                <strong className="mr-auto">AN ERROR HAS OCCURRED</strong>
                            </div>
                            <div className="toast-body">
                                The selected date or time slot is not available or sufficient (this service needs: {datas.time} hours).
                            </div>
                        </div>

                        <div id="toastNotice3" className="toast" style={{ marginTop: "1em", marginLeft: "1.7em" }}>
                            <div className="toast-header">
                                <strong className="mr-auto">AN ERROR HAS OCCURRED</strong>
                            </div>
                            <div className="toast-body">
                                Please, select or insert the correct location before submitting!
                            </div>
                        </div>

                        <div id="toastNotice4" className="toast" style={{ marginTop: "1em", marginLeft: "1.7em" }}>
                            <div className="toast-header">
                                <strong className="mr-auto">AN ERROR HAS OCCURRED</strong>
                            </div>
                            <div className="toast-body">
                                The selected days are not available.
                            </div>
                        </div>

                        <div id="toastNotice5" className="toast" style={{ marginTop: "1em", marginLeft: "1.7em" }}>
                            <div className="toast-header">
                                <strong className="mr-auto">AN ERROR HAS OCCURRED</strong>
                            </div>
                            <div className="toast-body">
                                If you want to make a reservation, please login first!
                            </div>
                        </div>

                    </div>
                </PrenoContainer>

            </Wrapper>
            <Footer />

        </Container >

    );
}

export default SingleService;