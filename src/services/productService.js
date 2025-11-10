import api from "../api/axiosConfig";

const PRODUCT_URL = "/products";

const getAll = async (page = 0, size = 20, sortBy = "id") => {
    // backend returns ApiResponse with data = list
    const res = await api.get(`${PRODUCT_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
    return res; // caller inspects res.data.data
};

const create = async (productPayload) => {
    return await api.post(`${PRODUCT_URL}`, productPayload);
};

export default {
    getAll,
    create,
};
