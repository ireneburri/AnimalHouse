import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import dogimg from '../../img/dog.jpg'

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

function AnimalCard(props) {

    function deleteAnimal() {
        axios.delete(`https://site212224.tw.cs.unibo.it/animal/${props.id}`
        ).then(res => {
            window.location.reload(false);
        })
    }

    var img;
    var url = props.id + ".png"
    img = <img src={url} className="card-img-top"  alt="animal photo" style={{ objectFit: 'scale-down', paddingTop: '2em' }} />

    return (
        <div className="card" style={{ width: '80%', paddingLeft: '1em' }}>
            {img}
            <div className="card-body">
            <h5>{props.name}</h5>
                <div> Breed: {props.breed} </div>
                <div> Sex: {props.sex} </div>
                <div> Age: {props.age} </div>
                <MyButton onClick={() => deleteAnimal()}> DELETE ANIMAL </MyButton>
            </div>
        </div>
    );
}

export default AnimalCard;
