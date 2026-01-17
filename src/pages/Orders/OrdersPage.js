import React, { useEffect, useState } from "react";
import OrderService from "../../services/orderService";

export default function OrderPage(){

    const userId = localStorage.getItem("userId");
    const [orders,setOrders] = useState([]);

    useEffect(() => {
        OrderService.getUserOrders(userId).then((res)=>{
            setOrders(res.data)
        })
    }, []);


    return (
        <div className="container mt-4">
            <h3>Your Orders</h3>
            <ul className="list-group mt-3">
                {orders.map((order) => (
                    <li key={order.id} className="list-group-item">
                        Order #{order.id} — {order.status} — ${order.totalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );

}