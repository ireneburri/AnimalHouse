import React from 'react';

function OrderCard(props) {
    return (
        <div className="min-h-screen w-full bg-gray-300" style={{ margin: "1em", width: "90%" }}>
            <div className="max-w-screen-md mx-auto px-10 pt-20" >
                <div className="bg-white md:h-48 rounded-lg shadow-md flex flex-wrap flex-col-reverse md:flex-col" style={{ display: "flex", borderRadius: "20px", border: "dotted white 1px" }}>

                    <div style={{ padding: '2em' }}>
                        <p style={{ fontSize: '12px' }}>  DATE: <span style={{ fontSize: "15px" }}> {props.date.substring(0, 10)}, {props.date.substring(11, 16)}</span> </p>
                        <ul>
                            {props.products.map(prod => (
                                <li key={prod}> {JSON.parse(prod).name} - {JSON.parse(prod).quantity} </li>
                            ))}
                        </ul>
                        <hr />
                        <div> TOTAL PRICE: {props.price} </div>
                        <p style={{ fontSize: '12px' }}> ID ORDER: <span> {props.id} </span> </p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default OrderCard;
