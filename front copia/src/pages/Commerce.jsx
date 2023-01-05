import React from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
// import Newsletter from '../components/Newsletter/newsletter';
import Products from '../components/Products/products';
// import { CartContext } from '../UserContext';

const Container = styled.div`
    justify-content: center;
    align-items: center;
`

function Commerce() {

    return (
        <Container>
            <Navbar />
            <Announcement />
                <Products />
            <Footer />
        </Container>
    );
}

export default Commerce;

