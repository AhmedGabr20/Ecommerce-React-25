import React from "react";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const { cart, removeItem, clearCart } = useCart();
    const navigate = useNavigate();

    if (!cart) return <div className="container mt-5">Your cart is empty</div>;

    const handleRemove = async (productId) => {
        try {
            await removeItem(productId);
            toast.success("Item removed");
        } catch {
            toast.error("Failed to remove");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Your Cart</h3>
            <div className="list-group mt-3">
                {cart.items.map(i => (
                    <div key={i.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold">{i.productName}</div>
                            <div className="text-muted small">Qty: {i.quantity}</div>
                        </div>
                        <div>
                            <div className="fw-bold">${i.price}</div>
                            <button className="btn btn-sm btn-outline-danger ms-2" onClick={()=>handleRemove(i.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-3 d-flex justify-content-between align-items-center">
                <h4>Total: ${cart.totalPrice}</h4>
                <div>
                    <button className="btn btn-secondary me-2" onClick={() => { clearCart(); toast.info("Cart cleared"); }}>Clear</button>
                    <button className="btn btn-primary" onClick={() => navigate("/checkout")}>Checkout</button>
                </div>
            </div>
        </div>
    );
}
