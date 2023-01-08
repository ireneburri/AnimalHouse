import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/navbar';
import styled from 'styled-components';
import Announcement from '../components/Announcement/announcement';
import useFetch from '../components/useFetch';
import immagine from '../img/dog.jpg';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/footer';
import { ButtonGroup } from 'react-bootstrap';
import SimilarProducts from '../components/Similar/similarProducts';

import * as bootstrap from "bootstrap";
import Toast from 'react-bootstrap/Toast';

const Container = styled.div`

`
const Wrapper = styled.div`
        padding-top: 2em;
    padding-bottom: 2em;
    padding-left: 1em;
    padding-right: 1em;
    display: flex;
    @media (max-width: 1024px) {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        font-size: smaller;
}
`
const ImgContainer = styled.div`

`
const Image = styled.img`
    flex: 1;
    width: 100%;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`
const Category = styled.span`
    color: white;
    background-color: teal;
    border-radius: 30px;
    padding-left: 10px;
    padding-right: 10px;
`
const Title = styled.h1`
    font-weight: 200;
`
const Brand = styled.span`
    font-weight: 100;
    color: grey;
    font-size: 15px;
`
const Desc = styled.p`
    margin: 20px 0px;
    font-size: 20px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 20px;
`
const AddContainer = styled.div`
`
const Amount = styled.input`
    width: 60px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    justify-content: center;
`
const AmountContainer = styled.div`
    
`
const Button = styled.button`
    border: 1px solid teal;
    background-color: white;
    color: teal;
    cursor: pointer;
    font-weight: 900;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    &:hover{
        background-color: teal;
        color: white;
        font-weight: 900;
        transition: all 0.4s ease;
    }
    &:disabled{
        background-color: #b3b1b1;
        color: white;
        border: 1px solid white;
    }
`
const Vip = styled.span`
    background-color: gold;
    color: white;
    border-radius: 20px;
    padding-left: 1em;
    padding-right: 1em;
    font-size: 15px;
`

function SingleAnimal() {
    const data = useParams();
    const id = data.id.substring(1)
    const [locations, setLocations] = useState([])
    const { items } = useFetch(`https://site212224.tw.cs.unibo.it/animal/id/${id}`);
    const [loc, setLoc] = useState({
        location: ""
    })

    let img;
    var url = id + ".png"
    img = <img src={url} alt="product photo" style={{height: '22em', width: 'auto', paddingTop: '2em'}}/>

    function handleLoc(e) {
        const newloc = { ...loc }
        newloc.location = e.target.value
        setLoc(newloc)
    }

    useEffect(() => {
        return () => {
            fetchLocations();
        };
    }, [items])

    const fetchLocations = async () => {
        const data = await fetch(`https://site212224.tw.cs.unibo.it/Location`);
        const fetched = await data.json();
        setLocations(fetched);
    }

    function deleteAnimal() {
        axios.delete(`https://site212224.tw.cs.unibo.it/animal/${items._id}`
        )
    }


    function Reservation(e) {
        if (loc.location !== "") {
            e.preventDefault();
            var myAlert = document.getElementById('toastNotice');//select id of toast
            var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
            bsAlert.show();//show it

            document.getElementById("button").disabled = true;

            deleteAnimal();
        } else {
            e.preventDefault();
            var myAlert = document.getElementById('toastNotice2');//select id of toast
            var bsAlert = new bootstrap.Toast(myAlert);//inizialize it
            bsAlert.show();//show it
        }


    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper className='container'>
                <ImgContainer>
                    {img}
                </ImgContainer>
                <InfoContainer>
                    <Category> {items.species} - {items.breed} </Category>
                    <Title style={{ marginTop: '20px', marginBottom: '0px' }}> {items.name} {items.vip ? <Vip>VIP</Vip> : null}</Title>

                    <Desc> Sex: {items.sex} </Desc>
                    <Desc> Age: {items.age} </Desc>
                    <Desc> Product description: {items.description} </Desc>
                    <Price> Price: €{items.price} </Price>

                    <AddContainer>
                        <select id="locSelector" className="form-select" aria-label="Default select example" style={{ marginTop: "1em" }} onChange={(e) => handleLoc(e)}>
                            <option value="select location" key="default" disabled > select the pick up location </option>
                            {locations.map(loc => (
                                <option value={loc.name} key={loc.name}>{loc.name}</option>
                            ))};
                        </select>
                        <hr></hr>
                        <Button id="button" onClick={(e) => Reservation(e)}>
                            Add to cart
                        </Button>
                    </AddContainer>

                    <div id="toastNotice" className="toast" style={{ marginTop: "1em" }}>
                        <div className="toast-header">
                            <strong className="mr-auto">THANKS FOR YOUR RESERVATION</strong>
                        </div>
                        <div className="toast-body">
                            Your new little friend is waiting for you at the following shop: {loc.location}
                        </div>
                    </div>
                    <div id="toastNotice2" className="toast" style={{ marginTop: "1em" }}>
                        <div className="toast-header">
                            <strong className="mr-auto">AN ERROR HAS OCCURRED</strong>
                        </div>
                        <div className="toast-body">
                            Please select a shop!
                        </div>
                    </div>
                </InfoContainer>

            </Wrapper>
            <Footer />
        </Container>

    );
}

export default SingleAnimal;