import React from 'react';
import styled from 'styled-components';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';
import Navbar from '../components/Navbar/navbar';
// import Newsletter from '../components/Newsletter/newsletter';
import Locations from '../components/Locations/locations';

const Container = styled.div`
    justify-content: center;
    align-items: center;
`

function LocationPage() {
    
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Locations />
            <Footer />
        </Container>
    );
}

export default LocationPage;

