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
    const [loc, setLoc] = useState("")

    //data attuale + 1 e orario settato alle 8:00
    const [dateTime, setDateTime] = useState(setHours(setMinutes(new Date().setDate(new Date().getDate()), 0), 8));
    const [endDate, setEndDate] = useState(null);

    const [booking, setBooking] = useState([])
    const [bookingDays, setBookingDays] = useState([])
    const [bookingDaysForCheckFormat, setBookingDaysForCheckFormat] = useState([])

    var booked = []

    useEffect(() => {
        console.log(loc)
        fetchData();
        fetchBookings();
        // eslint-disable-next-line
    }, [loc, dateTime]);

    const onChange = (dates) => {
        const [start, end] = dates;
        setDateTime(start);
        setEndDate(end);
        //console.log(start);
        console.log(end);
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

        for (let booking in items) {
            if (items[booking].service === name.substring(1) && items[booking].location === loc)
                booked.push({ start: items[booking].date_start, end: items[booking].date_end })
        }

        booked = booked.map(e => (
            e = changeFormat(e)
        ))

        console.log(booked)

        var arrayBooking = [];
        var arrayBookingDays = [];
        setBookingDaysForCheckFormat(booked);

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

        setBooking(arrayBooking);
        console.log(arrayBooking)
        setBookingDays(arrayBookingDays);
        // console.log(arrayBookingDays)
    }

    function addHoursToDate(date, hours) {
        return new Date(new Date(date).setHours(new Date(date).getHours() + (hours)));
    } //agagiunge x ore alla x data

    function dateOverlap(start, end, bookingList) {
        start = new Date(start).getTime()
        end = new Date(end).getTime()
        console.log(bookingList);
        for (let b in bookingList) {
            let bStart = new Date(bookingList[b]['start']).getTime()
            let bEnd = new Date(bookingList[b]['end']).getTime()

            if (start >= bStart && start <= bEnd) { //a tra c e d
                return true
            }
            if (start >= bStart && start <= bEnd) {//b tra c e d
                return true
            }
            if (bStart >= start && bStart <= end) {//c tra a e b
                return true
            }
            if (bEnd >= start && bEnd <= end) {//d tra a e b
                return true
            }
        }
        return false
    }

    function dateDiffInDays(a, b) { //differenza tra due date
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return (Math.ceil((utc2 - utc1) / _MS_PER_DAY) + 1);
    }

    const handleSubmit = () => {
        // console.log(datas.allday)
        // console.log(Number(datas.time))
        let start = setHours(new Date(dateTime), dateTime.getHours())
        console.log(start)
        var end; var total;
        if (!datas.allday) { //stesso giorno
            var tmp = addHoursToDate(start, Number(datas.time)) //data di fine
            end = setHours(new Date(tmp), tmp.getHours())
            total = datas.price;
        } else {
            end = setHours(endDate, 19);
            console.log(dateDiffInDays(start, end));
            total = datas.price * dateDiffInDays(start, end); //calcoli il prezzo per diffenza in giorni
            console.log(total)
        }

        const body = {
            username: localStorage.username,
            service: datas.name,
            time: datas.time,
            date_start: start,
            date_end: end,
            location: loc,
            total: Math.ceil(total), //arrotondare per eccesso
            allday: datas.allday
        }

        let containsBookedTimes = false;
        let containsBookedDays = false;

        if (!datas.allday) {
            for (let x = 0; x < datas.time; x++) {
                for (let h in booking) {
                    console.log(booking[h].getHours())
                    if (booking[h].getHours() === (start.getHours() + x)) {
                        containsBookedTimes = true; //prenotazioni in ore
                    }
                }
            }
        }
        else {
            console.log(bookingDaysForCheckFormat);
            containsBookedDays = dateOverlap(start, end, bookingDaysForCheckFormat);
            // prenotazioni in giorni
        }

        if (end === undefined) {
            console.log("alert 2")
        }
        else if (containsBookedTimes) {
            console.log("alert 3")
        }
        else if (containsBookedDays) {
            console.log("alert 4")
        }
        else {
            console.log(body); //richiesta api
            axios.post("http://site212224.tw.cs.unibo.it/Reservation/post",
                body).then(res =>
                    console.log(res)
                ).then(() => navigate('/account'))
        }
    }

    return (
        <Container>
            <Navbar />
            <Wrapper className='container'>
                <ImgContainer className='col-lg-4'>
                    <Image src={immagine} />
                </ImgContainer>
                <InfoContainer className='col-lg-5'>
                    <Category> {datas.category} </Category>
                    <Title style={{ marginTop: '1em', marginBottom: '0px' }}> {datas.name} </Title>
                    <Desc> Description: {datas.description} </Desc>
                    <p> Duration: {datas.allday ? "all day" : datas.time} </p>
                    <Price> Price: €{datas.price} </Price>

                    <LocationContainer > 
                        {datas.mode === "At Home" || datas.mode === "online" ? null :
                        <select id="locSelector" className="form-select" aria-label="Default select example" onChange={() => setLoc(document.getElementById("locSelector").value)}>
                            <option value="select location" key="default" disabled > select location </option>
                            {locations.map(loc => (
                                <option value={loc} key={loc}>{loc}</option>
                            ))};
                        </select>}
                    </LocationContainer>
                </InfoContainer>

                <div style={{marginLeft: '2em'}}>
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
                                    maxTime={setHours(setMinutes(new Date(), 0), (19 - datas.time))}

                                    excludeTimes={
                                        booking
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
                                    excludeDates={bookingDays}
                                    selectsRange
                                    minDate={new Date().setDate(new Date().getDate() + 1)}
                                    inline
                                />
                            </div>
                        </div>
                        <hr></hr>
                        <button className="btn btn-warning" onClick={handleSubmit}> Prenota </button>
                    </form>}
                </div>

            </Wrapper>
            <Footer />

        </Container >

    );
}

export default SingleService;