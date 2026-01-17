import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <h4>Products</h4>
            <div className="row g-3 mt-2">
                {products.map(p => (
                    <div key={p.id} className="col-6 col-md-4 col-lg-3">
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}
