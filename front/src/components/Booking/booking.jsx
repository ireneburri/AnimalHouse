// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import * as bootstrap from "bootstrap";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"

// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
// import addDays from "date-fns/addDays";
// import getDayOfYear from "date-fns/esm/getDayOfYear";

// const Booking = ( props ) => {
//     const data = useParams();
//     const id = data.id;
//     const name = props.name
//     console.log(name)
//     console.log(id.substring(1))
//     const [filtered, setFiltered] = useState([]);

//     //data attuale + 1 e orario settato alle 8:00
//     const [dateTime, setDateTime] = useState(setHours(setMinutes(new Date().setDate(new Date().getDate() + 1), 0), 8));
//     const [endDate, setEndDate] = useState(null);

//     const [booking, setBooking] = useState([])
//     const [bookingDays, setBookingDays] = useState([])
//     const [bookingDaysForCheckFormat, setBookingDaysForCheckFormat] = useState([])

//     var booked = []

//     useEffect(() => {
//         fetchBookings();
//     }, [dateTime]); //da aggiungere la location

//     // const onChange = (dates) => {
//     //     const [start, end] = dates;
//     //     setDateTime(start);
//     //     setEndDate(end);
//     // };

//     // const changeFormat = (e) => {
//     //     e.start = setMinutes(new Date(e.start), 0);
//     //     e.end = setMinutes(new Date(e.end), 0);
//     //     return e;
//     // } //setta a 0 i minuti

//     const fetchBookings = async () => {
//         const data = await fetch("https://site212224.tw.cs.unibo.it/Reservation/location/NegozioZero");
//         const items = await data.json();
//         console.log(items);

//         const filterRes = items.filter(reservation => reservation.service === name)
//         setFiltered(filterRes)
//         console.log(filterRes)



//         // if (data === undefined) {
//         //     return null;
//         // }

//         // const reservations = res.data;
//         // const filters = reservations.filter((reser) => reser.service === service.name);
//         // console.log(filtered)

//         // for (let booking in filtered) {
//         //     booked.push({ start: filtered[booking].date_start, end: filtered[booking].date_end })
//         // }

//         // console.log(booked);
//         // booked = booked.map(e => (
//         //     e = changeFormat(e)
//         // ))

//         // console.log(booked)

//         // var arrayBooking = [];
//         // var arrayBookingDays = [];
//         // setBookingDaysForCheckFormat(taken);
//         // for (let i in booked) {
//         //     if (taken[i].start.toDateString() === dateTime.toDateString()) {
//         //         // se la data di inizio è = alla data che selezioni 
//         //         let x = taken[i].start.getHours() - 1;
//         //         let z = taken[i].end.getHours() - 1;
//         //         while (x < z) {
//         //             arrayBooking.push(setHours(setMinutes(new Date(dateTime), 0), x++));
//         //             //blocco tutte le ore singolarmente di un singolo appuntamento
//         //         }
//         //     }
//         // }
//         // for (let i in taken) {
//         //     let x = getDayOfYear(taken[i].start);
//         //     let z = getDayOfYear(taken[i].end);
//         //     let j = 0;
//         //     while (x <= z) {
//         //         arrayBookingDays.push(addDays(taken[i].start, j++));
//         //         x++;
//         //         //blocco tutte le date di un appontamento a giorni
//         //     }
//         // }
//         // setBooking(arrayBooking);
//         // setBookingDays(arrayBookingDays);

//     };


//     return (
//         <div>
//             {name}
//         </div>
//     );
// }

// export default Booking;
