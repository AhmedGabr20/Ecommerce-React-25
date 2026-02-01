import React, { useState, useEffect, useMemo } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import adminService from "../../services/adminService";
import { useTranslation } from "react-i18next";

function iso(d) {
    return d.toISOString().slice(0, 10);
}

export default function AdminDashboard() {
    const { t, i18n } = useTranslation();

    const [summary, setSummary] = useState(null);
    const [revenue, setRevenue] = useState([]);
    const [top, setTop] = useState([]);
    const [loading, setLoading] = useState(true);

    const days = 50; // عندك 50 يوم
    const range = useMemo(() => {
        const to = new Date();
        const from = new Date();
        from.setDate(to.getDate() - days);
        return { from: iso(from), to: iso(to) };
    }, []);

    const money = (value) =>
        new Intl.NumberFormat(i18n.language === "ar" ? "ar-EG" : "en-US", {
            style: "currency",
            currency: "USD",
        }).format(Number(value || 0));

    useEffect(() => {
        (async () => {
            try {
                const s = await adminService.summary();
                setSummary(s?.data);

                const r = await adminService.revenue(range.from, range.to);
                setRevenue((r?.data || []).map(x => ({
                    date: x?.date,
                    revenue: x?.revenue
                })));

                const tp = await adminService.topProducts(range.from, range.to, 5);
                setTop(tp?.data || []);
            } finally {
                setLoading(false);
            }
        })();
    }, [range.from, range.to]);

    if (loading || !summary) {
        return <div className="container mt-4">{t("admin.loading")}</div>;
    }

    return (
        <div className="container mt-4">
            <h3>{t("admin.dashboard")}</h3>

            <div className="row g-3 mt-2">
                <Kpi title={t("admin.kpi.totalRevenue")} value={money(summary.totalRevenue)} />
                <Kpi title={t("admin.kpi.paidOrders")} value={summary.paidOrders} />
                <Kpi title={t("admin.kpi.totalOrders")} value={summary.totalOrders} />
                <Kpi title={t("admin.kpi.totalUsers")} value={summary.totalUsers} />
            </div>

            <div className="row g-3 mt-4">
                <div className="col-12 col-lg-8">
                    <div className="card p-3">
                        <h5 className="mb-1">{t("admin.revenueTitle")}</h5>
                        <div className="text-muted small mb-2">
                            {t("admin.revenueRangeHint", { days })}
                        </div>

                        {revenue.length === 0 ? (
                            <div className="text-muted">{t("admin.noRevenue")}</div>
                        ) : (
                            <div style={{ width: "100%", height: 300 }}>
                                <ResponsiveContainer>
                                    <LineChart data={revenue}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip
                                            formatter={(val) => money(val)}
                                            labelFormatter={(label) => label}
                                        />
                                        <Line type="monotone" dataKey="revenue" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card p-3">
                        <h5>{t("admin.topProducts")}</h5>

                        {top.length === 0 ? (
                            <div className="text-muted">{t("admin.noTop")}</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-sm">
                                    <thead>
                                    <tr>
                                        <th>{t("admin.table.product")}</th>
                                        <th>{t("admin.table.qty")}</th>
                                        <th>{t("admin.table.amount")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {top.map(p => (
                                        <tr key={p.productId}>
                                            <td>{p.productName}</td>
                                            <td>{p.totalQty}</td>
                                            <td>{money(p.totalRevenue)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <small className="text-muted">
                            {t("admin.range", { from: range.from, to: range.to })}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Kpi({ title, value }) {
    return (
        <div className="col-6 col-lg-3">
            <div className="card p-3 shadow-sm">
                <div className="text-muted small">{title}</div>
                <div className="fs-4 fw-bold">{value}</div>
            </div>
        </div>
    );
}
