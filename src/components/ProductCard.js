import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleAdd = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error(t("cart.loginFirst"));
            return;
        }
        try {
            setLoading(true);
            await addItem(product.id, 1);
            toast.success(
                t("cart.added", { name: product.name })
            );
            // small animate (add class)
            // optional: trigger CSS animation here
        } catch (err) {
            toast.error(
                t("cart.addFailed")
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
                        {loading ? t("product.adding") : t("product.addToCart")}
                    </button>
                </div>
            </div>
        </div>
    );
}
