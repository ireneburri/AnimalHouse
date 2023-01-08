import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

const Button = styled.a`
    text-decoration: none;
    border: 1px solid teal;
    background-color: white;
    color: teal;
    cursor: pointer;
    font-weight: 900;
    border-radius: 10px;
    padding-left: 2em;
    padding-right: 2em;
    text-align: center;
    &:hover{
        background-color: teal;
        color: white;
        font-weight: 900;
        transition: all 0.4s ease;
    }
`
function LocationCard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let img;
    var url = props.id + ".png"
    img = <img src={url} alt="product photo" style={{height: '10em', width: 'auto'}}/>


    return (
            <div className="card col-12 col-md-6 col-lg-3" style={{justifiyContent: 'center', alignItems: 'center'}}>
                <div className="card-body" >
                    <h5 className="card-title">{props.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.address}</h6>
                    {img}
                    <p className="card-text">{props.description}</p>
                    <div>
                        <Button onClick={handleShow}>
                            DISCOVER MORE
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title> {props.name} </Modal.Title>
                            </Modal.Header>
                            <Modal.Body> 
                                <ul>
                                    {props.disponibility.map(ser => (
                                        <li key={ser.service}> {ser.service} </li>
                                    ))}
                                </ul>
                            
                            
                            
                            </Modal.Body>
                            <Modal.Footer>
                                {props.tel} - {props.address}
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
    );

}

export default LocationCard;
