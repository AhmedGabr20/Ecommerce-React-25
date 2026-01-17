import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({items:[],totalPrice:0});
    const userId = localStorage.getItem("userId");

    const loadCart = async () => {
        if (!userId) { setCart(null); return; }
        try {
            const res = await cartService.getCart(userId);
            // remember api interceptors unwrap response.data earlier; adjust if necessary
            const payload = res.data ?? res; // be safe
            setCart(payload);
        } catch (err) {
            console.error("loadCart:", err);
            setCart(null);
        }
    };

    useEffect(() => {
        loadCart();
        // optional: poll / websocket for updates
    }, [userId]);

    const addItem = async (productId, qty = 1) => {
        const res = await cartService.addItem(userId, productId, qty);
        await loadCart();
        return res;
    };

    const removeItem = async (productId) => {
        const res = await cartService.removeItem(userId, productId);
        await loadCart();
        return res;
    };

    const clearCart = async () => {
        const res = await cartService.clearCart(userId);
        await loadCart();
        return res;
    };

    return (
        <CartContext.Provider value={{ cart, loadCart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
