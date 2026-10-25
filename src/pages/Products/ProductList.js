import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";
import CategorySidebar from "../../components/CategorySidebar";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { t, i18n } = useTranslation();

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true); // هل في صفحات تانية؟

    const PAGE_SIZE = 20;

    // Load categories once
    useEffect(() => {
        categoryService.getTree()
            .then(res => setCategories(res.data ?? []))
            .catch(err => console.error(err));
    }, []);

    // Load products when category changes
    useEffect(() => {
        setLoading(true);
        setPage(0);
        setHasMore(true);

        productService.getAll(selectedCategory, 0, PAGE_SIZE)
            .then(res => {
                setProducts(res ?? []);
                if ((res?.length ?? 0) < PAGE_SIZE) setHasMore(false);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [selectedCategory]);

    const loadMore = () => {
        const nextPage = page + 1;
        setLoadingMore(true);

        productService.getAll(selectedCategory, nextPage, PAGE_SIZE)
            .then(res => {
                setProducts(prev => [...prev, ...(res ?? [])]);
                setPage(nextPage);
                if ((res?.length ?? 0) < PAGE_SIZE) setHasMore(false);
            })
            .catch(err => console.error(err))
            .finally(() => setLoadingMore(false));
    };

    if (loading) return <div className="container mt-5 text-center"><Spinner /></div>;

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* SIDEBAR */}
                <div className="col-lg-2 col-md-3 mb-3">

                    <CategorySidebar
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                </div>

                {/* PRODUCTS */}
                <div className="col-lg-10 col-md-9">
                    {products.length === 0 ? (
                        <p className="text-muted mt-3">{t("products.empty")}</p>
                    ) : (
                        <>
                            <div className="row g-3">
                                {products.map(p => (
                                    <div key={p.id} className="col-6 col-md-4 col-lg-3">
                                        <ProductCard product={p} />
                                    </div>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="text-center mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={loadMore}
                                        disabled={loadingMore}
                                    >
                                        {loadingMore ? t("products.loading") : t("products.loadMore")}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}