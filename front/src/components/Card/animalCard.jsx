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

function AnimalCard (props){

        function deleteAnimal(){
            axios.delete(`https://site212224.tw.cs.unibo.it/animal/${props.id}`
            ).then(res => {
                window.location.reload(false);
            })
        }

        var img;
        var url = props.id + ".png"
        img = <img src={url} alt="product photo" style={{height: '10em', width: 'auto', paddingTop: '2em'}}/>

        return (
            <div className="min-h-screen w-full bg-gray-300" style={{ margin: "1em", width: "90%"}}>
                <div className="max-w-screen-md mx-auto px-10 pt-20" >
                    <div className="bg-white md:h-48 rounded-lg shadow-md flex flex-wrap flex-col-reverse md:flex-col" style={{ display: "flex", borderRadius: "20px" }}>
                        
                        <div className="col-lg-6" style={{ paddingLeft: '2em', paddingTop: '2em' }}>
                            <h5>{props.name}</h5>
                            <div> Breed: {props.breed} </div>
                            <div> Sex: {props.sex} </div>
                            <div> Age: {props.age} </div>
                        </div>
                        <div className="col-lg-5" style={{ padding: '2em' }}>
                            {img}
                        </div>
                        
                        <div className="col-lg-1" style={{marginTop: '0.5em'}}>
                            <MyButton onClick={() => deleteAnimal()}> X </MyButton>
                        </div>
                    </div>

                </div>

            </div>
        );
}

export default AnimalCard;
