import React, {useState} from "react";
import { useTranslation } from "react-i18next";

export default function ProductTable({
                                         products,
                                         onEdit,
                                         onDelete,
                                         onView,
                                         onPageChange
                                     }) {
    const { t, i18n } = useTranslation();

    const isArabic = i18n.language?.startsWith("ar");

    const items = products?.content || [];
    const pageInfo = products || {};
    return (
        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead className="table-light">
                <tr>
                    <th>{t("product.image")}</th>
                    <th>{t("product.name")}</th>
                    <th>{t("product.category")}</th>
                    <th>{t("product.price")}</th>
                    <th>{t("product.stock")}</th>
                    <th width="180"></th>
                </tr>
                </thead>

                <tbody>
                {items.map((p) => (
                    <tr key={p.id}>
                        <td>

                            {p.imageUrl ? (

                                <img
                                    src={p.imageUrl}
                                    alt={p.nameEn}
                                    width="55"
                                    height="55"
                                    className="rounded border"
                                    style={{
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                <div
                                    className="bg-light border rounded d-flex align-items-center justify-content-center"
                                    style={{
                                        width: 55,
                                        height: 55,
                                        fontSize: 12
                                    }}
                                >
                                    No Image
                                </div>
                            )}

                        </td>

                        <td>
                            <div className="fw-bold">
                                {isArabic
                                    ? (p.nameAr || p.nameEn)
                                    : (p.nameEn || p.nameAr)}
                            </div>

                            {/*<div className="small text-muted">*/}
                            {/*    {isArabic*/}
                            {/*        ? (p.descriptionAr || p.descriptionEn)*/}
                            {/*        : (p.descriptionEn || p.descriptionAr)}*/}
                            {/*</div>*/}
                        </td>

                        <td>{p.categoryName}</td>

                        <td>
                            ${Number(p.price).toFixed(2)}
                        </td>

                        <td>{p.stock}</td>

                        <td className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => onEdit(p)}
                            >
                                {t("productModal.edit")}
                            </button>

                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => onView(p)}
                            >
                                {t("productModal.view")}
                            </button>

                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => onDelete(p.id)}
                            >
                                {t("productModal.delete")}
                            </button>

                        </td>
                    </tr>
                ))}

                {items.length === 0 && (
                    <tr>
                        <td
                            colSpan="7"
                            className="text-center text-muted"
                        >
                            No Products Found
                        </td>
                    </tr>
                )}
                </tbody>

            </table>
            <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                    Page {pageInfo.number + 1} of {pageInfo.totalPages} — Total {pageInfo.totalElements}
                </small>

                <div>
                    <button className="btn btn-sm btn-outline-secondary me-2"
                            disabled={pageInfo.first}
                            onClick={() => {
                                const p = pageInfo.number - 1;

                                if (p >= 0) {
                                    onPageChange(p);
                                }
                            }}
                    >
                        Prev
                    </button>
                    <button className="btn btn-sm btn-outline-secondary"
                            disabled={pageInfo.last}
                            onClick={() => {
                                const p = pageInfo.number + 1;

                                if (p < pageInfo.totalPages) {
                                    onPageChange(p);
                                }
                            }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>

    );
}