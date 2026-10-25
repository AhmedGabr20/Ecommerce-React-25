import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/productService";
import Spinner from "../../components/Spinner";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {getProductImage} from "../../utils/productImage";

const PLACEHOLDER =
    "https://via.placeholder.com/600x600?text=No+Image";

export default function ProductDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const { addItem } = useCart();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        productService.getById(id)
            .then(res => setProduct(res))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner />;

    if (!product) return <p className="text-center mt-5">Product not found</p>;

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
            setAdding(true);
            await addItem(product.id, 1);
            toast.success(t("cart.added", { name: displayName }));
        } catch (err) {
            toast.error(t("cart.addFailed"));
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="container mt-4">

            <div className="row g-4">

                {/* IMAGE */}
                <div className="col-md-6">

                    <img
                        src={imageUrl}
                        alt={displayName}
                        className="img-fluid rounded shadow-sm"
                        onError={(e) => {
                            e.currentTarget.src = PLACEHOLDER;
                        }}
                    />

                </div>

                {/* DETAILS */}
                <div className="col-md-6">

                    <h2 className="mb-2">{displayName}</h2>

                    {product.brand && (
                        <p className="text-muted">
                            {t("product.brand")} : {product.brand}
                        </p>
                    )}

                    <h4 className="text-primary fw-bold mt-3">
                        {product.price} {product.currency || "EGP"}
                    </h4>

                    <div className="mt-3">
                        {displayDesc}
                    </div>

                    <div className="mt-3">
                        <strong>{t("product.stock")}:</strong> {product.stock}
                    </div>

                    <button
                        className="btn btn-primary mt-4"
                        onClick={handleAdd}
                        disabled={adding}
                    >
                        {adding ? t("product.adding") : t("product.addToCart")}
                    </button>

                </div>

            </div>

        </div>
    );
}