import React , {useState,useEffect} from "react";
import adminOrdersService from "../../services/adminOrdersService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const ORDER_STATUSES = Object.freeze([
    "NEW",
    "PENDING",
    "PROCESSING",
    "PAID",
    "SHIPPED",
    "DELIVERED",
    "COMPLETED",
    "CANCELED",
    "CLOSED"
]);

export default function AdminOrdersPage() {
    const { t, i18n } = useTranslation();
    const [status , setStatus]= useState("")
    const [username, setUsername] = useState("");
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [data, setData] = useState(null); // spring page
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null); // full details
    const statusLabel = (s) => t(`orderStatus.${s}`, { defaultValue: s });

    const load = async (p = page) => {
        try {
            setLoading(true);
            const res = await adminOrdersService.list({status, username, page: p, size});
            const payload = res?.data ?? res.data?.data ?? res;
            setData(payload);
        }catch (e){
            toast.error(t("adminOrders.loadFailed"));
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(0); setPage(0); }, []); // initial

    const onSearch = async (e) => {
        e.preventDefault();
        await load(0);
        setPage(0);
        setSelectedOrder(null);
    };

    const openDetails = async (id) => {
        try {
            const res = await adminOrdersService.details(id);
            const payload = res?.data ?? res.data?.data ?? res;
            setSelectedOrder(payload);
        }catch (e){
            toast.error(t("adminOrders.loadOrderDetailsFailed"));
        }
    };

    const changeStatus = async (orderId, status) => {
        try {
            await adminOrdersService.updateStatus(orderId,status);
            toast.success(t("adminOrders.statusUpdated"));
            await load(page);
            // update details panel if open
            if (selectedOrder?.id === orderId) {
                await openDetails(orderId);
            }
        }catch (e){
            toast.error(t("adminOrders.statusUpdateFailed"))
        }
    };

    const pageInfo = data || {};
    const rows = pageInfo.content || [];


    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <h3>{t("adminOrders.title")}</h3>

                <button className="btn btn-outline-secondary btn-sm" onClick={() => load(page)}>
                    {t("adminOrders.refresh")}
                </button>
            </div>

            <form className="row g-2 mt-2" onSubmit={onSearch}>
                <div className="col-12 col-md-3">
                    <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">{t("adminOrders.filters.allStatus")}</option>
                        {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {statusLabel(s)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-12 col-md-5">
                    <input
                        className="form-control"
                        placeholder={t("adminOrders.filters.usernamePlaceholder")}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="col-12 col-md-4">
                    <button className="btn btn-primary me-2" type="submit">
                        {t("adminOrders.filters.search")}
                    </button>

                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => {
                            setStatus("");
                            setUsername("");
                            setSelectedOrder(null);
                            load(0);
                            setPage(0);
                        }}
                    >
                        {t("adminOrders.filters.reset")}
                    </button>
                </div>
            </form>

            <div className="row mt-3 g-3">
                <div className="col-12 col-lg-8">
                    <div className="card p-3">
                        {loading ? (
                            <div>{t("adminOrders.table.loading")}</div>
                        ) : (
                            <>
                                <div className="table-responsive">
                                    <table className="table table-sm align-middle">
                                        <thead>
                                        <tr>
                                            <th>{t("adminOrders.table.id")}</th>
                                            <th>{t("adminOrders.table.user")}</th>
                                            <th>{t("adminOrders.table.created")}</th>
                                            <th>{t("adminOrders.table.total")}</th>
                                            <th>{t("adminOrders.table.status")}</th>
                                            <th>{t("adminOrders.table.actions")}</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {rows.map((o) => (
                                            <tr key={o.id}>
                                                <td>{o.id}</td>
                                                <td>{o.username}</td>
                                                <td>{(o.createdAt)}</td>
                                                <td>{(o.totalPrice)}</td>

                                                <td style={{ minWidth: 170 }}>
                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={o.status}
                                                        onChange={(e) => changeStatus(o.id, e.target.value)}
                                                    >
                                                        {ORDER_STATUSES.map((s) => (
                                                            <option key={s} value={s}>
                                                                {statusLabel(s)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => openDetails(o.id)}>
                                                        {t("adminOrders.table.details")}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                        {rows.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted">
                                                    {t("adminOrders.table.noOrders")}
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">
                                        {t("adminOrders.pagination.page", {
                                            page: (pageInfo.number ?? 0) + 1,
                                            totalPages: pageInfo.totalPages ?? 0,
                                            total: pageInfo.totalElements ?? 0,
                                        })}
                                    </small>

                                    <div>
                                        <button
                                            className="btn btn-sm btn-outline-secondary me-2"
                                            disabled={!!pageInfo.first}
                                            onClick={async () => {
                                                const p = page - 1;
                                                setPage(p);
                                                await load(p);
                                            }}
                                        >
                                            {t("adminOrders.pagination.prev")}
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            disabled={!!pageInfo.last}
                                            onClick={async () => {
                                                const p = page + 1;
                                                setPage(p);
                                                await load(p);
                                            }}
                                        >
                                            {t("adminOrders.pagination.next")}
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card p-3">
                        <h5>{t("adminOrders.details.title")}</h5>

                        {!selectedOrder ? (
                            <div className="text-muted">{t("adminOrders.details.select")}</div>
                        ) : (
                            <>
                                <div className="mb-2">
                                    <b>{t("adminOrders.details.order")}:</b> #{selectedOrder.id}
                                </div>

                                <div className="mb-2">
                                    <b>{t("adminOrders.details.user")}:</b> {selectedOrder.username} (#{selectedOrder.userId})
                                </div>

                                <div className="mb-2">
                                    <b>{t("adminOrders.details.status")}:</b> {statusLabel(selectedOrder.status)}
                                </div>

                                <div className="mb-2">
                                    <b>{t("adminOrders.details.total")}:</b> {selectedOrder.totalPrice}
                                </div>

                                <hr />
                                <div className="fw-bold mb-2">{t("adminOrders.details.items")}</div>

                                <ul className="list-group">
                                    {(selectedOrder.items || []).map((i) => (
                                        <li key={i.id} className="list-group-item d-flex justify-content-between">
                      <span>
                        {i.productName} × {i.quantity}
                      </span>
                                            <span>{i.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}