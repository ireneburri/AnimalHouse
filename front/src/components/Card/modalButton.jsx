import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalButton() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                DISCOVER MORE
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {props.name} </Modal.Title>
                </Modal.Header>
                <Modal.Body> {props.services} </Modal.Body>
                <Modal.Footer>
                    {props.tel} - {props.address}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalButton;
