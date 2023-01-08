import React, { Component } from 'react';
import dog from "/Users/beatricezamagna/Desktop/Animal/front/src/img/dog.jpg";
import styled from 'styled-components';
import './card.css'

const MyCard = styled.div`
    width: 100%;
    margin: 1em;
    transition: all 0.4s ease;
    &:hover{
        box-shadow: 3px 3px 3px 3px rgb(207, 207, 207);
        transform: scale(1.05);
    }
    @media (max-width: 1024px) {
        width: 100%;
}
`

const Vip = styled.span`
    background-color: gold;
    color: white;
    border-radius: 20px;
    padding-left: 1em;
    padding-right: 1em;
`

class ProductCard extends Component {
    render() {

        let img;

        var url = this.props.id + ".png"
        img = <img src={url} alt="product photo" style={{height: '10em', width: 'auto', paddingTop: '2em'}}/>

        return (
            <div className="col-12 col-md-6 col-lg-3" >
                <MyCard className="card" style={{ textAlign: 'center' }}>
                    <a className="itemLink" href={'/front/singleproduct:' + this.props.id}>
                        {img}
                        <div className="card-body" >
                            <hr />
                            <h5 className="card-title" > {this.props.nome} </h5>
                            <div className="card-text" > €{this.props.prezzo} {this.props.vip ? <Vip>VIP</Vip> : null} </div>
                        </div>
                    </a>
                </MyCard>
            </div>

        );
    }
}

export default ProductCard;