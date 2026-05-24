import React, { useEffect, useState } from "react";
import ProductModal from "../../components/products/ProductModal";
import ProductTable from "../../components/products/ProductTable";
import adminProductsService from "../../services/adminProductsService";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";
import ProductViewDrawer from "../../components/products/ProductViewDrawer";
import Swal from "sweetalert2";

export default function AdminProductsPage() {

    const { t, i18n } = useTranslation();
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [editing, setEditing] = useState(null);
    const [page, setPage] = useState(0);

    const [viewOpen, setViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");

    useEffect(() => {

        const timer = setTimeout(() => {
            setDebouncedKeyword(keyword);
        }, 500);

        return () => clearTimeout(timer);

    }, [keyword]);

    useEffect(() => {
        loadProducts(0, debouncedKeyword);
    }, [debouncedKeyword]);

    const loadProducts = async (
        p = page,
        search = debouncedKeyword
    ) => {

        try {

            setLoading(true);

            setPage(p);

            const res = await adminProductsService.list({
                page: p,
                size: 10,
                q: search
            });

            const payload =
                res.data?.data ?? res.data;

            setProducts(payload);

        } catch {

            toast.error("Failed to load products");

        } finally {

            setLoading(false);
        }
    };

    const loadCategories = async () => {

        const res = await adminProductsService.categories();

        setCategories(res.data || []);
    };

    useEffect(() => {
        loadCategories();

    }, []);

    const openCreate = () => {

        setEditing(null);

        setOpen(true);
    };

    const openEdit = async (product) => {

        try {

            setLoading(true);

            const res = await adminProductsService.getById(product.id);

            const productDetails = res?.data ?? res;

            setEditing(productDetails);

            setOpen(true);

        } catch (e) {

            toast.error("Failed to load product details");

        } finally {

            setLoading(false);
        }
    };

    const handleSave = async (body) => {

        try {

            if (editing) {

                await adminProductsService.update(
                    editing.id,
                    body
                );

                toast.success("Product updated");

            } else {

                await adminProductsService.create(body);

                toast.success("Product created");
            }

            setOpen(false);

            loadProducts();

        } catch (e) {

            toast.error(
                e.response?.data?.message ||
                "Save failed"
            );
        }
    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: t("product.deleteConfirmTitle") || "Delete Product?",

            text:
                t("product.deleteConfirmText") ||
                "You won't be able to restore this product!",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#6c757d",

            confirmButtonText:
                t("product.delete") || "Delete",

            cancelButtonText:
                t("common.cancel") || "Cancel"
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            await adminProductsService.remove(id);

            toast.success(
                t("product.deleted") ||
                "Product deleted"
            );

            loadProducts();

        } catch {

            toast.error(
                t("product.deleteFailed") ||
                "Delete failed"
            );
        }
    };

    const handleView = async (product) => {
        try {
            setLoading(true);

            const res = await adminProductsService.getById(product.id);
            const productDetails = res?.data ?? res;

            setSelectedProduct(productDetails);
            setViewOpen(true);

        } catch (e) {
            toast.error("Failed to load product details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h3>
                    {t("products.managements")}
                </h3>

                <button
                    className="btn btn-primary"
                    onClick={openCreate}
                >
                    {t("product.add")}
                </button>
            </div>
            <div className="row mb-3">

                <div className="col-md-6">

                    <input
                        type="text"
                        className="form-control"
                        placeholder={
                            t("product.search") ||
                            "Search by name, description, sku..."
                        }
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                </div>

            </div>

            <div className="card shadow-sm p-3">

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <ProductTable
                        products={products}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                        onPageChange={loadProducts}
                    />
                )}
            </div>

            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                categories={categories}
                initial={editing}
            />

            <ProductViewDrawer
                open={viewOpen}
                product={selectedProduct}
                onClose={() => setViewOpen(false)}
            />

        </>
    );
}