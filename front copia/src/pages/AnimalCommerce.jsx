import React from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
// import Newsletter from '../components/Newsletter/newsletter';
import AnimalProducts from '../components/Products/animalProducts';
// import { CartContext } from '../UserContext';

const Container = styled.div`
    justify-content: center;
    align-items: center;
`

function AnimalCommerce() {

    return (
        <Container>
            <Navbar />
            <Announcement />
                <AnimalProducts />
            <Footer />
        </Container>
    );
}

export default AnimalCommerce;

