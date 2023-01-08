import { Component } from "react";
import styled from "styled-components";
import {
    MDBBtn,
    MDBIcon,
    MDBInput,
} from "mdb-react-ui-kit";

const MyButton = styled.button`
    border: 1px solid teal;
    background-color: white;
    color: teal;
    cursor: pointer;
    font-weight: 900;
    font-size: 2em;
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
    @media (max-width: 1024px) {
        font-size: 8px;
}
`
const Mytd = styled.td`
@media (max-width: 480px) {
    align-items: flex-start;
    justify-content: left;
    display: flex;
    flex-direction: column;
    border:none;
    margin: none;
    padding: none;
}
`
function Checkout(props) {

    const id = props.id
    let img;
    var url = id + ".png"
    img = <img src={url} alt="product photo" style={{height: '10em', width: 'auto'}}/>

    function removeItem() {
        const getCurrentCart = window.localStorage.getItem('cart');
        const currentCart = JSON.parse(getCurrentCart);
        const filtered = currentCart.filter((item) => item.items._id !== props.id);
        window.localStorage.setItem('cart', JSON.stringify(filtered));
        window.location.reload(false);
    }

    function updateQuantity(){
        const getCurrentCart = window.localStorage.getItem('cart');
        const currentCart = JSON.parse(getCurrentCart);

        currentCart.find((item) => item.items._id === props.id).quantity = document.getElementById(id).value;
        window.localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center">
                    {img}
                </div>
            </th>

            <Mytd className="align-middle">
            <div className="flex-column">
                <p className="mb-2">Name: {props.name}</p>
                <p className="mb-0">Brand: {props.brand}</p>
            </div>
            </Mytd>

            <Mytd className="align-middle">
                <div className="d-flex flex-row align-items-center">

                    <MDBInput
                        min={1}
                        type="number"
                        size="sm"
                        style={{ width: "50px" }}
                        defaultValue={props.quant}
                        name="quant"
                        id={props.id}
                        max={props.dispo}
                        onChange={(e) => updateQuantity(e)}
                    />
                </div>
            </Mytd>

            <Mytd className="align-middle">
                <p className="mb-0" style={{ fontWeight: "500" }}>
                    € {props.price}
                </p>
            </Mytd>

            <Mytd className="align-middle">
                <MyButton onClick={(e) => removeItem(e)}>
                    R
                </MyButton>
            </Mytd>
        </tr>
    );
}
// }

export default Checkout;