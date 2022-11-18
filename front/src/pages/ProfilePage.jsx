import React from 'react';
import Navbar from '../components/Navbar/navbar';
import Profile from '../components/Profile/profile';

function ProfilePage() {
    const username = localStorage.getItem("username")

    return (
        <div>
            <Navbar />
            <Profile />
        </div>
    );
}

export default ProfilePage;
