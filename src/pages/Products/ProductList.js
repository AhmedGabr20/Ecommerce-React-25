import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";


export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        productService.getAll()
            .then(res => {
                setProducts(res??[]);
            })
            .catch(err => console.error(err))
            .finally(()=>setLoading(false));
    }, []);

    if (loading) return <div className="container mt-5 text-center"><Spinner /></div>;

    return (
        <div className="container mt-4">
            <h4>{t("products.title")}</h4>
            {products.length === 0 ? (
                <p className="text-muted mt-3">
                    {t("products.empty")}
                </p>
            ) : (
                <div className="row g-3 mt-2">
                    {products.map(p => (
                        <div key={p.id} className="col-6 col-md-4 col-lg-3">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
