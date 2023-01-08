import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MyButton = styled.button`
    display: inline-block;
    border: 0;
    text-decoration: none;
    border-radius: 12px;
    background-color: rgba(97, 196, 229, 0.5);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(30px);
    color: black;
    font-size: 12px;
    cursor: pointer;
    text-transform: uppercase;
    &:hover{
        background-color: rgba(97, 196, 229, 0.6);
    }
`

function ReservationCard(props) {

    function deleteReservation() {
        axios.delete(`https://site212224.tw.cs.unibo.it/Reservation/${props.id}`
        ).then(res => {
            window.location.reload(false);
        })
    }

    return (
        <div>
            <div className="card mb-3" style={{ width: "100%" }}>
                <div className="card-body">
                    <h5 className="card-title"> {props.service} hour/s </h5>
                    <p className="card-text"> location: {props.location}</p>
                    <p className="card-text"> start: {props.date_start.getDate()}-{props.date_start.getMonth() + 1}-{props.date_start.getFullYear()}, {props.date_start.getHours()}:00</p>
                    <p className="card-text"> end: {props.date_end.getDate()}-{props.date_end.getMonth() + 1}-{props.date_end.getFullYear()}, {props.date_end.getHours()}:00</p>
                    <p className="card-text"><small className="text-muted">Total price: {props.total}</small></p>
                </div>
            </div>
            <div className="col-lg-1" style={{ marginTop: '0.5em' }}>
                <MyButton onClick={() => deleteReservation()}> X </MyButton>
            </div>
        </div>
    );
}

export default ReservationCard;
