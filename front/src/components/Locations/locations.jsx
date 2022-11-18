import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LocationCard from '../Card/locationCard';

const Container = styled.div`
    /* display: flex; */
    justify-content: center;
    align-items: center;
`
const LocationContainer = styled.div`
    justify-content: center;
    align-items: center;
    margin: 2em;
`

function Locations() {

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, []);

    const fetchPosts = async () => {
        const data = await fetch(`http://site212224.tw.cs.unibo.it/Location`);
        const fetched = await data.json();
        // console.log(fetched)
        setLocations(fetched);
    }

    return (
        <Container className='container'>
                <LocationContainer className='row'>
                    {locations.map(location => (
                        <LocationCard
                            key={location._id}
                            id={location._id}
                            name={location.name}
                            description={location.description}
                            address={location.address}
                            tel={location.tel}
                            services = {location.services}
                        />
                    ))}
                </LocationContainer>
        </Container>
    );
}

export default Locations;
