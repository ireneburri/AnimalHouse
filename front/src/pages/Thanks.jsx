import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/navbar';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';


function Thanks() {
    const getCurrentCart = window.localStorage.getItem('cart');
    const currentCart = JSON.parse(getCurrentCart);

    if (!currentCart) {
        return (
            <div>
                <Navbar />
                <div> nulla da vedere </div>
                <Footer />
            </div>
        )
    }
    
    const sendOrder = () => {
        if (currentCart) {
            currentCart.forEach((item) => {
                item.items.quantity = item.items.quantity - item.quantity
                console.log(item.items)
                fetch(`http://site212224.tw.cs.unibo.it/item/${item.items._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item.items),
                }).then((res) => {
                    localStorage.removeItem('cart')
                })
            })
        }
    }

    return (
        <div>
            <Navbar />
            Thanks for shopping with us
            {sendOrder()}
            <Footer />
        </div>
    );
}

export default Thanks;