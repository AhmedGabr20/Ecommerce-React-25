import React from "react";
import api from "../api/axiosConfig";

export default function ProductCard({ product }) {
    const userId = localStorage.getItem("userId") || 1; // fallback

    const addToCart = async () => {
        try {
            // Endpoint: POST /cart/{userId}/add/{productId}?quantity=1
            const res = await api.post(`/cart/${userId}/add/${product.id}?quantity=1`);
            alert(res.message || "Added to cart");
        } catch (err) {
            alert("Failed to add to cart");
        }
    };

    return (
        <div className="card h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted small">{product.description}</p>
                <div className="mt-auto">
                    <div className="fw-bold mb-2">${product.price}</div>
                    <button onClick={addToCart} className="btn btn-primary btn-sm">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}
