import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../Card/productCard';
import Filter from '../Filter/filter';

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

function AnimalProducts() {

    const [filtered, setFiltered] = useState([]); //con questo posso lavorare in modo più sicuro

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch("https://site212224.tw.cs.unibo.it/animal");
        const items = await data.json();
        const filtered = items.filter((animal) => animal.sale === true);
        setFiltered(filtered);
    }

    return (
        <Container className='container'>
            <ItemsContainer>
                <Items>
                    <div className="row">
                        {filtered.map(item => (
                            <ProductCard
                                key={item._id}
                                id={item._id}
                                nome={item.name}
                                prezzo={item.price}
                                immagine={item.img}
                                vip = {item.vip}
                            />
                        ))}
                    </div>
                </Items>
            </ItemsContainer>
        </Container>
    );
}

export default AnimalProducts;
