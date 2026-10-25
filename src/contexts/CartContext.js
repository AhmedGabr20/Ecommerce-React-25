import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState({ items: [], totalPrice: 0 });

    const [cartUuid, setCartUuid] = useState(
        localStorage.getItem("cartUuid") || null
    );

    const loadCart = async () => {
        try {

            const res = await cartService.getCart();

            const cart = res?.data;

            setCart(cart);
            // حفظ uuid لو لسه متخزنش
            if (cart?.cartUuid && cart.cartUuid !== cartUuid) {
                localStorage.setItem("cartUuid", cart.cartUuid);
                setCartUuid(cart.cartUuid);
            }

        } catch (err) {
            console.error("loadCart:", err);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const addItem = async (productId, qty = 1) => {

        const res = await cartService.addItem(productId, qty);

        await loadCart();

        return res;
    };

    const removeItem = async (productId) => {

        const res = await cartService.removeItem(productId);

        await loadCart();

        return res;
    };

    const clearCart = async () => {

        const res = await cartService.clearCart();

        await loadCart();

        return res;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartUuid,
                loadCart,
                addItem,
                removeItem,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);