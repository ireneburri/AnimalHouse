import React from 'react';
import Navbar from '../components/Navbar/navbar';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';
import animalCrossing from '../img/acback.jpg'

function HomePage(){
    return (
        <div>
            <Navbar />
            <div>
                <img src={animalCrossing} alt="animal crossing" style={{width: '100%', height: 'auto'}}/>
            </div>
            <Announcement />
            <Footer/>
        </div>
    );
}

export default HomePage;
