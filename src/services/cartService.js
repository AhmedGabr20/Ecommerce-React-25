import api from "../api/axiosConfig";

const CART = "/cart";

const addItem = (userId, productId, quantity = 1) => {
    return api.post(`${CART}/${userId}/add/${productId}?quantity=${quantity}`);
};

const getCart = (userId) => {
    return api.get(`${CART}/${userId}`);
};

const clearCart = (userId) => {
    return api.delete(`${CART}/${userId}/clear`);
};

const removeItem = (userId, itemId) => {
    return api.delete(`${CART}/${userId}/remove/${itemId}`);
};

export default {
    addItem,
    getCart,
    clearCart,
    removeItem,
};
