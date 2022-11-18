import React from 'react';
import Navbar from '../components/Navbar/navbar';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';


function HomePage(){
    return (
        <div>
            <Navbar />
            <Announcement />
            <Footer/>
        </div>
    );
}

export default HomePage;
