import React, { Component } from 'react';
import styled from 'styled-components';
import dog from '../../img/dog.jpg'


const MyCard = styled.div`
    margin: 2em;

`

function Comment(props) {

    let img;
    if (props.comment) {
        img = null
    } else {
        var url = props.id + ".png"
        img = <img src={url} alt="product photo" style={{height: 'auto', width: '20em'}}/>
    }

    return (
        <MyCard className="card">
            <div className="card-header">
                {props.title}
            </div>
            {img}
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p> {props.text} </p>
                    <footer className="blockquote-footer"> {props.author} </footer>
                    {/* <footer className="blockquote-footer"> {props.date.substring(0, 10)}, {props.date.substring(11, 16)} </footer> */}
                </blockquote>
            </div>
        </MyCard>
    );
}

export default Comment;
