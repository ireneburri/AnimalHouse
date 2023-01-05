import React, { useEffect } from 'react';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/footer';
import { useState } from 'react';
import axios from 'axios';


function Thanks() {
    const getCurrentCart = window.localStorage.getItem('cart');
    const username = window.localStorage.getItem('username');
    const currentCart = JSON.parse(getCurrentCart);
    const [nothing, setNothing] = useState(null);
    const [listItems, setListItems] = useState([]);
    const date = new Date()
    
    var vipItem = false

    var userid = window.localStorage.getItem('userid')
    var id  = userid.substring(1, userid.length-1)

    useEffect(() => {
        if (!currentCart) {
            return(
            setNothing('Nothing to see')
            )
        }

        if (currentCart.filter(item => item.items.vip === true).length > 0) {
            vipItem = true
            console.log(vipItem)
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
                fetch("http://site212224.tw.cs.unibo.it/user/id/" + id, { //per farlo funzionare va cambiata la patch
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ vip: "true" }),
                }).then((res) => {
                })
            }

            var sum = currentCart.reduce(function (acc, obj) { return acc + obj.items.price * obj.quantity; }, 0);

            currentCart.forEach((item) => {
                var obj = {name: item.items.name, quantity: item.quantity, singleprice: item.items.price}
                var strobj = JSON.stringify(obj)
                listItems.push(strobj);
                console.log(strobj)
            })

            console.log(listItems);
            axios.post('http://site212224.tw.cs.unibo.it/Order/', {
                client_id: '638a43569d836700070fa273',
                username: username,
                products: listItems,
                price: sum,
                date: date,
                vip: vipItem,
                completed: 'true'
            }).then((res) => {
                console.log(res);
                localStorage.removeItem('cart');
        })
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