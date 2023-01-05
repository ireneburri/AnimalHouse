import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ProductCard from '../Card/productCard';

const Container = styled.div`
    align-items: center;
    justify-content: center;
`

const ItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: none;
`

const Items = styled.div`
    width: 70%;
    margin: none;
`

function SimilarProducts(props) {
    const [advice, setAdvice] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [props]);

    const fetchItems = useCallback(
        async () => {
            const data = await fetch("https://site212224.tw.cs.unibo.it/item");
            const items = await data.json();
            console.log(items)
            const filtered = items.filter((item) => item.category === props.category && item._id !== props.id && item.quantity > 0);
            console.log(filtered)
            setAdvice(filtered.slice(0, 2));
        })

    let related; //vediamo se tenere questa differenza, altirmenti li consigliamo anche se sono esauriti
    if (advice === null || advice.length === 0) {
        related = <h5> THERE ARE NO AVAILABLE RELATED ITEMS AT THE MOMENT! PLEASE CHECK IN FUTURE</h5>
    } else {
        related = <h5> CHECK SOME RELATED ITEMS: </h5>
    }

    return (
        <Container>

            <ItemsContainer>
                <Items>
                    {related}
                    <div className="row">
                        {advice.map(item => (
                            <ProductCard
                                key={item._id}
                                id={item._id}
                                nome={item.name}
                                prezzo={item.price}
                                immagine={item.img}
                            />
                        ))}
                    </div>
                </Items>
            </ItemsContainer>
        </Container>
    );
}

export default SimilarProducts;
