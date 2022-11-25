import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Checkout from "./checkout";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRadio,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";

const MyButton = styled.a`
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

const SaveButton = styled.button`
    border: 1px solid teal;
    font-size: 0.8em;
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

const Myth = styled.th`
    @media (max-width: 480px) {
        display: none;
}
`
const Mythsmall = styled.th`
    @media (min-width: 480px) {
        display: none;
}
`

export default function SummaryPage() {
    var total
    const getCurrentCart = window.localStorage.getItem('cart');
    const currentCart = JSON.parse(getCurrentCart);

    function saveChanges(e){
        window.location.reload(false);
    }

    if (currentCart === null || currentCart.length === 0) {
        return (
            <div>
                il tuo carrello è vuoto
            </div>
        )
    }

    var sum = currentCart.reduce(function (acc, obj) { return acc + obj.items.price * obj.quantity; }, 0);

    return (
        <section className="h-100 h-custom">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBTable responsive>
                            <MDBTableHead>
                                <tr>
                                    <th scope="col" className="h5">
                                        Shopping Cart
                                    </th>
                                    <Mythsmall scope="col">Details</Mythsmall>
                                    <Myth scope="col">Details</Myth>
                                    <Myth scope="col">Quantity</Myth>
                                    <Myth scope="col">Price</Myth>
                                    <Myth scope="col">Remove</Myth>
                                </tr>
                            </MDBTableHead>

                            <MDBTableBody>
                                {currentCart.map(item => (
                                    <Checkout
                                        key={item.items._id}
                                        id={item.items._id}
                                        name={item.items.name}
                                        brand={item.items.brand}
                                        dispo={item.items.quantity}
                                        quant={item.quantity}
                                        price={item.items.price}
                                    />
                                ))}

                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                    <MDBCard
                        className="shadow-2-strong mb-5 mb-lg-0"
                        style={{ borderRadius: "16px" }}
                    >
                        <MDBCardBody className="p-4">
                            <MDBRow>
                                <MDBCol md="6" lg="4" xl="3" className="mb-4 mb-md-0">
                                    <form>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <MDBRadio
                                                    type="radio"
                                                    name="radio1"
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon
                                                        fab
                                                        icon="cc-mastercard fa-2x text-dark pe-2"
                                                    />
                                                    Credit Card
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <MDBRadio
                                                    type="radio"
                                                    name="radio1"
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon fab icon="cc-visa fa-2x text-dark pe-2" />
                                                    Debit Card
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row pb-3">
                                            <div className="d-flex align-items-center pe-2">
                                                <MDBRadio
                                                    type="radio"
                                                    name="radio1"
                                                    value=""
                                                    aria-label="..."
                                                />
                                            </div>
                                            <div className="rounded border w-100 p-3">
                                                <p className="d-flex align-items-center mb-0">
                                                    <MDBIcon fab icon="cc-paypal fa-2x text-dark pe-2" />
                                                    PayPal
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </MDBCol>
                                <MDBCol md="6" lg="4" xl="6">
                                    <MDBRow>
                                        <MDBCol size="12" xl="6">
                                            <MDBInput
                                                label="Name on card"
                                                placeholder="John Smiths"
                                                size="lg"
                                            />
                                            <MDBInput
                                                label="Expiration"
                                                placeholder="MM/YY"
                                                size="lg"
                                                maxLength={7}
                                                minLength={7}
                                            />
                                        </MDBCol>

                                        <MDBCol size="12" xl="6">
                                            <MDBInput
                                                label="Card Number"
                                                placeholder="1111 2222 3333 4444"
                                                size="lg"
                                                minLength="19"
                                                maxLength="19"
                                            />
                                            <MDBInput
                                                label="Cvv"
                                                placeholder="&#9679;&#9679;&#9679;"
                                                size="lg"
                                                minLength="3"
                                                maxLength="3"
                                                type="password"
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol lg="4" xl="3">
                                    <div className="d-flex justify-content-center ">
                                        <SaveButton onClick={(e) => saveChanges()}>Save changes and calculate total </SaveButton>
                                    </div>

                                    <hr className="my-4" />

                                    <div
                                        className="d-flex justify-content-between"
                                        style={{ fontWeight: "500" }}>
                                        <p className="mb-2">Subtotal</p>
                                        <p className="mb-2"> € {sum}</p>
                                    </div>

                                    <hr className="my-4" />

                                    <div
                                        className="d-flex justify-content-between mb-4"
                                        style={{ fontWeight: "500" }}>
                                        <p className="mb-2">Total (tax included)</p>
                                        <p className="mb-2"> € {sum}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <MyButton href="/thanks">Checkout</MyButton>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}