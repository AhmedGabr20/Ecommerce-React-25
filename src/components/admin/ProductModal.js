import React, { useEffect, useState } from "react";

export default function ProductModal({ open, onClose, onSave, categories, initial }) {
    const [form, setForm] = useState({
        nameEn: "", nameAr: "",
        descriptionEn: "", descriptionAr: "",
        price: 0, stock: 0,
        sku: "", slug: "", brand: "",
        currency: "EGP",
        active: true,
        categoryId: ""
    });

    useEffect(() => {
        if (initial) {
            setForm({
                name: initial.name || "",
                description: initial.description || "",
                price: initial.price || 0,
                stock: initial.stock || 0,
                categoryId: initial.categoryId || ""
            });
        } else {
            setForm({ name:"", description:"", price:0, stock:0, categoryId:"" });
        }
    }, [initial, open]);

    if (!open) return null;

    const submit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
            categoryId: Number(form.categoryId),
        });
    };

    return (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,.4)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{initial ? "Edit Product" : "New Product"}</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={submit}>
                        <div className="modal-body">
                            <input className="form-control mb-2" placeholder="Name"
                                   value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />

                            <textarea className="form-control mb-2" placeholder="Description"
                                      value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />

                            <div className="row g-2">
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="Price"
                                           value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} required />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="Stock"
                                           value={form.stock} onChange={(e)=>setForm({...form,stock:e.target.value})} required />
                                </div>
                            </div>

                            <select className="form-select mt-2"
                                    value={form.categoryId}
                                    onChange={(e)=>setForm({...form,categoryId:e.target.value})}
                                    required>
                                <option value="">Select category</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
