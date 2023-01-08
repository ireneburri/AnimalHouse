import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ServiceCard from '../Card/serviceCard';

const Container = styled.div`
    justify-content: center;
    align-items: center;
`
const ServicesContainer = styled.div`
    justify-content: center;
    align-items: center;
    margin: 2em;

`

function Services() {

    const [services, setServices] = useState([]);
    const paramMode = useParams();
    const modeService = paramMode.service;

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, []);

    const fetchPosts = async () => {
        const data = await fetch(`https://site212224.tw.cs.unibo.it/Service/mode/${modeService.substring(1)}`);
        const fetched = await data.json();
        setServices(fetched);
    }

    return (
        <Container className='container'>
            <ServicesContainer className='row'>
                {services.map(service => (
                    <ServiceCard
                        key={service._id}
                        id={service._id}
                        title={service.name}
                        description={service.description}
                        subtitle={service.mode}
                        vip={service.vip}
                    />
                ))}
            </ServicesContainer>
        </Container>
    );
}

export default Services;
