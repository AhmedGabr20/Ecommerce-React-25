import React, { useEffect, useState } from "react";
import PaymentService  from "../../services/paymentService";
import {useNavigate, useParams} from "react-router-dom";

export default function PaymentPage (){

    const { orderId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const pay = async ()=>{
        setLoading(true);
        await PaymentService.pay(orderId,"CASH");
        navigate("/orders");
    };


    return (
        <div className="container mt-5">
            <h3>Payment for Order #{orderId}</h3>
            <button onClick={pay} className="btn btn-primary mt-3">
                {loading ? "Processing Payment..." : "Pay Now"}
            </button>
        </div>
    );

}
