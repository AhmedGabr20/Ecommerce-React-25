import React, { useEffect, useState } from "react";
import OrderService from "../../services/orderService";
import { useTranslation } from "react-i18next";

export default function OrderPage() {
    const userId = localStorage.getItem("userId");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { t, i18n } = useTranslation();

    useEffect(() => {
        OrderService.getUserOrders(userId)
            .then((res) => {
                setOrders(res.data ?? []);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <span className="spinner-border" />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h3>{t("orders.title")}</h3>

            {orders.length === 0 ? (
                <p className="text-muted mt-3">
                    {t("orders.empty")}
                </p>
            ) : (
                <ul className="list-group mt-3">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <div className="fw-bold">
                                    {t("orders.order")} #{order.id}
                                </div>
                                <div className="small text-muted">
                                    {t(`orderStatus.${order.status}`)}
                                </div>
                            </div>

                            <div className="fw-bold">
                                {new Intl.NumberFormat(
                                    i18n.language === "ar" ? "ar-EG" : "en-US",
                                    { style: "currency", currency: "USD" }
                                ).format(order.totalPrice)}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
