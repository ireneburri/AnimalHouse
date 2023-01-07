import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const Vip = styled.span`
    font-size: 0.8em;
    border-radius: 10px;
    background-color: #dfbe00;
    color: #160505;
    border: none;
    background-color: rgba(255, 215, 0, 0.5);
    backdrop-filter: blur(30px);
    color: black;
    letter-spacing: 2px;
    padding-left: 1em;
    padding-right: 1em;
    text-transform: uppercase;
    &:hover{
        background-color: rgba(255, 215, 0, 0.6);
    }
`


function ServiceCard(props) {

    return (
            <div className="card col-12 col-md-6 col-lg-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title} {props.vip ? <Vip> VIP </Vip> : null} </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.subtitle}</h6>
                    <p className="card-text">{props.description}</p>
                    <a href={'/front/singleservice:' + props.title}> 
                        <div>
                            <Button variant="primary">
                                DISCOVER MORE
                            </Button>
                        </div>
                    </a>
                </div>
            </div>
    );

}

export default ServiceCard;
