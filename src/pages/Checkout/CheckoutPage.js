import React, { useEffect, useState } from "react";
import orderService  from "../../services/orderService";
import {useNavigate} from "react-router-dom";

export default function CheckoutPage(){

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const [loading ,setLoading]= useState(false);

    const placeOrder = async ()=>{
        setLoading(true);
        const res = await orderService.placeOrder(userId);
        const orderId = res.data.id;
        navigate(`/payment/${orderId}`);
    }


    return (
        <div className="container mt-5">
            <h3>Checkout</h3>
            <button onClick={placeOrder} className="btn btn-success mt-3">
                {loading ? "Placing order..." : "Place Order"}
            </button>
        </div>
    );

}