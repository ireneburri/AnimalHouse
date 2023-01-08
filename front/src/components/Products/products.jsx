import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../Card/productCard';
import Filter from '../Filter/filter';

const Container = styled.div`
display: flex;
flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
`

function Products() {

    const [items, setItems] = useState([]);  //conservo quello originale
    const [filtered, setFiltered] = useState([]); //con questo posso lavorare in modo più sicuro
    const [activeCat, setActiveCat] = useState('All');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const data = await fetch("https://site212224.tw.cs.unibo.it/item");
        const items = await data.json();
        setItems(items);
        setFiltered(items);
    }

    return (
        <Container className='container'>
            <div style={{ textAlign: 'center', justifyContent: 'center', marginTop: '1rem' }}>
                <Filter items={items} setFiltered={setFiltered} activeCat={activeCat} setActiveCat={setActiveCat}/>
            </div>
            <ItemsContainer>
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
            </ItemsContainer>
        </Container>
    );
}

export default Products;
