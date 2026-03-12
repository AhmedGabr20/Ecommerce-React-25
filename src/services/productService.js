import api from "../api/axiosConfig";

const PRODUCT_URL = "/products";

const getAll = async (categoryId = null, page = 0, size = 10, sortBy = "id") => {
    // backend returns ApiResponse with data = list
    let url = `${PRODUCT_URL}?page=${page}&size=${size}&sortBy=${sortBy}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    const res = await api.get(url);
    return res;
};

const create = async (productPayload) => {
    return await api.post(`${PRODUCT_URL}`, productPayload);
};

export default {
    getAll,
    create,
};
