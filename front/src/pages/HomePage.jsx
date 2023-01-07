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
                <h1 style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center"}}> WELCOME TO OUR ANIMAL HOUSE </h1>
            </div>
            <Announcement />
            <Footer/>
        </div>
    );
}

export default HomePage;
