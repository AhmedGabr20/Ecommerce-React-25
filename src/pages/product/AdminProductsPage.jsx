import React, { useEffect, useState } from "react";
import ProductModal from "../../components/products/ProductModal";
import ProductTable from "../../components/products/ProductTable";
import adminProductsService from "../../services/adminProductsService";
import { toast } from "react-toastify";
import {useTranslation} from "react-i18next";
import ProductViewDrawer from "../../components/products/ProductViewDrawer";

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

    const loadProducts = async (p = page) => {
        try {
            setLoading(true);
            setPage(p);
            const res = await adminProductsService.list({page:p , size:10});
            const payload = res.data?.data ?? res.data;

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
        loadProducts();

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

        const ok = window.confirm(
            "Delete this product?"
        );

        if (!ok) return;

        try {

            await adminProductsService.remove(id);

            toast.success("Product deleted");

            loadProducts();

        } catch {

            toast.error("Delete failed");
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