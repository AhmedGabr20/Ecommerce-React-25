import React, { useMemo, useState } from "react";
import orderService from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useCart } from "../../contexts/CartContext";

export default function CheckoutPage() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { cart } = useCart();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const itemsCount = useMemo(() => {
        return cart?.items?.reduce((sum, x) => sum + (x.quantity || 0), 0) || 0;
    }, [cart]);

    const total = cart?.totalPrice || 0;

    const money = useMemo(() => {
        // عدّل العملة لو عندك EGP مثلا
        const locale = i18n.language === "ar" ? "ar-EG" : "en-US";
        return new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(total);
    }, [total, i18n.language]);

    const placeOrder = async () => {
        try {
            setLoading(true);
            const res = await orderService.placeOrder(userId);
            const orderId = res.data.id;

            toast.success(t("checkout.success"));
            setOpen(false);
            navigate(`/payment/${orderId}`);
        } catch (err) {
            toast.error(err?.response?.data?.message || t("errors.DEFAULT"));
        } finally {
            setLoading(false);
        }
    };

    const canPlace = !!userId && itemsCount > 0 && !loading;

    return (
        <div className="container mt-5">
            <h3>{t("checkout.title")}</h3>

            {/* Summary Card */}
            <div className="card mt-3">
                <div className="card-body">
                    <h5 className="card-title mb-3">{t("checkout.summary")}</h5>

                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">{t("checkout.items")}</span>
                        <span className="fw-bold">{itemsCount}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <span className="text-muted">{t("checkout.total")}</span>
                        <span className="fw-bold">{money}</span>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <button
                onClick={() => setOpen(true)}
                className="btn btn-success mt-3"
                disabled={!canPlace}
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        {t("checkout.placingOrder")}
                    </>
                ) : (
                    t("checkout.placeOrder")
                )}
            </button>

            {/* Simple Modal (no extra libs) */}
            {open && (
                <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{t("checkout.confirmTitle")}</h5>
                                <button type="button" className="btn-close" onClick={() => !loading && setOpen(false)} />
                            </div>

                            <div className="modal-body">
                                <p className="mb-2">{t("checkout.confirmText")}</p>
                                <div className="small text-muted">
                                    {t("checkout.items")}: <b>{itemsCount}</b> — {t("checkout.total")}: <b>{money}</b>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setOpen(false)}
                                    disabled={loading}
                                >
                                    {t("checkout.cancel")}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={placeOrder}
                                    disabled={loading}
                                >
                                    {loading ? t("checkout.placingOrder") : t("checkout.confirm")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
