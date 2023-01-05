import React from 'react';

function ReservationCard(props) {
    return (
        <div>
            <div className="card mb-3" style={{width: "100%"}}>
                <div className="card-body">
                    <h5 className="card-title"> {props.service} hour/s </h5>
                    <p className="card-text"> location: {props.location}</p>
                    <p className="card-text"> start: {props.date_start.getDate()}-{props.date_start.getMonth() + 1}-{props.date_start.getFullYear()}, {props.date_start.getHours()}:00</p>
                    <p className="card-text"> end: {props.date_end.getDate()}-{props.date_end.getMonth() + 1}-{props.date_end.getFullYear()}, {props.date_end.getHours()}:00</p>
                    <p className="card-text"><small className="text-muted">Total price: {props.total}</small></p>
                </div>
            </div>
        </div>
    );
}

export default ReservationCard;
