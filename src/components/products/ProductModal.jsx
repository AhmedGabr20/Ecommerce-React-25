import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import fileService from "../../services/fileService";

const initialState = {
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    price: 0,
    stock: 0,
    sku: "",
    slug: "",
    brand: "",
    currency: "EGP",
    active: true,
    categoryId: "",
    images: []
};

export default function ProductModal({
                                         open,
                                         onClose,
                                         onSave,
                                         categories,
                                         initial
                                     }) {

    const { t, i18n } = useTranslation();
    const [form, setForm] = useState(initialState);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (initial) {
            setForm({
                nameEn: initial.nameEn || "",
                nameAr: initial.nameAr || "",
                descriptionEn: initial.descriptionEn || "",
                descriptionAr: initial.descriptionAr || "",
                price: initial.price || "",
                stock: initial.stock || "",
                sku: initial.sku || "",
                slug: initial.slug || "",
                brand: initial.brand || "",
                currency: initial.currency || "EGP",
                active: initial.active ?? true,
                categoryId: initial.categoryId || "",
                images: initial.images || []
            });

            setPreview(initial.imageUrl || null);

        } else {
            setForm(initialState);
        }
    }, [initial, open]);

    if (!open) return null;

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        onSave({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
            categoryId: Number(form.categoryId)
        });
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        for (const file of files) {

            const url = await fileService.upload(file);
            console.log(url);

            setForm(prev => ({
                ...prev,
                images: [
                    ...prev.images,
                    {
                        url,
                        altEn: "",
                        altAr: "",
                        primaryImage: prev.images.length === 0,
                        sortOrder: prev.images.length
                    }
                ]
            }));
        }
    };

    const removeImage = (index) => {
        setForm(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const setPrimary = (index) => {
        setForm(prev => ({
            ...prev,
            images: prev.images.map((img, i) => ({
                ...img,
                primaryImage: i === index
            }))
        }));
    };

    return (
        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,.5)" }}
        >
            <div className="modal-dialog modal-xl">

                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">
                            {initial
                                ? t("productModal.editTitle")
                                : t("productModal.createTitle")}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <form onSubmit={submit}>

                        <div className="modal-body">

                            {/* Product Name */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        {t("productModal.productNameAr")}
                                    </label>

                                    <input
                                        className="form-control"
                                        dir="rtl"
                                        value={form.nameAr}
                                        onChange={(e) =>
                                            handleChange("nameAr", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        {t("productModal.productNameEn")}
                                    </label>

                                    <input
                                        className="form-control"
                                        value={form.nameEn}
                                        onChange={(e) =>
                                            handleChange("nameEn", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                            </div>

                            {/* Description */}
                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        {t("productModal.descriptionAr")}
                                    </label>

                                    <textarea
                                        className="form-control"
                                        dir="rtl"
                                        rows="3"
                                        value={form.descriptionAr}
                                        onChange={(e) =>
                                            handleChange("descriptionAr", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">
                                        {t("productModal.descriptionEn")}
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={form.descriptionEn}
                                        onChange={(e) =>
                                            handleChange("descriptionEn", e.target.value)
                                        }
                                    />
                                </div>

                            </div>

                            {/* Price & Stock */}
                            <div className="row">

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        {t("productModal.price")}
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={form.price}
                                        onChange={(e) =>
                                            handleChange("price", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        {t("productModal.stock")}
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={form.stock}
                                        onChange={(e) =>
                                            handleChange("stock", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        {t("productModal.currency")}
                                    </label>

                                    <input
                                        className="form-control"
                                        value={form.currency}
                                        onChange={(e) =>
                                            handleChange("currency", e.target.value)
                                        }
                                    />
                                </div>

                            </div>

                            {/* SKU / Slug / Brand */}
                            <div className="row">

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        {t("productModal.sku")}
                                    </label>

                                    <input
                                        className="form-control"
                                        value={form.sku}
                                        onChange={(e) =>
                                            handleChange("sku", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        {t("productModal.slug")}
                                    </label>

                                    <input
                                        className="form-control"
                                        value={form.slug}
                                        onChange={(e) =>
                                            handleChange("slug", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">
                                        {t("productModal.brand")}
                                    </label>

                                    <input
                                        className="form-control"
                                        value={form.brand}
                                        onChange={(e) =>
                                            handleChange("brand", e.target.value)
                                        }
                                    />
                                </div>

                            </div>

                            {/* Category */}
                            <div className="mb-3">
                                <label className="form-label">
                                    {t("productModal.category")}
                                </label>

                                <select
                                    className="form-select"
                                    value={form.categoryId}
                                    onChange={(e) =>
                                        handleChange("categoryId", e.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        {t("productModal.selectCategory")}
                                    </option>

                                    {categories.map((c) => (
                                        <option
                                            key={c.id}
                                            value={c.id}
                                        >
                                            {c.nameAr}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Image Upload */}
                            <div className="mb-3">

                                <label className="form-label">
                                    {t("productModal.image")}
                                </label>

                                <input
                                    type="file"
                                    multiple
                                    className="form-control"
                                    onChange={handleImageUpload}
                                />

                            </div>

                            <div className="row mt-3">
                                {form.images.map((img, index) => (
                                    <div className="col-4 mb-3" key={index}>
                                        <div className="card">

                                            <img
                                                src={img.url}
                                                alt=""
                                                className="card-img-top"
                                                style={{
                                                    height: 120,
                                                    objectFit: "cover"
                                                }}
                                            />

                                            <div className="card-body p-2">

                                                <button
                                                    type="button"
                                                    className={`btn btn-sm w-100 mb-2 ${
                                                        img.primaryImage
                                                            ? "btn-success"
                                                            : "btn-outline-secondary"
                                                    }`}
                                                    onClick={() => setPrimary(index)}
                                                >
                                                    {img.primaryImage
                                                        ? "Primary"
                                                        : "Set Primary"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger w-100"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* Active */}
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={form.active}
                                    onChange={(e) =>
                                        handleChange("active", e.target.checked)
                                    }
                                />

                                <label className="form-check-label">
                                    {t("productModal.active")}
                                </label>
                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={onClose}
                            >
                                {t("productModal.cancel")}
                            </button>

                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                {t("productModal.save")}
                            </button>

                        </div>

                    </form>

                </div>
            </div>

        </div>
    );
}