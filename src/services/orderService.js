import api from "../api/axiosConfig";

const ORDERS = "/orders";

const placeOrder = (userId) => api.post(`${ORDERS}/${userId}/place`);

const getUserOrders = (userId) => api.get(`${ORDERS}/user/${userId}`);

const getOrderById = (orderId) => api.get(`${ORDERS}/${orderId}`);

export default {
    placeOrder,
    getUserOrders,
    getOrderById
}