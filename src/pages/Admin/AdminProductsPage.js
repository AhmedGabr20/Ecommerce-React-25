import React, { useEffect, useState } from "react";
import adminProductsService from "../../services/adminProductsService";
import ProductModal from "../../components/admin/ProductModal";
import { toast } from "react-toastify";

export default function AdminProductsPage() {
    const [q, setQ] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [cats, setCats] = useState([]);

    const [page, setPage] = useState(0);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const load = async (p = page) => {
        try {
            setLoading(true);
            const res = await adminProductsService.list({
                q,
                categoryId: categoryId ? Number(categoryId) : null,
                page: p,
                size: 10,
            });
            const payload = res.data?.data ?? res.data ?? res;
            setData(payload);
        } catch {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const loadCats = async () => {
        const res = await adminProductsService.categories();
        const payload = res.data?.data ?? res.data ?? res;
        setCats(payload);
    };

    useEffect(() => {
        loadCats();
        load(0);
        setPage(0);
    }, []);

    const onSearch = async (e) => {
        e.preventDefault();
        await load(0);
        setPage(0);
    };

    const openCreate = () => {
        setEditing(null);
        setModalOpen(true);
    };

    const openEdit = (p) => {
        setEditing(p);
        setModalOpen(true);
    };

    const onSave = async (body) => {
        try {
            if (editing) {
                await adminProductsService.update(editing.id, body);
                toast.success("Product updated");
            } else {
                await adminProductsService.create(body);
                toast.success("Product created");
            }
            setModalOpen(false);
            await load(page);
        } catch (e) {
            toast.error(e.response?.data?.message || "Save failed");
        }
    };

    const onDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await adminProductsService.remove(id);
            toast.success("Deleted");
            await load(page);
        } catch (e) {
            toast.error(e.response?.data?.message || "Delete failed");
        }
    };

    const pageInfo = data || {};
    const rows = pageInfo.content || [];

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <h3>Admin — Products</h3>
                <button className="btn btn-primary btn-sm" onClick={openCreate}>+ New Product</button>
            </div>

            <form className="row g-2 mt-2" onSubmit={onSearch}>
                <div className="col-12 col-md-5">
                    <input className="form-control" placeholder="Search by name"
                           value={q} onChange={(e)=>setQ(e.target.value)} />
                </div>
                <div className="col-12 col-md-4">
                    <select className="form-select" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                        <option value="">All Categories</option>
                        {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="col-12 col-md-3">
                    <button className="btn btn-primary me-2" type="submit">Search</button>
                    <button className="btn btn-secondary" type="button"
                            onClick={() => { setQ(""); setCategoryId(""); load(0); setPage(0); }}>
                        Reset
                    </button>
                </div>
            </form>

            <div className="card p-3 mt-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table table-sm align-middle">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th style={{width:160}}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {rows.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>
                                            <div className="fw-bold">{p.name}</div>
                                            <div className="text-muted small">{p.description}</div>
                                        </td>
                                        <td>{p.categoryName}</td>
                                        <td>${Number(p.price || 0).toFixed(2)}</td>
                                        <td>{p.stock}</td>
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(p)}>Edit</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr><td colSpan="6" className="text-center text-muted">No products</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                                Page {pageInfo.number + 1} of {pageInfo.totalPages} — Total {pageInfo.totalElements}
                            </small>

                            <div>
                                <button className="btn btn-sm btn-outline-secondary me-2"
                                        disabled={pageInfo.first}
                                        onClick={async ()=>{ const p = page - 1; setPage(p); await load(p); }}>
                                    Prev
                                </button>
                                <button className="btn btn-sm btn-outline-secondary"
                                        disabled={pageInfo.last}
                                        onClick={async ()=>{ const p = page + 1; setPage(p); await load(p); }}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <ProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={onSave}
                categories={cats}
                initial={editing}
            />
        </div>
    );
}
