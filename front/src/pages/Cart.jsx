import React from "react";

import Navbar from "../components/Navbar/navbar";
import CartCheckout from "../components/Cart/cartCheckout";
import Footer from "../components/Footer/footer";

function Cart() {
    return (
        <div>
            <Navbar />
            <CartCheckout />
            <Footer />
        </div>
    );
}

export default Cart;
