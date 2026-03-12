import api from "../api/axiosConfig";

const CART = "/cart";

const getCart = () => api.get("/cart");

const addItem = (productId, quantity = 1) => {
    return api.post(
        "/cart/items",
        {
            productId: productId,
            quantity: quantity
        }
    );
};

const removeItem = (productId) =>
    api.delete(`/cart/items/${productId}`);

const clearCart = () =>
    api.delete("/cart");

export default {
    getCart,
    addItem,
    removeItem,
    clearCart,
};