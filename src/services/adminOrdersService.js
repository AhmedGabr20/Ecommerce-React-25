import api from "../api/axiosConfig";

const list = ({status , username, page = 0, size = 20, sortBy = "createdAt", dir = "desc"}) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (username) params.append("username", username);
    params.append("page", page);
    params.append("size", size);
    params.append("sortBy", sortBy);
    params.append("dir", dir);
    return api.get(`/admin/orders?${params.toString()}`);
}

const details = (orderId) => api.get(`/admin/orders/${orderId}`);

const updateStatus = (orderId, status) => api.patch(`/admin/orders/${orderId}/status`, { status });


export default {list,details,updateStatus};