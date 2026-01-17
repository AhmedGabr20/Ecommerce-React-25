import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error("Please login first");
            return;
        }
        try {
            setLoading(true);
            await addItem(product.id, 1);
            toast.success(`${product.name} added to cart`);
            // small animate (add class)
            // optional: trigger CSS animation here
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                err?.data?.message ||
                err?.message ||
                "Failed to add to cart"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted small">{product.description}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div className="fw-bold">${product.price}</div>
                    <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={loading}>
                        {loading ? "Adding..." : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}
