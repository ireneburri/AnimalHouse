import {useEffect} from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
    margin-right: 2rem;
    min-width: 5rem;
    padding: 0.5rem 1rem;
    background-color: white;
    border-radius: 1rem;
    border: 2px soldi teal;
    font-weight: 500;
    cursor: pointer;
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
    @media (max-width: 1024px) {
        font-size: 8px;
}
`

function Filter({setActiveCat, activeCat, setFiltered, items}){
    
    useEffect(() => {
        if(activeCat === 'All'){
            setFiltered(items);
            console.log(items)
            return;
        }
        const filtered = items.filter((item) => item.category === activeCat);
        setFiltered(filtered);
        console.log(filtered)
    }, [activeCat, setFiltered, items]);
    
    return(
        <FilterContainer>
            <Button onClick={() => setActiveCat('All')}> ALL </Button>
            <Button onClick={() => setActiveCat('Food')}> FOOD </Button>
            <Button onClick={() => setActiveCat('Health Products')}> HEALTH PRODUCTS </Button>
            <Button onClick={() => setActiveCat('Toys')}> TOYS </Button>
            <Button onClick={() => setActiveCat('Accessories')}> ACCESSORIES </Button>
            <Button onClick={() => setActiveCat('Houses And Kennels')}> HOUSES AND KENNELS </Button>
            <Button onClick={() => setActiveCat('For Puppies')}> FOR PUPPIES </Button>
        </FilterContainer>
    )
}

export default Filter;