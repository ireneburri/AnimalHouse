import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/navbar';
import Announcement from '../components/Announcement/announcement';
import Footer from '../components/Footer/footer';
import { useState } from 'react';


function Thanks() {
    const getCurrentCart = window.localStorage.getItem('cart');
    const username = window.localStorage.getItem('username');
    const currentCart = JSON.parse(getCurrentCart);
    const [nothing, setNothing] = useState(null)
    var vipItem = false

    useEffect(() => {
        if (!currentCart) {
            return(
            setNothing('Nothing to see')
            )
        }

        if (currentCart.filter(item => item.items.vip === true).length > 0) {
            vipItem = true;
        }

        if (currentCart) { //diminuisce la quantità di elementi disponibili per un certo prodotto
            currentCart.forEach((item) => {
                item.items.quantity = item.items.quantity - item.quantity
                console.log(item.items)
                fetch(`http://site212224.tw.cs.unibo.it/item/${item.items._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(item.items),
                })
            })

            

            if (vipItem) { //imposta l'utente a vip se ha acquistato qualcosa di vip
                fetch(`http://site212224.tw.cs.unibo.it/username/${username}`, { //per farlo funzionare va cambiata la patch
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ vip: "true" }),
                }).then((res) => {
                    localStorage.removeItem('cart')
                }
                )
            }
        }

    }, [])

    return (
        <div>
            <Navbar />
            {nothing?<div>{nothing}</div>:'Thanks for shopping with us'} 
            <Footer />
        </div>
    );
}


export default Thanks;