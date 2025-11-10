import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await productService.getAll();
                // res.data is ApiResponse {status, message, data}
                const payload = res.data && res.data ? res.data : [];
                setProducts(payload);
            } catch (err) {
                console.error(err);
            }
        };
        load();
    }, []);

    return (
        <div className="container mt-4">
            <h4>Products</h4>
            <div className="row g-3">
                {products.map(p => (
                    <div key={p.id} className="col-12 col-md-4">
                        <ProductCard product={p}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
