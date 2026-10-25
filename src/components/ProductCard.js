import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom";
import {getProductImage} from "../utils/productImage";

const PLACEHOLDER =
    "https://placehold.co/300x300/png?text=No+Image";

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const displayName =
        i18n.language?.startsWith("ar")
            ? (product.nameAr || product.nameEn)
            : (product.nameEn || product.nameAr);

    const displayDesc =
        i18n.language?.startsWith("ar")
            ? (product.descriptionAr || product.descriptionEn)
            : (product.descriptionEn || product.descriptionAr);

    const imageUrl =
        getProductImage(product, PLACEHOLDER);


    const handleAdd = async () => {
        try {
            setLoading(true);
            await addItem(product.id, 1);
            toast.success(t("cart.added", { name: displayName }));
        } catch (err) {
            if (err?.response?.status === 401)
                toast.error(t("cart.loginFirst"));
            else toast.error(t("cart.addFailed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Link
            to={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <div className="card h-100 shadow-sm product-card">
                {/* ✅ IMAGE */}
                <div className="ratio ratio-1x1">
                    <img
                        src={imageUrl}
                        alt={displayName}
                        className="card-img-top object-fit-cover"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER;
                        }}
                    />
                </div>

                <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{displayName}</h6>

                    {displayDesc && (
                        <p className="card-text text-muted small line-clamp-2">
                            {displayDesc}
                        </p>
                    )}

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                        <div className="fw-bold">
                            {product.price} {product.currency || "EGP"}
                        </div>

                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleAdd}
                            disabled={loading}
                        >
                            {loading ? t("product.adding") : t("product.addToCart")}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
