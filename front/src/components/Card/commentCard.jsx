import React, { Component } from 'react';
import styled from 'styled-components';
import dog from '../../img/dog.jpg'

const MyCard = styled.div`
    margin: 2em;

`

function Comment(props) {
    return (
        <MyCard className="card">
            <div className="card-header">
                {props.title}
            </div>
            <img src={dog} alt="dog" />
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
