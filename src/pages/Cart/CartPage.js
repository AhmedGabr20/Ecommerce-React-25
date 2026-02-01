import React from "react";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function CartPage() {
    const { cart, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    if (!cart) return <div className="container mt-5">
        {t("cartPage.empty")}
    </div>;

    const handleRemove = async (productId) => {
        try {
            await removeItem(productId);
            toast.success(t("cartToast.itemRemoved"));
        } catch {
            toast.error(t("cartToast.removeFailed"));
        }
    };

    return (
        <div className="container mt-4">
            <h3>{t("cartPage.title")}</h3>
            <div className="list-group mt-3">
                {cart.items.map(i => (
                    <div key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold">{i.productName}</div>
                            <div className="text-muted small">
                                {t("cartPage.qty")}: {i.quantity}
                            </div>
                        </div>
                        <div>
                            <div className="fw-bold">${i.price}</div>
                            <button className="btn btn-sm btn-outline-danger ms-2"
                                    onClick={()=>handleRemove(i.id)}>
                                {t("cartPage.remove")}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 d-flex justify-content-between align-items-center">
                <h4>
                    {t("cartPage.total")}: ${cart.totalPrice}
                </h4>
                <div>
                    <button className="btn btn-secondary me-2"
                            onClick={() => { clearCart();
                                toast.info(t("cartToast.cleared"));
                            }}
                    >
                        {t("cartPage.clear")}
                    </button>
                    <button className="btn btn-primary"
                            onClick={() => navigate("/checkout")}>
                        {t("cartPage.checkout")}
                    </button>
                </div>
            </div>
        </div>
    );
}
