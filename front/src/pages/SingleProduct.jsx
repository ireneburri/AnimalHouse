import React, { useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import styled from 'styled-components';
import Announcement from '../components/Announcement/announcement';
import useFetch from '../components/useFetch';
import immagine from '../img/dog.jpg';
import { useParams } from 'react-router-dom';
// import Newsletter from '../components/Newsletter/newsletter';
import Footer from '../components/Footer/footer';
import { ButtonGroup } from 'react-bootstrap';
// import {CartContext} from '../UserContext';


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
    margin-left: 2em;
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
`

function SingleProduct() {
    const data = useParams();
    const id = data.id.substring(1)
    console.log(id)
    const { items } = useFetch(`https://site212224.tw.cs.unibo.it/item/${id}`);

    let disponibility;
    if (items.quantity > 0) {
        disponibility = 
        <AmountContainer>
            <Amount type="number" id="quant" name="quant" min="1" max={items.quantity} defaultValue="1" />
            <Button onClick={(e) => addToCart(e)}>
                Add to cart
            </Button>
            <div style={{ marginTop: "10px" }}> Current availability: {items.quantity} units </div>
        </AmountContainer>;
    } else {
        disponibility = <AmountContainer> THIS ITEM IS NOT AVAILABLE AT THE MOMENT. </AmountContainer>;
    }


    function addToCart(e) {
        const getCurrentCart = window.localStorage.getItem('cart');
        const currentCart = JSON.parse(getCurrentCart);

        if (getCurrentCart === null) {
            window.localStorage.setItem('cart', JSON.stringify([{ items: items, quantity: document.getElementById("quant").value }]));
        }
        else if (currentCart.find((el) => el.items._id === id)) {
            currentCart.find((el) => el.items._id === id).quantity = document.getElementById("quant").value;
            window.localStorage.setItem('cart', JSON.stringify(currentCart));
        }
        else {
            const getCurrentCart = window.localStorage.getItem('cart');
            const currentCart = JSON.parse(getCurrentCart);

            currentCart.push({ items: items, quantity: document.getElementById("quant").value });

            window.localStorage.setItem('cart', JSON.stringify(currentCart));
            console.log(currentCart)
        }

    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper className='container'>
                <ImgContainer>
                    <Image src={immagine} />
                </ImgContainer>
                <InfoContainer>
                    <Category> {items.category} </Category>
                    <Title style={{ marginTop: '20px', marginBottom: '0px' }}> {items.name} </Title>
                    <Brand style={{ marginTop: '0px' }}> {items.brand} </Brand>
                    <Desc> Product description: {items.description} </Desc>
                    <Price> Price: €{items.price} </Price>
                    <hr />
                    <AddContainer>
                        {disponibility}
                    </AddContainer>

                </InfoContainer>

            </Wrapper>
            <Footer />

        </Container>

    );
}

export default SingleProduct;