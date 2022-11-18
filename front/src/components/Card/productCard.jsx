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

class ProductCard extends Component {
    
    render() {
        return (
            <div className="col-12 col-md-6 col-lg-3" >
                <MyCard className="card" style={{ textAlign: 'center' }}>
                    <a className="itemLink" href={'http://localhost:3000/singleproduct:' + this.props.id}>
                        <img src={dog} className="card-img-top" alt="..." />
                        <div className="card-body" >
                            <hr />
                            <h5 className="card-title" > {this.props.nome} </h5>
                            <p className="card-text" > €{this.props.prezzo} </p>
                        </div>
                    </a>
                </MyCard>
            </div>

        );
    }
}

export default ProductCard;