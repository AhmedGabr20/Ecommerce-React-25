import React from "react";
import { useTranslation } from "react-i18next";
import "./ProductViewDrawer.css";

export default function ProductViewDrawer({ open, onClose, product }) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language?.startsWith("ar");

    if (!open || !product) return null;

    const primaryImage =
        product.images?.find((i) => i.primaryImage)?.url ||
        product.images?.[0]?.url;

    return (
        <>
            {/* Overlay */}
            <div
                className="product-drawer-overlay"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className="product-drawer"
                style={{
                    direction: isArabic ? "rtl" : "ltr"
                }}
            >

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="mb-0">
                        {isArabic
                            ? (product.nameAr || product.nameEn)
                            : (product.nameEn || product.nameAr)}
                    </h5>

                    <button className="btn-close" onClick={onClose} />
                </div>

                <div className="product-drawer-body">

                    {/* IMAGE */}
                    {primaryImage && (
                        <img
                            src={primaryImage}
                            className="product-main-image"
                        />
                    )}

                    {/* BADGE */}
                    <div className="mb-3">
                        <span className={`badge ${product.active ? "bg-success" : "bg-danger"}`}>
                            {product.active ? "Active" : "Inactive"}
                        </span>
                    </div>

                    {/* ================= BASIC INFO ================= */}
                    <Section title={t("productModal.basicInfo")} >

                        <Item label={t("productModal.productNameAr")} value={product.nameAr} />
                        <Item label={t("productModal.productNameEn")} value={product.nameEn} />

                        <Item label={t("productModal.descriptionAr")} value={product.descriptionAr} />
                        <Item label={t("productModal.descriptionEn")} value={product.descriptionEn} />


                        <Item label={t("productModal.brand")} value={product.brand} />
                    </Section>

                    {/* ================= PRICING ================= */}
                    <Section title={t("productModal.pricingAndStock")}>

                        <Item label={t("product.price")} value={`${product.price} ${product.currency}`} />
                        <Item label={t("product.stock")} value={product.stock} />
                    </Section>

                    {/* ================= IDENTIFIERS ================= */}
                    <Section title={t("productModal.identifiers")}>

                        <Item label={t("productModal.sku")} value={product.sku} />
                        <Item label={t("productModal.slug")} value={product.slug || "-"} />
                        <Item label={t("productModal.category")} value={product.categoryName} />

                    </Section>

                    {/* ================= SYSTEM ================= */}
                    <Section title={t("productModal.systemInfo")}>

                        <Item label={t("product.createAt")} value={formatDate(product.createdAt)} />
                        <Item label={t("product.updatedAt")} value={formatDate(product.updatedAt)} />
                    </Section>

                    {/* ================= IMAGES ================= */}
                    <Section title={t("productModal.images")}>

                        <div className="d-flex gap-2 flex-wrap">
                            {product.images?.map((img) => (
                                <img
                                    key={img.id}
                                    src={img.url}
                                    className={`product-thumb ${img.primaryImage ? "primary" : ""}`}
                                />
                            ))}
                        </div>

                    </Section>

                </div>
            </div>
        </>
    );
}

/* ===== helpers UI ===== */

function Section({ title, children }) {
    return (
        <div className="product-section">
            <h6 className="product-section-title">
                {title}
            </h6>

            {children}
        </div>
    );
}

function Item({ label, value }) {
    return (
        <div className="product-item">
            <span className="product-item-label">
                {label}
            </span>

            <div className="product-item-value">
                {value || "-"}
            </div>
        </div>
    );
}

function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
}