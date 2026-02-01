import React, { useState } from "react";
import PaymentService from "../../services/paymentService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getToastMessage } from "../../utils/errorMessage";

export default function PaymentPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [method, setMethod] = useState("CASH"); // CASH / CARD

    const pay = async () => {
        try {
            setLoading(true);
            await PaymentService.pay(orderId, method);
            toast.success(t("payment.success"));
            setOpen(false);
            navigate("/orders");
        } catch (err) {
            console.error(err);
            toast.error(getToastMessage(t, err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h3>{t("payment.title", { orderId })}</h3>

            {/* Payment Method */}
            <div className="card mt-3">
                <div className="card-body">
                    <div className="mb-2 fw-bold">{t("payment.method")}</div>

                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="method"
                                id="cash"
                                checked={method === "CASH"}
                                onChange={() => setMethod("CASH")}
                                disabled={loading}
                            />
                            <label className="form-check-label" htmlFor="cash">
                                {t("payment.cash")}
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="method"
                                id="card"
                                checked={method === "CARD"}
                                onChange={() => setMethod("CARD")}
                                disabled={loading}
                            />
                            <label className="form-check-label" htmlFor="card">
                                {t("payment.card")}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <button
                onClick={() => setOpen(true)}
                disabled={loading}
                className="btn btn-primary mt-3"
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        {t("payment.processing")}
                    </>
                ) : (
                    t("payment.payNow")
                )}
            </button>

            {/* Confirm Modal */}
            {open && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ background: "rgba(0,0,0,.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{t("payment.confirmTitle")}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => !loading && setOpen(false)}
                                />
                            </div>

                            <div className="modal-body">
                                <p className="mb-2">{t("payment.confirmText")}</p>
                                <div className="small text-muted">
                                    {t("payment.method")}:{" "}
                                    <b>{method === "CASH" ? t("payment.cash") : t("payment.card")}</b>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setOpen(false)}
                                    disabled={loading}
                                >
                                    {t("payment.cancel")}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={pay}
                                    disabled={loading}
                                >
                                    {loading ? t("payment.processing") : t("payment.confirm")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
